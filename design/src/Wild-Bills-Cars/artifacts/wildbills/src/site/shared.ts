import "./site.css";

export const BASE = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
export const url = (p: string) => `${BASE}${p.replace(/^\//, "")}`;
export const img = (name: string) => url(`images/${name}`);

/* Sample/placeholder dealership details carried over from the original site. */
export const DEALER = {
  name: "Wild Bill's Used Cars",
  phoneDisplay: "(555) 123-4567",
  phoneHref: "tel:+15551234567",
  email: "wildbill@wildbillscars.com",
  street: "123 Dusty Creek Rd",
  city: "Dusty Creek, TX 78701",
};

export type Hours = { day: string; open: number | null; close: number | null };
export const HOURS: Hours[] = [
  { day: "Sunday", open: null, close: null },
  { day: "Monday", open: 8, close: 19 },
  { day: "Tuesday", open: 8, close: 19 },
  { day: "Wednesday", open: 8, close: 19 },
  { day: "Thursday", open: 8, close: 19 },
  { day: "Friday", open: 8, close: 19 },
  { day: "Saturday", open: 9, close: 18 },
];
export const fmtHour = (h: number) => `${h > 12 ? h - 12 : h}:00${h >= 12 ? "pm" : "am"}`;

export type VehicleType = "Truck" | "SUV" | "Car";
export type Vehicle = {
  id: number; make: string; model: string; year: number; price: number; type: VehicleType;
  miles: number; color: string; cond: "Excellent" | "Good" | "Fair"; featured: boolean;
};

/* Sample inventory reused from the original site. Not live stock. */
export const VEHICLES: Vehicle[] = [
  { id: 1, make: "Ford", model: "F-150", year: 2021, price: 38900, type: "Truck", miles: 42000, color: "Magnetic Gray", cond: "Excellent", featured: true },
  { id: 2, make: "Chevrolet", model: "Tahoe", year: 2020, price: 42500, type: "SUV", miles: 55000, color: "Shadow Gray", cond: "Good", featured: true },
  { id: 3, make: "RAM", model: "1500", year: 2022, price: 47200, type: "Truck", miles: 18500, color: "Diamond Black", cond: "Excellent", featured: true },
  { id: 4, make: "Jeep", model: "Wrangler", year: 2021, price: 44800, type: "SUV", miles: 31000, color: "Firecracker Red", cond: "Excellent", featured: true },
  { id: 5, make: "Toyota", model: "Tundra", year: 2020, price: 39500, type: "Truck", miles: 48000, color: "Barcelona Red", cond: "Good", featured: false },
  { id: 6, make: "GMC", model: "Sierra 1500", year: 2021, price: 41000, type: "Truck", miles: 35000, color: "Onyx Black", cond: "Excellent", featured: false },
  { id: 7, make: "Ford", model: "Explorer", year: 2020, price: 32900, type: "SUV", miles: 61000, color: "Star White", cond: "Good", featured: false },
  { id: 8, make: "Chevrolet", model: "Silverado 1500", year: 2019, price: 28500, type: "Truck", miles: 72000, color: "Summit White", cond: "Fair", featured: false },
  { id: 9, make: "Toyota", model: "4Runner", year: 2021, price: 43900, type: "SUV", miles: 29000, color: "Army Green", cond: "Excellent", featured: false },
  { id: 10, make: "Dodge", model: "Challenger", year: 2020, price: 36800, type: "Car", miles: 22000, color: "Hellraisin Purple", cond: "Excellent", featured: false },
  { id: 11, make: "Ford", model: "Mustang GT", year: 2021, price: 34500, type: "Car", miles: 18000, color: "Race Red", cond: "Excellent", featured: false },
  { id: 12, make: "Jeep", model: "Grand Cherokee", year: 2020, price: 38200, type: "SUV", miles: 44000, color: "Brilliant Black", cond: "Good", featured: false },
  { id: 13, make: "GMC", model: "Yukon XL", year: 2022, price: 58000, type: "SUV", miles: 12000, color: "White Frost", cond: "Excellent", featured: false },
  { id: 14, make: "Chevrolet", model: "Colorado", year: 2021, price: 31000, type: "Truck", miles: 39000, color: "Northsky Blue", cond: "Good", featured: false },
  { id: 15, make: "RAM", model: "2500 Laramie", year: 2020, price: 53400, type: "Truck", miles: 47000, color: "Granite Crystal", cond: "Good", featured: false },
];
export const vehicleImg = (v: Vehicle) => img(`v${v.id}.jpg`);
export const vehicleName = (v: Vehicle) => `${v.year} ${v.make} ${v.model}`;
export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
export const miles = (n: number) => `${n.toLocaleString("en-US")} mi`;

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

const path = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const ICON = {
  arrow: path('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  phone: path('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
  menu: path('<path d="M4 7h16M4 12h16M4 17h10"/>'),
  close: path('<path d="M6 6l12 12M18 6L6 18"/>'),
  gauge: path('<path d="M12 14l4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>'),
  palette: path('<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/>'),
  car: path('<path d="M5 17h14M5 17a2 2 0 1 1-4 0v-4l2.5-6h17L23 13v4a2 2 0 1 1-4 0"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>'),
  check: path('<path d="M20 6L9 17l-5-5"/>'),
  info: path('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
  search: path('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
  sliders: path('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
  mail: path('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  pin: path('<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>'),
  clock: path('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  copy: path('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>'),
};

const NAV = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "vehicles.html", label: "Inventory", key: "vehicles" },
  { href: "contact.html", label: "Contact", key: "contact" },
  { href: "location.html", label: "Visit", key: "location" },
];

function brand() {
  return `<a class="brand" href="${url("")}" aria-label="Wild Bill's Used Cars, home"><span class="brand-mark" aria-hidden="true">WB</span><span class="brand-name">Wild Bill's<small>Used Cars</small></span></a>`;
}

export function initShell(page: string) {
  document.documentElement.classList.remove("no-js");
  const homeHref = (n: (typeof NAV)[number]) => (n.key === "home" ? url("") : url(n.href));
  const cur = (k: string) => (k === page ? ' aria-current="page"' : "");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="demo-bar"><strong>Demo site.</strong> Inventory, phone, email, address and hours shown here are sample information, not a live dealership listing.</div>
    <div class="wrap nav">
      ${brand()}
      <nav aria-label="Primary"><ul class="nav-links">${NAV.map((n) => `<li><a href="${homeHref(n)}"${cur(n.key)}>${n.label}</a></li>`).join("")}</ul></nav>
      <div class="nav-cta">
        <a class="btn btn-ink btn-sm" href="${url("vehicles.html")}">Browse cars ${ICON.arrow}</a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">${ICON.menu}</button>
      </div>
    </div>
    <nav class="mobile-nav wrap" id="mobile-nav" aria-label="Mobile">
      ${NAV.map((n) => `<a href="${homeHref(n)}"${cur(n.key)}>${n.label} ${ICON.arrow.replace("<svg", '<svg width="22" height="22"')}</a>`).join("")}
      <a class="btn btn-primary" href="${DEALER.phoneHref}" style="font-family:var(--body);font-size:1rem;border:0">${ICON.phone} Call ${DEALER.phoneDisplay} (sample)</a>
    </nav>`;
  const skip = document.createElement("a");
  skip.className = "skip"; skip.href = "#main"; skip.textContent = "Skip to content";
  document.body.prepend(header);
  document.body.prepend(skip);

  const btn = header.querySelector<HTMLButtonElement>(".menu-btn")!;
  const setOpen = (o: boolean) => {
    header.classList.toggle("open", o);
    btn.setAttribute("aria-expanded", String(o));
    btn.setAttribute("aria-label", o ? "Close menu" : "Open menu");
    btn.innerHTML = o ? ICON.close : ICON.menu;
  };
  btn.addEventListener("click", () => setOpen(!header.classList.contains("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && header.classList.contains("open")) { setOpen(false); btn.focus(); } });
  window.addEventListener("resize", () => { if (window.innerWidth > 860) setOpen(false); });

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap footer-top">
      <div>${brand()}<p style="margin-top:1.2rem;max-width:22rem">An independent used-car lot. Look at the car, ask your questions, decide in your own time.</p></div>
      <div><h4>Pages</h4><ul>${NAV.map((n) => `<li><a href="${homeHref(n)}">${n.label === "Visit" ? "Location &amp; hours" : n.label}</a></li>`).join("")}</ul></div>
      <div><h4>Hours (sample)</h4><ul><li>Mon–Fri 8am–7pm</li><li>Saturday 9am–6pm</li><li>Sunday closed</li></ul></div>
      <div><h4>Contact (sample)</h4><ul><li><a href="${DEALER.phoneHref}">${DEALER.phoneDisplay}</a></li><li><a href="mailto:${DEALER.email}">${DEALER.email}</a></li><li>${DEALER.street}<br>${DEALER.city}</li></ul></div>
    </div>
    <div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Wild Bill's Used Cars · Demonstration website</span><span>Vehicle photos are illustrative. Contact details are placeholders.</span></div>`;
  document.body.append(footer);

  initReveal();
}

export function initReveal(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>(".reveal:not(.in)");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((e) => e.classList.add("in")); return;
  }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach((e) => io.observe(e));
}

export function carCard(v: Vehicle, i = 0, opts: { detail?: boolean } = {}) {
  const name = esc(vehicleName(v));
  const detailBtn = opts.detail
    ? `<button class="btn btn-ghost btn-sm" type="button" data-detail="${v.id}" aria-label="View details for ${name}" data-testid="button-details-${v.id}">Details</button>`
    : `<a class="btn btn-ghost btn-sm" href="${url(`vehicles.html?vehicle=${v.id}`)}" aria-label="View details for ${name}">Details</a>`;
  return `
  <article class="car appear" style="animation-delay:${Math.min(i, 10) * 45}ms" data-testid="card-vehicle-${v.id}">
    <div class="car-media">
      <img src="${vehicleImg(v)}" alt="${name}, ${esc(v.color)}" loading="lazy" width="800" height="600">
      ${v.featured ? '<span class="chip chip-signal">Featured</span>' : `<span class="chip">${v.type}</span>`}
    </div>
    <div class="car-body">
      <div><div class="car-year">${v.year} · ${v.type.toUpperCase()}</div><h3 class="car-title">${esc(v.make)} ${esc(v.model)}</h3></div>
      <ul class="specs"><li>${ICON.gauge}${miles(v.miles)}</li><li>${ICON.palette}${esc(v.color)}</li></ul>
      <div class="car-foot">
        <div class="price">${money(v.price)}<small>Sample price</small></div>
        <div class="car-actions">${detailBtn}</div>
      </div>
    </div>
  </article>`;
}

export function openStatus(now = new Date()) {
  const d = now.getDay(), h = now.getHours() + now.getMinutes() / 60;
  const t = HOURS[d];
  if (t.open !== null && t.close !== null && h >= t.open && h < t.close) return { open: true, text: `Open now · closes ${fmtHour(t.close)}` };
  if (t.open !== null && h < t.open) return { open: false, text: `Closed · opens today at ${fmtHour(t.open)}` };
  for (let i = 1; i <= 7; i++) {
    const n = HOURS[(d + i) % 7];
    if (n.open !== null) return { open: false, text: `Closed · opens ${i === 1 ? "tomorrow" : n.day} at ${fmtHour(n.open)}` };
  }
  return { open: false, text: "Closed" };
}
