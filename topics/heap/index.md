# 堆

堆（Heap）是一种特殊的完全二叉树，满足堆序性——父节点的值永远大于等于（大顶堆）或小于等于（小顶堆）子节点的值。

## 核心概念

- **大顶堆**：最大值在根节点
- **小顶堆**：最小值在根节点
- **上浮/下沉**：堆的调整操作
- **建堆**：O(n) 时间构建堆
- **应用场景**：Top K、中位数、任务调度

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/heap/top-k">Top K问题</a>
  <a href="/topics/heap/merge-k-sorted">合并K个有序</a>
  <a href="/topics/heap/median-finder">数据流中位数</a>
  <a href="/topics/heap/double-heap">双堆技巧</a>
</div>

## 复杂度总览

| 操作 | 时间复杂度 |
|------|-----------|
| 建堆 | O(n) |
| 插入 | O(log n) |
| 删除堆顶 | O(log n) |
| 获取堆顶 | O(1) |
| 堆排序 | O(n log n) |
