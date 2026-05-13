# 股票买卖

股票买卖系列是 LeetCode 上最经典的状态机 DP 题集，通过定义不同的状态来覆盖各种交易限制。

## 核心概念

### 状态机模型

股票买卖问题的本质是一个**状态机**，每天的状态取决于前一天的持有状态和当天的操作（买入/卖出/不动）。

```python
# 通用状态机框架
# dp[i][k][s] = 第 i 天，最多交易 k 次，持有状态为 s（0=未持有，1=持有）
# 初始化：dp[-1][k][0] = 0, dp[-1][k][1] = -inf
# 转移：
#   dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
#   dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
```

### 六道股票题的关系

| 题目 | 限制 | 解法 |
|------|------|------|
| 121 | 只能交易 1 次 | 求最大差值 |
| 122 | 可交易无限次 | 累加所有上升段 |
| 123 | 最多交易 2 次 | 四状态 DP |
| 188 | 最多交易 K 次 | 通用 DP（K 大时用贪心） |
| 309 | 含冷冻期（1天） | 三状态 DP |
| 714 | 含手续费 | 在买入/卖出时扣减 |

## 经典题目

### LeetCode 121. 买卖股票的最佳时机

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[121]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/" target="_blank">买卖股票的最佳时机</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>只能买卖一次，求最大利润。</p>
  <p><strong>核心思路</strong>：记录历史最低价，每天计算"当天卖出"的利润，取最大值。</p>
  <div class="problem-tags">
    <span class="tag">股票</span>
    <span class="tag">入门题</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    return max_profit
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 122. 买卖股票的最佳时机 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[122]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/" target="_blank">买卖股票的最佳时机 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>可以无限次交易（但不能同时持有多股），求最大利润。</p>
  <p><strong>核心思路</strong>：贪心——只要有上涨就卖出。累计所有 prices[i] > prices[i-1] 的差值。</p>
  <div class="problem-tags">
    <span class="tag">股票</span>
    <span class="tag">贪心</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def maxProfit(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]
    return profit
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 123. 买卖股票的最佳时机 III

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[123]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/" target="_blank">买卖股票的最佳时机 III</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>最多可以完成两笔交易，求最大利润。</p>
  <p><strong>核心思路</strong>：四状态 DP。定义 buy1/sell1/buy2/sell2 四个变量，依次转移。</p>
  <div class="problem-tags">
    <span class="tag">股票</span>
    <span class="tag">状态机DP</span>
  </div>
</div>

### LeetCode 188. 买卖股票的最佳时机 IV

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[188]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/" target="_blank">买卖股票的最佳时机 IV</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>最多可以完成 K 笔交易，求最大利润。</p>
  <p><strong>核心思路</strong>：当 K >= n/2 时降级为 122 题（无限次）。否则用通用 DP：dp[k][0/1] 表示交易 k 次后的状态。</p>
  <div class="problem-tags">
    <span class="tag">股票</span>
    <span class="tag">状态机DP</span>
  </div>
</div>

### LeetCode 309. 最佳买卖股票时机含冷冻期

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[309]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/" target="_blank">最佳买卖股票时机含冷冻期</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>卖出股票后无法在第二天买入（冷冻期1天），求最大利润。</p>
  <p><strong>核心思路</strong>：三状态 DP。定义 hold(持有)、freeze(冷冻)、ready(可买)。hold 由 ready 买入或 stay，freeze 由 hold 卖出，ready 由 freeze 或 stay 得到。</p>
  <div class="problem-tags">
    <span class="tag">股票</span>
    <span class="tag">状态机DP</span>
  </div>
</div>

### LeetCode 714. 买卖股票的最佳时机含手续费

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[714]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/" target="_blank">买卖股票的最佳时机含手续费</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>每次交易需要支付手续费，可无限次交易，求最大利润。</p>
  <p><strong>核心思路</strong>：122 题基础上升级。在买入或卖出时扣除手续费。用 hold/cash 两个状态即可。</p>
  <div class="problem-tags">
    <span class="tag">股票</span>
    <span class="tag">状态机DP</span>
  </div>
</div>

## 状态机 DP 通用模板

```python
def maxProfit(k, prices):
    n = len(prices)
    if n == 0:
        return 0
    # K 很大时退化为无限次交易
    if k >= n // 2:
        profit = 0
        for i in range(1, n):
            if prices[i] > prices[i-1]:
                profit += prices[i] - prices[i-1]
        return profit

    dp = [[0] * (k + 1) for _ in range(2)]  # 滚动数组
    for i in range(k + 1):
        dp[1][i] = float('-inf')  # 初始不能持有

    for price in prices:
        for i in range(1, k + 1):
            dp[0][i] = max(dp[0][i], dp[1][i] + price)
            dp[1][i] = max(dp[1][i], dp[0][i-1] - price)

    return dp[0][k]
```

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 121（一次交易） | O(n) | O(1) |
| 122（无限次） | O(n) | O(1) |
| 123（两次交易） | O(n) | O(1) |
| 188（K次交易） | O(nk) | O(k) |
| 309（冷冻期） | O(n) | O(1) |
| 714（手续费） | O(n) | O(1) |

## 相关主题

- [动态规划 - 线性DP](/topics/dynamic-programming/linear-dp) — 股票买卖问题的 DP 解法与线性 DP 相通
- [贪心 - 跳跃游戏](/topics/greedy/jump-game) — 股票买卖的贪心解法与跳跃游戏思路近似
