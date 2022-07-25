document.querySelector(".control-buttons span").onclick = function (){
    let yourName = prompt("What Your Name?");

    if (yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "Unkown";
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
}

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);
console.log(orderRange);
blocks.forEach((block , index) =>{

    block.style.order = orderRange[index];


    block.addEventListener('click',function(){
        flipBlock(block);
    });
});

// Flip Block
function flipBlock(selected){

    selected.classList.add("is-flipped");
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (allFlippedBlocks.length%2 == 0){
       
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }

}
// Chceck blocks
function checkMatchedBlocks(firstBlock , secondBlock){
    let triesElement = document.querySelector(".tries span");
    
    if (firstBlock.dataset.tech == secondBlock.dataset.tech)
    {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();
    }else{
        
        triesElement.innerHTML = parseInt(triesElement.innerHTML)+1;
        setTimeout(()=>{
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        },duration)
        document.getElementById("fail").play();
    }

}
function stopClicking(){
    // add class no clicking
    blocksContainer.classList.add("no-clicking");
    setTimeout(()=>{
        // remove class no clikcing
        blocksContainer.classList.remove("no-clicking");

    },duration);
}
// Shuffle Function
function shuffle(array){
    // settings
    let current = array.length,
        temp,
        random;
    while(current>0){
        // get Random
        random = Math.floor(Math.random() * current);
        console.log(random);
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;   
        // Decrease current
        current--;
    }
    return array;
}