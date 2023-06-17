import React from 'react';
import './partyPages.css';
import posterImg from '../../images/bluehyp.JPG';
import Cart from '../../components/cart';
import { addItem } from '../../store.js';
import { useDispatch, useSelector } from "react-redux";


export default function usePartyPages(){
	let state = useSelector((state)=>{ return state})
	let dispatch = useDispatch();
	const totalPrice = () => {
		let sum = 0;
		for(let i = 0; i < state.ticket.length; i++){
				sum += state.ticket[i].price * state.ticket[i].count
			}
			return sum;
	}

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
								dispatch(addItem({ id : 0 ,name : '관람', count : 1, price : 20000}))
						}}>
							<p>관람 : 20000</p>
						</div>
						<div className="ticketBox-ticket" onClick={()=> {

								dispatch(addItem({ id : 1 ,name : '배틀', count : 1, price : 25000}))
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
				<div className="totalPrice">
					<div className="totalPrice-in">
						<span>{totalPrice()} 원</span>
					</div>
				</div>
				<div className="totalPrice-explain">
					<p>총 결제할 금액</p>
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
