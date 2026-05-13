# 不定长窗口

不定长窗口（Variable-size Sliding Window）的窗口大小不固定，根据条件动态调整左右边界。

## 核心概念

### 基本思想
- 右指针不断扩展窗口，直到窗口不满足条件
- 左指针收缩窗口，直到窗口重新满足条件
- 记录过程中满足条件的窗口长度/值

### 通用模板

```python
# 不定长窗口模板
def variable_window(arr):
    left = 0
    window = ...
    result = ...

    for right in range(len(arr)):
        # 加入右边界元素
        add(arr[right], window)

        # 收缩窗口直到满足条件
        while not is_valid(window):
            remove(arr[left], window)
            left += 1

        # 更新结果
        result = max(result, right - left + 1)

    return result
```

### 常见类型
- **最长子串**：窗口不满足条件时收缩（求最长）
- **最短子串**：窗口满足条件时收缩（求最短）
- **计数子串**：满足条件时计数并收缩

## 经典题目

### LeetCode 3. 无重复字符的最长子串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[3]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-substring-without-repeating-characters/" target="_blank">无重复字符的最长子串</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出不含重复字符的最长子串的长度。</p>
  <p><strong>核心思路</strong>：用哈希集合记录窗口内字符。right 不断右移，遇到重复时收缩 left 直到重复字符被移除。更新最大长度。</p>
  <div class="problem-tags">
    <span class="tag">不定长窗口</span>
    <span class="tag">哈希表</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len
```

> 时间复杂度：O(n) | 空间复杂度：O(min(n, 字符集大小))

### LeetCode 209. 长度最小的子数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[209]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-size-subarray-sum/" target="_blank">长度最小的子数组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到和 >= target 的连续子数组的最小长度。</p>
  <p><strong>核心思路</strong>：right 右移累加窗口和。当和 >= target 时，收缩 left 并记录最小长度，直到和 < target。</p>
  <div class="problem-tags">
    <span class="tag">不定长窗口</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def minSubArrayLen(target, nums):
    left = 0
    window_sum = 0
    min_len = float('inf')
    for right in range(len(nums)):
        window_sum += nums[right]
        while window_sum >= target:
            min_len = min(min_len, right - left + 1)
            window_sum -= nums[left]
            left += 1
    return 0 if min_len == float('inf') else min_len
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 713. 乘积小于 K 的子数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[713]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/subarray-product-less-than-k/" target="_blank">乘积小于 K 的子数组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>统计所有乘积小于 K 的连续子数组的个数。</p>
  <p><strong>核心思路</strong>：窗口内乘积 < K 时，以 right 结尾的子数组个数为 right - left + 1。乘积 >= K 时收缩 left。</p>
  <div class="problem-tags">
    <span class="tag">不定长窗口</span>
    <span class="tag">计数</span>
  </div>
</div>

### LeetCode 904. 水果成篮

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[904]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/fruit-into-baskets/" target="_blank">水果成篮</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>最多收集两种水果的最长连续子数组。</p>
  <p><strong>核心思路</strong>：窗口内最多两种不同数字，用哈希表记录每种数字的计数。超过两种时从 left 收缩。</p>
  <div class="problem-tags">
    <span class="tag">不定长窗口</span>
    <span class="tag">哈希表</span>
  </div>
</div>

### LeetCode 424. 替换后的最长重复字符

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[424]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-repeating-character-replacement/" target="_blank">替换后的最长重复字符</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>最多替换 K 个字符后，最长的全是同一种字符的子串。</p>
  <p><strong>核心思路</strong>：维护窗口内出现最多的字符频次 max_freq。当窗口长度 - max_freq > K 时收缩，因为需要替换的次数超过了 K。</p>
  <div class="problem-tags">
    <span class="tag">不定长窗口</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 无重复字符最长子串 | O(n) | O(字符集大小) |
| 长度最小的子数组 | O(n) | O(1) |
| 乘积小于 K 的子数组 | O(n) | O(1) |
| 水果成篮 | O(n) | O(1) |
| 替换后的最长重复字符 | O(n) | O(1) |

## 相关主题

- [滑动窗口 - 定长窗口](/topics/sliding-window/fixed-window) — 不定长窗口与定长窗口互为补充
- [滑动窗口 - 窗口计数](/topics/sliding-window/window-counting) — 窗口计数在不定长窗口中维护统计信息
