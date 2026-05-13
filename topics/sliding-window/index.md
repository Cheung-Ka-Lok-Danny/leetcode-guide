# 滑动窗口

滑动窗口（Sliding Window）是一种通过维护一个动态区间来解决子数组/子串问题的技巧，是双指针技术的一个特化分支。

## 核心概念

- **窗口**：数组或字符串中的一个连续区间 [left, right]
- **窗口伸缩**：根据条件移动左右边界
- **窗口大小**：固定窗口 vs 可变窗口
- **窗口数据结构**：用于快速获取窗口内的统计信息

## 滑动窗口模板

```python
def sliding_window(s):
    # 初始化窗口数据结构
    window = {}
    left = right = 0

    while right < len(s):
        # 扩大窗口
        c = s[right]
        window[c] = window.get(c, 0) + 1
        right += 1

        # 缩小窗口条件
        while need_shrink(window):
            d = s[left]
            window[d] -= 1
            left += 1

        # 更新结果
        # ...

    return result
```

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/sliding-window/fixed-window">定长窗口</a>
  <a href="/topics/sliding-window/variable-window">不定长窗口</a>
  <a href="/topics/sliding-window/window-counting">窗口计数</a>
  <a href="/topics/sliding-window/string-permutation">字符串排列</a>
</div>

## 复杂度分析

| 窗口类型 | 时间复杂度 | 空间复杂度 | 典型场景 |
|---------|-----------|-----------|---------|
| 定长窗口 | O(n) | O(1)~O(k) | 固定大小子数组 |
| 不定长窗口 | O(n) | O(1)~O(k) | 满足条件的最值 |
| 多窗口 | O(n) | O(k) | 多条件约束 |
