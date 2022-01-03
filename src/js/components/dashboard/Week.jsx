import React, { useState, useEffect } from 'react';
// import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, toggleRun } from '../../store/userSlice';

function Week(props) {
    let schedule = useSelector((state) => state.user.userData.schedule);
    const dispatch = useDispatch();
    const { week, paginate } = props;

    useEffect(() => {

    }, [])

    const toggleRunAndSave = (run) => {
        console.log(run)
        dispatch(toggleRun(run));
        console.log(schedule.weeks[run.week]);
    }

    return (
        <div className='panel week-container'>
            <h2 className="">Week {week}</h2>
            <div className="weeks">
                {schedule.weeks[week].runs.map((run, index) => {
                    return (
                        <div key={index} className="run-row">
                            <div className="switch-spacer">
                                <label className="toggle-switch">
                                    <input type="checkbox"  onChange={ () => toggleRunAndSave(run) } checked={ run.isComplete }/>
                                    <span className="slider round" />
                                </label>
                            </div>
                            <p>{run.distance} mi</p>
                        </div>
                    )
                })}
            </div>
            <div className={`pagination-wrapper`}>
                <button onClick={week > 0 ? () => paginate(week-1): () => {}} className={`pagination-button start ${week === 0 ? 'disabled' : ''}`}>Back</button>

                {schedule.weeks.map((eachWeek, index) => {
                    return(
                        <button
                            className={`pagination-button ${week === eachWeek.week ? 'current' : ''}`}
                            onClick={() => paginate(eachWeek.week)}
                            key={index}>{eachWeek.week}</button>
                    )
                })
                }
                <button onClick={week+1 < schedule.weeks.length ? () => paginate(week+1) : () => {}} className={`pagination-button end ${week === schedule.weeks.length -1 ? 'disabled' : ''}`}>Next</button>

            </div>
        </div>
    )
}

export default Week;
