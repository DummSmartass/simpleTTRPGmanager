import React from 'react';
import InputElement from './InputElement';
import InputList from './InputList';
import StatPoints from './StatPoints';
import Roller from './Roller';
import './App.css';

function App() {

    const generateJSON = () => {
        // Collect name and description
        const name = localStorage.getItem('name') || '';
        const description = localStorage.getItem('description') || '';

        // Collect stats
        const stats = {
            Strength: {
                points: localStorage.getItem('Strength_points') || 0,
                expertise: localStorage.getItem('Strength_expertise') || 0,
                prowess: localStorage.getItem('Strength_prowess') || 0,
            },
            Speed: {
                points: localStorage.getItem('Speed_points') || 0,
                expertise: localStorage.getItem('Speed_expertise') || 0,
                prowess: localStorage.getItem('Speed_prowess') || 0,
            },
            Coordination: {
                points: localStorage.getItem('Coordination_points') || 0,
                expertise: localStorage.getItem('Coordination_expertise') || 0,
                prowess: localStorage.getItem('Coordination_prowess') || 0,
            },
            Endurance: {
                points: localStorage.getItem('Endurance_points') || 0,
                expertise: localStorage.getItem('Endurance_expertise') || 0,
                prowess: localStorage.getItem('Endurance_prowess') || 0,
            },
            Perception: {
                points: localStorage.getItem('Perception_points') || 0,
                expertise: localStorage.getItem('Perception_expertise') || 0,
                prowess: localStorage.getItem('Perception_prowess') || 0,
            },
            Intelligence: {
                points: localStorage.getItem('Intelligence_points') || 0,
                expertise: localStorage.getItem('Intelligence_expertise') || 0,
                prowess: localStorage.getItem('Intelligence_prowess') || 0,
            },
            Will: {
                points: localStorage.getItem('Will_points') || 0,
                expertise: localStorage.getItem('Will_expertise') || 0,
                prowess: localStorage.getItem('Will_prowess') || 0,
            },
            Charisma: {
                points: localStorage.getItem('Charisma_points') || 0,
                expertise: localStorage.getItem('Charisma_expertise') || 0,
                prowess: localStorage.getItem('Charisma_prowess') || 0,
            },
            Life: {
                points: localStorage.getItem('Life_points') || 0,
                expertise: localStorage.getItem('Life_expertise') || 0,
                prowess: localStorage.getItem('Life_prowess') || 0,
            },
        };

        // Collect abilities
        const abilities = [];
        const abilityListLength = parseInt(localStorage.getItem('abilityListLength')) || 0;
        for (let i = 1; i <= abilityListLength; i++) {
            const ability = localStorage.getItem(`ability${i}`);
            if (ability) {
                abilities.push(ability);
            }
        }

        // Collect items
        const items = [];
        const itemListLength = parseInt(localStorage.getItem('ItemListLength')) || 0;
        for (let i = 1; i <= itemListLength; i++) {
            const item = localStorage.getItem(`Item${i}`);
            if (item) {
                items.push(item);
            }
        }

        // Structure data into a JSON object
        const data = {
            name,
            description,
            stats,
            abilities,
            items,
        };

        // Convert data to JSON and create a blob for download
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a download link and click it to start download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name || 'character'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const uploadJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Clear existing abilities and items
                const abilityListLength = parseInt(localStorage.getItem('abilityListLength')) || 0;
                for (let i = 1; i <= abilityListLength; i++) {
                    localStorage.removeItem(`ability${i}`);
                }
                const itemListLength = parseInt(localStorage.getItem('ItemListLength')) || 0;
                for (let i = 1; i <= itemListLength; i++) {
                    localStorage.removeItem(`Item${i}`);
                }
                localStorage.setItem('abilityListLength', data.abilities.length);
                localStorage.setItem('ItemListLength', data.items.length);

                // Set name and description
                localStorage.setItem('name', data.name || '');
                localStorage.setItem('description', data.description || '');

                // Set stats
                for (const stat in data.stats) {
                    localStorage.setItem(`${stat}_points`, data.stats[stat].points);
                    localStorage.setItem(`${stat}_expertise`, data.stats[stat].expertise);
                    localStorage.setItem(`${stat}_prowess`, data.stats[stat].prowess);
                }

                // Set abilities
                data.abilities.forEach((ability, index) => {
                    localStorage.setItem(`ability${index + 1}`, ability);
                });

                // Set items
                data.items.forEach((item, index) => {
                    localStorage.setItem(`Item${index + 1}`, item);
                });

                // Reload the page to reflect the new data
                window.location.reload();
            } catch (error) {
                console.error("Error parsing JSON:", error);
                alert("Failed to load character data. Please ensure the JSON format is correct.");
            }
        };
        reader.readAsText(file);
    };

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
            {/* Generate JSON Button */}
            <button onClick={generateJSON} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Generate JSON File
            </button>
            {/* Upload JSON Button */}
            <input
                type="file"
                accept=".json"
                onChange={uploadJSON}
                style={{ padding: '10px 20px', fontSize: '16px' }}
            />
        </div>
    );
}

export default App;
