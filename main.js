// === Fake databáze akcí ===
const events = Array.from({ length: 20 }, (_, i) => `Akce ${i + 1}`);

// === Generátor 50–60 náhodných vstupenek ===
const ticketDatabase = [];
const names = ["Novák", "Svoboda", "Novotná", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Krejčí"];
const firstNames = ["Jan", "Petr", "Eva", "Lucie", "Martin", "Anna", "Tomáš", "Marie", "Josef", "Veronika"];

for (let i = 0; i < 55; i++) {
  ticketDatabase.push({
    number: String(1000 + i),
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${names[Math.floor(Math.random() * names.length)]}`,
    event: events[Math.floor(Math.random() * events.length)],
    used: false
  });
}

// === Povolené přístupové kódy ===
const validCodes = ["4435", "9100", "8278"];

let currentUser = "";

function login() {
  const code = document.getElementById("username").value.trim();
  if (validCodes.includes(code)) {
    currentUser = code;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("operatorName").textContent = `Obsluha: ${code}`;
  } else {
    alert("Neplatný přístupový kód.");
  }
}

function logout() {
  location.reload();
}

function checkTicket() {
  const input = document.getElementById("ticketInput").value.trim();
  const ticket = ticketDatabase.find(t => t.number === input);

  if (!ticket) {
    alert("Vstupenka nenalezena.");
    hideTicketInfo();
    return;
  }

  document.getElementById("ticketInfo").classList.remove("hidden");
  document.getElementById("eventName").textContent = ticket.event;
  document.getElementById("ticketName").textContent = ticket.name;
  document.getElementById("ticketStatus").textContent = ticket.used ? "JIŽ ODBAVENA" : "PLATNÁ";
  document.getElementById("confirmBtn").disabled = ticket.used;
  document.getElementById("confirmBtn").dataset.ticketNumber = ticket.number;
}

function confirmTicket() {
  const number = document.getElementById("confirmBtn").dataset.ticketNumber;
  const ticket = ticketDatabase.find(t => t.number === number);
  if (!ticket || ticket.used) return;

  ticket.used = true;
  const now = new Date().toLocaleString();
  const msg = `✅ ${ticket.name} (${ticket.number}) – ${ticket.event} @ ${now}`;
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("historyList").prepend(li);

  checkTicket(); // aktualizuj stav
}

function hideTicketInfo() {
  document.getElementById("ticketInfo").classList.add("hidden");
}
