# 拓扑排序

拓扑排序是对有向无环图（DAG）的顶点进行线性排序，使得对每条有向边 u → v，u 在排序中都排在 v 之前。

## 核心概念

### 拓扑排序的应用场景

- **课程安排**：先修课关系，判断能否学完所有课程
- **任务调度**：有依赖关系的任务执行顺序
- **编译依赖**：确定源文件的编译顺序
- **依赖解析**：包管理器的依赖处理

### Kahn 算法（BFS 法）

**算法步骤：**
1. 计算所有顶点的入度
2. 将入度为 0 的顶点入队
3. 依次出队，将其邻接顶点的入度减 1
4. 如果邻接顶点入度变为 0，入队
5. 重复直到队列为空

**判断有环**：如果最终排序的顶点数 < 总顶点数，说明图中存在环。

### DFS 后序法

**算法步骤：**
1. 对图进行 DFS 遍历
2. 在递归返回时将当前节点加入结果
3. 最终将结果反转即为拓扑排序

**判断有环**：DFS 过程中检测是否存在"回边"（访问到正在访问中的节点）。

### 两种方法对比

| 特性 | Kahn 算法（BFS） | DFS 后序法 |
|------|-----------------|-----------|
| 实现方式 | 队列 | 递归栈 |
| 是否显式排序 | 是 | 是（需反转） |
| 判断环 | 判断排序数量 | 检测回溯标记 |
| 空间复杂度 | O(V) | O(V) |

> 推荐使用 Kahn 算法，更直观且不容易栈溢出。

## 关键技巧

1. **入度表**：用数组记录每个节点的入度，`indegree[neighbor] += 1`
2. **邻接表构建**：用列表的列表或字典构建图 `graph[u].append(v)`
3. **拓扑排序不唯一**：如果有多个入度为 0 的节点，不同选择得到不同排序
4. **字典序拓扑排序**：使用优先队列代替普通队列，每次取字典序最小的节点

## 经典题目

### LeetCode 207. 课程表

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[207]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/course-schedule/" target="_blank">课程表</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>判断是否能完成所有课程（课程间有先修关系）。</p>
  <p><strong>核心思路</strong>：拓扑排序判定是否有环。Kahn 算法——构建邻接表和入度表，将入度为 0 的课程入队。每次出队将邻接课程入度减 1，入度变 0 则入队。最后检查已修课程数是否等于总课程数。</p>
  <div class="problem-tags">
    <span class="tag">拓扑排序</span>
    <span class="tag">Kahn算法</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    queue = [i for i in range(numCourses) if indegree[i] == 0]
    count = 0

    while queue:
        node = queue.pop(0)
        count += 1
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return count == numCourses
```

> 时间复杂度：O(V + E) | 空间复杂度：O(V + E)

### LeetCode 210. 课程表 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[210]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/course-schedule-ii/" target="_blank">课程表 II</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>返回学习所有课程的学习顺序（一个拓扑排序结果）。</p>
  <p><strong>核心思路</strong>：在 207 题基础上，每次出队时将课程加入结果列表。返回结果列表（如果长度为课程数），否则返回空数组。</p>
  <div class="problem-tags">
    <span class="tag">拓扑排序</span>
    <span class="tag">Kahn算法</span>
  </div>
</div>

```python
def findOrder(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    queue = [i for i in range(numCourses) if indegree[i] == 0]
    result = []

    while queue:
        node = queue.pop(0)
        result.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return result if len(result) == numCourses else []
```

> 时间复杂度：O(V + E) | 空间复杂度：O(V + E)

### LeetCode 269. 火星词典

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[269]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/alien-dictionary/" target="_blank">火星词典</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>根据外星语单词字典序推导字母顺序。</p>
  <p><strong>核心思路</strong>：将相邻单词按第一个不同字符提取字母顺序关系，构建有向图。然后进行拓扑排序。注意处理无效情况（前缀问题、环）。</p>
  <div class="problem-tags">
    <span class="tag">拓扑排序</span>
    <span class="tag">字符串</span>
    <span class="tag">构造图</span>
  </div>
</div>

### LeetCode 1203. 项目管理

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[1203]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/sort-items-by-groups-respecting-dependencies/" target="_blank">项目管理</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>按照项目分组和依赖关系进行拓扑排序，同组项目需相邻。</p>
  <p><strong>核心思路</strong>：两层拓扑排序——先按组排序，再在组内排序。需要构建组级别的图和项目级别的图，分别拓扑排序。</p>
  <div class="problem-tags">
    <span class="tag">拓扑排序</span>
    <span class="tag">分层排序</span>
  </div>
</div>

## 复杂度分析

| 题目 | 方法 | 时间复杂度 | 空间复杂度 |
|------|------|-----------|-----------|
| 207. 课程表 | Kahn BFS | O(V+E) | O(V+E) |
| 210. 课程表 II | Kahn BFS | O(V+E) | O(V+E) |
| 269. 火星词典 | Kahn BFS | O(C) | O(1) |
| 1203. 项目管理 | 双层 Kahn | O(V+E) | O(V+E) |

## 相关主题

- [图 - DFS与BFS](/topics/graph/dfs-bfs) — 拓扑排序依赖 DFS/BFS 进行遍历
- [图 - 最短路径](/topics/graph/shortest-path) — 拓扑排序可用于 DAG 上的最短路径计算
