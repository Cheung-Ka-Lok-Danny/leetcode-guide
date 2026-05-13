# 二分答案

二分答案（Binary Search on Answer）是对"值域"进行二分搜索，而非对"索引"。适用于求解"最大值最小化"或"最小值最大化"的问题。

## 核心概念

### 什么是二分答案

传统二分在**数组索引**上搜索，二分答案在**可能的答案范围**上搜索。核心思想是：

1. 确定答案的上下界 [lo, hi]
2. 对中间值 mid 调用可行性判断函数 `check(mid)`
3. 根据 check 结果缩小搜索范围
4. 最终找到符合条件的极值

### 适用问题的特征

二分答案适用于同时满足以下条件的问题：
- **单调性**：如果 x 可行，则大于（或小于）x 的所有值都可行
- **极值问题**：求最大值的最小可能或最小值的最大可能
- **可以快速判断**：能在 O(n) 或 O(n log n) 时间内验证一个候选答案是否可行

### 两种二分模式

| 模式 | 条件 | 收缩方向 |
|------|------|---------|
| **找最小值**（最小可行解） | check(mid) 可行 → right = mid | 左移右边界 |
| **找最大值**（最大可行解） | check(mid) 可行 → left = mid | 右移左边界 |

### 可行性判断函数设计

`check(x)` 是二分答案的核心，它以候选答案 x 为参数，判断在约束条件下能否实现目标。设计 check 函数的思路：

- 贪心模拟：依次尝试分配资源，看是否满足条件
- 计算检验：验证在当前答案下是否不超过或达到约束
- 模拟过程：一关一关地试图通过

## 关键技巧

1. **确定边界**：下界通常是 0 或 1，上界是可能的最大值
2. **check 函数**：必须是单调的（check(x) 为真 => check(x+1) 也为真）
3. **浮点数二分**：用循环次数控制精度（如 100 次），而非 left < right
4. **边界返回值**：注意返回 left 还是 left - 1，取决于具体问题

## 经典题目

### LeetCode 875. 爱吃香蕉的珂珂

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[875]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/koko-eating-bananas/" target="_blank">爱吃香蕉的珂珂</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>珂珂每小时可以吃 K 根香蕉（一堆吃不完等下一小时），求在 H 小时内吃完的最小速度 K。</p>
  <p><strong>核心思路</strong>：速度范围 [1, max(piles)]。对每个候选速度 mid，计算需要的小时数。如果小时数 ≤ H，则速度可行，尝试更慢的速度（减小右边界）。</p>
  <div class="problem-tags">
    <span class="tag">二分答案</span>
    <span class="tag">可行性判断</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def minEatingSpeed(piles, h):
    def can_finish(k):
        hours = 0
        for p in piles:
            hours += (p + k - 1) // k  # 向上取整
        return hours <= h

    left, right = 1, max(piles)
    while left < right:
        mid = (left + right) // 2
        if can_finish(mid):
            right = mid
        else:
            left = mid + 1
    return left
```

> 时间复杂度：O(n log max(piles)) | 空间复杂度：O(1)

### LeetCode 1011. 在 D 天内送达包裹的能力

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1011]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/capacity-to-ship-packages-within-d-days/" target="_blank">在 D 天内送达包裹的能力</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到最小的船运容量，使得在 D 天内将包裹运完。</p>
  <p><strong>核心思路</strong>：容量范围 [max(weights), sum(weights)]。check 函数模拟每天装船，计算需要的天数。与 875 题同模式——最小值二分。</p>
  <div class="problem-tags">
    <span class="tag">二分答案</span>
    <span class="tag">贪心模拟</span>
  </div>
</div>

```python
def shipWithinDays(weights, days):
    def can_ship(capacity):
        total = 0
        day_count = 1
        for w in weights:
            if total + w > capacity:
                day_count += 1
                total = w
            else:
                total += w
        return day_count <= days

    left, right = max(weights), sum(weights)
    while left < right:
        mid = (left + right) // 2
        if can_ship(mid):
            right = mid
        else:
            left = mid + 1
    return left
```

> 时间复杂度：O(n log(sum(weights))) | 空间复杂度：O(1)

### LeetCode 410. 分割数组的最大值

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[410]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/split-array-largest-sum/" target="_blank">分割数组的最大值</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>将数组分割成 m 个连续子数组，最小化各子数组和的最大值。</p>
  <p><strong>核心思路</strong>：二分答案范围 [max(nums), sum(nums)]。check(mid) 贪心分割，保证每个子数组和 ≤ mid，统计子数组数量是否 ≤ m。这是"最大值最小化"的经典问题。</p>
  <div class="problem-tags">
    <span class="tag">二分答案</span>
    <span class="tag">DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 1482. 制作 m 束花所需的最少天数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1482]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-number-of-days-to-make-m-bouquets/" target="_blank">制作 m 束花所需的最少天数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>花园里每朵花在不同天数开放，收集相邻的 k 朵花制成一束，求制作 m 束花的最少天数。</p>
  <p><strong>核心思路</strong>：天数范围 [min(bloomDay), max(bloomDay)]。check(day) 模拟在第 day 天时哪些花已开，统计连续已开的花能组成多少束。如果总束数 ≥ m 则可行。</p>
  <div class="problem-tags">
    <span class="tag">二分答案</span>
    <span class="tag">贪心</span>
  </div>
</div>

## 复杂度分析

| 题目 | 答案范围 | check 函数 | 总时间 |
|------|---------|-----------|--------|
| 875. 吃香蕉 | [1, max] | O(n) | O(n log max) |
| 1011. 运送包裹 | [max, sum] | O(n) | O(n log sum) |
| 410. 分割数组 | [max, sum] | O(n) | O(n log sum) |
| 1482. 制作花束 | [min, max] | O(n) | O(n log range) |

## 二分答案通用模板

```python
def solve_binary_answer(lo, hi):
    """求解最小可行解"""
    left, right = lo, hi
    while left < right:
        mid = (left + right) // 2
        if check(mid):
            right = mid  # mid 可行，尝试更小值
        else:
            left = mid + 1  # mid 不可行，尝试更大值
    return left
```

```python
def solve_binary_answer_max(lo, hi):
    """求解最大可行解"""
    left, right = lo, hi
    while left < right:
        mid = (left + right + 1) // 2  # 上取整避免死循环
        if check(mid):
            left = mid  # mid 可行，尝试更大值
        else:
            right = mid - 1  # mid 不可行，尝试更小值
    return left
```

## 相关主题

- [排序与搜索 - 二分查找](/topics/sorting-searching/binary-search) — 二分答案是对二分查找思想的泛化
- [排序与搜索 - 搜索旋转数组](/topics/sorting-searching/rotated-array) — 二分答案与旋转数组搜索共享二分框架
