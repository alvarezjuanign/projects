let input = document.querySelector("#new-item");
let btn = document.querySelector(".btn");
let list = document.querySelector(".list");


function addUIItem(txt) {
    let li = document.createElement("li");
    li.innerHTML = txt;
    list.insertBefore(li, list.childNodes[0])
    const delBtn = document.createElement("button")
    delBtn.textContent = "X";
    delBtn.classList.add("delete")
    li.appendChild(delBtn)
    
    delBtn.addEventListener("click", (e) => {
        li.parentNode.removeChild(li)
        savedTasks = savedTasks.filter((e) => e !== txt)
        localStorage.setItem("tasks", JSON.stringify(savedTasks))
    });
}


let savedTasks = JSON.parse(localStorage.getItem("tasks")) || []
savedTasks.forEach(addUIItem)

btn.addEventListener("click", () => {
    let txt = input.value
    if (txt === "" || txt === ' ') {
        alert("Please write something to do!")
    } else {
        savedTasks.push(txt);
        localStorage.setItem("tasks", JSON.stringify(savedTasks))
        addUIItem(txt)
        input.value = ""
    }
});

list.addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked")
    }
})