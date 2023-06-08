import React from 'react';
import './partyPages.css';
import posterImg from '../../images/bluehyp.JPG';
import Cart from '../../components/cart';
import { addItem } from '../../store.js';
import { useDispatch } from "react-redux";


export default function usePartyPages(){
	let dispatch = useDispatch();

	return (
		<div className="partyPage">
			<div className="pagePoster-container">
				<div className="pagePosterImg">
					<img className="posterImg" src={posterImg} alt="posterImg"/>
				</div>
				<div className="pagePoster-explain">
					<div className="pagePoster-title">
						<p>BURNING</p>
					</div>
					<div className="pagePoster-subtitle">
						<p>트로피를 가져갈 학교는 과연??</p>	
					</div>
					<div className="pagePoster-explain-team">
						<p>Uprising crew</p>
					</div>
					<div className="pagePoster-explain-place">
						<p>서울 동작구 상도로 369 <span>숭실대학교 블루큐브</span></p>
					</div>
					<div className="pagePoster-explain-day">
						<p>2023.07.22 SAT 13:00</p>
					</div>
				</div>
				<div className="pagePoster-ticket">
					<div className="ticketBox">
						<div className="ticketBtn">
							<h1>Ticket</h1>
						</div>
						<div className="ticketBox-ticket" onClick={()=> {
								dispatch(addItem({ id : 0 ,name : '관람', count : 1}))
						}}>
							<p>관람 : 20000</p>
						</div>
						<div className="ticketBox-ticket" onClick={()=> {

								dispatch(addItem({ id : 1 ,name : '배틀', count : 1}))
						}}>
							<p>배틀 : 25000</p>
						</div>
					</div>
				</div>
			</div>
			<div className="ticketMain">
				<div className="ticket-display">
					<Cart/>
				</div>
				<div className="ticketing-explain">
				</div>
				<div className="ticketing">
					<div className="ticketing-Btn">
						<p>예매하기</p>
					</div>
				</div>
			</div>
			<div className="pageExplain-container">
				<div className="pageExplain">
					<p>상세페이지</p>
				</div>
			</div>	
		</div>
	)
}
