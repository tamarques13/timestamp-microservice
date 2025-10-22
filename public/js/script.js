const clock = document.getElementById('clock');
const dateInput = document.getElementById('dateInput');
const fetchBtnUnix = document.getElementById('fetchBtnUnix');
const fetchBtnUTC = document.getElementById('fetchBtnUTC');
const resultDiv = document.getElementById('result');
const inputModes = document.querySelectorAll('input[name="inputMode"]');

let clockInterval = null;

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  if (clock) clock.textContent = `${h}:${m}:${s}`;
}

function startClock() {
  updateClock();
  if (clockInterval) clearInterval(clockInterval);
  clockInterval = setInterval(updateClock, 1000);
}

function stopClock() {
  if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
  }
}

startClock();

async function fetchTimestamp(dateParam = '', btnType) {
  const url = dateParam ? `/api/${encodeURIComponent(dateParam)}/date` : `/api/`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
      return;
    }

    if (btnType === 'Unix') {
      resultDiv.innerHTML = `<p><strong>Unix:</strong> ${data.unix}</p>`;
    } else if (btnType === 'UTC') {
      resultDiv.innerHTML = `<p><strong>UTC:</strong> ${data.utc}</p>`;
    } else {
      resultDiv.innerHTML = `
        <p><strong>Unix:</strong> ${data.unix}</p>
        <p><strong>UTC:</strong> ${data.utc}</p>
      `;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p class="error">Error fetching data.</p>`;
    console.error(err);
  }
}

fetchBtnUnix.addEventListener('click', () => {
  const selectedMode = document.querySelector('input[name="inputMode"]:checked').value;
  if (selectedMode === 'clock') {
    fetchTimestamp(new Date().toISOString(), 'Unix');
  } else {
    fetchTimestamp(dateInput.value.trim(), 'Unix');
  }
});

fetchBtnUTC.addEventListener('click', () => {
  const selectedMode = document.querySelector('input[name="inputMode"]:checked').value;
  if (selectedMode === 'clock') {
    fetchTimestamp(new Date().toISOString(), 'UTC');
  } else {
    fetchTimestamp(dateInput.value.trim(), 'UTC');
  }
});
