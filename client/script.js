const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const closePop = document.querySelector('.backgroundAll');
const ac = document.querySelector('body');
registerLink.addEventListener('click',()=>{
	wrapper.classList.add('active');
		});
loginLink.addEventListener('click', ()=> {
	wrapper.classList.remove('active');
		});
btnPopup.addEventListener('click', ()=> {
	wrapper.classList.add('active-popup');
window.addEventListener('click',function(e){
	if(btnPopup.contains(e.target)){
		wrapper.classList.add('active-popup')
		console.log("dd");
	}
	else if(wrapper.contains(e.target)){
		console.log("dd")
	}
	else{
		console.log("aa");
		wrapper.classList.remove('active-popup');
	}
});
		});
iconClose.addEventListener('click', ()=> {
	wrapper.classList.remove('active-popup');
		});
