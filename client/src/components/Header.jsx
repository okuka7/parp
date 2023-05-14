import React from 'react';
import menuToggle from '../images/toggle.png';
import { useNavigate } from 'react-router-dom';


export default function Header() {
	const navigate = useNavigate();
	return (
		<div className="header">
			<div 
				className="logo"
				>
				<h1 onClick= {()=> navigate('/')
				}>PARP</h1>
			</div>
			<div className="searchBar">
				<input type="search" placeholder="FIND PLANET"/>			
			</div>
			<div className="menuRoom">
				<div className="action">
					<a href="#"><p>내 행사 파프하기</p></a>
					<div className="menuToggle">
						<img src={menuToggle} alt='menu toggle' className="toggleImg" onClick={menuOpen}/>
					</div>
					<div className="menu">
						<ul>
							<li><a href="#" onClick={clo}>회원가입</a></li>
							<li className="btnLogin-popup" onClick={()=> {
								clo()
								openModal()
								wrapOpen()
							}}><a href="#" onClick={clo}>로그인</a></li>
							<li><a href="#" onClick={clo}>캘린더</a></li>
							<li><a href="#" onClick={clo}>찜한 목록</a></li>
							<li><a href="#" onClick={clo}>호스트에게 메세지 보내기</a></li>
							<li><a href="#" onClick={clo}>도움말</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

	function menuOpen(){
		document.querySelector('.menu').classList.toggle('active');
		let btn = document.querySelector('.toggleImg');
		let menu = document.querySelector('.menu');
		window.addEventListener('click', function(e){
			if(menu.contains(e.target)){
			}
			else if(!btn.contains(e.target)){
				menu.classList.remove('active');
			}
		});
		
	}
	function clo(){
		document.querySelector('.menu').classList.remove('active');
	}
	function openModal() {
		const wrapper = document.querySelector('.wrapperLog');
		const btnPopup = document.querySelector('.btnLogin-popup');
		const Rwrapper = document.querySelector('.logInbox');

		document.querySelector('.wrapperLog').classList.add('active-popup');
		window.addEventListener('click', function(e) {
			if(btnPopup.contains(e.target)){
				wrapper.classList.add('active-popup');
				Rwrapper.style.display = 'block' }
			else if(wrapper.contains(e.target)){
			}
			else{
				wrapper.classList.remove('active-popup');
				Rwrapper.style.display='none';
			}
		})
	}
	function wrapOpen(){
		const wrapper = document.querySelector('.logInbox')
		wrapper.style.display='block';
	}
