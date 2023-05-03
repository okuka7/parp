import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import menuToggle from './images/toggle.png'
import bigOne from './images/AMR.jpeg'
import yard from './images/yard.JPG'
import banImg from './images/hyp.JPG'
import comm from './images/bluehyp.JPG'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function App() {
  return (
    <div className="container">
	  	<div className="header">
	  		<div className="logo">
	  			<a href="#"><h1>PARP</h1></a>
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
							}}><a href="#">로그인</a></li>
	  						<li><a href="#" onClick={clo}>캘린더</a></li>
	  						<li><a href="#" onClick={clo}>찜한 목록</a></li>
	  						<li><a href="#" onClick={clo}>호스트에게 메세지 보내기</a></li>
	  						<li><a href="#" onClick={clo}>도움말</a></li>
	  					</ul>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	  <div className="wrapper">
	  	<div className="wrapperLog">
	  		<div className="form-box login">
	  			<h2>Login</h2>
	  			<form action="#">
	  				<div className="input-box">
	  					<span className="icon"></span>
	  					<input type="email" required />
	  					<label>Email</label>
	  				</div>
	  				<div className="input-box">
						<span className="icon"></span>
	  					<input type="password" required />
	  					<label>Password</label>
	  				</div>
	  				<div className="remember-forgot">
	  					<label><input type="checkbox"/>Remember me</label>
	  					<p><a href="#">비밀번호를 잊으셨나요?</a></p>
	  				</div>
	  				<button type="submit" className="btn">Login</button>
	  				<div className="login-register">
	  					<p>아이디가 없으신가요?
	  					<a href="#" className="register-link" onClick={regiLink}>회원가입</a></p>
	  				</div>
	  			</form>
	  		</div>
			<div className="form-box register">
	  			<h2>회원가입</h2>
	  			<form action="#">
	  				<div className="input-box">
	  					<span className="icon"></span>
	  					<input type="text" required />
	  					<label>Username</label>
	  				</div>
	  				<div className="input-box">
	  					<span className="icon"></span>
	  					<input type="email" required />
	  					<label>Email</label>
	  				</div>
	  				<div className="input-box">
						<span className="icon"></span>
	  					<input type="password" required />
	  					<label>Password</label>
	  				</div>
	  				<div className="remember-forgot">
	  					<label><input type="checkbox"/>이용약관에 동의합니다.</label>
	  				</div>
	  				<button type="submit" className="btn">회원가입</button>
	  				<div className="login-register">
	  					<p>이미 아이디가 있으신가요?
	  					<a href="#" className="login-link" onClick={logLink}>Login</a></p>
	  				</div>
	  			</form>
	  		</div>
	  	</div>
	  </div>
	  	<div className="slide">
	  		<Swiper 
	  			className="banner"
	  			spaceBetween={50}
	  			slidesPerview={3}
	  			navigation
	  			pagination={{ clickable: true}}
	  			autoplay={ {delay:3000} }
	  			breakpoints={{
					768: {
						slidesPreview: 7,
					},
				}}
	  		>
	  			<SwiperSlide>
	  				<div className="bannerImg">
	  					<img src={banImg} className="bnnImg" />
	  				</div>
	  			</SwiperSlide>
	  			<SwiperSlide>
	  				<div className="bannerImg">
	  					<p>dd</p>
	  				</div>
	  			</SwiperSlide>
	  				<div className="bannerImg">
	  					<p>dd</p>
	  				</div>
	  			<SwiperSlide>
	  				<div className="bannerImg">
	  					<p>dd</p>
	  				</div>
	  			</SwiperSlide>
	  			<SwiperSlide>
	  				<div className="bannerImg">
	  					<p>dd</p>
	  				</div>
	  			</SwiperSlide>
	  		</Swiper>
	  	</div>
		<div className="hotText">
	  		<h1>Hot Planet</h1>
		</div>
		<div className="hotList">
	  		<div className="bigList">
	  			<div className="hotImg">
	  				<img src={banImg} className="bigOne" />
	  			</div>
	  		</div>
	  		<div className="smallList">
	  			<div className="hotImg">
	  				<img src={yard} className="smallIMG" />
	  			</div>
	  		</div>
	  		<div className="smallList">
	  			<div className="hotImg">
	  				<img src={comm} className="smallIMG" />
	  			</div>
	  		</div>
	  		<div className="smallList listRow">
	  			<div className="hotImg">
	  			</div>
	  		</div>
	  		<div className="smallList listRow">
	  			<div className="hotImg">
	  			</div>
	  		</div>
		</div>
		<div className="newText">
	  		<h1>Comming Soon</h1>
		</div>
		<div className="newPlanet">
	  		<div className="newList">
	  			<div className="hotImg">
	  				<img src={comm} className="smallIMG"/>
	  			</div>
	  		</div>
	  		<div className="newList">
	  			<div className="hotImg">
	  			</div>
	  		</div>
	  		<div className="newList">
	  			<div className="hotImg">
	  			</div>
	  		</div>
		</div>
		<div className="caText">
	  		<h1>Category</h1>
		</div>
		<div className="caPlanet">
	  		<div className="newList">
	  			<div className="hotImg">
	  				
	  			</div>
	  		</div>
	  		<div className="newList">
	  			<div className="hotImg">
	  			</div>
	  		</div>
	  		<div className="newList">
	  			<div className="hotImg">
	  			</div>
	  		</div>
		</div>
	</div>
  );
}
	function Card(props) {
		return (
			<article className="card">
				<a href="#">{/*<img>*/}</a>
				<a href="#"><h3 className="tit">전시장</h3></a>
			</article>
		)
	}
	function menuOpen(){
		document.querySelector('.menu').classList.toggle('active');
		let btn = document.querySelector('.toggleImg');
		let menu = document.querySelector('.menu');
		let cloMe = document.querySelector('.closeMenu');
		window.addEventListener('click',function(e){
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
	function openModal(){
	const wrapper = document.querySelector('.wrapperLog');
	const btnPopup = document.querySelector('.btnLogin-popup');

	document.querySelector('.wrapperLog').classList.add('active-popup');
	window.addEventListener('click', function(e){
		if(btnPopup.contains(e.target)){
			wrapper.classList.add('active-popup')
			wrapper.style.display='block'}
		else if(wrapper.contains(e.target)){
		}
		else{
			wrapper.classList.remove('active-popup');
			wrapper.style.display='none';
		}
	})
	}
	function regiLink(){
		document.querySelector('.wrapperLog').classList.add('active');
	}
	function logLink(){
		const wrapper = document.querySelector('.wrapperLog');
		wrapper.classList.remove('active');
	}
	function wrapOpen(){
		const wrapper = document.querySelector('.wrapper')
		wrapper.style.display='block';
	}

export default App;
