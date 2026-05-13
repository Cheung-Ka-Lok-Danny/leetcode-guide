# 合并链表：有序合并、拼接

## 概念讲解

合并链表是将多个链表按某种规则组合成一个新链表，常见于有序合并、分割重组和数位相加等场景。

### 核心思想

- **有序合并**：同时遍历两条有序链表，每次取较小的节点接到结果链表末尾
- **分治合并**：合并 k 个有序链表时，用分治法或优先队列维护当前最小节点
- **分隔链表**：根据条件将链表节点分配到不同的链表中
- **链表加法**：从低位到高位逐位相加，处理进位

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| dummy 节点 | 简化结果链表头节点的处理 |
| 分治合并 | k 个有序链表的归并式合并 |
| 优先队列 | 每次从 k 个链表中取出最小节点 |
| 链表分割 | 创建两个子链表的头节点 dummy |

## 经典题目

### 21. 合并两个有序链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">21</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/merge-two-sorted-lists/" target="_blank">合并两个有序链表</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>将两个升序链表合并为一个新升序链表。用 dummy 节点简化操作，每次取较小的节点接到后面。也可用递归实现。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">双指针</span>
    <span class="tag">归并</span>
  </div>
</div>

```python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    cur = dummy
    
    while list1 and list2:
        if list1.val < list2.val:
            cur.next = list1
            list1 = list1.next
        else:
            cur.next = list2
            list2 = list2.next
        cur = cur.next
    
    cur.next = list1 if list1 else list2
    return dummy.next
```

### 23. 合并 K 个升序链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">23</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/merge-k-sorted-lists/" target="_blank">合并 K 个升序链表</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>合并 k 个有序链表。两种主流解法：优先队列（每次取最小节点）或分治合并（两两归并）。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">分治</span>
    <span class="tag">堆</span>
  </div>
</div>

```python
def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    # 分治法
    if not lists:
        return None
    return self.merge(lists, 0, len(lists) - 1)

def merge(self, lists, l, r):
    if l == r:
        return lists[l]
    mid = (l + r) // 2
    left = self.merge(lists, l, mid)
    right = self.merge(lists, mid + 1, r)
    return self.mergeTwoLists(left, right)
```

### 86. 分隔链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">86</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/partition-list/" target="_blank">分隔链表</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将链表分割为两部分：小于 x 的节点在前面，>= x 的节点在后面，保持相对顺序。创建两个 dummy 头部分别接小值和大值节点。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">分割</span>
  </div>
</div>

```python
def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
    small_dummy = ListNode(0)
    large_dummy = ListNode(0)
    small, large = small_dummy, large_dummy
    
    while head:
        if head.val < x:
            small.next = head
            small = small.next
        else:
            large.next = head
            large = large.next
        head = head.next
    
    large.next = None
    small.next = large_dummy.next
    return small_dummy.next
```

### 2. 两数相加

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">2</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/add-two-numbers/" target="_blank">两数相加</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>两个非空链表表示两个非负整数，数字按逆序排列。逐位相加并处理进位。注意最后一位也有可能有进位。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">数学</span>
    <span class="tag">模拟</span>
  </div>
</div>

```python
def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    cur = dummy
    carry = 0
    
    while l1 or l2 or carry:
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0
        total = v1 + v2 + carry
        
        carry = total // 10
        cur.next = ListNode(total % 10)
        cur = cur.next
        
        if l1:
            l1 = l1.next
        if l2:
            l2 = l2.next
    
    return dummy.next
```

### 445. 两数相加 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">445</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/add-two-numbers-ii/" target="_blank">两数相加 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>与第2题类似，但数字按正序排列。用栈将链表节点压入，然后从高位到低位相加。或先反转链表再按第2题方式处理。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">栈</span>
    <span class="tag">数学</span>
  </div>
</div>

```python
def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    s1, s2 = [], []
    while l1:
        s1.append(l1.val)
        l1 = l1.next
    while l2:
        s2.append(l2.val)
        l2 = l2.next
    
    carry = 0
    head = None
    
    while s1 or s2 or carry:
        v1 = s1.pop() if s1 else 0
        v2 = s2.pop() if s2 else 0
        total = v1 + v2 + carry
        carry = total // 10
        
        # 头插法构建结果
        node = ListNode(total % 10)
        node.next = head
        head = node
    
    return head
```

## 复杂度分析

| 问题 | 时间复杂度 | 空间复杂度 | 核心方法 |
|------|-----------|-----------|---------|
| 合并两个有序链表 | O(m+n) | O(1) | 双指针 |
| 合并K个有序链表 | O(nk×logk) | O(k) | 分治/堆 |
| 分隔链表 | O(n) | O(1) | 双 dummy |
| 两数相加 | O(max(m,n)) | O(1) | 模拟加法 |

合并链表的核心模式是**用 dummy 节点简化头指针管理**，配合双指针或优先队列实现高效合并。分割和加法问题本质上是链表的组合操作，掌握基本的链表遍历和指针操作即可。

## 相关主题

- [堆 - 合并K个有序](/topics/heap/merge-k-sorted) — 优先队列实现 K 个有序链表的合并
- [链表 - 遍历与反转](/topics/linked-list/traversal-reverse) — 合并链表与遍历反转结合解决复杂问题
