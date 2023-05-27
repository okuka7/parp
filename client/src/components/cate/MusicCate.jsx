import React from 'react';
import './cateList.css'
import '../../pages/List.css'
import '../../pages/cate.css'

export default function MusicCate(){
	return (
		<div className="cateList-part">
			<div className="musicCate-List">
						<span className="musicCate-List-List">전체보기</span>
						<span className="musicCate-List-List">콘서트</span>
						<span className="musicCate-List-List">DJ</span>
						<span className="musicCate-List-List">버스킹</span>
			</div>
		</div>
	)
}
