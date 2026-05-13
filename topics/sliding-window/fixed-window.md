# 定长窗口

定长窗口（Fixed-size Sliding Window）是滑动窗口最基础的形式，窗口大小固定不变，每次滑动时移除前一元素、加入后一元素。

## 核心概念

### 基本思想
- 维护一个长度固定的窗口
- 滑动窗口时，移除左边界元素，加入右边界元素
- 在 O(1) 时间内更新窗口内的状态

### 通用模板

```python
# 定长窗口模板
def fixed_window(arr, k):
    # 初始化第一个窗口
    window = init(arr[:k])
    result = process(window)

    # 滑动窗口
    for i in range(k, len(arr)):
        # 移除左边界元素
        remove(arr[i - k], window)
        # 加入右边界元素
        add(arr[i], window)
        # 更新结果
        result = max(result, process(window))

    return result
```

## 经典题目

### LeetCode 643. 子数组最大平均数 I

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[643]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/maximum-average-subarray-i/" target="_blank">子数组最大平均数 I</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>找到长度为 k 的连续子数组的最大平均值。</p>
  <p><strong>核心思路</strong>：维护长度为 k 的窗口和，每次滑动时减去移出的元素，加上移入的元素，取最大和。</p>
  <div class="problem-tags">
    <span class="tag">定长窗口</span>
    <span class="tag">入门题</span>
  </div>
</div>

```python
def findMaxAverage(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum / k
```

> 时间复杂度：O(n) | 空间复杂度：O(1)

### LeetCode 1343. 大小为 K 且平均值大于等于阈值的子数组数目

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1343]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/" target="_blank">大小为 K 且平均值大于等于阈值的子数组数目</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>统计长度为 K 且平均值 >= threshold 的连续子数组个数。</p>
  <p><strong>核心思路</strong>：定长窗口求和，平均值 = 和 / K >= threshold 等价于 和 >= K × threshold。</p>
  <div class="problem-tags">
    <span class="tag">定长窗口</span>
    <span class="tag">计数</span>
  </div>
</div>

### LeetCode 1456. 定长子串中元音的最大数目

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1456]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/" target="_blank">定长子串中元音的最大数目</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找出长度为 k 的连续子串中包含最多元音字母的个数。</p>
  <p><strong>核心思路</strong>：定长窗口。维护窗口内元音字母计数，滑动时更新。用 set 或直接判断字符是否为元音。</p>
  <div class="problem-tags">
    <span class="tag">定长窗口</span>
    <span class="tag">字符串</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 子数组最大平均数 I | O(n) | O(1) |
| 大小为 K 且平均值 >= 阈值 | O(n) | O(1) |
| 定长子串中元音最大数目 | O(n) | O(1) |

## 相关主题

- [滑动窗口 - 不定长窗口](/topics/sliding-window/variable-window) — 定长窗口与不定长窗口构成滑动窗口的完整体系
- [滑动窗口 - 窗口计数](/topics/sliding-window/window-counting) — 窗口计数方法应用于定长窗口的统计
