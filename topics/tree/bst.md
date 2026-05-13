# 二叉搜索树

二叉搜索树（Binary Search Tree, BST）是树的特殊形式，利用有序性可以高效地完成查找、插入和删除操作。

## 核心概念

### BST 性质
- 左子树所有节点的值 < 根节点值
- 右子树所有节点的值 > 根节点值
- 左右子树也是 BST
- **中序遍历 BST 得到升序序列**

### 关键操作

| 操作 | 平均时间 | 最坏时间 | 说明 |
|------|---------|---------|------|
| 查找 | O(log n) | O(n) | 根据值比较决定方向 |
| 插入 | O(log n) | O(n) | 找到空位插入 |
| 删除 | O(log n) | O(n) | 三种情况处理 |
| 验证 | O(n) | O(n) | 传参上下界 |

## 经典题目

### LeetCode 98. 验证二叉搜索树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[98]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/validate-binary-search-tree/" target="_blank">验证二叉搜索树</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断一棵二叉树是否为有效的BST。</p>
  <p><strong>核心思路</strong>：DFS传递上下界（min_val, max_val），左子树不能超过根节点值，右子树不能小于根节点值。注意使用 -∞ 和 +∞ 作为初始边界。</p>
  <div class="problem-tags">
    <span class="tag">BST</span>
    <span class="tag">递归</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def isValidBST(root):
    def validate(node, low, high):
        if not node:
            return True
        if node.val <= low or node.val >= high:
            return False
        return (validate(node.left, low, node.val) and
                validate(node.right, node.val, high))

    return validate(root, float('-inf'), float('inf'))
```

> 时间复杂度：O(n) | 空间复杂度：O(h)，h为树高

### LeetCode 230. 二叉搜索树中第K小的元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[230]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/kth-smallest-element-in-a-bst/" target="_blank">二叉搜索树中第K小的元素</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出BST中第 k 小的元素。</p>
  <p><strong>核心思路</strong>：中序遍历BST得到升序序列，第k个即为答案。迭代中序遍历可在找到第k个后提前终止。</p>
  <div class="problem-tags">
    <span class="tag">BST</span>
    <span class="tag">中序遍历</span>
  </div>
</div>

```python
def kthSmallest(root, k):
    stack = []
    cur = root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        k -= 1
        if k == 0:
            return cur.val
        cur = cur.right
```

> 时间复杂度：O(h+k)，h为树高 | 空间复杂度：O(h)

### LeetCode 450. 删除BST中的节点

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[450]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/delete-node-in-a-bst/" target="_blank">删除二叉搜索树中的节点</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>从BST中删除指定值的节点。</p>
  <p><strong>核心思路</strong>：三种情况处理——叶子节点直接删、只有一个孩子则替换、有两个孩子则用右子树的最小节点（或左子树最大节点）替换。</p>
  <div class="problem-tags">
    <span class="tag">BST</span>
    <span class="tag">删除操作</span>
  </div>
</div>

### LeetCode 538. 把BST转换为累加树

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[538]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/convert-bst-to-greater-tree/" target="_blank">把二叉搜索树转换为累加树</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>BST每个节点的值改为原树中大于等于该节点值的所有节点值之和。</p>
  <p><strong>核心思路</strong>：反向中序遍历（右→根→左），维护一个累加和变量。每个节点 = 当前值 + 累加和。</p>
  <div class="problem-tags">
    <span class="tag">BST</span>
    <span class="tag">反向中序</span>
  </div>
</div>

## BST 关键技巧

1. **中序有序性**：BST的中序遍历结果是有序的
2. **递归传参**：验证时传 (node, low, high)
3. **删除节点**：用右子树最小节点替换删除节点
4. **区间查询**：利用BST的性质缩小搜索范围

## 相关主题

- [树 - 遍历方式](/topics/tree/traversal) — BST 的中序遍历是二叉树遍历的重要应用
- [树 - LCA](/topics/tree/lca) — BST 的最近公共祖先可利用性质简化查找过程
