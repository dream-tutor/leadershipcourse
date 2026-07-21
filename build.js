// ============================================================
// 데일카네기 공개과정 홍보 사이트 생성기
// 실행: node build.js  →  ./dist 폴더에 전체 페이지 생성
// ============================================================
const fs = require("fs");
const path = require("path");
const { BASE_URL, YEAR_LABEL, FORM_ENDPOINT, SCHEDULE, REGIONS, BRANCH, COURSES, REVIEWS } = require("./data.js");
const GUIDES = [...require("./guides-reference.js"), ...require("./guides-columns.js")];

const OUT = path.join(__dirname, "docs"); // GitHub Pages 배포 폴더 (main 브랜치 /docs)
fs.mkdirSync(OUT, { recursive: true });

const fee = (v) => (v == null ? "미정" : v.toLocaleString("ko-KR") + "원");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ------------------------------------------------------------
// 공통 레이아웃
// ------------------------------------------------------------
function page({ file, title, desc, body, hero = "", jsonld = null }) {
  const url = `${BASE_URL}/${file === "index.html" ? "" : file}`;
  return {
    file,
    html: `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="ko_KR">
<meta name="google-site-verification" content="VX3_rCXNNSHvHSQZHKBdGHgiPDfJ0M2wZ6wJtFcq_YU">
<meta name="naver-site-verification" content="dbd104a111caeca5379e2fd4b5e27f55a5eec692">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230c3b2e'/%3E%3Ctext x='32' y='45' font-size='34' font-weight='bold' text-anchor='middle' fill='%23c6a15b' font-family='Arial'%3EC%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="style.css">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="index.html"><span class="brand-word">카네기<em>코스</em></span></a>
    <nav class="nav">
      <a href="about.html">데일 카네기 소개</a>
      <a href="index.html#courses">과정 안내</a>
      <a href="index.html#schedule">개강 일정</a>
      <a href="index.html#regions">지역별 안내</a>
      <a href="reviews.html">수강 후기</a>
      <a href="guide.html">리더십 칼럼</a>
      <a class="nav-cta" href="#consult">상담 신청</a>
      <details class="mnav">
        <summary aria-label="메뉴 열기">☰</summary>
        <div class="mnav-list">
          <a href="about.html">데일 카네기 소개</a>
          <a href="index.html#courses">과정 안내</a>
          <a href="index.html#schedule">개강 일정</a>
          <a href="index.html#regions">지역별 안내</a>
          <a href="reviews.html">수강 후기</a>
          <a href="guide.html">리더십 칼럼</a>
          <a href="#consult">상담 신청</a>
        </div>
      </details>
    </nav>
  </div>
</header>
${hero}
<main>
${body}
</main>
${footer()}
<a class="float-cta" href="#consult">상담 신청</a>
<script defer src="https://xn--vb0by3y5wigqb.com/t.js" data-site="carnegie"></script>
<script>
(function(){
  var fc = document.querySelector('.float-cta');
  var consult = document.getElementById('consult');
  if(!fc || !consult || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function(en){ fc.classList.toggle('hide', en[0].isIntersecting); }).observe(consult);
})();
</script>
</body>
</html>`,
  };
}

function footer() {
  const regionLinks = Object.entries(REGIONS)
    .map(([slug, r]) => `<a href="${slug}.html">${r.name}</a>`)
    .join("\n");
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-word">카네기<em>코스</em></div>
        <p>Since 1912, 전 세계 90여 개국 900만 명이 수료한<br>세계 최고의 성인교육 프로그램.<br>대한민국에서는 1992년부터 함께해 왔습니다.</p>
        <a class="btn btn-gold footer-cta" href="#consult">상담 신청하기</a>
      </div>
      <div class="footer-branches">
        <h3>지역별 과정 안내</h3>
        <div class="footer-regions">${regionLinks}</div>
      </div>
    </div>
    <p class="footer-fine">데일카네기 공개과정 안내 페이지 · 과정 일정과 수강료는 사정에 따라 변경될 수 있습니다. 문의는 상담 신청 양식을 이용해 주세요.</p>
  </div>
</footer>`;
}

// ------------------------------------------------------------
// 공용 조각
// ------------------------------------------------------------
const WHY5 = [
  ["역사와 전통", "1912년 이래 100여 년, 전 세계 900만 명 이상의 수료생을 배출한 역사와 전통의 교육"],
  ["글로벌 스탠다드", "미국 Fortune지 선정 500대 기업 중 400개 이상이 선택한 글로벌 스탠다드"],
  ["최상의 교육 수준", "ISO 9001 인증, 250시간 이상 엄격한 과정으로 훈련된 전문 강사진"],
  ["검증된 원칙의 실전 적용", "글로벌 베스트셀러 카네기 인간관계론·스피치론·스트레스론의 핵심을 실전에 적용"],
  ["경영 시너지", "각계각층 리더들의 경험과 노하우 공유를 통한 경영 시너지 효과"],
];

function why5Html() {
  return `<section class="section why">
  <div class="wrap">
    <h2 class="sec-title">탁월한 리더가 카네기를 선택하는 이유</h2>
    <ol class="why-list">
      ${WHY5.map(([t, d], i) => `<li><span class="why-num">0${i + 1}</span><div><strong>${t}</strong><p>${d}</p></div></li>`).join("\n")}
    </ol>
  </div>
</section>`;
}

function scheduleTable(rows, { linkRegion = true } = {}) {
  const tr = rows
    .map((r) => {
      const reg = REGIONS[r.region];
      const name = linkRegion ? `<a href="${r.region}.html">${r.name}</a>` : r.name;
      return `<tr>
        <td class="td-name">${name}</td>
        <td>${r.gi ? r.gi + "기" : "-"}</td>
        <td>${r.open}</td>
        <td>${r.close}</td>
        <td>${r.day}</td>
        <td>${r.weeks}</td>
        <td class="td-fee">${fee(r.fee)}</td>
      </tr>`;
    })
    .join("\n");
  return `<p class="table-hint">← 표를 옆으로 밀어서 볼 수 있습니다</p>
  <div class="table-wrap"><table class="sched">
    <thead><tr><th>과정</th><th>기수</th><th>개강</th><th>수료</th><th>요일</th><th>기간</th><th>수강료</th></tr></thead>
    <tbody>${tr}</tbody>
  </table></div>`;
}

// 교육 현장 사진 갤러리 (얼굴 모자이크 처리본)
const GALLERY_IMGS = [
  ["class-001.jpg", "데일카네기 강의 현장 — 강사와 수강생"],
  ["class-006.jpg", "펩톡(Pep Talk) 실습 장면"],
  ["class-007.jpg", "수강생 네트워킹과 조별 실습"],
  ["class-009.jpg", "수강생 발표 실습 장면"],
  ["class-005.jpg", "데일카네기 최고경영자과정 교육장"],
  ["class-004.jpg", "데일카네기 공인 수료증과 리더십 어워드 메달"],
];

function galleryHtml(count = 4, title = "교육 현장") {
  const imgs = GALLERY_IMGS.slice(0, count)
    .map(([f, alt]) => `<figure class="ph"><img src="assets/${f}" alt="${alt}" loading="lazy"><figcaption>${alt}</figcaption></figure>`)
    .join("\n");
  return `<section class="section gallery-sec">
  <div class="wrap">
    <h2 class="sec-title">${title}</h2>
    <p class="sec-sub">실제 교육 현장의 모습입니다. (수강생 얼굴은 개인정보 보호를 위해 처리했습니다)</p>
    <div class="gallery">${imgs}</div>
  </div>
</section>`;
}

function consultSection(preset = {}) {
  const courseOpts = Object.values(COURSES)
    .map((c) => `<option value="${c.name}"${preset.course === c.slug ? " selected" : ""}>${c.name} (${c.code})</option>`)
    .join("");
  const regionOpts = Object.entries(REGIONS)
    .map(([slug, r]) => `<option value="${r.name}"${preset.region === slug ? " selected" : ""}>${r.name}</option>`)
    .join("");
  return `<section class="consult" id="consult">
  <div class="wrap consult-grid">
    <div class="consult-copy">
      <h2>상담 신청</h2>
      <p>과정 선택이 고민되시거나 일정·수강료가 궁금하시면<br>아래 양식으로 남겨 주세요. 확인 후 순차적으로 연락드립니다.</p>
      <ul class="consult-points">
        <li>접수는 교육 시작일 일주일 전까지 — 조기 마감될 수 있습니다</li>
        <li>모집 절차: 수강신청 → 서류심사 → 결과 개별안내 → 등록완료 (약 1주일)</li>
        <li>기업 단체교육 · 지역 개설 문의도 환영합니다</li>
      </ul>
    </div>
    <form class="consult-form" id="consultForm" autocomplete="off">
      <div class="form-row two">
        <label>이름 <span>*</span><input type="text" name="이름" required placeholder="성함"></label>
        <label>연락처 <span>*</span><input type="tel" name="연락처" required placeholder="010-0000-0000"></label>
      </div>
      <div class="form-row two">
        <label>소속 · 직급<input type="text" name="소속직급" placeholder="예: 기업 대표 / OO전자 팀장 / 자영업"></label>
        <label>연락 희망 시간<select name="연락희망시간"><option value="아무 때나">아무 때나</option><option>오전 (9시~12시)</option><option>오후 (12시~18시)</option><option>저녁 (18시 이후)</option></select></label>
      </div>
      <div class="form-row two">
        <label>문의 과정<select name="관심과정"><option value="">선택해 주세요</option>${courseOpts}<option value="기타 문의">기타 문의</option></select></label>
        <label>문의 지역<select name="지역"><option value="">선택해 주세요</option>${regionOpts}<option value="기타/미정">기타/미정</option></select></label>
      </div>
      <div class="form-row">
        <label>문의 내용<textarea name="문의내용" rows="5" placeholder="문의하시게 된 계기, 관심 있는 교육 주제, 등록·수강 관련 궁금한 점을 자유롭게 남겨 주세요"></textarea></label>
      </div>
      <button type="submit" class="btn btn-gold form-submit">상담 신청하기</button>
      <p class="form-fine">남겨주신 정보는 상담 목적으로만 사용됩니다.</p>
      <div class="form-done" id="consultDone" hidden>
        <strong>상담 신청이 접수되었습니다.</strong>
        <p>확인 후 순차적으로 연락드리겠습니다. 감사합니다.</p>
      </div>
    </form>
  </div>
  <script>
  (function(){
    var EP = ${JSON.stringify(FORM_ENDPOINT)};
    var form = document.getElementById('consultForm');
    if(!form) return;
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var f = new FormData(form);
      var name = (f.get('이름')||'').trim(), tel = (f.get('연락처')||'').trim();
      if(!name || !tel){ alert('이름과 연락처를 입력해 주세요.'); return; }
      var btn = form.querySelector('.form-submit');
      btn.disabled = true; btn.textContent = '접수 중...';
      var data = {
        '이름': name, '연락처': tel, '소속직급': f.get('소속직급')||'',
        '관심과정': f.get('관심과정')||'', '지역': f.get('지역')||'',
        '연락희망시간': f.get('연락희망시간')||'', '문의내용': f.get('문의내용')||'',
        '신청일': new Date().toLocaleString('ko-KR'),
        '유입페이지': location.href, '유입페이지제목': document.title,
        '유입경로': document.referrer || '직접입력'
      };
      var qs = Object.keys(data).map(function(k){ return encodeURIComponent(k)+'='+encodeURIComponent(data[k]); }).join('&');
      if(EP){ var img = new Image(); img.src = EP + '?' + qs; }
      else { console.warn('FORM_ENDPOINT 미설정 — 데모 모드(시트 기록 없음)'); }
      setTimeout(function(){
        form.querySelectorAll('.form-row, .form-submit, .form-fine').forEach(function(el){ el.style.display = 'none'; });
        document.getElementById('consultDone').hidden = false;
      }, 700);
    });
  })();
  </script>
</section>`;
}

// ------------------------------------------------------------
// 홈
// ------------------------------------------------------------
function buildIndex() {
  const courseCards = ["ceo", "dcc", "dcs", "lac", "ltm", "dylp", "hip", "youth"]
    .map((k) => {
      const c = COURSES[k];
      return `<a class="course-card" href="${c.slug}.html">
        <span class="course-code">${c.code}</span>
        <h3>${c.name}</h3>
        <p class="course-tag">${c.tag}</p>
        <p class="course-short">${c.short}</p>
        <span class="course-meta">${c.duration}</span>
        <span class="course-more">자세히 보기 →</span>
      </a>`;
    })
    .join("\n");

  const regionChips = Object.entries(REGIONS)
    .map(([slug, r]) => `<a class="chip" href="${slug}.html">${r.name}</a>`)
    .join("\n");

  const hero = `<section class="hero">
  <div class="wrap hero-inner">
    <p class="hero-kicker">Since 1912 · Korea 1992 · Transformation Starts Here</p>
    <h1>시대가 변해도<br>변하지 않는 가치에 집중하라</h1>
    <p class="hero-sub">전 세계 900만 명이 경험한 데일카네기 트레이닝 —<br>${YEAR_LABEL} 전국 공개과정이 여러분을 기다립니다.</p>
    <div class="hero-actions">
      <a class="btn btn-gold" href="#schedule">${YEAR_LABEL} 개강 일정 보기</a>
      <a class="btn btn-line" href="#courses">과정 안내</a>
    </div>
  </div>
</section>
<section class="stats">
  <div class="wrap stats-grid">
    <div><strong>900만+</strong><span>전 세계 누적 수료생</span></div>
    <div><strong>90개국</strong><span>30개 이상 언어로 교육</span></div>
    <div><strong>400개+</strong><span>Fortune 500 파트너 기업</span></div>
    <div><strong>연 5,000명</strong><span>국내 연간 수료생</span></div>
  </div>
</section>`;

  const body = `
${why5Html()}

<section class="section" id="courses">
  <div class="wrap">
    <h2 class="sec-title">데일카네기 공개과정 라인업</h2>
    <p class="sec-sub">경영자부터 신임리더, 세일즈, 프레젠테이션, 청소년까지 — 필요한 역량에 맞는 과정을 선택하세요.</p>
    <div class="course-grid">${courseCards}</div>
  </div>
</section>

<section class="section alt" id="schedule">
  <div class="wrap">
    <h2 class="sec-title">${YEAR_LABEL} 개강 일정</h2>
    <p class="sec-sub">과정명을 누르면 해당 지역 안내 페이지로 이동합니다. 접수는 교육 시작 일주일 전까지이며 조기 마감될 수 있습니다.</p>
    ${scheduleTable(SCHEDULE)}
  </div>
</section>

<section class="section" id="regions">
  <div class="wrap">
    <h2 class="sec-title">지역별 과정 안내</h2>
    <p class="sec-sub">서울부터 제주까지, 전국 어디서나 가까운 곳에서 데일카네기를 만나실 수 있습니다.</p>
    <div class="chip-grid">${regionChips}</div>
  </div>
</section>

<section class="section alt about-teaser">
  <div class="wrap teaser-grid">
    <img src="assets/dale.jpg" alt="데일 카네기" class="teaser-photo">
    <div>
      <h2 class="sec-title">데일 카네기, 인간경영의 시작</h2>
      <p>1912년 미국 뉴욕, 데일 카네기는 "성공과 삶의 85%는 인간관계"라는 통찰로 세계 최초의 성인 리더십 교육을 시작했습니다.
      저서 <em>카네기 인간관계론(How to Win Friends and Influence People)</em>은 지금까지도 전 세계 리더들의 필독서로 읽히고 있습니다.</p>
      <p>워렌 버핏은 "데일 카네기 코스에서 배운 인간관계와 커뮤니케이션 스킬은 내가 가진 것 중 가장 중요한 학위였다"고 말했습니다.</p>
      <a class="btn btn-green" href="about.html">데일 카네기 이야기 →</a>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title">리더십 칼럼</h2>
    <p class="sec-sub">카네기 인간관계론 원칙부터 발표 불안, 동기부여, CEO 네트워킹까지 — 리더의 고민에 답하는 글들.</p>
    <div class="guide-grid">${GUIDES.slice(0, 6).map(guideCard).join("\n")}</div>
    <p style="margin-top:22px"><a class="btn btn-green" href="guide.html">칼럼 전체 보기 →</a></p>
  </div>
</section>

${galleryHtml(4)}

<section class="section quotes alt">
  <div class="wrap">
    <h2 class="sec-title">수료생들의 이야기</h2>
    <div class="quote-grid">
      <blockquote>"데일 카네기 코스에서 인간관계, 커뮤니케이션 스킬을 체계적으로 배웠다. 그것은 내가 가진 것 중에 가장 중요한 학위였다."<cite>— 워렌 버핏 (버크셔해서웨이 회장)</cite></blockquote>
      <blockquote>"카네기 교육을 받고 난 후 사람들 앞에서 당황하지 않고 자진해서 이야기를 하게 되었고 도전적인 일을 좋아하게 되었다."<cite>— 리 아이아코카 (전 크라이슬러 회장)</cite></blockquote>
      <blockquote>"열정과 인간관계에 관한 현장 교육은 저희 기업을 활기찬 조직으로 바꾸는 데 큰 힘이 되었습니다."<cite>— 박성수 (이랜드그룹 회장)</cite></blockquote>
      <blockquote>"비전을 공유시키는 커뮤니케이션, 인간경영은 사업의 핵심이다. 나는 카네기 코스를 통하여 이러한 기술들을 얻을 수 있었다."<cite>— 손병두 (호암재단 이사장)</cite></blockquote>
    </div>
    <h2 class="sec-title" style="margin-top:52px">수강생이 직접 쓴 수료 후기</h2>
    <div class="quote-grid">
      ${REVIEWS.slice(0, 4).map((rv) => `<blockquote>"${rv.excerpt}"<cite>— ${rv.author} · <a href="reviews.html">전문 보기</a></cite></blockquote>`).join("\n")}
    </div>
    <p style="margin-top:22px"><a class="btn btn-green" href="reviews.html">수강 후기 전체 보기 →</a></p>
  </div>
</section>

${consultSection()}`;

  return page({
    file: "index.html",
    title: `데일카네기 공개과정 | ${YEAR_LABEL} 전국 개강 일정 안내`,
    desc: `데일카네기 최고경영자 코스·데일카네기 코스(DCC)·리더십·세일즈·프레젠테이션 과정의 ${YEAR_LABEL} 전국 개강 일정. 서울 부산 대구 대전 광주 등 전국 20여 개 지역 개설.`,
    hero,
    body,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "데일카네기코리아 공개과정",
      url: BASE_URL,
      telephone: BRANCH.hq.tel,
      address: { "@type": "PostalAddress", addressLocality: "서울", streetAddress: BRANCH.hq.addr },
    },
  });
}

// ------------------------------------------------------------
// 데일 카네기 소개
// ------------------------------------------------------------
function buildAbout() {
  const hero = `<section class="hero hero-sm">
  <div class="wrap hero-inner">
    <p class="hero-kicker">Dale Carnegie · 1888 – 1955</p>
    <h1>사람을 움직이는 힘,<br>데일 카네기 이야기</h1>
  </div>
</section>`;

  const body = `
<section class="section">
  <div class="wrap teaser-grid">
    <img src="assets/dale-book.jpg" alt="데일 카네기" class="teaser-photo">
    <div>
      <h2 class="sec-title">인간경영 교육의 창시자</h2>
      <p>데일 카네기(Dale Carnegie)는 1912년 미국 뉴욕 YMCA에서 성인 대상 스피치 강좌를 시작하며,
      세계 최초의 체계적인 성인 리더십 교육을 만들었습니다. 그는 "기술이 아니라 사람이 성공의 본질"이라는
      신념 아래 인간관계·커뮤니케이션·자신감·스트레스 관리를 훈련 가능한 역량으로 정립했습니다.</p>
      <p>그의 저서 <em>카네기 인간관계론</em>, <em>카네기 스피치론</em>, <em>카네기 스트레스론(자기관리론)</em>은
      전 세계 수천만 부가 판매되며 지금까지도 리더들의 필독서로 자리하고 있습니다.</p>
      <p>데일카네기 트레이닝은 오늘날 <strong>90여 개국, 30개 이상의 언어</strong>로 진행되며
      <strong>900만 명 이상</strong>의 수료생을 배출했습니다. 미국 Fortune 500대 기업 중 400개 이상이
      임직원 교육 파트너로 데일카네기를 선택하고 있습니다.</p>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title">카네기 자기개발 사이클</h2>
    <p class="sec-sub">데일카네기 트레이닝의 교육 방법론 — 지식 전달이 아닌 행동 변화를 만드는 4단계</p>
    <div class="cycle-grid">
      <div><span>1단계</span><strong>결과 Result</strong><p>훈련을 통해 얻어야 할 성과와 목표를 명확하게 설정합니다.</p></div>
      <div><span>2단계</span><strong>태도 Attitude</strong><p>필요를 인식하고 변화를 수용하며 새로운 것을 배우겠다는 확고한 의지를 형성합니다.</p></div>
      <div><span>3단계</span><strong>지식 Knowledge</strong><p>성과가 증명된 근본적이고 체계적인 개념과 원리·원칙을 익힙니다.</p></div>
      <div><span>4단계</span><strong>연습 Practice</strong><p>코치의 코칭을 통해 습득한 지식을 스킬로 만들어 비즈니스 현장에 적용합니다.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="sec-title">인간경영리더십 4단계</h2>
    <ol class="step-list">
      <li><strong>우호적인 사람이 되라</strong> — 자신을 이해하고 감정을 조절하는 능력</li>
      <li><strong>협력을 얻어내라</strong> — 타인의 감정을 이해하고 쿠션을 하는 능력</li>
      <li><strong>리더가 되라</strong> — 실수하는 사람을 자산으로 만드는 능력</li>
      <li><strong>감동연설</strong> — 비전을 공유시키고 열정을 불어넣는 커뮤니케이션 능력</li>
    </ol>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title">데일카네기코리아, 1992년부터</h2>
    <p class="sec-sub">국내 도입 이래 삼성·현대·LG·KT·SK 등 대기업은 물론 Microsoft·IBM·지멘스·스타벅스·BMW·AUDI 등
    외국계 기업, 서울시청·사법연수원·인사혁신처·행정안전부 등 공공기관 임직원을 대상으로 매년 5,000명 이상의 수료생을 배출하고 있습니다.
    서울대·카이스트·포항공대·고려대 등 국내 대학에서 프로그램의 우수성을 인정받아 학점 및 교양과목으로도 진행되었습니다.</p>
  </div>
</section>

${why5Html()}
${consultSection()}`;

  return page({
    file: "about.html",
    title: "데일 카네기 소개 | 인간경영 교육의 창시자와 데일카네기코리아",
    desc: "1912년 시작된 데일카네기 트레이닝의 역사, 카네기 인간관계론, 자기개발 사이클 방법론, 그리고 1992년부터 이어온 데일카네기코리아의 교육 실적을 소개합니다.",
    hero,
    body,
  });
}

// ------------------------------------------------------------
// 과정별 상세 콘텐츠
// ------------------------------------------------------------
const DETAIL = {
  ceo: {
    intro: `일을 잘하는 전문가로서 경영자는 많이 있습니다. 하지만 직원들의 열렬한 협력을 이끌어내어 탁월한 성과를 꾸준히 창출하는 CEO는 그리 많지 않습니다.
    오늘날 하이테크(High-Tech) 시대에는 하이터치(High-Touch), 즉 사람의 마음을 이해하고 움직일 수 있는 감성 리더십이 더욱 절실합니다.
    수많은 리더들이 자신의 삶으로 검증한 최고의 교육, 사업 성과 향상의 변화를 경험하고, 최고 수준의 네트워킹을 할 수 있는 데일카네기 최고경영자 과정에 참여하세요.`,
    goals: ["삶에 대한 방향성 정립과 균형", "자신을 이해하고 감정을 조절하는 능력", "타인의 감정을 이해하고 공감하며 이끄는 능력", "태도를 변화시키고 실수를 학습으로 전환시키는 능력", "비전을 공유하고 영감을 주는 커뮤니케이션 능력", "유연한 사고와 태도"],
    targets: ["국내외 공·사기업 CEO, 기업 및 기관의 임원", "정부 및 주요기관의 공무원, 기관장, 단체장", "전문직(학계·언론·금융·법조계·문화예술 등) 및 사회 각 분야의 오피니언 리더"],
    curriculum: [
      ["1주", "성공의 기초 · 비전 설정"], ["2주", "이름 기억법 · 용기 개발"], ["3주", "인간관계 증진 · 자신감 증진"],
      ["4주", "열정 공약 · 성취 인식"], ["5주", "걱정·스트레스 극복 · 설득력 개발"], ["6주", "명확한 의사전달 · 새로운 자아발견"],
      ["7주", "우호적인 인간관계 형성 · 열렬한 협력을 얻는 법"], ["8주", "칭찬을 통한 동기부여 · 열정 개발"],
      ["9주", "열렬한 협력 창출 · 유연성 개발"], ["10주", "건설적인 의견 제시 · 스트레스 관리"],
      ["11주", "리더십 개발 · 타인 감동 리더십"], ["12주", "혁신적인 성과 및 비전 재설정"],
    ],
    extra: `<section class="section alt"><div class="wrap">
      <h2 class="sec-title">최고경영자과정 특전</h2>
      <div class="perk-grid">
        <div><span>01</span><strong>Certification</strong><p>전 세계 85개국에서 동일하게 인정되는 美 데일카네기 본사 공인 수료증 수여</p></div>
        <div><span>02</span><strong>Graduate · Assistant</strong><p>코스 수료 후 차기 프로그램에 코치로 활동 가능 &amp; 코치 수료증 발급</p></div>
        <div><span>03</span><strong>Carnegie Club</strong><p>한국카네기클럽 정회원 — 전국 30,000명 동문과 조찬포럼·트레킹·골프·세미나 등 교류</p></div>
        <div><span>04</span><strong>美 센트럴 미주리 대학교 MBA 자격</strong><p>최고경영자 과정 포함, 추가 과정 수료 시 '데일카네기 MBA코스' 수료증 발급</p></div>
      </div>
    </div></section>`,
  },
  dcc: {
    intro: `본질은 시대가 변해도 변하지 않습니다. 110년이 넘는 역사 동안 전 세계 900만 명의 삶을 바꾼 데일카네기 대표 프로그램,
    데일카네기 코스에서 삶과 비즈니스의 혁신적인 변화를 경험할 수 있습니다. 매주 도전적인 과제를 수행하며 내면의 자신감을 키워 나가고,
    삶과 일에서 주체성을 높이며 성취의 단단한 기반을 다질 수 있습니다.`,
    goals: ["자신감 증진을 통한 일과 삶에서의 주도적인 태도", "개인적·업무적 관계에서 보다 큰 영향력", "관계와 신뢰를 통한 긍정적 리더십", "다양한 상황에서의 효과적인 커뮤니케이션", "급변하는 비즈니스 환경에 유연하게 대처하는 힘"],
    targets: ["일과 삶의 터닝 포인트가 필요한 분", "일과 삶에서 Breakthrough가 필요한 분", "개인적·업무적 관계에서 보다 큰 영향력을 갖추고 싶은 분", "권위가 아닌 신뢰를 기초로 한 긍정적 리더십을 개발하고 싶은 분", "급변하는 비즈니스 환경에서도 유연하게 대처하고 싶은 분"],
    curriculum: [
      ["1주", "오리엔테이션 · 성공의 기초"], ["2주", "이름 기억법 · 비전 설정"], ["3주", "인간관계 증진 · 자신감 증진"],
      ["4주", "걱정·스트레스 극복 · 인간관계 증진과 동기부여"], ["5주", "명확한 의사전달 · 새로운 자아발견"],
      ["6주", "건설적인 의견 제시 · 열렬한 협력을 얻는 법"], ["7주", "스트레스 관리 · 유연성 개발"],
      ["8주", "칭찬을 통한 동기부여 · 타인 감동 리더십 · 리더십 개발 · 혁신적인 성과와 비전 재설정"],
    ],
    extra: `<section class="section alt"><div class="wrap">
      <h2 class="sec-title">관계의 시작부터 리더십까지</h2>
      <div class="cycle-grid three">
        <div><strong>관계 증진</strong><p>성공과 삶의 85%는 인간관계입니다. 나의 개인적·업무적 관계를 되돌아보고 관계의 질을 증진해 보세요.</p></div>
        <div><strong>협력 창출</strong><p>우리 혼자 성과와 목표를 달성할 수 없습니다. 다른 사람들의 열렬한 협력을 이끌어내는 역량을 높여 보세요.</p></div>
        <div><strong>리더십 발휘</strong><p>리더십은 직책에서 오지 않습니다. 굳건한 신뢰를 바탕으로 긍정적 영향력을 끼치는 리더십을 개발해 보세요.</p></div>
      </div>
    </div></section>`,
  },
  dcs: {
    intro: `AI는 설명을 대신합니다. 하지만 선택은 여전히 '사람'이 만듭니다. 이제 세일즈는 감이 아닌, 검증된 관계·신뢰·영향력의 시스템으로 움직입니다.
    데일카네기 세일즈 코스는 고객의 선택을 바꾸는 대화력·설득력·관계 구축력을 구조화하여 실제 매출과 장기 성과로 연결되는 세일즈 경쟁력을 완성합니다.`,
    goals: ["조직의 매출 구조가 '개인 의존형'에서 '시스템형'으로 전환", "성과 관리가 '결과 보고'에서 '예측 가능한 운영'으로 전환", "팀원 코칭이 쉬워지고 성과 편차 감소", "재구매·업셀링·추천 증가로 현장 성과 즉시 체감"],
    targets: ["팀의 세일즈 방식을 '제품 설명형'에서 '가치 중심형'으로 전환하고 싶은 세일즈 리더·매니저", "설득력 있는 대화 구조와 질문 체계를 갖추고 싶은 분", "지속적인 매출·재구매·추천을 만드는 팀 문화를 만들고 싶은 매니저", "영업 현장에서 자신감·표현력·질문 스킬을 확실히 향상시키고 싶은 실무자·리더"],
    curriculum: [
      ["1일차", "Unlocking Customer Impact — 고객 선택 구조, 가치 중심 세일즈, 성과 데이터 분석, 매출 전략 설계"],
      ["2일차", "Leading High-Impact Teams — 팀 세일즈 성과 리더십, 코칭 시스템, 성과 관리 체계, 세일즈 스킬 마스터"],
    ],
    extra: "",
  },
  lac: {
    intro: `AI가 일을 대신하는 시대, 사람은 리더의 '결정과 방향'에서 동기를 느낍니다. 지금, 성과를 만드는 리더의 핵심은 기술이 아니라
    '사람을 움직이는 힘'입니다. 리더십 어드밴티지 코스에서 팀원의 잠재력을 끌어내고, 팀을 이끌어 목표를 달성하는 방법에 대한 답을 찾아보세요.`,
    goals: ["지시형 리더 → 신뢰와 실행을 만드는 리더", "감정소모 리더 → 감정조절 & 영향력 리더", "혼자 뛰는 리더 → 팀을 성과로 움직이는 리더", "바쁜 리더 → 우선순위가 명확한 리더", "불안한 리더 → 자기확신이 있는 리더"],
    targets: ["실무는 잘하지만 리더 역할이 점점 버거워지는 분", "MZ세대와 소통·동기부여가 어려운 분", "열심히는 하는데 팀 성과가 잘 안 나는 분", "리더로서 나만의 기준과 방향이 필요한 분", "좋은 사람 아니라, 성과 만드는 리더가 되고 싶은 분"],
    curriculum: [
      ["Session 1", "AI시대, 방향 설정 리더십 (I-Leadership) — 리더의 핵심 역할, 영향력 구조, 리더십 위치 진단, 핵심가치·비전"],
      ["Session 2", "감성(EI) 리더십 (YOU-Leadership) — 팀원이 반응하는 언어, 심리적 안전감·신뢰 형성, 동기부여 구조"],
      ["Session 3", "성과를 만드는 실행 리더십 (WE-Leadership) — 실행 구조, 목표·역할·피드백 설계, 공식대화, 실수 처리법"],
      ["Session 4", "회복탄력성 리더십 — 번아웃 예방·관리, 인게이지먼트, DEI·포용적 리더십, 리더 성장 로드맵"],
    ],
    extra: "",
  },
  ltm: {
    intro: `회사는 대표가 인큐베이팅하고, 팀은 매니저가 인큐베이팅합니다. 조직의 크기는 달라도, 팀이 흔들리지 않고 성장하기 위해 필요한 것은
    결국 명확한 프로세스입니다. 매니저 리더십 과정은 팀의 비전·목표·역할·회의·피드백까지 팀을 구성하는 핵심 운영 프로세스를
    직접 설계하도록 돕는 실행형 인큐베이팅 과정입니다.`,
    goals: ["지시하는 리더 → 신뢰와 실행을 만드는 리더", "감정 소모가 큰 리더 → 감정조절과 영향력을 갖춘 리더", "혼자 뛰는 리더 → 팀을 성과로 움직이는 리더", "과정 종료 시 '팀을 인큐베이팅하는 운영 구조'를 매뉴얼화해서 가져갈 수 있음"],
    targets: ["회사를 직접 성장시켜야 하는 스타트업 대표", "팀이라는 '작은 회사'를 운영하는 팀 매니저", "외국계·중견기업 팀을 이끄는 리더", "팀의 비전·역할·피드백 체계를 제대로 세우고 싶은 리더"],
    curriculum: [
      ["Day 1", "팀을 인큐베이팅하는 운영 프로세스의 시작 — 팀 비전·방향 설정, 리딩 스타일 진단, 역할·책임 구조 설계"],
      ["Day 2", "프로세스와 피플 스킬의 통합 — 성과 관리 방법론, 커뮤니케이션 구조, 갈등을 줄이는 대화 기준, 동기부여 환경 설계"],
      ["Day 3", "실행력 프로세스와 성과 구조 만들기 — 목표·회의·피드백 프로세스 설계, 위임 프로세스, 변화 관리, 우리 팀의 성장 구조 완성"],
    ],
    extra: "",
  },
  dylp: {
    intro: `높은 성과를 낸 실무자가 준비 없이 바로 팀 리더의 역할을 맡는 경우가 많습니다. 그러나 좋은 실무역량이 탁월한 리더십을 담보하지는 못합니다.
    실무자에게 필요한 역량과 리더에게 요구되는 역량은 다릅니다. 신임리더 리더십 과정은 탁월한 실무자였던 신임리더의 리더십을 증진하기 위한 과정입니다.`,
    goals: ["리더에게 필요한 역량을 갖출 수 있습니다", "팀원들에게 롤모델이 되는 리더가 될 수 있습니다", "강점과 약점 인식을 통해 나만의 리더십 스타일을 갖출 수 있습니다", "신뢰 기반의 긍정적인 리더십을 발휘할 수 있습니다", "업무몰입도가 높은 팀을 구축할 수 있습니다"],
    targets: ["신임리더 또는 핵심인재", "좋은 모델이 되는 리더가 되고 싶으신 분", "자신만의 리더십 스타일을 갖추고 싶으신 분", "인게이지먼트 수준이 높은 팀을 만들고 싶으신 분"],
    curriculum: [
      ["1일차", "효과적인 리더십의 기초 · 다양성의 이해 · 성과 창출을 위한 관계형성 · 리더십의 성장기회 포착 (Leadership Impact Plan 작성)"],
      ["2일차", "리더의 자기인식 증진 · 리더의 자기 통제력 · 균형잡힌 커뮤니케이션 · 지속적인 실천과 성장"],
    ],
    extra: "",
  },
  hip: {
    intro: `비즈니스 미팅의 목표가 설득이든, 판매든, 영감을 주는 것이든 프레젠테이션은 경쟁자와의 차별점을 보여줄 수 있는 중요한 요소입니다.
    프레젠테이션은 연단에서만 하는 것이 아닙니다. 나의 의견을 전달하는 모든 상황이 프레젠테이션입니다.
    다양한 상황을 가정하여 연습과 코칭을 반복함으로써 어떠한 상황에서도 능숙하고 탁월한 프레젠테이션 스킬을 개발합니다.`,
    goals: ["체계적인 구조로 전문적인 프레젠테이션", "아이디어를 청중이 쉽게 이해하도록 전달", "청중을 설득하는 프레젠테이션", "내용·음성·제스처의 효과적 활용", "어떤 상황에서도 전문가적 태도를 잃지 않는 프레젠터"],
    targets: ["프레젠테이션 스킬이 필요하신 분", "프레젠테이션을 통해 전문성을 전달하고 싶으신 분", "논리적으로 자신의 아이디어를 전달하고 싶으신 분", "어떤 상황에서도 전문가적인 태도를 유지하고 싶으신 분"],
    curriculum: [
      ["S1~S4", "긍정적인 첫인상 창출 · 신뢰 형성 · 복잡한 정보를 쉽게 전달 · 더욱 강렬한 임팩트"],
      ["S5~S7", "타인을 행동하도록 동기부여 · 중압감을 받는 상황에서의 질의응답 · 변화를 받아들이도록 제안"],
    ],
    extra: "",
  },
  tla: {
    intro: `조직 내 개개인에게 차별화된 경쟁력을 요구하는 현재의 경영환경에서는 더 이상 최고경영자만 리더십을 필요로 하는 것이 아닙니다.
    리더십 어드밴티지 세미나는 참가자의 리더십을 증진하고 조직에서 원하는 성과를 낼 수 있도록 돕는 임원·팀장급 세미나입니다.`,
    goals: ["자신의 리더십 강점 개발 스킬", "타인의 리더십 잠재력을 이끌어내는 멘토링 스킬", "조직 내 비전과 미션을 공유하고 임파워먼트 시키는 스킬", "조직 내 직원들을 리더로 성장시키는 코칭 스킬"],
    targets: ["휴먼사이드 리더십이 필요한 임원", "사업부장 · 부문장 · 팀장 이상급 임직원"],
    curriculum: [
      ["1", "리더십 개관 — 리더십의 가치 인식, 변화와 위기를 기회로 전환, 나의 리더십 장단점과 목표"],
      ["2", "자기경영 — 가치관 설정, 자긍심과 리더십, 강점 발견, 리더로서의 비전 수립"],
      ["3", "신뢰경영 — 차이 존중, 공감적 경청, 장점 발견과 잠재력, 실수를 통한 학습과 성장"],
      ["4", "조직경영 — 비전·미션 공유, 권한 부여, 코칭 스킬, 팀 인게이지먼트"],
    ],
    extra: "",
  },
  youth: {
    intro: `청소년들의 잠재력과 글로벌 리더로서의 역량, 리더십 등의 인성교육은 자녀들의 가장 중요한 요소입니다.
    청소년을 위한 데일카네기 교육은 기업과 공공기관에서도 임직원들의 자녀를 위해 적극 도입되고 있는 검증된 프로그램입니다.`,
    goals: ["타인에 끌려가는 삶이 아닌 자신의 삶의 방향과 비전 설정", "사람을 사랑하고 이해하는 우호적 인간관계 형성", "긍정적 자아정체성 형성을 통한 자신감 증진", "걱정·스트레스를 조절하여 긍정적 에너지로 전환", "명확하고 영향력 있는 커뮤니케이션 스킬 함양", "학교와 가정에서 선한 영향력을 발휘하는 리더십 함양"],
    targets: ["초 · 중 · 고등학생 모든 청소년"],
    curriculum: [
      ["1일차", "The Leadership in Yourself — 성공의 기초, 긍정적인 첫인상 창출, 비전설정·용기개발, 자신감 증진"],
      ["2일차", "The Leadership in Others — 우호적 인간관계 증진, 설득력 개발, 걱정·스트레스 관리, 명확한 의사전달"],
      ["3일차", "The Leadership in Us — 성취 인식, 협력 리더십 개발, 칭찬 파워, 혁신적 성과 및 비전 재설정"],
    ],
    extra: "",
  },
};

function buildCourse(key) {
  const c = COURSES[key];
  const d = DETAIL[key];
  const rows = SCHEDULE.filter((r) => r.course === key);
  const hero = `<section class="hero hero-course">
  <div class="wrap hero-inner">
    <p class="hero-kicker">${c.code} · ${esc(c.eng)}</p>
    <h1>${c.name}</h1>
    <p class="hero-sub">${c.tag}</p>
  </div>
</section>`;

  const body = `
<section class="section">
  <div class="wrap narrow">
    <p class="lead">${d.intro}</p>
    <div class="fact-row">
      <div><span>기간</span><strong>${c.duration}</strong></div>
      <div><span>대상</span><strong>${c.target}</strong></div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap two-col">
    <div>
      <h2 class="sec-title-sm">이런 분께 추천합니다</h2>
      <ul class="check-list">${d.targets.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
    <div>
      <h2 class="sec-title-sm">이 과정을 들으면 이렇게 달라집니다</h2>
      <ul class="check-list gold">${d.goals.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="sec-title">커리큘럼</h2>
    <div class="table-wrap"><table class="curri">
      <thead><tr><th>구분</th><th>교육 내용</th></tr></thead>
      <tbody>${d.curriculum.map(([w, t]) => `<tr><td class="td-week">${w}</td><td>${t}</td></tr>`).join("")}</tbody>
    </table></div>
  </div>
</section>

${d.extra}

${rows.length ? `<section class="section">
  <div class="wrap">
    <h2 class="sec-title">${YEAR_LABEL} 개강 일정</h2>
    ${scheduleTable(rows)}
    ${key === "ceo" ? `<p class="sec-sub" style="margin-top:16px">이 외 지역별 상세 안내는 <a href="index.html#regions">지역별 안내</a>에서 확인하세요.</p>` : ""}
  </div>
</section>` : `<section class="section"><div class="wrap"><h2 class="sec-title">개강 일정</h2><p class="sec-sub">현재 모집 중인 기수 일정은 문의 시 안내드립니다.</p></div></section>`}

${COMBO_COURSES.includes(key) ? `<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title-sm">지역별 ${c.name} 안내</h2>
    <div class="chip-grid">
      ${Object.keys(REGIONS).map((s) => `<a class="chip" href="${comboFile(s, key)}">${REGIONS[s].name}</a>`).join("\n")}
    </div>
  </div>
</section>` : ""}

${key === "ceo" || key === "dcc" ? `${galleryHtml(4)}
<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title-sm">수강생이 직접 쓴 수료 후기</h2>
    <div class="quote-grid">
      ${REVIEWS.slice(0, 2).map((rv) => `<blockquote>"${rv.excerpt}"<cite>— ${rv.author}</cite></blockquote>`).join("\n")}
    </div>
    <p style="margin-top:18px"><a class="btn btn-green" href="reviews.html">수강 후기 전체 보기 →</a></p>
  </div>
</section>` : ""}

${consultSection({ course: key })}`;

  return page({
    file: `${c.slug}.html`,
    title: `${c.name} | ${c.tag}`,
    desc: `${c.short} — ${c.duration}. ${YEAR_LABEL} 개강 일정과 커리큘럼, 참가 대상 안내.`,
    hero,
    body,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Course",
      name: c.name,
      description: c.short,
      provider: { "@type": "Organization", name: "데일카네기코리아", telephone: BRANCH.hq.tel },
    },
  });
}

// ------------------------------------------------------------
// 지역 페이지
// ------------------------------------------------------------
function buildRegion(slug) {
  const r = REGIONS[slug];
  const b = BRANCH[r.branch];
  const rows = SCHEDULE.filter((s) => s.region === slug);
  const ceoRows = rows.filter((s) => s.course === "ceo");
  const mainCeo = ceoRows[0];

  const heroTitle = mainCeo
    ? `${r.name} 데일카네기<br>최고경영자 코스 <span class="gi">${mainCeo.gi ? mainCeo.gi + "기" : "신규"}</span>`
    : `${r.name} 데일카네기 과정 안내`;

  const hero = `<section class="hero hero-region">
  <div class="wrap hero-inner">
    <p class="hero-kicker">Since 1992 · ${r.name} 개설 과정 안내</p>
    <h1>${heroTitle}</h1>
    <p class="hero-sub">관계 증진 · 협력 창출 · 리더십 발휘</p>
  </div>
</section>`;

  const infoRows = mainCeo
    ? `<section class="section">
  <div class="wrap narrow">
    <h2 class="sec-title">${r.name} 최고경영자 코스 ${mainCeo.gi ? mainCeo.gi + "기" : ""} 모집 안내</h2>
    <dl class="info-list">
      <div><dt>지원 대상</dt><dd>국내외 공·사기업 CEO / 기업 및 기관의 임원, 정부 및 주요기관의 공무원·기관장·단체장, 전문직 및 사회 각 분야의 오피니언 리더</dd></div>
      <div><dt>교육 장소</dt><dd>${r.venue}</dd></div>
      <div><dt>교육 일정</dt><dd>2026년 ${mainCeo.open} 개강 ~ ${mainCeo.close} 수료 · 매주 ${mainCeo.day}요일 (${mainCeo.weeks} 과정)</dd></div>
      <div><dt>교 육 비</dt><dd>${fee(mainCeo.fee)} (1인)</dd></div>
      <div><dt>접수 기간</dt><dd>교육 시작일 일주일 전까지 &nbsp;※ 조기 마감될 수 있습니다</dd></div>
      <div><dt>모집 절차</dt><dd>수강신청 → 서류심사 → 결과 개별안내 → 수강료 납부 → 등록완료 (약 1주일 소요)</dd></div>
      <div><dt>문의·접수</dt><dd><a href="#consult">하단 상담 신청 양식으로 접수해 주세요 →</a></dd></div>
    </dl>
  </div>
</section>`
    : "";

  const body = `
${infoRows}

${rows.length ? `<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title">${r.name} ${YEAR_LABEL} 개설 과정</h2>
    ${scheduleTable(rows.map((x) => ({ ...x })), { linkRegion: false })}
    <p class="sec-sub" style="margin-top:14px">과정 상세:
      ${[...new Set(rows.map((x) => x.course))].map((k) => `<a href="${COURSES[k].slug}.html">${COURSES[k].name}</a>`).join(" · ")}
    </p>
  </div>
</section>` : ""}

<section class="section">
  <div class="wrap">
    <h2 class="sec-title-sm">${r.name} 과정별 안내</h2>
    <div class="chip-grid">
      ${COMBO_COURSES.map((k) => `<a class="chip" href="${comboFile(slug, k)}">${r.name} ${COURSES[k].name}</a>`).join("\n")}
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap narrow">
    <h2 class="sec-title">${r.name} CEO 모임 · 경영자 네트워킹을 찾고 계신가요</h2>
    <p>대표의 고민은 회사 안에서 나누기 어렵습니다. 그래서 ${r.name}의 많은 경영자들이 최고경영자 코스를 교육이자 동시에 검증된 경영자 모임으로 선택합니다.
    매주 저녁, 같은 지역에서 사업을 이끄는 CEO·임원·전문직 동기들과 12주를 함께 통과하며 쌓인 신뢰는 명함 교환식 모임과는 밀도가 다릅니다.</p>
    <ul class="check-list" style="margin-top:14px">
      <li>${r.name} 지역 기수 동기 모임 — 수료 후에도 계속되는 정기 교류</li>
      <li>한국카네기클럽 정회원 — 전국 30,000명 경영자 동문 네트워크</li>
      <li>조찬포럼 · 트레킹 · 골프 · 세미나 등 문화활동</li>
    </ul>
    <p class="sec-sub" style="margin-top:16px">관련 글: <a href="guide-ceo-network.html">CEO에게 좋은 모임이 필요한 진짜 이유</a></p>
  </div>
</section>

${why5Html()}

<section class="section alt">
  <div class="wrap two-col">
    <div>
      <h2 class="sec-title-sm">12주, 이렇게 진행됩니다</h2>
      <ul class="check-list">
        <li>계층별·업종별 전문가들과 유대 관계를 형성하고 혁신적인 목표를 설정합니다.</li>
        <li>인간관계를 증진시키는 검증된 프로세스를 학습합니다.</li>
        <li>스트레스에 영향을 받기 전에 스트레스를 관리합니다.</li>
        <li>논리성·명확성·정확성을 갖춘 커뮤니케이션 능력을 함양합니다.</li>
        <li>윈-윈(Win-Win) 관계를 형성하고 타인의 태도와 행동에 긍정적인 영향을 미칩니다.</li>
      </ul>
    </div>
    <div>
      <h2 class="sec-title-sm">수료 후에도 계속되는 인연</h2>
      <ul class="check-list gold">
        <li>美 데일카네기 본사 공인 수료증 (전 세계 85개국 동일 인정)</li>
        <li>한국카네기클럽 정회원 — 전국 30,000명 동문 네트워크</li>
        <li>조찬포럼·트레킹·골프·세미나 등 문화활동 참여</li>
        <li>차기 과정 코치 활동 기회 &amp; 코치 수료증</li>
      </ul>
    </div>
  </div>
</section>

${consultSection({ region: slug })}`;

  const titleGi = mainCeo && mainCeo.gi ? ` ${mainCeo.gi}기` : "";
  return page({
    file: `${slug}.html`,
    title: `${r.name} 데일카네기 최고경영자 코스${titleGi} | ${YEAR_LABEL} 모집 안내`,
    desc: `${r.name} 데일카네기 최고경영자 코스${titleGi} 모집. ${mainCeo ? `2026년 ${mainCeo.open} 개강, 매주 ${mainCeo.day}요일 ${mainCeo.weeks} 과정, 교육비 ${fee(mainCeo.fee)}.` : ""} ${r.venue} · 온라인 상담 신청 접수 중`,
    hero,
    body,
    jsonld: mainCeo
      ? {
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${r.name} 데일카네기 최고경영자 코스${titleGi}`,
          description: `관계 증진·협력 창출·리더십 발휘 — ${r.name}에서 열리는 데일카네기 최고경영자 코스`,
          provider: { "@type": "Organization", name: "데일카네기코리아 " + b.label },
        }
      : null,
  });
}

// ------------------------------------------------------------
// 수강 후기 페이지
// ------------------------------------------------------------
function buildReviews() {
  const hero = `<section class="hero hero-sm">
  <div class="wrap hero-inner">
    <p class="hero-kicker">Graduates' Stories</p>
    <h1>수강생들이 직접 쓴<br>데일카네기 수료 후기</h1>
    <p class="hero-sub">12주가 끝난 뒤, 수강생들의 삶은 어떻게 달라졌을까요. 수료생들이 직접 남긴 이야기입니다.</p>
  </div>
</section>`;

  const articles = REVIEWS.map(
    (rv) => `<article class="review">
      <h2>${rv.title}</h2>
      <p class="review-author">${rv.author}</p>
      ${rv.paras.map((p) => `<p>${p}</p>`).join("\n")}
    </article>`
  ).join("\n");

  const body = `
<section class="section">
  <div class="wrap narrow review-list">
    ${articles}
  </div>
</section>

${galleryHtml(6, "교육 현장 스케치")}

${consultSection()}`;

  return page({
    file: "reviews.html",
    title: "데일카네기 수강 후기 | 최고경영자 코스 · 데일카네기 코스 수료생 이야기",
    desc: "데일카네기 최고경영자 코스와 데일카네기 코스를 수료한 수강생들이 직접 남긴 후기 모음. 12주 과정에서 얻은 자신감·열정·인간관계의 변화를 확인하세요.",
    hero,
    body,
  });
}

// ------------------------------------------------------------
// 리더십 칼럼 (guide.html 목차 + 개별 글)
// ------------------------------------------------------------
function guideCard(g) {
  return `<a class="guide-card" href="${g.slug}.html">
    <h3>${g.title}</h3>
    <p>${g.desc}</p>
    <span class="guide-more">읽어보기 →</span>
  </a>`;
}

function buildGuideIndex() {
  const refs = GUIDES.slice(0, 4);
  const cols = GUIDES.slice(4);
  const hero = `<section class="hero hero-sm">
  <div class="wrap hero-inner">
    <p class="hero-kicker">Leadership Column</p>
    <h1>리더십 칼럼</h1>
    <p class="hero-sub">데일 카네기의 원칙과, 리더들이 현장에서 마주하는 고민에 대한 글들입니다.</p>
  </div>
</section>`;
  const body = `
<section class="section">
  <div class="wrap">
    <h2 class="sec-title">데일 카네기의 원칙</h2>
    <div class="guide-grid">${refs.map(guideCard).join("\n")}</div>
  </div>
</section>
<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title">리더의 고민에 답하다</h2>
    <p class="sec-sub">발표 불안부터 위임, 동기부여, CEO 네트워킹까지 — 과정별 전문 칼럼입니다.</p>
    <div class="guide-grid">${cols.map(guideCard).join("\n")}</div>
  </div>
</section>
${consultSection()}`;
  return page({
    file: "guide.html",
    title: "리더십 칼럼 | 카네기 인간관계론·리더십·스피치·동기부여",
    desc: "카네기 인간관계론 30원칙, 데일 카네기 명언, 발표 불안 극복, 신임 팀장 가이드, 직원 동기부여, CEO 네트워킹 등 리더를 위한 칼럼 모음.",
    hero,
    body,
  });
}

function buildGuideArticle(g) {
  const c = COURSES[g.course];
  const others = GUIDES.filter((x) => x.slug !== g.slug && x.course === g.course).slice(0, 2);
  const hero = `<section class="hero hero-sm">
  <div class="wrap hero-inner">
    <p class="hero-kicker">리더십 칼럼</p>
    <h1>${g.title}</h1>
  </div>
</section>`;
  const body = `
<section class="section">
  <div class="wrap narrow guide-body">
    ${g.body}
    <div class="guide-cta">
      <span>이 주제를 훈련으로 바꾸고 싶다면</span>
      <a class="btn btn-green" href="${c.slug}.html">${c.name} 알아보기 →</a>
    </div>
    ${others.length ? `<p class="sec-sub" style="margin-top:26px">함께 읽으면 좋은 글:
      ${others.map((o) => `<a href="${o.slug}.html">${o.title}</a>`).join(" · ")} · <a href="guide.html">칼럼 전체 보기</a></p>` : `<p class="sec-sub" style="margin-top:26px"><a href="guide.html">칼럼 전체 보기 →</a></p>`}
  </div>
</section>
${consultSection({ course: g.course })}`;
  return page({
    file: `${g.slug}.html`,
    title: g.metaTitle,
    desc: g.desc,
    hero,
    body,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.desc,
      datePublished: g.date,
      author: { "@type": "Organization", name: "카네기코스" },
    },
  });
}

// ------------------------------------------------------------
// 지역 × 과정 조합 페이지 (SEO 확장)
// ------------------------------------------------------------
const COMBO_COURSES = ["dcc", "dcs", "lac", "ltm", "dylp", "hip", "youth"];
// 과정별 검색 키워드 보조 문구 (title/desc용)
const COMBO_KW = {
  dcc: "성인 리더십 · 자신감 · 커뮤니케이션 교육",
  dcs: "세일즈 교육 · 영업 역량 강화 과정",
  lac: "리더십 교육 · 팀장 리더십 과정",
  ltm: "매니저 리더십 · 중간관리자 교육",
  dylp: "신임리더 · 예비 관리자 교육",
  hip: "프레젠테이션 교육 · 스피치 과정",
  youth: "청소년 리더십 캠프 · 인성 교육",
};

function comboFile(regionSlug, courseKey) {
  return `${regionSlug}-${courseKey}.html`;
}

function buildCombo(regionSlug, courseKey) {
  const r = REGIONS[regionSlug];
  const c = COURSES[courseKey];
  const d = DETAIL[courseKey];
  const localRows = SCHEDULE.filter((s) => s.region === regionSlug && s.course === courseKey);
  const allRows = SCHEDULE.filter((s) => s.course === courseKey);

  const hero = `<section class="hero hero-course">
  <div class="wrap hero-inner">
    <p class="hero-kicker">${r.name} · ${c.code} · ${esc(c.eng)}</p>
    <h1>${r.name} ${c.name}</h1>
    <p class="hero-sub">${c.tag}</p>
  </div>
</section>`;

  const scheduleBlock = localRows.length
    ? `<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title">${r.name} ${YEAR_LABEL} 개강 일정</h2>
    ${scheduleTable(localRows, { linkRegion: false })}
    <p class="sec-sub" style="margin-top:14px">교육 장소: ${r.venue}</p>
  </div>
</section>`
    : `<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title">${r.name} 개강 일정</h2>
    <p class="sec-sub">${r.name} 지역의 ${c.name} 개강 일정은 준비 중입니다. 아래 전국 일정을 참고하시거나,
    하단 상담 신청을 남겨 주시면 ${r.name} 인근 개설 소식과 참여 가능한 가까운 일정을 안내드립니다.
    기업·단체 대상 지역 맞춤 개설 문의도 가능합니다.</p>
    ${allRows.length ? scheduleTable(allRows) : ""}
  </div>
</section>`;

  const otherCourses = COMBO_COURSES.filter((k) => k !== courseKey)
    .map((k) => `<a class="chip" href="${comboFile(regionSlug, k)}">${r.name} ${COURSES[k].name}</a>`)
    .join("\n");
  const otherRegions = Object.keys(REGIONS)
    .filter((s) => s !== regionSlug)
    .map((s) => `<a class="chip" href="${comboFile(s, courseKey)}">${REGIONS[s].name}</a>`)
    .join("\n");

  const body = `
<section class="section">
  <div class="wrap narrow">
    <p class="lead">${r.name}에서 ${c.name}를 찾고 계신가요? ${d.intro}</p>
    <div class="fact-row">
      <div><span>기간</span><strong>${c.duration}</strong></div>
      <div><span>대상</span><strong>${c.target}</strong></div>
    </div>
  </div>
</section>

${scheduleBlock}

<section class="section">
  <div class="wrap two-col">
    <div>
      <h2 class="sec-title-sm">이런 분께 추천합니다</h2>
      <ul class="check-list">${d.targets.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
    <div>
      <h2 class="sec-title-sm">이 과정을 들으면 이렇게 달라집니다</h2>
      <ul class="check-list gold">${d.goals.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <h2 class="sec-title">커리큘럼</h2>
    <div class="table-wrap"><table class="curri">
      <thead><tr><th>구분</th><th>교육 내용</th></tr></thead>
      <tbody>${d.curriculum.map(([w, t]) => `<tr><td class="td-week">${w}</td><td>${t}</td></tr>`).join("")}</tbody>
    </table></div>
    <p class="sec-sub" style="margin-top:14px">과정 전체 안내는 <a href="${c.slug}.html">${c.name} 상세 페이지</a>에서 확인하세요.</p>
  </div>
</section>

${why5Html()}

<section class="section">
  <div class="wrap">
    <h2 class="sec-title-sm">${r.name}의 다른 과정</h2>
    <div class="chip-grid" style="margin-bottom:34px">${otherCourses}
      <a class="chip" href="${regionSlug}.html">${r.name} 최고경영자 코스</a></div>
    <h2 class="sec-title-sm">다른 지역의 ${c.name}</h2>
    <div class="chip-grid">${otherRegions}</div>
  </div>
</section>

${consultSection({ course: courseKey, region: regionSlug })}`;

  return page({
    file: comboFile(regionSlug, courseKey),
    title: `${r.name} ${c.name} | ${r.name} ${COMBO_KW[courseKey]}`,
    desc: `${r.name} ${c.name} 안내 — ${c.short} ${c.duration}. ${localRows.length ? `${YEAR_LABEL} ${r.name} 개강 일정과 수강료,` : `${r.name} 개설 일정과`} 커리큘럼, 온라인 상담 신청.`,
    hero,
    body,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Course",
      name: `${r.name} ${c.name}`,
      description: `${r.name} ${COMBO_KW[courseKey]} — ${c.short}`,
      provider: { "@type": "Organization", name: "데일카네기 공개과정" },
    },
  });
}

// ------------------------------------------------------------
// CSS
// ------------------------------------------------------------
const CSS = `/* 데일카네기 공개과정 — 생성 파일 (build.js 실행으로 재생성) */
:root{
  --green:#0c3b2e; --green-2:#0f4a3a; --green-dark:#08281f;
  --gold:#c6a15b; --gold-soft:#e7d3a9; --gold-pale:#f4ead3;
  --ink:#1b2420; --muted:#5c6a63; --paper:#f8f6f1; --line:#e4e0d6; --white:#fff;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:"Pretendard Variable",Pretendard,-apple-system,"Malgun Gothic",sans-serif;color:var(--ink);background:var(--white);line-height:1.65;word-break:keep-all}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
.wrap{max-width:1080px;margin:0 auto;padding:0 22px}
.narrow{max-width:860px}

/* header */
.site-header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.header-inner{display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}
.brand-word{font-size:21px;font-weight:900;letter-spacing:-.02em;color:var(--green)}
.brand-word em{font-style:normal;color:var(--gold)}
.nav{display:flex;align-items:center;gap:22px;font-size:15px;font-weight:600}
.nav a:hover{color:var(--green)}
.nav-cta{background:var(--green);color:#fff!important;padding:9px 16px;border-radius:999px;font-size:14px}
.nav-cta:hover{background:var(--green-2)}
.mnav{display:none;position:relative}
.mnav summary{list-style:none;cursor:pointer;font-size:22px;line-height:1;padding:6px 4px;color:var(--green);user-select:none}
.mnav summary::-webkit-details-marker{display:none}
.mnav-list{position:absolute;right:0;top:calc(100% + 10px);background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 14px 40px rgba(12,59,46,.16);min-width:190px;padding:8px;display:grid;z-index:70}
.mnav-list a{padding:11px 16px;border-radius:9px;font-size:15px;font-weight:700}
.mnav-list a:hover{background:var(--paper);color:var(--green)}
.mnav-list a:last-child{background:var(--green);color:#fff;text-align:center;margin-top:4px}
@media(max-width:760px){
  .nav{gap:10px}
  .nav>a:not(.nav-cta){display:none}
  .nav-cta{font-size:13.5px;padding:8px 14px}
  .mnav{display:block}
}

/* hero */
.hero{background:linear-gradient(135deg,var(--green-dark) 0%,var(--green) 55%,var(--green-2) 100%);color:#fff;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;right:-120px;top:-120px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(198,161,91,.28),transparent 65%)}
.hero-inner{padding:88px 22px 84px;position:relative;z-index:1}
.hero-sm .hero-inner,.hero-course .hero-inner,.hero-region .hero-inner{padding:66px 22px 60px}
.hero-kicker{color:var(--gold-soft);font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:13px;margin-bottom:16px}
.hero h1{font-size:clamp(30px,5vw,52px);line-height:1.22;font-weight:800;letter-spacing:-.02em}
.hero h1 .gi{color:var(--gold);}
.hero-sub{margin-top:18px;font-size:clamp(15px,2vw,19px);color:#dfe9e2}
.hero-actions{margin-top:32px;display:flex;gap:12px;flex-wrap:wrap}

/* buttons */
.btn{display:inline-block;padding:13px 26px;border-radius:999px;font-weight:700;font-size:15px;transition:.15s}
.btn-gold{background:var(--gold);color:var(--green-dark)}
.btn-gold:hover{background:var(--gold-soft)}
.btn-line{border:1.5px solid rgba(255,255,255,.55);color:#fff}
.btn-line:hover{border-color:#fff;background:rgba(255,255,255,.08)}
.btn-green{background:var(--green);color:#fff}
.btn-green:hover{background:var(--green-2)}

/* stats */
.stats{background:var(--green-dark);color:#fff;border-top:1px solid rgba(255,255,255,.08)}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;padding:28px 22px}
.stats-grid div{text-align:center}
.stats-grid strong{display:block;font-size:clamp(20px,3vw,30px);color:var(--gold);font-weight:800}
.stats-grid span{font-size:13px;color:#c9d6cf}
@media(max-width:700px){.stats-grid{grid-template-columns:repeat(2,1fr)}}

/* sections */
.section{padding:72px 0}
.section.alt{background:var(--paper)}
.sec-title{font-size:clamp(23px,3.4vw,32px);font-weight:800;letter-spacing:-.01em;margin-bottom:14px}
.sec-title-sm{font-size:20px;font-weight:800;margin-bottom:16px}
.sec-sub{color:var(--muted);margin-bottom:28px;max-width:720px}
.sec-sub a{color:var(--green);font-weight:700;text-decoration:underline}
.lead{font-size:17px;color:#33403a;margin-bottom:28px}

/* why */
.why-list{list-style:none;display:grid;gap:12px;margin-top:26px}
.why-list li{display:flex;gap:18px;align-items:flex-start;background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:18px 22px}
.section.alt .why-list li{background:#fff}
.why-num{font-weight:800;color:var(--gold);font-size:20px;line-height:1.5;min-width:36px}
.why-list strong{font-size:16px}
.why-list p{color:var(--muted);font-size:14.5px;margin-top:2px}

/* course cards */
.course-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
@media(max-width:760px){.course-grid{grid-template-columns:1fr}}
.course-card{display:flex;flex-direction:column;gap:8px;border:1px solid var(--line);border-radius:16px;padding:26px;background:#fff;transition:.15s;position:relative}
.course-card:hover{border-color:var(--gold);box-shadow:0 10px 30px rgba(12,59,46,.08);transform:translateY(-2px)}
.course-code{font-size:12px;font-weight:800;letter-spacing:.12em;color:var(--gold);border:1px solid var(--gold-soft);border-radius:999px;padding:3px 10px;width:fit-content}
.course-card h3{font-size:19px;font-weight:800}
.course-tag{font-size:14px;color:var(--green);font-weight:700}
.course-short{font-size:14px;color:var(--muted);flex:1}
.course-meta{font-size:13px;color:#8a948e}
.course-more{font-size:14px;font-weight:700;color:var(--green)}

/* floating cta */
.float-cta{position:fixed;right:16px;bottom:18px;z-index:60;background:var(--gold);color:var(--green-dark);font-weight:800;font-size:15px;padding:13px 22px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.28);transition:.2s}
.float-cta:hover{background:var(--gold-soft)}
.float-cta.hide{opacity:0;pointer-events:none;transform:translateY(8px)}

/* schedule table */
.table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:14px;background:#fff;-webkit-overflow-scrolling:touch}
@media(max-width:680px){
  .table-wrap{position:relative}
  .table-hint{display:block!important}
}
.table-hint{display:none;font-size:12px;color:var(--muted);margin:0 0 8px;text-align:right}
table{width:100%;border-collapse:collapse;font-size:14.5px;min-width:640px}
thead th{background:var(--green);color:#fff;font-weight:700;padding:12px 14px;text-align:left;white-space:nowrap}
tbody td{padding:11px 14px;border-top:1px solid var(--line);white-space:nowrap}
tbody tr:nth-child(even){background:#fbfaf7}
tbody tr:hover{background:var(--gold-pale)}
.td-name a{font-weight:700;color:var(--green);text-decoration:underline;text-underline-offset:3px}
.td-fee{font-weight:700}
.curri tbody td{white-space:normal}
.td-week{font-weight:800;color:var(--green);white-space:nowrap}

/* chips */
.chip-grid{display:flex;flex-wrap:wrap;gap:10px}
.chip{border:1px solid var(--line);border-radius:999px;padding:9px 18px;font-weight:700;font-size:14.5px;background:#fff;transition:.15s}
.chip:hover{background:var(--green);color:#fff;border-color:var(--green)}

/* teaser / about */
.teaser-grid{display:grid;grid-template-columns:300px 1fr;gap:44px;align-items:center}
@media(max-width:760px){.teaser-grid{grid-template-columns:1fr}}
.teaser-photo{border-radius:16px;box-shadow:0 14px 40px rgba(12,59,46,.18);width:100%;object-fit:cover;max-height:420px}
.teaser-grid p{margin-bottom:14px;color:#33403a}
.teaser-grid em{font-style:normal;font-weight:700;color:var(--green)}

/* cycle / perks */
.cycle-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.cycle-grid.three{grid-template-columns:repeat(3,1fr)}
@media(max-width:860px){.cycle-grid,.cycle-grid.three{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.cycle-grid,.cycle-grid.three{grid-template-columns:1fr}}
.cycle-grid>div{background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px}
.section:not(.alt) .cycle-grid>div{background:var(--paper)}
.cycle-grid span{font-size:12px;font-weight:800;color:var(--gold);letter-spacing:.1em}
.cycle-grid strong{display:block;font-size:17px;margin:6px 0 8px}
.cycle-grid p{font-size:14px;color:var(--muted)}
.perk-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:700px){.perk-grid{grid-template-columns:1fr}}
.perk-grid>div{background:#fff;border:1px solid var(--line);border-radius:14px;padding:24px}
.perk-grid span{font-weight:800;color:var(--gold);font-size:18px}
.perk-grid strong{display:block;margin:6px 0 8px;font-size:16px}
.perk-grid p{font-size:14px;color:var(--muted)}

/* lists */
.step-list{list-style:none;counter-reset:step;display:grid;gap:10px;max-width:760px}
.step-list li{counter-increment:step;background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:16px 20px 16px 62px;position:relative}
.step-list li::before{content:counter(step);position:absolute;left:18px;top:50%;transform:translateY(-50%);width:30px;height:30px;border-radius:50%;background:var(--green);color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:14px}
.check-list{list-style:none;display:grid;gap:10px}
.check-list li{padding-left:30px;position:relative;font-size:15px}
.check-list li::before{content:"✓";position:absolute;left:0;top:0;font-weight:800;color:var(--green)}
.check-list.gold li::before{color:var(--gold)}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:44px}
@media(max-width:760px){.two-col{grid-template-columns:1fr}}

/* fact row */
.fact-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:600px){.fact-row{grid-template-columns:1fr}}
.fact-row>div{background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:16px 20px}
.fact-row span{display:block;font-size:12.5px;font-weight:800;color:var(--gold);letter-spacing:.08em;margin-bottom:4px}
.fact-row strong{font-size:15.5px}

/* info list (region) */
.info-list{display:grid;gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fff}
.info-list>div{display:grid;grid-template-columns:130px 1fr;border-top:1px solid var(--line)}
.info-list>div:first-child{border-top:none}
.info-list dt{background:var(--paper);padding:15px 18px;font-weight:800;color:var(--green);font-size:14.5px}
.info-list dd{padding:15px 18px;font-size:15px}
.info-list dd a{color:var(--green);font-weight:800;text-decoration:underline;text-underline-offset:3px}
@media(max-width:560px){.info-list>div{grid-template-columns:1fr}.info-list dt{padding-bottom:4px}.info-list dd{padding-top:4px}}

/* quotes */
.quote-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:760px){.quote-grid{grid-template-columns:1fr}}
.quote-grid blockquote{background:var(--paper);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:12px;padding:22px;font-size:15px;color:#33403a}
.quote-grid cite{display:block;margin-top:12px;font-style:normal;font-weight:700;color:var(--green);font-size:13.5px}

/* gallery */
.gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:640px){.gallery{grid-template-columns:1fr}}
.ph{margin:0;border-radius:14px;overflow:hidden;border:1px solid var(--line);background:#fff}
.ph img{width:100%;height:280px;object-fit:cover;display:block;transition:.25s}
.ph:hover img{transform:scale(1.02)}
.ph figcaption{padding:10px 16px;font-size:13px;color:var(--muted)}
.quote-grid cite a{color:var(--gold);text-decoration:underline;text-underline-offset:3px}

/* guide */
.guide-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:720px){.guide-grid{grid-template-columns:1fr}}
.guide-card{display:flex;flex-direction:column;gap:8px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:24px;transition:.15s}
.section:not(.alt) .guide-card{background:var(--paper)}
.guide-card:hover{border-color:var(--gold);box-shadow:0 10px 26px rgba(12,59,46,.08);transform:translateY(-2px)}
.guide-card h3{font-size:17px;font-weight:800;color:var(--green)}
.guide-card p{font-size:14px;color:var(--muted);flex:1}
.guide-more{font-size:13.5px;font-weight:700;color:var(--gold)}
.guide-body p{margin-bottom:16px;font-size:15.5px;color:#2c3833}
.guide-body .lead{font-size:17px}
.guide-body h2{margin-top:34px}
.guide-body .step-list,.guide-body .check-list{margin-bottom:18px}
.guide-body .quote-grid{margin-bottom:18px}
.guide-body a{color:var(--green);font-weight:700;text-decoration:underline;text-underline-offset:3px}
.guide-cta{margin-top:30px;background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.guide-cta span{font-weight:800;font-size:16px}

/* reviews */
.review-list{display:grid;gap:26px}
.review{background:var(--paper);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:14px;padding:30px 32px}
.review h2{font-size:20px;font-weight:800;margin-bottom:6px;color:var(--green)}
.review-author{font-size:13.5px;font-weight:700;color:var(--gold);margin-bottom:16px}
.review p{margin-bottom:12px;font-size:15px;color:#33403a}
.review p:last-child{margin-bottom:0}

/* consult form */
.consult{background:linear-gradient(135deg,var(--green-dark),var(--green));color:#fff;padding:72px 0}
.consult-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:48px;align-items:start}
@media(max-width:820px){.consult-grid{grid-template-columns:1fr;gap:32px}}
.consult-copy h2{font-size:clamp(24px,3.4vw,32px);font-weight:800;margin-bottom:14px}
.consult-copy>p{color:#dfe9e2;margin-bottom:22px}
.consult-points{list-style:none;display:grid;gap:10px}
.consult-points li{padding-left:26px;position:relative;font-size:14.5px;color:#c9d6cf}
.consult-points li::before{content:"—";position:absolute;left:0;color:var(--gold)}
.consult-form{background:#fff;border-radius:18px;padding:28px;color:var(--ink);box-shadow:0 18px 50px rgba(0,0,0,.25)}
.form-row{display:grid;gap:14px;margin-bottom:14px}
.form-row.two{grid-template-columns:1fr 1fr}
@media(max-width:560px){.form-row.two{grid-template-columns:1fr}}
.consult-form label{display:grid;gap:6px;font-size:13.5px;font-weight:700;color:#3a463f}
.consult-form label span{color:#c0392b}
.consult-form input,.consult-form select,.consult-form textarea{width:100%;border:1.5px solid var(--line);border-radius:10px;padding:11px 13px;font-size:15px;font-family:inherit;background:#fbfaf7;color:var(--ink)}
.consult-form input:focus,.consult-form select:focus,.consult-form textarea:focus{outline:none;border-color:var(--gold);background:#fff}
.consult-form textarea{resize:vertical}
.form-submit{width:100%;border:none;cursor:pointer;font-size:16px;padding:15px}
.form-submit:disabled{opacity:.6;cursor:default}
.form-fine{margin-top:12px;font-size:12.5px;color:#8a948e;text-align:center}
.form-done{text-align:center;padding:34px 10px}
.form-done strong{display:block;font-size:19px;color:var(--green);margin-bottom:8px}
.form-done p{color:var(--muted);font-size:14.5px}

/* footer */
.site-footer{background:#0a231b;color:#b9c6bf;padding:56px 0 36px;font-size:14px}
.footer-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:44px}
@media(max-width:820px){.footer-grid{grid-template-columns:1fr}}
.footer-word{font-size:20px;font-weight:900;letter-spacing:-.02em;color:#fff;margin-bottom:16px}
.footer-word em{font-style:normal;color:var(--gold)}
.footer-branches h3{color:#fff;font-size:15px;margin-bottom:14px}
.footer-regions{display:flex;flex-wrap:wrap;gap:8px 6px}
.footer-regions a{border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:5px 13px;font-size:12.5px;color:#c9d6cf;transition:.15s}
.footer-regions a:hover{border-color:var(--gold);color:var(--gold)}
.footer-cta{margin-top:6px;font-size:14px;padding:11px 22px}
.footer-fine{margin-top:34px;padding-top:18px;border-top:1px solid rgba(255,255,255,.1);color:#71837a;font-size:12.5px}
`;

// ------------------------------------------------------------
// 생성 실행
// ------------------------------------------------------------
const pages = [];
pages.push(buildIndex());
pages.push(buildAbout());
pages.push(buildReviews());
pages.push(buildGuideIndex());
for (const g of GUIDES) pages.push(buildGuideArticle(g));
for (const k of Object.keys(COURSES)) pages.push(buildCourse(k));
for (const slug of Object.keys(REGIONS)) pages.push(buildRegion(slug));
for (const slug of Object.keys(REGIONS)) for (const k of COMBO_COURSES) pages.push(buildCombo(slug, k));

for (const p of pages) fs.writeFileSync(path.join(OUT, p.file), p.html);
fs.writeFileSync(path.join(OUT, "style.css"), CSS);

// assets 복사
const assetsSrc = path.join(__dirname, "assets");
const assetsDst = path.join(OUT, "assets");
fs.mkdirSync(assetsDst, { recursive: true });
for (const f of fs.readdirSync(assetsSrc)) fs.copyFileSync(path.join(assetsSrc, f), path.join(assetsDst, f));

// sitemap + robots
const urls = pages.map((p) => `<url><loc>${BASE_URL}/${p.file === "index.html" ? "" : p.file}</loc></url>`).join("\n");
fs.writeFileSync(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
fs.writeFileSync(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml`);
fs.writeFileSync(path.join(OUT, "CNAME"), BASE_URL.replace(/^https?:\/\//, ""));
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

// rss.xml — 네이버 서치어드바이저 제출용 (항목 추가 시 pubDate는 고정 날짜로 기입)
const RSS_ITEMS = [
  { title: `${YEAR_LABEL} 데일카네기 전국 공개과정 개강 일정 안내`, link: `${BASE_URL}/index.html`, date: "Mon, 20 Jul 2026 09:00:00 +0900", desc: "최고경영자 코스·데일카네기 코스(DCC)·리더십·세일즈·프레젠테이션 과정의 전국 개강 일정과 지역별 모집 안내." },
  ...REVIEWS.map((rv, i) => ({
    title: `[수강 후기] ${rv.title}`,
    link: `${BASE_URL}/reviews.html`,
    date: `Mon, ${String(13 + i).padStart(2, "0")} Jul 2026 09:00:00 +0900`,
    desc: rv.excerpt,
  })),
  ...GUIDES.map((g) => ({
    title: `[리더십 칼럼] ${g.title}`,
    link: `${BASE_URL}/${g.slug}.html`,
    date: new Date(g.date + "T09:00:00+09:00").toUTCString(),
    desc: g.desc,
  })),
];
const rssItems = RSS_ITEMS.map((it) => `  <item>
    <title>${esc(it.title)}</title>
    <link>${it.link}</link>
    <guid isPermaLink="false">${it.link}#${esc(it.title)}</guid>
    <pubDate>${it.date}</pubDate>
    <description>${esc(it.desc)}</description>
  </item>`).join("\n");
fs.writeFileSync(path.join(OUT, "rss.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>카네기코스 — 데일카네기 공개과정 안내</title>
  <link>${BASE_URL}</link>
  <description>데일카네기 최고경영자 코스·데일카네기 코스 등 전국 공개과정 개강 일정과 수강 후기</description>
  <language>ko</language>
${rssItems}
</channel>
</rss>`);

console.log(`생성 완료: ${pages.length}개 페이지 + style.css + sitemap.xml + robots.txt → docs/`);
if (!FORM_ENDPOINT) console.warn("⚠ FORM_ENDPOINT가 비어 있습니다 — 상담 양식이 데모 모드입니다. gas-form.gs 배포 후 data.js에 /exec 주소를 넣고 재생성하세요.");
