# 遍历方式

树的遍历是所有树相关问题的基础，分为深度优先遍历（DFS）和广度优先遍历（BFS）两大类。

## 核心概念

### 深度优先遍历（DFS）

| 遍历方式 | 顺序 | 用途 |
|---------|------|------|
| **前序** | 根 → 左 → 右 | 复制树、序列化 |
| **中序** | 左 → 根 → 右 | BST升序输出 |
| **后序** | 左 → 右 → 根 | 删除树、树形DP |

### 广度优先遍历（BFS）
- **层序遍历**：按层从上到下输出
- 使用队列实现
- 常用于求最短路径、最值问题

### 递归 vs 迭代

| 方式 | 优点 | 缺点 |
|------|------|------|
| 递归 | 代码简洁，符合思维 | 栈空间可能溢出 |
| 迭代 | 空间效率高 | 代码较复杂 |

## 经典题目

### LeetCode 144/94/145. 遍历系列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[94]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-tree-inorder-traversal/" target="_blank">二叉树的中序遍历</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>二叉树的中序遍历。</p>
  <p><strong>核心思路</strong>：递归实现极简。迭代法使用栈模拟递归过程。</p>
  <div class="problem-tags">
    <span class="tag">DFS</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
# 递归
def inorderTraversal(root):
    if not root:
        return []
    return inorderTraversal(root.left) + [root.val] + inorderTraversal(root.right)

# 迭代（手动模拟栈）
def inorderTraversal_iter(root):
    result, stack = [], []
    cur = root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        result.append(cur.val)
        cur = cur.right
    return result
```

### LeetCode 102. 二叉树的层序遍历

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[102]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-tree-level-order-traversal/" target="_blank">二叉树的层序遍历</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回二叉树层序遍历的结果（逐层输出）。</p>
  <p><strong>核心思路</strong>：使用队列，每次处理一整层的节点。</p>
  <div class="problem-tags">
    <span class="tag">BFS</span>
    <span class="tag">队列</span>
  </div>
</div>

```python
def levelOrder(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.pop(0)
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
```

### LeetCode 103. 二叉树的锯齿形层序遍历

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[103]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/" target="_blank">二叉树的锯齿形层序遍历</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>按之字形顺序遍历：第一行从左到右，第二行从右到左……</p>
  <p><strong>核心思路</strong>：在层序遍历的基础上增加方向标志，偶数层反转结果。</p>
  <div class="problem-tags">
    <span class="tag">BFS</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 199. 二叉树的右视图

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[199]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/binary-tree-right-side-view/" target="_blank">二叉树的右视图</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>从二叉树右侧看到的节点值。</p>
  <p><strong>核心思路</strong>：层序遍历，取每层最后一个节点。或 DFS 优先访问右子树。</p>
  <div class="problem-tags">
    <span class="tag">BFS</span>
    <span class="tag">DFS</span>
  </div>
</div>

## 遍历模板速查

| 遍历方式 | 代码特点 |
|---------|---------|
| 前序递归 | `root.val + left + right` |
| 中序递归 | `left + root.val + right` |
| 后序递归 | `left + right + root.val` |
| 前序迭代 | 栈，先右后左入栈 |
| 中序迭代 | 栈，一直向左压入 |
| 后序迭代 | 栈，额外标记已访问 |
| 层序迭代 | 队列，按层处理 |

## 相关主题

- [树 - BST](/topics/tree/bst) — 遍历方式是 BST 各种操作的基础
- [树 - 二叉树构建](/topics/tree/construction) — 利用遍历结果重建二叉树
