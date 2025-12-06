// generate-banner.js
const fs = require('fs');
const path = require('path');

// 1. 配置banner文件夹路径（对应你的images/banner）
const bannerDir = path.join(__dirname, 'images', 'banner');
// 2. 要插入轮播图的HTML文件路径
const htmlFilePath = path.join(__dirname, 'index.html');

// 3. 读取banner文件夹里的图片（只保留常见图片格式）
const imageExts = ['.jpg', '.jpeg', '.png', '.gif'];
const bannerImages = fs.readdirSync(bannerDir)
  .filter(file => imageExts.includes(path.extname(file).toLowerCase())) // 只选图片文件
  .map(file => `images/banner/${file}`); // 生成图片的相对路径


// 4. 生成轮播图的HTML代码（动态创建img标签和指示器）
const bannerItemsHTML = bannerImages.map((imgPath, index) => 
  `<img src="${imgPath}" alt="联盛LED轮播图${index+1}" class="banner-item ${index === 0 ? 'active' : ''}">`
).join('\n');

const bannerDotsHTML = bannerImages.map((_, index) => 
  `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
).join('\n');


// 5. 把生成的代码插入到index.html中（替换原来写死的轮播图部分）
let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// 替换轮播图的img区域（匹配<!-- banner-items-start -->和<!-- banner-items-end -->之间的内容）
htmlContent = htmlContent.replace(
  /<!-- banner-items-start -->([\s\S]*?)<!-- banner-items-end -->/,
  `<!-- banner-items-start -->\n${bannerItemsHTML}\n<!-- banner-items-end -->`
);

// 替换指示器区域（匹配<!-- banner-dots-start -->和<!-- banner-dots-end -->之间的内容）
htmlContent = htmlContent.replace(
  /<!-- banner-dots-start -->([\s\S]*?)<!-- banner-dots-end -->/,
  `<!-- banner-items-start -->\n${bannerDotsHTML}\n<!-- banner-dots-end -->`
);


// 6. 保存修改后的index.html
fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log(`✅ 已自动读取banner文件夹的图片，共找到${bannerImages.length}张，已更新轮播图！`);