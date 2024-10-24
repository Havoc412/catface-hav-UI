// TODO 之后这些基础的配置信息，通过 API 从后端换取一遍。

// Func
export const GetZhFields = (array) => {
  return array.map((item) => item.zh);
};
export const GetEnFields = (array) => {
  return array.map((item) => item.en);
};

// School Status
export const SchoolStatus = [
  { zh: "在校", color: "#4caf50", en: "inschool" },
  { zh: "毕业", color: "#4af6ff", en: "graduation" },
  { zh: "退学", color: "#ff9800", en: "missing" },
  { zh: "喵星", color: "#f44336", en: "catstar" },
  { zh: "不明", color: "#988fd0", en: "unknown" },
];

export const SchoolStatus_EN = GetEnFields(SchoolStatus);
export const SchoolStatus_ZH = GetZhFields(SchoolStatus);

// Gender
export const Gender = [
  { zh: "学长/弟", color: "#8bc0c6", en: "boy" },
  { zh: "学姐/妹", color: "#ce86ab", en: "girl" },
  { zh: "不明", color: "#988fd0", en: "unknown" },
];

export const Gender_EN = GetEnFields(Gender);
export const Gender_ZH = GetZhFields(Gender);

// Sterilization Status
export const SterilizationStatus = [
  { zh: "未绝育", color: "#ff7f50", en: "unsterilized" },
  { zh: "已绝育", color: "#32cd32", en: "sterilized" },
  { zh: "不明", color: "#988fd0", en: "unknown" },
];

export const SterilizationStatus_EN = GetEnFields(SterilizationStatus);
export const SterilizationStatus_ZH = GetZhFields(SterilizationStatus);

// Vaccination Status
export const VaccinationStatus = [
  { zh: "未接种", color: "#ff7f50", en: "unvaccinated" },
  { zh: "部分接种", color: "#ffa500", en: "partially_vaccinated" },
  { zh: "完全接种", color: "#32cd32", en: "fully_vaccinated" },
  { zh: "不明", color: "#988fd0", en: "unknown" },
];


// Deworming Status
export const DewormingStatus = [
  { zh: "未驱虫", color: "#ff7f50", en: "undewormed" },
  { zh: "已驱虫", color: "#32cd32", en: "dewormed" },
  { zh: "不明", color: "#988fd0", en: "unknown" },
];

// Color
export const Breed_ZH = [
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
  "不明",
];
export const Breed_EN = [
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
  "unknown",
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
    bg: "#FF69B4",
    font: "#FFFFFF"
  },
  {
    zh: "标志",
    en: "flag",
	bg: "#87CEFA",
    font: "#000000"
  },
  {
    zh: "代办",
    en: "todo",
	bg: "#FFD700",
    font: "#000000"
  },
  {
    zh: "日程",
    en: "schedule",
    bg: "#32CD32",
    font: "#FFFFFF"
  }
];

// Age
export const Age = [
  [
    "0岁",
    "1岁",
    "2岁",
    "3岁",
    "4岁",
    "5岁",
    "6岁",
    "7岁",
    "8岁",
    "9岁",
    "10岁",
    "11岁",
    "12岁",
    "13岁",
    "14岁",
    "15岁",
    "15岁以上",
  ],
  [
    "0个月",
    "1个月",
    "2个月",
    "3个月",
    "4个月",
    "5个月",
    "6个月",
    "7个月",
    "8个月",
    "9个月",
    "10个月",
    "11个月",
    "12个月",
  ],
  ["0周", "1周", "2周", "3周", "4周"],
  ["0天", "1天", "3天", "5天"],
];


// Max Data
export const ENCOUNTER_MAX_NUM = 2;


