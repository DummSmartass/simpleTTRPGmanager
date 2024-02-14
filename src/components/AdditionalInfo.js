import React from 'react';

function AdditionalInfo() {
  return (
    <div class="container">
    <h1>How to Create Your Character</h1>
    <h2>Name:</h2>
    <ul>
        <li>Choose a name that fits your character's personality and world.</li>
    </ul>
    
    <h2>Description (Optional):</h2>
    <ul>
        <li>If you want to describe your character's appearance, personality, backstory, goals, and anything else that makes them unique. All of those can help game master craft challenges and plot points most fitting for your character.</li>
    </ul>
    
    <h2>Stats:</h2>
    <ul>
        <li>Typically characters start with 48 points to distribute across these core statistics:</li>
        <li><strong>Strength:</strong> Is a base for melee damage, dictates success for lifting things and grappling, dictates how many items you can carry etc.</li>
        <li><strong>Speed:</strong> Allows you to do more in a round, different actions take different amount of action points to perform, and speed linear dictates how many of those you get in a round.</li>
        <li><strong>Coordination:</strong> Is a base for success of ALL actions that focus on moving body around: melee attacks, shooting, grappling, dodging, parkour, brewing potions, repairing armor and more.</li>
        <li><strong>Endurance:</strong> Serves to roles, firstly you substract it from damage every time its delt to you, second it dictates how well your character handles hostile conditions like lack of air, poison, sickness, extreme temperatures, bleeding, pain and more.</li>
        <li><strong>Perception:</strong> Has to uses, firstly it is a base for success for all actions that aim to notice or react to something, secondly it serves as a base for success for casting magic.</li>
        <li><strong>Will:</strong> Is a source of magical power, the more you have the stronger your spells on top of that it dictates how well your character handles hostile conditions for your mind like pain, fear, mind control, strong emotions and more.</li>
        <li><strong>Charisma:</strong> Is a base value for success of social interaction and its high values make your character seem more trustworthy, likable and approachable.</li>
        <li><strong>Life HP=Life^2:</strong>  You lose HP when you get damaged, you regenerate them all when you sleep, if you ran out of them you you’re your character dying.</li>
        <li>Note: Minimum stat value is 1, and you can only use whole numbers.</li>
    </ul>
    
    <h2>Items and Abilities:</h2>
    <ul>
        <li>Choose items and abilities that fit your character's concept. Describe them briefly.</li>
        <li>The game master will assign specific rules to chosen items/abilities.</li>
        <li>Manage weight carefully: heavy items require 2 Strength, regular items require 1, and light items require 0.5.</li>
        <li>Most games start with a combined total of 10 slots for items and abilities COMBINED. Focus on what benefits your character most, and remember you can acquire more later.</li>
    </ul>
    
    <h2>Final Step:</h2>
    <ul>
        <li>You're ready to play! Have fun!</li>
    </ul>
    
    <h2>Additional Tips:</h2>
    <ul>
        <li>Consider the specific settings playing group agrred on when creating your character or at least justify their existance in the story a mediavial knight hardly fits cyberpunk world.</li>
        <li>Create a character you find enjoyable to play and if you are not content with it you can always start over or ask if you could change a thing or two.</li>
        <li>Don't be afraid to be creative and unique, but don’t feel pressured to always play something original!</li>
    </ul>
</div>
  );
}

export default AdditionalInfo;


