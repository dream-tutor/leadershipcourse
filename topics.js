// 검색어별 기업교육 주제 페이지 데이터 — topics/ 폴더의 그룹별 파일을 합친다.
// 각 항목: slug(topic-…), keyword(칩·h1), h1(선택), sub(선택), group, home(홈 칩 노출), metaTitle, desc,
//          lead, signs[], sections[{h,p}], faq[[q,a]](선택), guides[슬러그], courses[키], date
// 원칙: 과정을 설명하지 않고 조직이 겪는 문제를 먼저 쓴다. 검색어는 h1·metaTitle·desc·본문에 자연스럽게.
module.exports = [
  ...require("./topics/leader.js"),
  ...require("./topics/performance.js"),
  ...require("./topics/team.js"),
  ...require("./topics/culture.js"),
  ...require("./topics/skills.js"),
  ...require("./topics/sales.js"),
];
