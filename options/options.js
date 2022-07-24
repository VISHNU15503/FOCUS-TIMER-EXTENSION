const timerElement = document.getElementById("timer-option");
const nameElement = document.getElementById("user");
const saveBtn = document.getElementById("save-btn");

timerElement.addEventListener("change",(event)=>{
    const value = event.target.value;
    if(value<1) timerElement.value = 1;
    else if(value>60) timerElement.value = 60
})

saveBtn.addEventListener("click",()=>
{
    chrome.storage.local.set({
        timer : 0,
        isOn : false,
        timerOption : timerElement.value,
        name : nameElement.value
    })
})

chrome.storage.local.get(["timerOption","name"],(res)=>{
    timerElement.value = res.timerOption
    nameElement.value = res.name?res.name:""
})