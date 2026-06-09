import { useEffect, useMemo, useRef, useState, type ClipboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Plus, Search, X, Trash2, Pencil,
  Bold, Italic, Underline, Strikethrough, Highlighter,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  CheckSquare, Code, Link as LinkIcon, Smile, ChevronLeft, FileText,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { useAuth } from '../auth/AuthContext';
import { FREE_LIMITS, getEffectivePlan } from '../utils/accessControl';

const NOTES_KEY = 'talky_user_notes_v1';

type Category = 'all' | 'vocabulary' | 'grammar' | 'phrases' | 'general' | 'exam';
type NoteCategory = Exclude<Category, 'all'>;

interface Note {
  id: string;
  title: string;
  content: string;       // HTML
  emoji?: string;
  category: NoteCategory;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_META: Record<NoteCategory, { label: string; color: string; bg: string; dot: string; emoji: string }> = {
  vocabulary: { label: 'Vocabulary', color: '#1E6F9F', bg: '#EFF6FF', dot: '#4FA3D1', emoji: '📚' },
  grammar:    { label: 'Grammar',    color: '#047857', bg: '#ECFDF5', dot: '#10B981', emoji: '✏️' },
  phrases:    { label: 'Phrases',    color: '#B45309', bg: '#FFFBEB', dot: '#F59E0B', emoji: '💬' },
  general:    { label: 'General',    color: '#6D28D9', bg: '#F5F3FF', dot: '#7C3AED', emoji: '📝' },
  exam:       { label: 'Exam',       color: '#BE185D', bg: '#FDF2F8', dot: '#EC4899', emoji: '🎯' },
};

const EMOJI_PALETTE = ['📝', '📚', '✏️', '💬', '🎯', '💡', '🌱', '🔥', '⭐', '✨', '🎨', '🧠', '📖', '🗣️', '🎧', '📌', '✅', '❤️', '🚀', '🏆'];

const SAMPLE_NOTES: Note[] = [
  {
    id: '1',
    title: 'Common Phrasal Verbs',
    content: '<p>Look up — search for information</p><p>Give up — stop trying</p><p>Get along — have a good relationship</p><p>Carry out — complete a task</p>',
    emoji: '💬',
    category: 'phrases',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Conditional Sentences',
    content: '<p><b>Type 1 (Real):</b> If + present simple, will + base</p><p><b>Type 2 (Unreal):</b> If + past simple, would + base</p><p><b>Type 3 (Past unreal):</b> If + past perfect, would have + past participle</p>',
    emoji: '✏️',
    category: 'grammar',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const FORMAT_TOOLS = [
  { icon: Bold, label: 'Bold', command: 'bold' },
  { icon: Italic, label: 'Italic', command: 'italic' },
  { icon: Underline, label: 'Underline', command: 'underline' },
  { icon: Strikethrough, label: 'Strike', command: 'strikeThrough' },
  { icon: Highlighter, label: 'Highlight', command: 'hiliteColor', value: '#FEF08A' },
] as const;

const BLOCK_TOOLS = [
  { icon: Heading1, label: 'H1', tag: 'h1' },
  { icon: Heading2, label: 'H2', tag: 'h2' },
  { icon: Heading3, label: 'H3', tag: 'h3' },
] as const;

const INSERT_TOOLS = [
  { icon: List, label: 'Bullet', action: 'bullet' },
  { icon: ListOrdered, label: 'Numbered', action: 'numbered' },
  { icon: CheckSquare, label: 'Checkbox', action: 'checklist' },
  { icon: Quote, label: 'Quote', action: 'quote' },
  { icon: Code, label: 'Code', action: 'code' },
  { icon: LinkIcon, label: 'Link', action: 'link' },
] as const;

const ALLOWED_NOTE_TAGS = new Set([
  'a', 'b', 'blockquote', 'br', 'code', 'div', 'em', 'h1', 'h2', 'h3',
  'i', 'input', 'li', 'mark', 'ol', 'p', 'pre', 's', 'span', 'strong', 'u', 'ul',
]);

function getSafeHref(value: string) {
  const href = value.trim();
  if (!href) return '';
  try {
    const parsed = new URL(href, window.location.origin);
    if (['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) return href;
  } catch {
    return '';
  }
  return '';
}

function getSafeInlineStyle(element: HTMLElement) {
  const backgroundColor = element.style.backgroundColor;
  if (!backgroundColor) return '';
  if (/^(#[0-9a-f]{3,8}|rgba?\([\d\s,%.]+\)|[a-z]+)$/i.test(backgroundColor)) {
    return `background-color: ${backgroundColor};`;
  }
  return '';
}

function unwrapUnsafeElement(element: Element) {
  const parent = element.parentNode;
  if (!parent) return;
  while (element.firstChild) parent.insertBefore(element.firstChild, element);
  parent.removeChild(element);
}

function sanitizeElement(element: Element) {
  const tag = element.tagName.toLowerCase();
  if (!ALLOWED_NOTE_TAGS.has(tag)) {
    unwrapUnsafeElement(element);
    return;
  }

  const originalHref = element.getAttribute('href') || '';
  const originalChecked = element.hasAttribute('checked');
  const originalStyle = element instanceof HTMLElement ? getSafeInlineStyle(element) : '';
  for (const attr of Array.from(element.attributes)) {
    element.removeAttribute(attr.name);
  }

  if (tag === 'a') {
    const href = getSafeHref(originalHref);
    if (href) {
      element.setAttribute('href', href);
      element.setAttribute('target', '_blank');
      element.setAttribute('rel', 'noopener noreferrer');
    }
  }

  if (tag === 'input') {
    element.setAttribute('type', 'checkbox');
    element.setAttribute('disabled', '');
    if (originalChecked) element.setAttribute('checked', '');
  }

  if (originalStyle && (tag === 'span' || tag === 'mark')) {
    element.setAttribute('style', originalStyle);
  }
}

function sanitizeNoteHtml(html: string) {
  const template = document.createElement('template');
  template.innerHTML = String(html || '');
  for (const element of Array.from(template.content.querySelectorAll('*'))) {
    sanitizeElement(element);
  }
  return template.innerHTML;
}

function loadNotes(): Note[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(NOTES_KEY) ?? 'null');
    if (!Array.isArray(parsed)) return SAMPLE_NOTES;
    return parsed.map((n: Note) => {
      const cat = (n.category in CATEGORY_META ? n.category : 'general') as NoteCategory;
      const content = n.content ?? '';
      // Migrate plain text to HTML
      const html = /<\/?[a-z][\s\S]*>/i.test(content)
        ? content
        : content.split('\n').filter(Boolean).map(line => `<p>${escapeHtml(line)}</p>`).join('');
      return {
        id: n.id,
        title: n.title ?? '',
        content: sanitizeNoteHtml(html),
        emoji: n.emoji ?? CATEGORY_META[cat].emoji,
        category: cat,
        createdAt: n.createdAt ?? new Date().toISOString(),
        updatedAt: n.updatedAt ?? new Date().toISOString(),
      };
    });
  } catch {
    return SAMPLE_NOTES;
  }
}

function saveNotes(notes: Note[]) {
  const safeNotes = notes.map(note => ({ ...note, content: sanitizeNoteHtml(note.content) }));
  localStorage.setItem(NOTES_KEY, JSON.stringify(safeNotes));
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripHtml(html: string) {
  const tmp = document.createElement('div');
  tmp.innerHTML = sanitizeNoteHtml(html);
  return tmp.textContent ?? '';
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7)   return `${diff}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Editor ───────────────────────────────────────────────────────────
interface EditorProps {
  notes: Note[];
  initialNote?: Note;
  noteLimit: number;
  onLimitReached: () => void;
  onClose: () => void;
  onSaveAll: (notes: Note[]) => void;
}

function NoteEditor({ notes, initialNote, noteLimit, onLimitReached, onClose, onSaveAll }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const activeContentRef = useRef('');
  const [allNotes, setAllNotes] = useState<Note[]>(notes);
  const [activeId, setActiveId] = useState<string | undefined>(initialNote?.id);
  const [search, setSearch] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const active = allNotes.find(n => n.id === activeId);
  const activeContent = active?.content ?? '';

  useEffect(() => {
    activeContentRef.current = activeContent;
  }, [activeContent]);

  // ── Load active note's HTML into the editor ──
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = sanitizeNoteHtml(activeContentRef.current);
    }
  }, [activeId]);

  // ── Mutate active note in-memory ──
  const patchActive = (patch: Partial<Note>) => {
    if (!activeId) return;
    setAllNotes(prev => prev.map(n => n.id === activeId
      ? { ...n, ...patch, updatedAt: new Date().toISOString() }
      : n));
  };

  // ── Toolbar exec ──
  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    if (editorRef.current) patchActive({ content: editorRef.current.innerHTML });
  };

  const insertLink = () => {
    const url = window.prompt('Enter URL');
    const safeUrl = url ? getSafeHref(url) : '';
    if (safeUrl) exec('createLink', safeUrl);
  };
  const insertChecklist = () => {
    exec('insertHTML', sanitizeNoteHtml('<ul><li><input type="checkbox" disabled /> Item</li></ul>'));
  };
  const runInsertTool = (action: typeof INSERT_TOOLS[number]['action']) => {
    if (action === 'bullet') exec('insertUnorderedList');
    if (action === 'numbered') exec('insertOrderedList');
    if (action === 'checklist') insertChecklist();
    if (action === 'quote') exec('formatBlock', 'blockquote');
    if (action === 'code') exec('formatBlock', 'pre');
    if (action === 'link') insertLink();
  };
  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const html = event.clipboardData.getData('text/html');
    const text = event.clipboardData.getData('text/plain');
    const safeHtml = html
      ? sanitizeNoteHtml(html)
      : escapeHtml(text).replace(/\n/g, '<br>');
    exec('insertHTML', safeHtml);
  };

  // ── Create new ──
  const createNew = () => {
    if (allNotes.length >= noteLimit) {
      onLimitReached();
      return;
    }
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      emoji: '📝',
      category: 'general',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAllNotes(prev => [newNote, ...prev]);
    setActiveId(newNote.id);
  };

  // ── Delete ──
  const deleteActive = () => {
    if (!activeId) return;
    if (!window.confirm('Delete this note?')) return;
    setAllNotes(prev => prev.filter(n => n.id !== activeId));
    setActiveId(undefined);
  };

  // ── Save & close ──
  const handleSave = () => {
    // Drop empty notes (no title and no content text)
    const cleaned = allNotes
      .map(n => ({ ...n, content: sanitizeNoteHtml(n.content) }))
      .filter(n => n.title.trim() || stripHtml(n.content).trim());
    onSaveAll(cleaned);
    onClose();
  };

  // ── Filtered sidebar list ──
  const filteredList = useMemo(() => {
    return allNotes
      .filter(n => !search || n.title.toLowerCase().includes(search.toLowerCase()) || stripHtml(n.content).toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [allNotes, search]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex bg-white"
    >
      {/* ── Sidebar ── */}
      <aside className={`shrink-0 border-r border-slate-100 bg-slate-50 transition-all ${sidebarOpen ? 'w-72' : 'w-0 -ml-px overflow-hidden'} hidden md:flex flex-col`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Pages</p>
          <button type="button" onClick={createNew}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-[#4FA3D1]">
            <Plus size={15} />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-xl bg-white border border-slate-200 py-2 pl-8 pr-3 text-xs font-medium text-[#101828] outline-none focus:border-[#4FA3D1]" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-3 scrollbar-none">
          {filteredList.length === 0 ? (
            <p className="px-3 py-4 text-center text-xs text-slate-400">No pages</p>
          ) : (
            filteredList.map(n => {
              const isActive = n.id === activeId;
              const meta = CATEGORY_META[n.category];
              return (
                <button key={n.id} type="button" onClick={() => setActiveId(n.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition ${isActive ? 'bg-white shadow-sm' : 'hover:bg-white/70'}`}>
                  <span className="text-base leading-none shrink-0">{n.emoji ?? meta.emoji}</span>
                  <span className={`flex-1 truncate text-[13px] ${isActive ? 'font-bold text-[#101828]' : 'font-medium text-slate-600'}`}>
                    {n.title || 'Untitled'}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ── Main editor ── */}
      <main className="flex flex-1 flex-col">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200">
              <X size={18} />
            </button>
            <button type="button" onClick={() => setSidebarOpen(o => !o)}
              className="hidden md:flex h-10 w-10 items-center justify-center rounded-2xl text-slate-500 hover:bg-slate-100">
              <ChevronLeft size={16} className={`transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
            </button>
          </div>
          <h2 className="font-black text-[#101828]">{active ? 'Edit Note' : 'No Note Selected'}</h2>
          <div className="flex items-center gap-2">
            {active && (
              <button type="button" onClick={deleteActive}
                className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            )}
            <button type="button" onClick={handleSave}
              className="rounded-2xl bg-[#4FA3D1] px-4 py-2 text-sm font-black text-white hover:bg-[#2F86B5]">
              Save
            </button>
          </div>
        </div>

        {!active ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
              <FileText size={28} className="text-slate-300" />
            </div>
            <p className="font-bold text-slate-500">Select a page</p>
            <p className="mt-1 text-sm text-slate-400">Pick a note from the sidebar or create a new one.</p>
            <button type="button" onClick={createNew}
              className="mt-4 rounded-2xl bg-[#4FA3D1] px-5 py-2.5 text-sm font-black text-white hover:bg-[#2F86B5]">
              New Page
            </button>
          </div>
        ) : (
          <>
            {/* Category bar */}
            <div className="flex gap-2 overflow-x-auto border-b border-slate-100 px-4 py-2.5 scrollbar-none">
              {(Object.keys(CATEGORY_META) as NoteCategory[]).map(key => {
                const meta = CATEGORY_META[key];
                const sel = active.category === key;
                return (
                  <button key={key} type="button"
                    onClick={() => patchActive({ category: key, emoji: active.emoji && !Object.values(CATEGORY_META).some(m => m.emoji === active.emoji) ? active.emoji : meta.emoji })}
                    className="shrink-0 rounded-full px-3 py-1 text-xs font-bold transition-all"
                    style={{
                      backgroundColor: sel ? meta.dot : meta.bg,
                      color: sel ? '#fff' : meta.color,
                    }}>
                    {meta.label}
                  </button>
                );
              })}
            </div>

            {/* Title row */}
            <div className="w-full px-6 pt-8 sm:px-10 lg:px-16">
              <div className="flex items-start gap-3">
                <button type="button" onClick={() => setShowEmoji(o => !o)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl hover:bg-slate-200">
                  {active.emoji ?? CATEGORY_META[active.category].emoji}
                </button>
                <input value={active.title}
                  onChange={e => patchActive({ title: e.target.value })}
                  placeholder="Untitled"
                  className="flex-1 bg-transparent py-1 text-3xl font-black text-[#101828] outline-none placeholder:text-slate-300" />
              </div>
              {showEmoji && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex flex-wrap gap-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
                >
                  {EMOJI_PALETTE.map(e => (
                    <button key={e} type="button"
                      onClick={() => { patchActive({ emoji: e }); setShowEmoji(false); }}
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-xl hover:bg-slate-100">
                      {e}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Floating-style toolbar */}
            <div className="mt-4 w-full px-6 sm:px-10 lg:px-16">
              <div className="flex flex-wrap items-center gap-0.5 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
                {FORMAT_TOOLS.map(t => {
                  const Icon = t.icon;
                  return (
                    <button key={t.label} type="button" onClick={() => exec(t.command, 'value' in t ? t.value : undefined)} title={t.label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#101828]">
                      <Icon size={14} />
                    </button>
                  );
                })}
                <div className="mx-1 h-5 w-px bg-slate-200" />
                {BLOCK_TOOLS.map(t => {
                  const Icon = t.icon;
                  return (
                    <button key={t.label} type="button" onClick={() => exec('formatBlock', t.tag)} title={t.label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#101828]">
                      <Icon size={14} />
                    </button>
                  );
                })}
                <div className="mx-1 h-5 w-px bg-slate-200" />
                {INSERT_TOOLS.map(t => {
                  const Icon = t.icon;
                  return (
                    <button key={t.label} type="button" onClick={() => runInsertTool(t.action)} title={t.label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#101828]">
                      <Icon size={14} />
                    </button>
                  );
                })}
                <div className="mx-1 h-5 w-px bg-slate-200" />
                <button type="button" onClick={() => setShowEmoji(o => !o)} title="Emoji"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#101828]">
                  <Smile size={14} />
                </button>
              </div>
            </div>

            {/* Editable content */}
            <div className="w-full flex-1 overflow-y-auto px-6 py-6 sm:px-10 lg:px-16">
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={() => editorRef.current && patchActive({ content: editorRef.current.innerHTML })}
                onPaste={handlePaste}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') { e.preventDefault(); exec('bold'); }
                  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') { e.preventDefault(); exec('italic'); }
                  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'u') { e.preventDefault(); exec('underline'); }
                }}
                data-placeholder="Start writing your note…"
                className="prose-notes min-h-[400px] w-full text-base font-medium leading-relaxed text-slate-700 outline-none"
              />
            </div>
          </>
        )}
      </main>
    </motion.div>
  );
}

// ─── List page ────────────────────────────────────────────────────────
export default function NotesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notes,  setNotes]  = useState<Note[]>(loadNotes);
  const [query,  setQuery]  = useState('');
  const [cat,    setCat]    = useState<Category>('all');
  const [editor, setEditor] = useState<{ open: boolean; note?: Note }>({ open: false });
  const hasFullAccess = getEffectivePlan(user) !== 'free';
  const freeLimitReached = !hasFullAccess && notes.length >= FREE_LIMITS.notes;

  const filtered = useMemo(() => {
    return notes
      .filter(n => cat === 'all' || n.category === cat)
      .filter(n => {
        if (!query) return true;
        const q = query.toLowerCase();
        return n.title.toLowerCase().includes(q) || stripHtml(n.content).toLowerCase().includes(q);
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [notes, cat, query]);

  const handleEditorSave = (next: Note[]) => {
    setNotes(next);
    saveNotes(next);
  };

  const deleteNote = (id: string) => {
    const next = notes.filter(n => n.id !== id);
    setNotes(next); saveNotes(next);
  };

  const openNew = () => {
    if (freeLimitReached) {
      navigate(`/upgrade?feature=notes&returnTo=${encodeURIComponent('/notes')}`);
      return;
    }
    const draft: Note = {
      id: crypto.randomUUID(), title: '', content: '', emoji: '📝',
      category: 'general',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    // Add to the list optimistically so it shows in sidebar
    const next = [draft, ...notes];
    setNotes(next);
    setEditor({ open: true, note: draft });
  };

  return (
    <>
      {/* Inject prose-notes styles for the editor */}
      <style>{`
        .prose-notes h1 { font-size: 1.875rem; font-weight: 900; margin: 1.25rem 0 .75rem; color: #101828; line-height: 1.2; }
        .prose-notes h2 { font-size: 1.5rem; font-weight: 900; margin: 1rem 0 .5rem; color: #101828; line-height: 1.25; }
        .prose-notes h3 { font-size: 1.25rem; font-weight: 800; margin: .9rem 0 .4rem; color: #101828; }
        .prose-notes p { margin: .35rem 0; }
        .prose-notes ul, .prose-notes ol { padding-left: 1.5rem; margin: .5rem 0; }
        .prose-notes ul { list-style: disc; }
        .prose-notes ol { list-style: decimal; }
        .prose-notes blockquote { border-left: 3px solid #4FA3D1; padding: .35rem .85rem; margin: .65rem 0; color: #475569; background: #F8FAFC; border-radius: 0 8px 8px 0; }
        .prose-notes pre { background: #0F172A; color: #E2E8F0; padding: .85rem 1rem; border-radius: 12px; font-family: ui-monospace, SFMono-Regular, monospace; font-size: .875rem; overflow-x: auto; margin: .65rem 0; }
        .prose-notes a { color: #1E6F9F; text-decoration: underline; }
        .prose-notes [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #CBD5E1;
        }
        .prose-notes:empty:before {
          content: attr(data-placeholder);
          color: #CBD5E1;
        }
      `}</style>

      <PageContainer>
        <div className="min-h-screen px-4 pb-10 sm:px-0">

          <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-3xl">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => navigate(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200">
                  <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-black leading-tight text-[#101828]">Notes</h1>
              </div>
              <button type="button" onClick={openNew}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4FA3D1] text-white hover:bg-[#2F86B5]">
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {freeLimitReached && (
              <button
                type="button"
                onClick={() => navigate(`/upgrade?feature=notes&returnTo=${encodeURIComponent('/notes')}`)}
                className="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-left text-sm font-bold text-[#1E6F9F]"
              >
                Free member bisa membuat sampai {FREE_LIMITS.notes} notes. Upgrade Pro untuk notes tanpa batas.
              </button>
            )}

            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search notes…"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-[#101828] outline-none focus:border-[#4FA3D1]" />
              {query && (
                <button type="button" onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200">
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {(['all', ...Object.keys(CATEGORY_META)] as Category[]).map(key => {
                const meta = key === 'all' ? null : CATEGORY_META[key as NoteCategory];
                const sel  = cat === key;
                return (
                  <button key={key} type="button" onClick={() => setCat(key)}
                    className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all"
                    style={{
                      backgroundColor: sel ? (meta?.dot ?? '#0F172A') : (meta?.bg ?? '#F1F5F9'),
                      color: sel ? '#fff' : (meta?.color ?? '#475569'),
                    }}>
                    {key === 'all' ? 'All' : meta!.label}
                  </button>
                );
              })}
            </div>

            <p className="px-1 text-xs font-semibold text-slate-400">
              {filtered.length} {filtered.length === 1 ? 'note' : 'notes'}
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                  <Pencil size={20} className="text-slate-300" />
                </div>
                <p className="font-bold text-slate-500">{query ? 'No notes found' : 'No notes yet'}</p>
                <p className="mt-1 text-sm text-slate-400">{query ? 'Try a different search.' : 'Tap + to create your first note.'}</p>
                {!query && (
                  <button type="button" onClick={openNew}
                    className="mt-4 rounded-2xl bg-[#4FA3D1] px-5 py-2.5 text-sm font-black text-white hover:bg-[#2F86B5]">
                    New Note
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                <AnimatePresence>
                  {filtered.map(note => {
                    const meta = CATEGORY_META[note.category];
                    const preview = stripHtml(note.content);
                    return (
                      <motion.div key={note.id}
                        layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                        className="group rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:border-slate-200 hover:shadow-sm"
                      >
                        <button type="button" onClick={() => setEditor({ open: true, note })} className="block w-full text-left">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="text-base">{note.emoji ?? meta.emoji}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: meta.color }}>{meta.label}</span>
                            <span className="ml-auto text-[10px] font-semibold text-slate-300">{formatDate(note.updatedAt)}</span>
                          </div>
                          <p className="font-black text-[#101828] line-clamp-1">{note.title || 'Untitled'}</p>
                          <p className="mt-1 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500">{preview || 'Empty note'}</p>
                        </button>

                        <div className="mt-3 flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button type="button" onClick={() => setEditor({ open: true, note })}
                            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-blue-50 hover:text-[#4FA3D1]">
                            <Pencil size={13} />
                          </button>
                          <button type="button" onClick={() => deleteNote(note.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </PageContainer>

      <AnimatePresence>
        {editor.open && (
          <NoteEditor
            notes={notes}
            initialNote={editor.note}
            noteLimit={hasFullAccess ? Number.POSITIVE_INFINITY : FREE_LIMITS.notes}
            onLimitReached={() => navigate(`/upgrade?feature=notes&returnTo=${encodeURIComponent('/notes')}`)}
            onClose={() => setEditor({ open: false })}
            onSaveAll={handleEditorSave}
          />
        )}
      </AnimatePresence>
    </>
  );
}
