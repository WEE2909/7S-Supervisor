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
    --bg: #eef3f6;
    --surface: #ffffff;
    --primary: #1d6f8f;
    --primary-dark: #15566f;
    --ink: #1c2b33;
    --muted: #6a7b85;
    --line: #d5e0e6;
    --danger: #c0392b;
    --danger-bg: #fdecea;
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    font-family: "Noto Sans Thai", "Sarabun", system-ui, sans-serif;
    background: var(--bg);
    color: var(--ink);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .screen {
    width: 100%;
    max-width: 420px;
    min-height: 100%;
    padding: 20px 16px 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .brand { font-size: 12px; font-weight: 700; color: var(--muted); letter-spacing: .04em; }
  .hero {
    background: var(--primary);
    color: #fff;
    border-radius: 14px;
    padding: 22px 18px 20px;
  }
  .hero h1 { margin: 0 0 4px; font-size: 24px; line-height: 1.3; }
  .hero p { margin: 0; font-size: 14px; opacity: .9; }
  .card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 18px 16px 20px;
  }
  .field { margin-bottom: 14px; }
  label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 6px; }
  .input-wrap { position: relative; }
  input {
    width: 100%;
    font: inherit;
    font-size: 16px;
    padding: 12px 14px;
    border: 1.5px solid var(--line);
    border-radius: 10px;
    background: #fff;
    color: var(--ink);
  }
  input:focus-visible { outline: 3px solid rgba(29,111,143,.28); border-color: var(--primary); }
  input[aria-invalid="true"] { border-color: var(--danger); }
  .toggle {
    position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
    border: 0; background: none; font: inherit; font-size: 13px;
    color: var(--primary); padding: 8px 10px; cursor: pointer; border-radius: 8px;
  }
  .toggle:focus-visible { outline: 3px solid rgba(29,111,143,.28); }
  .error {
    display: none;
    background: var(--danger-bg);
    color: var(--danger);
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 14px;
    margin-bottom: 14px;
  }
  .error.show { display: block; }
  .submit {
    width: 100%;
    font: inherit; font-size: 16px; font-weight: 700;
    color: #fff; background: var(--primary-dark);
    border: 0; border-radius: 12px;
    padding: 14px; cursor: pointer;
  }
  .submit:hover { background: #104659; }
  .submit:focus-visible { outline: 3px solid rgba(29,111,143,.4); outline-offset: 2px; }
  .submit:disabled { opacity: .6; cursor: progress; }
  .help { text-align: center; font-size: 13px; color: var(--muted); margin-top: 14px; }
</style>
</head>
<body>
  <main class="screen">
    <div class="brand">CLEAN CHECK</div>

    <section class="hero">
      <h1>เข้าสู่ระบบ</h1>
      <p>ตรวจความสะอาดประจำวัน</p>
    </section>

    <form class="card" id="loginForm" novalidate>
      <div class="error" id="error" role="alert"></div>

      <div class="field">
        <label for="staffId">รหัสพนักงาน</label>
        <input id="staffId" name="staffId" type="text" inputmode="text" autocomplete="username" required>
      </div>

      <div class="field">
        <label for="password">รหัสผ่าน</label>
        <div class="input-wrap">
          <input id="password" name="password" type="password" autocomplete="current-password" required>
          <button type="button" class="toggle" id="toggle" aria-label="แสดงรหัสผ่าน">แสดง</button>
        </div>
      </div>

      <button type="submit" class="submit" id="submit">เข้าสู่ระบบ</button>
      <p class="help">ลืมรหัสผ่าน? ติดต่อหัวหน้างาน</p>
    </form>
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
