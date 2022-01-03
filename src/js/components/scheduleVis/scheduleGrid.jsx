import React, { useState, useEffect } from 'react';
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../store/userSlice';

function RunSquare(props) {
    const [tipText, setTipText] = useState(`Week: ${ props.week.week } 
        Distance: ${props.run.distance}
        Completed: ${props.run.dateCompleted}`
    )

    return (
        <>
            <div className={`run-square bg-teal-200 ${props.run.isComplete ? 'complete' : ''}`}
             data-tip={ tipText } />
        </>
    )
}

function WeekRow(props) {

    return (
        <div className="week-wrapper">
            <p>Week {props.week.week}</p>
            {props.week.runs.map((run, index) => {
                return (
                    <RunSquare key={ index } week={ props.week } run={ run } />
                )
            })}
        </div>
    )
}

function ScheduleGrid(props) {
    const state = useSelector((state) => state);
    const { userData } = state.user;

    useEffect(() => {
        console.log('PROPS : ', userData);
    }, []);

    return (
        <>
            <div className="grid-wrapper panel">
                <h4>Grid View</h4>
                {userData && userData.schedule
                    ? userData.schedule.weeks.map((week, index) => {
                        return (
                            <WeekRow key={ index } week={ week }/>
                        )
                    })
                    :''
                }
            </div>
            <ReactTooltip
                delayHide={ 800 }
                pading="8px 16px"/>
        </>
    )
}

export default ScheduleGrid;
