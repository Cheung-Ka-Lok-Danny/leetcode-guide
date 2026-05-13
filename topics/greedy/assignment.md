# 分配问题

分配问题通常涉及将资源分配给目标对象，通过排序后贪心匹配来获得最优解。

## 核心概念

### 贪心分配策略

1. **排序 + 双指针**：将两个集合分别排序，用双指针进行匹配
2. **堆优先分配**：用最大/最小堆维护当前可用的候选资源
3. **区间分配**：按特定顺序处理任务，贪心选择最优策略

### 常见模式

```python
# 双指针分配模板
a.sort()  # 资源
b.sort()  # 需求
i = j = 0
while i < len(a) and j < len(b):
    if a[i] 满足 b[j]:
        i += 1
        j += 1
    else:
        i += 1
```

## 经典题目

### LeetCode 455. 分发饼干

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[455]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/assign-cookies/" target="_blank">分发饼干</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>每个孩子有胃口值 g[i]，每个饼干有尺寸 s[j]，求最多能满足多少个孩子。</p>
  <p><strong>核心思路</strong>：排序后双指针。将尽量小的饼干分配给胃口最小的孩子，保证资源利用最大化。</p>
  <div class="problem-tags">
    <span class="tag">贪心</span>
    <span class="tag">双指针</span>
    <span class="tag">入门题</span>
  </div>
</div>

```python
def findContentChildren(g, s):
    g.sort()
    s.sort()
    i = j = 0
    while i < len(g) and j < len(s):
        if s[j] >= g[i]:
            i += 1
        j += 1
    return i
```

> 时间复杂度：O(n log n + m log m) | 空间复杂度：O(1)

### LeetCode 135. 分发糖果

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[135]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/candy/" target="_blank">分发糖果</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>每个孩子至少分 1 个糖果，相邻评分高的孩子必须获得更多糖果，求最少糖果数。</p>
  <p><strong>核心思路</strong>：两次遍历。从左到右保证右 > 左时糖果递增，从右到左保证左 > 右时糖果递增。每个孩子取两次遍历的最大值。</p>
  <div class="problem-tags">
    <span class="tag">贪心</span>
    <span class="tag">两次遍历</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def candy(ratings):
    n = len(ratings)
    candies = [1] * n

    # 从左到右
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            candies[i] = candies[i-1] + 1

    # 从右到左
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]:
            candies[i] = max(candies[i], candies[i+1] + 1)

    return sum(candies)
```

> 时间复杂度：O(n) | 空间复杂度：O(n)

### LeetCode 402. 移掉 K 位数字

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[402]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/remove-k-digits/" target="_blank">移掉 K 位数字</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>从数字字符串中移除 k 位数字，使剩余数字组成的数最小。</p>
  <p><strong>核心思路</strong>：单调栈思想。从左到右遍历，如果当前字符比栈顶小且还有删除次数，则弹出栈顶（删除较大的高位数字）。最后处理前导零。</p>
  <div class="problem-tags">
    <span class="tag">贪心</span>
    <span class="tag">单调栈</span>
  </div>
</div>

### LeetCode 621. 任务调度器

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[621]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/task-scheduler/" target="_blank">任务调度器</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>CPU 执行任务列表，相同任务间必须有 n 个冷却时间，求完成所有任务的最短时间。</p>
  <p><strong>核心思路</strong>：找出出现次数最多的任务，如果有 max_count 个任务都出现了最大次数，则最短时间为 (max - 1) × (n + 1) + max_count，再与总任务数取最大值。</p>
  <div class="problem-tags">
    <span class="tag">贪心</span>
    <span class="tag">数学</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 分发饼干 | O(n log n + m log m) | O(1) |
| 分发糖果 | O(n) | O(n) |
| 移掉 K 位数字 | O(n) | O(n) |
| 任务调度器 | O(n) | O(1) |

## 相关主题

- [贪心 - 区间调度](/topics/greedy/interval-scheduling) — 分配问题与区间调度共享排序做选择的思路
- [排序与搜索 - 排序算法](/topics/sorting-searching/sorting) — 分配问题通常需要先排序
