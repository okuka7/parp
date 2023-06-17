import { configureStore, createSlice } from '@reduxjs/toolkit'

let ticket = createSlice({
	name : 'ticket',
	initialState : [

	],
	reducers : {
		addCount(state, action){
			let ticketName = state.findIndex((a)=>{ return a.id === action.payload })
				state[ticketName].count++
			return
		},
		removeCount(state, action){
			let ticketName = state.findIndex((a)=>{return a.id === action.payload})
			if(state[ticketName].count > 0)
				state[ticketName].count--

		},
		addItem(state, action){
			let ticketName = state.findIndex((a)=>{ return a.id === action.payload.id});
			if(state[ticketName]){
				state[ticketName].count++
			}else{
				state.push(action.payload)
			}
		},
		deleteItem(state, action){
			let ticketName = state.filter((a)=> a.id !== action.payload);
			return ticketName;
		},
	}
})

export let { addCount,addItem,removeCount,deleteItem} = ticket.actions

export default configureStore ({
	reducer:{
		ticket : ticket.reducer

	}
})
