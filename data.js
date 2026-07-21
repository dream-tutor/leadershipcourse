// ============================================================
// 데일카네기 공개과정 사이트 데이터
// 매년 이 파일의 SCHEDULE(개강 일정)만 갱신하고 `node build.js` 실행
// ============================================================

// 사이트가 올라갈 도메인 (sitemap/og 태그용)
const BASE_URL = "https://leadershipcourse.co.kr";
const YEAR_LABEL = "2026 하반기";

// 상담 신청 접수 GAS 웹앱 URL — gas-form.gs를 script.google.com에 배포 후 /exec 주소를 붙여넣을 것
// 비어 있으면 빌드 시 경고가 출력되고, 폼은 데모 모드(시트 기록 없이 완료 화면)로 동작
const FORM_ENDPOINT = "";

// ------------------------------------------------------------
// 개강 일정 (2026 하반기)
// course: 과정 코드 / region: 지역 slug / gi: 기수
// ------------------------------------------------------------
const SCHEDULE = [
  { name: "천안아산 CEO",        course: "ceo",   region: "cheonan-asan",  gi: "16",  open: "07.21", close: "10.27", day: "화",   weeks: "12주", fee: 2600000 },
  { name: "대구경북 청소년 카네기", course: "youth", region: "daegu",         gi: "27",  open: "07.24", close: "07.26", day: "금~일", weeks: "3일",  fee: 1000000 },
  { name: "서울 청소년 카네기",    course: "youth", region: "seoul",         gi: "27",  open: "07.24", close: "07.26", day: "금~일", weeks: "3일",  fee: 770000 },
  { name: "전북 CEO",            course: "ceo",   region: "jeonbuk",       gi: "49",  open: "08.06", close: "11.26", day: "목",   weeks: "16주", fee: 3800000 },
  { name: "울산 HIP",            course: "hip",   region: "ulsan",         gi: "",    open: "08.19", close: "09.09", day: "수",   weeks: "4주",  fee: 1500000 },
  { name: "서울 DYLP",           course: "dylp",  region: "seoul",         gi: "17",  open: "08.20", close: "08.21", day: "목·금", weeks: "2일",  fee: 800000 },
  { name: "용인 CEO",            course: "ceo",   region: "yongin",        gi: "58",  open: "08.27", close: "11.19", day: "목",   weeks: "12주", fee: 2900000 },
  { name: "서울 DCC",            course: "dcc",   region: "seoul",         gi: "528", open: "09.02", close: "10.15", day: "목",   weeks: "8주",  fee: 1300000 },
  { name: "파주 CEO",            course: "ceo",   region: "paju",          gi: "27",  open: "09.02", close: "11.18", day: "수",   weeks: "12주", fee: 2900000 },
  { name: "시흥 CEO",            course: "ceo",   region: "siheung",       gi: "65",  open: "09.03", close: "11.26", day: "목",   weeks: "12주", fee: 2900000 },
  { name: "포항 CEO",            course: "ceo",   region: "pohang",        gi: "28",  open: "09.03", close: "11.26", day: "목",   weeks: "12주", fee: 1980000 },
  { name: "울산 CEO",            course: "ceo",   region: "ulsan",         gi: "65",  open: "09.03", close: "12.03", day: "목",   weeks: "12주", fee: 2750000 },
  { name: "서울 매니저 리더십 LTM", course: "ltm",  region: "seoul",         gi: "8",   open: "09.04", close: "09.18", day: "금",   weeks: "3주",  fee: 1200000 },
  { name: "화성오산 CEO",         course: "ceo",   region: "hwaseong-osan", gi: "42",  open: "09.07", close: "11.03", day: "월",   weeks: "12주", fee: 2900000 },
  { name: "대구 CEO",            course: "ceo",   region: "daegu",         gi: "88",  open: "09.07", close: "11.30", day: "월",   weeks: "12주", fee: 2900000 },
  { name: "서울 CEO",            course: "ceo",   region: "seoul",         gi: "103", open: "09.08", close: "11.24", day: "화",   weeks: "12주", fee: 4000000 },
  { name: "이천여주양평 CEO",      course: "ceo",   region: "icheon",        gi: "53",  open: "09.08", close: "12.01", day: "화",   weeks: "12주", fee: 2900000 },
  { name: "부산 CEO",            course: "ceo",   region: "busan",         gi: "78",  open: "09.08", close: "11.24", day: "화",   weeks: "12주", fee: 2900000 },
  { name: "대구경북 HIP",         course: "hip",   region: "daegu",         gi: "9",   open: "09.09", close: "10.14", day: "수",   weeks: "5주",  fee: 1300000 },
  { name: "수원 CEO",            course: "ceo",   region: "suwon",         gi: "67",  open: "09.10", close: "12.03", day: "목",   weeks: "12주", fee: 2900000 },
  { name: "고양 CEO",            course: "ceo",   region: "goyang",        gi: "55",  open: "09.14", close: "12.07", day: "목",   weeks: "12주", fee: 2900000 },
  { name: "의정부양주포천 CEO",    course: "ceo",   region: "uijeongbu",     gi: "28",  open: "09.15", close: "12.01", day: "화",   weeks: "12주", fee: 2900000 },
  { name: "광주하남 CEO",         course: "ceo",   region: "gwangju-hanam", gi: "52",  open: "09.15", close: "12.01", day: "화",   weeks: "12주", fee: 2900000 },
  { name: "광명 CEO",            course: "ceo",   region: "gwangmyeong",   gi: "57",  open: "09.16", close: "12.02", day: "수",   weeks: "12주", fee: 2900000 },
  { name: "대전 CEO",            course: "ceo",   region: "daejeon",       gi: "53",  open: "10.01", close: "12.17", day: "목",   weeks: "12주", fee: 2900000 },
  { name: "서울 차세대 경영자",    course: "ceo",   region: "seoul",         gi: "2",   open: "10.05", close: "12.17", day: "화",   weeks: "12주", fee: 3600000, variant: "차세대 경영자 과정" },
  { name: "대구 DCC",            course: "dcc",   region: "daegu",         gi: "76",  open: "10.02", close: "12.08", day: "화",   weeks: "8주",  fee: 1300000 },
  { name: "목포 CEO",            course: "ceo",   region: "mokpo",         gi: "1",   open: "10.07", close: "12.23", day: "수",   weeks: "12주", fee: 2750000 },
  { name: "여수 CEO",            course: "ceo",   region: "yeosu",         gi: "3",   open: "10.08", close: "12.24", day: "목",   weeks: "12주", fee: 2750000 },
  { name: "광주 CEO",            course: "ceo",   region: "gwangju",       gi: "64",  open: "10.12", close: "12.28", day: "월",   weeks: "12주", fee: 2900000 },
  { name: "청주 CEO",            course: "ceo",   region: "cheongju",      gi: "",    open: "10.13", close: "12.29", day: "화",   weeks: "12주", fee: 2900000 },
  { name: "서울 DCC(단기)",       course: "dcc",   region: "seoul",         gi: "3",   open: "10.16", close: "10.23", day: "금",   weeks: "3일",  fee: 1200000, variant: "단기 집중" },
  { name: "서울 TLA",            course: "tla",   region: "seoul",         gi: "11",  open: "10.21", close: "11.25", day: "수",   weeks: "6주",  fee: 1300000 },
  { name: "진주 CEO",            course: "ceo",   region: "jinju",         gi: "75",  open: "10.26", close: "01.11", day: "월",   weeks: "12주", fee: null },
  { name: "서울 DCC",            course: "dcc",   region: "seoul",         gi: "529", open: "11.04", close: "12.23", day: "수",   weeks: "8주",  fee: 1300000 },
  { name: "서울 DYLP",           course: "dylp",  region: "seoul",         gi: "18",  open: "11.12", close: "11.13", day: "목·금", weeks: "2일",  fee: 800000 },
  { name: "서울 HIP",            course: "hip",   region: "seoul",         gi: "148", open: "11.19", close: "11.20", day: "화·수", weeks: "2일",  fee: 1300000 },
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
  "jeonbuk":       { name: "전북(전주)",      branch: "jeonbuk",  venue: "데일카네기 전북지사 (전주시 완산구 석산1길 14, 3층)" },
  "cheonan-asan":  { name: "천안·아산",       branch: "daejeon",  venue: "충남스마트워크센터 5층 (천안시 서북구 축구센터로 163)" },
  "cheongju":      { name: "청주",           branch: "daejeon",  venue: "청주 지정 강의장 (등록 시 개별 안내)" },
  "yongin":        { name: "용인",           branch: "gyeonggi", venue: "용인카네기강의장 (기흥구 동백중앙로 203 미주타운 504호)" },
  "suwon":         { name: "수원",           branch: "gyeonggi", venue: "수원문화원 (권선구 호매실로 237)" },
  "goyang":        { name: "고양",           branch: "gyeonggi", venue: "고양문화원 (일산서구 한류월드로 280)" },
  "paju":          { name: "파주",           branch: "gyeonggi", venue: "파주 지정 강의장 (등록 시 개별 안내)" },
  "siheung":       { name: "시흥",           branch: "gyeonggi", venue: "시흥강의장 (중심상가로 180, 4층 시흥총동문회관)" },
  "gwangmyeong":   { name: "광명",           branch: "gyeonggi", venue: "호텔 또는 지정 강의장 (등록 시 개별 안내)" },
  "hwaseong-osan": { name: "화성·오산",       branch: "gyeonggi", venue: "YBM연수원 (화성시 정남면 세자로 317, 관리동 2층)" },
  "uijeongbu":     { name: "의정부·양주·포천", branch: "gyeonggi", venue: "의양포강의장 (의정부시 금오로 118 금성빌딩 3층)" },
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
    short: "Since 1992, 전국 40여 도시에서 15,000명의 CEO가 선택한 대한민국 대표 경영자 리더십 과정",
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

module.exports = { BASE_URL, YEAR_LABEL, FORM_ENDPOINT, SCHEDULE, REGIONS, BRANCH, COURSES };
