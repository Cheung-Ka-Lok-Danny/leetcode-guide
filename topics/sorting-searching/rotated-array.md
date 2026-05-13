# 搜索旋转数组

搜索旋转数组是二分查找的进阶应用，旋转数组是经过一次旋转的有序数组，依然可以利用有序部分进行高效搜索。

## 核心概念

### 什么是旋转数组

旋转数组是将一个升序数组从某个位置切分后交换两部分得到：

```
原数组：  [0, 1, 2, 4, 5, 6, 7]
旋转后：  [4, 5, 6, 7, 0, 1, 2]    —— 旋转点从 4 处切分
```

旋转数组的特点：
- 数组被分为两个有序部分（左半和右半）
- 左半部分所有元素 > 右半部分所有元素
- 旋转点（最小值）位于两部分的交界处

### 核心判断逻辑

在旋转数组中进行二分搜索时，关键在于**确定哪一半是有序的**：

1. 计算 mid
2. 判断左半区间 [left, mid] 是否有序：`nums[left] ≤ nums[mid]`
3. 如果左半有序：
   - 如果 target 在左半范围内（`nums[left] ≤ target < nums[mid]`），则在左半查找
   - 否则在右半查找
4. 如果右半有序（即左半无序）：
   - 如果 target 在右半范围内（`nums[mid] < target ≤ nums[right]`），则在右半查找
   - 否则在左半查找

### 无重复 vs 有重复

| 版本 | 条件 | 特殊处理 |
|------|------|---------|
| **无重复**（33） | `nums[left] ≤ nums[mid]` 可以确定有序 | 标准二分 |
| **有重复**（81） | `nums[left] == nums[mid]` 时无法判断 | 需要 left++ 跳过重复 |

## 关键技巧

1. **画图辅助**：在脑中画出旋转数组的图像更容易理解
2. **核心条件**：判断 mid 在左半还是右半
3. **边界处理**：注意判断 target 在有序区间内时的 && 条件
4. **重复值处理**：遇到 `nums[left] == nums[mid]` 时，left++ 收缩范围

## 经典题目

### LeetCode 33. 搜索旋转排序数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[33]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/search-in-rotated-sorted-array/" target="_blank">搜索旋转排序数组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在无重复的旋转排序数组中搜索目标值。</p>
  <p><strong>核心思路</strong>：二分搜索，每次先判断左半还是右半有序，然后根据 target 是否在有序区间内决定搜索方向。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">旋转数组</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid

        # 左半有序
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # 右半有序
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1
```

> 时间复杂度：O(log n) | 空间复杂度：O(1)

### LeetCode 81. 搜索旋转排序数组 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[81]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/" target="_blank">搜索旋转排序数组 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在有重复的旋转排序数组中搜索目标值。</p>
  <p><strong>核心思路</strong>：在 33 题基础上增加处理——当 `nums[left] == nums[mid]` 时，无法判断哪半有序，此时 left++ 跳过重复值。最坏情况（全等）退化为 O(n)。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">旋转数组</span>
    <span class="tag">去重</span>
  </div>
</div>

### LeetCode 153. 寻找旋转排序数组中的最小值

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[153]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/" target="_blank">寻找旋转排序数组中的最小值</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在无重复旋转排序数组中找到最小值。</p>
  <p><strong>核心思路</strong>：二分查找——如果 nums[mid] > nums[right]，最小值在右半；否则在左半（包括 mid）。最后 left 指向最小值。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">旋转数组</span>
    <span class="tag">最小值</span>
  </div>
</div>

```python
def findMin(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    return nums[left]
```

> 时间复杂度：O(log n) | 空间复杂度：O(1)

### LeetCode 154. 寻找旋转排序数组中的最小值 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[154]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/" target="_blank">寻找旋转排序数组中的最小值 II</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在有重复的旋转排序数组中找到最小值。</p>
  <p><strong>核心思路</strong>：在 153 题基础上处理重复——当 `nums[mid] == nums[right]` 时，无法确定最小值位置，让 right-- 缩小范围。最坏情况退化为 O(n)。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">旋转数组</span>
    <span class="tag">去重</span>
  </div>
</div>

## 复杂度分析

| 题目 | 算法 | 平均时间 | 最坏时间 | 空间 |
|------|------|---------|---------|------|
| 33. 搜索旋转数组 | 二分 | O(log n) | O(log n) | O(1) |
| 81. 搜索旋转数组 II | 二分 | O(log n) | O(n) | O(1) |
| 153. 找最小值 | 二分 | O(log n) | O(log n) | O(1) |
| 154. 找最小值 II | 二分 | O(log n) | O(n) | O(1) |

## 相关主题

- [排序与搜索 - 二分查找](/topics/sorting-searching/binary-search) — 旋转数组搜索基于二分查找的变种
- [排序与搜索 - 二分答案](/topics/sorting-searching/binary-answer) — 二分答案与旋转数组搜索共享二分框架
