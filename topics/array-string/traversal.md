# 遍历技巧：数组遍历、矩阵遍历、螺旋遍历

## 概念讲解

数组遍历是算法基础中的基础，但高效的遍历策略往往能决定算法的时间复杂度。

### 核心思想

- **正向遍历**：从左到右依次访问每个元素，适用于累积计算、查找等场景
- **反向遍历**：从右到左访问元素，常用于需要知道"未来"信息的场景
- **双指针遍历**：一头一尾或一快一慢，处理有序数组或回文检测
- **矩阵遍历**：按行/按列遍历二维数组，或按对角线、螺旋等特殊顺序
- **螺旋遍历**：按"右→下→左→上"的螺旋顺序遍历矩阵，关键在于边界收缩

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 方向数组 | 矩阵遍历中表示上下左右移动，`directions = [(0,1),(1,0),(0,-1),(-1,0)]` |
| 边界收缩 | 螺旋遍历时不断缩小上下左右边界 |
| 访问标记 | 用 visited 数组或原地标记防止重复访问 |
| 索引技巧 | `(i+j)` 的奇偶性判断对角线方向 |

## 经典题目

### 54. 螺旋矩阵

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">54</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/spiral-matrix/" target="_blank">螺旋矩阵</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>按螺旋顺序遍历矩阵。核心是维护四个边界（top, bottom, left, right），每次遍历完一行/列后收缩对应边界。注意处理单行/单列的边界情况。</p>
  <div class="problem-tags">
    <span class="tag">矩阵</span>
    <span class="tag">模拟</span>
    <span class="tag">边界收缩</span>
  </div>
</div>

```python
def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # 从左到右遍历上边
        for j in range(left, right + 1):
            res.append(matrix[top][j])
        top += 1
        
        # 从上到下遍历右边
        for i in range(top, bottom + 1):
            res.append(matrix[i][right])
        right -= 1
        
        if top <= bottom:
            # 从右到左遍历下边
            for j in range(right, left - 1, -1):
                res.append(matrix[bottom][j])
            bottom -= 1
        
        if left <= right:
            # 从下到上遍历左边
            for i in range(bottom, top - 1, -1):
                res.append(matrix[i][left])
            left += 1
    
    return res
```

### 48. 旋转图像

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">48</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/rotate-image/" target="_blank">旋转图像</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将 n×n 矩阵顺时针旋转90度。原地旋转：先按主对角线翻转（转置），再左右翻转每行。或者按四元素循环交换。</p>
  <div class="problem-tags">
    <span class="tag">矩阵</span>
    <span class="tag">原地旋转</span>
    <span class="tag">翻转</span>
  </div>
</div>

```python
def rotate(self, matrix: List[List[int]]) -> None:
    n = len(matrix)
    # 先按主对角线翻转（转置）
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # 再左右翻转每行
    for i in range(n):
        matrix[i].reverse()
```

### 73. 矩阵置零

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">73</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/set-matrix-zeroes/" target="_blank">矩阵置零</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>若矩阵中某元素为0，则将其所在行和列全部置0。O(1)空间解法：用第一行和第一列作为标记数组，额外用两个变量记录第一行/列本身是否有0。</p>
  <div class="problem-tags">
    <span class="tag">矩阵</span>
    <span class="tag">原地算法</span>
    <span class="tag">标记</span>
  </div>
</div>

```python
def setZeroes(self, matrix: List[List[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))
    
    # 用第一行和第一列标记需要置零的行和列
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # 根据标记置零
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0
```

### 118. 杨辉三角

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">118</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/pascals-triangle/" target="_blank">杨辉三角</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>生成前 numRows 行杨辉三角。每行首尾为1，中间元素为上一行相邻两数之和。逐行构造即可。</p>
  <div class="problem-tags">
    <span class="tag">动态规划</span>
    <span class="tag">模拟</span>
  </div>
</div>

```python
def generate(self, numRows: int) -> List[List[int]]:
    res = []
    for i in range(numRows):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = res[i-1][j-1] + res[i-1][j]
        res.append(row)
    return res
```

### 189. 轮转数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">189</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/rotate-array/" target="_blank">轮转数组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>将数组向右轮转 k 步。经典三步翻转法：先翻转整个数组，再翻转前 k 个元素，最后翻转剩余元素。注意 k 需要对 n 取模。</p>
  <div class="problem-tags">
    <span class="tag">数组</span>
    <span class="tag">翻转</span>
    <span class="tag">原地</span>
  </div>
</div>

```python
def rotate(self, nums: List[int], k: int) -> None:
    n = len(nums)
    k %= n
    
    def reverse(l, r):
        while l < r:
            nums[l], nums[r] = nums[r], nums[l]
            l += 1
            r -= 1
    
    reverse(0, n - 1)
    reverse(0, k - 1)
    reverse(k, n - 1)
```

## 复杂度分析

| 方法 | 时间复杂度 | 空间复杂度 | 说明 |
|------|-----------|-----------|------|
| 基本遍历 | O(n) | O(1) | 一维数组单次遍历 |
| 双重遍历 | O(m×n) | O(1) | 二维矩阵遍历 |
| 螺旋遍历 | O(m×n) | O(1) | 不含返回值空间 |
| 三步翻转 | O(n) | O(1) | 数组轮转的原地解法 |

遍历技巧的核心在于**减少不必要的循环嵌套**和**利用索引特性简化操作**。对于矩阵问题，边界管理和方向控制是两大关键能力。

## 相关主题

- [双指针概述](/topics/two-pointers/) — 双指针遍历与数组遍历的配合使用
- [滑动窗口概述](/topics/sliding-window/) — 利用遍历技巧进行窗口维护
