# 字符串排列

字符串排列问题是滑动窗口中定长窗口的典型应用，通过固定大小窗口在长串中滑动，匹配目标字符串的字符计数。

## 核心概念

### 问题本质
判断长串中是否存在某个连续子串，是目标字符串的排列（异位词，即字符组成相同但顺序可以不同）。

### 解题思路
- 用固定大小窗口（长度 = 目标字符串长度）在长串上滑动
- 比较窗口内的字符计数是否与目标字符串的计数一致
- 优化：使用 valid 计数跟踪匹配的字符种类数

```python
# 字符串排列检测模板
def check_inclusion(s1, s2):
    need = Counter(s1)
    window = {}
    left = 0
    valid = 0

    for right in range(len(s2)):
        c = s2[right]
        if c in need:
            window[c] = window.get(c, 0) + 1
            if window[c] == need[c]:
                valid += 1

        # 保持窗口长度 = len(s1)
        if right - left + 1 > len(s1):
            d = s2[left]
            left += 1
            if d in need:
                if window[d] == need[d]:
                    valid -= 1
                window[d] -= 1

        if valid == len(need):
            return True

    return False
```

## 经典题目

### LeetCode 567. 字符串的排列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[567]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/permutation-in-string/" target="_blank">字符串的排列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断 s2 中是否包含 s1 的排列。</p>
  <p><strong>核心思路</strong>：定长窗口。窗口大小固定为 len(s1)，统计窗口内字符频次，与 s1 的频次字典比较。</p>
  <div class="problem-tags">
    <span class="tag">滑动窗口</span>
    <span class="tag">计数</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 438. 找到字符串中所有字母异位词

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[438]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-all-anagrams-in-a-string/" target="_blank">找到字符串中所有字母异位词</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在 s 中找到所有 p 的异位词子串的起始索引。</p>
  <p><strong>核心思路</strong>：与 567 同思路，但记录所有满足条件的起始位置。当 valid==len(need) 且窗口长度为 len(p) 时记录 left。</p>
  <div class="problem-tags">
    <span class="tag">滑动窗口</span>
    <span class="tag">计数</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 76. 最小覆盖子串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[76]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-window-substring/" target="_blank">最小覆盖子串</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在 s 中找到包含 t 中所有字符的最短子串（t 中字符可重复）。</p>
  <p><strong>核心思路</strong>：与固定窗口不同，这里是不定长窗口。扩展 right 直到包含所有字符，再收缩 left 找最短。</p>
  <div class="problem-tags">
    <span class="tag">滑动窗口</span>
    <span class="tag">最短子串</span>
    <span class="tag">必做题</span>
  </div>
</div>

## 题目对比

| 题目 | 窗口类型 | 目标 | 输出 |
|------|---------|------|------|
| 567 排列 | 定长 | 是否存在排列 | True/False |
| 438 异位词 | 定长 | 所有异位词位置 | List[索引] |
| 76 覆盖子串 | 不定长 | 最短覆盖 | 子串 |

## 相关主题

- [滑动窗口 - 窗口计数](/topics/sliding-window/window-counting) — 字符串排列的窗口计数方法与窗口计数相通
- [数组与字符串 - 双串问题](/topics/array-string/two-strings) — 字符串排列与双串问题共享字符计数思想
