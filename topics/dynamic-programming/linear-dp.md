# 线性DP

线性DP（Linear Dynamic Programming）是最基础的动态规划类型，状态通常定义在一维或二维数组上，按顺序递推。

## 核心概念

### 一维线性DP
- **状态定义**：`dp[i]` 表示前 i 个元素或第 i 个位置的最优解
- **递推方向**：从左到右
- **经典问题**：爬楼梯、最大子数组和、打家劫舍

### 二维线性DP
- **状态定义**：`dp[i][j]` 表示两个序列的前 i 和前 j 个元素的最优解
- **经典问题**：最长公共子序列、编辑距离

### DP 解题五步法
1. **定义状态**：dp[i] 表示什么
2. **状态转移**：dp[i] = f(dp[i-1], dp[i-2], ...)
3. **初始化**：base case
4. **遍历顺序**：通常从小到大
5. **返回结果**：dp[n] 或 dp 数组中的最值

## 经典题目

### LeetCode 70. 爬楼梯

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[70]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/climbing-stairs/" target="_blank">爬楼梯</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>每次可以爬 1 或 2 个台阶，爬到楼顶有多少种不同的方法？</p>
  <p><strong>核心思路</strong>：dp[i] = dp[i-1] + dp[i-2]。斐波那契数列的变形，可以用滚动变量优化空间到 O(1)。</p>
  <div class="problem-tags">
    <span class="tag">线性DP</span>
    <span class="tag">入门题</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def climbStairs(n):
    # 滚动变量优化 O(1) 空间
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 300. 最长递增子序列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[300]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-increasing-subsequence/" target="_blank">最长递增子序列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出数组中最长严格递增子序列的长度。</p>
  <p><strong>核心思路</strong>：dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。对于每个 j < i，若 nums[j] < nums[i]，则 dp[i] = max(dp[i], dp[j] + 1)。</p>
  <div class="problem-tags">
    <span class="tag">线性DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def lengthOfLIS(nums):
    # O(n²) DP
    n = len(nums)
    dp = [1] * n
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)
```

> 时间复杂度：O(n²) 朴素 / O(n log n) 二分优化 | 空间复杂度：O(n)

### LeetCode 53. 最大子数组和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[53]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/maximum-subarray/" target="_blank">最大子数组和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出数组中和最大的连续子数组。</p>
  <p><strong>核心思路</strong>：Kadane算法。dp[i] = max(nums[i], dp[i-1] + nums[i])，表示以 i 结尾的最大子数组和。</p>
  <div class="problem-tags">
    <span class="tag">线性DP</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def maxSubArray(nums):
    cur_sum = max_sum = nums[0]
    for num in nums[1:]:
        cur_sum = max(num, cur_sum + num)
        max_sum = max(max_sum, cur_sum)
    return max_sum
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 1143. 最长公共子序列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1143]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-common-subsequence/" target="_blank">最长公共子序列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到两个字符串的最长公共子序列长度。</p>
  <p><strong>核心思路</strong>：二维DP。dp[i][j] 表示 text1[:i] 和 text2[:j] 的LCS长度。字符相等则 dp[i][j] = dp[i-1][j-1] + 1，否则取 dp[i-1][j] 和 dp[i][j-1] 的最大值。</p>
  <div class="problem-tags">
    <span class="tag">二维DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
```

> 时间复杂度：O(m×n) | 空间复杂度：O(m×n)，可优化至 O(min(m,n))

### LeetCode 72. 编辑距离

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[72]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/edit-distance/" target="_blank">编辑距离</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>计算将 word1 转换为 word2 所需的最小操作数（插入、删除、替换）。</p>
  <p><strong>核心思路</strong>：二维DP经典题。dp[i][j] 表示 word1[:i] 到 word2[:j] 的最小编辑距离。三种操作对应三种转移。</p>
  <div class="problem-tags">
    <span class="tag">二维DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 198. 打家劫舍

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[198]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/house-robber/" target="_blank">打家劫舍</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>不偷相邻房屋，求最大偷窃金额。</p>
  <p><strong>核心思路</strong>：dp[i] = max(dp[i-1], dp[i-2] + nums[i])。每个房子有两种选择：偷或不偷。</p>
  <div class="problem-tags">
    <span class="tag">线性DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 线性DP类型总结

| 类型 | 状态维度 | 经典题目 | 递推模式 |
|------|---------|---------|---------|
| 斐波那契型 | 1D | 爬楼梯、打家劫舍 | dp[i] = dp[i-1] + dp[i-2] |
| 子序列型 | 1D | LIS | dp[i] = max(dp[j]+1) |
| 子数组型 | 1D | 最大子数组和 | dp[i] = max(nums[i], dp[i-1]+nums[i]) |
| 双序列型 | 2D | LCS、编辑距离 | 分字符相等/不等讨论 |

## 相关主题

- [动态规划 - 区间DP](/topics/dynamic-programming/interval-dp) — 线性 DP 与区间 DP 的递推关系相互转化
- [动态规划 - 背包问题](/topics/dynamic-programming/knapsack) — 线性 DP 与背包问题的状态定义方式相似
- [贪心算法 - 股票买卖](/topics/greedy/stock-trading) — 股票买卖问题既可用 DP 也可用贪心
