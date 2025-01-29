import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';
import { useLanguage } from './LanguageContext';

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

const translations = {
    en: {
        stats: "Stats:",
        show: "Show",
        hide: "Hide",
        totalPoints: "Total Points:",
        hpTotal: "MAX HP:",
        stat: "Stat",
        points: "Points",
        expertise: "Expertise",
        prowess: "Prowess",
        Strength: "Strength",
        Speed: "Speed",
        Coordination: "Coordination",
        Endurance: "Endurance",
        Perception: "Perception",
        Intelligence: "Intelligence",
        Will: "Will",
        Charisma: "Charisma",
        Life: "Life",
    },
    pl: {
        stats: "Statystyki:",
        show: "Pokaż",
        hide: "Ukryj",
        totalPoints: "Suma Punktów:",
        hpTotal: "MAX HP:",
        stat: "Statystyka",
        points: "Punkty",
        expertise: "Ekspertyza",
        prowess: "Wprawa",
        Strength: "Siła",
        Speed: "Szybkość",
        Coordination: "Koordynacja",
        Endurance: "Wytrzymałość",
        Perception: "Percepcja",
        Intelligence: "Inteligencja",
        Will: "Wola",
        Charisma: "Charyzma",
        Life: "Życie",
    }
};

function TotalPoints() {
    const [totalPoints, setTotalPoints] = useState(0);
    const { language } = useLanguage();
    const t = translations[language];

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
    }, [language]);

    return (
        <tr>
            <td colSpan="4" style={{ textAlign: 'left' }}>
                <strong>{t.totalPoints}</strong> {totalPoints}
            </td>
        </tr>
    );
}

function HPTotal() {
    const [hpTotal, setHPTotal] = useState(0);
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        const calculateHPTotal = () => {
            const life = parseInt(localStorage.getItem('Life_points')) || 0;
            setHPTotal(life * life);
        };

        calculateHPTotal();
        const interval = setInterval(calculateHPTotal, 500);

        return () => clearInterval(interval);
    }, [language]);

    return (
        <tr>
            <td colSpan="4" style={{ textAlign: 'left' }}>
                <strong>{t.hpTotal}</strong> {hpTotal}
            </td>
        </tr>
    );
}

function StatPoints() {
    const [showInputs, setShowInputs] = useState(() => {
        return localStorage.getItem("StatPoints_showInputs") === "true";
    });
    const { language } = useLanguage();
    const t = translations[language];

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
            <label htmlFor="Stats">{t.stats}</label>
            <button onClick={toggleInputs}>{showInputs ? t.hide : t.show}</button>
            {showInputs && (
                <div className="data-table">
                    <table>
                        <thead>
                        <tr>
                            <th>{t.stat}</th>
                            <th>{t.points}</th>
                            <th>{t.expertise}</th>
                            <th>{t.prowess}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(defaultStats).map(stat => (
                            <tr key={stat}>
                                <td>{t[stat]}</td>
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
