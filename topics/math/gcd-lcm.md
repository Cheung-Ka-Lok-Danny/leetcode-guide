# GCD 与 LCM

最大公约数（GCD）和最小公倍数（LCM）是数论中最基础的内容，辗转相除法（欧几里得算法）是核心工具。

## 核心概念

### 欧几里得算法（辗转相除法）

```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

# 递归写法
def gcd_recursive(a, b):
    return a if b == 0 else gcd_recursive(b, a % b)
```

### 最小公倍数

```python
def lcm(a, b):
    return a // gcd(a, b) * b  # 先除后乘防止溢出
```

### 扩展欧几里得算法

不仅求 gcd，还得到整数解 x, y 使得 `ax + by = gcd(a, b)`：

```python
def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    # a*x + b*y = b*x1 + (a%b)*y1 = b*x1 + (a - a//b*b)*y1
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y
```

**应用**：
- 求解线性丢番图方程 `ax + by = c`
- 求解模逆元
- 解同余方程

### 辗转相除法时间复杂度

- 最坏情况：两个连续斐波那契数，O(log(min(a,b)))
- 平均情况：O(log(min(a,b)))

## 经典题目

### LeetCode 1071. 字符串的最大公因子

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1071]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/greatest-common-divisor-of-strings/" target="_blank">字符串的最大公因子</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>找到能同时整除 str1 和 str2 的最大字符串 X（X 重复若干次后可得到 str1 和 str2）。</p>
  <p><strong>核心思路</strong>：若 str1 + str2 == str2 + str1，则存在公因子。最大公因子的长度 = gcd(len(str1), len(str2))。</p>
  <div class="problem-tags">
    <span class="tag">GCD</span>
    <span class="tag">字符串</span>
  </div>
</div>

```python
def gcdOfStrings(str1, str2):
    if str1 + str2 != str2 + str1:
        return ""
    from math import gcd
    return str1[:gcd(len(str1), len(str2))]
```

> 时间复杂度：O(len1 + len2) | 空间复杂度：O(1)

### LeetCode 914. 卡牌分组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[914]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/x-of-a-kind-in-a-deck-of-cards/" target="_blank">卡牌分组</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>将卡牌分成若干组，每组牌数 X ≥ 2 且每组的数字相同。判断是否可能。</p>
  <p><strong>核心思路</strong>：统计每个数字出现次数，求所有次数的最大公约数。若 gcd ≥ 2 则可能。</p>
  <div class="problem-tags">
    <span class="tag">GCD</span>
    <span class="tag">哈希表</span>
  </div>
</div>

### LeetCode 1250. 检查好数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1250]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/check-if-it-is-a-good-array/" target="_blank">检查好数组</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>判断是否存在一个子集，子集内数的线性组合（系数为整数）可以等于 1。</p>
  <p><strong>核心思路</strong>：根据贝祖定理（裴蜀定理），所有数的 gcd 为 1 时一定存在解。只需判断整个数组的 gcd 是否为 1。</p>
  <div class="problem-tags">
    <span class="tag">GCD</span>
    <span class="tag">数论</span>
  </div>
</div>

### LeetCode 365. 水壶问题

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[365]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/water-and-jug-problem/" target="_blank">水壶问题</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>两个容量分别为 x 和 y 的水壶，判断是否能量出 z 升水。</p>
  <p><strong>核心思路</strong>：x 和 y 的线性组合能产生的所有水量都是 gcd(x, y) 的倍数。能成功当且仅当 z % gcd(x, y) == 0 且 z ≤ x + y。</p>
  <div class="problem-tags">
    <span class="tag">GCD</span>
    <span class="tag">数学</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 字符串的最大公因子 | O(len1 + len2) | O(1) |
| 卡牌分组 | O(n + log m) | O(n) |
| 检查好数组 | O(n) | O(1) |
| 水壶问题 | O(log max(x,y)) | O(1) |

## 相关主题

- [数学 - 素数问题](/topics/math/prime) — GCD/LCM 与素数问题同属数论基础
- [数学 - 几何问题](/topics/math/geometry) — 几何问题中的坐标计算常依赖 GCD
