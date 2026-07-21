/**
 * 데일카네기 공개과정 상담 접수 GAS
 *
 * 설치 (5분):
 * 1. 구글 시트 새로 만들기 → 1행에 헤더 입력:
 *    접수시각 | 이름 | 연락처 | 소속직급 | 문의과정 | 문의지역 | 연락희망시간 | 문의내용 | 유입페이지 | 유입페이지제목 | 유입경로
 * 2. 시트 URL의 /d/ 와 /edit 사이 ID를 아래 SHEET_ID에 붙여넣기
 * 3. script.google.com → 새 프로젝트 → 이 파일 내용 붙여넣기
 * 4. 배포 → 새 배포 → 웹 앱 → 실행: 나 / 액세스: 모든 사용자 → 배포
 * 5. 발급된 /exec URL을 site/data.js 의 FORM_ENDPOINT 에 붙여넣고 node build.js 재실행
 *
 * ※ 코드 수정 후에는 배포 → 배포 관리 → 연필 아이콘 → 버전: 새 버전 → 배포 (URL은 그대로 유지됨)
 * ※ 테스트는 브라우저에서 직접 폼 제출로 할 것 (curl -X POST 금지 — GET 방식 접수)
 */
// 시트 ID 또는 시트 전체 URL을 붙여넣어도 됨 (자동으로 ID만 추출)
var SHEET_ID = "여기에_시트_ID_또는_URL_붙여넣기";

function doGet(e) {
  var p = (e && e.parameter) || {};
  var id = (SHEET_ID.match(/[-\w]{25,}/) || [SHEET_ID])[0];
  var sh = SpreadsheetApp.openById(id).getSheets()[0];
  sh.appendRow([
    Utilities.formatDate(new Date(), "Asia/Seoul", "M/d HH:mm"),
    p["이름"] || "",
    p["연락처"] || "",
    p["소속직급"] || "",
    p["관심과정"] || "",
    p["지역"] || "",
    p["연락희망시간"] || "",
    p["문의내용"] || "",
    p["유입페이지"] || "",
    p["유입페이지제목"] || "",
    p["유입경로"] || "",
  ]);
  return ContentService.createTextOutput("ok");
}
