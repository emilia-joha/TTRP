import { races } from "../data/races.js";
import { backgrounds } from "../data/backgrounds.js";
import { classes } from "../data/classes.js";
import { weapons } from "../data/weapons.js";
import { skills } from "../data/skills.js";
import { armors } from "../data/armor.js";

let classs = null;
let previousSelectedClass = null;
let race = null;
let subrace = null;
let background = null;
let previousSelectedBackground = null;
let level = null;
let weaponNumber = 0;

const racesHTML = races.map(function (race) {
  return `<option value="${race.name}">${race.name}</option>`;
});
const racesHTMLAsText = racesHTML.join("");
$("#race").append(racesHTMLAsText);

const backgroundHTML = backgrounds.map(function (background) {
  return `<option value="${background.name}">${background.name}</option>`;
});
const backgroundHTMLAsText = backgroundHTML.join("");
$("#background").append(backgroundHTMLAsText);

const classesHTML = classes.map(function (classs) {
  return `<option value="${classs.name}">${classs.name}</option>`;
});
const classesHTMLAsText = classesHTML.join("");
$("#class").append(classesHTMLAsText);

const levelHTML = [];
for (let i = 1; i <= 20; i++) {
  levelHTML.push(`<option value="${i}">${i}</option>`);
}
const levelHTMLAsText = levelHTML.join("");
$("#level").append(levelHTMLAsText);

const skillHTML = skills.map(function (skill) {
  return `
      <div class="skill">
          <label>
              <input id="${skill[3]}" class="expertise" type="checkbox"/>
              <input id="${skill[2]}" class="proficiency" type="checkbox"/>
              <p id="${skill[4]}" class="${skill[1]}"> </p>
              ${skill[0]} (${skill[1]})
          </label>
          <hr>
      </div>`;
});
const htmlAsText = skillHTML.join("");
$("#skills").html(htmlAsText);

function weaponsAsHTML() {
  return weapons
    .map(function (weapon) {
      return `<option value="${weapon.name}">${weapon.name}</option>`;
    })
    .join("");
}
$(`#weapon_name_${weaponNumber}`).append(weaponsAsHTML());

$(`#weapon_name_${weaponNumber}`).on("change", function () {
  presentWeapon();
});

$("#ability_strength, #ability_dexterity").keyup(function () {
  presentWeapon();
});

$("#class").on("change", function () {
  const selectedClass = $(this).val();
  classs = classes.find((x) => x.name == selectedClass);

  if ($("#subclass").children().length > 1) {
    $("#subclass").children().remove();
  }

  classes.map(function (classs) {
    if (classs.name == selectedClass) {
      const subClassHTML = classs.subclasses.map(function (subClass) {
        return `<option value="${subClass}">${subClass}</option>`;
      });
      const subClassHTMLAsText = subClassHTML.join("");
      $("#subclass").append(subClassHTMLAsText);
    }
  });

  const previousClass = classes.find((b) => b.name == previousSelectedClass);

  // ta bort förra Class proficiencies
  previousClass?.savingThrows.forEach(function (prof) {
    const profLower = prof.toLowerCase().replaceAll(" ", "_");
    $(`#proficiency_saving_throws_${profLower}`).prop("checked", false);
  });

  // lägg till de nya
  classs.savingThrows.forEach(function (prof) {
    const profLower = prof.toLowerCase().replaceAll(" ", "_");
    $(`#proficiency_saving_throws_${profLower}`).prop("checked", true);
  });

  // kom ihåg vilken som var vald ifall man byter
  previousSelectedClass = classs.name;

  if (subrace) {
    addStats();
  }
  recalculateSavingThrow();
  presentWeapon();
  presentArmor();
  calcSpells();
});

$("#race").on("change", function () {
  const selectedRace = $(this).val();
  race = races.find((x) => x.name == selectedRace);

  if ($("#subrace").children().length > 1) {
    $("#subrace").children().remove();
  }

  races.map(function (race) {
    if (race.name == selectedRace) {
      const subraceHTML = race.subclasses.map(function (subrace) {
        return `<option value="${subrace.name}">${subrace.name}</option>`;
      });
      const subraceHTMLAsText = subraceHTML.join("");
      $("#subrace").append(subraceHTMLAsText);
    }
  });
});

$("#subrace").change(function () {
  $("#darkvision").val("");
  const selectedSubrace = $(this).val();
  const newSubrace = race?.subclasses.find((x) => x.name == selectedSubrace);
  const previousSubrace = subrace;

  if (newSubrace.darkvision != 0) {
    $("#darkvision").val(`${newSubrace.darkvision} feet`);
  }
  $("#speed").val(`${newSubrace.speed} feet`);

  // ta bort förra subrace proficiencies
  previousSubrace?.proficiencies.forEach(function (prof) {
    if (typeof prof == "string") {
      const profLower = prof.toLowerCase().replaceAll(" ", "_");
      $(`#proficiency_skill_${profLower}`).prop("checked", false);
    } else {
      alert(
        `Please remove the proficiency you chose of the following skill proficiencies: ${prof.join(
          ", "
        )}`
      );
    }
  });

  // lägg till de nya
  newSubrace.proficiencies.forEach(function (prof) {
    if (typeof prof == "string") {
      const profLower = prof.toLowerCase().replaceAll(" ", "_");
      $(`#proficiency_skill_${profLower}`).prop("checked", true);
    } else {
      alert(`${prof}`);
    }
  });

  recalculateAbilities();
  subrace = newSubrace;
  addStats();
});

$("#background").on("change", function () {
  const selectedBackground = $(this).val();
  background = backgrounds.find((x) => x.name == selectedBackground);

  const previousBackground = backgrounds.find(
    (b) => b.name == previousSelectedBackground
  );

  // ta bort förra background proficiencies
  previousBackground?.proficiencies.forEach(function (prof) {
    if (typeof prof == "string") {
      const profLower = prof.toLowerCase().replaceAll(" ", "_");
      $(`#proficiency_skill_${profLower}`).prop("checked", false);
    } else {
      alert(
        `Please remove the proficiency you chose of the following skill proficiencies: ${prof.join(
          ", "
        )}`
      );
    }
  });

  // lägg till de nya
  background.proficiencies.forEach(function (prof) {
    if (typeof prof == "string") {
      const profLower = prof.toLowerCase().replaceAll(" ", "_");
      $(`#proficiency_skill_${profLower}`).prop("checked", true);
    } else {
      alert(
        `Choose one of the following skill proficiencies: ${prof.join(", ")}`
      );
    }
  });
  recalculateAbilities();
  // kom ihåg vilken som var vald ifall man byter
  previousSelectedBackground = background.name;
});

$("#level").on("change", function () {
  level = $(this).val();
  const profBonus = proficiency(level);
  $("#proficiency_bonus").text(profBonus);
  recalculateAbilities();
  recalculateSavingThrow();
  presentWeapon();
  calcSpells();
});

$("#class, #level").change(function () {
  if (level != null && classs != null) {
    $("#hit_dice").text("");
    $("#hit_dice").text(`${level}d${classs.hitDie}`);
  }
});

$("#ability_strength").keyup(function () {
  const abilityStrength = $(this).val();
  const modifier = abilityCalc(abilityStrength);
  $("#ability_modifier_strength").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  calcSpells();
});

$("#ability_dexterity").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_dexterity").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  calcSpells();
  calcArmor();
  $("#initiative").val(`+${modifier}`);
});

$("#ability_constitution").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_constitution").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  calcSpells();
});

$("#ability_intelligence").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_intelligence").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  passiveInvestigation();
  calcSpells();
});

$("#ability_wisdom").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_wisdom").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  passivePerception();
  passiveInsight();
  calcSpells();
});

$("#ability_charisma").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_charisma").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  calcSpells();
});

$(".proficiency, .expertise").change(function () {
  recalculateAbilities();
  passivePerception();
  passiveInsight();
  passiveInvestigation();
  calcSpells();
});

$(".saving_throw").change(function () {
  recalculateSavingThrow();
});

$("#add_weapon").on("click", function () {
  weaponNumber += 1;
  const weaponHTML = `
    <div>
      <select id="weapon_name_${weaponNumber}">
        <option value="">Select Weapon...</option>
        ${weaponsAsHTML()}
      </select>
      <input type="text" id="type_${weaponNumber}">
      <input type="text" id="attack_bonus_${weaponNumber}">
      <input type="text" id="damage_${weaponNumber}">
      <input type="text" id="property_${weaponNumber}">
    </div>`;

  $("#weapons").append(weaponHTML);

  $(`#weapon_name_${weaponNumber}`).on("change", function () {
    presentWeapon();
  });
});

$("#armor").change(function () {
  calcArmor();
});

//

function calcArmor() {
  const selectedArmor = $("#armor").val();
  const dexModifier = $("#ability_modifier_dexterity").text();

  if (selectedArmor && dexModifier) {
    const armor = armors.find((a) => a.name == selectedArmor);
    const armorDex = 0;

    if (dexModifier <= armor.maxDex) {
      armorDex = dexModifier;
    } else {
      armorDex = armor.maxDex;
    }

    const armorClass = armor.ac + armorDex;

    $("#armor_class").val(armorClass);
  }
}

function recalculateSavingThrow() {
  // Sätt alla ability scores till rätt värden, baserade på stat, prof
  const profBonus = Number($("#proficiency_bonus").text());

  const abilities = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  for (const ability of abilities) {
    const isProficient = $(`#proficiency_saving_throws_${ability}`).is(
      ":checked"
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
  const profBonus = Number($("#proficiency_bonus").text());

  for (const skill of skills) {
    const [_, __, profId, expertId, skillId, statModifier] = skill;

    const isProficient = $(`#${profId}`).is(":checked");
    const isExpert = $(`#${expertId}`).is(":checked");
    const statValue = Number($(`#${statModifier}`).text());

    let calculatedAbility = statValue;
    if (isProficient) calculatedAbility += profBonus;
    if (isProficient && isExpert) calculatedAbility += profBonus;

    $(`#${skillId}`).empty();
    $(`#${skillId}`).text(calculatedAbility);
  }
}

function passivePerception() {
  const perception = $("#skill_perception").text();
  const passivePerception = Number(perception) + 10;
  $("#passive_wisdom").text(passivePerception);
}

function passiveInsight() {
  const insight = $("#skill_insight").text();
  const passiveInsight = Number(insight) + 10;
  $("#passive_insight").text(passiveInsight);
}

function passiveInvestigation() {
  const Investigation = $("#skill_investigation").text();
  const passiveInvestigation = Number(Investigation) + 10;
  $("#passive_investigation").text(passiveInvestigation);
}

function abilityCalc(ability) {
  return Math.floor((ability - 10) / 2);
}

function proficiency(lvl) {
  return Math.ceil(lvl / 4) + 1;
}

function presentWeapon() {
  for (let i = 0; i <= weaponNumber; i++) {
    const selectedWeapon = $(`#weapon_name_${i}`).val();
    const weapon = weapons.find((x) => x.name == selectedWeapon);
    if (!weapon) {
      return;
    }

    let ability = "";
    if (weapon.dex == 0) {
      ability = $("#ability_modifier_strength").text();
    } else if (weapon.dex == 1) {
      const abilityStr = $("#ability_modifier_strength").text();
      const abilityDex = $("#ability_modifier_dexterity").text();
      if (abilityStr > abilityDex) {
        ability = abilityStr;
      } else {
        ability = abilityDex;
      }
    } else {
      ability = $("#ability_modifier_dexterity").text();
    }

    let attackBonus = ability;
    const selectedSubrace = $("#subrace").val();
    const subrace = race?.subclasses.find((x) => x.name == selectedSubrace);

    if (
      classs?.weaponProficiency.find((w) => weapon.type.includes(w)) ||
      classs?.weaponProficiency.find((w) => w.includes(weapon.name)) ||
      subrace?.weaponProficiencies.find((w) => w.includes(weapon.name))
    ) {
      attackBonus = Number($("#proficiency_bonus").text()) + Number(ability);
    }

    $(`#attack_bonus_${i}`).val(attackBonus);
    $(`#damage_${i}`).val(
      `${weapon.damageDie} + ${ability} ${weapon.damageType}`
    );
    if (weapon.weight != "") {
      $(`#type_${i}`).val(`${weapon.type}, ${weapon.weight}`);
    } else {
      $(`#type_${i}`).val(`${weapon.type}`);
    }
    if (weapon.property != "") {
      $(`#property_${i}`).val(`${weapon.property}`);
    }
  }
}

function addStats() {
  const abilities = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  let value = null;

  for (let ability of abilities) {
    const val = $(`#ability_${ability}`).val();
    if (val.includes("+")) {
      const newVal = val.replace(/\+[0-9]/, "");
      $(`#ability_${ability}`).val(newVal);
    }
  }

  const stats = subrace.stats;
  let num = 0;

  for (const stat in stats) {
    const val = stats[stat];

    if (
      (stat == "one" && classs != null) ||
      (stat == "two" && classs != null)
    ) {
      const spellcastingAbility = classs.spellcastingAbility.toLowerCase();
      const savingThrows = classs.savingThrows;

      if (spellcastingAbility && stat == "two") {
        value = $(`#ability_${spellcastingAbility}`).val();
        console.log(value);
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
  const spellcastingAbility = classs.spellcastingAbility;
  const modifier = $(
    `#ability_modifier_${spellcastingAbility.toLowerCase()}`
  ).text();
  const profBonus = $("#proficiency_bonus").text();

  if (modifier && profBonus && classs) {
    const spellSaveDC = Number(modifier) + Number(profBonus) + 8;
    const spellAttackModifier = Number(modifier) + Number(profBonus);

    $("#spell_save_dc").text(spellSaveDC);
    $("#spell_attack_modifier").text(spellAttackModifier);
    $("#spellcasting_Ability").text(`${spellcastingAbility} +${modifier}`);
  }
}

function presentArmor() {
  const armorList = classs.armorProficiency;

  const profArmors = armors.filter(function (a) {
    return armorList.includes(a.type);
  });

  const armorHTML = profArmors.map(function (a) {
    return `<option value="${a.name}">${a.name}</option>`;
  });

  const armorHTMLAsText = armorHTML.join("");
  $("#armor").append(armorHTMLAsText);
}

//Lägg till text on hover som förklarar expertice och proficiency check box
//https://www.w3schools.com/howto/howto_css_tooltip.asp

//TODO: select... ska alltid finnas överst i alla select boxar
//TODO: lägga till multiclass
//TODO: räkna om modifiern med +en från ras stats
//TODO: checkbox till shield och recalculate ac