# LeetCode 算法题指南

> 系统化学习数据结构与算法，深入理解 LeetCode 经典题目

## 🚀 项目介绍

**LeetCode 算法题指南** 是一个基于 VitePress 构建的静态文档网站，参考 [Hello-Agents](https://hello-agents.datawhale.cc) 的设计风格，将 LeetCode 上的算法题目按主题分类，提供系统的学习路径和深入的题目解析。

### 核心特色

- 📊 **16 大算法主题** — 从数组到动态规划，从图论到位运算，全面覆盖
- 🎯 **72 个子主题深入剖析** — 每个主题拆解为多个子主题，由浅入深
- 🔗 **300+ LeetCode 原题链接** — 标注难度等级，一键跳转在线练习
- 💡 **Python 代码示例** — 核心题配有完整可运行的代码实现
- ⚡ **复杂度分析** — 每个算法和数据结构配有时空复杂度分析
- 🌙 **深色/浅色双模式** — 支持主题切换，护眼阅读

## 🗂️ 内容结构

```
leetcode-guide/
├── index.md                    # 首页
├── guide/                      # 入门指南
│   ├── getting-started.md      # 快速开始
│   └── how-to-use.md           # 使用指南
└── topics/                     # 16 个算法主题
    ├── array-string/           # 数组与字符串
    ├── linked-list/            # 链表
    ├── stack-queue/            # 栈与队列
    ├── hash-table/             # 哈希表
    ├── tree/                   # 树与二叉树
    ├── graph/                  # 图
    ├── heap/                   # 堆
    ├── sorting-searching/      # 排序与搜索
    ├── dynamic-programming/    # 动态规划
    ├── backtracking/           # 回溯算法
    ├── greedy/                 # 贪心算法
    ├── two-pointers/           # 双指针
    ├── sliding-window/         # 滑动窗口
    ├── union-find/             # 并查集
    ├── bit-manipulation/       # 位运算
    └── math/                   # 数学技巧
```

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📦 技术栈

- [VitePress](https://vitepress.dev/) — Vue 驱动的静态站点生成器
- [Vue 3](https://vuejs.org/) — Composition API
- Markdown — 内容驱动，零门槛编写

## 🚢 部署

构建后将 `.vitepress/dist` 目录部署到任何静态托管服务：

```bash
npm run build
# 将 .vitepress/dist 部署到 GitHub Pages / Vercel / Netlify
```

## 📄 许可

MIT License
