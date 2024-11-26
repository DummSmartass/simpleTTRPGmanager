import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const translations = {
    en: {
        expression: "Expression:",
        roll: "Roll",
        noRoll: "no roll so far",
        invalidExpression: "Invalid expression",
        placeholder: "Enter dice expression"
    },
    pl: {
        expression: "Wyrażenie:",
        roll: "Rzuć",
        noRoll: "brak rzutu dotąd",
        invalidExpression: "Nieprawidłowe wyrażenie",
        placeholder: "Wprowadź wyrażenie rzutu"
    }
};

function Roller() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [breakdown, setBreakdown] = useState('');
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        setResult(t.noRoll);
    }, [language, t.noRoll]);

    // Roll dice with given sides and levels of advantage/disadvantage
    const rollDice = (sides, advantage = 0, disadvantage = 0) => {
        const numRolls = Math.max(1, advantage + 1, disadvantage + 1);
        const rolls = Array.from({ length: numRolls }, () => Math.floor(Math.random() * sides) + 1);

        let rollResult;
        let description;

        if (advantage > 0) {
            rollResult = Math.max(...rolls);
            description = `max(${rolls.join(', ')})`;
        } else if (disadvantage > 0) {
            rollResult = Math.min(...rolls);
            description = `min(${rolls.join(', ')})`;
        } else {
            rollResult = rolls[0];
            description = `${rollResult}`;
        }

        return { value: rollResult, description };
    };

    // Parse expression and simplify dots around dice rolls
    const parseExpression = (exp) => {
        const dicePattern = /(\.{0,})d(\.{0,})(\d+)/g;
        let breakdownParts = [];

        const replacedExp = exp.replace(dicePattern, (match, preDots, postDots, sides) => {
            const minDots = Math.min(preDots.length, postDots.length);
            const effectiveAdvantage = preDots.length - minDots;
            const effectiveDisadvantage = postDots.length - minDots;

            const { value, description } = rollDice(Number(sides), effectiveAdvantage, effectiveDisadvantage);
            breakdownParts.push(description);
            return value;
        });

        try {
            const evalResult = Function(`"use strict"; return (${replacedExp})`)();
            setResult(evalResult);

            let i = 0;
            const breakdownString = exp.replace(dicePattern, () => breakdownParts[i++]);

            setBreakdown(`${breakdownString} = ${evalResult}`);
        } catch {
            setResult(t.invalidExpression);
            setBreakdown('');
        }
    };

    const handleRoll = () => {
        parseExpression(expression);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleRoll();
        }
    };

    return (
        <div className="data-table">
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="expression">{t.expression}</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="expression"
                            name="expression"
                            value={expression}
                            onChange={(e) => setExpression(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t.placeholder}
                            style={{ width: '98%' }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={handleRoll}>{t.roll}</button>
                    </td>
                    <td>
                        <label id="result" style={{ fontWeight: 'bold' }}>
                            {result}
                        </label>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <label id="breakdown" style={{ whiteSpace: 'nowrap' }}>{breakdown}</label>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Roller;
