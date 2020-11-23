import React from 'react'
import { deleteEvent } from '../../redux/actions/dataActions';
import { useDispatch } from 'react-redux'

export const ViewEvent = ({text, heigh, id, right}) => {
  const dispatch = useDispatch()
	return (
		<div className="container-event" style={{right: `${right}%`}}>
			<h4 className="event" style={{minHeight: `${heigh*50}px`}}>{text}</h4>
			<i className="fas fa-trash-alt fa-lg"
				onClick={()=>{
					dispatch(deleteEvent(id))}}
			></i> 
		</div>
	)
}