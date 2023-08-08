import { races } from "../data/races.js";
import { classes } from "../data/classes.js";
import { weapons } from "../data/weapons.js";

//includes samma sak som == men som i en lista

let weaponNumber = 0;

function weaponsAsHTML() {
  return weapons
    .map(function (weapon) {
      return `<option value="${weapon.name}">${weapon.name}</option>`;
    })
    .join("");
}
$(`#weapon_name_${weaponNumber}`).append(weaponsAsHTML());

$(`#weapon_name_${weaponNumber}, #level, #class`).on("change", function () {
  presentWeapon();
});
$("#ability_strength, #ability_dexterity").keyup(function () {
  presentWeapon();
});

function presentWeapon() {
  for (let i = 0; i <= weaponNumber; i++) {
    const selectedWeapon = $(`#weapon_name_${i}`).val();
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
    // TODO: Lägg till saving throws i recalculateSavingThrows
    $(`#proficiency_saving_throws_${abilityLower}`).prop("checked", false);
    $(`#proficiency_saving_throws_${abilityLower}`).trigger("change");
  });

  // lägg till de nya
  classs.savingThrows.forEach(function (ability) {
    const abilityLower = ability.toLowerCase();
    // TODO: Lägg till saving throws i recalculateSavingThrows
    $(`#proficiency_saving_throws_${abilityLower}`).prop("checked", true);
    $(`#proficiency_saving_throws_${abilityLower}`).trigger("change");
  });
  // kom ihåg vilken som var vald ifall man byter
  previousSelectedClass = classs.name;
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

function calcSpellSaveDC() {
  //  8 + proficiency bonus + spell modifier
}

function calcSpellAttackModifier() {
  // proficiency bonus + spell modifier
}
