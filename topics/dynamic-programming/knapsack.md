# 背包问题

背包问题（Knapsack Problem）是动态规划中最经典的题型之一，包括0-1背包、完全背包和多重背包等变种。

## 核心概念

### 0-1背包
- **每件物品只能选一次**
- 状态：`dp[i][w]` 前 i 件物品在容量 w 下的最大价值
- 转移：`dp[i][w] = max(dp[i-1][w], dp[i-1][w-wi] + vi)`
- **空间优化**：一维数组，**容量从大到小**遍历

### 完全背包
- **每件物品可以选无限次**
- 与0-1背包的区别：遍历容量时**从小到大**
- 状态：`dp[w] = max(dp[w], dp[w-wi] + vi)`

### 常见背包变种
- **目标值问题**：目标和、分割等和子集
- **组合数问题**：零钱兑换II、组合总和IV
- **最值问题**：零钱兑换（最少硬币数）

## 模板

```python
# 0-1背包模板
def zero_one_knapsack(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    for i in range(n):
        # 容量从大到小（保证每件物品只选一次）
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[capacity]

# 完全背包模板
def complete_knapsack(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    for i in range(n):
        # 容量从小到大（物品可重复选）
        for w in range(weights[i], capacity + 1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[capacity]
```

## 经典题目

### LeetCode 416. 分割等和子集

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[416]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/partition-equal-subset-sum/" target="_blank">分割等和子集</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断数组能否被分割成两个子集，使得两子集元素和相等。</p>
  <p><strong>核心思路</strong>：转化为0-1背包——是否存在子集的和为总和的一半。dp[w]表示是否存在和为w的子集。</p>
  <div class="problem-tags">
    <span class="tag">0-1背包</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        for w in range(target, num - 1, -1):
            dp[w] = dp[w] or dp[w - num]

    return dp[target]
```

> 时间复杂度：O(n×target) | 空间复杂度：O(target)

### LeetCode 494. 目标和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[494]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/target-sum/" target="_blank">目标和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给数组每个元素添加 + 或 - 号，使表达式的值等于 target，求方案数。</p>
  <p><strong>核心思路</strong>：将问题转化为"正数子集和 = (sum + target) / 2"的子集数量问题。</p>
  <div class="problem-tags">
    <span class="tag">0-1背包</span>
    <span class="tag">方案数</span>
  </div>
</div>

### LeetCode 322. 零钱兑换

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[322]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/coin-change/" target="_blank">零钱兑换</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定不同面额的硬币，求凑成总金额所需的最少硬币数。</p>
  <p><strong>核心思路</strong>：完全背包求最值。dp[w] = min(dp[w], dp[w-coin] + 1)。</p>
  <div class="problem-tags">
    <span class="tag">完全背包</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for coin in coins:
        for w in range(coin, amount + 1):
            dp[w] = min(dp[w], dp[w - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1
```

### LeetCode 518. 零钱兑换 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[518]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/coin-change-ii/" target="_blank">零钱兑换 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>计算凑成总金额的硬币组合数（每种硬币无限使用）。</p>
  <p><strong>核心思路</strong>：完全背包求方案数。dp[w] += dp[w-coin]。外层coins内层amount保证组合数（避免排列重复）。</p>
  <div class="problem-tags">
    <span class="tag">完全背包</span>
    <span class="tag">方案数</span>
  </div>
</div>

## 背包问题类型总结

| 类型 | 遍历顺序 | 转移公式 | 典型题目 |
|------|---------|---------|---------|
| 0-1背包（存在性） | 容量倒序 | dp[w] = dp[w] or dp[w-num] | 416 |
| 0-1背包（方案数） | 容量倒序 | dp[w] += dp[w-num] | 494 |
| 完全背包（最值） | 容量正序 | dp[w] = min(dp[w], dp[w-coin]+1) | 322 |
| 完全背包（组合数） | 容量正序 | dp[w] += dp[w-coin] | 518 |

## 相关主题

- [动态规划 - 线性DP](/topics/dynamic-programming/linear-dp) — 背包问题是线性 DP 子类型的具体化
- [动态规划 - 状态压缩DP](/topics/dynamic-programming/state-compression) — 状态压缩可优化多维背包的空间复杂度
