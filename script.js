const $ = (id) => document.getElementById(id);

const fmt = (n) =>
  Number.isFinite(n)
    ? new Intl.NumberFormat("ka-GE", { maximumFractionDigits: 6 }).format(n)
    : "არასწორი მონაცემი";

const money = (n) =>
  Number.isFinite(n)
    ? new Intl.NumberFormat("ka-GE", {
        style: "currency",
        currency: "GEL",
        maximumFractionDigits: 2,
      }).format(n)
    : "არასწორი მონაცემი";

const val = (id) => parseFloat($(id)?.value || 0);

let lastAnswer = 0;
const historyKey = "universal_calc_history";

/* =====================
   Navigation / UI
===================== */

const drawer = $("drawer");
const overlay = $("overlay");

$("menuBtn").addEventListener("click", () => {
  drawer.classList.add("open");
  overlay.classList.add("open");
});

$("closeMenuBtn").addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
}

document.querySelectorAll(".nav").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach((x) => x.classList.remove("active"));
    document.querySelectorAll(".page").forEach((x) => x.classList.remove("active"));

    btn.classList.add("active");
    $(btn.dataset.page).classList.add("active");

    if (btn.dataset.page === "history") {
      renderHistory();
    }

    closeDrawer();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

$("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

$("clearBtn").addEventListener("click", () => {
  document.querySelectorAll("input, textarea").forEach((el) => {
    if (el.type !== "radio") el.value = "";
  });

  document.querySelectorAll("output").forEach((el) => {
    el.textContent = "—";
  });

  $("sciResult").textContent = "0";
});

/* =====================
   History
===================== */

function addHistory(title, text) {
  const list = JSON.parse(localStorage.getItem(historyKey) || "[]");

  list.unshift({
    title,
    text,
    date: new Date().toLocaleString("ka-GE"),
  });

  localStorage.setItem(historyKey, JSON.stringify(list.slice(0, 80)));
}

function renderHistory() {
  const box = $("historyList");
  const list = JSON.parse(localStorage.getItem(historyKey) || "[]");

  if (!list.length) {
    box.innerHTML = "<p>ისტორია ცარიელია.</p>";
    return;
  }

  box.innerHTML = list
    .map(
      (item) => `
      <div class="history-item">
        <strong>${item.title}</strong>
        <p>${item.text}</p>
        <small>${item.date}</small>
      </div>
    `
    )
    .join("");
}

function clearHistory() {
  localStorage.removeItem(historyKey);
  renderHistory();
}

/* =====================
   Translate site UI
===================== */

const translations = {
  en: {
    appSubtitle: "Scientific calculator, math, units, translation, and practical tools",
    theme: "🌙 Theme",
    clear: "🧹 Clear",
    menu: "Menu",
    scientific: "🧠 Scientific",
    math: "📐 Mathematical",
    advancedMath: "Advanced Math",
    sequences: "Arithmetic / Geometric",
    geometry: "Geometry",
    units: "Units",
    physics: "Physics",
    stats: "Statistics",
    languageText: "🌍 Text / Languages",
    translator: "Translation",
    textTools: "Text Tools",
    special: "🧰 Special",
    finance: "Finance",
    homeCosts: "Home Expenses",
    construction: "Construction / Renovation",
    event: "Event / Drinks",
    computer: "Computer / Internet",
    daily: "Daily",
    time: "Time",
    history: "🕘 History",
    tipTitle: "Tip",
    tipText: "Only the calculator is on the main page. Everything else opens from this menu.",
    scientificTitle: "Scientific Calculator",
    scientificDesc: "Includes powers, roots, logarithms, trigonometry, factorials, constants, percentages, and ANS.",
    calculators: "Calculators",
    unitCount: "Units",
    degrees: "Degrees",
    radians: "Radians",
    copy: "Copy",
    advancedMathTitle: "Advanced Math",
    advancedMathDesc: "Percentages, equations, combinatorics, primes, and more.",
    percentage: "Percentage",
    percentChange: "Percentage Change",
    quadratic: "Quadratic Equation",
    combination: "Combinations C(n,r)",
    permutation: "Permutations P(n,r)",
    primeCheck: "Prime Number?",
    factorization: "Prime Factorization",
    calculate: "Calculate",
    solve: "Solve",
    check: "Check",
    factorize: "Factorize",
    generate: "Generate",
    split: "Split",
    showAllUnits: "Show in all units",
    analyze: "Analyze",
    refresh: "Refresh",
    delete: "Delete",
    translate: "Translate",
    seqTitle: "Arithmetic and Geometric Progressions",
    seqDesc: "nth term, sum, Fibonacci, and series.",
    arithmeticSeq: "Arithmetic Progression",
    geometricSeq: "Geometric Progression",
    series: "Series Sum",
    geometryTitle: "Geometry",
    geometryDesc: "Area, perimeter, and volume of 2D and 3D shapes.",
    shapeCalc: "Shape Calculator",
    rectangle: "Rectangle",
    square: "Square",
    circle: "Circle",
    triangle: "Triangle",
    trapezoid: "Trapezoid",
    ellipse: "Ellipse",
    cube: "Cube",
    box: "Rectangular Prism",
    cylinder: "Cylinder",
    sphere: "Sphere",
    cone: "Cone",
    pythagoras: "Pythagoras",
    polygonAngles: "Polygon Angles",
    unitConverter: "Unit Converter",
    unitDesc: "Choose a category and convert between different units.",
    length: "Length",
    mass: "Mass",
    temperature: "Temperature",
    area: "Area",
    volume: "Volume",
    speed: "Speed",
    data: "Data",
    energy: "Energy",
    pressure: "Pressure",
    force: "Force",
    angle: "Angle",
    physicsTitle: "Physics",
    newtonLaw: "Newton’s Second Law F = m × a",
    densityCalc: "Density ρ = m / V",
    kineticEnergy: "Kinetic Energy",
    ohmLaw: "Ohm’s Law",
    statsTitle: "Statistics",
    numberAnalysis: "Number Analysis",
    weightedAverage: "Weighted Average",
    translatorTitle: "Translation",
    translatorDesc: "Built-in mini translator for simple words and phrases.",
    textToolsTitle: "Text Tools",
    textAnalysis: "Text Analysis",
    financeTitle: "Finance",
    discount: "Discount",
    loan: "Loan",
    savings: "Savings",
    profitLoss: "Profit / Loss",
    homeCostsTitle: "Home Expenses",
    monthlyHome: "Monthly Expense",
    splitBill: "Split Bill",
    constructionTitle: "Construction / Renovation",
    materialsLabor: "Materials + Labor",
    paint: "Paint",
    tiles: "Tiles",
    concrete: "Concrete",
    eventTitle: "Event / Drinks",
    eventDesc: "Water, juice, lemonade, mixtures, and concentration.",
    drinkAmount: "Drink Amount",
    mixture: "Mixture Concentration",
    syrupWater: "Syrup + Water",
    computerTitle: "Computer / Internet",
    downloadTime: "Download Time",
    dailyTitle: "Daily",
    waterBottles: "Water Bottles",
    stepsKm: "Steps → km",
    timeTitle: "Time",
    taskTime: "Task Time",
    historyTitle: "History",
  },

  ru: {
    appSubtitle: "Научный калькулятор, математика, единицы, перевод и практические инструменты",
    theme: "🌙 Тема",
    clear: "🧹 Очистить",
    menu: "Меню",
    scientific: "🧠 Научный",
    math: "📐 Математика",
    advancedMath: "Продвинутая математика",
    sequences: "Арифметическая / геометрическая",
    geometry: "Геометрия",
    units: "Единицы",
    physics: "Физика",
    stats: "Статистика",
    translator: "Перевод",
    textTools: "Инструменты текста",
    finance: "Финансы",
    homeCosts: "Расходы квартиры",
    construction: "Строительство / ремонт",
    event: "Мероприятие / напитки",
    computer: "Компьютер / интернет",
    daily: "Ежедневное",
    time: "Время",
    history: "🕘 История",
    scientificTitle: "Научный калькулятор",
    scientificDesc: "Степени, корни, логарифмы, тригонометрия, факториал, константы, проценты и ANS.",
    calculators: "Калькуляторы",
    unitCount: "Единицы",
    degrees: "Градусы",
    radians: "Радианы",
    copy: "Копировать",
    quadratic: "Квадратное уравнение",
    newtonLaw: "Второй закон Ньютона F = m × a",
    calculate: "Вычислить",
    solve: "Решить",
    check: "Проверить",
    translate: "Перевести",
  },
};

const originalTexts = new Map();

function saveOriginalTexts() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (!originalTexts.has(el)) {
      originalTexts.set(el, el.textContent);
    }
  });
}

function applyLanguage(lang) {
  saveOriginalTexts();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;

    if (lang === "ka") {
      el.textContent = originalTexts.get(el);
      return;
    }

    el.textContent = translations[lang]?.[key] || translations.en[key] || originalTexts.get(el);
  });

  document.querySelectorAll("#translatePanel button").forEach((btn) => {
    btn.classList.toggle("active-lang", btn.dataset.lang === lang);
  });

  localStorage.setItem("siteLang", lang);
}

$("translateBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  $("translatePanel").classList.toggle("open");
});

document.querySelectorAll("#translatePanel button").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang);
    $("translatePanel").classList.remove("open");
  });
});

document.addEventListener("click", () => {
  $("translatePanel").classList.remove("open");
});

applyLanguage(localStorage.getItem("siteLang") || "ka");

/* =====================
   Scientific Calculator
===================== */

const sciInput = $("sciInput");

document.querySelectorAll("[data-insert], [data-fn]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.insert) {
      sciInput.value += btn.dataset.insert;
    }

    if (btn.dataset.fn === "clear") {
      sciInput.value = "";
      $("sciResult").textContent = "0";
    }

    if (btn.dataset.fn === "back") {
      sciInput.value = sciInput.value.slice(0, -1);
    }

    if (btn.dataset.fn === "calculate") {
      calculateScientific();
    }
  });
});

sciInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calculateScientific();
});

$("ansBtn").addEventListener("click", () => {
  sciInput.value += "ANS";
});

$("copyBtn").addEventListener("click", () => {
  navigator.clipboard?.writeText($("sciResult").textContent);
});

function angleMode() {
  return document.querySelector("input[name='angleMode']:checked")?.value || "deg";
}

function factorial(n) {
  n = Math.floor(n);
  if (n < 0 || n > 170) return NaN;

  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

function normalizeExpression(expr) {
  return expr
    .replaceAll("π", "pi")
    .replace(/(\d+)!/g, "factorial($1)")
    .replace(/\^/g, "**")
    .replace(/(\d+)%/g, "($1/100)")
    .replace(/\bpi\b/g, "Math.PI")
    .replace(/\be\b/g, "Math.E")
    .replace(/\bsqrt\(/g, "Math.sqrt(")
    .replace(/\bcbrt\(/g, "Math.cbrt(")
    .replace(/\blog\(/g, "Math.log10(")
    .replace(/\bln\(/g, "Math.log(")
    .replace(/\babs\(/g, "Math.abs(")
    .replace(/\bfloor\(/g, "Math.floor(")
    .replace(/\bceil\(/g, "Math.ceil(")
    .replace(/\brandom\(\)/g, "Math.random()")
    .replace(/\bsin\(/g, "sinX(")
    .replace(/\bcos\(/g, "cosX(")
    .replace(/\btan\(/g, "tanX(")
    .replace(/\basin\(/g, "asinX(")
    .replace(/\bacos\(/g, "acosX(")
    .replace(/\batan\(/g, "atanX(")
    .replace(/\bANS\b/g, String(lastAnswer));
}

function calculateScientific() {
  try {
    const mode = angleMode();

    const toRad = (x) => (mode === "deg" ? (x * Math.PI) / 180 : x);
    const fromRad = (x) => (mode === "deg" ? (x * 180) / Math.PI : x);

    const sinX = (x) => Math.sin(toRad(x));
    const cosX = (x) => Math.cos(toRad(x));
    const tanX = (x) => Math.tan(toRad(x));
    const asinX = (x) => fromRad(Math.asin(x));
    const acosX = (x) => fromRad(Math.acos(x));
    const atanX = (x) => fromRad(Math.atan(x));

    const expr = normalizeExpression(sciInput.value);

    const result = Function(
      "sinX",
      "cosX",
      "tanX",
      "asinX",
      "acosX",
      "atanX",
      "factorial",
      `"use strict"; return (${expr});`
    )(sinX, cosX, tanX, asinX, acosX, atanX, factorial);

    lastAnswer = result;
    $("sciResult").textContent = fmt(result);
    addHistory("მეცნიერული", `${sciInput.value} = ${fmt(result)}`);
  } catch {
    $("sciResult").textContent = "შეცდომა";
  }
}

/* =====================
   Math helpers
===================== */

function numsFrom(text) {
  return String(text)
    .split(/[,\s;]+/)
    .map(Number)
    .filter(Number.isFinite);
}

function gcd2(a, b) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));

  while (b) {
    [a, b] = [b, a % b];
  }

  return a || 1;
}

function lcm2(a, b) {
  return Math.abs(a * b) / gcd2(a, b) || 0;
}

/* =====================
   Advanced Math
===================== */

function calcPercent() {
  const result = (val("percentA") / 100) * val("percentB");
  $("percentOut").textContent = fmt(result);
  addHistory("პროცენტი", $("percentOut").textContent);
}

function calcPercentChange() {
  const oldV = val("oldValue");
  const newV = val("newValue");
  const result = ((newV - oldV) / oldV) * 100;

  $("changeOut").textContent = `ცვლილება: ${fmt(result)}%`;
}

function solveQuadratic() {
  const a = val("qa");
  const b = val("qb");
  const c = val("qc");

  if (a === 0) {
    $("quadOut").textContent = "a არ უნდა იყოს 0";
    return;
  }

  const d = b * b - 4 * a * c;

  if (d < 0) {
    $("quadOut").textContent = `D = ${fmt(d)}\nნამდვილი ფესვები არ აქვს`;
    return;
  }

  const x1 = (-b + Math.sqrt(d)) / (2 * a);
  const x2 = (-b - Math.sqrt(d)) / (2 * a);

  $("quadOut").textContent = `D = ${fmt(d)}\nx₁ = ${fmt(x1)}\nx₂ = ${fmt(x2)}`;
}

function calcGcdLcm() {
  const nums = numsFrom($("gcdNums").value);

  if (!nums.length) {
    $("gcdOut").textContent = "ჩაწერე რიცხვები";
    return;
  }

  $("gcdOut").textContent = `GCD: ${nums.reduce(gcd2)}\nLCM: ${nums.reduce(lcm2)}`;
}

function calcCombination() {
  const n = val("combN");
  const r = val("combR");

  const result = factorial(n) / (factorial(r) * factorial(n - r));

  $("combOut").textContent = `C(${n}, ${r}) = ${fmt(result)}`;
}

function calcPermutation() {
  const n = val("permN");
  const r = val("permR");

  const result = factorial(n) / factorial(n - r);

  $("permOut").textContent = `P(${n}, ${r}) = ${fmt(result)}`;
}

function checkPrime() {
  const n = Math.floor(val("primeN"));

  if (n < 2) {
    $("primeOut").textContent = "არა";
    return;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      $("primeOut").textContent = `არა, იყოფა ${i}-ზე`;
      return;
    }
  }

  $("primeOut").textContent = "კი, პრაიმია";
}

function primeFactors() {
  let n = Math.floor(val("factorN"));
  const factors = [];

  for (let p = 2; p * p <= n; p++) {
    while (n % p === 0) {
      factors.push(p);
      n /= p;
    }
  }

  if (n > 1) factors.push(n);

  $("factorOut").textContent = factors.join(" × ") || "—";
}

/* =====================
   Sequences
===================== */

function calcArithmeticSeq() {
  const a1 = val("arithA1");
  const d = val("arithD");
  const n = val("arithN");

  const an = a1 + (n - 1) * d;
  const sum = (n / 2) * (2 * a1 + (n - 1) * d);

  $("arithOut").textContent = `aₙ = ${fmt(an)}\nSₙ = ${fmt(sum)}`;
}

function calcGeometricSeq() {
  const a1 = val("geoA1");
  const r = val("geoR");
  const n = val("geoN");

  const an = a1 * Math.pow(r, n - 1);
  const sum = r === 1 ? a1 * n : (a1 * (1 - Math.pow(r, n))) / (1 - r);

  $("geoSeqOut").textContent = `aₙ = ${fmt(an)}\nSₙ = ${fmt(sum)}`;
}

function calcFibonacci() {
  const n = Math.min(200, Math.max(0, Math.floor(val("fibN"))));
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(i < 2 ? i : arr[i - 1] + arr[i - 2]);
  }

  $("fibOut").textContent = arr.join(", ");
}

function calcSeries() {
  const n = val("seriesN");

  $("seriesOut").textContent =
    `1 + 2 + ... + n = ${fmt((n * (n + 1)) / 2)}\n` +
    `1² + 2² + ... + n² = ${fmt((n * (n + 1) * (2 * n + 1)) / 6)}`;
}

/* =====================
   Geometry
===================== */

function renderGeoInputs() {
  const type = $("geoType").value;

  const inputs = {
    rectangle: `
      <input id="g1" type="number" placeholder="სიგრძე">
      <input id="g2" type="number" placeholder="სიგანე">
    `,
    square: `
      <input id="g1" type="number" placeholder="გვერდი">
    `,
    circle: `
      <input id="g1" type="number" placeholder="რადიუსი">
    `,
    triangle: `
      <input id="g1" type="number" placeholder="ფუძე">
      <input id="g2" type="number" placeholder="სიმაღლე">
    `,
    trapezoid: `
      <input id="g1" type="number" placeholder="ფუძე a">
      <input id="g2" type="number" placeholder="ფუძე b">
      <input id="g3" type="number" placeholder="სიმაღლე">
    `,
    ellipse: `
      <input id="g1" type="number" placeholder="ნახევარღერძი a">
      <input id="g2" type="number" placeholder="ნახევარღერძი b">
    `,
    cube: `
      <input id="g1" type="number" placeholder="გვერდი">
    `,
    box: `
      <input id="g1" type="number" placeholder="სიგრძე">
      <input id="g2" type="number" placeholder="სიგანე">
      <input id="g3" type="number" placeholder="სიმაღლე">
    `,
    cylinder: `
      <input id="g1" type="number" placeholder="რადიუსი">
      <input id="g2" type="number" placeholder="სიმაღლე">
    `,
    sphere: `
      <input id="g1" type="number" placeholder="რადიუსი">
    `,
    cone: `
      <input id="g1" type="number" placeholder="რადიუსი">
      <input id="g2" type="number" placeholder="სიმაღლე">
    `,
  };

  $("geoInputs").innerHTML = inputs[type];
}

function calcGeometry() {
  const type = $("geoType").value;
  const a = val("g1");
  const b = val("g2");
  const c = val("g3");

  let out = "";

  if (type === "rectangle") out = `ფართობი: ${fmt(a * b)}\nპერიმეტრი: ${fmt(2 * (a + b))}`;
  if (type === "square") out = `ფართობი: ${fmt(a * a)}\nპერიმეტრი: ${fmt(4 * a)}`;
  if (type === "circle") out = `ფართობი: ${fmt(Math.PI * a * a)}\nგარშემოწერილობა: ${fmt(2 * Math.PI * a)}`;
  if (type === "triangle") out = `ფართობი: ${fmt((a * b) / 2)}`;
  if (type === "trapezoid") out = `ფართობი: ${fmt(((a + b) / 2) * c)}`;
  if (type === "ellipse") out = `ფართობი: ${fmt(Math.PI * a * b)}`;
  if (type === "cube") out = `მოცულობა: ${fmt(a ** 3)}\nზედაპირი: ${fmt(6 * a * a)}`;
  if (type === "box") out = `მოცულობა: ${fmt(a * b * c)}\nზედაპირი: ${fmt(2 * (a * b + a * c + b * c))}`;
  if (type === "cylinder") out = `მოცულობა: ${fmt(Math.PI * a * a * b)}\nზედაპირი: ${fmt(2 * Math.PI * a * (a + b))}`;
  if (type === "sphere") out = `მოცულობა: ${fmt((4 / 3) * Math.PI * a ** 3)}\nზედაპირი: ${fmt(4 * Math.PI * a * a)}`;
  if (type === "cone") out = `მოცულობა: ${fmt((Math.PI * a * a * b) / 3)}\nდახრილი: ${fmt(Math.sqrt(a * a + b * b))}`;

  $("geoOut").textContent = out;
  addHistory("გეომეტრია", out);
}

function calcPythagoras() {
  const c = Math.sqrt(val("pyA") ** 2 + val("pyB") ** 2);
  $("pyOut").textContent = `c = ${fmt(c)}`;
}

function calcPolygon() {
  const n = val("polygonSides");

  $("polygonOut").textContent =
    `შიდა კუთხეების ჯამი: ${fmt((n - 2) * 180)}°\n` +
    `ერთი კუთხე რეგულარულში: ${fmt(((n - 2) * 180) / n)}°`;
}

renderGeoInputs();

/* =====================
   Units
===================== */

const units = {
  length: {
    "მილიმეტრი": 0.001,
    "სანტიმეტრი": 0.01,
    "მეტრი": 1,
    "კილომეტრი": 1000,
    "ინჩი": 0.0254,
    "ფუტი": 0.3048,
    "იარდი": 0.9144,
    "მილი": 1609.344,
  },
  mass: {
    "მილიგრამი": 0.000001,
    "გრამი": 0.001,
    "კილოგრამი": 1,
    "ტონა": 1000,
    "უნცია": 0.0283495,
    "ფუნტი": 0.453592,
  },
  temperature: {
    "ცელსიუსი": "C",
    "ფარენჰაიტი": "F",
    "კელვინი": "K",
  },
  area: {
    "სმ²": 0.0001,
    "მ²": 1,
    "კმ²": 1000000,
    "ჰექტარი": 10000,
    "აკრი": 4046.856,
  },
  volume: {
    "მლ": 0.001,
    "ლიტრი": 1,
    "მ³": 1000,
    "ჭიქა 250მლ": 0.25,
    "გალონი": 3.78541,
  },
  speed: {
    "მ/წმ": 1,
    "კმ/სთ": 0.2777778,
    "მილი/სთ": 0.44704,
    "კვანძი": 0.514444,
  },
  time: {
    "წამი": 1,
    "წუთი": 60,
    "საათი": 3600,
    "დღე": 86400,
    "კვირა": 604800,
    "წელი": 31536000,
  },
  data: {
    "ბაიტი": 1,
    "KB": 1024,
    "MB": 1048576,
    "GB": 1073741824,
    "TB": 1099511627776,
  },
  energy: {
    "ჯოული": 1,
    "კილოჯოული": 1000,
    "კალორია": 4.184,
    "კილოკალორია": 4184,
    "ვატ-საათი": 3600,
  },
  pressure: {
    "პასკალი": 1,
    "კილოპასკალი": 1000,
    "ბარი": 100000,
    "ატმოსფერო": 101325,
    "psi": 6894.757,
  },
  force: {
    "ნიუტონი": 1,
    "კილონიუტონი": 1000,
    "კილოგრამ-ძალა": 9.80665,
    "ფუნტ-ძალა": 4.44822,
  },
  angle: {
    "გრადუსი": 1,
    "რადიანი": 57.2957795,
    "ბრუნი": 360,
  },
};

function loadUnits() {
  const type = $("unitType").value;
  const from = $("unitFrom");
  const to = $("unitTo");

  from.innerHTML = "";
  to.innerHTML = "";

  Object.keys(units[type]).forEach((name) => {
    from.add(new Option(name, name));
    to.add(new Option(name, name));
  });

  if (to.options[1]) to.selectedIndex = 1;

  convertUnit();
}

function convertTemp(value, from, to) {
  let celsius;

  if (from === "ცელსიუსი") celsius = value;
  if (from === "ფარენჰაიტი") celsius = ((value - 32) * 5) / 9;
  if (from === "კელვინი") celsius = value - 273.15;

  if (to === "ცელსიუსი") return celsius;
  if (to === "ფარენჰაიტი") return (celsius * 9) / 5 + 32;
  if (to === "კელვინი") return celsius + 273.15;
}

function convertUnitValue(type, value, from, to) {
  if (type === "temperature") return convertTemp(value, from, to);

  return (value * units[type][from]) / units[type][to];
}

function convertUnit() {
  const type = $("unitType").value;
  const value = val("unitValue");
  const from = $("unitFrom").value;
  const to = $("unitTo").value;

  if (!from || !to) return;

  const result = convertUnitValue(type, value, from, to);

  $("unitOut").textContent = `${fmt(value)} ${from} = ${fmt(result)} ${to}`;
}

function convertToAll() {
  const type = $("unitType").value;
  const value = val("unitValue");
  const from = $("unitFrom").value;

  const lines = Object.keys(units[type]).map((to) => {
    const result = convertUnitValue(type, value, from, to);
    return `${to}: ${fmt(result)}`;
  });

  $("allUnitsOut").textContent = lines.join("\n");
}

loadUnits();

/* =====================
   Physics
===================== */

function calcForce() {
  const result = val("forceMass") * val("accel");
  $("forceOut").textContent = `F = ${fmt(result)} N`;
}

function calcDensity() {
  const result = val("densityMass") / val("densityVolume");
  $("densityOut").textContent = `ρ = ${fmt(result)} კგ/მ³`;
}

function calcKinetic() {
  const result = 0.5 * val("kinMass") * val("kinSpeed") ** 2;
  $("kinOut").textContent = `E = ${fmt(result)} J`;
}

function calcOhm() {
  const result = val("ohmV") / val("ohmR");
  $("ohmOut").textContent = `I = ${fmt(result)} A`;
}

/* =====================
   Statistics
===================== */

function calcStats() {
  const nums = numsFrom($("statNums").value).sort((a, b) => a - b);

  if (!nums.length) {
    $("statsOut").textContent = "ჩაწერე რიცხვები";
    return;
  }

  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / nums.length;
  const median =
    nums.length % 2
      ? nums[(nums.length - 1) / 2]
      : (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;

  const variance = nums.reduce((s, x) => s + (x - mean) ** 2, 0) / nums.length;

  $("statsOut").textContent =
    `რაოდენობა: ${nums.length}\n` +
    `ჯამი: ${fmt(sum)}\n` +
    `საშუალო: ${fmt(mean)}\n` +
    `მედიანა: ${fmt(median)}\n` +
    `მინ: ${fmt(nums[0])}\n` +
    `მაქს: ${fmt(nums.at(-1))}\n` +
    `სტანდარტული გადახრა: ${fmt(Math.sqrt(variance))}`;
}

function calcWeightedAverage() {
  const values = numsFrom($("weightedValues").value);
  const weights = numsFrom($("weightedWeights").value);

  const sumWeight = weights.reduce((a, b) => a + b, 0);
  const result = values.reduce((sum, value, i) => sum + value * (weights[i] || 0), 0) / sumWeight;

  $("weightedOut").textContent = `წონიანი საშუალო: ${fmt(result)}`;
}

/* =====================
   Mini Translator
===================== */

const miniDictionary = {
  "გამარჯობა": { en: "hello", ru: "привет", de: "hallo", fr: "bonjour", es: "hola", it: "ciao", tr: "merhaba" },
  "მადლობა": { en: "thank you", ru: "спасибо", de: "danke", fr: "merci", es: "gracias", it: "grazie", tr: "teşekkürler" },
  "სკოლა": { en: "school", ru: "школа", de: "Schule", fr: "école", es: "escuela", it: "scuola", tr: "okul" },
  "წყალი": { en: "water", ru: "вода", de: "Wasser", fr: "eau", es: "agua", it: "acqua", tr: "su" },
  "hello": { ka: "გამარჯობა", ru: "привет", de: "hallo", fr: "bonjour", es: "hola", it: "ciao", tr: "merhaba" },
  "thank you": { ka: "მადლობა", ru: "спасибо", de: "danke", fr: "merci", es: "gracias", it: "grazie", tr: "teşekkürler" },
  "school": { ka: "სკოლა", ru: "школа", de: "Schule", fr: "école", es: "escuela", it: "scuola", tr: "okul" },
  "water": { ka: "წყალი", ru: "вода", de: "Wasser", fr: "eau", es: "agua", it: "acqua", tr: "su" },
};

function translateMini() {
  const text = $("translateInput").value.trim().toLowerCase();
  const to = $("toLang").value;

  const result = miniDictionary[text]?.[to] || "ამ სიტყვას ჯერ ვერ ვთარგმნი.";

  $("translateOut").textContent = result;
}

/* =====================
   Text Tools
===================== */

function analyzeText() {
  const text = $("textInput").value;

  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;

  $("textOut").textContent = `სიმბოლოები: ${chars}\nსიტყვები: ${words}\nხაზები: ${lines}`;
}

function convertCase(type) {
  let text = $("caseInput").value;

  if (type === "upper") text = text.toUpperCase();
  if (type === "lower") text = text.toLowerCase();
  if (type === "title") {
    text = text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  $("caseOut").textContent = text;
}

/* =====================
   Finance
===================== */

function calcDiscount() {
  const price = val("discountPrice");
  const percent = val("discountPercent");

  const save = (price * percent) / 100;
  const finalPrice = price - save;

  $("discountOut").textContent = `დაზოგავ: ${money(save)}\nსაბოლოო ფასი: ${money(finalPrice)}`;
}

function calcLoan() {
  const amount = val("loanAmount");
  const rate = val("loanRate") / 100 / 12;
  const months = val("loanMonths");

  const monthly =
    rate === 0
      ? amount / months
      : (amount * rate * (1 + rate) ** months) / ((1 + rate) ** months - 1);

  $("loanOut").textContent =
    `თვეში: ${money(monthly)}\n` +
    `სულ: ${money(monthly * months)}\n` +
    `პროცენტი: ${money(monthly * months - amount)}`;
}

function calcSavings() {
  const result = val("saveStart") + val("saveMonthly") * val("saveMonths");
  $("saveOut").textContent = `დაგროვდება: ${money(result)}`;
}

function calcProfit() {
  const profit = val("sellPrice") - val("buyPrice");
  const margin = (profit / val("sellPrice")) * 100;

  $("profitOut").textContent = `მოგება/ზარალი: ${money(profit)}\nმარჟა: ${fmt(margin)}%`;
}

/* =====================
   Home
===================== */

function calcHomeExpenses() {
  const total =
    val("rent") +
    val("electricity") +
    val("gas") +
    val("water") +
    val("internet") +
    val("food") +
    val("otherHome");

  const people = Math.max(1, val("peopleHome"));

  $("homeOut").textContent =
    `სულ: ${money(total)}\n` +
    `ერთ ადამიანზე: ${money(total / people)}\n` +
    `დღეში საშუალოდ: ${money(total / 30)}`;
}

function splitBill() {
  const total = val("billTotal") * (1 + val("tipPercent") / 100);
  const people = Math.max(1, val("billPeople"));

  $("billOut").textContent = `სულ: ${money(total)}\nერთზე: ${money(total / people)}`;
}

/* =====================
   Construction
===================== */

function calcRenovation() {
  const area = val("roomArea");
  const material = area * val("materialPerM") * (1 + val("wastePercent") / 100);
  const work = area * val("workPerM");

  $("renoOut").textContent = `მასალა: ${money(material)}\nხელობა: ${money(work)}\nსულ: ${money(material + work)}`;
}

function calcPaint() {
  const liters = (val("paintArea") * val("paintCoats")) / Math.max(0.01, val("paintCover"));
  const cost = liters * val("paintPrice");

  $("paintOut").textContent = `საჭიროა: ${fmt(liters)} ლ\nფასი: ${money(cost)}`;
}

function calcTiles() {
  const count = Math.ceil(
    (val("tileArea") * (1 + val("tileWaste") / 100)) / Math.max(0.0001, val("tileOneArea"))
  );

  $("tilesOut").textContent = `საჭირო ფილები: ${count}`;
}

function calcConcrete() {
  const m3 = val("concL") * val("concW") * val("concH");

  $("concreteOut").textContent = `მოცულობა: ${fmt(m3)} მ³\nლიტრი: ${fmt(m3 * 1000)}`;
}

/* =====================
   Event / Drinks
===================== */

function calcBeverages() {
  const liters = val("guestCount") * val("drinkPerGuest");
  const bottles = Math.ceil(liters / Math.max(0.01, val("bottleSize")));
  const cost = bottles * val("bottlePrice");

  $("bevOut").textContent = `ლიტრები: ${fmt(liters)}\nბოთლები: ${bottles}\nფასი: ${money(cost)}`;
}

function calcMixture() {
  const a = val("mixA");
  const ca = val("concA");
  const b = val("mixB");
  const cb = val("concB");

  const total = a + b;
  const concentration = (a * ca + b * cb) / total;

  $("mixOut").textContent = `სულ: ${fmt(total)} ლ\nკონცენტრაცია: ${fmt(concentration)}%`;
}

function calcSyrup() {
  const syrup = val("syrupLiters");
  const water = syrup * val("ratioWater");

  $("syrupOut").textContent = `წყალი: ${fmt(water)} ლ\nსულ: ${fmt(syrup + water)} ლ`;
}

/* =====================
   Computer
===================== */

function calcDownload() {
  const sizeBytes =
    val("fileSize") *
    {
      MB: 1048576,
      GB: 1073741824,
      TB: 1099511627776,
    }[$("fileSizeUnit").value];

  const speedBytes =
    val("netSpeed") *
    {
      Mbps: 125000,
      MBps: 1000000,
      Gbps: 125000000,
    }[$("netSpeedUnit").value];

  const seconds = sizeBytes / speedBytes;

  $("downloadOut").textContent =
    `${fmt(seconds)} წამი\n` +
    `${fmt(seconds / 60)} წუთი\n` +
    `${fmt(seconds / 3600)} საათი`;
}

/* =====================
   Daily / Time
===================== */

function calcWaterBottles() {
  const bottles = Math.ceil(val("waterLiters") / Math.max(0.01, val("waterBottle")));
  $("waterBottleOut").textContent = `საჭიროა ${bottles} ბოთლი`;
}

function calcSteps() {
  const km = (val("steps") * val("stepLength")) / 1000;
  $("stepsOut").textContent = `დაახლოებით ${fmt(km)} კმ`;
}

function calcPomodoro() {
  const sessions = val("sessions");
  const focus = val("focusMin");
  const breakMin = val("breakMin");

  const total = sessions * focus + Math.max(0, sessions - 1) * breakMin;

  $("pomoOut").textContent = `სულ: ${fmt(total)} წუთი\n${fmt(total / 60)} საათი`;
}

function calcTaskTime() {
  const mins = val("taskCount") * val("minPerTask");
  $("taskOut").textContent = `${fmt(mins)} წუთი\n${fmt(mins / 60)} საათი`;
}/* Extra features: modes, themes, PWA */

function openPageById(pageId) {
  document.querySelectorAll(".nav").forEach((x) => {
    x.classList.toggle("active", x.dataset.page === pageId);
  });

  document.querySelectorAll(".page").forEach((x) => {
    x.classList.remove("active");
  });

  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openMode(mode) {
  if (mode === "student") {
    openPageById("formulas");
  }

  if (mode === "business") {
    openPageById("finance");
  }

  if (mode === "home") {
    openPageById("home");
  }
}

function setAccent(color) {
  document.body.classList.remove(
    "accent-blue",
    "accent-purple",
    "accent-green",
    "accent-gold",
    "accent-red"
  );

  document.body.classList.add("accent-" + color);
  localStorage.setItem("calculatorAccent", color);
}

const savedAccent = localStorage.getItem("calculatorAccent");
if (savedAccent) {
  setAccent(savedAccent);
}

/* PWA register */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .catch(() => {
        console.log("Service worker not registered");
      });
  });
}