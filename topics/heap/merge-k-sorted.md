# 合并 K 个有序序列

合并 K 个有序序列是多路归并的经典应用，常用于合并链表、矩阵搜索等问题。

## 核心概念

### 多路归并

**多路归并**是将 K 个已排序的序列合并为一个有序序列的过程。

**常规思路：**
- 直接合并：每次比较 K 个头部的元素，取最小的一个
- 使用优先队列优化：将 K 个头部元素放入最小堆，每次取出堆顶 O(1)，加入新元素 O(log K)

### 时间复杂度对比

| 方法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| K 个序列逐个合并 | O(K × N) | O(N) |
| 优先队列（堆） | O(N log K) | O(K) |
| 分治合并 | O(N log K) | O(log K) |

> N 为总元素个数，K 为序列数量。当 K 很大时，堆方法和分治方法明显优于逐个合并。

### 多种实现方式

```python
# 堆方法（推荐）
def mergeKLists_heap(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    # ...
```

## 关键技巧

1. **堆中存放元组**：`(值, 索引, 节点)`——元组第一个元素用于排序，索引用于避免节点类型比较错误
2. **处理空链表**：跳过空的链表，只将非空链表头加入堆
3. **虚拟头节点**：使用 `dummy = ListNode(0)` 简化链表构建
4. **Python 不能直接比较 ListNode**：堆需要可比较的元素，用索引作为第二排序字段避免类型错误

## 经典题目

### LeetCode 23. 合并 K 个升序链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[23]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/merge-k-sorted-lists/" target="_blank">合并 K 个升序链表</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>合并 K 个有序链表为一个有序链表。</p>
  <p><strong>核心思路</strong>：将 K 个链表头放入优先队列（最小堆），每次取出最小节点加入结果链表，然后将该节点的下一个节点入堆。重复直到堆为空。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">多路归并</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
import heapq

def mergeKLists(lists):
    dummy = ListNode(0)
    curr = dummy
    heap = []

    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))

    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next
```

> 时间复杂度：O(N log K)，N 为节点总数，K 为链表数量 | 空间复杂度：O(K)

### LeetCode 378. 有序矩阵中第 K 小的元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[378]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/" target="_blank">有序矩阵中第 K 小的元素</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在每行每列都升序的矩阵中找到第 K 小的元素。</p>
  <p><strong>核心思路</strong>：将每行视为一个有序序列，进行多路归并。将每行第一个元素入堆，然后 K 次弹出最小元素，每次将同一行的下一个元素入堆。也可以用二分答案法。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">多路归并</span>
    <span class="tag">二分答案</span>
  </div>
</div>

### LeetCode 264. 丑数 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[264]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/ugly-number-ii/" target="_blank">丑数 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到第 n 个丑数（质因子只有 2、3、5 的正整数）。</p>
  <p><strong>核心思路</strong>：将丑数序列视为三个有序子序列的合并——丑数×2、丑数×3、丑数×5。用最小堆，每次取出最小丑数，扩展三个新的丑数，用集合去重。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">多路归并</span>
    <span class="tag">DP</span>
  </div>
</div>

## 复杂度分析

| 题目 | 方法 | 时间复杂度 | 空间复杂度 |
|------|------|-----------|-----------|
| 23. 合并K个链表 | 堆 | O(N log K) | O(K) |
| 23. 合并K个链表 | 分治合并 | O(N log K) | O(log K) |
| 378. 有序矩阵第K小 | 堆 | O(K log N) | O(N) |
| 378. 有序矩阵第K小 | 二分答案 | O(N log(max-min)) | O(1) |
| 264. 丑数 II | 堆 | O(n log n) | O(n) |

## 相关主题

- [堆 - Top K问题](/topics/heap/top-k) — 合并 K 个有序与 Top K 都利用堆进行多路归并
- [链表 - 合并链表](/topics/linked-list/merge-lists) — 合并 K 个有序链表的链表操作基础
