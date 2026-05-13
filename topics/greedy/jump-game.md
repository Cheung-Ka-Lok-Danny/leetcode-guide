# 跳跃游戏

跳跃游戏系列题的核心是维护**最远可达位置**，用贪心策略从左到右扫描更新能跳到的最大范围。

## 核心概念

### 跳跃游戏思想

```python
# 跳跃游戏通用贪心框架
max_reach = 0
for i in range(n):
    if i > max_reach:  # 当前不可达
        return False
    max_reach = max(max_reach, i + nums[i])
    if max_reach >= n - 1:  # 已到达终点
        return True
```

### 关键技巧
- **正向贪心**：维护最远可达位置，如果当前位置不可达则失败
- **反向贪心**：从右向左找能到达当前位置的最左位置（跳跃游戏II的另一种思路）
- **BFS**：跳跃游戏 III 用 BFS 搜索可达位置

## 经典题目

### LeetCode 55. 跳跃游戏

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[55]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/jump-game/" target="_blank">跳跃游戏</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断是否能从数组第一个位置跳到最后一个位置（每个元素表示最大跳跃长度）。</p>
  <p><strong>核心思路</strong>：维护最远可达位置，遍历每个位置时更新之。若当前位置不可达（i > max_reach）则返回 False。</p>
  <div class="problem-tags">
    <span class="tag">贪心</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def canJump(nums):
    max_reach = 0
    n = len(nums)
    for i in range(n):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
        if max_reach >= n - 1:
            return True
    return True
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 45. 跳跃游戏 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[45]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/jump-game-ii/" target="_blank">跳跃游戏 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>跳到最后一个位置的最少跳跃次数（假设总是能跳到最后）。</p>
  <p><strong>核心思路</strong>：用 BFS 思想，维护当前步数能到达的区间 [start, end]，每次遍历区间内的所有位置，更新下一步能到达的最远距离。</p>
  <div class="problem-tags">
    <span class="tag">贪心</span>
    <span class="tag">BFS</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def jump(nums):
    n = len(nums)
    if n == 1:
        return 0
    jumps = 0
    cur_end = 0  # 当前步数能到达的最远位置
    max_reach = 0
    for i in range(n - 1):
        max_reach = max(max_reach, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = max_reach
            if cur_end >= n - 1:
                break
    return jumps
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 1306. 跳跃游戏 III

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1306]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/jump-game-iii/" target="_blank">跳跃游戏 III</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>从起始下标出发，每次可以向左或向右跳 arr[i] 步，判断能否到达值为 0 的位置。</p>
  <p><strong>核心思路</strong>：BFS 或 DFS。从起点开始，标记已访问位置，探索 arr[i] 步以内的位置（i + arr[i] 和 i - arr[i]），直到找到值为 0 的位置。</p>
  <div class="problem-tags">
    <span class="tag">BFS</span>
    <span class="tag">DFS</span>
    <span class="tag">搜索</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 跳跃游戏 | O(n) | O(1) |
| 跳跃游戏 II | O(n) | O(1) |
| 跳跃游戏 III | O(n) | O(n) |

## 相关主题

- [贪心 - 区间调度](/topics/greedy/interval-scheduling) — 跳跃游戏与区间调度本质都是贪心维护最远可达
- [动态规划 - 线性DP](/topics/dynamic-programming/linear-dp) — 跳跃游戏也可用 DP 求解
