import { initShell, VEHICLES, DEALER, esc, money, miles, vehicleImg, vehicleName, url, type Vehicle } from "./shared";

initShell("contact");

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const form = $<HTMLFormElement>("form");
const name = $<HTMLInputElement>("name");
const email = $<HTMLInputElement>("email");
const phone = $<HTMLInputElement>("phone");
const topic = $<HTMLSelectElement>("topic");
const message = $<HTMLTextAreaElement>("message");
const handoff = $<HTMLDivElement>("handoff");
const vehicleBox = $<HTMLDivElement>("vehicleBox");

let vehicle: Vehicle | undefined;
const params = new URLSearchParams(location.search);
const vid = Number(params.get("vehicle"));
vehicle = VEHICLES.find((v) => v.id === vid);

function renderVehicle() {
  if (!vehicle) { vehicleBox.hidden = true; vehicleBox.innerHTML = ""; return; }
  vehicleBox.hidden = false;
  vehicleBox.innerHTML = `<div class="vehicle-pick" data-testid="card-inquiry-vehicle">
    <img src="${vehicleImg(vehicle)}" alt="">
    <div style="flex:1"><div class="car-year">ASKING ABOUT</div><b>${esc(vehicleName(vehicle))}</b><div class="help">${money(vehicle.price)} · ${miles(vehicle.miles)} · ${esc(vehicle.color)}</div></div>
    <button class="btn btn-ghost btn-sm" type="button" id="removeVehicle" data-testid="button-remove-vehicle">Remove</button>
  </div>`;
  $("removeVehicle").addEventListener("click", () => {
    vehicle = undefined;
    if (topic.value === "Specific vehicle") topic.value = "General question";
    const u = new URL(location.href); u.searchParams.delete("vehicle"); history.replaceState(null, "", u);
    renderVehicle();
  });
}

if (vehicle) {
  topic.value = "Specific vehicle";
  message.value = `Hi, I'm interested in the ${vehicleName(vehicle)} (${vehicle.color}, ${miles(vehicle.miles)}, listed at ${money(vehicle.price)}). Is it still available, and when could I come see it?`;
}
const t = params.get("topic");
if (!vehicle && t && [...topic.options].some((o) => o.value === t)) topic.value = t;
renderVehicle();

const updateCount = () => ($("msgCount").textContent = `${message.value.length} / 1000`);
message.addEventListener("input", updateCount);
updateCount();

function setErr(el: HTMLInputElement | HTMLTextAreaElement, msg: string) {
  $(`${el.id}-err`).textContent = msg;
  el.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}
function validate() {
  const a = setErr(name, name.value.trim() ? "" : "Please add your name.");
  const b = setErr(email, !email.value.trim() ? "Please add your email." : email.validity.valid ? "" : "That email address doesn't look complete.");
  const c = setErr(message, message.value.trim() ? "" : "Please write a short message.");
  return a && b && c;
}
[name, email, message].forEach((el) => el.addEventListener("input", () => { if (el.getAttribute("aria-invalid") === "true") validate(); }));

let body = "";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validate()) { form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); return; }
  const subject = vehicle ? `Inquiry: ${vehicleName(vehicle)}` : `Website inquiry: ${topic.value}`;
  body = [
    message.value.trim(), "",
    "—",
    `Name: ${name.value.trim()}`,
    `Email: ${email.value.trim()}`,
    phone.value.trim() ? `Phone: ${phone.value.trim()}` : "",
    `Topic: ${topic.value}`,
    vehicle ? `Vehicle: ${vehicleName(vehicle)} · Stock #${String(vehicle.id).padStart(3, "0")} · ${money(vehicle.price)}` : "",
    vehicle ? `Listing: ${location.origin}${url(`vehicles.html?vehicle=${vehicle.id}`)}` : "",
  ].filter((l, i, arr) => l !== "" || arr[i - 1] !== "").join("\n").trim();
  $<HTMLAnchorElement>("mailtoLink").href = `mailto:${DEALER.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $("preview").textContent = `To: ${DEALER.email}\nSubject: ${subject}\n\n${body}`;
  $("toAddr").textContent = DEALER.email;
  $("copyStatus").textContent = "";
  form.hidden = true;
  handoff.classList.add("show");
  handoff.focus();
});

$("editBtn").addEventListener("click", () => {
  handoff.classList.remove("show");
  form.hidden = false;
  message.focus();
});

$("copyBtn").addEventListener("click", async () => {
  const text = $("preview").textContent ?? "";
  try {
    await navigator.clipboard.writeText(text);
    $("copyStatus").textContent = "Copied. Paste it into a new email to send.";
  } catch {
    const r = document.createRange(); r.selectNodeContents($("preview"));
    const s = getSelection(); s?.removeAllRanges(); s?.addRange(r);
    $("copyStatus").textContent = "Couldn't copy automatically. The text is selected, press Ctrl/Cmd+C.";
  }
});
