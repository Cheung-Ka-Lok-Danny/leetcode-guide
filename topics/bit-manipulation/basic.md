# 基础位运算

位运算（Bit Manipulation）是直接对整数的二进制位进行操作的技术，运算速度极快，常用于优化和特殊场景。

## 核心概念

### 位运算符

| 运算符 | 名称 | 说明 | 示例 |
|-------|------|------|------|
| `&` | 按位与 | 两个位都为1时结果为1 | `5 & 3 = 1` (101 & 011 = 001) |
| `\|` | 按位或 | 两个位有一个为1时结果为1 | `5 \| 3 = 7` (101 \| 011 = 111) |
| `^` | 按位异或 | 两个位不同时结果为1 | `5 ^ 3 = 6` (101 ^ 011 = 110) |
| `~` | 按位取反 | 0变1，1变0 | `~5 = -6` |
| `<<` | 左移 | 二进制位左移，低位补0 | `5 << 1 = 10` (101 → 1010) |
| `>>` | 右移 | 二进制位右移 | `5 >> 1 = 2` (101 → 10) |

### 常用位操作速查表

| 操作 | 代码 |
|------|------|
| 取第 i 位 | `(num >> i) & 1` |
| 将第 i 位置1 | `num \| (1 << i)` |
| 将第 i 位置0 | `num & ~(1 << i)` |
| 翻转第 i 位 | `num ^ (1 << i)` |
| 取最低位1 | `num & -num` |
| 清除最低位1 | `num & (num - 1)` |
| 判断是否为2的幂 | `num > 0 and (num & (num - 1)) == 0` |
| 统计1的个数 | 内置 `num.bit_count()` 或循环 `num & (num-1)` |

### 补码表示

- 正整数：原码 = 反码 = 补码
- 负整数：补码 = 反码 + 1（最高位为符号位1）

## 经典题目

### LeetCode 190. 颠倒二进制位

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[190]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/reverse-bits/" target="_blank">颠倒二进制位</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>将 32 位无符号整数的二进制位反转。</p>
  <p><strong>核心思路</strong>：逐位处理。取 n 的最低位作为结果的高位，每次 n 右移、结果左移。也可用分治（先交换8位组，再交换4位组...）优化。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">入门题</span>
  </div>
</div>

### LeetCode 191. 位1的个数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[191]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-1-bits/" target="_blank">位1的个数</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>统计 32 位无符号整数二进制表示中 1 的个数。</p>
  <p><strong>核心思路</strong>：循环执行 n &= n - 1（清除最低位1），直到 n=0，操作次数即为1的个数。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">高频面试</span>
    <span class="tag">入门题</span>
  </div>
</div>

```python
def hammingWeight(n):
    count = 0
    while n:
        n &= n - 1  # 清除最低位1
        count += 1
    return count
```

> 时间复杂度：O(k)，k 为1的个数 | 空间复杂度：O(1)

### LeetCode 231. 2 的幂

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[231]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/power-of-two/" target="_blank">2 的幂</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断一个整数是否为 2 的幂。</p>
  <p><strong>核心思路</strong>：2 的幂的二进制表示只有一位是 1。用 n > 0 and (n & (n-1)) == 0 判断。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">入门题</span>
  </div>
</div>

### LeetCode 338. 比特位计数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[338]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/counting-bits/" target="_blank">比特位计数</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>返回从 0 到 n 每个数的二进制中 1 的个数。</p>
  <p><strong>核心思路</strong>：动态规划。dp[i] = dp[i >> 1] + (i & 1)。i>>1 相当于去掉最低位，i&1 判断最低位是否为1。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def countBits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp
```

> 时间复杂度：O(n) | 空间复杂度：O(n)

### LeetCode 342. 4的幂

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[342]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/power-of-four/" target="_blank">4的幂</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断一个整数是否为 4 的幂。</p>
  <p><strong>核心思路</strong>：4 的幂 = 2 的幂中 1 在奇数位上的数。先用 (n & (n-1))==0 判断是2的幂，再用 (n & 0xAAAAAAAA)==0 判断1在奇数位。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">数学</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 颠倒二进制位 | O(1) | O(1) |
| 位1的个数 | O(k) | O(1) |
| 2的幂 | O(1) | O(1) |
| 比特位计数 | O(n) | O(n) |
| 4的幂 | O(1) | O(1) |

## 相关主题

- [位运算 - 位技巧](/topics/bit-manipulation/tricks) — 基础位运算与位技巧共同构成位运算知识体系
- [位运算 - 异或应用](/topics/bit-manipulation/xor) — 异或是位运算的核心操作之一
