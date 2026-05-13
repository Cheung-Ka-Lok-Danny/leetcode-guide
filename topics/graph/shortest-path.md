# 最短路径

最短路径问题是图论中的核心问题，不同图结构适用不同的算法。

## 核心概念

### 最短路径算法总览

| 算法 | 适用场景 | 时间复杂度 | 能否处理负权 | 能否检测负环 |
|------|---------|-----------|------------|------------|
| **Dijkstra** | 单源正权图 | O((V+E) log V) | ✗ | ✗ |
| **Bellman-Ford** | 单源任意权 | O(V × E) | ✓ | ✓ |
| **Floyd-Warshall** | 全源任意权 | O(V³) | ✓ | ✓（检测） |

### 算法选择指南

- **单源 + 正权** → Dijkstra（优先队列优化）
- **单源 + 可能有负权** → Bellman-Ford
- **需要所有点对距离** → Floyd-Warshall
- **点数很小（≤ 500）** → Floyd 简单直接
- **需要检测负环** → Bellman-Ford

### Dijkstra 算法原理

**核心思想**：贪心策略，每次从未确定最短距离的节点中选取距离最小的节点，松弛其邻居。

**算法步骤：**
1. 初始化起点距离为 0，其他为无穷大
2. 使用优先队列（小顶堆），按距离排序
3. 每次取出距离最小的节点
4. 对邻接节点进行松弛：如果 `dist[u] + w < dist[v]` 则更新
5. 重复直到队列为空

> 不能处理负权边的原因：已确定距离的节点可能被后续的负权边更新。

## 关键技巧

1. **邻接表构建图**：`graph[u].append((v, w))`
2. **松弛操作**：`dist[v] = min(dist[v], dist[u] + w)`
3. **Dijkstra 优化**：使用优先队列（Python `heapq`），但注意可能重复推送同一个节点
4. **路径还原**：用 `prev` 数组记录每个节点的前驱节点
5. **Bellman-Ford 第 V 次检测**：第 V 次迭代仍有更新说明存在负环

## 经典题目

### LeetCode 743. 网络延迟时间

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[743]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/network-delay-time/" target="_blank">网络延迟时间</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>从起点 k 发送信号，求所有节点都收到信号的最短时间。</p>
  <p><strong>核心思路</strong>：Dijkstra 求 k 到所有节点的最短距离，最远距离即为答案。如果存在不可达节点，返回 -1。</p>
  <div class="problem-tags">
    <span class="tag">Dijkstra</span>
    <span class="tag">最短路径</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
import heapq

def networkDelayTime(times, n, k):
    graph = [[] for _ in range(n + 1)]
    for u, v, w in times:
        graph[u].append((v, w))

    INF = float('inf')
    dist = [INF] * (n + 1)
    dist[k] = 0
    pq = [(0, k)]

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))

    max_dist = max(dist[1:])
    return max_dist if max_dist != INF else -1
```

> 时间复杂度：O((V+E) log V) | 空间复杂度：O(V+E)

### LeetCode 787. K 站中转内最便宜的航班

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[787]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/cheapest-flights-within-k-stops/" target="_blank">K 站中转内最便宜的航班</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>求从 src 到 dst 最多经过 k 次中转的最便宜价格。</p>
  <p><strong>核心思路</strong>：Bellman-Ford 的变体——限制松弛次数（k+1 次）。每次迭代使用上一轮的距离数组更新，避免使用同一轮中已经更新的值（步数限制）。也可以用 Dijkstra + 状态 (node, steps)。</p>
  <div class="problem-tags">
    <span class="tag">Bellman-Ford</span>
    <span class="tag">限制步数</span>
    <span class="tag">DP</span>
  </div>
</div>

```python
def findCheapestPrice(n, flights, src, dst, k):
    INF = float('inf')
    dist = [INF] * n
    dist[src] = 0

    for _ in range(k + 1):
        new_dist = dist[:]
        for u, v, w in flights:
            if dist[u] != INF:
                new_dist[v] = min(new_dist[v], dist[u] + w)
        dist = new_dist

    return dist[dst] if dist[dst] != INF else -1
```

> 时间复杂度：O(k × E) | 空间复杂度：O(n)

### LeetCode 1514. 概率最大路径

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1514]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/path-with-maximum-probability/" target="_blank">概率最大路径</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>求从起点到终点的最大成功概率路径（边权为概率，乘法）。</p>
  <p><strong>核心思路</strong>：Dijkstra 变体——改用最大堆（乘积），路径概率相乘而非相加初始化。-1 而非 ∞，概率越大优先级越高。</p>
  <div class="problem-tags">
    <span class="tag">Dijkstra</span>
    <span class="tag">最大堆</span>
    <span class="tag">概率乘积</span>
  </div>
</div>

### LeetCode 1334. 阈值距离内邻居最少的城市

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1334]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/" target="_blank">阈值距离内邻居最少的城市</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找城市数量少、城市编号大的那个——在阈值距离内可到达的城市数最少。</p>
  <p><strong>核心思路</strong>：对每个城市运行一次 Dijkstra（或 Floyd-Warshall），统计在阈值内可达的城市数量，选择数量最少的（若并列选编号最大的）。因为 n ≤ 100，Floyd 或 n 次 Dijkstra 均可。</p>
  <div class="problem-tags">
    <span class="tag">Dijkstra</span>
    <span class="tag">Floyd</span>
    <span class="tag">全源</span>
  </div>
</div>

## 复杂度分析

| 算法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| Dijkstra（堆优化） | O((V+E) log V) | O(V+E) |
| Dijkstra（朴素） | O(V²) | O(V+E) |
| Bellman-Ford | O(V × E) | O(V) |
| Floyd-Warshall | O(V³) | O(V²) |

## 相关主题

- [图 - 最小生成树](/topics/graph/mst) — 最短路径与最小生成树都是图的经典路径问题
- [图 - 拓扑排序](/topics/graph/topological-sort) — 拓扑排序可处理 DAG 上的最短路径
