import React from 'react';
import '../cate.css'
import '../List.css'
import Cate from '../../components/cate';
import List from '../../components/List';
export default function Music() {
	return (
		<div>
			<Cate/>
			<div className="cate-List-Text">
				<div className="cate-List-button">
					<p className="btn-color" onClick={changeBtn}>인기순</p>
				</div>
				<div className="middle-line"></div>
				<div className="cate-List-button">
					<p className="btn-color" onClick={changeBtn}>최신순</p>
				</div>
				<div className="middle-line"></div>
				<div className="cate-List-button">
					<p className="btn-color" onClick={changeBtn}>상품명순</p>
				</div>
			</div>
			<List/>
		</div>
	)
}

	var btn = document.getElementsByClassName('btn-color');
function changeBtn(event){
	if(event.target.classList[1] === "active"){
		event.target.classList.remove('active');
	}else {
		for (var i = 0; i < btn.length; i ++){
			btn[i].classList.remove('active');
		}

		event.target.classList.add('active');
	}
}

function OpenDrop (){
	const Menu = document.querySelector('.drop-menu-title');
	const Drop = document.querySelector('.drop-menu');

	document.querySelector('.drop-menu').classList.toggle('active');
	window.addEventListener('click',function(e){
		if(Menu.contains(e.target)){
		}else if(!Menu.contains(e.target)){
			Drop.classList.remove('active')
		}
	})
}
