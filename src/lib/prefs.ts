/**
 * 读写并应用站点偏好到 documentElement（对齐博客 settings store 行为）。
 */

import {
  type FontPreset,
  FONT_PRESETS,
  GENERAL_DEFAULTS,
  type MotionLevel,
  READER_CUSTOM_MEASURE,
  READER_DEFAULTS,
  STORAGE_KEYS,
  WENKAI_STYLESHEET_HREF,
  WENKAI_STYLESHEET_ID,
} from '@/data/site';

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function loadWenkai(): void {
  if (document.getElementById(WENKAI_STYLESHEET_ID)) return;
  const link = document.createElement('link');
  link.id = WENKAI_STYLESHEET_ID;
  link.rel = 'stylesheet';
  link.href = WENKAI_STYLESHEET_HREF;
  document.head.appendChild(link);
}

export type ThemeMode = 'light' | 'dark' | 'system';

export function getTheme(): ThemeMode {
  const v = read(STORAGE_KEYS.theme);
  if (v === 'light' || v === 'dark') return v;
  return 'system';
}

export function setTheme(mode: ThemeMode): void {
  if (mode === 'system') remove(STORAGE_KEYS.theme);
  else write(STORAGE_KEYS.theme, mode);
  applyTheme();
}

export function applyTheme(): void {
  const mode = getTheme();
  const dark =
    mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}

export function getFontPreset(): FontPreset {
  const v = read(STORAGE_KEYS.fontPreset);
  return FONT_PRESETS.includes(v as FontPreset) ? (v as FontPreset) : READER_DEFAULTS.fontPreset;
}

export function getLocalFont(): string | null {
  return read(STORAGE_KEYS.fontFamily);
}

export function setFontPreset(preset: FontPreset): void {
  write(STORAGE_KEYS.fontPreset, preset);
  remove(STORAGE_KEYS.fontFamily);
  if (preset === 'wenkai') loadWenkai();
  applyReader();
}

export function setLocalFont(family: string): void {
  const normalized = family.trim().slice(0, 128);
  if (!normalized) return;
  write(STORAGE_KEYS.fontFamily, normalized);
  applyReader();
}

export function getFontSize(): number {
  const n = Number(read(STORAGE_KEYS.fontSize));
  return Number.isFinite(n) && n > 0 ? n : READER_DEFAULTS.fontSize;
}

export function setFontSize(px: number): void {
  if (!Number.isFinite(px) || px <= 0) return;
  write(STORAGE_KEYS.fontSize, String(px));
  applyReader();
}

export function getLineHeight(): number {
  const n = Number(read(STORAGE_KEYS.lineHeight));
  return Number.isFinite(n) && n > 0 ? n : READER_DEFAULTS.lineHeight;
}

export function setLineHeight(v: number): void {
  if (!Number.isFinite(v) || v <= 0) return;
  write(STORAGE_KEYS.lineHeight, String(v));
  applyReader();
}

export function getMeasure(): number | null {
  const raw = read(STORAGE_KEYS.measure);
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function setMeasure(ch: number | null): void {
  if (ch === null) {
    remove(STORAGE_KEYS.measure);
  } else {
    if (!Number.isFinite(ch) || ch <= 0) return;
    write(STORAGE_KEYS.measure, String(ch));
  }
  applyReader();
}

export function getJustify(): boolean {
  const v = read(STORAGE_KEYS.justify);
  if (v === null) return READER_DEFAULTS.justify;
  return v === 'true';
}

export function setJustify(on: boolean): void {
  write(STORAGE_KEYS.justify, String(on));
  applyReader();
}

export function getScrollProgress(): boolean {
  const v = read(STORAGE_KEYS.scrollProgress);
  if (v === null) return GENERAL_DEFAULTS.scrollProgress;
  return v !== 'false';
}

export function setScrollProgress(on: boolean): void {
  write(STORAGE_KEYS.scrollProgress, String(on));
  applyGeneral();
}

export function getMotion(): MotionLevel {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced';
  const v = read(STORAGE_KEYS.motionLevel);
  if (v === 'lively' || v === 'subtle' || v === 'reduced') return v;
  return GENERAL_DEFAULTS.motion;
}

/** 用户选择的档位（不受系统 reduce 覆盖，用于 UI 高亮） */
export function getMotionChoice(): MotionLevel {
  const v = read(STORAGE_KEYS.motionLevel);
  if (v === 'lively' || v === 'subtle' || v === 'reduced') return v;
  return GENERAL_DEFAULTS.motion;
}

export function setMotion(level: MotionLevel): void {
  write(STORAGE_KEYS.motionLevel, level);
  applyGeneral();
}

export function getSnow(): boolean {
  const v = read(STORAGE_KEYS.snow);
  if (v === null) return GENERAL_DEFAULTS.snow;
  return v !== 'false';
}

export function setSnow(on: boolean): void {
  write(STORAGE_KEYS.snow, String(on));
  applyGeneral();
}

export function shouldRunSnow(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (getMotion() !== 'lively') return false;
  return getSnow();
}

export function applyReader(): void {
  const root = document.documentElement;
  const fontSize = getFontSize();
  // 1. 变量只给 #site-content 用；设置弹窗 / chrome 不读这些
  root.style.setProperty('--reader-font-size', `${fontSize}px`);
  root.style.setProperty('--reader-line-height', String(getLineHeight()));
  // 2. 行宽：null=自动 48rem；有值则按博客公式 ch→px
  const measure = getMeasure();
  if (measure === null) root.style.removeProperty('--reader-measure');
  else root.style.setProperty('--reader-measure', `${measure * 0.5 * fontSize}px`);

  // 3. 字体预设 / 本机字体
  const local = getLocalFont();
  if (local) {
    root.dataset.readerFont = 'local';
    root.style.setProperty('--reader-font-family', `"${local.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
    delete root.dataset.fontPreset;
  } else {
    delete root.dataset.readerFont;
    root.style.removeProperty('--reader-font-family');
    const preset = getFontPreset();
    root.dataset.fontPreset = preset;
    if (preset === 'wenkai') loadWenkai();
  }
  root.classList.toggle('reader-justify', getJustify());
}

export function applyGeneral(): void {
  const root = document.documentElement;
  const level = getMotion();
  root.dataset.motion = level;
  root.classList.toggle('motion-off', level === 'reduced');
  root.classList.toggle('snow-off', !getSnow() || level !== 'lively');
  root.classList.toggle('scroll-progress-off', !getScrollProgress());
}

/** 启动时一次性应用全部偏好 */
export function applyAllPrefs(): void {
  applyTheme();
  applyReader();
  applyGeneral();
}

/** 仅重置阅读相关偏好（对齐博客 resetReaderPreferences） */
export function resetReaderPreferences(): void {
  setFontPreset(READER_DEFAULTS.fontPreset);
  setFontSize(READER_DEFAULTS.fontSize);
  setLineHeight(READER_DEFAULTS.lineHeight);
  setMeasure(READER_DEFAULTS.measure);
  setJustify(READER_DEFAULTS.justify);
}

export { READER_CUSTOM_MEASURE, READER_DEFAULTS };
