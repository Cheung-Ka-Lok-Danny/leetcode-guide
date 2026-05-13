# 栈与队列

栈（后进先出）和队列（先进先出）是两种特殊的线性数据结构，在算法中有着广泛的应用。

## 核心概念

- **栈 Stack**：LIFO（Last In, First Out）
- **队列 Queue**：FIFO（First In, First Out）
- **双端队列 Deque**：两端均可入出
- **优先队列 Priority Queue**：按优先级出队

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/stack-queue/monotonic-stack">单调栈</a>
  <a href="/topics/stack-queue/bracket-matching">括号匹配</a>
  <a href="/topics/stack-queue/queue-applications">队列应用</a>
  <a href="/topics/stack-queue/priority-queue">优先队列</a>
  <a href="/topics/stack-queue/deque">双端队列</a>
</div>

## 复杂度总览

| 结构 | 入队/入栈 | 出队/出栈 | 查看顶部 |
|------|-----------|-----------|---------|
| 栈 | O(1) | O(1) | O(1) |
| 队列 | O(1) | O(1) | O(1) |
| 双端队列 | O(1) | O(1) | O(1) |
| 优先队列 | O(log n) | O(log n) | O(1) |
