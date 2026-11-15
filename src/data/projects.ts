/** 外链与站点元信息（根域博客 + jiangfolio；本仓为 resume 子站） */
export const links = {
  blog: 'https://jiangbyte.cn',
  blogProjects: 'https://jiangbyte.cn/projects',
  githubOrg: 'https://github.com/jiangfolio',
  githubUser: 'https://github.com/jiangbyte',
  gitee: 'https://gitee.com/jiangbyte',
} as const;

/** 头像：本地静态资源（来自 jiangfolio 组织头像，避免依赖 GitHub CDN） */
export const githubAvatar = {
  user: 'jiangfolio',
  src: '/avatar.webp',
  src2x: '/avatar.webp',
} as const;

export const siteMeta = {
  name: 'Charlie',
  /** 站名 / 顶栏展示 */
  title: "Charlie's Resume",
  icp: {
    text: '黔ICP备2026018565号-1',
    link: 'https://beian.miit.gov.cn/',
  },
  police: {
    text: '贵公网安备52260102556648号',
    link: 'https://beian.mps.gov.cn/#/query/webSearch?code=52260102556648',
    icon: '/beian.png',
  },
  startYear: 2026,
} as const;
