// English lessons and practice topics that keep their quiz inside the page
// component (a non-exported const). The source is parsed and every literal array
// of question objects is read as data, so these pages can be audited without
// moving their content.
import ts from 'typescript';
import type { AuditLesson, AuditQuestion } from './contentAudit';

type Group = { language: string; level: string; lessons: AuditLesson[] };
type Literal = string | number | boolean | null | Literal[] | { [key: string]: Literal } | undefined;

const moduleSources = import.meta.glob(
  ['../pages/module/english/{beginner,elementary,intermediate,upper-intermediate}/**/Lesson*.tsx', '../pages/module/english/advanced/grammar/Lesson*.tsx'],
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>;
const practiceSources = import.meta.glob('../pages/latihan/english/**/topik*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

/** Evaluates a literal expression; anything computed becomes undefined. */
function literal(node: ts.Expression): Literal {
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node)) return literal(node.expression);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((element) => (ts.isSpreadElement(element) ? undefined : literal(element)));
  if (ts.isObjectLiteralExpression(node)) {
    const result: Record<string, Literal> = {};
    node.properties.forEach((property) => {
      if (!ts.isPropertyAssignment(property)) return;
      const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : null;
      if (name) result[name] = literal(property.initializer);
    });
    return result;
  }
  return undefined;
}

const QUESTION_KEYS = ['q', 'question', 'prompt'];
const OPTION_KEYS = ['opts', 'options'];
const ANSWER_KEYS = ['ans', 'answer', 'correctAnswer'];

function asQuestion(value: Literal): AuditQuestion | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const question = QUESTION_KEYS.map((key) => value[key]).find((item) => typeof item === 'string');
  const rawOptions = OPTION_KEYS.map((key) => value[key]).find(Array.isArray);
  if (typeof question !== 'string' || !rawOptions) return null;
  // Options are either strings or { text, correct } objects.
  const options = rawOptions.map((option) => (option && typeof option === 'object' && !Array.isArray(option) ? option.text : option));
  if (!options.every((option): option is string => typeof option === 'string')) return null;
  const flagged = rawOptions.find((option) => option && typeof option === 'object' && !Array.isArray(option) && option.correct === true);
  let answer = ANSWER_KEYS.map((key) => value[key]).find((item) => typeof item === 'string' || typeof item === 'number');
  if (typeof answer === 'number') answer = options[answer];
  if (answer === undefined && flagged && typeof flagged === 'object' && !Array.isArray(flagged)) answer = flagged.text;
  return typeof answer === 'string' ? { question, options, answer } : null;
}

/** Every question found anywhere inside a literal (English only when a value is split by language). */
function collectQuestions(value: Literal, out: AuditQuestion[]) {
  if (Array.isArray(value)) {
    value.forEach((item) => {
      const question = asQuestion(item);
      if (question) out.push(question);
      else collectQuestions(item, out);
    });
  } else if (value && typeof value === 'object') {
    const entries = 'en' in value && 'id' in value ? [value.en] : Object.values(value);
    entries.forEach((item) => collectQuestions(item, out));
  }
}

export function inlineQuestions(source: string): AuditQuestion[] {
  const file = ts.createSourceFile('lesson.tsx', source, ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
  const questions: AuditQuestion[] = [];
  file.statements.forEach((statement) => {
    if (!ts.isVariableStatement(statement)) return;
    statement.declarationList.declarations.forEach((declaration) => {
      if (declaration.initializer) collectQuestions(literal(declaration.initializer), questions);
    });
  });
  return questions;
}

function lessonNumber(path: string) {
  return Number(path.match(/(\d+)\.tsx$/)?.[1] ?? 0);
}

function groupBy(sources: Record<string, string>, language: string, levelOf: (path: string) => string): Group[] {
  const groups = new Map<string, AuditLesson[]>();
  Object.entries(sources)
    .sort(([a], [b]) => a.localeCompare(b) || lessonNumber(a) - lessonNumber(b))
    .forEach(([path, source]) => {
      const practice = inlineQuestions(source);
      if (!practice.length) return;
      const level = levelOf(path);
      const lessons = groups.get(level) ?? [];
      lessons.push({
        key: path.split('/').pop()!.replace('.tsx', ''),
        title: path,
        practice,
        fingerprint: JSON.stringify(practice.map((item) => [item.question, item.answer, [...item.options].sort()])),
      });
      groups.set(level, lessons);
    });
  return [...groups.entries()].map(([level, lessons]) => ({ language, level, lessons }));
}

export function collectEnglishInlineLessons(): Group[] {
  return [
    ...groupBy(moduleSources, 'english', (path) => path.split('/english/')[1].split('/').slice(0, 2).join('/')),
    ...groupBy(practiceSources, 'english-latihan', (path) => path.split('/english/')[1].split('/')[0]),
  ];
}
