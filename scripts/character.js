import { races } from '../data/races.js';
import { backgrounds } from '../data/backgrounds.js';
import { classes } from '../data/classes.js';
import { weapons } from '../data/weapons.js';
import { skills } from '../data/skills.js';
import { armors } from '../data/armor.js';
import { multiclass } from '../data/multiclass.js';

let classs = null;
let multiclasss = null;
let previousSelectedClass = null;
let previousSelectedMulticlass = null;
let race = null;
let subrace = null;
let background = null;
let previousSelectedBackground = null;
let level = null;
let multiclassLevel = null;

const hero = JSON.parse(localStorage.getItem('selection'));
let isLoading = true;
setTimeout(() => {
  isLoading = false;
}, 1000);

const racesHTML = races.map(function (race) {
  return `<option value="${race.name}">${race.name}</option>`;
});
const racesHTMLAsText = racesHTML.join('');
$('#race').append(racesHTMLAsText);

const backgroundHTML = backgrounds.map(function (background) {
  return `<option value="${background.name}">${background.name}</option>`;
});
const backgroundHTMLAsText = backgroundHTML.join('');
$('#background').append(backgroundHTMLAsText);

const classesHTML = classes.map(function (classs) {
  return `<option value="${classs.name}">${classs.name}</option>`;
});
const classesHTMLAsText = classesHTML.join('');
$('#class').append(classesHTMLAsText);

const skillHTML = skills.map(function (skill) {
  return `
      <div class="skill">
          <label>
              <input id="${skill[3]}" class="expertise" type="checkbox"/>
              <input id="${skill[2]}" class="proficiency" type="checkbox"/>
              <p id="${skill[4]}" class="${skill[1]}"> </p>
              ${skill[0]} (${skill[1]})
          </label>
      </div>`;
});
const htmlAsText = skillHTML.join('');
$('#skills').append(htmlAsText);

function weaponsAsHTML() {
  return weapons
    .map(function (weapon) {
      return `<option value="${weapon.name}">${weapon.name}</option>`;
    })
    .join('');
}
$(`.weapon_name`).append(weaponsAsHTML());

$('#name').on('change', function () {
  const name = $('#name').val();
  $('#characterName').text(name);
});

$(`.weapon_name`).on('change', function () {
  presentWeapon();
});

$('#ability_strength, #ability_dexterity').keyup(function () {
  presentWeapon();
});

$('#class').on('change', function () {
  const selectedClass = $(this).val();
  classs = classes.find((x) => x.name == selectedClass);

  $('#subclass').children().remove();

  classes.forEach(function (classs) {
    if (classs.name == selectedClass) {
      const subClassHTML = classs.subclasses.map(function (subClass) {
        return `<option ${
          isLoading && hero?.subclass == subClass ? 'selected ' : ''
        }value="${subClass}">${subClass}</option>`;
      });
      const subClassHTMLAsText = subClassHTML.join('');
      $('#subclass').append(
        `<option value="">Select Subclass...</option>${subClassHTMLAsText}`
      );
    }
  });

  // ta bort förra Class saving throw proficiencies
  previousSelectedClass?.savingThrows.forEach(function (prof) {
    const profLower = prof.toLowerCase().replaceAll(' ', '_');
    $(`#proficiency_saving_throws_${profLower}`).prop('checked', false);
  });

  // lägg till de nya saving throw proficiencies
  classs.savingThrows.forEach(function (prof) {
    const profLower = prof.toLowerCase().replaceAll(' ', '_');
    $(`#proficiency_saving_throws_${profLower}`).prop('checked', true);
  });

  if ($('#skill_proficiencies_select').is(':empty') && !isLoading) {
    $('#skill_proficiencies_select').append(`
    <p id="class_skill_proficiencies">Choose ${
      classs.proficiencies.choose
    } class proficiencies from: ${classs.proficiencies.from.join(', ')}.</p>
  `);

    if (previousSelectedClass) {
      $('#class_skill_proficiencies').append(`
    Don't forget to remove your previously selected proficiencies from the class.
      (${previousSelectedClass.proficiencies.from.join(', ')})`);
    }
    addDoneAddingSkillsButton();
  }

  if (subrace) {
    addStats();
  }

  recalculateSavingThrow();
  presentWeapon();
  presentArmor();
  calcSpells();
  previousSelectedClass = classs;
});

$('#race').on('change', function () {
  const selectedRace = $(this).val();
  race = races.find((x) => x.name == selectedRace);

  $('#subrace').children().remove();

  races.forEach(function (race) {
    if (race.name == selectedRace) {
      const subraceHTML = race.subclasses.map(function (subrace) {
        return `<option ${
          isLoading && hero?.subrace == subrace.name ? 'selected ' : ''
        }value="${subrace.name}">${subrace.name}</option>`;
      });
      const subraceHTMLAsText = subraceHTML.join('');
      $('#subrace').append(
        `<option value="">Select Subrace...</option>${subraceHTMLAsText}`
      );
    }
  });
});

$('#subrace').change(function () {
  $('#darkvision').val('');
  const selectedSubrace = $(this).val();
  if (selectedSubrace == null) return;

  const newSubrace = race?.subclasses.find((x) => x.name == selectedSubrace);
  const previousSubrace = subrace;

  if (newSubrace.darkvision != 0) {
    $('#darkvision').val(`${newSubrace.darkvision} feet`);
  }
  $('#speed').val(`${newSubrace.speed} feet`);

  // ta bort förra subrace proficiencies
  previousSubrace?.proficiencies.forEach(function (prof) {
    if (typeof prof == 'string') {
      const profLower = prof.toLowerCase().replaceAll(' ', '_');
      $(`#proficiency_skill_${profLower}`).prop('checked', false);
    }
    if ($('#race_skill_proficiencies')) {
      $('#race_skill_proficiencies').empty();
      $('#race_skill_proficiencies').append(
        "Don't forget to remove your previously selected proficiencies from the race. <br> <br>"
      );
    }
  });

  // lägg till de nya
  newSubrace.proficiencies.forEach(function (prof) {
    if (typeof prof == 'string') {
      const profLower = prof.toLowerCase().replaceAll(' ', '_');
      $(`#proficiency_skill_${profLower}`).prop('checked', true);
    }
  });

  if (newSubrace.proficiencies.length) {
    if ($('#skill_proficiencies_select').is(':empty') && !isLoading) {
      $('#skill_proficiencies_select').append(`
      <p id="race_skill_proficiencies">Choose ${newSubrace.proficiencies}</p>
    `);
    } else {
      $('#race_skill_proficiencies').append(
        "Don't forget to remove your previously selected proficiencies from the race. <br> <br>"
      );
    }

    addDoneAddingSkillsButton();
  }

  recalculateAbilities();
  subrace = newSubrace;
  addStats();
});

$('#background').on('change', function () {
  const selectedBackground = $(this).val();
  background = backgrounds.find((x) => x.name == selectedBackground);

  if (!background) {
    console.warn('No background found for ', selectedBackground);
    return;
  }

  const previousBackground = previousSelectedBackground;

  // ta bort förra background proficiencies
  previousBackground?.proficiencies.forEach(function (prof) {
    if (typeof prof == 'string') {
      const profLower = prof.toLowerCase().replaceAll(' ', '_');
      $(`#proficiency_skill_${profLower}`).prop('checked', false);
    }
    if ($('#background_skill_proficiencies')) {
      $('#background_skill_proficiencies').empty();
      $('#background_skill_proficiencies').append(
        "Don't forget to remove your previously selected proficiencies from the background. <br> <br>"
      );
    }
  });

  // lägg till de nya
  background.proficiencies.forEach(function (prof) {
    if (typeof prof == 'string') {
      const profLower = prof.toLowerCase().replaceAll(' ', '_');
      $(`#proficiency_skill_${profLower}`).prop('checked', true);
    }
    if (typeof prof == 'object') {
      if ($('#skill_proficiencies_select').is(':empty') && !isLoading) {
        $('#skill_proficiencies_select').append(`
        <p id="background_skill_proficiencies">Choose ${prof.join(', ')}.</p>
      `);

        if (previousBackground) {
          $('#background_skill_proficiencies').append(`
        Don't forget to remove your previously selected proficiencies from the background. <br> <br>`);
        }
        addDoneAddingSkillsButton();
      }
    }
  });

  recalculateAbilities();
  // kom ihåg vilken som var vald ifall man byter
  previousSelectedBackground = background;
});

function addDoneAddingSkillsButton() {
  if ($('#skill_button_box').is(':empty')) {
    $('#skill_button_box').append(
      `<button id="remove_button">Done adding skills</button>`
    );
    $('#remove_button').on('click', function () {
      $('#skill_proficiencies_select').empty();
      $('#skill_button_box').empty();
    });
  }
}

$('#level').on('change', function () {
  level = $(this).val();

  let sumLevel = 0;
  if (multiclassLevel) {
    sumLevel = Number(level) + Number(multiclassLevel);
  } else {
    sumLevel = Number(level);
  }

  const profBonus = proficiency(sumLevel);
  $('#proficiency_bonus').text(profBonus);
  recalculateAbilities();
  recalculateSavingThrow();
  presentWeapon();
  calcSpells();
  presentSpellCasting();
});

$('#class, #level').change(function () {
  if (level && classs) {
    if (multiclass && multiclassLevel) {
      const classToDice = classes.find((x) => x.name == multiclasss.name);

      $('#hit_dice').text('');
      $('#hit_dice').text(
        `${level}d${classs.hitDie}, ${multiclassLevel}d${classToDice.hitDie}`
      );
    } else {
      $('#hit_dice').text('');
      $('#hit_dice').text(`${level}d${classs.hitDie}`);
    }
  }
});

$('#multiclass_button').on('click', function () {
  $('#multiclass_box').css('display', 'block');
  $('#multiclass_button').remove();
  presentMulticlass();
});

$('#ability_strength').keyup(function () {
  const abilityStrength = $(this).val();
  const modifier = abilityCalc(abilityStrength);
  $('#ability_modifier_strength').text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
});

$('#ability_dexterity').keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $('#ability_modifier_dexterity').text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  $('#initiative').val(`+${modifier}`);
});

$('#ability_constitution').keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $('#ability_modifier_constitution').text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
});

$('#ability_intelligence').keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $('#ability_modifier_intelligence').text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  passiveInvestigation();
  calcSpells();
  presentSpellCasting();
});

$('#ability_wisdom').keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $('#ability_modifier_wisdom').text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  passivePerception();
  passiveInsight();
  calcSpells();
  presentSpellCasting();
});

$('#ability_charisma').keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $('#ability_modifier_charisma').text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  calcSpells();
  presentSpellCasting();
});

$('.proficiency, .expertise').change(function () {
  recalculateAbilities();
  passivePerception();
  passiveInsight();
  passiveInvestigation();
});

$('.saving_throw').change(function () {
  recalculateSavingThrow();
});

$('#add_weapon').on('click', function () {
  const weapon = $('.invisible').first();
  weapon.removeClass('invisible');

  if ($('#weapons').children('.invisible').length == 0) {
    $('#add_weapon').remove();
  }
});

$(`.weapon_name`).on('change', function () {
  presentWeapon();
});

$('#armor').change(function () {
  calcArmor();
});

$('.exhaustion').change(function () {
  const exhaustionId = $(this).attr('id');
  const exhaustionLevel = exhaustionId.slice(-1);
  const exhaustionType = {
    1: 'Disadvantage on ability checks.',
    2: 'Speed halved.',
    3: 'Disadvantage on attack rolls and saving throws.',
    4: 'Hit point maximum halved.',
    5: 'Speed reduced to 0.',
    6: 'Death.',
  };

  const isExhausted = $(`#${exhaustionId}`).is(':checked');

  if ($('#exhaustion_description').is(':empty')) {
    $('#exhaustion_description').append(`<p></p>`);
    $('#exhaustion_description').children('p').css('padding', '7px');
  }

  if (isExhausted) {
    $('#exhaustion_description')
      .children('p')
      .append(`${exhaustionType[exhaustionLevel]}<br>`);
  } else {
    const str = $('#exhaustion_description').children('p').text();
    const newstr = str.replace(`${exhaustionType[exhaustionLevel]}`, '');
    $('#exhaustion_description').children('p').empty();
    if (newstr != '') {
      $('#exhaustion_description')
        .children('p')
        .append(newstr.replaceAll('.', '.<br>'));
    } else {
      $('#exhaustion_description').children('p').remove();
    }
  }
});

function calcArmor() {
  const selectedArmor = $('#armor').val();
  const dexModifier = $('#ability_modifier_dexterity').text();

  if (selectedArmor && dexModifier) {
    const armor = armors.find((a) => a.name == selectedArmor);
    let armorDex = 0;

    if (dexModifier <= armor.maxDex) {
      armorDex = dexModifier;
    } else {
      armorDex = armor.maxDex;
    }

    const hasShield = $(`#shield_to_ac`).is(':checked');

    const armorClass =
      Number(armor.ac) + Number(armorDex) + (hasShield ? 2 : 0);
    $('#armor_class').empty();
    $('#armor_class').val(armorClass);
  }
}

function recalculateSavingThrow() {
  // Sätt alla ability scores till rätt värden, baserade på stat, prof
  const profBonus = Number($('#proficiency_bonus').text());

  const abilities = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
  ];

  for (const ability of abilities) {
    const isProficient = $(`#proficiency_saving_throws_${ability}`).is(
      ':checked'
    );
    const statValue = Number($(`#ability_modifier_${ability}`).text());

    let calculatedAbility = statValue;
    if (isProficient) calculatedAbility += profBonus;
    $(`#saving_throws_${ability}`).empty();
    $(`#saving_throws_${ability}`).text(calculatedAbility);
  }
}

function recalculateAbilities() {
  // Sätt alla ability scores till rätt värden, baserade på stat, prof, expertise
  const profBonus = Number($('#proficiency_bonus').text());

  for (const skill of skills) {
    const [_, __, profId, expertId, skillId, statModifier] = skill;

    const isProficient = $(`#${profId}`).is(':checked');
    const isExpert = $(`#${expertId}`).is(':checked');
    const statValue = Number($(`#${statModifier}`).text());

    let calculatedAbility = statValue;
    if (isProficient) calculatedAbility += profBonus;
    if (isProficient && isExpert) calculatedAbility += profBonus;

    $(`#${skillId}`).empty();
    $(`#${skillId}`).text(calculatedAbility);
  }
}

function passivePerception() {
  const perception = $('#skill_perception').text();
  const passivePerception = Number(perception) + 10;
  $('#passive_wisdom').text(passivePerception);
}

function passiveInsight() {
  const insight = $('#skill_insight').text();
  const passiveInsight = Number(insight) + 10;
  $('#passive_insight').text(passiveInsight);
}

function passiveInvestigation() {
  const Investigation = $('#skill_investigation').text();
  const passiveInvestigation = Number(Investigation) + 10;
  $('#passive_investigation').text(passiveInvestigation);
}

function abilityCalc(ability) {
  if (ability.includes('+')) {
    const abilityList = ability.split('+');
    let sum = 0;
    for (let a of abilityList) {
      sum += Number(a);
    }
    return Math.floor((sum - 10) / 2);
  } else {
    return Math.floor((ability - 10) / 2);
  }
}

function proficiency(lvl) {
  return Math.ceil(lvl / 4) + 1;
}

function presentWeapon() {
  for (let i = 0; i <= 4; i++) {
    const selectedWeapon = $(`#weapon_name_${i}`).val();
    const weapon = weapons.find((x) => x.name == selectedWeapon);

    if (!weapon) {
      return;
    }

    let ability = '';
    if (weapon.dex == 0) {
      ability = $('#ability_modifier_strength').text();
    } else if (weapon.dex == 1) {
      const abilityStr = $('#ability_modifier_strength').text();
      const abilityDex = $('#ability_modifier_dexterity').text();
      if (abilityStr > abilityDex) {
        ability = abilityStr;
      } else {
        ability = abilityDex;
      }
    } else {
      ability = $('#ability_modifier_dexterity').text();
    }

    let attackBonus = ability;

    if (
      classs?.weaponProficiency.find((w) => weapon.type.includes(w)) ||
      classs?.weaponProficiency.find((w) => w.includes(weapon.name)) ||
      subrace?.weaponProficiencies.find((w) => w.includes(weapon.name)) ||
      multiclasss?.weaponProficiency.find((w) => weapon.type.includes(w)) ||
      multiclasss?.weaponProficiency.find((w) => w.includes(weapon.name))
    ) {
      attackBonus = Number($('#proficiency_bonus').text()) + Number(ability);
    }

    $(`#attack_bonus_${i}`).val(`+${attackBonus}`);
    $(`#damage_${i}`).val(
      `${weapon.damageDie} + ${ability} ${weapon.damageType}`
    );
    if (weapon.weight != '') {
      $(`#type_${i}`).val(`${weapon.type}, ${weapon.weight}`);
    } else {
      $(`#type_${i}`).val(`${weapon.type}`);
    }
    if (weapon.property != '') {
      $(`#property_${i}`).val(`${weapon.property}`);
    }
  }
}

function addStats() {
  const abilities = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
  ];

  let value = null;

  for (let ability of abilities) {
    const val = $(`#ability_${ability}`).val();
    if (val.includes('+')) {
      const newVal = val.replace(/\+[0-9]/, '');
      $(`#ability_${ability}`).val(newVal);
    }
  }

  const stats = subrace.stats;
  let num = 0;

  for (const stat in stats) {
    const val = stats[stat];

    if (
      (stat == 'one' && classs != null) ||
      (stat == 'two' && classs != null)
    ) {
      const spellcastingAbility = classs.spellcastingAbility.toLowerCase();
      const savingThrows = classs.savingThrows;

      if (spellcastingAbility && stat == 'two') {
        value = $(`#ability_${spellcastingAbility}`).val();
        $(`#ability_${spellcastingAbility}`).val(`${value}+${val}`);
      } else {
        value = $(`#ability_${savingThrows[num].toLowerCase()}`).val();
        $(`#ability_${savingThrows[num].toLowerCase()}`).val(`${value}+${val}`);
        num += 1;
      }
    } else {
      value = $(`#ability_${stat}`).val();
      $(`#ability_${stat}`).val(`${value}+${val}`);
    }
  }
}

function calcSpells() {
  const spellcastingAbility = classs?.spellcastingAbility;

  let modifier = null;

  if (spellcastingAbility) {
    modifier = $(
      `#ability_modifier_${spellcastingAbility.toLowerCase()}`
    ).text();
  }
  const profBonus = $('#proficiency_bonus').text();

  if (modifier && profBonus && classs) {
    const spellSaveDC = Number(modifier) + Number(profBonus) + 8;
    const spellAttackModifier = Number(modifier) + Number(profBonus);

    $('#class_name').text(classs.name);
    $('#spell_save_dc').text(spellSaveDC);
    $('#spell_attack_modifier').text(spellAttackModifier);
    $('#spellcasting_Ability').text(`${spellcastingAbility} +${modifier}`);
  }
}

function presentMulticlass() {
  const classesHTML = multiclass.map(function (classs) {
    return `<option value="${classs.name}">${classs.name}</option>`;
  });
  const classesHTMLAsText = classesHTML.join('');
  $('#multiclass').append(classesHTMLAsText);

  const levelHTML = [];
  for (let i = 1; i <= 20; i++) {
    levelHTML.push(`<option value="${i}">${i}</option>`);
  }
  const levelHTMLAsText = levelHTML.join('');
  $('#multiclassLevel').append(levelHTMLAsText);

  $('#multiclass').change(function () {
    const selectedMulticlass = $('#multiclass').val();
    multiclasss = multiclass.find((x) => x.name == selectedMulticlass);

    if (multiclasss.proficiencies.choose != 0) {
      if ($('#skill_proficiencies_select').is(':empty') && !isLoading) {
        $('#skill_proficiencies_select').append(`
      <p id="multiclass_skill_proficiencies">
        Choose ${
          multiclasss.proficiencies.choose
        } multiclass proficiencies from: ${multiclasss.proficiencies.from.join(
          ', '
        )}.</p>`);

        addDoneAddingSkillsButton();
      }
    } else if (
      multiclasss.proficiencies.choose == 0 &&
      $('#multiclass_skill_proficiencies')
    ) {
      $('#multiclass_skill_proficiencies').empty();
      $('#multiclass_skill_proficiencies').append(
        "Don't forget to remove your previously selected proficiencies from the multiclass. <br> <br>"
      );
    }

    presentMultiSubclass();
    presentSpellCasting();
  });

  $('#multiclassLevel').change(function () {
    multiclassLevel = $(this).val();

    let sumLevel = Number(level) + Number(multiclassLevel);

    const profBonus = proficiency(sumLevel);
    $('#proficiency_bonus').text(profBonus);
    recalculateAbilities();
    recalculateSavingThrow();
    presentWeapon();
    calcSpells();
    presentSpellCasting();
  });

  $('#multiclass, #multiclassLevel').change(function () {
    if (multiclassLevel && multiclasss && level && classs) {
      const classToDice = classes.find((x) => x.name == multiclasss.name);

      $('#hit_dice').text('');
      $('#hit_dice').text(
        `${level}d${classs.hitDie}, ${multiclassLevel}d${classToDice.hitDie}`
      );
    }
  });
}

function presentSpellCasting() {
  if (!multiclasss) {
    return;
  }
  const multi = classes?.find((x) => x.name == multiclasss.name);

  const spellcastingAbility = multi?.spellcastingAbility;

  let modifier = null;

  if (spellcastingAbility) {
    modifier = $(
      `#ability_modifier_${spellcastingAbility.toLowerCase()}`
    ).text();
  }
  const profBonus = $('#proficiency_bonus').text();

  if (modifier && profBonus && multiclasss) {
    $('#spellcasting_multiclass').remove();

    const spellSaveDC = Number(modifier) + Number(profBonus) + 8;
    const spellAttackModifier = Number(modifier) + Number(profBonus);

    $('#spell_casting').append(`
    <div class="two_box" id="spellcasting_multiclass">
        <label class="one_thirds">
          <div id="multiclass_name" class="spellcasting whole_width">${multiclasss.name}</div>
          <p class="label_p">class</p>
        </label>
        <label class="one_sixteenth">
            <div id="spell_save_dc_multiclass" class="spellcasting whole_width">${spellSaveDC}</div>
            <p class="label_p">Spell Save DC</p>
        </label>
        <label class="one_sixteenth">
            <div id="spell_attack_modifier_multiclass" class="spellcasting whole_width">${spellAttackModifier}</div>
            <p class="label_p">Spell Attack Modifier</p>
        </label>
        <label class="one_thirds">
            <div id="spellcasting_Ability_multiclass" class="spellcasting whole_width">${spellcastingAbility} +${modifier}</div>
            <p class="label_p">Spellcasting Ability</p>
        </label>
    </div>
  `);
  }
}

function presentMultiSubclass() {
  $('#multiclassSubclass').children().remove();

  classes.forEach(function (classs) {
    if (classs.name == multiclasss.name) {
      const subClassHTML = classs.subclasses.map(function (subClass) {
        return `<option ${
          isLoading && hero?.multiclassSubclass == subClass ? 'selected ' : ''
        }value="${subClass}">${subClass}</option>`;
      });
      const subClassHTMLAsText = subClassHTML.join('');
      $('#multiclassSubclass').append(
        `<option value="">Select Subclass...</option>${subClassHTMLAsText}`
      );
    }
  });

  presentWeapon();
  presentArmor();
}

function presentArmor() {
  $('#armor').empty();

  const armorList = [
    ...classs.armorProficiency,
    ...(multiclasss?.armorProficiency || []),
  ];

  const profArmors = armors.filter(function (a) {
    return armorList.includes(a.type);
  });

  const armorHTML = [...new Set(profArmors.map((x) => x.name))].map(
    (a) =>
      `<option ${
        isLoading && hero?.armor == a ? 'selected ' : ''
      }value="${a}">${a}</option>`
  );

  const armorHTMLAsText = armorHTML.join('');
  $('#armor').append(
    `<option value="">Select Armor...</option>${armorHTMLAsText}`
  );
}

$('#shield_to_ac').change(function () {
  calcArmor();
});
