# 哈希设计

手写哈希表是考察对哈希原理理解深度的经典题型。LeetCode 上的设计题要求在不使用内置哈希库的情况下实现哈希集合和哈希映射。

## 核心概念

### 手写哈希集合的设计要素

一个完整的哈希集合设计需要以下组件：

1. **底层数组**：存储元素
2. **哈希函数**：将键映射到索引（通常用取模运算 `key % capacity`）
3. **冲突解决**：链地址法或开放地址法
4. **扩容机制**：负载因子超过阈值时扩容并 rehash

### 哈希冲突处理对比

| 方法 | 链地址法 | 线性探测（开放地址） | 二次探测 |
|------|---------|-------------------|---------|
| 实现难度 | 低 | 中 | 中 |
| 删除操作 | 简单 | 复杂（需要标记） | 复杂 |
| 缓存友好 | 否 | 是 | 是 |
| 最坏性能 | O(n) | O(n) | O(n) |

> 面试中推荐用链地址法实现，逻辑清晰且容易处理删除。

### 负载因子与扩容

**扩容流程：**
1. 检查负载因子是否超过阈值（通常 0.75）
2. 新建一个更大的数组（通常 2 倍）
3. 遍历原数组所有元素，重新计算哈希并插入新数组

## 关键技巧

1. **取模运算**：`hash(key) % capacity` 计算索引，注意处理负数：`(key % capacity + capacity) % capacity`
2. **虚拟节点**：开放地址法删除元素时用虚拟标记（如 `DELETED`）而不是直接置空
3. **树的退化**：Java 8+ 在链表长度 > 8 时转为红黑树，但面试中无需实现
4. **哈希函数的均匀性**：使用质数作为数组大小可以减少哈希冲突

## 经典题目

### LeetCode 705. 设计哈希集合

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[705]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/design-hashset/" target="_blank">设计哈希集合</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>实现一个不使用内置哈希库的哈希集合，支持 add、remove、contains 操作。</p>
  <p><strong>核心思路</strong>：链地址法——数组的每个位置存储一个链表（或 Python 列表）。取模确定桶位置，然后操作对应链表。需注意数据范围（0 到 10⁶）和扩容。</p>
  <div class="problem-tags">
    <span class="tag">哈希设计</span>
    <span class="tag">链地址法</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
class MyHashSet:
    def __init__(self):
        self.capacity = 1000
        self.buckets = [[] for _ in range(self.capacity)]

    def _hash(self, key):
        return key % self.capacity

    def add(self, key):
        idx = self._hash(key)
        if key not in self.buckets[idx]:
            self.buckets[idx].append(key)

    def remove(self, key):
        idx = self._hash(key)
        if key in self.buckets[idx]:
            self.buckets[idx].remove(key)

    def contains(self, key):
        idx = self._hash(key)
        return key in self.buckets[idx]
```

> 每个操作的平均时间复杂度：O(n/capacity) | 空间复杂度：O(n)

### LeetCode 706. 设计哈希映射

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[706]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/design-hashmap/" target="_blank">设计哈希映射</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>实现一个不使用内置哈希库的哈希映射，支持 put、get、remove 操作。</p>
  <p><strong>核心思路</strong>：与哈希集合类似，区别在于存储的是键值对而非单一值。每个桶中的元素为 (key, value) pair，操作时根据 key 定位和替换。</p>
  <div class="problem-tags">
    <span class="tag">哈希设计</span>
    <span class="tag">键值对</span>
  </div>
</div>

### LeetCode 380. O(1) 时间插入、删除和获取随机元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[380]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/insert-delete-getrandom-o1/" target="_blank">O(1) 时间插入、删除和获取随机元素</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>设计一个数据结构支持 O(1) 时间的插入、删除和随机获取元素，不允许重复元素。</p>
  <p><strong>核心思路</strong>：哈希表 + 动态数组的组合。插入时追加到数组末尾并记录下标；删除时将待删除元素与数组末尾元素交换，然后 pop 末尾。随机获取用 random.choice。</p>
  <div class="problem-tags">
    <span class="tag">哈希设计</span>
    <span class="tag">交换删除</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
import random

class RandomizedSet:
    def __init__(self):
        self.nums = []
        self.pos = {}  # val -> index

    def insert(self, val):
        if val in self.pos:
            return False
        self.pos[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val):
        if val not in self.pos:
            return False
        idx = self.pos[val]
        last = self.nums[-1]
        self.nums[idx] = last
        self.pos[last] = idx
        self.nums.pop()
        del self.pos[val]
        return True

    def getRandom(self):
        return random.choice(self.nums)
```

> 时间复杂度：O(1) | 空间复杂度：O(n)

## 复杂度分析

| 操作 | 链地址法 | 开放地址法 | 数组+哈希表（380） |
|------|---------|-----------|-----------------|
| 插入 | O(1)* | O(1)* | O(1) |
| 删除 | O(1)* | O(1)* | O(1) |
| 查找 | O(1)* | O(1)* | O(1) |
| 随机获取 | O(n) | O(n) | O(1) |

> * 均摊时间复杂度，假设哈希函数均匀且负载因子合理。

## 相关主题

- [哈希表 - 哈希映射](/topics/hash-table/hash-map) — 哈希设计是哈希映射底层实现的技术基础
- [链表 - LRU缓存](/topics/linked-list/lru-cache) — LRU 缓存是哈希表与链表结合的经典设计案例
