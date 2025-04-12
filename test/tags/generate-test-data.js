/**
 * 标签云测试数据生成器
 * 此脚本用于生成标签云的测试数据，并检测标签云算法的性能和准确性
 */

const fs = require('fs');
const path = require('path');

// 如果在Node环境中没有performance对象，则创建一个简单的性能测量函数
if (typeof performance === 'undefined') {
  globalThis.performance = {
    now: () => {
      return Date.now();
    }
  };
}

/**
 * 计算标签的大小，基于其权重
 * @param {number} count - 标签的出现次数
 * @param {number} maxCount - 所有标签中的最大出现次数
 * @returns {number} - 标签的大小（以像素为单位）
 */
function getTagSize(count, maxCount) {
  // 使用对数比例，确保较小的标签仍然可见
  const minSize = 12;
  const maxSize = 40;
  const logScale = Math.log(count) / Math.log(maxCount);
  
  // 线性插值以获得适当的大小
  return Math.max(minSize, Math.min(maxSize, minSize + logScale * (maxSize - minSize)));
}

/**
 * 检查两个标签是否重叠
 * @param {Object} tag1 - 第一个标签对象，包含x、y坐标和半径
 * @param {Object} tag2 - 第二个标签对象，包含x、y坐标和半径
 * @returns {boolean} - 如果标签重叠则返回true，否则返回false
 */
function checkCollision(tag1, tag2) {
  // 计算两个标签中心点之间的距离
  const dx = tag1.x - tag2.x;
  const dy = tag1.y - tag2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // 如果距离小于两个标签半径之和，则它们重叠
  return distance < (tag1.radius + tag2.radius) + 2; // 添加2像素的边距
}

/**
 * 计算标签在标签云中的位置
 * @param {Array} tags - 标签对象数组，每个都包含文本和大小
 * @param {number} cloudRadius - 标签云的半径
 * @returns {Object} - 包含位置信息和统计数据的对象
 */
function calculateTagPositions(tags, cloudRadius) {
  // 确保输入有效
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return { positions: [], stats: { placed: 0, overlaps: 0, outsideBoundary: 0 } };
  }

  // 为每个标签计算半径（基于其大小）
  const tagsWithRadius = tags.map(tag => ({
    ...tag,
    radius: tag.size / 2
  }));

  // 按半径大小对标签进行排序（最大的标签先放置）
  tagsWithRadius.sort((a, b) => b.radius - a.radius);

  // 已放置的标签数组
  const placedTags = [];
  
  // 统计信息
  const stats = {
    placed: 0,
    overlaps: 0,
    outsideBoundary: 0
  };

  // 第一个标签（最大的）放在中心
  const firstTag = tagsWithRadius[0];
  firstTag.x = 0;
  firstTag.y = 0;
  placedTags.push(firstTag);
  stats.placed++;

  // 螺旋参数
  const a = 0.1; // 控制螺旋的紧密程度
  let angle = 0;
  
  // 尝试放置其他标签
  for (let i = 1; i < tagsWithRadius.length; i++) {
    const currentTag = tagsWithRadius[i];
    let placed = false;
    
    // 尝试多个位置直到找到一个不重叠的位置
    for (let attempt = 0; attempt < 500; attempt++) {
      // 使用螺旋模式生成位置
      const radius = a * angle;
      currentTag.x = radius * Math.cos(angle);
      currentTag.y = radius * Math.sin(angle);
      angle += 0.1 + (0.1 * currentTag.radius / cloudRadius); // 调整角度增量
      
      // 检查是否超出边界
      const distanceFromCenter = Math.sqrt(currentTag.x * currentTag.x + currentTag.y * currentTag.y);
      if (distanceFromCenter + currentTag.radius > cloudRadius) {
        if (attempt === 499) {
          stats.outsideBoundary++;
        }
        continue;
      }
      
      // 检查与已放置标签的碰撞
      let overlapping = false;
      for (const placedTag of placedTags) {
        if (checkCollision(currentTag, placedTag)) {
          overlapping = true;
          if (attempt === 499) {
            stats.overlaps++;
          }
          break;
        }
      }
      
      // 如果没有重叠，则放置标签
      if (!overlapping) {
        placedTags.push(currentTag);
        stats.placed++;
        placed = true;
        break;
      }
    }
    
    // 如果所有尝试都失败，跳过这个标签
    if (!placed) {
      console.log(`无法放置标签 "${currentTag.text}" (半径: ${currentTag.radius.toFixed(2)})`);
    }
  }
  
  return { positions: placedTags, stats };
}

/**
 * 检查标签是否有重叠或超出边界
 * @param {Array} positions - 标签位置数组
 * @param {number} cloudRadius - 标签云的半径
 * @returns {Object} - 包含重叠计数和超出边界计数的对象
 */
function checkTagOverlapsAndBoundaries(positions, cloudRadius) {
  let overlapPairs = 0;
  let outsideBoundary = 0;
  
  // 检查重叠
  for (let i = 0; i < positions.length; i++) {
    // 检查边界
    const tag = positions[i];
    const distanceFromCenter = Math.sqrt(tag.x * tag.x + tag.y * tag.y);
    if (distanceFromCenter + tag.radius > cloudRadius) {
      outsideBoundary++;
    }
    
    // 检查重叠
    for (let j = i + 1; j < positions.length; j++) {
      if (checkCollision(positions[i], positions[j])) {
        overlapPairs++;
      }
    }
  }
  
  return { overlapPairs, outsideBoundary };
}

/**
 * 生成测试标签
 * @param {number} tagCount - 要生成的标签数
 * @returns {Array} - 标签对象数组
 */
function generateTestTags(tagCount) {
  const tags = [];
  
  // 创建随机单词列表模拟标签
  const words = [
    "JavaScript", "React", "Vue", "Angular", "Node", "TypeScript", "HTML", "CSS", 
    "Webpack", "Babel", "ESLint", "Jest", "Mocha", "Redux", "Vuex", "GraphQL",
    "MongoDB", "Express", "Next.js", "Nuxt.js", "Svelte", "Deno", "HTTP", "API",
    "REST", "WebSockets", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Firebase",
    "Git", "GitHub", "GitLab", "CI/CD", "Agile", "Scrum", "Kanban", "DevOps",
    "Serverless", "Microservices", "Monorepo", "PWA", "SPA", "SSR", "SEO", "Accessibility",
    "Performance", "Security", "Testing", "Debugging", "Refactoring", "Design Patterns",
    "Functional", "OOP", "Reactive", "Async", "Promise", "Callback", "Event Loop"
  ];
  
  // 确保我们有足够的词
  while (words.length < tagCount) {
    words.push(...words);
  }
  
  // 随机选择单词并分配计数
  const selectedWords = new Set();
  let maxCount = 0;
  
  while (selectedWords.size < tagCount) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    if (!selectedWords.has(randomWord)) {
      // 为标签生成随机出现次数（偏向于更少的出现次数以模拟真实数据）
      const count = Math.floor(Math.pow(Math.random(), 0.5) * 1000) + 1;
      maxCount = Math.max(maxCount, count);
      selectedWords.add(randomWord);
      
      tags.push({
        text: randomWord,
        count: count
      });
    }
  }
  
  // 计算标签大小
  return tags.map(tag => ({
    ...tag,
    size: getTagSize(tag.count, maxCount)
  }));
}

/**
 * 生成测试数据并保存到文件
 * @param {number} tagCount - 要生成的标签数
 * @param {number} cloudRadius - 标签云的半径
 * @returns {Object} - 测试结果
 */
function generateTestData(tagCount, cloudRadius) {
  console.log(`生成 ${tagCount} 个标签的测试数据，标签云半径: ${cloudRadius}...`);
  
  const startTime = performance.now();
  
  // 生成测试标签
  const tags = generateTestTags(tagCount);
  
  // 计算位置
  const { positions, stats } = calculateTagPositions(tags, cloudRadius);
  
  // 检查重叠和边界问题
  const { overlapPairs, outsideBoundary } = checkTagOverlapsAndBoundaries(positions, cloudRadius);
  
  const endTime = performance.now();
  const computationTime = (endTime - startTime).toFixed(2);
  
  console.log(`位置计算完成：
    - 标签总数: ${tagCount}
    - 成功放置: ${stats.placed}
    - 重叠对数: ${overlapPairs}
    - 超出边界: ${outsideBoundary}
    - 计算时间: ${computationTime}ms
  `);
  
  // 创建包含计算结果的数据对象
  const resultData = {
    metadata: {
      tagCount,
      cloudRadius,
      computationTime,
      stats: {
        placed: stats.placed,
        overlapPairs,
        outsideBoundary
      }
    },
    tags: positions.map(tag => ({
      text: tag.text,
      count: tag.count,
      size: tag.size,
      x: tag.x,
      y: tag.y
    }))
  };
  
  // 确保目录存在
  const outputDir = path.join(__dirname, '../../test-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 保存到文件
  const outputFile = path.join(outputDir, `tag-cloud-test-${tagCount}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(resultData, null, 2));
  
  console.log(`测试数据已保存至: ${outputFile}`);
  
  return {
    tagCount,
    placed: stats.placed,
    overlapPairs,
    outsideBoundary,
    computationTime
  };
}

/**
 * 运行所有测试
 */
function runAllTests() {
  const testCases = [5, 10, 20, 50, 100, 200, 500];
  const cloudRadius = 300; // 固定的标签云半径
  const results = [];
  
  console.log('\n===== 标签云算法性能测试 =====\n');
  
  for (const tagCount of testCases) {
    const result = generateTestData(tagCount, cloudRadius);
    results.push(result);
    console.log('----------------------------');
  }
  
  // 打印结果表格
  console.log('\n===== 测试结果汇总 =====\n');
  console.log('标签数量 | 实际放置 | 重叠对数 | 超出边界 | 计算时间(ms)');
  console.log('--------|----------|----------|----------|-------------');
  
  for (const result of results) {
    console.log(
      `${result.tagCount.toString().padEnd(8)} | ` +
      `${result.placed.toString().padEnd(8)} | ` +
      `${result.overlapPairs.toString().padEnd(8)} | ` +
      `${result.outsideBoundary.toString().padEnd(8)} | ` +
      `${result.computationTime.padEnd(11)}`
    );
  }
  
  console.log('\n测试完成！\n');
}

module.exports = {
  getTagSize,
  checkCollision,
  calculateTagPositions,
  checkTagOverlapsAndBoundaries,
  generateTestTags,
  generateTestData,
  runAllTests
}; 