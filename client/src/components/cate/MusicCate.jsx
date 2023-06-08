import React from 'react';
import './cateList.css'
import '../../pages/List.css'
import '../../pages/cate.css'

export default function MusicCate(){
	return (
		<div className="cateList-part">
			<div className="musicCate-List">
						<div className="musicCate-List-List">전체보기</div>
						<div className="musicCate-List-List">콘서트</div>
						<div className="musicCate-List-List">DJ</div>
						<div className="musicCate-List-List">버스킹</div>
			</div>
		</div>
	)
}
