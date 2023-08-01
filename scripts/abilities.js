import { backgrounds } from "../data/backgrounds.js";
import { skills } from "../data/skills.js";
import { races } from "../data/races.js";

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
});

$("#ability_dexterity").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_dexterity").text(modifier);
});

$("#ability_constitution").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_constitution").text(modifier);
});

$("#ability_intelligence").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_intelligence").text(modifier);
  passiveInvestigation();
});

$("#ability_wisdom").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_wisdom").text(modifier);
  recalculateAbilities();
  passivePerception();
  passiveInsight();
});

$("#ability_charisma").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_charisma").text(modifier);
});

$("#level").on("change", function () {
  const selectedlevel = $(this).val();
  const profBonus = proficiency(selectedlevel);
  $("#proficiency_bonus").text(profBonus);
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
      $(`#proficiency_skill_${profLower}`).trigger("change");
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
      $(`#proficiency_skill_${profLower}`).trigger("change");
    } else {
      alert(
        `Choose one of the following skill proficiencies: ${prof.join(", ")}`
      );
    }
  });
  // kom ihåg vilken som var vald ifall man byter
  previousSelectedBackground = background.name;
});

$(".proficiency, .expertise").change(function () {
  //  ändrar prof fel, varför?
  const profBonus = $("#proficiency_bonus").text();
  const skill = $(this).siblings("p").text();
  $(this).siblings("p").empty();
  const skillProf =
    Number(skill) + (this.checked ? Number(profBonus) : -Number(profBonus));
  console.log(skillProf);

  $(this).siblings("p").text(skillProf);

  passivePerception();
  passiveInsight();
  passiveInvestigation();
});

$("#race").change(function () {
  $("#darkvision").val("");
  const selectedRace = $(this).val();
  const race = races.find((x) => x.name == selectedRace);
  if (race.darkvision != 0) {
    $("#darkvision").val(`${race.darkvision} feet`);
  }
});

function recalculateAbilities() {
  // Sätt alla ability scores till rätt värden, baserade på stat, prof, expertise
  for (const skill of skills) {
    const [_, __, profId, expertId, skillId, statModifier] = skill;

    const profBonus = $("#proficiency_bonus").text();
    const isProficient = $(`#${profId}`).is(":checked");
    const isExpert = $(`#${expertId}`).is(":checked");
    const statValue = $(`#${statModifier}`).val();

    let calculatedAbility = statValue;
    if (isProficient) calculatedAbility += profBonus;
    if (isProficient && isExpert) calculatedAbility += profBonus;

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
