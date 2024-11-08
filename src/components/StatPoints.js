import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';

const defaultStats = {
    Strength: 5,
    Speed: 5,
    Coordination: 5,
    Endurance: 5,
    Perception: 5,
    Intelligence: 5,
    Will: 5,
    Charisma: 5,
    Life: 5,
};

function TotalPoints() {
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        const calculateTotalPoints = () => {
            let points = 0;
            Object.keys(localStorage).forEach(key => {
                if (key.endsWith('_points')) {
                    points += parseInt(localStorage.getItem(key)) || 0;
                }
            });
            setTotalPoints(points);
        };

        calculateTotalPoints();
        const interval = setInterval(calculateTotalPoints, 500);

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

function HPTotal() {
    const [hpTotal, setHPTotal] = useState(0);

    useEffect(() => {
        const calculateHPTotal = () => {
            const life = parseInt(localStorage.getItem('Life_points')) || 0;
            setHPTotal(life * life);
        };

        calculateHPTotal();
        const interval = setInterval(calculateHPTotal, 500);

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
    const [showInputs, setShowInputs] = useState(() => {
        return localStorage.getItem("StatPoints_showInputs") === "true";
    });

    useEffect(() => {
        Object.keys(defaultStats).forEach(stat => {
            if (!localStorage.getItem(`${stat}_points`)) {
                localStorage.setItem(`${stat}_points`, defaultStats[stat]);
            }
            if (!localStorage.getItem(`${stat}_expertise`)) {
                localStorage.setItem(`${stat}_expertise`, 0);
            }
            if (!localStorage.getItem(`${stat}_prowess`)) {
                localStorage.setItem(`${stat}_prowess`, 0);
            }
        });
    }, []);

    const toggleInputs = () => {
        setShowInputs(prevState => {
            const newState = !prevState;
            localStorage.setItem("StatPoints_showInputs", newState);
            return newState;
        });
    };

    const handleBlur = () => {
        // Recalculate TotalPoints and HPTotal on value change
    };

    return (
        <div className="stat-points">
            <label htmlFor="Stats">Stats:</label>
            <button onClick={toggleInputs}>{showInputs ? 'Hide' : 'Show'}</button>
            {showInputs && (
                <div className="data-table">
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
                        {Object.keys(defaultStats).map(stat => (
                            <tr key={stat}>
                                <td>{stat}</td>
                                <td>
                                    <InputNumber
                                        labelFor={`${stat}_points`}
                                        hideLabel
                                        small
                                        onBlur={handleBlur}
                                    />
                                </td>
                                <td>
                                    <InputNumber
                                        labelFor={`${stat}_expertise`}
                                        hideLabel
                                        small
                                        onBlur={handleBlur}
                                    />
                                </td>
                                <td>
                                    <InputNumber
                                        labelFor={`${stat}_prowess`}
                                        hideLabel
                                        small
                                        onBlur={handleBlur}
                                    />
                                </td>
                            </tr>
                        ))}
                        <TotalPoints />
                        <HPTotal />
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default StatPoints;
