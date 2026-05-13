# 位技巧

位运算中有几个经典技巧可以极大简化代码和提升效率，掌握它们能让你写出优雅且高效的代码。

## 核心概念

### 经典位技巧

| 技巧 | 公式 | 用途 |
|------|------|------|
| 清除最低位1 | `n & (n-1)` | 统计1的个数、判断2的幂 |
| 取最低位1 | `n & -n` | 树状数组、获取最低位 |
| 判断2的幂 | `n > 0 and n & (n-1) == 0` | 2的幂检测 |
| 异或实现交换 | `a ^= b; b ^= a; a ^= b` | 无临时变量交换 |
| 取绝对值 | `(n ^ (n>>31)) - (n>>31)` | 位运算求绝对值 |
| 判断符号相同 | `(a ^ b) >= 0` | 同号判断 |

### n & (n-1) 详解

这是最重要的位操作技巧之一。每次执行都会将二进制表示中**最低位的 1 变成 0**：

```
n     = 10110000  (176)
n-1   = 10101111  (175)
n&(n-1)= 10100000  (160)  ← 最低位1被清除
```

**应用**：
- 统计二进制中1的个数
- 判断一个数是否为2的幂（只有一个1）
- 枚举子集

### n & (-n) 详解

取负数的补码表示（取反 + 1）与原数按位与，结果只保留最低位的 1：

```
n      = 10110000  (176)
-n     = 01010000  (-176 补码)
n&(-n) = 00010000  (16)   ← 只保留了最低位的1
```

**应用**：
- 获取最低位的 1 的值
- 树状数组（Fenwick Tree）的 lowbit 函数

## 经典题目

### LeetCode 191. 位1的个数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[191]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-1-bits/" target="_blank">位1的个数</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>统计无符号整数二进制中 1 的个数。</p>
  <p><strong>核心思路</strong>：n & (n-1) 消除最低位 1，计数。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">n&(n-1)</span>
    <span class="tag">入门题</span>
  </div>
</div>

### LeetCode 260. 只出现一次的数字 III

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[260]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/single-number-iii/" target="_blank">只出现一次的数字 III</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>数组中只有两个元素出现一次，其他出现两次，找到这两个元素。</p>
  <p><strong>核心思路</strong>：全部异或得到 x ^ y。用 x & (-x) 获取最低不同位，根据该位将数组分为两组，分别异或得到两个数。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">异或</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def singleNumber(nums):
    xor = 0
    for num in nums:
        xor ^= num
    # 取最低位1作为分组依据
    diff = xor & (-xor)
    a = b = 0
    for num in nums:
        if num & diff:
            a ^= num
        else:
            b ^= num
    return [a, b]
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 268. 缺失数字

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[268]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/missing-number/" target="_blank">缺失数字</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>从 0 到 n 中缺失了一个数，找到它。</p>
  <p><strong>核心思路</strong>：将索引和值异或，缺失的数会落单。或者用数学法：和 - 实际和。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">异或</span>
  </div>
</div>

### LeetCode 371. 两整数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[371]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sum-of-two-integers/" target="_blank">两整数之和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>不使用 + 和 - 运算符计算两整数之和。</p>
  <p><strong>核心思路</strong>：用异或模拟加法（不考虑进位），与运算左移得到进位。循环直到进位为 0。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">加法</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def getSum(a, b):
    while b:
        carry = (a & b) << 1
        a ^= b
        b = carry
    return a
```

> 时间复杂度：O(1) | 空间复杂度：O(1)

### LeetCode 201. 数字范围按位与

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[201]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/bitwise-and-of-numbers-range/" target="_blank">数字范围按位与</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回 [left, right] 区间内所有数字按位与的结果。</p>
  <p><strong>核心思路</strong>：不断清除 right 的最低位的 1，直到 right <= left。或者找 left 和 right 的公共前缀。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">n&(n-1)</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 位1的个数 | O(k) | O(1) |
| 只出现一次的数字 III | O(n) | O(1) |
| 缺失数字 | O(n) | O(1) |
| 两整数之和 | O(1) | O(1) |
| 数字范围按位与 | O(log n) | O(1) |

## 相关主题

- [位运算 - 基础运算](/topics/bit-manipulation/basic) — 位技巧建立在基础位运算之上
- [位运算 - 异或应用](/topics/bit-manipulation/xor) — 异或应用是位技巧的重要组成部分
