# 几何问题

几何问题是算法面试中较少出现但一旦出现就很容易出错的题型，主要涉及向量运算、矩形相交和简单计算。

## 核心概念

### 向量运算

```python
# 二维向量
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

# 向量差
def subtract(a, b):
    return (a.x - b.x, a.y - b.y)

# 叉积（Cross Product）
def cross(o, a, b):
    # 计算向量 OA × OB
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)

# 点积（Dot Product）
def dot(a, b):
    return a.x * b.x + a.y * b.y
```

### 叉积的应用
- **判断方向**：cross(o, a, b) > 0 表示 a→b 逆时针转向；< 0 顺时针；= 0 共线
- **计算三角形面积**：`|cross(o, a, b)| / 2`
- **判断点是否在线段上**
- **凸包算法**（Graham Scan / Andrew 算法）

### 矩形相交

```python
# 两个矩形的交集判断（矩形用左下和右上坐标表示）
def is_intersect(r1, r2):
    # 不相交的条件：一个矩形完全在另一个的左边/右边/上边/下边
    return not (r1.x2 <= r2.x1 or r2.x2 <= r1.x1 or
                r1.y2 <= r2.y1 or r2.y2 <= r1.y1)
```

## 经典题目

### LeetCode 223. 矩形面积

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[223]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/rectangle-area/" target="_blank">矩形面积</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>计算两个矩形覆盖的总面积（可能有重叠）。</p>
  <p><strong>核心思路</strong>：总面积 = 两矩形面积之和 - 重叠面积。重叠部分为两个矩形在x轴和y轴投影的交集。</p>
  <div class="problem-tags">
    <span class="tag">几何</span>
    <span class="tag">数学</span>
  </div>
</div>

```python
def computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2):
    area_a = (ax2 - ax1) * (ay2 - ay1)
    area_b = (bx2 - bx1) * (by2 - by1)

    # 重叠部分的宽和高
    overlap_x = max(0, min(ax2, bx2) - max(ax1, bx1))
    overlap_y = max(0, min(ay2, by2) - max(ay1, by1))

    return area_a + area_b - overlap_x * overlap_y
```

> 时间复杂度：O(1) | 空间复杂度：O(1)

### LeetCode 836. 矩形重叠

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[836]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/rectangle-overlap/" target="_blank">矩形重叠</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断两个矩形是否重叠（边界接触不算重叠）。</p>
  <p><strong>核心思路</strong>：不重叠条件是任一矩形完全在另一个的左侧/右侧/上方/下方。</p>
  <div class="problem-tags">
    <span class="tag">几何</span>
    <span class="tag">数学</span>
  </div>
</div>

### LeetCode 587. 安装栅栏

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[587]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/erect-the-fence/" target="_blank">安装栅栏</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>给定平面上的点，找到包围所有点的最小凸多边形（凸包）。</p>
  <p><strong>核心思路</strong>：Andrew 算法求凸包。按 x 坐标排序，分别构建上凸包和下凸包。用叉积判断转向方向。</p>
  <div class="problem-tags">
    <span class="tag">几何</span>
    <span class="tag">凸包</span>
    <span class="tag">排序</span>
  </div>
</div>

### LeetCode 939. 最小面积矩形

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[939]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-area-rectangle/" target="_blank">最小面积矩形</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>在二维平面上找四个点组成轴对齐的矩形，求最小面积。</p>
  <p><strong>核心思路</strong>：枚举对角线两个点，检查另外两个点是否存在（用集合）。面积 = |x1-x2| × |y1-y2|。</p>
  <div class="problem-tags">
    <span class="tag">几何</span>
    <span class="tag">哈希表</span>
  </div>
</div>

### LeetCode 892. 三维形体的表面积

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[892]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/surface-area-of-3d-shapes/" target="_blank">三维形体的表面积</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>计算由 1×1×1 立方体堆叠成的三维形体的表面积。</p>
  <p><strong>核心思路</strong>：每个立方体贡献 6 个面。上下相邻减 2，前后左右相邻减 2（减去重叠面）。</p>
  <div class="problem-tags">
    <span class="tag">几何</span>
    <span class="tag">模拟</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 矩形面积 | O(1) | O(1) |
| 矩形重叠 | O(1) | O(1) |
| 安装栅栏 | O(n log n) | O(n) |
| 最小面积矩形 | O(n²) | O(n) |
| 三维形体的表面积 | O(mn) | O(1) |

## 相关主题

- [数学 - GCD与LCM](/topics/math/gcd-lcm) — 几何问题中的分格和对称性计算用到 GCD
- [数学 - 模运算](/topics/math/modular) — 几何问题的公式推导中涉及模运算
