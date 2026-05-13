# 排序算法

排序是最基础的算法之一，掌握各种排序算法的原理、实现和适用场景是算法面试的基本要求。

## 核心概念

### 排序算法分类

| 类别 | 算法 | 平均时间 | 最坏时间 | 空间 | 稳定 |
|------|------|---------|---------|------|------|
| **比较排序** | 冒泡排序 | O(n²) | O(n²) | O(1) | ✓ |
| | 选择排序 | O(n²) | O(n²) | O(1) | ✗ |
| | 插入排序 | O(n²) | O(n²) | O(1) | ✓ |
| | 归并排序 | O(n log n) | O(n log n) | O(n) | ✓ |
| | 快速排序 | O(n log n) | O(n²) | O(log n) | ✗ |
| | 堆排序 | O(n log n) | O(n log n) | O(1) | ✗ |
| | 希尔排序 | O(n¹·³) | O(n²) | O(1) | ✗ |
| **非比较排序** | 计数排序 | O(n+k) | O(n+k) | O(k) | ✓ |
| | 基数排序 | O(n×k) | O(n×k) | O(n+k) | ✓ |
| | 桶排序 | O(n+k) | O(n²) | O(n) | ✓ |

### 排序稳定性

- **稳定排序**：相等的元素在排序后保持原来的相对顺序
- **应用场景**：先按姓氏排序，再按名字排序（稳定排序保证姓氏排好后名字的顺序仍在）

> 归并、插入、冒泡、计数、基数排序是稳定的；快速、选择、堆排序不稳定。

### 快排 vs 归并对比

| 特性 | 快速排序 | 归并排序 |
|------|---------|---------|
| 核心思想 | 分治 + 分区 | 分治 + 合并 |
| 额外空间 | O(log n) | O(n) |
| 最好情况 | O(n log n) | O(n log n) |
| 最坏情况 | O(n²) | O(n log n) |
| 稳定 | ✗ | ✓ |
| 适用场景 | 数组原地排序 | 链表排序、外部排序 |

## 关键技巧

1. **快排选 pivot**：随机选择可以有效避免最坏情况
2. **归并的空间优化**：链表归并不需要额外空间
3. **非比较排序**：当数据范围有限时，用计数排序可以达到 O(n) 时间
4. **自定义排序**：Python 中通过 `key` 参数或 `cmp_to_key` 实现复杂排序规则

## 经典题目

### LeetCode 912. 排序数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[912]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sort-an-array/" target="_blank">排序数组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>对整数数组进行升序排序。</p>
  <p><strong>核心思路</strong>：手写快排——选 pivot，将小于 pivot 的放左边，大于的放右边，递归排序左右。注意随机选择 pivot 避免最坏情况。</p>
  <div class="problem-tags">
    <span class="tag">排序</span>
    <span class="tag">快速排序</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
import random

def sortArray(nums):
    def quick_sort(left, right):
        if left >= right:
            return
        # 随机选 pivot
        pivot_idx = random.randint(left, right)
        nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]
        pivot = nums[right]

        i = left
        for j in range(left, right):
            if nums[j] < pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        nums[i], nums[right] = nums[right], nums[i]

        quick_sort(left, i - 1)
        quick_sort(i + 1, right)

    quick_sort(0, len(nums) - 1)
    return nums
```

> 时间复杂度：O(n log n) 平均 | 空间复杂度：O(log n)

### LeetCode 148. 排序链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[148]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sort-list/" target="_blank">排序链表</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>对链表进行排序，要求 O(n log n) 时间和 O(1) 额外空间。</p>
  <p><strong>核心思路</strong>：归并排序——快慢指针找中点分割链表，递归排序左右两半，然后合并两个有序链表。链表归并不需要额外数组空间。</p>
  <div class="problem-tags">
    <span class="tag">排序</span>
    <span class="tag">归并排序</span>
    <span class="tag">链表</span>
  </div>
</div>

### LeetCode 56. 合并区间

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[56]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/merge-intervals/" target="_blank">合并区间</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>合并所有重叠的区间。</p>
  <p><strong>核心思路</strong>：先按区间起点排序，然后遍历——如果当前区间起点 ≤ 结果中最后一个区间的终点，则更新终点；否则作为新区间加入结果。</p>
  <div class="problem-tags">
    <span class="tag">排序</span>
    <span class="tag">区间合并</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or interval[0] > merged[-1][1]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged
```

> 时间复杂度：O(n log n) | 空间复杂度：O(log n)（排序栈空间）

### LeetCode 75. 颜色分类

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[75]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sort-colors/" target="_blank">颜色分类</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>对 0、1、2 三种颜色进行排序（荷兰国旗问题）。</p>
  <p><strong>核心思路</strong>：三指针法（Dutch National Flag）——用 left、mid、right 三个指针，将 0 放到左边，2 放到右边，1 留在中间。一趟遍历完成。</p>
  <div class="problem-tags">
    <span class="tag">排序</span>
    <span class="tag">三指针</span>
    <span class="tag">荷兰国旗</span>
  </div>
</div>

### LeetCode 179. 最大数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[179]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/largest-number/" target="_blank">最大数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将非负整数拼接成最大的数字（以字符串形式返回）。</p>
  <p><strong>核心思路</strong>：自定义排序——比较两种拼接方式 `a+b` 和 `b+a`，谁大的顺序在前。注意全为 0 时要返回 "0"。</p>
  <div class="problem-tags">
    <span class="tag">排序</span>
    <span class="tag">自定义排序</span>
    <span class="tag">字符串</span>
  </div>
</div>

## 复杂度分析

| 题目 | 方法 | 时间 | 空间 |
|------|------|------|------|
| 912. 排序数组 | 快排 | O(n log n) | O(log n) |
| 148. 排序链表 | 归并 | O(n log n) | O(log n) |
| 56. 合并区间 | 排序 + 合并 | O(n log n) | O(log n) |
| 75. 颜色分类 | 三指针 | O(n) | O(1) |
| 179. 最大数 | 自定义排序 | O(n log n) | O(n) |

## 相关主题

- [排序与搜索 - 二分查找](/topics/sorting-searching/binary-search) — 排序是二分查找的前提条件
- [堆 - Top K问题](/topics/heap/top-k) — 堆排序是 Top K 问题的常用解法
