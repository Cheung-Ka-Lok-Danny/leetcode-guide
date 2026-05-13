# 图

图是由顶点和边组成的数据结构，用于表示多对多的复杂关系。图论算法是算法竞赛和面试中的高阶内容。

## 核心概念

- **有向图 vs 无向图**：边是否有方向
- **有权图 vs 无权图**：边是否有权重
- **连通性**：连通分量、强连通分量
- **图的表示**：邻接矩阵、邻接表
- **图的遍历**：DFS（深度优先）、BFS（广度优先）

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/graph/dfs-bfs">DFS与BFS</a>
  <a href="/topics/graph/topological-sort">拓扑排序</a>
  <a href="/topics/graph/shortest-path">最短路径</a>
  <a href="/topics/graph/mst">最小生成树</a>
  <a href="/topics/graph/bipartite">二分图</a>
</div>

## 复杂度总览

| 算法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| DFS/BFS | O(V + E) | O(V) |
| 拓扑排序（Kahn） | O(V + E) | O(V) |
| Dijkstra | O((V+E) log V) | O(V) |
| Floyd-Warshall | O(V³) | O(V²) |
| Kruskal (MST) | O(E log E) | O(V) |
| Prim (MST) | O((V+E) log V) | O(V) |
