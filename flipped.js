const backside= document.getElementsByClassName("card")
const flipBack= document.getElementById("flip-back")

flipBack.addEventListener("click", flippedcard);

function flippedcard(){
    backside.classList.toggle("flippedCard")
}