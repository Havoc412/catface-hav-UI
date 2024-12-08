// TODO 之后这些基础的配置信息，通过 API 从后端换取一遍。

/**
 * @feature '不明' 是一个很特别的存在，在数据库中最好存到 0 位（方便后续扩展），但在前端展示中应该放到最后。
 * 所以就需要前端对此进行一个转换，需要格外注意。
 * 注意 id 从 1 开始，这是 MySQL 中的默认配置，同时与 Go 中 json 的 omitempty 特性是一致的。
 * 
 * 比如下面 Gender，在数据库中存储的就是 { 1：不明，2：学长；3：学姐 } 这样的形式。
 */

// Func； 顶部函数
export const GetZhFields = (array) => {
  return array.map((item) => item.zh);
};
export const GetEnFields = (array) => {
  return array.map((item) => item.en);
};

export function getAttrIndex(value, array) { // UPDATE 目前只是 ZH 版本；
  if (value == '不明')
    return 1;
  return array.indexOf(value) + 2;
}

export function GetFrontIndex(backIndex, arrayLength) {
  if(backIndex == 1)
    return arrayLength - 1;  // 不明在最后
  else
    return backIndex - 2;
}

// Gender
export const Gender = [
  { zh: "学长/弟", color: "#8bc0c6", en: "boy" },
  { zh: "学姐/妹", color: "#ce86ab", en: "girl" },
  { zh: "不明", color: "#988fd0", en: "unknown" },
];

export const Gender_EN = GetEnFields(Gender);
export const Gender_ZH = GetZhFields(Gender);

// School Status
export const SchoolStatus = [
  { zh: "在校", color: "#4caf50", en: "inschool" },
  { zh: "毕业", color: "#47b1ff", en: "graduation" },
  { zh: "退学", color: "#ff9800", en: "missing" },
  { zh: "喵星", color: "#f44336", en: "catstar" },
  { zh: "不明", color: "#988fd0", en: "unknown" },
];

export const SchoolStatus_EN = GetEnFields(SchoolStatus);
export const SchoolStatus_ZH = GetZhFields(SchoolStatus);

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

export const VaccinationStatus_EN = GetEnFields(VaccinationStatus);
export const VaccinationStatus_ZH = GetZhFields(VaccinationStatus);

// Deworming Status
export const DewormingStatus = [
  { zh: "未驱虫", color: "#ff7f50", en: "undewormed" },
  { zh: "已驱虫", color: "#32cd32", en: "dewormed" },
  { zh: "不明", color: "#988fd0", en: "unknown" },
];

export const DewormingStatus_EN = GetEnFields(DewormingStatus);
export const DewormingStatus_ZH = GetZhFields(DewormingStatus);

// Department
export const Department = [ // UPDATE 或许统一白色会比较好。
  { zh: "信部", color: "#32cd32", en: "it" },
  { zh: "医学部", color: "#988fd0", en: "medical" },
  { zh: "工部", color: "#ff6347", en: "engine" },
  { zh: "文理", color: "#4169e1", en: "art" },
  { zh: "湖滨", color: "#20b2aa", en: "lake" },
  { zh: "枫园", color: "#dda0dd", en: "maple" },
  { zh: "网安", color: "#988fd0", en: "net" },
  { zh: "其他", color: "#988fd0", en: "other" },
];

export const DepartmentJava = {  // 目前用于 task/index.vue 中的 Position 部分。
  IT: { zh: "信部" },
  MEDICAL: { zh: "医学部" },
  ENGINE: { zh: "工部" },
  ART: { zh: "文理" },
  LAKE: { zh: "湖滨" },
  MAPLE: { zh: "枫园" },
  NET: { zh: "网安" },
  OTHER: { zh: "其他" },
}

export const Departments_EN = GetEnFields(Department);
export const Departments_ZH = GetZhFields(Department);

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
    bg: "#E3EEFF",
    font: "#333333",
  },
  {
    zh: "重要",
    en: "serious",
    bg: "#FF575F",
    font: "#FFFFFF",
  },
  {
    zh: "标志",
    en: "flag",
    bg: "#FFC542",
    font: "#FFFFFF",
  },
  {
    zh: "代办",
    en: "todo",
    bg: "#FFD700",
    font: "#000000",
  },
  {
    zh: "日程",
    en: "schedule",
    bg: "#32CD32",
    font: "#FFFFFF",
  },
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

// TAG Task level
export const TaskLevelMap = {  // 适配 Java 的返回值形式 // UPDATE 统一
  // INFO 适配当前 Java 后端的返回方式，
  LOW: {
    zh: "一般",
    en: "LOW",
    bg: "#D3D3D3", // 使用灰色表示一般
    font: "#000000",
  },
  MEDIUM: {
    zh: "中等",
    en: "MEDIUM",
    bg: "#FFA500", // 使用橙色表示中等
    font: "#000000",
  },
  HIGH: {
    zh: "紧急",
    en: "HIGH",
    bg: "#FF0000", // 使用红色表示紧急
    font: "#FFFFFF",
  },
};
export const TaskLevel = [
  {
    zh: "一般",
    en: "LOW",
    bg: "#D3D3D3", // 使用灰色表示一般
    font: "#000000",
  },
  {
    zh: "中等",
    en: "MEDIUM",
    bg: "#FFA500", // 使用橙色表示中等
    font: "#000000",
  },
  {
    zh: "紧急",
    en: "HIGH",
    bg: "#FF0000", // 使用红色表示紧急
    font: "#FFFFFF",
  },
]

export const TaskStatus = {
  WAITING: {
    zh: "等待中",
    en: "WAITING",
    bg: "#FFFF00", // 使用黄色表示等待中
    font: "#000000",
  },
  COMPLETED: {
    zh: "已完成",
    en: "COMPLETED",
    bg: "#32CD32", // 使用绿色表示已完成
    font: "#FFFFFF",
  },
  ACCEPTED: {
    zh: "已接取",
    en: "ACCEPTED",
    bg: "#FFD700", // 使用金色表示已接取
    font: "#000000",
  },
  CANCELED: {
    zh: "已取消",
    en: "CANCEL",
    bg: "#808080", // 使用灰色表示已取消
    font: "#FFFFFF",
  },
};

export const Time = [
  [
    "0天", "1天", "2天", "3天"
  ],
  [
    "0小时", "1小时", "2小时", "3小时", "4小时", "5小时", "6小时", "8小时", "10小时", "12小时"
  ],
  [
    "0分钟", "10分钟", "15分钟", "20分钟", "30分钟", "45分钟", "60分钟"
  ]
];

export function formatPT(day, hour, minute) {
  var res = "PT";

  var idx = Time[0].indexOf(day);
  if(idx > 0)
    res += idx + "D";
  idx = Time[1].indexOf(hour);
  if(idx > 0)
    res += idx + "H";
  idx = Time[2].indexOf(minute);
  if (idx > 0) res += idx + "M";

  return res;
}



