# DFS 与 BFS

深度优先搜索（DFS）和广度优先搜索（BFS）是图论中最基本的两种遍历算法，几乎所有图论问题都建立在它们之上。

## 核心概念

### 深度优先搜索（DFS）

- **原理**：沿着一条路径走到底，然后回溯
- **实现**：递归或显式栈
- **特点**：适合寻找路径、检测环、连通分量、拓扑排序
- **时间复杂度**：O(V + E)

### 广度优先搜索（BFS）

- **原理**：按层逐级扩展，先访问距离起点最近的节点
- **实现**：队列
- **特点**：适合求最短路径（无权图）、层序遍历
- **时间复杂度**：O(V + E)

### DFS vs BFS 对比

| 特性 | DFS | BFS |
|------|-----|-----|
| 数据结构 | 栈（递归/显式） | 队列 |
| 空间复杂度 | O(h)，h 为路径深度 | O(w)，w 为最大宽度 |
| 最短路径 | 不保证 | 保证（无权图） |
| 连通分量 | ✓ | ✓ |
| 检测环 | ✓ | ✓ |
| 拓扑排序 | ✓（后序法） | ✓（Kahn 算法） |

### 连通分量与染色

遍历过程中给节点染色标记访问状态，可以：
- 统计连通分量数量
- 判断图是否连通
- 检测环
- 二分图判定

## 关键技巧

1. **DFS 递归转迭代**：递归可能栈溢出，用显式栈模拟
2. **访问标记时机**：DFS 在入栈时标记（避免重复入栈），BFS 在入队时标记（避免重复入队）
3. **方向数组**：网格类问题用 `[(0,1),(1,0),(0,-1),(-1,0)]` 表示四个方向
4. **BFS 按层处理**：每次记录队列长度，用 for 循环处理一层（如二叉树层序遍历、多源 BFS）

## 经典题目

### LeetCode 200. 岛屿数量

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[200]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-islands/" target="_blank">岛屿数量</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>计算二维网格中岛屿（相邻的1组成的连通区域）的数量。</p>
  <p><strong>核心思路</strong>：遍历网格，遇到 '1' 时计数并 DFS/BFS 将整个岛屿标记为 '0'（或已访问）。DFS 递归或 BFS 队列均可。</p>
  <div class="problem-tags">
    <span class="tag">DFS</span>
    <span class="tag">BFS</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def numIslands(grid):
    if not grid:
        return 0

    m, n = len(grid), len(grid[0])
    count = 0

    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != '1':
            return
        grid[i][j] = '0'  # 标记已访问
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    return count
```

> 时间复杂度：O(m × n) | 空间复杂度：O(m × n)（最坏递归深度）

### LeetCode 695. 岛屿的最大面积

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[695]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/max-area-of-island/" target="_blank">岛屿的最大面积</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在二维网格中找到面积最大的岛屿（连通 '1' 的个数）。</p>
  <p><strong>核心思路</strong>：与岛屿数量类似，DFS 时返回当前岛屿的面积（递归计算 1 + 四个方向的面积），全局记录最大值。</p>
  <div class="problem-tags">
    <span class="tag">DFS</span>
    <span class="tag">连通分量</span>
  </div>
</div>

```python
def maxAreaOfIsland(grid):
    m, n = len(grid), len(grid[0])

    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != 1:
            return 0
        grid[i][j] = 0
        return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1)

    max_area = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                max_area = max(max_area, dfs(i, j))
    return max_area
```

> 时间复杂度：O(m × n) | 空间复杂度：O(m × n)

### LeetCode 130. 被围绕的区域

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[130]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/surrounded-regions/" target="_blank">被围绕的区域</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将被 'X' 包围的 'O' 全部翻转成 'X'（边界上的 'O' 不翻转）。</p>
  <p><strong>核心思路</strong>：从边界上的 'O' 开始 DFS/BFS，标记所有与边界相连的 'O'。然后将未标记的 'O' 翻转为 'X'，标记的 'O' 恢复原状。</p>
  <div class="problem-tags">
    <span class="tag">DFS</span>
    <span class="tag">边界搜索</span>
  </div>
</div>

### LeetCode 133. 克隆图

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[133]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/clone-graph/" target="_blank">克隆图</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>深拷贝一个无向连通图。</p>
  <p><strong>核心思路</strong>：DFS/BFS 遍历原图，用哈希表记录已克隆的节点（原节点 → 克隆节点）。访问邻居时递归克隆，注意避免重复克隆（检测哈希表）。</p>
  <div class="problem-tags">
    <span class="tag">DFS</span>
    <span class="tag">BFS</span>
    <span class="tag">哈希表</span>
  </div>
</div>

### LeetCode 417. 太平洋大西洋水流

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[417]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/pacific-atlantic-water-flow/" target="_blank">太平洋大西洋水流</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出所有能同时流向太平洋和太西洋的格子。</p>
  <p><strong>核心思路</strong>：从边界反向搜索（从四条边向中间流），分别标记能到达太平洋和太西洋的格子。两个标记集合的交集即为答案。</p>
  <div class="problem-tags">
    <span class="tag">DFS</span>
    <span class="tag">BFS</span>
    <span class="tag">反向搜索</span>
  </div>
</div>

### LeetCode 994. 腐烂的橘子

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[994]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/rotting-oranges/" target="_blank">腐烂的橘子</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>网格中每分钟腐烂橘子会污染相邻新鲜橘子，求全部腐烂的最短时间。</p>
  <p><strong>核心思路</strong>：多源 BFS——将所有初始腐烂橘子入队，按层扩展。层数即为时间。最后检查是否还有新鲜橘子，有则返回 -1。</p>
  <div class="problem-tags">
    <span class="tag">BFS</span>
    <span class="tag">多源搜索</span>
    <span class="tag">高频面试</span>
  </div>
</div>

## 复杂度分析

| 题目 | 算法 | 时间 | 空间 |
|------|------|------|------|
| 200. 岛屿数量 | DFS/BFS | O(m×n) | O(m×n) |
| 695. 岛屿最大面积 | DFS | O(m×n) | O(m×n) |
| 130. 被围绕的区域 | DFS/BFS | O(m×n) | O(m×n) |
| 133. 克隆图 | DFS/BFS | O(V+E) | O(V) |
| 417. 太平洋大西洋 | DFS/BFS | O(m×n) | O(m×n) |
| 994. 腐烂的橘子 | BFS | O(m×n) | O(m×n) |

## 相关主题

- [图 - 拓扑排序](/topics/graph/topological-sort) — BFS/DFS 是拓扑排序的基础算法
- [图 - 二分图](/topics/graph/bipartite) — 染色法基于 BFS/DFS 遍历图
