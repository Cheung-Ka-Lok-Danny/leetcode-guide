# 数独求解

数独（Sudoku）是经典的约束满足问题（CSP），在回溯算法中用于练习多维度约束条件的处理。

## 核心概念

### 数独规则
- 9×9 棋盘，每行、每列、每个 3×3 九宫格内数字 1-9 各出现一次
- 用 '.' 表示空格，需要填入数字

### 约束条件
- **行约束**：第 i 行，数字 d 是否已使用
- **列约束**：第 j 列，数字 d 是否已使用
- **九宫格约束**：处于 `(i//3, j//3)` 的九宫格，数字 d 是否已使用

```python
# 九宫格索引
box_idx = (i // 3) * 3 + j // 3
```

### 解题策略
- 每次选择一个空格，尝试填入 1-9 中满足所有约束的数字
- 递归求解，如果无解则回溯
- 优化：优先选择候选数字最少的空格（MRV 启发式）

## 经典题目

### LeetCode 36. 有效的数独

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[36]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/valid-sudoku/" target="_blank">有效的数独</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断一个部分填充的 9×9 数独是否有效（不需要可解）。</p>
  <p><strong>核心思路</strong>：遍历一次，用三个二维布尔数组记录每行/每列/每宫的数字是否出现。若已出现则无效。</p>
  <div class="problem-tags">
    <span class="tag">数组</span>
    <span class="tag">模拟</span>
  </div>
</div>

### LeetCode 37. 解数独

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[37]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sudoku-solver/" target="_blank">解数独</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>编写程序解一个有效的数独。</p>
  <p><strong>核心思路</strong>：回溯填数。用三个数组记录行/列/宫的已用数字，找到空格后尝试填入合法数字，递归求解。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">约束满足</span>
    <span class="tag">经典题</span>
  </div>
</div>

```python
def solveSudoku(board):
    # 记录行、列、九宫格的数字使用情况
    rows = [[False] * 9 for _ in range(9)]
    cols = [[False] * 9 for _ in range(9)]
    boxes = [[False] * 9 for _ in range(9)]

    # 初始化已有数字
    for i in range(9):
        for j in range(9):
            if board[i][j] != '.':
                d = int(board[i][j]) - 1
                rows[i][d] = cols[j][d] = boxes[i//3*3+j//3][d] = True

    def backtrack(i, j):
        if i == 9:
            return True
        if j == 9:
            return backtrack(i + 1, 0)
        if board[i][j] != '.':
            return backtrack(i, j + 1)

        box_idx = i // 3 * 3 + j // 3
        for d in range(9):
            if not rows[i][d] and not cols[j][d] and not boxes[box_idx][d]:
                board[i][j] = str(d + 1)
                rows[i][d] = cols[j][d] = boxes[box_idx][d] = True
                if backtrack(i, j + 1):
                    return True
                board[i][j] = '.'
                rows[i][d] = cols[j][d] = boxes[box_idx][d] = False
        return False

    backtrack(0, 0)
```

> 时间复杂度：O(9ⁿ) 最坏（n 为空位数），实际远小于此 | 空间复杂度：O(1)

### LeetCode 980. 不同路径 III

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[980]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/unique-paths-iii/" target="_blank">不同路径 III</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在网格中，从起点走到终点，经过所有空格一次且仅一次，求方案数。</p>
  <p><strong>核心思路</strong>：回溯遍历所有可达路径。统计空格总数，当步数 = 空格数 + 1 且到达终点时计数。用 visited 数组或原地修改避免重复访问。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">DFS</span>
    <span class="tag">哈密尔顿路径</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 有效的数独 | O(9²) | O(9²) |
| 解数独 | O(9ⁿ) | O(9²) |
| 不同路径 III | O(4ⁿ) | O(n²) |

## 相关主题

- [回溯 - N皇后](/topics/backtracking/n-queens) — 数独求解与N皇后都是棋盘约束满足问题
- [回溯 - 剪枝优化](/topics/backtracking/pruning) — 剪枝对提高数独求解效率非常重要
