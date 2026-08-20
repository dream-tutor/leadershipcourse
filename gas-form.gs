/**
 * 데일카네기 공개과정 상담 접수 GAS
 *
 * ※ 이미 배포돼 있는 경우: 아래 SHEET_ID 줄만 지금 쓰던 값으로 바꾼 뒤 전체 붙여넣기 →
 *   배포 → 배포 관리 → 연필 아이콘 → 버전: 새 버전 → 배포 (URL은 그대로 유지됨)
 *   ★ '새 버전'으로 배포하지 않으면 코드를 고쳐도 /exec는 옛날 코드를 계속 실행합니다.
 *
 * 2026-08-20 개정 — 메일 알림이 조용히 실패하던 문제 대응
 *  1) 메일 실패 사유를 시트 마지막 열(메일알림)에 기록 → 왜 안 왔는지 눈으로 확인 가능
 *  2) 이름·연락처가 없는 호출(봇/크롤러가 소스에 박힌 이 URL을 그냥 찔러보는 경우)은 무시
 *     → 빈 행·빈 메일로 하루 메일 할당량(계정당 100통)을 태우는 것을 막음
 *  3) 남은 메일 할당량을 함께 기록
 *
 * 2026-08-20 폼 변경 — '소속·직급' 한 칸을 '소속' / '직급' 두 칸으로 분리
 *  ★ 시트에도 열을 하나 늘려야 합니다: E열(현재 '문의과정') 머리글 우클릭 →
 *    '왼쪽에 열 1개 삽입' → 1행 헤더에 '직급' 입력 (D열 헤더는 '소속'으로 수정).
 *    열을 안 늘리면 새 접수부터 직급 뒤 값이 한 칸씩 밀려 들어갑니다.
 *
 * ※ 테스트는 브라우저에서 직접 폼 제출로 할 것 (curl -X POST 금지 — GET 방식 접수)
 */
// ┌───────────────────────────────────────────────────────────────────────┐
// │ ★★★ 붙여넣은 뒤 이 아래 한 줄을 반드시 고치세요 ★★★                    │
// │ 카네기 접수 시트를 열고 주소창의 주소를 통째로 복사해서 따옴표 안에 넣으면 됩니다. │
// │ (https://docs.google.com/spreadsheets/d/…/edit 형태 그대로 — ID만 자동 추출) │
// │ 안 고치면 접수가 시트에 안 들어갑니다 (메일 알림은 그래도 갑니다).          │
// └───────────────────────────────────────────────────────────────────────┘
var SHEET_ID = "여기에_시트_ID_또는_URL_붙여넣기";
var ALERT_TO = "zskykr@naver.com";

function doGet(e) {
  var p = (e && e.parameter) || {};
  var name = (p["이름"] || "").trim();
  var tel = (p["연락처"] || "").trim();
  var org = (p["소속"] || "").trim();
  var rank = (p["직급"] || "").trim();
  // 구버전 사이트 호환 — 아직 새 페이지가 배포되기 전이면 '소속직급' 한 덩어리로 온다.
  // 이 경우 마지막 낱말을 직급으로 보고 나눈다 (예: "OO전자 팀장" → 소속 OO전자 / 직급 팀장).
  if (!org && p["소속직급"]) {
    var parts = String(p["소속직급"]).trim().split(/\s+/);
    rank = rank || (parts.length > 1 ? parts.pop() : "");
    org = parts.join(" ");
  }
  // 봇/크롤러가 파라미터 없이 이 URL을 호출하는 경우 — 기록도 메일도 하지 않는다
  if (!name && !tel) return ContentService.createTextOutput("OK");

  // 시트를 먼저 연다. 실패해도 여기서 멈추지 않는다 —
  // 시트가 잘못돼 있다고 접수 자체를 잃어버리면 안 되므로, 사유를 들고 메일 발송으로 넘어간다.
  var sh = null, sheetErr = "";
  try {
    var id = (SHEET_ID.match(/[-\w]{25,}/) || [SHEET_ID])[0];
    sh = SpreadsheetApp.openById(id).getSheets()[0];
  } catch (err) {
    sheetErr = (err && err.message ? err.message : String(err));
  }

  var quota = -1, mailNote = "";
  try { quota = MailApp.getRemainingDailyQuota(); } catch (err) { quota = -1; }
  try {
    if (quota === 0) throw new Error("일일 메일 할당량 소진(계정 공통 100통)");
    MailApp.sendEmail(
      ALERT_TO,
      "[카네기코스] 새 상담 접수: " + (name || "무명") + " (" + (p["지역"] || "지역 미선택") + " / " + (p["관심과정"] || "과정 미선택") + ")",
      "이름: " + name + "\n연락처: " + tel +
      "\n소속: " + org + "\n직급: " + rank + "\n과정: " + (p["관심과정"] || "") +
      "\n지역: " + (p["지역"] || "") +
      "\n\n문의내용:\n" + (p["문의내용"] || "") + "\n\n유입: " + (p["유입페이지"] || "") +
      (sheetErr ? "\n\n⚠ 시트 기록 실패 — 이 메일 내용을 직접 옮겨 적으세요.\n사유: " + sheetErr : "")
    );
    mailNote = "메일 발송 (남은 할당량 " + (quota > 0 ? quota - 1 : "?") + ")";
  } catch (err) {
    mailNote = "메일 실패: " + (err && err.message ? err.message : err) + " (남은 할당량 " + quota + ")";
  }

  if (!sh) return ContentService.createTextOutput("OK (sheet error: " + sheetErr + ")");

  sh.appendRow([
    Utilities.formatDate(new Date(), "Asia/Seoul", "M/d HH:mm"),
    name,
    tel,
    org,
    rank,
    p["관심과정"] || "",
    p["지역"] || "",
    p["연락희망시간"] || "",
    p["문의내용"] || "",
    p["유입페이지"] || "",
    p["유입페이지제목"] || "",
    p["유입경로"] || "",
    mailNote,
  ]);
  return ContentService.createTextOutput("OK");
}

/**
 * 메일 알림 진단 — Apps Script 편집기에서 이 함수를 선택하고 ▶실행 후 '실행 로그'를 보면 됨.
 * 시트에는 아무것도 쓰지 않는다.
 */
function 진단() {
  var q = MailApp.getRemainingDailyQuota();
  Logger.log("오늘 남은 메일 할당량: " + q + " 통 (0이면 이게 원인)");
  Logger.log("스크립트 실행 계정: " + Session.getEffectiveUser().getEmail());
  if (q > 0) {
    MailApp.sendEmail(ALERT_TO, "[카네기코스] 알림 테스트", "이 메일이 보이면 GAS 메일 발송 자체는 정상입니다.\n안 보이면 네이버 스팸함을 확인하세요.");
    Logger.log("테스트 메일을 " + ALERT_TO + " 로 보냈습니다. 받은편지함과 스팸함을 모두 확인하세요.");
  }
}
