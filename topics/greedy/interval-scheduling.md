# 区间调度

区间调度是贪心算法最经典的题型之一，核心思路是按结束时间排序后贪心地选取不重叠的区间。

## 核心概念

### 区间调度问题

**最大不相交区间数**：给定多个区间，求最多能选出多少个互不重叠的区间。

贪心策略：
1. **按区间结束时间升序排序**
2. 依次遍历，选取与前一个选中区间不重叠的区间

```python
# 最大不相交区间数模板
def max_non_overlapping(intervals):
    intervals.sort(key=lambda x: x[1])  # 按结束时间排序
    count = 0
    end = float('-inf')
    for s, e in intervals:
        if s >= end:  # 不重叠
            count += 1
            end = e
    return count
```

### 为什么按结束时间排序？
- 选择越早结束的区间，为后续区间留出越多空间
- 贪心选择性质：局部最优 ⇒ 全局最优
- 数学证明：按结束时间排序的选择策略一定是最优的

## 经典题目

### LeetCode 435. 无重叠区间

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[435]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/non-overlapping-intervals/" target="_blank">无重叠区间</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>移除最少数量的区间使得剩余区间互不重叠。</p>
  <p><strong>核心思路</strong>：求最大不相交区间数，然后用总数减去该值。按结束时间排序，贪心选取不重叠区间。</p>
  <div class="problem-tags">
    <span class="tag">区间调度</span>
    <span class="tag">贪心</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def eraseOverlapIntervals(intervals):
    if not intervals:
        return 0
    intervals.sort(key=lambda x: x[1])
    count = 1
    end = intervals[0][1]
    for s, e in intervals[1:]:
        if s >= end:
            count += 1
            end = e
    return len(intervals) - count
```

> 时间复杂度：O(n log n) | 空间复杂度：O(1)

### LeetCode 452. 用最少数量的箭引爆气球

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[452]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/" target="_blank">用最少数量的箭引爆气球</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>每个气球是水平区间，一箭可射穿重叠的气球，求最少箭数。</p>
  <p><strong>核心思路</strong>：按结束坐标排序，从第一个气球的右端射箭，贪心地覆盖所有重叠气球。当新气球左端超过箭的位置时，需要新箭。</p>
  <div class="problem-tags">
    <span class="tag">区间调度</span>
    <span class="tag">贪心</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def findMinArrowShots(points):
    if not points:
        return 0
    points.sort(key=lambda x: x[1])
    arrows = 1
    end = points[0][1]
    for s, e in points[1:]:
        if s > end:
            arrows += 1
            end = e
    return arrows
```

> 时间复杂度：O(n log n) | 空间复杂度：O(1)

### LeetCode 56. 合并区间

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[56]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/merge-intervals/" target="_blank">合并区间</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>合并所有重叠的区间。</p>
  <p><strong>核心思路</strong>：按起始位置排序。遍历区间，若当前区间起始 <= 已合并区间的结束，则合并（更新结束位置）；否则新增一个区间。</p>
  <div class="problem-tags">
    <span class="tag">区间</span>
    <span class="tag">排序</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 57. 插入区间

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[57]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/insert-interval/" target="_blank">插入区间</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定一个已排序的不重叠区间列表，插入一个新区间（需要合并重叠部分）。</p>
  <p><strong>核心思路</strong>：分三段处理——在新区间左侧的不重叠区间、与新区间重叠的区间（合并）、在新区间右侧的不重叠区间。</p>
  <div class="problem-tags">
    <span class="tag">区间</span>
    <span class="tag">模拟</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 无重叠区间 | O(n log n) | O(1) |
| 用箭引爆气球 | O(n log n) | O(1) |
| 合并区间 | O(n log n) | O(n) |
| 插入区间 | O(n) | O(n) |

## 相关主题

- [贪心 - 跳跃游戏](/topics/greedy/jump-game) — 区间调度与跳跃游戏均基于贪心策略
- [排序与搜索 - 排序算法](/topics/sorting-searching/sorting) — 区间调度需要先按端点排序
