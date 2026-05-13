# 单调栈：单调递增栈、单调递减栈

## 概念讲解

单调栈是一种特殊的栈结构，栈内元素保持单调递增或递减。主要用于在 O(n) 时间内找到数组中每个元素左边或右边第一个比它大/小的元素。

### 核心思想

- **单调递增栈**：栈内元素从栈底到栈顶递增，用于找左边/右边第一个更小元素
- **单调递减栈**：栈内元素从栈底到栈顶递减，用于找左边/右边第一个更大元素
- **入栈规则**：新元素破坏单调性时，持续弹出栈顶元素，然后入栈
- **计算时机**：元素被弹出时，可以确定它的下一个更小/更大元素

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 栈存索引 | 需要计算距离（如每日温度）时存下标 |
| 循环数组 | 遍历两遍或取模实现循环 |
| 哨兵元素 | 在数组末尾加最小值/最大值确保所有元素出栈 |
| 递增栈 → 找更小 | 遇到更小的元素就弹出，被弹出的元素找到右边更小的 |
| 递减栈 → 找更大 | 遇到更大的元素就弹出，被弹出的元素找到右边更大的 |

## 经典题目

### 739. 每日温度

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">739</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/daily-temperatures/" target="_blank">每日温度</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找每个温度后面第一个更高温度的距离。维护单调递减栈（栈内温度从栈底到栈顶递减），遇到更高的温度时弹出并计算天数差。</p>
  <div class="problem-tags">
    <span class="tag">单调栈</span>
    <span class="tag">栈</span>
  </div>
</div>

```python
def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
    n = len(temperatures)
    ans = [0] * n
    stack = []  # 存储索引，单调递减栈
    
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            prev = stack.pop()
            ans[prev] = i - prev
        stack.append(i)
    
    return ans
```

### 496. 下一个更大元素 I

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">496</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/next-greater-element-i/" target="_blank">下一个更大元素 I</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>nums1 是 nums2 的子集，找 nums1 中每个元素在 nums2 中的下一个更大元素。先对 nums2 用单调栈预处理出每个元素的下一个更大元素，存入哈希表。</p>
  <div class="problem-tags">
    <span class="tag">单调栈</span>
    <span class="tag">哈希表</span>
  </div>
</div>

```python
def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
    hashmap = {}
    stack = []
    
    for num in nums2:
        while stack and stack[-1] < num:
            hashmap[stack.pop()] = num
        stack.append(num)
    
    # 栈中剩余元素没有下一个更大元素
    while stack:
        hashmap[stack.pop()] = -1
    
    return [hashmap[num] for num in nums1]
```

### 503. 下一个更大元素 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">503</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/next-greater-element-ii/" target="_blank">下一个更大元素 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>循环数组中找每个元素的下一个更大元素。遍历两遍（2n 长度），用取模操作模拟循环数组。单调递减栈。</p>
  <div class="problem-tags">
    <span class="tag">单调栈</span>
    <span class="tag">循环数组</span>
  </div>
</div>

```python
def nextGreaterElements(self, nums: List[int]) -> List[int]:
    n = len(nums)
    ans = [-1] * n
    stack = []
    
    for i in range(2 * n):
        idx = i % n
        while stack and nums[stack[-1]] < nums[idx]:
            ans[stack.pop()] = nums[idx]
        if i < n:
            stack.append(idx)
    
    return ans
```

### 42. 接雨水

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">42</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/trapping-rain-water/" target="_blank">接雨水</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>给定柱子高度数组，计算能接多少雨水。单调递减栈：当遇到更高的柱子时，弹出栈顶并计算以该位置为底、当前高度和栈内新栈顶为边的积水量。</p>
  <div class="problem-tags">
    <span class="tag">单调栈</span>
    <span class="tag">双指针</span>
  </div>
</div>

```python
def trap(self, height: List[int]) -> int:
    stack = []
    water = 0
    
    for i, h in enumerate(height):
        while stack and height[stack[-1]] < h:
            bottom = height[stack.pop()]
            if not stack:
                break
            left = stack[-1]
            water += (i - left - 1) * (min(height[left], h) - bottom)
        stack.append(i)
    
    return water
```

### 84. 柱状图中最大的矩形

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">84</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/largest-rectangle-in-histogram/" target="_blank">柱状图中最大的矩形</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>找柱状图中最大矩形面积。单调递增栈：当遇到更矮的柱子时弹出，以弹出的高度为高，当前索引和栈内新栈顶索引为左右边界计算面积。末尾加0确保所有元素出栈。</p>
  <div class="problem-tags">
    <span class="tag">单调栈</span>
    <span class="tag">栈</span>
  </div>
</div>

```python
def largestRectangleArea(self, heights: List[int]) -> int:
    heights.append(0)  # 哨兵
    stack = []
    max_area = 0
    
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            left = stack[-1] if stack else -1
            width = i - left - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    
    return max_area
```

## 复杂度分析

| 问题 | 时间复杂度 | 空间复杂度 | 栈类型 |
|------|-----------|-----------|--------|
| 每日温度 | O(n) | O(n) | 递减栈 |
| 下一个更大元素 | O(n) | O(n) | 递减栈 |
| 接雨水 | O(n) | O(n) | 递减栈 |
| 最大矩形 | O(n) | O(n) | 递增栈 |

单调栈的核心是**在元素弹出时记录信息**。递增栈用于找"更小"，递减栈用于找"更大"。关键在于理解什么时候入栈、什么时候出栈、以及出栈时计算什么。

## 相关主题

- [栈与队列 - 队列应用](/topics/stack-queue/queue-applications) — 栈和队列互补，共同解决表达式与调度问题
