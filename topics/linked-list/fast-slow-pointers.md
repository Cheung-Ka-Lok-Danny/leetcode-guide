# 快慢指针：找中点、找倒数第 K 个

## 概念讲解

快慢指针是链表问题中最常用的技巧，通过两个指针以不同速度移动来解决位置查找和环检测等问题。

### 核心思想

- **快慢指针**：fast 每次走两步，slow 每次走一步
- **找中点**：fast 到末尾时，slow 恰好在中点（偶数个节点时靠右的中点）
- **找倒数第K个**：fast 先走 k 步，然后 fast 和 slow 一起走，fast 到末尾时 slow 就是倒数第 k 个
- **环检测**：fast 和 slow 在环中必然会相遇

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 快慢指针 | 找中点、环检测、找倒数第 k 个 |
| 奇数偶数的中点 | 通过 fast 的停止条件控制中点位置 |
| 先走 k 步 | fast 先出发，与 slow 保持 k 步距离 |

## 经典题目

### 876. 链表的中间结点

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">876</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/middle-of-the-linked-list/" target="_blank">链表的中间结点</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>返回链表的中间节点。快慢指针：fast 每次两步，slow 每次一步。fast 到达末尾时，slow 就是中间节点。偶数个节点时返回第二个中间节点。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">快慢指针</span>
  </div>
</div>

```python
def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

### 19. 删除链表的倒数第 N 个结点

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">19</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/remove-nth-node-from-end-of-list/" target="_blank">删除链表的倒数第 N 个结点</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>删除链表倒数第 n 个节点。用 dummy 节点简化头节点可能被删的情况。fast 先走 n+1 步，然后一起走到 fast 为 None，此时 slow 指向待删节点的前一个节点。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">快慢指针</span>
  </div>
</div>

```python
def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    slow = fast = dummy
    
    # fast 先走 n+1 步
    for _ in range(n + 1):
        fast = fast.next
    
    # 一起走到 fast 为 None
    while fast:
        slow = slow.next
        fast = fast.next
    
    # 删除节点
    slow.next = slow.next.next
    return dummy.next
```

### 141. 环形链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">141</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/linked-list-cycle/" target="_blank">环形链表</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断链表是否有环。快慢指针：如果 fast 和 slow 相遇说明有环。注意循环条件要检查 fast 和 fast.next 都不为空。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">快慢指针</span>
    <span class="tag">环检测</span>
  </div>
</div>

```python
def hasCycle(self, head: Optional[ListNode]) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

### 142. 环形链表 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">142</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/linked-list-cycle-ii/" target="_blank">环形链表 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到环的入口节点。快慢指针相遇后，将 slow 重置到 head，然后两个指针都每次走一步，相遇点即为环入口。数学推导：a = c + (k-1)(b+c)。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">快慢指针</span>
    <span class="tag">数学</span>
  </div>
</div>

```python
def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
    slow = fast = head
    has_cycle = False
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            has_cycle = True
            break
    
    if not has_cycle:
        return None
    
    # 找环入口
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    
    return slow
```

### 160. 相交链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">160</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/intersection-of-two-linked-lists/" target="_blank">相交链表</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>找到两个链表相交的起始节点。双指针法：pA 和 pB 分别遍历两个链表，到达末尾后切换到对方链表的头节点继续遍历。相遇点即为相交点，否则为 None。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">双指针</span>
  </div>
</div>

```python
def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
    pA, pB = headA, headB
    while pA != pB:
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA
    return pA
```

## 复杂度分析

| 问题 | 时间复杂度 | 空间复杂度 | 核心技巧 |
|------|-----------|-----------|---------|
| 找中点 | O(n) | O(1) | 快慢指针 |
| 倒第K个 | O(n) | O(1) | 快指针先走 k 步 |
| 环检测 | O(n) | O(1) | 快慢指针相遇 |
| 环入口 | O(n) | O(1) | 相遇后重置指针 |
| 相交链表 | O(m+n) | O(1) | 交替遍历 |

快慢指针的核心在于**利用速度差来获取位置信息**。常见的三种用法：等距（倒数第 k 个）、倍速（找中点）、变速（环检测）。

## 相关主题

- [链表 - 环形链表](/topics/linked-list/cycle-detection) — 快慢指针是环检测的核心实现
- [双指针 - 快慢指针](/topics/two-pointers/fast-slow) — 双指针体系中的快慢指针通用技巧
