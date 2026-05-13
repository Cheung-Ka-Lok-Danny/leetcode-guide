# 环形链表：环检测、环入口

## 概念讲解

环检测是链表中的经典问题，核心在于检测链表中是否存在环以及找到环的入口位置。

### 核心思想

- **环检测**：Floyd判环算法（快慢指针法），fast每次两步，slow每次一步，若相遇则有环
- **环入口**：相遇后将一个指针重置到 head，两指针每次一步，相遇点即为环入口
- **数学证明**：设 head 到环入口距离为 a，入口到相遇点距离为 b，环剩余部分为 c。慢指针走了 a+b，快指针走了 a+b+k(b+c) = 2(a+b)，解得 a = c + (k-1)(b+c)

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 快慢指针相遇 | 是否有环的判断依据 |
| 重置指针 | 找到环的起始位置 |
| 环的长度 | 相遇后继续走，再次相遇时走过的步数即为环长 |
| 只含环的链表 | 环形链表的特殊变体 |

## 经典题目

### 141. 环形链表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">141</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/linked-list-cycle/" target="_blank">环形链表</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断链表是否有环。快慢指针法：fast 每次两步，slow 每次一步，如果相遇说明有环。注意循环条件需要检查 fast 和 fast.next。</p>
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
  <p>找到环的入口节点。快慢指针相遇后，将 slow 重置到 head，然后两指针每次一步，再次相遇点即为环入口。</p>
  <div class="problem-tags">
    <span class="tag">链表</span>
    <span class="tag">快慢指针</span>
    <span class="tag">数学</span>
  </div>
</div>

```python
def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
    slow = fast = head
    
    # 先找相遇点
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            # 找环入口
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow
    
    return None
```

### 287. 寻找重复数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">287</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-the-duplicate-number/" target="_blank">寻找重复数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定一个包含 n+1 个整数的数组，数字在 [1,n] 范围内，找到重复的那个数。将数组视为链表：i → nums[i]，重复数即环入口。不能用额外空间且不能修改数组。</p>
  <div class="problem-tags">
    <span class="tag">数组</span>
    <span class="tag">快慢指针</span>
    <span class="tag">环检测</span>
  </div>
</div>

```python
def findDuplicate(self, nums: List[int]) -> int:
    # 将数组视为链表：位置 i 指向 nums[i]
    # 重复数 = 环的入口
    slow = fast = nums[0]
    
    # 找到相遇点
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    
    # 找环入口
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    
    return slow
```

## 复杂度分析

| 问题 | 时间复杂度 | 空间复杂度 | 核心方法 |
|------|-----------|-----------|---------|
| 环检测 | O(n) | O(1) | 快慢指针相遇 |
| 环入口 | O(n) | O(1) | 相遇后重置指针 |
| 寻找重复数 | O(n) | O(1) | 数组转链表+环检测 |

环检测的正确性证明依赖鸽巢原理和 Floyd 判环算法。关键记忆点是：**相遇后重置 slow 到 head，再同步移动直到相遇，此时的节点就是环入口**。

## 相关主题

- [链表 - 快慢指针](/topics/linked-list/fast-slow-pointers) — 快慢指针是环检测的基础
- [双指针 - 快慢指针](/topics/two-pointers/fast-slow) — 双指针体系中的快慢指针通用技巧
