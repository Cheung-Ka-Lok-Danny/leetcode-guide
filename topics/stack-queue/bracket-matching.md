# 括号匹配：有效括号、括号生成

## 概念讲解

括号匹配是栈的经典应用场景，考察栈的先进后出特性与括号的嵌套结构的天然契合。

### 核心思想

- **有效括号**：左括号压栈，右括号弹栈匹配。遇到不匹配或栈空时为无效
- **括号生成**：回溯法，左括号数 < n 时可以加左括号，右括号数 < 左括号数时可以加右括号
- **最长有效括号**：用栈记录索引，匹配时弹出并计算长度；或用动态规划
- **括号的分数**：递归或栈计算嵌套括号的分数

### 关键技巧

| 技巧 | 应用场景 |
|------|---------|
| 栈存字符 | 标准括号匹配 |
| 栈存索引 | 计算最长有效长度 |
| 计数法 | 只有一种括号类型时，用计数器代替栈 |
| 回溯剪枝 | 括号生成中保证右括号不超过左括号 |

## 经典题目

### 20. 有效的括号

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">20</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/valid-parentheses/" target="_blank">有效的括号</a></span>
    <span class="difficulty-easy">简单</span>
  </div>
  <p>判断括号字符串是否有效。左括号入栈，右括号与栈顶匹配则弹栈，否则无效。最后检查栈是否为空。</p>
  <div class="problem-tags">
    <span class="tag">栈</span>
    <span class="tag">字符串</span>
  </div>
</div>

```python
def isValid(self, s: str) -> bool:
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    
    for ch in s:
        if ch in pairs:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)
    
    return not stack
```

### 22. 括号生成

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">22</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/generate-parentheses/" target="_blank">括号生成</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>生成 n 对括号的所有合法组合。回溯法：左括号数 < n 时加左括号，右括号数 < 左括号数时加右括号。剪枝条件保证生成的括号串始终有效。</p>
  <div class="problem-tags">
    <span class="tag">回溯</span>
    <span class="tag">字符串</span>
  </div>
</div>

```python
def generateParenthesis(self, n: int) -> List[str]:
    res = []
    
    def backtrack(s, left, right):
        if len(s) == 2 * n:
            res.append(s)
            return
        if left < n:
            backtrack(s + '(', left + 1, right)
        if right < left:
            backtrack(s + ')', left, right + 1)
    
    backtrack('', 0, 0)
    return res
```

### 32. 最长有效括号

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">32</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/longest-valid-parentheses/" target="_blank">最长有效括号</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>找最长连续有效括号子串。栈解法：栈底保存最后一个未匹配的右括号索引，每次匹配后计算当前长度。DP 解法：dp[i] 表示以 i 结尾的最长有效长度。</p>
  <div class="problem-tags">
    <span class="tag">栈</span>
    <span class="tag">动态规划</span>
  </div>
</div>

```python
def longestValidParentheses(self, s: str) -> int:
    stack = [-1]  # 栈底存最后一个未匹配的右括号索引
    max_len = 0
    
    for i, ch in enumerate(s):
        if ch == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                max_len = max(max_len, i - stack[-1])
    
    return max_len
```

### 856. 括号的分数

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">856</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/score-of-parentheses/" target="_blank">括号的分数</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>计算括号字符串的分数。规则：()=1, AB=A+B, (A)=2*A。用栈记录每层分数，遇到左括号入0，右括号弹出并将 2*score 或 1 加到新栈顶。</p>
  <div class="problem-tags">
    <span class="tag">栈</span>
    <span class="tag">数学</span>
  </div>
</div>

```python
def scoreOfParentheses(self, s: str) -> int:
    stack = [0]  # 每层的分数
    
    for ch in s:
        if ch == '(':
            stack.append(0)
        else:
            score = stack.pop()
            stack[-1] += max(score * 2, 1)
    
    return stack[0]
```

### 678. 有效的括号字符串

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">678</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/valid-parenthesis-string/" target="_blank">有效的括号字符串</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>包含 * 号的括号匹配，* 可以当左括号、右括号或空字符。贪心法：维护左括号可能的最小和最大数量范围 [low, high]。</p>
  <div class="problem-tags">
    <span class="tag">栈</span>
    <span class="tag">贪心</span>
  </div>
</div>

```python
def checkValidString(self, s: str) -> bool:
    low = high = 0  # 左括号可能的最小和最大数量
    
    for ch in s:
        if ch == '(':
            low += 1
            high += 1
        elif ch == ')':
            low = max(low - 1, 0)
            high -= 1
            if high < 0:
                return False
        else:  # '*'
            low = max(low - 1, 0)
            high += 1
    
    return low == 0
```

## 复杂度分析

| 问题 | 时间复杂度 | 空间复杂度 | 核心方法 |
|------|-----------|-----------|---------|
| 有效括号 | O(n) | O(n) | 栈匹配 |
| 括号生成 | O(4^n/√n) | O(n) | 回溯 |
| 最长有效括号 | O(n) | O(n) | 栈/DP |
| 括号分数 | O(n) | O(n) | 栈累加 |

括号匹配的核⼼规律：**栈为空时遇到右括号 → 无效；遍历结束栈不为空 → 无效**。对于带通配符的情况，计数法的范围跟踪比栈更高效。

## 相关主题

- [栈与队列 - 单调栈](/topics/stack-queue/monotonic-stack) — 括号匹配中的栈应用与单调栈的深层联系
