/** 外链与站点元信息（根域博客 + jiangfolio；本仓为 resume 子站） */
export const links = {
  blog: 'https://jiangbyte.cn',
  blogProjects: 'https://jiangbyte.cn/projects',
  githubOrg: 'https://github.com/jiangfolio',
  githubUser: 'https://github.com/jiangbyte',
  gitee: 'https://gitee.com/jiangbyte',
} as const;

/** GitHub 用户名头像：随账号更换自动更新（GitHub CDN 短缓存） */
export const githubAvatar = {
  user: 'jiangbyte',
  /** 按用户名解析，不写死 avatar id，换头像后无需改代码 */
  src: 'https://github.com/jiangbyte.png?size=240',
  src2x: 'https://github.com/jiangbyte.png?size=480',
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
