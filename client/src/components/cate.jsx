import React from 'react';
import '../pages/cate.css'
import '../pages/List.css'
import '../components/cate/cateList.css'
import MusicCate from './cate/MusicCate'
import DanceCate from './cate/DanceCate'
import ArtCate from './cate/ArtCate'

export default function Cate(){
	return (
		<div>
			<div className="cate-category">
				<div className="cate-categoList">
					<div className="searchBar">
						<input type="search" placeholder="이름으로 검색하기"/>
					</div>
				</div>
			</div>
			<div className="cate-Part">
				<div className="cate-mainText">
					<span className="cateName"><h3>All</h3></span>
					<span className="cateName">
						<h3>Music</h3>
						<MusicCate/>
					</span>
					<span className="cateName">
						<h3>Dance</h3>
						<DanceCate/>
					</span>
					<span className="cateName">
						<h3>Art</h3>
						<ArtCate/>
					</span>
					<span className="cateName"><h3>Act</h3></span>
					<span className="cateName"><h3>ect.</h3></span>

				</div>

			</div>
		</div>
	)
}
