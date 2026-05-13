# 双堆技巧

双堆（Two Heaps）是一种使用最大堆和最小堆配合解决问题的模式，广泛应用于需要同时关注数据流中"最大"和"最小"元素的场景。

## 核心概念

### 双堆模式

双堆模式的核心思想是将数据集分为两部分，分别用堆来管理：

- **最大堆**：存储较小的一半数据，快速获取最大值
- **最小堆**：存储较大的一半数据，快速获取最小值

通过两个堆的配合，可以在 O(1) 时间获取中位数、在 O(log n) 时间插入新元素。

### 核心应用场景

| 场景 | 说明 |
|------|------|
| **数据流中位数** | 实时获取中位数 |
| **IPO/项目选择** | 在满足条件的情况下选择"最赚钱"的项目 |
| **区间查找** | 在动态数据中快速找到符合条件的区间 |
| **双端Top K** | 同时维护最大和最小的 K 个元素 |

### 双堆的平衡原则

两个堆的平衡需要满足两个条件：
1. **大小平衡**：|len(max_heap) - len(min_heap)| ≤ 1
2. **值范围平衡**：最大堆的所有元素 ≤ 最小堆的所有元素

## 关键技巧

1. **Python 最大堆模拟**：添加元素时存 `-val`，取出时取 `-heapq.heappop(heap)`
2. **三步插入法**：添加到左堆 → 将左堆最大移到右堆 → 平衡两堆大小
3. **延迟删除**：当删除元素不在堆顶时，用哈希表标记，弹出时再真正删除
4. **面试重点**：295（数据流中位数）是双堆最经典的考题，务必掌握

## 经典题目

### LeetCode 295. 数据流的中位数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[295]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-median-from-data-stream/" target="_blank">数据流的中位数</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>设计数据结构支持添加数字和获取中位数。</p>
  <p><strong>核心思路</strong>：双堆的典型应用。左半部分用最大堆（存负数），右半部分用最小堆。每次插入后调整保持两个堆的大小和值范围平衡。</p>
  <div class="problem-tags">
    <span class="tag">双堆</span>
    <span class="tag">数据流中位数</span>
    <span class="tag">高频面试</span>
  </div>
</div>

> 详细代码见 [数据流中位数](./median-finder) 章节。

### LeetCode 502. IPO

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[502]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/ipo/" target="_blank">IPO</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>初始资金 w，最多完成 k 个项目，每个项目有（启动资本 capital, 利润 profits），求最大化总资金。</p>
  <p><strong>核心思路</strong>：双堆——将项目按启动资本排序后，用小顶堆（或排序后指针）管理"可做的项目"，用大顶堆管理"可做项目中利润最大的"。每次从可做项目堆中弹出利润最大的项目执行，更新资金后再把新解锁的项目加入可做堆。</p>
  <div class="problem-tags">
    <span class="tag">双堆</span>
    <span class="tag">贪心</span>
    <span class="tag">排序</span>
  </div>
</div>

```python
import heapq

def findMaximizedCapital(k, w, profits, capital):
    n = len(profits)
    projects = sorted(zip(capital, profits))
    heap = []
    i = 0

    for _ in range(k):
        while i < n and projects[i][0] <= w:
            heapq.heappush(heap, -projects[i][1])
            i += 1
        if not heap:
            break
        w += -heapq.heappop(heap)

    return w
```

> 时间复杂度：O(n log n + k log n) | 空间复杂度：O(n)

### LeetCode 436. 寻找右区间

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[436]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-right-interval/" target="_blank">寻找右区间</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>对每个区间 [start, end]，找到左端点 ≥ 当前区间 end 的最小左端点所在区间的索引。</p>
  <p><strong>核心思路</strong>：排序 + 二分搜索，或用双堆——将区间按 start 排序，遍历区间时用最小堆维护 end，对每个 end 在已排序的 start 数组中二分查找最小的 ≥ end 的 start。</p>
  <div class="problem-tags">
    <span class="tag">双堆</span>
    <span class="tag">二分</span>
    <span class="tag">排序</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 295. 数据流中位数 | O(log n) per add | O(n) |
| 502. IPO | O(n log n + k log n) | O(n) |
| 436. 寻找右区间 | O(n log n) | O(n) |

## 双堆通用模板

```python
import heapq

class TwoHeaps:
    def __init__(self):
        self.max_heap = []  # 存储较小的一半（负数）
        self.min_heap = []  # 存储较大的一半

    def add(self, num):
        # 1. 先加入最大堆
        heapq.heappush(self.max_heap, -num)
        # 2. 平衡值范围
        if self.max_heap and self.min_heap and (-self.max_heap[0]) > self.min_heap[0]:
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)
        # 3. 平衡大小
        if len(self.max_heap) > len(self.min_heap) + 1:
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)
        if len(self.min_heap) > len(self.max_heap):
            val = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -val)
```

## 相关主题

- [堆 - 中位数](/topics/heap/median-finder) — 双堆技巧是中位数查找问题的核心实现
- [堆 - Top K问题](/topics/heap/top-k) — 双堆与 Top K 都涉及堆的灵活运用
