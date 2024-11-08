import React from 'react';
import InputElement from '../components/InputElement';
import InputList from '../components/InputList';
import StatPoints from '../components/StatPoints';
import Roller from '../components/Roller';
import '../App.css';

function App() {
    return (
        <div>
            {/* Link to Helper Information */}
            <a href="Info">
                <img
                    src="https://ih0.redbubble.net/image.2765244619.7810/raf,360x360,075,t,fafafa:ca443f4786.jpg"
                    style={{ position: 'absolute', top: 30, right: 30, width: '50px' }}
                    alt="Helper Information"
                />
            </a>
            <br />
            <br />
            {/* Data Table for Name and Description */}
            <div className="data-table">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name">Name:</label>
                        </td>
                        <td>
                            <InputElement labelFor="name" hideLabel />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="description">Description:</label>
                        </td>
                        <td>
                            <InputElement labelFor="description" hideLabel />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <br />
            {/* Stat Points Component */}
            <StatPoints />
            <br />
            {/* Ability and Item Input Lists */}
            <InputList labelFor="ability" />
            <br />
            <InputList labelFor="Item" />
            <br />
            {/* Roller Component */}
            <Roller />
            <br />
            {/* Data Buttons (Download & Upload) Component */}
        </div>
    );
}

export default App;
