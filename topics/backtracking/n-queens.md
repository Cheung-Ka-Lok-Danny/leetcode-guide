# N皇后

N皇后问题是回溯算法的经典代表，也是理解"约束满足问题"的最佳入门题。

## 核心概念

### 问题描述
在 N×N 的棋盘上放置 N 个皇后，使得任意两个皇后都不在同一行、同一列、同一对角线上。

### 解题思路
- **逐行放置**：每行只能放一个皇后，按行遍历天然保证行不冲突
- **列冲突**：用数组 `cols[c]` 标记第 c 列是否已放皇后
- **对角线冲突**：
  - 主对角线（左上-右下）：`row - col` 为定值，范围 `[-(N-1), N-1]`
  - 副对角线（右上-左下）：`row + col` 为定值，范围 `[0, 2N-2]`
- **回溯搜索**：每行尝试所有可能的列，找到合法位置后递归下一行

```python
# 冲突检测
def is_valid(row, col, cols, diag1, diag2):
    return not (cols[col] or diag1[row - col] or diag2[row + col])
```

## 经典题目

### LeetCode 51. N皇后

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[51]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/n-queens/" target="_blank">N皇后</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>返回 N 皇后问题的所有解（棋盘状态）。</p>
  <p><strong>核心思路</strong>：回溯逐行放置。用三个数组 cols/diag1/diag2 实现 O(1) 冲突检测。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">经典题</span>
    <span class="tag">必做题</span>
  </div>
</div>

```python
def solveNQueens(n):
    cols = [False] * n
    diag1 = [False] * (2 * n - 1)  # row - col
    diag2 = [False] * (2 * n - 1)  # row + col
    board = [["."] * n for _ in range(n)]
    res = []

    def backtrack(row):
        if row == n:
            res.append(["".join(r) for r in board])
            return
        for col in range(n):
            d1 = row - col + n - 1  # 映射到 [0, 2n-2]
            d2 = row + col
            if not cols[col] and not diag1[d1] and not diag2[d2]:
                cols[col] = diag1[d1] = diag2[d2] = True
                board[row][col] = "Q"
                backtrack(row + 1)
                board[row][col] = "."
                cols[col] = diag1[d1] = diag2[d2] = False

    backtrack(0)
    return res
```

> 时间复杂度：O(N!)（每行可放置的位置随 N 增大而减少） | 空间复杂度：O(N²)

### LeetCode 52. N皇后 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[52]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/n-queens-ii/" target="_blank">N皇后 II</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>只返回 N 皇后问题的解的数量（不返回具体棋盘）。</p>
  <p><strong>核心思路</strong>：与 51 题相同逻辑，但不需要记录棋盘状态，只需用计数器累加。可用位运算优化加速。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">计数</span>
  </div>
</div>

### 位运算优化版本

对于 N 皇后，可以用整数的二进制位来表示列和对角线的占用状态，大幅提升效率：

```python
def totalNQueens(n):
    def backtrack(row, cols, diag1, diag2):
        if row == n:
            return 1
        # 可放置的位置（0 表示可放）
        available = (~(cols | diag1 | diag2)) & ((1 << n) - 1)
        count = 0
        while available:
            pos = available & -available  # 取最低位的 1
            available &= available - 1    # 清除最低位的 1
            count += backtrack(row + 1,
                cols | pos,
                (diag1 | pos) << 1,
                (diag2 | pos) >> 1)
        return count

    return backtrack(0, 0, 0, 0)
```

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| N皇后 | O(N!) | O(N²) |
| N皇后 II | O(N!) | O(N) |

## 相关主题

- [回溯 - 数独求解](/topics/backtracking/sudoku-solver) — N皇后与数独都是回溯的棋盘放置类问题
- [回溯 - 剪枝优化](/topics/backtracking/pruning) — 剪枝对 N 皇后的搜索效率提升至关重要
