import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const translations = {
    en: {
        title: "Manual for Playing Simple RPG",
        description: "Your character can do whatever is reasonable for almost any person in the given setting, as well as actions permitted by their abilities or equipment. Many rules will need to be improvised (e.g., flashy moves may require learning, basic handiwork can be done with tools without training, and potion brewing may require both skill and equipment).",
        stats: "Stats:",
        strength: "Strength",
        strengthDesc: [
            "Determines physical power and influences how much your character can lift, carry, push, and how far or high they can jump.",
            "It serves as the base for melee attack damage."
        ],
        speed: "Speed",
        speedDesc: [
            "Each action requires time, represented as action points.",
            "Every round, you receive as many action points as your speed stat + roll for speed. Exceeding your action points is only possible by using a reaction also order in which characters can move is as they want, but person with the smallest fraction of action points consumed in case of tie decided by amount has priority if they want to move before others and are forced to move first if nobody want to."
        ],
        coordination: "Coordination",
        coordinationDesc: [
            "Serves as the basis for success checks on manual actions like melee and ranged attacks, acrobatic dodging, stealth, lock-picking, and pickpocketing."
        ],
        endurance: "Endurance",
        enduranceDesc: [
            "Used to calculate taken damage by subtracting endurance (and sometimes other factors) from the damage dealt to a character.",
            "Determines how well a character withstands harsh environments, exhaustion, lack of sleep, food, water, air, and other challenges like disease, toxins, and poison. Higher endurance reduces or negates negative effects."
        ],
        perception: "Perception",
        perceptionDesc: [
            "This stat helps your character notice details, like surroundings, people, and properties of objects. Useful for spotting ambushes, finding flaws in enemy equipment, and success checks for specific magic spells."
        ],
        intelligence: "Intelligence",
        intelligenceDesc: [
            "Used for success checks in recalling, understanding, and applying knowledge and technical skills (e.g., brewing, artificery, and some spells)."
        ],
        willpower: "Willpower",
        willpowerDesc: [
            "Determines success in resisting strong emotions (fear, anger), mental attacks, and enduring mental challenges like hunger, sleep, and deprivation. It also powers most spells."
        ],
        charisma: "Charisma",
        charismaDesc: [
            "Governs the success of all social interactions and influences how others perceive you. Higher charisma makes you more intimidating or approachable also passively, depending on intent."
        ],
        health: "Health",
        healthDesc: [
            "Max health points are calculated as Health*|health|. You begin with maximum health, but this may fluctuate with damage or prolonged rest. Lasting injuries can reduce the maximum health, and full regeneration may be affected by comfort (dictated by endurance).",
            "If health drops below 0, you faint and lose HP 1 point per round until either beeing healed above 0, having yourelf bandaged up(witch stops the effect unless reson for going under is ohter than trauma) or reaching -max hp and dying automatically",
            "If there is little to no hope of getting help you may gamble your way to 1 HP or die on a coin toss where lifes advanatges and proves applies(prowes improves cointoss to d4) with a caviat that if you roll in multiple times a day you gain a level of disavantage for each."
        ],
        characterCreation: "Character Creation:",
        characterCreationSteps: [
            "Assign values to stats; only use natural numbers, and the total sum must be 45.",
            "Choose a total of 5 items and/or abilities (not 5 of each, 5 total) for which rules will be made by the game master."
        ],
        characterDevelopment: "Character Development",
        direct: "Direct",
        directDesc: "After missions or cool actions, rewards are given at the game master’s discretion, including one or more of the following options:",
        expertise: "Expertise:",
        expertiseDesc: "For every level of expertise, roll one additional die for the associated stat and use the highest value.",
        prowess: "Prowess:",
        prowessDesc: [
            "Normally, you roll with a d6. Each level of prowess advances the dice as follows:",
            "d6 → d8 → d10 → d12 → d20 → d20+d4 → d20+d6 → d20+d8 → d20+d10 → d20+d12 → d20+d20 → d20+d20+d4 → d20+d20+d6 → d20+d20+d8 → d20+d20+d10 → d20+d20+d12 → d20+d20+d20 → d100"
        ],
        ability: "Ability:",
        abilityDesc: "Gain a new ability, either by selection, natural progression, or random assignment.",
        statPoints: "Stat Points:",
        statPointsDesc: "Adds directly to stats, with no time limit or rolls; points remain permanently.",
        other: "Other:",
        otherDesc: "Occasionally, you may receive limited-use rewards (e.g., rerolls, dice flips, or dice steals).",
        indirect: "Indirect",
        indirectDesc: "Characters can acquire new equipment, allies, or reputation.",
        criticalRolls: "Critical Rolls",
        criticalSuccess: "Critical Success:",
        criticalSuccessDesc: "If you succeed and roll the highest number on a die you get to roll the same dices second time and add the result, a very high numbers can give positive effects beyond the scope of what you've planned(DOES NOT STACK)",
        criticalFailure: "Critical Failure:",
        criticalFailureDesc: "If you succeed and roll the lowest number on a die you need to roll the same dices second time and substract the result, a very low numbers can give nasty effects beyond the scope of what you've planned(DOES NOT STACK)",
        multiAction: "Multi Action",
        multiActionDesc: "You can perform MANY actions at the same time",
        nonConflictingAction: "Non conflicting action",
        nonConflictingActionDesc: "You can do multiple things that don't contradict each other at the same time and if they don't use the same stat you are good (like climbing a tree and looking for bird nests at the same time).",
        partiallyConflictingActions: "Partially conflicting actions",
        partiallyConflictingActionsDesc: [
            "Some actions can mechanically get in each other's way or require the same stat in a way that would force a person to divide it in real life. In that case, you split the stat/base between them roll for each and only take coresponding to split base fraction(round up) also you cant devote less than 1. Eg. Swinging two swords wouldn’t allow you to put on your force in either strike + those are two attacks so your base strength dictating damage is halved as well as base coordination for hit. OR You look for a hidden pressure plate avoiding traps dividing your base perception in two for those tasks. (Also you don't have to divide equally) (Also also if you are confident your base is enough you can give up rolling for one of those things) (Also Also Also things like jumping while attacking doesn't require splitting stats as they don't get in each other way)."
        ],
        conflictingActions: "Conflicting actions",
        conflictingActionsDesc: "If you are in the middle of an action that fully conflicts with something else (physically those things aren't doable at the same time) you can drop that action and get some of the action points back (how many depends on how many were there - how many the person that used the least action points used), it can only be done before you roll for it.",
        beCreative: "Be Creative",
        ruleOfCool: "Rule of Cool:",
        ruleOfCoolDesc: "Rules are flexible; if you try something cool and inventive, the game master may allow it.",
        ruleOfOpportunity: "Rule of Opportunity:",
        ruleOfOpportunityDesc: "Gain bonuses or advantages by reasoning with the game master. For example, +3 to hit an enemy from a higher position.",
        ruleOfBasicCommonSense: "Rule of Basic Common Sense:",
        ruleOfBasicCommonSenseDesc: "If your character attempts an action equivalent person in real life could do without any preparation/learning, the game master will create a rule, requirement, or check to allow it in-game. For example, actions like pushing a library shelf onto an enemy, cauterizing a wound, or climbing a tree are possible even if not mentioned.",
        basicActions: "Basic Actions: YOU DO NOT HAVE TO LEARN THIS, YOU CAN JUST LOOK THEM UP IF NEEDED",
        meleeCombat: "Melee Combat:",
        meleeCombatDesc: [
            "Once you enter an enemy's space, you may attack if they don't want to. Standard rules of priority apply unless there is a weapon length disparity, in which case the person with the longer weapon has priority. Remember, if someone approaches with a weapon, you can just keep running backwards.",
            "If you have someone in range and decide to attack, you both sum values of (coordination + roll) for coordination. If the dodging person rolls higher, they avoid the attack altogether. In the event of the attacking party rolling higher, they deal damage.",
            "MAX damage being (strength + roll) * dmg multiplier, but the hit person has damage reduced (before applying dmg multiplier) by their 2 * their coordination roll - enemy's coordination roll. A hit person subtract that many HP points as the damage they were dealt according to previous calculation-endurance (negative numbers round to 0)",
            "To avoid situation when due to coordination person becomes untouchable or cannot miss there would be an exception allowing person to toss a coin and either autofail or double their dice for a hit or dodge roll, ",
            "You can also block with your weapon which is easier but you both roll damage and if attacker rolls more than double what you do the difference goes thre(aslo blocking is as fast as dodging) ",
            "You can also aim for the head which gives massive *1.5 dmg multiplier (after armor before endurance)(applied on damage taken-armor so all other boost compatable) but gives -3 to hit on top of anything you have"
        ],        holding: "Holding:",
        holdingDesc: "Strength x 3 kg for carrying capacity. Rolling for additional strength requires a roll each round.",
        lifting: "Lifting:",
        liftingDesc: "(Strength + roll) x 3 kg overhead, uses 3 action points.",
        falling: "Fall DMG:",
        fallingDesc: "5*(heigh[m]-1).",
        jumpingDistance: "Jumping (Distance):",
        jumpingDistanceDesc: "(Strength + roll) / 5 + Speed / 2 if running start is 40% of a round; uses 3 action points.",
        jumpingHeight: "Jumping (Height):",
        jumpingHeightDesc: "(Strength + roll) / 20 + Speed / 8 if running start is 40% of a round; uses 3 action points.",
        throwing: "Throwing:",
        throwingDesc: "(Strength / weight) x 3, base damage depends on distance; uses 2 action points. Targets gain +1 dodge and -1 grab for each meter distance.",
        shooting: "Shooting:",
        shootingDesc: "Similar to Throwing but without Strength.",
        dodge: "Dodge:",
        dodgeDesc: "Roll Coordination.",
        catch: "Catch:",
        catchDesc: "Roll Coordination.",
        running: "Running:",
        runningDesc: "1 action point per 3m(6 hex). With 1 action points extra to inciate, change direction by one or stop",
        castingSpells: "Casting Spells:",
        castingSpellsDesc: "Roll Will + roll for power, Perception or Intelligence for success (95% of spells).",
        breakingObjects: "Breaking Objects:",
        breakingObjectsDesc: "Roll Strength against the object’s durability rating. For complex objects (like doors), rolls may be required per attempt, 2 action points, some might require progressive tries.",
        swimming: "Swimming:",
        swimmingDesc: "Roll Endurance + Coordination. For currents or dangerous waters, the success check is higher.",
        improvisedShielding: "Improvised Shielding:",
        improvisedShieldingDesc: "You can use shielding with objects to cover yourself from attacks, base on size of the object you will get + value to dodge but to use something for shielding you have to roll to move it which requires strength roll and you might not be fast enough to bring it in front of yourself at which point you get disadvantage for dodge, using shield takes two action points.",
        perceptionUse: "Perception use:",
        perceptionUseDesc: "The more specific you are about what you look for the easier it will be to find, small things are harder to find, with every meter away thing is +1 harder to notice. Also for every action point over 1 you decide to devote your character to using perception on specific thing you get +1 (up to doubling your base perception that way).",
        charismaUse: "Charisma use:",
        charismaUseDesc: "You should know that stats+roll is only about the third of what charisma its about. The other two are delivery (what you say your character says) and set up (putting characters in situations where it's easier to succeed) you won't know the number but the last two can help you add to your roll or lower difficulty respectively.",
        pureStrengthUse: "Pure strength use:",
        pureStrengthUseDesc: "Pulling pushing, knocking over, just a strength check. action points on case to case basis.",
        pureCoordinationUse: "Pure coordination use:",
        pureCoordinationUseDesc: "Most manual actions just have a check for coordination and that's it. action points on case to case basis. To not make anything impossible you can toss a coin to autofail or get dice to roll doubled",
        willSaves: "Will saves:",
        willSavesDesc: "Most saves against emotions, pain, hunger etc have set of checks determining how bad you are doing and what effects of it are, some of which has to be repeated every round or if it's outside round whenever game master decides so. Also similarly to charisma only half of it is stat+roll the other part is the way you decide to try to handle yourself and your surroundings, doing good here could lower the difficulty.",
        pureIntelligenceRoll: "Pure intelligence roll:",
        pureIntelligenceRollDesc: "Similar to charisma, you roll and add it to base stat for recalling/understanding/whatever but it's only half a picture, the other half is environment, it's easier if you have more time, some silence etc.",
        pureEndurance: "Pure endurance:",
        pureEnduranceDesc: "Base endurance is a rate by which damage is reduced upon it beeing delt, be warn tho if there are multiple attacks into exact same spot it wears down ROLLING FOR ENDURANCE DOES NOT APPLY TO TANKING DAMAGE FROM ATTACKS. Usually you use base endurance for things like cold, heat, disease etc but you can choose to toughen up and roll for it, it increases chances of success but failure is treated same way critical failure would. Free action.",
        climbing: "Climbing:",
        climbingDesc: "Strength and coordination check based on surface and conditions failing either can get you down some of the way or all the way depending how much below you are on both combined, if you fail one but sum is above sum of requirements you reroll, 1m per action point by default.",
        stealth: "Stealth:",
        stealthDesc: "A coordination check or sets of checks (determine how much attention you draw to yourself) with different modifiers based on what action you want to perform stealthily and as in what way you do it (LIKE CHARISMA) (it's easier to do something stealthily if you do something behind someone than in front, if they are distracted etc).",
        note: "Note:",
        noteDesc: "If a requirement is not mentioned, it is certain it’s below 4 (0 is below 4) or involves rolling against another entity.",
        terms: "Terms IF SOME TERMS WERE UNCLEAR",
        passiveValues: "Passive Values:",
        passiveValuesDesc: "Determined directly by your character’s stats, these values dictate your character’s automatic behavior without requiring dice rolls.",
        action: "Action:",
        actionDesc: "Any choice or movement your character makes, each requiring a certain number of action points unless stated otherwise.",
        actionPoints: "Action Points:",
        actionPointsDesc: "Represent time for actions. A default character has one action point per unit of Speed, which dictates how much they can do per round. Actions consume points unless labeled a “free action.”",
        freeAction: "Free Action:",
        freeActionDesc: "An action that requires no action points.",
        round: "Round:",
        roundDesc: "A period in which all characters operate in turn-based sequences, usually during combat or other time-sensitive situations.",
        reaction: "Reaction:",
        reactionDesc: "An action your character takes directly in response to another character’s action, allowing them to borrow time (action points) from the following round if they’ve used up all points in the current round.",
        successCheck: "Success Check:",
        successCheckDesc: "A test where you must reach a certain threshold using your stats, rolls, or a combination. Often applied to determine success in actions such as combat, magic, or environmental challenges.",
        takenDamage: "Taken Damage:",
        takenDamageDesc: "Damage deducted from your current health points after factoring in endurance, armor, and other defenses.",
        dealtDamage: "Dealt Damage:",
        dealtDamageDesc: "Total calculated damage before reductions from defenses such as armor and endurance.",
        currentHealth: "Current Health:",
        currentHealthDesc: "The number of health points your character currently has, fluctuating due to damage or healing effects.",
        roll: "Roll:",
        rollDesc: "The result of rolling a die (d6 by default) for actions, often modified by stats or other bonuses.",
        modifiers: "+ Modifiers:",
        modifiersDesc: "A bonus applied to your roll to increase the likelihood of success."
    },
    pl: {
        title: "Instrukcja do Gry w Prostą RPG",
        description: "Twoja postać może robić wszystko, co jest rozsądne dla prawie każdej osoby w danym środowisku, a także czynności dozwolone przez jej umiejętności lub wyposażenie. Wiele zasad będzie musiało zostać zaimprowizowane (np. efektowne ruchy mogą wymagać nauki, podstawowe rzemiosło można wykonać narzędziami bez szkolenia, a warzenie mikstur może wymagać zarówno umiejętności, jak i wyposażenia).",
        stats: "Statystyki:",
        strength: "Siła",
        strengthDesc: [
            "Określa moc fizyczną i wpływa na to, ile Twoja postać może podnieść, przenieść, pchnąć i jak daleko lub wysoko może skoczyć.",
            "Służy jako podstawa obrażeń w walce wręcz."
        ],
        speed: "Szybkość",
        speedDesc: [
            "Każda akcja wymaga czasu, reprezentowanego przez punkty akcji.",
            "W każdej rundzie otrzymujesz punkty akcji równe swojemu współczynnikowi szybkości plus rzut na szybkość. Przekroczenie punktów akcji jest możliwe tylko przy użyciu reakcji. Postacie mogą poruszać się w dowolnej kolejności, ale osoba z najmniejszym ułamkiem punktów akcji zkonsumowanych, w przypadku remisu największą liczbą punktów akcji ma priorytet, jeśli chce działać jako pierwsza, i jest zmuszona do działania jako pierwsza, jeśli nikt inny tego nie chce."
        ],
        coordination: "Koordynacja",
        coordinationDesc: [
            "Służy jako podstawa dla sprawdzianów powodzenia czynności ręcznych, takich jak ataki wręcz i z dystansu, akrobatyczne uniki, skradanie się, otwieranie zamków i kieszonkowanie."
        ],
        endurance: "Wytrzymałość",
        enduranceDesc: [
            "Służy do obliczania obrażeń przez odjęcie wytrzymałości (i czasami innych czynników) od obrażeń zadanych postaci.",
            "Określa, jak dobrze postać radzi sobie w surowych warunkach, wyczerpaniu, braku snu, jedzenia, wody, powietrza i innych wyzwań, takich jak choroby, toksyny i trucizny. Wyższa wytrzymałość zmniejsza lub eliminuje negatywne efekty."
        ],
        perception: "Percepcja",
        perceptionDesc: [
            "Ta statystyka pomaga Twojej postaci zauważyć szczegóły, takie jak otoczenie, ludzie i właściwości przedmiotów. Przydatne do wykrywania zasadzek, znajdowania wad w wyposażeniu wroga i sprawdzianów powodzenia dla niektórych czarów magicznych."
        ],
        intelligence: "Inteligencja",
        intelligenceDesc: [
            "Używana do sprawdzianów powodzenia w przypominaniu sobie, rozumieniu i stosowaniu wiedzy i umiejętności technicznych (np. warzenie, rzemiosło i niektóre czary)."
        ],
        willpower: "Siła Woli",
        willpowerDesc: [
            "Określa powodzenie w opieraniu się silnym emocjom (strach, gniew), atakom mentalnym i wytrzymywaniu wyzwań mentalnych, takich jak głód, sen i pozbawienie. Ponadto zasila większość czarów."
        ],
        charisma: "Charyzma",
        charismaDesc: [
            "Rządzi powodzeniem wszystkich interakcji społecznych i wpływa na to, jak inni postrzegają Ciebie. Wyższa charyzma czyni Cię bardziej zastraszającym lub przystępnym również pasywnie, w zależności od intencji."
        ],
        health: "Zdrowie",
        healthDesc: [
            "Maksymalna liczba punktów zdrowia obliczana jest jako Zdrowie*|zdrowie|. Zaczynasz z maksymalnym zdrowiem, ale może ono fluktuować z powodu obrażeń lub długotrwałego odpoczynku. Trwałe obrażenia mogą zmniejszyć maksymalne zdrowie, a pełna regeneracja może zależeć od komfortu (określanego przez wytrzymałość).",
            "Jeśli zdrowie spadnie poniżej 0, mdlejesz i tracisz 1 punkt zdrowia na rundę, dopóki nie zostaniesz uleczony powyżej 0, nie zostaniesz opatrzony (co zatrzymuje utratę HP, o ile przyczyna spadku nie jest nietraumatyczna), lub dopóki nie osiągniesz -maksymalnego zdrowia, co prowadzi do automatycznej śmierci.",
            "Jeśli nie ma nadziei na pomoc, możesz zaryzykować i spróbować powrócić do 1 HP lub umrzeć, rzucając monetą. Korzyści życiowe i umiejętności mają zastosowanie (umiejętność zmienia rzut monetą na rzut k4). Jednakże, korzystanie z tej metody wielokrotnie w ciągu dnia nakłada kumulujące się poziomy kary."
        ],
        characterCreation: "Tworzenie Postaci:",
        characterCreationSteps: [
            "Przypisz wartości do statystyk; używaj tylko liczb naturalnych, a suma musi wynosić 45.",
            "Wybierz łącznie 5 przedmiotów i/lub umiejętności (nie 5 każdego, 5 łącznie), dla których zasady będą ustalane przez mistrza gry."
        ],
        characterDevelopment: "Rozwój Postaci",
        direct: "Bezpośredni",
        directDesc: "Po misjach lub fajnych akcjach nagrody są przyznawane na uznanie mistrza gry, w tym jedna lub więcej z poniższych opcji:",
        expertise: "Biegłość:",
        expertiseDesc: "Za każdy poziom biegłości rzucasz dodatkową kością dla powiązanej statystyki i używasz najwyższej wartości.",
        prowess: "Zręczność:",
        prowessDesc: [
            "Normalnie rzucasz kością d6. Każdy poziom zręczności zwiększa kość w następujący sposób:",
            "d6 → d8 → d10 → d12 → d20 → d20+d4 → d20+d6 → d20+d8 → d20+d10 → d20+d12 → d20+d20 → d20+d20+d4 → d20+d20+d6 → d20+d20+d8 → d20+d20+d10 → d20+d20+d12 → d20+d20+d20 → d100"
        ],
        ability: "Umiejętność:",
        abilityDesc: "Zdobywasz nową umiejętność, albo przez wybór, naturalny postęp, albo losowe przydzielenie.",
        statPoints: "Punkty Statystyk:",
        statPointsDesc: "Dodaje bezpośrednio do statystyk, bez limitu czasu lub rzutów; punkty pozostają na stałe.",
        other: "Inne:",
        otherDesc: "Czasami możesz otrzymać nagrody o ograniczonym zastosowaniu (np. ponowne rzuty, zmiany kości, kradzieże kości).",
        indirect: "Pośredni",
        indirectDesc: "Postacie mogą zdobywać nowe wyposażenie, sojuszników lub reputację.",
        criticalRolls: "Krytyczne Rzuty",
        criticalSuccess: "Sukces Krytyczny:",
        criticalSuccessDesc: "Jeśli odniesiesz sukces i wyrzucisz najwyższą liczbę na kości, rzucasz tymi samymi kośćmi drugi raz i dodajesz wynik, bardzo wysokie liczby mogą dać pozytywne efekty wykraczające poza zakres tego, co zaplanowałeś(NIE KUMULUJE SIĘ)",
        criticalFailure: "Porażka Krytyczna:",
        criticalFailureDesc: "Jeśli odniesiesz sukces i wyrzucisz najniższą liczbę na kości, rzucasz tymi samymi kośćmi drugi raz i odejmujesz wynik, bardzo niskie liczby mogą dać paskudne efekty wykraczające poza zakres tego, co zaplanowałeś(NIE KUMULUJE SIĘ)",
        multiAction: "Wielokrotne Akcje",
        multiActionDesc: "Możesz wykonywać WIELE akcji jednocześnie",
        nonConflictingAction: "Niekonfliktująca akcja",
        nonConflictingActionDesc: "Możesz robić wiele rzeczy, które się nie sprzeczają, jednocześnie, i jeśli nie używają tej samej statystyki, jesteś dobrze (jak wspinać się na drzewo i szukać gniazd ptasich jednocześnie).",
        partiallyConflictingActions: "Częściowo konfliktujące akcje",
        partiallyConflictingActionsDesc: [
            "Niektóre akcje mogą mechanicznie przeszkadzać sobie nawzajem lub wymagać tej samej statystyki w taki sposób, że osoba musiałaby ją podzielić w rzeczywistości. W takim przypadku dzielisz statystykę/bazę między nimi i rzucasz po czym dzielisz wyniki rzutów przybliżenie do tych samych proporcjaii(tylko bez ułaków) do rodzielenia statów. Na przykład machanie dwoma mieczami nie pozwoli Ci włożyć siły w żaden z ciosów + to są dwa ataki, więc Twoja podstawowa siła dyktująca obrażenia jest podzielona na pół, tak jak podstawowa koordynacja dla trafienia. LUB Szukasz ukrytej płyty ciśnieniowej unikając pułapek, dzieląc swoją podstawową percepcję na dwa dla tych zadań. (Nie musisz dzielić równo) (Jeśli jesteś pewny, że Twoja baza jest wystarczająca, możesz zrezygnować z rzucania dla jednej z tych rzeczy) (Również rzeczy takie jak skakanie podczas ataku nie wymagają dzielenia statystyk, ponieważ nie przeszkadzają sobie nawzajem)."
        ],
        conflictingActions: "Konfliktujące akcje",
        conflictingActionsDesc: "Jeśli jesteś w trakcie akcji, która całkowicie konfliktuje z czymś innym (fizycznie te rzeczy nie są do wykonania jednocześnie), możesz porzucić tę akcję i odzyskać część punktów akcji (ile zależy od tego, ile ich było - ile użyła osoba, która użyła najmniej punktów akcji), można to zrobić tylko przed rzutem.",
        beCreative: "Bądź Kreatywny",
        ruleOfCool: "Zasada Fajności:",
        ruleOfCoolDesc: "Zasady są elastyczne; jeśli spróbujesz czegoś fajnego i pomysłowego, mistrz gry może to pozwolić.",
        ruleOfOpportunity: "Zasada Okazji:",
        ruleOfOpportunityDesc: "Zdobywaj bonusy lub przewagi, rozumując z mistrzem gry. Na przykład, +3 do trafienia wroga z wyższej pozycji.",
        ruleOfBasicCommonSense: "Zasada Podstawowego Rozsądku:",
        ruleOfBasicCommonSenseDesc: "Jeśli Twoja postać próbuje wykonać czynność, którą równoważna osoba w rzeczywistości mogłaby wykonać bez przygotowania/uczenia się, mistrz gry stworzy zasadę, wymaganie lub sprawdzian, aby to pozwolić w grze. Na przykład, czynności takie jak przesuwanie półki bibliotecznej na wroga, przypalanie rany lub wspięcie się na drzewo są możliwe, nawet jeśli nie zostały wspomniane.",
        basicActions: "Podstawowe Akcje: NIE MUSISZ SIĘ TYM UCZYĆ, MOŻESZ POPROSTU SPRAWDZIĆ JE, JEŚLI BĘDZIE POTREBA",
        meleeCombat: "Walka Wręcz:",
        meleeCombatDesc: [
            "Gdy wejdziesz w przestrzeń wroga, możesz zaatakować, jeśli on tego nie zrobi. Standardowe zasady prioryetu się aplikują, chyba że istnieje różnica w długości broni – w takim przypadku priorytet ma osoba z dłuższą bronią. Pamiętaj, że jeśli ktoś podchodzi z bronią, możesz po prostu biec do tyłu.",
            "Jeśli masz kogoś w zasięgu i zdecydujesz się zaatakować, oboje sumujecie wartości (koordynacja + rzut) dla koordynacji. Jeśli osoba unikająca wyrzuci wyższy wynik, całkowicie unika ataku. W przypadku, gdy atakujący wyrzuci wyższy wynik, zadaje obrażenia.",
            "MAKSYMALNE obrażenia to (siła + rzut) * mnożnik obrażeń, ale trafiona osoba redukuje otrzymane obrażenia (przed zastosowaniem mnożnika obrażeń) o 2 * swój rzut na koordynację - rzut koordynacji przeciwnika. Uderzona osoba odbiera z puli HP tyle punktów ile wynosi obliczony dmg - wytrzymałość (negatywne wartości zaookrągla się do 0)",
            "Aby uniknąć sytuacji, w której ze względu na koordynację osoba staje się nietykalna lub nie może spudłować, istniałby wyjątek zezwalający osobie na rzucenie monetą i albo automatyczną porażkę, albo podwojenie kości w celu uzyskania trafienia lub uniku. ",
            "Bronią można blokować ataki co jest łatwiejsze ale trzeba rzucić na dmg własnej broni i jeżeli jest on ponad dwa razy mniejszy niż dmg broni przeciwnika to różnica przechodzi(również blokowanie jest tak szybkie jak unik) ",
            "Możesz też celować w głowe co daje masywny multiplikator *1.5 po zbroii przed wytrzymałością niezależny od innych multiplikatorów(czyli kompatybilny ze wszystkim dodawaczami i multiplikatorami) ale daje -3 do trafienia"
        ],
        holding: "Trzymanie:",
        holdingDesc: "Siła x 3 kg na pojemność nośną. Rzucanie o dodatkową siłę wymaga rzutu każdej rundy.",
        lifting: "Podnoszenie:",
        liftingDesc: "(Siła + rzut) x 3 kg nad głową, zużywa 3 punkty akcji.",
        falling: "Obrażenia od upadku:",
        fallingDesc: "5*(wysokość[m]-1).",
        jumpingDistance: "Skok (Dystans):",
        jumpingDistanceDesc: "(Siła + rzut) / 5 + Szybkość / 2, jeśli rozbieg to 40% rundy; zużywa 3 punkty akcji.",
        jumpingHeight: "Skok (Wysokość):",
        jumpingHeightDesc: "(Siła + rzut) / 20 + Szybkość / 8, jeśli rozbieg to 40% rundy; zużywa 3 punkty akcji.",
        throwing: "Rzucanie:",
        throwingDesc: "(Siła / waga) x 3, podstawowe obrażenia zależą od odległości; zużywa 2 punkty akcji. Cele otrzymują +1 unik i -1 chwyt za każdy metr odległości.",
        shooting: "Strzelanie:",
        shootingDesc: "Podobnie jak Rzucanie, ale bez Siły.",
        dodge: "Unik:",
        dodgeDesc: "Rzucaj Koordynacją.",
        catch: "Chwyt:",
        catchDesc: "Rzucaj Koordynacją.",
        running: "Bieganie:",
        runningDesc: "1 punkt akcji na 3m(6 hex) za 1 extra action point startując, zatrzyując, i zmieniając kierunek",
        castingSpells: "Rzucanie Czarów:",
        castingSpellsDesc: "Rzucaj Wola + rzut na moc, Percepcja lub Inteligencja na sukces (95% czarów).",
        breakingObjects: "Niszczenie Przedmiotów:",
        breakingObjectsDesc: "Rzucaj Siłą przeciwko wskaźnikowi wytrzymałości przedmiotu. Dla złożonych przedmiotów (jak drzwi) rzuty mogą być wymagane za każdą próbę, 2 punkty akcji, niektóre mogą wymagać postępowań.",
        swimming: "Pływanie:",
        swimmingDesc: "Rzucaj Wytrzymałość + Koordynacja. Dla prądów lub niebezpiecznych wód sprawdzian sukcesu jest wyższy.",
        improvisedShielding: "Improwizowana Ochrona:",
        improvisedShieldingDesc: "Możesz używać przedmiotów do osłony przed atakami, baza na rozmiarze przedmiotu otrzymasz + wartość do uniku, ale aby coś użyć do osłony, musisz rzucić, aby to przesunąć, co wymaga rzutu siły, i możesz nie być wystarczająco szybki, aby przesunąć to przed sobą, w takim przypadku otrzymasz przewagę do uniku, użycie tarczy zajmuje dwa punkty akcji.",
        perceptionUse: "Użycie Percepcji:",
        perceptionUseDesc: "Im bardziej szczegółowo określisz, czego szukasz, tym łatwiej będzie to znaleźć, małe rzeczy są trudniejsze do znalezienia, z każdym metrem odległości rzecz jest o +1 trudniejsza do zauważenia. Ponadto za każdy punkt akcji powyżej 1, który postanowisz poświęcić swojej postaci na użycie percepcji na konkretną rzecz, otrzymasz +1 (możesz w ten sposób podwoić swoją podstawową percepcję).",
        charismaUse: "Użycie Charyzmy:",
        charismaUseDesc: "Powinieneś wiedzieć, że statystyki+rzut to tylko około jednej trzeciej tego, co dotyczy charyzmy. Dwie pozostałe to dostawa (co mówisz, że Twoja postać mówi) i ustawienie (umieszczanie postaci w sytuacjach, gdzie łatwiej jest osiągnąć sukces) nie będziesz znać liczby, ale ostatnie dwa mogą Ci pomóc dodać do rzutu lub obniżyć trudność odpowiednio.",
        pureStrengthUse: "Czyste użycie Siły:",
        pureStrengthUseDesc: "Ciągnienie, pchanie, przewracanie, tylko sprawdzian siły. punkty akcji na bieżąco.",
        pureCoordinationUse: "Czyste użycie Koordynacji:",
        pureCoordinationUseDesc: "Większość czynności ręcznych ma tylko sprawdzian koordynacji i to wszystko. punkty akcji na bieżąco. Aby uniknąć akcji niemożliwych możesz rzucić monetą i dostać utomatyczną porażkę albo drugie tyle kości",
        willSaves: "Ratunki Woli:",
        willSavesDesc: "Większość ratunków przed emocjami, bólem, głodem itp. ma zestaw sprawdzianów określających, jak Ci się powoduje i jakie są efekty, niektóre z nich muszą być powtarzane co rundę lub, jeśli jest to poza rundą, kiedy mistrz gry zdecyduje. Podobnie jak w przypadku charyzmy, tylko połowa to statystyka+rzut, a druga część to sposób, w jaki postanowisz poradzić sobie i swoim otoczeniem, dobrze robiąc to, możesz obniżyć trudność.",
        pureIntelligenceRoll: "Czysty rzut Inteligencji:",
        pureIntelligenceRollDesc: "Podobnie jak charyzma, rzucasz i dodajesz to do podstawowej statystyki na przypominanie sobie/rozumienie/cokolwiek, ale to tylko połowa obrazka, druga połowa to otoczenie, łatwiej jest, jeśli masz więcej czasu, trochę ciszy itp.",
        pureEndurance: "Czysta Wytrzymałość:",
        pureEnduranceDesc: "Bazowa wytrzymałość redukuje otryzmany dmg o swoją wartość, ale uważaj, jeżeli otrzymasz wiele ataków w jedno miejsce będzie ona zmniejszana o dmg ataków RZUCANIE NA WYTRZYMAŁOŚĆ NIE STOSUJE SIĘ DO TANKOWANIA OBRAŻEŃ Z ATAKÓW. Zwykle używasz podstawowej wytrzymałości na takie rzeczy jak zimno, upał, choroby itp, ale możesz postanowić się zahardzić i rzucić na to, zwiększa to szanse na sukces, ale porażka jest traktowana tak samo, jak krytyczna porażka. Wolna akcja.",
        climbing: "Wspinanie:",
        climbingDesc: "Sprawdzian siły i koordynacji w zależności od powierzchni i warunków, niepowodzenie w którymkolwiek może Ci spowodować upadek na część drogi lub całą drogę, w zależności, jak bardzo jesteś poniżej na obu łącznie, jeśli nie powiedzie Ci się jeden, ale suma jest powyżej sumy wymagań, rzucasz ponownie, 1m na punkt akcji domyślnie.",
        stealth: "Skradanie się:",
        stealthDesc: "Sprawdzian koordynacji lub zestawów sprawdzianów (określających, ile zwracasz na siebie uwagi) z różnymi modyfikatorami w zależności od tego, jaką akcję chcesz wykonać skradając się i w jaki sposób to robisz (JAK CHARYZMA) (łatwiej jest coś zrobić skradając się, jeśli robisz coś za kimś niż przed kimś, jeśli są rozproszeni itp).",
        note: "Uwaga:",
        noteDesc: "Jeśli wymaganie nie zostało wspomniane, jest pewne, że jest poniżej 4 (0 jest poniżej 4) lub wymaga rzucania przeciwko innemu bytowi.",
        terms: "Terminy JEŚLI NIEKTÓRE TERMINY BYŁY NIEJASNE",
        passiveValues: "Wartości Pasywne",
        passiveValuesDesc: "Określane bezpośrednio przez statystyki Twojej postaci, te wartości dyktują automatyczne zachowanie Twojej postaci bez konieczności rzucania kośćmi.",
        action: "Akcja:",
        actionDesc: "Każdy wybór lub ruch Twojej postaci, każdy z nich wymaga określonej liczby punktów akcji, chyba że stwierdzono inaczej.",
        actionPoints: "Punkty Akcji:",
        actionPointsDesc: "Reprezentują czas na akcje. Domyślna postać ma jeden punkt akcji na jednostkę Szybkości, co dyktuje, ile może zrobić na rundę. Akcje zużywają punkty, chyba że są oznaczone jako „wolna akcja”.",
        freeAction: "Wolna Akcja:",
        freeActionDesc: "Akcja, która nie wymaga punktów akcji.",
        round: "Runda:",
        roundDesc: "Okres, w którym wszyscy bohaterowie działają w sekwencjach opartych na turach, zwykle podczas walki lub innych sytuacji wymagających czasu.",
        reaction: "Reakcja:",
        reactionDesc: "Akcja, którą Twoja postać wykonuje bezpośrednio w odpowiedzi na akcję innej postaci, pozwalając jej pożyczyć czas (punkty akcji) z następnej rundy, jeśli wykorzystała wszystkie punkty w bieżącej rundzie.",
        successCheck: "Sprawdzian Powodzenia:",
        successCheckDesc: "Test, w którym musisz osiągnąć określony próg, używając swoich statystyk, rzutów lub kombinacji. Często stosowany do określenia powodzenia w akcjach, takich jak walka, magia lub wyzwania środowiskowe.",
        takenDamage: "Otrzymane Obrażenia:",
        takenDamageDesc: "Obrażenia odjęte od Twoich bieżących punktów zdrowia po uwzględnieniu wytrzymałości, pancerza i innych obron.",
        dealtDamage: "Zadane Obrażenia:",
        dealtDamageDesc: "Całkowite obrażenia obliczone przed redukcjami z obron, takich jak pancerz i wytrzymałość.",
        currentHealth: "Bieżące Zdrowie:",
        currentHealthDesc: "Liczba punktów zdrowia, jaką Twoja postać obecnie posiada, fluktuująca w wyniku obrażeń lub efektów leczenia.",
        roll: "Rzut:",
        rollDesc: "Wynik rzutu kością (domyślnie d6) na akcje, często modyfikowany przez statystyki lub inne premie.",
        modifiers: "+ Modyfikatory:",
        modifiersDesc: "Premia dodana do Twojego rzutu, aby zwiększyć prawdopodobieństwo powodzenia."
    }
};

function AdditionalInfo() {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'pl' : 'en');
    };

    const t = translations[language];

    return (
        <div className="container">
            <button onClick={() => navigate(-1)}>
                {language === 'en' ? 'Back' : 'Wstecz'}
            </button>

            <button onClick={toggleLanguage}>
                {language === 'en' ? 'Switch to Polish' : 'Przełącz na Angielski'}
            </button>
            <h1>{t.title}</h1>

            <p>{t.description}</p>

            <h2>{t.stats}</h2>
            <ul>
                <li><strong>{t.strength}</strong>
                    <ul>
                    <li>{t.strengthDesc}</li>
                    </ul>
                </li>
                <li><strong>{t.speed}</strong>
                    <ul>
                    <li>{t.speedDesc}</li>
                    </ul>
                </li>
                <li><strong>{t.coordination}</strong>
                    <ul>
                        <li>{t.coordinationDesc}</li>
                    </ul>
                </li>
                <li><strong>{t.endurance}</strong>
                    <ul>
                        <li>{t.enduranceDesc}</li>
                    </ul>
                </li>
                <li><strong>{t.perception}</strong>
                    <ul>
                        <li>{t.perceptionDesc}</li>
                    </ul>
                </li>
                <li><strong>{t.intelligence}</strong>
                    <ul>
                        <li>{t.intelligenceDesc}</li>
                    </ul>
                </li>
                <li><strong>{t.willpower}</strong>
                    <ul>
                        <li>{t.willpowerDesc}</li>
                    </ul>
                </li>
                <li><strong>{t.charisma}</strong>
                    <ul>
                        <li>{t.charismaDesc}</li>
                    </ul>
                </li>
                <li><strong>{t.health}</strong>
                    <ul>
                        <li>{t.healthDesc}</li>
                    </ul>
                </li>
            </ul>

            <h2>{t.characterCreation}</h2>
            <ol>
                <li>{t.characterCreationSteps}</li>
            </ol>

            <h2>{t.characterDevelopment}</h2>
            <h3>{t.direct}</h3>
            <p>{t.directDesc}</p>
            <ul>
                <li><strong>{t.expertise}</strong> {t.expertiseDesc}</li>
                <li><strong>{t.prowess}</strong> {t.prowessDesc}</li>
                <li><strong>{t.ability}</strong> {t.abilityDesc}</li>
                <li><strong>{t.statPoints}</strong> {t.statPointsDesc}</li>
                <li><strong>{t.other}</strong> {t.otherDesc}</li>
            </ul>

            <h3>{t.indirect}</h3>
            <ul>
                <li>{t.indirectDesc}</li>
            </ul>

            <h2>{t.criticalRolls}</h2>
            <ul>
                <li><strong>{t.criticalSuccess}</strong> {t.criticalSuccessDesc}</li>
                <li><strong>{t.criticalFailure}</strong> {t.criticalFailureDesc}</li>
            </ul>

            <h2>{t.multiAction}</h2>
            <p>{t.multiActionDesc}</p>
            <ul>
                <li><strong>{t.nonConflictingAction}</strong> {t.nonConflictingActionDesc}</li>
                <li><strong>{t.partiallyConflictingActions}</strong>
                    <li>{t.partiallyConflictingActionsDesc}</li>
                </li>
                <li><strong>{t.conflictingActions}</strong> {t.conflictingActionsDesc}</li>
            </ul>

            <h2>{t.beCreative}</h2>
            <ul>
                <li><strong>{t.ruleOfCool}</strong> {t.ruleOfCoolDesc}</li>
                <li><strong>{t.ruleOfOpportunity}</strong> {t.ruleOfOpportunityDesc}</li>
                <li><strong>{t.ruleOfBasicCommonSense}</strong> {t.ruleOfBasicCommonSenseDesc}</li>
            </ul>

            <h2>{t.basicActions}</h2>
            <ul>
                <li><strong>{t.meleeCombat}</strong> {t.meleeCombatDesc}</li>
                <li><strong>{t.holding}</strong> {t.holdingDesc}</li>
                <li><strong>{t.lifting}</strong> {t.liftingDesc}</li>
                <li><strong>{t.falling}</strong> {t.fallingDesc}</li>
                <li><strong>{t.jumpingDistance}</strong> {t.jumpingDistanceDesc}</li>
                <li><strong>{t.jumpingHeight}</strong> {t.jumpingHeightDesc}</li>
                <li><strong>{t.throwing}</strong> {t.throwingDesc}</li>
                <li><strong>{t.shooting}</strong> {t.shootingDesc}</li>
                <li><strong>{t.dodge}</strong> {t.dodgeDesc}</li>
                <li><strong>{t.catch}</strong> {t.catchDesc}</li>
                <li><strong>{t.running}</strong> {t.runningDesc}</li>
                <li><strong>{t.castingSpells}</strong> {t.castingSpellsDesc}</li>
                <li><strong>{t.breakingObjects}</strong> {t.breakingObjectsDesc}</li>
                <li><strong>{t.swimming}</strong> {t.swimmingDesc}</li>
                <li><strong>{t.improvisedShielding}</strong> {t.improvisedShieldingDesc}</li>
                <li><strong>{t.perceptionUse}</strong> {t.perceptionUseDesc}</li>
                <li><strong>{t.charismaUse}</strong> {t.charismaUseDesc}</li>
                <li><strong>{t.pureStrengthUse}</strong> {t.pureStrengthUseDesc}</li>
                <li><strong>{t.pureCoordinationUse}</strong> {t.pureCoordinationUseDesc}</li>
                <li><strong>{t.willSaves}</strong> {t.willSavesDesc}</li>
                <li><strong>{t.pureIntelligenceRoll}</strong> {t.pureIntelligenceRollDesc}</li>
                <li><strong>{t.pureEndurance}</strong> {t.pureEnduranceDesc}</li>
                <li><strong>{t.climbing}</strong> {t.climbingDesc}</li>
                <li><strong>{t.stealth}</strong> {t.stealthDesc}</li>
            </ul>

            <p><strong>{t.note}</strong> {t.noteDesc}</p>

            <h2>{t.terms}</h2>
            <ul>
                <li><strong>{t.passiveValues}</strong> {t.passiveValuesDesc}</li>
                <li><strong>{t.action}</strong> {t.actionDesc}</li>
                <li><strong>{t.actionPoints}</strong> {t.actionPointsDesc}</li>
                <li><strong>{t.freeAction}</strong> {t.freeActionDesc}</li>
                <li><strong>{t.round}</strong> {t.roundDesc}</li>
                <li><strong>{t.reaction}</strong> {t.reactionDesc}</li>
                <li><strong>{t.successCheck}</strong> {t.successCheckDesc}</li>
                <li><strong>{t.takenDamage}</strong> {t.takenDamageDesc}</li>
                <li><strong>{t.dealtDamage}</strong> {t.dealtDamageDesc}</li>
                <li><strong>{t.currentHealth}</strong> {t.currentHealthDesc}</li>
                <li><strong>{t.roll}</strong> {t.rollDesc}</li>
                <li><strong>{t.modifiers}</strong> {t.modifiersDesc}</li>
            </ul>
        </div>
    );
}

export default AdditionalInfo;
