import { initShell, HOURS, DEALER, fmtHour, openStatus } from "./shared";

initShell("location");

const addr = encodeURIComponent(`${DEALER.street}, ${DEALER.city}`);
(document.getElementById("gmaps") as HTMLAnchorElement).href = `https://www.google.com/maps/search/?api=1&query=${addr}`;
(document.getElementById("amaps") as HTMLAnchorElement).href = `https://maps.apple.com/?q=${addr}`;

const today = new Date().getDay();
const order = [1, 2, 3, 4, 5, 6, 0];
const list = document.getElementById("hoursList")!;
list.innerHTML = order.map((i) => {
  const h = HOURS[i];
  const time = h.open !== null && h.close !== null ? `${fmtHour(h.open)} – ${fmtHour(h.close)}` : "Closed";
  return `<li class="${i === today ? "today" : ""}"${i === today ? ' aria-current="date"' : ""}><span>${h.day}${i === today ? " · today" : ""}</span><span>${time}</span></li>`;
}).join("");

const s = openStatus();
document.getElementById("status")!.innerHTML = `<span class="dot${s.open ? " on" : ""}"></span><span>${s.text}</span>`;
