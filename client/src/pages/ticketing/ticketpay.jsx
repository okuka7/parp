import React from 'react';
import './ticketpay.css';
import { useSelector,useDispatch } from "react-redux";
import Ticket from '../../components/ticket'

export default function Ticketpay(){
	let state = useSelector((state)=>{return state})
	console.log(state)


	return(
		<div>
			<div className="pay-container">
			<div className="pay-ticketbox">
				<Ticket/>
			</div>
			<div className="pay-explain">
			</div>
			</div>
		</div>
	
	)
}
