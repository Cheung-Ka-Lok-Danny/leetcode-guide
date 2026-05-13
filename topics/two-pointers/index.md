# 双指针

双指针（Two Pointers）是一种利用两个指针在数组或字符串中协同遍历的技巧，可以大幅降低时间复杂度。

## 核心概念

- **对撞指针**：一左一右向中间移动
- **快慢指针**：不同速度移动
- **滑动窗口**：维护一个区间（独立主题）
- **合并指针**：两个序列合并时使用

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/two-pointers/opposite-direction">对撞指针</a>
  <a href="/topics/two-pointers/fast-slow">快慢指针</a>
  <a href="/topics/two-pointers/merge-pointers">合并指针</a>
  <a href="/topics/two-pointers/three-sum">三数之和</a>
</div>

## 复杂度总览

| 技巧 | 时间复杂度 | 空间复杂度 | 适用场景 |
|------|-----------|-----------|---------|
| 对撞指针 | O(n) | O(1) | 有序数组查找、回文判断 |
| 快慢指针 | O(n) | O(1) | 环检测、找中点 |
| 合并指针 | O(n+m) | O(1) | 合并有序数组 |
| 多指针 | O(n²) | O(1)~O(n) | 三数/四数之和 |
