# 优先队列：堆实现、任务调度

## 概念讲解

优先队列（Priority Queue）是一种特殊的队列，每次出队的是优先级最高（或最低）的元素。通常用堆（Heap）实现。

### 核心思想

- **最大堆/最小堆**：最大堆中父节点 >= 子节点，最小堆中父节点 <= 子节点
- **插入**：先加到末尾，然后上浮（sift up）
- **删除堆顶**：用最后一个元素替换堆顶，然后下沉（sift down）
- **堆化**：从最后一个非叶子节点开始下沉，O(n) 建堆
- **Python heapq**：默认最小堆，用负值实现最大堆

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 最小堆找 Top-K | 维护大小为 k 的最小堆，堆顶就是第 k 大的 |
| 最大堆找 Top-K | 用负数模拟或直接维护最小堆 |
| 堆存元组 | `(优先级, 数据)` 结构 |
| 懒删除 | 延迟删除堆中的元素 |

## 经典题目

### 215. 数组中的第 K 个最大元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">215</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/kth-largest-element-in-an-array/" target="_blank">数组中的第 K 个最大元素</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找数组中第 k 大的元素。维护大小为 k 的最小堆，遍历数组保持堆中始终有 k 个最大的元素，堆顶即答案。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">分治</span>
  </div>
</div>

```python
def findKthLargest(self, nums: List[int], k: int) -> int:
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
```

### 347. 前 K 个高频元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">347</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/top-k-frequent-elements/" target="_blank">前 K 个高频元素</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回数组中出现频率最高的 k 个元素。用哈希表统计频率，然后用最小堆选出前 k 个高频元素。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">哈希表</span>
  </div>
</div>

```python
def topKFrequent(self, nums: List[int], k: int) -> List[int]:
    freq = Counter(nums)
    # 使用最小堆
    heap = []
    for num, cnt in freq.items():
        heapq.heappush(heap, (cnt, num))
        if len(heap) > k:
            heapq.heappop(heap)
    return [num for _, num in heap]
```

### 692. 前K个高频单词

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">692</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/top-k-frequent-words/" target="_blank">前K个高频单词</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回出现频率最高的 k 个单词。频率相同按字典序排序。堆中存元组 (-freq, word) 或自定义比较函数。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">哈希表</span>
    <span class="tag">排序</span>
  </div>
</div>

```python
def topKFrequent(self, words: List[str], k: int) -> List[str]:
    freq = Counter(words)
    heap = []
    for word, cnt in freq.items():
        # Python heap 是最小堆，用 (-cnt, word) 实现按频率降序、字典序升序
        heapq.heappush(heap, (-cnt, word))
    
    return [heapq.heappop(heap)[1] for _ in range(k)]
```

### 973. 最接近原点的 K 个点

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">973</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/k-closest-points-to-origin/" target="_blank">最接近原点的 K 个点</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到距原点最近的 k 个点。维护大小为 k 的最大堆（用负距离），每次新点距离更小时弹出堆顶并入堆。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">几何</span>
  </div>
</div>

```python
def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
    heap = []
    for x, y in points:
        dist = -(x * x + y * y)  # 用负值模拟最大堆
        if len(heap) < k:
            heapq.heappush(heap, (dist, x, y))
        elif dist > heap[0][0]:
            heapq.heapreplace(heap, (dist, x, y))
    return [[x, y] for _, x, y in heap]
```

### 1046. 最后一块石头的重量

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">1046</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/last-stone-weight/" target="_blank">最后一块石头的重量</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>每次取两块最重的石头粉碎，求最后剩下的石头重量。用最大堆每次取两块，相等则全碎，不等则放回差值。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">模拟</span>
  </div>
</div>

```python
def lastStoneWeight(self, stones: List[int]) -> int:
    # Python 只有最小堆，用负数模拟最大堆
    heap = [-s for s in stones]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        y = -heapq.heappop(heap)
        x = -heapq.heappop(heap)
        if x != y:
            heapq.heappush(heap, -(y - x))
    
    return -heap[0] if heap else 0
```

## 复杂度分析

| 操作 | 时间复杂度 | 说明 |
|------|-----------|------|
| 插入 | O(log k) | k 为堆大小 |
| 删除堆顶 | O(log k) | - |
| 堆化 | O(n) | 自底向上建堆 |
| Top-K | O(n log k) | 维护大小为 k 的堆 |

优先队列在处理 **Top-K、任务调度、数据流中位数** 等问题时非常高效。核心思路是维护一个大小为 k 的堆，在 O(n log k) 时间内完成任务，远优于直接排序的 O(n log n)。

## 相关主题

- [堆 - Top K问题](/topics/heap/top-k) — 优先队列是实现 Top K 的核心数据结构
- [堆 - 合并K个有序](/topics/heap/merge-k-sorted) — 优先队列高效合并多个有序序列
