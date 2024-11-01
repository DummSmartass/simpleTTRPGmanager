import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';
import InputElement from './InputElement';

function StatPoints() {
    const [showInputs, setShowInputs] = useState(false);
    const [stats, setStats] = useState({
        strength: { points: 5, expertise: 0, prowess: 0 },
        speed: { points: 5, expertise: 0, prowess: 0 },
        coordination: { points: 5, expertise: 0, prowess: 0 },
        endurance: { points: 5, expertise: 0, prowess: 0 },
        perception: { points: 5, expertise: 0, prowess: 0 },
        intelligence: { points: 5, expertise: 0, prowess: 0 },
        will: { points: 5, expertise: 0, prowess: 0 },
        charisma: { points: 5, expertise: 0, prowess: 0 },
        life: { points: 5, expertise: 0, prowess: 0 },
    });

    useEffect(() => {
        const savedStats = JSON.parse(localStorage.getItem('stats')) || {};
        const updatedStats = {};

        for (const stat in stats) {
            updatedStats[stat] = {
                points: savedStats[stat]?.points || 5,
                expertise: savedStats[stat]?.expertise || 0,
                prowess: savedStats[stat]?.prowess || 0,
            };
        }

        setStats(updatedStats);
    }, []);

    useEffect(() => {
        localStorage.setItem('stats', JSON.stringify(stats));
    }, [stats]);

    const calculatePointsSpent = () => {
        return Object.values(stats).reduce((acc, { points }) => acc + points, 0);
    };

    const calculateTotalPoints = () => {
        const statPointsAvailable = parseInt(localStorage.getItem("Stat points")) || 0;
        const pointsSpent = calculatePointsSpent();
        return statPointsAvailable + pointsSpent;
    };

    const calculateHP = () => {
        const life = stats.life.points || 0;
        return life * life;
    };

    const handleInputChange = (stat, field, value) => {
        setStats(prevStats => ({
            ...prevStats,
            [stat]: {
                ...prevStats[stat],
                [field]: value,
            },
        }));
    };

    const toggleInputs = () => {
        setShowInputs(!showInputs);
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
                    {Object.keys(stats).map(stat => (
                        <tr key={stat}>
                            <td>{stat.charAt(0).toUpperCase() + stat.slice(1)}</td>
                            <td>
                                <InputNumber
                                    labelFor={`${stat}_points`}
                                    hideLabel
                                    small
                                    value={stats[stat].points}
                                    onChange={value => handleInputChange(stat, 'points', value)}
                                />
                            </td>
                            <td>
                                <InputNumber
                                    labelFor={`${stat}_expertise`}
                                    hideLabel
                                    small
                                    value={stats[stat].expertise}
                                    onChange={value => handleInputChange(stat, 'expertise', value)}
                                />
                            </td>
                            <td>
                                <InputNumber
                                    labelFor={`${stat}_prowess`}
                                    hideLabel
                                    small
                                    value={stats[stat].prowess}
                                    onChange={value => handleInputChange(stat, 'prowess', value)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <br/>
            <label>Total Points:</label>
            <label id="totalPoints">{calculateTotalPoints()}</label>
            <br/>
            <label>HP: {calculateHP()}</label>
        </div>
    );
}

export default StatPoints;
