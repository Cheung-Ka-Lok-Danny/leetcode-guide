# 并查集

并查集（Union-Find / Disjoint Set Union）是一种用于处理不相交集合的合并与查询问题的数据结构。

## 核心概念

- **Find**：查找元素所属的集合（根节点）
- **Union**：合并两个集合
- **路径压缩**：将查找路径上的所有节点直接指向根节点
- **按秩合并**：将较小的树合并到较大的树上
- **应用场景**：连通分量、冗余连接、账户合并

## 基础实现

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n

    def find(self, x):
        # 路径压缩
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        # 按秩合并
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True
```

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/union-find/basic">基础并查集</a>
  <a href="/topics/union-find/optimization">路径压缩与按秩合并</a>
  <a href="/topics/union-find/connected-components">连通分量</a>
  <a href="/topics/union-find/dynamic-connectivity">动态连通性</a>
</div>

## 复杂度分析

| 优化 | Find | Union | 空间 |
|------|------|-------|------|
| 基础 | O(n) | O(n) | O(n) |
| 路径压缩 | O(α(n))* | O(α(n)) | O(n) |
| 按秩合并 | O(log n) | O(log n) | O(n) |
| 两者结合 | O(α(n)) | O(α(n)) | O(n) |

> *α(n) 是阿克曼函数的反函数，在实际数据规模下 ≤ 5，可视为常数时间。
