import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LeetCode 算法题指南',
  description: '系统化学习数据结构与算法，深入理解LeetCode经典题目',
  lang: 'zh-CN',
  lastUpdated: true,
  base: '/leetcode-guide/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#FFA116' }],
    ['meta', { name: 'keywords', content: 'LeetCode,算法,数据结构,面试,编程,刷题指南' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'LeetCode 算法题指南',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '算法主题',
        items: [
          { text: '数组与字符串', link: '/topics/array-string/' },
          { text: '链表', link: '/topics/linked-list/' },
          { text: '栈与队列', link: '/topics/stack-queue/' },
          { text: '哈希表', link: '/topics/hash-table/' },
          { text: '树与二叉树', link: '/topics/tree/' },
          { text: '图', link: '/topics/graph/' },
          { text: '堆', link: '/topics/heap/' },
          { text: '排序与搜索', link: '/topics/sorting-searching/' },
          { text: '动态规划', link: '/topics/dynamic-programming/' },
          { text: '回溯算法', link: '/topics/backtracking/' },
          { text: '贪心算法', link: '/topics/greedy/' },
          { text: '双指针', link: '/topics/two-pointers/' },
          { text: '滑动窗口', link: '/topics/sliding-window/' },
          { text: '并查集', link: '/topics/union-find/' },
          { text: '位运算', link: '/topics/bit-manipulation/' },
          { text: '数学技巧', link: '/topics/math/' },
        ],
      },
      { text: '使用指南', link: '/guide/how-to-use' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '常见问题', link: '/guide/faq' },
      { text: '关于', link: '/guide/about' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '使用指南', link: '/guide/how-to-use' },
            { text: '常见问题', link: '/guide/faq' },
            { text: '关于本站', link: '/guide/about' },
          ],
        },
      ],

      '/topics/array-string/': [
        {
          text: '数组与字符串',
          items: [
            { text: '概述', link: '/topics/array-string/' },
            { text: '遍历技巧', link: '/topics/array-string/traversal' },
            { text: '前缀和', link: '/topics/array-string/prefix-sum' },
            { text: '差分数组', link: '/topics/array-string/difference-array' },
            { text: '字符串匹配', link: '/topics/array-string/string-matching' },
            { text: '双串问题', link: '/topics/array-string/two-strings' },
          ],
        },
      ],

      '/topics/linked-list/': [
        {
          text: '链表',
          items: [
            { text: '概述', link: '/topics/linked-list/' },
            { text: '遍历与反转', link: '/topics/linked-list/traversal-reverse' },
            { text: '快慢指针', link: '/topics/linked-list/fast-slow-pointers' },
            { text: '合并链表', link: '/topics/linked-list/merge-lists' },
            { text: '环形链表', link: '/topics/linked-list/cycle-detection' },
            { text: 'LRU缓存', link: '/topics/linked-list/lru-cache' },
          ],
        },
      ],

      '/topics/stack-queue/': [
        {
          text: '栈与队列',
          items: [
            { text: '概述', link: '/topics/stack-queue/' },
            { text: '单调栈', link: '/topics/stack-queue/monotonic-stack' },
            { text: '括号匹配', link: '/topics/stack-queue/bracket-matching' },
            { text: '队列应用', link: '/topics/stack-queue/queue-applications' },
            { text: '优先队列', link: '/topics/stack-queue/priority-queue' },
            { text: '双端队列', link: '/topics/stack-queue/deque' },
          ],
        },
      ],

      '/topics/hash-table/': [
        {
          text: '哈希表',
          items: [
            { text: '概述', link: '/topics/hash-table/' },
            { text: '哈希映射', link: '/topics/hash-table/hash-map' },
            { text: '计数统计', link: '/topics/hash-table/counting' },
            { text: '两数之和系列', link: '/topics/hash-table/two-sum-family' },
            { text: '哈希设计', link: '/topics/hash-table/hash-design' },
          ],
        },
      ],

      '/topics/tree/': [
        {
          text: '树与二叉树',
          items: [
            { text: '概述', link: '/topics/tree/' },
            { text: '遍历方式', link: '/topics/tree/traversal' },
            { text: '二叉树构建', link: '/topics/tree/construction' },
            { text: '二叉搜索树', link: '/topics/tree/bst' },
            { text: '最近公共祖先', link: '/topics/tree/lca' },
            { text: '树形DP', link: '/topics/tree/tree-dp' },
          ],
        },
      ],

      '/topics/graph/': [
        {
          text: '图',
          items: [
            { text: '概述', link: '/topics/graph/' },
            { text: 'DFS与BFS', link: '/topics/graph/dfs-bfs' },
            { text: '拓扑排序', link: '/topics/graph/topological-sort' },
            { text: '最短路径', link: '/topics/graph/shortest-path' },
            { text: '最小生成树', link: '/topics/graph/mst' },
            { text: '二分图', link: '/topics/graph/bipartite' },
          ],
        },
      ],

      '/topics/heap/': [
        {
          text: '堆',
          items: [
            { text: '概述', link: '/topics/heap/' },
            { text: 'Top K问题', link: '/topics/heap/top-k' },
            { text: '合并K个有序', link: '/topics/heap/merge-k-sorted' },
            { text: '数据流中位数', link: '/topics/heap/median-finder' },
            { text: '双堆技巧', link: '/topics/heap/double-heap' },
          ],
        },
      ],

      '/topics/sorting-searching/': [
        {
          text: '排序与搜索',
          items: [
            { text: '概述', link: '/topics/sorting-searching/' },
            { text: '排序算法', link: '/topics/sorting-searching/sorting' },
            { text: '二分查找', link: '/topics/sorting-searching/binary-search' },
            { text: '搜索旋转数组', link: '/topics/sorting-searching/rotated-array' },
            { text: '二分答案', link: '/topics/sorting-searching/binary-answer' },
          ],
        },
      ],

      '/topics/dynamic-programming/': [
        {
          text: '动态规划',
          items: [
            { text: '概述', link: '/topics/dynamic-programming/' },
            { text: '线性DP', link: '/topics/dynamic-programming/linear-dp' },
            { text: '区间DP', link: '/topics/dynamic-programming/interval-dp' },
            { text: '背包问题', link: '/topics/dynamic-programming/knapsack' },
            { text: '状态压缩DP', link: '/topics/dynamic-programming/state-compression' },
            { text: '树形DP', link: '/topics/dynamic-programming/tree-dp' },
          ],
        },
      ],

      '/topics/backtracking/': [
        {
          text: '回溯算法',
          items: [
            { text: '概述', link: '/topics/backtracking/' },
            { text: '排列组合', link: '/topics/backtracking/permutations-combinations' },
            { text: '子集问题', link: '/topics/backtracking/subsets' },
            { text: 'N皇后', link: '/topics/backtracking/n-queens' },
            { text: '数独求解', link: '/topics/backtracking/sudoku-solver' },
            { text: '剪枝优化', link: '/topics/backtracking/pruning' },
          ],
        },
      ],

      '/topics/greedy/': [
        {
          text: '贪心算法',
          items: [
            { text: '概述', link: '/topics/greedy/' },
            { text: '区间调度', link: '/topics/greedy/interval-scheduling' },
            { text: '跳跃游戏', link: '/topics/greedy/jump-game' },
            { text: '分配问题', link: '/topics/greedy/assignment' },
            { text: '股票买卖', link: '/topics/greedy/stock-trading' },
          ],
        },
      ],

      '/topics/two-pointers/': [
        {
          text: '双指针',
          items: [
            { text: '概述', link: '/topics/two-pointers/' },
            { text: '对撞指针', link: '/topics/two-pointers/opposite-direction' },
            { text: '快慢指针', link: '/topics/two-pointers/fast-slow' },
            { text: '合并指针', link: '/topics/two-pointers/merge-pointers' },
            { text: '三数之和', link: '/topics/two-pointers/three-sum' },
          ],
        },
      ],

      '/topics/sliding-window/': [
        {
          text: '滑动窗口',
          items: [
            { text: '概述', link: '/topics/sliding-window/' },
            { text: '定长窗口', link: '/topics/sliding-window/fixed-window' },
            { text: '不定长窗口', link: '/topics/sliding-window/variable-window' },
            { text: '窗口计数', link: '/topics/sliding-window/window-counting' },
            { text: '字符串排列', link: '/topics/sliding-window/string-permutation' },
          ],
        },
      ],

      '/topics/union-find/': [
        {
          text: '并查集',
          items: [
            { text: '概述', link: '/topics/union-find/' },
            { text: '基础并查集', link: '/topics/union-find/basic' },
            { text: '路径压缩与按秩合并', link: '/topics/union-find/optimization' },
            { text: '连通分量', link: '/topics/union-find/connected-components' },
            { text: '动态连通性', link: '/topics/union-find/dynamic-connectivity' },
          ],
        },
      ],

      '/topics/bit-manipulation/': [
        {
          text: '位运算',
          items: [
            { text: '概述', link: '/topics/bit-manipulation/' },
            { text: '基础运算', link: '/topics/bit-manipulation/basic' },
            { text: '位技巧', link: '/topics/bit-manipulation/tricks' },
            { text: '异或应用', link: '/topics/bit-manipulation/xor' },
            { text: '状态压缩', link: '/topics/bit-manipulation/state-compression' },
          ],
        },
      ],

      '/topics/math/': [
        {
          text: '数学技巧',
          items: [
            { text: '概述', link: '/topics/math/' },
            { text: '素数问题', link: '/topics/math/prime' },
            { text: '模运算', link: '/topics/math/modular' },
            { text: '快速幂', link: '/topics/math/quick-pow' },
            { text: 'GCD与LCM', link: '/topics/math/gcd-lcm' },
            { text: '几何问题', link: '/topics/math/geometry' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Cheung-Ka-Lok-Danny/leetcode-guide' },
    ],

    footer: {
      message: '基于 VitePress 构建 | 参考 Hello-Agents 设计',
      copyright: 'MIT License | LeetCode 算法题指南',
    },

    editLink: {
      pattern: 'https://github.com/Cheung-Ka-Lok-Danny/leetcode-guide/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    lastUpdatedText: '最后更新',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    darkModeSwitchLabel: '主题切换',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
  },
})
