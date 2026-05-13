# 哈希映射

哈希映射（Hash Map）是哈希表最核心的应用形式，通过键值对（Key-Value）存储数据，实现 O(1) 级别的查找、插入和删除操作。

## 核心概念

### 哈希函数

哈希函数将任意大小的键映射到固定范围的数组索引。好的哈希函数应具备：

- **确定性**：相同的键总是映射到相同的索引
- **均匀分布**：键被均匀映射到整个数组范围
- **高效计算**：哈希计算速度快

### 哈希冲突解决

当不同键映射到同一索引时，发生哈希冲突，常见解决方法：

| 方法 | 原理 | 优点 | 缺点 |
|------|------|------|------|
| **链地址法** | 每个槽位存一个链表 | 实现简单，无容量上限 | 链表过长时退化为 O(n) |
| **开放地址法** | 冲突时寻找下一个空位 | 空间利用率高 | 删除复杂，有容量上限 |
| **再哈希法** | 用另一个哈希函数重算 | 冲突少 | 计算开销大 |
| **公共溢出区** | 冲突元素存入溢出表 | 简单 | 需要额外空间 |

> Python 的 `dict` 使用改良的链地址法（结合开放地址），Java 8+ 在链表长度超过阈值时转为红黑树。

### 负载因子与扩容

**负载因子 = 元素个数 / 数组长度**

- 负载因子越大，冲突概率越高
- 超过阈值（通常 0.75）时触发扩容
- 扩容需要重新哈希所有元素（rehash），时间复杂度 O(n)

## 关键技巧

1. **空间换时间**：哈希表是典型的时间空间权衡
2. **数组充当哈希表**：数据范围已知且较小时，用数组代替哈希表（如 ASCII 字符计数）
3. **键的选择**：键需要是可哈希的（不可变类型），自定义对象需实现 `__hash__` 和 `__eq__`
4. **避免修改键**：已插入的键若是可变对象且被修改，会导致查找失败

## 经典题目

### LeetCode 1. 两数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/two-sum/" target="_blank">两数之和</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>在数组中找出两个数，使其和等于目标值，返回下标。</p>
  <p><strong>核心思路</strong>：遍历数组，用哈希表存储已访问元素的值和下标。对每个元素 nums[i]，检查 target - nums[i] 是否已存在于哈希表中，存在则找到答案。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def twoSum(nums, target):
    seen = {}  # val -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

> 时间复杂度：O(n) | 空间复杂度：O(n)

### LeetCode 217. 存在重复元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[217]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/contains-duplicate/" target="_blank">存在重复元素</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断数组中是否存在重复元素。</p>
  <p><strong>核心思路</strong>：用集合记录已出现的元素，若遇到已存在的元素则直接返回 True。时间复杂度 O(n)，空间 O(n)。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">集合</span>
  </div>
</div>

### LeetCode 219. 存在重复元素 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[219]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/contains-duplicate-ii/" target="_blank">存在重复元素 II</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断数组中是否存在两个不同下标的相同元素，且下标差的绝对值不超过 k。</p>
  <p><strong>核心思路</strong>：哈希表存储元素最后一次出现的下标，遍历时检查当前下标与已存储下标的差是否 ≤ k。维护一个大小为 k 的滑动窗口集合也可实现。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">滑动窗口</span>
  </div>
</div>

### LeetCode 128. 最长连续序列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[128]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-consecutive-sequence/" target="_blank">最长连续序列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出未排序数组中最长连续元素序列的长度，要求 O(n) 时间。</p>
  <p><strong>核心思路</strong>：用集合存储所有元素。遍历集合，只从连续序列的起点（即 num - 1 不在集合中）开始向后扩展计数，避免重复计算。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">集合</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 复杂度分析

| 操作 | 平均时间复杂度 | 最坏时间复杂度 | 空间复杂度 |
|------|--------------|--------------|-----------|
| 查找 | O(1) | O(n) | O(n) |
| 插入 | O(1) | O(n) | O(n) |
| 删除 | O(1) | O(n) | O(n) |

## 相关主题

- [哈希表 - 计数统计](/topics/hash-table/counting) — 哈希映射与计数统计共同构成哈希表的核心应用
- [哈希表 - 两数之和系列](/topics/hash-table/two-sum-family) — 哈希映射是两数之和问题的标准解法
