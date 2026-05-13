# 区间DP

区间DP（Interval DP）是动态规划的一类重要分支，状态定义在区间 `[i, j]` 上，通过枚举分割点将大区间拆分为小区间进行递推。

## 核心概念

### 状态定义
- `dp[i][j]` 表示区间 `[i, j]` 上的最优解或方案数
- **区间长度从小到大**进行递推

### 基本模板

```python
# 区间DP通用模板
n = len(arr)
dp = [[0] * n for _ in range(n)]

# 初始化长度为1的区间
for i in range(n):
    dp[i][i] = base_value

# 枚举区间长度
for length in range(2, n + 1):          # 区间长度
    for i in range(n - length + 1):      # 左端点
        j = i + length - 1               # 右端点
        # 枚举分割点
        for k in range(i, j):
            dp[i][j] = max/min(dp[i][j], dp[i][k] + dp[k+1][j] + cost(i,j,k))
```

### 常见题型
- **回文相关**：最长回文子串、最长回文子序列
- **合并类**：戳气球、合并石头、多边形三角剖分
- **博弈类**：石子游戏、预测赢家

## 经典题目

### LeetCode 5. 最长回文子串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[5]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-palindromic-substring/" target="_blank">最长回文子串</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到字符串中最长的回文子串。</p>
  <p><strong>核心思路</strong>：dp[i][j] 表示 s[i..j] 是否为回文串。若 s[i]==s[j] 且区间长度<=2 或 dp[i+1][j-1] 为真，则 dp[i][j]=True。记录最长的 True 区间。</p>
  <div class="problem-tags">
    <span class="tag">区间DP</span>
    <span class="tag">高频面试</span>
    <span class="tag">必做题</span>
  </div>
</div>

### LeetCode 516. 最长回文子序列

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[516]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-palindromic-subsequence/" target="_blank">最长回文子序列</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>找到字符串中最长回文子序列的长度。</p>
  <p><strong>核心思路</strong>：dp[i][j] 表示 s[i..j] 中最长回文子序列长度。s[i]==s[j] 时 dp[i][j]=dp[i+1][j-1]+2，否则取两侧子区间的最大值。</p>
  <div class="problem-tags">
    <span class="tag">区间DP</span>
    <span class="tag">子序列</span>
  </div>
</div>

### LeetCode 312. 戳气球

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[312]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/burst-balloons/" target="_blank">戳气球</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>戳破所有气球获得最多硬币。戳破 i 号气球获得 nums[left] * nums[i] * nums[right] 个硬币。</p>
  <p><strong>核心思路</strong>：反向思考——假设最后戳破的气球是 k，则问题分为左区间和右区间。dp[i][j] 表示戳破开区间 (i,j) 内所有气球的最大硬币数。</p>
  <div class="problem-tags">
    <span class="tag">区间DP</span>
    <span class="tag">高频面试</span>
    <span class="tag">经典题</span>
  </div>
</div>

```python
def maxCoins(nums):
    # 在首尾添加虚拟气球 1，方便处理边界
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]

    # 枚举区间长度
    for length in range(2, n):
        for i in range(n - length):
            j = i + length
            # 枚举最后戳破的气球 k
            for k in range(i + 1, j):
                dp[i][j] = max(dp[i][j],
                    dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j])

    return dp[0][n - 1]
```

> 时间复杂度：O(n³) | 空间复杂度：O(n²)

### LeetCode 877. 石子游戏

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[877]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/stone-game/" target="_blank">石子游戏</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>Alex 和 Lee 从石子堆两端取石子，Alex 先手，判断 Alex 是否能赢。</p>
  <p><strong>核心思路</strong>：dp[i][j] 表示先手者在区间 [i,j] 上能获得的净胜分（先手得分 - 后手得分）。因为石子总数是奇数且两端必然取到，先手必胜。</p>
  <div class="problem-tags">
    <span class="tag">区间DP</span>
    <span class="tag">博弈</span>
  </div>
</div>

### LeetCode 1000. 合并石头的最低成本

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1000]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/minimum-cost-to-merge-stones/" target="_blank">合并石头的最低成本</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>每次合并连续的 K 堆石头，成本为这 K 堆石头的总数，求合并成一堆的最小总成本。</p>
  <p><strong>核心思路</strong>：dp[i][j][k] 表示将区间 [i,j] 合并成 k 堆的最小成本。当 k=1 时，需要先将区间合并成 K 堆再合并一次。枚举分割点进行转移。</p>
  <div class="problem-tags">
    <span class="tag">区间DP</span>
    <span class="tag">K合并</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 最长回文子串 | O(n²) | O(n²) |
| 最长回文子序列 | O(n²) | O(n²) |
| 戳气球 | O(n³) | O(n²) |
| 石子游戏 | O(n²) | O(n²) |
| 合并石头的最低成本 | O(n³ × K) | O(n² × K) |

## 相关主题

- [动态规划 - 线性DP](/topics/dynamic-programming/linear-dp) — 区间 DP 与线性 DP 都依赖递推关系
- [动态规划 - 状态压缩DP](/topics/dynamic-programming/state-compression) — 区间 DP 可扩展到状态压缩优化
