# 双串问题：字符计数、字符串变换

## 概念讲解

双串问题研究两个字符串之间的关系，核心思路是利用字符计数和哈希映射来建立映射关系。

### 核心思想

- **字符计数**：用数组（长度为26或128）或哈希表统计每个字符出现的次数
- **字母异位词**：两个字符串包含相同字符和相同数量 ⇒ 排序后相等 或 字符计数一致
- **同构字符串**：存在双射（bijection）关系，即 s 中的字符可以一一映射到 t 中的字符
- **模式匹配**：通过建立字符到字符的映射表，验证字符串是否符合某种模式

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 定长数组计数 | 仅含小写字母时用 `[0]*26` 比哈希表更快 |
| 双向映射 | 同构关系需要 s→t 和 t→s 两个方向验证 |
| 索引映射 | 用字符上次出现的位置代替映射关系 |
| 排序比较 | 字母异位词排序后完全相等 |

## 经典题目

### 242. 有效的字母异位词

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">242</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/valid-anagram/" target="_blank">有效的字母异位词</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断两个字符串是否为字母异位词（字符相同，排列不同）。两种方法：排序比较或字符计数。长度不同直接返回 false。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">排序</span>
  </div>
</div>

```python
def isAnagram(self, s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    # 字符计数法
    count = [0] * 26
    for ch in s:
        count[ord(ch) - ord('a')] += 1
    for ch in t:
        count[ord(ch) - ord('a')] -= 1
        if count[ord(ch) - ord('a')] < 0:
            return False
    return True
```

### 383. 赎金信

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">383</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/ransom-note/" target="_blank">赎金信</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断 ransomNote 能否由 magazine 中的字符组成（每个字符只能用一次）。统计 magazine 中各字符数量，然后检查 ransomNote 是否消耗不超过可用量。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">计数</span>
  </div>
</div>

```python
def canConstruct(self, ransomNote: str, magazine: str) -> bool:
    count = [0] * 26
    for ch in magazine:
        count[ord(ch) - ord('a')] += 1
    for ch in ransomNote:
        idx = ord(ch) - ord('a')
        count[idx] -= 1
        if count[idx] < 0:
            return False
    return True
```

### 205. 同构字符串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">205</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/isomorphic-strings/" target="_blank">同构字符串</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断两个字符串是否同构——s 中的字符可以替换成 t 中的字符。需要建立 s→t 和 t→s 的双向映射，防止多对一映射。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">映射</span>
  </div>
</div>

```python
def isIsomorphic(self, s: str, t: str) -> bool:
    map_st, map_ts = {}, {}
    for cs, ct in zip(s, t):
        if (cs in map_st and map_st[cs] != ct) or \
           (ct in map_ts and map_ts[ct] != cs):
            return False
        map_st[cs] = ct
        map_ts[ct] = cs
    return True
```

### 290. 单词规律

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">290</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/word-pattern/" target="_blank">单词规律</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断字符串 pattern 和字符串 s 的单词之间是否遵循相同的双射关系。将 s 按空格分割后，类似同构字符串的思路建立映射。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">映射</span>
  </div>
</div>

```python
def wordPattern(self, pattern: str, s: str) -> bool:
    words = s.split()
    if len(pattern) != len(words):
        return False
    
    map_pw, map_wp = {}, {}
    for p, w in zip(pattern, words):
        if (p in map_pw and map_pw[p] != w) or \
           (w in map_wp and map_wp[w] != p):
            return False
        map_pw[p] = w
        map_wp[w] = p
    return True
```

### 49. 字母异位词分组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">49</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/group-anagrams/" target="_blank">字母异位词分组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将字符串数组中的字母异位词分组。用排序后的字符串或字符计数元组作为哈希表的 key，将异位词归类到同一组。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">排序</span>
  </div>
</div>

```python
def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    groups = {}
    for s in strs:
        # 用排序后的字符串作为 key
        key = ''.join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())
```

## 复杂度分析

| 问题 | 时间复杂度 | 空间复杂度 | 核心方法 |
|------|-----------|-----------|---------|
| 字母异位词判断 | O(n) | O(1) | 定长数组计数 |
| 同构字符串 | O(n) | O(1) | 双向映射 |
| 异位词分组 | O(n×klogk) | O(n×k) | 排序作为 key |

双串问题的核心是**确认映射关系的类型**：是一对一的替换（同构）、多对一的包含关系（赎金信）、还是排列关系（异位词）。准确识别映射类型是解题的关键第一步。

## 相关主题

- [哈希表 - 计数统计](/topics/hash-table/counting) — 字符计数与哈希表密切相关
- [字符串匹配](/topics/array-string/string-matching) — 双串问题中的模式匹配与字符串匹配算法结合
