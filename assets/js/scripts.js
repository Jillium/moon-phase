
// get modal elements and make variable 
var modal = document.getElementById('moon-modal');
var modalbtn = document.getElementById('modal-btn');
var closeBtn = document.getElementById('modal-close');

//listen for open click 
modalbtn.addEventListener('click', openModal);

//close click listener 
closeBtn.addEventListener('click', closeModal);

//click outside modal to close 
window.addEventListener('click', outsideModal);

//function to open modal 
function openModal(){
    modal.style.display = 'block';
    modalbtn.style.display = 'none';
}

//close modal on button
function closeModal() {
    console.log("modal closed");
    modal.style.display = 'none';
}

function outsideModal(event) {
    console.log("clicked outside model");
    if(event.target == modal) {
    modal.style.display = 'none';}
}

