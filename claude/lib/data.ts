// 2026 美加墨世界杯数据
// 分组基于 2025-12-05 华盛顿肯尼迪中心最终抽签结果
// 淘汰赛对阵结构(第73–104场)为官方赛程;晋级球队与概率为预测值

export type Team = { id: string; name: string; flag: string };

export const TEAMS: Record<string, Team> = {
  MEX: { id: "MEX", name: "墨西哥", flag: "🇲🇽" },
  RSA: { id: "RSA", name: "南非", flag: "🇿🇦" },
  KOR: { id: "KOR", name: "韩国", flag: "🇰🇷" },
  CZE: { id: "CZE", name: "捷克", flag: "🇨🇿" },
  CAN: { id: "CAN", name: "加拿大", flag: "🇨🇦" },
  BIH: { id: "BIH", name: "波黑", flag: "🇧🇦" },
  QAT: { id: "QAT", name: "卡塔尔", flag: "🇶🇦" },
  SUI: { id: "SUI", name: "瑞士", flag: "🇨🇭" },
  BRA: { id: "BRA", name: "巴西", flag: "🇧🇷" },
  MAR: { id: "MAR", name: "摩洛哥", flag: "🇲🇦" },
  HAI: { id: "HAI", name: "海地", flag: "🇭🇹" },
  SCO: { id: "SCO", name: "苏格兰", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  USA: { id: "USA", name: "美国", flag: "🇺🇸" },
  PAR: { id: "PAR", name: "巴拉圭", flag: "🇵🇾" },
  AUS: { id: "AUS", name: "澳大利亚", flag: "🇦🇺" },
  TUR: { id: "TUR", name: "土耳其", flag: "🇹🇷" },
  GER: { id: "GER", name: "德国", flag: "🇩🇪" },
  CUW: { id: "CUW", name: "库拉索", flag: "🇨🇼" },
  CIV: { id: "CIV", name: "科特迪瓦", flag: "🇨🇮" },
  ECU: { id: "ECU", name: "厄瓜多尔", flag: "🇪🇨" },
  NED: { id: "NED", name: "荷兰", flag: "🇳🇱" },
  JPN: { id: "JPN", name: "日本", flag: "🇯🇵" },
  SWE: { id: "SWE", name: "瑞典", flag: "🇸🇪" },
  TUN: { id: "TUN", name: "突尼斯", flag: "🇹🇳" },
  BEL: { id: "BEL", name: "比利时", flag: "🇧🇪" },
  EGY: { id: "EGY", name: "埃及", flag: "🇪🇬" },
  IRN: { id: "IRN", name: "伊朗", flag: "🇮🇷" },
  NZL: { id: "NZL", name: "新西兰", flag: "🇳🇿" },
  ESP: { id: "ESP", name: "西班牙", flag: "🇪🇸" },
  CPV: { id: "CPV", name: "佛得角", flag: "🇨🇻" },
  KSA: { id: "KSA", name: "沙特阿拉伯", flag: "🇸🇦" },
  URU: { id: "URU", name: "乌拉圭", flag: "🇺🇾" },
  FRA: { id: "FRA", name: "法国", flag: "🇫🇷" },
  SEN: { id: "SEN", name: "塞内加尔", flag: "🇸🇳" },
  IRQ: { id: "IRQ", name: "伊拉克", flag: "🇮🇶" },
  NOR: { id: "NOR", name: "挪威", flag: "🇳🇴" },
  ARG: { id: "ARG", name: "阿根廷", flag: "🇦🇷" },
  ALG: { id: "ALG", name: "阿尔及利亚", flag: "🇩🇿" },
  AUT: { id: "AUT", name: "奥地利", flag: "🇦🇹" },
  JOR: { id: "JOR", name: "约旦", flag: "🇯🇴" },
  POR: { id: "POR", name: "葡萄牙", flag: "🇵🇹" },
  COD: { id: "COD", name: "刚果(金)", flag: "🇨🇩" },
  UZB: { id: "UZB", name: "乌兹别克斯坦", flag: "🇺🇿" },
  COL: { id: "COL", name: "哥伦比亚", flag: "🇨🇴" },
  ENG: { id: "ENG", name: "英格兰", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  CRO: { id: "CRO", name: "克罗地亚", flag: "🇭🇷" },
  GHA: { id: "GHA", name: "加纳", flag: "🇬🇭" },
  PAN: { id: "PAN", name: "巴拿马", flag: "🇵🇦" },
};

// 每组按「预测最终排名」排序;qualProb 为预测晋级淘汰赛概率(%)
export type GroupTeam = { team: string; qualProb: number };
export type Group = { id: string; teams: GroupTeam[] };

export const GROUPS: Group[] = [
  { id: "A", teams: [{ team: "MEX", qualProb: 88 }, { team: "KOR", qualProb: 70 }, { team: "CZE", qualProb: 55 }, { team: "RSA", qualProb: 32 }] },
  { id: "B", teams: [{ team: "SUI", qualProb: 85 }, { team: "CAN", qualProb: 78 }, { team: "BIH", qualProb: 48 }, { team: "QAT", qualProb: 25 }] },
  { id: "C", teams: [{ team: "BRA", qualProb: 96 }, { team: "MAR", qualProb: 80 }, { team: "SCO", qualProb: 45 }, { team: "HAI", qualProb: 12 }] },
  { id: "D", teams: [{ team: "USA", qualProb: 90 }, { team: "TUR", qualProb: 72 }, { team: "PAR", qualProb: 52 }, { team: "AUS", qualProb: 40 }] },
  { id: "E", teams: [{ team: "GER", qualProb: 93 }, { team: "ECU", qualProb: 75 }, { team: "CIV", qualProb: 55 }, { team: "CUW", qualProb: 8 }] },
  { id: "F", teams: [{ team: "NED", qualProb: 92 }, { team: "JPN", qualProb: 78 }, { team: "SWE", qualProb: 56 }, { team: "TUN", qualProb: 30 }] },
  { id: "G", teams: [{ team: "BEL", qualProb: 90 }, { team: "EGY", qualProb: 62 }, { team: "IRN", qualProb: 55 }, { team: "NZL", qualProb: 22 }] },
  { id: "H", teams: [{ team: "ESP", qualProb: 97 }, { team: "URU", qualProb: 82 }, { team: "KSA", qualProb: 35 }, { team: "CPV", qualProb: 15 }] },
  { id: "I", teams: [{ team: "FRA", qualProb: 96 }, { team: "NOR", qualProb: 80 }, { team: "SEN", qualProb: 60 }, { team: "IRQ", qualProb: 10 }] },
  { id: "J", teams: [{ team: "ARG", qualProb: 97 }, { team: "AUT", qualProb: 72 }, { team: "ALG", qualProb: 50 }, { team: "JOR", qualProb: 18 }] },
  { id: "K", teams: [{ team: "POR", qualProb: 94 }, { team: "COL", qualProb: 84 }, { team: "UZB", qualProb: 40 }, { team: "COD", qualProb: 20 }] },
  { id: "L", teams: [{ team: "ENG", qualProb: 95 }, { team: "CRO", qualProb: 76 }, { team: "GHA", qualProb: 42 }, { team: "PAN", qualProb: 18 }] },
];

export type Round = "R32" | "R16" | "QF" | "SF" | "TP" | "F";

export const ROUND_NAMES: Record<Round, string> = {
  R32: "1/16 决赛",
  R16: "1/8 决赛",
  QF: "1/4 决赛",
  SF: "半决赛",
  TP: "季军赛",
  F: "决赛",
};

export type KnockoutMatch = {
  id: number;
  round: Round;
  date: string;
  venue: string;
  home: string;       // 预测主方球队 id
  away: string;       // 预测客方球队 id
  homeSrc: string;    // 名额来源,如 "A1"、"3rd"、"W89"
  awaySrc: string;
  homeProb: number;   // 预测主方晋级概率(%,含加时/点球)
};

// 官方对阵结构(场次/日期/场地/名额来源)+ 预测晋级球队
export const KNOCKOUT: KnockoutMatch[] = [
  // —— 1/16 决赛(32强) 6月28日–7月3日 ——
  { id: 73, round: "R32", date: "6月28日", venue: "洛杉矶", home: "KOR", away: "CAN", homeSrc: "A2", awaySrc: "B2", homeProb: 52 },
  { id: 74, round: "R32", date: "6月29日", venue: "波士顿", home: "GER", away: "CZE", homeSrc: "E1", awaySrc: "3rd", homeProb: 78 },
  { id: 75, round: "R32", date: "6月29日", venue: "蒙特雷", home: "NED", away: "MAR", homeSrc: "F1", awaySrc: "C2", homeProb: 56 },
  { id: 76, round: "R32", date: "6月29日", venue: "休斯敦", home: "BRA", away: "JPN", homeSrc: "C1", awaySrc: "F2", homeProb: 65 },
  { id: 77, round: "R32", date: "6月30日", venue: "纽约新泽西", home: "FRA", away: "SCO", homeSrc: "I1", awaySrc: "3rd", homeProb: 82 },
  { id: 78, round: "R32", date: "6月30日", venue: "达拉斯", home: "ECU", away: "NOR", homeSrc: "E2", awaySrc: "I2", homeProb: 46 },
  { id: 79, round: "R32", date: "6月30日", venue: "墨西哥城", home: "MEX", away: "SWE", homeSrc: "A1", awaySrc: "3rd", homeProb: 58 },
  { id: 80, round: "R32", date: "7月1日", venue: "亚特兰大", home: "ENG", away: "SEN", homeSrc: "L1", awaySrc: "3rd", homeProb: 72 },
  { id: 81, round: "R32", date: "7月1日", venue: "旧金山湾区", home: "USA", away: "BIH", homeSrc: "D1", awaySrc: "3rd", homeProb: 70 },
  { id: 82, round: "R32", date: "7月1日", venue: "西雅图", home: "BEL", away: "CIV", homeSrc: "G1", awaySrc: "3rd", homeProb: 64 },
  { id: 83, round: "R32", date: "7月2日", venue: "多伦多", home: "COL", away: "CRO", homeSrc: "K2", awaySrc: "L2", homeProb: 48 },
  { id: 84, round: "R32", date: "7月2日", venue: "洛杉矶", home: "ESP", away: "AUT", homeSrc: "H1", awaySrc: "J2", homeProb: 76 },
  { id: 85, round: "R32", date: "7月2日", venue: "温哥华", home: "SUI", away: "ALG", homeSrc: "B1", awaySrc: "3rd", homeProb: 62 },
  { id: 86, round: "R32", date: "7月3日", venue: "迈阿密", home: "ARG", away: "URU", homeSrc: "J1", awaySrc: "H2", homeProb: 63 },
  { id: 87, round: "R32", date: "7月3日", venue: "堪萨斯城", home: "POR", away: "PAR", homeSrc: "K1", awaySrc: "3rd", homeProb: 74 },
  { id: 88, round: "R32", date: "7月3日", venue: "达拉斯", home: "TUR", away: "EGY", homeSrc: "D2", awaySrc: "G2", homeProb: 58 },
  // —— 1/8 决赛(16强) 7月4日–7月7日 ——
  { id: 89, round: "R16", date: "7月4日", venue: "费城", home: "GER", away: "FRA", homeSrc: "W74", awaySrc: "W77", homeProb: 45 },
  { id: 90, round: "R16", date: "7月4日", venue: "休斯敦", home: "KOR", away: "NED", homeSrc: "W73", awaySrc: "W75", homeProb: 25 },
  { id: 91, round: "R16", date: "7月5日", venue: "纽约新泽西", home: "BRA", away: "NOR", homeSrc: "W76", awaySrc: "W78", homeProb: 62 },
  { id: 92, round: "R16", date: "7月5日", venue: "墨西哥城", home: "MEX", away: "ENG", homeSrc: "W79", awaySrc: "W80", homeProb: 40 },
  { id: 93, round: "R16", date: "7月6日", venue: "达拉斯", home: "CRO", away: "ESP", homeSrc: "W83", awaySrc: "W84", homeProb: 26 },
  { id: 94, round: "R16", date: "7月6日", venue: "西雅图", home: "USA", away: "BEL", homeSrc: "W81", awaySrc: "W82", homeProb: 45 },
  { id: 95, round: "R16", date: "7月7日", venue: "亚特兰大", home: "ARG", away: "TUR", homeSrc: "W86", awaySrc: "W88", homeProb: 72 },
  { id: 96, round: "R16", date: "7月7日", venue: "温哥华", home: "SUI", away: "POR", homeSrc: "W85", awaySrc: "W87", homeProb: 34 },
  // —— 1/4 决赛 7月9日–7月11日 ——
  { id: 97, round: "QF", date: "7月9日", venue: "波士顿", home: "FRA", away: "NED", homeSrc: "W89", awaySrc: "W90", homeProb: 58 },
  { id: 98, round: "QF", date: "7月10日", venue: "洛杉矶", home: "ESP", away: "BEL", homeSrc: "W93", awaySrc: "W94", homeProb: 68 },
  { id: 99, round: "QF", date: "7月11日", venue: "迈阿密", home: "BRA", away: "ENG", homeSrc: "W91", awaySrc: "W92", homeProb: 48 },
  { id: 100, round: "QF", date: "7月11日", venue: "堪萨斯城", home: "ARG", away: "POR", homeSrc: "W95", awaySrc: "W96", homeProb: 56 },
  // —— 半决赛 ——
  { id: 101, round: "SF", date: "7月14日", venue: "达拉斯", home: "FRA", away: "ESP", homeSrc: "W97", awaySrc: "W98", homeProb: 45 },
  { id: 102, round: "SF", date: "7月15日", venue: "亚特兰大", home: "ENG", away: "ARG", homeSrc: "W99", awaySrc: "W100", homeProb: 45 },
  // —— 季军赛 / 决赛 ——
  { id: 103, round: "TP", date: "7月18日", venue: "迈阿密", home: "FRA", away: "ENG", homeSrc: "败者101", awaySrc: "败者102", homeProb: 52 },
  { id: 104, round: "F", date: "7月19日", venue: "纽约新泽西", home: "ESP", away: "ARG", homeSrc: "W101", awaySrc: "W102", homeProb: 54 },
];

export const KNOCKOUT_BY_ID: Record<number, KnockoutMatch> = Object.fromEntries(
  KNOCKOUT.map((m) => [m.id, m])
);

// 夺冠概率(%)
export const CHAMP_ODDS: { team: string; prob: number }[] = [
  { team: "ESP", prob: 16.5 },
  { team: "FRA", prob: 14.0 },
  { team: "ARG", prob: 12.5 },
  { team: "ENG", prob: 10.5 },
  { team: "BRA", prob: 9.0 },
  { team: "POR", prob: 8.0 },
  { team: "GER", prob: 6.5 },
  { team: "NED", prob: 5.5 },
  { team: "BEL", prob: 3.5 },
  { team: "URU", prob: 2.5 },
  { team: "CRO", prob: 1.8 },
  { team: "COL", prob: 1.7 },
  { team: "MAR", prob: 1.5 },
];

export const OTHERS_PROB = 6.5;

// 金靴候选(%)
export const GOLDEN_BOOT: { name: string; team: string; prob: number }[] = [
  { name: "姆巴佩", team: "FRA", prob: 14 },
  { name: "哈兰德", team: "NOR", prob: 11 },
  { name: "凯恩", team: "ENG", prob: 10 },
  { name: "亚马尔", team: "ESP", prob: 8 },
  { name: "阿尔瓦雷斯", team: "ARG", prob: 7 },
  { name: "梅西", team: "ARG", prob: 5 },
];

// 预测四强
export const FINAL_FOUR = ["ESP", "ARG", "FRA", "ENG"];
