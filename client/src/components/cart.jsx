import React from 'react';
import './components.css'
import { useSelector,useDispatch } from 'react-redux'
import { addCount,removeCount,deleteItem } from '.././store.js'


export default function Ticket (){
	let state = useSelector((state)=>{ return state })
	let dispatch = useDispatch()
	return (
		<div>
			<div className="ticketCart">
				{
					state.ticket.map((a,i)=>	
						<div className="cart-list" key={i}>
							<span>{state.ticket[i].name}</span>
							<span>{state.ticket[i].count}</span>
							<button className="cartButton" onClick={()=> {
								dispatch(addCount(state.ticket[i].id))	
							}}>+</button>
							<button className="cartButton" onClick={()=> {
								dispatch(removeCount(state.ticket[i].id))
							}}>-</button>
							<button className="cartCloseButton" onClick={()=> {
								dispatch(deleteItem(state.ticket[i].id))
							}}>X</button>
						</div>
					)
				}
			</div>
		</div>

	)
}
