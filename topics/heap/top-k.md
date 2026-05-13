# Top K 问题

Top K 问题是在无序数组中找出最大或最小的 K 个元素，这是堆结构最经典的应用场景。

## 核心概念

### Top K 问题的解法对比

| 解法 | 时间复杂度 | 空间复杂度 | 特点 |
|------|-----------|-----------|------|
| **排序** | O(n log n) | O(1) | 最简单，但做了不必要的排序 |
| **堆（小顶堆找最大K）** | O(n log K) | O(K) | 适合海量数据（K 远小于 n） |
| **大顶堆找最小K** | O(n log K) | O(K) | 同理 |
| **快速选择 QuickSelect** | O(n) 平均 / O(n²) 最坏 | O(1) | 需要修改数组，不稳定 |

### 堆解法的核心思想

- **找最大 K 个元素**：维护一个大小为 K 的小顶堆，堆顶是这 K 个元素中最小的。遍历数组，如果元素大于堆顶，则替换堆顶并调整。
- **找最小 K 个元素**：维护一个大小为 K 的大顶堆，堆顶是这 K 个元素中最大的。遍历数组，如果元素小于堆顶，则替换堆顶并调整。

### 快速选择（QuickSelect）

基于快速排序的分区思想，通过 partition 操作确定第 K 大/小元素的位置，不需要完全排序。

> 面试中优先推荐堆解法，思路简单、代码稳定。QuickSelect 可作为进阶延伸。

### 时间复杂度对比

| 场景 | 排序 | 堆 | QuickSelect |
|------|------|-----|-------------|
| n=10⁶, K=100 | 较慢（全排序） | 快（维护100元素堆） | 快（但最坏情况慢） |
| n=10⁴, K=5000 | 中等 | 中等 | 推荐 |
| 需要保持原数组 | ✓ | ✓ | ✗（需拷贝） |
| 数据流场景 | ✗ | ✓ | ✗ |

## 关键技巧

1. **Python 默认最小堆**：`heapq` 是最小堆，找最大 K 用最小堆直接；找最小 K 需要存储负数模拟最大堆
2. **堆大小控制**：控制堆大小不超过 K，这是 O(n log K) 的关键
3. **自定义排序**：复杂对象的 Top K 可以通过 `(key, item)` 元组入堆
4. **海量数据**：堆解法的最大优势——内存只存 K 个元素

## 经典题目

### LeetCode 215. 数组中的第K个最大元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[215]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/kth-largest-element-in-an-array/" target="_blank">数组中的第K个最大元素</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在未排序数组中找到第 K 个最大的元素。</p>
  <p><strong>核心思路</strong>：维护大小为 K 的小顶堆，遍历时如果堆大小 < K 则直接入堆；否则如果元素 > 堆顶，则先 pop 堆顶再入堆。最终堆顶就是第 K 大的元素。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">Top K</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
import heapq

def findKthLargest(nums, k):
    heap = []
    for num in nums:
        if len(heap) < k:
            heapq.heappush(heap, num)
        elif num > heap[0]:
            heapq.heapreplace(heap, num)
    return heap[0]
```

> 时间复杂度：O(n log k) | 空间复杂度：O(k)

### LeetCode 347. 前 K 个高频元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[347]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/top-k-frequent-elements/" target="_blank">前 K 个高频元素</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回数组中出现频率最高的 K 个元素。</p>
  <p><strong>核心思路</strong>：先用 Counter 统计频率，然后用堆维护 Top K。将 (频率, 元素) 入堆，控制堆大小为 K。由于 Python 是最小堆，频率最低的会被优先弹出。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">哈希表</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 692. 前K个高频单词

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[692]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/top-k-frequent-words/" target="_blank">前K个高频单词</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回出现频率最高的 K 个单词，同频率按字典序排列。</p>
  <p><strong>核心思路</strong>：堆 + 自定义排序规则——先按频率（从小到大），频率相同则按字典序（从大到小，因为最小堆会先弹出字典序大的）。弹出后再反转结果。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">字符串</span>
  </div>
</div>

### LeetCode 973. 最接近原点的 K 个点

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[973]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/k-closest-points-to-origin/" target="_blank">最接近原点的 K 个点</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到离原点 (0,0) 最近的 K 个点。</p>
  <p><strong>核心思路</strong>：维护大小为 K 的大顶堆（用负数模拟），距离远的会被弹出。遍历所有点，堆中保留的就是最近的 K 个点。</p>
  <div class="problem-tags">
    <span class="tag">堆</span>
    <span class="tag">几何</span>
  </div>
</div>

## 复杂度分析

| 方法 | 平均时间 | 最坏时间 | 空间 | 适用 |
|------|---------|---------|------|------|
| 堆（Top K） | O(n log K) | O(n log K) | O(K) | 通用推荐 |
| QuickSelect | O(n) | O(n²) | O(1) | 数组不大时 |
| 排序 | O(n log n) | O(n log n) | O(1) | K ≈ n 时 |

## 相关主题

- [堆 - 合并K个有序](/topics/heap/merge-k-sorted) — Top K 与合并 K 个有序序列都依赖堆的思想
- [排序与搜索 - 排序算法](/topics/sorting-searching/sorting) — 排序算法是 Top K 问题的另一种求解思路
