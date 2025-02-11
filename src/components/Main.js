import React from 'react';
import InputElement from './InputElement';
import InputList from './InputList';
import StatPoints from './StatPoints';
import Roller from './Roller';
import { LanguageProvider, useLanguage } from './LanguageContext';
import './App.css';

const translations = {
    en: {
        helperInfo: "Helper Information",
        name: "Name:",
        description: "Description:",
        generateJSON: "Generate JSON File",
        uploadJSON: "Upload JSON File",
        stats: "Stats:",
        abilities: "Abilities:",
        items: "Items:",
        roller: "Roller:",
    },
    pl: {
        helperInfo: "Informacje Pomocnicze",
        name: "Imię:",
        description: "Opis:",
        generateJSON: "Wygeneruj Plik JSON",
        uploadJSON: "Prześlij Plik JSON",
        stats: "Statystyki:",
        abilities: "Umiejętności:",
        items: "Przedmioty:",
        roller: "Rzut:",
    }
};

function App() {
    const { language, toggleLanguage } = useLanguage();
    const t = translations[language];

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
        const abilities = JSON.parse(localStorage.getItem('ability_inputs')) || [];
        abilities.forEach(ability => {
            ability.name = localStorage.getItem(`${ability.id}_name`) || '';
            ability.description = localStorage.getItem(`${ability.id}_description`) || '';
        });

        // Collect items
        const items = JSON.parse(localStorage.getItem('Item_inputs')) || [];
        items.forEach(item => {
            item.name = localStorage.getItem(`${item.id}_name`) || '';
            item.description = localStorage.getItem(`${item.id}_description`) || '';
        });

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

                // Set name and description
                localStorage.setItem('name', data.name || '');
                localStorage.setItem('description', data.description || '');

                // Set stats
                for (const stat in data.stats) {
                    localStorage.setItem(`${stat}_points`, data.stats[stat].points);
                    localStorage.setItem(`${stat}_expertise`, data.stats[stat].expertise);
                    localStorage.setItem(`${stat}_prowess`, data.stats[stat].prowess);
                }

                // Clear existing abilities and items if not present in the new data
                if (!data.abilities || data.abilities.length === 0) {
                    localStorage.removeItem('ability_inputs');
                    const abilityInputs = JSON.parse(localStorage.getItem('ability_inputs')) || [];
                    abilityInputs.forEach(ability => {
                        localStorage.removeItem(`${ability.id}_name`);
                        localStorage.removeItem(`${ability.id}_description`);
                    });
                } else {
                    // Set abilities
                    data.abilities.forEach(ability => {
                        localStorage.setItem(`${ability.id}_name`, ability.name || '');
                        localStorage.setItem(`${ability.id}_description`, ability.description || '');
                    });
                    localStorage.setItem('ability_inputs', JSON.stringify(data.abilities));
                }

                if (!data.items || data.items.length === 0) {
                    localStorage.removeItem('Item_inputs');
                    const itemInputs = JSON.parse(localStorage.getItem('Item_inputs')) || [];
                    itemInputs.forEach(item => {
                        localStorage.removeItem(`${item.id}_name`);
                        localStorage.removeItem(`${item.id}_description`);
                    });
                } else {
                    // Set items
                    data.items.forEach(item => {
                        localStorage.setItem(`${item.id}_name`, item.name || '');
                        localStorage.setItem(`${item.id}_description`, item.description || '');
                    });
                    localStorage.setItem('Item_inputs', JSON.stringify(data.items));
                }

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
            <button onClick={toggleLanguage} style={{ position: 'absolute', top: 10, left: 10, padding: '10px 20px', fontSize: '16px' }}>
                {language === 'en' ? 'Przełącz na Polski' : 'Switch to English'}
            </button>
            {/* Link to Helper Information */}
            <a href="Info">
                <img
                    src="https://ih0.redbubble.net/image.2765244619.7810/raf,360x360,075,t,fafafa:ca443f4786.jpg"
                    style={{ position: 'fixed', top: '30px', right: '30px', width: '50px' }}
                    alt={t.helperInfo}
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
                            <label htmlFor="name">{t.name}</label>
                        </td>
                        <td>
                            <InputElement labelFor="name" hideLabel />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="description">{t.description}</label>
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
            <h2>{t.stats}</h2>
            <StatPoints />
            <br />
            {/* Ability and Item Input Lists */}
            <h2>{t.abilities}</h2>
            <InputList labelFor="ability" />
            <br />
            <h2>{t.items}</h2>
            <InputList labelFor="Item" />
            <br />
            {/* Roller Component */}
            <h2>{t.roller}</h2>
            <Roller />
            <br />
            {/* Generate JSON Button */}
            <button onClick={generateJSON} style={{ padding: '10px 20px', fontSize: '16px' }}>
                {t.generateJSON}
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

const AppWithLanguageProvider = () => (
    <LanguageProvider>
        <App />
    </LanguageProvider>
);

export default AppWithLanguageProvider;
