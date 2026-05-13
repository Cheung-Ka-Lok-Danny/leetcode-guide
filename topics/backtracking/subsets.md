# 子集问题

子集问题是回溯算法的经典应用，包括无重复/有重复元素的子集枚举，以及特定条件的子集选择。

## 核心概念

### 子集枚举思路
- **递归回溯法**：每个元素选或不选，收集路径树上所有节点的状态
- **迭代构造法**：从空集开始，逐个元素追加到已有子集中

```python
# 迭代构造法
def subsets_iterative(nums):
    res = [[]]
    for num in nums:
        res += [subset + [num] for subset in res]
    return res
```

### 重复元素处理
- 先排序，使相同元素相邻
- 树层去重：同一层递归中跳过重复元素
- ```python
  if i > start and nums[i] == nums[i-1]:
      continue
  ```

### 题型分类
| 类型 | 特点 | 代表题目 |
|------|------|---------|
| 无重复子集 | 标准子集枚举 | 78 |
| 有重复子集 | 排序+树层去重 | 90 |
| 递增子序列 | 不能排序，用 set 去重 | 491 |
| 等和子集划分 | 回溯+剪枝 | 698 |

## 经典题目

### LeetCode 78. 子集

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[78]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/subsets/" target="_blank">子集</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回数组（不含重复元素）的所有子集。</p>
  <p><strong>核心思路</strong>：回溯枚举，收集路径树上每个节点。每个元素可选或不选，用 startIndex 控制选择起点。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">子集</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def subsets(nums):
    res = []

    def backtrack(start, path):
        res.append(path[:])  # 收集每个节点
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return res
```

> 时间复杂度：O(n × 2ⁿ) | 空间复杂度：O(n)

### LeetCode 90. 子集 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[90]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/subsets-ii/" target="_blank">子集 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回数组（含重复元素）的所有不重复子集。</p>
  <p><strong>核心思路</strong>：先排序，树层去重。同一层中，若当前元素与前一个相同，跳过。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">去重</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def subsetsWithDup(nums):
    nums.sort()
    res = []

    def backtrack(start, path):
        res.append(path[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i-1]:
                continue  # 树层去重
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return res
```

> 时间复杂度：O(n × 2ⁿ) | 空间复杂度：O(n)

### LeetCode 491. 非递减子序列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[491]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/non-decreasing-subsequences/" target="_blank">非递减子序列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到所有长度至少为2的递增子序列（不能改变原数组顺序）。</p>
  <p><strong>核心思路</strong>：不能排序（因为要保持原顺序），使用 set 或数组在同一层做去重。path[-1] <= nums[i] 保证递增。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">子序列</span>
    <span class="tag">去重</span>
  </div>
</div>

### LeetCode 698. 划分为K个相等的子集

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[698]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/" target="_blank">划分为K个相等的子集</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断能否将数组划分为 K 个和相等的子集。</p>
  <p><strong>核心思路</strong>：回溯搜索每个元素归属哪个子集。优化：从大到小排序 + 跳过相同值的空子集 + 子集和大于 target 时剪枝。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">剪枝</span>
    <span class="tag">子集划分</span>
  </div>
</div>

## 子集问题总结

| 题目 | 特点 | 去重方法 |
|------|------|---------|
| 78. 子集 | 无重复元素 | 无需去重 |
| 90. 子集 II | 有重复元素 | 排序 + 树层去重 |
| 491. 非递减子序列 | 不能排序 | 每层用 set 或数组标记 |
| 698. 划分为K个相等子集 | 元素归属划分 | 剪枝优化 |

## 相关主题

- [回溯 - 排列组合](/topics/backtracking/permutations-combinations) — 子集问题与排列组合共享回溯框架
- [回溯 - 剪枝优化](/topics/backtracking/pruning) — 剪枝策略对子集问题的去重至关重要
