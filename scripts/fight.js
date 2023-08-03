import { races } from "../data/races.js";
import { classes } from "../data/classes.js";
import { weapons } from "../data/weapons.js";

//includes samma sak som == men som i en lista

const weaponHTML = weapons.map(function (weapon) {
  return `<option value="${weapon.name}">${weapon.name}</option>`;
});
const weaponHTMLAsText = weaponHTML.join("");
$("#weapon_name").append(weaponHTMLAsText);

$("#weapon_name, #level, #class").on("change", function () {
  presentWeapon();
});
$("#ability_strength, #ability_dexterity").keyup(function () {
  presentWeapon();
});

function presentWeapon() {
  const selectedWeapon = $("#weapon_name").val();
  const selectedClass = $("#class").val();
  const weapon = weapons.find((x) => x.name == selectedWeapon);
  if (!weapon) {
    return;
  }
  const classs = classes.find((x) => x.name == selectedClass);

  let ability = " ";
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

  if (
    classs?.weaponProficiency.find((w) => weapon.type.includes(w)) ||
    classs?.weaponProficiency.find((w) => w.includes(weapon.name))
  ) {
    attackBonus = Number($("#proficiency_bonus").text()) + Number(ability);
  }

  $("#attack_bonus").val(attackBonus);
  $("#damage").val(`${weapon.damageDie} + ${ability} ${weapon.damageType}`);
  if (weapon.weight != "") {
    $("#type").val(`${weapon.type}, ${weapon.weight}`);
  } else {
    $("#type").val(`${weapon.type}`);
  }
  if (weapon.property != "") {
    $("#property").val(`${weapon.property}`);
  }
}

$("#race").change(function () {
  $("#speed").val("");
  const selectedRace = $(this).val();
  const race = races.find((x) => x.name == selectedRace);
  $("#speed").val(`${race.speed} feet`);
});

$("#ability_dexterity").change(function () {
  const modifier = $("#ability_modifier_dexterity").text();
  $("#initiative").val(`+${modifier}`);
});

$("#class, #level").change(function () {
  const selectedLevel = $("#level").val();
  const selectedClass = $("#class").val();

  if (selectedLevel != "" && selectedClass != "") {
    $("#hit_dice").text("");
    const classs = classes.find((x) => x.name == selectedClass);
    $("#hit_dice").text(`${selectedLevel}d${classs.hitDie}`);
  }
});

let previousSelectedClass = null;
$("#class").change(function () {
  const selectedClass = $(this).val();
  const classs = classes.find((x) => x.name == selectedClass);
  const previousclass = classes.find((x) => x.name == previousSelectedClass);

  previousclass?.savingThrows.forEach(function (ability) {
    const abilityLower = ability.toLowerCase();
    $(`#proficiency_saving_throws_${abilityLower}`).prop("checked", false);
    $(`#proficiency_saving_throws_${abilityLower}`).trigger("change");
  });

  // lägg till de nya
  classs.savingThrows.forEach(function (ability) {
    const abilityLower = ability.toLowerCase();
    $(`#proficiency_saving_throws_${abilityLower}`).prop("checked", true);
    $(`#proficiency_saving_throws_${abilityLower}`).trigger("change");
  });
  // kom ihåg vilken som var vald ifall man byter
  previousSelectedClass = classs.name;
});
