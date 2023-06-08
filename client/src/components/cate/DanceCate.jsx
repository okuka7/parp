import React from'react';
import './cateList.css';
import '../../pages/List.css';
import '../../pages/cate.css';

export default function DanceCate(){
	return(
		<div className="cateList-part">
			<div className="musicCate-List">
				<div className="musicCate-List-List">전체보기</div>
				<div className="musicCate-List-List">퍼포먼스</div>
				<div className="musicCate-List-List">배틀</div>
			</div>
		</div>	
	)
}
