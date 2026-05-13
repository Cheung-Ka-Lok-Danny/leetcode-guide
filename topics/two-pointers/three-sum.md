# 三数之和

三数之和（Three Sum）是双指针法的经典应用，通过排序 + 双指针将 O(n³) 优化为 O(n²)。

## 核心概念

### 基本思路

**排序 + 双指针**：
1. 对数组排序
2. 固定第一个元素 `nums[i]`，让两个指针 `left = i+1`, `right = n-1`
3. 在剩余数组中用对撞指针找两数之和等于 `target - nums[i]`

```python
# 三数之和模板
def three_sum(nums, target=0):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        # 跳过重复的 nums[i]
        if i > 0 and nums[i] == nums[i-1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == target:
                res.append([nums[i], nums[left], nums[right]])
                # 跳过重复
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < target:
                left += 1
            else:
                right -= 1
    return res
```

### 去重技巧
- **外层去重**：`i > 0 and nums[i] == nums[i-1]` 跳过
- **内层去重**：找到解后，跳过所有与 left/right 值相同的元素

## 经典题目

### LeetCode 15. 三数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[15]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/3sum/" target="_blank">三数之和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出数组中所有和为 0 的三元组（不重复）。</p>
  <p><strong>核心思路</strong>：排序 + 双指针。固定第一个数，在剩余数组中用对撞指针找两数之和为 -nums[i]。注意三层去重。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">排序</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def threeSum(nums):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        # 剪枝：最小的三个数之和 > 0 则不可能有解
        if nums[i] + nums[i+1] + nums[i+2] > 0:
            break
        # 剪枝：当前数和最大的两个数之和 < 0，说明 i 不够大
        if nums[i] + nums[n-2] + nums[n-1] < 0:
            continue
        left, right = i + 1, n - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                res.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1
    return res
```

> 时间复杂度：O(n²) | 空间复杂度：O(1) 不计结果

### LeetCode 16. 最接近的三数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[16]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/3sum-closest/" target="_blank">最接近的三数之和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出一个和与 target 最接近的三元组。</p>
  <p><strong>核心思路</strong>：排序 + 双指针。维护当前和与 target 的最小差值，根据和的大小决定移动左还是右指针。可以剪枝：精确匹配时直接返回。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">排序</span>
  </div>
</div>

### LeetCode 18. 四数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[18]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/4sum/" target="_blank">四数之和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出数组中所有和为 target 的四元组。</p>
  <p><strong>核心思路</strong>：三数之和的扩展，两层嵌套循环 + 双指针。注意剪枝和去重。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">排序</span>
    <span class="tag">剪枝</span>
  </div>
</div>

### LeetCode 259. 较小的三数之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[259]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/3sum-smaller/" target="_blank">较小的三数之和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>统计三元组 (i,j,k) 的数量，使得 nums[i] + nums[j] + nums[k] < target。</p>
  <p><strong>核心思路</strong>：排序 + 双指针。对于固定的 i，当 s < target 时，left 到 right 之间的所有位置都满足条件，计数 += right - left。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">计数</span>
  </div>
</div>

### LeetCode 611. 有效三角形的个数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[611]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/valid-triangle-number/" target="_blank">有效三角形的个数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>统计数组中能组成三角形的三元组个数（需满足两边之和 > 第三边）。</p>
  <p><strong>核心思路</strong>：先排序，固定最长边（从后往前），在左侧用双指针找两数之和 > 最长边的组合。固定 right 时，若 nums[left]+nums[mid] > nums[right] 则 left..mid 全部有效。</p>
  <div class="problem-tags">
    <span class="tag">双指针</span>
    <span class="tag">数学</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 三数之和 | O(n²) | O(1) |
| 最接近的三数之和 | O(n²) | O(1) |
| 四数之和 | O(n³) | O(1) |
| 较小的三数之和 | O(n²) | O(1) |
| 有效三角形的个数 | O(n²) | O(1) |

### 总结对比

| 题目 | 和条件 | 移动策略 |
|------|-------|---------|
| 三数之和 | s == 0 | 左移/右移取决于 s 与 0 的关系 |
| 最接近的三数之和 | s 最接近 target | 更新差值，左/右移 |
| 四数之和 | s == target | 两层循环 + 双指针 |
| 较小的三数之和 | s < target | 满足条件时计数 += right - left |
| 有效三角形 | s > max | 固定 max，左指针检查 |

## 相关主题

- [双指针 - 对撞指针](/topics/two-pointers/opposite-direction) — 三数之和依赖对撞指针实现高效查找
- [哈希表 - 两数之和系列](/topics/hash-table/two-sum-family) — 三数之和本质是两数之和的扩展
