import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { ViewEvent } from './ViewEvent'
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_VIEW, OPEN_DIALOG } from '../../redux/types'
import { Event } from './Event'
import { exportEvents } from '../../redux/actions/dataActions'
import moment from 'moment'

export const ViewDay = ({date}) => {
const time = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30','5:00']
const events = useSelector(state => state.data.events)
let right = 50
const viewEvent = useSelector(state => state.ui.openDialog,()=>{})
const dispatch = useDispatch()
	return (
		<Fragment>
			<h1 style={{textAlign: "center"}}>{date}</h1>
			<div className="title-container">
				<Button variant="outlined" color="primary" onClick={()=>dispatch({ type: CLOSE_VIEW })}>
					back to calendar
				</Button>
				<Button variant="outlined" color="primary" onClick={()=>dispatch({ type: OPEN_DIALOG })}>
					add event
				</Button>
				<Button variant="outlined" color="primary" onClick={()=>exportEvents(events)}>
					export
				</Button>
			</div>
			<div className="time-container">
				<div className="container">
					{time.map((item,index)=>{
						if(index <= 9) {
							return (
								<div className="time-first" key={index}>
									{index%2===0?<h3 style={{color:"#a9a9a9b3"}}>{item}</h3>:<h5 style={{color:"#a9a9a9b3"}}>{item}</h5>}
									{events.length !== 0 ?
										events.map((event,index) => {
											if(moment(event.startDate).format('l').replaceAll('/','-')===date && event.start === item) {
												if(index >= 1 && event.startDate>=events[index-1].endDate){
													right -= 40
												}
												return (
													<ViewEvent key={index} text={event.title} heigh={Math.floor(event.duration/30)} id={event._id} right={right}/>
												)
											}
										}) : null
									}
								</div>
								)} 
						})}
				</div>
				<div className="container">
					{time.map((item,index)=>{
						if(index > 9) {
							return (
								<div className="time-second" key={index}>
									{index%2===0?<h3 style={{color:"#a9a9a9b3"}}>{item}</h3>:<h5 style={{color:"#a9a9a9b3"}}>{item}</h5>}
									{events.length !== 0 ?
										events.map((event,index) => {
											if(moment(event.startDate).format('l').replaceAll('/','-')===date && event.start === item) {
												if(index >= 1 && event.startDate>=events[index-1].endDate){
													right -= 40
												}
												return (
													<ViewEvent key={index} text={event.title} heigh={Math.floor(event.duration/30)} id={event._id} right={right}/>
												)
											}
										}) : null
									}
								</div>
								)} 
						})}
				</div>
			</div>
		{viewEvent && <Event />}
	</Fragment>
	);
}
