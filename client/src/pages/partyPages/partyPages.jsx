import React from 'react';
import './partyPages.css';
import posterImg from '../../images/bluehyp.JPG';
import Checkbox from '../../components/Checkbox';


export default function usePartyPages(){
	const [ticket,setTicket] = React.useState(false);
	const [battle,setBattle] = React.useState(false);
	return (
		<div className="partyPage">
			<div className="pagePoster-container">
				<div className="pagePosterImg">
					<img className="posterImg" src={posterImg} alt="posterImg"/>
				</div>
				<div className="pagePoster-explain">
					<div className="pagePoster-title">
						<p>힙노타이즈</p>
					</div>
					<div className="pagePoster-subtitle">
						<p>불타는 열정</p>	
					</div>
					<div className="pagePoster-explain-team">
						<p>A miliom RockFace</p>
					</div>
					<div className="pagePoster-explain-place">
						<p>마포구 상상마당</p>
					</div>
					<div className="pagePoster-explain-day">
						<p>2023.04.29 SAT</p>
					</div>
				</div>
				<div className="pagePoster-ticket">
					<div className="ticketBox">
						<div className="ticketBtn">
							<h1>Ticket</h1>
						</div>
						<div className="ticketBox-ticket">
							<Checkbox checked={ticket} onChange={setTicket}className="checkBtn"><p>관람</p></Checkbox>
						</div>
						<div className="ticketBox-ticket">
							<Checkbox checked={battle} onChange={setBattle}><p>배틀</p></Checkbox>
						</div>
					</div>
				</div>
			</div>
			<div className="ticketMain">
				<div className="ticket-display">
					<div>
					</div>
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
					설명
				</div>
			</div>	
		</div>



	)
}
