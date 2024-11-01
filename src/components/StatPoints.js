import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';

function StatPoints() {
    const [pointsLeft, setPointsLeft] = useState(0); // Initialize pointsLeft state
    const [HP, setHP] = useState(0); // Initialize HP state
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
        const refreshInterval = setInterval(() => {
            const updatedPointsLeft = calculatePointsLeft();
            setPointsLeft(updatedPointsLeft);
            const updatedHP = calculateHP(); // Recalculate HP every second
            setHP(updatedHP);
        }, 1000); // Refresh every second

        return () => clearInterval(refreshInterval);
    }, []);

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

    const calculatePointsLeft = () => {
        const statPointsAvailable = parseInt(localStorage.getItem("Stat points")) || 0;
        const pointsSpent = calculatePointsSpent();
        return statPointsAvailable - pointsSpent;
    };

    const calculateHP = () => {
        const life = stats.life.points || 0; // Fetch "life" from stats
        return life * life; // Calculate HP based on life
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
        <div>
            <label htmlFor="Stats">Stats:</label>
            <button onClick={toggleInputs}>{showInputs ? 'Hide' : 'Show'}</button>
            {showInputs && (
                <table>
                    <thead>
                    <tr>
                        <th>Points</th>
                        <th>Experience</th>
                        <th>Prowess</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(stats).map(stat => (
                        <tr key={stat}>
                            <td><InputNumber labelFor={stat} value={stats[stat].points} onChange={value => handleInputChange(stat, 'points', value)} /></td>
                            <td><InputNumber labelFor={`${stat}_expertise`} value={stats[stat].expertise} onChange={value => handleInputChange(stat, 'expertise', value)} /></td>
                            <td><InputNumber labelFor={`${stat}_prowess`} value={stats[stat].prowess} onChange={value => handleInputChange(stat, 'prowess', value)} /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <br/>
            <label>Points left:</label>
            <label id="pointsLeft">{pointsLeft}</label>
            <br/>
            <label>HP: {HP}</label>
        </div>
    );
}

export default StatPoints;
