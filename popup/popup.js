const addBtn = document.getElementById("add-btn");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const showTimer = document.getElementById("timer-count");
const wisher = document.getElementById("wish");

addBtn.addEventListener("click",addTaskRow);
startBtn.addEventListener("click",startTimer);
stopBtn.addEventListener("click",stopTimer);
resetBtn.addEventListener("click",resetTimer);

let tasks = []
let name = ""

chrome.storage.sync.get("tasks",(res)=>{
    tasks = res.tasks?res.tasks:[];
    renderAll()
})

chrome.storage.local.get("name",(res)=>{
    name = res.name?res.name:"";
    if(name!=="") wisher.innerText = `Hello ${name}`
})

function saveTask()
{
    chrome.storage.sync.set({
        tasks:tasks
    });
}

function renderItem(taskLen)
{
    const taskRow = document.createElement("div");
    const texBox = document.createElement("input");
    const removeBtn = document.createElement("input");
    
    texBox.type = "text";
    texBox.placeholder= "Task";
    texBox.value = tasks[taskLen];
    texBox.className = "task-input-box"
    texBox.addEventListener("change",()=>{
        tasks[taskLen] = texBox.value;
        saveTask();
    })



    removeBtn.type = "button";
    removeBtn.value = "-";
    removeBtn.className = "remove-btn"
    removeBtn.addEventListener("click",()=>{
        removeTask(taskLen);
    })

    taskRow.appendChild(texBox);
    taskRow.appendChild(removeBtn);

    const taskBox = document.getElementById("task-box");
    taskBox.appendChild(taskRow);
}

function addTaskRow()
{
    const taskLen = tasks.length;
    tasks.push("");
    renderItem(taskLen);
}

function renderAll()
{
    const taskBox = document.getElementById("task-box");
    taskBox.textContent = "";
    tasks.forEach((taskText,taskIndex)=>{
        renderItem(taskIndex);
    })
}

function removeTask(taskLen){
    tasks.splice(taskLen,1);
    renderAll();
    saveTask();
}

function startTimer(){
    chrome.storage.local.get(["timer","timerOption"],(res)=>{

            chrome.storage.local.set({
                isOn : true
            })
    if(res.timer===0) alert(`Timer has been set for ${res.timerOption} minute(s).`);
    })
}

function stopTimer(){
    chrome.storage.local.get(["isOn"],(res)=>{
        
            chrome.storage.local.set({
                isOn : false
            })
        
    })
}

function resetTimer(){
    chrome.storage.local.get(["isOn","timer"],(res)=>{
        chrome.storage.local.set({
            isOn : false,
            timer:0
        })
    })
}

//updating timer in popup.html
function updateTime(){
    chrome.storage.local.get(["timer","timerOption"],(res)=>{
        let sec = "00"
        let min = `${res.timerOption - Math.ceil(res.timer/60)}`.padStart(2,"0");
        if(res.timer % 60 !== 0) sec=60 - res.timer % 60;
        sec= `${sec}`.padStart(2,"0")
        showTimer.innerText = `${min} : ${sec}`;
    })
}

updateTime()
setInterval(updateTime,1000);

