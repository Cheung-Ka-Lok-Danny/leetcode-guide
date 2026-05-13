# 计数统计

计数统计是哈希表最直接的应用——通过统计元素出现的频率来解决各种频次相关问题。

## 核心概念

### 频率统计思想

计数统计的核心是利用哈希表记录每个元素出现的次数，将问题转化为对频率的分析。

常见模式：
- **词频统计**：统计字符串/数组中各元素的出现次数
- **多数元素**：出现次数超过半数的元素
- **字符计数**：统计字符串中字符频率

### 计数数组 vs 哈希表

| 数据结构 | 适用场景 | 优点 | 缺点 |
|---------|---------|------|------|
| **计数数组** | 数据范围有限且连续（如 26 个小写字母） | O(1) 访问，空间小 | 数据范围大时不适用 |
| **哈希表** | 数据范围大或未知 | 空间灵活，通用 | 略慢于数组，有哈希开销 |

> 选择原则：如果键的范围已知且紧凑（如 `a-z`、`0-100`），优先用数组；否则用哈希表。

### 摩尔投票算法（Boyer-Moore Majority Vote）

寻找多数元素（出现次数 > ⌊n/2⌋）的高效算法，只需 O(1) 空间：

- 核心思想：不同元素相互抵消
- 两个阶段：候选者选择 + 验证
- 时间复杂度 O(n)，空间复杂度 O(1)

## 关键技巧

1. **Counter 模块**：Python 中 `collections.Counter` 是封装好的计数工具
2. **字符 ↔ 索引**：`ord(c) - ord('a')` 将小写字母映射到 0-25
3. **两层计数**：对字符串的字符频率进行比较是判断变位词的基础
4. **多数元素验证**：摩尔投票只保证找到候选者，需要验证是否真的超过半数

## 经典题目

### LeetCode 169. 多数元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[169]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/majority-element/" target="_blank">多数元素</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>找出数组中出现次数超过一半的元素。</p>
  <p><strong>核心思路</strong>：摩尔投票算法——维护候选元素和计数器，遍历时相同则计数+1，不同则计数-1，计数为0时更换候选。最后候选即为多数元素。</p>
  <div class="problem-tags">
    <span class="tag">摩尔投票</span>
    <span class="tag">O(1)空间</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def majorityElement(nums):
    candidate = None
    count = 0
    for num in nums:
        if count == 0:
            candidate = num
        count += 1 if num == candidate else -1
    return candidate
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 242. 有效的字母异位词

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[242]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/valid-anagram/" target="_blank">有效的字母异位词</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断两个字符串是否由相同字符组成（字母异位词）。</p>
  <p><strong>核心思路</strong>：统计两个字符串中字符频率并比较。可以用计数数组（26个小写字母）或 Counter。另一个简洁方案是排序后比较。</p>
  <div class="problem-tags">
    <span class="tag">计数</span>
    <span class="tag">哈希表</span>
  </div>
</div>

```python
def isAnagram(s, t):
    if len(s) != len(t):
        return False
    count = [0] * 26
    for c in s:
        count[ord(c) - ord('a')] += 1
    for c in t:
        idx = ord(c) - ord('a')
        count[idx] -= 1
        if count[idx] < 0:
            return False
    return True
```

> 时间复杂度：O(n) | 空间复杂度：O(1)（26 个计数槽位，大小固定）

### LeetCode 387. 字符串中的第一个唯一字符

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[387]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/first-unique-character-in-a-string/" target="_blank">字符串中的第一个唯一字符</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>找到字符串中第一个不重复的字符，返回其索引。</p>
  <p><strong>核心思路</strong>：两遍遍历——第一遍统计频率，第二遍找到第一个频率为1的字符。也可以用有序哈希表优化第二遍遍历的范围。</p>
  <div class="problem-tags">
    <span class="tag">计数</span>
    <span class="tag">字符串</span>
  </div>
</div>

### LeetCode 451. 根据字符出现频率排序

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[451]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sort-characters-by-frequency/" target="_blank">根据字符出现频率排序</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>按字符出现频率降序排列字符串。</p>
  <p><strong>核心思路</strong>：先用 Counter 统计频率，再按频率排序（桶排序或直接排序），最后拼接字符。桶排序方案：将相同频率的字符放入同一桶。</p>
  <div class="problem-tags">
    <span class="tag">计数</span>
    <span class="tag">桶排序</span>
  </div>
</div>

## 复杂度分析

| 操作 | 计数数组 | 哈希表 |
|------|---------|--------|
| 统计频率 | O(n) + O(U) | O(n) |
| 查找结果 | O(U) | O(k) |
| 空间消耗 | O(U) | O(k) |

> n = 数据量，U = 数据范围（或字符集大小），k = 不同元素的个数

## 相关主题

- [哈希表 - 哈希映射](/topics/hash-table/hash-map) — 计数统计与哈希映射配合解决复杂统计问题
- [数组与字符串 - 双串问题](/topics/array-string/two-strings) — 字符计数在双串问题中的广泛应用
