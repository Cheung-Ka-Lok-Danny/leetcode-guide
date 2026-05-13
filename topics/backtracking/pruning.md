# 剪枝优化

剪枝（Pruning）是回溯算法中提升效率的核心技术，通过提前终止不可能产生解的搜索路径来减少搜索空间。

## 核心概念

### 常见剪枝策略

| 剪枝类型 | 原理 | 示例 |
|---------|------|------|
| **排序剪枝** | 先排序，相同元素相邻后利用树层去重 | 全排列 II、子集 II |
| **可行性剪枝** | 当前已无法满足条件时提前返回 | 组合总和（和超过 target） |
| **最优性剪枝** | 当前解已不可能优于已知最优解时返回 | TSP、旅行商 |
| **记忆化剪枝** | 缓存已计算过的子问题 | 单词拆分 II |

### 回溯算法的架构

```python
def backtrack(state):
    if 是解:
        记录解
        return

    # 剪枝判断
    if not 可行(state):
        return   # 可行性剪枝
    if not 可能更优(state):
        return   # 最优性剪枝

    for 选择 in 选择列表:
        if 本层已选过相同元素:
            continue  # 排序剪枝 + 树层去重
        if 记忆化存在(state, 选择):
            continue  # 记忆化剪枝
        做选择
        backtrack(新状态)
        撤销选择
```

### 排序剪枝详解

先对数组排序，使相同元素相邻。在递归树的同一层中，如果当前元素与前一个相同且前一个未被使用，则跳过：

```python
nums.sort()
if i > start and nums[i] == nums[i-1]:
    continue  # 树层去重
```

## 经典题目

### LeetCode 47. 全排列 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[47]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/permutations-ii/" target="_blank">全排列 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定包含重复数字的数组，返回不重复的全排列。</p>
  <p><strong>核心思路</strong>：先排序，树层去重（used[i-1]==False 时跳过 i）。同时 used 数组做树枝去重。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">排序剪枝</span>
    <span class="tag">去重</span>
  </div>
</div>

```python
def permuteUnique(nums):
    nums.sort()
    res = []
    used = [False] * len(nums)

    def backtrack(path):
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            # 树层去重
            if i > 0 and nums[i] == nums[i-1] and not used[i-1]:
                continue
            used[i] = True
            path.append(nums[i])
            backtrack(path)
            path.pop()
            used[i] = False

    backtrack([])
    return res
```

### LeetCode 90. 子集 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[90]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/subsets-ii/" target="_blank">子集 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回数组（含重复元素）的所有不重复子集。</p>
  <p><strong>核心思路</strong>：先排序，树层去重。同一层中跳过相同元素。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">排序剪枝</span>
    <span class="tag">去重</span>
  </div>
</div>

### LeetCode 131. 分割回文串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[131]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/palindrome-partitioning/" target="_blank">分割回文串</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将字符串分割成若干回文子串，返回所有方案。</p>
  <p><strong>核心思路</strong>：回溯枚举分割点。在 for 循环中，先判断当前子串是否为回文，不是则跳过（可行性剪枝）。可预先用 DP 计算回文表加速判断。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">剪枝</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 93. 复原 IP 地址

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[93]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/restore-ip-addresses/" target="_blank">复原 IP 地址</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将数字字符串复原成所有可能的 IP 地址。</p>
  <p><strong>核心思路</strong>：回溯切割字符串判断是否为合法 IP 段。剪枝：不能有前导零、数值必须在 0-255 之间、已经生成 4 段时字符串必须用完。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">字符串</span>
  </div>
</div>

### LeetCode 140. 单词拆分 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[140]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/word-break-ii/" target="_blank">单词拆分 II</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>给定字符串和单词字典，将字符串拆分成若干字典中的单词，返回所有句子。</p>
  <p><strong>核心思路</strong>：回溯枚举分割点。记忆化剪枝——用 memo[i] 缓存从位置 i 开始能否继续拆分（避免重复递归）。先用 DP 判断是否能拆，不能则直接剪枝。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">记忆化</span>
    <span class="tag">剪枝</span>
  </div>
</div>

## 剪枝策略总结

| 策略 | 适用场景 | 典型题目 |
|------|---------|---------|
| 排序 + 树层去重 | 含有重复元素的组合/排列 | 47, 90 |
| 可行性判断 | 无法满足约束时提前返回 | 131, 93, 140 |
| 提前判断能否完成 | 先用 DP 判断可解性 | 140 |
| 记忆化缓存 | 子问题重复计算 | 140 |

## 相关主题

- [回溯 - 排列组合](/topics/backtracking/permutations-combinations) — 剪枝在排列组合中去重和优化
- [回溯 - 子集问题](/topics/backtracking/subsets) — 剪枝在子集生成中去除重复解
