# 基础并查集

并查集（Union-Find / Disjoint Set Union, DSU）是一种用于处理不相交集合的合并与查询问题的数据结构。

## 核心概念

### 基本操作
- **Find**：查找元素所属集合的代表元（根节点）
- **Union**：合并两个元素所在的集合
- **isConnected**：判断两个元素是否属于同一集合

### 完整 Python 实现

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n  # 按秩合并

    def find(self, x):
        # 路径压缩
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def find_recursive(self, x):
        # 递归写法
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        # 按秩合并：小树接在大树下
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True

    def is_connected(self, x, y):
        return self.find(x) == self.find(y)
```

## 经典题目

### LeetCode 128. 最长连续序列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[128]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-consecutive-sequence/" target="_blank">最长连续序列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出未排序数组中最长的连续元素序列（要求 O(n) 时间）。</p>
  <p><strong>核心思路</strong>：哈希表 + 扩展法。用集合存所有数字，遍历时只从序列的起始元素开始（num-1 不存在于集合时），向 num+1 方向扩展。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">哈希表</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 547. 省份数量

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[547]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-provinces/" target="_blank">省份数量</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>有 n 个城市，isConnected[i][j]=1 表示两城市直接相连，求省份（连通分量）数量。</p>
  <p><strong>核心思路</strong>：遍历矩阵，对相连的 i,j 进行 union。初始集合数 = n，每次成功合并减 1。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">连通分量</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def findCircleNum(isConnected):
    n = len(isConnected)
    uf = UnionFind(n)
    for i in range(n):
        for j in range(i + 1, n):
            if isConnected[i][j]:
                uf.union(i, j)
    return sum(1 for i in range(n) if uf.find(i) == i)
```

> 时间复杂度：O(n² × α(n)) | 空间复杂度：O(n)

### LeetCode 990. 等式方程的可满足性

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[990]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/satisfiability-of-equality-equations/" target="_blank">等式方程的可满足性</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定形如 "a==b" 或 "a!=b" 的等式，判断是否所有等式可以同时成立。</p>
  <p><strong>核心思路</strong>：先处理所有 == 关系，将变量合并到同一集合。再处理 != 关系，检查不等变量是否属于同一集合。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">字符串</span>
  </div>
</div>

### LeetCode 684. 冗余连接

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[684]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/redundant-connection/" target="_blank">冗余连接</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>树中多了一条多余的边，找到该边（按输入顺序最后出现的）。</p>
  <p><strong>核心思路</strong>：遍历每条边，如果两个端点已经连通（属于同一集合），说明该边是多余的，返回之。否则进行合并。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">图</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def findRedundantConnection(edges):
    n = len(edges)
    uf = UnionFind(n + 1)  # 节点从 1 开始
    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]
    return []
```

> 时间复杂度：O(n × α(n)) | 空间复杂度：O(n)

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 最长连续序列 | O(n) | O(n) |
| 省份数量 | O(n² × α(n)) | O(n) |
| 等式方程的可满足性 | O(n × α(26)) | O(26) |
| 冗余连接 | O(n × α(n)) | O(n) |

## 相关主题

- [并查集 - 路径压缩与按秩合并](/topics/union-find/optimization) — 基础并查集可应用优化技术提高效率
- [并查集 - 连通分量](/topics/union-find/connected-components) — 基础并查集是求解连通分量问题的工具
