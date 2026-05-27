const IGV = 0.18;

const pricing = {
  cameraUnit: 680,
  existingValidation: 180,
  existingIntegration: 1350,
  existingConfigUnit: 170,
  edgeKit: 1466,
  implementation: 1980,
  platformPlans: [
    { name: "VisionPRO 1 camara", min: 1, max: 1, monthly: 60, included: 1 },
    { name: "VisionPRO 2 camaras", min: 2, max: 2, monthly: 90, included: 2 },
    { name: "VisionPRO multicamara 3-5", min: 3, max: 5, monthly: 150, included: 5 },
    { name: "VisionPRO obra 6-10", min: 6, max: 10, monthly: 240, included: 10 },
    { name: "VisionPRO enterprise 11+", min: 11, max: 99, monthly: 390, included: 12 },
  ],
  extraCameraMonthly: 30,
};

const modules = [
  {
    id: "U01",
    name: "IA Seguridad - EPP / casco",
    shortName: "IA EPP",
    setup: 250,
    monthly: 60,
    focus: "Seguridad",
    description: "Detecta falta de casco o EPP y deja evidencia visual para supervision HSE.",
    scope: "Eventos de EPP, evidencia visual, resumen por periodo y soporte de calibracion.",
  },
  {
    id: "F01",
    name: "Timelapse configurable",
    shortName: "Timelapse",
    setup: 120,
    monthly: 30,
    focus: "Trazabilidad",
    description: "Genera avance visual por periodo, hito o frente de obra.",
    scope: "Secuencias timelapse descargables y visualizacion de avance.",
  },
  {
    id: "F02",
    name: "Reporte automatico",
    shortName: "Reportes",
    setup: 150,
    monthly: 50,
    focus: "Reporting",
    description: "Convierte evidencias y eventos en reporte diario o semanal.",
    scope: "Reporte automatico con hallazgos, fotos y KPIs operativos.",
  },
  {
    id: "F04",
    name: "Intrusion / zona de riesgo",
    shortName: "Intrusion",
    setup: 320,
    monthly: 60,
    focus: "Seguridad",
    description: "Monitorea zonas restringidas o de alto riesgo dentro de la obra.",
    scope: "Eventos por zona, evidencia y notificacion de riesgo.",
  },
  {
    id: "F03",
    name: "Alerta fuego / humo",
    shortName: "Fuego / humo",
    setup: 420,
    monthly: 90,
    focus: "Seguridad",
    description: "Alerta visual temprana para incidentes criticos.",
    scope: "Registro de alerta, evidencia y criterio de revision humana.",
  },
  {
    id: "U08",
    name: "Entrada / salida de camiones",
    shortName: "Camiones",
    setup: 320,
    monthly: 60,
    focus: "Logistica",
    description: "Controla flujo vehicular, accesos y tiempos de entrada/salida.",
    scope: "Conteo de accesos, horarios y evidencia por porton.",
  },
  {
    id: "U09",
    name: "Ciclo de mixers",
    shortName: "Mixers",
    setup: 450,
    monthly: 90,
    focus: "Calidad",
    description: "Registra inicio/fin de vaciado y trazabilidad del concreto.",
    scope: "Eventos de mixer, tiempo de ciclo y evidencia de vaciado.",
  },
  {
    id: "U18",
    name: "Aprovechamiento de vias",
    shortName: "Vias",
    setup: 350,
    monthly: 70,
    focus: "Productividad",
    description: "Mide ocupacion, congestion y uso de vias internas.",
    scope: "Indicadores de ocupacion y alertas por congestion.",
  },
  {
    id: "F05",
    name: "Vinculacion BIM",
    shortName: "BIM",
    setup: 850,
    monthly: 150,
    focus: "Premium",
    description: "Relaciona evidencia visual con zonas, frentes o modelo BIM.",
    scope: "Vistas y evidencias vinculadas a sectores o hitos BIM.",
  },
  {
    id: "F06",
    name: "Resumen inteligente",
    shortName: "LLM",
    setup: 250,
    monthly: 70,
    focus: "Reporting",
    description: "Genera resumen ejecutivo de eventos, riesgos y avance.",
    scope: "Resumen IA para gerencia con hallazgos y siguientes acciones.",
  },
];

const presets = {
  ascent: {
    client: "PDK",
    project: "Ascent",
    newCameras: 2,
    existingCameras: 0,
    months: 12,
    discount: 0,
    edgeKit: true,
    implementation: true,
    modules: ["U01", "F01"],
  },
  base: {
    client: "",
    project: "Obra trazabilidad",
    newCameras: 1,
    existingCameras: 0,
    months: 6,
    discount: 0,
    edgeKit: true,
    implementation: true,
    modules: ["F01"],
  },
  security: {
    client: "",
    project: "Obra seguridad IA",
    newCameras: 2,
    existingCameras: 0,
    months: 12,
    discount: 0,
    edgeKit: true,
    implementation: true,
    modules: ["U01", "F01", "F02", "F04"],
  },
  productivity: {
    client: "",
    project: "Obra productividad",
    newCameras: 3,
    existingCameras: 0,
    months: 12,
    discount: 3,
    edgeKit: true,
    implementation: true,
    modules: ["F01", "F02", "U08", "U18"],
  },
  complete: {
    client: "",
    project: "Obra completa VisionPRO",
    newCameras: 5,
    existingCameras: 0,
    months: 12,
    discount: 5,
    edgeKit: true,
    implementation: true,
    modules: ["U01", "F01", "F02", "F04", "U08", "U09", "U18", "F06"],
  },
};

const state = {
  activeModules: new Set(["U01", "F01"]),
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const fields = {
  clientName: $("#clientName"),
  projectName: $("#projectName"),
  newCameras: $("#newCameras"),
  existingCameras: $("#existingCameras"),
  months: $("#months"),
  discount: $("#discount"),
  edgeKit: $("#edgeKit"),
  implementation: $("#implementation"),
};

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function number(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));
}

function totalCameras() {
  return Number(fields.newCameras.value) + Number(fields.existingCameras.value);
}

function recommendedPlatform(cameras) {
  const count = Math.max(1, cameras);
  return pricing.platformPlans.find((plan) => count >= plan.min && count <= plan.max) || pricing.platformPlans[pricing.platformPlans.length - 1];
}

function calculate() {
  const newCameras = Number(fields.newCameras.value);
  const existingCameras = Number(fields.existingCameras.value);
  const cameras = newCameras + existingCameras;
  const months = Number(fields.months.value);
  const discountRate = Number(fields.discount.value) / 100;
  const plan = recommendedPlatform(cameras);
  const activeModules = modules.filter((module) => state.activeModules.has(module.id));

  const hardware = newCameras * pricing.cameraUnit + (fields.edgeKit.checked ? pricing.edgeKit : 0);
  const existingCosts = existingCameras > 0 ? pricing.existingValidation + pricing.existingIntegration + existingCameras * pricing.existingConfigUnit : 0;
  const implementation = fields.implementation.checked ? pricing.implementation + existingCosts : existingCosts;
  const iaSetup = activeModules.reduce((sum, module) => sum + module.setup, 0);
  const subtotalOneTime = hardware + implementation + iaSetup;
  const discount = subtotalOneTime * discountRate;
  const oneTimeNet = subtotalOneTime - discount;

  const platformExtra = Math.max(cameras - plan.included, 0) * pricing.extraCameraMonthly;
  const platformMonthly = plan.monthly + platformExtra;
  const iaMonthly = activeModules.reduce((sum, module) => sum + module.monthly, 0);
  const monthly = platformMonthly + iaMonthly;

  const initialTax = oneTimeNet * IGV;
  const initialWithTax = oneTimeNet + initialTax;
  const contractWithoutTax = oneTimeNet + monthly * months;
  const contractWithTax = contractWithoutTax * (1 + IGV);

  return {
    newCameras,
    existingCameras,
    cameras,
    months,
    discountRate,
    discount,
    plan,
    activeModules,
    hardware,
    implementation,
    iaSetup,
    subtotalOneTime,
    oneTimeNet,
    platformMonthly,
    iaMonthly,
    monthly,
    initialTax,
    initialWithTax,
    contractWithoutTax,
    contractWithTax,
  };
}

function recommendationFor(result) {
  if (result.activeModules.length >= 7 || result.cameras >= 5) {
    return {
      badge: "Integral",
      title: "VisionPRO Obra Completa",
      text: "Adecuado para obras que necesitan seguridad, trazabilidad, productividad y reportes ejecutivos.",
    };
  }
  if (result.activeModules.some((module) => ["U01", "F04", "F03"].includes(module.id))) {
    return {
      badge: "Seguridad IA",
      title: result.plan.name,
      text: "Recomendado para obras que buscan evidencia, control visual, camara en vivo y gestion de riesgos.",
    };
  }
  if (result.activeModules.some((module) => ["U08", "U09", "U18"].includes(module.id))) {
    return {
      badge: "Productividad",
      title: result.plan.name,
      text: "Recomendado para obras que necesitan medir flujos, tiempos, mixers o aprovechamiento operativo.",
    };
  }
  return {
    badge: "Trazabilidad",
    title: result.plan.name,
    text: "Ideal para comenzar con camara en vivo, trazabilidad visual y timelapse configurable.",
  };
}

function renderModules() {
  const grid = $("#moduleGrid");
  grid.innerHTML = modules
    .map(
      (module) => `
        <button class="module-card ${state.activeModules.has(module.id) ? "active" : ""}" type="button" data-module="${module.id}">
          <strong>${module.name}</strong>
          <p>${module.description}</p>
          <div class="module-meta">
            <span>${module.focus}</span>
            <span>${money(module.setup)} + ${money(module.monthly)}/mes</span>
          </div>
        </button>
      `,
    )
    .join("");

  $$(".module-card").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.module;
      if (state.activeModules.has(id)) state.activeModules.delete(id);
      else state.activeModules.add(id);
      renderModules();
      update();
    });
  });
}

function renderScope(result) {
  const baseItems = [
    ["Camara en vivo", `Visualizacion live para ${result.cameras || 1} camara(s) desde plataforma VisionPRO.`],
    ["Trazabilidad visual", "Registro de evidencias, avance e historial visual de obra."],
    ["Dashboard de obra", `Plan recomendado: ${result.plan.name}. Incluye nube, soporte y continuidad operativa.`],
  ];

  const moduleItems = result.activeModules.map((module) => [module.shortName, module.scope]);
  const items = [...baseItems, ...moduleItems];

  $("#scopeList").innerHTML = items
    .map(
      ([title, body]) => `
        <li>
          <strong>${title}</strong>
          <span>${body}</span>
        </li>
      `,
    )
    .join("");
}

function update() {
  const result = calculate();
  const rec = recommendationFor(result);

  $("#newCamerasLabel").textContent = fields.newCameras.value;
  $("#existingCamerasLabel").textContent = fields.existingCameras.value;
  $("#monthsLabel").textContent = fields.months.value;
  $("#discountLabel").textContent = fields.discount.value;

  $("#recommendedPlan").textContent = rec.title;
  $("#fitBadge").textContent = rec.badge;
  $("#recommendationText").textContent = rec.text;

  $("#hardwareTotal").textContent = money(result.hardware);
  $("#implementationTotal").textContent = money(result.implementation);
  $("#iaSetupTotal").textContent = money(result.iaSetup);
  $("#platformMonthly").textContent = money(result.platformMonthly);
  $("#iaMonthlyTotal").textContent = money(result.iaMonthly);
  $("#monthlyTotal").textContent = money(result.monthly);
  $("#initialWithTax").textContent = money(result.initialWithTax);
  $("#contractWithTax").textContent = money(result.contractWithTax);

  $("#heroPlan").textContent = result.plan.name;
  $("#heroInitial").textContent = money(result.initialWithTax);
  $("#heroMonthly").textContent = money(result.monthly);
  $("#heroContract").textContent = money(result.contractWithTax);

  renderScope(result);
}

function applyPreset(name) {
  const preset = presets[name];
  if (!preset) return;

  fields.clientName.value = preset.client || "";
  fields.projectName.value = preset.project;
  fields.newCameras.value = preset.newCameras;
  fields.existingCameras.value = preset.existingCameras;
  fields.months.value = preset.months;
  fields.discount.value = preset.discount;
  fields.edgeKit.checked = preset.edgeKit;
  fields.implementation.checked = preset.implementation;
  state.activeModules = new Set(preset.modules);

  $$(".preset").forEach((button) => button.classList.toggle("active", button.dataset.preset === name));
  renderModules();
  update();
}

function quoteHtml(result) {
  const client = fields.clientName.value || "Cliente";
  const project = fields.projectName.value || "Proyecto";
  const rows = [
    ["Equipos VisionPRO", "Camaras, edge AI, NVR/red segun configuracion", money(result.hardware)],
    ["Implementacion", "Instalacion, configuracion, QA y soporte inicial", money(result.implementation)],
    ["Activacion IA", result.activeModules.map((module) => module.shortName).join(", ") || "Sin modulos IA", money(result.iaSetup)],
    ["Mensualidad plataforma", result.plan.name, `${money(result.platformMonthly)} / mes`],
    ["Mensualidad IA", result.activeModules.length ? "Operacion de modulos IA activos" : "Sin mensualidad IA", `${money(result.iaMonthly)} / mes`],
  ];

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Cotizacion VisionPRO - ${client} - ${project}</title>
  <style>
    body{font-family:Arial,sans-serif;margin:0;background:#f4f7ff;color:#0a244c}
    .page{max-width:920px;margin:32px auto;background:#fff;border:1px solid #dce5f2;padding:34px}
    h1{margin:0 0 8px;font-size:30px}.meta{color:#64748b;margin-bottom:26px}
    table{width:100%;border-collapse:collapse;margin:22px 0}th{background:#0a244c;color:#fff;text-align:left}
    th,td{border:1px solid #dce5f2;padding:12px;vertical-align:top}
    .total{background:#ecfdf5;font-weight:700}.note{font-size:13px;color:#64748b;line-height:1.5}
  </style>
</head>
<body>
  <div class="page">
    <h1>Cotizacion referencial VisionPRO</h1>
    <div class="meta">Cliente: ${client} | Proyecto: ${project} | Duracion: ${result.months} meses | IGV: 18%</div>
    <table>
      <thead><tr><th>Partida</th><th>Detalle</th><th>Importe</th></tr></thead>
      <tbody>
        ${rows.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join("")}
        <tr class="total"><td>Total inicial con IGV</td><td>One-time neto + IGV</td><td>${money(result.initialWithTax)}</td></tr>
        <tr class="total"><td>Total contrato con IGV</td><td>One-time + ${result.months} mensualidades + IGV</td><td>${money(result.contractWithTax)}</td></tr>
      </tbody>
    </table>
    <h2>Alcance incluido</h2>
    <ul>
      <li>Camara en vivo y dashboard VisionPRO.</li>
      <li>Trazabilidad visual de obra e historial de evidencias.</li>
      ${result.activeModules.map((module) => `<li>${module.name}: ${module.scope}</li>`).join("")}
    </ul>
    <p class="note">Cotizacion referencial sujeta a validacion tecnica de conectividad, energia, ubicacion de camaras, compatibilidad RTSP/ONVIF y condiciones finales de obra.</p>
  </div>
</body>
</html>`;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadQuote() {
  const result = calculate();
  const client = (fields.clientName.value || "cliente").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  const project = (fields.projectName.value || "proyecto").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  downloadFile(`VisionPRO-Cotizacion-${client}-${project}.html`, quoteHtml(result), "text/html;charset=utf-8");
}

function downloadConfig() {
  const result = calculate();
  const rows = [
    ["Campo", "Valor"],
    ["Cliente", fields.clientName.value],
    ["Proyecto", fields.projectName.value],
    ["Camaras nuevas", result.newCameras],
    ["Camaras existentes", result.existingCameras],
    ["Duracion meses", result.months],
    ["Plan recomendado", result.plan.name],
    ["Modulos IA", result.activeModules.map((module) => module.name).join(" | ")],
    ["Total inicial con IGV", Math.round(result.initialWithTax)],
    ["Mensualidad", Math.round(result.monthly)],
    ["Total contrato con IGV", Math.round(result.contractWithTax)],
  ];
  downloadFile("VisionPRO-configuracion.csv", rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n"), "text/csv;charset=utf-8");
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((element) => observer.observe(element));
}

Object.values(fields).forEach((field) => field.addEventListener("input", update));
Object.values(fields).forEach((field) => field.addEventListener("change", update));

$$(".preset").forEach((button) => button.addEventListener("click", () => applyPreset(button.dataset.preset)));
$("#heroPreset").addEventListener("click", () => {
  applyPreset("ascent");
  document.querySelector("#cotizador").scrollIntoView({ behavior: "smooth", block: "start" });
});
$("#clearModules").addEventListener("click", () => {
  state.activeModules.clear();
  renderModules();
  update();
});
$("#downloadQuote").addEventListener("click", downloadQuote);
$("#downloadConfig").addEventListener("click", downloadConfig);

renderModules();
update();
initReveal();

window.__visionproCalculator = {
  calculate,
  quoteHtml,
};
