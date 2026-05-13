# 二叉树构建

从遍历序列重建二叉树是考察对树遍历理解深度的经典题型，核心是利用不同遍历顺序的特性来递归构建。

## 核心概念

### 遍历序列的性质

| 遍历方式 | 第一个元素 | 最后一个元素 | 用途 |
|---------|-----------|-----------|------|
| **前序** | 根节点 | 最右节点 | 确定根 |
| **中序** | 最左节点 | 最右节点 | 划分左右子树 |
| **后序** | 最左节点 | 根节点 | 确定根 |

### 从两种遍历序列构建二叉树

| 构建方式 | 原理 | 关键步骤 |
|---------|------|---------|
| **前序 + 中序** | 前序确定根，中序划分左右子树 | 前序第一个元素是根，在中序中找到根的位置，左半为左子树，右半为右子树 |
| **中序 + 后序** | 后序确定根，中序划分左右子树 | 后序最后一个元素是根，在中序中找到根的位置划分左右子树 |
| **前序 + 后序** | 不能唯一确定二叉树 | 无法区分左右孩子 |

### 序列化与反序列化

- **序列化**：将树转化为字符串表示
- **反序列化**：从字符串重建树
- 常见格式：层序遍历（含空节点标记）、前序遍历（含空节点标记）

## 关键技巧

1. **递归构建**：使用哈希表缓存中序数组的索引，避免每次递归查找
2. **子数组范围**：明确传递子树在数组中的起始和结束位置（左闭右开或左闭右闭）
3. **空节点标记**：序列化时用特殊标记（如 `#` 或 `null`）表示空节点
4. **前/后序 + 中序**：方法对称，理解一个即可举一反三

## 经典题目

### LeetCode 105. 从前序与中序遍历序列构造二叉树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[105]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" target="_blank">从前序与中序遍历序列构造二叉树</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>根据前序遍历和中序遍历结果重建二叉树。</p>
  <p><strong>核心思路</strong>：前序第一个元素为根节点，在中序中找到根节点位置，将中序数组分为左右子树两部分。递归构建左右子树。用哈希表缓存中序索引，每次 O(1) 查找。</p>
  <div class="problem-tags">
    <span class="tag">递归</span>
    <span class="tag">二叉树构建</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def buildTree(preorder, inorder):
    idx_map = {val: i for i, val in enumerate(inorder)}

    def build(pre_start, pre_end, in_start, in_end):
        if pre_start > pre_end:
            return None
        root_val = preorder[pre_start]
        root = TreeNode(root_val)
        in_idx = idx_map[root_val]
        left_size = in_idx - in_start

        root.left = build(pre_start + 1, pre_start + left_size,
                          in_start, in_idx - 1)
        root.right = build(pre_start + left_size + 1, pre_end,
                           in_idx + 1, in_end)
        return root

    return build(0, len(preorder) - 1, 0, len(inorder) - 1)
```

> 时间复杂度：O(n) | 空间复杂度：O(n)

### LeetCode 106. 从中序与后序遍历序列构造二叉树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[106]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/" target="_blank">从中序与后序遍历序列构造二叉树</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>根据中序遍历和后序遍历结果重建二叉树。</p>
  <p><strong>核心思路</strong>：与 105 题对称——后序最后一个元素为根，在中序中找到根位置划分左右子树。递归构建时注意左右子树在数组中的起止范围。</p>
  <div class="problem-tags">
    <span class="tag">递归</span>
    <span class="tag">二叉树构建</span>
  </div>
</div>

### LeetCode 108. 将有序数组转换为二叉搜索树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[108]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/" target="_blank">将有序数组转换为二叉搜索树</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>将一个升序数组转换为一棵高度平衡的二叉搜索树。</p>
  <p><strong>核心思路</strong>：取数组中间元素作为根节点，左半部分构建左子树，右半部分构建右子树。递归进行即可。每次都取中间元素可以保证平衡。</p>
  <div class="problem-tags">
    <span class="tag">BST</span>
    <span class="tag">递归</span>
    <span class="tag">分治</span>
  </div>
</div>

```python
def sortedArrayToBST(nums):
    if not nums:
        return None
    mid = len(nums) // 2
    root = TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums[:mid])
    root.right = sortedArrayToBST(nums[mid + 1:])
    return root
```

> 时间复杂度：O(n) | 空间复杂度：O(log n)

### LeetCode 654. 最大二叉树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[654]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/maximum-binary-tree/" target="_blank">最大二叉树</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>用数组构造最大二叉树——最大值作为根，左边构建左子树，右边构建右子树。</p>
  <p><strong>核心思路</strong>：找到数组中的最大值作为根节点，递归处理左右两部分。与 105 题思路类似，区别在于根节点的确定方式。</p>
  <div class="problem-tags">
    <span class="tag">递归</span>
    <span class="tag">分治</span>
  </div>
</div>

### LeetCode 297. 二叉树的序列化与反序列化

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[297]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/" target="_blank">二叉树的序列化与反序列化</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>设计算法实现二叉树的序列化和反序列化。</p>
  <p><strong>核心思路</strong>：使用前序遍历或层序遍历，用特殊标记表示空节点。序列化时前序递归拼接字符串；反序列化时用队列消费节点值，前序递归构建。</p>
  <div class="problem-tags">
    <span class="tag">序列化</span>
    <span class="tag">BFS/DFS</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 105. 前序+中序构建 | O(n) | O(n) |
| 106. 中序+后序构建 | O(n) | O(n) |
| 108. 有序数组转BST | O(n) | O(log n) |
| 654. 最大二叉树 | O(n²) / O(n) (单调栈) | O(n) |
| 297. 序列化与反序列化 | O(n) | O(n) |

## 相关主题

- [树 - 遍历方式](/topics/tree/traversal) — 二叉树构建依赖前序/中序/后序遍历结果
- [树 - BST](/topics/tree/bst) — 有序数组构建 BST 是 BST 相关题型的重要基础
