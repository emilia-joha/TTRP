const allSavableFields = [
  'ability_charisma',
  'ability_modifier_charisma',
  'ability_constitution',
  'ability_modifier_constitution',
  'ability_dexterity',
  'ability_modifier_dexterity',
  'ability_intelligence',
  'ability_modifier_intelligence',
  'ability_strength',
  'ability_modifier_strength',
  'ability_wisdom',
  'ability_modifier_wisdom',
  'armor',
  'shield_to_ac',
  'armor_class',
  'background',
  'backstory',
  'childhood',
  'class',
  'CP',
  'current_hit_points',
  'darkvision',
  'death_fail_1',
  'death_fail_2',
  'death_fail_3',
  'death_success_1',
  'death_success_2',
  'death_success_3',
  'equipment',
  'exhaustion_1',
  'exhaustion_2',
  'exhaustion_3',
  'exhaustion_4',
  'exhaustion_5',
  'exhaustion_6',
  'expertise_skill_acrobatics',
  'expertise_skill_animal_handling',
  'expertise_skill_arcana',
  'expertise_skill_athletics',
  'expertise_skill_deception',
  'expertise_skill_history',
  'expertise_skill_insight',
  'expertise_skill_intimidation',
  'expertise_skill_investigation',
  'expertise_skill_medicine',
  'expertise_skill_nature',
  'expertise_skill_perception',
  'expertise_skill_performance',
  'expertise_skill_persuasion',
  'expertise_skill_religion',
  'expertise_skill_sleight_of_hand',
  'expertise_skill_stealth',
  'expertise_skill_survival',
  'flaw',
  'GP',
  'hates',
  'hit_point_maximum',
  'hobby_and_interests',
  'important_people',
  'initiative',
  'inventory',
  'leaving_for_adventure',
  'level',
  'long_term_goal',
  'loves',
  'medium_term_goal',
  'memories_or_events',
  'multiclassLevel',
  'multiclass',
  'multiclassSubclass',
  'name',
  'player_name',
  'PP',
  'proficiencies_languages',
  'proficiency_saving_throws_charisma',
  'proficiency_saving_throws_constitution',
  'proficiency_saving_throws_dexterity',
  'proficiency_saving_throws_intelligence',
  'proficiency_saving_throws_strength',
  'proficiency_saving_throws_wisdom',
  'proficiency_skill_acrobatics',
  'proficiency_skill_animal_handling',
  'proficiency_skill_arcana',
  'proficiency_skill_athletics',
  'proficiency_skill_deception',
  'proficiency_skill_history',
  'proficiency_skill_insight',
  'proficiency_skill_intimidation',
  'proficiency_skill_investigation',
  'proficiency_skill_medicine',
  'proficiency_skill_nature',
  'proficiency_skill_perception',
  'proficiency_skill_performance',
  'proficiency_skill_persuasion',
  'proficiency_skill_religion',
  'proficiency_skill_sleight_of_hand',
  'proficiency_skill_stealth',
  'proficiency_skill_survival',
  'race',
  'secret',
  'short_term_goal',
  'social_behaviors',
  'SP',
  'speed',
  'strength',
  'subclass',
  'subrace',
  'temporary_hit_points',
  'total_hit_dice',
  '_IS_SECRET',
  '_IS_PUBLIC',
  '_ID',
  'attack_bonus_0',
  'damage_0',
  'property_0',
  'type_0',
  'weapon_name_0',

  'attack_bonus_1',
  'damage_1',
  'property_1',
  'type_1',
  'weapon_name_1',

  'attack_bonus_2',
  'damage_2',
  'property_2',
  'type_2',
  'weapon_name_2',

  'attack_bonus_3',
  'damage_3',
  'property_3',
  'type_3',
  'weapon_name_3',

  'attack_bonus_4',
  'damage_4',
  'property_4',
  'type_4',
  'weapon_name_4',
];

/*
'attack_bonus_0',
'damage_0',
'property_0',
'type_0',
'weapon_name_0',
*/

function val(elementId) {
  const element = id(elementId);
  if (!element) return null;

  const data =
    element.type == 'checkbox' // checkbox
      ? element.checked
      : element.type == undefined // div
      ? element.innerText
      : element.value; // else input

  if (data == 'true' || data == 'false') {
    return data == 'true';
  }

  return data;
}

function id(elementId) {
  return document.getElementById(elementId);
}

let debouncer = 0;
let isSaved = false;

$('input, textarea').on('keyup', () => {
  isSaved = false;

  if (debouncer) {
    clearTimeout(debouncer);
  }

  debouncer = setTimeout(save, 2000);
});

$('input, textarea, select').on('change', () => {
  isSaved = false;

  if (debouncer) {
    clearTimeout(debouncer);
  }

  save();
});

function getCharacterObject() {
  const char = {};

  for (const field of allSavableFields) {
    const data = val(field);
    char[field] = data;
  }

  return char;
}

const saveStatus = $('#saving-status');
const saveSuccess = $('#saving-success');
const saveFail = $('#saving-fail');
let feedbackDebouncer = 0;
function feedback(success) {
  saveSuccess.hide();
  saveFail.hide();

  if (success) {
    saveSuccess.show();
  } else {
    saveFail.show();
  }
  saveStatus.slideDown();

  if (feedbackDebouncer) clearTimeout(feedbackDebouncer);
  feedbackDebouncer = setTimeout(() => {
    saveStatus.slideUp();
  }, 2000);
}

async function save() {
  if (isSaved) return;

  isSaved = true;

  const character = getCharacterObject();

  localStorage.setItem('selection', JSON.stringify(character));

  const res = await fetch(
    `https://${'europe-west1-fremi'}-rpg.cloudfunctions.net/dnd-pc-repo/api/savePc`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character: character }),
    }
  );

  if (res.ok) {
    feedback(true);
    if (!val('_ID').length) {
      const json = await res.json();
      console.log(json);
      document.getElementById('_ID').value = json.id;
    }
  } else {
    feedback(false);
  }
}

// window.onbeforeunload = () => {
//   alert('ayyo');
// };
