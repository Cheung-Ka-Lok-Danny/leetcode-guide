# 数学技巧

算法中的数学问题考察的是数学思维在编程中的应用，从数论基础到几何问题，都有经典的解题模式。

## 核心概念

- **数论**：素数、最大公约数、最小公倍数
- **模运算**：同余、模逆元、快速幂
- **组合数学**：排列组合数、容斥原理
- **几何**：向量运算、凸包

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/math/prime">素数问题</a>
  <a href="/topics/math/modular">模运算</a>
  <a href="/topics/math/quick-pow">快速幂</a>
  <a href="/topics/math/gcd-lcm">GCD与LCM</a>
  <a href="/topics/math/geometry">几何问题</a>
</div>

## 常用公式

| 公式 | 表达式 |
|------|--------|
| GCD（辗转相除法） | gcd(a,b) = gcd(b, a mod b) |
| LCM | lcm(a,b) = a × b / gcd(a,b) |
| 快速幂 | a^b = (a^(b/2))² × (b%2 ? a : 1) |
| 模逆元 | a^(-1) ≡ a^(p-2) (mod p) — p为素数 |
| 组合数 | C(n,k) = n! / (k!(n-k)!) |
