# 树形 DP

树形 DP（Tree DP）是在树结构上应用动态规划，通常利用树的递归性质，通过后序遍历自底向上推导状态。

## 核心概念

### 自底向上的后序遍历

树形 DP 的核心框架：

```
def dfs(node):
    if not node:
        返回基础状态

    left_state = dfs(node.left)   # 处理左子树
    right_state = dfs(node.right) # 处理右子树

    # 根据左右子树的状态计算当前节点状态
    return current_state
```

### 状态定义模式

树形 DP 的状态定义通常有两种思路：

| 模式 | 说明 | 典型问题 |
|------|------|---------|
| **单状态** | 每个节点只返回一个值 | 最大深度、直径、路径和 |
| **多状态** | 每个节点返回一组相关状态 | 打家劫舍（偷/不偷）、监控（3种状态） |

### 树形 DP vs 常规 DP

| 特性 | 树形 DP | 常规 DP |
|------|---------|---------|
| 结构 | 树形（递归） | 线性或网格 |
| 计算方向 | 自底向上（后序） | 自底向上或自顶向下 |
| 状态传递 | 通过函数返回值 | 通过数组/矩阵 |
| 遍历方式 | DFS 递归 | 循环迭代 |

## 关键技巧

1. **后序遍历是基础**：先处理孩子再处理根，这是树形 DP 的前提
2. **递归返回值**：返回的是以当前节点为根的子树的结果
3. **全局变量**：某些问题需要维护全局最优值（如直径、最大路径和）
4. **多状态设计**：当节点状态有分支时（选择/不选择），返回 tuple 或 list
5. **避免重复计算**：递归天然具备记忆化能力，但注意不要重复遍历

## 经典题目

### LeetCode 104. 二叉树的最大深度

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[104]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/maximum-depth-of-binary-tree/" target="_blank">二叉树的最大深度</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>求二叉树的最大深度（根到最远叶节点的距离）。</p>
  <p><strong>核心思路</strong>：后序遍历——左子树最大深度和右子树最大深度的最大值 + 1。最基本的树形 DP 问题。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">入门</span>
  </div>
</div>

```python
def maxDepth(root):
    if not root:
        return 0
    return max(maxDepth(root.left), maxDepth(root.right)) + 1
```

> 时间复杂度：O(n) | 空间复杂度：O(h)

### LeetCode 110. 平衡二叉树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[110]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/balanced-binary-tree/" target="_blank">平衡二叉树</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断二叉树是否平衡——左右子树高度差不超过 1。</p>
  <p><strong>核心思路</strong>：后序遍历返回子树高度，如果高度差 > 1 则返回 -1 表示不平衡。递归判断左右子树是否平衡。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">高度</span>
  </div>
</div>

### LeetCode 543. 二叉树的直径

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[543]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/diameter-of-binary-tree/" target="_blank">二叉树的直径</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>求二叉树中任意两个节点路径长度的最大值（直径）。</p>
  <p><strong>核心思路</strong>：后序遍历计算子树深度，更新全局最大直径 = max(当前直径, 左深度 + 右深度)。注意直径不一定经过根节点。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">全局变量</span>
  </div>
</div>

### LeetCode 124. 二叉树中的最大路径和

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[124]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-tree-maximum-path-sum/" target="_blank">二叉树中的最大路径和</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>找到二叉树中和最大的路径（路径可以从任意节点开始和结束）。</p>
  <p><strong>核心思路</strong>：后序遍历，每个节点返回经过该节点且向上延伸的最大路径和（即 max(左子树贡献, 0) + node.val + max(右子树贡献, 0)……不对，是 node.val + max(左子树最大贡献, 0) + max(右子树最大贡献, 0) 更新全局最大和；返回值为 node.val + max(左子树最大贡献, 0, 右子树最大贡献, 0) —— 注意负值贡献不要取。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">后序遍历</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def maxPathSum(root):
    max_sum = float('-inf')

    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0

        left_gain = max(dfs(node.left), 0)
        right_gain = max(dfs(node.right), 0)

        # 经过当前节点的路径和
        current_sum = node.val + left_gain + right_gain
        max_sum = max(max_sum, current_sum)

        # 返回给父节点的最大贡献
        return node.val + max(left_gain, right_gain)

    dfs(root)
    return max_sum
```

> 时间复杂度：O(n) | 空间复杂度：O(h)

### LeetCode 337. 打家劫舍 III

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[337]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/house-robber-iii/" target="_blank">打家劫舍 III</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在二叉树中选择不相邻的节点，使节点值之和最大。</p>
  <p><strong>核心思路</strong>：双状态——(偷当前节点, 不偷当前节点) 的最大值。偷当前节点则不能偷子节点；不偷则可以偷或不偷子节点。后序遍历返回两个状态值。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">双状态</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def rob(root):
    def dfs(node):
        if not node:
            return (0, 0)  # (偷当前, 不偷当前)

        left = dfs(node.left)
        right = dfs(node.right)

        # 偷当前节点：左右子节点都不能偷
        rob_cur = node.val + left[1] + right[1]
        # 不偷当前节点：左右子节点可选偷或不偷
        not_rob = max(left) + max(right)

        return (rob_cur, not_rob)

    return max(dfs(root))
```

> 时间复杂度：O(n) | 空间复杂度：O(h)

### LeetCode 687. 最长同值路径

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[687]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-univalue-path/" target="_blank">最长同值路径</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到二叉树中所有节点值都相同的最长路径长度。</p>
  <p><strong>核心思路</strong>：后序遍历，从子树获取同值延伸长度。如果当前节点值与子节点相同，则累加；否则断开。全局维护最大值 = 左延伸 + 右延伸。返回单侧最大延伸。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">全局变量</span>
  </div>
</div>

### LeetCode 968. 监控二叉树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[968]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-tree-cameras/" target="_blank">监控二叉树</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在二叉树节点上放置摄像头，每个摄像头可以监控自身、父节点和子节点，求最小摄像头数。</p>
  <p><strong>核心思路</strong>：三状态贪心——0: 未被覆盖；1: 已覆盖（未安装摄像头）；2: 已安装摄像头。后序遍历，空节点视为已覆盖。根据左右子节点的状态决定当前节点行为。</p>
  <div class="problem-tags">
    <span class="tag">树形DP</span>
    <span class="tag">贪心</span>
    <span class="tag">三状态</span>
  </div>
</div>

## 复杂度分析

| 问题 | 时间 | 空间 |
|------|------|------|
| 104. 最大深度 | O(n) | O(h) |
| 110. 平衡二叉树 | O(n) | O(h) |
| 543. 直径 | O(n) | O(h) |
| 124. 最大路径和 | O(n) | O(h) |
| 337. 打家劫舍 III | O(n) | O(h) |
| 687. 最长同值路径 | O(n) | O(h) |
| 968. 监控二叉树 | O(n) | O(h) |

## 相关主题

- [动态规划 - 树形DP](/topics/dynamic-programming/tree-dp) — 树的动态规划与树形 DP 的思想一脉相承
- [树 - 遍历方式](/topics/tree/traversal) — 后序遍历是树形 DP 的基础操作
