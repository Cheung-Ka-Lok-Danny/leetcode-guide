# 树形DP

树形DP（Tree DP）是在树结构上进行的动态规划，通过后序遍历收集子树信息，在根节点合并得到最终结果。

## 核心概念

### 基本思路
- 在树上做 DP，状态定义在节点上
- **后序遍历**：先递归处理子树，再处理当前节点
- 父子节点间的状态转移

### 常见模式

```python
# 树形DP基本模板
def dfs(node):
    if not node:
        return base_value

    # 递归处理左右子树
    left_res = dfs(node.left)
    right_res = dfs(node.right)

    # 在根节点合并子树的解
    cur_res = merge(left_res, right_res, node.val)
    return cur_res
```

### 常见题型
- **路径问题**：二叉树直径、最大路径和
- **树上选择**：打家劫舍III、监控二叉树
- **距离问题**：树中距离之和、最小高度树

## 经典题目

### LeetCode 543. 二叉树的直径

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[543]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/diameter-of-binary-tree/" target="_blank">二叉树的直径</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>求二叉树中任意两个节点间最长路径的长度（路径长度 = 边数）。</p>
  <p><strong>核心思路</strong>：计算每个节点的左右子树深度，直径 = max(左子树深度 + 右子树深度)，同时返回当前节点的最大深度给父节点使用。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def diameterOfBinaryTree(root):
    ans = 0

    def dfs(node):
        nonlocal ans
        if not node:
            return 0
        left = dfs(node.left)
        right = dfs(node.right)
        # 经过当前节点的直径
        ans = max(ans, left + right)
        # 返回当前节点的最大深度
        return max(left, right) + 1

    dfs(root)
    return ans
```

> 时间复杂度：O(n) | 空间复杂度：O(h)，h 为树高

### LeetCode 337. 打家劫舍 III

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[337]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/house-robber-iii/" target="_blank">打家劫舍 III</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>二叉树结构的小区，不能偷相邻节点（父子），求最大偷窃金额。</p>
  <p><strong>核心思路</strong>：每个节点返回两个值 f(偷当前节点)、g(不偷当前节点)。偷则子节点不能偷，不偷则子节点可选偷或不偷。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def rob(root):
    def dfs(node):
        if not node:
            return (0, 0)
        left = dfs(node.left)
        right = dfs(node.right)
        # 偷当前节点
        rob = node.val + left[1] + right[1]
        # 不偷当前节点
        not_rob = max(left) + max(right)
        return (rob, not_rob)

    return max(dfs(root))
```

> 时间复杂度：O(n) | 空间复杂度：O(h)

### LeetCode 124. 二叉树中的最大路径和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[124]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-tree-maximum-path-sum/" target="_blank">二叉树中的最大路径和</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>求二叉树中任意路径的最大节点和（路径可以任意节点为起点和终点）。</p>
  <p><strong>核心思路</strong>：计算经过每个节点的最大路径和（左贡献 + 右贡献 + 当前值），同时返回从当前节点向下延伸的最大贡献值给父节点。注意贡献可以为负时取 0 不选。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">高频面试</span>
    <span class="tag">经典题</span>
  </div>
</div>

### LeetCode 968. 监控二叉树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[968]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-tree-cameras/" target="_blank">监控二叉树</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在二叉树节点上放置摄像头，每个摄像头可以监控自身、父节点和子节点，求覆盖整棵树的最少摄像头数。</p>
  <p><strong>核心思路</strong>：每个节点有三种状态：0-未被覆盖、1-已覆盖但无摄像头、2-已放置摄像头。后序遍历，贪心地优先在父节点放置摄像头覆盖子节点。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">贪心</span>
  </div>
</div>

### LeetCode 834. 树中距离之和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[834]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sum-of-distances-in-tree/" target="_blank">树中距离之和</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>给定无向树，返回每个节点到其他所有节点距离之和的数组。</p>
  <p><strong>核心思路</strong>：两次 DFS。第一次计算 root 到所有节点的距离和，以及每棵子树的节点数。第二次通过换根公式 dp[child] = dp[parent] + (n - 2 * cnt[child]) 计算其他节点的距离和。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">换根DP</span>
  </div>
</div>

### LeetCode 310. 最小高度树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[310]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-height-trees/" target="_blank">最小高度树</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到无向树中使得树高度最小的根节点（可能有一个或两个）。</p>
  <p><strong>核心思路</strong>：拓扑排序（剥洋葱法）——从所有叶子节点开始，逐层向中心剥除，最后剩下的一到两个节点即为答案。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">拓扑排序</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 二叉树的直径 | O(n) | O(h) |
| 打家劫舍 III | O(n) | O(h) |
| 二叉树的最大路径和 | O(n) | O(h) |
| 监控二叉树 | O(n) | O(h) |
| 树中距离之和 | O(n) | O(n) |
| 最小高度树 | O(n) | O(n) |

## 相关主题

- [树 - 树形DP](/topics/tree/tree-dp) — 树上的动态规划与树形 DP 思想一脉相承
- [动态规划 - 线性DP](/topics/dynamic-programming/linear-dp) — 树形 DP 是线性 DP 在树形结构上的推广
