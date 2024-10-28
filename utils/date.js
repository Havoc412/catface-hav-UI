function calculateAge(birthday, accuracyFlag = false) {
  const birthDate = new Date(birthday);
  const currentDate = new Date();

  // Calculate the differences in years, months, and days
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust the age when the current month is before the birth month
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months = (months + 12) % 12;
  }

  // Adjust the days when the current day is before the birth day
  if (days < 0) {
    // Get the number of days in the previous month
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const daysInPreviousMonth = previousMonth.getDate();
    days += daysInPreviousMonth;
    // Decrease the months, since we've moved back to the previous month
    if (--months < 0) {
      years--;
      months = 11;
    }
  }

  // OUTPUT 多样化输出
  if (years > 0) {
    if (accuracyFlag && months != 0) return `${years}岁 ${months}个月`;
    else if (!accuracyFlag && months >= 6) return `${years + 1}岁`;
    else return `${years}岁`;
  } else if (months > 0) {
    if (days != 0) return `${months}~${months + 1}个月`;
    else return `${months}个月`;
  } else return `${days}天`;
}

function DayChooseInit(year, month) {
  // 将字符串形式的年月转换为数字
  const selectedYear = parseInt(year.replace("年", ""), 10);
  const selectedMonth = parseInt(month.replace("月", ""), 10);

  // 获取当前日期
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 月份从0开始，所以加1
  
  let days;
  if (selectedYear === currentYear && selectedMonth === currentMonth) {
    // 如果选择的年月与当前年月相同，则生成的日期数组只包含到当前日期
    const currentDay = currentDate.getDate();
    days = Array.from({ length: currentDay }, (_, i) => `${i + 1}日`);
  } else {
    // 创建一个 Date 对象来获取该月的天数
    const date = new Date(selectedYear, selectedMonth, 0);
    const daysInMonth = date.getDate();
    // 否则生成该月的所有日期
    days = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}日`);
  }

  return days.reverse();
}

function MouthChooseInit(year) {
  console.debug(year);
  // 获取当前年份和月份
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const yearInt = parseInt(year.replace("年", ""), 10);

  let months;
  if (yearInt === currentYear) {
    const currentMonth = currentDate.getMonth() + 1; // 月份从0开始，所以加1
    months = Array.from({ length: currentMonth }, (_, i) => `${i + 1}月`);
  } else {
    months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
  }

  // 反转数组，实现从大到小的排列
  return months.reverse();
}

function DateChooseInit() {
  // 获取当前年份
  const currentYear = new Date().getFullYear();
  // 生成年份数组并加上 "年"
  const years = Array.from(
    { length: 20 },
    (_, i) => `${currentYear - i}年`
  );
  // 月份数组并加上 "月"
  const months = MouthChooseInit(`${currentYear}年`)
  // 生成日期数组并加上 "日"
  const days = DayChooseInit(`${currentYear}年`, `${months[0]}月`);

  return [years, months, days];
}

export {
    calculateAge,
    DateChooseInit,  // 第一次，获取今日的逻辑
    MouthChooseInit,
    DayChooseInit,
}
// TEST - 2: DateChooseInit
// console.log(DateChooseInit());
// TEST - 1: calculateAge
// console.log(calculateAge("2010-01-01")); // 应该输出 "13岁"
// console.log(calculateAge("2010-06-01", true)); // 应该输出 "12岁 10个月"
// console.log(calculateAge("2010-07-01")); // 应该输出 "13岁"
// console.log(calculateAge("2022-10-01")); // 应该输出 "2个月"
// console.log(calculateAge("2023-01-01")); // 应该输出 "30天"
// console.log(calculateAge("2024-01-01")); // 应该输出 "0岁"
// console.log(calculateAge("2024-01-01", true)); // 应该输出 "0岁 9个月"
// console.log(calculateAge("2024-05-01")); // 应该输出 "0岁"
// console.log(calculateAge("2024-05-01", true)); // 应该输出 "0岁 5个月"
// console.log(calculateAge("2024-10-13")); // 应该输出 "0天"
// console.log(calculateAge("2023-10-13")); // 应该输出 "1岁"
// console.log(calculateAge("2023-10-13", true)); // 应该输出 "1岁 0个月"
// console.log(calculateAge("2024-01-13")); // 应该输出 "0岁"
// console.log(calculateAge("2024-01-13", true)); // 应该输出 "0岁 8个月"
// console.log(calculateAge("2024-10-12")); // 应该输出 "0天"
// console.log(calculateAge("2024-10-14")); // 应该输出 "2天"  // BUG 输出了 11 ~ 12 个月
