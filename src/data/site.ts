/** 站点偏好：键名对齐博客，同域可共享阅读/通用设置 */

export const FONT_PRESETS = ['round', 'system', 'serif', 'wenkai'] as const;
export type FontPreset = (typeof FONT_PRESETS)[number];

export type MotionLevel = 'lively' | 'subtle' | 'reduced';

export const READER_DEFAULTS = {
  fontPreset: 'round' as FontPreset,
  fontSize: 16,
  lineHeight: 1.8,
  measure: null as number | null,
  justify: false,
};

export const READER_CUSTOM_MEASURE = 65;

export const GENERAL_DEFAULTS = {
  scrollProgress: true,
  /** 简历站装饰：雪花（对应博客封面海浪开关位） */
  snow: true,
  motion: 'lively' as MotionLevel,
};

export const STORAGE_KEYS = {
  theme: 'theme',
  fontPreset: 'reader-font-preset',
  fontFamily: 'reader-font-family',
  fontSize: 'reader-font-size',
  lineHeight: 'reader-line-height',
  measure: 'reader-measure',
  justify: 'reader-justify',
  scrollProgress: 'site-scroll-progress',
  motionLevel: 'site-motion-level',
  /** 复用博客 wave 键；本站语义为雪花 */
  snow: 'site-wave',
} as const;

export const WENKAI_STYLESHEET_ID = 'lxgw-wenkai-webfont';
export const WENKAI_STYLESHEET_HREF = 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css';

export const MOTION_HINTS: Record<MotionLevel, string> = {
  lively: '入场过渡与雪花特效全开',
  subtle: '保留过渡，关闭雪花特效',
  reduced: '只保留必要的交互反馈',
};

export const FONT_PRESET_LABELS: Record<FontPreset | 'local', string> = {
  round: '圆体',
  system: '系统黑体',
  serif: '衬线',
  wenkai: '文楷',
  local: '本机字体',
};
