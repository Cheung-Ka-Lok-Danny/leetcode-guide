# 排序与搜索

排序和搜索是算法中最基础也最重要的操作。排序算法展示了不同的算法设计思想，而二分搜索则是高效查找的经典方法。

## 核心概念

- **排序稳定性**：相等元素的相对顺序是否保持不变
- **原地排序**：是否需要额外内存空间
- **比较排序 vs 非比较排序**
- **二分搜索**：在有序数组中用 O(log n) 时间查找目标

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/sorting-searching/sorting">排序算法</a>
  <a href="/topics/sorting-searching/binary-search">二分查找</a>
  <a href="/topics/sorting-searching/rotated-array">搜索旋转数组</a>
  <a href="/topics/sorting-searching/binary-answer">二分答案</a>
</div>

## 排序算法对比

| 算法 | 平均时间 | 最坏时间 | 空间 | 稳定 |
|------|---------|---------|------|------|
| 冒泡排序 | O(n²) | O(n²) | O(1) | ✓ |
| 选择排序 | O(n²) | O(n²) | O(1) | ✗ |
| 插入排序 | O(n²) | O(n²) | O(1) | ✓ |
| 归并排序 | O(n log n) | O(n log n) | O(n) | ✓ |
| 快速排序 | O(n log n) | O(n²) | O(log n) | ✗ |
| 堆排序 | O(n log n) | O(n log n) | O(1) | ✗ |
| 计数排序 | O(n+k) | O(n+k) | O(k) | ✓ |

## 搜索复杂度

| 算法 | 时间复杂度 | 空间复杂度 | 前提条件 |
|------|-----------|-----------|---------|
| 线性搜索 | O(n) | O(1) | 无 |
| 二分搜索 | O(log n) | O(1) | 有序数组 |
| 三分搜索 | O(log₃ n) | O(1) | 单峰函数 |
