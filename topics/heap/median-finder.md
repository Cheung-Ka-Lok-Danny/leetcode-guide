# 数据流中位数

在动态数据流中实时获取中位数是堆结构的高级应用，巧妙利用双堆机制可以在 O(1) 时间得到中位数。

## 核心概念

### 双堆技巧

核心思想是用两个堆将数据流分为两半：

- **最大堆（左半部分）**：存储较小的一半数字，堆顶是这一半的最大值
- **最小堆（右半部分）**：存储较大的一半数字，堆顶是这一半的最小值

**中位数获取：**
- 如果两个堆大小相等 → 中位数 = (最大堆顶 + 最小堆顶) / 2
- 如果最大堆多一个 → 中位数 = 最大堆顶

### 平衡条件

两个堆需要保持大小平衡：
- `0 ≤ len(max_heap) - len(min_heap) ≤ 1`
- 最大堆的大小 ≥ 最小堆的大小（约定左半部分多一个）

### 插入操作的维护步骤

1. 新元素先加入最大堆（左半部分）
2. 将最大堆顶移到最小堆（保证左半部分所有元素 ≤ 右半部分所有元素）
3. 如果最小堆大小 > 最大堆大小，将最小堆顶移回最大堆（恢复大小平衡）

## 关键技巧

1. **Python 最大堆模拟**：存入负数实现最大堆
2. **固定插入模板**：三步法——入左、调平衡、再平衡
3. **延迟删除**：滑动窗口场景用哈希表记录待删除元素，在需要时惰性删除
4. **浮点数处理**：注意结果为浮点数的情况（如 `(a + b) / 2.0`）

## 经典题目

### LeetCode 295. 数据流的中位数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[295]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-median-from-data-stream/" target="_blank">数据流的中位数</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>设计一个支持以下操作的数据结构：添加数字到数据流；返回当前所有元素的中位数。</p>
  <p><strong>核心思路</strong>：双堆——左半用最大堆（存负数），右半用最小堆。插入时先入左堆，然后将左堆最大值移到右堆，若右堆过大则移回左堆。保证左堆大小 ≥ 右堆且相差不超过 1。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">双堆</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # 最大堆（存负数）
        self.large = []  # 最小堆

    def addNum(self, num):
        heapq.heappush(self.small, -num)
        # 保证 small 的最大值 ≤ large 的最小值
        if self.small and self.large and (-self.small[0]) > self.large[0]:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        # 保证大小平衡：len(small) >= len(large)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2.0
```

> addNum 时间复杂度：O(log n) | findMedian 时间复杂度：O(1) | 空间复杂度：O(n)

### LeetCode 480. 滑动窗口中位数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[480]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sliding-window-median/" target="_blank">滑动窗口中位数</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在滑动窗口（大小为 k）中，返回每个窗口中位数组成的数组。</p>
  <p><strong>核心思路</strong>：双堆 + 延迟删除。当窗口滑动时，要删除的元素不在堆顶时先记录到哈希表。当要删除的元素出现在堆顶时，再真正弹出。维护双堆的平衡需要同时考虑"需要删除的元素"的数量。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">双堆</span>
    <span class="tag">滑动窗口</span>
    <span class="tag">延迟删除</span>
  </div>
</div>

## 复杂度分析

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| addNum（295） | O(log n) | 堆插入/删除操作 |
| findMedian（295） | O(1) | 直接取堆顶 |
| 滑动窗口移动（480） | O(log k) | 插入 + 延迟删除 |
| 总空间 | O(n) | 存储所有元素 |

## 双堆 vs 其他方法

| 方法 | 插入 | 查询中位数 | 特点 |
|------|------|-----------|------|
| **双堆** | O(log n) | O(1) | 推荐，平衡性好 |
| **有序数组** | O(n) | O(1) | 插入慢 |
| **平衡 BST** | O(log n) | O(log n) | 语言依赖 |
| **插入排序** | O(n) | O(1) | 数据量小时可用 |

## 相关主题

- [堆 - 双堆技巧](/topics/heap/double-heap) — 双堆是中位数查找的底层实现技术
- [堆 - Top K问题](/topics/heap/top-k) — 中位数与 Top K 都涉及堆的经典应用
