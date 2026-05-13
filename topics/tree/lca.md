# 最近公共祖先

最近公共祖先（Lowest Common Ancestor, LCA）是树问题中的经典题型，考察对后序遍历和递归的理解。

## 核心概念

### 什么是 LCA

给定一棵树上的两个节点 p 和 q，它们的最近公共祖先是指同时是 p 和 q 的祖先且深度最深的节点。

> 一个节点也可以是它自己的祖先。

### 递归后序遍历找 LCA

核心思想：二叉树本身就是递归结构，LCA 问题可以通过后序遍历自然解决。

**算法思路：**
1. 递归遍历树的每个节点
2. 如果当前节点是 p 或 q，则返回当前节点
3. 递归在左右子树中查找 p 和 q
4. 如果左右子树都找到了（各找到 p 或 q 中的一个），则当前节点就是 LCA
5. 如果只有一侧找到，则返回那侧的结果

### BST 的特化解法

二叉搜索树可以利用其有序性简化 LCA 查找：
- 如果 p 和 q 的值都小于当前节点，LCA 在左子树
- 如果 p 和 q 的值都大于当前节点，LCA 在右子树
- 否则当前节点就是 LCA（p 和 q 分别在两个子树或当前节点就是其中之一）

## 关键技巧

1. **后序遍历自然匹配**：后序遍历先处理左右子树再处理根，恰好适合"先找孩子再确定 LCA"的需求
2. **基础情况处理**：当前节点为空或为 p/q 时直接返回
3. **BST 优化**：利用有序性可以 O(h) 时间找到 LCA，无需递归全部节点
4. **N 叉树适配**：原理相同，递归遍历所有子节点，统计匹配数

## 经典题目

### LeetCode 236. 二叉树的最近公共祖先

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[236]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/" target="_blank">二叉树的最近公共祖先</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在二叉树中找到两个节点的最近公共祖先。</p>
  <p><strong>核心思路</strong>：递归后序遍历：如果当前节点是 p 或 q 则返回自身；在左右子树中递归查找；如果左右子树都找到了，当前节点即为 LCA；否则返回非空的那一侧。</p>
  <div class="problem-tags">
    <span class="tag">后序遍历</span>
    <span class="tag">递归</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root

    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)

    if left and right:
        return root
    return left or right
```

> 时间复杂度：O(n) | 空间复杂度：O(h)，h 为树高

### LeetCode 235. 二叉搜索树的最近公共祖先

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[235]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/" target="_blank">二叉搜索树的最近公共祖先</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>在 BST 中找到两个节点的最近公共祖先。</p>
  <p><strong>核心思路</strong>：利用 BST 性质——如果 p 和 q 都小于当前节点，向左走；都大于当前节点，向右走；否则当前节点就是 LCA。迭代实现即可。</p>
  <div class="problem-tags">
    <span class="tag">BST</span>
    <span class="tag">迭代</span>
  </div>
</div>

```python
def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root
    return None
```

> 时间复杂度：O(h)，h 为树高 | 空间复杂度：O(1)

### LeetCode 1676. 二叉树的最近公共祖先 IV（N 叉树 LCA）

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1676]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree-iv/" target="_blank">二叉树的最近公共祖先 IV</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出一组节点的最近公共祖先。</p>
  <p><strong>核心思路</strong>：将节点集合转为 set，在 236 题的基础上扩展——后序遍历统计当前子树中匹配节点的数量，找到第一个匹配数等于集合大小的节点即为 LCA。</p>
  <div class="problem-tags">
    <span class="tag">后序遍历</span>
    <span class="tag">N 节点</span>
  </div>
</div>

### LeetCode 1123. 最深叶节点的最近公共祖先

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1123]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/lowest-common-ancestor-of-deepest-leaves/" target="_blank">最深叶节点的最近公共祖先</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出所有最深叶节点的最近公共祖先。</p>
  <p><strong>核心思路</strong>：后序遍历时返回子树深度和 LCA。如果左右子树深度相同，当前节点是 LCA；否则取深度更大的那侧的结果。</p>
  <div class="problem-tags">
    <span class="tag">后序遍历</span>
    <span class="tag">深度</span>
  </div>
</div>

## 复杂度分析

| 题目 | 方法 | 时间复杂度 | 空间复杂度 |
|------|------|-----------|-----------|
| 236. 二叉树 LCA | 递归后序 | O(n) | O(h) |
| 235. BST LCA | 迭代 | O(h) | O(1) |
| 1676. N 节点 LCA | 递归后序 | O(n) | O(h) |
| 1123. 最深叶 LCA | 递归后序 | O(n) | O(h) |

## 相关主题

- [树 - BST](/topics/tree/bst) — BST 的 LCA 可利用二分性质高效查找
- [树 - 树形DP](/topics/tree/tree-dp) — LCA 与树形 DP 都基于后序遍历进行信息传递
