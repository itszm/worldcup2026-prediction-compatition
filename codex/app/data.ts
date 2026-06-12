export type Team = {
  name: string;
  code: string;
  flag: string;
  advance: number;
  title: number;
  rating: number;
};

export type Group = { id: string; heat: string; teams: Team[] };

export const groups: Group[] = [
  { id: "A", heat: "东道主压力局", teams: [
    { name: "墨西哥", code: "MEX", flag: "🇲🇽", advance: 73, title: 2.1, rating: 81 },
    { name: "韩国", code: "KOR", flag: "🇰🇷", advance: 55, title: 0.7, rating: 77 },
    { name: "捷克", code: "CZE", flag: "🇨🇿", advance: 48, title: 0.5, rating: 76 },
    { name: "南非", code: "RSA", flag: "🇿🇦", advance: 24, title: 0.1, rating: 69 },
  ]},
  { id: "B", heat: "最开放小组", teams: [
    { name: "瑞士", code: "SUI", flag: "🇨🇭", advance: 70, title: 1.7, rating: 81 },
    { name: "加拿大", code: "CAN", flag: "🇨🇦", advance: 55, title: 0.8, rating: 77 },
    { name: "波黑", code: "BIH", flag: "🇧🇦", advance: 50, title: 0.4, rating: 75 },
    { name: "卡塔尔", code: "QAT", flag: "🇶🇦", advance: 25, title: 0.1, rating: 68 },
  ]},
  { id: "C", heat: "强强碰面", teams: [
    { name: "巴西", code: "BRA", flag: "🇧🇷", advance: 91, title: 12.0, rating: 91 },
    { name: "摩洛哥", code: "MAR", flag: "🇲🇦", advance: 72, title: 3.2, rating: 84 },
    { name: "苏格兰", code: "SCO", flag: "🏴", advance: 31, title: 0.3, rating: 74 },
    { name: "海地", code: "HAI", flag: "🇭🇹", advance: 6, title: 0.0, rating: 61 },
  ]},
  { id: "D", heat: "青年风暴", teams: [
    { name: "土耳其", code: "TUR", flag: "🇹🇷", advance: 72, title: 2.2, rating: 82 },
    { name: "美国", code: "USA", flag: "🇺🇸", advance: 69, title: 2.0, rating: 80 },
    { name: "澳大利亚", code: "AUS", flag: "🇦🇺", advance: 35, title: 0.3, rating: 73 },
    { name: "巴拉圭", code: "PAR", flag: "🇵🇾", advance: 24, title: 0.2, rating: 72 },
  ]},
  { id: "E", heat: "德国领跑", teams: [
    { name: "德国", code: "GER", flag: "🇩🇪", advance: 90, title: 9.0, rating: 89 },
    { name: "厄瓜多尔", code: "ECU", flag: "🇪🇨", advance: 69, title: 1.5, rating: 81 },
    { name: "科特迪瓦", code: "CIV", flag: "🇨🇮", advance: 34, title: 0.4, rating: 74 },
    { name: "库拉索", code: "CUW", flag: "🇨🇼", advance: 7, title: 0.0, rating: 62 },
  ]},
  { id: "F", heat: "技术流密集", teams: [
    { name: "荷兰", code: "NED", flag: "🇳🇱", advance: 88, title: 8.0, rating: 88 },
    { name: "日本", code: "JPN", flag: "🇯🇵", advance: 62, title: 1.8, rating: 81 },
    { name: "瑞典", code: "SWE", flag: "🇸🇪", advance: 38, title: 0.6, rating: 76 },
    { name: "突尼斯", code: "TUN", flag: "🇹🇳", advance: 18, title: 0.1, rating: 70 },
  ]},
  { id: "G", heat: "巨星末舞", teams: [
    { name: "比利时", code: "BEL", flag: "🇧🇪", advance: 84, title: 5.0, rating: 86 },
    { name: "埃及", code: "EGY", flag: "🇪🇬", advance: 58, title: 0.8, rating: 78 },
    { name: "伊朗", code: "IRN", flag: "🇮🇷", advance: 48, title: 0.5, rating: 77 },
    { name: "新西兰", code: "NZL", flag: "🇳🇿", advance: 10, title: 0.0, rating: 64 },
  ]},
  { id: "H", heat: "死亡之组", teams: [
    { name: "西班牙", code: "ESP", flag: "🇪🇸", advance: 93, title: 19.0, rating: 94 },
    { name: "乌拉圭", code: "URU", flag: "🇺🇾", advance: 78, title: 5.5, rating: 86 },
    { name: "沙特阿拉伯", code: "KSA", flag: "🇸🇦", advance: 20, title: 0.1, rating: 70 },
    { name: "佛得角", code: "CPV", flag: "🇨🇻", advance: 9, title: 0.0, rating: 65 },
  ]},
  { id: "I", heat: "火力天花板", teams: [
    { name: "法国", code: "FRA", flag: "🇫🇷", advance: 94, title: 17.0, rating: 93 },
    { name: "挪威", code: "NOR", flag: "🇳🇴", advance: 70, title: 4.2, rating: 84 },
    { name: "塞内加尔", code: "SEN", flag: "🇸🇳", advance: 45, title: 0.9, rating: 78 },
    { name: "伊拉克", code: "IRQ", flag: "🇮🇶", advance: 11, title: 0.0, rating: 65 },
  ]},
  { id: "J", heat: "卫冕冠军组", teams: [
    { name: "阿根廷", code: "ARG", flag: "🇦🇷", advance: 93, title: 14.0, rating: 92 },
    { name: "奥地利", code: "AUT", flag: "🇦🇹", advance: 62, title: 1.4, rating: 81 },
    { name: "阿尔及利亚", code: "ALG", flag: "🇩🇿", advance: 36, title: 0.3, rating: 74 },
    { name: "约旦", code: "JOR", flag: "🇯🇴", advance: 9, title: 0.0, rating: 64 },
  ]},
  { id: "K", heat: "边路对轰", teams: [
    { name: "葡萄牙", code: "POR", flag: "🇵🇹", advance: 91, title: 10.0, rating: 90 },
    { name: "哥伦比亚", code: "COL", flag: "🇨🇴", advance: 72, title: 3.6, rating: 84 },
    { name: "刚果（金）", code: "COD", flag: "🇨🇩", advance: 23, title: 0.1, rating: 70 },
    { name: "乌兹别克斯坦", code: "UZB", flag: "🇺🇿", advance: 14, title: 0.1, rating: 68 },
  ]},
  { id: "L", heat: "英克再会", teams: [
    { name: "英格兰", code: "ENG", flag: "🏴", advance: 92, title: 13.0, rating: 92 },
    { name: "克罗地亚", code: "CRO", flag: "🇭🇷", advance: 67, title: 2.5, rating: 83 },
    { name: "加纳", code: "GHA", flag: "🇬🇭", advance: 31, title: 0.3, rating: 73 },
    { name: "巴拿马", code: "PAN", flag: "🇵🇦", advance: 10, title: 0.0, rating: 66 },
  ]},
];

export const bracket = [
  { label: "32 强", matches: [
    ["🇲🇽 墨西哥", "🇨🇦 加拿大", "墨西哥", "2–1"], ["🇦🇷 阿根廷", "🇰🇷 韩国", "阿根廷", "3–1"],
    ["🇫🇷 法国", "🇺🇸 美国", "法国", "2–0"], ["🇧🇷 巴西", "🇯🇵 日本", "巴西", "2–1"],
    ["🏴 英格兰", "🇸🇳 塞内加尔", "英格兰", "2–1"], ["🇪🇸 西班牙", "🇧🇦 波黑", "西班牙", "3–0"],
    ["🇵🇹 葡萄牙", "🇪🇬 埃及", "葡萄牙", "2–1"], ["🇩🇪 德国", "🇨🇿 捷克", "德国", "2–0"],
    ["🇳🇱 荷兰", "🇲🇦 摩洛哥", "荷兰", "1–0"], ["🇧🇪 比利时", "🇨🇭 瑞士", "比利时", "2–1"],
    ["🇨🇴 哥伦比亚", "🇸🇪 瑞典", "哥伦比亚", "1–0"], ["🇺🇾 乌拉圭", "🇦🇹 奥地利", "乌拉圭", "2–1"],
    ["🇪🇨 厄瓜多尔", "🇨🇮 科特迪瓦", "厄瓜多尔", "1–0"], ["🇳🇴 挪威", "🇩🇿 阿尔及利亚", "挪威", "3–1"],
    ["🇭🇷 克罗地亚", "🇮🇷 伊朗", "克罗地亚", "1–0"], ["🇹🇷 土耳其", "🇬🇭 加纳", "土耳其", "2–1"],
  ]},
  { label: "16 强", matches: [
    ["🇲🇽 墨西哥", "🇦🇷 阿根廷", "阿根廷", "1–2"], ["🇫🇷 法国", "🇧🇷 巴西", "法国", "2–1"],
    ["🏴 英格兰", "🇪🇸 西班牙", "西班牙", "1–2"], ["🇵🇹 葡萄牙", "🇩🇪 德国", "德国", "1–2"],
    ["🇳🇱 荷兰", "🇧🇪 比利时", "荷兰", "2–1"], ["🇨🇴 哥伦比亚", "🇺🇾 乌拉圭", "乌拉圭", "1–2"],
    ["🇪🇨 厄瓜多尔", "🇳🇴 挪威", "挪威", "1–2"], ["🇭🇷 克罗地亚", "🇹🇷 土耳其", "土耳其", "1–2"],
  ]},
  { label: "1/4 决赛", matches: [
    ["🇦🇷 阿根廷", "🇫🇷 法国", "法国", "1–2"], ["🇪🇸 西班牙", "🇩🇪 德国", "西班牙", "2–1"],
    ["🇳🇱 荷兰", "🇺🇾 乌拉圭", "荷兰", "2–1"], ["🇳🇴 挪威", "🇹🇷 土耳其", "挪威", "2–1"],
  ]},
  { label: "半决赛", matches: [
    ["🇫🇷 法国", "🇳🇱 荷兰", "法国", "2–1"], ["🇪🇸 西班牙", "🇳🇴 挪威", "西班牙", "3–1"],
  ]},
  { label: "决赛", matches: [["🇫🇷 法国", "🇪🇸 西班牙", "西班牙", "1–2"]] },
];

export const matchLabs = [
  { id: "esp-uru", stage: "H组 · 焦点战", home: "西班牙", away: "乌拉圭", hf: "🇪🇸", af: "🇺🇾", h: [94, 93, 91, 92, 88], a: [86, 84, 88, 85, 87] },
  { id: "fra-nor", stage: "I组 · 火力局", home: "法国", away: "挪威", hf: "🇫🇷", af: "🇳🇴", h: [92, 94, 91, 90, 86], a: [86, 93, 79, 83, 84] },
  { id: "bra-mar", stage: "C组 · 战术局", home: "巴西", away: "摩洛哥", hf: "🇧🇷", af: "🇲🇦", h: [89, 92, 86, 90, 85], a: [86, 82, 89, 84, 88] },
  { id: "eng-cro", stage: "L组 · 宿敌局", home: "英格兰", away: "克罗地亚", hf: "🏴", af: "🇭🇷", h: [91, 91, 89, 92, 84], a: [84, 80, 86, 89, 91] },
];
