import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ── VOCAB ─────────────────────────────────────────────────────────────────────
const VOCAB = [
  { lesson: 1, hanzi: "好", pinyin: "hǎo", english: "good; well" },
  { lesson: 1, hanzi: "叫", pinyin: "jiào", english: "to be called; to call" },
  { lesson: 1, hanzi: "名字", pinyin: "míng zi", english: "name" },
  { lesson: 1, hanzi: "你", pinyin: "nǐ", english: "you (informal)" },
  { lesson: 1, hanzi: "什么", pinyin: "shén me", english: "what?" },
  { lesson: 1, hanzi: "我", pinyin: "wǒ", english: "I; me" },
  { lesson: 1, hanzi: "姓", pinyin: "xìng", english: "surname; family name" },
  { lesson: 2, hanzi: "汉语", pinyin: "hàn yǔ", english: "Chinese language" },
  { lesson: 2, hanzi: "他", pinyin: "tā", english: "he; him" },
  { lesson: 2, hanzi: "她", pinyin: "tā", english: "she; her" },
  { lesson: 2, hanzi: "谢谢", pinyin: "xiè xie", english: "thank you" },
  { lesson: 2, hanzi: "学生", pinyin: "xué sheng", english: "student" },
  { lesson: 2, hanzi: "学习", pinyin: "xué xí", english: "to study; to learn" },
  { lesson: 2, hanzi: "学校", pinyin: "xué xiào", english: "school" },
  { lesson: 2, hanzi: "中文", pinyin: "zhōng wén", english: "Chinese (written language)" },
  { lesson: 3, hanzi: "高兴", pinyin: "gāo xìng", english: "happy; glad" },
  { lesson: 3, hanzi: "很", pinyin: "hěn", english: "very; quite" },
  { lesson: 3, hanzi: "哪", pinyin: "nǎ", english: "which?" },
  { lesson: 3, hanzi: "那", pinyin: "nà", english: "that; those" },
  { lesson: 3, hanzi: "人", pinyin: "rén", english: "person; people" },
  { lesson: 3, hanzi: "认识", pinyin: "rèn shi", english: "to know; to recognize" },
  { lesson: 3, hanzi: "谁", pinyin: "shéi", english: "who?" },
  { lesson: 3, hanzi: "是", pinyin: "shì", english: "to be; yes" },
  { lesson: 3, hanzi: "这", pinyin: "zhè", english: "this; these" },
  { lesson: 3, hanzi: "中国", pinyin: "zhōng guó", english: "China" },
  { lesson: 3, hanzi: "中国人", pinyin: "Zhōngguó rén", english: "Chinese" },
  { lesson: 3, hanzi: "法国人", pinyin: "Fǎguó rén", english: "French" },
  { lesson: 3, hanzi: "日本人", pinyin: "Rìběn rén", english: "Japanese" },
  { lesson: 3, hanzi: "韩国人", pinyin: "Hánguó rén", english: "Korean" },
  { lesson: 3, hanzi: "菲律宾人", pinyin: "Fēilǜbīn rén", english: "Filipino" },
  { lesson: 3, hanzi: "法国", pinyin: "Fǎguó", english: "France" },
  { lesson: 3, hanzi: "哪国人", pinyin: "nǎ guó rén", english: "what nationality" },
  { lesson: 3, hanzi: "您", pinyin: "nín", english: "you (polite)" },
  { lesson: 3, hanzi: "也", pinyin: "yě", english: "also; too; as well" },
  { lesson: 4, hanzi: "美国人", pinyin: "Měiguó rén", english: "American" },
  { lesson: 4, hanzi: "美国", pinyin: "Měiguó", english: "America" },
  { lesson: 4, hanzi: "德国人", pinyin: "Déguó rén", english: "German" },
  { lesson: 4, hanzi: "德国", pinyin: "Déguó", english: "Germany" },
  { lesson: 4, hanzi: "西班牙人", pinyin: "Xībānyá rén", english: "Spanish" },
  { lesson: 4, hanzi: "西班牙", pinyin: "Xībānyá", english: "Spain" },
  { lesson: 5, hanzi: "不", pinyin: "bù", english: "not; no" },
  { lesson: 5, hanzi: "的", pinyin: "de", english: "structural particle (of)" },
  { lesson: 5, hanzi: "对不起", pinyin: "duì bu qǐ", english: "I'm sorry; excuse me" },
  { lesson: 5, hanzi: "吗", pinyin: "ma", english: "(question particle)" },
  { lesson: 5, hanzi: "没关系", pinyin: "méi guān xi", english: "it doesn't matter; never mind" },
  { lesson: 5, hanzi: "请", pinyin: "qǐng", english: "please; to invite" },
  { lesson: 5, hanzi: "先生", pinyin: "xiān sheng", english: "Mr.; husband; sir" },
  { lesson: 5, hanzi: "再见", pinyin: "zài jiàn", english: "goodbye" },
  { lesson: 5, hanzi: "快递", pinyin: "kuàidì", english: "express mail" },
  { lesson: 5, hanzi: "邮递员", pinyin: "yóudìyuán", english: "mailman" },
  { lesson: 5, hanzi: "请问", pinyin: "qǐngwèn", english: "may I ask / excuse me" },
  { lesson: 6, hanzi: "老师", pinyin: "lǎo shī", english: "teacher" },
  { lesson: 6, hanzi: "小姐", pinyin: "xiǎo jie", english: "Miss; young lady" },
  { lesson: 6, hanzi: "医生", pinyin: "yī shēng", english: "doctor; physician" },
  { lesson: 6, hanzi: "女士", pinyin: "nǚshì", english: "Ms. / Lady" },
  { lesson: 6, hanzi: "大夫", pinyin: "dàifu", english: "doctor; medical practitioner" },
  { lesson: 6, hanzi: "经理", pinyin: "jīng lǐ", english: "manager; director" },
  { lesson: 7, hanzi: "工作", pinyin: "gōng zuò", english: "work; job" },
  { lesson: 7, hanzi: "家", pinyin: "jiā", english: "home; family" },
  { lesson: 7, hanzi: "做", pinyin: "zuò", english: "to do; to make" },
  { lesson: 7, hanzi: "非常", pinyin: "fēi cháng", english: "very; extremely; unusual" },
  { lesson: 7, hanzi: "忙", pinyin: "máng", english: "busy" },
  { lesson: 7, hanzi: "最", pinyin: "zuì", english: "most; -est (superlative)" },
  { lesson: 7, hanzi: "司机", pinyin: "sī jī", english: "driver; chauffeur" },
  { lesson: 8, hanzi: "秘书", pinyin: "mìshū", english: "secretary" },
  { lesson: 8, hanzi: "厨师", pinyin: "chúshī", english: "chef" },
  { lesson: 8, hanzi: "运动员", pinyin: "yùndòngyuán", english: "athlete" },
  { lesson: 8, hanzi: "记者", pinyin: "jìzhě", english: "reporter / journalist" },
  { lesson: 8, hanzi: "家庭主妇", pinyin: "jiātíng zhǔfù", english: "housewife" },
  { lesson: 8, hanzi: "家庭", pinyin: "jiātíng", english: "family / household" },
  { lesson: 8, hanzi: "主妇", pinyin: "zhǔfù", english: "housewife / hostess" },
  { lesson: 8, hanzi: "服务", pinyin: "fúwù", english: "service / to serve" },
  { lesson: 8, hanzi: "律师", pinyin: "lǜshī", english: "lawyer" },
  { lesson: 8, hanzi: "辛苦", pinyin: "xīnkǔ", english: "hard / laborious / to work hard" },
  { lesson: 8, hanzi: "服务员", pinyin: "fú wù yuán", english: "waiter; attendant" },
  { lesson: 8, hanzi: "快乐", pinyin: "kuài lè", english: "happy; merry" },
  { lesson: 8, hanzi: "累", pinyin: "lèi", english: "tired; weary" },
  { lesson: 8, hanzi: "运动", pinyin: "yùn dòng", english: "exercise; sport; movement" },
  { lesson: 9, hanzi: "吃", pinyin: "chī", english: "to eat" },
  { lesson: 9, hanzi: "都", pinyin: "dōu", english: "all; both; entirely" },
  { lesson: 9, hanzi: "呢", pinyin: "ne", english: "(question particle)" },
  { lesson: 9, hanzi: "睡觉", pinyin: "shuì jiào", english: "to sleep; to go to bed" },
  { lesson: 9, hanzi: "喜欢", pinyin: "xǐ huan", english: "to like; to be fond of" },
  { lesson: 9, hanzi: "唱歌", pinyin: "chàng gē", english: "to sing a song" },
  { lesson: 9, hanzi: "打篮球", pinyin: "dǎ lán qiú", english: "to play basketball" },
  { lesson: 9, hanzi: "踢足球", pinyin: "tī zú qiú", english: "to play soccer" },
  { lesson: 9, hanzi: "打", pinyin: "dǎ", english: "to play" },
  { lesson: 9, hanzi: "篮球", pinyin: "lán qiú", english: "basketball" },
  { lesson: 9, hanzi: "上网", pinyin: "shàng wǎng", english: "to go online; to surf the Internet" },
  { lesson: 10, hanzi: "本", pinyin: "běn", english: "(classifier for books); origin" },
  { lesson: 10, hanzi: "茶", pinyin: "chá", english: "tea" },
  { lesson: 10, hanzi: "电视", pinyin: "diàn shì", english: "television; TV" },
  { lesson: 10, hanzi: "电影", pinyin: "diàn yǐng", english: "movie; film" },
  { lesson: 10, hanzi: "读", pinyin: "dú", english: "to read; to study" },
  { lesson: 10, hanzi: "喝", pinyin: "hē", english: "to drink" },
  { lesson: 10, hanzi: "看", pinyin: "kàn", english: "to look at; to watch" },
  { lesson: 10, hanzi: "看见", pinyin: "kàn jiàn", english: "to see; to catch sight of" },
  { lesson: 10, hanzi: "书", pinyin: "shū", english: "book" },
  { lesson: 10, hanzi: "听", pinyin: "tīng", english: "to listen; to hear" },
  { lesson: 10, hanzi: "写", pinyin: "xiě", english: "to write" },
  { lesson: 10, hanzi: "报纸", pinyin: "bào zhǐ", english: "newspaper" },
  { lesson: 10, hanzi: "音乐", pinyin: "yīn yuè", english: "music" },
  { lesson: 11, hanzi: "爸爸", pinyin: "bà ba", english: "father" },
  { lesson: 11, hanzi: "多", pinyin: "duō", english: "many; much; a lot" },
  { lesson: 11, hanzi: "个", pinyin: "gè", english: "(general classifier)" },
  { lesson: 11, hanzi: "妈妈", pinyin: "mā ma", english: "mother; mom" },
  { lesson: 11, hanzi: "没有", pinyin: "méi yǒu", english: "don't have; there is not" },
  { lesson: 11, hanzi: "漂亮", pinyin: "piào liang", english: "pretty; beautiful" },
  { lesson: 11, hanzi: "衣服", pinyin: "yī fu", english: "clothes; clothing" },
  { lesson: 11, hanzi: "有", pinyin: "yǒu", english: "to have; there is" },
  { lesson: 11, hanzi: "哥哥", pinyin: "gē ge", english: "older brother" },
  { lesson: 11, hanzi: "姐姐", pinyin: "jiě jie", english: "older sister" },
  { lesson: 12, hanzi: "八", pinyin: "bā", english: "eight" },
  { lesson: 12, hanzi: "二", pinyin: "èr", english: "two" },
  { lesson: 12, hanzi: "几", pinyin: "jǐ", english: "how many; several" },
  { lesson: 12, hanzi: "九", pinyin: "jiǔ", english: "nine" },
  { lesson: 12, hanzi: "六", pinyin: "liù", english: "six" },
  { lesson: 12, hanzi: "七", pinyin: "qī", english: "seven" },
  { lesson: 12, hanzi: "三", pinyin: "sān", english: "three" },
  { lesson: 12, hanzi: "十", pinyin: "shí", english: "ten" },
  { lesson: 12, hanzi: "四", pinyin: "sì", english: "four" },
  { lesson: 12, hanzi: "五", pinyin: "wǔ", english: "five" },
  { lesson: 12, hanzi: "一", pinyin: "yī", english: "one" },
  { lesson: 12, hanzi: "弟弟", pinyin: "dì di", english: "younger brother" },
  { lesson: 12, hanzi: "两", pinyin: "liǎng", english: "two (quantity); both" },
  { lesson: 12, hanzi: "零", pinyin: "líng", english: "zero; nought" },
  { lesson: 12, hanzi: "妹妹", pinyin: "mèi mei", english: "younger sister" },
  { lesson: 12, hanzi: "口", pinyin: "kǒu", english: "mouth; opening; classifier for people" },
  { lesson: 13, hanzi: "里", pinyin: "lǐ", english: "inside; interior" },
  { lesson: 13, hanzi: "哪儿", pinyin: "nǎ er", english: "where?" },
  { lesson: 13, hanzi: "上", pinyin: "shàng", english: "on; above; upper" },
  { lesson: 13, hanzi: "下", pinyin: "xià", english: "below; under; next" },
  { lesson: 13, hanzi: "在", pinyin: "zài", english: "at; in; on; to be present" },
  { lesson: 13, hanzi: "桌子", pinyin: "zhuō zi", english: "table; desk" },
  { lesson: 13, hanzi: "旁边", pinyin: "páng biān", english: "beside; next to; side" },
  { lesson: 13, hanzi: "妻子", pinyin: "qī zi", english: "wife" },
  { lesson: 13, hanzi: "丈夫", pinyin: "zhàng fu", english: "husband" },
  { lesson: 13, hanzi: "钥匙", pinyin: "yàoshi", english: "key" },
  { lesson: 13, hanzi: "沙发", pinyin: "shāfā", english: "sofa" },
  { lesson: 13, hanzi: "下边", pinyin: "xiàbiān", english: "under / below / underneath" },
  { lesson: 13, hanzi: "电话", pinyin: "diànhuà", english: "telephone / phone call" },
  { lesson: 13, hanzi: "手", pinyin: "shǒu", english: "hand" },
  { lesson: 14, hanzi: "电脑", pinyin: "diàn nǎo", english: "computer" },
  { lesson: 14, hanzi: "后面", pinyin: "hòu miàn", english: "behind; at the back" },
  { lesson: 14, hanzi: "前面", pinyin: "qián miàn", english: "ahead; in front" },
  { lesson: 14, hanzi: "椅子", pinyin: "yǐ zi", english: "chair" },
  { lesson: 14, hanzi: "外", pinyin: "wài", english: "outside; foreign; external" },
  { lesson: 14, hanzi: "右边", pinyin: "yòu bian", english: "right side; right-hand side" },
  { lesson: 14, hanzi: "左边", pinyin: "zuǒ bian", english: "left side; left-hand side" },
  { lesson: 14, hanzi: "餐桌", pinyin: "cānzhuō", english: "dining table" },
  { lesson: 14, hanzi: "书柜", pinyin: "shūguì", english: "bookcase" },
  { lesson: 14, hanzi: "衣柜", pinyin: "yīguì", english: "wardrobe / closet" },
  { lesson: 14, hanzi: "外面", pinyin: "wàimiàn", english: "outside" },
  { lesson: 15, hanzi: "怎么", pinyin: "zěn me", english: "how; in what way" },
  { lesson: 15, hanzi: "怎么样", pinyin: "zěn me yàng", english: "how is it? how are things?" },
  { lesson: 15, hanzi: "没", pinyin: "méi", english: "not (denying)" },
  { lesson: 15, hanzi: "白", pinyin: "bái", english: "white; blank; pure" },
  { lesson: 15, hanzi: "穿", pinyin: "chuān", english: "to wear; to put on" },
  { lesson: 15, hanzi: "红", pinyin: "hóng", english: "red" },
  { lesson: 15, hanzi: "颜色", pinyin: "yán sè", english: "color" },
  { lesson: 15, hanzi: "蓝", pinyin: "lán", english: "blue" },
  { lesson: 15, hanzi: "绿", pinyin: "lǜ", english: "green" },
  { lesson: 15, hanzi: "裙子", pinyin: "qún zi", english: "skirt" },
  { lesson: 15, hanzi: "条", pinyin: "tiáo", english: "(classifier for long/thin objects)" },
  { lesson: 16, hanzi: "黑", pinyin: "hēi", english: "black; dark" },
  { lesson: 16, hanzi: "手机", pinyin: "shǒu jī", english: "cell phone; mobile phone" },
  { lesson: 16, hanzi: "棕色", pinyin: "zōngsè", english: "brown" },
  { lesson: 16, hanzi: "鞋", pinyin: "xié", english: "shoe(s)" },
  { lesson: 16, hanzi: "灰色", pinyin: "huīsè", english: "gray" },
  { lesson: 16, hanzi: "衬衣", pinyin: "chènyī", english: "shirt / blouse" },
  { lesson: 16, hanzi: "旗袍", pinyin: "qípáo", english: "qipao / cheongsam" },
  { lesson: 16, hanzi: "运动鞋", pinyin: "yùndòngxié", english: "sneakers / sports shoes" },
  { lesson: 16, hanzi: "橙色", pinyin: "chéngsè", english: "orange (color)" },
  { lesson: 16, hanzi: "粉色", pinyin: "fěnsè", english: "pink" },
  { lesson: 16, hanzi: "粉红色", pinyin: "fěnhóngsè", english: "pink" },
  { lesson: 16, hanzi: "衬衫", pinyin: "chèn shān", english: "shirt; blouse" },
  { lesson: 16, hanzi: "裤子", pinyin: "kù zi", english: "trousers; pants" },
  { lesson: 16, hanzi: "舒服", pinyin: "shū fu", english: "comfortable; at ease" },
  { lesson: 16, hanzi: "双", pinyin: "shuāng", english: "pair; double; twin; both" },
  { lesson: 17, hanzi: "年", pinyin: "nián", english: "year" },
  { lesson: 17, hanzi: "星期", pinyin: "xīng qī", english: "week; day of the week" },
  { lesson: 17, hanzi: "月", pinyin: "yuè", english: "month; moon" },
  { lesson: 17, hanzi: "日", pinyin: "rì", english: "day; sun; date" },
  { lesson: 17, hanzi: "传统", pinyin: "chuántǒng", english: "tradition / traditional" },
  { lesson: 17, hanzi: "哪些", pinyin: "nǎxiē", english: "which / who (plural) / which ones" },
  { lesson: 17, hanzi: "春节", pinyin: "Chūnjié", english: "Spring Festival / Chinese New Year" },
  { lesson: 17, hanzi: "元宵节", pinyin: "Yuánxiāojié", english: "Lantern Festival" },
  { lesson: 17, hanzi: "中秋节", pinyin: "Zhōngqiūjié", english: "Mid-Autumn Festival" },
  { lesson: 17, hanzi: "农历", pinyin: "nónglì", english: "lunar calendar" },
  { lesson: 17, hanzi: "情人节", pinyin: "Qíngrénjié", english: "Valentine's Day" },
  { lesson: 17, hanzi: "天", pinyin: "tiān", english: "sky / day" },
  { lesson: 17, hanzi: "节日", pinyin: "jié rì", english: "holiday; festival" },
  { lesson: 18, hanzi: "号", pinyin: "hào", english: "day of month; number" },
  { lesson: 18, hanzi: "今天", pinyin: "jīn tiān", english: "today" },
  { lesson: 18, hanzi: "明天", pinyin: "míng tiān", english: "tomorrow" },
  { lesson: 18, hanzi: "昨天", pinyin: "zuó tiān", english: "yesterday" },
  { lesson: 18, hanzi: "劳动节", pinyin: "Láodòngjié", english: "Labor Day" },
  { lesson: 18, hanzi: "复活节", pinyin: "Fùhuójié", english: "Easter" },
  { lesson: 18, hanzi: "父亲节", pinyin: "Fùqīnjié", english: "Father's Day" },
  { lesson: 18, hanzi: "母亲节", pinyin: "Mǔqīnjié", english: "Mother's Day" },
  { lesson: 18, hanzi: "一月", pinyin: "yīyuè", english: "January" },
  { lesson: 18, hanzi: "二月", pinyin: "èryuè", english: "February" },
  { lesson: 18, hanzi: "三月", pinyin: "sānyuè", english: "March" },
  { lesson: 18, hanzi: "四月", pinyin: "sìyuè", english: "April" },
  { lesson: 18, hanzi: "五月", pinyin: "wǔyuè", english: "May" },
  { lesson: 18, hanzi: "六月", pinyin: "liùyuè", english: "June" },
  { lesson: 18, hanzi: "七月", pinyin: "qīyuè", english: "July" },
  { lesson: 18, hanzi: "八月", pinyin: "bāyuè", english: "August" },
  { lesson: 18, hanzi: "九月", pinyin: "jiǔyuè", english: "September" },
  { lesson: 18, hanzi: "十月", pinyin: "shíyuè", english: "October" },
  { lesson: 18, hanzi: "十一月", pinyin: "shíyīyuè", english: "November" },
  { lesson: 18, hanzi: "十二月", pinyin: "shíèryuè", english: "December" },
  { lesson: 18, hanzi: "星期一", pinyin: "xīngqīyī", english: "Monday" },
  { lesson: 18, hanzi: "星期二", pinyin: "xīngqīèr", english: "Tuesday" },
  { lesson: 18, hanzi: "星期三", pinyin: "xīngqīsān", english: "Wednesday" },
  { lesson: 18, hanzi: "星期四", pinyin: "xīngqīsì", english: "Thursday" },
  { lesson: 18, hanzi: "星期五", pinyin: "xīngqīwǔ", english: "Friday" },
  { lesson: 18, hanzi: "星期六", pinyin: "xīngqīliù", english: "Saturday" },
  { lesson: 18, hanzi: "星期日", pinyin: "xīngqīrì", english: "Sunday" },
  { lesson: 18, hanzi: "星期天", pinyin: "xīngqītiān", english: "Sunday" },
  { lesson: 19, hanzi: "杯子", pinyin: "bēi zi", english: "cup; glass" },
  { lesson: 19, hanzi: "大", pinyin: "dà", english: "big; large" },
  { lesson: 19, hanzi: "块", pinyin: "kuài", english: "yuan (money unit); piece" },
  { lesson: 19, hanzi: "热", pinyin: "rè", english: "hot; heat" },
  { lesson: 19, hanzi: "小", pinyin: "xiǎo", english: "small; young" },
  { lesson: 19, hanzi: "面条", pinyin: "miàn tiáo", english: "noodles" },
  { lesson: 19, hanzi: "要", pinyin: "yào", english: "to want; will; must" },
  { lesson: 19, hanzi: "再", pinyin: "zài", english: "again; once more" },
  { lesson: 19, hanzi: "辣", pinyin: "là", english: "spicy" },
  { lesson: 19, hanzi: "豆浆", pinyin: "dòujiāng", english: "soy milk" },
  { lesson: 19, hanzi: "凉", pinyin: "liáng", english: "cold" },
  { lesson: 19, hanzi: "刷卡", pinyin: "shuākǎ", english: "to swipe a card / to pay by card" },
  { lesson: 19, hanzi: "还是", pinyin: "hái shì", english: "or; still; had better" },
  { lesson: 19, hanzi: "碗", pinyin: "wǎn", english: "bowl" },
  { lesson: 19, hanzi: "一共", pinyin: "yī gòng", english: "altogether; in total" },
  { lesson: 19, hanzi: "元", pinyin: "yuán", english: "yuan (unit of money)" },
  { lesson: 20, hanzi: "米饭", pinyin: "mǐ fàn", english: "(cooked) rice" },
  { lesson: 20, hanzi: "水", pinyin: "shuǐ", english: "water" },
  { lesson: 20, hanzi: "咖啡", pinyin: "kā fēi", english: "coffee" },
  { lesson: 20, hanzi: "汉堡", pinyin: "hànbǎo", english: "hamburger" },
  { lesson: 20, hanzi: "比萨饼", pinyin: "bǐsàbǐng", english: "pizza" },
  { lesson: 20, hanzi: "咸", pinyin: "xián", english: "salty" },
  { lesson: 20, hanzi: "斤", pinyin: "jīn", english: "half a kilogram" },
  { lesson: 20, hanzi: "饺子", pinyin: "jiǎozi", english: "dumplings" },
  { lesson: 20, hanzi: "羊肉", pinyin: "yángròu", english: "mutton / lamb" },
  { lesson: 20, hanzi: "猪肉", pinyin: "zhūròu", english: "pork" },
  { lesson: 20, hanzi: "牛肉", pinyin: "niúròu", english: "beef" },
  { lesson: 20, hanzi: "瓶", pinyin: "píng", english: "bottle" },
  { lesson: 20, hanzi: "可乐", pinyin: "kělè", english: "cola" },
  { lesson: 20, hanzi: "公斤", pinyin: "gōng jīn", english: "kilogram" },
  { lesson: 20, hanzi: "甜", pinyin: "tián", english: "sweet" },
  { lesson: 21, hanzi: "多少", pinyin: "duō shǎo", english: "how much; how many" },
  { lesson: 21, hanzi: "苹果", pinyin: "píng guǒ", english: "apple" },
  { lesson: 21, hanzi: "钱", pinyin: "qián", english: "money" },
  { lesson: 21, hanzi: "给", pinyin: "gěi", english: "to give; for; to" },
  { lesson: 21, hanzi: "为什么", pinyin: "wèi shén me", english: "why? for what reason?" },
  { lesson: 21, hanzi: "西红柿", pinyin: "xīhóngshì", english: "tomato" },
  { lesson: 21, hanzi: "姑娘", pinyin: "gūniang", english: "girl / young woman" },
  { lesson: 21, hanzi: "草莓", pinyin: "cǎoméi", english: "strawberry" },
  { lesson: 21, hanzi: "和", pinyin: "hé", english: "and / with" },
  { lesson: 21, hanzi: "姑妈", pinyin: "gūmā", english: "paternal aunt (father's sister)" },
  { lesson: 21, hanzi: "就", pinyin: "jiù", english: "exactly / precisely / just" },
  { lesson: 21, hanzi: "角", pinyin: "jiǎo", english: "1/10 of a yuan" },
  { lesson: 21, hanzi: "分", pinyin: "fēn", english: "cent / 1/100 of a yuan" },
  { lesson: 22, hanzi: "鸡蛋", pinyin: "jī dàn", english: "egg; hen's egg" },
  { lesson: 22, hanzi: "卖", pinyin: "mài", english: "to sell" },
  { lesson: 22, hanzi: "牛奶", pinyin: "niú nǎi", english: "milk" },
  { lesson: 22, hanzi: "鱼", pinyin: "yú", english: "fish" },
  { lesson: 22, hanzi: "葡萄", pinyin: "pútáo", english: "grapes" },
  { lesson: 22, hanzi: "牛", pinyin: "niú", english: "cow / ox" },
  { lesson: 22, hanzi: "巧克力", pinyin: "qiǎokèlì", english: "chocolate" },
  { lesson: 22, hanzi: "奶酪", pinyin: "nǎilào", english: "cheese" },
  { lesson: 22, hanzi: "面包", pinyin: "miàn bāo", english: "bread" },
  { lesson: 22, hanzi: "香蕉", pinyin: "xiāng jiāo", english: "banana" },
  { lesson: 22, hanzi: "怎么", pinyin: "zěn me", english: "how; in what way" },
  { lesson: 23, hanzi: "往", pinyin: "wǎng", english: "towards; in the direction of" },
  { lesson: 23, hanzi: "走", pinyin: "zǒu", english: "to walk; to go; to leave" },
  { lesson: 23, hanzi: "前", pinyin: "qián", english: "front" },
  { lesson: 23, hanzi: "北", pinyin: "běi", english: "north" },
  { lesson: 23, hanzi: "右", pinyin: "yòu", english: "right (direction)" },
  { lesson: 23, hanzi: "左", pinyin: "zuǒ", english: "left (direction)" },
  { lesson: 23, hanzi: "火车站", pinyin: "huǒchēzhàn", english: "railway station" },
  { lesson: 23, hanzi: "候车", pinyin: "hòuchē", english: "to wait for a bus/train" },
  { lesson: 23, hanzi: "第", pinyin: "dì", english: "indicating ordinal numbers" },
  { lesson: 23, hanzi: "路口", pinyin: "lùkǒu", english: "intersection / crossing" },
  { lesson: 23, hanzi: "拐", pinyin: "guǎi", english: "to turn" },
  { lesson: 23, hanzi: "邮局", pinyin: "yóujú", english: "post office" },
  { lesson: 23, hanzi: "电影院", pinyin: "diànyǐngyuàn", english: "cinema / movie theater" },
  { lesson: 23, hanzi: "楼", pinyin: "lóu", english: "building; floor; storey" },
  { lesson: 23, hanzi: "一直", pinyin: "yī zhí", english: "always; all along; straight" },
  { lesson: 23, hanzi: "银行", pinyin: "yín háng", english: "bank (financial institution)" },
  { lesson: 24, hanzi: "饭店", pinyin: "fàn diàn", english: "restaurant; hotel" },
  { lesson: 24, hanzi: "商店", pinyin: "shāng diàn", english: "shop; store" },
  { lesson: 24, hanzi: "医院", pinyin: "yī yuàn", english: "hospital" },
  { lesson: 24, hanzi: "高", pinyin: "gāo", english: "high; tall" },
  { lesson: 24, hanzi: "对面", pinyin: "duìmiàn", english: "opposite / across from" },
  { lesson: 24, hanzi: "地铁站", pinyin: "dìtiězhàn", english: "subway station / metro station" },
  { lesson: 24, hanzi: "超市", pinyin: "chāo shì", english: "supermarket" },
  { lesson: 24, hanzi: "地铁", pinyin: "dì tiě", english: "subway; metro" },
  { lesson: 24, hanzi: "东", pinyin: "dōng", english: "east" },
  { lesson: 24, hanzi: "南", pinyin: "nán", english: "south" },
  { lesson: 24, hanzi: "西", pinyin: "xī", english: "west" },
  { lesson: 24, hanzi: "北京", pinyin: "Běijīng", english: "Beijing" },
  { lesson: 24, hanzi: "学校", pinyin: "xué xiào", english: "school" },
  { lesson: 25, hanzi: "坐", pinyin: "zuò", english: "to sit; to travel by" },
  { lesson: 25, hanzi: "上班", pinyin: "shàng bān", english: "to go to work" },
  { lesson: 25, hanzi: "公共", pinyin: "gōng gòng", english: "public" },
  { lesson: 25, hanzi: "走路", pinyin: "zǒulù", english: "to walk" },
  { lesson: 25, hanzi: "开车", pinyin: "kāichē", english: "to drive (a car)" },
  { lesson: 25, hanzi: "汽车", pinyin: "qìchē", english: "automobile / car" },
  { lesson: 25, hanzi: "自行车", pinyin: "zìxíngchē", english: "bicycle" },
  { lesson: 25, hanzi: "周末", pinyin: "zhōumò", english: "weekend" },
  { lesson: 25, hanzi: "打算", pinyin: "dǎ suàn", english: "to plan; to intend; plan" },
  { lesson: 25, hanzi: "环境", pinyin: "huán jìng", english: "environment; surroundings" },
  { lesson: 25, hanzi: "骑", pinyin: "qí", english: "to ride (bike/horse)" },
  { lesson: 25, hanzi: "世界", pinyin: "shì jiè", english: "world" },
  { lesson: 25, hanzi: "同事", pinyin: "tóng shì", english: "colleague; coworker" },
];

// ── GRAMMAR CARDS ─────────────────────────────────────────────────────────────
const GRAMMAR = [
  {
    lesson: 1,
    topic: "Basic Sentence Structure & Questions",
    pattern: "Subject + Verb + Object\nSubject + 叫 + 什么名字？",
    front: "1. 我叫王方。\n2. 你叫什么名字？\n3. 我姓林，叫林木。",
    back: "1. Wǒ jiào Wáng Fāng.\n2. Nǐ jiào shénme míngzi?\n3. Wǒ xìng Lín, jiào Lín Mù.",
    tip: "",
  },
  {
    lesson: 2,
    topic: "Basic Sentence Structure & Questions (Review)",
    pattern: "Subject + Verb + Object\nSubject + 叫 + 什么名字？",
    front: "4. 他叫什么？\n5. 我是马克。\n6. 你是谁？",
    back: "4. Tā jiào shénme?\n5. Wǒ shì Mǎ Kè.\n6. Nǐ shì shéi?",
    tip: "Question words like 什么 and 谁 do not move to the front of the sentence. You just replace the answer with the question word in the exact same spot!",
  },
  {
    lesson: 3,
    topic: "The Adverb 'Also / Too' (也)",
    pattern: "Subject + 也 + Verb/Adj",
    front: "1. 他也是中国人。\n2. 认识您我也很高兴。\n3. 王方也是中国人。",
    back: "1. Tā yě shì Zhōngguórén.\n2. Rènshi nín wǒ yě hěn gāoxìng.\n3. Wáng Fāng yě shì Zhōngguórén.",
    tip: "",
  },
  {
    lesson: 4,
    topic: "The Adverb 'Also / Too' (也) — Review",
    pattern: "Subject + 也 + Verb/Adj",
    front: "4. 我也是学生。\n5. 她也是老师。\n6. 你也是中国人吗？",
    back: "4. Wǒ yě shì xuésheng.\n5. Tā yě shì lǎoshī.\n6. Nǐ yě shì Zhōngguórén ma?",
    tip: "也 (yě) CANNOT be put at the very end of a sentence like the English word 'too'. It must be placed strictly before the verb.",
  },
  {
    lesson: 5,
    topic: "Yes/No Questions (吗), Negation (不)",
    pattern: "Statement + 吗？\nSubject + 不 + Verb",
    front: "1. 您是木先生吗？\n2. 这不是我的快递。\n3. 这是您的快递。",
    back: "1. Nín shì Mù xiānsheng ma?\n2. Zhè bú shì wǒ de kuàidí.\n3. Zhè shì nín de kuàidí.",
    tip: "",
  },
  {
    lesson: 6,
    topic: "Yes/No Questions (吗), Negation (不) — Review",
    pattern: "Statement + 吗？\nSubject + 不 + Verb",
    front: "4. 他不是我的老师。\n5. 你是北京人吗？\n6. 这不是你的书。",
    back: "4. Tā bú shì wǒ de lǎoshī.\n5. Nǐ shì Běijīngrén ma?\n6. Zhè bú shì nǐ de shū.",
    tip: "Never use 吗 with question words (like 什么 or 谁). Also, 不 (bù) changes to rising 2nd tone (bú) when placed before a 4th tone word like 是 (shì).",
  },
  {
    lesson: 7,
    topic: "Adjective Predicates & A-not-A Questions",
    pattern: "Subject + 很 + Adjective\nSubject + Adj + 不 + Adj？",
    front: "1. 他很忙。\n2. 她忙不忙？\n3. 他非常忙。",
    back: "1. Tā hěn máng.\n2. Tā máng bu máng?\n3. Tā fēicháng máng.",
    tip: "",
  },
  {
    lesson: 8,
    topic: "Adjective Predicates & A-not-A Questions — Review",
    pattern: "Subject + 很 + Adjective\nSubject + Adj + 不 + Adj？",
    front: "4. 他很高。\n5. 我很好。\n6. 你累不累？",
    back: "4. Tā hěn gāo.\n5. Wǒ hěn hǎo.\n6. Nǐ lèi bu lèi?",
    tip: "Do not use 是 (to be) with adjectives! Saying 我是很好 is unnatural. Just say 我很好.",
  },
  {
    lesson: 9,
    topic: "The Adverb 'All' (都) & Elliptical '呢'",
    pattern: "Subject (Plural) + 都 + Verb\nNoun/Pronoun + 呢？",
    front: "1. 他们都喜欢吃中国菜。\n2. 你呢？\n3. 他们都喜欢上网。",
    back: "1. Tāmen dōu xǐhuan chī Zhōngguó cài.\n2. Nǐ ne?\n3. Tāmen dōu xǐhuan shàngwǎng.",
    tip: "",
  },
  {
    lesson: 10,
    topic: "The Adverb 'All' (都) & Elliptical '呢' — Review",
    pattern: "Subject (Plural) + 都 + Verb\nNoun/Pronoun + 呢？",
    front: "4. 我们都是学生。\n5. 他们都很忙。\n6. 我喜欢喝茶，你呢？",
    back: "4. Wǒmen dōu shì xuésheng.\n5. Tāmen dōu hěn máng.\n6. Wǒ xǐhuan hē chá, nǐ ne?",
    tip: "If a sentence uses both 也 (also) and 都 (all), the strict order is always 也都. Example: 我们也都喜欢 (We also all like it).",
  },
  {
    lesson: 11,
    topic: "To Have (有/没有) & Measure Words (个)",
    pattern: "Subject + 有 / 没有 + Object\nNumeral + Measure Word + Noun",
    front: "1. 我有一个姐姐。\n2. 我没有哥哥。\n3. 他家有几口人？",
    back: "1. Wǒ yǒu yí ge jiějie.\n2. Wǒ méiyǒu gēge.\n3. Tā jiā yǒu jǐ kǒu rén?",
    tip: "",
  },
  {
    lesson: 12,
    topic: "To Have (有/没有) & Measure Words (个) — Review",
    pattern: "Subject + 有 / 没有 + Object\nNumeral + Measure Word + Noun",
    front: "4. 我有三个妹妹。\n5. 他没有妹妹。\n6. 我有两个朋友。",
    back: "4. Wǒ yǒu sān ge mèimei.\n5. Tā méiyǒu mèimei.\n6. Wǒ yǒu liǎng ge péngyou.",
    tip: "不有 does not exist in Chinese. The negation of 有 is ALWAYS 没有. When stating you have two of something, use 两 (liǎng), never 二 (èr).",
  },
  {
    lesson: 13,
    topic: "Indicating Location (在)",
    pattern: "Subject + 在/不在 + Location (+ 上/下)",
    front: "1. 我的钥匙在哪儿？\n2. 钥匙在桌子上。\n3. 钥匙不在沙发上。",
    back: "1. Wǒ de yàoshi zài nǎr?\n2. Yàoshi zài zhuōzi shang.\n3. Yàoshi bú zài shāfā shang.",
    tip: "",
  },
  {
    lesson: 14,
    topic: "Indicating Location (在) — Review",
    pattern: "Subject + 在/不在 + Location (+ 上/下)",
    front: "4. 我在学校。\n5. 书在杯子旁边。\n6. 他不在家。",
    back: "4. Wǒ zài xuéxiào.\n5. Shū zài bēizi pángbiān.\n6. Tā bú zài jiā.",
    tip: "Proper places (like 学校, 医院, 家) do not need a position word. But common objects (like 桌子) MUST have a direction word (上, 下, 里) to become a location.",
  },
  {
    lesson: 15,
    topic: "Attributes (的) & Asking Opinions (怎么样)",
    pattern: "Adjective + 的 + Noun\nSubject + 怎么样？",
    front: "1. 这条红色的裙子好看吗？\n2. 这件黄色的衣服怎么样？\n3. 你穿什么都好看。",
    back: "1. Zhè tiáo hóngsè de qúnzi hǎokàn ma?\n2. Zhè jiàn huángsè de yīfu zěnmeyàng?\n3. Nǐ chuān shénme dōu hǎokàn.",
    tip: "",
  },
  {
    lesson: 16,
    topic: "Attributes (的) & Asking Opinions (怎么样) — Review",
    pattern: "Adjective + 的 + Noun\nSubject + 怎么样？",
    front: "4. 这是我的书。\n5. 这件衣服很好。\n6. 这个怎么样？",
    back: "4. Zhè shì wǒ de shū.\n5. Zhè jiàn yīfu hěn hǎo.\n6. Zhè ge zěnmeyàng?",
    tip: "If an adjective has two syllables (e.g. 漂亮), you generally MUST use 的 before the noun. One-syllable adjectives (e.g. 好, 新) often drop the 的.",
  },
  {
    lesson: 17,
    topic: "Date Expressions",
    pattern: "Year + Month + Day (号/日)",
    front: "1. 春节是农历一月一日。\n2. 今天星期天。\n3. 中秋节是几月几日？",
    back: "1. Chūnjié shì nónglì yī yuè yī rì.\n2. Jīntiān xīngqītiān.\n3. Zhōngqiūjié shì jǐ yuè jǐ rì?",
    tip: "",
  },
  {
    lesson: 18,
    topic: "Date Expressions — Review",
    pattern: "Year + Month + Day (号/日)",
    front: "4. 今天是三月八号。\n5. 明天是星期五。\n6. 昨天是几号？",
    back: "4. Jīntiān shì sān yuè bā hào.\n5. Míngtiān shì xīngqī wǔ.\n6. Zuótiān shì jǐ hào?",
    tip: "In casual speech, always use 号 (hào) for the day of the month. 日 (rì) is formal and mostly used in writing or official announcements.",
  },
  {
    lesson: 19,
    topic: "Alternative Questions (还是) & Nouns as Measure Words",
    pattern: "A + 还是 + B？\nNumeral + Container + Noun",
    front: "1. 现金还是刷卡？\n2. 您要大碗的还是小碗的？\n3. 再要一杯豆浆。",
    back: "1. Xiànjīn háishi shuākǎ?\n2. Nín yào dà wǎn de háishi xiǎo wǎn de?\n3. Zài yào yì bēi dòujiāng.",
    tip: "",
  },
  {
    lesson: 20,
    topic: "Alternative Questions (还是) & Nouns as Measure Words — Review",
    pattern: "A + 还是 + B？\nNumeral + Container + Noun",
    front: "4. 你喝咖啡还是茶？\n5. 你要红色的还是黄色的？\n6. 他是北京人还是上海人？",
    back: "4. Nǐ hē kāfēi háishi chá?\n5. Nǐ yào hóngsè de háishi huángsè de?\n6. Tā shì Běijīngrén háishi Shànghǎirén?",
    tip: "还是 is strictly for questions. For 'or' in a statement, use 或者 (huòzhě) instead.",
  },
  {
    lesson: 21,
    topic: "Asking Prices & Units of Weight",
    pattern: "Item + 多少钱 + 一 + Measure Word",
    front: "1. 苹果多少钱一斤？\n2. 草莓十五块钱一盒。\n3. 我要两斤苹果。",
    back: "1. Píngguǒ duōshao qián yì jīn?\n2. Cǎoméi shíwǔ kuài qián yì hé.\n3. Wǒ yào liǎng jīn píngguǒ.",
    tip: "",
  },
  {
    lesson: 22,
    topic: "Asking Prices & Units of Weight — Review",
    pattern: "Item + 多少钱 + 一 + Measure Word",
    front: "4. 这个多少钱？\n5. 我要五斤苹果。\n6. 他要两杯茶。",
    back: "4. Zhè ge duōshao qián?\n5. Wǒ yào wǔ jīn píngguǒ.\n6. Tā yào liǎng bēi chá.",
    tip: "In everyday speech, 块 (kuài) is used instead of formal 元 (yuán), and 毛 (máo) instead of 角 (jiǎo) for 10-cent increments.",
  },
  {
    lesson: 23,
    topic: "Directions (往) & Emphasis (就)",
    pattern: "Place + 怎么走？\n往 + Direction + Verb",
    front: "1. 请问，银行怎么走？\n2. 一直往前走。\n3. 那个白色的大楼就是。",
    back: "1. Qǐngwèn, yínháng zěnme zǒu?\n2. Yìzhí wǎng qián zǒu.\n3. Nàge báisè de dàlóu jiù shì.",
    tip: "",
  },
  {
    lesson: 24,
    topic: "Directions (往) & Emphasis (就) — Review",
    pattern: "Place + 怎么走？\n往 + Direction + Verb",
    front: "4. 往左走。\n5. 往右拐。\n6. 银行就在那儿。",
    back: "4. Wǎng zuǒ zǒu.\n5. Wǎng yòu guǎi.\n6. Yínháng jiù zài nàr.",
    tip: "怎么走 (zěnme zǒu) asks for the physical route. 怎么去 (zěnme qù) asks for the method of transportation.",
  },
  {
    lesson: 25,
    topic: "Method of Action (Verb Sequences)",
    pattern: "Subject + Method (Verb 1) + Action (Verb 2)",
    front: "1. 你怎么上班？\n2. 我坐公共汽车上班。\n3. 姐姐打车去机场。",
    back: "1. Nǐ zěnme shàngbān?\n2. Wǒ zuò gōnggòng qìchē shàngbān.\n3. Jiějie dǎchē qù jīchǎng.",
    tip: "",
  },
  {
    lesson: 26,
    topic: "Method of Action (Verb Sequences) — Review",
    pattern: "Subject + Method (Verb 1) + Action (Verb 2)",
    front: "4. 我走路去。\n5. 他坐火车来。\n6. 你怎么去？",
    back: "4. Wǒ zǒulù qù.\n5. Tā zuò huǒchē lái.\n6. Nǐ zěnme qù?",
    tip: "The method or tool MUST come before the action. Chinese logic: you have to get on the bus before you can go to work — 坐公共汽车上班.",
  },
  {
    lesson: 27,
    topic: "Completed Action (了) & Purpose",
    pattern: "Sentence + 了\nSubject + 去 + Place + Action",
    front: "1. 你们做什么了？\n2. 我去埃及旅游了。\n3. 这么快就回来了？",
    back: "1. Nǐmen zuò shénme le?\n2. Wǒ qù Āijí lǚyóu le.\n3. Zhème kuài jiù huílái le?",
    tip: "",
  },
  {
    lesson: 28,
    topic: "Completed Action (了) & Purpose — Review",
    pattern: "Sentence + 了\nSubject + 去 + Place + Action",
    front: "4. 我吃饭了。\n5. 他看电影了。\n6. 我买书了。",
    back: "4. Wǒ chī fàn le.\n5. Tā kàn diànyǐng le.\n6. Wǒ mǎi shū le.",
    tip: "了 (le) does NOT equal past tense! It means completed action. It can even apply to future events once they are completed.",
  },
  {
    lesson: 29,
    topic: "Suggestions (吧) & Setting Appointments (见)",
    pattern: "Sentence + 吧\nTime/Place + 见",
    front: "1. 我们明天去长城吧。\n2. 早上六点半出发，怎么样？\n3. 晚上七点十五分电影院见。",
    back: "1. Wǒmen míngtiān qù Chángchéng ba.\n2. Zǎoshang liù diǎn bàn chūfā, zěnmeyàng?\n3. Wǎnshang qī diǎn shíwǔ fēn diànyǐngyuàn jiàn.",
    tip: "",
  },
  {
    lesson: 30,
    topic: "Suggestions (吧) & Setting Appointments (见) — Review",
    pattern: "Sentence + 吧\nTime/Place + 见",
    front: "4. 我们走吧。\n5. 我们吃饭吧。\n6. 他们去看电影吧。",
    back: "4. Wǒmen zǒu ba.\n5. Wǒmen chī fàn ba.\n6. Tāmen qù kàn diànyǐng ba.",
    tip: "Adding 吧 (ba) softens a command into a polite suggestion. 走! is harsh (Leave!), but 走吧 means a friendly Let's go.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

const LS_KEY = "hanzi-quiz-v3";
const LESSONS = [...new Set(VOCAB.map(v => v.lesson))].sort((a, b) => a - b);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function load() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; } }
function save(o) { try { localStorage.setItem(LS_KEY, JSON.stringify(o)); } catch {} }

export default function HanziQuiz() {

  // ── Vocab state ──────────────────────────────────────────────────────────
  const [screen, setScreen]       = useState("home");
  const [deck, setDeck]           = useState([]);
  const [idx, setIdx]             = useState(0);
  const [level, setLevel]         = useState(0);
  const [stats, setStats]         = useState({});
  const [sRight, setSRight]       = useState(0);
  const [sWrong, setSWrong]       = useState(0);
  const [animKey, setAnimKey]     = useState(0);
  const [shake, setShake]         = useState(false);
  const [wrongThisCard, setWrongThisCard] = useState(false);
  const [confirming, setConfirming]       = useState(false);
  const [selMode, setSelMode]     = useState("all");
  const [selSingle, setSelSingle] = useState(null);
  const [selFrom, setSelFrom]     = useState(null);
  const [selTo, setSelTo]         = useState(null);
  const [statsTab, setStatsTab]   = useState("list");
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const [pMode, setPMode]         = useState("hanzi"); // hanzi | pinyin

  // ── Grammar state ────────────────────────────────────────────────────────
  const [gDeck, setGDeck]         = useState([]);
  const [gIdx, setGIdx]           = useState(0);
  const [gFlipped, setGFlipped]   = useState(false);
  const [gAnimKey, setGAnimKey]   = useState(0);
  const [gSelMode, setGSelMode]   = useState("all");
  const [gSelSingle, setGSelSingle] = useState(null);
  const [gSelFrom, setGSelFrom]   = useState(null);
  const [gSelTo, setGSelTo]       = useState(null);

  useEffect(() => {
    const s = load();
    if (s.stats) setStats(s.stats);
  }, []);

  useEffect(() => { save({ stats }); }, [stats]);

  // ── Vocab helpers ────────────────────────────────────────────────────────

  function getSelectedLessons() {
    if (selMode === "all") return LESSONS;
    if (selMode === "single") return selSingle != null ? [selSingle] : [];
    if (selMode === "range") {
      if (selFrom == null || selTo == null) return [];
      const f = Math.min(selFrom, selTo), t = Math.max(selFrom, selTo);
      return LESSONS.filter(l => l >= f && l <= t);
    }
    return [];
  }

  const selectedLessons = getSelectedLessons();
  const selectedVocab   = VOCAB.filter(v => selectedLessons.includes(v.lesson));
  const card            = deck[idx];
  const total           = deck.length;
  const progress        = total > 0 ? (idx / total) * 100 : 0;

  function lessonLabel() {
    if (selMode === "all") return "All Lessons";
    if (selMode === "single" && selSingle) return `Lesson ${selSingle}`;
    if (selMode === "range" && selFrom && selTo)
      return `Lessons ${Math.min(selFrom,selTo)}-${Math.max(selFrom,selTo)}`;
    return "";
  }

  function startQuiz(mode) {
    if (selectedVocab.length === 0) return;
    if (mode) setPMode(mode);
    setDeck(shuffle(selectedVocab));
    setIdx(0); setLevel(0); setSRight(0); setSWrong(0);
    setWrongThisCard(false); setConfirming(false);
    setAnimKey(k => k + 1); setShowStopConfirm(false);
    setScreen("quiz");
  }

  function goNextCard() {
    if (idx + 1 >= deck.length) { setScreen("done"); return; }
    setIdx(i => i + 1);
    setLevel(0); setWrongThisCard(false); setConfirming(false);
    setAnimKey(k => k + 1);
  }

  function recordSeen(hanzi) {
    setStats(s => {
      const p = s[hanzi] || { wrong:0, seen:0, wrongCards:[] };
      return { ...s, [hanzi]: { ...p, seen: p.seen + 1 } };
    });
  }

  function recordWrongForCard(hanzi) {
    if (wrongThisCard) return;
    setWrongThisCard(true);
    setSWrong(w => w + 1);
    setStats(s => {
      const p = s[hanzi] || { wrong:0, seen:0, wrongCards:[], pWrong:0 };
      return { ...s, [hanzi]: {
        ...p,
        wrong: pMode === "hanzi" ? p.wrong + 1 : p.wrong,
        pWrong: pMode === "pinyin" ? (p.pWrong || 0) + 1 : (p.pWrong || 0),
        wrongCards: [...(p.wrongCards || []), Date.now()].slice(-20),
      }};
    });
  }

  function handleRight() {
    if (pMode === "pinyin") {
      // Pinyin mode: "Check" at level 0 shows english + hanzi confirmation
      // "Next" at level 1 (english already revealed) just moves on — no extra credit
      if (level === 0) {
        recordSeen(card.hanzi);
        setSRight(r => r + 1);
        setConfirming(true);
      } else {
        recordSeen(card.hanzi);
        goNextCard();
      }
    } else {
      // Hanzi mode
      if (level === 0) {
        recordSeen(card.hanzi);
        setSRight(r => r + 1);
        setConfirming(true);
      } else {
        recordSeen(card.hanzi);
        goNextCard();
      }
    }
  }

  function handleConfirmNext() {
    setConfirming(false);
    goNextCard();
  }

  function handleWrong() {
    setShake(true);
    setTimeout(() => setShake(false), 450);
    if (pMode === "pinyin") {
      // Pinyin mode: level 0 -> reveal english (level 1) -> move on
      if (level === 0) {
        recordWrongForCard(card.hanzi);
        setLevel(1);
      } else {
        recordSeen(card.hanzi);
        goNextCard();
      }
    } else {
      // Hanzi mode: level 0 -> pinyin -> english -> move on
      if (level === 0) {
        recordWrongForCard(card.hanzi);
        setLevel(1);
      } else if (level === 1) {
        setLevel(2);
      } else {
        recordSeen(card.hanzi);
        goNextCard();
      }
    }
  }

  function handleStop() {
    if (card) recordSeen(card.hanzi);
    setShowStopConfirm(false);
    setScreen("done");
  }

  function clearStats() {
    if (!window.confirm("Clear all stats? This cannot be undone.")) return;
    setStats({});
  }

  const accuracy = (sRight + sWrong) > 0
    ? Math.round((sRight / (sRight + sWrong)) * 100) : 0;

  const statsList = VOCAB.map(v => ({
    ...v, wrong: stats[v.hanzi]?.wrong || 0, seen: stats[v.hanzi]?.seen || 0,
  })).sort((a, b) => b.wrong - a.wrong);

  const chartData = LESSONS.map(l => ({
    name: `L${l}`,
    wrong: VOCAB.filter(v => v.lesson === l).reduce((a, v) => a + (stats[v.hanzi]?.wrong || 0), 0),
    words: VOCAB.filter(v => v.lesson === l).length,
  }));

  // ── Grammar helpers ──────────────────────────────────────────────────────

  const G_LESSONS = [...new Set(GRAMMAR.map(g => g.lesson))].sort((a,b) => a-b);

  function getGSelectedLessons() {
    if (gSelMode === "all") return G_LESSONS;
    if (gSelMode === "single") return gSelSingle != null ? [gSelSingle] : [];
    if (gSelMode === "range") {
      if (gSelFrom == null || gSelTo == null) return [];
      const f = Math.min(gSelFrom, gSelTo), t = Math.max(gSelFrom, gSelTo);
      return G_LESSONS.filter(l => l >= f && l <= t);
    }
    return [];
  }

  const gSelectedLessons = getGSelectedLessons();
  const gSelectedCards   = GRAMMAR.filter(g => gSelectedLessons.includes(g.lesson));

  function startGrammar() {
    if (gSelectedCards.length === 0) return;
    setGDeck(shuffle(gSelectedCards));
    setGIdx(0); setGFlipped(false); setGAnimKey(k => k + 1);
    setScreen("gquiz");
  }

  function gNext() {
    if (gIdx + 1 >= gDeck.length) { setScreen("gdone"); return; }
    setGIdx(i => i + 1); setGFlipped(false); setGAnimKey(k => k + 1);
  }

  function gPrev() {
    if (gIdx === 0) return;
    setGIdx(i => i - 1); setGFlipped(false); setGAnimKey(k => k + 1);
  }

  // ── Shared sub-components ────────────────────────────────────────────────

  function LessonBtn({ lesson, active, onClick, color }) {
    const count = VOCAB.filter(v => v.lesson === lesson).length;
    const ac = color || "#2d5a27";
    return (
      <button onClick={onClick} style={{
        border: active ? `2px solid ${ac}` : "1.5px solid #ddd5c0",
        background: active ? ac : "#fff", color: active ? "#f5f0e8" : "#5a4a30",
        borderRadius:12, padding:"10px 6px", cursor:"pointer",
        fontFamily:"'Crimson Pro',serif", transition:"all .15s",
        display:"flex", flexDirection:"column", alignItems:"center", gap:2,
      }}>
        <span style={{ fontSize:13, fontWeight:600 }}>L{lesson}</span>
        <span style={{ fontSize:10, opacity:.7 }}>{count}w</span>
      </button>
    );
  }

  function GLessonBtn({ lesson, active, onClick }) {
    const count = GRAMMAR.filter(g => g.lesson === lesson).length;
    return (
      <button onClick={onClick} style={{
        border: active ? "2px solid #8b6914" : "1.5px solid #ddd5c0",
        background: active ? "#8b6914" : "#fff", color: active ? "#fff" : "#5a4a30",
        borderRadius:12, padding:"10px 6px", cursor:"pointer",
        fontFamily:"'Crimson Pro',serif", transition:"all .15s",
        display:"flex", flexDirection:"column", alignItems:"center", gap:2,
      }}>
        <span style={{ fontSize:13, fontWeight:600 }}>L{lesson}</span>
        <span style={{ fontSize:10, opacity:.7 }}>{count}c</span>
      </button>
    );
  }

  // ── Styles ───────────────────────────────────────────────────────────────

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes popIn{0%{transform:scale(.88);opacity:0}70%{transform:scale(1.03)}100%{transform:scale(1);opacity:1}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    .fade-up{animation:fadeUp .35s ease forwards}
    .pop-in{animation:popIn .32s ease forwards}
    .shake{animation:shake .42s ease}
    .slide-down{animation:slideDown .28s ease forwards}
    .btn-green{background:#2d5a27;color:#f5f0e8;border:none;border-radius:14px;
      padding:16px 28px;font-family:'Crimson Pro',serif;font-size:18px;font-weight:600;
      cursor:pointer;transition:all .2s;box-shadow:0 4px 16px #2d5a2728}
    .btn-green:hover{background:#234a1e;transform:translateY(-2px)}
    .btn-green:active{transform:translateY(0)}
    .btn-green:disabled{opacity:.35;cursor:not-allowed;transform:none}
    .btn-red{background:#fff;color:#8b2020;border:2px solid #c8a8a8;border-radius:14px;
      padding:16px 28px;font-family:'Crimson Pro',serif;font-size:18px;font-weight:600;
      cursor:pointer;transition:all .2s}
    .btn-red:hover{background:#fdf0f0;border-color:#8b2020;transform:translateY(-2px)}
    .btn-gold{background:#8b6914;color:#fff;border:none;border-radius:14px;
      padding:16px 28px;font-family:'Crimson Pro',serif;font-size:18px;font-weight:600;
      cursor:pointer;transition:all .2s;box-shadow:0 4px 16px #8b691428}
    .btn-gold:hover{background:#7a5c10;transform:translateY(-2px)}
    .btn-gold:disabled{opacity:.35;cursor:not-allowed;transform:none}
    .btn-stop{background:#fff;color:#8b4a10;border:2px solid #e8c8a0;border-radius:14px;
      padding:12px 20px;font-family:'Crimson Pro',serif;font-size:15px;font-weight:600;
      cursor:pointer;transition:all .2s;width:100%}
    .btn-stop:hover{background:#fdf5ee;border-color:#c87830;transform:translateY(-1px)}
    .btn-outline{background:none;border:1.5px solid #8b7355;color:#5a4a30;border-radius:10px;
      padding:11px 22px;font-family:'Crimson Pro',serif;font-size:15px;cursor:pointer;transition:all .2s}
    .btn-outline:hover{background:#e8e0d0;transform:translateY(-1px)}
    .mode-btn{border:1.5px solid #ddd5c0;background:#fff;color:#5a4a30;border-radius:10px;
      padding:9px 14px;font-family:'Crimson Pro',serif;font-size:13px;cursor:pointer;
      transition:all .15s;white-space:nowrap}
    .mode-btn.sel{border-color:#2d5a27;background:#f0f7ef;color:#2d5a27;font-weight:600}
    .mode-btn.gsel{border-color:#8b6914;background:#fef9ec;color:#8b6914;font-weight:600}
    .stab{background:none;border:none;cursor:pointer;font-family:'Crimson Pro',serif;
      font-size:14px;color:#8b7355;padding:7px 14px;border-bottom:2px solid transparent;transition:all .2s}
    .stab.on{color:#2d3a1e;border-bottom-color:#2d5a27}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-thumb{background:#c8b898;border-radius:2px}
  `;

  const pageStyle = {
    minHeight:"100vh", background:"#f5f0e8",
    fontFamily:"'Noto Serif SC','Georgia',serif",
    display:"flex", flexDirection:"column", alignItems:"center",
    padding:"24px 18px 64px", position:"relative", overflow:"hidden",
  };

  const sectionStyle = { width:"100%", maxWidth:460, position:"relative", zIndex:1 };

  const labelStyle = {
    fontFamily:"'Crimson Pro',serif", fontSize:11,
    color:"#8b7355", letterSpacing:".18em",
  };

  // ── RENDER ───────────────────────────────────────────────────────────────

  return (
    <div style={pageStyle}>
      <style>{css}</style>

      {/* BG decorative characters */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
        {["字","学","文","语","词","汉","话","读"].map((c, i) => (
          <div key={i} style={{
            position:"absolute", fontSize:`${110+i*28}px`, color:"#2d3a1e07",
            fontWeight:700, left:`${[5,20,45,70,85,10,55,75][i]}%`,
            top:`${[10,60,20,70,40,85,50,15][i]}%`,
            transform:"rotate(-15deg)", userSelect:"none",
          }}>{c}</div>
        ))}
      </div>

      <div style={sectionStyle}>

        {/* ═══════════════════════════════════════════════════════ HOME */}
        {screen === "home" && (
          <div className="fade-up" style={{ textAlign:"center", paddingTop:28 }}>
            <div style={{ fontSize:52, marginBottom:4 }}>汉字</div>
            <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"#8b7355",
                          letterSpacing:".25em", marginBottom:4 }}>HÀNZÌ STUDY APP</div>
            <div style={{ width:36, height:2, background:"#8b7355", margin:"12px auto 28px" }} />

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
              <button onClick={() => setScreen("vocab")} style={{
                background:"#fff", border:"2px solid #2d5a27", borderRadius:20,
                padding:"24px 12px", cursor:"pointer", transition:"all .2s",
              }}>
                <div style={{ fontSize:36, marginBottom:8 }}>📚</div>
                <div style={{ fontFamily:"'Noto Serif SC'", fontSize:15, fontWeight:600,
                              color:"#2d3a1e", marginBottom:4 }}>词汇</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"#2d5a27" }}>
                  Vocabulary
                </div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:11,
                              color:"#8b7355", marginTop:4 }}>
                  {VOCAB.length} words · L1-{LESSONS[LESSONS.length-1]}
                </div>
              </button>

              <button onClick={() => setScreen("gselect")} style={{
                background:"#fff", border:"2px solid #8b6914", borderRadius:20,
                padding:"24px 12px", cursor:"pointer", transition:"all .2s",
              }}>
                <div style={{ fontSize:36, marginBottom:8 }}>📖</div>
                <div style={{ fontFamily:"'Noto Serif SC'", fontSize:15, fontWeight:600,
                              color:"#2d3a1e", marginBottom:4 }}>语法</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"#8b6914" }}>
                  Grammar
                </div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:11,
                              color:"#8b7355", marginTop:4 }}>
                  {GRAMMAR.length} cards · L1-30
                </div>
              </button>
            </div>

            <button className="btn-outline" style={{ width:"100%" }}
                    onClick={() => setScreen("stats")}>
              查看统计 · View Vocab Stats
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ VOCAB HOME */}
        {screen === "vocab" && (
          <div className="fade-up">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <button onClick={() => setScreen("home")} style={{
                background:"none", border:"none", color:"#8b7355",
                fontFamily:"'Crimson Pro',serif", fontSize:15, cursor:"pointer",
              }}>← Back</button>
              <div style={{ fontFamily:"'Noto Serif SC'", fontSize:18,
                            fontWeight:600, color:"#2d3a1e" }}>词汇 · Vocabulary</div>
            </div>

            <div style={{ background:"#fff", border:"1px solid #ddd5c0", borderRadius:20,
                          padding:18, marginBottom:16, boxShadow:"0 4px 24px #2d3a1e0a" }}>
              <div style={{ ...labelStyle, marginBottom:12 }}>
                {LESSONS.length} LESSONS · {VOCAB.length} WORDS
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
                {LESSONS.map(l => {
                  const count  = VOCAB.filter(v => v.lesson === l).length;
                  const wrongs = VOCAB.filter(v => v.lesson === l)
                    .reduce((a, v) => a + (stats[v.hanzi]?.wrong || 0), 0);
                  const seen   = VOCAB.filter(v => v.lesson === l)
                    .filter(v => (stats[v.hanzi]?.seen || 0) > 0).length;
                  return (
                    <div key={l} style={{
                      background: seen===count ? "#f0f7ef" : "#f5f0e8",
                      border:`1px solid ${seen===count ? "#c8ddc4" : "#e8e0d0"}`,
                      borderRadius:10, padding:"8px 4px", textAlign:"center",
                    }}>
                      <div style={{ fontFamily:"'Crimson Pro',serif", fontWeight:700,
                                    fontSize:12, color:"#2d3a1e" }}>L{l}</div>
                      <div style={{ fontSize:10, color:"#8b7355" }}>{count}w</div>
                      {wrongs > 0
                        ? <div style={{ fontSize:10, color:"#8b2020" }}>&#10007;{wrongs}</div>
                        : seen > 0
                        ? <div style={{ fontSize:10, color:"#2d5a27" }}>&#10003;</div>
                        : <div style={{ fontSize:10, color:"#c8b898" }}>new</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
              <button className="btn-green" style={{ fontSize:15, padding:"14px" }}
                      onClick={() => { setPMode("hanzi"); setScreen("select"); }}>
                <div style={{ fontSize:20, marginBottom:4 }}>汉字</div>
                <div>Hanzi Practice</div>
              </button>
              <button style={{
                background:"#1a3a5c", color:"#e8f0f8", border:"none", borderRadius:14,
                fontSize:15, padding:"14px", cursor:"pointer", transition:"all .2s",
                fontFamily:"'Crimson Pro',serif", fontWeight:600,
              }} onClick={() => { setPMode("pinyin"); setScreen("select"); }}>
                <div style={{ fontSize:20, marginBottom:4 }}>pīnyīn</div>
                <div>Pinyin Practice</div>
              </button>
            </div>
            <button className="btn-outline" style={{ width:"100%" }}
                    onClick={() => setScreen("stats")}>
              查看统计 · View Stats
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ LESSON SELECT */}
        {screen === "select" && (
          <div className="fade-up">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <button onClick={() => setScreen("vocab")} style={{
                background:"none", border:"none", color:"#8b7355",
                fontFamily:"'Crimson Pro',serif", fontSize:15, cursor:"pointer",
              }}>← Back</button>
              <div style={{ fontFamily:"'Noto Serif SC'", fontSize:17,
                            fontWeight:600, color:"#2d3a1e" }}>Choose Lessons</div>
              <span style={{
                marginLeft:"auto",
                background: pMode === "pinyin" ? "#e8f0f8" : "#f0f7ef",
                border: `1px solid ${pMode === "pinyin" ? "#a8c0d8" : "#c8ddc4"}`,
                borderRadius:999, padding:"3px 10px",
                fontFamily:"'Crimson Pro',serif", fontSize:11,
                color: pMode === "pinyin" ? "#1a3a5c" : "#2d5a27",
              }}>
                {pMode === "pinyin" ? "pīnyīn mode" : "汉字 mode"}
              </span>
            </div>

            <div style={{ ...labelStyle, marginBottom:10 }}>PRACTICE MODE</div>
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              {[["all","All Lessons"],["single","One Lesson"],["range","Lesson Range"]].map(([m,lbl]) => (
                <button key={m} className={`mode-btn ${selMode===m?"sel":""}`}
                        onClick={() => setSelMode(m)}>{lbl}</button>
              ))}
            </div>

            {selMode === "all" && (
              <div style={{ background:"#fff", border:"1px solid #ddd5c0", borderRadius:16,
                            padding:18, marginBottom:16, textAlign:"center" }}>
                <div style={{ fontSize:28, marginBottom:6 }}>📚</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:18,
                              color:"#2d3a1e", fontWeight:600 }}>All {VOCAB.length} words</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                              fontSize:14, color:"#8b7355", marginTop:4 }}>
                  Lessons {LESSONS[0]}-{LESSONS[LESSONS.length-1]}
                </div>
              </div>
            )}

            {selMode === "single" && (
              <div style={{ marginBottom:16 }}>
                <div style={{ ...labelStyle, marginBottom:10 }}>SELECT LESSON</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
                  {LESSONS.map(l => (
                    <LessonBtn key={l} lesson={l} active={selSingle===l}
                               onClick={() => setSelSingle(l)} />
                  ))}
                </div>
                {selSingle != null && (
                  <div style={{ marginTop:10, fontFamily:"'Crimson Pro',serif",
                                fontSize:13, color:"#8b7355", textAlign:"center" }}>
                    {VOCAB.filter(v => v.lesson === selSingle).length} words in Lesson {selSingle}
                  </div>
                )}
              </div>
            )}

            {selMode === "range" && (
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[["FROM", selFrom, setSelFrom],["TO", selTo, setSelTo]].map(([lbl,val,setter]) => (
                    <div key={lbl}>
                      <div style={{ ...labelStyle, marginBottom:8 }}>{lbl} LESSON</div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:5 }}>
                        {LESSONS.map(l => (
                          <LessonBtn key={l} lesson={l} active={val===l}
                                     onClick={() => setter(l)} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {selFrom != null && selTo != null && (
                  <div style={{ marginTop:12, background:"#f0f7ef", border:"1px solid #c8ddc4",
                                borderRadius:12, padding:"10px 14px", textAlign:"center",
                                fontFamily:"'Crimson Pro',serif" }}>
                    <span style={{ color:"#2d5a27", fontWeight:600 }}>{selectedVocab.length} words</span>
                    <span style={{ color:"#8b7355" }}>
                      {" "}· Lessons {Math.min(selFrom,selTo)}-{Math.max(selFrom,selTo)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {selectedVocab.length > 0 && (
              <div style={{ background:"#fff", border:"1px solid #ddd5c0", borderRadius:14,
                            padding:"12px 14px", marginBottom:16 }}>
                <div style={{ ...labelStyle, marginBottom:8 }}>
                  PREVIEW - {selectedVocab.length} WORDS
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, maxHeight:75, overflowY:"auto" }}>
                  {selectedVocab.map((v,i) => (
                    <span key={i} style={{ background:"#f5f0e8", border:"1px solid #e8e0d0",
                                           borderRadius:6, padding:"2px 8px",
                                           fontSize:16, color:"#2d3a1e" }}>{v.hanzi}</span>
                  ))}
                </div>
              </div>
            )}

            <button className="btn-green" style={{ width:"100%" }}
                    disabled={selectedVocab.length === 0}
                    onClick={() => startQuiz(pMode)}>
              {selectedVocab.length > 0
                ? `开始 · Start ${selectedVocab.length} Words`
                : "Select a lesson to continue"}
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ QUIZ */}
        {screen === "quiz" && card && (
          <div>
            {/* Stop confirm modal */}
            {showStopConfirm && (
              <div style={{ position:"fixed", inset:0, background:"#00000066",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            zIndex:100, padding:24 }}>
                <div className="fade-up" style={{ background:"#fff", border:"1px solid #ddd5c0",
                     borderRadius:20, padding:28, width:"100%", maxWidth:340, textAlign:"center" }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>&#9209;</div>
                  <div style={{ fontFamily:"'Noto Serif SC'", fontSize:18, color:"#2d3a1e",
                                fontWeight:600, marginBottom:8 }}>Stop Practice?</div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:14, color:"#8b7355",
                                marginBottom:20, lineHeight:1.6 }}>
                    Your progress so far will be saved.<br/>
                    <strong style={{ color:"#2d5a27" }}>&#10003; {sRight} correct</strong>
                    {"  "}
                    <strong style={{ color:"#8b2020" }}>&#10007; {sWrong} wrong</strong>
                    {" "}out of {idx} answered.
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    <button className="btn-outline"
                            onClick={() => setShowStopConfirm(false)}>Keep Going</button>
                    <button className="btn-stop" style={{ borderRadius:10, fontSize:15 }}
                            onClick={handleStop}>Stop &amp; Save</button>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display:"flex", justifyContent:"space-between",
                          alignItems:"center", marginBottom:10 }}>
              <button onClick={() => setScreen("select")} style={{
                background:"none", border:"none", color:"#8b7355",
                fontFamily:"'Crimson Pro',serif", fontSize:15, cursor:"pointer",
              }}>← Back</button>
              <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"#8b7355" }}>
                {idx + 1} / {total}
              </div>
            </div>

            <div style={{ background:"#ddd5c0", borderRadius:999, height:4,
                          marginBottom:14, overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:999, background:"#2d5a27",
                            width:`${progress}%`, transition:"width 0.5s ease" }} />
            </div>

            {/* Mode badge */}
            <div style={{ textAlign:"center", marginBottom:8, display:"flex",
                          justifyContent:"center", gap:8 }}>
              <span style={{ background:"#f0f7ef", border:"1px solid #c8ddc4", borderRadius:999,
                             padding:"3px 12px", fontFamily:"'Crimson Pro',serif",
                             fontSize:12, color:"#2d5a27" }}>
                Lesson {card.lesson}
              </span>
              {pMode === "pinyin" && (
                <span style={{ background:"#e8f0f8", border:"1px solid #a8c0d8", borderRadius:999,
                               padding:"3px 12px", fontFamily:"'Crimson Pro',serif",
                               fontSize:12, color:"#1a3a5c" }}>
                  pīnyīn mode
                </span>
              )}
            </div>

            {/* Flashcard */}
            <div key={animKey}
                 className={`pop-in ${shake ? "shake" : ""}`}
                 style={{
                   background: confirming ? "#f0f7ef" : "#fff",
                   border: confirming
                     ? "2px solid #2d5a27"
                     : pMode === "pinyin" ? "2px solid #1a3a5c" : "1px solid #ddd5c0",
                   borderRadius:24, boxShadow:"0 8px 40px #2d3a1e0d",
                   padding:"40px 24px", textAlign:"center", minHeight:230,
                   display:"flex", flexDirection:"column", alignItems:"center",
                   justifyContent:"center", gap:14, marginBottom:12,
                   transition:"background .25s, border .25s",
                 }}>

              {pMode === "hanzi" ? (
                <>
                  {/* HANZI MODE: show character, reveal pinyin then english */}
                  <div style={{
                    fontSize: card.hanzi.length > 4 ? 48 : card.hanzi.length > 2 ? 62 : 78,
                    lineHeight:1.1, color: confirming ? "#2d5a27" : "#1a2410",
                    textShadow:"0 2px 8px #2d3a1e12", transition:"color .25s",
                  }}>
                    {card.hanzi}
                  </div>
                  {/* Pinyin: show when wrong revealed pinyin (level>=1) OR confirming */}
                  {(level >= 1 || confirming) && (
                    <div className="slide-down" style={{
                      fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                      fontSize:24, color:"#2d5a27", letterSpacing:".04em",
                    }}>
                      {card.pinyin}
                    </div>
                  )}
                  {/* English: show when wrong revealed english (level>=2) OR confirming */}
                  {(level >= 2 || confirming) && (
                    <div className="slide-down" style={{
                      fontFamily:"'Crimson Pro',serif", fontSize:18, color:"#5a4a30",
                    }}>
                      {card.english}
                    </div>
                  )}
                  {!confirming && level > 0 && (
                    <div style={{ fontSize:10, color:"#c8b898", letterSpacing:".15em",
                                  fontFamily:"'Crimson Pro',serif" }}>
                      {level === 1 ? "PINYIN REVEALED" : "ENGLISH REVEALED"}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* PINYIN MODE: show Pinyin, reveal English on wrong, then hanzi small */}
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:11,
                                color:"#a8c0d8", letterSpacing:".2em", marginBottom:4 }}>
                    WHAT DOES THIS MEAN?
                  </div>
                  <div style={{
                    fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                    fontSize: card.pinyin.length > 18 ? 24 : 32,
                    color:"#1a3a5c", letterSpacing:".04em", lineHeight:1.4,
                  }}>
                    {card.pinyin}
                  </div>
                  {(level >= 1 || confirming) && (
                    <div className="slide-down" style={{
                      fontFamily:"'Crimson Pro',serif", fontSize:22,
                      color:"#5a4a30", fontWeight:600,
                    }}>
                      {card.english}
                    </div>
                  )}
                  {confirming && (
                    <div className="slide-down" style={{
                      fontFamily:"'Noto Serif SC'", fontSize:28,
                      color:"#8b7355", lineHeight:1.1,
                    }}>
                      {card.hanzi}
                    </div>
                  )}
                  {!confirming && level > 0 && (
                    <div style={{ fontSize:10, color:"#c8b898", letterSpacing:".15em",
                                  fontFamily:"'Crimson Pro',serif" }}>
                      ENGLISH REVEALED
                    </div>
                  )}
                </>
              )}

              {confirming && (
                <div className="slide-down" style={{
                  fontSize:11, color:"#2d5a27", letterSpacing:".15em",
                  fontFamily:"'Crimson Pro',serif", fontWeight:600,
                }}>
                  {pMode === "pinyin" ? "✓ CORRECT - VERIFY BELOW" : "✓ CORRECT - CHECK YOUR ANSWER"}
                </div>
              )}
            </div>

            {!confirming && (
              (pMode === "hanzi" && (stats[card.hanzi]?.wrong || 0) > 0) ||
              (pMode === "pinyin" && (stats[card.hanzi]?.pWrong || 0) > 0)
            ) && (
              <div style={{ textAlign:"center", marginBottom:10 }}>
                <span style={{
                  background: pMode === "pinyin" ? "#eef3fa" : "#fdf0f0",
                  border: `1px solid ${pMode === "pinyin" ? "#a8c0d8" : "#e8c8c8"}`,
                  borderRadius:999, padding:"3px 12px", fontSize:12,
                  color: pMode === "pinyin" ? "#1a3a5c" : "#8b2020",
                  fontFamily:"'Crimson Pro',serif",
                }}>
                  &#10007; Missed {pMode === "pinyin"
                    ? stats[card.hanzi].pWrong
                    : stats[card.hanzi].wrong}x in {pMode} mode
                </span>
              </div>
            )}

            {confirming ? (
              <button className="btn-green" style={{ width:"100%", fontSize:19, padding:"18px" }}
                      onClick={handleConfirmNext}>
                Next &#8594; 下一个
              </button>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                <button className="btn-red" onClick={handleWrong}>
                  {pMode === "pinyin"
                    ? (level === 0 ? "✗ Wrong" : "✗ Move on")
                    : (level === 0 ? "✗ Wrong" : level === 1 ? "✗ Still wrong" : "✗ Move on")}
                </button>
                <button className="btn-green" onClick={handleRight}>
                  {level === 0
                    ? (pMode === "pinyin" ? "✓ Check" : "✓ Got it")
                    : "Next →"}
                </button>
              </div>
            )}

            {!confirming && (
              <button className="btn-stop" onClick={() => setShowStopConfirm(true)}>
                &#9209; Stop &amp; Save Progress
              </button>
            )}

            <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:12,
                          fontFamily:"'Crimson Pro',serif", fontSize:14, color:"#8b7355" }}>
              <span style={{ color:"#2d5a27" }}>&#10003; {sRight}</span>
              <span style={{ color:"#8b2020" }}>&#10007; {sWrong}</span>
              <span>{total - idx - 1} left</span>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ DONE */}
        {screen === "done" && (
          <div className="fade-up" style={{ textAlign:"center", paddingTop:28 }}>
            <div style={{ fontSize:44, marginBottom:8 }}>
              {accuracy >= 80 ? "🎉" : accuracy >= 50 ? "💪" : "📖"}
            </div>
            <div style={{ fontFamily:"'Noto Serif SC'", fontSize:22,
                          color:"#2d3a1e", marginBottom:2 }}>练习完成</div>
            <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:14,
                          color:"#8b7355", marginBottom:22 }}>
              Practice Complete · {lessonLabel()}
            </div>

            <div style={{ background:"#fff", border:"1px solid #ddd5c0", borderRadius:20,
                          padding:18, marginBottom:18,
                          display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { label:"Correct",  val:sRight,  color:"#2d5a27" },
                { label:"Wrong",    val:sWrong,  color:"#8b2020" },
                { label:"Answered", val:sRight+sWrong, color:"#2d3a1e" },
                { label:"Accuracy", val:`${accuracy}%`,
                  color:accuracy>=80?"#2d5a27":accuracy>=50?"#8b6914":"#8b2020" },
              ].map(s => (
                <div key={s.label} style={{ background:"#f5f0e8", borderRadius:12,
                                            padding:"12px 8px", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                                fontSize:12, color:"#8b7355", marginBottom:4 }}>{s.label}</div>
                  <div style={{ fontFamily:"'Noto Serif SC'", fontSize:24,
                                fontWeight:700, color:s.color }}>{s.val}</div>
                </div>
              ))}
            </div>

            {sWrong > 0 && (
              <div style={{ background:"#fdf5f5", border:"1px solid #e8c8c8",
                            borderRadius:14, padding:"14px 16px", marginBottom:16,
                            textAlign:"left" }}>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:11,
                              color:"#8b2020", letterSpacing:".15em", marginBottom:10 }}>
                  {pMode === "pinyin" ? "PINYIN" : "CHARACTERS"} TO REVIEW ({sWrong})
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {deck
                    .filter((v,i,arr) => arr.findIndex(x => x.hanzi===v.hanzi)===i)
                    .filter(v => (stats[v.hanzi]?.wrong || 0) > 0)
                    .map((v,i) => (
                    <div key={i} style={{ background:"#fff", border:"1px solid #e8c8c8",
                                          borderRadius:8, padding:"4px 10px", textAlign:"center" }}>
                      <div style={{ fontSize:20, color:"#8b2020" }}>{v.hanzi}</div>
                      <div style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                                    fontSize:11, color:"#c8a0a0" }}>{v.pinyin}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="btn-green" style={{ width:"100%", marginBottom:10 }}
                    onClick={() => startQuiz(pMode)}>再来一次 · Practice Again</button>
            <button className="btn-outline" style={{ width:"100%", marginBottom:8 }}
                    onClick={() => setScreen("select")}>Change Lessons</button>
            <button className="btn-outline" style={{ width:"100%", marginBottom:8 }}
                    onClick={() => setScreen("stats")}>查看统计 · View Stats</button>
            <button className="btn-outline" style={{ width:"100%" }}
                    onClick={() => setScreen("home")}>&#8592; Home</button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ STATS */}
        {screen === "stats" && (
          <div className="fade-up">
            <div style={{ display:"flex", justifyContent:"space-between",
                          alignItems:"center", marginBottom:16 }}>
              <div>
                <div style={{ fontFamily:"'Noto Serif SC'", fontSize:19,
                              fontWeight:600, color:"#2d3a1e" }}>统计 · Stats</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:12,
                              color:"#8b7355", marginTop:2 }}>Ranked by difficulty</div>
              </div>
              <button onClick={() => setScreen("home")} style={{
                background:"none", border:"none", color:"#8b7355",
                fontFamily:"'Crimson Pro',serif", fontSize:15, cursor:"pointer",
              }}>← Back</button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
                          gap:8, marginBottom:14 }}>
              {[
                { label:"Total Words",  val:VOCAB.length },
                { label:"Reviewed",     val:statsList.filter(s => s.seen > 0).length },
                { label:"Total Missed", val:statsList.reduce((a,s) => a+s.wrong, 0) },
              ].map(s => (
                <div key={s.label} style={{ background:"#fff", border:"1px solid #ddd5c0",
                     borderRadius:12, padding:"10px 6px", textAlign:"center" }}>
                  <div style={{ fontFamily:"'Noto Serif SC'", fontSize:20,
                                fontWeight:700, color:"#2d3a1e" }}>{s.val}</div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:10,
                                color:"#8b7355", marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", borderBottom:"1px solid #e8e0d0", marginBottom:14 }}>
              <button className={`stab ${statsTab==="list"?"on":""}`}
                      onClick={() => setStatsTab("list")}>WORD LIST</button>
              <button className={`stab ${statsTab==="chart"?"on":""}`}
                      onClick={() => setStatsTab("chart")}>BY LESSON</button>
            </div>

            {statsTab === "list" && (
              <div style={{ background:"#fff", border:"1px solid #ddd5c0",
                            borderRadius:20, overflow:"hidden", marginBottom:12 }}>
                {statsList.map((v,i) => (
                  <div key={`${v.hanzi}-${i}`} style={{
                    display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
                    borderBottom: i<statsList.length-1 ? "1px solid #f0ebe0" : "none",
                    background: v.wrong >= 3 ? "#fdf5f5" : "transparent",
                  }}>
                    <div style={{ fontFamily:"'Noto Serif SC'", fontSize:20,
                                  color:"#2d3a1e", minWidth:38 }}>{v.hanzi}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                                    fontSize:13, color:"#2d5a27" }}>{v.pinyin}</div>
                      <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:12,
                                    color:"#8b7355" }}>{v.english}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column",
                                  alignItems:"flex-end", gap:2, minWidth:42 }}>
                      <span style={{ background:"#f5f0e8", border:"1px solid #e0d8c8",
                                     borderRadius:5, padding:"1px 5px", fontSize:9,
                                     color:"#8b7355", fontFamily:"'Crimson Pro',serif" }}>
                        L{v.lesson}
                      </span>
                      {v.wrong > 0 && (
                        <div style={{ fontFamily:"'Crimson Pro',serif", fontWeight:600,
                                      fontSize:12, color:"#8b2020" }}>&#10007;H {v.wrong}</div>
                      )}
                      {(stats[v.hanzi]?.pWrong || 0) > 0 && (
                        <div style={{ fontFamily:"'Crimson Pro',serif", fontWeight:600,
                                      fontSize:12, color:"#1a3a5c" }}>
                          &#10007;P {stats[v.hanzi].pWrong}
                        </div>
                      )}
                      <div style={{ fontSize:9, color:"#c8b898",
                                    fontFamily:"'Crimson Pro',serif",
                                    fontStyle: v.seen===0 ? "italic" : "normal" }}>
                        {v.seen === 0 ? "new" : `${v.seen} seen`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {statsTab === "chart" && (
              <div style={{ background:"#fff", border:"1px solid #ddd5c0",
                            borderRadius:20, padding:16, marginBottom:12 }}>
                <div style={{ ...labelStyle, marginBottom:12 }}>
                  WRONG ANSWERS PER LESSON
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={chartData} barSize={16}>
                    <XAxis dataKey="name"
                           tick={{ fill:"#8b7355", fontSize:10, fontFamily:"Crimson Pro" }}
                           axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ background:"#fff8f0", border:"1px solid #ddd5c0",
                                      borderRadius:8, fontSize:11,
                                      fontFamily:"Crimson Pro", color:"#2d3a1e" }}
                      formatter={(v,n,p) => [`${v} wrong / ${p.payload.words} words`, ""]}
                      labelStyle={{ color:"#5a4a30", fontWeight:600 }}
                      cursor={{ fill:"#2d3a1e08" }}
                    />
                    <Bar dataKey="wrong" radius={[4,4,0,0]}>
                      {chartData.map((entry,i) => (
                        <Cell key={i}
                          fill={entry.wrong===0?"#e8e0d0":entry.wrong>=5?"#8b2020":"#c8785a"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ display:"flex", gap:12, marginTop:8, fontSize:11,
                              fontFamily:"'Crimson Pro',serif" }}>
                  <span style={{ color:"#8b2020" }}>&#9632; 5+ wrong</span>
                  <span style={{ color:"#c8785a" }}>&#9632; 1-4 wrong</span>
                  <span style={{ color:"#e8e0d0" }}>&#9632; clean</span>
                </div>
              </div>
            )}

            <button className="btn-outline" style={{ width:"100%", marginBottom:8 }}
                    onClick={() => setScreen("select")}>Start Practice</button>
            <button onClick={clearStats} style={{
              background:"none", border:"none", color:"#c8a8a8",
              fontFamily:"'Crimson Pro',serif", fontSize:12,
              cursor:"pointer", width:"100%", padding:"8px",
            }}>Clear all stats</button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ GRAMMAR SELECT */}
        {screen === "gselect" && (
          <div className="fade-up">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <button onClick={() => setScreen("home")} style={{
                background:"none", border:"none", color:"#8b7355",
                fontFamily:"'Crimson Pro',serif", fontSize:15, cursor:"pointer",
              }}>← Back</button>
              <div style={{ fontFamily:"'Noto Serif SC'", fontSize:17,
                            fontWeight:600, color:"#2d3a1e" }}>语法 · Grammar</div>
            </div>

            <div style={{ ...labelStyle, marginBottom:10 }}>PRACTICE MODE</div>
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              {[["all","All Lessons"],["single","One Lesson"],["range","Lesson Range"]].map(([m,lbl]) => (
                <button key={m} className={`mode-btn ${gSelMode===m?"gsel":""}`}
                        onClick={() => setGSelMode(m)}>{lbl}</button>
              ))}
            </div>

            {gSelMode === "all" && (
              <div style={{ background:"#fff", border:"1px solid #ddd5c0", borderRadius:16,
                            padding:18, marginBottom:16, textAlign:"center" }}>
                <div style={{ fontSize:28, marginBottom:6 }}>📖</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:18,
                              color:"#2d3a1e", fontWeight:600 }}>All {GRAMMAR.length} cards</div>
                <div style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                              fontSize:14, color:"#8b7355", marginTop:4 }}>
                  Lessons 1-30 · Randomized
                </div>
              </div>
            )}

            {gSelMode === "single" && (
              <div style={{ marginBottom:16 }}>
                <div style={{ ...labelStyle, marginBottom:10 }}>SELECT LESSON</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
                  {G_LESSONS.map(l => (
                    <GLessonBtn key={l} lesson={l} active={gSelSingle===l}
                                onClick={() => setGSelSingle(l)} />
                  ))}
                </div>
              </div>
            )}

            {gSelMode === "range" && (
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[["FROM", gSelFrom, setGSelFrom],["TO", gSelTo, setGSelTo]].map(([lbl,val,setter]) => (
                    <div key={lbl}>
                      <div style={{ ...labelStyle, marginBottom:8 }}>{lbl} LESSON</div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:5 }}>
                        {G_LESSONS.map(l => (
                          <GLessonBtn key={l} lesson={l} active={val===l}
                                      onClick={() => setter(l)} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {gSelFrom != null && gSelTo != null && (
                  <div style={{ marginTop:12, background:"#fef9ec", border:"1px solid #e8d898",
                                borderRadius:12, padding:"10px 14px", textAlign:"center",
                                fontFamily:"'Crimson Pro',serif" }}>
                    <span style={{ color:"#8b6914", fontWeight:600 }}>
                      {gSelectedCards.length} cards
                    </span>
                    <span style={{ color:"#8b7355" }}>
                      {" "}· Lessons {Math.min(gSelFrom,gSelTo)}-{Math.max(gSelFrom,gSelTo)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {gSelectedCards.length > 0 && (
              <div style={{ background:"#fff", border:"1px solid #ddd5c0", borderRadius:14,
                            padding:"12px 14px", marginBottom:16 }}>
                <div style={{ ...labelStyle, marginBottom:8 }}>
                  PREVIEW - {gSelectedCards.length} CARDS
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6,
                              maxHeight:72, overflowY:"auto" }}>
                  {gSelectedCards.map((g,i) => (
                    <span key={i} style={{ background:"#fef9ec", border:"1px solid #e8d898",
                                           borderRadius:6, padding:"2px 8px",
                                           fontSize:11, color:"#8b6914",
                                           fontFamily:"'Crimson Pro',serif" }}>
                      L{g.lesson}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button className="btn-gold" style={{ width:"100%" }}
                    disabled={gSelectedCards.length === 0}
                    onClick={startGrammar}>
              {gSelectedCards.length > 0
                ? `开始 · Start ${gSelectedCards.length} Cards`
                : "Select a lesson to continue"}
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ GRAMMAR QUIZ */}
        {screen === "gquiz" && gDeck.length > 0 && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between",
                          alignItems:"center", marginBottom:10 }}>
              <button onClick={() => setScreen("gselect")} style={{
                background:"none", border:"none", color:"#8b7355",
                fontFamily:"'Crimson Pro',serif", fontSize:15, cursor:"pointer",
              }}>← Back</button>
              <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:13, color:"#8b7355" }}>
                {gIdx + 1} / {gDeck.length}
              </div>
            </div>

            <div style={{ background:"#e8d898", borderRadius:999, height:4,
                          marginBottom:14, overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:999, background:"#8b6914",
                            width:`${(gIdx/gDeck.length)*100}%`,
                            transition:"width 0.5s ease" }} />
            </div>

            <div style={{ textAlign:"center", marginBottom:12 }}>
              <span style={{ background:"#fef9ec", border:"1px solid #e8d898", borderRadius:999,
                             padding:"3px 12px", fontFamily:"'Crimson Pro',serif",
                             fontSize:12, color:"#8b6914" }}>
                Lesson {gDeck[gIdx].lesson} · {gDeck[gIdx].topic}
              </span>
            </div>

            {/* Flip card */}
            <div key={gAnimKey}
                 onClick={() => setGFlipped(f => !f)}
                 style={{
                   background: gFlipped ? "#fef9ec" : "#fff",
                   border: gFlipped ? "2px solid #8b6914" : "1px solid #ddd5c0",
                   borderRadius:24, boxShadow:"0 8px 40px #2d3a1e0d",
                   padding:"32px 24px", textAlign:"center", minHeight:280,
                   display:"flex", flexDirection:"column", alignItems:"center",
                   justifyContent:"center", gap:16, marginBottom:14,
                   cursor:"pointer", transition:"background .25s, border .25s",
                   userSelect:"none",
                 }}>
              {!gFlipped ? (
                <>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:11,
                                color:"#c8b898", letterSpacing:".2em", marginBottom:4 }}>
                    FRONT · TAP TO SEE PINYIN
                  </div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:12,
                                color:"#8b6914", letterSpacing:".1em", marginBottom:8,
                                background:"#fef9ec", borderRadius:8, padding:"6px 14px" }}>
                    {gDeck[gIdx].pattern}
                  </div>
                  <div style={{ fontFamily:"'Noto Serif SC'", fontSize:22,
                                color:"#1a2410", lineHeight:1.8, whiteSpace:"pre-line" }}>
                    {gDeck[gIdx].front}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:11,
                                color:"#8b6914", letterSpacing:".2em", marginBottom:4 }}>
                    PINYIN · TAP TO FLIP BACK
                  </div>
                  <div style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                                fontSize:18, color:"#2d5a27", lineHeight:1.9,
                                whiteSpace:"pre-line" }}>
                    {gDeck[gIdx].back}
                  </div>
                  {gDeck[gIdx].tip !== "" && (
                    <div style={{ background:"#f0f7ef", border:"1px solid #c8ddc4",
                                  borderRadius:12, padding:"12px 14px", textAlign:"left",
                                  fontFamily:"'Crimson Pro',serif", fontSize:13,
                                  color:"#2d5a27", lineHeight:1.7, marginTop:4 }}>
                      <span style={{ fontWeight:600 }}>💡 Tip: </span>
                      {gDeck[gIdx].tip}
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              <button onClick={gPrev} disabled={gIdx === 0} style={{
                background:"none", border:"1.5px solid #ddd5c0", borderRadius:12,
                padding:"14px", fontFamily:"'Crimson Pro',serif", fontSize:15,
                color: gIdx===0 ? "#ccc" : "#5a4a30",
                cursor: gIdx===0 ? "not-allowed" : "pointer", transition:"all .2s",
              }}>← Prev</button>
              <button onClick={() => setGFlipped(f => !f)} style={{
                background:"#8b6914", border:"none", borderRadius:12, padding:"14px",
                fontFamily:"'Crimson Pro',serif", fontSize:14, color:"#fff",
                cursor:"pointer", transition:"all .2s", fontWeight:600,
              }}>
                {gFlipped ? "Front" : "Pinyin"}
              </button>
              <button onClick={gNext} style={{
                background: gIdx===gDeck.length-1 ? "#2d5a27" : "#f5f0e8",
                border: gIdx===gDeck.length-1 ? "none" : "1.5px solid #ddd5c0",
                borderRadius:12, padding:"14px", fontFamily:"'Crimson Pro',serif",
                fontSize:15, color: gIdx===gDeck.length-1 ? "#fff" : "#5a4a30",
                cursor:"pointer", transition:"all .2s",
              }}>
                {gIdx === gDeck.length-1 ? "Done ✓" : "Next →"}
              </button>
            </div>

            <div style={{ textAlign:"center", marginTop:14, fontFamily:"'Crimson Pro',serif",
                          fontSize:12, color:"#c8b898" }}>
              Tap card to flip · No scoring · Just review
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ GRAMMAR DONE */}
        {screen === "gdone" && (
          <div className="fade-up" style={{ textAlign:"center", paddingTop:32 }}>
            <div style={{ fontSize:48, marginBottom:8 }}>🎊</div>
            <div style={{ fontFamily:"'Noto Serif SC'", fontSize:24,
                          color:"#2d3a1e", marginBottom:4 }}>复习完成</div>
            <div style={{ fontFamily:"'Crimson Pro',serif", fontSize:15,
                          color:"#8b7355", marginBottom:28 }}>
              Grammar Review Complete · {gDeck.length} cards
            </div>
            <div style={{ background:"#fff", border:"1px solid #ddd5c0",
                          borderRadius:20, padding:20, marginBottom:20 }}>
              <div style={{ fontFamily:"'Noto Serif SC'", fontSize:40,
                            fontWeight:700, color:"#8b6914", marginBottom:4 }}>
                {gDeck.length}
              </div>
              <div style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic",
                            fontSize:14, color:"#8b7355" }}>cards reviewed</div>
            </div>
            <button className="btn-gold" style={{ width:"100%", marginBottom:10 }}
                    onClick={startGrammar}>再来一次 · Review Again</button>
            <button className="btn-outline" style={{ width:"100%", marginBottom:8 }}
                    onClick={() => setScreen("gselect")}>Change Lessons</button>
            <button className="btn-outline" style={{ width:"100%" }}
                    onClick={() => setScreen("home")}>← Home</button>
          </div>
        )}

      </div>
    </div>
  );
}
