const button = document.querySelector('.container main a')
const modal = document.querySelector('#modal')
const buttonClose = document.querySelector('#modal .content a')


button.addEventListener('click',modalApears)

buttonClose.addEventListener('click',Close)

   

function modalApears(){
    modal.classList.remove('hide')
    
}

function Close(){
    modal.classList.add('hide')
}