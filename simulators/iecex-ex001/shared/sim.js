// IECEx Unit Ex 001 exam simulator – shared UI for the IT and EN pages.
// The page language comes from <html lang>; question banks are loaded before this file (bank-*.js).
(function () {
"use strict";

const LANG = document.documentElement.lang === "en" ? "en" : "it";
const STR = {
  it: {
    home: "Tutte le risorse GDM", langOther: "English", langHref: "../en/", langCode: "en",
    kicker: "IECEx · Unit Ex 001", title: "Simulatore d'esame",
    sub: "Basics of explosion protection · domande in inglese, spiegazioni in italiano · soglia di superamento 75\u00a0%",
    step1: "Scegli la simulazione", step2: "Modalità", step3: "Opzioni",
    banks: {
      course: { tag: "Simulazione 1", name: "Banco del corso", desc: "Domande costruite sul materiale del corso, con spiegazioni e fonti." },
      exam: { tag: "Simulazione 2", name: "Prova d'esame", desc: "Domande nello stile dell'esame Ex 001: 44 a scelta singola e 18 aperte, con spiegazioni." }
    },
    newBadge: "Nuova", mcN: "a scelta multipla", opN: "aperte",
    resumeTxt: (n, d) => `Hai una sessione in corso su questo banco: ${d} di ${n} domande completate.`, resume: "Riprendi",
    feedback: "Correzione", fbInstant: "Immediata", fbEnd: "A fine esame",
    fbHint: "Immediata: la soluzione appare appena confermi o se premi “Mostra soluzione”. A fine esame: come all'esame vero, vedi tutto nel riepilogo.",
    timer: "Timer (minuti, 0 = nessuno)", timerHint: "La durata ufficiale dipende dall'ExCB: chiedila all'ente presso cui sostieni l'esame.",
    topics: "Argomenti", allTopics: "Tutti", noTopics: "Nessuno",
    start: "Inizia la simulazione",
    startInfo: (m, o) => `Verranno proposte ${m} domande a scelta multipla e ${o} aperte. Domande e opzioni sono mescolate a ogni avvio.`,
    fewer: " (meno del previsto: hai escluso alcuni argomenti)",
    noteCourse: "Nota sui numeri: gli appunti del corso indicano “94 domande totali, 44 a scelta multipla e 18 aperte”, ma 44 + 18 = 62. Per questo trovi sia la modalità 44 + 18 sia una da 94 (76 + 18). Verifica il formato esatto con l'esaminatore.",
    modes: {
      exam62: ["Esame Ex 001 (44 + 18)", "44 scelta multipla + 18 aperte estratte a caso"],
      exam94: ["Simulazione da 94", "76 scelta multipla + 18 aperte = 94 domande"],
      all: ["Tutto il banco", (m, o) => `${m} + ${o} = ${m + o} domande`],
      mc: ["Solo scelta multipla", "Allenamento rapido su tutte le domande a scelta multipla degli argomenti scelti"],
      open: ["Solo risposte aperte", "Allenamento sulle domande aperte"]
    },
    question: "Domanda", score: "Punteggio", time: "Tempo", timeLeft: "Tempo rimasto", hidden: "nascosto",
    typeMC: "Scelta multipla", typeOpen: "Risposta aperta", qOf: (i, n) => `Domanda ${i} di ${n}`,
    prev: "← Indietro", next: "Avanti →", toResults: "Vai ai risultati", confirm: "Conferma risposta", showSol: "Mostra soluzione",
    correct: "✓ Corretto", solution: l => `Soluzione: ${l}`, wrong: l => `✗ Sbagliato – la risposta corretta è ${l}`, source: "Fonte",
    recorded: "Risposta registrata. La correzione sarà visibile nel riepilogo finale.",
    placeholder: "Write your answer in English…", check: "Verifica risposta", saveOpen: "Salva risposta",
    savedOpen: "Risposta salvata. Potrai autovalutarla nel riepilogo finale.",
    kwFound: (h, n, p) => `Concetti chiave trovati nella tua risposta: ${h}/${n} (${p} %)`, solutionH: "Soluzione", model: "Risposta modello",
    selfAssess: "Confronta con la risposta modello e autovaluta", suggestion: s => ` (suggerimento in base ai concetti chiave: <b>${s}</b>)`,
    sugg: { ok: "Corretta", part: "Parziale", ko: "Sbagliata" },
    grade: { ok: "Corretta · 1 pt", part: "Parziale · 0,5 pt", ko: "Sbagliata · 0 pt" },
    nav: "Navigazione", legend: { ok: "Corretta", ko: "Sbagliata", part: "Parziale", rev: "Soluzione vista", ans: "Risposta data", open: "Aperta" },
    finish: "Termina e vedi risultati", quit: "Torna alle impostazioni",
    kbd: "Tastiera: A–D o 1–4 per scegliere, Invio per confermare, ← → per spostarti.",
    ok: "Conferma", cancel: "Annulla", finishQ: "Terminare la sessione?",
    unanswered: n => `Ci sono ${n} domande senza risposta (valgono 0). `, allAnswered: "Hai risposto a tutte le domande. ",
    pendingQ: n => `${n} risposte aperte non sono ancora autovalutate: potrai farlo nel riepilogo.`, seeResults: "Vedi risultati",
    quitQ: "Tornare alle impostazioni?", quitP: "La sessione resta salvata in questo browser e potrai riprenderla.", back: "Torna",
    timeUp: "Tempo scaduto: la sessione è stata chiusa automaticamente.", final: "Punteggio finale",
    pass: "Superato (≥ 75 %)", fail: "Non superato (< 75 %)", pointsOf: (p, n, t) => `${p} punti su ${n} · tempo ${t}`,
    newSim: "Nuova simulazione", retry: n => `Ripeti solo errori (${n})`,
    pendingNote: n => `${n} risposte aperte non sono autovalutate e contano 0. Aprile dall'elenco qui sotto, confrontale con la risposta modello e assegna il punteggio.`,
    byTopic: "Per argomento", topic: "Argomento", points: "Punti", byType: "Per tipo", type: "Tipo", mcPl: "Scelta multipla", opPl: "Aperte",
    toReview: n => `Da rivedere (${n})`, reviewHint: "Apri una domanda per vedere la soluzione.",
    status: { ko: "Sbagliata", part: "Parziale", rev: "Soluzione vista", pending: "Da autovalutare", new: "Senza risposta" },
    noErrors: "Nessun errore. Ottimo lavoro.", noAnswer: "Nessuna risposta data", correctIs: l => `risposta corretta: ${l}`,
    yourAnswer: "La tua risposta", none: "(nessuna risposta)", backSummary: "← Torna al riepilogo",
    footer: "© Gente di Mare S.r.l. · I progressi restano solo in questo browser."
  },
  en: {
    home: "All GDM resources", langOther: "Italiano", langHref: "../it/", langCode: "it",
    kicker: "IECEx · Unit Ex 001", title: "Exam simulator",
    sub: "Basics of explosion protection · pass mark 75\u00a0%",
    step1: "Choose the simulation", step2: "Mode", step3: "Options",
    banks: {
      course: { tag: "Simulation 1", name: "Course question bank", desc: "Questions built on the course material, with explanations and sources." },
      exam: { tag: "Simulation 2", name: "Exam-style test", desc: "Questions in the style of the Ex 001 exam: 44 single choice and 18 open-ended, with explanations." }
    },
    newBadge: "New", mcN: "multiple choice", opN: "open",
    resumeTxt: (n, d) => `You have a session in progress on this bank: ${d} of ${n} questions done.`, resume: "Resume",
    feedback: "Feedback", fbInstant: "Immediate", fbEnd: "At the end",
    fbHint: "Immediate: the solution appears as soon as you confirm or when you press “Show solution”. At the end: as in the real exam, you see everything in the final summary.",
    timer: "Timer (minutes, 0 = none)", timerHint: "The official duration depends on the ExCB: ask the body you are taking the exam with.",
    topics: "Topics", allTopics: "All", noTopics: "None",
    start: "Start the simulation",
    startInfo: (m, o) => `You will get ${m} multiple-choice and ${o} open questions. Questions and options are shuffled at every start.`,
    fewer: " (fewer than planned: some topics are excluded)",
    noteCourse: "A note on the numbers: the course notes say “94 questions in total, 44 multiple choice and 18 open”, but 44 + 18 = 62. That is why there is both a 44 + 18 mode and a 94-question mode (76 + 18). Check the exact format with the examiner.",
    modes: {
      exam62: ["Ex 001 exam (44 + 18)", "44 multiple-choice + 18 open questions drawn at random"],
      exam94: ["94-question simulation", "76 multiple-choice + 18 open = 94 questions"],
      all: ["Whole question bank", (m, o) => `${m} + ${o} = ${m + o} questions`],
      mc: ["Multiple choice only", "Quick practice on all the multiple-choice questions of the chosen topics"],
      open: ["Open questions only", "Practice on the open questions"]
    },
    question: "Question", score: "Score", time: "Time", timeLeft: "Time left", hidden: "hidden",
    typeMC: "Multiple choice", typeOpen: "Open question", qOf: (i, n) => `Question ${i} of ${n}`,
    prev: "← Back", next: "Next →", toResults: "Go to results", confirm: "Confirm answer", showSol: "Show solution",
    correct: "✓ Correct", solution: l => `Solution: ${l}`, wrong: l => `✗ Wrong – the correct answer is ${l}`, source: "Source",
    recorded: "Answer recorded. The marking will be shown in the final summary.",
    placeholder: "Write your answer in English…", check: "Check answer", saveOpen: "Save answer",
    savedOpen: "Answer saved. You can self-assess it in the final summary.",
    kwFound: (h, n, p) => `Key concepts found in your answer: ${h}/${n} (${p} %)`, solutionH: "Solution", model: "Model answer",
    selfAssess: "Compare with the model answer and assess yourself", suggestion: s => ` (suggestion based on key concepts: <b>${s}</b>)`,
    sugg: { ok: "Correct", part: "Partial", ko: "Wrong" },
    grade: { ok: "Correct · 1 pt", part: "Partial · 0.5 pt", ko: "Wrong · 0 pt" },
    nav: "Navigation", legend: { ok: "Correct", ko: "Wrong", part: "Partial", rev: "Solution viewed", ans: "Answered", open: "Open question" },
    finish: "Finish and see results", quit: "Back to settings",
    kbd: "Keyboard: A–D or 1–4 to choose, Enter to confirm, ← → to move.",
    ok: "Confirm", cancel: "Cancel", finishQ: "Finish the session?",
    unanswered: n => `There are ${n} unanswered questions (they count as 0). `, allAnswered: "You have answered all the questions. ",
    pendingQ: n => `${n} open answers have not been self-assessed yet: you can do it in the summary.`, seeResults: "See results",
    quitQ: "Back to settings?", quitP: "The session stays saved in this browser and you can resume it.", back: "Back",
    timeUp: "Time is up: the session has been closed automatically.", final: "Final score",
    pass: "Passed (≥ 75 %)", fail: "Not passed (< 75 %)", pointsOf: (p, n, t) => `${p} points out of ${n} · time ${t}`,
    newSim: "New simulation", retry: n => `Retry mistakes only (${n})`,
    pendingNote: n => `${n} open answers have not been self-assessed and count as 0. Open them from the list below, compare them with the model answer and give the score.`,
    byTopic: "By topic", topic: "Topic", points: "Points", byType: "By type", type: "Type", mcPl: "Multiple choice", opPl: "Open",
    toReview: n => `To review (${n})`, reviewHint: "Open a question to see the solution.",
    status: { ko: "Wrong", part: "Partial", rev: "Solution viewed", pending: "To self-assess", new: "Not answered" },
    noErrors: "No mistakes. Well done.", noAnswer: "No answer given", correctIs: l => `correct answer: ${l}`,
    yourAnswer: "Your answer", none: "(no answer)", backSummary: "← Back to summary",
    footer: "© Gente di Mare S.r.l. · Progress is stored only in this browser."
  }
}[LANG];

/* ---------- banks ---------- */
const BANKS = {
  course: {
    data: IECEX_BANKS.course, isNew: false, note: STR.noteCourse,
    store: LANG === "it" ? "iecex001_session_v1" : "iecex001_session_en_v1",
    modes: [{ id: "exam62", mc: 44, op: 18 }, { id: "exam94", mc: 76, op: 18 }, { id: "all", mc: Infinity, op: Infinity },
            { id: "mc", mc: Infinity, op: 0 }, { id: "open", mc: 0, op: Infinity }]
  },
  exam: {
    data: IECEX_BANKS.exam, isNew: true, note: "",
    store: LANG === "it" ? "iecex001_exam_session_v1" : "iecex001_exam_session_en_v1",
    modes: [{ id: "exam62", mc: 44, op: 18 }, { id: "all", mc: Infinity, op: Infinity },
            { id: "mc", mc: Infinity, op: 0 }, { id: "open", mc: 0, op: Infinity }]
  }
};
const EXAM_MODES = ["exam62", "exam94"];
const PREF = "iecex001_pref_bank";
const LET = "ABCD";

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const tr = x => (x && typeof x === "object") ? (x[LANG] || x.it) : x;
const num = x => LANG === "it" ? String(x).replace(".", ",") : String(x);
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function fmt(s) { const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ":" : "") + String(m).padStart(2, "0") + ":" + String(x).padStart(2, "0"); }
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { /* storage unavailable */ } }
function loadSession(bankId) { try { return JSON.parse(lsGet(BANKS[bankId].store) || "null"); } catch (e) { return null; } }
const flag = '<span class="flag"><i></i><i></i><i></i></span>';

/* ---------- state ---------- */
let cfg = { bank: BANKS[lsGet(PREF)] ? lsGet(PREF) : "exam", mode: "exam62", fb: "instant", timer: 0, topics: null };
let S = null, tick = null;
const bank = () => BANKS[S ? S.bank : cfg.bank];
const B = () => bank().data;
const q = it => it.k === "mc" ? B().mc[it.i] : B().open[it.i];
const points = () => S.st.reduce((a, s) => a + (s.score || 0), 0);
function save() { if (S) lsSet(bank().store, JSON.stringify(S)); }
function resetTopics() { cfg.topics = new Set(Object.keys(B().topics)); }
resetTopics();

/* ---------- page shell ---------- */
document.body.innerHTML = `
<header class="hero">
  <div class="wrap">
    <a href="../../../" title="${STR.home}"><img class="logo" src="../../../assets/gdm-logo-bianco.png" alt="Gente di Mare"></a>
    <div class="titles">
      <p class="kicker">${STR.kicker}</p>
      <h1>${STR.title}</h1>
      <p class="sub">${STR.sub}</p>
    </div>
    <a class="lang" href="${STR.langHref}" hreflang="${STR.langCode}">${STR.langOther}</a>
  </div>
  <div class="tricolour"><i></i><i></i><i></i></div>
</header>
<main class="wrap">
  <section id="setup" class="setup"></section>
  <section id="quiz" class="hidden"></section>
  <section id="results" class="hidden"></section>
</main>
<footer><div class="wrap">${STR.footer}</div></footer>
<div class="modal-bg hidden" id="modalBg" role="dialog" aria-modal="true"><div class="card modal"><div id="modalTxt"></div>
  <div class="actions"><span class="sp"></span><button class="btn" id="modalNo">${STR.cancel}</button><button class="btn primary" id="modalYes">${STR.ok}</button></div></div></div>`;

function show(id) { ["setup", "quiz", "results"].forEach(x => $("#" + x).classList.toggle("hidden", x !== id)); }

/* ---------- setup ---------- */
function renderSetup() {
  const bk = BANKS[cfg.bank], D = bk.data;
  if (!bk.modes.some(m => m.id === cfg.mode)) cfg.mode = bk.modes[0].id;
  const m = bk.modes.find(x => x.id === cfg.mode);
  const mcAv = D.mc.filter(x => cfg.topics.has(x.t)).length, opAv = D.open.filter(x => cfg.topics.has(x.t)).length;
  const nmc = Math.min(m.mc, mcAv), nop = Math.min(m.op, opAv);
  let info = STR.startInfo(nmc, nop);
  if ((m.mc !== Infinity && nmc < m.mc) || (m.op !== Infinity && nop < m.op)) info += STR.fewer;
  const sv = loadSession(cfg.bank), canResume = sv && !sv.done && sv.items && sv.items.length;

  const bankCard = id => {
    const b = BANKS[id], t = STR.banks[id], sel = id === cfg.bank;
    return `<button class="bank ${sel ? "sel" : ""}" data-bank="${id}" role="radio" aria-checked="${sel}">
      <span class="check" aria-hidden="true"></span>
      <span class="top"><span class="tag ${sel ? "accent" : ""}">${t.tag}</span>${b.isNew ? `<span class="tag solid">${STR.newBadge}</span>` : ""}</span>
      <h3>${t.name}</h3><p>${t.desc}</p>
      <span class="stats"><span><b>${b.data.mc.length}</b><span>${STR.mcN}</span></span><span><b>${b.data.open.length}</b><span>${STR.opN}</span></span></span>
    </button>`;
  };
  const modeCard = mm => {
    const [name, desc] = STR.modes[mm.id], sel = mm.id === cfg.mode;
    const d = typeof desc === "function" ? desc(D.mc.length, D.open.length) : desc;
    return `<label class="mode ${sel ? "sel" : ""}"><input type="radio" name="mode" value="${mm.id}" ${sel ? "checked" : ""}><b>${name}</b><span>${d}</span></label>`;
  };
  const allOn = cfg.topics.size === Object.keys(D.topics).length;

  $("#setup").innerHTML = `
  <div class="card">
    <p class="eyebrow">${flag}1 · ${STR.step1}</p>
    <div class="banks" role="radiogroup" aria-label="${STR.step1}">${Object.keys(BANKS).map(bankCard).join("")}</div>
    ${canResume ? `<div class="resume"><span>${STR.resumeTxt(sv.items.length, sv.st.filter(s => s.status !== "new").length)}</span><button class="btn" id="resumeBtn">${STR.resume}</button></div>` : ""}
  </div>
  <div class="card">
    <p class="eyebrow">${flag}2 · ${STR.step2}</p>
    <div class="modes" role="radiogroup" aria-label="${STR.step2}">${bk.modes.map(modeCard).join("")}</div>
    ${bk.note ? `<div class="note" style="margin-top:14px">${bk.note}</div>` : ""}
  </div>
  <div class="card">
    <p class="eyebrow">${flag}3 · ${STR.step3}</p>
    <div class="options">
      <div class="field"><span class="lbl">${STR.feedback}</span>
        <div class="seg" id="fbSeg"><button data-v="instant" class="${cfg.fb === "instant" ? "on" : ""}">${STR.fbInstant}</button><button data-v="end" class="${cfg.fb === "end" ? "on" : ""}">${STR.fbEnd}</button></div>
        <div class="hint">${STR.fbHint}</div></div>
      <div class="field"><label for="timerIn">${STR.timer}</label>
        <input type="number" id="timerIn" min="0" max="600" value="${cfg.timer}">
        <div class="hint">${STR.timerHint}</div></div>
      <div class="field"><span class="lbl">${STR.topics}</span>
        <div class="chips" id="topicChips">${Object.entries(D.topics).map(([k, v]) => `<span class="chip ${cfg.topics.has(k) ? "on" : ""}" data-k="${k}" role="checkbox" tabindex="0" aria-checked="${cfg.topics.has(k)}">${esc(tr(v))}</span>`).join("")}
          <span class="chip link" id="allTopics" role="button" tabindex="0">${allOn ? STR.noTopics : STR.allTopics}</span></div></div>
    </div>
  </div>
  <div class="startbar">
    <button class="btn primary big" id="startBtn" ${nmc + nop === 0 ? "disabled" : ""}>${STR.start}</button>
    <span class="info">${info}</span>
  </div>`;

  document.querySelectorAll("[data-bank]").forEach(b => b.onclick = () => {
    if (cfg.bank === b.dataset.bank) return;
    cfg.bank = b.dataset.bank; lsSet(PREF, cfg.bank); resetTopics(); renderSetup();
  });
  document.querySelectorAll("input[name=mode]").forEach(i => i.onchange = () => { cfg.mode = i.value; renderSetup(); });
  document.querySelectorAll("#fbSeg button").forEach(b => b.onclick = () => { cfg.fb = b.dataset.v; renderSetup(); });
  $("#timerIn").oninput = e => { cfg.timer = Math.max(0, +e.target.value || 0); };
  const act = (el, f) => { el.onclick = f; el.onkeydown = e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); f(); } }; };
  document.querySelectorAll("#topicChips [data-k]").forEach(c => act(c, () => { const k = c.dataset.k; cfg.topics.has(k) ? cfg.topics.delete(k) : cfg.topics.add(k); renderSetup(); }));
  act($("#allTopics"), () => { allOn ? cfg.topics.clear() : resetTopics(); renderSetup(); });
  $("#startBtn").onclick = () => startSession();
  const rb = $("#resumeBtn");
  if (rb) rb.onclick = () => { const s = loadSession(cfg.bank); if (s) { S = s; S.bank = cfg.bank; S.start = Date.now() - (S.elapsed || 0) * 1000; showQuiz(); } };
}

function startSession(list) {
  const bk = BANKS[cfg.bank], D = bk.data, m = bk.modes.find(x => x.id === cfg.mode);
  let items;
  if (list) items = list;
  else {
    const pick = (arr, n) => shuffle(arr.map((x, i) => i).filter(i => cfg.topics.has(arr[i].t))).slice(0, n === Infinity ? undefined : n);
    items = [...pick(D.mc, m.mc).map(i => ({ k: "mc", i })), ...pick(D.open, m.op).map(i => ({ k: "op", i }))];
    if (!EXAM_MODES.includes(m.id)) items = shuffle(items);
  }
  items = items.map(it => it.k === "mc" ? { ...it, ord: shuffle([0, 1, 2, 3]) } : { ...it });
  S = { bank: cfg.bank, items, cur: 0, fb: cfg.fb, timer: cfg.timer, start: Date.now(), elapsed: 0, done: false,
        st: items.map(() => ({ status: "new", pick: null, text: "", score: 0, checked: false })) };
  save(); showQuiz();
}

/* ---------- quiz ---------- */
function showQuiz() {
  show("quiz");
  $("#quiz").innerHTML = `
  <div class="qtop"><div class="row">
      <span class="bankname">${STR.banks[S.bank].name}</span>
      <span class="stat">${STR.question}<strong id="stPos"></strong></span>
      <span class="stat">${STR.score}<strong id="stScore"></strong></span>
      <span class="stat"><span id="stTimeLbl">${STR.time}</span><strong id="stTimer">--:--</strong></span>
    </div><div class="progress"><div id="prog" style="width:0"></div></div></div>
  <div class="layout">
    <div class="card" id="qcard"></div>
    <aside class="side"><div class="card">
      <h3>${STR.nav}</h3>
      <div class="nav" id="nav"></div>
      <div class="legend">
        <span><i style="background:var(--ok)"></i>${STR.legend.ok}</span><span><i style="background:var(--ko)"></i>${STR.legend.ko}</span>
        <span><i style="background:var(--part)"></i>${STR.legend.part}</span><span><i style="background:var(--rev)"></i>${STR.legend.rev}</span>
        <span><i style="background:var(--navy-2)"></i>${STR.legend.ans}</span><span><i style="border:1px dashed var(--muted)"></i>${STR.legend.open}</span>
      </div>
      <div class="actions"><button class="btn primary" id="finishBtn">${STR.finish}</button><button class="btn ghost" id="quitBtn">${STR.quit}</button></div>
      <div class="hint">${STR.kbd}</div>
    </div></aside>
  </div>`;
  $("#finishBtn").onclick = askFinish;
  $("#quitBtn").onclick = () => modal(`<b>${STR.quitQ}</b><p class="muted">${STR.quitP}</p>`, () => { clearInterval(tick); save(); S = null; show("setup"); renderSetup(); }, STR.back);
  clearInterval(tick); tick = setInterval(updTimer, 1000); updTimer(); render();
  window.scrollTo({ top: 0 });
}
function updTimer() {
  if (!S) return;
  S.elapsed = Math.floor((Date.now() - S.start) / 1000);
  const box = $("#stTimer"); if (!box) return;
  if (S.timer > 0) {
    const left = S.timer * 60 - S.elapsed;
    if (left <= 0) { box.textContent = "00:00"; clearInterval(tick); finish(true); return; }
    box.textContent = fmt(left); box.classList.toggle("low", left < 300); $("#stTimeLbl").textContent = STR.timeLeft;
  } else { box.textContent = fmt(S.elapsed); }
  if (S.elapsed % 10 === 0) save();
}

function render() {
  const it = S.items[S.cur], Q = q(it), st = S.st[S.cur], n = S.items.length, D = B();
  const shown = S.fb === "instant" && (st.checked || st.status === "rev");
  const pts = points();
  $("#stPos").textContent = `${S.cur + 1}/${n}`;
  $("#stScore").textContent = S.fb === "instant" ? `${num(pts)}/${n} · ${Math.round(pts / n * 100)} %` : STR.hidden;
  $("#prog").style.width = (S.st.filter(s => s.status !== "new").length / n * 100) + "%";

  let h = `<div class="qmeta"><span class="tags"><span class="tag solid">${it.k === "mc" ? STR.typeMC : STR.typeOpen}</span><span class="tag">${esc(tr(D.topics[Q.t]))}</span></span><span>${STR.qOf(S.cur + 1, n)}</span></div>
  <div class="qtext">${esc(Q.q)}</div>`;
  const locked = st.checked || st.status === "rev";
  const nav = extra => `<div class="actions">
      <button class="btn" id="prevB" ${S.cur === 0 ? "disabled" : ""}>${STR.prev}</button>${extra}
      <span class="sp"></span><button class="btn" id="nextB">${S.cur === n - 1 ? STR.toResults : STR.next}</button></div>`;
  if (it.k === "mc") {
    h += `<div class="opts" role="radiogroup">` + it.ord.map((oi, pos) => {
      let c = "";
      if (shown) { if (oi === Q.a) c = "correct"; else if (st.pick === oi) c = "wrong"; }
      else if (st.pick === oi) c = "picked";
      return `<button class="opt ${c}" data-oi="${oi}" ${locked ? "disabled" : ""} role="radio" aria-checked="${st.pick === oi}"><span class="k">${LET[pos]}</span><span>${esc(Q.o[oi])}</span></button>`;
    }).join("") + `</div>`;
    h += nav((!locked ? `<button class="btn primary" id="confB" ${st.pick === null ? "disabled" : ""}>${STR.confirm}</button>` : "") +
             (S.fb === "instant" && !locked ? `<button class="btn ghost" id="revB">${STR.showSol}</button>` : ""));
    if (shown) {
      const L = LET[it.ord.indexOf(Q.a)];
      const cls = st.status === "ok" ? "ok" : st.status === "rev" ? "rev" : "ko";
      const title = st.status === "ok" ? STR.correct : st.status === "rev" ? STR.solution(L) : STR.wrong(L);
      h += `<div class="fb ${cls}" role="status"><h4>${title}</h4><div>${esc(tr(Q.e))}</div><div class="src">${STR.source}: ${esc(tr(Q.s))}</div></div>`;
    } else if (S.fb === "end" && st.checked) h += `<div class="hint">${STR.recorded}</div>`;
  } else {
    h += `<textarea id="ta" placeholder="${STR.placeholder}" ${locked && S.fb === "instant" ? "readonly" : ""}>${esc(st.text)}</textarea>`;
    h += nav((!locked ? `<button class="btn primary" id="chkB">${S.fb === "instant" ? STR.check : STR.saveOpen}</button>` : "") +
             (S.fb === "instant" && !locked ? `<button class="btn ghost" id="revB">${STR.showSol}</button>` : ""));
    if (shown) h += openFeedback(Q, st, true);
    else if (S.fb === "end" && st.checked) h += `<div class="hint">${STR.savedOpen}</div>`;
  }
  $("#qcard").innerHTML = h;
  bind(it, Q, st);
  renderNav();
}

function kwCover(Q, text) {
  const t = " " + text.toLowerCase().replace(/[’‘]/g, "'").replace(/(\d),(\d)/g, "$1.$2") + " ";
  const labels = B().kwlabel || {};
  return Q.k.map(g => ({ label: labels[g[0]] || g[0].trim(), hit: g.some(w => t.includes(w.toLowerCase())) }));
}
function openFeedback(Q, st, interactive) {
  const cov = kwCover(Q, st.text || ""), hits = cov.filter(c => c.hit).length, pct = Math.round(hits / cov.length * 100);
  const graded = ["ok", "part", "ko"].includes(st.status);
  const cls = { ok: "ok", part: "part", ko: "ko" }[st.status] || "rev";
  const sugg = pct >= 70 ? STR.sugg.ok : pct >= 40 ? STR.sugg.part : STR.sugg.ko;
  let h = `<div class="fb ${cls}" role="status">`;
  if (st.status !== "rev" || st.text) {
    h += `<h4>${STR.kwFound(hits, cov.length, pct)}</h4><div class="kw">${cov.map(c => `<span class="${c.hit ? "hit" : "miss"}">${c.hit ? "✓" : "✗"} ${esc(c.label)}</span>`).join("")}</div>`;
  } else h += `<h4>${STR.solutionH}</h4>`;
  h += `<div style="font-weight:700;margin-top:8px;color:var(--ink)">${STR.model}</div><div class="model">${esc(Q.m)}</div><div class="src">${STR.source}: ${esc(tr(Q.s))}</div>`;
  if (interactive && st.status !== "rev") {
    h += `<div style="margin-top:12px;font-size:14px">${STR.selfAssess}${graded ? "" : STR.suggestion(sugg)}:</div>
    <div class="grade">${["ok", "part", "ko"].map(g => `<button class="btn ${st.status === g ? "primary" : ""}" data-g="${g}">${STR.grade[g]}</button>`).join("")}</div>`;
  }
  return h + `</div>`;
}
const gradeScore = g => g === "ok" ? 1 : g === "part" ? .5 : 0;

function bind(it, Q, st) {
  const go = d => { const n = S.cur + d; if (n < 0) return; if (n >= S.items.length) { askFinish(); return; } S.cur = n; save(); render(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  $("#prevB").onclick = () => go(-1); $("#nextB").onclick = () => go(1);
  const rev = $("#revB");
  if (rev) rev.onclick = () => { if (it.k === "op") { const ta = $("#ta"); st.text = ta ? ta.value : st.text; } st.status = "rev"; st.score = 0; st.checked = true; save(); render(); };
  if (it.k === "mc") {
    document.querySelectorAll(".opt").forEach(b => b.onclick = () => { st.pick = +b.dataset.oi; render(); });
    const c = $("#confB"); if (c) c.onclick = () => confirmMC(Q, st);
  } else {
    const ta = $("#ta"); if (ta) ta.oninput = () => { st.text = ta.value; save(); };
    const c = $("#chkB");
    if (c) c.onclick = () => { st.text = ta.value; st.checked = true; st.status = S.fb === "end" ? (st.text.trim() ? "ans" : "new") : "pending"; save(); render(); };
    document.querySelectorAll("#qcard [data-g]").forEach(b => b.onclick = () => { st.status = b.dataset.g; st.score = gradeScore(b.dataset.g); save(); render(); });
  }
}
function confirmMC(Q, st) {
  if (st.pick === null) return;
  st.checked = true; const ok = st.pick === Q.a; st.score = ok ? 1 : 0;
  st.status = S.fb === "instant" ? (ok ? "ok" : "ko") : "ans"; st.result = ok ? "ok" : "ko";
  save(); render();
}
function renderNav() {
  $("#nav").innerHTML = S.items.map((it, i) => {
    const s = S.st[i].status;
    const c = { ok: "s-ok", ko: "s-ko", part: "s-part", rev: "s-rev", ans: "s-ans", pending: "s-ans" }[s] || "";
    return `<button class="nav-cell ${c} ${it.k === "op" ? "open" : ""} ${i === S.cur ? "cur" : ""}" data-i="${i}" aria-label="${STR.question} ${i + 1}">${i + 1}</button>`;
  }).join("");
  document.querySelectorAll(".nav-cell").forEach(b => b.onclick = () => { S.cur = +b.dataset.i; save(); render(); });
}
document.addEventListener("keydown", e => {
  if (!S || S.done || $("#quiz").classList.contains("hidden") || !$("#modalBg").classList.contains("hidden")) return;
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === "TEXTAREA" || tag === "INPUT") return;
  const it = S.items[S.cur], st = S.st[S.cur];
  if (it.k === "mc" && !st.checked && st.status !== "rev") {
    const k = e.key.toUpperCase(); let p = LET.indexOf(k); if (p < 0) p = "1234".indexOf(k);
    if (p >= 0 && k.length === 1) { st.pick = it.ord[p]; render(); return; }
    if (e.key === "Enter" && st.pick !== null) { e.preventDefault(); confirmMC(B().mc[it.i], st); return; }
  }
  if (e.key === "ArrowRight" && $("#nextB")) $("#nextB").click();
  if (e.key === "ArrowLeft" && $("#prevB") && !$("#prevB").disabled) $("#prevB").click();
});

/* ---------- modal ---------- */
function modal(html, yes, yesLabel) {
  $("#modalTxt").innerHTML = html; $("#modalYes").textContent = yesLabel || STR.ok;
  $("#modalBg").classList.remove("hidden"); $("#modalYes").focus();
  $("#modalYes").onclick = () => { $("#modalBg").classList.add("hidden"); yes(); };
  $("#modalNo").onclick = () => $("#modalBg").classList.add("hidden");
}
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modalBg").classList.contains("hidden")) $("#modalBg").classList.add("hidden"); });
function askFinish() {
  const un = S.st.filter(s => s.status === "new").length, pend = S.st.filter(s => s.status === "pending").length;
  modal(`<b>${STR.finishQ}</b><p class="muted">${un ? STR.unanswered(un) : STR.allAnswered}${pend ? STR.pendingQ(pend) : ""}</p>`, () => finish(false), STR.seeResults);
}

/* ---------- results ---------- */
function finish(timeUp) {
  clearInterval(tick); S.done = true;
  S.items.forEach((it, i) => { const s = S.st[i]; if (s.status === "ans") s.status = it.k === "mc" ? s.result : "pending"; });
  save(); renderResults(timeUp);
}
function renderResults(timeUp) {
  show("results");
  const D = B(), n = S.items.length, pts = points(), pct = Math.round(pts / n * 1000) / 10, pass = pct >= 75;
  const pend = S.st.filter(s => s.status === "pending").length;
  const by = {}; S.items.forEach((it, i) => { const t = q(it).t; by[t] = by[t] || { n: 0, p: 0 }; by[t].n++; by[t].p += S.st[i].score || 0; });
  const typ = { mc: { n: 0, p: 0 }, op: { n: 0, p: 0 } }; S.items.forEach((it, i) => { typ[it.k].n++; typ[it.k].p += S.st[i].score || 0; });
  const wrong = S.items.map((it, i) => ({ it, i, s: S.st[i] })).filter(x => x.s.status !== "ok");
  const row = (label, o) => { const p = o.n ? Math.round(o.p / o.n * 100) : 0; const col = p >= 75 ? "var(--ok)" : p >= 50 ? "var(--part)" : "var(--ko)";
    return `<tr><td>${esc(label)}</td><td class="num">${num(o.p)}/${o.n}</td><td class="num">${p} %</td><td><div class="bar"><div style="width:${p}%;background:${col}"></div></div></td></tr>`; };
  const head = first => `<tr><th>${first}</th><th class="num">${STR.points}</th><th class="num">%</th><th></th></tr>`;
  $("#results").innerHTML = `
  ${timeUp ? `<div class="note" style="margin-bottom:16px">${STR.timeUp}</div>` : ""}
  <div class="card score">
    <div><div class="lbl">${STR.banks[S.bank].name} · ${STR.final}</div><div class="big">${num(pct)} %</div>
      <span class="verdict ${pass ? "pass" : "fail"}">${pass ? STR.pass : STR.fail}</span>
      <div class="meta">${STR.pointsOf(num(pts), n, fmt(S.elapsed))}</div></div>
    <div class="actions" style="margin:0"><button class="btn primary" id="newB">${STR.newSim}</button>${wrong.length ? `<button class="btn" id="retryB">${STR.retry(wrong.length)}</button>` : ""}</div>
  </div>
  ${pend ? `<div class="note" style="margin-top:16px">${STR.pendingNote(pend)}</div>` : ""}
  <div class="grid2">
    <div class="card"><h2>${STR.byTopic}</h2><table>${head(STR.topic)}${Object.keys(D.topics).filter(k => by[k]).map(k => row(tr(D.topics[k]), by[k])).join("")}</table></div>
    <div class="card"><h2>${STR.byType}</h2><table>${head(STR.type)}${typ.mc.n ? row(STR.mcPl, typ.mc) : ""}${typ.op.n ? row(STR.opPl, typ.op) : ""}</table></div>
  </div>
  <div class="card" style="margin-top:20px"><h2>${STR.toReview(wrong.length)}</h2><p class="muted" style="margin:0;font-size:14px">${wrong.length ? STR.reviewHint : ""}</p>
    <div class="revlist">${wrong.map(x => `<button class="revitem" data-i="${x.i}"><span class="tags"><span class="tag">${x.i + 1}</span><span class="tag ${x.s.status === "pending" ? "accent" : ""}">${STR.status[x.s.status] || x.s.status}</span></span><span>${esc(q(x.it).q)}</span></button>`).join("") || `<span class="muted">${STR.noErrors}</span>`}</div>
  </div>`;
  $("#newB").onclick = () => { lsDel(bank().store); cfg.bank = S.bank; S = null; show("setup"); renderSetup(); window.scrollTo({ top: 0 }); };
  const rb = $("#retryB");
  if (rb) rb.onclick = () => { const list = wrong.map(x => ({ k: x.it.k, i: x.it.i })); cfg.bank = S.bank; cfg.fb = "instant"; startSession(shuffle(list)); };
  document.querySelectorAll(".revitem").forEach(b => b.onclick = () => reviewOne(+b.dataset.i));
  window.scrollTo({ top: 0 });
}
function reviewOne(i) {
  const it = S.items[i], Q = q(it), st = S.st[i], D = B();
  let h = `<div class="card"><div class="qmeta"><span class="tags"><span class="tag solid">${it.k === "mc" ? STR.typeMC : STR.typeOpen}</span><span class="tag">${esc(tr(D.topics[Q.t]))}</span></span><span>${STR.question} ${i + 1}</span></div><div class="qtext">${esc(Q.q)}</div>`;
  if (it.k === "mc") {
    const L = LET[it.ord.indexOf(Q.a)];
    h += `<div class="opts">` + it.ord.map((oi, pos) => `<div class="opt ${oi === Q.a ? "correct" : st.pick === oi ? "wrong" : ""}"><span class="k">${LET[pos]}</span><span>${esc(Q.o[oi])}</span></div>`).join("") + `</div>`;
    h += `<div class="fb ${st.status === "ok" ? "ok" : st.status === "rev" ? "rev" : "ko"}"><h4>${st.pick === null ? STR.noAnswer : st.pick === Q.a ? STR.correct : "✗"} – ${STR.correctIs(L)}</h4><div>${esc(tr(Q.e))}</div><div class="src">${STR.source}: ${esc(tr(Q.s))}</div></div>`;
  } else {
    h += `<div style="font-weight:700;font-size:14px;color:var(--ink)">${STR.yourAnswer}</div><div class="model">${esc(st.text || STR.none)}</div>`;
    const tmp = { ...st }; if (tmp.status === "rev" && tmp.text) tmp.status = "pending";
    h += openFeedback(Q, tmp, true);
  }
  h += `<div class="actions"><button class="btn" id="backR">${STR.backSummary}</button></div></div>`;
  $("#results").innerHTML = h;
  document.querySelectorAll("#results [data-g]").forEach(b => b.onclick = () => { st.status = b.dataset.g; st.score = gradeScore(b.dataset.g); save(); reviewOne(i); });
  $("#backR").onclick = () => renderResults(false);
  window.scrollTo({ top: 0 });
}

renderSetup();
})();
