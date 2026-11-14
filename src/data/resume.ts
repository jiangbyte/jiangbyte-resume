/** 简历内容：结构对齐博客 about.md，供 resume 子站排版 */

export const profile = {
  name: 'Charlie',
  role: 'AI 全栈研发',
  location: '贵州',
  education: '计算机科学与技术本科',
  summary:
    '现居贵州。计算机科学与技术本科，目前从事 AI 全栈研发。业余维护个人博客，记录常用工具、排查与项目等。',
  tagline: '全栈 / 嵌入式 / AI',
} as const;

export type ExperienceItem = {
  period: string;
  title: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: '2026.03 – 至今',
    title: 'AI 全栈',
    summary:
      '负责全栈研发与交付，覆盖大文件媒体链路、ERP、分布式预约履约与内部 RAG 知识库等方向：',
    highlights: [
      '大文件上传：自适应分片、并发上传与断点续传；会话状态存于缓存，数据直传对象存储，并完成端到端完整性校验。',
      '异步媒体处理：探测、改封装与转码拆为消息队列任务，多节点租约互斥消费，避免重复处理。',
      '统一存储与交付：存储接口层屏蔽本地 / 云厂商差异；配套权限与文档网盘；支持容器与裸机，应用层可水平扩展。',
      'ERP：主数据、单据流转、库存 / 结算与报表等模块的需求澄清、原型 / UI 及前后端实现与上线。',
      '分布式预约履约：入驻 → 下单 → 派单 → 履约闭环；高频列表结合索引优化；支付回调幂等；接入 AI 咨询。',
      '内部 RAG 知识库：Spring AI 多知识库入库与检索；会话记忆、按库过滤与流式输出；Tools 支持业务内查询。',
    ],
  },
  {
    period: '2025.07 – 2025.11',
    title: '平台研发（实习）',
    summary: '参与省 / 州级平台的迭代交付与稳定性治理，业务形态覆盖监测预警与公共服务：',
    highlights: [
      '流水号与一致性：并发场景下基于缓存原子计数保证编号唯一且连续。',
      '风险评估计算：落地算法框架，对设备上报数据并行计算；按协议对接设备并二次转换入库。',
      '数据质量：定位业务编码错误导致的脏数据，完成修复与联调。',
      '复杂查询与索引：动态条件组装（嵌套 OR、时间范围、模糊匹配）并结合覆盖索引保障性能。',
      '区域策略与防重：按管辖区域限定参与范围，缓存防重并支持批量统计。',
      '小程序联调：按 UI 规范调整交互与接口，完成联调与验收上线。',
    ],
  },
  {
    period: '2024.08 – 2025.09',
    title: '编程实训平台（主导）',
    summary: '多语言实训系统（Java / Go / Python 等），含 AI 辅导与代码相似度检测；负责整体推进与核心模块落地：',
    highlights: [
      '查重报告短链：MurmurHash3 + Base62 生成短码，结合 Redis 去重与查询。',
      '相似计算服务：成对相似计算拆为 Go 微服务；Redis 队列 + 多协程异步消费。',
      '提交接口幂等：Redis + Spring AOP 低侵入防重，同一业务键仅生效一次。',
      '多语言词法解析：策略 + 工厂管理解析器；ThreadLocal 隔离，ConcurrentHashMap 复用。',
      '智能辅导：Spring AI + RAG 接入题目 / 规则文档，Tools 完成题目查询与代码分析，按会话生成学习反馈。',
    ],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: '语言', items: ['Java', 'Python', 'Go', '.NET'] },
  {
    label: '后端',
    items: ['Spring Boot / Cloud', 'MyBatis-Plus', 'FastAPI', 'JUC', 'JVM 基础'],
  },
  { label: '数据', items: ['MySQL', 'Redis', '对象存储', '消息队列'] },
  { label: '前端', items: ['TypeScript', 'Vue3', 'Vite', 'Pinia', 'uni-app'] },
  {
    label: '工程',
    items: ['Docker / Compose', 'Git', 'Jenkins', '需求 → 设计 → 实现 → 发布'],
  },
  {
    label: 'AI',
    items: ['Cursor / Codex / Workbuddy', 'Claude / DeepSeek / Qwen', 'Spring AI', 'RAG', 'Tools / Agent'],
  },
];

export const contact = {
  wechat: 'jiang_byte',
  wechatNote: '备注来意',
  email: 'jiangbytebiz@163.com',
  github: 'https://github.com/jiangbyte',
  gitee: 'https://gitee.com/jiangbyte',
  org: 'https://github.com/jiangfolio',
} as const;

export const projectsNote =
  '业余会做一些开源与自用工具；代码托管在 GitHub 组织 jiangfolio（个人名下组织，非公司主体）。更多笔记见博客项目集。';
