# 二分查找

二分查找（Binary Search）是在有序数组中查找目标值的高效算法，通过不断缩小搜索范围，将时间复杂度从 O(n) 降至 O(log n)。

## 核心概念

### 标准二分查找

**前提条件**：数组已排序（通常升序）

**基本思想**：
1. 定义搜索区间 [left, right]
2. 取中间位置 mid = (left + right) // 2
3. 比较 nums[mid] 与 target，缩小搜索范围
4. 重复直到找到或区间为空

### 查找左右边界

当数组中有重复元素时，需要找到目标值第一次或最后一次出现的位置：

| 变体 | 条件 | 收缩方向 |
|------|------|---------|
| **左边界（第一个 ≥ target）** | nums[mid] ≥ target → right = mid | 向左收缩 |
| **右边界（最后一个 ≤ target）** | nums[mid] ≤ target → left = mid | 向右收缩 |
| **严格左边界（第一个 ≥ target）** | 同左边界 | 左闭右开区间 |

### 泛化二分模板

```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:       # 标准区间 [left, right]
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

```python
def find_left(nums, target):
    """查找第一个 >= target 的位置"""
    left, right = 0, len(nums)
    while left < right:        # 左闭右开 [left, right)
        mid = (left + right) // 2
        if nums[mid] >= target:
            right = mid
        else:
            left = mid + 1
    return left
```

## 关键技巧

1. **区间定义要一致**：全过程中保持对区间定义的统一
2. **防止整数溢出**：`mid = left + (right - left) // 2` 可以防止大数相加溢出
3. **寻找右边界**：可以用左边界函数 + 1 间接得到
4. **二分不依赖索引**：只要能定义"搜索空间"和"可行性判断"的，都可以二分

## 经典题目

### LeetCode 704. 二分查找

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[704]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-search/" target="_blank">二分查找</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>在有序数组中查找目标值，返回索引。</p>
  <p><strong>核心思路</strong>：标准二分模板。不断取中间值比较，缩小搜索区间。注意边界条件——左闭右闭区间是 left <= right。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">模板题</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

> 时间复杂度：O(log n) | 空间复杂度：O(1)

### LeetCode 34. 在排序数组中查找元素的第一个和最后一个位置

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[34]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/" target="_blank">在排序数组中查找元素的第一个和最后一个位置</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在有序数组中找到目标值的第一个和最后一个位置。</p>
  <p><strong>核心思路</strong>：两次二分——第一次找左边界（第一个 ≥ target），第二次找右边界（最后一个 ≤ target）。分别实现查找左边界和右边界的二分变体。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">左右边界</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def searchRange(nums, target):
    def find_left():
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] >= target:
                right = mid
            else:
                left = mid + 1
        return left

    def find_right():
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] <= target:
                left = mid + 1
            else:
                right = mid
        return left - 1

    left = find_left()
    if left == len(nums) or nums[left] != target:
        return [-1, -1]
    return [left, find_right()]
```

> 时间复杂度：O(log n) | 空间复杂度：O(1)

### LeetCode 35. 搜索插入位置

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[35]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/search-insert-position/" target="_blank">搜索插入位置</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>在有序数组中查找目标值，如果不存在则返回应该插入的位置。</p>
  <p><strong>核心思路</strong>：寻找第一个 ≥ target 的位置，即左边界查找。模板直接返回 left 即可。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">左边界</span>
  </div>
</div>

### LeetCode 69. x 的平方根

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[69]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sqrtx/" target="_blank">x 的平方根</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>计算并返回 x 的平方根（只保留整数部分）。</p>
  <p><strong>核心思路</strong>：在 [0, x] 中二分查找，找到最大的 mid 使得 mid² ≤ x。注意 x 较大时 mid² 可能溢出，用 mid ≤ x // mid 避免。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">数学</span>
  </div>
</div>

### LeetCode 74. 搜索二维矩阵

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[74]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/search-a-2d-matrix/" target="_blank">搜索二维矩阵</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在每行升序且下一行首元素大于上一行末尾元素的矩阵中搜索目标值。</p>
  <p><strong>核心思路</strong>：将二维矩阵展开为一维数组进行二分查找。索引映射：row = mid // n, col = mid % n。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">矩阵</span>
  </div>
</div>

### LeetCode 162. 寻找峰值

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[162]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-peak-element/" target="_blank">寻找峰值</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在数组中找到任意一个峰值元素（比相邻元素大的元素）。</p>
  <p><strong>核心思路</strong>：二分法——比较 nums[mid] 和 nums[mid+1]。如果上升趋势（nums[mid] < nums[mid+1]），峰值在右边；否则在左边。利用"一定存在峰值"的性质。</p>
  <div class="problem-tags">
    <span class="tag">二分查找</span>
    <span class="tag">局部搜索</span>
  </div>
</div>

## 复杂度分析

| 题目 | 变体 | 时间 | 空间 |
|------|------|------|------|
| 704. 二分查找 | 标准二分 | O(log n) | O(1) |
| 34. 查找范围 | 左右边界 | O(log n) | O(1) |
| 35. 插入位置 | 左边界 | O(log n) | O(1) |
| 69. 平方根 | 值域二分 | O(log x) | O(1) |
| 74. 搜索矩阵 | 二维映射 | O(log(mn)) | O(1) |
| 162. 寻找峰值 | 局部二分 | O(log n) | O(1) |

## 相关主题

- [排序与搜索 - 搜索旋转数组](/topics/sorting-searching/rotated-array) — 旋转数组搜索是二分查找的变种
- [排序与搜索 - 二分答案](/topics/sorting-searching/binary-answer) — 二分答案扩展了二分查找的应用边界
