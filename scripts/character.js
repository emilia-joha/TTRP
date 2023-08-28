import { races } from "../data/races.js";
import { backgrounds } from "../data/backgrounds.js";
import { classes } from "../data/classes.js";
import { weapons } from "../data/weapons.js";
import { skills } from "../data/skills.js";
import { armors } from "../data/armor.js";
import { multiclass } from "../data/multiclass.js";

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
      </div>`;
});
const htmlAsText = skillHTML.join("");
$("#skills").append(htmlAsText);

function weaponsAsHTML() {
  return weapons
    .map(function (weapon) {
      return `<option value="${weapon.name}">${weapon.name}</option>`;
    })
    .join("");
}
$(`#weapon_name_${weaponNumber}`).append(weaponsAsHTML());

$("#name").on("change", function () {
  const name = $("#name").val();
  $("#characterName").text(name);
});

$(`#weapon_name_${weaponNumber}`).on("change", function () {
  presentWeapon();
});

$("#ability_strength, #ability_dexterity").keyup(function () {
  presentWeapon();
});

$("#class").on("change", function () {
  const selectedClass = $(this).val();
  classs = classes.find((x) => x.name == selectedClass);

  $("#subclass").children().remove();

  classes.map(function (classs) {
    if (classs.name == selectedClass) {
      const subClassHTML = classs.subclasses.map(function (subClass) {
        return `<option value="${subClass}">${subClass}</option>`;
      });
      const subClassHTMLAsText = subClassHTML.join("");
      $("#subclass").append(
        `<option value="">Select Subclass...</option>${subClassHTMLAsText}`
      );
    }
  });

  const previousClass = classes.find((b) => b.name == previousSelectedClass);

  // ta bort förra Class saving throw proficiencies
  previousClass?.savingThrows.forEach(function (prof) {
    const profLower = prof.toLowerCase().replaceAll(" ", "_");
    $(`#proficiency_saving_throws_${profLower}`).prop("checked", false);
  });

  // lägg till de nya saving throw proficiencies
  classs.savingThrows.forEach(function (prof) {
    const profLower = prof.toLowerCase().replaceAll(" ", "_");
    $(`#proficiency_saving_throws_${profLower}`).prop("checked", true);
  });

  // kom ihåg vilken som var vald ifall man byter
  previousSelectedClass = classs.name;

  if ($("#skill_proficiencies_select").is(":empty")) {
    $("#skill_proficiencies_select").append(`
    <p id="class_skill_proficiencies"></p>
  `);
  } else {
    $("#class_skill_proficiencies").empty();
    $("#class_skill_proficiencies").append(
      "Don't forget to remove your previously selected proficiencies from the class. <br> <br>"
    );
  }

  $("#class_skill_proficiencies").append(`
  Choose ${
    classs.proficiencies.choose
  } class proficiencies from: ${classs.proficiencies.from.join(", ")}.
  `);

  if ($("#skill_button_box").is(":empty")) {
    $("#skill_button_box").append(
      `<button id="remove_button">Done adding skills</button>`
    );
    $("#remove_button").on("click", function () {
      $("#skill_proficiencies_select").empty();
      $("#skill_button_box").empty();
    });
  }

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

  $("#subrace").children().remove();

  races.map(function (race) {
    if (race.name == selectedRace) {
      const subraceHTML = race.subclasses.map(function (subrace) {
        return `<option value="${subrace.name}">${subrace.name}</option>`;
      });
      const subraceHTMLAsText = subraceHTML.join("");
      $("#subrace").append(
        `<option value="">Select Subrace...</option>${subraceHTMLAsText}`
      );
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
    }
    if ($("#race_skill_proficiencies")) {
      $("#race_skill_proficiencies").empty();
      $("#race_skill_proficiencies").append(
        "Don't forget to remove your previously selected proficiencies from the race. <br> <br>"
      );
    }
  });

  // lägg till de nya
  newSubrace.proficiencies.forEach(function (prof) {
    if (typeof prof == "string") {
      const profLower = prof.toLowerCase().replaceAll(" ", "_");
      $(`#proficiency_skill_${profLower}`).prop("checked", true);
    }
  });

  if (typeof newSubrace.proficiencies[0] == "object") {
    if ($("#skill_proficiencies_select").is(":empty")) {
      $("#skill_proficiencies_select").append(`
      <p id="race_skill_proficiencies"></p>
    `);
    } else {
      $("#race_skill_proficiencies").empty();
      $("#race_skill_proficiencies").append(
        "Don't forget to remove your previously selected proficiencies from the race. <br> <br>"
      );
    }

    $("#race_skill_proficiencies").append(`
    Choose ${newSubrace.proficiencies}
    `);

    if ($("#skill_button_box").is(":empty")) {
      $("#skill_button_box").append(
        `<button id="remove_button">Done adding skills</button>`
      );
      $("#remove_button").on("click", function () {
        $("#skill_proficiencies_select").empty();
        $("#skill_button_box").empty();
      });
    }
  }

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
    }
    if ($("#background_skill_proficiencies")) {
      $("#background_skill_proficiencies").empty();
      $("#background_skill_proficiencies").append(
        "Don't forget to remove your previously selected proficiencies from the background. <br> <br>"
      );
    }
  });

  // lägg till de nya
  background.proficiencies.forEach(function (prof) {
    if (typeof prof == "string") {
      const profLower = prof.toLowerCase().replaceAll(" ", "_");
      $(`#proficiency_skill_${profLower}`).prop("checked", true);
    }
    if (typeof prof == "object") {
      if ($("#skill_proficiencies_select").is(":empty")) {
        $("#skill_proficiencies_select").append(`
        <p id="background_skill_proficiencies"></p>
      `);
      } else {
        $("#background_skill_proficiencies").empty();
        $("#background_skill_proficiencies").append(
          "Don't forget to remove your previously selected proficiencies from the background. <br> <br>"
        );
      }

      $("#background_skill_proficiencies").append(`
      Choose ${prof.join(", ")}.
      `);

      if ($("#skill_button_box").is(":empty")) {
        $("#skill_button_box").append(
          `<button id="remove_button">Done adding skills</button>`
        );
        $("#remove_button").on("click", function () {
          $("#skill_proficiencies_select").empty();
          $("#skill_button_box").empty();
        });
      }
    }
  });

  recalculateAbilities();
  // kom ihåg vilken som var vald ifall man byter
  previousSelectedBackground = background.name;
});

$("#level").on("change", function () {
  level = $(this).val();

  let sumLevel = 0;
  if (multiclassLevel) {
    sumLevel = Number(level) + Number(multiclassLevel);
  } else {
    sumLevel = Number(level);
  }

  const profBonus = proficiency(sumLevel);
  $("#proficiency_bonus").text(profBonus);
  recalculateAbilities();
  recalculateSavingThrow();
  presentWeapon();
  calcSpells();
  presentSpellCasting();
});

$("#class, #level").change(function () {
  if (level && classs) {
    if (multiclass && multiclassLevel) {
      const classToDice = classes.find((x) => x.name == multiclasss.name);

      $("#hit_dice").text("");
      $("#hit_dice").text(
        `${level}d${classs.hitDie}, ${multiclassLevel}d${classToDice.hitDie}`
      );
    } else {
      $("#hit_dice").text("");
      $("#hit_dice").text(`${level}d${classs.hitDie}`);
    }
  }
});

$("#multiclass_button").on("click", function () {
  presentMulticlass();
});

$("#ability_strength").keyup(function () {
  const abilityStrength = $(this).val();
  const modifier = abilityCalc(abilityStrength);
  $("#ability_modifier_strength").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
});

$("#ability_dexterity").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_dexterity").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  $("#initiative").val(`+${modifier}`);
});

$("#ability_constitution").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_constitution").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
});

$("#ability_intelligence").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_intelligence").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  passiveInvestigation();
  calcSpells();
  presentSpellCasting();
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
  presentSpellCasting();
});

$("#ability_charisma").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_charisma").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  calcSpells();
  presentSpellCasting();
});

$(".proficiency, .expertise").change(function () {
  recalculateAbilities();
  passivePerception();
  passiveInsight();
  passiveInvestigation();
});

$(".saving_throw").change(function () {
  recalculateSavingThrow();
});

$("#add_weapon").on("click", function () {
  weaponNumber += 1;
  const weaponHTML = `
    <div class="weapon">
            <label class="whole_width">
                <select id="weapon_name_${weaponNumber}">
                    <option value="">Select Weapon...</option>
                    ${weaponsAsHTML()}
                </select>
            </label>
            <div class="two_box">
                <label class="half_width">
                    <input type="text" id="type_${weaponNumber}">
                    Weapon Type
                </label>
                <label class="half_width">
                    <input type="text" id="attack_bonus_${weaponNumber}">
                    Attack Bonus
                </label>
            </div>
            <div class="two_box">
                <label class="half_width">
                    <input type="text" id="damage_${weaponNumber}">
                    Damage
                </label>
                <label class="half_width">
                    <input type="text" id="property_${weaponNumber}">
                    Weapon Property
                </label>
            </div>  
        </div>
    `;

  $("#weapons").append(weaponHTML);

  $(`#weapon_name_${weaponNumber}`).on("change", function () {
    presentWeapon();
  });
});

$("#armor").change(function () {
  calcArmor();
});

$(".exhaustion").change(function () {
  const exhaustionId = $(this).attr("id");
  const exhaustionLevel = exhaustionId.slice(-1);
  const exhaustionType = {
    1: "Disadvantage on ability checks.",
    2: "Speed halved.",
    3: "Disadvantage on attack rolls and saving throws.",
    4: "Hit point maximum halved.",
    5: "Speed reduced to 0.",
    6: "Death.",
  };

  const isExhausted = $(`#${exhaustionId}`).is(":checked");

  if ($("#exhaustion_description").is(":empty")) {
    $("#exhaustion_description").append(`<p></p>`);
    $("#exhaustion_description").children("p").css("padding", "7px");
  }

  if (isExhausted) {
    $("#exhaustion_description")
      .children("p")
      .append(`${exhaustionType[exhaustionLevel]}<br>`);
  } else {
    const str = $("#exhaustion_description").children("p").text();
    const newstr = str.replace(`${exhaustionType[exhaustionLevel]}`, "");
    $("#exhaustion_description").children("p").empty();
    if (newstr != "") {
      $("#exhaustion_description")
        .children("p")
        .append(newstr.replaceAll(".", ".<br>"));
    } else {
      $("#exhaustion_description").children("p").remove();
    }
  }
});

function calcArmor() {
  const selectedArmor = $("#armor").val();
  const dexModifier = $("#ability_modifier_dexterity").text();

  if (selectedArmor && dexModifier) {
    const armor = armors.find((a) => a.name == selectedArmor);
    let armorDex = 0;

    if (dexModifier <= armor.maxDex) {
      armorDex = dexModifier;
    } else {
      armorDex = armor.maxDex;
    }

    const armorClass = Number(armor.ac) + Number(armorDex);
    $("#armor_class").empty();
    $("#armor_class").val(armorClass);
    $("#shield_to_ac").prop("checked", false);
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
  if (ability.includes("+")) {
    const abilityList = ability.split("+");
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
      subrace?.weaponProficiencies.find((w) => w.includes(weapon.name)) ||
      multiclasss?.weaponProficiency.find((w) => weapon.type.includes(w)) ||
      multiclasss?.weaponProficiency.find((w) => w.includes(weapon.name))
    ) {
      attackBonus = Number($("#proficiency_bonus").text()) + Number(ability);
    }

    $(`#attack_bonus_${i}`).val(`+${attackBonus}`);
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
  const profBonus = $("#proficiency_bonus").text();

  if (modifier && profBonus && classs) {
    const spellSaveDC = Number(modifier) + Number(profBonus) + 8;
    const spellAttackModifier = Number(modifier) + Number(profBonus);

    $("#class_name").text(classs.name);
    $("#spell_save_dc").text(spellSaveDC);
    $("#spell_attack_modifier").text(spellAttackModifier);
    $("#spellcasting_Ability").text(`${spellcastingAbility} +${modifier}`);
  }
}

function presentMulticlass() {
  $("#multiclass_box").empty();

  const classesHTML = multiclass.map(function (classs) {
    return `<option value="${classs.name}">${classs.name}</option>`;
  });
  const classesHTMLAsText = classesHTML.join("");

  const levelHTML = [];
  for (let i = 1; i <= 20; i++) {
    levelHTML.push(`<option value="${i}">${i}</option>`);
  }
  const levelHTMLAsText = levelHTML.join("");

  $("#multiclass_box").append(`
      <div class="two_box">
      <label class="half_width">
      <select id="multiclass" >
          <option value="">Select Class...</option> ${classesHTMLAsText}
      </select>
      Class
      </label>
      <label class="half_width">
          <select id="multiclassSubclass" >
              <option value="">Select Subclass</option>
          </select>
          Subclass
      </label>
    </div>
    <label class="whole_width">
      <select id="multiclassLevel" >
          <option value="">Select Level...</option> ${levelHTMLAsText}
      </select>
      Level
    </label>
  `);

  $("#multiclass").change(function () {
    const selectedMulticlass = $("#multiclass").val();
    multiclasss = multiclass.find((x) => x.name == selectedMulticlass);

    if (multiclasss.proficiencies.choose != 0) {
      if ($("#skill_proficiencies_select").is(":empty")) {
        $("#skill_proficiencies_select").append(`
      <p id="multiclass_skill_proficiencies"></p>
    `);
      } else {
        $("#multiclass_skill_proficiencies").empty();
        $("#multiclass_skill_proficiencies").append(
          "Don't forget to remove your previously selected proficiencies from the multiclass. <br> <br>"
        );
      }

      $("#multiclass_skill_proficiencies").append(`
    Choose ${
      multiclasss.proficiencies.choose
    } multiclass proficiencies from: ${multiclasss.proficiencies.from.join(
        ", "
      )}.
    `);

      if ($("#skill_button_box").is(":empty")) {
        $("#skill_button_box").append(
          `<button id="remove_button">Done adding skills</button>`
        );
        $("#remove_button").on("click", function () {
          $("#skill_proficiencies_select").empty();
          $("#skill_button_box").empty();
        });
      }
    } else if (
      multiclasss.proficiencies.choose == 0 &&
      $("#multiclass_skill_proficiencies")
    ) {
      $("#multiclass_skill_proficiencies").empty();
      $("#multiclass_skill_proficiencies").append(
        "Don't forget to remove your previously selected proficiencies from the multiclass. <br> <br>"
      );
    }

    presentMultiSubclass();
    presentSpellCasting();
  });

  $("#multiclassLevel").change(function () {
    multiclassLevel = $(this).val();

    let sumLevel = Number(level) + Number(multiclassLevel);

    const profBonus = proficiency(sumLevel);
    $("#proficiency_bonus").text(profBonus);
    recalculateAbilities();
    recalculateSavingThrow();
    presentWeapon();
    calcSpells();
    presentSpellCasting();
  });

  $("#multiclass, #multiclassLevel").change(function () {
    if (multiclassLevel && multiclasss && level && classs) {
      const classToDice = classes.find((x) => x.name == multiclasss.name);

      $("#hit_dice").text("");
      $("#hit_dice").text(
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
  const profBonus = $("#proficiency_bonus").text();

  if (modifier && profBonus && multiclasss) {
    $("#spellcasting_multiclass").remove();

    const spellSaveDC = Number(modifier) + Number(profBonus) + 8;
    const spellAttackModifier = Number(modifier) + Number(profBonus);

    $("#spell_casting").append(`
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
  $("#multiclassSubclass").children().remove();

  classes.map(function (classs) {
    if (classs.name == multiclasss.name) {
      const subClassHTML = classs.subclasses.map(function (subClass) {
        return `<option value="${subClass}">${subClass}</option>`;
      });
      const subClassHTMLAsText = subClassHTML.join("");
      $("#multiclassSubclass").append(
        `<option value="">Select Subclass...</option>${subClassHTMLAsText}`
      );
    }
  });

  const previousClass = classes.find((b) => b.name == previousSelectedClass);

  // kom ihåg vilken som var vald ifall man byter
  previousSelectedMulticlass = multiclass;

  presentWeapon();
  presentArmor();
}

function presentArmor() {
  $("#armor").empty();

  const armorList = [];

  for (let armor of classs.armorProficiency) {
    armorList.push(armor);
  }

  if (multiclasss) {
    for (let armor of multiclasss.armorProficiency) {
      armorList.push(armor);
    }
  }

  const profArmors = armors.filter(function (a) {
    return armorList.includes(a.type);
  });

  const armorHTML = profArmors.map(function (a) {
    22;
    return `<option value="${a.name}">${a.name}</option>`;
  });

  $("#shield").empty();
  if (armorList.includes("Shield")) {
    $("#shield").append(
      '<label><input type="checkbox" id="shield_to_ac">Shield</label>'
    );

    $("#shield_to_ac").change(function () {
      const hasShield = $(`#shield_to_ac`).is(":checked");

      const AC = $("#armor_class").val();

      if (hasShield) {
        if (AC == "") {
          $("#armor_class").val(2);
        } else {
          $("#armor_class").val(Number(AC) + 2);
        }
      } else {
        $("#armor_class").val(Number(AC) - 2);
      }
    });
  }

  const armorHTMLAsText = armorHTML.join("");
  $("#armor").append(
    `<option value="">Select Armor...</option>${armorHTMLAsText}`
  );
}

//TODO: föredetta multiclass
