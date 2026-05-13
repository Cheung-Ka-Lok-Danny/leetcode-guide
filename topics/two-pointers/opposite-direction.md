# 对撞指针

对撞指针（Opposite-direction Two Pointers）是指两个指针从数组两端向中间移动，常用于有序数组中的查找和比较问题。

## 核心概念

### 基本思想
- 左指针 `left` 指向数组开头，右指针 `right` 指向末尾
- 根据条件判断移动左指针或右指针，直到两指针相遇
- 通常需要**数组有序**作为前提

### 通用模板

```python
def two_pointers(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        if condition(left, right):
            # 处理当前结果
            left += 1   # 或 right -= 1
        else:
            right -= 1  # 或 left += 1
    return result
```

### 常见应用场景
- **两数之和**（有序数组）
- **盛水容器**（面积最大）
- **回文验证**
- **原地反转/移动**

## 经典题目

### LeetCode 167. 两数之和 II - 输入有序数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[167]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/" target="_blank">两数之和 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在升序数组中找到两数之和等于目标值，返回下标。</p>
  <p><strong>核心思路</strong>：左右指针。和小于 target 时左指针右移（增大和），和大于 target 时右指针左移（减小和）。</p>
  <div class="problem-tags">
    <span class="tag">对撞指针</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        elif s < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 11. 盛最多水的容器

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[11]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/container-with-most-water/" target="_blank">盛最多水的容器</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找两条垂线与 x 轴组成的容器，使其盛水最多。</p>
  <p><strong>核心思路</strong>：对撞指针。面积 = min(height[left], height[right]) × (right - left)。每次移动较矮的边，因为移动较高边不可能得到更大的面积。</p>
  <div class="problem-tags">
    <span class="tag">对撞指针</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def maxArea(height):
    left, right = 0, len(height) - 1
    max_area = 0
    while left < right:
        h = min(height[left], height[right])
        max_area = max(max_area, h * (right - left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_area
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 125. 验证回文串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[125]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/valid-palindrome/" target="_blank">验证回文串</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断字符串是否为回文串（只考虑字母和数字，忽略大小写）。</p>
  <p><strong>核心思路</strong>：对撞指针。跳过非字母数字字符后，比较左右字符是否相等。</p>
  <div class="problem-tags">
    <span class="tag">对撞指针</span>
    <span class="tag">字符串</span>
    <span class="tag">入门题</span>
  </div>
</div>

### LeetCode 344. 反转字符串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[344]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/reverse-string/" target="_blank">反转字符串</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>原地反转字符数组。</p>
  <p><strong>核心思路</strong>：对撞指针，交换左右字符后向中间移动。</p>
  <div class="problem-tags">
    <span class="tag">对撞指针</span>
    <span class="tag">入门题</span>
  </div>
</div>

### LeetCode 283. 移动零

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[283]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/move-zeroes/" target="_blank">移动零</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>将数组中所有 0 移到末尾，同时保持非零元素的相对顺序。</p>
  <p><strong>核心思路</strong>：快慢指针。慢指针指向第一个 0 的位置，快指针遍历数组。遇到非零元素时与慢指针位置交换。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 两数之和 II | O(n) | O(1) |
| 盛最多水的容器 | O(n) | O(1) |
| 验证回文串 | O(n) | O(1) |
| 反转字符串 | O(n) | O(1) |
| 移动零 | O(n) | O(1) |

## 相关主题

- [双指针 - 三数之和](/topics/two-pointers/three-sum) — 对撞指针是三数之和的核心解法
- [数组与字符串 - 遍历技巧](/topics/array-string/traversal) — 对撞指针是数组遍历的重要技巧
