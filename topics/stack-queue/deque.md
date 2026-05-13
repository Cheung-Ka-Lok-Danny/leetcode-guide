# 双端队列：滑动窗口最值

## 概念讲解

双端队列（Deque, Double-ended Queue）允许在两端进行插入和删除操作，在滑动窗口最值问题中有重要应用。

### 核心思想

- **滑动窗口最大值**：维护一个双端队列，保持队首为当前窗口的最大值
- **维护单调性**：新元素从队尾入队前，弹出所有比它小的元素（求最大值时为递减队列）
- **过期淘汰**：队首元素如果索引不在当前窗口内，从队首弹出
- **数据结构选择**：collections.deque 是 Python 内置的双端队列实现

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 队首存最大值 | 单调递减队列 |
| 队尾淘汰小值 | 保持队列单调性 |
| 索引 vs 值 | 队列中存索引便于判断是否过期 |
| 滑动窗口模板 | right 指针扩展 + left 指针收缩 |

## 经典题目

### 239. 滑动窗口最大值

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">239</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sliding-window-maximum/" target="_blank">滑动窗口最大值</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>返回每个滑动窗口中的最大值。维护单调递减双端队列，队首为当前窗口最大值。遍历数组，先淘汰队尾较小元素，再将新元素入队，最后淘汰队首过期的索引。</p>
  <div class="problem-tags">
    <span class="tag">队列</span>
    <span class="tag">滑动窗口</span>
    <span class="tag">单调队列</span>
  </div>
</div>

```python
def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
    from collections import deque
    q = deque()  # 存索引，保持递减
    res = []
    
    for i, num in enumerate(nums):
        # 移除队尾所有比当前元素小的
        while q and nums[q[-1]] < num:
            q.pop()
        
        q.append(i)
        
        # 移除队首过期元素（不在窗口内）
        if q[0] <= i - k:
            q.popleft()
        
        # 窗口形成后开始记录结果
        if i >= k - 1:
            res.append(nums[q[0]])
    
    return res
```

### 1438. 绝对差不超过限制的最长连续子数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">1438</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/" target="_blank">绝对差不超过限制的最长连续子数组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找最长的子数组，其中最大值与最小值的差 <= limit。维护两个双端队列分别跟踪窗口内的最大值和最小值。当 max - min > limit 时收缩左边界。</p>
  <div class="problem-tags">
    <span class="tag">队列</span>
    <span class="tag">滑动窗口</span>
    <span class="tag">单调队列</span>
  </div>
</div>

```python
def longestSubarray(self, nums: List[int], limit: int) -> int:
    from collections import deque
    max_q = deque()  # 递减队列，存最大值
    min_q = deque()  # 递增队列，存最小值
    left = 0
    max_len = 0
    
    for right, num in enumerate(nums):
        # 维护最大队列（递减）
        while max_q and max_q[-1] < num:
            max_q.pop()
        max_q.append(num)
        
        # 维护最小队列（递增）
        while min_q and min_q[-1] > num:
            min_q.pop()
        min_q.append(num)
        
        # 收缩左边界
        while max_q[0] - min_q[0] > limit:
            if nums[left] == max_q[0]:
                max_q.popleft()
            if nums[left] == min_q[0]:
                min_q.popleft()
            left += 1
        
        max_len = max(max_len, right - left + 1)
    
    return max_len
```

### 641. 设计循环双端队列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">641</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/design-circular-deque/" target="_blank">设计循环双端队列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>设计一个循环双端队列，支持在两端插入和删除。用数组 + front/rear 指针实现，注意取模处理循环。</p>
  <div class="problem-tags">
    <span class="tag">队列</span>
    <span class="tag">设计</span>
  </div>
</div>

```python
class MyCircularDeque:
    def __init__(self, k: int):
        self.capacity = k + 1
        self.queue = [0] * self.capacity
        self.front = self.rear = 0
    
    def insertFront(self, value: int) -> bool:
        if self.isFull():
            return False
        self.front = (self.front - 1) % self.capacity
        self.queue[self.front] = value
        return True
    
    def insertLast(self, value: int) -> bool:
        if self.isFull():
            return False
        self.queue[self.rear] = value
        self.rear = (self.rear + 1) % self.capacity
        return True
    
    def deleteFront(self) -> bool:
        if self.isEmpty():
            return False
        self.front = (self.front + 1) % self.capacity
        return True
    
    def deleteLast(self) -> bool:
        if self.isEmpty():
            return False
        self.rear = (self.rear - 1) % self.capacity
        return True
    
    def getFront(self) -> int:
        return -1 if self.isEmpty() else self.queue[self.front]
    
    def getRear(self) -> int:
        return -1 if self.isEmpty() else self.queue[(self.rear - 1) % self.capacity]
    
    def isEmpty(self) -> bool:
        return self.front == self.rear
    
    def isFull(self) -> bool:
        return (self.rear + 1) % self.capacity == self.front
```

### 862. 和至少为 K 的最短子数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">862</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/" target="_blank">和至少为 K 的最短子数组</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>找和 >= k 的最短非空子数组长度。前缀和 + 单调递增双端队列。队列中保存前缀和索引，保持前缀和递增。对每个前缀和，先淘汰队首满足条件的前缀和，再维护队列单调性。</p>
  <div class="problem-tags">
    <span class="tag">队列</span>
    <span class="tag">前缀和</span>
    <span class="tag">单调队列</span>
  </div>
</div>

```python
def shortestSubarray(self, nums: List[int], k: int) -> int:
    from collections import deque
    n = len(nums)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]
    
    q = deque()
    min_len = float('inf')
    
    for i in range(n + 1):
        # 检查是否有符合条件的子数组
        while q and prefix[i] - prefix[q[0]] >= k:
            min_len = min(min_len, i - q.popleft())
        # 维护单调递增队列
        while q and prefix[i] <= prefix[q[-1]]:
            q.pop()
        q.append(i)
    
    return min_len if min_len != float('inf') else -1
```

## 复杂度分析

| 问题 | 时间复杂度 | 空间复杂度 | 核心方法 |
|------|-----------|-----------|---------|
| 滑动窗口最大值 | O(n) | O(k) | 单调递减双端队列 |
| 绝对差限制 | O(n) | O(n) | 双单调队列 |
| 和至少为K | O(n) | O(n) | 前缀和 + 单调队列 |

双端队列在滑动窗口问题中的核心作用是 **O(1) 时间获取窗口最值**。维护队列的单调性保证了每次入队后队首就是所需的最值，每个元素最多入队和出队各一次，因此总时间复杂度为 O(n)。

## 相关主题

- [滑动窗口 - 定长窗口](/topics/sliding-window/fixed-window) — 双端队列实现定长滑动窗口的最值维护
- [滑动窗口 - 不定长窗口](/topics/sliding-window/variable-window) — 双端队列在不定长窗口中的应用
