import React, { useState } from 'react';

function Roller() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('no roll so far');
    const [breakdown, setBreakdown] = useState('');

    // Roll dice with given sides and levels of advantage/disadvantage
    const rollDice = (sides, advantage = 0, disadvantage = 0) => {
        const numRolls = Math.max(1, advantage || disadvantage || 1);
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
            setResult('Invalid expression');
            setBreakdown('');
        }
    };

    const handleRoll = () => {
        parseExpression(expression);
    };

    return (
        <div className="data-table">
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="expression">Expression:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="expression"
                            name="expression"
                            value={expression}
                            onChange={(e) => setExpression(e.target.value)}
                            placeholder="Enter dice expression"
                            style={{ width: '98%' }}
                        />

                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={handleRoll}>Roll</button>
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
