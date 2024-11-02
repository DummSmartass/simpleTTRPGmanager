import React, { useState } from 'react';
import InputNumber from './InputNumber';

function Roller() {
    const [value, setValue] = useState(0);

    function myFunction() {
        const max = parseInt(localStorage.getItem("Max")) || 0;
        document.getElementById("result").innerText = Math.floor(Math.random() * max) + 1;
    }

    return (
        <div className="data-table">
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="Max">Max:</label>
                    </td>
                    <td>
                        <InputNumber labelFor="Max" hideLabel />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={myFunction}>Roll</button>
                    </td>
                    <td>
                        <label id="result">no roll so far</label>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Roller;
