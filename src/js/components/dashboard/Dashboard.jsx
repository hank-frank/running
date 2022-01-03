import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData, fetchData, login } from '../../store/userSlice'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import Week from './Week';
import Progress from './progress';
import ScheduleGrid from '../scheduleVis/scheduleGrid';

function Dashboard() {
    const state = useSelector((state) => state);
    const { userData, authenticated } = state.user;
    const dispatch = useDispatch();
    const [week, setWeek] = useState(0);

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    // useEffect(() => {
    //     if (userData.schedule) {
    //         console.log(userData.schedule);
    //         calcCurrentWeek();
    //     }
    // }, []);
    //
    // const calcCurrentWeek = () => {
    //     const { startDate } = userData.schedule;
    //
    //     const now = new Date();
    //     let diff = (now - startDate) / 1000;
    //     diff /= (60 * 60 * 24 * 7);
    //     if (diff <= 0) {
    //         setWeek(0);
    //     } else {
    //         const weekAfterStart = Math.abs(Math.round(diff));
    //         if (weekAfterStart > userData.schedule.length) {
    //             setWeek(userData.schedule.length);
    //         } else {
    //             setWeek(weekAfterStart);
    //         }
    //     }
    // }

    const testHandler = () => {
        // saveUser();
        // dispatch(fetchData());
        // console.log(userData);
        console.log(userData);
    }

    const paginate = (week) => {
        setWeek(week);
        console.log('week App : ', week);
    }

    return (
            <>
                <button className="test-button" onClick={ testHandler }>Test</button>
                {userData && userData.firstName
                    ? <Week
                        week={ week }
                        paginate={ paginate }
                    />
                    : ''
                }
                <div className="panel-row">
                    <ScheduleGrid  />
                    <Progress week={week}/>
                </div>
            </>
    )
}

export default Dashboard;