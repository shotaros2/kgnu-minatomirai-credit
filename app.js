'use strict';

// is.gd を利用してURLを短縮（APIキー不要）

// ── Department data (Kanagawa Univ. Minato Mirai, 2025 entrants) ──
const DEPTS = [

  // ===== 経営学部 =====
  {
    id: 'kokusai_keiei',
    faculty: '経営学部',
    fcolor: '#1d4ed8',
    name: '国際経営学科',
    total: 124,
    kyoyo: {
      label: '共通教養科目',
      required: 32,
      items: [
        { id: 'fys',  label: '初年次ゼミナール',        min: 2 },
        { id: 'fl',   label: '外国語科目',              min: 8 },
        { id: 'hum',  label: '人文の分野',              min: 4 },
        { id: 'soc',  label: '社会の分野',              min: 4 },
        { id: 'nat',  label: '自然の分野',              min: 4 },
        { id: 'jink', label: '人間形成の分野',          min: 2 },
        { id: 'civ',  label: '現代社会と市民',          min: 2 },
        { id: 'ext',  label: '超過単位算入分（上限6）',  min: 0 },
      ]
    },
    senkou: {
      label: '専攻科目',
      required: 92,
      items: [
        { id: 'sem',   label: '専門演習（必修）',              min: 10 },
        { id: 'bas_m', label: '国際経営基礎科目（必修）',       min: 10 },
        { id: 'bas_e', label: '国際経営基礎科目（選択必修）',   min: 10 },
        { id: 'shop',  label: 'ショップ科目',                  min: 40 },
        { id: 'free',  label: 'その他選択科目',                min: 0 },
      ]
    },
    shinkyu: {
      label: '2→3年次進級要件',
      checks: [
        { label: '合計50単位以上修得', type: 'total', target: 50 },
        { label: 'FYS・外国語・国際経営基礎から計14単位以上', type: 'sum', ids: ['fys','fl','bas_m','bas_e'], target: 14 },
      ]
    }
  },

  // ===== 外国語学部 英語英文学科 (IES) =====
  {
    id: 'eigo_ies',
    faculty: '外国語学部',
    fcolor: '#15803d',
    name: '英語英文学科（IESプログラム）',
    total: 128,
    kyoyo: {
      label: '共通教養科目',
      required: 32,
      items: [
        { id: 'fys',  label: '初年次ゼミナール',        min: 2 },
        { id: 'fl',   label: '外国語科目',              min: 8 },
        { id: 'hum',  label: '人文の分野',              min: 4 },
        { id: 'soc',  label: '社会の分野',              min: 4 },
        { id: 'nat',  label: '自然の分野',              min: 4 },
        { id: 'jink', label: '人間形成の分野',          min: 2 },
        { id: 'civ',  label: '現代社会と市民',          min: 2 },
        { id: 'ext',  label: '超過単位算入分（上限6）',  min: 0 },
      ]
    },
    senkou: {
      label: '専攻科目（IESプログラム）',
      required: 96,
      items: [
        { id: 'kiso',    label: '専門基礎科目',                              min: 20 },
        { id: 'sel_lc',  label: '選択必修（言語コミュ・英語教育分野）',        min: 4 },
        { id: 'sel_lit', label: '選択必修（英語圏文学・文化分野）',            min: 4 },
        { id: 'kyotsu',  label: '共通科目',                                  min: 4 },
        { id: 'sentaku', label: '選択科目',                                  min: 0 },
        { id: 'kanren',  label: '関連科目',                                  min: 20 },
      ]
    },
    shinkyu: null
  },

  // ===== 外国語学部 英語英文学科 (GEC) =====
  {
    id: 'eigo_gec',
    faculty: '外国語学部',
    fcolor: '#15803d',
    name: '英語英文学科（GECプログラム）',
    total: 128,
    kyoyo: {
      label: '共通教養科目',
      required: 32,
      items: [
        { id: 'fys',  label: '初年次ゼミナール',        min: 2 },
        { id: 'fl',   label: '外国語科目',              min: 8 },
        { id: 'hum',  label: '人文の分野',              min: 4 },
        { id: 'soc',  label: '社会の分野',              min: 4 },
        { id: 'nat',  label: '自然の分野',              min: 4 },
        { id: 'jink', label: '人間形成の分野',          min: 2 },
        { id: 'civ',  label: '現代社会と市民',          min: 2 },
        { id: 'ext',  label: '超過単位算入分（上限6）',  min: 0 },
      ]
    },
    senkou: {
      label: '専攻科目（GECプログラム）',
      required: 96,
      items: [
        { id: 'kiso',    label: '専門基礎科目',                                  min: 20 },
        { id: 'abroad',  label: 'Study Abroad（選択必修）',                     min: 10 },
        { id: 'glb_eng', label: 'グローバル英語コミュニケーション（選択必修）',   min: 6 },
        { id: 'sentaku', label: '選択科目',                                     min: 0 },
        { id: 'kanren',  label: '関連科目',                                     min: 20 },
      ]
    },
    shinkyu: null
  },

  // ===== 外国語学部 スペイン語学科 =====
  {
    id: 'spain',
    faculty: '外国語学部',
    fcolor: '#15803d',
    name: 'スペイン語学科',
    total: 126,
    kyoyo: {
      label: '共通教養科目',
      required: 32,
      items: [
        { id: 'fys',  label: '初年次ゼミナール',        min: 2 },
        { id: 'fl',   label: '外国語科目（英語）',       min: 8 },
        { id: 'hum',  label: '人文の分野',              min: 4 },
        { id: 'soc',  label: '社会の分野',              min: 4 },
        { id: 'nat',  label: '自然の分野',              min: 4 },
        { id: 'jink', label: '人間形成の分野',          min: 2 },
        { id: 'civ',  label: '現代社会と市民',          min: 2 },
        { id: 'ext',  label: '超過単位算入分（上限6）',  min: 0 },
      ]
    },
    senkou: {
      label: '専攻科目',
      required: 94,
      items: [
        { id: 'sp_en',  label: 'スペイン語演習科目',         min: 30 },
        { id: 'sel_a',  label: '選択必修科目（共通）A',       min: 22 },
        { id: 'sel_b',  label: '選択必修科目（共通）B',       min: 6 },
        { id: 'free',   label: '自由選択科目・その他',        min: 0 },
        { id: 'kanren', label: '関連科目',                   min: 20 },
      ]
    },
    shinkyu: {
      label: '2→3年次進級要件',
      checks: [
        { label: 'スペイン語演習科目から18単位以上', type: 'item', id: 'sp_en', target: 18 },
        { label: '選択必修（共通）から計10単位以上', type: 'sum', ids: ['sel_a','sel_b'], target: 10 },
      ]
    }
  },

  // ===== 外国語学部 中国語学科 =====
  {
    id: 'chugoku',
    faculty: '外国語学部',
    fcolor: '#15803d',
    name: '中国語学科',
    total: 126,
    courseSelect: {
      storageKey: 'kgnu_chugoku_course',
      label: 'コース選択（2年次登録）',
      hint: '※ コースを選択すると科目名称・進級要件が変わります',
      options: [
        { id: 'shoshu_gengo',  label: '初習者（言語コース）' },
        { id: 'shoshu_shakai', label: '初習者（社会文化コース）' },
        { id: 'kishu_gengo',   label: '既習者（言語コース）' },
        { id: 'kishu_shakai',  label: '既習者（社会文化コース）' },
      ]
    },
    kyoyo: {
      label: '共通教養科目',
      required: 32,
      items: [
        { id: 'fys',  label: '初年次ゼミナール',        min: 2 },
        { id: 'fl',   label: '外国語科目（英語）',       min: 8 },
        { id: 'hum',  label: '人文の分野',              min: 4 },
        { id: 'soc',  label: '社会の分野',              min: 4 },
        { id: 'nat',  label: '自然の分野',              min: 4 },
        { id: 'jink', label: '人間形成の分野',          min: 2 },
        { id: 'civ',  label: '現代社会と市民',          min: 2 },
        { id: 'ext',  label: '超過単位算入分（上限6）',  min: 0 },
      ]
    },
    senkou: {
      label: '専攻科目',
      required: 94,
      items: [
        { id: 'kikan',    label: '基幹科目（中国学演習）', min: 12 },
        { id: 'ch_sp',    label: '中国語専修科目',         min: 20,
          courseLabel: {
            shoshu_gengo:  '初習中国語専修科目',
            shoshu_shakai: '初習中国語専修科目',
            kishu_gengo:   '既習中国語専修科目（必修＋選択）',
            kishu_shakai:  '既習中国語専修科目（必修＋選択）',
          }
        },
        { id: 'course_m', label: 'コース特別必修科目群',   min: 8 },
        { id: 'gai',      label: '概説科目',               min: 12 },
        { id: 'tok',      label: '特講・表現科目',          min: 16 },
        { id: 'kanren',   label: '関連科目',               min: 26 },
      ]
    },
    shinkyu: {
      label: '2→3年次進級要件',
      checks: [
        { label: '合計60単位以上修得', type: 'total', target: 60 },
        { label: 'うち英語（外国語科目）4単位以上', type: 'item', id: 'fl', target: 4 },
        { label: '初習中国語専修＋コース特別必修（言語）から15単位以上', type: 'sum', ids: ['ch_sp','course_m'], target: 15, onlyCourses: ['shoshu_gengo'] },
        { label: '初習中国語専修から12単位以上', type: 'item', id: 'ch_sp', target: 12, onlyCourses: ['shoshu_shakai'] },
        { label: '既習中国語専修（必修）＋コース特別必修（言語）から9単位以上', type: 'sum', ids: ['ch_sp','course_m'], target: 9, onlyCourses: ['kishu_gengo'] },
        { label: '既習中国語専修（必修）から6単位以上', type: 'item', id: 'ch_sp', target: 6, onlyCourses: ['kishu_shakai'] },
      ]
    }
  },

  // ===== 国際日本学部 国際文化交流学科 =====
  {
    id: 'kokusai_bunka',
    faculty: '国際日本学部',
    fcolor: '#6d28d9',
    name: '国際文化交流学科',
    total: 128,
    courseSelect: {
      storageKey: 'kgnu_kokusai_bunka_course',
      label: 'コース選択（2年次登録）',
      options: [
        { id: 'bunka', label: '文化交流コース' },
        { id: 'kanko', label: '観光文化コース' },
        { id: 'gengo', label: '言語・メディアコース' },
        { id: 'nihon', label: '国際日本学コース' },
      ]
    },
    kyoyo: {
      label: '共通教養科目',
      required: 32,
      items: [
        { id: 'fys',  label: '初年次ゼミナール',        min: 2 },
        { id: 'fl',   label: '外国語科目（英語必修）',   min: 8 },
        { id: 'hum',  label: '人文の分野',              min: 4 },
        { id: 'soc',  label: '社会の分野',              min: 4 },
        { id: 'nat',  label: '自然の分野',              min: 4 },
        { id: 'jink', label: '人間形成の分野',          min: 2 },
        { id: 'civ',  label: '現代社会と市民',          min: 2 },
        { id: 'ext',  label: '超過単位算入分（上限6）',  min: 0 },
      ]
    },
    senkou: {
      label: '専攻科目',
      required: 96,
      sectionChecks: [
        { label: '基幹科目から計26単位以上', ids: ['gak_kyo','gak_nyu','enshu'], target: 26 },
        { label: '展開科目から計50単位以上', ids: ['eng14','chiki_l','course','hoka_c'], target: 50 },
        { label: '関連科目から計20単位以上', ids: ['kanren'], target: 20 },
      ],
      items: [
        { id: 'gak_kyo', label: '学部教養科目',           min: 10, group: '基幹科目（計26以上）' },
        { id: 'gak_nyu', label: '学科入門科目',           min: 8,  group: '基幹科目（計26以上）' },
        { id: 'enshu',   label: '演習・ゼミナール',        min: 8,  group: '基幹科目（計26以上）' },
        { id: 'eng14',   label: '展開科目（英語）',        min: 14, group: '展開科目（計50以上）' },
        { id: 'chiki_l', label: '展開科目（地域言語）',    min: 8,  courseMin: { nihon: 4 },  group: '展開科目（計50以上）' },
        { id: 'course',  label: '展開科目（コース科目）',  min: 14, courseMin: { nihon: 18 }, group: '展開科目（計50以上）' },
        { id: 'hoka_c',  label: '展開科目（他コース）',    min: 14, group: '展開科目（計50以上）' },
        { id: 'kanren',  label: '関連科目',               min: 20, group: '関連科目' },
      ]
    },
    shinkyu: {
      label: '2→3年次進級要件',
      checks: [
        { label: 'FYS・学科入門・外国語（英語含む）から計10単位以上', type: 'sum', ids: ['fys','gak_nyu','fl'], target: 10 },
      ]
    }
  },

  // ===== 国際日本学部 日本文化学科 =====
  {
    id: 'nihon_bunka',
    faculty: '国際日本学部',
    fcolor: '#6d28d9',
    name: '日本文化学科',
    total: 128,
    kyoyo: {
      label: '共通教養科目（36単位）',
      required: 36,
      items: [
        { id: 'fys',  label: '初年次ゼミナール',         min: 2 },
        { id: 'fl1',  label: '第一外国語',               min: 8 },
        { id: 'fl2',  label: '第二外国語',               min: 4 },
        { id: 'hum',  label: '人文の分野',               min: 4 },
        { id: 'soc',  label: '社会の分野',               min: 4 },
        { id: 'nat',  label: '自然の分野',               min: 4 },
        { id: 'jink', label: '人間形成の分野',           min: 2 },
        { id: 'civ',  label: '現代社会と市民',           min: 2 },
        { id: 'ext',  label: '超過単位算入分（上限6）',   min: 0 },
      ]
    },
    senkou: {
      label: '専攻科目',
      required: 92,
      items: [
        { id: 'gak_kyo', label: '学部教養科目',                min: 10 },
        { id: 'enshu',   label: '演習・ゼミナール（含必修）',    min: 10 },
        { id: 'nip_go',  label: '展開科目（日本語）',           min: 6 },
        { id: 'nip_lit', label: '展開科目（日本文学）',         min: 6 },
        { id: 'bun_sym', label: '展開科目（文化表象）',         min: 8 },
        { id: 'hatten',  label: '展開科目（発展）',             min: 8 },
        { id: 'ex_t',    label: '展開科目（その他）',           min: 0 },
        { id: 'kanren',  label: '関連科目',                    min: 20 },
        { id: 'jiyu',    label: 'その他専攻科目',              min: 0 },
      ]
    },
    shinkyu: null
  },

  // ===== 国際日本学部 歴史民俗学科 =====
  {
    id: 'rekishi',
    faculty: '国際日本学部',
    fcolor: '#6d28d9',
    name: '歴史民俗学科',
    total: 128,
    kyoyo: {
      label: '共通教養科目',
      required: 32,
      items: [
        { id: 'fys',  label: '初年次ゼミナール',        min: 2 },
        { id: 'fl',   label: '外国語科目',              min: 8 },
        { id: 'hum',  label: '人文の分野',              min: 4 },
        { id: 'soc',  label: '社会の分野',              min: 4 },
        { id: 'nat',  label: '自然の分野',              min: 4 },
        { id: 'jink', label: '人間形成の分野',          min: 2 },
        { id: 'civ',  label: '現代社会と市民',          min: 2 },
        { id: 'ext',  label: '超過単位算入分（上限6）',  min: 0 },
      ]
    },
    senkou: {
      label: '専攻科目',
      required: 96,
      sectionChecks: [
        { label: '基幹科目から計28単位以上', ids: ['gak_kyo','enshu','jisshu'], target: 28 },
        { label: '展開科目から計44単位以上', ids: ['rekishi_f','minzoku','bunka_s','exp_etc'], target: 44 },
        { label: '関連科目から計18単位以上', ids: ['kanren'], target: 18 },
      ],
      items: [
        { id: 'gak_kyo',  label: '学部教養科目',              min: 8,  group: '基幹科目（計28以上）' },
        { id: 'enshu',    label: '演習・ゼミナール（含必修）',  min: 14, group: '基幹科目（計28以上）' },
        { id: 'jisshu',   label: '実習科目（含必修）',         min: 6,  group: '基幹科目（計28以上）' },
        { id: 'rekishi_f',label: '展開科目（歴史分野）',       min: 16, group: '展開科目（計44以上）' },
        { id: 'minzoku',  label: '展開科目（民俗分野）',       min: 16, group: '展開科目（計44以上）' },
        { id: 'bunka_s',  label: '展開科目（文化創生分野）',   min: 12, group: '展開科目（計44以上）' },
        { id: 'exp_etc',  label: '展開科目（その他）',         min: 0,  group: '展開科目（計44以上）' },
        { id: 'kanren',   label: '関連科目',                  min: 18, group: '関連科目' },
      ]
    },
    shinkyu: null
  },
];

// ── State ──
let currentDeptId = null;

// ── Storage ──
function storageKey(deptId, sec, itemId) {
  return `kgnu_${deptId}_${sec}_${itemId}`;
}
function getCredit(deptId, sec, itemId) {
  return Math.max(0, parseInt(localStorage.getItem(storageKey(deptId, sec, itemId)) || '0', 10));
}
function saveCredit(deptId, sec, itemId, val) {
  localStorage.setItem(storageKey(deptId, sec, itemId), Math.max(0, val));
}
function getSelectedCourse(deptId) {
  const dept = DEPTS.find(d => d.id === deptId);
  if (!dept || !dept.courseSelect) return null;
  return localStorage.getItem(dept.courseSelect.storageKey) || null;
}
function saveSelectedCourse(deptId, courseId) {
  const dept = DEPTS.find(d => d.id === deptId);
  if (!dept || !dept.courseSelect) return;
  localStorage.setItem(dept.courseSelect.storageKey, courseId);
}

// ── Calculations ──
function calcSection(dept, sec, secName, selectedCourse) {
  let total = 0;
  const items = sec.items.map(item => {
    const earned = getCredit(dept.id, secName, item.id);
    total += earned;
    const effectiveMin = (item.courseMin && selectedCourse && item.courseMin[selectedCourse] !== undefined)
      ? item.courseMin[selectedCourse]
      : item.min;
    const effectiveLabel = (item.courseLabel && selectedCourse && item.courseLabel[selectedCourse] !== undefined)
      ? item.courseLabel[selectedCourse]
      : item.label;
    return { ...item, label: effectiveLabel, min: effectiveMin, earned };
  });
  const groupChecks = (sec.sectionChecks || []).map(gc => {
    const sum = gc.ids.reduce((a, id) => a + getCredit(dept.id, secName, id), 0);
    return { ...gc, earned: sum, met: sum >= gc.target };
  });
  return { items, total, required: sec.required, met: total >= sec.required, groupChecks };
}

function calcAll(dept) {
  const selectedCourse = getSelectedCourse(dept.id);
  const kyoyo  = calcSection(dept, dept.kyoyo,  'kyoyo',  selectedCourse);
  const senkou = calcSection(dept, dept.senkou, 'senkou', selectedCourse);
  const total  = kyoyo.total + senkou.total;
  return { kyoyo, senkou, total, required: dept.total, met: total >= dept.total };
}

function calcShinkyu(dept) {
  if (!dept.shinkyu) return null;
  const selectedCourse = getSelectedCourse(dept.id);
  const allCredits = dept => ({
    total: calcAll(dept).total,
    get: (id) => {
      const inK = getCredit(dept.id, 'kyoyo',  id);
      const inS = getCredit(dept.id, 'senkou', id);
      return inK || inS;
    }
  });
  const ac = allCredits(dept);
  return dept.shinkyu.checks
    .filter(c => !c.onlyCourses || (selectedCourse && c.onlyCourses.includes(selectedCourse)))
    .map(c => {
      let earned = 0;
      if (c.type === 'total') earned = ac.total;
      else if (c.type === 'sum')  earned = c.ids.reduce((a, id) => a + ac.get(id), 0);
      else if (c.type === 'item') earned = ac.get(c.id);
      return { label: c.label, earned, target: c.target, met: earned >= c.target };
    });
}

// ── Rendering: Select View ──
function renderSelect() {
  currentDeptId = null;
  const faculties = {};
  DEPTS.forEach(d => { (faculties[d.faculty] = faculties[d.faculty] || []).push(d); });

  let html = '<div class="select-view">';
  if (window._wsImport) {
    html += '<div class="ws-import-banner">📥 WebStationのデータを検出しました。学科を選択すると単位を自動で取り込みます。</div>';
  } else {
    html += '<button class="ws-guide-btn" onclick="showWsGuide()">📥 WebStationから単位を自動取込</button>';
  }
  html += '<p class="select-intro">所属している学科を選んでください</p><div class="faculties">';

  for (const [fac, depts] of Object.entries(faculties)) {
    const fcolor = depts[0].fcolor;
    html += `<div class="faculty-group">
      <h2 class="faculty-title" style="border-color:${fcolor};color:${fcolor}">${fac}</h2>
      <div class="dept-cards">`;

    depts.forEach(d => {
      const prog = calcAll(d);
      const pct  = Math.min(100, prog.required ? Math.round(prog.total / prog.required * 100) : 0);
      html += `<button class="dept-card" onclick="selectDept('${d.id}')">
        <div class="dept-name">${d.name}</div>
        <div class="dept-total">卒業要件 ${d.total}単位</div>
        ${prog.total > 0 ? `<div class="mini-progress">
          <div class="mini-bar"><div class="mini-fill${prog.met ? ' done' : ''}" style="width:${pct}%"></div></div>
          <span class="mini-pct">${prog.total} / ${prog.required} 単位</span>
        </div>` : ''}
      </button>`;
    });

    html += '</div></div>';
  }

  html += '</div></div>';
  document.getElementById('app').innerHTML = html;
}

// ── Rendering: Detail View ──
function renderDetail(deptId, isShared) {
  const dept = DEPTS.find(d => d.id === deptId);
  if (!dept) { renderSelect(); return; }
  currentDeptId = deptId;

  if (window._wsImport && !isShared) {
    const matched = applyWebStationImport(deptId, window._wsImport);
    window._wsImport = null;
    history.replaceState(null, '', location.pathname);
    setTimeout(() => showToast(matched > 0 ? matched + '科目の単位を取り込みました' : '一致する科目が見つかりませんでした'), 600);
  }

  const prog    = calcAll(dept);
  const pct     = Math.min(100, Math.round(prog.total / prog.required * 100));
  const fillCls = prog.met ? 'done' : pct >= 50 ? 'mid' : 'low';
  const shinkyu = calcShinkyu(dept);

  const sharedBanner = isShared
    ? '<div class="shared-banner">共有された単位データを表示中 — 編集して自分の単位を入力できます</div>'
    : '';
  let html = `<div class="detail-view">
    ${sharedBanner}
    <div class="detail-top-bar">
      <button class="back-btn" onclick="renderSelect()">← 学科を変更</button>
      <button class="share-btn" onclick="copyShareLink('${dept.id}')">リンクを共有</button>
    </div>
    <div class="dept-header" style="--fcolor:${dept.fcolor}">
      <div class="dept-header-faculty">${dept.faculty}</div>
      <h2 class="dept-header-name">${dept.name}</h2>
      <div class="total-progress">
        <div class="total-nums">
          <span class="total-earned">${prog.total}</span>
          <span class="total-sep">/</span>
          <span class="total-req">${prog.required}単位</span>
          ${prog.met
            ? '<span class="badge-done">卒業要件達成！</span>'
            : `<span class="remaining">残り ${prog.required - prog.total} 単位</span>`}
        </div>
        <div class="progress-bar">
          <div class="progress-fill ${fillCls}" style="width:${pct}%"></div>
        </div>
      </div>
    </div>`;

  if (dept.courseSelect) html += renderCourseSelectHTML(dept);
  if (shinkyu) html += renderShinkyuHTML(shinkyu, dept.shinkyu.label);
  html += renderSectionHTML(dept, dept.kyoyo,  'kyoyo',  prog.kyoyo);
  html += renderSectionHTML(dept, dept.senkou, 'senkou', prog.senkou);
  html += '<p class="disclaimer">※ このアプリは非公式です。単位認定・卒業要件は必ず公式の履修要覧および教務課でご確認ください。</p>';
  html += '</div>';

  document.getElementById('app').innerHTML = html;
}

function renderCourseSelectHTML(dept) {
  const cs = dept.courseSelect;
  const selected = getSelectedCourse(dept.id);
  let html = `<div class="section course-select-section">
    <div class="section-header"><h3 class="section-title">${cs.label}</h3></div>
    <div class="course-options">`;
  cs.options.forEach(opt => {
    const isSelected = opt.id === selected;
    html += `<button class="course-option${isSelected ? ' selected' : ''}"
      onclick="changeCourse('${dept.id}','${opt.id}')">${opt.label}</button>`;
  });
  html += '</div>';
  if (!selected) {
    const hint = cs.hint || '※ コースを選択すると必要単位数が変わります';
    html += `<p class="course-hint">${hint}</p>`;
  }
  html += '</div>';
  return html;
}

function renderShinkyuHTML(checks, label) {
  const allMet = checks.every(c => c.met);
  let html = `<div class="section shinkyu-section${allMet ? ' all-met' : ''}">
    <div class="section-header"><h3 class="section-title shinkyu-title">${label}</h3></div>
    <div class="shinkyu-checks">`;
  checks.forEach(c => {
    html += `<div class="shinkyu-item ${c.met ? 'met' : 'unmet'}">
      <span class="check-icon">${c.met ? '✓' : '✗'}</span>
      <span class="check-label">${c.label}</span>
      <span class="check-nums">${c.earned} / ${c.target}</span>
    </div>`;
  });
  html += '</div></div>';
  return html;
}

function renderSectionHTML(dept, sec, secName, calc) {
  let html = `<div class="section">
    <div class="section-header">
      <h3 class="section-title">${sec.label}</h3>
      <span class="${calc.met ? 'nums-met' : 'nums-unmet'}">${calc.total} / ${calc.required} 単位</span>
    </div>`;

  if (calc.groupChecks.length > 0) {
    html += '<div class="group-checks">';
    calc.groupChecks.forEach(gc => {
      html += `<div class="group-check ${gc.met ? 'met' : 'unmet'}">
        <span class="check-icon">${gc.met ? '✓' : '○'}</span>
        <span>${gc.label}</span>
        <span class="check-nums">${gc.earned} / ${gc.target}</span>
      </div>`;
    });
    html += '</div>';
  }

  const hasGroups = calc.items.some(i => i.group);
  if (hasGroups) {
    const groups = {};
    calc.items.forEach(item => {
      const g = item.group || 'その他';
      (groups[g] = groups[g] || []).push(item);
    });
    for (const [gname, items] of Object.entries(groups)) {
      html += `<div class="item-group"><div class="item-group-label">${gname}</div>`;
      items.forEach(item => { html += renderItemHTML(dept, secName, item); });
      html += '</div>';
    }
  } else {
    calc.items.forEach(item => { html += renderItemHTML(dept, secName, item); });
  }

  html += '</div>';
  return html;
}

function renderItemHTML(dept, secName, item) {
  const status = item.min === 0 ? 'na'
               : item.earned >= item.min ? 'met'
               : item.earned > 0 ? 'partial'
               : 'empty';
  const icon   = status === 'met' ? '✓' : status === 'na' ? '—' : status === 'partial' ? '○' : '×';
  const reqTxt = item.min > 0 ? `必要: ${item.min}単位` : '（任意）';

  return `<div class="credit-item status-${status}">
    <span class="item-icon">${icon}</span>
    <div class="item-info">
      <span class="item-label">${item.label}</span>
      <span class="item-req">${reqTxt}</span>
    </div>
    <div class="item-input-wrap">
      <button class="inc-btn"
        onclick="adjustCredit('${dept.id}','${secName}','${item.id}',-2)">－</button>
      <input type="number" class="credit-input"
        value="${item.earned}" min="0" max="120" step="2"
        onchange="changeCredit('${dept.id}','${secName}','${item.id}',this.value)">
      <button class="inc-btn"
        onclick="adjustCredit('${dept.id}','${secName}','${item.id}',2)">＋</button>
    </div>
  </div>`;
}

// ── Event handlers ──
function selectDept(id) {
  renderDetail(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changeCredit(deptId, sec, itemId, val) {
  saveCredit(deptId, sec, itemId, parseInt(val, 10) || 0);
  // Partial re-render: update only non-input parts
  refreshDetail(deptId);
}

function changeCourse(deptId, courseId) {
  saveSelectedCourse(deptId, courseId);
  refreshDetail(deptId);
}

function adjustCredit(deptId, sec, itemId, delta) {
  const cur = getCredit(deptId, sec, itemId);
  saveCredit(deptId, sec, itemId, cur + delta);
  refreshDetail(deptId);
}

let _rafPending = false;
function refreshDetail(deptId) {
  if (_rafPending) return;
  _rafPending = true;
  requestAnimationFrame(() => {
    _rafPending = false;
    const scrollY = window.scrollY;
    const focused = document.activeElement;
    const focusedId = focused ? focused.dataset.itemId : null;

    renderDetail(deptId);
    window.scrollTo(0, scrollY);

    if (focusedId) {
      const el = document.querySelector(`[data-item-id="${focusedId}"]`);
      if (el) el.focus();
    }
  });
}


// ── Share ──
async function copyShareLink(deptId) {
  const dept = DEPTS.find(d => d.id === deptId);
  if (!dept) return;
  const SECS = ['kyoyo', 'senkou'];
  const dIdx = DEPTS.indexOf(dept);
  const course = getSelectedCourse(deptId) || '';
  const parts = [];
  SECS.forEach((sec, sIdx) => {
    const section = dept[sec];
    if (!section) return;
    section.items.forEach((item, iIdx) => {
      const v = getCredit(deptId, sec, item.id);
      if (v > 0) parts.push(sIdx + '-' + iIdx + '=' + v);
    });
  });
  const fullUrl = location.origin + location.pathname + '#share=v2:' + dIdx + '~' + course + '~' + parts.join(',');
  let urlToCopy = fullUrl;
  try {
    const res = await fetch('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(fullUrl));
    const short = await res.text();
    if (short.startsWith('https://tinyurl.com/')) urlToCopy = short.trim();
  } catch (e) {}
  navigator.clipboard.writeText(urlToCopy).then(() => {
    showToast('リンクをコピーしました！');
  }).catch(() => {
    prompt('このURLをコピーしてください:', urlToCopy);
  });
}

function showToast(msg) {
  const el = document.createElement('div');
  el.className = 'share-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.classList.add('visible'); });
  setTimeout(() => {
    el.classList.remove('visible');
    setTimeout(() => el.remove(), 300);
  }, 2500);
}

function loadShareFromHash() {
  const hash = location.hash;
  if (!hash.startsWith('#share=')) return false;
  try {
    const payload = hash.slice(7);
    let data;
    if (payload.startsWith('v2:')) {
      const SECS = ['kyoyo', 'senkou'];
      const body = payload.slice(3);
      const t1 = body.indexOf('~'), t2 = body.indexOf('~', t1 + 1);
      const dept = DEPTS[parseInt(body.slice(0, t1))];
      if (!dept) return false;
      const courseVal = body.slice(t1 + 1, t2);
      const credits = {};
      const creditStr = body.slice(t2 + 1);
      if (creditStr) {
        creditStr.split(',').forEach(e => {
          const dash = e.indexOf('-'), eq = e.indexOf('=');
          const sec = SECS[parseInt(e.slice(0, dash))];
          const section = dept[sec];
          if (!section) return;
          const item = section.items[parseInt(e.slice(dash + 1, eq))];
          if (!item) return;
          credits[sec + '__' + item.id] = parseInt(e.slice(eq + 1));
        });
      }
      data = { d: dept.id, c: courseVal, cr: credits };
    } else {
      data = JSON.parse(decodeURIComponent(escape(atob(payload))));
    }
    const dept = DEPTS.find(d => d.id === data.d);
    if (!dept) return false;
    Object.entries(data.cr || {}).forEach(([key, val]) => {
      const [secId, itemId] = key.split('__');
      localStorage.setItem(storageKey(data.d, secId, itemId), val);
    });
    if (data.c && dept.courseSelect) {
      localStorage.setItem(dept.courseSelect.storageKey, data.c);
    }
    renderDetail(data.d, true);
    history.replaceState(null, '', location.pathname);
    return true;
  } catch (e) {
    return false;
  }
}

// ── WebStation Import ──
function normCourse(s) {
  return s.replace(/[！-～]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
          .replace(/[　\s（()）[\]【】・]/g, '').toLowerCase();
}

function getItemKeyword(label) {
  return (label || '').replace(/（[^）]*）/g, '').replace(/の分野$/, '').replace(/科目$/, '').replace(/と市民$/, '').trim();
}

function applyWebStationImport(deptId, courses) {
  const dept = DEPTS.find(d => d.id === deptId);
  if (!dept) return 0;
  let matched = 0;
  const used = new Set();
  ['kyoyo', 'senkou'].forEach(sec => {
    const section = dept[sec];
    if (!section) return;
    const sortedItems = [...section.items].sort((a, b) =>
      normCourse(getItemKeyword(b.label || '')).length - normCourse(getItemKeyword(a.label || '')).length
    );
    sortedItems.forEach(item => {
      const normId = normCourse(item.id);
      const kw = normCourse(getItemKeyword(item.label || ''));
      let totalCredits = 0;
      const matchIndices = [];
      for (let i = 0; i < courses.length; i++) {
        if (used.has(i)) continue;
        const [wsName, credits, wsCat] = courses[i];
        const normCat = normCourse(wsCat || '');
        const nameMatchId = wsName === normId || wsName.includes(normId) || normId.includes(wsName);
        const catMatchKw = sec === 'kyoyo' && kw.length >= 2 && normCat.length > 0 && normCat.includes(kw);
        if (nameMatchId || catMatchKw) {
          totalCredits += credits;
          matchIndices.push(i);
        }
      }
      if (matchIndices.length > 0 && !localStorage.getItem(storageKey(deptId, sec, item.id))) {
        localStorage.setItem(storageKey(deptId, sec, item.id), totalCredits);
        matched++;
        matchIndices.forEach(i => used.add(i));
      }
    });
  });
  return matched;
}

function loadWsImportFromHash() {
  const hash = location.hash.slice(1);
  if (!hash.includes('ws_import=')) return false;
  try {
    const enc = new URLSearchParams(hash).get('ws_import');
    if (!enc) return false;
    window._wsImport = JSON.parse(decodeURIComponent(escape(atob(enc))));
    return true;
  } catch(e) { return false; }
}

// ── WebStation Guide Modal ──
const WS_BOOKMARKLET = `javascript:(function(){function norm(s){return s.replace(/[！-～]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-0xFEE0)}).replace(/\s/g,'').toLowerCase();}var tables=document.querySelectorAll('table');var belong='';if(tables[0]){tables[0].querySelectorAll('tr').forEach(function(r){var cells=r.querySelectorAll('td');for(var i=0;i<cells.length-1;i++){if(cells[i].textContent.trim()==='所属'){belong=cells[i+1].textContent.trim();}}});}var FACS={'理学部':'https://kgnu-yokohama-rikei.vercel.app/','工学部':'https://kgnu-yokohama-rikei.vercel.app/','化学生命学部':'https://kgnu-yokohama-rikei.vercel.app/','情報学部':'https://kgnu-yokohama-rikei.vercel.app/','経営学部':'https://kgnu-minatomirai-credit.vercel.app/','外国語学部':'https://kgnu-minatomirai-credit.vercel.app/','国際日本学部':'https://kgnu-minatomirai-credit.vercel.app/','法学部':'https://kgnu-yokohama-credit-2.vercel.app/','経済学部':'https://kgnu-yokohama-credit-2.vercel.app/','人間科学部':'https://kgnu-yokohama-credit-2.vercel.app/','建築学部':'https://kgnu-yokohama-credit-2.vercel.app/'};var appUrl=null;for(var f in FACS){if(belong.indexOf(f)>=0){appUrl=FACS[f];break;}}if(!appUrl){alert('「'+belong+'」は対応していません。');return;}var courses=[];if(tables[1]){tables[1].querySelectorAll('tr').forEach(function(r){var cells=r.querySelectorAll('td');if(cells.length<11)return;var name=cells[1].textContent.trim();var pass=cells[4].textContent.trim();var credits=parseFloat(cells[10].textContent.trim());if(pass==='合'&&!isNaN(credits)&&name&&name!=='開講科目')courses.push([norm(name),credits,cells[5].textContent.trim()]);});}if(courses.length===0){alert('修得済み科目が見つかりません。\\n成績・修得単位照会ページで実行してください。');return;}var enc=btoa(unescape(encodeURIComponent(JSON.stringify(courses))));window.open(appUrl+'#ws_import='+enc,'_blank');})();`;

function parseWebStationText(text) {
  const courses = [];
  let nameCol = 1, passCol = 4, creditsCol = 9, catCol = 5;
  let headerFound = false;
  for (const line of text.split('\n')) {
    const cells = line.split('\t').map(c => c.trim());
    if (!headerFound) {
      const pi = cells.indexOf('合否');
      if (pi !== -1) {
        passCol = pi;
        nameCol = Math.max(0, cells.indexOf('開講科目'));
        creditsCol = cells.findIndex(c => c === '単位数' || c === '単位');
        catCol = cells.findIndex(c => c.includes('大区分'));
        if (creditsCol === -1) creditsCol = 9;
        if (catCol === -1) catCol = 5;
        headerFound = true;
        continue;
      }
    }
    const name = cells[nameCol] || '';
    const pass = cells[passCol] || '';
    const credits = parseFloat(cells[creditsCol] || '');
    if (pass === '合' && !isNaN(credits) && name && name !== '開講科目') {
      courses.push([normCourse(name), credits, cells[catCol] || '']);
    }
  }
  return courses;
}

function importFromPaste() {
  const text = (document.getElementById('ws-paste-area') || {}).value || '';
  if (!text.trim()) {
    alert('テキストが入力されていません。\nWebStationのページをコピーして貼り付けてください。');
    return;
  }
  const courses = parseWebStationText(text);
  if (courses.length === 0) {
    alert('修得済み科目が見つかりませんでした。\n「成績・修得単位照会」のページをそのままコピーしてください。');
    return;
  }
  window._wsImport = courses;
  closeWsGuide();
  renderSelect();
}

function showWsGuide() {
  const existing = document.getElementById('ws-modal');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'ws-modal';
  overlay.className = 'ws-modal-overlay';
  overlay.innerHTML = `<div class="ws-modal">
    <div class="ws-modal-header">
      <span class="ws-modal-title">📥 WebStationから単位を取込</span>
      <button class="ws-modal-close" onclick="closeWsGuide()">×</button>
    </div>
    <div class="ws-steps">
      <div class="ws-step">
        <div class="ws-step-num">1</div>
        <div class="ws-step-body">
          <div class="ws-step-title">WebStationで成績ページを開く</div>
          <div class="ws-step-desc">WebStationにログインして「成績・修得単位照会」を開く</div>
        </div>
      </div>
      <div class="ws-step">
        <div class="ws-step-num">2</div>
        <div class="ws-step-body">
          <div class="ws-step-title">ページを全選択してコピー</div>
          <div class="ws-step-desc">PC: Ctrl+A → Ctrl+C<br>スマホ: 画面を長押し →「すべて選択」→「コピー」</div>
        </div>
      </div>
      <div class="ws-step">
        <div class="ws-step-num">3</div>
        <div class="ws-step-body">
          <div class="ws-step-title">下に貼り付けて「取込む」をタップ</div>
        </div>
      </div>
    </div>
    <textarea id="ws-paste-area" class="ws-paste-area" placeholder="ここに貼り付け（Ctrl+V またはスマホは長押し→貼り付け）"></textarea>
    <button class="ws-import-btn" onclick="importFromPaste()">取込む</button>
    <details class="ws-bm-details">
      <summary class="ws-bm-summary">▶ 毎回コピーするのが面倒な方：ブックマークレット設定（上級）</summary>
      <div class="ws-bm-body">
        <p class="ws-step-desc">一度設定するとWebStationで1クリックするだけで自動取込できます</p>
        <a id="ws-drag-link" class="ws-drag-link">🔖 単位取込（PCはここをドラッグ）</a>
        <button class="ws-copy-btn" onclick="copyBookmarklet()">📋 コードをコピー（スマホ向け）</button>
        <p class="ws-drag-hint">スマホ: ブックマーク追加後にURLをコピーしたコードで上書き<br>PC（Chrome）: ブックマークバーを表示してリンクをドラッグ</p>
      </div>
    </details>
  </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeWsGuide(); });
  document.body.appendChild(overlay);
  document.getElementById('ws-drag-link').href = WS_BOOKMARKLET;
}

function closeWsGuide() {
  const el = document.getElementById('ws-modal');
  if (el) el.remove();
}

function copyBookmarklet() {
  navigator.clipboard.writeText(WS_BOOKMARKLET).then(() => {
    showToast('コードをコピーしました！');
  }).catch(() => {
    prompt('このコードをコピーしてください:', WS_BOOKMARKLET);
  });
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  loadWsImportFromHash();
  if (!loadShareFromHash()) renderSelect();
});
