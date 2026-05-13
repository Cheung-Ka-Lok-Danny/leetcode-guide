# LRU 缓存：哈希表 + 双向链表

## 概念讲解

LRU（Least Recently Used）缓存是一种常见的缓存淘汰策略，当缓存满时淘汰最久未使用的数据。

### 核心思想

- **数据结构**：哈希表 + 双向链表。哈希表提供 O(1) 查找，双向链表维护访问顺序
- **get 操作**：从哈希表获取节点，将其移至链表头部（最近使用）
- **put 操作**：若键已存在则更新值并移至头部；若不存在则创建新节点加入头部，超出容量则删除尾部节点
- **为什么用双向链表**：需要 O(1) 删除任意节点，单链表无法做到

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 虚拟头尾节点 | 避免空指针判断，简化边界操作 |
| 节点独立成类 | 清晰管理 key, value, prev, next |
| 抽出 add/remove 方法 | 减少重复代码，提高可读性 |
| 双向链表的删除 | node.prev.next = node.next; node.next.prev = node.prev |

## 经典题目

### 146. LRU 缓存

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">146</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/lru-cache/" target="_blank">LRU 缓存</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>设计一个 LRU 缓存，支持 get 和 put 操作，两者都是 O(1) 时间复杂度。使用哈希表 + 双向链表实现。</p>
  <div class="problem-tags">
    <span class="tag">设计</span>
    <span class="tag">哈希表</span>
    <span class="tag">双向链表</span>
    <span class="tag">LRU</span>
  </div>
</div>

```python
class DLinkedNode:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        # 虚拟头尾节点
        self.head = DLinkedNode()
        self.tail = DLinkedNode()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _add_to_head(self, node):
        """将节点添加到头部"""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
    
    def _remove_node(self, node):
        """删除节点"""
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _move_to_head(self, node):
        """将节点移动到头部"""
        self._remove_node(node)
        self._add_to_head(node)
    
    def _remove_tail(self):
        """删除尾部节点并返回"""
        node = self.tail.prev
        self._remove_node(node)
        return node
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._move_to_head(node)
        return node.value
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            if len(self.cache) >= self.capacity:
                tail = self._remove_tail()
                del self.cache[tail.key]
            new_node = DLinkedNode(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)
```

### 460. LFU 缓存

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">460</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/lfu-cache/" target="_blank">LFU 缓存</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>设计一个 LFU（Least Frequently Used）缓存，淘汰使用频率最低的键。每个频率维护一个双向链表，使用 min_freq 记录当前最小频率。O(1) 实现需要多层映射。</p>
  <div class="problem-tags">
    <span class="tag">设计</span>
    <span class="tag">哈希表</span>
    <span class="tag">双向链表</span>
    <span class="tag">LFU</span>
  </div>
</div>

```python
class LFUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.key_to_val = {}
        self.key_to_freq = {}
        self.freq_to_keys = {}
        self.min_freq = 0
    
    def get(self, key: int) -> int:
        if key not in self.key_to_val:
            return -1
        self._increase_freq(key)
        return self.key_to_val[key]
    
    def put(self, key: int, value: int) -> None:
        if self.capacity == 0:
            return
        if key in self.key_to_val:
            self.key_to_val[key] = value
            self._increase_freq(key)
        else:
            if len(self.key_to_val) >= self.capacity:
                self._remove_min_freq()
            self.key_to_val[key] = value
            self.key_to_freq[key] = 1
            self.freq_to_keys.setdefault(1, set()).add(key)
            self.min_freq = 1
    
    def _increase_freq(self, key):
        freq = self.key_to_freq[key]
        self.freq_to_keys[freq].discard(key)
        if not self.freq_to_keys[freq]:
            del self.freq_to_keys[freq]
            if self.min_freq == freq:
                self.min_freq += 1
        self.key_to_freq[key] = freq + 1
        self.freq_to_keys.setdefault(freq + 1, set()).add(key)
    
    def _remove_min_freq(self):
        key = next(iter(self.freq_to_keys[self.min_freq]))
        self.freq_to_keys[self.min_freq].discard(key)
        if not self.freq_to_keys[self.min_freq]:
            del self.freq_to_keys[self.min_freq]
        del self.key_to_val[key]
        del self.key_to_freq[key]
```

## 复杂度分析

| 操作 | 时间复杂度 | 空间复杂度 | 说明 |
|------|-----------|-----------|------|
| get | O(1) | O(capacity) | 哈希查找 + 链表移动 |
| put | O(1) | O(capacity) | 插入/更新 + 可能淘汰 |
| LFU get | O(1) | O(capacity) | 频率更新 |
| LFU put | O(1) | O(capacity) | 淘汰最少使用键 |

LRU 的面试核心是**双向链表 + 哈希表的组合使用**。需要手写出完整的节点类和增删移动方法。LFU 则在 LRU 基础上增加了频率计数，实现更复杂，需要熟练使用多层哈希映射。

## 相关主题

- [哈希表 - 哈希设计](/topics/hash-table/hash-design) — LRU 缓存依赖哈希表实现 O(1) 查找
- [链表 - 遍历与反转](/topics/linked-list/traversal-reverse) — 链表的基本操作是 LRU 节点管理的基础
