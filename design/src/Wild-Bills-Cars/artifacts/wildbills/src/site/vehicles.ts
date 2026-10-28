import { initShell, VEHICLES, carCard, ICON, DEALER, esc, money, miles, url, vehicleImg, vehicleName, type Vehicle } from "./shared";

initShell("vehicles");

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const q = $<HTMLInputElement>("q");
const make = $<HTMLSelectElement>("make");
const sort = $<HTMLSelectElement>("sort");
const maxPrice = $<HTMLInputElement>("maxPrice");
const minYear = $<HTMLInputElement>("minYear");
const maxMiles = $<HTMLInputElement>("maxMiles");
const typeSeg = $<HTMLDivElement>("typeSeg");
const grid = $<HTMLDivElement>("grid");
const empty = $<HTMLDivElement>("empty");
const count = $<HTMLParagraphElement>("count");
const chips = $<HTMLDivElement>("chips");
const filters = $<HTMLElement>("filters");
const filterToggle = $<HTMLButtonElement>("filterToggle");
const dialog = $<HTMLDialogElement>("detail");
const detailContent = $<HTMLDivElement>("detailContent");

const DEFAULTS = { maxPrice: "60000", minYear: "2019", maxMiles: "80000" };
let type = "";

[...new Set(VEHICLES.map((v) => v.make))].sort().forEach((m) => make.add(new Option(m, m)));

function setType(t: string) {
  type = t;
  typeSeg.querySelectorAll<HTMLButtonElement>("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.type === t)));
}

function reset() {
  q.value = ""; make.value = ""; sort.value = "featured";
  maxPrice.value = DEFAULTS.maxPrice; minYear.value = DEFAULTS.minYear; maxMiles.value = DEFAULTS.maxMiles;
  setType("");
  apply();
}

const sorters: Record<string, (a: Vehicle, b: Vehicle) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "year-desc": (a, b) => b.year - a.year || a.miles - b.miles,
  "miles-asc": (a, b) => a.miles - b.miles,
};

function apply() {
  const s = q.value.trim().toLowerCase();
  const mp = +maxPrice.value, my = +minYear.value, mm = +maxMiles.value;
  $("maxPriceOut").textContent = money(mp);
  $("minYearOut").textContent = `${my}+`;
  $("maxMilesOut").textContent = miles(mm);

  const list = VEHICLES.filter((v) =>
    (!s || `${v.year} ${v.make} ${v.model} ${v.color} ${v.type}`.toLowerCase().includes(s)) &&
    (!make.value || v.make === make.value) &&
    (!type || v.type === type) &&
    v.price <= mp && v.year >= my && v.miles <= mm,
  ).sort(sorters[sort.value] ?? sorters.featured);

  count.innerHTML = `${list.length} ${list.length === 1 ? "vehicle" : "vehicles"} <span>of ${VEHICLES.length}</span>`;
  grid.innerHTML = list.map((v, i) => carCard(v, i, { detail: true })).join("");
  empty.hidden = list.length > 0;
  grid.hidden = list.length === 0;

  const active: { label: string; clear: () => void }[] = [];
  if (s) active.push({ label: `“${q.value.trim()}”`, clear: () => (q.value = "") });
  if (type) active.push({ label: `${type}s`, clear: () => setType("") });
  if (make.value) active.push({ label: make.value, clear: () => (make.value = "") });
  if (maxPrice.value !== DEFAULTS.maxPrice) active.push({ label: `Under ${money(mp)}`, clear: () => (maxPrice.value = DEFAULTS.maxPrice) });
  if (minYear.value !== DEFAULTS.minYear) active.push({ label: `${my} or newer`, clear: () => (minYear.value = DEFAULTS.minYear) });
  if (maxMiles.value !== DEFAULTS.maxMiles) active.push({ label: `Under ${miles(mm)}`, clear: () => (maxMiles.value = DEFAULTS.maxMiles) });
  chips.innerHTML = "";
  active.forEach((a) => {
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `${esc(a.label)} ${ICON.close}`;
    b.setAttribute("aria-label", `Remove filter ${a.label}`);
    b.addEventListener("click", () => { a.clear(); apply(); });
    chips.append(b);
  });
  if (active.length > 1) {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = "Clear all"; b.style.background = "transparent"; b.style.textDecoration = "underline";
    b.addEventListener("click", reset);
    chips.append(b);
  }
}

let lastTrigger: HTMLElement | null = null;
function openDetail(id: number, trigger?: HTMLElement | null) {
  const v = VEHICLES.find((x) => x.id === id);
  if (!v) return;
  lastTrigger = trigger ?? null;
  const name = esc(vehicleName(v));
  detailContent.innerHTML = `
    <button class="close-btn" type="button" data-close aria-label="Close details" data-testid="button-close-detail">${ICON.close}</button>
    <div class="detail-grid">
      <div class="detail-media"><img src="${vehicleImg(v)}" alt="${name}, ${esc(v.color)}"></div>
      <div class="detail-body">
        <div><div class="car-year">${v.type.toUpperCase()} · STOCK #${String(v.id).padStart(3, "0")}</div><h2 id="detailTitle" style="margin-top:.4rem">${name}</h2></div>
        <div class="price" style="font-size:2.2rem">${money(v.price)}<small>Sample listed price</small></div>
        <dl class="spec-table">
          <div><dt>Mileage</dt><dd>${miles(v.miles)}</dd></div>
          <div><dt>Year</dt><dd>${v.year}</dd></div>
          <div><dt>Body style</dt><dd>${v.type}</dd></div>
          <div><dt>Color</dt><dd>${esc(v.color)}</dd></div>
          <div><dt>Make</dt><dd>${esc(v.make)}</dd></div>
          <div><dt>Condition</dt><dd>${v.cond}</dd></div>
        </dl>
        <p class="note">${ICON.info}<span>Sample listing for demonstration. Photo is illustrative. Confirm availability, history and final price with the dealership.</span></p>
        <div class="detail-actions">
          <a class="btn btn-primary" href="${url(`contact.html?vehicle=${v.id}`)}" data-testid="link-inquire-${v.id}">Ask about this car ${ICON.arrow}</a>
          <a class="btn btn-ghost" href="${DEALER.phoneHref}">${ICON.phone} Call (sample)</a>
        </div>
      </div>
    </div>`;
  if (!dialog.open) dialog.showModal();
  detailContent.querySelector<HTMLButtonElement>("[data-close]")?.focus();
  const u = new URL(location.href); u.searchParams.set("vehicle", String(id)); history.replaceState(null, "", u);
}

dialog.addEventListener("close", () => {
  const u = new URL(location.href); u.searchParams.delete("vehicle"); history.replaceState(null, "", u);
  lastTrigger?.focus();
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog || (e.target as HTMLElement).closest("[data-close]")) dialog.close();
});

grid.addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-detail]");
  if (b) openDetail(Number(b.dataset.detail), b);
});
typeSeg.addEventListener("click", (e) => {
  const b = (e.target as HTMLElement).closest<HTMLButtonElement>("button");
  if (b) { setType(b.dataset.type ?? ""); apply(); }
});
[q, maxPrice, minYear, maxMiles].forEach((el) => el.addEventListener("input", apply));
[make, sort].forEach((el) => el.addEventListener("change", apply));
$("resetSide").addEventListener("click", reset);
$("resetEmpty").addEventListener("click", reset);
filterToggle.addEventListener("click", () => {
  const o = !filters.classList.contains("open");
  filters.classList.toggle("open", o);
  filterToggle.setAttribute("aria-expanded", String(o));
  filterToggle.textContent = o ? "Hide filters" : "Filters";
});

// init from URL
const params = new URLSearchParams(location.search);
maxPrice.value = DEFAULTS.maxPrice; minYear.value = DEFAULTS.minYear; maxMiles.value = DEFAULTS.maxMiles;
const t = params.get("type");
if (t && ["Truck", "SUV", "Car"].includes(t)) setType(t);
apply();
const vid = Number(params.get("vehicle"));
if (vid) openDetail(vid);
