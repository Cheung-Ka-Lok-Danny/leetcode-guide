# 前缀和：一维前缀和、二维前缀和

## 概念讲解

前缀和是一种预处理技术，通过预先计算数组每个位置之前的累积和，将区间求和操作的时间复杂度从 O(n) 降到 O(1)。

### 核心思想

- **一维前缀和**：`prefix[i] = sum(nums[0:i])`，区间 `[l, r]` 的和 = `prefix[r+1] - prefix[l]`
- **二维前缀和**：`prefix[i+1][j+1] = matrix[i][j] + prefix[i][j+1] + prefix[i+1][j] - prefix[i][j]`
- 子矩阵 `(r1,c1)` 到 `(r2,c2)` 的和 = `prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]`

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 哈希表+前缀和 | 找和为 k 的子数组数量，用 map 记录前缀和出现次数 |
| 前缀和+差分 | 配合差分数组处理区间更新 |
| 二维前缀和 | 快速计算任意矩形区域的和 |
| 前缀和+取模 | 处理子数组和能被 k 整除的问题 |

## 经典题目

### 303. 区域和检索 - 数组不可变

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">303</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/range-sum-query-immutable/" target="_blank">区域和检索</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>一维前缀和的经典应用。预处理 prefix 数组，prefix[i] 表示 nums[0..i-1] 的和，区间和 = prefix[r+1] - prefix[l]。</p>
  <div class="problem-tags">
    <span class="tag">前缀和</span>
    <span class="tag">设计</span>
  </div>
</div>

```python
class NumArray:
    def __init__(self, nums: List[int]):
        n = len(nums)
        self.prefix = [0] * (n + 1)
        for i in range(n):
            self.prefix[i + 1] = self.prefix[i] + nums[i]
    
    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]
```

### 304. 二维区域和检索 - 矩阵不可变

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">304</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/range-sum-query-2d-immutable/" target="_blank">二维区域和检索</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>二维前缀和。prefix[i+1][j+1] 表示以 (0,0) 为左上角、(i,j) 为右下角的子矩阵和。求子矩阵时使用容斥原理。</p>
  <div class="problem-tags">
    <span class="tag">二维前缀和</span>
    <span class="tag">设计</span>
  </div>
</div>

```python
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        m, n = len(matrix), len(matrix[0])
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m):
            for j in range(n):
                self.prefix[i + 1][j + 1] = (
                    matrix[i][j] 
                    + self.prefix[i][j + 1] 
                    + self.prefix[i + 1][j] 
                    - self.prefix[i][j]
                )
    
    def sumRegion(self, r1: int, c1: int, r2: int, c2: int) -> int:
        return (self.prefix[r2 + 1][c2 + 1] 
                - self.prefix[r1][c2 + 1] 
                - self.prefix[r2 + 1][c1] 
                + self.prefix[r1][c1])
```

### 560. 和为 K 的子数组

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">560</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/subarray-sum-equals-k/" target="_blank">和为 K 的子数组</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>统计和为 k 的子数组个数。用哈希表存前缀和的出现次数，遍历时累加 pre - k 对应的次数。注意初始 prefix[0]=1。</p>
  <div class="problem-tags">
    <span class="tag">前缀和</span>
    <span class="tag">哈希表</span>
  </div>
</div>

```python
def subarraySum(self, nums: List[int], k: int) -> int:
    count = 0
    pre = 0
    hashmap = {0: 1}
    
    for num in nums:
        pre += num
        # 如果 pre - k 存在，说明有子数组和为 k
        if pre - k in hashmap:
            count += hashmap[pre - k]
        hashmap[pre] = hashmap.get(pre, 0) + 1
    
    return count
```

### 724. 寻找数组的中心下标

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">724</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/find-pivot-index/" target="_blank">寻找数组的中心下标</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>找到下标 i 使得左侧元素之和等于右侧元素之和。先求总和，再从左到右遍历，维护左侧和，判断 left_sum == total - left_sum - nums[i]。</p>
  <div class="problem-tags">
    <span class="tag">前缀和</span>
    <span class="tag">数组</span>
  </div>
</div>

```python
def pivotIndex(self, nums: List[int]) -> int:
    total = sum(nums)
    left_sum = 0
    
    for i, num in enumerate(nums):
        if left_sum == total - left_sum - num:
            return i
        left_sum += num
    
    return -1
```

## 复杂度分析

| 方法 | 预处理时间 | 查询时间 | 空间复杂度 | 说明 |
|------|-----------|---------|-----------|------|
| 一维前缀和 | O(n) | O(1) | O(n) | 区间求和 |
| 二维前缀和 | O(m×n) | O(1) | O(m×n) | 子矩阵求和 |
| 哈希+前缀和 | O(n) | O(1) | O(n) | 找特定和子数组 |

前缀和的核心优势在于**空间换时间**——通过 O(n) 的预处理，将频繁的区间求和降至 O(1)。配合哈希表使用时，可以解决"和为 k 的子数组数量"这类经典问题，这是很多中等难度题目的核心考点。

## 相关主题

- [差分数组](/topics/array-string/difference-array) — 前缀和的逆操作，用于快速区间更新
- [哈希表 - 两数之和系列](/topics/hash-table/two-sum-family) — 前缀和与哈希表配合解决子数组和为 K 的问题
