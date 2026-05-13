# 最小生成树

最小生成树（Minimum Spanning Tree, MST）是在连通无向加权图中找出一棵包含所有顶点的树，使树中所有边的权重之和最小。

## 核心概念

### MST 的性质

- **包含所有顶点**：V 个顶点，V-1 条边
- **无环**：生成的是一棵树
- **边权和最小**：在所有生成树中权值和最小
- **切割性质**：对于任意切割，横跨切割的最小权值边一定在 MST 中
- **回路性质**：对于任意回路，权值最大的边一定不在 MST 中

### Kruskal 算法（基于并查集）

**算法步骤：**
1. 将所有边按权重升序排序
2. 从小到大的顺序尝试加入边
3. 如果边的两端属于不同连通分量（不形成环），则加入
4. 直到加入 V-1 条边

**核心数据结构**：并查集（Union-Find），用于判断两个顶点是否连通。

### Prim 算法（基于优先队列）

**算法步骤：**
1. 任选一个顶点作为起点
2. 将起点连接到所有顶点的边加入优先队列（小顶堆）
3. 每次取权值最小的边
4. 如果边的另一端未被访问过，加入 MST 并扩展
5. 重复直到所有顶点都在 MST 中

### 两种算法对比

| 特性 | Kruskal | Prim |
|------|---------|------|
| 核心思想 | 选边 | 选点 |
| 数据结构 | 并查集 + 排序 | 优先队列 |
| 时间复杂度 | O(E log E) | O((V+E) log V) |
| 适用场景 | 稀疏图（E 较小） | 稠密图（V 较小） |
| 实现难度 | 较容易 | 中等 |

## 关键技巧

1. **并查集模板**：路径压缩 + 按秩合并是 Kruskal 的关键
2. **完全图优化**：对于完全图（所有点之间都有边），计算所有边需要 O(V²)，可以用 Prim
3. **曼哈顿距离**：`|x1-x2| + |y1-y2|` 是二维空间中的常见距离度量
4. **最大生成树**：将边按降序排序或用负数权值即可求最大生成树

## 经典题目

### LeetCode 1584. 连接所有点的最小费用

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1584]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/min-cost-to-connect-all-points/" target="_blank">连接所有点的最小费用</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在平面上的 n 个点，用曼哈顿距离作为边的权重，找最小生成树。</p>
  <p><strong>核心思路</strong>：Kruskal——先计算所有点对间的曼哈顿距离，生成边列表。按距离排序后，用并查集逐步加入边。完全图边数较多（约 n²/2），但 n ≤ 1000，可接受。</p>
  <div class="problem-tags">
    <span class="tag">MST</span>
    <span class="tag">Kruskal</span>
    <span class="tag">并查集</span>
  </div>
</div>

```python
def minCostConnectPoints(points):
    n = len(points)
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
            edges.append((dist, i, j))

    edges.sort()
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        rx, ry = find(x), find(y)
        if rx == ry:
            return False
        if rank[rx] < rank[ry]:
            parent[rx] = ry
        elif rank[rx] > rank[ry]:
            parent[ry] = rx
        else:
            parent[ry] = rx
            rank[rx] += 1
        return True

    cost = 0
    count = 0
    for dist, i, j in edges:
        if union(i, j):
            cost += dist
            count += 1
            if count == n - 1:
                break
    return cost
```

> 时间复杂度：O(n² log n) | 空间复杂度：O(n²)

### LeetCode 1135. 最低成本连通城市

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1135]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/connecting-cities-with-minimum-cost/" target="_blank">最低成本连通城市</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在 n 个城市之间铺设道路，每条道路有成本，求连通所有城市的最小成本。</p>
  <p><strong>核心思路</strong>：标准 MST 问题，Kruskal 算法。边已给出，直接排序后用并查集连接。如果最终连接边数 < n-1，返回 -1（无法连通）。</p>
  <div class="problem-tags">
    <span class="tag">MST</span>
    <span class="tag">Kruskal</span>
    <span class="tag">并查集</span>
  </div>
</div>

## 复杂度分析

| 算法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| Kruskal（稀疏图） | O(E log E) | O(V + E) |
| Kruskal（稠密图） | O(V² log V) | O(V²) |
| Prim（堆优化） | O((V+E) log V) | O(V + E) |
| Prim（朴素） | O(V²) | O(V) |

## 相关主题

- [图 - 最短路径](/topics/graph/shortest-path) — MST 与最短路径在贪心策略上互通
- [并查集 - 基础并查集](/topics/union-find/basic) — Kruskal 算法依赖并查集判断连通性
