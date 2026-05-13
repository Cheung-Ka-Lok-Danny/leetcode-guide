# 树与二叉树

树是一种非线性的分层数据结构，二叉树是其中最常见的形式。树的递归特性使其成为面试中考察递归思维的绝佳载体。

## 核心概念

- **二叉树**：每个节点最多有两个子节点
- **二叉搜索树 BST**：左 < 根 < 右
- **完全二叉树**：除最后一层外，每层都满
- **平衡二叉树**：左右子树高度差 ≤ 1
- **树的遍历**：前序、中序、后序、层序

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/tree/traversal">遍历方式</a>
  <a href="/topics/tree/construction">二叉树构建</a>
  <a href="/topics/tree/bst">二叉搜索树</a>
  <a href="/topics/tree/lca">最近公共祖先</a>
  <a href="/topics/tree/tree-dp">树形DP</a>
</div>

## 复杂度总览

| 操作 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 遍历（递归） | O(n) | O(h) — h为树高 |
| 遍历（迭代） | O(n) | O(n) |
| BST 查找 | O(log n) 平均 / O(n) 最坏 | O(1) |
| BST 插入 | O(log n) 平均 / O(n) 最坏 | O(1) |
| 层序遍历 | O(n) | O(n) |
