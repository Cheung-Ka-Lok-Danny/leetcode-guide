# 队列应用：BFS、层次遍历

## 概念讲解

队列（Queue）是一种先进先出（FIFO）的数据结构，广泛应用于广度优先搜索（BFS）、任务调度、消息队列等场景。

### 核心思想

- **BFS 与队列**：BFS 按层次逐层搜索，每处理一个节点，将其邻居入队，天然适合队列
- **层次遍历**：记录当前层的节点数，一次性处理完所有当前层节点
- **双栈模拟队列**：用两个栈实现队列（入队栈 + 出队栈）
- **循环队列**：固定大小的队列，通过取模复用数组空间

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 队列存储二元组 | 同时记录节点和状态信息 |
| 双端队列 | 需要从两端插入/删除 |
| 层次计数 | for _ in range(len(queue)) 处理当前层 |
| visited 集合 | BFS 防重复入队 |

## 经典题目

### 225. 用队列实现栈

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">225</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/implement-stack-using-queues/" target="_blank">用队列实现栈</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>用两个（或一个）队列实现栈。两种方法：push时将一个队列的 n-1 个元素移到另一个队列，使得队首始终是栈顶；或者 pop 时旋转队列。</p>
  <div class="problem-tags">
    <span class="tag">队列</span>
    <span class="tag">设计</span>
  </div>
</div>

```python
class MyStack:
    def __init__(self):
        self.q = []
    
    def push(self, x: int) -> None:
        self.q.append(x)
        # 将前 n-1 个元素移到末尾
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.pop(0))
    
    def pop(self) -> int:
        return self.q.pop(0)
    
    def top(self) -> int:
        return self.q[0]
    
    def empty(self) -> bool:
        return not self.q
```

### 232. 用栈实现队列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">232</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/implement-queue-using-stacks/" target="_blank">用栈实现队列</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>用两个栈实现队列。inStack 负责入队，outStack 负责出队。outStack 为空时，将 inStack 的所有元素弹出并压入 outStack。</p>
  <div class="problem-tags">
    <span class="tag">栈</span>
    <span class="tag">设计</span>
  </div>
</div>

```python
class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []
    
    def push(self, x: int) -> None:
        self.in_stack.append(x)
    
    def _transfer(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
    
    def pop(self) -> int:
        self._transfer()
        return self.out_stack.pop()
    
    def peek(self) -> int:
        self._transfer()
        return self.out_stack[-1]
    
    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack
```

### 622. 设计循环队列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">622</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/design-circular-queue/" target="_blank">设计循环队列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>设计固定大小的循环队列。使用数组 + front/rear 指针，rear 指向下一个插入位置。判空：front == rear；判满：(rear + 1) % capacity == front。</p>
  <div class="problem-tags">
    <span class="tag">队列</span>
    <span class="tag">设计</span>
  </div>
</div>

```python
class MyCircularQueue:
    def __init__(self, k: int):
        self.capacity = k + 1
        self.queue = [0] * self.capacity
        self.front = self.rear = 0
    
    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False
        self.queue[self.rear] = value
        self.rear = (self.rear + 1) % self.capacity
        return True
    
    def deQueue(self) -> bool:
        if self.isEmpty():
            return False
        self.front = (self.front + 1) % self.capacity
        return True
    
    def Front(self) -> int:
        return -1 if self.isEmpty() else self.queue[self.front]
    
    def Rear(self) -> int:
        return -1 if self.isEmpty() else self.queue[(self.rear - 1) % self.capacity]
    
    def isEmpty(self) -> bool:
        return self.front == self.rear
    
    def isFull(self) -> bool:
        return (self.rear + 1) % self.capacity == self.front
```

### 933. 最近的请求次数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">933</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-recent-calls/" target="_blank">最近的请求次数</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>计算过去 3000ms 内的 ping 次数。用队列存储所有 ping 的时间戳，每次加入新 ping 时，弹出所有 < t - 3000 的旧 ping。</p>
  <div class="problem-tags">
    <span class="tag">队列</span>
    <span class="tag">滑动窗口</span>
  </div>
</div>

```python
class RecentCounter:
    def __init__(self):
        self.q = []
    
    def ping(self, t: int) -> int:
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.pop(0)
        return len(self.q)
```

### 2073. 买票需要的时间

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">2073</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/time-needed-to-buy-tickets/" target="_blank">买票需要的时间</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>计算第 k 个人买到票所用的时间。队列模拟或直接数学计算：在 k 之前的人最多买 tickets[k] 张，之后的人最多买 tickets[k]-1 张。</p>
  <div class="problem-tags">
    <span class="tag">队列</span>
    <span class="tag">模拟</span>
  </div>
</div>

```python
def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
    time = 0
    for i, t in enumerate(tickets):
        if i <= k:
            time += min(t, tickets[k])
        else:
            time += min(t, tickets[k] - 1)
    return time
```

## 复杂度分析

| 操作 | 时间复杂度 | 空间复杂度 | 说明 |
|------|-----------|-----------|------|
| 队列入队/出队 | O(1) | O(n) | 链表/环形数组实现 |
| 栈实现队列 | O(1) 均摊 | O(n) | 两栈转移均摊 O(1) |
| 循环队列 | O(1) | O(k) | 固定容量 |
| 最近请求 | O(1) 均摊 | O(n) | 每个 ping 最多出入队一次 |

队列在实际应用中常用于**解耦生产者和消费者**，在算法中则是 **BFS 的天然载体**。理解队列的 FIFO 特性是解决层次相关问题的关键。

## 相关主题

- [栈与队列 - 优先队列](/topics/stack-queue/priority-queue) — 普通队列扩展到优先队列解决调度问题
- [树 - 遍历方式](/topics/tree/traversal) — 队列在树的层次遍历中的核心应用
