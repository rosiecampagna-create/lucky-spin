const symbols = ["🍒", "🍋", "🔔", "7️⃣"];
let credits = 100;

const DAILY_BONUS_AMOUNT = 25;
const BONUS_KEY = "lastDailyBonus";

const creditDisplay = document.getElementById("credits");
const message = document.getElementById("message");

function updateCredits() {
  creditDisplay.textContent = credits;
}

function spin() {
  if (credits <= 0) {
    message.textContent = "Out of credits!";
    return;
  }

  credits--;
  updateCredits();

  const r1 = spinReel("reel1");
  const r2 = spinReel("reel2");
  const r3 = spinReel("reel3");

  setTimeout(() => {
    if (r1 === r2 && r2 === r3) {
      credits += 20;
      message.textContent = "🎉 JACKPOT!";
    } else if (r1 === r2 || r2 === r3) {
      credits += 5;
      message.textContent = "Nice win!";
    } else {
      message.textContent = "So close...";
    }
    updateCredits();
  }, 500);
}

function spinReel(id) {
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  document.getElementById(id).textContent = symbol;
  return symbol;
}

document.getElementById("spinBtn").addEventListener("click", spin);

// DAILY BONUS
function checkDailyBonus() {
  const lastBonus = localStorage.getItem(BONUS_KEY);
  const now = Date.now();

  if (!lastBonus || now - lastBonus > 86400000) {
    credits += DAILY_BONUS_AMOUNT;
    localStorage.setItem(BONUS_KEY, now);
    message.textContent = `🎁 Daily Bonus! +${DAILY_BONUS_AMOUNT} credits`;
    updateCredits();
    document.getElementById("dailyBonus").textContent = "Bonus claimed today ✔";
  } else {
    const hoursLeft = Math.ceil((86400000 - (now - lastBonus)) / 3600000);
    document.getElementById("dailyBonus").textContent =
      `Next daily bonus in ${hoursLeft}h`;
  }
}

// MONETIZATION HOOKS
function watchAd() {
  credits += 5;
  message.textContent = "You received bonus spins!";
  updateCredits();
}

function buyCoins() {
  credits += 50;
  message.textContent = "Purchase successful! +50 credits";
  updateCredits();
}

// START GAME
checkDailyBonus();
updateCredits();

