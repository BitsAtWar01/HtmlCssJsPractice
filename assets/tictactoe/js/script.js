const board = ['','','','','','','','',''];


//BUTTON EVENTS HANDLER FUNCTIONS
function play(el){
    el.parentElement.style.display = 'none';
    const playareaContainer = document.querySelector('#playarea-container');
    playareaContainer.style.display = 'flex';    
}

function landing(el){
    el.parentElement.parentElement.style.display = 'none'
    const landingContainer = document.querySelector('#landing-container');
    landingContainer.style.display = 'flex';
}

function reset_board(){
    console.log('Under Construction')
}