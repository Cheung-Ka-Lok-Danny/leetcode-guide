# 动态连通性

动态连通性（Dynamic Connectivity）问题关注图在动态变化中的连通性查询，并查集是处理此类问题的核心工具。

## 核心概念

### 在线查询 vs 离线处理

| 类型 | 说明 | 处理方式 |
|------|------|---------|
| 在线查询 | 边动态增删，随时查询连通性 | 并查集不支持删除，需要用 Link-Cut Tree |
| 离线处理 | 已知所有操作，逆向处理 | 逆向并查集（先建最终状态，逆序加边） |

### 常见技巧
- **正向并查集**：边加入时 union，查询连通性
- **逆向并查集**：先假设所有边都移除，逆序处理操作时加边
- **映射编号**：将自定义的节点（如字符串 ID）映射为整数索引

## 经典题目

### LeetCode 721. 账户合并

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[721]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/accounts-merge/" target="_blank">账户合并</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>合并拥有相同邮箱的用户帐户（可能有重复），每个帐户合并后邮箱按字典序排列。</p>
  <p><strong>核心思路</strong>：将每个邮箱映射为唯一 ID，相同用户的不同邮箱用并查集合并。遍历帐户，将每个帐户的首个邮箱与其他邮箱 union。最后按根节点合并邮箱列表。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">字符串</span>
    <span class="tag">高频面试</span>
  </div>
</div>

```python
def accountsMerge(accounts):
    # 邮箱 -> ID 映射
    email_to_id = {}
    email_to_name = {}
    id_counter = 0

    # 每个邮箱分配唯一 ID
    for account in accounts:
        name = account[0]
        for email in account[1:]:
            if email not in email_to_id:
                email_to_id[email] = id_counter
                id_counter += 1
            email_to_name[email] = name

    # 并查集合并同一帐户的邮箱
    uf = UnionFind(id_counter)
    for account in accounts:
        first_email = account[1]
        for email in account[2:]:
            uf.union(email_to_id[first_email], email_to_id[email])

    # 按根节点分组
    root_to_emails = {}
    for email, idx in email_to_id.items():
        root = uf.find(idx)
        if root not in root_to_emails:
            root_to_emails[root] = []
        root_to_emails[root].append(email)

    # 构造结果
    res = []
    for emails in root_to_emails.values():
        res.append([email_to_name[emails[0]]] + sorted(emails))
    return res
```

> 时间复杂度：O(n × k × α(n)) | 空间复杂度：O(总邮箱数)

### LeetCode 765. 情侣牵手

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[765]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/couples-holding-hands/" target="_blank">情侣牵手</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>N 对情侣坐在 2N 个座位上，每次可以交换任意两人的位置，求最少交换次数使每对情侣相邻而坐。</p>
  <p><strong>核心思路</strong>：将每对情侣视为一个节点，两对情侣之间的座位交织形成边。连通分量内，交换次数 = 分量大小 - 1。总次数 = N - 连通分量数。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">贪心</span>
  </div>
</div>

### LeetCode 399. 除法求值

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[399]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/evaluate-division/" target="_blank">除法求值</a></span>
    <span class="difficulty-medium">中等</span>
  </div>
  <p>给定 a/b 的比值关系，查询 c/d 的比值。</p>
  <p><strong>核心思路</strong>：带权并查集（Weighted Union-Find）。维护每个节点到根节点的权重倍数。union 时更新权重，find 时权重相乘。</p>
  <div class="problem-tags">
    <span class="tag">带权并查集</span>
    <span class="tag">图</span>
    <span class="tag">高频面试</span>
  </div>
</div>

### LeetCode 305. 岛屿数量 II

<div class="problem-card">
  <div class="problem-header">
    <span class="problem-number">[305]</span>
    <span class="problem-title"><a href="https://leetcode.cn/problems/number-of-islands-ii/" target="_blank">岛屿数量 II</a></span>
    <span class="difficulty-hard">困难</span>
  </div>
  <p>在 m×n 网格中逐步添加陆地（给出 positions），每次添加后返回当前岛屿数量。</p>
  <p><strong>核心思路</strong>：动态并查集。每次添加新陆地时，初始岛屿数 +1，检查上下左右四个方向是否有陆地，有则合并且岛屿数 -1。</p>
  <div class="problem-tags">
    <span class="tag">并查集</span>
    <span class="tag">网格</span>
    <span class="tag">动态</span>
  </div>
</div>

## 复杂度分析

| 题目 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 账户合并 | O(nk × α(nk)) | O(nk) |
| 情侣牵手 | O(n × α(n)) | O(n) |
| 除法求值 | O((n+q) × α(n)) | O(n) |
| 岛屿数量 II | O(k × α(mn)) | O(mn) |

## 相关主题

- [并查集 - 连通分量](/topics/union-find/connected-components) — 动态连通性是连通分量问题的在线版本
- [图 - 最小生成树](/topics/graph/mst) — 并查集在 Kruskal 算法中处理动态连通性
