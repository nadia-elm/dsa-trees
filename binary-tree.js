/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let toVisitQueue = [this.root];
    let minDepth = 0;
    let depthCount = 1;

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      if (current.left || current.right) {
        toVisitQueue.push(current.left);
        toVisitQueue.push(current.right);
        depthCount++;
      } else {
        if (minDepth === 0 || depthCount < minDepth) minDepth = depthCount;
      }
    }
    return minDepth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    let toVisitQueue = [this.root];
    let maxDepth = 0;
    let depthCount = 1;

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      if (current.left || current.right) {
        toVisitQueue.push(current.left);
        toVisitQueue.push(current.right);
        depthCount++;
      } else {
        if (maxDepth === 0 || depthCount > maxDepth) maxDepth = depthCount;
      }
    }
    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (!node) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
    let toVisitQueue = [this.root];
    let lowVal = null;

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      if (
        current.val > lowerBound &&
        (current.val < lowVal || lowVal === null)
      ) {
        lowVal = current.val;
      }
      if (current.left || current.right) {
        toVisitQueue.push(current.left);
        toVisitQueue.push(current.right);
      }
    }
    return lowVal;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
