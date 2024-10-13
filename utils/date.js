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

export default {
    calculateAge
}

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