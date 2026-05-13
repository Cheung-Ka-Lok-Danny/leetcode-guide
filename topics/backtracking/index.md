# 回溯算法

回溯算法（Backtracking）是一种通过穷举搜索所有可能解来解决问题的算法。本质上是带有"剪枝"的深度优先搜索。

## 核心概念

- **决策树**：每个选择分支构成一棵树
- **路径**：已经做出的选择
- **选择列表**：当前可以做的选择
- **结束条件**：到达决策树底部
- **剪枝**：提前终止不满足条件的分支

## 回溯模板

```python
def backtrack(路径, 选择列表):
    if 满足结束条件:
        记录结果
        return

    for 选择 in 选择列表:
        # 剪枝
        if 不满足约束条件:
            continue
        # 做选择
        路径.add(选择)
        # 进入下一层
        backtrack(路径, 选择列表)
        # 撤销选择
        路径.remove(选择)
```

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/backtracking/permutations-combinations">排列组合</a>
  <a href="/topics/backtracking/subsets">子集问题</a>
  <a href="/topics/backtracking/n-queens">N皇后</a>
  <a href="/topics/backtracking/sudoku-solver">数独求解</a>
  <a href="/topics/backtracking/pruning">剪枝优化</a>
</div>

## 复杂度分析

| 问题 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 全排列 | O(n×n!) | O(n) |
| 子集 | O(n×2ⁿ) | O(n) |
| 组合 | O(C(n,k)) | O(k) |
| N皇后 | O(n!) | O(n²) |
| 数独 | O(9^(m)) — m为空位数 | O(m) |
