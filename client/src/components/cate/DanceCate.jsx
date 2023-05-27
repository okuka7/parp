import React from'react';
import './cateList.css';
import '../../pages/List.css';
import '../../pages/cate.css';

export default function DanceCate(){
	return(
		<div className="cateList-part">
			<div className="musicCate-List">
				<sapn className="musicCate-List-List">전체보기</sapn>
				<sapn className="musicCate-List-List">퍼포먼스</sapn>
				<span className="musicCate-List-List">배틀</span>
			</div>
		</div>	
	)
}
