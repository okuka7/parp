import React from 'react';
import '../cate.css'
import '../List.css'
import Cate from '../../components/cate';
export default function Music() {
	return (
		<div>
			<Cate/>
			<div className="cate-Part">
				<div className="cate-mainText">
					<h3>음악</h3>
					<h3 className="drop-menu-title">전체보기</h3>
				</div>
				<div className="drop-menu" onClick={()=>{
				}}>
					<ul>
						<li>콘서트</li>
						<li>디제잉</li>
						<li>버스킹</li>
					</ul>
				</div>
			</div>
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
