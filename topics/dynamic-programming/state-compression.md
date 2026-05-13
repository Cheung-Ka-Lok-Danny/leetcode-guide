# 状态压缩DP

状态压缩DP（State Compression DP / DP over Subsets）利用二进制位掩码表示集合状态，将子集枚举问题转化为状态转移问题。

## 核心概念

### 位掩码表示
- 将包含 n 个元素的集合用 n 位二进制数表示
- 第 i 位为 1 表示元素 i 在集合中，为 0 表示不在
- 状态总数：2ⁿ

### 常用位操作
```python
mask = 0b10101   # 二进制表示
mask | (1 << i)  # 将第 i 位置为 1
mask & ~(1 << i) # 将第 i 位置为 0
mask & (1 << i)  # 检查第 i 位是否为 1
mask & -mask     # 获取最低位的 1
mask & (mask-1)  # 清除最低位的 1
```

### 子集枚举模板
```python
# 枚举 mask 的所有子集
subset = mask
while subset:
    # 处理 subset
    subset = (subset - 1) & mask
```

## 经典题目

### LeetCode 526. 优美的排列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[526]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/beautiful-arrangement/" target="_blank">优美的排列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>从 1 到 N 构造排列，使得第 i 个位置上的数能被 i 整除或 i 能被该数整除，求方案数。</p>
  <p><strong>核心思路</strong>：dp[mask] 表示已选数字集合为 mask 时的方案数。mask 中 1 的个数表示当前填充的位置 i。枚举尚未使用的数字 j，若满足整除条件则转移。</p>
  <div class="problem-tags">
    <span class="tag">状态压缩</span>
    <span class="tag">排列</span>
    <span class="tag">方案数</span>
  </div>
</div>

```python
def countArrangement(n):
    # dp[mask] 表示已选数字集合为 mask 时的方案数
    dp = [0] * (1 << n)
    dp[0] = 1

    for mask in range(1 << n):
        # 当前要放置的位置（1-indexed）
        pos = bin(mask).count("1") + 1
        for j in range(1, n + 1):
            if not (mask & (1 << (j - 1))):
                if j % pos == 0 or pos % j == 0:
                    dp[mask | (1 << (j - 1))] += dp[mask]

    return dp[(1 << n) - 1]
```

> 时间复杂度：O(n × 2ⁿ) | 空间复杂度：O(2ⁿ)

### LeetCode 698. 划分为K个相等的子集

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[698]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/" target="_blank">划分为K个相等的子集</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断能否将数组划分为 K 个和相等的子集。</p>
  <p><strong>核心思路</strong>：dp[mask] 表示已用元素集合为 mask 时，当前子集的累积和（除以 target 的余数）。从空集开始，每次添加一个未使用的元素。</p>
  <div class="problem-tags">
    <span class="tag">状态压缩</span>
    <span class="tag">子集划分</span>
    <span class="tag">回溯</span>
  </div>
</div>

### LeetCode 847. 访问所有节点的最短路径

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[847]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/shortest-path-visiting-all-nodes/" target="_blank">访问所有节点的最短路径</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>给出一个连通图，求访问所有节点的最短路径长度（可重复访问节点和边）。</p>
  <p><strong>核心思路</strong>：BFS + 状态压缩。状态 (mask, u) 表示已访问节点集合为 mask 且当前在 u。mask 用 n 位二进制表示哪些节点已被访问。</p>
  <div class="problem-tags">
    <span class="tag">状态压缩</span>
    <span class="tag">BFS</span>
    <span class="tag">图</span>
  </div>
</div>

### LeetCode 1125. 最小的必要团队

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1125]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/smallest-sufficient-team/" target="_blank">最小的必要团队</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>从候选人中选择最少的团队，使团队拥有所有必需的技能。</p>
  <p><strong>核心思路</strong>：将技能编号为 0..m-1，每个人的技能集合转为位掩码。dp[mask] 表示拥有技能集合 mask 所需的最少人数，同时记录转移路径以还原团队人员。</p>
  <div class="problem-tags">
    <span class="tag">状态压缩</span>
    <span class="tag">集合覆盖</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 优美的排列 | O(n × 2ⁿ) | O(2ⁿ) |
| 划分为K个相等子集 | O(n × 2ⁿ) | O(2ⁿ) |
| 访问所有节点的最短路径 | O(n² × 2ⁿ) | O(n × 2ⁿ) |
| 最小的必要团队 | O(m × 2ᵐ) | O(2ᵐ) |

## 相关主题

- [位运算 - 状态压缩](/topics/bit-manipulation/state-compression) — 状态压缩 DP 依赖位运算表示集合状态
- [动态规划 - 背包问题](/topics/dynamic-programming/knapsack) — 状态压缩与背包问题结合解决复杂约束
