import { backgrounds } from "../data/backgrounds.js";
import { skills } from "../data/skills.js";
import { races } from "../data/races.js";
import { race } from "./character_info.js";

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
});

$("#ability_wisdom").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_wisdom").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
  passivePerception();
  passiveInsight();
});

$("#ability_charisma").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_charisma").text(modifier);
  recalculateAbilities();
  recalculateSavingThrow();
});

$("#level").on("change", function () {
  const selectedlevel = $(this).val();
  const profBonus = proficiency(selectedlevel);
  $("#proficiency_bonus").text(profBonus);
  recalculateAbilities();
  recalculateSavingThrow();
});

let previousSelectedBackground = null;
$("#background").on("change", function () {
  const selectedBackground = $(this).val();

  const background = backgrounds.find((b) => b.name == selectedBackground);
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

$(".proficiency, .expertise").change(function () {
  recalculateAbilities();
  passivePerception();
  passiveInsight();
  passiveInvestigation();
});

$("#subrace").change(function () {
  $("#darkvision").val("");
  const selectedSubrace = $(this).val();
  const subrace = race?.subclasses.find((x) => x.name == selectedSubrace);

  console.log(race);
  if (subrace.darkvision != 0) {
    $("#darkvision").val(`${subrace.darkvision} feet`);
  }
});

$("saving_throw").change(function () {
  recalculateSavingThrow();
});

function recalculateSavingThrow() {
  // Sätt alla ability scores till rätt värden, baserade på stat, prof, expertise
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
  const perception = $("#Perception").text();
  const passivePerception = Number(perception) + 10;
  $("#passive_wisdom").text(passivePerception);
}

function passiveInsight() {
  const insight = $("#Insight").text();
  const passiveInsight = Number(insight) + 10;
  $("#passive_insight").text(passiveInsight);
}

function passiveInvestigation() {
  const Investigation = $("#Investigation").text();
  const passiveInvestigation = Number(Investigation) + 10;
  $("#passive_investigation").text(passiveInvestigation);
}

function abilityCalc(ability) {
  return Math.floor((ability - 10) / 2);
}

function proficiency(lvl) {
  return Math.ceil(lvl / 4) + 1;
}

//Lägg till text on hover som förklarar expertice och proficiency check box
//https://www.w3schools.com/howto/howto_css_tooltip.asp

//TODO: vissa raser har weapon prof. bonus
//TODO: vissa subklasser har annan walking speed.
//TODO: Spara valda variabler och exportera vidareS
// har vissa subraser proficiensys i skills?

// raser ger stats också, men måste göras manuellt just nu
// varning: vissa raser har "random stat" i datan.
