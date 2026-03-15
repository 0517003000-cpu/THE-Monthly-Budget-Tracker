let currentMonth = localStorage.getItem("currentMonth") || ""

function getNumber(text){
return Number(text.replace(/[^0-9]/g,'')) || 0
}

document.addEventListener("input", ()=>{
calculate()
saveData()
})

function calculate(){

let essentialBudget=getNumber(document.getElementById("essentialBudget").innerText)
let nonBudget=getNumber(document.getElementById("nonBudget").innerText)
let saveBudget=getNumber(document.getElementById("saveBudget").innerText)

let essentialTotal=0
document.querySelectorAll(".essential").forEach(c=>{
essentialTotal+=getNumber(c.innerText)
})

let nonTotal=0
document.querySelectorAll(".non").forEach(c=>{
nonTotal+=getNumber(c.innerText)
})

let saveTotal=0
document.querySelectorAll(".save").forEach(c=>{
saveTotal+=getNumber(c.innerText)
})

document.getElementById("essentialTotal").innerText=essentialTotal.toLocaleString("id-ID")
document.getElementById("nonTotal").innerText=nonTotal.toLocaleString("id-ID")
document.getElementById("saveTotal").innerText=saveTotal.toLocaleString("id-ID")

updateStatus("essential",essentialTotal,essentialBudget)
updateStatus("non",nonTotal,nonBudget)
updateStatus("save",saveTotal,saveBudget)

}

function updateStatus(type,total,budget){

let status=document.getElementById(type+"Status")
let advice=document.getElementById("adviceMessage")

if(total>budget){

status.innerText="Over Budget"
status.style.color="red"

if(type==="essential"){
advice.innerText="⚠️ Essential expenses are over budget. Try reducing bills or subscriptions."
}

if(type==="non"){
advice.innerText="⚠️ Non-essential spending is too high. Reduce shopping or entertainment."
}

if(type==="save"){
advice.innerText="⚠️ Savings allocation seems unusual. Make sure essentials are covered first."
}

}else{

status.innerText="Under Budget"
status.style.color="green"

advice.innerText="✅ Your spending is within budget. Keep tracking your expenses."

}

}

function newMonth(){

let name=prompt("Enter month (Example: March 2026)")
if(!name) return

currentMonth=name
localStorage.setItem("currentMonth",name)

if(!localStorage.getItem("month_"+name)){
localStorage.setItem("month_"+name,JSON.stringify([]))
}

loadMonthList()
clearData()

}

function openMonth(month){

currentMonth=month
localStorage.setItem("currentMonth",month)

loadData()

}

function saveData(){

if(!currentMonth) return

let data=[]

document.querySelectorAll('[contenteditable="true"]').forEach(cell=>{
data.push(cell.innerText)
})

localStorage.setItem("month_"+currentMonth,JSON.stringify(data))

}

function loadData(){

if(!currentMonth) return

let saved=JSON.parse(localStorage.getItem("month_"+currentMonth))
if(!saved) return

document.querySelectorAll('[contenteditable="true"]').forEach((cell,i)=>{
cell.innerText=saved[i]||""
})

calculate()

}

function clearData(){

document.querySelectorAll('[contenteditable="true"]').forEach(cell=>{
cell.innerText=""
})

calculate()

}

function loadMonthList(){

let container=document.getElementById("months")
container.innerHTML=""

for(let key in localStorage){

if(key.startsWith("month_")){

let month=key.replace("month_","")

let btn=document.createElement("button")
btn.innerText=month
btn.onclick=()=>openMonth(month)

container.appendChild(btn)

}

}

}

window.onload=()=>{
loadMonthList()
loadData()
} 

