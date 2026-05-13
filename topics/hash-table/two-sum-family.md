# 两数之和系列

两数之和是 LeetCode 的"Hello World"题，从这个基础问题出发，可以演变出一系列 N 数之和问题。

## 核心概念

### 从两数之和到 N 数之和

| 问题 | 方法 | 时间复杂度 |
|------|------|-----------|
| **两数之和** | 哈希表 | O(n) |
| **两数之和 II（有序）** | 双指针 | O(n) |
| **三数之和** | 排序 + 双指针 | O(n²) |
| **四数之和** | 排序 + 双指针 + 外层循环 | O(n³) |
| **四数相加 II** | 分组 + 哈希表 | O(n²) |

### 排序 + 双指针 vs 哈希表

| 方法 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| **哈希表** | 无序数组，返回下标 | 保持原顺序 | 不能去重 |
| **排序 + 双指针** | 去重、返回数值 | 可去重，空间 O(1) | 会改变顺序 |

> 原则上：需要返回**下标**用哈希表；需要**去重**或组合数较多（三数及以上）时，排序 + 双指针更合适。

### 降维思想

N 数之和的核心技巧是将高维问题降维：
- 三数之和 = 固定一个数 + 两数之和
- 四数之和 = 固定一个数 + 三数之和
- 四数相加 II = 两两分组，转化为两数之和

## 关键技巧

1. **去重模板**：排序后，对每个 i，如果 `nums[i] == nums[i-1]` 则跳过
2. **剪枝**：固定最外层后，若最小组合已大于 target 或最大组合已小于 target，可直接 break
3. **分组思想**：将四个数分成两组，每组计算两数之和，再用哈希表匹配

## 经典题目

### LeetCode 1. 两数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/two-sum/" target="_blank">两数之和</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>在数组中找出两个数使其和等于目标值，返回下标。</p>
  <p><strong>核心思路</strong>：哈希表记录已遍历元素的值和下标，对每个元素查找 target - num。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i
    return []
```

> 时间复杂度：O(n) | 空间复杂度：O(n)

### LeetCode 167. 两数之和 II - 输入有序数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[167]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/" target="_blank">两数之和 II - 输入有序数组</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>有序数组中找到两个数使其和等于目标值，返回下标（从1开始）。</p>
  <p><strong>核心思路</strong>：利用有序性，使用双指针从两端向中间移动，根据当前和与 target 的比较决定移动方向，O(n) 时间 O(1) 空间。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">有序数组</span>
  </div>
</div>

```python
def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 15. 三数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[15]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/3sum/" target="_blank">三数之和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出数组中所有和为 0 的三元组，要求去重。</p>
  <p><strong>核心思路</strong>：先排序，固定第一个数，然后用双指针在剩余部分寻找两数之和等于 target。注意去重逻辑——外循环和内循环都要跳过重复值。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">排序</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def threeSum(nums):
    nums.sort()
    result = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1
    return result
```

> 时间复杂度：O(n²) | 空间复杂度：O(1)（不计输出空间）

### LeetCode 18. 四数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[18]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/4sum/" target="_blank">四数之和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出所有和为 target 的四元组，要求去重。</p>
  <p><strong>核心思路</strong>：在三数之和基础上再套一层循环。两层外层循环 + 双指针。注意剪枝优化——当前最小和大于 target 或最大和小于 target 时可提前终止。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">排序</span>
    <span class="tag">剪枝</span>
  </div>
</div>

### LeetCode 454. 四数相加 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[454]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/4sum-ii/" target="_blank">四数相加 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>四个数组各取一个数，使其和为 0，返回组合数。</p>
  <p><strong>核心思路</strong>：分组哈希表——将 A+B 的所有组合和及其出现次数存入哈希表，然后遍历 C+D 的组合，查找 -(c+d) 在哈希表中的次数。时间 O(n²)，空间 O(n²)。</p>
  <div class="problem-tags">
    <span class="tag">哈希表</span>
    <span class="tag">分组</span>
  </div>
</div>

## 复杂度总结

| 题目 | 方法 | 时间复杂度 | 空间复杂度 |
|------|------|-----------|-----------|
| 1. 两数之和 | 哈希表 | O(n) | O(n) |
| 167. 两数之和 II | 双指针 | O(n) | O(1) |
| 15. 三数之和 | 排序 + 双指针 | O(n²) | O(1) |
| 18. 四数之和 | 排序 + 双指针 | O(n³) | O(1) |
| 454. 四数相加 II | 分组哈希 | O(n²) | O(n²) |

## 相关主题

- [双指针 - 对撞指针](/topics/two-pointers/opposite-direction) — 两数之和 II 的双指针解法与对撞指针紧密相关
- [哈希表 - 哈希映射](/topics/hash-table/hash-map) — 两数之和系列依赖哈希映射实现 O(n) 查找
