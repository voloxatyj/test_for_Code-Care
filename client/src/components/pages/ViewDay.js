import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { ViewState } from '@devexpress/dx-react-scheduler';
import moment from 'moment';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { OPEN_DIALOG } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../layouts/Event'

export const ViewDay = ({date}) => {
  const currentDate = moment(date).format("YYYY-DD-MM")
  const dispatch = useDispatch()
  const events = useSelector(state => state.data.events,()=>{})
  console.log('OUTPUT: Event -> events', events)
  useEffect(()=>{
    if(events.length!==0){
      events.forEach(item=>{
        const obj = {}
        let hours = Math.floor(item.duration/60)
        let minutes = Math.round(item.duration/60 - hours)
        obj.endDate = `${+item.start.slice(0,2)+hours}T${+item.start.slice(3)+minutes}`
        obj.startDate = `${item.date}T${item.start}`
        obj.title = item.title
        schedulerData.push(obj)
      })
    }
  },[events])
  const schedulerData = [
    { startDate: currentDate+'T13:30', endDate: currentDate+'T13:30', title: 'Meeting' },
    { startDate: currentDate+'T13:30', endDate: currentDate+'T13:30', title: 'Go to a gym' },
  ];
  console.log('OUTPUT: ViewDay -> schedulerData', schedulerData)
  return (
    <Paper>
      <Button variant="outlined" color="primary" onClick={()=>dispatch({type: OPEN_DIALOG})} 
        style={{margin: '1em'}}>
        add event
      </Button>
      <Scheduler
        data={schedulerData}
      >
        <ViewState
          currentDate={currentDate}
        />
        <DayView
          startDayHour={8}
          endDayHour={17}
        />
        <Appointments />
      </Scheduler>
      <Event />
    </Paper>
  );
}