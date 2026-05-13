# 素数问题

素数（质数）是数学中的基本概念，素数的判定、筛法和分解是算法面试中的常见考点。

## 核心概念

### 素数判定

```python
def is_prime(n):
    if n < 2:
        return False
    if n < 4:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True
```

### 埃氏筛（Sieve of Eratosthenes）

高效找出 [2, n] 之间的所有素数。核心思想：从 2 开始，将每个素数的倍数标记为合数。

```python
def sieve_of_eratosthenes(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            # 从 i*i 开始标记（因为 i*(i-1) 已被更小的素数标记过）
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(2, n + 1) if is_prime[i]]
```

> 时间复杂度：O(n log log n) | 空间复杂度：O(n)

### 线性筛（欧拉筛）

每个合数只被其最小质因子标记一次，时间复杂度 O(n)。

```python
def linear_sieve(n):
    is_prime = [True] * (n + 1)
    primes = []
    for i in range(2, n + 1):
        if is_prime[i]:
            primes.append(i)
        for p in primes:
            if i * p > n:
                break
            is_prime[i * p] = False
            if i % p == 0:
                break  # 保证每个合数只被最小质因子标记
    return primes
```

## 经典题目

### LeetCode 204. 计数质数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[204]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/count-primes/" target="_blank">计数质数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>统计小于 n 的质数个数。</p>
  <p><strong>核心思路</strong>：埃氏筛。从 2 开始标记合数，优化点：只需遍历到 sqrt(n)，从 i² 开始标记。</p>
  <div class="problem-tags">
    <span class="tag">素数</span>
    <span class="tag">埃氏筛</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def countPrimes(n):
    if n < 2:
        return 0
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n, i):
                is_prime[j] = False
    return sum(is_prime)
```

> 时间复杂度：O(n log log n) | 空间复杂度：O(n)

### LeetCode 263. 丑数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[263]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/ugly-number/" target="_blank">丑数</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断一个数是否为丑数（只包含质因子 2, 3, 5 的正整数）。</p>
  <p><strong>核心思路</strong>：反复除以 2、3、5，如果最后剩下 1 则是丑数。</p>
  <div class="problem-tags">
    <span class="tag">数学</span>
    <span class="tag">入门题</span>
  </div>
</div>

### LeetCode 264. 丑数 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[264]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/ugly-number-ii/" target="_blank">丑数 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到第 n 个丑数（1 是第一个丑数）。</p>
  <p><strong>核心思路</strong>：三指针动态规划。dp[i] 表示第 i 个丑数，三个指针分别指向乘以 2、3、5 的候选位置，每次取最小值。</p>
  <div class="problem-tags">
    <span class="tag">数学</span>
    <span class="tag">DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 279. 完全平方数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[279]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/perfect-squares/" target="_blank">完全平方数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到和为 n 的完全平方数的最少数量。</p>
  <p><strong>核心思路</strong>：DP dp[i] = min(dp[i - j*j] + 1)。也可以用四平方和定理（结果只可能是 1、2、3、4）。</p>
  <div class="problem-tags">
    <span class="tag">数学</span>
    <span class="tag">DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 计数质数 | O(n log log n) | O(n) |
| 丑数 | O(log n) | O(1) |
| 丑数 II | O(n) | O(n) |
| 完全平方数 | O(n × sqrt(n)) | O(n) |

## 相关主题

- [数学 - GCD与LCM](/topics/math/gcd-lcm) — 素数问题与 GCD/LCM 同属数论基础
- [数学 - 快速幂](/topics/math/quick-pow) — 模运算中的快速幂算法与素数判定相关
