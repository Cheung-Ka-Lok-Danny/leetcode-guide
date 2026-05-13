# 链表

链表是一种动态数据结构，通过指针将一系列节点串联起来。链表的操作核心在于指针的操控，是面试中出现频率极高的考点。

## 核心概念

- **单链表**：每个节点包含 val 和 next 指针
- **双链表**：每个节点包含 val、prev 和 next 指针
- **时间复杂度**：查找 O(n)，插入/删除 O(1)（已知位置）
- **空间复杂度**：O(n)

## 解题框架

```
链表问题 → 画图模拟 → 指针操作 → 边界检查（空/单节点） → 验证
```

## 子主题导航

<div class="subtopic-nav">
  <a href="/topics/linked-list/traversal-reverse">遍历与反转</a>
  <a href="/topics/linked-list/fast-slow-pointers">快慢指针</a>
  <a href="/topics/linked-list/merge-lists">合并链表</a>
  <a href="/topics/linked-list/cycle-detection">环形链表</a>
  <a href="/topics/linked-list/lru-cache">LRU缓存</a>
</div>

## 复杂度总览

| 技巧 | 时间复杂度 | 空间复杂度 | 适用场景 |
|------|-----------|-----------|---------|
| 遍历 | O(n) | O(1) | 基础操作 |
| 反转 | O(n) | O(1) | 改变顺序 |
| 快慢指针 | O(n) | O(1) | 环检测、中点 |
| 合并 | O(n+m) | O(1) | 有序链表合并 |
| 递归 | O(n) | O(n) | 反转、复制 |

## 推荐学习顺序

1. 遍历与反转 — 基本功
2. 快慢指针 — 经典技巧
3. 合并链表 — 多指针协同
4. 环形链表 — 快慢指针应用
5. LRU缓存 — 综合数据结构
