let workTime = .2 * 60;
let shortBreak = .1 * 60;
let currentTime = workTime;
let work = true;
let latestSecond = null;
let intervalId = null;

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const timer = document.getElementById("timer");
const tab = document.getElementById("tab");

displayTimer();

function startTimer()
{
	const startTime = Date.now();
	latestSecond = Math.floor(startTime / 1000);
	if (!intervalId)
		intervalId = setInterval(() => updateTimer(startTime), 100);
}

function displayTimer()
{
	timer.innerText = parseTime(currentTime);
}

function updateTimer(startTime)
{
	if (currentTime < 0)
	{
		if (work)
		{
			currentTime = shortBreak;
			work = !work;
			switchTab("tab-short");
		}
		else
		{
			currentTime = workTime;
			work = !work
			switchTab("tab-pomo");
		}
	}
	const now = Date.now();
	if (latestSecond != Math.floor(now / 1000))
	{
		timer.innerText = parseTime(currentTime);
		latestSecond = Math.floor(now / 1000);
		currentTime--;
	}
}

function parseTime(time)
{
	const min = Math.floor(time / 60);
	const sec = Math.floor(time % 60);
	return (`${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec: sec}`);
}

function switchTab(tabId)
{
	let elements = Array.from(document.getElementsByClassName("tab-btn"));

	elements.map(btn => {
		if (btn.id === tabId)
		{
			btn.classList.add("active");
		}
		else
		{
			btn.classList.remove("active");
		}
	})
}

function pauseTimer()
{
	clearInterval(intervalId);
	intervalId = null;
}

function resetTimer(tabId)
{
	if (!intervalId)
	{
		pauseTimer();
	}
	if (tabId === "tab-pomo")
	{
		currentTime = workTime;
		work = true;
	}
	else if (tabId === "tab-short")
	{
		currentTime = shortBreak;
		work = false;
	}
	displayTimer();
}

tab.addEventListener("click", e => {
	if (e.target.id != "tab")
	{
		let elements = Array.from(document.getElementsByClassName("tab-btn"))
		elements.map(btn => {
			if (btn.id != e.target.id)
			{
				btn.classList.remove("active");
			}
			else
			{
				btn.classList.add("active");
				resetTimer(btn.id);
			}
		})
	}
})

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", pauseTimer);
