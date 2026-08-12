/* =========================================================
   🎋 雅趣学堂 · MULTI-CLASS GAMIFICATION & VOCABULARY ENGINE 🐼
   Author: Thầy Marcus
   ========================================================= */

const STORAGE_KEY = "zhVocabApp_multiclass_panda_v6";
var state = null;
const ANSWER_SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzY5BP-DJO68RkKh1xh3aH20GZtBTryNlA25qwaa6C0Chf-bI4xrAqE7F3yyQVQE_dswQ/exec";
const TEACHER_ZALO_PHONE = "0985381914";

/* Default Vocabulary */
const DEFAULT_WORDS = [
  { id: "d1", hanzi: "你好", pinyin: "nǐ hǎo", meaning: "xin chào", emoji: "👋", topic: "Giao tiếp cơ bản", level: "HSK1", example: "你好，很高兴认识你。" },
  { id: "d2", hanzi: "谢谢", pinyin: "xièxie", meaning: "cảm ơn", emoji: "🙏", topic: "Giao tiếp cơ bản", level: "HSK1", example: "谢谢你的帮助。" },
  { id: "d3", hanzi: "学习", pinyin: "xuéxí", meaning: "học tập", emoji: "📚", topic: "Học tập", level: "HSK1", example: "我们要努力学习。" },
  { id: "d4", hanzi: "竹子", pinyin: "zhúzi", meaning: "cây trúc", emoji: "🎋", topic: "Tự nhiên", level: "HSK2", example: "大熊猫喜欢吃竹子。" }
];

/* Shop Trúc Items (30 items with Charm Points) */
const BAMBOO_SHOP_ITEMS = [
  { id: "shop_cherry", icon: "🌸", name: "Hoa Anh Đào", price: 10, charm: 15, desc: "Cây hoa nở rực rỡ bừng sáng Vườn Trúc" },
  { id: "shop_lantern", icon: "🏮", name: "Lồng Đèn Đỏ", price: 12, charm: 18, desc: "Lồng đèn may mắn mang không khí lễ hội" },
  { id: "shop_house", icon: "🏡", name: "Nhà Gỗ Trúc", price: 20, charm: 30, desc: "Ngôi nhà xinh xắn cho Gấu nghỉ ngơi" },
  { id: "shop_carp", icon: "🎏", name: "Cờ Cá Chép", price: 15, charm: 22, desc: "Cờ cá chép tung bay phơ phất trong gió" },
  { id: "shop_koi", icon: "⛲", name: "Hồ Cá Koi", price: 25, charm: 40, desc: "Hồ cá Koi may mắn mát rượi thanh tịnh" },
  { id: "shop_torii", icon: "⛩️", name: "Cổng Cổ Kính", price: 30, charm: 50, desc: "Cổng kiến trúc Đông Á uy nghiêm" },
  { id: "shop_golden_bamboo", icon: "🎋", name: "Khóm Trúc Vàng", price: 18, charm: 25, desc: "Bụi trúc vàng óng ngập tràn tài lộc" },
  { id: "shop_stone_lamp", icon: "🗿", name: "Đèn Đá Zen", price: 15, charm: 20, desc: "Đèn đá phong cách Trà đạo thanh tịnh" },
  { id: "shop_bridge", icon: "🌉", name: "Cầu Gỗ Trúc", price: 28, charm: 45, desc: "Cây cầu gỗ bắc qua con suối nhỏ" },
  { id: "shop_tea_stand", icon: "🍡", name: "Quán Bánh Trôi", price: 22, charm: 35, desc: "Quán ăn vặt thơm phức cho Gấu Trúc" },
  
  /* 20 Vật phẩm trang trí mới */
  { id: "shop_crown", icon: "👑", name: "Vương Miện Hoàng Gia", price: 35, charm: 60, desc: "Vương miện lấp lánh nâng tầm Mị Lực Gấu" },
  { id: "shop_castle", icon: "🏰", name: "Lâu Đài Cổ Tích", price: 50, charm: 100, desc: "Lâu đài tráng lệ biến Vườn Trúc thành vương quốc" },
  { id: "shop_rainbow", icon: "🌈", name: "Cầu Vồng Rực Rỡ", price: 32, charm: 55, desc: "Cầu vồng rực rỡ mang đến may mắn ngập tràn" },
  { id: "shop_unicorn", icon: "🦄", name: "Kỳ Lân Mộng Mơ", price: 40, charm: 75, desc: "Kỳ lân linh vật ban phước lành cho Gấu" },
  { id: "shop_peacock", icon: "🦚", name: "Chim Công Xoè Cánh", price: 38, charm: 70, desc: "Chim công kiêu sa kiều diễm đỉnh cao mị lực" },
  { id: "shop_lotus", icon: "🪷", name: "Hoa Sen Tuyết", price: 16, charm: 25, desc: "Hoa sen thanh cao ngát hương trong vườn" },
  { id: "shop_origami", icon: "🕊️", name: "Hạc Giấy Cầu Nguyện", price: 14, charm: 20, desc: "Đàn hạc giấy mang ước mơ bay cao" },
  { id: "shop_windchime", icon: "🎐", name: "Chuông Gió Thủy Tinh", price: 15, charm: 22, desc: "Tiếng chuông ngân vang thư thái lòng người" },
  { id: "shop_fountain", icon: "⛲", name: "Đài Nước Phong Thủy", price: 26, charm: 42, desc: "Dòng nước tươi mát mang sinh khí dạt dào" },
  { id: "shop_hotspring", icon: "♨️", name: "Suối Nước Nóng", price: 34, charm: 58, desc: "Bể ngâm suối nước nóng ấm áp cho Gấu" },
  { id: "shop_pagoda", icon: "🛕", name: "Tháp Cổ Bảo Tháp", price: 45, charm: 85, desc: "Tháp cổ trang nghiêm linh thiêng huyền bí" },
  { id: "shop_bonsai", icon: "🪴", name: "Chậu Cây Tùng Cổ", price: 20, charm: 32, desc: "Cây tùng cổ thụ dáng bonsai tao nhã" },
  { id: "shop_star", icon: "🌟", name: "Ngôi Sao Ước Nguyện", price: 18, charm: 28, desc: "Ngôi sao may mắn tỏa sáng lung linh" },
  { id: "shop_butterfly", icon: "🦋", name: "Đàn Bướm Tiên", price: 16, charm: 24, desc: "Đàn bướm rực rỡ dạo chơi quanh Gấu" },
  { id: "shop_firefly", icon: "🕯️", name: "Đèn Lồng Đom Đóm", price: 17, charm: 26, desc: "Ánh sáng đêm ấm áp dễ chịu" },
  { id: "shop_moon", icon: "🌙", name: "Mặt Trăng Ngọc", price: 30, charm: 50, desc: "Ánh trăng dịu êm bao trùm Vườn Trúc" },
  { id: "shop_sunflower", icon: "🌻", name: "Cánh Đồng Hướng Dương", price: 22, charm: 36, desc: "Rạng rỡ đón ánh nắng mặt trời" },
  { id: "shop_peach", icon: "🍑", name: "Cây Đào Tiên", price: 25, charm: 40, desc: "Quả đào tiên trường thọ tài lộc" },
  { id: "shop_music_box", icon: "📻", name: "Hộp Nhạc Cổ Điển", price: 24, charm: 38, desc: "Giai điệu du dương êm dịu tâm hồn" },
  { id: "shop_gem", icon: "💎", name: "Viên Ngọc Rồng", price: 60, charm: 120, desc: "Bảo vật tối thượng tỏa ra hào quang mị lực vô song" }
];

function calcPandaCharm(decorations = []) {
  if (!Array.isArray(decorations)) return 0;
  return decorations.reduce((sum, id) => {
    const item = BAMBOO_SHOP_ITEMS.find(x => x.id === id);
    return sum + (item ? (item.charm || 10) : 0);
  }, 0);
}

/* Default Application State */
function sanitizeState(s) {
  if (!s || typeof s !== "object") s = {};

  if (typeof s.studentName !== "string") s.studentName = "Nguyễn Minh Anh";
  if (typeof s.currentClassName !== "string") s.currentClassName = "Lớp HSK 2 - Ca Tối";

  if (!s.classes || typeof s.classes !== "object") s.classes = {};
  if (!s.classes["Lớp HSK 2 - Ca Tối"]) {
    s.classes["Lớp HSK 2 - Ca Tối"] = {
      password: "123",
      videos: [
        { id: "v1", title: "Bài 1: Luyện Nghe Giao Tiếp", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", note: "Các em nghe kĩ đoạn hội thoại và chép lại đầy đủ nhé 🐼" }
      ],
      customWords: [
        { id: "w1", hanzi: "反省", pinyin: "fǎnxǐng", meaning: "tự kiểm điểm, suy ngẫm", emoji: "🍵", topic: "Chuyên đề", level: "HSK2", example: "他犯错后认真反省。" },
        { id: "w2", hanzi: "据说", pinyin: "jùshuō", meaning: "nghe nói rằng", emoji: "🎋", topic: "Chuyên đề", level: "HSK2", example: "据说明天会下雨。" }
      ],
      deletedDefaultIds: [],
      grammarSections: [
        {
          id: "gsec_1",
          title: "Phần 1 · Đặt câu với từ trọng tâm",
          instruction: "Dùng mỗi điểm ngữ pháp bên dưới để đặt ít nhất 1 câu hoàn chỉnh.",
          items: [
            { id: "gi_1", name: "着 (zhe)", description: "Diễn tả trạng thái đang tiếp diễn. Ví dụ: 门开着。" },
            { id: "gi_2", name: "把 (bǎ)", description: "Câu chữ 把 tác động lên tân ngữ. Ví dụ: 把书打开。" }
          ]
        }
      ],
      grammarSubmissions: []
    };
  }

  Object.keys(s.classes).forEach(cName => {
    const cData = s.classes[cName];
    if (cData && typeof cData === "object") {
      if (!Array.isArray(cData.videos)) cData.videos = [];
      if (!Array.isArray(cData.customWords)) cData.customWords = [];
      if (!Array.isArray(cData.deletedDefaultIds)) cData.deletedDefaultIds = [];
      if (!Array.isArray(cData.grammarSections)) cData.grammarSections = [];
      if (!Array.isArray(cData.grammarSubmissions)) cData.grammarSubmissions = [];
      if (typeof cData.password !== "string") cData.password = "123";
    }
  });

  if (!s.learned || typeof s.learned !== "object") s.learned = {};
  if (!s.reviewWords || typeof s.reviewWords !== "object") s.reviewWords = {};
  if (!s.dictationSubmissions || typeof s.dictationSubmissions !== "object") s.dictationSubmissions = {};
  if (!s.timedSubmissions || typeof s.timedSubmissions !== "object") s.timedSubmissions = {};
  if (!s.timedBest || typeof s.timedBest !== "object") s.timedBest = {};

  if (typeof s.streak !== "number") s.streak = 1;
  if (typeof s.lastStudyDate !== "string") s.lastStudyDate = new Date().toDateString();
  if (typeof s.challengeSeconds !== "number") s.challengeSeconds = 4;
  if (typeof s.customTitle !== "string") s.customTitle = "🎋 雅趣学堂 · WEB TỪ VỰNG CỦA THẦY MARCUS 🎋";
  if (typeof s.colorPaper !== "string") s.colorPaper = "#F0F7F4";
  if (typeof s.colorInk !== "string") s.colorInk = "#2C4A3E";
  if (typeof s.colorJade !== "string") s.colorJade = "#388E3C";
  if (typeof s.bgImage !== "string") s.bgImage = "";

  if (!s.gamification || typeof s.gamification !== "object") s.gamification = {};
  const g = s.gamification;
  if (typeof g.bambooPouch !== "number") g.bambooPouch = 20;
  if (typeof g.totalXp !== "number") g.totalXp = 150;
  if (!Array.isArray(g.unlockedBadges)) g.unlockedBadges = ["b1"];
  if (!Array.isArray(g.decorations)) g.decorations = [];

  const todayStr = new Date().toISOString().split("T")[0];
  if (!g.dailySteals || typeof g.dailySteals !== "object") {
    g.dailySteals = { date: todayStr, count: 0 };
  } else if (g.dailySteals.date !== todayStr) {
    g.dailySteals.date = todayStr;
    g.dailySteals.count = 0;
  }

  if (!g.rewardMatrix || typeof g.rewardMatrix !== "object") {
    g.rewardMatrix = { quiz: 10, timed: 10, dictation: 15, sentence: 15, grammar: 20, streak: 30 };
  } else {
    if (typeof g.rewardMatrix.quiz !== "number") g.rewardMatrix.quiz = 10;
    if (typeof g.rewardMatrix.timed !== "number") g.rewardMatrix.timed = 10;
    if (typeof g.rewardMatrix.dictation !== "number") g.rewardMatrix.dictation = 15;
    if (typeof g.rewardMatrix.sentence !== "number") g.rewardMatrix.sentence = 15;
    if (typeof g.rewardMatrix.grammar !== "number") g.rewardMatrix.grammar = 20;
    if (typeof g.rewardMatrix.streak !== "number") g.rewardMatrix.streak = 30;
  }

  if (typeof g.announcement !== "string") {
    g.announcement = "📌 Dặn dò từ Thầy Marcus: Các em nhớ làm bài tập tích Trúc tăng Level Gấu nha ~ 🐼🎋";
  }

  if (!Array.isArray(g.activityFeed) || g.activityFeed.length === 0) {
    g.activityFeed = [
      { id: "a1", text: "🎉 Gấu của " + s.studentName + " vừa chạm Level 2 (Gấu Mầm Trúc)! ✨", time: "Vừa xong" }
    ];
  }

  if (!Array.isArray(g.badgesConfig) || g.badgesConfig.length === 0) {
    g.badgesConfig = [
      { id: "b1", title: "Hào Hán HSK", icon: "🏅", desc: "Đạt điểm tối đa bài Quiz" },
      { id: "b2", title: "Thánh Luyện Nghe", icon: "🎧", desc: "Hoàn thành bài Chép Chính Tả" },
      { id: "b3", title: "Học Sinh Chăm Chỉ", icon: "🔥", desc: "Duy trì Streak 7 ngày" },
      { id: "b4", title: "Tốc Độ Ánh Sáng", icon: "⚡", desc: "Vượt Thử Thách Thời Gian" },
      { id: "b5", title: "Đại Phú Sĩ Trúc", icon: "🎋", desc: "Sở hữu từ 100 Cành Trúc" },
      { id: "b6", title: "Đại Sư Tốt Nghiệp", icon: "🎓", desc: "Đạt Level 30 MAX" }
    ];
  }

  if (!Array.isArray(g.peers) || g.peers.length === 0) {
    g.peers = [
      { name: "Nguyễn Minh Anh", totalXp: 150, bambooPouch: 20, level: 2, outfit: "🌱 Gấu Mầm Trúc", decorations: ["shop_cherry"] },
      { name: "Trần Bảo Nam", totalXp: 320, bambooPouch: 45, level: 4, outfit: "🎒 Gấu Tân Binh", decorations: ["shop_house", "shop_lantern"] },
      { name: "Lê Hoàng Yến", totalXp: 210, bambooPouch: 30, level: 3, outfit: "🎒 Gấu Tân Binh", decorations: ["shop_koi"] },
      { name: "Phạm Quốc Bảo", totalXp: 90, bambooPouch: 10, level: 1, outfit: "🌱 Gấu Mầm Trúc", decorations: ["shop_golden_bamboo"] }
    ];
  }

  g.peers.forEach(p => {
    if (!Array.isArray(p.decorations)) p.decorations = [];
    p.charm = calcPandaCharm(p.decorations);
  });

  return s;
}

function loadState() {
  let loaded = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) loaded = JSON.parse(raw);
  } catch (e) {}
  return sanitizeState(loaded);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(message, type = "success") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); z-index:99999; display:flex; flex-direction:column; gap:8px; pointer-events:none; max-width:90vw; width:380px;";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const bgColor = type === "error" ? "#FFEEEF" : type === "warning" ? "#FFF8E1" : "#E8F5E9";
  const borderColor = type === "error" ? "#E53935" : type === "warning" ? "#FFB300" : "#43A047";
  const textColor = type === "error" ? "#C62828" : type === "warning" ? "#F57F17" : "#1B5E20";

  toast.style.cssText = `background:${bgColor}; border:2px solid ${borderColor}; color:${textColor}; padding:12px 18px; border-radius:14px; font-weight:700; font-size:13px; box-shadow:0 8px 20px rgba(0,0,0,0.2); text-align:center; pointer-events:auto; transition: all 0.3s ease;`;
  toast.innerHTML = message.replace(/\n/g, "<br/>");

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

state = loadState();

/* =========================================================
   GOOGLE SHEETS LOGGING & UTILS
   ========================================================= */
function sendAnswerToGoogleSheet(extra = {}) {
  const payload = JSON.stringify({
    action: "student_answer",
    timestamp: new Date().toISOString(),
    studentName: state.studentName || "Học viên",
    className: state.currentClassName || "",
    ...extra
  });

  return fetch(ANSWER_SHEET_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: payload,
    keepalive: true
  }).catch(() => {});
}

function sendResultToZalo(summaryText) {
  const finish = () => window.open("https://zalo.me/" + TEACHER_ZALO_PHONE, "_blank");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(summaryText).then(() => {
      alert("Đã copy kết quả vào bộ nhớ tạm! Zalo sẽ mở ra, bạn chỉ cần dán vào khung chat với Thầy Marcus nhé 🐼");
      finish();
    }).catch(finish);
  } else {
    finish();
  }
}

/* Audio Synthesis */
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
  }
  return audioCtx;
}

function playTone(freqs, duration = 0.14, type = "sine", gapMs = 90) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  freqs.forEach((freq, i) => {
    const t0 = ctx.currentTime + (i * gapMs) / 1000;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.18, t0 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  });
}

function playSound(kind) {
  if (kind === "correct") playTone([880, 1318.5], 0.13, "sine", 90);
  else if (kind === "wrong") playTone([220, 174.6], 0.18, "triangle", 70);
  else if (kind === "pass") playTone([784, 988, 1318.5], 0.15, "sine", 100);
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

/* =========================================================
   MULTI-CLASS DATA ACCESS
   ========================================================= */
function getCurrentClassData() {
  if (!state.currentClassName || !state.classes[state.currentClassName]) {
    const keys = Object.keys(state.classes);
    state.currentClassName = keys[0] || "Lớp HSK 2 - Ca Tối";
  }
  const cData = state.classes[state.currentClassName];
  if (!Array.isArray(cData.videos)) cData.videos = [];
  if (!Array.isArray(cData.customWords)) cData.customWords = [];
  if (!Array.isArray(cData.grammarSections)) cData.grammarSections = [];
  if (!Array.isArray(cData.grammarSubmissions)) cData.grammarSubmissions = [];
  return cData;
}

function getWordsOfClass(cName) {
  const cData = state.classes[cName];
  if (!cData) return [];
  const activeDefaults = DEFAULT_WORDS.filter(w => !(cData.deletedDefaultIds || []).includes(w.id));
  return activeDefaults.concat(cData.customWords || []);
}

function allWords() {
  return getWordsOfClass(state.currentClassName);
}

function topicList() {
  const set = new Set(allWords().map(w => w.topic));
  return Array.from(set);
}

function fillTopicSelect(sel, includeAll = true) {
  if (!sel) return;
  sel.innerHTML = "";
  if (includeAll) {
    const o = document.createElement("option");
    o.value = "all"; o.textContent = "Tất cả chủ đề / List";
    sel.appendChild(o);
  }
  topicList().forEach(t => {
    const o = document.createElement("option");
    o.value = t; o.textContent = t;
    sel.appendChild(o);
  });
}

function shuffle(arr) {
  if (!Array.isArray(arr)) return [];
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function touchStreak() {
  const today = new Date().toDateString();
  if (state.lastStudyDate === today) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  if (state.lastStudyDate === y.toDateString()) {
    state.streak += 1;
  } else {
    state.streak = 1;
  }
  state.lastStudyDate = today;
  if (state.streak >= 7 && !state.gamification.unlockedBadges.includes("b3")) {
    awardBadge("b3");
  }
  saveState();
}

/* =========================================================
   AUTH ENGINE & SESSION MANAGEMENT
   ========================================================= */
function getLocalAccounts() {
  try {
    const raw = localStorage.getItem("zhVocabApp_accounts_v1");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    "minhanh": { username: "minhanh", displayName: "Nguyễn Minh Anh", password: "123", role: "student" },
    "teacher": { username: "teacher", displayName: "Thầy Marcus (GV)", password: "123455", role: "teacher" }
  };
}

function saveLocalAccounts(accs) {
  localStorage.setItem("zhVocabApp_accounts_v1", JSON.stringify(accs));
}

function initAuthHandlers() {
  const loginBtn = document.getElementById("auth-login-submit-btn");
  const regBtn = document.getElementById("auth-register-submit-btn");
  const logoutBtn = document.getElementById("auth-logout-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const u = document.getElementById("auth-login-username").value.trim().toLowerCase();
      const p = document.getElementById("auth-login-password").value;
      if (!u || !p) return alert("Vui lòng nhập tên đăng nhập và mật khẩu!");

      const accs = getLocalAccounts();
      if (accs[u] && accs[u].password === p) {
        loginSuccess(accs[u]);
      } else if (!accs[u]) {
        const newAcc = { username: u, displayName: u, password: p, role: u === "teacher" ? "teacher" : "student" };
        accs[u] = newAcc;
        saveLocalAccounts(accs);
        loginSuccess(newAcc);
      } else {
        alert("Mật khẩu không chính xác!");
      }
    });
  }

  if (regBtn) {
    regBtn.addEventListener("click", () => {
      const u = document.getElementById("auth-reg-username").value.trim().toLowerCase();
      const d = document.getElementById("auth-reg-displayname").value.trim();
      const p = document.getElementById("auth-reg-password").value;
      if (!u || !d || !p) return alert("Vui lòng nhập đầy đủ thông tin đăng ký!");

      const accs = getLocalAccounts();
      if (accs[u]) return alert("Tên đăng nhập đã tồn tại!");

      const newAcc = { username: u, displayName: d, password: p, role: "student" };
      accs[u] = newAcc;
      saveLocalAccounts(accs);
      loginSuccess(newAcc);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (!confirm("Bạn có chắc chắn muốn đăng xuất?")) return;
      localStorage.removeItem("zhVocabApp_current_user");
      document.getElementById("auth-overlay").style.display = "flex";
      document.getElementById("class-selector-overlay").style.display = "none";
    });
  }
}

function loginSuccess(user) {
  state.username = user.username;
  state.studentName = user.displayName || user.username;
  state.role = user.role || "student";
  saveState();
  localStorage.setItem("zhVocabApp_current_user", JSON.stringify(user));

  document.getElementById("auth-overlay").style.display = "none";
  document.getElementById("auth-current-username").textContent = state.studentName;
  document.getElementById("selector-student-name").value = state.studentName;

  document.getElementById("class-selector-overlay").style.display = "flex";
  initClassSelector();

  if (state.role === "teacher") {
    autoUnlockTeacherDashboard();
  }
}

function checkAutoSession() {
  try {
    const saved = JSON.parse(localStorage.getItem("zhVocabApp_current_user"));
    if (saved && saved.username) {
      state.username = saved.username;
      state.studentName = saved.displayName || saved.username;
      state.role = saved.role || "student";
      saveState();

      document.getElementById("auth-overlay").style.display = "none";
      document.getElementById("auth-current-username").textContent = state.studentName;
      document.getElementById("selector-student-name").value = state.studentName;

      if (state.currentClassName && state.classes[state.currentClassName]) {
        enterClass(state.currentClassName);
      } else {
        document.getElementById("class-selector-overlay").style.display = "flex";
        initClassSelector();
      }
      return;
    }
  } catch (e) {}
  document.getElementById("auth-overlay").style.display = "flex";
}

/* Class Selector */
function initClassSelector() {
  const list = document.getElementById("class-selection-list");
  if (!list) return;
  list.innerHTML = "";
  const classNames = Object.keys(state.classes);
  if (classNames.length === 0) {
    list.innerHTML = '<div class="empty-note">Chưa có lớp học nào.</div>';
    return;
  }
  classNames.forEach(cName => {
    const item = document.createElement("div");
    item.className = "class-item-box";
    item.innerHTML = `
      <div>
        <h4 style="margin:0 0 2px; color:var(--seal-dark); font-family:var(--serif);">🏫 ${cName}</h4>
        <p style="margin:0; font-size:12px; color:var(--ink-soft);">Bấm để vào lớp tích Trúc nuôi Gấu 🐼</p>
      </div>
      <div style="font-size: 18px;">🔒</div>
    `;
    item.addEventListener("click", () => {
      const sName = document.getElementById("selector-student-name").value.trim();
      if (!sName) return alert("Vui lòng nhập tên của bạn trước khi chọn lớp!");
      state.studentName = sName;
      saveState();
      enterClass(cName);
    });
    list.appendChild(item);
  });
}

function enterClass(cName) {
  state.currentClassName = cName;
  saveState();
  document.getElementById("class-selector-overlay").style.display = "none";
  document.getElementById("current-class-badge").textContent = cName;
  updateGamificationUI();
  refreshActiveViewData();
}

/* =========================================================
   GAMIFICATION ENGINE & REWARDS
   ========================================================= */
function getXpForLevel(lv) {
  if (lv <= 5) return 100;
  if (lv <= 20) return 100 + (lv * 10);
  return 250 + (lv * 15);
}

function calcLevelDetails(totalXp) {
  let lv = 1;
  let rem = totalXp;
  while (lv < 30) {
    let req = getXpForLevel(lv);
    if (rem >= req) {
      rem -= req;
      lv++;
    } else break;
  }
  return {
    level: Math.min(30, lv),
    currentLevelXp: rem,
    requiredXpForNext: getXpForLevel(Math.min(30, lv))
  };
}

function getLevelMetadata(lv) {
  if (lv >= 27) return { title: "🎓 Đại Sư Tốt Nghiệp", outfit: "🎓✨👑", status: "Đội mũ cử nhân, hào quang rực rỡ" };
  if (lv >= 21) return { title: "😎 Gấu Cao Thủ", outfit: "🕶️👑", status: "Biểu cảm kiêu hãnh & phụ kiện ngầu" };
  if (lv >= 13) return { title: "✨ Gấu Hào Hán", outfit: "✨", status: "Cán mốc Giữa khóa nhận Hào quang" };
  if (lv >= 6)  return { title: "🎒 Gấu Tân Binh", outfit: "🎒", status: "Gấu biết ngồi, đeo balo, thả tim" };
  return { title: "🌱 Gấu Mầm Trúc", outfit: "🌱", status: "Gấu mầm trúc mông tròn ngơ ngác" };
}

function updateGamificationUI() {
  const g = state.gamification;
  if (!g) return;
  const lDetails = calcLevelDetails(g.totalXp);
  const lMeta = getLevelMetadata(lDetails.level);
  const totalCharm = calcPandaCharm(g.decorations || []);

  if (state.studentName && Array.isArray(g.peers)) {
    let me = g.peers.find(p => p.name === state.studentName);
    if (!me) {
      me = {
        name: state.studentName,
        totalXp: g.totalXp,
        bambooPouch: g.bambooPouch,
        level: lDetails.level,
        outfit: lMeta.outfit,
        decorations: g.decorations || [],
        charm: totalCharm
      };
      g.peers.push(me);
    } else {
      me.bambooPouch = g.bambooPouch;
      me.level = lDetails.level;
      me.totalXp = g.totalXp;
      me.decorations = g.decorations || [];
      me.charm = totalCharm;
    }
  }

  document.getElementById("gh-level-title").textContent = `LV ${lDetails.level} · ${lMeta.title}`;
  document.getElementById("gh-outfit-text").textContent = `Trạng thái: ${lMeta.status}`;
  document.getElementById("gh-bamboo-pouch-count").textContent = g.bambooPouch;
  document.getElementById("gh-xp-val").textContent = `${lDetails.currentLevelXp}/${lDetails.requiredXpForNext}`;
  const pct = Math.min(100, Math.round((lDetails.currentLevelXp / lDetails.requiredXpForNext) * 100));
  document.getElementById("gh-xp-bar").style.width = pct + "%";
  document.getElementById("gh-panda-icon").textContent = lMeta.outfit || "🌱";

  document.getElementById("announcement-banner-text").textContent = g.announcement;

  document.getElementById("ph-student-title").textContent = `Gấu Trúc Của ${state.studentName || 'Học viên'}`;
  document.getElementById("ph-level-name").textContent = `LEVEL ${lDetails.level} · ${lMeta.title.toUpperCase()} (💖 ${totalCharm} Mị Lực)`;
  document.getElementById("ph-bamboo-count").textContent = `${g.bambooPouch} Cành 🎋`;
  document.getElementById("ph-xp-text").textContent = `${lDetails.currentLevelXp} / ${lDetails.requiredXpForNext} XP`;
  document.getElementById("ph-xp-bar-inner").style.width = pct + "%";
  document.getElementById("ph-outfit-badge").textContent = lMeta.outfit;
  
  const aura = document.getElementById("ph-aura-ring");
  if (aura) {
    if (lDetails.level >= 13) aura.classList.add("active");
    else aura.classList.remove("active");
  }

  const bGrid = document.getElementById("ph-badge-grid");
  if (bGrid) {
    bGrid.innerHTML = "";
    g.badgesConfig.forEach(b => {
      const isUnlocked = g.unlockedBadges.includes(b.id);
      const div = document.createElement("div");
      div.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
      div.innerHTML = `<div class="b-icon">${b.icon}</div><div class="b-title">${b.title}</div><div class="b-desc">${b.desc}</div>`;
      bGrid.appendChild(div);
    });
  }

  renderActivityFeed();
  renderGardenDecorations();
  saveState();
}

/* =========================================================
   GARDEN DECORATIONS, SHOP TRÚC & CƯỚP TRÚC ENGINE
   ========================================================= */
function renderGardenDecorations() {
  const container = document.getElementById("ph-decorations-container");
  if (!container) return;
  container.innerHTML = "";

  const decos = state.gamification?.decorations || [];
  if (decos.length === 0) {
    container.innerHTML = `<div style="font-size:12px; color:var(--ink-soft); font-weight:700; text-align:center; padding:4px; opacity:0.85;">🌸 Vườn Trúc chưa có vật phẩm. Bấm <strong>[🛒 Shop Trúc Trang Trí]</strong> để mua Hoa Anh Đào, Lồng Đèn, Nhà Gỗ nhé!</div>`;
    return;
  }

  decos.forEach(id => {
    const item = BAMBOO_SHOP_ITEMS.find(x => x.id === id);
    if (item) {
      const el = document.createElement("div");
      el.className = "garden-deco-item";
      el.title = item.desc;
      el.innerHTML = `${item.icon} <span>${item.name}</span>`;
      container.appendChild(el);
    }
  });
}

function openShopModal() {
  const modal = document.getElementById("shop-modal");
  if (!modal) return;
  modal.style.display = "flex";
  renderShopModal();
}

function renderShopModal() {
  const balEl = document.getElementById("shop-bamboo-balance");
  if (balEl) balEl.textContent = `${state.gamification?.bambooPouch || 0} 🎋`;

  const charmEl = document.getElementById("shop-charm-balance");
  if (charmEl) charmEl.textContent = `${calcPandaCharm(state.gamification?.decorations || [])} 💖`;

  const grid = document.getElementById("shop-items-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const owned = state.gamification?.decorations || [];

  BAMBOO_SHOP_ITEMS.forEach(item => {
    const isBought = owned.includes(item.id);
    const card = document.createElement("div");
    card.style.cssText = "background:var(--card-bg); border:2px solid var(--paper-darker); border-radius:16px; padding:12px; display:flex; flex-direction:column; justify-content:space-between;";
    card.innerHTML = `
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
          <span style="font-size:26px;">${item.icon}</span>
          <div>
            <strong style="color:var(--seal-dark); font-size:14px; display:block;">${item.name}</strong>
            <span style="font-size:11px; color:#E91E63; font-weight:700;">+${item.charm} Mị Lực 💖</span>
          </div>
        </div>
        <p style="font-size:11px; color:var(--ink-soft); margin:4px 0 10px; line-height:1.3;">${item.desc}</p>
      </div>
      <div>
        ${isBought ? `
          <div style="display:flex; gap:6px;">
            <button class="btn btn-outline" disabled style="flex:1; font-size:11px; padding:6px 4px; opacity:0.8;">✓ Đã có</button>
            <button class="btn btn-ok gift-item-direct-btn" style="flex:1; font-size:11px; padding:6px 4px;">🎁 Tặng bạn</button>
          </div>
        ` : `
          <button class="btn btn-ok buy-item-btn" style="width:100%; font-size:12px; padding:6px 10px;">🛒 Mua (${item.price} 🎋)</button>
        `}
      </div>
    `;

    const buyBtn = card.querySelector(".buy-item-btn");
    if (buyBtn) {
      buyBtn.addEventListener("click", () => buyShopItem(item));
    }

    const giftBtn = card.querySelector(".gift-item-direct-btn");
    if (giftBtn) {
      giftBtn.addEventListener("click", () => {
        const modal = document.getElementById("shop-modal");
        if (modal) modal.style.display = "none";
        openGiftModal();
      });
    }

    grid.appendChild(card);
  });
}

function buyShopItem(item) {
  const g = state.gamification;
  if (!g) return;
  if (g.bambooPouch < item.price) {
    return alert(`Bạn không đủ Cành Trúc! Cần có ${item.price} Trúc nhưng bạn chỉ có ${g.bambooPouch} Trúc. Hãy làm thêm bài tập để tích Trúc nhé 🎋`);
  }

  g.bambooPouch -= item.price;
  if (!g.decorations) g.decorations = [];
  g.decorations.push(item.id);

  addActivityLog(`🛒 Gấu của ${state.studentName} vừa mua ${item.icon} ${item.name} (+${item.charm} Mị Lực 💖) làm đẹp Vườn Trúc!`);
  saveState();
  updateGamificationUI();
  renderShopModal();
  renderGardenDecorations();
  playSound("correct");
  alert(`Mua ${item.icon} ${item.name} thành công! Gấu nhận +${item.charm} điểm Mị Lực 💖 và vật phẩm đã đặt trong Vườn Trúc!`);
}

function openGiftModal(defaultTargetPeer = null) {
  const modal = document.getElementById("gift-modal");
  if (!modal) return;
  modal.style.display = "flex";
  renderGiftModal(defaultTargetPeer);
}

function renderGiftModal(defaultTargetPeer = null) {
  const container = document.getElementById("gift-items-list");
  if (!container) return;
  container.innerHTML = "";

  const ownedDecos = state.gamification?.decorations || [];
  if (ownedDecos.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px; color:var(--ink-soft); font-size:13px; background:var(--paper); border-radius:16px; border:2px dashed var(--paper-darker);">
        🛍️ Bạn chưa sở hữu đạo cụ trang trí nào để tặng.<br/>Hãy ghé <strong>[🛒 Shop Trúc]</strong> để mua đồ tăng Mị Lực trước nhé!
        <div style="margin-top:12px;">
          <button class="btn btn-primary" id="gift-empty-shop-btn" style="font-size:12px; padding:6px 14px;">🛒 Đến Shop Trúc Ngay</button>
        </div>
      </div>
    `;
    document.getElementById("gift-empty-shop-btn")?.addEventListener("click", () => {
      document.getElementById("gift-modal").style.display = "none";
      openShopModal();
    });
    return;
  }

  const peers = (state.gamification?.peers || []).filter(p => p.name !== state.studentName);

  if (peers.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink-soft);">Chưa có bạn học nào trong danh sách nhận quà.</div>`;
    return;
  }

  ownedDecos.forEach((id, index) => {
    const item = BAMBOO_SHOP_ITEMS.find(x => x.id === id);
    if (!item) return;

    const card = document.createElement("div");
    card.style.cssText = "background:var(--paper); border:2px solid var(--paper-darker); border-radius:14px; padding:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;";

    let optionsHtml = peers.map(p => {
      const alreadyHas = Array.isArray(p.decorations) && p.decorations.includes(id);
      const tag = alreadyHas ? ' (Đã có vật phẩm này)' : '';
      return `<option value="${p.name}" ${p.name === defaultTargetPeer ? 'selected' : ''}>🐼 ${p.name}${tag}</option>`;
    }).join("");

    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="font-size:28px;">${item.icon}</span>
        <div>
          <strong style="color:var(--seal-dark); font-size:14px;">${item.name}</strong>
          <div style="font-size:11px; color:#E91E63; font-weight:700;">+${item.charm} Mị Lực 💖</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <select class="gift-target-select" style="font-size:12px; padding:5px 8px; border-radius:8px; border:2px solid var(--paper-darker); font-weight:700;">
          ${optionsHtml}
        </select>
        <button class="btn btn-ok gift-send-btn" style="font-size:12px; padding:6px 12px;">🎁 Tặng ngay</button>
      </div>
    `;

    const select = card.querySelector(".gift-target-select");
    const sendBtn = card.querySelector(".gift-send-btn");

    sendBtn.addEventListener("click", () => {
      const targetName = select.value;
      if (!targetName) return;
      giftDecorationToPeer(id, index, targetName);
    });

    container.appendChild(card);
  });
}

function giftDecorationToPeer(itemId, itemIndex, targetPeerName) {
  const g = state.gamification;
  if (!g) return;

  const item = BAMBOO_SHOP_ITEMS.find(x => x.id === itemId);
  if (!item) return;

  const peer = (g.peers || []).find(p => p.name === targetPeerName);
  if (!peer) {
    showToast("⚠️ Không tìm thấy bạn học này!", "error");
    return;
  }

  if (!Array.isArray(peer.decorations)) peer.decorations = [];

  /* Rule: Only transfer if recipient does NOT already own this item */
  if (peer.decorations.includes(itemId)) {
    showToast(`⚠️ Bạn ${targetPeerName} đã sở hữu đạo cụ ${item.icon} ${item.name} rồi! Hãy chọn tặng bạn học khác nhé.`, "warning");
    return;
  }

  /* Sender loses item & charm */
  const removeIdx = g.decorations.indexOf(itemId);
  if (removeIdx !== -1) {
    g.decorations.splice(removeIdx, 1);
  } else if (itemIndex >= 0 && itemIndex < g.decorations.length) {
    g.decorations.splice(itemIndex, 1);
  }

  /* Recipient gains item & charm */
  peer.decorations.push(itemId);
  peer.charm = calcPandaCharm(peer.decorations);

  /* Sync current student in peers array */
  if (state.studentName && Array.isArray(g.peers)) {
    const me = g.peers.find(p => p.name === state.studentName);
    if (me) {
      me.decorations = g.decorations;
      me.charm = calcPandaCharm(g.decorations);
    }
  }

  addActivityLog(`🎁 ${state.studentName} đã chuyển tặng ${item.icon} ${item.name} cho ${targetPeerName}! (${targetPeerName} nhận +${item.charm} Mị Lực 💖, ${state.studentName} -${item.charm} Mị Lực)`);

  saveState();
  updateGamificationUI();
  renderGiftModal(targetPeerName);
  renderShopModal();
  renderGardenDecorations();
  renderLeaderboardContent();
  playSound("correct");

  showToast(`🎁 TẶNG QUÀ THÀNH CÔNG!\n- Đạo cụ ${item.icon} ${item.name} đã chuyển sang Vườn của ${targetPeerName} (+${item.charm} Mị Lực 💖).\n- Bạn đã chuyển giao vật phẩm này (-${item.charm} Mị Lực 💖).`, "success");
}

function checkResetDailySteals() {
  const g = state.gamification;
  if (!g) return;
  const todayStr = new Date().toISOString().split("T")[0];
  if (!g.dailySteals || typeof g.dailySteals !== "object") {
    g.dailySteals = { date: todayStr, count: 0 };
  } else if (g.dailySteals.date !== todayStr) {
    g.dailySteals.date = todayStr;
    g.dailySteals.count = 0;
  }
}

function openStealModal() {
  checkResetDailySteals();
  const modal = document.getElementById("steal-modal");
  if (!modal) return;
  modal.style.display = "flex";
  renderStealModal();
}

function renderStealModal() {
  checkResetDailySteals();
  const g = state.gamification;
  const stolenToday = g.dailySteals?.count || 0;
  const quotaRem = Math.max(0, 5 - stolenToday);

  const quotaEl = document.getElementById("steal-quota-count");
  if (quotaEl) quotaEl.textContent = `${quotaRem} / 5 Trúc`;

  const list = document.getElementById("steal-student-list");
  if (!list) return;
  list.innerHTML = "";

  const peers = (g.peers || []).slice();
  if (state.studentName) {
    const me = peers.find(p => p.name === state.studentName);
    if (me) {
      me.bambooPouch = g.bambooPouch;
      me.level = calcLevelDetails(g.totalXp).level;
    }
  }

  const targets = peers.filter(p => p.name !== state.studentName);

  if (targets.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding:20px; color:var(--ink-soft); font-size:13px;">Chưa có bạn học nào khác trong danh sách cướp.</div>`;
    return;
  }

  targets.forEach(p => {
    const card = document.createElement("div");
    card.style.cssText = "background:var(--paper); border:2px solid var(--paper-darker); border-radius:14px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between;";
    card.innerHTML = `
      <div>
        <strong style="color:var(--seal-dark); font-size:14px;">🐼 ${p.name}</strong>
        <div style="font-size:12px; color:var(--ink-soft);">Level ${p.level || 1} · Túi: <strong style="color:var(--jade-dark);">${p.bambooPouch || 0} Trúc 🎋</strong></div>
      </div>
      <button class="btn btn-bad" style="font-size:12px; padding:6px 12px; background:#E53935; border-color:#B71C1C;">🐾 Cướp Trúc</button>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => stealBambooFromPeer(p.name));
    list.appendChild(card);
  });
}

function stealBambooFromPeer(peerName) {
  checkResetDailySteals();
  const g = state.gamification;
  const stolenToday = g.dailySteals?.count || 0;
  const quotaRem = Math.max(0, 5 - stolenToday);

  if (quotaRem <= 0) {
    return alert("Hôm nay bạn đã cướp đủ giới hạn 5 Cành Trúc rồi! Hãy quay lại vào ngày mai nhé 🐾");
  }

  const peer = (g.peers || []).find(p => p.name === peerName);
  if (!peer) return alert("Không tìm thấy học viên này!");

  if ((peer.bambooPouch || 0) <= 0) {
    return alert(`Túi Trúc của ${peer.name} đang trống (0 Cành Trúc), không thể cướp! 🐼`);
  }

  const maxStealable = Math.min(quotaRem, peer.bambooPouch);
  const stolenAmt = Math.min(maxStealable, Math.floor(Math.random() * 2) + 1);

  peer.bambooPouch = Math.max(0, peer.bambooPouch - stolenAmt);
  g.bambooPouch += stolenAmt;
  g.dailySteals.count += stolenAmt;

  const msg = `🐾 Gấu Trúc của ${state.studentName} đã cướp thành công ${stolenAmt} Cành Trúc của ${peer.name}! 🎋`;
  addActivityLog(msg);

  saveState();
  updateGamificationUI();
  renderStealModal();
  renderLeaderboardContent();
  playSound("correct");
  alert(`🐾 CƯỚP THÀNH CÔNG! Gấu trúc của bạn vừa cướp +${stolenAmt} Cành Trúc của ${peer.name}! Thông báo đã được phát lên Bảng Tin Lớp 📢`);
}

function grantBamboo(amount, reason = "Hoàn thành bài tập") {
  if (amount <= 0) return;
  const g = state.gamification;
  g.bambooPouch += amount;
  addActivityLog(`🎋 ${state.studentName} được nhận +${amount} Cành Trúc (${reason})`);
  updateGamificationUI();
  playSound("correct");
}

function awardBadge(badgeId) {
  const g = state.gamification;
  if (!g.unlockedBadges.includes(badgeId)) {
    g.unlockedBadges.push(badgeId);
    const b = g.badgesConfig.find(x => x.id === badgeId);
    if (b) addActivityLog(`🏅 ${state.studentName} vừa nhận huy hiệu mới: ${b.icon} ${b.title}!`);
    updateGamificationUI();
  }
}

function feedPanda(amount) {
  const g = state.gamification;
  if (!g) return;
  if (amount <= 0 || g.bambooPouch <= 0) {
    alert("Túi Trúc của bạn đang trống! Hãy hoàn thành bài tập để tích thêm Cành Trúc nhé 🎋");
    return;
  }
  const toFeed = Math.min(amount, g.bambooPouch);
  const oldDetails = calcLevelDetails(g.totalXp);

  g.bambooPouch -= toFeed;
  g.totalXp += (toFeed * 10);

  const newDetails = calcLevelDetails(g.totalXp);

  const pEmoji = document.getElementById("ph-panda-emoji");
  if (pEmoji) {
    pEmoji.classList.add("munching");
    setTimeout(() => pEmoji.classList.remove("munching"), 600);
  }

  if (newDetails.level > oldDetails.level) {
    const lMeta = getLevelMetadata(newDetails.level);
    const lvlEl = document.getElementById("lum-new-level");
    if (lvlEl) lvlEl.textContent = `LEVEL ${newDetails.level}`;
    const ttlEl = document.getElementById("lum-new-title");
    if (ttlEl) ttlEl.textContent = `Danh hiệu: ${lMeta.title} (${lMeta.status})`;
    const modal = document.getElementById("levelup-modal");
    if (modal) modal.style.display = "flex";
    addActivityLog(`🎉 Gấu của ${state.studentName} vừa thăng cấp lên Level ${newDetails.level} (${lMeta.title})! ✨`);
  } else {
    addActivityLog(`🍖 Gấu của ${state.studentName} vừa được ăn +${toFeed} Cành Trúc (+${toFeed * 10} XP)! 🎋`);
  }

  saveState();
  updateGamificationUI();
  playSound("correct");
}

function addActivityLog(text) {
  state.gamification.activityFeed.unshift({
    id: "a_" + Date.now(),
    text: text,
    time: "Vừa xong"
  });
  saveState();
  renderActivityFeed();
}

function renderActivityFeed() {
  const wrap = document.getElementById("activity-feed-list");
  if (!wrap) return;
  wrap.innerHTML = "";
  state.gamification.activityFeed.forEach(f => {
    const d = document.createElement("div");
    d.className = "feed-item";
    d.innerHTML = `<span>${f.text}</span><span class="f-time">${f.time}</span>`;
    wrap.appendChild(d);
  });
}

/* =========================================================
   1. FLASHCARD VIEW ENGINE
   ========================================================= */
const fcTopicSel = document.getElementById("fc-topic");
const fcLevelSel = document.getElementById("fc-level");
let fcDeck = [];
let fcIndex = 0;
let fcReviewOnly = false;

function reviewListForClass() {
  if (!state.reviewWords) state.reviewWords = {};
  const cn = state.currentClassName || "default";
  if (!state.reviewWords[cn]) state.reviewWords[cn] = {};
  return state.reviewWords[cn];
}

function updateReviewCountBadge() {
  const el = document.getElementById("fc-review-count");
  if (el) el.textContent = Object.keys(reviewListForClass()).length;
}

function buildFcDeck() {
  fillTopicSelect(fcTopicSel);
  const words = allWords();
  const topic = fcTopicSel ? fcTopicSel.value : "all";
  const level = fcLevelSel ? fcLevelSel.value : "all";

  let filtered = words.filter(w => {
    const okTopic = (topic === "all") || w.topic === topic;
    const okLevel = (level === "all") || w.level === level;
    return okTopic && okLevel;
  });

  if (fcReviewOnly) {
    const reviewIds = reviewListForClass();
    fcDeck = filtered.filter(w => reviewIds[w.id]);
  } else {
    fcDeck = filtered;
  }

  fcIndex = 0;
  updateReviewCountBadge();
  renderFcCard();
}

function renderFcCard() {
  const card = document.getElementById("flashcard");
  if (card) card.classList.remove("flipped");
  const counter = document.getElementById("fc-counter");

  if (!fcDeck || fcDeck.length === 0) {
    document.getElementById("fc-emoji").textContent = "🐼";
    document.getElementById("fc-hanzi").textContent = fcReviewOnly ? "Không còn từ khó!" : "Hết từ rồi";
    document.getElementById("fc-pinyin").textContent = "";
    document.getElementById("fc-meaning").textContent = fcReviewOnly ? "Bạn đã thuộc hết các từ rồi ✨" : "";
    document.getElementById("fc-example").textContent = "";
    if (counter) counter.textContent = "0 / 0";
    return;
  }

  const w = fcDeck[fcIndex];
  document.getElementById("fc-emoji").textContent = w.emoji || "🐼";
  document.getElementById("fc-hanzi").textContent = w.hanzi;
  document.getElementById("fc-pinyin").textContent = w.pinyin;
  document.getElementById("fc-meaning").textContent = w.meaning;
  document.getElementById("fc-example").textContent = w.example || "";
  if (counter) counter.textContent = `${fcIndex + 1} / ${fcDeck.length}`;
}

function initFlashcardHandlers() {
  const card = document.getElementById("flashcard");
  if (card) card.addEventListener("click", () => card.classList.toggle("flipped"));

  document.getElementById("fc-prev")?.addEventListener("click", () => {
    if (fcDeck.length === 0) return;
    fcIndex = (fcIndex - 1 + fcDeck.length) % fcDeck.length;
    renderFcCard();
  });

  document.getElementById("fc-next")?.addEventListener("click", () => {
    if (fcDeck.length === 0) return;
    fcIndex = (fcIndex + 1) % fcDeck.length;
    renderFcCard();
  });

  document.getElementById("fc-shuffle")?.addEventListener("click", () => {
    fcDeck = shuffle(fcDeck);
    fcIndex = 0;
    renderFcCard();
  });

  document.getElementById("fc-speak")?.addEventListener("click", () => {
    if (fcDeck.length > 0) speak(fcDeck[fcIndex].hanzi);
  });

  document.getElementById("fc-known")?.addEventListener("click", () => {
    if (fcDeck.length === 0) return;
    const wid = fcDeck[fcIndex].id;
    state.learned[wid] = true;
    delete reviewListForClass()[wid];
    touchStreak();
    saveState();
    playSound("correct");
    if (fcReviewOnly) buildFcDeck();
    else document.getElementById("fc-next")?.click();
  });

  document.getElementById("fc-unknown")?.addEventListener("click", () => {
    if (fcDeck.length === 0) return;
    const wid = fcDeck[fcIndex].id;
    delete state.learned[wid];
    reviewListForClass()[wid] = true;
    saveState();
    updateReviewCountBadge();
    document.getElementById("fc-next")?.click();
  });

  document.getElementById("fc-review-toggle")?.addEventListener("click", () => {
    fcReviewOnly = !fcReviewOnly;
    const btn = document.getElementById("fc-review-toggle");
    if (btn) {
      if (fcReviewOnly) {
        btn.classList.remove("btn-outline");
        btn.classList.add("btn-primary");
      } else {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
      }
    }
    buildFcDeck();
  });

  if (fcTopicSel) fcTopicSel.addEventListener("change", buildFcDeck);
  if (fcLevelSel) fcLevelSel.addEventListener("change", buildFcDeck);
}

/* =========================================================
   2. QUIZ VIEW ENGINE
   ========================================================= */
const qzTopicSel = document.getElementById("qz-topic");
const qzArea = document.getElementById("qz-area");
let qzQueue = [], qzIdx = 0, qzScore = 0;

function initQuizHandlers() {
  document.getElementById("qz-start")?.addEventListener("click", () => {
    fillTopicSelect(qzTopicSel);
    const words = allWords().filter(w => qzTopicSel.value === "all" || w.topic === qzTopicSel.value);
    if (words.length < 4) {
      qzArea.innerHTML = '<div class="empty-note">Cần ít nhất 4 từ vựng trong list này để làm trắc nghiệm!</div>';
      return;
    }
    const countLimit = parseInt(document.getElementById("qz-count").value) || 10;
    qzQueue = shuffle(words).slice(0, Math.min(countLimit, words.length));
    qzIdx = 0;
    qzScore = 0;
    renderQuizQuestion();
  });
}

function renderQuizQuestion() {
  if (qzIdx >= qzQueue.length) {
    renderQuizResult();
    return;
  }
  const words = allWords().filter(w => qzTopicSel.value === "all" || w.topic === qzTopicSel.value);
  const w = qzQueue[qzIdx];
  const distractors = shuffle(words.filter(x => x.id !== w.id)).slice(0, 3);
  const options = shuffle([w, ...distractors]);

  qzArea.innerHTML = `
    <div class="quiz-box">
      <div style="font-size:13px; color:var(--ink-soft); font-weight:700; margin-bottom:12px;">Câu ${qzIdx + 1} / ${qzQueue.length} · Điểm: ${qzScore}</div>
      <div class="quiz-prompt">
        <div class="hanzi">${w.hanzi}</div>
        <div class="pinyin">${w.pinyin}</div>
      </div>
      <div class="options" id="qz-options"></div>
    </div>
  `;

  const optWrap = document.getElementById("qz-options");
  options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "option-btn";
    b.textContent = opt.meaning;
    b.addEventListener("click", () => {
      document.querySelectorAll("#qz-options .option-btn").forEach(x => x.disabled = true);
      const isCorrect = opt.id === w.id;
      if (isCorrect) {
        b.classList.add("correct");
        qzScore++;
        playSound("correct");
      } else {
        b.classList.add("wrong");
        const correctBtn = Array.from(optWrap.children).find(x => x.textContent === w.meaning);
        if (correctBtn) correctBtn.classList.add("correct");
        playSound("wrong");
      }

      sendAnswerToGoogleSheet({
        activity: "quiz",
        questionIndex: qzIdx + 1,
        totalQuestions: qzQueue.length,
        word: w.hanzi,
        answer: opt.meaning,
        correctAnswer: w.meaning,
        isCorrect: isCorrect
      });

      setTimeout(() => {
        qzIdx++;
        renderQuizQuestion();
      }, 900);
    });
    optWrap.appendChild(b);
  });
}

function renderQuizResult() {
  const pct = Math.round((qzScore / qzQueue.length) * 100);
  const rewardAmt = state.gamification.rewardMatrix.quiz || 10;
  grantBamboo(rewardAmt, `Hoàn thành Bài Kiểm Tra Quiz (${pct}%)`);

  if (pct === 100) {
    awardBadge("b1");
  }

  qzArea.innerHTML = `
    <div class="quiz-box">
      <div style="font-family:var(--serif); font-size:48px; color:var(--seal-dark); font-weight:800;">${qzScore} / ${qzQueue.length}</div>
      <p style="font-weight:700; margin:10px 0;">Xuất sắc! Bạn đạt ${pct}% câu trả lời đúng 🐼 (+${rewardAmt} Trúc 🎋)</p>
      <div style="display:flex; justify-content:center; gap:10px; margin-top:14px;">
        <button class="btn btn-primary" id="qz-again">Làm lại bài kiểm tra</button>
        <button class="btn btn-outline" id="qz-zalo">📲 Gửi kết quả cho Thầy Marcus qua Zalo</button>
      </div>
    </div>
  `;

  document.getElementById("qz-again")?.addEventListener("click", () => document.getElementById("qz-start")?.click());
  document.getElementById("qz-zalo")?.addEventListener("click", () => {
    sendResultToZalo(`🐼 Kết quả Kiểm Tra Từ Vựng\nHọc viên: ${state.studentName}\nLớp: ${state.currentClassName}\nĐiểm: ${qzScore}/${qzQueue.length} (${pct}%)`);
  });
}

/* =========================================================
   3. TIMED CHALLENGE ENGINE
   ========================================================= */
const tmTopicSel = document.getElementById("tm-topic");
const tmArea = document.getElementById("tm-area");
let tmQueue = [], tmIdx = 0, tmTimerId = null, tmAttempts = 1;

function initTimedHandlers() {
  if (tmTopicSel) {
    tmTopicSel.addEventListener("change", renderTimedIdle);
  }
}

function renderTimedIdle() {
  clearInterval(tmTimerId);
  fillTopicSelect(tmTopicSel);
  const words = allWords().filter(w => tmTopicSel.value === "all" || w.topic === tmTopicSel.value);
  const bestPill = document.getElementById("tm-best");
  const key = `${state.currentClassName}_${tmTopicSel.value}`;
  const best = state.timedBest[key];
  if (bestPill) bestPill.textContent = best ? `Kỷ lục: ${best} lượt` : "Kỷ lục: —";

  if (words.length < 4) {
    tmArea.innerHTML = '<div class="empty-note">Cần ít nhất 4 từ vựng trong list này để thử thách!</div>';
    return;
  }

  const limitSec = state.challengeSeconds || 4;
  tmArea.innerHTML = `
    <div style="text-align:center; padding:30px; background:var(--card-bg); border:3px solid var(--paper-darker); border-radius:24px;">
      <div style="font-family:var(--serif); font-size:42px; color:var(--jade); letter-spacing:4px;">竹林极速</div>
      <p style="margin-top:12px; font-weight:700;">Mỗi từ chỉ có đúng <strong style="color:var(--seal-dark);">${limitSec} giây</strong> để chọn đáp án!<br>Cố gắng hoàn thành nhanh nhất để tích Trúc và lên Bảng Xếp Hạng nhé ~</p>
      <button class="btn btn-primary" id="tm-start-btn" style="margin-top:16px;">Bắt đầu Thử Thách 🎋</button>
    </div>
  `;

  document.getElementById("tm-start-btn")?.addEventListener("click", () => {
    tmQueue = shuffle(words);
    tmIdx = 0;
    tmAttempts = 1;
    renderTimedQuestion();
  });
}

function renderTimedQuestion() {
  clearInterval(tmTimerId);
  if (tmIdx >= tmQueue.length) {
    renderTimedPass();
    return;
  }

  const words = allWords().filter(w => tmTopicSel.value === "all" || w.topic === tmTopicSel.value);
  const w = tmQueue[tmIdx];
  const distractors = shuffle(words.filter(x => x.id !== w.id)).slice(0, 3);
  const options = shuffle([w, ...distractors]);
  const limitMs = (state.challengeSeconds || 4) * 1000;

  tmArea.innerHTML = `
    <div class="quiz-box">
      <div style="font-size:12px; font-weight:700; color:var(--ink-soft);">Từ ${tmIdx + 1} / ${tmQueue.length} · Lượt thử: ${tmAttempts}</div>
      <div class="quiz-prompt">
        <div class="hanzi">${w.hanzi}</div>
        <div class="pinyin">${w.pinyin}</div>
      </div>
      <div class="timer-wrap"><div class="timer-bar" id="tm-bar"></div></div>
      <div id="tm-num" style="font-family:var(--mono); font-size:13px; text-align:right; font-weight:700; color:var(--seal-dark);">${(limitMs/1000).toFixed(1)}s</div>
      <div class="options" id="tm-options"></div>
    </div>
  `;

  const optWrap = document.getElementById("tm-options");
  let answered = false;

  options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "option-btn";
    b.textContent = opt.meaning;
    b.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      clearInterval(tmTimerId);
      if (opt.id === w.id) {
        b.classList.add("correct");
        playSound("correct");
        setTimeout(() => { tmIdx++; renderTimedQuestion(); }, 350);
      } else {
        b.classList.add("wrong");
        playSound("wrong");
        setTimeout(() => { tmAttempts++; tmIdx = 0; tmQueue = shuffle(words); renderTimedQuestion(); }, 600);
      }
    });
    optWrap.appendChild(b);
  });

  const tmStart = Date.now();
  const bar = document.getElementById("tm-bar");
  const num = document.getElementById("tm-num");

  tmTimerId = setInterval(() => {
    const elapsed = Date.now() - tmStart;
    const remaining = Math.max(0, limitMs - elapsed);
    const pct = (remaining / limitMs) * 100;
    if (bar) bar.style.width = pct + "%";
    if (num) num.textContent = (remaining / 1000).toFixed(1) + "s";
    if (remaining <= 0 && !answered) {
      answered = true;
      clearInterval(tmTimerId);
      tmAttempts++;
      tmIdx = 0;
      tmQueue = shuffle(words);
      renderTimedQuestion();
    }
  }, 40);
}

function renderTimedPass() {
  clearInterval(tmTimerId);
  const rewardAmt = state.gamification.rewardMatrix.timed || 10;
  grantBamboo(rewardAmt, `Vượt Thử Thách Thời Gian trong ${tmAttempts} lượt`);
  awardBadge("b4");

  const key = `${state.currentClassName}_${tmTopicSel.value}`;
  if (!state.timedBest[key] || tmAttempts < state.timedBest[key]) {
    state.timedBest[key] = tmAttempts;
    saveState();
  }

  /* Leaderboard Record */
  const listName = tmTopicSel.options[tmTopicSel.selectedIndex]?.text || tmTopicSel.value;
  if (!state.timedSubmissions[state.currentClassName]) state.timedSubmissions[state.currentClassName] = {};
  if (!state.timedSubmissions[state.currentClassName][listName]) state.timedSubmissions[state.currentClassName][listName] = [];
  
  const existing = state.timedSubmissions[state.currentClassName][listName].find(s => s.studentName === state.studentName);
  if (existing) {
    if (tmAttempts < existing.attempts) existing.attempts = tmAttempts;
  } else {
    state.timedSubmissions[state.currentClassName][listName].push({
      studentName: state.studentName,
      attempts: tmAttempts,
      timestamp: Date.now()
    });
  }
  saveState();

  tmArea.innerHTML = `
    <div style="text-align:center; padding:30px; background:var(--card-bg); border:3px solid var(--paper-darker); border-radius:24px;">
      <div style="font-size:56px;">⚡🏆</div>
      <h2 style="font-family:var(--serif); color:var(--seal-dark); margin:10px 0 4px;">HOÀN THÀNH XUẤT SẮC!</h2>
      <p style="font-weight:700;">Bạn đã vượt qua bài thử thách sau <strong>${tmAttempts} lượt thử</strong>! (+${rewardAmt} Trúc 🎋)</p>
      <div style="display:flex; justify-content:center; gap:10px; margin-top:16px;">
        <button class="btn btn-primary" id="tm-restart-btn">Làm lại thử thách</button>
        <button class="btn btn-outline" id="tm-zalo-btn">📲 Gửi kết quả Zalo</button>
      </div>
    </div>
  `;

  document.getElementById("tm-restart-btn")?.addEventListener("click", renderTimedIdle);
  document.getElementById("tm-zalo-btn")?.addEventListener("click", () => {
    sendResultToZalo(`⚡ Thử Thách Thời Gian\nHọc viên: ${state.studentName}\nLớp: ${state.currentClassName}\nChủ đề: ${listName}\nHoàn thành sau: ${tmAttempts} lượt thử`);
  });
}

/* =========================================================
   4. WORD CHALLENGE ENGINE
   ========================================================= */
const wcTopicSel = document.getElementById("wc-topic");
const wcArea = document.getElementById("wc-area");
let wcWords = [];

function initWordChallengeHandlers() {
  document.getElementById("wc-roll-btn")?.addEventListener("click", () => {
    fillTopicSelect(wcTopicSel);
    const words = allWords().filter(w => wcTopicSel.value === "all" || w.topic === wcTopicSel.value);
    let count = parseInt(document.getElementById("wc-count").value) || 3;
    if (words.length === 0) return alert("List này chưa có từ vựng!");

    wcWords = shuffle(words).slice(0, Math.min(count, words.length));
    renderWcArea();
  });
}

function renderWcArea() {
  const chips = wcWords.map(w => `
    <div class="wc-chip">
      <div class="hanzi">${w.hanzi}</div>
      <div class="pinyin">${w.pinyin}</div>
      <div class="meaning">${w.meaning}</div>
    </div>
  `).join("");

  wcArea.innerHTML = `
    <div class="wc-chips">${chips}</div>
    <div style="background:var(--card-bg); border:3px solid var(--paper-darker); border-radius:22px; padding:20px;">
      <p style="margin:0 0 10px; font-weight:700; color:var(--seal-dark);">📝 Viết đoạn văn có sử dụng đầy đủ ${wcWords.length} từ ở trên:</p>
      <textarea id="wc-textarea" style="width:100%; height:110px;" placeholder="Viết câu của bạn tại đây..."></textarea>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:12px;">
        <button class="btn btn-outline" id="wc-reroll-btn">🎲 Đổi từ khác</button>
        <button class="btn btn-ok" id="wc-submit-btn">Nộp bài đặt câu 🚀 (+Trúc)</button>
      </div>
    </div>
  `;

  document.getElementById("wc-reroll-btn")?.addEventListener("click", () => document.getElementById("wc-roll-btn")?.click());
  document.getElementById("wc-submit-btn")?.addEventListener("click", () => {
    const text = document.getElementById("wc-textarea").value.trim();
    if (!text) return alert("Vui lòng viết đoạn văn trước khi nộp bài!");

    const rewardAmt = state.gamification.rewardMatrix.sentence || 15;
    grantBamboo(rewardAmt, "Bài tập Đặt câu");

    sendAnswerToGoogleSheet({
      activity: "sentence_challenge",
      className: state.currentClassName,
      studentName: state.studentName,
      words: wcWords.map(w => w.hanzi).join(", "),
      sentence: text,
      answer: text,
      text: text,
      content: text,
      answerText: text
    });

    wcArea.innerHTML = `
      <div style="text-align:center; padding:30px; background:var(--card-bg); border:3px solid var(--paper-darker); border-radius:22px;">
        <div style="font-size:48px;">✍️✨</div>
        <h3 style="font-family:var(--serif); color:var(--seal-dark);">ĐÃ GỬI BÀI ĐẶT CÂU THÀNH CÔNG!</h3>
        <p style="font-weight:700;">Gấu trúc khen bạn viết câu rất chăm chỉ! (+${rewardAmt} Trúc 🎋)</p>
        <button class="btn btn-primary" id="wc-again-btn" style="margin-top:14px;">Làm câu khác</button>
      </div>
    `;

    document.getElementById("wc-again-btn")?.addEventListener("click", () => document.getElementById("wc-roll-btn")?.click());
  });
}

/* =========================================================
   5. GRAMMAR FOCUS ENGINE
   ========================================================= */
function renderGrammarStudent() {
  const area = document.getElementById("grammar-student-area");
  if (!area) return;
  const cData = getCurrentClassData();
  const sections = cData.grammarSections || [];

  if (sections.length === 0) {
    area.innerHTML = '<div class="empty-note">Thầy cô chưa tạo bài tập Ngữ pháp cho lớp này.</div>';
    return;
  }

  area.innerHTML = "";
  sections.forEach((sec, sIdx) => {
    const card = document.createElement("div");
    card.style.cssText = "background:var(--card-bg); border:3px solid var(--paper-darker); border-radius:22px; padding:20px; margin-bottom:18px;";
    card.innerHTML = `
      <h3 style="font-family:var(--serif); color:var(--seal-dark); margin:0 0 4px;">${sIdx + 1}. ${sec.title}</h3>
      <p style="color:var(--ink-soft); font-size:13px; margin:0 0 14px; font-weight:600;">${sec.instruction || ''}</p>
      <div class="sec-items"></div>
    `;

    const itemsWrap = card.querySelector(".sec-items");
    (sec.items || []).forEach((item, iIdx) => {
      const itemDiv = document.createElement("div");
      itemDiv.style.cssText = "background:var(--paper); border:2px solid var(--paper-darker); border-radius:16px; padding:14px; margin-top:10px;";
      itemDiv.innerHTML = `
        <strong style="color:var(--seal-dark); font-size:16px;">${iIdx + 1}. ${item.name}</strong>
        <div style="font-size:12px; color:var(--ink-soft); margin:4px 0 8px;">${item.description || ''}</div>
        <textarea class="grammar-ans-input" data-sec="${sec.id}" data-item="${item.id}" style="width:100%; height:70px;" placeholder="Nhập câu trả lời của bạn..."></textarea>
      `;
      itemsWrap.appendChild(itemDiv);
    });

    area.appendChild(card);
  });
}

function initGrammarHandlers() {
  document.getElementById("submit-grammar-btn")?.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".grammar-ans-input");
    const answers = [];
    let isAllFilled = true;

    inputs.forEach((inp, idx) => {
      const val = inp.value.trim();
      if (!val) isAllFilled = false;
      answers.push({
        secId: inp.dataset.sec || "",
        itemId: inp.dataset.item || "",
        answer: val
      });
    });

    if (!isAllFilled && !confirm("Bạn chưa hoàn thành hết các câu. Vẫn muốn nộp bài chứ?")) return;

    const rewardAmt = state.gamification?.rewardMatrix?.grammar || 20;
    grantBamboo(rewardAmt, "Nộp Bài Tập Ngữ Pháp");

    const cData = getCurrentClassData();
    cData.grammarSubmissions.push({
      id: "sub_" + Date.now(),
      studentName: state.studentName,
      submittedAt: new Date().toLocaleString("vi-VN"),
      answers: answers
    });
    saveState();

    const summaryText = answers.map((a, i) => `Câu ${i + 1}: ${a.answer}`).join("\n");

    sendAnswerToGoogleSheet({
      activity: "grammar",
      className: state.currentClassName,
      studentName: state.studentName,
      sentence: summaryText,
      answer: summaryText,
      text: summaryText,
      content: summaryText,
      answerText: summaryText,
      answersText: summaryText,
      answers: answers
    });

    addActivityLog(`📖 ${state.studentName} vừa nộp bài tập Ngữ pháp (+${rewardAmt} Trúc 🎋)`);

    alert(`Gửi bài tập Ngữ pháp thành công! Đáp án đã gửi về Google Sheet cho giáo viên! Bạn nhận được +${rewardAmt} Cành Trúc 🎋`);
    renderGrammarStudent();
  });
}

/* =========================================================
   6. DICTATION / VIDEO ENGINE
   ========================================================= */
let activeVideoType = null;
let activeYouTubePlayer = null;
let activeHtmlVideo = null;
let dictationTimer = null;
let dictationYtIsPlaying = false;

function formatVidTime(sec) {
  if (isNaN(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}

function updateDictationTimeUI() {
  const label = document.getElementById("video-time-label");
  const playBtn = document.getElementById("video-play-pause-btn");
  if (!label) return;

  if (activeVideoType === "youtube") {
    if (activeYouTubePlayer && typeof activeYouTubePlayer.getCurrentTime === "function") {
      const cur = activeYouTubePlayer.getCurrentTime() || 0;
      const dur = activeYouTubePlayer.getDuration() || 0;
      label.textContent = `${formatVidTime(cur)} / ${formatVidTime(dur)}`;
      if (playBtn && typeof activeYouTubePlayer.getPlayerState === "function") {
        const st = activeYouTubePlayer.getPlayerState();
        playBtn.textContent = st === 1 ? "⏸️ Tạm dừng" : "▶️ Phát";
      }
    } else {
      if (playBtn) playBtn.textContent = dictationYtIsPlaying ? "⏸️ Tạm dừng" : "▶️ Phát";
    }
  } else if (activeVideoType === "html5") {
    const vid = activeHtmlVideo || document.getElementById("dictation-html5-v");
    if (vid) {
      label.textContent = `${formatVidTime(vid.currentTime || 0)} / ${formatVidTime(vid.duration || 0)}`;
      if (playBtn) playBtn.textContent = vid.paused ? "▶️ Phát" : "⏸️ Tạm dừng";
    }
  }
}

function toggleDictationPlayPause() {
  if (activeVideoType === "youtube") {
    if (activeYouTubePlayer && typeof activeYouTubePlayer.getPlayerState === "function") {
      const st = activeYouTubePlayer.getPlayerState();
      if (st === 1) {
        activeYouTubePlayer.pauseVideo();
      } else {
        activeYouTubePlayer.playVideo();
      }
    } else {
      const iframe = document.getElementById("yt-player-frame");
      if (iframe && iframe.contentWindow) {
        dictationYtIsPlaying = !dictationYtIsPlaying;
        const cmd = dictationYtIsPlaying ? "playVideo" : "pauseVideo";
        iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: cmd, args: [] }), "*");
        const playBtn = document.getElementById("video-play-pause-btn");
        if (playBtn) playBtn.textContent = dictationYtIsPlaying ? "⏸️ Tạm dừng" : "▶️ Phát";
      }
    }
  } else if (activeVideoType === "html5") {
    const vid = activeHtmlVideo || document.getElementById("dictation-html5-v");
    if (vid) {
      if (vid.paused) vid.play();
      else vid.pause();
    }
  }
}

function seekDictationVideo(direction) {
  const stepInp = document.getElementById("video-forward-seconds");
  const step = Math.max(1, parseInt(stepInp ? stepInp.value : "6") || 6);
  const delta = direction * step;

  if (activeVideoType === "youtube") {
    if (activeYouTubePlayer && typeof activeYouTubePlayer.getCurrentTime === "function") {
      const cur = activeYouTubePlayer.getCurrentTime() || 0;
      const dur = activeYouTubePlayer.getDuration() || 99999;
      activeYouTubePlayer.seekTo(Math.max(0, Math.min(dur, cur + delta)), true);
    } else {
      const iframe = document.getElementById("yt-player-frame");
      if (iframe && iframe.contentWindow) {
        // Send postMessage if iframe fallback
        dictationYtIsPlaying = true;
        iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
      }
    }
  } else if (activeVideoType === "html5") {
    const vid = activeHtmlVideo || document.getElementById("dictation-html5-v");
    if (vid) {
      const cur = vid.currentTime || 0;
      const dur = vid.duration || 99999;
      vid.currentTime = Math.max(0, Math.min(dur, cur + delta));
    }
  }
}

function initDictationView() {
  const sel = document.getElementById("dictation-video-select");
  if (!sel) return;
  const cData = getCurrentClassData();
  sel.innerHTML = "";

  const vList = (cData.videos && cData.videos.length > 0) ? cData.videos : [
    { id: "v_def", title: "Bài tập chính tả mặc định", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", note: "Chép lại bài nghe cẩn thận nhé 🐼" }
  ];

  vList.forEach(v => {
    const o = document.createElement("option");
    o.value = v.id;
    o.textContent = v.title;
    sel.appendChild(o);
  });

  if (vList.length > 0) {
    loadSelectedVideo(vList[0]);
  }

  sel.onchange = () => {
    const selected = vList.find(x => x.id === sel.value);
    if (selected) loadSelectedVideo(selected);
  };
}

function loadSelectedVideo(vObj) {
  const noteText = document.getElementById("student-teacher-note-text");
  if (noteText) noteText.textContent = vObj.note || "Chúc các em học tập tốt! 🐼";

  const stage = document.getElementById("video-display-area");
  if (!stage) return;

  if (dictationTimer) clearInterval(dictationTimer);
  dictationYtIsPlaying = false;

  const rawUrl = (vObj.url || "").trim();
  let ytId = null;

  try {
    const u = new URL(rawUrl);
    if (u.hostname.includes("youtu.be")) ytId = u.pathname.slice(1);
    else if (u.hostname.includes("youtube.com")) ytId = u.searchParams.get("v");
  } catch (e) {}

  if (ytId) {
    activeVideoType = "youtube";
    stage.innerHTML = `<div id="yt-player-target" style="width:100%; height:100%;"></div>`;
    
    if (activeYouTubePlayer) {
      try { activeYouTubePlayer.destroy(); } catch(e){}
      activeYouTubePlayer = null;
    }

    if (window.YT && window.YT.Player) {
      try {
        activeYouTubePlayer = new window.YT.Player("yt-player-target", {
          height: "100%",
          width: "100%",
          videoId: ytId,
          playerVars: { playsinline: 1, enablejsapi: 1, autoplay: 0 },
          events: {
            onStateChange: () => updateDictationTimeUI()
          }
        });
      } catch(e) {
        stage.innerHTML = `<iframe id="yt-player-frame" src="https://www.youtube.com/embed/${ytId}?enablejsapi=1&playsinline=1" allow="autoplay; fullscreen" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>`;
      }
    } else {
      stage.innerHTML = `<iframe id="yt-player-frame" src="https://www.youtube.com/embed/${ytId}?enablejsapi=1&playsinline=1" allow="autoplay; fullscreen" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>`;
    }
  } else {
    activeVideoType = "html5";
    stage.innerHTML = `<video id="dictation-html5-v" controls style="width:100%; height:100%;"><source src="${rawUrl}"></video>`;
    activeHtmlVideo = document.getElementById("dictation-html5-v");
  }

  dictationTimer = setInterval(updateDictationTimeUI, 500);
}

function initDictationControls() {
  document.getElementById("video-play-pause-btn")?.addEventListener("click", () => {
    toggleDictationPlayPause();
  });

  document.getElementById("video-rewind-btn")?.addEventListener("click", () => {
    seekDictationVideo(-1);
  });

  document.getElementById("video-forward-btn")?.addEventListener("click", () => {
    seekDictationVideo(1);
  });

  const stepInp = document.getElementById("video-forward-seconds");
  if (stepInp) {
    stepInp.addEventListener("input", () => {
      const val = Math.max(1, parseInt(stepInp.value) || 6);
      const rwL = document.getElementById("video-rewind-label");
      const fwL = document.getElementById("video-forward-label");
      if (rwL) rwL.textContent = val;
      if (fwL) fwL.textContent = val;
    });
  }

  document.getElementById("submit-dictation-btn")?.addEventListener("click", () => {
    const text = document.getElementById("dictation-text").value.trim();
    if (!text) return alert("Vui lòng gõ nội dung bài nghe!");

    const rewardAmt = state.gamification?.rewardMatrix?.dictation || 15;
    grantBamboo(rewardAmt, "Bài tập Chép Chính Tả Video");
    awardBadge("b2");

    const vId = document.getElementById("dictation-video-select").value;
    const cData = getCurrentClassData();
    const vObj = (cData.videos || []).find(v => v.id === vId);

    if (!state.dictationSubmissions[state.currentClassName]) state.dictationSubmissions[state.currentClassName] = {};
    if (!state.dictationSubmissions[state.currentClassName][vId]) state.dictationSubmissions[state.currentClassName][vId] = [];

    state.dictationSubmissions[state.currentClassName][vId].push({
      studentName: state.studentName,
      text: text,
      timestamp: Date.now()
    });
    saveState();

    sendAnswerToGoogleSheet({
      activity: "dictation",
      className: state.currentClassName,
      studentName: state.studentName,
      videoId: vId,
      videoTitle: vObj ? vObj.title : vId,
      sentence: text,
      answer: text,
      text: text,
      content: text,
      answerText: text,
      answers: text
    });

    addActivityLog(`🎧 ${state.studentName} vừa nộp bài Chép Chính Tả Video (+${rewardAmt} Trúc 🎋)`);

    document.getElementById("dictation-text").value = "";
    alert(`Gửi bài chép chính tả thành công! Đáp án đã gửi về Google Sheet cho giáo viên! Bạn nhận được +${rewardAmt} Cành Trúc 🎋`);
  });
}

/* =========================================================
   7. LEADERBOARDS ENGINE
   ========================================================= */
function initLeaderboardView() {
  const modeSel = document.getElementById("lb-mode-select");
  if (!modeSel) return;

  modeSel.onchange = renderLeaderboardContent;
  renderLeaderboardContent();

  document.getElementById("reset-leaderboard-btn")?.addEventListener("click", () => {
    if (confirm("Bạn có chắc chắn muốn reset Bảng Xếp Hạng của lớp này?")) {
      delete state.dictationSubmissions[state.currentClassName];
      delete state.timedSubmissions[state.currentClassName];
      saveState();
      renderLeaderboardContent();
    }
  });
}

function renderLeaderboardContent() {
  const modeSel = document.getElementById("lb-mode-select");
  if (!modeSel) return;
  const mode = modeSel.value;
  const area = document.getElementById("leaderboard-content-area");
  if (!area) return;

  if (mode === "level") {
    const peers = (state.gamification?.peers || []).slice();
    const lDetails = calcLevelDetails(state.gamification?.totalXp || 0);
    const currentLMeta = getLevelMetadata(lDetails.level);
    
    if (state.studentName) {
      const me = peers.find(p => p.name === state.studentName);
      if (me) {
        me.totalXp = state.gamification?.totalXp || 0;
        me.bambooPouch = state.gamification?.bambooPouch || 0;
        me.level = lDetails.level;
        me.outfit = currentLMeta.title;
      } else {
        peers.push({
          name: state.studentName,
          totalXp: state.gamification?.totalXp || 0,
          bambooPouch: state.gamification?.bambooPouch || 0,
          level: lDetails.level,
          outfit: currentLMeta.title
        });
      }
    }

    peers.sort((a, b) => b.totalXp - a.totalXp);
    let html = `
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px;">
    `;
    peers.forEach((p, idx) => {
      let medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "🎋";
      const isMe = p.name === state.studentName;
      html += `
        <div style="background:var(--paper); border:2px solid var(--paper-darker); border-radius:16px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:24px;">${medal}</span>
            <div>
              <strong style="color:var(--seal-dark); font-size:15px;">#${idx + 1} ${p.name} ${isMe ? ' (Bạn)' : ''}</strong>
              <div style="font-size:12px; color:var(--ink-soft);">Trạng thái: ${p.outfit} · Level ${p.level}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="text-align:right;">
              <div style="font-weight:800; color:var(--seal-dark); font-size:15px;">${p.totalXp} XP</div>
              <div style="font-size:12px; color:var(--jade-dark); font-weight:700;">🎋 ${p.bambooPouch} Trúc</div>
            </div>
            ${!isMe ? `<button class="btn btn-bad lb-steal-btn" data-peer="${p.name}" style="font-size:11px; padding:6px 10px; background:#E53935; border-color:#B71C1C;">🐾 Cướp Trúc</button>` : ''}
          </div>
        </div>
      `;
    });
    html += `</div>`;
    area.innerHTML = html;

    area.querySelectorAll(".lb-steal-btn").forEach(btn => {
      btn.addEventListener("click", () => stealBambooFromPeer(btn.dataset.peer));
    });
  } else if (mode === "charm") {
    const peers = (state.gamification?.peers || []).slice();
    if (state.studentName) {
      const myCharm = calcPandaCharm(state.gamification?.decorations || []);
      const me = peers.find(p => p.name === state.studentName);
      if (me) {
        me.decorations = state.gamification?.decorations || [];
        me.charm = myCharm;
      } else {
        peers.push({
          name: state.studentName,
          decorations: state.gamification?.decorations || [],
          charm: myCharm
        });
      }
    }

    peers.forEach(p => {
      p.charm = calcPandaCharm(p.decorations || []);
    });

    peers.sort((a, b) => (b.charm || 0) - (a.charm || 0));

    let html = `
      <div style="margin-top:16px; display:flex; flex-direction:column; gap:10px;">
        <div style="font-size:13px; font-weight:700; color:#E91E63; background:#FCE4EC; padding:8px 14px; border-radius:12px; text-align:center;">
          💖 Điểm Mị Lực được tính từ tất cả đạo cụ trang trí trong Vườn Trúc. Tặng quà cho bạn học để cùng nhau nâng điểm Mị Lực nào!
        </div>
    `;

    peers.forEach((p, idx) => {
      let medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "👑";
      const isMe = p.name === state.studentName;
      const decos = p.decorations || [];
      const decoIcons = decos.map(id => {
        const item = BAMBOO_SHOP_ITEMS.find(x => x.id === id);
        return item ? item.icon : "";
      }).join(" ") || "🌱 Vườn Trúc trống";

      html += `
        <div style="background:var(--paper); border:2px solid var(--paper-darker); border-radius:16px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:24px;">${medal}</span>
            <div>
              <strong style="color:var(--seal-dark); font-size:15px;">#${idx + 1} ${p.name} ${isMe ? ' (Bạn)' : ''}</strong>
              <div style="font-size:12px; color:var(--ink-soft); margin-top:2px;">Đạo cụ: ${decoIcons}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="text-align:right;">
              <div style="font-weight:900; color:#E91E63; font-size:16px;">💖 ${p.charm || 0} Mị Lực</div>
              <div style="font-size:11px; color:var(--ink-soft);">${decos.length} Đạo cụ trang trí</div>
            </div>
            ${!isMe ? `<button class="btn btn-ok lb-gift-btn" data-peer="${p.name}" style="font-size:11px; padding:6px 12px;">🎁 Tặng Đạo Cụ</button>` : ''}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    area.innerHTML = html;

    area.querySelectorAll(".lb-gift-btn").forEach(btn => {
      btn.addEventListener("click", () => openGiftModal(btn.dataset.peer));
    });
  }
}

/* =========================================================
   8. PROGRESS & MANAGE VIEWS
   ========================================================= */
function renderProgress() {
  const summary = document.getElementById("pg-summary");
  const topicsWrap = document.getElementById("pg-topics");
  if (!summary) return;

  const words = allWords();
  const learnedCount = words.filter(w => state.learned[w.id]).length;
  summary.textContent = `Đã thuộc ${learnedCount} / ${words.length} từ vựng 🎋`;

  if (topicsWrap) {
    topicsWrap.innerHTML = "";
    topicList().forEach(t => {
      const tWords = words.filter(w => w.topic === t);
      const tLearned = tWords.filter(w => state.learned[w.id]).length;
      const pct = tWords.length ? Math.round((tLearned / tWords.length) * 100) : 0;
      const div = document.createElement("div");
      div.style.cssText = "margin-bottom:10px;";
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:4px;">
          <span>${t}</span>
          <span>${tLearned}/${tWords.length} (${pct}%)</span>
        </div>
        <div class="timer-wrap" style="height:10px; margin:0;"><div class="timer-bar" style="width:${pct}%;"></div></div>
      `;
      topicsWrap.appendChild(div);
    });
  }
}

function renderManage() {
  const mgSearch = document.getElementById("mg-search");
  const mgTopicSel = document.getElementById("mg-topic");
  const mgList = document.getElementById("mg-list");
  if (!mgList) return;

  fillTopicSelect(mgTopicSel);
  const q = (mgSearch ? mgSearch.value : "").trim().toLowerCase();
  const topic = mgTopicSel ? mgTopicSel.value : "all";

  const filtered = allWords().filter(w => {
    const okTopic = topic === "all" || w.topic === topic;
    const okSearch = !q || (w.hanzi && w.hanzi.includes(q)) || (w.pinyin && w.pinyin.toLowerCase().includes(q)) || (w.meaning && w.meaning.toLowerCase().includes(q));
    return okTopic && okSearch;
  });

  mgList.innerHTML = "";
  if (filtered.length === 0) {
    mgList.innerHTML = '<div class="empty-note">Không tìm thấy từ vựng nào.</div>';
    return;
  }

  filtered.forEach(w => {
    const row = document.createElement("div");
    row.className = "word-row";
    row.innerHTML = `
      <div class="emoji">${w.emoji || "🐼"}</div>
      <div class="hanzi">${w.hanzi}</div>
      <div class="pinyin">${w.pinyin}</div>
      <div class="meaning">${w.meaning} <span style="font-size:12px; color:var(--ink-soft); font-weight:normal;">· ${w.topic}</span></div>
    `;
    mgList.appendChild(row);
  });
}

function initManageHandlers() {
  document.getElementById("mg-search")?.addEventListener("input", renderManage);
  document.getElementById("mg-topic")?.addEventListener("change", renderManage);
  document.getElementById("pg-reset")?.addEventListener("click", () => {
    if (confirm("Xóa toàn bộ tiến độ học từ vựng?")) {
      state.learned = {};
      saveState();
      renderProgress();
    }
  });
}

/* =========================================================
   9. TEACHER CMS & FULL MANAGEMENT ENGINE
   ========================================================= */
let editingWordId = null;

function autoUnlockTeacherDashboard() {
  const authBox = document.getElementById("teacher-auth-box");
  const dash = document.getElementById("teacher-dashboard");
  if (authBox && dash) {
    authBox.style.display = "none";
    dash.style.display = "block";
    renderTeacherCMS();
  }
}

function initTeacherCMSHandlers() {
  document.getElementById("teacher-login-btn")?.addEventListener("click", () => {
    const p = document.getElementById("teacher-password-input").value;
    if (p === "123455" || p === "123") {
      autoUnlockTeacherDashboard();
    } else {
      alert("Mật khẩu giáo viên không chính xác!");
    }
  });

  document.getElementById("teacher-logout-btn")?.addEventListener("click", () => {
    document.getElementById("teacher-dashboard").style.display = "none";
    document.getElementById("teacher-auth-box").style.display = "block";
  });

  /* JSON Backup Export & Import */
  document.getElementById("backup-export-btn")?.addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `zhVocabApp_backup_${Date.now()}.json`);
    dlAnchor.click();
  });

  document.getElementById("backup-import-trigger-btn")?.addEventListener("click", () => {
    document.getElementById("backup-import-file")?.click();
  });

  document.getElementById("backup-import-file")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
      try {
        const imported = JSON.parse(evt.target.result);
        if (imported && imported.classes) {
          state = imported;
          saveState();
          alert("Khôi phục toàn bộ dữ liệu thành công! ✨");
          location.reload();
        } else alert("File JSON không hợp lệ!");
      } catch (err) { alert("Lỗi khi đọc file JSON!"); }
    };
    reader.readAsText(file);
  });

  /* Create Class & Manage */
  document.getElementById("create-class-btn")?.addEventListener("click", () => {
    const name = document.getElementById("new-class-name").value.trim();
    const pass = document.getElementById("new-class-pass").value.trim();
    if (!name || !pass) return alert("Nhập tên lớp và mật khẩu!");
    if (state.classes[name]) return alert("Lớp này đã tồn tại!");

    state.classes[name] = {
      password: pass,
      videos: [],
      customWords: [],
      deletedDefaultIds: [],
      grammarSections: [],
      grammarSubmissions: []
    };
    saveState();
    renderTeacherCMS();
    alert(`Tạo lớp "${name}" thành công!`);
  });

  /* Copy List Between Classes */
  document.getElementById("copy-list-btn")?.addEventListener("click", () => {
    const srcClass = document.getElementById("copy-source-class").value;
    const srcTopic = document.getElementById("copy-source-topic").value;
    const chks = document.querySelectorAll(".copy-target-chk:checked");
    const targets = Array.from(chks).map(x => x.value);

    if (!srcTopic || targets.length === 0) return alert("Chọn List nguồn và ít nhất 1 lớp đích!");

    const wordsToCopy = getWordsOfClass(srcClass).filter(w => w.topic === srcTopic);
    targets.forEach(tClass => {
      if (tClass === srcClass) return;
      const tData = state.classes[tClass];
      if (!tData.customWords) tData.customWords = [];
      wordsToCopy.forEach(w => {
        tData.customWords.push({ ...w, id: "copy_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6) });
      });
    });
    saveState();
    alert("Sao chép List từ vựng thành công!");
  });

  /* Rename Topic */
  document.getElementById("rename-topic-btn")?.addEventListener("click", () => {
    const oldT = document.getElementById("rename-topic-select").value;
    const newT = document.getElementById("rename-topic-new").value.trim();
    if (!oldT || !newT) return alert("Nhập đủ tên cũ và tên mới!");

    const cData = getCurrentClassData();
    cData.customWords.forEach(w => { if (w.topic === oldT) w.topic = newT; });
    saveState();
    renderTeacherCMS();
    alert("Đổi tên List thành công!");
  });

  /* Customize Theme */
  document.getElementById("cfg-save-theme-btn")?.addEventListener("click", () => {
    const title = document.getElementById("cfg-title-input").value.trim();
    if (title) state.customTitle = title;
    state.colorPaper = document.getElementById("cfg-color-paper").value;
    state.colorInk = document.getElementById("cfg-color-ink").value;
    state.colorJade = document.getElementById("cfg-color-jade").value;

    const file = document.getElementById("cfg-image-file")?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        state.bgImage = e.target.result;
        saveState();
        applyCustomTheme();
        alert("Lưu giao diện & hình nền thành công!");
      };
      reader.readAsDataURL(file);
    } else {
      saveState();
      applyCustomTheme();
      alert("Lưu giao diện thành công!");
    }
  });

  document.getElementById("cfg-reset-theme-btn")?.addEventListener("click", () => {
    state.customTitle = "🎋 雅趣学堂 · WEB TỪ VỰNG CỦA THẦY MARCUS 🎋";
    state.colorPaper = "#F0F7F4";
    state.colorInk = "#2C4A3E";
    state.colorJade = "#388E3C";
    state.bgImage = "";
    saveState();
    applyCustomTheme();
    alert("Khôi phục giao diện mặc định!");
  });

  /* Challenge Seconds */
  document.getElementById("tl-save-timer-btn")?.addEventListener("click", () => {
    const sec = parseInt(document.getElementById("tl-timer-seconds").value) || 4;
    state.challengeSeconds = sec;
    saveState();
    alert(`Đã lưu thời gian thử thách: ${sec}s!`);
  });

  /* Announcement CMS */
  document.getElementById("cms-save-announcement-btn")?.addEventListener("click", () => {
    const text = document.getElementById("cms-announcement-input").value.trim();
    state.gamification.announcement = text;
    saveState();
    updateGamificationUI();
    alert("Đã ghim thông báo dặn dò!");
  });

  /* Reward Matrix CMS */
  document.getElementById("cms-save-reward-btn")?.addEventListener("click", () => {
    const rm = state.gamification.rewardMatrix;
    rm.quiz = parseInt(document.getElementById("rm-quiz").value) || 10;
    rm.timed = parseInt(document.getElementById("rm-timed").value) || 10;
    rm.dictation = parseInt(document.getElementById("rm-dictation").value) || 15;
    rm.sentence = parseInt(document.getElementById("rm-sentence").value) || 15;
    rm.grammar = parseInt(document.getElementById("rm-grammar").value) || 20;
    rm.streak = parseInt(document.getElementById("rm-streak").value) || 30;
    saveState();
    alert("Lưu Tỷ lệ Thưởng Trúc thành công!");
  });

  /* Grant / Deduct Bamboo */
  document.getElementById("cms-execute-grant-btn")?.addEventListener("click", () => {
    const sName = document.getElementById("cms-grant-student").value;
    const amount = parseInt(document.getElementById("cms-grant-amount").value) || 0;
    const reason = document.getElementById("cms-grant-reason").value.trim();
    if (!reason) return alert("Vui lòng nhập lý do cộng/trừ Trúc!");

    grantBamboo(amount, reason);
    alert(`Thao tác thành công cho ${sName}!`);
  });

  /* Badges CMS */
  document.getElementById("cms-add-badge-btn")?.addEventListener("click", () => {
    const name = document.getElementById("cms-badge-name").value.trim();
    const icon = document.getElementById("cms-badge-icon").value.trim() || "⭐";
    const desc = document.getElementById("cms-badge-desc").value.trim();
    if (!name || !desc) return alert("Nhập tên và mô tả huy hiệu!");

    state.gamification.badgesConfig.push({ id: "b_" + Date.now(), title: name, icon, desc });
    saveState();
    renderTeacherCMS();
    alert("Tạo huy hiệu mới thành công!");
  });

  document.getElementById("cms-execute-award-badge-btn")?.addEventListener("click", () => {
    const bId = document.getElementById("cms-award-badge-select").value;
    awardBadge(bId);
    alert("Trao huy hiệu thành công!");
  });

  /* Grammar Section CMS */
  document.getElementById("grammar-add-section-btn")?.addEventListener("click", () => {
    const title = document.getElementById("grammar-new-section-title").value.trim();
    const inst = document.getElementById("grammar-new-section-instruction").value.trim();
    if (!title) return alert("Nhập tên phần ngữ pháp!");

    const cData = getCurrentClassData();
    cData.grammarSections.push({ id: "gsec_" + Date.now(), title, instruction: inst, items: [] });
    saveState();
    renderGrammarTeacherManager();
    renderGrammarStudent();
    alert("Thêm phần Ngữ pháp mới thành công!");
  });

  /* Video CMS */
  document.getElementById("add-video-item-btn")?.addEventListener("click", () => {
    const title = document.getElementById("new-video-title").value.trim();
    const url = document.getElementById("new-video-url").value.trim();
    const note = document.getElementById("new-video-note").value.trim();
    if (!title || !url) return alert("Nhập tên và URL video!");

    const cData = getCurrentClassData();
    cData.videos.push({ id: "v_" + Date.now(), title, url, note });
    saveState();
    renderTeacherVideoManagerList();
    initDictationView();
    alert("Thêm bài tập Video thành công!");
  });

  /* Word CRUD Form */
  document.getElementById("tl-add-btn")?.addEventListener("click", () => {
    const newTopic = document.getElementById("tl-new-topic").value.trim();
    const selTopic = document.getElementById("tl-topic-select").value;
    const topic = newTopic || selTopic || "Chủ đề chung";

    const hanzi = document.getElementById("tl-hanzi").value.trim();
    const pinyin = document.getElementById("tl-pinyin").value.trim();
    const meaning = document.getElementById("tl-meaning").value.trim();
    const emoji = document.getElementById("tl-emoji").value.trim() || "🐼";
    const example = document.getElementById("tl-example").value.trim();

    if (!hanzi || !pinyin || !meaning) return alert("Nhập đủ Hán tự, Pinyin và Nghĩa!");

    const cData = getCurrentClassData();
    if (editingWordId) {
      const w = cData.customWords.find(x => x.id === editingWordId);
      if (w) { w.hanzi = hanzi; w.pinyin = pinyin; w.meaning = meaning; w.emoji = emoji; w.topic = topic; w.example = example; }
      editingWordId = null;
      document.getElementById("tl-add-btn").textContent = "+ Thêm từ vào List";
      document.getElementById("tl-cancel-edit-btn").style.display = "none";
    } else {
      cData.customWords.push({ id: "w_" + Date.now(), hanzi, pinyin, meaning, emoji, topic, level: "HSK2", example });
    }

    saveState();
    document.getElementById("tl-hanzi").value = "";
    document.getElementById("tl-pinyin").value = "";
    document.getElementById("tl-meaning").value = "";
    document.getElementById("tl-emoji").value = "";
    document.getElementById("tl-example").value = "";
    renderTeacherCMS();
    alert("Lưu từ vựng thành công!");
  });

  /* CSV Export & Import */
  document.getElementById("csv-export-btn")?.addEventListener("click", () => {
    const words = allWords();
    let csv = "\uFEFFHanzi,Pinyin,Meaning,Emoji,Topic,Level,Example\n";
    words.forEach(w => {
      csv += `"${w.hanzi}","${w.pinyin}","${w.meaning}","${w.emoji||''}","${w.topic}","${w.level||'HSK2'}","${w.example||''}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vocab_${state.currentClassName.replace(/\s+/g, '_')}.csv`;
    a.click();
  });

  document.getElementById("csv-import-trigger-btn")?.addEventListener("click", () => {
    document.getElementById("csv-import-file")?.click();
  });

  document.getElementById("csv-import-file")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const lines = evt.target.result.split("\n");
      const cData = getCurrentClassData();
      let count = 0;
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.replace(/^"|"$/g, '').trim());
        if (parts.length >= 3) {
          cData.customWords.push({
            id: "csv_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
            hanzi: parts[0], pinyin: parts[1], meaning: parts[2],
            emoji: parts[3] || "🐼", topic: parts[4] || "CSV", level: parts[5] || "HSK2", example: parts[6] || ""
          });
          count++;
        }
      }
      saveState();
      renderTeacherCMS();
      alert(`Nhập ${count} từ vựng mới thành công!`);
    };
    reader.readAsText(file);
  });
}

function renderTeacherCMS() {
  /* Populate Class Lists */
  const cListWrap = document.getElementById("teacher-class-list-manage");
  if (cListWrap) {
    cListWrap.innerHTML = "";
    Object.keys(state.classes).forEach(cName => {
      const row = document.createElement("div");
      row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:var(--paper); padding:10px 14px; border-radius:12px; border:2px solid var(--paper-darker);";
      row.innerHTML = `
        <div><strong>🏫 ${cName}</strong> (Mật khẩu: <code>${state.classes[cName].password}</code>)</div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-outline select-class-btn" data-name="${cName}" style="font-size:11px; padding:4px 8px;">Quản lý lớp này</button>
          ${Object.keys(state.classes).length > 1 ? `<button class="btn btn-bad del-class-btn" data-name="${cName}" style="font-size:11px; padding:4px 8px;">Xóa</button>` : ''}
        </div>
      `;
      cListWrap.appendChild(row);
    });

    cListWrap.querySelectorAll(".select-class-btn").forEach(btn => {
      btn.onclick = () => {
        enterClass(btn.dataset.name);
        renderTeacherCMS();
        alert(`Đã chuyển sang lớp: ${btn.dataset.name}`);
      };
    });

    cListWrap.querySelectorAll(".del-class-btn").forEach(btn => {
      btn.onclick = () => {
        if (confirm(`Xóa lớp "${btn.dataset.name}"?`)) {
          delete state.classes[btn.dataset.name];
          state.currentClassName = Object.keys(state.classes)[0];
          saveState();
          renderTeacherCMS();
        }
      };
    });
  }

  /* Copy Source Class */
  const copySrc = document.getElementById("copy-source-class");
  if (copySrc) {
    copySrc.innerHTML = "";
    Object.keys(state.classes).forEach(c => {
      const o = document.createElement("option"); o.value = c; o.textContent = c;
      copySrc.appendChild(o);
    });
    copySrc.value = state.currentClassName;
    updateCopySourceTopics();
    copySrc.onchange = updateCopySourceTopics;
  }

  /* Copy Target Checkboxes */
  const copyTargetWrap = document.getElementById("copy-target-classes");
  if (copyTargetWrap) {
    copyTargetWrap.innerHTML = "";
    Object.keys(state.classes).forEach(c => {
      const lbl = document.createElement("label");
      lbl.style.cssText = "display:flex; align-items:center; gap:6px; font-size:13px; font-weight:600;";
      lbl.innerHTML = `<input type="checkbox" class="copy-target-chk" value="${c}"> ${c}`;
      copyTargetWrap.appendChild(lbl);
    });
  }

  /* Rename Topic Select */
  const renameSel = document.getElementById("rename-topic-select");
  if (renameSel) fillTopicSelect(renameSel, false);

  /* Theme Inputs */
  const cfgTitle = document.getElementById("cfg-title-input");
  if (cfgTitle) cfgTitle.value = state.customTitle || "";
  const cfgPaper = document.getElementById("cfg-color-paper");
  if (cfgPaper) cfgPaper.value = state.colorPaper || "#F0F7F4";
  const cfgInk = document.getElementById("cfg-color-ink");
  if (cfgInk) cfgInk.value = state.colorInk || "#2C4A3E";
  const cfgJade = document.getElementById("cfg-color-jade");
  if (cfgJade) cfgJade.value = state.colorJade || "#388E3C";

  /* Challenge Seconds */
  const tlSec = document.getElementById("tl-timer-seconds");
  if (tlSec) tlSec.value = state.challengeSeconds || 4;

  /* Announcement & Reward Matrix */
  const annInp = document.getElementById("cms-announcement-input");
  if (annInp) annInp.value = state.gamification.announcement || "";

  const rm = state.gamification.rewardMatrix;
  if (document.getElementById("rm-quiz")) document.getElementById("rm-quiz").value = rm.quiz || 10;
  if (document.getElementById("rm-timed")) document.getElementById("rm-timed").value = rm.timed || 10;
  if (document.getElementById("rm-dictation")) document.getElementById("rm-dictation").value = rm.dictation || 15;
  if (document.getElementById("rm-sentence")) document.getElementById("rm-sentence").value = rm.sentence || 15;
  if (document.getElementById("rm-grammar")) document.getElementById("rm-grammar").value = rm.grammar || 20;
  if (document.getElementById("rm-streak")) document.getElementById("rm-streak").value = rm.streak || 30;

  /* Grant Students Dropdown */
  const grantSel = document.getElementById("cms-grant-student");
  if (grantSel) {
    grantSel.innerHTML = "";
    (state.gamification?.peers || []).forEach(p => {
      const o = document.createElement("option"); o.value = p.name; o.textContent = p.name;
      grantSel.appendChild(o);
    });
  }

  /* Award Badges Dropdown */
  const awardBadgesSel = document.getElementById("cms-award-badge-select");
  const awardStudentSel = document.getElementById("cms-award-student");
  if (awardBadgesSel && awardStudentSel) {
    awardBadgesSel.innerHTML = "";
    awardStudentSel.innerHTML = "";
    (state.gamification?.badgesConfig || []).forEach(b => {
      const o = document.createElement("option"); o.value = b.id; o.textContent = `${b.icon} ${b.title}`;
      awardBadgesSel.appendChild(o);
    });
    (state.gamification?.peers || []).forEach(p => {
      const o = document.createElement("option"); o.value = p.name; o.textContent = p.name;
      awardStudentSel.appendChild(o);
    });
  }

  /* Topic CRUD Select */
  const tlTopicSel = document.getElementById("tl-topic-select");
  if (tlTopicSel) fillTopicSelect(tlTopicSel, false);

  renderGrammarTeacherManager();
  renderTeacherVideoManagerList();
  renderTeacherWordList();
  renderTeacherStudentAccountManager();
}

function renderTeacherStudentAccountManager() {
  const container = document.getElementById("cms-student-accounts-list");
  if (!container) return;
  container.innerHTML = "";

  const accs = getLocalAccounts();
  const studentMap = {};

  // Gather registered accounts
  Object.keys(accs).forEach(u => {
    if (accs[u] && accs[u].role !== "teacher") {
      studentMap[u] = {
        username: u,
        displayName: accs[u].displayName || u,
        password: accs[u].password || "***",
        fromAccounts: true
      };
    }
  });

  // Gather peers in gamification
  const peers = state.gamification?.peers || [];
  peers.forEach(p => {
    if (p && p.name) {
      const existingKey = Object.keys(studentMap).find(k => studentMap[k].displayName === p.name || studentMap[k].username === p.name);
      if (!existingKey) {
        studentMap[p.name] = {
          username: p.name,
          displayName: p.name,
          password: "N/A",
          fromAccounts: false
        };
      }
    }
  });

  const students = Object.values(studentMap);
  if (students.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:16px; color:var(--ink-soft); font-size:13px; background:var(--paper); border-radius:12px; border:2px dashed var(--paper-darker);">Chưa có tài khoản học viên nào trong hệ thống.</div>`;
    return;
  }

  students.forEach(s => {
    const row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:var(--paper); padding:10px 14px; border-radius:14px; border:2px solid var(--paper-darker); flex-wrap:wrap; gap:8px;";
    row.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:16px;">🐼</span>
        <div>
          <strong style="color:var(--seal-dark); font-size:13px;">${s.displayName}</strong>
          <span style="font-size:11px; color:var(--ink-soft); margin-left:6px;">(Username: <code>${s.username}</code> | Mật khẩu: <code>${s.password}</code>)</span>
        </div>
      </div>
      <div style="display:flex; gap:6px;">
        <button class="btn btn-primary rename-student-account-btn" data-username="${s.username}" data-display="${s.displayName}" style="font-size:11px; padding:5px 12px; font-weight:700;">✏️ Đổi Tên</button>
        <button class="btn btn-bad delete-student-account-btn" data-username="${s.username}" data-display="${s.displayName}" style="font-size:11px; padding:5px 12px; font-weight:700;">🗑️ Xóa</button>
      </div>
    `;
    container.appendChild(row);
  });

  container.querySelectorAll(".rename-student-account-btn").forEach(btn => {
    btn.onclick = () => {
      const uName = btn.dataset.username;
      const dName = btn.dataset.display;
      renameStudentAccount(uName, dName);
    };
  });

  container.querySelectorAll(".delete-student-account-btn").forEach(btn => {
    btn.onclick = () => {
      const uName = btn.dataset.username;
      const dName = btn.dataset.display;
      deleteStudentAccount(uName, dName);
    };
  });
}

function renameStudentAccount(username, currentDisplayName) {
  const newName = prompt(`✏️ ĐỔI TÊN HIỂN THỊ HỌC VIÊN\n\nNhập tên hiển thị mới cho học viên "${currentDisplayName}":`, currentDisplayName);
  if (!newName || !newName.trim() || newName.trim() === currentDisplayName) return;

  const trimmedNewName = newName.trim();

  // 1. Update in local accounts
  const accs = getLocalAccounts();
  if (accs[username]) {
    accs[username].displayName = trimmedNewName;
  }
  Object.keys(accs).forEach(k => {
    if (accs[k] && (accs[k].displayName === currentDisplayName || accs[k].username === username)) {
      accs[k].displayName = trimmedNewName;
    }
  });
  saveLocalAccounts(accs);

  // 2. Update in gamification peers
  if (state.gamification && Array.isArray(state.gamification.peers)) {
    const peer = state.gamification.peers.find(p => p.name === currentDisplayName || p.name === username);
    if (peer) {
      peer.name = trimmedNewName;
    }
  }

  // 3. Update current logged in student name if it's the current user
  if (state.studentName === currentDisplayName || state.username === username) {
    state.studentName = trimmedNewName;
    try {
      const currentAcc = JSON.parse(localStorage.getItem("zhVocabApp_current_user") || "{}");
      if (currentAcc) {
        currentAcc.displayName = trimmedNewName;
        localStorage.setItem("zhVocabApp_current_user", JSON.stringify(currentAcc));
      }
    } catch (e) {}
    const studentTitle = document.getElementById("ph-student-title");
    if (studentTitle) studentTitle.textContent = `Gấu Trúc Của ${trimmedNewName}`;
    const nameEl = document.getElementById("auth-current-username");
    if (nameEl) nameEl.textContent = trimmedNewName;
  }

  // 4. Update submissions
  if (state.dictationSubmissions) {
    Object.keys(state.dictationSubmissions).forEach(c => {
      if (Array.isArray(state.dictationSubmissions[c])) {
        state.dictationSubmissions[c].forEach(s => {
          if (s.studentName === currentDisplayName || s.studentName === username) {
            s.studentName = trimmedNewName;
          }
        });
      }
    });
  }
  if (state.timedSubmissions) {
    Object.keys(state.timedSubmissions).forEach(c => {
      if (state.timedSubmissions[c]) {
        Object.keys(state.timedSubmissions[c]).forEach(topic => {
          if (Array.isArray(state.timedSubmissions[c][topic])) {
            state.timedSubmissions[c][topic].forEach(s => {
              if (s.studentName === currentDisplayName || s.studentName === username) {
                s.studentName = trimmedNewName;
              }
            });
          }
        });
      }
    });
  }

  saveState();
  renderTeacherCMS();
  updateGamificationUI();
  renderLeaderboardContent();

  showToast(`✏️ Đã đổi tên hiển thị thành "${trimmedNewName}"!`, "success");
}

function deleteStudentAccount(username, displayName) {
  if (!confirm(`⚠️ XÁC NHẬN XÓA TÀI KHOẢN HỌC VIÊN\n\nBạn có chắc chắn muốn XÓA VĨNH VIỄN tài khoản "${displayName}" (${username}) không?\n\n- Học viên sẽ bị xóa khỏi Bảng Xếp Hạng và danh sách lớp.\n- Mọi dữ liệu bài nộp và tài khoản sẽ bị hủy vĩnh viễn.`)) {
    return;
  }

  // 1. Delete from local accounts
  const accs = getLocalAccounts();
  if (accs[username]) {
    delete accs[username];
  }
  Object.keys(accs).forEach(k => {
    if (accs[k] && (accs[k].displayName === displayName || accs[k].username === username)) {
      delete accs[k];
    }
  });
  saveLocalAccounts(accs);

  // 2. Delete from gamification peers
  if (state.gamification && Array.isArray(state.gamification.peers)) {
    state.gamification.peers = state.gamification.peers.filter(p => p.name !== displayName && p.name !== username);
  }

  // 3. Clean dictation & timed submissions
  if (state.dictationSubmissions) {
    Object.keys(state.dictationSubmissions).forEach(c => {
      if (Array.isArray(state.dictationSubmissions[c])) {
        state.dictationSubmissions[c] = state.dictationSubmissions[c].filter(s => s.studentName !== displayName && s.studentName !== username);
      }
    });
  }
  if (state.timedSubmissions) {
    Object.keys(state.timedSubmissions).forEach(c => {
      if (state.timedSubmissions[c]) {
        Object.keys(state.timedSubmissions[c]).forEach(topic => {
          if (Array.isArray(state.timedSubmissions[c][topic])) {
            state.timedSubmissions[c][topic] = state.timedSubmissions[c][topic].filter(s => s.studentName !== displayName && s.studentName !== username);
          }
        });
      }
    });
  }

  saveState();
  renderTeacherCMS();
  updateGamificationUI();
  renderLeaderboardContent();

  showToast(`🗑️ Đã xóa vĩnh viễn tài khoản học viên "${displayName}"!`, "success");
}

function updateCopySourceTopics() {
  const cName = document.getElementById("copy-source-class")?.value;
  const topSel = document.getElementById("copy-source-topic");
  if (!topSel) return;
  topSel.innerHTML = "";
  const words = getWordsOfClass(cName);
  const set = new Set(words.map(w => w.topic));
  set.forEach(t => {
    const o = document.createElement("option"); o.value = t; o.textContent = t;
    topSel.appendChild(o);
  });
}

function renderGrammarTeacherManager() {
  const wrap = document.getElementById("grammar-teacher-manager");
  if (!wrap) return;
  const cData = getCurrentClassData();
  wrap.innerHTML = "";

  (cData.grammarSections || []).forEach((sec, sIdx) => {
    const box = document.createElement("div");
    box.style.cssText = "background:var(--paper); border:2px solid var(--paper-darker); border-radius:16px; padding:14px; margin-bottom:12px;";
    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <strong>${sIdx + 1}. ${sec.title}</strong>
        <button class="btn btn-bad del-gsec-btn" data-id="${sec.id}" style="font-size:10px; padding:4px 8px;">Xóa phần</button>
      </div>
      <div class="gitems-list" style="margin-bottom:8px;"></div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
        <input type="text" class="gitem-name-in" placeholder="Tên điểm ngữ pháp (vd: 着)">
        <input type="text" class="gitem-desc-in" placeholder="Mô tả hướng dẫn...">
      </div>
      <button class="btn btn-primary add-gitem-btn" data-id="${sec.id}" style="font-size:11px; padding:5px 10px; margin-top:6px;">+ Thêm Ngữ Pháp</button>
    `;

    const itemsList = box.querySelector(".gitems-list");
    (sec.items || []).forEach((item, iIdx) => {
      const itemRow = document.createElement("div");
      itemRow.style.cssText = "display:flex; justify-content:space-between; font-size:12px; background:var(--card-bg); padding:6px 10px; border-radius:8px; margin-bottom:4px;";
      itemRow.innerHTML = `
        <span><strong>${iIdx + 1}. ${item.name}</strong> - ${item.description || ''}</span>
        <button class="btn btn-bad del-gitem-btn" data-sec="${sec.id}" data-item="${item.id}" style="font-size:9px; padding:2px 6px;">Xóa</button>
      `;
      itemsList.appendChild(itemRow);
    });

    wrap.appendChild(box);
  });

  wrap.querySelectorAll(".del-gsec-btn").forEach(b => {
    b.onclick = () => {
      const cData = getCurrentClassData();
      cData.grammarSections = cData.grammarSections.filter(s => s.id !== b.dataset.id);
      saveState();
      renderGrammarTeacherManager();
      renderGrammarStudent();
    };
  });

  wrap.querySelectorAll(".add-gitem-btn").forEach(b => {
    b.onclick = () => {
      const box = b.closest("div");
      const nameIn = box.querySelector(".gitem-name-in").value.trim();
      const descIn = box.querySelector(".gitem-desc-in").value.trim();
      if (!nameIn) return alert("Nhập tên điểm ngữ pháp!");

      const cData = getCurrentClassData();
      const sec = cData.grammarSections.find(s => s.id === b.dataset.id);
      if (sec) {
        sec.items.push({ id: "gi_" + Date.now(), name: nameIn, description: descIn });
        saveState();
        renderGrammarTeacherManager();
        renderGrammarStudent();
      }
    };
  });

  wrap.querySelectorAll(".del-gitem-btn").forEach(b => {
    b.onclick = () => {
      const cData = getCurrentClassData();
      const sec = cData.grammarSections.find(s => s.id === b.dataset.sec);
      if (sec) {
        sec.items = sec.items.filter(i => i.id !== b.dataset.item);
        saveState();
        renderGrammarTeacherManager();
        renderGrammarStudent();
      }
    };
  });
}

function renderTeacherVideoManagerList() {
  const wrap = document.getElementById("teacher-video-list-manager");
  if (!wrap) return;
  const cData = getCurrentClassData();
  wrap.innerHTML = "";

  (cData.videos || []).forEach(v => {
    const row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:var(--paper); padding:8px 12px; border-radius:10px; border:2px solid var(--paper-darker); font-size:12px;";
    row.innerHTML = `
      <div><strong>🎬 ${v.title}</strong></div>
      <button class="btn btn-bad del-vid-btn" data-id="${v.id}" style="font-size:10px; padding:4px 8px;">Xóa</button>
    `;
    wrap.appendChild(row);
  });

  wrap.querySelectorAll(".del-vid-btn").forEach(b => {
    b.onclick = () => {
      const cData = getCurrentClassData();
      cData.videos = cData.videos.filter(x => x.id !== b.dataset.id);
      saveState();
      renderTeacherVideoManagerList();
      initDictationView();
    };
  });
}

function renderTeacherWordList() {
  const q = (document.getElementById("tl-search-word")?.value || "").trim().toLowerCase();
  const wrap = document.getElementById("tl-word-list");
  if (!wrap) return;

  const words = allWords().filter(w => !q || (w.hanzi && w.hanzi.includes(q)) || (w.pinyin && w.pinyin.toLowerCase().includes(q)) || (w.meaning && w.meaning.toLowerCase().includes(q)));
  wrap.innerHTML = "";

  if (words.length === 0) {
    wrap.innerHTML = '<div class="empty-note">Không có từ vựng nào.</div>';
    return;
  }

  words.forEach(w => {
    const row = document.createElement("div");
    row.className = "word-row";
    row.innerHTML = `
      <div class="emoji">${w.emoji || "🐼"}</div>
      <div class="hanzi">${w.hanzi}</div>
      <div class="pinyin">${w.pinyin}</div>
      <div class="meaning">${w.meaning} <span style="font-size:12px; color:var(--ink-soft); font-weight:normal;">· ${w.topic}</span></div>
      <button class="btn btn-outline edit-word-btn" data-id="${w.id}" style="font-size:11px; padding:4px 8px;">Sửa</button>
      <button class="btn btn-bad del-word-btn" data-id="${w.id}" style="font-size:11px; padding:4px 8px;">Xóa</button>
    `;
    wrap.appendChild(row);
  });

  wrap.querySelectorAll(".edit-word-btn").forEach(b => {
    b.onclick = () => {
      const w = allWords().find(x => x.id === b.dataset.id);
      if (w) {
        editingWordId = w.id;
        document.getElementById("tl-hanzi").value = w.hanzi;
        document.getElementById("tl-pinyin").value = w.pinyin;
        document.getElementById("tl-meaning").value = w.meaning;
        document.getElementById("tl-emoji").value = w.emoji || "";
        document.getElementById("tl-example").value = w.example || "";
        document.getElementById("tl-add-btn").textContent = "💾 Cập nhật từ vựng";
        document.getElementById("tl-cancel-edit-btn").style.display = "inline-flex";
      }
    };
  });

  wrap.querySelectorAll(".del-word-btn").forEach(b => {
    b.onclick = () => {
      if (confirm("Xóa từ này?")) {
        const cData = getCurrentClassData();
        if (b.dataset.id.startsWith("d")) {
          cData.deletedDefaultIds.push(b.dataset.id);
        } else {
          cData.customWords = cData.customWords.filter(x => x.id !== b.dataset.id);
        }
        saveState();
        renderTeacherCMS();
      }
    };
  });
}

function applyCustomTheme() {
  if (state.customTitle) {
    document.getElementById("page-title-tag").textContent = state.customTitle;
    document.getElementById("main-header-title").textContent = state.customTitle;
  }
  const root = document.documentElement.style;
  if (state.colorPaper) root.setProperty('--paper', state.colorPaper);
  if (state.colorInk) root.setProperty('--ink', state.colorInk);
  if (state.colorJade) {
    root.setProperty('--jade', state.colorJade);
    root.setProperty('--seal', state.colorJade);
  }
  if (state.bgImage) {
    document.body.style.backgroundImage = `url('${state.bgImage}')`;
    document.body.style.backgroundSize = "cover";
  } else {
    document.body.style.backgroundImage = '';
  }
}

/* =========================================================
   10. GLOBAL VIEW REFRESH & TAB ROUTING
   ========================================================= */
function refreshActiveViewData() {
  const activeView = document.querySelector("section.view.active");
  if (!activeView) return;

  const vId = activeView.id;
  if (vId === "view-pandahome") updateGamificationUI();
  if (vId === "view-flashcard") buildFcDeck();
  if (vId === "view-quiz") fillTopicSelect(qzTopicSel);
  if (vId === "view-timed") renderTimedIdle();
  if (vId === "view-wordchallenge") fillTopicSelect(wcTopicSel);
  if (vId === "view-grammar") renderGrammarStudent();
  if (vId === "view-dictation") initDictationView();
  if (vId === "view-leaderboard") initLeaderboardView();
  if (vId === "view-feed") renderActivityFeed();
  if (vId === "view-progress") renderProgress();
  if (vId === "view-manage") renderManage();
  if (vId === "view-teacher-lists") renderTeacherCMS();
}

/* Global Init */
window.addEventListener("DOMContentLoaded", () => {
  applyCustomTheme();
  initAuthHandlers();
  initFlashcardHandlers();
  initQuizHandlers();
  initTimedHandlers();
  initWordChallengeHandlers();
  initGrammarHandlers();
  initDictationControls();
  initLeaderboardView();
  initManageHandlers();
  initTeacherCMSHandlers();

  document.getElementById("gh-feed-nav-btn")?.addEventListener("click", () => {
    feedPanda(1);
  });
  document.getElementById("ph-feed-one-btn")?.addEventListener("click", () => {
    feedPanda(1);
  });
  document.getElementById("ph-feed-all-btn")?.addEventListener("click", () => {
    feedPanda(state.gamification?.bambooPouch || 0);
  });

  /* Shop, Gift & Steal Modals */
  document.getElementById("open-shop-btn")?.addEventListener("click", () => {
    openShopModal();
  });
  document.getElementById("close-shop-modal-btn")?.addEventListener("click", () => {
    const m = document.getElementById("shop-modal");
    if (m) m.style.display = "none";
  });

  document.getElementById("open-gift-btn")?.addEventListener("click", () => {
    openGiftModal();
  });
  document.getElementById("close-gift-modal-btn")?.addEventListener("click", () => {
    const m = document.getElementById("gift-modal");
    if (m) m.style.display = "none";
  });

  document.getElementById("open-steal-btn")?.addEventListener("click", () => {
    openStealModal();
  });
  document.getElementById("close-steal-modal-btn")?.addEventListener("click", () => {
    const m = document.getElementById("steal-modal");
    if (m) m.style.display = "none";
  });

  /* Close modals on background overlay click */
  ["gift-modal", "shop-modal", "steal-modal", "levelup-modal", "class-pass-modal", "dictation-pass-modal"].forEach(id => {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      modalEl.addEventListener("click", (e) => {
        if (e.target === modalEl) modalEl.style.display = "none";
      });
    }
  });

  /* Tab Buttons */
  const tabButtons = document.querySelectorAll("nav.tabs button");
  const views = document.querySelectorAll("section.view");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      views.forEach(v => v.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById("view-" + btn.dataset.view);
      if (target) target.classList.add("active");
      refreshActiveViewData();
    });
  });

  /* Dark mode */
  document.getElementById("theme-toggle-btn")?.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
  });

  checkAutoSession();
  updateGamificationUI();
});
