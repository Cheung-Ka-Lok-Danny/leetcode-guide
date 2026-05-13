# 窗口计数

窗口计数是滑动窗口的进阶技巧，用哈希表或数组统计窗口内字符/数字的频率，处理更复杂的匹配问题。

## 核心概念

### 通用滑动窗口模板（计数型）

```python
def sliding_window(s, t):
    # need 记录目标字符的需求，window 记录窗口内的字符
    need = Counter(t)
    window = {}
    left = 0
    valid = 0  # 已满足需求的不同字符数

    for right in range(len(s)):
        # 扩展窗口
        c = s[right]
        if c in need:
            window[c] = window.get(c, 0) + 1
            if window[c] == need[c]:
                valid += 1

        # 收缩窗口（用于求最短子串）
        while valid == len(need):
            # 更新结果
            ...

            d = s[left]
            left += 1
            if d in need:
                if window[d] == need[d]:
                    valid -= 1
                window[d] -= 1
    return result
```

### 关键技巧
- **need**：目标字符串的需求字典
- **window**：当前窗口内的字符计数
- **valid**：满足需求的字符种类数，当 valid == len(need) 时窗口满足条件

## 经典题目

### LeetCode 76. 最小覆盖子串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[76]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-window-substring/" target="_blank">最小覆盖子串</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在 s 中找到包含 t 中所有字符的最短子串。</p>
  <p><strong>核心思路</strong>：用 need 统计 t 中字符需求，valid 跟踪满足需求的字符数。当 valid==len(need) 时尝试收缩 left 求最短。</p>
  <div class="problem-tags">
    <span class="tag">滑动窗口</span>
    <span class="tag">计数</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def minWindow(s, t):
    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1
    window = {}
    left = 0
    valid = 0
    start, min_len = 0, float('inf')

    for right in range(len(s)):
        c = s[right]
        if c in need:
            window[c] = window.get(c, 0) + 1
            if window[c] == need[c]:
                valid += 1

        while valid == len(need):
            if right - left + 1 < min_len:
                start = left
                min_len = right - left + 1
            d = s[left]
            left += 1
            if d in need:
                if window[d] == need[d]:
                    valid -= 1
                window[d] -= 1

    return s[start:start+min_len] if min_len != float('inf') else ""
```

> 时间复杂度：O(n) | 空间复杂度：O(k)，k 为字符集大小

### LeetCode 438. 找到字符串中所有字母异位词

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[438]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-all-anagrams-in-a-string/" target="_blank">找到字符串中所有字母异位词</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在 s 中找到所有 p 的异位词子串的起始索引。</p>
  <p><strong>核心思路</strong>：定长窗口 = len(p)。用 need 统计 p 中字符频率，滑动过程中维护 valid，当 valid==len(need) 且窗口长度等于 len(p) 时记录。</p>
  <div class="problem-tags">
    <span class="tag">滑动窗口</span>
    <span class="tag">计数</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def findAnagrams(s, p):
    need = {}
    for c in p:
        need[c] = need.get(c, 0) + 1
    window = {}
    left = 0
    valid = 0
    res = []

    for right in range(len(s)):
        c = s[right]
        if c in need:
            window[c] = window.get(c, 0) + 1
            if window[c] == need[c]:
                valid += 1

        # 收缩：窗口长度超过 len(p)
        if right - left + 1 > len(p):
            d = s[left]
            left += 1
            if d in need:
                if window[d] == need[d]:
                    valid -= 1
                window[d] -= 1

        if valid == len(need) and right - left + 1 == len(p):
            res.append(left)

    return res
```

> 时间复杂度：O(n) | 空间复杂度：O(k)

### LeetCode 567. 字符串的排列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[567]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/permutation-in-string/" target="_blank">字符串的排列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断 s2 中是否包含 s1 的排列（异位词）。</p>
  <p><strong>核心思路</strong>：与 438 题相同思路，只不过只需返回 True/False 而非所有索引。</p>
  <div class="problem-tags">
    <span class="tag">滑动窗口</span>
    <span class="tag">计数</span>
  </div>
</div>

### LeetCode 30. 串联所有单词的子串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[30]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/substring-with-concatenation-of-all-words/" target="_blank">串联所有单词的子串</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在 s 中找到所有包含 words 中每个单词（长度相同）恰好一次的子串的起始位置。</p>
  <p><strong>核心思路</strong>：将字符串按单词长度分组，用滑动窗口统计单词频次。外层需要枚举偏移量（0 到 word_len-1）。</p>
  <div class="problem-tags">
    <span class="tag">滑动窗口</span>
    <span class="tag">哈希表</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 最小覆盖子串 | O(n) | O(k) |
| 找到字符串中所有异位词 | O(n) | O(k) |
| 字符串的排列 | O(n) | O(k) |
| 串联所有单词的子串 | O(n × word_len) | O(m) |

## 相关主题

- [滑动窗口 - 定长窗口](/topics/sliding-window/fixed-window) — 窗口计数方法在定长窗口中的应用
- [哈希表 - 计数统计](/topics/hash-table/counting) — 窗口计数的底层依赖哈希表做频次统计
