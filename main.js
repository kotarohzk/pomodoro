let workTime = 25 * 60;
let shortBreak = 10 * 60;
let currentTime = workTime;
let work = true;
let latestSecond = null;
let intervalId = null;

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const timer = document.getElementById("timer");
const tab = document.getElementById("tab");
const inputArea = document.getElementById("input-area");

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
	if (intervalId)
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

inputArea.addEventListener("click", () => {
	document.getElementById("task-input").classList.remove("hidden");
	inputArea.classList.add("hidden");
})

document.getElementById("cancel-btn").addEventListener("click", () => {
	document.getElementById("task-input").classList.add("hidden");
	document.getElementById("input-value").value = "";
	inputArea.classList.remove("hidden");
})

// document.getElementById("checkbox").addEventListener("click", e => {
// 	if (e.target.dataset.checked === "true")
// 	{
// 		e.target.src = "assets/check-mark-circle-line-icon.svg";
// 		e.target.dataset.checked = "false";
// 	}
// 	else if (e.target.dataset.checked === "false")
// 	{
// 		e.target.src = "assets/check-mark-circle-icon.svg";
// 		e.target.dataset.checked = "true";	
// 	}
// })

{/* <div class="task">
<button class="check-btn">
	<img class="checkbox" data-checked="false" src="assets/check-mark-circle-line-icon.svg" alt="svg image of check mark">
</button>
<div class="task-decsc">Take the dogs out for a walk I like day6 songs they are so good</div>
</div> */}

function createToDoItem(task) {
	const newDiv = document.createElement("div");
	newDiv.classList.add("task");
	const newBtn = document.createElement("button");
	newBtn.classList.add("check-btn");
	const newImg = document.createElement("img");
	newImg.src = "assets/check-mark-circle-line-icon.svg";
	newImg.classList.add("checkbox");
	newImg.dataset.checked = "false";
	const taskDiv = document.createElement("div");
	const newTextNode = document.createTextNode(task);
	taskDiv.classList.add("task-desc");

	taskDiv.appendChild(newTextNode);
	newBtn.appendChild(newImg);
	newDiv.appendChild(newBtn);
	newDiv.appendChild(taskDiv);

	return (newDiv);
}

document.getElementById("task-lists").addEventListener("click", e => {
	const classArray = Array.from(e.target.classList);
	console.log(classArray);
	if (classArray.includes("checkbox"))
	{
		if (e.target.dataset.checked === "true")
		{
			e.target.src = "assets/check-mark-circle-line-icon.svg";
			e.target.dataset.checked = "false";
		}
		else if (e.target.dataset.checked === "false")
		{
			e.target.src = "assets/check-mark-circle-icon.svg";
			e.target.dataset.checked = "true";	
		}
	}
})

document.getElementById("save-btn").addEventListener("click", () => {
	if (document.getElementById("input-value").value)
	{
		document.getElementById("task-lists").appendChild(createToDoItem(document.getElementById("input-value").value));
	}
})

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", pauseTimer);