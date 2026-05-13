# 快速幂

快速幂（Fast Exponentiation）是高效计算大数幂运算的算法，广泛应用于模运算和大数乘方场景。

## 核心概念

### 算法原理

计算 `x^n` 时，将指数 n 转为二进制表示，利用 `x^(a+b)` = `x^a * x^b` 分解计算：

```
x^13 = x^(1101₂) = x^8 * x^4 * x^1
```

### 递归实现

```python
def pow_recursive(x, n):
    if n == 0:
        return 1
    half = pow_recursive(x, n // 2)
    if n % 2 == 0:
        return half * half
    else:
        return half * half * x
```

### 迭代实现

```python
def pow_iterative(x, n):
    result = 1
    while n:
        if n & 1:      # 当前最低位为 1
            result *= x
        x *= x          # x 平方
        n >>= 1        # 右移一位
    return result
```

### 取模版本

```python
def pow_mod(x, n, mod):
    result = 1
    x %= mod
    while n:
        if n & 1:
            result = (result * x) % mod
        x = (x * x) % mod
        n >>= 1
    return result
```

### 矩阵快速幂

用于递推式问题，如斐波那契数列：

```python
def matrix_mult(A, B):
    # 2x2 矩阵乘法
    return [
        [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
        [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]
    ]

def matrix_pow(mat, n):
    result = [[1, 0], [0, 1]]  # 单位矩阵
    while n:
        if n & 1:
            result = matrix_mult(result, mat)
        mat = matrix_mult(mat, mat)
        n >>= 1
    return result
```

## 经典题目

### LeetCode 50. Pow(x, n)

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[50]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/powx-n/" target="_blank">Pow(x, n)</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>实现 pow(x, n) 函数。n 为有符号整数（可为负）。</p>
  <p><strong>核心思路</strong>：迭代快速幂。处理 n 为负数的情况变成 1/x^(-n)，注意 n 取最小值时的溢出。</p>
  <div class="problem-tags">
    <span class="tag">快速幂</span>
    <span class="tag">数学</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def myPow(x, n):
    if n < 0:
        x = 1 / x
        n = -n
    result = 1.0
    while n:
        if n & 1:
            result *= x
        x *= x
        n >>= 1
    return result
```

> 时间复杂度：O(log n) | 空间复杂度：O(1)

### LeetCode 372. 超级次方

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[372]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/super-pow/" target="_blank">超级次方</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>计算 a^b mod 1337，b 以数组形式给出。</p>
  <p><strong>核心思路</strong>：用模运算的分配律配合快速幂，递归处理数组表示的指数。</p>
  <div class="problem-tags">
    <span class="tag">快速幂</span>
    <span class="tag">模运算</span>
  </div>
</div>

### LeetCode 509. 斐波那契数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[509]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/fibonacci-number/" target="_blank">斐波那契数</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>计算第 n 个斐波那契数。</p>
  <p><strong>核心思路</strong>：可用矩阵快速幂达到 O(log n)。F(n) = [[1,1],[1,0]]^(n-1) * [F(1), F(0)]。</p>
  <div class="problem-tags">
    <span class="tag">快速幂</span>
    <span class="tag">矩阵</span>
  </div>
</div>

### LeetCode 1137. 第 N 个泰波那契数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1137]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/n-th-tribonacci-number/" target="_blank">第 N 个泰波那契数</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>计算第 n 个泰波那契数（T0=0, T1=1, T2=1, Tn=Tn-1+Tn-2+Tn-3）。</p>
  <p><strong>核心思路</strong>：DP O(n) 即可。也可以用 3×3 矩阵快速幂优化到 O(log n)。</p>
  <div class="problem-tags">
    <span class="tag">快速幂</span>
    <span class="tag">矩阵</span>
    <span class="tag">DP</span>
  </div>
</div>

## 复杂度对比

| 方法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 暴力循环 | O(n) | O(1) |
| 递归快速幂 | O(log n) | O(log n) |
| 迭代快速幂 | O(log n) | O(1) |
| 矩阵快速幂 | O(log n) | O(1) |

## 相关主题

- [数学 - 模运算](/topics/math/modular) — 快速幂与模运算结合解决大数取模问题
- [数学 - 素数问题](/topics/math/prime) — 快速幂算法在素数测试中的应用
