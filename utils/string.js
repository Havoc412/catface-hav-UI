/**
 * 从字符串中提取整数 eg. 340rpx -> 340; 50px -> 50
 * @param {string} sizeStr - 待提取整数
 * @param {} sizeStr 
 * @returns 
 */
export function extractIntFromSize(sizeStr) {
    // 正则表达式匹配数字
    const regex = /(\d+)(rpx|px)/;
    const match = sizeStr.match(regex);

    if (match) {
        // 提取匹配到的第一个捕获组（即数字部分）
        const numericPart = match[1];
        return parseInt(numericPart, 10); // 转换为十进制整数并返回
    } else {
        throw new Error('Invalid size string format');
    }
}

// TEST 使用示例  // TIP 可以直接用 node 单元测试
// const sizes = ['340rpx', '340px', '50rpx'];

// sizes.forEach(size => {
//     try {
//         const intValue = extractIntFromSize(size);
//         console.log(`Extracted integer from '${size}': ${intValue}`);
//     } catch (error) {
//         console.error(error);
//     }
// });