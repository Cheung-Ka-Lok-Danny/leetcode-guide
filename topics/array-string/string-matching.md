# 字符串匹配：KMP、Rabin-Karp、暴力匹配

## 概念讲解

字符串匹配（Pattern Matching）是在主串中找到模式串出现的位置。不同算法在时间复杂度和适用场景上有显著差异。

### 核心思想

- **暴力匹配（Brute Force）**：逐字符比较，不匹配时模式串右移一位。最坏 O(m×n)
- **KMP算法**：利用前缀表（next数组）在失配时跳过已匹配的前缀，避免回溯。O(m+n)
- **Rabin-Karp**：利用滚动哈希，在 O(n) 时间内比较所有长度为 m 的子串的哈希值
- **Boyer-Moore**：从右向左匹配，利用坏字符规则和好后缀规则跳过尽可能多的字符

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| next数组 | KMP的核心，记录每个位置的最长相等前后缀长度 |
| 滚动哈希 | Rabin-Karp用滑动窗口更新哈希值，O(1) 计算每个子串哈希 |
| 双哈希 | 用两个不同模数的哈希函数避免哈希冲突 |
| Z函数 | 计算每个位置与字符串前缀的最长匹配长度 |

## 经典题目

### 28. 找出字符串中第一个匹配项的下标

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">28</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/" target="_blank">找出字符串中第一个匹配项的下标</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>在 haystack 中找 needle 的首次出现位置。经典字符串匹配问题，可以用 KMP 或内置 find 函数实现。</p>
  <div class="problem-tags">
    <span class="tag">字符串匹配</span>
    <span class="tag">KMP</span>
  </div>
</div>

```python
def strStr(self, haystack: str, needle: str) -> int:
    """KMP算法实现"""
    m, n = len(needle), len(haystack)
    if m == 0:
        return 0
    
    # 构建 next 数组
    next_arr = [0] * m
    j = 0
    for i in range(1, m):
        while j > 0 and needle[i] != needle[j]:
            j = next_arr[j - 1]
        if needle[i] == needle[j]:
            j += 1
        next_arr[i] = j
    
    # 匹配
    j = 0
    for i in range(n):
        while j > 0 and haystack[i] != needle[j]:
            j = next_arr[j - 1]
        if haystack[i] == needle[j]:
            j += 1
        if j == m:
            return i - m + 1
    
    return -1
```

### 459. 重复的子字符串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">459</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/repeated-substring-pattern/" target="_blank">重复的子字符串</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断字符串是否由重复子串构成。巧妙解法：s + s 并去掉首尾字符，若包含 s 则说明是重复的。KMP的 next 数组也可解——n % (n - next[-1]) == 0。</p>
  <div class="problem-tags">
    <span class="tag">字符串</span>
    <span class="tag">KMP</span>
  </div>
</div>

```python
def repeatedSubstringPattern(self, s: str) -> bool:
    # 巧妙解法
    return s in (s + s)[1:-1]
```

### 686. 重复叠加字符串匹配

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">686</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/repeated-string-match/" target="_blank">重复叠加字符串匹配</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将字符串 a 重复叠加多次，使 b 成为其子串，求最小重复次数。将 a 叠加到长度 >= len(b) + len(a) 后检查，最多检查两次。</p>
  <div class="problem-tags">
    <span class="tag">字符串</span>
    <span class="tag">匹配</span>
  </div>
</div>

```python
def repeatedStringMatch(self, a: str, b: str) -> int:
    times = (len(b) + len(a) - 1) // len(a)
    for i in range(times, times + 2):
        if b in a * i:
            return i
    return -1
```

### 796. 旋转字符串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">796</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/rotate-string/" target="_blank">旋转字符串</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断 s 能否通过若干次旋转得到 goal。经典解法：检查 len(s)==len(goal) 且 goal in s+s。</p>
  <div class="problem-tags">
    <span class="tag">字符串</span>
    <span class="tag">KMP</span>
  </div>
</div>

```python
def rotateString(self, s: str, goal: str) -> bool:
    return len(s) == len(goal) and goal in s + s
```

## 复杂度分析

| 算法 | 预处理时间 | 匹配时间 | 空间复杂度 | 说明 |
|------|-----------|---------|-----------|------|
| 暴力匹配 | O(1) | O(m×n) | O(1) | 简单但最坏情况慢 |
| KMP | O(m) | O(n) | O(m) | 线性时间，适合重复模式 |
| Rabin-Karp | O(m) | O(n) 平均 | O(1) | 适合多模式匹配 |
| Boyer-Moore | O(m) | O(n) 平均 | O(m) | 实际性能最好的通用算法 |

在实际面试中，KMP 是最常考察的字符串匹配算法，重点在于理解 **next 数组的构建**和**失配时的跳跃逻辑**。对于简单的匹配需求，暴力法往往已经足够。

## 相关主题

- [双串问题](/topics/array-string/two-strings) — 字符串匹配与双串问题的相互转换
