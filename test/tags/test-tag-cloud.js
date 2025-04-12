// 标签云算法测试脚本
// 测试标签云位置计算在不同标签数量下的表现

// 导入必要的工具函数
const fs = require('fs');
const path = require('path');

// 从src代码中复制的标签位置计算函数
// 用于根据标签数量计算标签大小的函数
function getTagSize(count, maxCount) {
  // 标签大小与文章数量成正比，但使用对数比例使差异不太极端
  const minSize = 0.65; // 减小最小尺寸
  const maxSize = 1.6; // 减小最大尺寸
  
  // 优化计算逻辑，使标签大小更均匀分布
  const normalizedCount = count / maxCount; // 标准化计数 (0-1范围)
  const logFactor = Math.log(normalizedCount * 9 + 1) / Math.log(10); // 对数缩放 (0-1范围)
  
  // 应用最小和最大大小限制
  return minSize + logFactor * (maxSize - minSize);
}

// 优化的标签位置计算函数
function calculateTagPositions(tags, cloudRadius) {
  // 没有标签时返回空对象
  if (tags.length === 0) return {};
  
  // 获取最大标签计数
  const maxCount = tags[0].count;
  
  // 创建保存所有标签位置的对象
  const positions = {};
  
  // 对标签进行深度克隆并按计数降序排序（确保高计数的标签先放置）
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);
  
  // 记录已使用的位置，避免标签重叠
  const usedPositions = [];
  
  // 设置中心标签
  if (sortedTags.length > 0) {
    const centerTag = sortedTags[0]; // 文章数量最多的标签
    const size = getTagSize(centerTag.count, maxCount);
    
    positions[centerTag.name] = {
      x: 0, // 正中心
      y: 0, // 正中心
      size: size,
      zOffset: 50, // 最高层级
      floatDelay: 0
    };
    
    // 记录中心标签的位置和大小
    const tagRadius = size * 1.6 * 16; // 减小标签半径换算倍数
    usedPositions.push({x: 0, y: 0, radius: tagRadius});
    
    // 移除中心标签，处理其余标签
    sortedTags.shift();
  }
  
  // 螺旋放置函数 - 根据标签数量从高到低，从中心向外螺旋放置
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // 黄金角
  let currentAngle = Math.random() * Math.PI * 2; // 随机起始角度
  let currentIndex = 1;
  
  // 处理剩余标签
  sortedTags.forEach((tag, index) => {
    const size = getTagSize(tag.count, maxCount);
    const tagRadius = size * 1.6 * 16; // 减小标签半径换算倍数
    
    // 标签应该放置的距离中心的距离，与文章数量成反比
    // 文章数量越多，越靠近中心
    const normalizedCount = tag.count / maxCount;
    // 这里使用平方根函数使分布更加均匀
    const distanceRatio = Math.sqrt(1 - normalizedCount);
    
    // 初始放置距离（根据tag在排序后的位置）
    // 减小基础距离，使整体更紧凑
    let distance = cloudRadius * 0.15 + distanceRatio * cloudRadius * 0.65;
    
    // 增加角度变化，分散相同数量的标签
    const angleStep = goldenAngle + (index % 3) * 0.1;
    currentAngle += angleStep;
    
    // 寻找可放置的位置
    let validPosition = false;
    let attempts = 0;
    let x = 0, y = 0;
    
    // 尝试找到不重叠的位置
    while (!validPosition && attempts < 50) {
      // 计算基于当前角度和距离的位置
      x = Math.cos(currentAngle) * distance;
      y = Math.sin(currentAngle) * distance;
      
      // 检查与已放置标签的距离
      validPosition = true;
      for (const pos of usedPositions) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        const minDistance = tagRadius + pos.radius + 3; // 减小额外间距
        const actualDistance = Math.sqrt(dx*dx + dy*dy);
        
        if (actualDistance < minDistance) {
          validPosition = false;
          break;
        }
      }
      
      // 如果位置无效，稍微调整角度和距离
      if (!validPosition) {
        currentAngle += 0.2; // 微调角度
        distance += 5; // 稍微增加距离
        attempts++;
      }
    }
    
    // 添加位置
    positions[tag.name] = {
      x: x,
      y: y,
      size: size,
      zOffset: 40 - currentIndex, // 确保高计数标签显示在上层
      floatDelay: currentIndex
    };
    
    // 记录已使用的位置
    usedPositions.push({x, y, radius: tagRadius});
    currentIndex++;
  });
  
  return positions;
}

// 测试函数：生成指定数量的测试标签并计算位置
function testTagPositions(tagCount, cloudRadius = 300) {
  console.log(`\n测试标签数量: ${tagCount}, 云半径: ${cloudRadius}px`);
  console.time('计算标签位置耗时');
  
  // 生成测试标签数据
  const tags = [];
  for (let i = 1; i <= tagCount; i++) {
    tags.push({
      name: `标签${i}`,
      count: Math.max(1, Math.floor(100 / Math.sqrt(i))) // 模拟标签数量分布
    });
  }
  
  // 计算标签位置
  const positions = calculateTagPositions(tags, cloudRadius);
  
  console.timeEnd('计算标签位置耗时');
  
  // 统计信息
  let overlappingPairs = 0;
  let attemptsToPlace = 0;
  let outsideBoundary = 0;
  
  // 检查是否有标签位置重叠
  const positionEntries = Object.entries(positions);
  for (let i = 0; i < positionEntries.length; i++) {
    const [tagName1, pos1] = positionEntries[i];
    const size1 = pos1.size * 1.6 * 16; // 标签1的尺寸
    
    // 检查是否超出边界
    const distanceFromCenter = Math.sqrt(pos1.x * pos1.x + pos1.y * pos1.y);
    if (distanceFromCenter > cloudRadius) {
      outsideBoundary++;
    }
    
    // 检查与其他标签的重叠
    for (let j = i + 1; j < positionEntries.length; j++) {
      const [tagName2, pos2] = positionEntries[j];
      const size2 = pos2.size * 1.6 * 16; // 标签2的尺寸
      
      const dx = pos1.x - pos2.x;
      const dy = pos1.y - pos2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = size1 + size2 + 3; // 最小安全距离
      
      if (distance < minDistance) {
        overlappingPairs++;
        console.warn(`  警告: 标签 "${tagName1}" 和 "${tagName2}" 位置重叠!`);
        console.warn(`  位置1: (${pos1.x.toFixed(2)}, ${pos1.y.toFixed(2)}), 大小: ${size1.toFixed(2)}`);
        console.warn(`  位置2: (${pos2.x.toFixed(2)}, ${pos2.y.toFixed(2)}), 大小: ${size2.toFixed(2)}`);
        console.warn(`  实际距离: ${distance.toFixed(2)}, 最小安全距离: ${minDistance.toFixed(2)}`);
      }
    }
  }
  
  // 输出测试报告
  console.log(`测试结果:`);
  console.log(`  • 标签总数: ${tagCount}`);
  console.log(`  • 实际放置标签数: ${positionEntries.length}`);
  console.log(`  • 重叠标签对数: ${overlappingPairs}`);
  console.log(`  • 超出边界标签数: ${outsideBoundary}`);
  
  // 可选：将结果导出为可视化数据
  const visualizationData = {
    tags: tagCount,
    cloudRadius,
    positions,
    stats: {
      overlappingPairs,
      outsideBoundary
    }
  };
  
  // 保存结果到JSON文件
  fs.writeFileSync(
    path.join(__dirname, `tag-cloud-test-${tagCount}.json`),
    JSON.stringify(visualizationData, null, 2)
  );
  
  return {
    overlappingPairs,
    outsideBoundary,
    positions
  };
}

// 执行测试，从少量标签开始逐渐增加数量
function runAllTests() {
  console.log('开始标签云算法测试...');
  
  const tagCounts = [5, 10, 20, 50, 100, 200, 500];
  const results = {};
  
  tagCounts.forEach(count => {
    results[count] = testTagPositions(count);
  });
  
  console.log('\n所有测试完成！测试结果概要:');
  console.table(
    Object.entries(results).map(([count, result]) => ({
      标签数: count,
      重叠标签对: result.overlappingPairs,
      超出边界: result.outsideBoundary
    }))
  );
}

// 执行所有测试
runAllTests(); 