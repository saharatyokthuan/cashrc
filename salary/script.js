// ---- STORAGE ----
const STORAGE_KEY = 'salarySlipData_v1';
window.slips = [];
let rowSeq = 1;
let editingId = null;
let pendingDeleteId = null;

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    window.slips = raw ? JSON.parse(raw) : [];
  } catch (e) {
    window.slips = [];
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(window.slips));
}

// ---- HELPER ----
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmt(n) {
  return (Number(n) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getYearOf(dateStr) {
  return (dateStr || '').slice(0, 4);
}

// รวมยอดจากแถวที่ชื่อมีคำว่า keyword (ใช้จับ "ภาษี" / "ประกันสังคม" แบบไม่สนใจสะกดปลีกย่อย)
function sumMatchingRows(rows, keyword) {
  return rows.filter(r => r.name && r.name.includes(keyword)).reduce((s, r) => s + (Number(r.amount) || 0), 0);
}

// ยอดสะสมของสลิปที่บันทึกแล้ว (รวมทุกสลิปในปีเดียวกัน ที่วันที่ <= สลิปนี้)
function getAccumulatedForSlip(slip) {
  const year = getYearOf(slip.date);
  let accuIncome = 0, accuTax = 0, accuSS = 0;
  window.slips
    .filter(s => getYearOf(s.date) === year && (s.date < slip.date || (s.date === slip.date && s.id <= slip.id)))
    .forEach(s => {
      accuIncome += s.totalIncome;
      accuTax += sumMatchingRows(s.deductionRows, 'ภาษี');
      accuSS += sumMatchingRows(s.deductionRows, 'ประกันสังคม');
    });
  return { accuIncome, accuTax, accuSS };
}

// ยอดสะสมแบบ live ระหว่างกำลังกรอกฟอร์ม (นับสลิปเดิมในปีเดียวกัน + ค่าที่กำลังกรอก)
function updateAccuPreview() {
  const date = document.getElementById('dateInput').value;
  const incomeRows = readRows('income');
  const deductionRows = readRows('deduction');
  let accuIncome = 0, accuTax = 0, accuSS = 0;
  if (date) {
    const year = getYearOf(date);
    window.slips
      .filter(s => s.id !== editingId && getYearOf(s.date) === year && s.date <= date)
      .forEach(s => {
        accuIncome += s.totalIncome;
        accuTax += sumMatchingRows(s.deductionRows, 'ภาษี');
        accuSS += sumMatchingRows(s.deductionRows, 'ประกันสังคม');
      });
  }
  accuIncome += sumRows(incomeRows);
  accuTax += sumMatchingRows(deductionRows, 'ภาษี');
  accuSS += sumMatchingRows(deductionRows, 'ประกันสังคม');
  document.getElementById('accuIncomeDisplay').textContent = fmt(accuIncome);
  document.getElementById('accuTaxDisplay').textContent = fmt(accuTax);
  document.getElementById('accuSSDisplay').textContent = fmt(accuSS);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

function showConfirmModal(message) {
  return new Promise(resolve => {
    document.getElementById('confirmMessage').textContent = message;
    const bg = document.getElementById('confirmModalBg');
    bg.classList.add('active');
    const yes = document.getElementById('confirmYesBtn');
    const no = document.getElementById('confirmNoBtn');
    const cleanup = (result) => {
      bg.classList.remove('active');
      yes.onclick = null;
      no.onclick = null;
      resolve(result);
    };
    yes.onclick = () => cleanup(true);
    no.onclick = () => cleanup(false);
  });
}

// ---- TABS ----
function showTab(tab) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
  if (tab === 'history') renderHistory();
  if (tab === 'trend') renderTrend();
  if (tab === 'category') renderCategoryList();
  if (tab === 'settings') populateProfileForm();
}

// ---- PROFILE (ข้อมูลส่วนตัว ไม่ค่อยเปลี่ยน) ----
const PROFILE_KEY = 'salaryProfileData_v1';

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : { name: '', empCode: '', branch: '', bankAccount: '' };
  } catch (e) {
    return { name: '', empCode: '', branch: '', bankAccount: '' };
  }
}

function saveProfileData(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function populateProfileForm() {
  const p = loadProfile();
  document.getElementById('profName').value = p.name || '';
  document.getElementById('profEmpCode').value = p.empCode || '';
  document.getElementById('profBranch').value = p.branch || '';
  document.getElementById('profBankAccount').value = p.bankAccount || '';
}

function saveProfile() {
  const profile = {
    name: document.getElementById('profName').value.trim(),
    empCode: document.getElementById('profEmpCode').value.trim(),
    branch: document.getElementById('profBranch').value.trim(),
    bankAccount: document.getElementById('profBankAccount').value.trim()
  };
  saveProfileData(profile);
  updateProfileSubtitle();
  showToast('✅ บันทึกข้อมูลส่วนตัวแล้ว');
}

function updateProfileSubtitle() {
  const p = loadProfile();
  const parts = [p.name, p.branch].filter(Boolean);
  document.getElementById('profileSubtitle').textContent = parts.join(' · ');
}

// ---- KNOWN ITEM NAMES (สำหรับ dropdown) ----
const NAMES_KEY = 'salaryItemNames_v1';

function loadKnownNames() {
  try {
    const raw = localStorage.getItem(NAMES_KEY);
    const parsed = raw ? JSON.parse(raw) : { income: [], deduction: [] };
    return { income: parsed.income || [], deduction: parsed.deduction || [] };
  } catch (e) {
    return { income: [], deduction: [] };
  }
}

function saveKnownNames(names) {
  localStorage.setItem(NAMES_KEY, JSON.stringify(names));
}

function getNames(type) {
  return loadKnownNames()[type] || [];
}

function addItemName(type, name) {
  if (!name) return;
  const names = loadKnownNames();
  if (!names[type].includes(name)) {
    names[type].push(name);
    names[type].sort((a, b) => a.localeCompare(b, 'th'));
    saveKnownNames(names);
  }
}

// เติมหมวดหมู่เริ่มต้นให้ครั้งแรกที่เปิดแอป (เฉพาะตอนยังไม่เคยตั้งค่าอะไรเลย)
function seedDefaultCategoriesIfEmpty() {
  if (localStorage.getItem(NAMES_KEY)) return;
  saveKnownNames({
    income: [
      'เงินเดือน / Salary', 'ค่าล่วงเวลา 1 เท่า', 'ค่าล่วงเวลา 1.5 เท่า',
      'ค่าล่วงเวลาเหมาจ่าย', 'โบนัส', 'เบี้ยกันดาร / ปรับย้อนค่าเบี้ยกันดาร',
      'ค่าน้ำมัน / ค่าเดินทาง', 'เงินรางวัล', 'ค่าภาษา / ค่าอาหาร', 'รายได้อื่น ๆ'
    ].sort((a, b) => a.localeCompare(b, 'th')),
    deduction: [
      'ประกันสังคม', 'หักขาดงาน / ปรับปรุงรายได้', 'หักอื่น ๆ', 'โอนเงินเข้า True Money Wallet'
    ].sort((a, b) => a.localeCompare(b, 'th'))
  });
}

// ---- DYNAMIC ROWS ----
function addRow(type, name = '', amount = '') {
  const container = document.getElementById(type === 'income' ? 'incomeRows' : 'deductionRows');
  const id = 'row' + (rowSeq++);
  const row = document.createElement('div');
  row.className = 'item-row';
  row.id = id;
  const known = getNames(type);
  const optionNames = (name && !known.includes(name)) ? [...known, name].sort((a, b) => a.localeCompare(b, 'th')) : known;
  const options = optionNames.map(n => `<option value="${escapeHtml(n)}"${n === name ? ' selected' : ''}>${escapeHtml(n)}</option>`).join('');
  row.innerHTML = `
    <select class="row-name" onchange="recalcSums()">
      <option value="">-- เลือกรายการ --</option>
      ${options}
    </select>
    <input type="number" class="row-amount" placeholder="0.00" min="0" step="0.01" value="${amount === '' ? '' : amount}" oninput="recalcSums()">
    <button type="button" class="btn-row-del" onclick="removeRow('${id}')">✕</button>
  `;
  container.appendChild(row);
  recalcSums();
}

function removeRow(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
  recalcSums();
}

function readRows(type) {
  const container = document.getElementById(type === 'income' ? 'incomeRows' : 'deductionRows');
  const rows = [];
  container.querySelectorAll('.item-row').forEach(r => {
    const name = r.querySelector('.row-name').value.trim();
    const amount = parseFloat(r.querySelector('.row-amount').value) || 0;
    if (name || amount) rows.push({ name, amount });
  });
  return rows;
}

function sumRows(rows) {
  return rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
}

function recalcSums() {
  const income = sumRows(readRows('income'));
  const deduction = sumRows(readRows('deduction'));
  document.getElementById('sumIncome').textContent = fmt(income);
  document.getElementById('sumDeduction').textContent = fmt(deduction);
  document.getElementById('sumNet').textContent = fmt(income - deduction);
  updateAccuPreview();
}

// ---- SAVE / EDIT / CANCEL ----
function clearForm() {
  document.getElementById('periodInput').value = '';
  document.getElementById('dateInput').value = '';
  document.getElementById('incomeRows').innerHTML = '';
  document.getElementById('deductionRows').innerHTML = '';
  addRow('income');
  addRow('deduction');
  editingId = null;
  document.getElementById('editingBanner').style.display = 'none';
  recalcSums();
}

function cancelEdit() {
  clearForm();
  showToast('ยกเลิกการแก้ไข');
}

function saveSlip() {
  const period = document.getElementById('periodInput').value.trim();
  const date = document.getElementById('dateInput').value;
  const incomeRows = readRows('income');
  const deductionRows = readRows('deduction');

  if (!date) { showToast('⚠️ กรุณาระบุวันที่จ่าย'); return; }
  if (!incomeRows.length && !deductionRows.length) { showToast('⚠️ กรุณากรอกรายการอย่างน้อย 1 รายการ'); return; }

  incomeRows.forEach(r => addItemName('income', r.name));
  deductionRows.forEach(r => addItemName('deduction', r.name));

  const totalIncome = sumRows(incomeRows);
  const totalDeduction = sumRows(deductionRows);

  const slip = {
    id: editingId || Date.now(),
    period, date,
    incomeRows, deductionRows,
    totalIncome, totalDeduction,
    netIncome: totalIncome - totalDeduction
  };

  if (editingId) {
    const idx = window.slips.findIndex(s => s.id === editingId);
    if (idx !== -1) window.slips[idx] = slip;
  } else {
    window.slips.push(slip);
  }
  saveData();
  showToast(editingId ? '✅ แก้ไขสลิปแล้ว' : '✅ บันทึกสลิปแล้ว');
  clearForm();
  showTab('history');
}

// ---- HISTORY ----
function renderHistory() {
  const list = document.getElementById('historyList');
  document.getElementById('historyCount').textContent = window.slips.length;
  if (!window.slips.length) {
    list.innerHTML = '<div class="empty-hint">ยังไม่มีสลิปที่บันทึกไว้</div>';
    return;
  }
  const sorted = [...window.slips].sort((a, b) => b.date.localeCompare(a.date));
  list.innerHTML = sorted.map(s => `
    <div class="hist-card" onclick="openDetail(${s.id})">
      <div class="hist-top">
        <span class="hist-period">งวดที่ ${escapeHtml(s.period || '-')}</span>
        <span class="hist-date">${escapeHtml(s.date)}</span>
      </div>
      <div class="hist-bottom">
        <span>รับ ${fmt(s.totalIncome)} · หัก ${fmt(s.totalDeduction)}</span>
        <span class="hist-net">${fmt(s.netIncome)} ฿</span>
      </div>
    </div>
  `).join('');
}

let detailId = null;
function openDetail(id) {
  const s = window.slips.find(x => x.id === id);
  if (!s) return;
  detailId = id;
  document.getElementById('detailTitle').textContent = `สลิปงวดที่ ${s.period || '-'}`;
  const incomeHtml = s.incomeRows.map(r => `<div class="detail-row"><span>${escapeHtml(r.name || '-')}</span><span>${fmt(r.amount)}</span></div>`).join('');
  const deductionHtml = s.deductionRows.map(r => `<div class="detail-row"><span>${escapeHtml(r.name || '-')}</span><span>${fmt(r.amount)}</span></div>`).join('');
  const accu = getAccumulatedForSlip(s);
  document.getElementById('detailBody').innerHTML = `
    <div class="detail-row"><span>วันที่จ่าย</span><span>${escapeHtml(s.date)}</span></div>
    <div class="detail-section-title">รายการรับ</div>
    ${incomeHtml || '<div class="detail-row"><span>-</span><span>-</span></div>'}
    <div class="detail-row total"><span>รวมรับ</span><span>${fmt(s.totalIncome)}</span></div>
    <div class="detail-section-title">รายการหัก</div>
    ${deductionHtml || '<div class="detail-row"><span>-</span><span>-</span></div>'}
    <div class="detail-row total"><span>รวมหัก</span><span>${fmt(s.totalDeduction)}</span></div>
    <div class="detail-row total"><span>เงินได้สุทธิ</span><span>${fmt(s.netIncome)}</span></div>
    <div class="detail-section-title">ยอดสะสม (ภายในปีเดียวกัน)</div>
    <div class="detail-row"><span>เงินได้สะสม</span><span>${fmt(accu.accuIncome)}</span></div>
    <div class="detail-row"><span>ภาษีสะสม</span><span>${fmt(accu.accuTax)}</span></div>
    <div class="detail-row"><span>ประกันสังคมสะสม</span><span>${fmt(accu.accuSS)}</span></div>
  `;
  document.getElementById('detailModalBg').classList.add('active');
}

function closeDetail() {
  document.getElementById('detailModalBg').classList.remove('active');
  detailId = null;
}

function editSlipFromDetail() {
  const s = window.slips.find(x => x.id === detailId);
  if (!s) return;
  closeDetail();
  document.getElementById('periodInput').value = s.period || '';
  document.getElementById('dateInput').value = s.date || '';
  document.getElementById('incomeRows').innerHTML = '';
  document.getElementById('deductionRows').innerHTML = '';
  s.incomeRows.forEach(r => addRow('income', r.name, r.amount));
  s.deductionRows.forEach(r => addRow('deduction', r.name, r.amount));
  if (!s.incomeRows.length) addRow('income');
  if (!s.deductionRows.length) addRow('deduction');
  editingId = s.id;
  document.getElementById('editingBanner').style.display = 'flex';
  recalcSums();
  showTab('record');
}

async function deleteSlipFromDetail() {
  if (!detailId) return;
  const ok = await showConfirmModal('ต้องการลบสลิปนี้หรือไม่?');
  if (!ok) return;
  window.slips = window.slips.filter(s => s.id !== detailId);
  saveData();
  closeDetail();
  renderHistory();
  showToast('🗑️ ลบสลิปแล้ว');
}

// ---- TREND ----
function renderTrend() {
  const sorted = [...window.slips].sort((a, b) => a.date.localeCompare(b.date));
  const nets = sorted.map(s => s.netIncome);

  if (nets.length) {
    const avg = nets.reduce((a, b) => a + b, 0) / nets.length;
    document.getElementById('avgNet').textContent = fmt(avg);
    document.getElementById('maxNet').textContent = fmt(Math.max(...nets));
    document.getElementById('minNet').textContent = fmt(Math.min(...nets));
  } else {
    document.getElementById('avgNet').textContent = '0';
    document.getElementById('maxNet').textContent = '0';
    document.getElementById('minNet').textContent = '0';
  }

  drawLineChart('trendChart', 'trendEmpty', sorted);
  drawBarChart('barChart', 'barEmpty', sorted);
}

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 180 * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: rect.width, h: 180 };
}

function drawLineChart(canvasId, emptyId, sorted) {
  const canvas = document.getElementById(canvasId);
  const emptyEl = document.getElementById(emptyId);
  if (sorted.length < 2) {
    canvas.style.display = 'none';
    emptyEl.style.display = 'block';
    return;
  }
  canvas.style.display = 'block';
  emptyEl.style.display = 'none';

  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  const pad = { l: 44, r: 12, t: 12, b: 24 };
  const values = sorted.map(s => s.netIncome);
  const max = Math.max(...values), min = Math.min(...values, 0);
  const range = (max - min) || 1;
  const stepX = (w - pad.l - pad.r) / (sorted.length - 1);

  // grid lines
  ctx.strokeStyle = '#223129';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = pad.t + (h - pad.t - pad.b) * (i / 3);
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
    const val = max - (range * i / 3);
    ctx.fillStyle = '#7f9389';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(val).toLocaleString(), pad.l - 6, y + 3);
  }

  // line
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2;
  ctx.beginPath();
  values.forEach((v, i) => {
    const x = pad.l + i * stepX;
    const y = pad.t + (h - pad.t - pad.b) * (1 - (v - min) / range);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // dots
  ctx.fillStyle = '#34d399';
  values.forEach((v, i) => {
    const x = pad.l + i * stepX;
    const y = pad.t + (h - pad.t - pad.b) * (1 - (v - min) / range);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // x labels (first, mid, last)
  ctx.fillStyle = '#7f9389';
  ctx.font = '9px sans-serif';
  ctx.textAlign = 'center';
  [0, Math.floor(sorted.length / 2), sorted.length - 1].forEach(i => {
    const x = pad.l + i * stepX;
    ctx.fillText(shortDate(sorted[i].date), x, h - 6);
  });
}

function drawBarChart(canvasId, emptyId, sorted) {
  const canvas = document.getElementById(canvasId);
  const emptyEl = document.getElementById(emptyId);
  if (!sorted.length) {
    canvas.style.display = 'none';
    emptyEl.style.display = 'block';
    return;
  }
  canvas.style.display = 'block';
  emptyEl.style.display = 'none';

  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);
  const pad = { l: 44, r: 12, t: 12, b: 24 };
  const recent = sorted.slice(-6);
  const max = Math.max(...recent.map(s => Math.max(s.totalIncome, s.totalDeduction)), 1);
  const groupW = (w - pad.l - pad.r) / recent.length;
  const barW = Math.min(16, groupW / 3);

  recent.forEach((s, i) => {
    const cx = pad.l + groupW * i + groupW / 2;
    const incH = (h - pad.t - pad.b) * (s.totalIncome / max);
    const dedH = (h - pad.t - pad.b) * (s.totalDeduction / max);
    ctx.fillStyle = '#34d399';
    ctx.fillRect(cx - barW - 2, h - pad.b - incH, barW, incH);
    ctx.fillStyle = '#f87171';
    ctx.fillRect(cx + 2, h - pad.b - dedH, barW, dedH);
    ctx.fillStyle = '#7f9389';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(shortDate(s.date), cx, h - 6);
  });

  ctx.strokeStyle = '#223129';
  ctx.beginPath();
  ctx.moveTo(pad.l, h - pad.b);
  ctx.lineTo(w - pad.r, h - pad.b);
  ctx.stroke();
}

function shortDate(iso) {
  const parts = (iso || '').split('-');
  if (parts.length !== 3) return iso || '';
  return `${parts[2]}/${parts[1]}`;
}

// ---- CATEGORY MANAGEMENT ----
let currentCatType = 'income';

function setCatType(type) {
  currentCatType = type;
  document.querySelectorAll('.cat-type-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.cat-type-btn[data-cattype="${type}"]`).classList.add('active');
  renderCategoryList();
}

function addCategoryFromInput() {
  const inp = document.getElementById('newCatName');
  const name = inp.value.trim();
  if (!name) { showToast('⚠️ กรุณาพิมพ์ชื่อรายการ'); return; }
  const names = loadKnownNames();
  if (names[currentCatType].includes(name)) { showToast('⚠️ มีชื่อนี้อยู่แล้ว'); return; }
  addItemName(currentCatType, name);
  inp.value = '';
  renderCategoryList();
  showToast('✅ เพิ่มหมวดหมู่แล้ว');
}

function renderCategoryList() {
  const list = document.getElementById('categoryList');
  const names = getNames(currentCatType);
  if (!names.length) {
    list.innerHTML = '<div class="empty-hint">ยังไม่มีหมวดหมู่ในกลุ่มนี้</div>';
    return;
  }
  list.innerHTML = names.map(n => `
    <div class="cat-row" data-name="${escapeHtml(n)}">
      <span class="cat-name">${escapeHtml(n)}</span>
      <div class="cat-actions">
        <button type="button" data-action="rename">✏️</button>
        <button type="button" data-action="delete">🗑️</button>
      </div>
    </div>
  `).join('');
}

function startRenameCategory(row) {
  const oldName = row.dataset.name;
  row.innerHTML = `
    <input type="text" class="cat-rename-input" value="${escapeHtml(oldName)}">
    <div class="cat-actions">
      <button type="button" class="btn-cat-save" data-action="save-rename">✔️</button>
      <button type="button" class="btn-cat-cancel" data-action="cancel-rename">✕</button>
    </div>
  `;
  const inp = row.querySelector('.cat-rename-input');
  inp.focus();
  inp.select();
}

function saveRenameCategory(row) {
  const oldName = row.dataset.name;
  const inp = row.querySelector('.cat-rename-input');
  const newName = inp.value.trim();
  if (!newName) { showToast('⚠️ กรุณาพิมพ์ชื่อ'); return; }
  if (newName === oldName) { renderCategoryList(); return; }
  const names = loadKnownNames();
  if (names[currentCatType].includes(newName)) { showToast('⚠️ มีชื่อนี้อยู่แล้ว'); return; }
  names[currentCatType] = names[currentCatType].filter(n => n !== oldName);
  names[currentCatType].push(newName);
  names[currentCatType].sort((a, b) => a.localeCompare(b, 'th'));
  saveKnownNames(names);

  let touched = 0;
  window.slips.forEach(s => {
    const rows = currentCatType === 'income' ? s.incomeRows : s.deductionRows;
    rows.forEach(r => { if (r.name === oldName) { r.name = newName; touched++; } });
  });
  if (touched) saveData();

  renderCategoryList();
  showToast('✅ แก้ไขชื่อแล้ว' + (touched ? ` (อัปเดต ${touched} รายการเก่าด้วย)` : ''));
}

async function deleteCategoryRow(row) {
  const name = row.dataset.name;
  const usedCount = window.slips.reduce((sum, s) => {
    const rows = currentCatType === 'income' ? s.incomeRows : s.deductionRows;
    return sum + rows.filter(r => r.name === name).length;
  }, 0);
  const msg = usedCount
    ? `หมวดหมู่ "${name}" ถูกใช้ใน ${usedCount} รายการเก่า จะลบออกจากรายการที่เลือกได้ในอนาคต แต่ข้อมูลเก่ายังอยู่ ยืนยันหรือไม่?`
    : `ลบหมวดหมู่ "${name}" หรือไม่?`;
  const ok = await showConfirmModal(msg);
  if (!ok) return;
  const names = loadKnownNames();
  names[currentCatType] = names[currentCatType].filter(n => n !== name);
  saveKnownNames(names);
  renderCategoryList();
  showToast('🗑️ ลบหมวดหมู่แล้ว');
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('categoryList');
  if (!list) return;
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const row = btn.closest('.cat-row');
    if (!row) return;
    const action = btn.dataset.action;
    if (action === 'rename') startRenameCategory(row);
    else if (action === 'delete') deleteCategoryRow(row);
    else if (action === 'save-rename') saveRenameCategory(row);
    else if (action === 'cancel-rename') renderCategoryList();
  });
});

// ---- CSV EXPORT ----
function collectAllCategoryNames(type) {
  const names = new Set(getNames(type));
  window.slips.forEach(s => {
    const rows = type === 'income' ? s.incomeRows : s.deductionRows;
    rows.forEach(r => { if (r.name) names.add(r.name); });
  });
  return Array.from(names).sort((a, b) => a.localeCompare(b, 'th'));
}

function csvEscape(val) {
  const s = String(val === null || val === undefined ? '' : val);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function exportCSV() {
  if (!window.slips.length) { showToast('⚠️ ยังไม่มีข้อมูลให้ส่งออก'); return; }
  const p = loadProfile();
  const metaRows = [];
  if (p.name) metaRows.push(['ชื่อ-สกุล', p.name]);
  if (p.empCode) metaRows.push(['รหัสพนักงาน', p.empCode]);
  if (p.branch) metaRows.push(['สาขา/หน่วยงาน', p.branch]);
  if (p.bankAccount) metaRows.push(['เลขบัญชีธนาคาร', p.bankAccount]);
  const incomeCats = collectAllCategoryNames('income');
  const deductionCats = collectAllCategoryNames('deduction');
  const header = ['งวดที่', 'วันที่', ...incomeCats, 'รวมรับ', ...deductionCats, 'รวมหัก', 'เงินได้สุทธิ', 'เงินได้สะสม', 'ภาษีสะสม', 'ประกันสังคมสะสม'];
  const sorted = [...window.slips].sort((a, b) => a.date.localeCompare(b.date));
  const rows = sorted.map(s => {
    const accu = getAccumulatedForSlip(s);
    const incomeVals = incomeCats.map(c => { const r = s.incomeRows.find(x => x.name === c); return r ? r.amount : ''; });
    const deductionVals = deductionCats.map(c => { const r = s.deductionRows.find(x => x.name === c); return r ? r.amount : ''; });
    return [s.period, s.date, ...incomeVals, s.totalIncome, ...deductionVals, s.totalDeduction, s.netIncome, accu.accuIncome, accu.accuTax, accu.accuSS];
  });
  const csv = [...(metaRows.length ? [...metaRows, []] : []), header, ...rows].map(r => r.map(csvEscape).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  a.href = url;
  a.download = `salary-export-${stamp}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📊 ส่งออก CSV แล้ว');
}

// ---- BACKUP / RESTORE ----
function exportBackup() {
  const data = JSON.stringify({ slips: window.slips, exportedAt: new Date().toISOString() }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  a.href = url;
  a.download = `salary-backup-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 ส่งออกข้อมูลแล้ว');
}

async function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const incoming = Array.isArray(parsed.slips) ? parsed.slips : (Array.isArray(parsed) ? parsed : null);
    if (!incoming) { showToast('⚠️ ไฟล์ไม่ถูกต้อง'); return; }
    const ok = await showConfirmModal(`นำเข้า ${incoming.length} สลิป จะรวมกับข้อมูลเดิม ยืนยันหรือไม่?`);
    if (!ok) return;
    const existingIds = new Set(window.slips.map(s => s.id));
    incoming.forEach(s => {
      if (existingIds.has(s.id)) s.id = Date.now() + Math.floor(Math.random() * 1000);
      window.slips.push(s);
    });
    saveData();
    renderHistory();
    showToast('✅ นำเข้าข้อมูลสำเร็จ');
  } catch (e) {
    showToast('⚠️ อ่านไฟล์ไม่สำเร็จ');
  }
  event.target.value = '';
}

// ---- INIT ----
function initApp() {
  seedDefaultCategoriesIfEmpty();
  loadData();
  updateProfileSubtitle();
  document.getElementById('dateInput').valueAsDate = new Date();
  addRow('income');
  addRow('deduction');
  renderHistory();
  window.addEventListener('resize', () => {
    if (document.getElementById('tab-trend').classList.contains('active')) renderTrend();
  });
}

initApp();
