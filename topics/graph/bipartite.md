# 二分图

二分图（Bipartite Graph）是指可以将所有顶点分为两个互不相交的集合，使得所有边的两个端点分别属于不同集合的图。

## 核心概念

### 二分图的性质

- **不含奇环**：二分图的充要条件是图中不含奇数长度的环
- **2-可着色**：可以用两种颜色对顶点进行染色，使得相邻顶点颜色不同
- **交替路径**：在匹配问题中，匹配边和非匹配边交替出现的路径

### 染色法判定

使用 DFS 或 BFS 遍历图，从任一顶点开始染色为 0，其邻接顶点染色为 1，再遍历邻接顶点的邻接顶点染色为 0……如果发现相邻顶点的颜色相同，则不是二分图。

### 二分图的应用

| 应用 | 说明 |
|------|------|
| **匹配问题** | 最大匹配、完美匹配 |
| **任务分配** | 工人和任务的配对 |
| **情侣配对** | 减少冲突的分配方案 |
| **调度问题** | 避免冲突的资源分配 |
| **染色分组** | 将冲突元素分到不同组 |

## 关键技巧

1. **邻接表构建**：先构建图再染色
2. **染色数组**：用 -1 表示未染色，0 和 1 表示两种颜色
3. **不连通图处理**：图可能不连通，需要对每个未染色顶点尝试 BFS/DFS
4. **DFS 染色模板**：递归染色邻居，遇到已染色则检查是否冲突

## 经典题目

### LeetCode 785. 判断二分图

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[785]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/is-graph-bipartite/" target="_blank">判断二分图</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断给定的无向图是否是二分图。</p>
  <p><strong>核心思路</strong>：染色法。用 DFS 对每个未染色节点进行染色，相邻节点染不同颜色。如果出现冲突（相邻节点颜色相同），则不是二分图。注意图可能不连通。</p>
  <div class="problem-tags">
    <span class="tag">二分图</span>
    <span class="tag">DFS染色</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def isBipartite(graph):
    n = len(graph)
    color = [-1] * n  # -1: 未染色, 0/1: 两种颜色

    def dfs(node, c):
        color[node] = c
        for neighbor in graph[node]:
            if color[neighbor] == -1:
                if not dfs(neighbor, 1 - c):
                    return False
            elif color[neighbor] == c:
                return False
        return True

    for i in range(n):
        if color[i] == -1:
            if not dfs(i, 0):
                return False
    return True
```

> 时间复杂度：O(V + E) | 空间复杂度：O(V)

### LeetCode 886. 可能的二分法

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[886]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/possible-bipartition/" target="_blank">可能的二分法</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将 n 个人分成两组，给定某些人之间不能同组，判断是否可能分组。</p>
  <p><strong>核心思路</strong>：与 785 题本质相同——将"讨厌关系"（dislikes）看作边，构建图后进行二分图判定。能成功染色则返回 True。</p>
  <div class="problem-tags">
    <span class="tag">二分图</span>
    <span class="tag">DFS染色</span>
    <span class="tag">建图</span>
  </div>
</div>

```python
def possibleBipartition(n, dislikes):
    graph = [[] for _ in range(n + 1)]
    for a, b in dislikes:
        graph[a].append(b)
        graph[b].append(a)

    color = [-1] * (n + 1)

    def dfs(node, c):
        color[node] = c
        for neighbor in graph[node]:
            if color[neighbor] == -1:
                if not dfs(neighbor, 1 - c):
                    return False
            elif color[neighbor] == c:
                return False
        return True

    for i in range(1, n + 1):
        if color[i] == -1:
            if not dfs(i, 0):
                return False
    return True
```

> 时间复杂度：O(V + E) | 空间复杂度：O(V + E)

## 复杂度分析

| 操作 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 染色法判定（DFS） | O(V + E) | O(V) |
| 染色法判定（BFS） | O(V + E) | O(V) |
| 建图 | O(E) | O(V + E) |

## 相关主题

- [图 - DFS与BFS](/topics/graph/dfs-bfs) — 二分图染色法依赖 BFS/DFS 进行图遍历
