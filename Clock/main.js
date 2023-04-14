const hour = document.querySelector(".hour")
const minutes = document.querySelector(".min")
const seconds = document.querySelector(".sec")

function addZeros(n){
    if(n.toString().length < 2) return "0".concat(n)
    return n
}

function updateClock(){
    const date = new Date()
    let h = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()

    hour.innerHTML = addZeros(h)
    minutes.innerHTML = addZeros(min)
    seconds.innerHTML = addZeros(sec)
}


window.addEventListener('load', ()=>{
    setInterval(updateClock,1000)
})
