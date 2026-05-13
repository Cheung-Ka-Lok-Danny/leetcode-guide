# 异或应用

异或（XOR，`^`）是位运算中性质最丰富的运算，在解决"找出唯一出现元素"类问题上有着无可比拟的优势。

## 核心概念

### 异或的性质

| 性质 | 公式 | 说明 |
|------|------|------|
| 恒等律 | `a ^ 0 = a` | 任何数异或 0 不变 |
| 归零律 | `a ^ a = 0` | 相同数异或为 0 |
| 交换律 | `a ^ b = b ^ a` | 结果与顺序无关 |
| 结合律 | `(a ^ b) ^ c = a ^ (b ^ c)` | 可以任意组合 |
| 自反性 | `a ^ b ^ a = b` | 两次异或同一数回到原值 |

### 经典应用

- **找出出现奇数次的元素**：全部异或，最后结果就是答案
- **交换两数**：`a ^= b; b ^= a; a ^= b`
- **缺失数字**：`n` 和全部索引及值异或
- **加密/解密**：`plain ^ key = cipher, cipher ^ key = plain`

### 只出现一次的数字系列

| 题目 | 条件 | 解法 |
|------|------|------|
| 136 | 其他数出现2次，1个出现1次 | 全部异或 |
| 137 | 其他数出现3次，1个出现1次 | 位计数 % 3 |
| 260 | 其他数出现2次，2个出现1次 | 异或 + 分组 |
| 421 | 求最大异或值 | 前缀树（Trie） |

## 经典题目

### LeetCode 136. 只出现一次的数字

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[136]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/single-number/" target="_blank">只出现一次的数字</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>数组中除一个元素出现一次外，其他都出现两次，找到这个元素。</p>
  <p><strong>核心思路</strong>：全部异或。相同元素异或为 0，最后剩下的就是只出现一次的元素。</p>
  <div class="problem-tags">
    <span class="tag">异或</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 137. 只出现一次的数字 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[137]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/single-number-ii/" target="_blank">只出现一次的数字 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>数组中除一个元素出现一次外，其他都出现三次，找到这个元素。</p>
  <p><strong>核心思路</strong>：统计每一位上 1 出现的次数，对 3 取余。出现三次的位被清除，剩下的就是只出现一次的元素。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">计数</span>
  </div>
</div>

### LeetCode 260. 只出现一次的数字 III

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[260]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/single-number-iii/" target="_blank">只出现一次的数字 III</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>数组中除两个元素出现一次外，其他都出现两次，找到这两个元素。</p>
  <p><strong>核心思路</strong>：全部异或得到 x^y。找到 x^y 的任意一位 1 作为分组依据，将数组分成两组分别异或。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">分组异或</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 421. 数组中两个数的最大异或值

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[421]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/" target="_blank">数组中两个数的最大异或值</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在数组中找到两个数，使它们的异或结果最大。</p>
  <p><strong>核心思路</strong>：前缀树（二进制 Trie）。将所有数字的二进制位插入 Trie，对每个数字在 Trie 中找异或最大的配对（贪心：尽量走反向位）。</p>
  <div class="problem-tags">
    <span class="tag">前缀树</span>
    <span class="tag">异或</span>
    <span class="tag">贪心</span>
  </div>
</div>

```python
def findMaximumXOR(nums):
    # 构建二进制 Trie
    class TrieNode:
        def __init__(self):
            self.children = [None, None]

    root = TrieNode()
    # 插入数字
    for num in nums:
        node = root
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            if not node.children[bit]:
                node.children[bit] = TrieNode()
            node = node.children[bit]

    # 找最大异或值
    max_xor = 0
    for num in nums:
        node = root
        cur_xor = 0
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            # 贪心：尽量走反向
            toggled = 1 - bit
            if node.children[toggled]:
                cur_xor |= (1 << i)
                node = node.children[toggled]
            else:
                node = node.children[bit]
        max_xor = max(max_xor, cur_xor)
    return max_xor
```

> 时间复杂度：O(n × 32) | 空间复杂度：O(n × 32)

### LeetCode 477. 汉明距离总和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[477]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/total-hamming-distance/" target="_blank">汉明距离总和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>计算数组中所有数对之间的汉明距离（二进制不同位数）之和。</p>
  <p><strong>核心思路</strong>：逐位统计。对于第 i 位，如果有 k 个数在该位为 1，n-k 个为 0，则该位贡献 k × (n-k)。</p>
  <div class="problem-tags">
    <span class="tag">位运算</span>
    <span class="tag">数学</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 只出现一次的数字 | O(n) | O(1) |
| 只出现一次的数字 II | O(n) | O(1) |
| 只出现一次的数字 III | O(n) | O(1) |
| 最大异或值 | O(n × 32) | O(n × 32) |
| 汉明距离总和 | O(n × 32) | O(1) |

## 相关主题

- [位运算 - 位技巧](/topics/bit-manipulation/tricks) — 异或应用与位技巧结合解决复杂问题
- [位运算 - 状态压缩](/topics/bit-manipulation/state-compression) — 异或可用于状态压缩中的状态切换
