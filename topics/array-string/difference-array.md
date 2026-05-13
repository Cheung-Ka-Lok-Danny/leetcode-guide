# 差分数组：区间批量更新

## 概念讲解

差分数组是与前缀和互逆的预处理技术，专门用于解决**多次对数组某个区间进行统一加减操作**的问题。

### 核心思想

- **差分数组定义**：`diff[i] = nums[i] - nums[i-1]`（当 i>0），`diff[0] = nums[0]`
- **区间更新**：对 `nums[l..r]` 统一加 val，只需 `diff[l] += val, diff[r+1] -= val`
- **还原数组**：对 diff 求前缀和即可得到原数组
- **与原数组关系**：差分是前缀和的逆运算

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 区间更新 | 多次对连续区间进行加减操作 |
| 航班预订统计 | 多个区间叠加，求最终每个位置的值 |
| 拼车问题 | 上下车位置区间处理 |
| 差分+前缀和 | 离线处理批量区间操作后一次性还原 |

## 经典题目

### 370. 区间加法

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">370</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/range-addition/" target="_blank">区间加法</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>对一个长度为 length 的数组执行多次区间加法。差分数组经典应用：update(l, r, val) 转换为 diff[l] += val, diff[r+1] -= val，最后求前缀和还原。</p>
  <div class="problem-tags">
    <span class="tag">差分数组</span>
    <span class="tag">前缀和</span>
  </div>
</div>

```python
def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
    diff = [0] * (length + 1)
    
    for l, r, val in updates:
        diff[l] += val
        diff[r + 1] -= val
    
    # 还原原数组
    res = [0] * length
    cur = 0
    for i in range(length):
        cur += diff[i]
        res[i] = cur
    
    return res
```

### 1109. 航班预订统计

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">1109</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/corporate-flight-bookings/" target="_blank">航班预订统计</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>有 n 个航班，给定多个预订记录 bookings[i] = [first, last, seats]，表示从 first 到 last 航班每班预订 seats 个座位。求每个航班的总预订数。差分数组标准应用。</p>
  <div class="problem-tags">
    <span class="tag">差分数组</span>
    <span class="tag">前缀和</span>
  </div>
</div>

```python
def corpFlightBookings(self, bookings: List[List[int]], n: int) -> List[int]:
    diff = [0] * (n + 2)
    
    for first, last, seats in bookings:
        diff[first] += seats
        diff[last + 1] -= seats
    
    res = [0] * n
    cur = 0
    for i in range(1, n + 1):
        cur += diff[i]
        res[i - 1] = cur
    
    return res
```

### 1094. 拼车

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">1094</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/car-pooling/" target="_blank">拼车</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定 trips[i] = [numPassengers, from, to]，表示在 from 站上车 numPassengers 位乘客，to 站下车。判断车辆能否运送所有乘客（capacity）。差分数组记录每个站的人数变化，求峰值是否超过容量。</p>
  <div class="problem-tags">
    <span class="tag">差分数组</span>
    <span class="tag">模拟</span>
  </div>
</div>

```python
def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
    max_station = 0
    for _, _, to in trips:
        max_station = max(max_station, to)
    
    diff = [0] * (max_station + 2)
    
    for num, from_, to_ in trips:
        diff[from_] += num
        diff[to_] -= num  # 乘客在 to 站下车，所以 to 站不占座位
    
    cur = 0
    for i in range(max_station + 1):
        cur += diff[i]
        if cur > capacity:
            return False
    
    return True
```

## 复杂度分析

| 操作 | 时间复杂度 | 空间复杂度 | 说明 |
|------|-----------|-----------|------|
| 区间更新 | O(1) | O(1) | 每次更新只需修改两个位置 |
| 批量更新 k 次 | O(k) | O(1) | 不含初始化 |
| 还原数组 | O(n) | O(1) | 一次前缀和遍历 |

差分数组的核心优势在于**将区间更新操作从 O(n) 降到 O(1)**。当需要大量区间更新操作时（通常 k >> n），差分数组是最优选择。它和前缀和是一对互逆操作——前缀和用于快速区间查询，差分数组用于快速区间更新。

## 相关主题

- [前缀和](/topics/array-string/prefix-sum) — 差分数组的逆操作，用于快速区间求和
