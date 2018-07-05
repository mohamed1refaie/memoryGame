let cards = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o','fa fa-paper-plane-o','fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube','fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb'];

let openCards=[] ;
let Counter=0;
let matchs=0;
let moves=document.querySelector('.moves');
let restartBtn=document.querySelector('.restart');
let deck=document.querySelector('.deck');
let seconds=document.querySelector('.time');
let modal = document.querySelector(".modal");
let button = document.querySelector(".button");
let stop=0;
let start = new Date().getTime(),elapsed = '0.0';
let interval = window.setInterval(elapsedTime, 100);

function elapsedTime()
{
    if(stop==1)clearInterval(interval);
    let time = new Date().getTime() - start;
    elapsed = Math.floor(time / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
    seconds.textContent = elapsed;
}


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initiate(){
    cards = shuffle(cards);
    let deck = document.querySelector('.deck');
    for(let i=0;i<cards.length;i++)
    {
        let card = document.createElement('li');
        card.className='card';
        let pic=document.createElement('i');
        pic.className=cards[i];
        card.appendChild(pic);
        deck.appendChild(card);
    }
}

initiate();
function toggleModal() {
    modal.classList.toggle("show-modal");
}
function match(firstCard,secondCard)
{
    if(firstCard.firstChild.className==secondCard.firstChild.className)
    {
        firstCard.className='card match';
        secondCard.className='card match';
        return true;
    }
    return false;
}

function notMatch(firstCard,secondCard)
{
    firstCard.className='card';
    secondCard.className='card';
}

function showforawhile(card,callback){
     setTimeout(()=>{
        callback('done')
    },200)
    card.classList.add('show');
    card.classList.add('open');
}
function updateStars(third,second){

    let thirdStar=document.getElementById(third);
    let secondStar=document.getElementById(second);
    if(Counter>=19&&Counter<25)
    { 
        thirdStar.className="fa fa-star-o";
    }
    else if(Counter>=25)
    {
        thirdStar.className="fa fa-star-o";
         secondStar.className="fa fa-star-o";   
    }
    else if(Counter==0)
    {
        thirdStar.className="fa fa-star";
        secondStar.className="fa fa-star";   

    }
}

function updateModal()
{
    let modalBody=document.querySelector('.modal-body');
    modalBody.textContent="You have finished in "+Counter+" moves and in "+elapsed+" seconds";
    updateStars("thirdStar","secondStar");

}

function win()
{
    if(matchs==16)
    {
        stop=1;
        updateModal();
        toggleModal();  
    }
}

function showCard(card)
{
    card.classList.add('show');
    card.classList.add('open');
}

function AddCard(card)
{
    if(openCards.length==0)
    {
        showCard(card);
        openCards.push(card);
    }
    else 
    {
        showforawhile(card,()=>{
        firstCard=openCards[0];
        let isMatch = match(firstCard,card);
        if(!isMatch)notMatch(firstCard,card);
        else 
        {
            matchs+=2;
            win();
        }
        openCards=[];
        })  
    }
}


deck.addEventListener('click',function(Event){
    if (Event.target.nodeName==='LI'&&Event.target.className==="card")
    {
          
           Counter++;
           moves.textContent=Counter;
           updateStars("third","second");
           AddCard(Event.target)
          
    }
})

function clear()
{
    for(let i=0;i<cards.length;i++)
        deck.firstElementChild.remove();
}

function restart()
{
    clear();
    initiate();
    Counter=0;
    moves.textContent=Counter;
    updateStars('third','second');
    start = new Date().getTime(),elapsed = '0.0';
    stop=0;
    interval=setInterval(elapsedTime,100);
    
}

restartBtn.addEventListener('click',restart)
button.addEventListener('click',function(Event){
    toggleModal();  
    restart();
})


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a list of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */