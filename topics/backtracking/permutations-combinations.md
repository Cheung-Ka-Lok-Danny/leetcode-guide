# 排列组合

排列与组合是回溯算法最基础的应用，核心区别在于：排列关注顺序（不同顺序算不同结果），组合不关注顺序。

## 核心概念

### 回溯标准模板

```python
def backtrack(path, choices, ...):
    if 满足结束条件:
        记录结果
        return

    for 选择 in 选择列表:
        做选择
        backtrack(新路径, 新选择列表, ...)
        撤销选择
```

### 排列 vs 组合

| 对比 | 排列 | 组合 |
|------|------|------|
| 顺序是否重要 | 是 | 否 |
| 是否用 used 数组 | 是（树枝去重） | 否 |
| 是否用 startIndex | 否 | 是（保证递增顺序） |
| LeetCode 示例 | 46, 47 | 77, 39, 40 |

### 去重技巧
- **树枝去重**（used 数组）：同一路径中元素不能重复使用
- **树层去重**（排序 + 剪枝）：避免同一层中取相同元素导致重复结果
- ```python
  # 树层去重标准写法
  if i > 0 and nums[i] == nums[i-1] and not used[i-1]:
      continue
  ```

## 经典题目

### LeetCode 46. 全排列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[46]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/permutations/" target="_blank">全排列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定不含重复数字的数组，返回所有可能的全排列。</p>
  <p><strong>核心思路</strong>：经典回溯。用 used 数组标记已选元素，每层遍历所有未使用的元素加入排列。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">排列</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def permute(nums):
    res = []
    n = len(nums)
    used = [False] * n

    def backtrack(path):
        if len(path) == n:
            res.append(path[:])
            return
        for i in range(n):
            if not used[i]:
                used[i] = True
                path.append(nums[i])
                backtrack(path)
                path.pop()
                used[i] = False

    backtrack([])
    return res
```

> 时间复杂度：O(n × n!) | 空间复杂度：O(n)

### LeetCode 47. 全排列 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[47]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/permutations-ii/" target="_blank">全排列 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定包含重复数字的数组，返回不重复的全排列。</p>
  <p><strong>核心思路</strong>：46 题 + 树层去重。先排序，在同一层递归中，若当前数字与前一个数字相同且前一个未被使用，则跳过。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">去重</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 77. 组合

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[77]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/combinations/" target="_blank">组合</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回 1..n 中所有 k 个数的组合。</p>
  <p><strong>核心思路</strong>：用 startIndex 控制起始位置，保证组合是递增的（避免重复）。可剪枝：剩余元素不足时提前结束。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">组合</span>
    <span class="tag">入门题</span>
  </div>
</div>

### LeetCode 39. 组合总和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[39]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/combination-sum/" target="_blank">组合总和</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>从无重复数组中选出若干数（可重复选），使其和等于 target，返回所有组合。</p>
  <p><strong>核心思路</strong>：通过 startIndex 实现递增枚举（避免 (2,3) 和 (3,2) 重复），递归时可以重复选同一个数（不传 i+1 而传 i）。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">组合</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def combinationSum(candidates, target):
    res = []

    def backtrack(start, path, remain):
        if remain == 0:
            res.append(path[:])
            return
        if remain < 0:
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, path, remain - candidates[i])
            path.pop()

    backtrack(0, [], target)
    return res
```

> 时间复杂度：O(n^(target/min)) 最坏 | 空间复杂度：O(target/min)

### LeetCode 40. 组合总和 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[40]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/combination-sum-ii/" target="_blank">组合总和 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>从有重复数组中选出若干数（每个数只能用一次），使其和等于 target。</p>
  <p><strong>核心思路</strong>：39 题基础上去重。先排序，同一层中若当前数与前一个相同则跳过（树层去重），递归时传入 i+1。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">去重</span>
  </div>
</div>

### LeetCode 78. 子集

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[78]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/subsets/" target="_blank">子集</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回数组（不含重复元素）的所有子集。</p>
  <p><strong>核心思路</strong>：组合的变体，收集每个节点（而不是叶子节点）的路径。用 startIndex 保证不重复。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">子集</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 复杂度分析

| 类型 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 全排列（无重复） | O(n × n!) | O(n) |
| 全排列（有重复） | O(n × n!) | O(n) |
| 组合 | O(C(n,k) × k) | O(k) |
| 组合总和 | 指数级 | O(target/min) |

## 相关主题

- [回溯 - 子集问题](/topics/backtracking/subsets) — 排列组合与子集问题同属回溯的经典题型
- [回溯 - 剪枝优化](/topics/backtracking/pruning) — 剪枝是优化排列组合回溯效率的关键
