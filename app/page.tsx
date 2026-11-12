<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>เข้าสู่ระบบ | Clean Check</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #e9f0f4;
    --surface: #ffffff;
    --primary: #1d6f8f;
    --primary-dark: #15566f;
    --primary-deep: #0f4357;
    --ink: #17262e;
    --muted: #647780;
    --line: #d3dfe6;
    --field: #f6f9fb;
    --danger: #c0392b;
    --danger-bg: #fdecea;
  }
  * { box-sizing: border-box; }
  html, body { min-height: 100%; }
  body {
    margin: 0;
    font-family: "Noto Sans Thai", "Sarabun", system-ui, sans-serif;
    background: var(--bg);
    color: var(--ink);
    display: flex;
    justify-content: center;
  }
  .screen {
    width: 100%;
    max-width: 420px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
  }

  /* ---------- hero ---------- */
  .hero {
    position: relative;
    overflow: hidden;
    background: var(--primary);
    color: #fff;
    padding: 28px 22px 84px;
    border-radius: 0 0 28px 28px;
  }
  .hero::before, .hero::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,.07);
  }
  .hero::before { width: 220px; height: 220px; right: -70px; top: -80px; }
  .hero::after  { width: 140px; height: 140px; right: 60px; bottom: -70px; }
  .brand-row { position: relative; display: flex; align-items: center; gap: 10px; margin-bottom: 26px; }
  .logo {
    width: 40px; height: 40px; border-radius: 12px;
    background: #fff; display: grid; place-items: center;
    box-shadow: 0 4px 12px rgba(10,50,66,.25);
  }
  .brand { font-size: 13px; font-weight: 700; letter-spacing: .06em; }
  .hero h1 { position: relative; margin: 0 0 6px; font-size: 28px; line-height: 1.25; font-weight: 700; }
  .hero p { position: relative; margin: 0; font-size: 15px; opacity: .92; }
  .segments { position: relative; display: flex; gap: 6px; margin-top: 22px; max-width: 200px; }
  .segments span {
    flex: 1; height: 6px; border-radius: 3px; background: rgba(255,255,255,.25);
    position: relative; overflow: hidden;
  }
  .segments span::after {
    content: ""; position: absolute; inset: 0; background: #fff;
    transform: scaleX(0); transform-origin: left;
    animation: fill .5s ease-out forwards;
  }
  .segments span:nth-child(1)::after { animation-delay: .25s; }
  .segments span:nth-child(2)::after { animation-delay: .45s; }
  .segments span:nth-child(3)::after { animation-delay: .65s; }
  .segments span:nth-child(4)::after { animation-delay: .85s; }
  @keyframes fill { to { transform: scaleX(1); } }

  /* ---------- form card ---------- */
  .card {
    position: relative;
    margin: -56px 16px 0;
    background: var(--surface);
    border-radius: 20px;
    padding: 24px 20px 22px;
    box-shadow: 0 10px 30px rgba(15,67,87,.14), 0 2px 6px rgba(15,67,87,.06);
  }
  .card h2 { margin: 0 0 18px; font-size: 18px; font-weight: 700; }
  .field { margin-bottom: 16px; }
  label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 7px; }
  .input-wrap { position: relative; }
  .input-wrap .icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    width: 20px; height: 20px; color: var(--muted); pointer-events: none;
  }
  input {
    width: 100%;
    font: inherit; font-size: 16px;
    padding: 14px 14px 14px 44px;
    border: 1.5px solid var(--line);
    border-radius: 12px;
    background: var(--field);
    color: var(--ink);
    transition: border-color .15s, background .15s, box-shadow .15s;
  }
  input::placeholder { color: #9aabb3; }
  input:focus { outline: none; background: #fff; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(29,111,143,.16); }
  input[aria-invalid="true"] { border-color: var(--danger); background: #fff; }
  #password { padding-right: 70px; }
  .toggle {
    position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
    border: 0; background: none; font: inherit; font-size: 13px; font-weight: 500;
    color: var(--primary); padding: 8px 10px; cursor: pointer; border-radius: 8px;
  }
  .toggle:hover { background: rgba(29,111,143,.08); }
  .toggle:focus-visible { outline: 3px solid rgba(29,111,143,.35); }
  .error {
    display: none;
    background: var(--danger-bg); color: var(--danger);
    border-radius: 12px; padding: 11px 13px; font-size: 14px; margin-bottom: 16px;
  }
  .error.show { display: block; }
  .submit {
    width: 100%;
    font: inherit; font-size: 16px; font-weight: 700;
    color: #fff; background: var(--primary-dark);
    border: 0; border-radius: 14px; padding: 15px;
    cursor: pointer;
    box-shadow: 0 6px 14px rgba(21,86,111,.28);
    transition: background .15s, transform .1s, box-shadow .15s;
  }
  .submit:hover { background: var(--primary-deep); }
  .submit:active { transform: translateY(1px); box-shadow: 0 3px 8px rgba(21,86,111,.28); }
  .submit:focus-visible { outline: 3px solid rgba(29,111,143,.45); outline-offset: 3px; }
  .submit:disabled { opacity: .65; cursor: progress; }
  .help { text-align: center; font-size: 13px; color: var(--muted); margin: 16px 0 0; }
  .foot { text-align: center; font-size: 12px; color: var(--muted); padding: 22px 16px 26px; margin-top: auto; }

  @media (min-width: 440px) {
    body { align-items: center; padding: 24px 0; }
    .screen { min-height: 0; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 50px rgba(15,67,87,.18); }
  }
  @media (prefers-reduced-motion: reduce) {
    .segments span::after { animation: none; transform: scaleX(1); }
    * { transition: none !important; }
  }
</style>
</head>
<body>
  <main class="screen">
    <header class="hero">
      <div class="brand-row">
        <div class="logo" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d6f8f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
        </div>
        <span class="brand">CLEAN CHECK</span>
      </div>
      <h1>ยินดีต้อนรับกลับมา</h1>
      <p>เข้าสู่ระบบเพื่อตรวจความสะอาดประจำวัน</p>
      <div class="segments" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
    </header>

    <form class="card" id="loginForm" novalidate>
      <h2>เข้าสู่ระบบ</h2>
      <div class="error" id="error" role="alert"></div>

      <div class="field">
        <label for="staffId">รหัสพนักงาน</label>
        <div class="input-wrap">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.9-3.6 3.9-5.4 7.5-5.4s6.6 1.8 7.5 5.4"/></svg>
          <input id="staffId" name="staffId" type="text" placeholder="กรอกรหัสพนักงาน" autocomplete="username" required>
        </div>
      </div>

      <div class="field">
        <label for="password">รหัสผ่าน</label>
        <div class="input-wrap">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>
          <input id="password" name="password" type="password" placeholder="กรอกรหัสผ่าน" autocomplete="current-password" required>
          <button type="button" class="toggle" id="toggle" aria-label="แสดงรหัสผ่าน">แสดง</button>
        </div>
      </div>

      <button type="submit" class="submit" id="submit">เข้าสู่ระบบ</button>
      <p class="help">ลืมรหัสผ่าน? ติดต่อหัวหน้างาน</p>
    </form>

    <footer class="foot">Clean Check · ระบบตรวจความสะอาด</footer>
  </main>

<script>
  const form = document.getElementById('loginForm');
  const staffId = document.getElementById('staffId');
  const password = document.getElementById('password');
  const errorBox = document.getElementById('error');
  const submitBtn = document.getElementById('submit');
  const toggle = document.getElementById('toggle');

  toggle.addEventListener('click', () => {
    const hidden = password.type === 'password';
    password.type = hidden ? 'text' : 'password';
    toggle.textContent = hidden ? 'ซ่อน' : 'แสดง';
    toggle.setAttribute('aria-label', hidden ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
  });

  function showError(msg, field) {
    errorBox.textContent = msg;
    errorBox.classList.add('show');
    staffId.removeAttribute('aria-invalid');
    password.removeAttribute('aria-invalid');
    if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); }
  }

  // TODO: เปลี่ยนเป็นการเรียก API จริงของระบบ
  async function login(id, pass) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staffId: id, password: pass })
    });
    if (!res.ok) throw new Error('invalid');
    return res.json();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBox.classList.remove('show');

    if (!staffId.value.trim()) return showError('กรอกรหัสพนักงาน', staffId);
    if (!password.value) return showError('กรอกรหัสผ่าน', password);

    submitBtn.disabled = true;
    submitBtn.textContent = 'กำลังเข้าสู่ระบบ...';
    try {
      await login(staffId.value.trim(), password.value);
      window.location.href = 'checklist.html'; // หน้าตรวจความสะอาด
    } catch (err) {
      showError('รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง ลองอีกครั้ง', password);
      submitBtn.disabled = false;
      submitBtn.textContent = 'เข้าสู่ระบบ';
    }
  });
</script>
</body>
</html>
