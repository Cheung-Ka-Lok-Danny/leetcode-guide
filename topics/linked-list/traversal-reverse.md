# 遍历与反转：链表遍历、反转链表系列

## 概念讲解

链表反转是链表操作中最基础的算法，也是很多复杂链表问题的基础能力。

### 核心思想

- **链表遍历**：从头节点开始，通过 next 指针逐个访问节点
- **反转链表**：改变指针方向，将 node.next 指向前一个节点
- **递归反转**：利用递归调用栈逐层返回时修改指针方向
- **局部反转**：反转链表中指定区间内的节点，需要定位到起始位置
- **K个一组反转**：分组反转每组长度为 k 的子链表，不足 k 的一组保持原序

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 虚拟头节点（dummy） | 简化头节点可能被修改的边界处理 |
| 局部反转模板 | `pre → start → ... → end → next` 四指针定位 |
| 递归反转 | head.next.next = head; head.next = None |
| 迭代反转 | pre, cur, nxt 三指针循环 |

## 经典题目

### 206. 反转链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">206</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/reverse-linked-list/" target="_blank">反转链表</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>反转单链表。迭代法用 pre, cur, nxt 三指针，每次将 cur.next 指向 pre。递归法将问题拆解为"反转 head.next 后的链表 + 将 head 接到末尾"。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">递归</span>
    <span class="tag">迭代</span>
  </div>
</div>

```python
def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    pre, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = pre
        pre = cur
        cur = nxt
    return pre
```

### 92. 反转链表 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">92</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/reverse-linked-list-ii/" target="_blank">反转链表 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>反转链表从位置 left 到 right 的部分。用 dummy 节点简化边界，先找到 left 前一个节点，再反转区间内的节点。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">局部反转</span>
  </div>
</div>

```python
def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    pre = dummy
    
    # 找到 left 前一个节点
    for _ in range(left - 1):
        pre = pre.next
    
    # 反转区间 [left, right]
    # pre 是 start 的前一个节点
    start = pre.next
    then = start.next
    
    for _ in range(right - left):
        start.next = then.next
        then.next = pre.next
        pre.next = then
        then = start.next
    
    return dummy.next
```

### 24. 两两交换链表中的节点

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">24</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/swap-nodes-in-pairs/" target="_blank">两两交换链表中的节点</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将链表中相邻节点两两交换。可用递归或迭代。递归：头两个节点互换后，剩余部分递归处理。迭代：dummy 节点 + 三指针。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">递归</span>
  </div>
</div>

```python
def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
    # 递归解法
    if not head or not head.next:
        return head
    
    first, second = head, head.next
    first.next = self.swapPairs(second.next)
    second.next = first
    return second
```

### 25. K 个一组翻转链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">25</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/reverse-nodes-in-k-group/" target="_blank">K 个一组翻转链表</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>将链表每 k 个节点一组翻转，不足 k 个的保持原序。先检查是否有 k 个节点，然后反转这 k 个节点，递归处理剩余部分。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">递归</span>
  </div>
</div>

```python
def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    # 检查是否有 k 个节点
    cur = head
    for _ in range(k):
        if not cur:
            return head
        cur = cur.next
    
    # 反转前 k 个节点
    pre, cur = None, head
    for _ in range(k):
        nxt = cur.next
        cur.next = pre
        pre = cur
        cur = nxt
    
    # head 现在是这组的末尾，指向下一组的反转结果
    head.next = self.reverseKGroup(cur, k)
    return pre
```

### 234. 回文链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">234</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/palindrome-linked-list/" target="_blank">回文链表</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断链表是否为回文。三步走：快慢指针找中点 → 反转后半部分 → 比较前后两半是否相同。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">快慢指针</span>
    <span class="tag">反转</span>
  </div>
</div>

```python
def isPalindrome(self, head: Optional[ListNode]) -> bool:
    # 快慢指针找中点
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # 反转后半部分
    pre, cur = None, slow
    while cur:
        nxt = cur.next
        cur.next = pre
        pre = cur
        cur = nxt
    
    # 比较两半
    left, right = head, pre
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    return True
```

## 复杂度分析

| 操作 | 时间复杂度 | 空间复杂度 | 说明 |
|------|-----------|-----------|------|
| 反转链表 | O(n) | O(1) 迭代 / O(n) 递归 | 递归使用栈空间 |
| 局部反转 | O(n) | O(1) | 一次遍历完成 |
| K个一组反转 | O(n) | O(n/k) 递归 | 递归深度为 n/k |
| 回文判断 | O(n) | O(1) | 原地反转不占额外空间 |

## 相关主题

- [链表 - 快慢指针](/topics/linked-list/fast-slow-pointers) — 回文链表和找中点都依赖快慢指针
- [链表 - 合并链表](/topics/linked-list/merge-lists) — 遍历反转与合并结合解决多链表问题

反转链表系列题目的共同模式是**指针重定向**。掌握"三指针迭代反转"和"递归反转"两种范式，可以解决从简单反转到分组反转的所有变体。
