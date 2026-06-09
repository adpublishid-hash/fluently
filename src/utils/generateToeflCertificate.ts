import jsPDF from 'jspdf';

interface SectionResult {
  title: string;
  raw: number;
  scaled: number;
  total: number;
}

interface CertificateOptions {
  studentName: string;
  totalScore: number;
  sections: SectionResult[];
  submittedAt: string;
}

// ─── Colour palette ────────────────────────────────────────────────────────
const C = {
  navyDeep:    '#071B36',
  navyMid:     '#0D2B55',
  navyLight:   '#1A3F6F',
  blue:        '#1E6F9F',
  accent:      '#4FA3D1',
  accentLight: '#7DC0E4',
  gold:        '#C9A84C',
  goldLight:   '#E8C96A',
  goldPale:    '#F5DFA0',
  cream:       '#FDFCF5',
  offWhite:    '#F2F6FA',
  white:       '#FFFFFF',
  gray:        '#6B7280',
  grayLight:   '#9CA3AF',
  darkText:    '#0D1B2A',
} as const;

// ─── Helpers ───────────────────────────────────────────────────────────────
function rgb(hex: string): [number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  return [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)];
}
const fill  = (doc: jsPDF, h: string) => doc.setFillColor(...rgb(h));
const draw  = (doc: jsPDF, h: string) => doc.setDrawColor(...rgb(h));
const color = (doc: jsPDF, h: string) => doc.setTextColor(...rgb(h));

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
function certId(iso: string, score: number) {
  const d = new Date(iso);
  return `TLK-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${score}`;
}
function getLevel(s: number) {
  if (s >= 580) return { label: 'Advanced',           color: '#0E7C4A' };
  if (s >= 490) return { label: 'Upper Intermediate',  color: '#1E6F9F' };
  if (s >= 400) return { label: 'Intermediate',        color: '#C9A84C' };
  return               { label: 'Elementary',          color: '#9CA3AF' };
}

// ─── Decorative helpers ────────────────────────────────────────────────────

/** Gradient-effect header: stack of horizontal bands dark→light */
function headerGradient(doc: jsPDF, x: number, y: number, w: number, h: number) {
  const bands = [
    { pct: 0,   hex: C.navyDeep  },
    { pct: 0.3, hex: C.navyMid   },
    { pct: 0.6, hex: C.navyLight },
    { pct: 0.85,hex: C.navyMid   },
    { pct: 1,   hex: C.navyDeep  },
  ];
  for (let i = 0; i < bands.length - 1; i++) {
    const yStart = y + bands[i].pct   * h;
    const yEnd   = y + bands[i + 1].pct * h;
    fill(doc, bands[i].hex);
    doc.rect(x, yStart, w, yEnd - yStart + 0.1, 'F');
  }
}

/** Double-L corner bracket ornaments (gold) at the four corners of a rect */
function cornerOrnaments(doc: jsPDF, x: number, y: number, w: number, h: number, arm = 9, gap = 2.5) {
  draw(doc, C.gold);
  doc.setLineWidth(0.9);
  const corners: Array<[number, number, number, number, number, number, number, number]> = [
    // [x, y, hEnd, vEnd, ix, iy, ihEnd, ivEnd]
    [x,     y,     x + arm, y,       x + gap, y + gap, x + arm, y + gap],
    [x + w, y,     x+w-arm, y,       x+w-gap, y + gap, x+w-arm, y + gap],
    [x,     y + h, x + arm, y + h,   x + gap, y+h-gap, x + arm, y+h-gap],
    [x + w, y + h, x+w-arm, y + h,   x+w-gap, y+h-gap, x+w-arm, y+h-gap],
  ];
  corners.forEach(([ax, ay, bx, by, cx2, cy2, dx, dy]) => {
    doc.line(ax, ay, ax, by); // vertical outer
    doc.line(ax, ay, bx, ay); // horizontal outer
    draw(doc, C.goldPale);
    doc.setLineWidth(0.4);
    doc.line(cx2, cy2, cx2, dy); // vertical inner
    doc.line(cx2, cy2, dx,  cy2); // horizontal inner
    draw(doc, C.gold);
    doc.setLineWidth(0.9);
  });
}

/** Simple circle (jsPDF ellipse shorthand) */
function circle(doc: jsPDF, cx2: number, cy: number, r: number, style: 'S' | 'F' | 'FD') {
  doc.ellipse(cx2, cy, r, r, style);
}

/** Horizontal score bar */
function scoreBar(doc: jsPDF, x: number, y: number, w: number, h: number, pct: number, barColor: string) {
  fill(doc, C.offWhite);
  draw(doc, C.grayLight);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, w, h, h / 2, h / 2, 'FD');

  fill(doc, barColor);
  draw(doc, barColor);
  doc.roundedRect(x, y, Math.max(w * pct, h), h, h / 2, h / 2, 'F');
}

/** Small diamond ornament ◆ via 4 lines */
function diamond(doc: jsPDF, cx2: number, cy: number, s = 3) {
  fill(doc, C.gold);
  draw(doc, C.gold);
  doc.setLineWidth(0);
  // top→right→bottom→left→close
  doc.lines([[s, s], [s, -s], [-s, -s], [-s, s]], cx2 - s, cy, [0.5, 0.5], 'F');
}

/** Background watermark: very light repeated pattern */
function watermark(doc: jsPDF, W: number, H: number) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(60);
  color(doc, '#E8EFF7');
  const positions: [number, number][] = [[W * 0.25, H * 0.48], [W * 0.72, H * 0.58]];
  positions.forEach(([px, py]) => {
    doc.text('TALKY', px, py, { align: 'center', angle: -28 });
  });
}

// ─── Main generator ────────────────────────────────────────────────────────
export function createToeflCertificateDoc(options: CertificateOptions): jsPDF {
  const { studentName, totalScore, sections, submittedAt } = options;

  const doc  = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W    = 297;
  const H    = 210;
  const cx   = W / 2;
  const name = studentName?.trim() || 'Valued Learner';
  const level = getLevel(totalScore);
  const id    = certId(submittedAt, totalScore);

  // ── 1. Background ────────────────────────────────────────────────────────
  fill(doc, C.cream);
  doc.rect(0, 0, W, H, 'F');
  watermark(doc, W, H);

  // ── 2. Borders ───────────────────────────────────────────────────────────
  // Outermost thick gold
  draw(doc, C.gold);
  doc.setLineWidth(2);
  doc.rect(4, 4, W - 8, H - 8, 'S');

  // Thin gold secondary
  draw(doc, C.goldLight);
  doc.setLineWidth(0.4);
  doc.rect(7, 7, W - 14, H - 14, 'S');

  // Navy inner frame
  draw(doc, C.navyMid);
  doc.setLineWidth(0.6);
  doc.rect(10, 10, W - 20, H - 20, 'S');

  // Corner ornaments (on the inner frame)
  cornerOrnaments(doc, 10, 10, W - 20, H - 20, 11, 3);

  // ── 3. Header ────────────────────────────────────────────────────────────
  const hdrY = 10;
  const hdrH = 34;
  headerGradient(doc, 10, hdrY, W - 20, hdrH);

  // Gold accent lines at header top and bottom
  fill(doc, C.gold);
  doc.rect(10, hdrY, W - 20, 1.2, 'F');
  doc.rect(10, hdrY + hdrH - 1.2, W - 20, 1.2, 'F');

  // Vertical gold pin dividers inside header
  fill(doc, C.gold);
  doc.rect(50, hdrY + 5, 0.5, hdrH - 10, 'F');
  doc.rect(W - 50, hdrY + 5, 0.5, hdrH - 10, 'F');

  // Left emblem circle
  const embX = 30;
  const embY = hdrY + hdrH / 2;
  draw(doc, C.gold);
  doc.setLineWidth(0.8);
  circle(doc, embX, embY, 11, 'S');
  draw(doc, C.goldPale);
  doc.setLineWidth(0.4);
  circle(doc, embX, embY, 8.5, 'S');
  fill(doc, C.gold);
  circle(doc, embX, embY, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  color(doc, C.navyDeep);
  doc.text('T', embX, embY + 3.2, { align: 'center' });

  // App name & tagline in header centre
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  color(doc, C.goldPale);
  doc.text('TALKY', cx, hdrY + 13, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  color(doc, C.accentLight);
  doc.text('English Learning Platform  ·  Official Assessment Record', cx, hdrY + 20, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  color(doc, C.goldPale);
  doc.text('TOEFL PBT PRACTICE SERIES', cx, hdrY + 27, { align: 'center' });

  // Cert ID top-right of header
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  color(doc, C.grayLight);
  doc.text(`CERT NO.  ${id}`, W - 16, hdrY + 13, { align: 'right' });

  // ── 4. Certificate title ─────────────────────────────────────────────────
  const titleY = hdrY + hdrH + 14;
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  color(doc, C.navyMid);
  doc.text('Certificate of Completion', cx, titleY, { align: 'center' });

  // Ornament line with centre diamond
  const ornY = titleY + 5;
  draw(doc, C.gold);
  doc.setLineWidth(0.6);
  doc.line(cx - 60, ornY, cx - 5, ornY);
  doc.line(cx + 5, ornY, cx + 60, ornY);
  diamond(doc, cx, ornY, 2.2);

  // ── 5. Certify text + Name ───────────────────────────────────────────────
  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  color(doc, C.gray);
  doc.text('This is to certify that', cx, ornY + 10, { align: 'center' });

  // Name container — lightly tinted box
  const nameBoxW = 175;
  const nameBoxH = 14;
  const nameBoxX = cx - nameBoxW / 2;
  const nameBoxY = ornY + 13;

  fill(doc, '#EEF5FB');
  draw(doc, C.accent);
  doc.setLineWidth(0.4);
  doc.roundedRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH, 3, 3, 'FD');

  // Gold left accent bar inside name box
  fill(doc, C.gold);
  doc.roundedRect(nameBoxX, nameBoxY, 3, nameBoxH, 1.5, 1.5, 'F');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  color(doc, C.navyDeep);
  doc.text(name.toUpperCase(), cx, nameBoxY + 10, { align: 'center' });

  // ── 6. Test description ──────────────────────────────────────────────────
  const descY = nameBoxY + nameBoxH + 8;
  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  color(doc, C.gray);
  doc.text('has successfully completed the', cx, descY, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(12.5);
  color(doc, C.blue);
  doc.text('TOEFL Practice Test 1  (PBT Format)', cx, descY + 7, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  color(doc, C.grayLight);
  doc.text('conducted via the Talky English Learning Platform  ·  ' + formatDate(submittedAt), cx, descY + 14, { align: 'center' });

  // ── 7. Score + Sections (two-column) ─────────────────────────────────────
  const panelY   = descY + 20;
  const panelH   = 36;
  const leftX    = 16;
  const leftW    = 115;
  const rightX   = 140;
  const rightW   = 142;

  // ── Left panel: score card ───────────────────────────────────────────────
  fill(doc, C.navyDeep);
  draw(doc, C.gold);
  doc.setLineWidth(0.7);
  doc.roundedRect(leftX, panelY, leftW, panelH, 4, 4, 'FD');

  // Score label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  color(doc, C.goldPale);
  doc.text('ESTIMATED TOEFL PBT SCORE', leftX + leftW / 2, panelY + 7, { align: 'center' });

  // Score number — large
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  color(doc, C.white);
  doc.text(String(totalScore), leftX + leftW / 2, panelY + 24, { align: 'center' });

  // Score ring decoration (thin arcs around the number)
  draw(doc, C.gold);
  doc.setLineWidth(0.5);
  circle(doc, leftX + leftW / 2, panelY + 19, 16, 'S');
  draw(doc, C.navyLight);
  doc.setLineWidth(0.3);
  circle(doc, leftX + leftW / 2, panelY + 19, 18.5, 'S');

  // Level badge
  const lvlBadgeW = 54;
  const lvlBadgeX = leftX + (leftW - lvlBadgeW) / 2;
  const lvlBadgeY = panelY + panelH - 10;
  fill(doc, level.color);
  draw(doc, level.color);
  doc.roundedRect(lvlBadgeX, lvlBadgeY, lvlBadgeW, 7, 3.5, 3.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  color(doc, C.white);
  doc.text(level.label.toUpperCase(), leftX + leftW / 2, lvlBadgeY + 5, { align: 'center' });

  // ── Right panel: section breakdown ───────────────────────────────────────
  fill(doc, C.offWhite);
  draw(doc, C.navyMid);
  doc.setLineWidth(0.5);
  doc.roundedRect(rightX, panelY, rightW, panelH, 4, 4, 'FD');

  // Panel header
  fill(doc, C.navyMid);
  doc.roundedRect(rightX, panelY, rightW, 8, 4, 4, 'F');
  doc.rect(rightX, panelY + 4, rightW, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  color(doc, C.goldPale);
  doc.text('SECTION SCORE BREAKDOWN', rightX + rightW / 2, panelY + 5.8, { align: 'center' });

  // Section bars
  const maxScaled = 68;
  const sectionColors = [C.blue, C.navyMid, C.accent];
  const barAreaX = rightX + 22;
  const barW     = rightW - 48;
  const barH     = 5;

  sections.forEach((sec, i) => {
    const rowY   = panelY + 13 + i * 8;
    const pct    = sec.scaled / maxScaled;
    const barCol = sectionColors[i % sectionColors.length];

    // Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    color(doc, C.navyMid);
    doc.text(sec.title, rightX + 4, rowY + 4, { align: 'left' });

    // Bar
    scoreBar(doc, barAreaX, rowY, barW, barH, pct, barCol);

    // Score value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    color(doc, C.navyDeep);
    doc.text(String(sec.scaled), barAreaX + barW + 4, rowY + 4.2, { align: 'left' });

    // Raw correct small
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    color(doc, C.grayLight);
    doc.text(`(${sec.raw}/${sec.total})`, barAreaX + barW + 14, rowY + 4.2, { align: 'left' });
  });

  // ── 8. Footer ────────────────────────────────────────────────────────────
  const footY = H - 28;

  // Footer divider line
  draw(doc, C.gold);
  doc.setLineWidth(0.5);
  doc.line(16, footY, W - 16, footY);

  // Three footer columns: Director | Seal | Date
  const col1X = 35;
  const col3X = W - 35;

  // Director signature
  draw(doc, C.navyMid);
  doc.setLineWidth(0.5);
  doc.line(col1X - 22, footY + 10, col1X + 22, footY + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  color(doc, C.navyMid);
  doc.text('Academic Director', col1X, footY + 14, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  color(doc, C.gray);
  doc.text('Talky Learning Services', col1X, footY + 19, { align: 'center' });

  // Central seal
  const sealCX = cx;
  const sealCY = footY + 9;

  draw(doc, C.gold);
  doc.setLineWidth(0.7);
  circle(doc, sealCX, sealCY, 12, 'S');

  draw(doc, C.navyMid);
  doc.setLineWidth(0.4);
  circle(doc, sealCX, sealCY, 9.5, 'S');

  fill(doc, C.navyMid);
  circle(doc, sealCX, sealCY, 7.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  color(doc, C.gold);
  doc.text('T', sealCX, sealCY + 3.5, { align: 'center' });

  // "VERIFIED" arc text (approximated as straight text under seal)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  color(doc, C.gold);
  doc.text('✦  VERIFIED  ✦', sealCX, footY + 21.5, { align: 'center' });

  // Date of issue
  draw(doc, C.navyMid);
  doc.setLineWidth(0.5);
  doc.line(col3X - 22, footY + 10, col3X + 22, footY + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  color(doc, C.navyMid);
  doc.text('Date of Issue', col3X, footY + 14, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  color(doc, C.gray);
  doc.text(formatDate(submittedAt), col3X, footY + 19, { align: 'center' });

  // ── 9. Disclaimer strip ───────────────────────────────────────────────────
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(5.5);
  color(doc, C.grayLight);
  doc.text(
    'This certificate is issued based on a simulated practice examination and does not constitute an official ETS TOEFL® score report.',
    cx, H - 8, { align: 'center' },
  );

  // Bottom gold footer bar
  fill(doc, C.gold);
  doc.rect(10, H - 10.5, W - 20, 1, 'F');

  return doc;
}

export function getToeflCertificateFileName(options: Pick<CertificateOptions, 'studentName' | 'totalScore'>): string {
  const safeName = (options.studentName?.trim() || 'Valued_Learner').replace(/[^a-z0-9]+/gi, '_');
  return `TOEFL_Certificate_${safeName}_${options.totalScore}.pdf`;
}

export function generateToeflCertificate(options: CertificateOptions): void {
  const doc = createToeflCertificateDoc(options);
  doc.save(getToeflCertificateFileName(options));
}

export function generateToeflCertificateBase64(options: CertificateOptions): { fileName: string; base64: string } {
  const doc = createToeflCertificateDoc(options);
  const dataUri = doc.output('datauristring');
  return {
    fileName: getToeflCertificateFileName(options),
    base64: dataUri.split(',')[1] || '',
  };
}
