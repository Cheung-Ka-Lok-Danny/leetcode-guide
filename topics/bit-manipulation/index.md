# 位运算

位运算（Bit Manipulation）是直接操作二进制位的底层技巧，在空间优化和特定场景下有着极高的效率和优雅的表达。

## 核心概念

- **与 &**：两位同时为1才为1
- **或 |**：两位有1则为1
- **异或 ^**：两位相同为0，不同为1
- **取反 ~**：0变1，1变0
- **左移 <<**：乘以2
- **右移 >>**：除以2

## 关键性质

```
异或的重要性质：
1. a ^ 0 = a
2. a ^ a = 0
3. a ^ b ^ a = b
4. 满足交换律和结合律
```

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/bit-manipulation/basic">基础运算</a>
  <a href="/topics/bit-manipulation/tricks">位技巧</a>
  <a href="/topics/bit-manipulation/xor">异或应用</a>
  <a href="/topics/bit-manipulation/state-compression">状态压缩</a>
</div>

## 常用位操作

| 操作 | 表达式 | 用途 |
|------|--------|------|
| 取第k位 | (n >> k) & 1 | 检查某一位 |
| 置第k位为1 | n \|= (1 << k) | 设置某一位 |
| 置第k位为0 | n &= ~(1 << k) | 清除某一位 |
| 取最低位1 | n & (-n) | 树状数组 |
| 清除最低位1 | n & (n-1) | 位计数 |
| 判断2的幂 | n > 0 && (n & (n-1)) == 0 | 幂检测 |
