let myLeads = []
const inputEl = document.querySelector("#input-el")
const inputbtn = document.querySelector("#input-btn")
const clearbtn = document.querySelector(".delete-btn")
const ulEl = document.querySelector(".list")
const tabBtn = document.querySelector(".savetab-btn")

const leadsStorage = JSON.parse(localStorage.getItem("leads"))
if (leadsStorage){
    myLeads = leadsStorage
    render(myLeads)
}

function render(leads){
    let listItem = ""
    for(let i = 0; i < leads.length; i++){
        listItem += 
        `<li>
            <a target='_blank' href="${leads[i]}"> 
            ${leads[i]}
            </a>
        </li>`   
    }
    ulEl.innerHTML = listItem
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function keyDown(event){
    if (event.key === "Enter"){
        addLead()
    }
}
inputEl.addEventListener("keydown", keyDown)
inputbtn.addEventListener("click", addLead)
function addLead(){
    if(inputEl.value.trim() === ""){
        return
    }
    myLeads.push(inputEl.value.trim())
    inputEl.value = ""
    localStorage.setItem("leads",JSON.stringify(myLeads))
    render(myLeads)
}

function deleteBtn(){
    myLeads = []
    localStorage.clear()
    render(myLeads)
}
clearbtn.addEventListener("click", deleteBtn)