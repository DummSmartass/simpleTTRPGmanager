import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';

// Updated TotalPoints component to calculate total points every 0.5 seconds
function TotalPoints() {
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let points = 0;
            Object.keys(localStorage).forEach(key => {
                if (key.endsWith('_points')) {
                    points += parseInt(localStorage.getItem(key)) || 0;
                }
            });
            setTotalPoints(points);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <tr>
            <td colSpan="4" style={{ textAlign: 'left' }}>
                <strong>Total Points:</strong> {totalPoints}
            </td>
        </tr>
    );
}

// Updated HPTotal component to calculate HP total every 0.5 seconds
function HPTotal() {
    const [hpTotal, setHPTotal] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const life = parseInt(localStorage.getItem('life_points')) || 0;
            setHPTotal(life * life);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <tr>
            <td colSpan="4" style={{ textAlign: 'left' }}>
                <strong>HP Total:</strong> {hpTotal}
            </td>
        </tr>
    );
}


function StatPoints() {
    const [showInputs, setShowInputs] = useState(false);

    const toggleInputs = () => {
        setShowInputs(!showInputs);
    };

    const handleBlur = () => {
        // Trigger recalculation of TotalPoints and HPTotal
    };

    return (
        <div className="stat-points">
            <label htmlFor="Stats">Stats:</label>
            <button onClick={toggleInputs}>{showInputs ? 'Hide' : 'Show'}</button>
            {showInputs && (
                <table>
                    <thead>
                    <tr>
                        <th>Stat</th>
                        <th>Points</th>
                        <th>Experience</th>
                        <th>Prowess</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(localStorage).map(key => {
                        if (key.endsWith('_points')) {
                            const stat = key.split('_')[0];
                            return (
                                <tr key={stat}>
                                    <td>{stat.charAt(0).toUpperCase() + stat.slice(1)}</td>
                                    <td>
                                        <InputNumber
                                            labelFor={key}
                                            hideLabel
                                            small
                                            value={localStorage.getItem(key)}
                                            onBlur={handleBlur}
                                        />
                                    </td>
                                    <td>
                                        <InputNumber
                                            labelFor={`${stat}_expertise`}
                                            hideLabel
                                            small
                                            value={localStorage.getItem(`${stat}_expertise`)}
                                            onBlur={handleBlur}
                                        />
                                    </td>
                                    <td>
                                        <InputNumber
                                            labelFor={`${stat}_prowess`}
                                            hideLabel
                                            small
                                            value={localStorage.getItem(`${stat}_prowess`)}
                                            onBlur={handleBlur}
                                        />
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                    <TotalPoints /> {/* Add the TotalPoints component here */}
                    <HPTotal /> {/* Add the HPTotal component here */}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default StatPoints;