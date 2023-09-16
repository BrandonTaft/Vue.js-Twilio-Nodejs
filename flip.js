const card= document.getElementById("card")
const flipBtn= document.getElementById("flip-btn")

flipBtn.addEventListener("click", flipcard);

function flipcard(){
    card.classList.toggle("flipCard")
}
