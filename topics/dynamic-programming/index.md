# 动态规划

动态规划（Dynamic Programming，DP）是算法面试中最重要也最具挑战性的主题。其核心思想是将复杂问题分解为重叠子问题，通过递推关系求解。

## 核心概念

- **最优子结构**：问题的最优解包含子问题的最优解
- **重叠子问题**：子问题会被重复求解
- **状态定义**：定义 dp[i] 或 dp[i][j] 的含义
- **状态转移方程**：如何从子问题推导出当前问题
- **边界条件**：最小子问题的解
- **DP 优化**：空间压缩、四边形不等式等

## 解题五步法

1. **定义状态** — dp[i] 表示什么
2. **确定递推** — dp[i] 如何从 dp[i-1]、dp[i-2]... 得到
3. **初始化** — 边界条件
4. **遍历顺序** — 正序、逆序、斜线
5. **返回结果** — 最终答案在 dp 的哪个位置

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/dynamic-programming/linear-dp">线性DP</a>
  <a href="/topics/dynamic-programming/interval-dp">区间DP</a>
  <a href="/topics/dynamic-programming/knapsack">背包问题</a>
  <a href="/topics/dynamic-programming/state-compression">状态压缩DP</a>
  <a href="/topics/dynamic-programming/tree-dp">树形DP</a>
</div>

## DP 类型对比

| 类型 | 状态维度 | 经典问题 | 时间复杂度 |
|------|---------|---------|-----------|
| 线性DP | 1维 | 最长递增子序列 | O(n) ~ O(n²) |
| 区间DP | 2维 | 矩阵链乘 | O(n³) |
| 背包问题 | 2维 | 0-1背包 | O(n×W) |
| 状态压缩 | 位掩码 | 旅行商问题 | O(n²×2ⁿ) |
| 树形DP | 树 | 树的最大独立集 | O(n) |

> ⭐ **面试高频**：动态规划是技术面试中最重要的考点，建议重点掌握线性DP和背包问题。
