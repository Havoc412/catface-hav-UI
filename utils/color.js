export function setOpacity(color, opacity) {
    // 检查输入的颜色是否为合法的十六进制颜色值
    if (typeof color === 'string' && color.startsWith('#') && color.length === 7) {
        // 将十六进制颜色转换为 RGB 格式
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // 返回带有透明度的 RGBA 颜色字符串
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    } else {
        throw new Error('Invalid color format. Expected #RRGGBB.');
    }
}

// console.log(setOpacity("#00BFFF", 0.5));  // 输出: rgba(0, 191, 255, 0.5)