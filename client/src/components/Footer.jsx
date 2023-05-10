import React from 'react';

export default function Footer() {
	return (
		<div className="footer">
			<div className="footInbox">
				<ul className="inbox-top">
					<li>회사소개</li>
					<li>이용약관</li>
					<li>개인정보처리방침</li>
					<li>청소년보호정책</li>
					<li>위치기반서비스 이용약관</li>
					<li>이용안내</li>
					<li>티켓판매안내</li>
				</ul>
				<div className="inbox-bottom">
					<div className="inbox-left">
						<h1>PARP</h1>
					</div>
					<div className="inbox-right">
						<h4 className="footBigText">파프</h4>
						<p>주소 파주 실리콘밸리</p>
						<p>대표 파프보이</p>
						<p>사업자 등록번호 파프</p>
					</div>
				</div>
			</div>
		</div>
	)
}
