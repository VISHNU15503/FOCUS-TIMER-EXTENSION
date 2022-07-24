chrome.alarms.create("focusTimer",{
    periodInMinutes: 1/60
});

chrome.storage.local.get(["timer","isOn","timerOption"],(res)=>{
    chrome.storage.local.set({
        timer: "timer" in res?res.timer:0,
        isOn : "isOn" in res?res.isOn:false,
        timerOption : "timerOption" in res? res.timerOption:30
    })
})

chrome.alarms.onAlarm.addListener((alarm)=>{
    if(alarm.name==="focusTimer"){
        chrome.storage.local.get(["timer","isOn","timerOption"],(res)=>{
            if(res.isOn){
                let time = res.timer+1
                if(time===(res.timerOption*60))
                {
                    this.registration.showNotification("Focus Timer",{
                        body: `${res.timerOption} minute(s) have been passed...`,
                        icon: "icon.png"
                    })
                    chrome.storage.local.set({
                        timer:0,
                        isOn:false
                    })
                }
                else{
                    chrome.storage.local.set({
                    timer: time
                })}
            }
        })
    }
})
