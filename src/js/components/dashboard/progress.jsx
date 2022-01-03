import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../store/userSlice';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Progress(props) {
    const schedule = useSelector((state) => state.user.userData.schedule);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [percentOfRunsComplete, setPercentOfRunsComplete] = useState(0);
    const [percentOfMilesComplete, setPercentOfMilesComplete] = useState(0);
    const { week } = props;
    const durationEnum = {
        TOTAL: "Total",
        WEEK: "Week"
    }
    const colorEnum = {
        BLUE: "#7BDFF2",
        TEAL: "#b2f7ef"
    }
    const [duration, setDuration] = useState(durationEnum.WEEK);
    const [toggleChecked, setToggleChecked] = useState(false);
    const [color, setColor] = useState(colorEnum.TEAL);


    useEffect(() => {
        console.log('recalculate firing');
        if (schedule) {
            console.log('has schedule, ', duration)
            calculatePercentages(duration);
        }
    }, [schedule, duration, week])

    const calculatePercent = (complete, total) => {
        if (!complete || !total) return;

        return (complete / total).toFixed(2) * 100;
    }

    const calculatePercentages = (timeFrame) => {
        let [totalRuns, totalRunsComplete, totalMiles, totalMilesComplete] = Array(4).fill(0)

        const incrementForWeek = (currentWeek) => {
            currentWeek.runs.forEach((run) => {
                totalMiles += run.distance;
                totalRuns++;
                if (run.isComplete) {
                    totalRunsComplete++;
                    totalMilesComplete += run.distance;
                }
            })
        }

        if (timeFrame === durationEnum.TOTAL) {
            setColor(colorEnum.BLUE);
            schedule.weeks.forEach((eachWeek) => {
                incrementForWeek(eachWeek);
            })
        }

        if (timeFrame === durationEnum.WEEK) {
            setColor(colorEnum.TEAL);
            incrementForWeek(schedule.weeks[week])
        }

        setPercentOfRunsComplete(calculatePercent(totalRunsComplete, totalRuns) || 0 );
        setPercentOfMilesComplete(calculatePercent(totalMilesComplete, totalMiles) || 0 );
    }

    const toggleDuration = () => {
        toggleChecked ? setDuration(durationEnum.WEEK) : setDuration(durationEnum.TOTAL);
        setToggleChecked(!toggleChecked);
    }

    return(
        <>
            <div className=' progress-wrapper panel'>
                <div className="duration-toggle">
                    <p>Week</p>
                    <div className="switch-spacer">
                        <label className="toggle-switch">
                            <input type="checkbox"  onChange={ toggleDuration } checked={ toggleChecked }/>
                            <span className="slider round" />
                        </label>
                    </div>
                    <p>Total</p>
                </div>
                <div className="circular-progress-container">
                    <h2>Percent of Runs completed {duration}</h2>

                    <CircularProgressbar
                        value={percentOfRunsComplete}
                        text={`${percentOfRunsComplete}`}
                         styles={buildStyles({
                            textSize: '1rem',
                            pathColor: color,
                            textColor: color,
                            trailColor: '#2f2f2f'
                    })}/>
                </div>
                <div className="circular-progress-container">
                    <h2>Percent of Miles completed {duration}</h2>
                    <CircularProgressbar
                        value={percentOfMilesComplete}
                        text={`${percentOfMilesComplete}`}
                        styles={buildStyles({
                            textSize: '1rem',
                            pathColor: color,
                            textColor: color,
                            trailColor: '#2f2f2f'
                    })}/>
                </div>

            </div>
        </>
    )

}

export default Progress;
