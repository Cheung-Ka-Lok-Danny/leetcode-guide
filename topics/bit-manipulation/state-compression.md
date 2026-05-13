# 位运算状态压缩

用二进制位表示集合/状态是状态压缩的核心思想，可以大幅减少空间占用并利用位运算实现高效操作。

## 核心概念

### 位掩码表示集合

- **基本原理**：用 n 位二进制数表示包含 n 个元素的集合
  - 第 i 位为 1：元素 i 在集合中
  - 第 i 位为 0：元素 i 不在集合中
- **示例**：集合 {0, 2, 3} 用 5 位表示为 `01101`（二进制）= 13

### 子集枚举

```python
# 枚举所有子集
for mask in range(1 << n):
    # 处理子集 mask

# 枚举 mask 的所有非空子集（高效）
sub = mask
while sub:
    # 处理子集 sub
    sub = (sub - 1) & mask
```

### 状态表示技巧

```python
# 用整数表示网格状态
# 例：3×4 网格可以用 12 位整数表示
# 某位置 (i,j) 的值： (state >> (i * cols + j)) & 1

# 设置 (i,j) 位置为 1
state |= 1 << (i * cols + j)

# 将 (i,j) 位置设为 0
state &= ~(1 << (i * cols + j))
```

## 经典题目

### LeetCode 78. 子集（位运算解法）

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[78]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/subsets/" target="_blank">子集</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>用位运算枚举数组的所有子集。</p>
  <p><strong>核心思路</strong>：n 个元素的子集总数 = 2ⁿ。用 [0, 2ⁿ-1] 的整数位掩码表示子集的选择状态。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">子集</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def subsets(nums):
    n = len(nums)
    res = []
    for mask in range(1 << n):
        subset = []
        for i in range(n):
            if mask & (1 << i):
                subset.append(nums[i])
        res.append(subset)
    return res
```

> 时间复杂度：O(n × 2ⁿ) | 空间复杂度：O(1) 不计结果

### LeetCode 1284. 转化为全零矩阵的最少反转次数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1284]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix/" target="_blank">转化为全零矩阵的最少反转次数</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>每次反转一个格子及其相邻格（上下左右），求使矩阵全变为 0 的最少操作次数。</p>
  <p><strong>核心思路</strong>：状态压缩 BFS。用整数位掩码表示矩阵状态，每个位置反转操作也表示为位掩码。BFS 搜索从初始状态到 0 的最短路径。</p>
  <div class="problem-tags">
    <span class="tag">状态压缩</span>
    <span class="tag">BFS</span>
  </div>
</div>

### LeetCode 1349. 参加考试的最大学生数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1349]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/maximum-students-taking-exam/" target="_blank">参加考试的最大学生数</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>m×n 的座位（有坏座位），学生不能前后左右相邻，求能安排的最多学生数。</p>
  <p><strong>核心思路</strong>：按行 DP + 状态压缩。dp[row][mask] 表示前 row 行且第 row 行的学生安排为 mask 时的最多人数。mask 检查相邻列是否有冲突，同时检查与上一行是否有斜前方冲突。</p>
  <div class="problem-tags">
    <span class="tag">状态压缩</span>
    <span class="tag">DP</span>
  </div>
</div>

## 状态压缩应用对比

| 题目 | 状态 | 算法 | 状态数 |
|------|------|------|--------|
| 子集（位运算） | 每个元素的选/不选 | 迭代枚举 | 2ⁿ |
| 全零矩阵 | 矩阵每个格子的 0/1 | BFS | 2^(m×n) |
| 参加考试 | 每行的学生座位 | 状压 DP | 2^m × n |

## 相关主题

- [动态规划 - 状态压缩DP](/topics/dynamic-programming/state-compression) — 位运算状态压缩是状态压缩 DP 的基础
- [位运算 - 异或应用](/topics/bit-manipulation/xor) — 异或可在状态压缩中进行位翻转
