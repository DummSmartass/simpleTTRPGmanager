// Enhanced layout and visibility for HP/AP controls with proper number inputs and memory
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
        currentHP: "Current HP",
        actionPoints: "Action Points",
        resetCurrentHP: "Reset Current HP to default",
        resetActionPoints: "Reset Action Points to default",
        takeDamage: "Take Damage",
        useAction: "Use Action Points"
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
        currentHP: "Obecne HP",
        actionPoints: "Punkty akcji",
        resetCurrentHP: "Zresetuj Obecne HP do domyślnego",
        resetActionPoints: "Zresetuj Punkty akcji do domyślnych",
        takeDamage: "Otrzymaj Obrażenia",
        useAction: "Zużyj Punkty Akcji"
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

function StatPoints() {
    const [showInputs, setShowInputs] = useState(() => localStorage.getItem("StatPoints_showInputs") === "true");
    const { language } = useLanguage();
    const t = translations[language];

    const [life, setLife] = useState(5);
    const [speed, setSpeed] = useState(5);
    const [endurance, setEndurance] = useState(5);

    const [currentHP, setCurrentHP] = useState(() => parseInt(localStorage.getItem('currentHP')) || 0);
    const [actionPoints, setActionPoints] = useState(() => parseInt(localStorage.getItem('actionPoints')) || 0);

    const [hpSubtract, setHPSubtract] = useState(() => 0);
    const [apSubtract, setAPSubtract] = useState(() => 0);

    useEffect(() => {
        const updateStats = () => {
            setLife(parseInt(localStorage.getItem('Life_points')) || 0);
            setSpeed(parseInt(localStorage.getItem('Speed_points')) || 0);
            setEndurance(parseInt(localStorage.getItem('Endurance_points')) || 0);
        };
        updateStats();
        const interval = setInterval(updateStats, 500);
        return () => clearInterval(interval);
    }, []);

    const toggleInputs = () => {
        const newState = !showInputs;
        setShowInputs(newState);
        localStorage.setItem("StatPoints_showInputs", newState);
    };

    const resetHP = () => {
        const val = life * life;
        localStorage.setItem('currentHP', val);
        setCurrentHP(val);
    };

    const resetAP = () => {
        localStorage.setItem('actionPoints', speed);
        setActionPoints(speed);
    };

    const takeDamage = () => {
        const reduced = Math.max(0, hpSubtract - endurance);
        const newHP = Math.max(0, currentHP - reduced);
        localStorage.setItem('currentHP', newHP);
        setCurrentHP(newHP);
    };

    const useAction = () => {
        const newAP = Math.max(0, actionPoints - apSubtract);
        localStorage.setItem('actionPoints', newAP);
        setActionPoints(newAP);
    };

    return (
        <div className="stat-points">
            <label htmlFor="Stats">{t.stats}</label>
            <button onClick={toggleInputs}>{showInputs ? t.hide : t.show}</button>

            {showInputs && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                        <label>{t.currentHP}</label>
                        <input
                            type="number"
                            value={currentHP}
                            onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                localStorage.setItem('currentHP', val);
                                setCurrentHP(val);
                            }}
                        />
                        <button onClick={resetHP}>{t.resetCurrentHP}</button>
                        <input
                            type="number"
                            value={hpSubtract}
                            onChange={(e) => setHPSubtract(parseInt(e.target.value) || 0)}
                        />
                        <button onClick={takeDamage}>{t.takeDamage}</button>
                        <span>{`${currentHP}/${life * life}`}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <label>{t.actionPoints}</label>
                        <input
                            type="number"
                            value={actionPoints}
                            onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                localStorage.setItem('actionPoints', val);
                                setActionPoints(val);
                            }}
                        />
                        <button onClick={resetAP}>{t.resetActionPoints}</button>
                        <input
                            type="number"
                            value={apSubtract}
                            onChange={(e) => setAPSubtract(parseInt(e.target.value) || 0)}
                        />
                        <button onClick={useAction}>{t.useAction}</button>
                        <span>{`${speed ? (actionPoints / speed).toFixed(2) : "0.00"}`}</span>
                    </div>

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
                                            onBlur={() => {}}
                                        />
                                    </td>
                                    <td>
                                        <InputNumber
                                            labelFor={`${stat}_expertise`}
                                            hideLabel
                                            small
                                            onBlur={() => {}}
                                        />
                                    </td>
                                    <td>
                                        <InputNumber
                                            labelFor={`${stat}_prowess`}
                                            hideLabel
                                            small
                                            onBlur={() => {}}
                                        />
                                    </td>
                                </tr>
                            ))}
                            <TotalPoints />
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'left' }}>
                                    <strong>{t.hpTotal}</strong> {life * Math.abs(life)}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default StatPoints;
