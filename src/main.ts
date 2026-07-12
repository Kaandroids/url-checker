import { Debouncer } from "./utils/debouncer.js";

function requireEl<T extends HTMLElement>(selector: string): T{
    const el = document.querySelector<T>(selector);
    if(!el) throw new Error(`Element not found ${selector}`);
    return el
};

const urlInputEl = requireEl<HTMLInputElement>("#url-input");
const statusEl = requireEl<HTMLElement>("#status");
let url: string;

// TODO implement logic 
const apiRequestDebouncer = new Debouncer(() => {
    console.log("test debouncer.ts");
}, 500);

urlInputEl.addEventListener("input", () => {
    url = urlInputEl.value;
    statusEl.textContent = url;
    apiRequestDebouncer.runTimer();
});