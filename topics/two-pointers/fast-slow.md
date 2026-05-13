# 快慢指针

快慢指针（Fast and Slow Pointers）是一快一慢两个指针同向移动，常用于链表环检测、数组去重等场景。

## 核心概念

### 基本思想
- **快指针**：每次移动两步或多步，负责探索
- **慢指针**：每次移动一步，负责记录结果位置
- 通过速度差来达到不同目的

### 常见应用

| 场景 | 快指针速度 | 慢指针作用 |
|------|-----------|-----------|
| 链表环检测 | 2 倍速 | 每次 1 步，检测相遇 |
| 数组去重 | 遍历每个元素 | 指向不重复的插入位置 |
| 移除元素 | 遍历每个元素 | 指向保留元素的插入位置 |
| 找中点 | 2 倍速 | 快指针到末尾时慢指针在中点 |

### 数组去重模板

```python
# 有序数组去重模板
def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0  # 指向最后一个不重复元素
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1
```

## 经典题目

### LeetCode 26. 删除有序数组中的重复项

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[26]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/remove-duplicates-from-sorted-array/" target="_blank">删除有序数组中的重复项</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>原地删除有序数组中的重复元素，返回不重复部分的长度。</p>
  <p><strong>核心思路</strong>：慢指针指向最后一个不重复元素，快指针遍历数组。遇到新元素时慢指针前移并赋值。</p>
  <div class="problem-tags">
    <span class="tag">快慢指针</span>
    <span class="tag">数组</span>
    <span class="tag">入门题</span>
  </div>
</div>

```python
def removeDuplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 27. 移除元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[27]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/remove-element/" target="_blank">移除元素</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>原地移除数组中所有等于 val 的元素，返回新长度。</p>
  <p><strong>核心思路</strong>：快慢指针。快指针遍历，当快指针的值不等于 val 时，赋值给慢指针位置并移动慢指针。</p>
  <div class="problem-tags">
    <span class="tag">快慢指针</span>
    <span class="tag">数组</span>
    <span class="tag">入门题</span>
  </div>
</div>

```python
def removeElement(nums, val):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    return slow
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 283. 移动零

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[283]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/move-zeroes/" target="_blank">移动零</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>将数组中所有 0 移到末尾，同时保持非零元素相对顺序。</p>
  <p><strong>核心思路</strong>：快慢指针。慢指针指向第一个 0 的位置，快指针遍历。遇到非零时与慢指针交换，慢指针后移。</p>
  <div class="problem-tags">
    <span class="tag">快慢指针</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 80. 删除有序数组中的重复项 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[80]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/" target="_blank">删除有序数组中的重复项 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>原地删除有序数组中重复元素，使每个元素最多出现两次，返回新长度。</p>
  <p><strong>核心思路</strong>：慢指针指向待插入位置，快指针遍历。判断 nums[fast] != nums[slow-2] 时赋值。</p>
  <div class="problem-tags">
    <span class="tag">快慢指针</span>
    <span class="tag">数组</span>
  </div>
</div>

### LeetCode 202. 快乐数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[202]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/happy-number/" target="_blank">快乐数</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断一个数是否为快乐数（各位平方和最终为 1）。</p>
  <p><strong>核心思路</strong>：快慢指针检测循环。慢指针每次计算一次平方和，快指针计算两次。如果相遇且不为 1，则存在循环。</p>
  <div class="problem-tags">
    <span class="tag">快慢指针</span>
    <span class="tag">哈希表</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 删除有序数组重复项 | O(n) | O(1) |
| 移除元素 | O(n) | O(1) |
| 移动零 | O(n) | O(1) |
| 删除重复项 II | O(n) | O(1) |
| 快乐数 | O(log n) | O(1) |

## 相关主题

- [链表 - 快慢指针](/topics/linked-list/fast-slow-pointers) — 快慢指针在链表与数组中均可使用
- [链表 - 环形链表](/topics/linked-list/cycle-detection) — 快慢指针的思想在环检测中广泛应用
