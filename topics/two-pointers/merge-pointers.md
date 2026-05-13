# 合并指针

合并指针（Merge Pointers）是指用两个指针分别遍历两个有序序列，通过比较大小完成合并操作。

## 核心概念

### 基本思想
- 两个指针分别指向两个有序序列的当前元素
- 比较两个指针所指元素，选取较小/较大的放入结果
- 移动到下一个元素继续比较
- 一个序列遍历完后，将另一序列的剩余部分直接加入

### 合并模板

```python
# 合并两个有序数组模板
def merge(nums1, m, nums2, n):
    i, j, k = m - 1, n - 1, m + n - 1
    while i >= 0 and j >= 0:
        if nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1
    # 处理剩余元素
    while j >= 0:
        nums1[k] = nums2[j]
        j -= 1
        k -= 1
```

## 经典题目

### LeetCode 88. 合并两个有序数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[88]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/merge-sorted-array/" target="_blank">合并两个有序数组</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>将两个非递减顺序合并到 nums1 中（nums1 有足够空间）。</p>
  <p><strong>核心思路</strong>：从后往前双指针，将较大元素放到 nums1 末尾。避免从前往后覆盖的问题。</p>
  <div class="problem-tags">
    <span class="tag">合并指针</span>
    <span class="tag">数组</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def merge(nums1, m, nums2, n):
    i, j, k = m - 1, n - 1, m + n - 1
    while i >= 0 and j >= 0:
        if nums1[i] >= nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1
    # nums2 可能还有剩余
    while j >= 0:
        nums1[k] = nums2[j]
        j -= 1
        k -= 1
```

> 时间复杂度：O(m + n) | 空间复杂度：O(1)

### LeetCode 21. 合并两个有序链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[21]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/merge-two-sorted-lists/" target="_blank">合并两个有序链表</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>将两个升序链表合并为一个新的升序链表。</p>
  <p><strong>核心思路</strong>：用哨兵节点简化边界。比较两个链表当前节点，将较小者接入结果链表。</p>
  <div class="problem-tags">
    <span class="tag">合并指针</span>
    <span class="tag">链表</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 986. 区间列表的交集

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[986]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/interval-list-intersections/" target="_blank">区间列表的交集</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>两个已排序的区间列表，求它们的交集区间。</p>
  <p><strong>核心思路</strong>：双指针遍历两个列表。取两个区间的左端最大值和右端最小值得到交集区间（当左 <= 右时）。将右端较小的区间指针前移。</p>
  <div class="problem-tags">
    <span class="tag">合并指针</span>
    <span class="tag">区间</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 合并两个有序数组 | O(m + n) | O(1) |
| 合并两个有序链表 | O(m + n) | O(1) |
| 区间列表的交集 | O(m + n) | O(1) 不计结果 |

## 相关主题

- [双指针 - 对撞指针](/topics/two-pointers/opposite-direction) — 合并指针与对撞指针都是双指针的具体模式
- [链表 - 合并链表](/topics/linked-list/merge-lists) — 合并指针的思路广泛应用于有序链表合并
