
const skills =[
    ["Acrobatics", "Dex", 'proficiency_skill_acrobatics','expertise_skill_acrobatics','skill_acrobatics'], 
    ["Animal Handling", "Wis", 'proficiency_skill_animal_handling','expertise_skill_animal_handling','skill_animal_handling'],
    ["Arcana", "Int",'proficiency_skill_arcana','expertise_skill_arcana','skill_arcana'], 
    ["Athletics", "Str",'proficiency_skill_athletics','expertise_skill_athletics','skill_athletics'],
    ["Deception", "Cha",  'proficiency_skill_deception','expertise_skill_deception','skill_deception' ],
    ["History", "Int", 'proficiency_skill_history','expertise_skill_history','skill_history'], 
    ["Insight", "Wis", 'proficiency_skill_insight','expertise_skill_insight','skill_insight' ], 
    ["Intimidation", "Cha", 'proficiency_skill_intimidation','expertise_skill_intimidation','skill_intimidation'], 
    ["Investigation", "Int",'proficiency_skill_investigation','expertise_skill_investigation','skill_investigation' ], 
    ["Medicine", "Wis",'proficiency_skill_medicine','expertise_skill_medicine','skill_medicine'], 
    ["Nature", "Int",'proficiency_skill_nature','expertise_skill_nature','skill_nature'], 
    ["Perception", "Wis", 'proficiency_skill_perception','expertise_skill_perception','skill_perception' ], 
    ["Performance", "Cha", 'proficiency_skill_performance','expertise_skill_performance','skill_performance' ], 
    ["Persuasion", "Cha", 'proficiency_skill_persuasion','expertise_skill_persuasion','skill_persuasion' ], 
    ["Religion", "Int", 'proficiency_skill_religion','expertise_skill_religion','skill_religion' ], 
    ["Sleight of Hand", "Dex", 'proficiency_skill_sleight_of_hand','expertise_skill_sleight_of_hand','skill_sleight_of_hand' ], 
    ["Stealth", "Dex",'proficiency_skill_stealth','expertise_skill_stealth','skill_stealth' ], 
    ["Survival", "Wis", 'proficiency_skill_survival','expertise_skill_survival','skill_survival']]

const skillHTML = skills.map(function(skill){
    return `
    <div class="skill">
        <label>
            <input id="${skill[3]}" type="checkbox"/>
            <input id="${skill[2]}" type="checkbox"/>
            ${skill[0]} (${skill[1]})
        </label>
    </div>`;
});

const htmlAsText = skillHTML.join('');

$("#skills").html(htmlAsText);

//Lägg till text on hover som förklarar expertice och proficiency check box