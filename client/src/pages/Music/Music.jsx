import React from 'react';
import '../cate.css'
import '../List.css'
import Cate from '../../components/cate';
export default function Music() {
	return (
		<div>
			<Cate/>
			<div className="cate-Part">
				<div className="cate-Text">
					<h3>음악</h3>
					<h3 className="drop-menu-title">전체보기</h3>
					<div className="drop-menu" onclick={()=>{
					}}>
						<ul>
							<li>콘서트</li>
							<li>디제잉</li>
							<li>버스킹</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="cate-List-Text">
				
			</div>
		</div>
	)
}
