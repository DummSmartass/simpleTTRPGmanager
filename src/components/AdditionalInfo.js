import React from 'react';

function AdditionalInfo() {
    return (
        <div className="container">
            <h1>Manual for Playing Simple RPG</h1>

            <p>Your character can do whatever is reasonable for almost any person in the given setting, as well as actions permitted by their abilities or equipment. Many rules will need to be improvised (e.g., flashy moves may require learning, basic handiwork can be done with tools without training, and potion brewing may require both skill and equipment).</p>

            <h2>Stats:</h2>
            <ul>
                <li><strong>Strength</strong>
                    <ul>
                        <li>Determines physical power and influences how much your character can lift, carry, push, and how far or high they can jump.</li>
                        <li>It serves as the base for melee attack damage.</li>
                    </ul>
                </li>
                <li><strong>Speed</strong>
                    <ul>
                        <li>Each <em>action</em> requires time, represented as <em>action points</em>.</li>
                        <li>Every <em>round</em>, you receive as many action points as your speed stat. Exceeding your action points is only possible by using a <em>reaction</em> also order in which characters can move is as they want, but person with the most action points has priority if they want to move before others and are forced to move first if nobody want to.</li>
                    </ul>
                </li>
                <li><strong>Coordination</strong>
                    <ul>
                        <li>Serves as the basis for success checks on manual actions like melee and ranged attacks, acrobatic dodging, stealth, lock-picking, and pickpocketing.</li>
                    </ul>
                </li>
                <li><strong>Endurance</strong>
                    <ul>
                        <li>Used to calculate <em>taken damage</em> by subtracting endurance (and sometimes other factors) from the <em>damage dealt</em> to a character.</li>
                        <li>Determines how well a character withstands harsh environments, exhaustion, lack of sleep, food, water, air, and other challenges like disease, toxins, and poison. Higher endurance reduces or negates negative effects.</li>
                    </ul>
                </li>
                <li><strong>Perception</strong>
                    <ul>
                        <li>This stat helps your character notice details, like surroundings, people, and properties of objects. Useful for spotting ambushes, finding flaws in enemy equipment, and success checks for specific magic spells.</li>
                    </ul>
                </li>
                <li><strong>Intelligence</strong>
                    <ul>
                        <li>Used for success checks in recalling, understanding, and applying knowledge and technical skills (e.g., brewing, artificery, and some spells).</li>
                    </ul>
                </li>
                <li><strong>Willpower</strong>
                    <ul>
                        <li>Determines success in resisting strong emotions (fear, anger), mental attacks, and enduring mental challenges like hunger, sleep, and deprivation. It also powers most spells.</li>
                    </ul>
                </li>
                <li><strong>Charisma</strong>
                    <ul>
                        <li>Governs the success of all social interactions and influences how others perceive you. Higher charisma makes you more intimidating or approachable, depending on intent.</li>
                    </ul>
                </li>
                <li><strong>Health</strong>
                    <ul>
                        <li>Max health points are calculated as Health^2. You begin with maximum health, but this may fluctuate with damage or prolonged rest. Lasting injuries can reduce the maximum health, and full regeneration may be affected by comfort (dictated by endurance).</li>
                        <li>If health drops below 0, you faint and lose 1 point per round until reaching 0. If this doesn’t happen, you may either return to 1 HP or die on a coin toss. Dropping below -Health^2 results in permanent death.</li>
                    </ul>
                </li>
            </ul>

            <h2>Character Creation:</h2>
            <ol>
                <li>Assign values to stats; only use natural numbers, and the total sum must be 45.</li>
                <li>Choose a total of 5 items and/or abilities (not 5 of each, 5 total) for which rules will be made by the game master.</li>
            </ol>

            <h2>Character Development</h2>
            <h3>Direct</h3>
            <p>After missions or cool actions, rewards are given at the game master’s discretion, including one or more of the following options:</p>
            <ul>
                <li><strong>Expertise:</strong> For every level of expertise, roll one additional die for the associated stat and use the highest value.</li>
                <li><strong>Prowess:</strong> Normally, you roll with a d6. Each level of prowess advances the dice as follows:
                    <ul>
                        <li>d6 → d8 → d10 → d12 → d20 → d20+d4 → d20+d6 → d20+d8 → d20+d10 → d20+d12 → d20+d20 → d20+d20+d4 → d20+d20+d6 → d20+d20+d8 → d20+d20+d10 → d20+d20+d12 → d20+d20+d20 → d100</li>
                    </ul>
                </li>
                <li><strong>Ability:</strong> Gain a new ability, either by selection, natural progression, or random assignment.</li>
                <li><strong>Stat Points:</strong> Adds directly to stats, with no time limit or rolls; points remain permanently.</li>
                <li><strong>Other:</strong> Occasionally, you may receive limited-use rewards (e.g., rerolls, dice flips, or dice steals).</li>
            </ul>

            <h3>Indirect</h3>
            <ul>
                <li>Characters can acquire new equipment, allies, or reputation.</li>
            </ul>

            <h2>Critical Rolls</h2>
            <ul>
                <li><strong>Critical Success:</strong> If you succeed and roll the highest number on a die, you may get a bonus effect. Higher prowess enhances crit effects (e.g., a Perception crit on d6 reveals a recent wound, while a crit on d20 reveals the enemy’s origin story).</li>
                <li><strong>Critical Failure:</strong> If you fail and roll the lowest number, there may be negative effects like injuries.</li>
            </ul>

            <h2>Multi Action</h2>
            <p>You can perform MANY actions at the same time</p>
            <ul>
                <li><strong>Non conflicting action</strong> You can do multiple things that don't contradict each other at the same time and if they don't use the same stat you are good (like climbing a tree and looking for bird nests at the same time).</li>
                <li><strong>Partially conflicting actions</strong> Some actions can mechanically get in each other's way or require the same stat in a way that would force a person to divide it in real life. In that case, you split the stat/base between them. Eg. Swinging two swords wouldn’t allow you to put on your force in either strike + those are two attacks so your base strength dictating damage is halved as well as base coordination for hit. OR You look for a hidden pressure plate avoiding traps dividing your base perception in two for those tasks. (Also you don't have to divide equally) (Also also if you are confident your base is enough you can give up rolling for one of those things) (Also Also Also things like jumping while attacking doesn't require splitting stats as they don't get in each other way).</li>
                <li><strong>Conflicting actions</strong> If you are in the middle of an action that fully conflicts with something else (physically those things aren't doable at the same time) you can drop that action and get some of the action points back (how many depends on how many were there - how many the person that used the least action points used), it can only be done before you roll for it.</li>
            </ul>

            <h2>Be Creative</h2>
            <ul>
                <li><strong>Rule of Cool:</strong> Rules are flexible; if you try something cool and inventive, the game master may allow it.</li>
                <li><strong>Rule of Opportunity:</strong> Gain bonuses or advantages by reasoning with the game master. For example, +3 to hit an enemy from a higher position.</li>
                <li><strong>Rule of Basic Common Sense:</strong> If your character attempts an action equivalent person in real life could do without any preparation/learning, the game master will create a rule, requirement, or check to allow it in-game. For example, actions like pushing a library shelf onto an enemy, cauterizing a wound, or climbing a tree are possible even if not mentioned.</li>
            </ul>

            <h2>Basic Actions: YOU DO NOT HAVE TO LEARN THIS, YOU CAN JUST LOOK THEM UP IF NEEDED</h2>
            <ul>
                <li><strong>Melee Combat:</strong> Strength + roll for damage (includes fists and weapons, depending on weapon). Both parties roll Coordination (for hit/dodge), and the higher result succeeds. Uses 2 action points.</li>
                <li><strong>Holding:</strong> Strength x 3 kg for carrying capacity. Rolling for additional strength requires a roll each round.</li>
                <li><strong>Lifting:</strong> (Strength + roll) x 3 kg overhead, uses 3 action points.</li>
                <li><strong>Jumping (Distance):</strong> (Strength + roll) / 5 + Speed / 2 if running start is 40% of a round; uses 3 action points.</li>
                <li><strong>Jumping (Height):</strong> (Strength + roll) / 20 + Speed / 8 if running start is 40% of a round; uses 3 action points.</li>
                <li><strong>Throwing:</strong> (Strength / weight) x 3, base damage depends on distance; uses 2 action points. Targets gain +1 dodge and -1 grab for each meter distance.</li>
                <li><strong>Shooting:</strong> Similar to Throwing but without Strength.</li>
                <li><strong>Dodge:</strong> Roll Coordination.</li>
                <li><strong>Catch:</strong> Roll Coordination.</li>
                <li><strong>Running:</strong> 1 action point per 3m.</li>
                <li><strong>Casting Spells:</strong> Roll Will + roll for power, Perception or Intelligence for success (95% of spells).</li>
                <li><strong>Breaking Objects:</strong> Roll Strength against the object’s durability rating. For complex objects (like doors), rolls may be required per attempt, 2 action points, some might require progressive tries.</li>
                <li><strong>Swimming:</strong> Roll Endurance + Coordination. For currents or dangerous waters, the success check is higher.</li>
                <li><strong>Improvised Shielding:</strong> You can use shielding with objects to cover yourself from attacks, base on size of the object you will get + value to dodge but to use something for shielding you have to roll to move it which requires strength roll and you might not be fast enough to bring it in front of yourself at which point you get disadvantage for dodge, using shield takes two action points.</li>
                <li><strong>Perception use:</strong> The more specific you are about what you look for the easier it will be to find, small things are harder to find, with every meter away thing is +1 harder to notice. Also for every action point over 1 you decide to devote your character to using perception on specific thing you get +1 (up to doubling your base perception that way).</li>
                <li><strong>Charisma use:</strong> You should know that stats+roll is only about the third of what charisma its about. The other two are delivery (what you say your character says) and set up (putting characters in situations where it's easier to succeed) you won't know the number but the last two can help you add to your roll or lower difficulty respectively.</li>
                <li><strong>Pure strength use:</strong> Pulling pushing, knocking over, just a strength check. action points on case to case basis.</li>
                <li><strong>Pure coordination use:</strong> Most manual actions just have a check for coordination and that's it. action points on case to case basis.</li>
                <li><strong>Will saves:</strong> Most saves against emotions, pain, hunger etc have set of checks determining how bad you are doing and what effects of it are, some of which has to be repeated every round or if it's outside round whenever game master decides so. Also similarly to charisma only half of it is stat+roll the other part is the way you decide to try to handle yourself and your surroundings, doing good here could lower the difficulty.</li>
                <li><strong>Pure intelligence roll:</strong> Similar to charisma, you roll and add it to base stat for recalling/understanding/whatever but it's only half a picture, the other half is environment, it's easier if you have more time, some silence etc.</li>
                <li><strong>Pure endurance:</strong> DOES NOT APPLY TO TANKING DAMAGE FROM ATTACKS. Usually you use base endurance for things like cold, heat, disease etc but you can choose to toughen up and roll for it, it increases chances of success but failure is treated same way critical failure would. Free action.</li>
                <li><strong>Climbing:</strong> Strength and coordination check based on surface and conditions failing either can get you down some of the way or all the way depending how much below you are on both combined, if you fail one but sum is above sum of requirements you reroll, 1m per action point by default.</li>
                <li><strong>Stealth:</strong> A coordination check or sets of checks (determine how much attention you draw to yourself) with different modifiers based on what action you want to perform stealthily and as in what way you do it (LIKE CHARISMA) (it's easier to do something stealthily if you do something behind someone than in front, if they are distracted etc).</li>
            </ul>

            <p><strong>Note:</strong> If a requirement is not mentioned, it is certain it’s below 4 (0 is below 4) or involves rolling against another entity.</p>

            <h2>Terms IF SOME TERMS WERE UNCLEAR</h2>
            <ul>
                <li><strong>Passive Values:</strong> Determined directly by your character’s stats, these values dictate your character’s automatic behavior without requiring dice rolls.</li>
                <li><strong>Action:</strong> Any choice or movement your character makes, each requiring a certain number of action points unless stated otherwise.</li>
                <li><strong>Action Points:</strong> Represent time for actions. A default character has one action point per unit of Speed, which dictates how much they can do per round. Actions consume points unless labeled a “free action.”</li>
                <li><strong>Free Action:</strong> An action that requires no action points.</li>
                <li><strong>Round:</strong> A period in which all characters operate in turn-based sequences, usually during combat or other time-sensitive situations.</li>
                <li><strong>Reaction:</strong> An action your character takes directly in response to another character’s action, allowing them to borrow time (action points) from the following round if they’ve used up all points in the current round.</li>
                <li><strong>Success Check:</strong> A test where you must reach a certain threshold using your stats, rolls, or a combination. Often applied to determine success in actions such as combat, magic, or environmental challenges.</li>
                <li><strong>Taken Damage:</strong> Damage deducted from your current health points after factoring in endurance, armor, and other defenses.</li>
                <li><strong>Dealt Damage:</strong> Total calculated damage before reductions from defenses such as armor and endurance.</li>
                <li><strong>Current Health:</strong> The number of health points your character currently has, fluctuating due to damage or healing effects.</li>
                <li><strong>Roll:</strong> The result of rolling a die (d6 by default) for actions, often modified by stats or other bonuses.</li>
                <li><strong>+ Modifiers:</strong> A bonus applied to your roll to increase the likelihood of success.</li>
            </ul>
        </div>
    );
}

export default AdditionalInfo;
