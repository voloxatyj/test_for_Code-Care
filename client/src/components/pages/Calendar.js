import React, { Fragment, useState } from 'react'
import useCalendar from '../../hooks/useCalendar'
import { ViewDay } from './ViewDay'

export const Calendar = () => {
	const [selectedView, setSelectedView] = useState({visibility:false,date:null})
	const { calendarRows, selectedDate, todayFormatted, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar()

	const dateClickHandler = date => {
		setSelectedView({visibility:true,date:date})
	}

	return (
		<Fragment>
			{selectedView.visibility ? <ViewDay date={selectedView.date} /> :
			<div className="container">
				<section className="hero is-primary">
					<div className="hero-body">
						<div className="container">
							<h1 className="title has-text-centered">Calendar</h1>
						</div>
					</div>
				</section>
				<div className="has-text-centered">
					<p>Selected Month: {`${monthNames[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`}</p>
					<table className="table">
						<thead>
							<tr>
								{daysShort.map(day => (
									<th key={day}>{day}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{Object.values(calendarRows).map(cols => {
								return <tr key={cols[0].date}>
									{cols.map(col => (
										col.date === todayFormatted
											?	<td key={col.date} className={`${col.classes} today`} onClick={() => dateClickHandler(col.date)}>
												{col.value}
											</td>
											:	<td key={col.date} className={col.classes} onClick={() => dateClickHandler(col.date)}>
												{col.value}
											</td>
									))}
								</tr>
							})}
						</tbody>
					</table>

					<button className="button" onClick={getPrevMonth}>Prev</button>
					<button className="button" onClick={getNextMonth}>Next</button>
				</div>
			</div>}
		</Fragment>
	)
}