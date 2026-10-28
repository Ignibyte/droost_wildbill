import { initShell, VEHICLES, carCard } from "./shared";

initShell("home");
const featured = document.getElementById("featured");
if (featured) featured.innerHTML = VEHICLES.filter((v) => v.featured).map((v, i) => carCard(v, i)).join("");
