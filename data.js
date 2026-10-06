// ============================================================
// 데일카네기 공개과정 사이트 데이터
// 매년 이 파일의 SCHEDULE(개강 일정)만 갱신하고 `node build.js` 실행
// ============================================================

// 사이트가 올라갈 도메인 (sitemap/og 태그용)
const BASE_URL = "https://leadershipcourse.co.kr";
const YEAR_LABEL = "2026 하반기";

// 상담 신청 접수 GAS 웹앱 URL — gas-form.gs를 script.google.com에 배포 후 /exec 주소를 붙여넣을 것
// 비어 있으면 빌드 시 경고가 출력되고, 폼은 데모 모드(시트 기록 없이 완료 화면)로 동작
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbwM_RUWCIPUWOAheguPujsuIAQ_XcxshA7SIbkLr_IBmOCalGZQI-B3qoZCXZsyeUrB/exec";

// 따라다니는 전화 상담 버튼 번호 (2026-09-17 사용자 지정 — 전화 버튼은 우하단 플로팅 하나만 둔다)
// ※ 아래 BRANCH의 지사 대표번호(본문 안내·JSON-LD)와는 별개
const PHONE = { display: "010-2635-5114", tel: "01026355114" };

// ------------------------------------------------------------
// 개강 일정 (2026 하반기) — 2026.09.21 본사 개강일정(16개 과정) 기준 갱신
// course: 과정 코드 / region: 지역 slug / gi: 기수
// open이 "MM.DD" 형식이 아니면(예: "9월 중") 세부 일정 미정으로 처리됨
// 이미 개강한 기수는 지우지 않아도 됨 — 빌드 시 오늘 날짜 기준으로 "개강 완료"로 자동 표기(페이지에서도 접속 시점 기준 재계산)
// ※ 09.21 목록 대비 변경분: 의정부양주포천 28 · 이천여주양평 53 · 수원 67 개강 연기,
//    대전 CEO 53 → 세종 CEO 53(과정명 변경), 청주 CEO → 대전 CEO 54(기수 부여). 수강료는 16개 모두 이전과 동일.
// ※ 2026-09-21 삭제(폐지 확인): 목포 CEO 1 · 여수 CEO 3 · 서울 DCC(단기) 3 · 서울 HIP 148 · 전북 차세대 경영자 11
//    — 09.08·09.21 본사 목록 모두에 없어 없어진 과정으로 확인. 목포·여수·청주·전북은 개설 기수 없는 지역으로 남는다(지역 페이지는 유지).
// ※ 2026-09-21 서울 일정 확정(사용자 확인): DCC 528 10.07(수) 개강 · TLA 11 10.21(수) 개강(본사 목록 10.26은 오기) ·
//    DYLP 18 11.12(목)~11.13(금) 이틀 교육 · DCC 529(11.12 개강 표기분)는 개설 취소 → 삭제
// ※ 2026-09-21 12:02 본사 수정 목록(총 15개 과정)과 대조 완료 — 기수 정정: 세종 CEO 53 → 1기, 대전 CEO 54 → 53기.
//    본사 목록에는 수료일이 없어 close는 이전 목록 값 그대로 둔다(화면에는 표기하지 않고 '종료' 상태 계산에만 사용).
// ------------------------------------------------------------
const SCHEDULE = [
  { name: "서울 CEO",            course: "ceo",   region: "seoul",         gi: "103", open: "09.08", close: "11.24", day: "화",   weeks: "12주", fee: 4000000, time: "17:00~21:00", includes: "美 데일카네기 인증 수료증 · 교육/훈련비 일체 · 미국 인증 트레이너 강의 & 경영(자) 코칭 · 저녁 만찬(석식) · 워크숍 세미나(1박 2일) · 시스템 다이어리 (부가세 포함)" },
  { name: "대구 CEO",            course: "ceo",   region: "daegu",         gi: "88",  open: "09.07", close: "11.30", day: "월",   weeks: "12주", fee: 2900000 },
  { name: "용인 CEO",            course: "ceo",   region: "yongin",        gi: "58",  open: "09.10", close: "12.03", day: "목",   weeks: "12주", fee: 2900000, time: "저녁" },
  { name: "고양 CEO",            course: "ceo",   region: "goyang",        gi: "55",  open: "09.14", close: "12.07", day: "월",   weeks: "12주", fee: 2900000, time: "저녁" },
  { name: "화성오산 CEO",         course: "ceo",   region: "hwaseong-osan", gi: "42",  open: "09.14", close: "12.07", day: "월",   weeks: "12주", fee: 2900000, time: "저녁" },
  { name: "대구경북 CEO TLA",     course: "tla",   region: "daegu",         gi: "4",   open: "09.15", close: "10.20", day: "화",   weeks: "6주",  fee: 1300000, variant: "CEO 대상" },
  { name: "광주하남 CEO",         course: "ceo",   region: "gwangju-hanam", gi: "52",  open: "09.15", close: "12.01", day: "화",   weeks: "12주", fee: 2900000 },
  { name: "파주 CEO",            course: "ceo",   region: "paju",          gi: "27",  open: "09.16", close: "11.25", day: "수",   weeks: "12주", fee: 2900000, time: "저녁" },
  { name: "광명 CEO",            course: "ceo",   region: "gwangmyeong",   gi: "57",  open: "09.16", close: "12.02", day: "수",   weeks: "12주", fee: 2900000, time: "18:00~22:00" },
  { name: "시흥 CEO",            course: "ceo",   region: "siheung",       gi: "65",  open: "09.17", close: "12.10", day: "목",   weeks: "12주", fee: 2900000, time: "저녁" },
  { name: "의정부양주포천 CEO",    course: "ceo",   region: "uijeongbu",     gi: "28",  open: "09.29", close: "12.22", day: "화",   weeks: "12주", fee: 2900000, time: "저녁" },
  { name: "부산 CEO",            course: "ceo",   region: "busan",         gi: "78",  open: "09.29", close: "12.15", day: "화",   weeks: "12주", fee: 2900000 },
  { name: "수원 CEO",            course: "ceo",   region: "suwon",         gi: "67",  open: "10.01", close: "12.24", day: "목",   weeks: "12주", fee: 2900000, time: "18:00~22:00" },
  { name: "울산 CEO",            course: "ceo",   region: "ulsan",         gi: "65",  open: "10.01", close: "12.17", day: "목",   weeks: "12주", fee: 2750000 },
  { name: "서울 차세대 경영자",    course: "ceo",   region: "seoul",         gi: "2",   open: "10.01", close: "12.17", day: "목",   weeks: "12주", fee: 3600000, variant: "차세대 경영자 과정" },
  // 이천여주양평 53: 09.29 → 10.06, 대전 53: 10.13 → 11.03 개강으로 변경 (2026-10-06 본사 개강일정)
  // 세종 CEO 1기(10.12): 2026-10-06 본사 개강일정 목록에서 빠져 일정표에서 내림
  { name: "이천여주양평 CEO",      course: "ceo",   region: "icheon",        gi: "53",  open: "10.06", close: "12.22", day: "화",   weeks: "12주", fee: 2900000 },
  // 서울 DCC 528: 본사 목록은 요일 '목' 표기였으나 10.07(수) 개강으로 확정 (2026-09-21 사용자 확인)
  { name: "서울 DCC",           course: "dcc",   region: "seoul",         gi: "528", open: "10.07", close: "11.25", day: "수",   weeks: "8주",  fee: 1300000 },
  { name: "광주 CEO",            course: "ceo",   region: "gwangju",       gi: "64",  open: "10.12", close: "12.28", day: "월",   weeks: "12주", fee: 2900000 },
  // 서울 TLA 11: 본사 목록의 10.26 개강은 오기 — 10.21(수) 개강으로 확정 (2026-09-21 사용자 확인, 수요일 6주 → 11.25 수료)
  { name: "서울 TLA",            course: "tla",   region: "seoul",         gi: "11",  open: "10.21", close: "11.25", day: "수",   weeks: "6주",  fee: 1300000 },
  { name: "진주 CEO",            course: "ceo",   region: "jinju",         gi: "75",  open: "10.26", close: "01.11", day: "월",   weeks: "12주", fee: 2900000 },
  { name: "대전 CEO",            course: "ceo",   region: "daejeon",       gi: "53",  open: "11.03", close: "01.19", day: "화",   weeks: "12주", fee: 2900000 },
  { name: "대구 DCC",           course: "dcc",   region: "daegu",         gi: "76",  open: "11.03", close: "12.22", day: "화",   weeks: "8주",  fee: 1300000 },
  { name: "대구경북 HIP",         course: "hip",   region: "daegu",         gi: "9",   open: "11.04", close: "12.02", day: "수",   weeks: "5주",  fee: 1300000 },
  // 서울 DYLP 18: 11.12(목)~11.13(금) 이틀 교육으로 확정 (2026-09-21 사용자 확인 — 본사 목록의 개강 11.19는 오기)
  { name: "서울 DYLP",           course: "dylp",  region: "seoul",         gi: "18",  open: "11.12", close: "11.13", day: "목·금", weeks: "2일",  fee: 800000 },
];

// ------------------------------------------------------------
// 지역 정보 (slug → 표기명, 강의장, 담당 지사 연락처)
// ------------------------------------------------------------
const BRANCH = {
  hq:      { label: "데일카네기코리아 본원",  tel: "02-556-0113",  addr: "서울시 강남구 역삼로 17길 47 카네기빌딩" },
  gyeonggi:{ label: "경기지사",              tel: "02-556-3301",  addr: "서울시 강남구 역삼로 17길 47 카네기빌딩" },
  daejeon: { label: "대전·세종·충청지사",     tel: "042-824-8250", addr: "대전광역시 유성구 유성대로 875 비에스타워 401호" },
  jeonbuk: { label: "전주·전북지사",          tel: "063-228-1622", addr: "전북 전주시 완산구 석산1길 14, 3층" },
  daegu:   { label: "대구·경북지사",          tel: "053-353-0113", addr: "대구광역시 북구 원대로 130, 7층" },
  busan:   { label: "부산지사",              tel: "051-609-9595", addr: "부산광역시 사상구 모라로 22 부산벤처타워" },
  changwon:{ label: "창원·경남지사",          tel: "055-264-8155", addr: "경남 창원시 의창구 충혼로 91" },
  gwangju: { label: "광주지사",              tel: "062-365-1912", addr: "광주광역시 서구 상무대로 773 세정아울렛 3층" },
  ulsan:   { label: "울산지사",              tel: "052-261-0113", addr: "울산광역시 남구 수암로 255" },
};

const REGIONS = {
  "seoul":         { name: "서울",           branch: "hq",       venue: "데일카네기코리아 본원 (강남구 역삼로 17길 47)" },
  "busan":         { name: "부산",           branch: "busan",    venue: "부산벤처기업협회 강의장 (사상구 모라로 22, 809호)" },
  "daegu":         { name: "대구",           branch: "daegu",    venue: "수성호텔 (수성구 용학로 106-7)" },
  "daejeon":       { name: "대전",           branch: "daejeon",  venue: "대전 카네기 강의장 (유성구 유성대로 875 비에스타워 401호)" },
  "gwangju":       { name: "광주",           branch: "gwangju",  venue: "광주 카네기 비즈니스센터 (서구 상무대로 773 세정아울렛 3층)" },
  "ulsan":         { name: "울산",           branch: "ulsan",    venue: "울산 지정 강의장 (등록 시 개별 안내)" },
  "jeonbuk":       { name: "전북(전주)",      branch: "jeonbuk",  venue: "전북카네기 인재개발원 (전주시 완산구 석산1길 14, 3층)" },
  "cheonan-asan":  { name: "천안·아산",       branch: "daejeon",  venue: "충남스마트워크센터 5층 (천안시 서북구 축구센터로 163)" },
  "sejong":        { name: "세종",           branch: "daejeon",  venue: "세종 지정 강의장 (등록 시 개별 안내)" },
  "cheongju":      { name: "청주",           branch: "daejeon",  venue: "청주 지정 강의장 (등록 시 개별 안내)" },
  "yongin":        { name: "용인",           branch: "gyeonggi", venue: "용인카네기강의장 (기흥구 동백중앙로 203 미주타운 504호)" },
  "suwon":         { name: "수원",           branch: "gyeonggi", venue: "경기문화원 빛누리아트홀 (수원시 권선구 호매실로 237)" },
  "goyang":        { name: "고양",           branch: "gyeonggi", venue: "고양상공회의소 (등록 시 상세 안내)" },
  "paju":          { name: "파주",           branch: "gyeonggi", venue: "운정 청소년센터 (등록 시 상세 안내)" },
  "siheung":       { name: "시흥",           branch: "gyeonggi", venue: "시흥 카네기 비즈니스센터 (등록 시 상세 안내)" },
  "gwangmyeong":   { name: "광명",           branch: "gyeonggi", venue: "데일카네기코리아 광명 강의장 (등록 시 상세 안내)" },
  "hwaseong-osan": { name: "화성·오산",       branch: "gyeonggi", venue: "YBM연수원 (화성시 정남면 세자로 317, 관리동 2층)" },
  "uijeongbu":     { name: "의정부·양주·포천", branch: "gyeonggi", venue: "양주축협 2층 (등록 시 상세 안내)" },
  "gwangju-hanam": { name: "광주·하남",       branch: "gyeonggi", venue: "광주 하남 카네기 강의장 (광주시 문화로 29 DW빌딩 3층)" },
  "icheon":        { name: "이천·여주·양평",   branch: "gyeonggi", venue: "이천 지정 강의장 (등록 시 개별 안내)" },
  "pohang":        { name: "포항",           branch: "daegu",    venue: "포항 지정 강의장 (등록 시 개별 안내)" },
  "jinju":         { name: "진주",           branch: "changwon", venue: "진주 지정 강의장 (등록 시 개별 안내)" },
  "mokpo":         { name: "목포",           branch: "gwangju",  venue: "목포 지정 강의장 (등록 시 개별 안내)" },
  "yeosu":         { name: "여수",           branch: "gwangju",  venue: "여수 지정 강의장 (등록 시 개별 안내)" },
};

// ------------------------------------------------------------
// 과정 정보
// ------------------------------------------------------------
const COURSES = {
  ceo: {
    slug: "ceo", code: "CEO",
    name: "데일카네기 최고경영자 코스",
    eng: "The Dale Carnegie CEO Course",
    tag: "관계 증진 · 협력 창출 · 리더십 발휘",
    short: "Since 1992, 전국 40여 도시에서 30,000명 이상의 CEO가 선택한 대한민국 대표 경영자 리더십 과정",
    duration: "주 1회 × 12주 (저녁 과정)",
    target: "최고경영자 · 임원급 경영자 · 고위공무원 · 전문직",
  },
  dcc: {
    slug: "dcc", code: "DCC",
    name: "데일카네기 코스",
    eng: "The Dale Carnegie Course : Skills for Success",
    tag: "시대가 변해도 변하지 않는 가치에 집중하라",
    short: "110년 넘는 역사 동안 전 세계 900만 명의 삶을 바꾼 데일카네기 대표 프로그램",
    duration: "주 1회(3.5시간) × 8주",
    target: "성과 향상과 리더십 역량 증진을 원하는 모든 성인",
  },
  dcs: {
    slug: "dcs", code: "DCS",
    name: "데일카네기 세일즈 코스",
    eng: "Dale Carnegie Sales Course",
    tag: "AI는 설명을 대신합니다. 선택은 사람이 만듭니다.",
    short: "고객의 선택을 바꾸는 대화력·설득력·관계 구축력을 구조화해 매출과 장기 성과로 연결하는 세일즈 과정",
    duration: "2일 집중 과정 + 수료 후 코칭 (연 2회 한정)",
    target: "세일즈 리더 · 매니저 · 영업 실무자",
  },
  lac: {
    slug: "lac", code: "LAC",
    name: "리더십 어드밴티지 코스",
    eng: "Leadership Advantage Course",
    tag: "AI 시대, 성과를 만드는 리더의 결정적 차이",
    short: "팀원의 잠재력을 끌어내고 팀을 이끌어 목표를 달성하는 프리미엄 리더십 6주 완성 코스",
    duration: "주 1회 × 6회 + 사전 인터뷰·사후 피드백",
    target: "팀 성과를 만들어야 하는 리더 · 팀장 · 관리자",
  },
  ltm: {
    slug: "ltm", code: "LTM",
    name: "매니저 리더십 코스",
    eng: "Leadership Training for Managers / Results",
    tag: "팀을 인큐베이팅하는 '프로세스 설계' 과정",
    short: "팀의 비전·목표·역할·회의·피드백까지, 팀 핵심 운영 프로세스를 직접 설계하는 실행형 매니저 과정",
    duration: "주 1회(8시간) × 3회 (24시간)",
    target: "스타트업 대표 · 팀 매니저 · 중간관리자",
  },
  dylp: {
    slug: "dylp", code: "DYLP",
    name: "신임리더 리더십 과정",
    eng: "Develop Your Leadership Potential : Stop Doing Start Leading",
    tag: "실무자로서의 역량과 리더로서의 역량은 다르다",
    short: "탁월한 실무자였던 신임리더가 리더의 역량을 갖추도록 돕는 2일 집중 과정",
    duration: "2일 과정 (16시간 / 오전 9시~오후 6시)",
    target: "신임리더 · 핵심인재 · 예비 관리자",
  },
  hip: {
    slug: "hip", code: "HIP",
    name: "하이임팩트 프레젠테이션",
    eng: "High Impact Presentations",
    tag: "공식적인 연설에서 일상적인 회의, 토론까지",
    short: "반복 연습과 코칭으로 어떤 상황에서도 능숙하고 탁월한 프레젠테이션 스킬을 만드는 과정",
    duration: "1회(8시간) × 2회 (16시간)",
    target: "프레젠테이션 스킬이 필요한 모든 직장인 · 리더",
  },
  tla: {
    slug: "tla", code: "TLA",
    name: "리더십 어드밴티지 세미나",
    eng: "The Leadership Advantage",
    tag: "휴먼사이드 리더십",
    short: "리더십 개관·자기경영·신뢰경영·조직경영을 다루는 임원·팀장급 리더십 세미나",
    duration: "6주 과정",
    target: "임원 · 사업부장 · 부문장 · 팀장 이상",
  },
  youth: {
    slug: "youth", code: "YOUTH",
    name: "청소년 데일카네기 코스",
    eng: "Dale Carnegie Course for Next Generation",
    tag: "자신감 · 인간관계 · 커뮤니케이션 · 리더십",
    short: "청소년의 잠재력과 글로벌 리더 역량, 인성을 키우는 방학 집중 과정",
    duration: "3일 집중 과정 (방학 시즌)",
    target: "초 · 중 · 고등학생",
  },
};

// ------------------------------------------------------------
// 수강 후기 (원문: 기타(etc)\카네기\수강사례 PDF — site 폴더 옆 수강사례)
// ⚠ 2026-10-01 사장님 지시("너무 같으면 안 된다"): 전문을 싣지 않는다. 원문에서 짧게 발췌하고
//    표현을 조금 다듬는다(뜻·사실은 그대로, 없는 내용을 보태지 말 것). 두 사이트는 서로 다른 대목을 쓴다 —
//    제목도 원문 게시글 제목을 쓰지 않고 발췌 내용에 맞춰 새로 붙였다(site 2는 alt.title).
//    excerpt·paras 는 site 1(카네기코스), alt.excerpt·alt.paras 는 site 2(ceotrainingcourse.com).
// ------------------------------------------------------------
const REVIEWS = [
  {
    title: "나를 다시 알게 된 12주",
    author: "광주하남 카네기 50기 수료생 · 최고경영자 과정 추천서",
    excerpt: "교육은 그동안 많이 받아 봤지만 이 과정은 달랐습니다.",
    paras: ["나를 들여다보고 비전을 세우면서 내가 어떤 사람인지 다시 알게 됐습니다. 나를 아끼게 되니 개인도 사업도 가정도 함께 자랐습니다."],
    alt: {
      title: "발표가 두렵지 않게 됐습니다",
      excerpt: "무대가 두렵던 사람이 발표를 즐기게 되고, 어느 모임에서든 자신 있게 앞에 서게 됩니다.",
      paras: ["조건 없이 서로를 챙기는 동기들이 생겼습니다. 지치고 힘들 때 제일 먼저 생각나는 사람들입니다."],
    },
  },
  {
    title: "기다려지는 목요일 저녁",
    author: "조○○ · 포항 CEO 과정 수료",
    excerpt: "내 안에 이런 목소리와 열정, 꾸준함이 숨어 있었다는 걸 처음 알았다.",
    paras: ["꼭 들어야 하나 싶던 걱정과 의구심은 처음 두 번의 수업에서 다 사라졌고, 오히려 목요일 수업과 모임이 기다려지기 시작했다."],
    alt: {
      title: "인생의 전환점이 된 수업",
      excerpt: "카네기 수업은 내 인생의 큰 터닝포인트가 된 것 같다.",
      paras: ["즐겁고 재미있어서 시작한 지 얼마 안 된 것 같은데 벌써 수료식이라 많이 아쉬웠다. 일상이 단조롭고 어딘가 허전한 분께 카네기 수업을 추천하고 싶다."],
    },
  },
  {
    title: "12주 뒤에 바뀐 생각",
    author: "이○○ · 포항 CEO 과정 MVP",
    excerpt: "처음 교육장에 왔을 때는 '평범한 CEO 교육과정이겠지' 하고 생각했습니다.",
    paras: ["그 생각이 1주, 2주 지나며 조금씩 바뀌더니 12주가 되었을 때는 '카네기는 다르구나, 주변 지인들에게 꼭 알려야겠다'는 생각이 확고해졌습니다."],
    alt: {
      title: "열정 공약으로 알게 된 것",
      excerpt: "과정이 끝난 뒤에도 그 열정으로 회사와 가정, 사회에서 하루하루를 값지게 보내고 있습니다.",
      paras: ["가장 어려운 공약으로 '금주와 다이어트'를 정하고 하루 이틀 지켜 가면서 '아, 할 수 있구나. 나도 열정적인 사람이었구나'를 깨달았습니다."],
    },
  },
  {
    title: "열정이 무엇인지 본 첫 수업",
    author: "이○○ · 포항 CEO 과정 수료",
    excerpt: "첫 수업부터 의자를 둥글게 놓고 마주 앉는 낯선 광경에 '이거 뭐지?' 싶었습니다.",
    paras: ["강사님들의 힘차고 거침없는 목소리, 수줍어하면서도 용기 내어 발표하는 코치님들의 모습을 보며 '뭔가 있긴 있구나, 이게 열정인가' 하는 생각이 들었습니다."],
    alt: {
      title: "가족처럼 지내게 된 동기들",
      excerpt: "행동하지 않으면 우리가 세운 비전은 꿈에 그친다는 것을 배웠습니다.",
      paras: ["처음엔 낯설던 동기들과 진심을 나누다 보니 같이 웃고 울고 서로 격려하며 이제는 가족처럼 지냅니다."],
    },
  },
  {
    title: "지난 어려움을 다시 보는 법",
    author: "이○○ 수강생 사례 · 데일카네기 코스",
    excerpt: "힘들게만 느껴졌던 순간들이 실은 자신을 성장시킨 과정이었음을 깨닫게 되었습니다.",
    paras: ["삶의 방향을 잃고 힘들어하던 때 카네기 클래스를 만나, 지난 어려움을 새로운 시각으로 바라보는 법을 배웠습니다."],
    alt: {
      title: "자신의 이야기를 당당하게",
      excerpt: "감사일기로 긍정적인 삶을 시작했고, 자신의 경험을 정리하며 사람들에게 동기를 주는 스토리텔링을 익혔습니다.",
      paras: ["이제는 자신의 이야기를 당당하게 꺼내며 주변에 좋은 영향을 주는 리더로 성장했습니다."],
    },
  },
  {
    title: "경청이 먼저였습니다",
    author: "정○○ · 포항 CEO 과정 수료",
    excerpt: "'경청하라. 상대가 자신에 대해 말하도록 고무시켜라'라는 문구가 가장 마음에 와닿았습니다.",
    paras: ["사업을 하다 보면 상대방과 대화할 일이 많은데, 이야기를 끝까지 듣고 필요한 부분을 풀어 드리도록 깊이 생각하고 행동으로 옮기려 합니다."],
    alt: {
      title: "동기들의 장점을 발견한 12주",
      excerpt: "처음에는 '12주를 다 마칠 수 있을까' 하는 생각이 들었습니다.",
      paras: ["동기 한 분 한 분의 발표를 들으며 각자의 장점을 발견할 수 있었습니다. 기수가 더 단단히 뭉치게 된 것도 카네기 교육 방식의 매력이라고 생각합니다."],
    },
  },
  {
    title: "수료증 이상의 12주",
    author: "김○○ · 포항 CEO 과정 MVP",
    excerpt: "수료증 받는 데 의미를 둘 줄 알았던 12주가, 예상과 달리 제2의 인생을 시작할 만큼 뜻깊은 시간이 되었습니다.",
    paras: ["'나는 열정적인 사람이었나?' 교육 기간에 스스로에게 던진 이 질문의 답은 안타깝게도 '그렇지 않다'였습니다."],
    alt: {
      title: "삶을 대하는 태도를 돌아봤습니다",
      excerpt: "나름 성실히 살아왔다고 생각했지만, 12주 교육은 제가 인생을 대하는 태도를 돌아보고 반성하는 계기가 되었습니다.",
      paras: ["열정적인 삶이 무엇인지, 어떻게 실천하는지까지 세심하게 배웠습니다. 충분히 해낼 수 있다는 자신감도 얻었습니다."],
    },
  },
  {
    title: "참여할수록 신이 나는 수업",
    author: "권○○ · 포항 CEO 과정 수료",
    excerpt: "다른 교육과 달리 데일카네기 과정은 왜 이렇게 재미있고, 참여할수록 신이 날까 궁금했습니다.",
    paras: ["첫날부터 강의가 재미있었고, 회차가 거듭될수록 분위기가 더 좋아지고 신이 났습니다."],
    alt: {
      title: "석 달 전에는 몰랐던 카네기",
      excerpt: "불과 석 달 전만 해도 저는 데일 카네기가 누구인지도 모르고 살았습니다.",
      paras: ["지난 12주를 정말 열심히 수강했고, 배운 것을 생활에서 실천하려고 노력하고 있습니다."],
    },
  },
];

// ------------------------------------------------------------
// 지역별 카네기 동문 활동 (CEO 과정 수료자 모임 — 지사 취합 자료, 2026-09)
// region: REGIONS slug (사이트에 지역 페이지가 없는 곳은 null → ceo.html 전체 표에만 표시)
// ------------------------------------------------------------
const ALUMNI = [
  { branch: "hq",       region: "seoul",         name: "서울",              acts: ["서울카네기 총동문회(회원 3,000명)", "카네기서울클럽"] },
  { branch: "gyeonggi", region: "suwon",         name: "수원",              acts: ["총동문회", "골프회", "산악회", "징검다리회", "여성동우회"] },
  { branch: "gyeonggi", region: "siheung",       name: "시흥",              acts: ["총동문회", "골프회", "산악회", "징검다리회"] },
  { branch: "gyeonggi", region: "goyang",        name: "고양",              acts: ["총동문회", "골프회", "산악회"] },
  { branch: "gyeonggi", region: "hwaseong-osan", name: "화성·오산",          acts: ["총동문회", "골프회", "산악회", "징검다리회"] },
  { branch: "gyeonggi", region: "uijeongbu",     name: "의정부·양주·포천",    acts: ["총동문회", "골프회", "산악회", "징검다리회(GA클럽)", "카네기밴드"] },
  { branch: "gyeonggi", region: "paju",          name: "파주",              acts: ["총동문회", "골프회", "산악회", "사막회"] },
  { branch: "daegu",    region: "daegu",         name: "대구",              acts: ["대구총동문회", "독서클럽(격주 1회)", "골프클럽", "다누리클럽(월 1회)", "체육대회(연 1회)", "회장배 골프대회(연 1회)", "동문회 이·취임식(연 1회)"] },
  { branch: "daegu",    region: "pohang",        name: "포항",              acts: ["포항총동문회", "독서클럽(주 1회)", "골프클럽", "산악회(월 1회)", "체육대회(연 1회)", "회장배 골프대회(연 1회)", "동문회 이·취임식(연 1회)"] },
  { branch: "daegu",    region: null,            name: "상주",              acts: ["상주총동문회", "골프클럽", "멀티테마클럽(월 1회)", "체육대회(연 1회)", "동문회 이·취임식(연 1회)"] },
  { branch: "daegu",    region: null,            name: "구미",              acts: ["구미총동문회", "골프클럽", "CRM(월 1회)", "체육대회(연 1회)", "회장배 골프대회(연 1회)", "동문회 이·취임식(연 1회)"] },
  { branch: "jeonbuk",  region: "jeonbuk",       name: "전주",              acts: ["클릭소사이어티 경제동아리", "공감독서토론동아리", "전북카네기 CEO합창단", "리더스 그림독서토론", "독서경영코칭(주 1회)", "청년독서클럽(월 1회)"] },
  { branch: "busan",    region: "busan",         name: "부산",              acts: ["리뷰세미나(격주 1회)", "독서모임(분기 1회)", "트레킹", "골프대회", "송년회(연 1회)"] },
  { branch: "ulsan",    region: "ulsan",         name: "울산",              acts: ["정기총회", "동문회 이·취임식", "문화행사", "테마여행", "친선 골프대회", "카네기인의 밤(연 1회)", "어게인 열정 세미나·외부/내부 강사 세미나(연 3회)"] },
  { branch: "changwon", region: null,            name: "창원(창원·마산·진해)", acts: ["트레킹(매월 1회)", "동문가족 체육대회", "골프대회", "송년회", "1박2일 골프 및 하계캠프(연 1회)", "동문회 이·취임식(연 1회)"] },
  { branch: "changwon", region: "jinju",         name: "진주(진주·사천)",     acts: ["새해 떡국나눔", "초청강연", "힐링 도보여행", "골프행사", "영화·공연 관람", "문화탐방", "송년의 밤(연 1회)", "동문회 이·취임식(연 1회)", "새벽독서토론회(월 1회)", "리마인드 프로그램(분기 1회)"] },
  { branch: "gwangju",  region: "gwangju",       name: "광주",              acts: ["동문회 이·취임식", "골프대회", "바자회", "리프레쉬 교육 및 명사초청 한마음대잔치(연 1회)", "볼링회", "뮤직동호회", "독서동호회(월 1회)"] },
];

module.exports = { BASE_URL, YEAR_LABEL, FORM_ENDPOINT, PHONE, SCHEDULE, REGIONS, BRANCH, COURSES, REVIEWS, ALUMNI };
