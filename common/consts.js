// TODO 之后这些基础的配置信息，通过 API 从后端换取一遍。

// School Status
export const schoolStatus_ZH = ["不明", "在校", "毕业", "退学", "喵星",];
export const schoolStatus_EN = [
  "unknown",
  "inschool",
  "graduation",
  "missing",
  "catstar",
];

// Sterilization Status
export const sterilizationStatus_ZH = ["不明", "未绝育", "已绝育", ];
export const sterilizationStatus_EN = ["unknown", "unsterilized", "sterilized", ];

// Gender
export const gender_ZH = ["不明", "弟弟", "妹妹", ];
export const gender_EN = ["unknown", "boy", "girl", ];

// Color
export const color_ZH = [
  "不明",
  "橘白",
  "奶牛",
  "白猫",
  "黑猫",
  "橘猫",
  "狸花",
  "狸白",
  "三花",
  "玳瑁",
  "简州",
  "彩狸",
];
export const color_EN = [
  "unknown",
  "orgwhite",
  "milk",
  "white",
  "black",
  "orange",
  "li",
  "liwhite",
  "flower",
  "tortoiseshell",
  "jianzhou",
  "color",
];

// Enconter Level
export const encounterLevel = [
  {
    zh: "日常",
    en: "daily",
    bg: "#F0F0F0",
    font: "#333333"
  },
  {
    zh: "重大",
    en: "serious",
    bg: "#FFD700",
    font: "#000000"
  },
  {
    zh: "标志",
    en: "flag",
    bg: "#FF69B4",
    font: "#FFFFFF"
  },
  {
    zh: "代办",
    en: "todo",
    bg: "#87CEFA",
    font: "#000000"
  },
  {
    zh: "日程",
    en: "schedule",
    bg: "#32CD32",
    font: "#FFFFFF"
  }
];


// Max Data
export const ENCOUNTER_MAX_NUM = 2;
