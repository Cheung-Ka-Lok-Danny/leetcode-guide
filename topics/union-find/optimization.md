# 路径压缩与按秩合并

并查集有两种关键优化技术：路径压缩和按秩合并，二者结合可将时间复杂度降至反阿克曼函数级别。

## 核心概念

### 路径压缩（Path Compression）

**思想**：在执行 Find 操作时，将路径上的所有节点直接指向根节点，从而压缩树高。

```python
# 递归写法（最简洁）
def find(self, x):
    if self.parent[x] != x:
        self.parent[x] = self.find(self.parent[x])
    return self.parent[x]

# 迭代写法
def find(self, x):
    root = x
    while self.parent[root] != root:
        root = self.parent[root]
    # 压缩路径
    while self.parent[x] != root:
        parent = self.parent[x]
        self.parent[x] = root
        x = parent
    return root
```

### 按秩合并（Union by Rank）

**思想**：将高度（或大小）较小的树接到较大的树上，避免树退化。

```python
def union(self, x, y):
    root_x, root_y = self.find(x), self.find(y)
    if root_x == root_y:
        return False
    # 按秩（树高）合并
    if self.rank[root_x] < self.rank[root_y]:
        self.parent[root_x] = root_y
    elif self.rank[root_x] > self.rank[root_y]:
        self.parent[root_y] = root_x
    else:
        self.parent[root_y] = root_x
        self.rank[root_x] += 1
    return True
```

### 时间复杂度分析

| 操作 | 无优化 | 仅路径压缩 | 仅按秩合并 | 两者结合 |
|------|-------|-----------|-----------|---------|
| Find | O(n) | O(log n)* | O(log n) | O(α(n)) |
| Union | O(n) | O(log n)* | O(log n) | O(α(n)) |

> *：均摊复杂度
> α(n) 是反阿克曼函数，对于所有实际输入 ≤ 4（n ≤ 10¹⁹⁸⁶），可视为常数

### 代码对比：优化前后

```python
# ===== 基础版本（无优化） =====
class UnionFindNaive:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        while self.parent[x] != x:
            x = self.parent[x]
        return x

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.parent[root_x] = root_y
            return True
        return False

# ===== 优化版本 =====
class UnionFindOptimized:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n

    def find(self, x):
        # 路径压缩
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x, root_y = self.find(x), self.find(y)
        if root_x == root_y:
            return False
        # 按秩合并
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True
```

### 应用建议

- **路径压缩**：几乎所有场景都建议使用，实现简单且效果显著
- **按秩合并**：在路径压缩下收益相对较小，但仍是好习惯
- 两者结合可以达到最优的理论复杂度 O(m × α(n))

## 相关主题

- [并查集 - 基础并查集](/topics/union-find/basic) — 优化技术应用于基础并查集的实现
- [并查集 - 连通分量](/topics/union-find/connected-components) — 优化后的并查集可高效处理连通分量问题
