/**
 * 从字符串中提取整数 eg. 340rpx -> 340; 50px -> 50
 * @param {string} sizeStr - 待提取整数
 * @param {} sizeStr 
 * @returns 
 */
export function extractIntFromSize(sizeStr) {
    // 正则表达式匹配数字
    // const regex = /(\d+)(rpx|px)/;
    const regex = /^(\d+)/;
    const match = sizeStr.match(regex);

    if (match) {
        // 提取匹配到的第一个捕获组（即数字部分）
        const numericPart = match[1];
        return parseInt(numericPart, 10); // 转换为十进制整数并返回
    } else {
        throw new Error('Invalid size string format');
    }
}

// // TEST 使用示例  // TIP 可以直接用 node 单元测试
// const sizes = ['340rpx', '340px', '50rpx'];
// // const sizes = ["0岁", "1天", "4周"];

// sizes.forEach(size => {
//     try {
//         const intValue = extractIntFromSize(size);
//         console.log(`Extracted integer from '${size}': ${intValue}`);
//     } catch (error) {
//         console.error(error);
//     }
// });

export function stringToNumberArray(str) {
    if (!str) {
      return [];
    }
    // 使用逗号分割字符串，并使用 map 将每个元素转换为数字
    return str.split(',').map(Number);
}

// // // TEST 测试示例
// let result = stringToNumberArray("1,2,3");
// console.log(result); // 输出: [1, 2, 3]
// result = stringToNumberArray("");
// console.log(result);