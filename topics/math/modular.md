# 模运算

模运算（Modular Arithmetic）在算法竞赛和编程面试中十分常见，特别是涉及大数运算和周期性问题时。

## 核心概念

### 基本运算

| 运算 | 公式 | 说明 |
|------|------|------|
| 模加 | `(a + b) % m` | 加法取模 |
| 模减 | `(a - b + m) % m` | 减法取模（防止负值） |
| 模乘 | `(a * b) % m` | 乘法取模 |
| 模幂 | `pow(a, b, m)` | 快速幂取模 |
| 模逆元 | `a * x ≡ 1 (mod m)` | 存在条件：gcd(a, m) = 1 |

### 同余性质

- 若 `a ≡ b (mod m)`，则 `a - b` 能被 m 整除
- 可传递性：`a ≡ b, b ≡ c ⇒ a ≡ c`
- 可加/乘性：`a ≡ b, c ≡ d ⇒ a ± c ≡ b ± d`，`a × c ≡ b × d`

### 模逆元

当 `gcd(a, m) = 1` 时，a 在模 m 下有逆元：

```python
# 费马小定理（m 为质数）
inv = pow(a, m - 2, m)

# 扩展欧几里得
def mod_inverse(a, m):
    g, x, y = extended_gcd(a, m)
    if g != 1:
        return None
    return x % m
```

## 经典题目

### LeetCode 166. 分数到小数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[166]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/fraction-to-recurring-decimal/" target="_blank">分数到小数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将分数转换为小数字符串（循环节用括号包裹）。</p>
  <p><strong>核心思路</strong>：模拟长除法。用哈希表记录余数出现的位置，当余数重复时找到循环节。</p>
  <div class="problem-tags">
    <span class="tag">数学</span>
    <span class="tag">哈希表</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 372. 超级次方

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[372]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/super-pow/" target="_blank">超级次方</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>计算 a^b mod 1337，其中 b 用数组表示（如 [1,2,3] 表示 123）。</p>
  <p><strong>核心思路</strong>：递归处理。利用公式 a^{x·10 + y} = (a^x)^10 * a^y，每次取出 b 的最后一位做幂运算，其他位递归处理。</p>
  <div class="problem-tags">
    <span class="tag">数学</span>
    <span class="tag">快速幂</span>
    <span class="tag">递归</span>
  </div>
</div>

```python
def superPow(a, b):
    MOD = 1337

    def pow_mod(x, n):
        result = 1
        while n:
            if n & 1:
                result = (result * x) % MOD
            x = (x * x) % MOD
            n >>= 1
        return result

    if not b:
        return 1
    last = b.pop()
    return pow_mod(superPow(a, b), 10) * pow_mod(a, last) % MOD
```

> 时间复杂度：O(n × log MOD) | 空间复杂度：O(n)

### LeetCode 974. 和可被 K 整除的子数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[974]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/subarray-sums-divisible-by-k/" target="_blank">和可被 K 整除的子数组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>统计子数组和能被 K 整除的子数组个数。</p>
  <p><strong>核心思路</strong>：前缀和 + 哈希表。(prefix[j] - prefix[i]) % K == 0 等价于 prefix[j] % K == prefix[i] % K。用哈希表记录每个余数出现的次数。</p>
  <div class="problem-tags">
    <span class="tag">前缀和</span>
    <span class="tag">模运算</span>
    <span class="tag">哈希表</span>
  </div>
</div>

### LeetCode 1015. 可被 K 整除的最小整数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1015]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/smallest-integer-divisible-by-k/" target="_blank">可被 K 整除的最小整数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到最小的只包含数字 1 且能被 K 整除的正整数，返回其长度。</p>
  <p><strong>核心思路</strong>：构造数字 1, 11, 111, ... 每次用模运算判断。如果余数重复出现，则存在循环，返回 -1。关键公式：remainder = (remainder * 10 + 1) % K。</p>
  <div class="problem-tags">
    <span class="tag">数学</span>
    <span class="tag">模运算</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 分数到小数 | O(n) | O(n) |
| 超级次方 | O(n × log MOD) | O(n) |
| 和可被 K 整除的子数组 | O(n) | O(K) |
| 可被 K 整除的最小整数 | O(K) | O(K) |

## 相关主题

- [数学 - 快速幂](/topics/math/quick-pow) — 快速幂中的模运算与模运算专题直接相关
- [数学 - 素数问题](/topics/math/prime) — 模运算应用于素数判定中的模运算
