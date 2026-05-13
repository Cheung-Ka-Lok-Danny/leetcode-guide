# 连通分量

连通分量（Connected Components）是图论中的基础概念，并查集可以高效地处理无向图的连通分量问题。

## 核心概念

### 并查集求连通分量

1. 初始化每个节点自成一个分量
2. 遍历所有边，对端点进行 union 操作
3. 统计根节点数 = 连通分量数

```python
def count_components(n, edges):
    uf = UnionFind(n)
    for u, v in edges:
        uf.union(u, v)
    return sum(1 for i in range(n) if uf.find(i) == i)
```

### 连通分量 vs 连通块

| 概念 | 说明 |
|------|------|
| 连通分量 | 无向图中的极大连通子图 |
| 强连通分量 | 有向图中的概念（需使用 Tarjan/Kosaraju 算法） |
| 连通块 | 通常指网格图中相连的1/陆地区域 |

## 经典题目

### LeetCode 323. 无向图中连通分量数目

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[323]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-connected-components-in-an-undirected-graph/" target="_blank">无向图中连通分量数目</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定 n 个节点和一组边，求连通分量数。</p>
  <p><strong>核心思路</strong>：并查集标准应用。初始分量数 = n，每次成功合并减 1。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">连通分量</span>
  </div>
</div>

### LeetCode 1319. 连通网络的操作次数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1319]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-operations-to-make-network-connected/" target="_blank">连通网络的操作次数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>用网线连接 n 台电脑，求最少操作次数使所有电脑连通（操作 = 将一条缆线从已连通的集群拔出接入另一集群）。</p>
  <p><strong>核心思路</strong>：计算连通分量数 cnt 和多余缆线数 redundant。若 redundant >= cnt-1 则返回 cnt-1，否则返回 -1。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">贪心</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def makeConnected(n, connections):
    if len(connections) < n - 1:
        return -1  # 缆线不足
    uf = UnionFind(n)
    for u, v in connections:
        uf.union(u, v)
    # 连通分量数
    components = sum(1 for i in range(n) if uf.find(i) == i)
    return components - 1
```

> 时间复杂度：O(n + m × α(n)) | 空间复杂度：O(n)

### LeetCode 947. 移除最多的同行或同列石头

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[947]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/most-stones-removed-with-same-row-or-column/" target="_blank">移除最多的同行或同列石头</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在二维平面上有一些石头，如果一块石头与另一块同行或同列，则可以移除前者。求最多可移除石头数。</p>
  <p><strong>核心思路</strong>：同行或同列的石头属于同一连通分量（视为一个"连通组"）。每个连通分量中，最多可以移除 组大小-1 个石头。总移除数 = n - 连通分量数。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">图</span>
  </div>
</div>

### LeetCode 1202. 交换字符串中的元素

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1202]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/smallest-string-with-swaps/" target="_blank">交换字符串中的元素</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给出字符串和可交换的下标对，通过任意次交换得到字典序最小的字符串。</p>
  <p><strong>核心思路</strong>：将可交换的下标 union 到同一集合。每个连通分量内的字符按字典序排列后放回原位。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">排序</span>
  </div>
</div>

### LeetCode 839. 相似字符串组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[839]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/similar-string-groups/" target="_blank">相似字符串组</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>两个字符串通过交换两个字母可以变为对方则称它们相似，求相似字符串组数。</p>
  <p><strong>核心思路</strong>：遍历所有字符串对，判断是否相似（仅有两个位置字符不同），相似则 union。最后统计连通分量数。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">字符串</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 连通分量数目 | O(n + m × α(n)) | O(n) |
| 连通网络的操作次数 | O(n + m × α(n)) | O(n) |
| 同行同列石头 | O(n × α(n)) | O(n) |
| 交换字符串元素 | O(n × α(n) + nlogn) | O(n) |
| 相似字符串组 | O(n² × L) | O(n) |

## 相关主题

- [图 - DFS与BFS](/topics/graph/dfs-bfs) — 连通分量可用 DFS/BFS 或并查集两种方式求解
- [并查集 - 动态连通性](/topics/union-find/dynamic-connectivity) — 连通分量是动态连通性问题的基础
