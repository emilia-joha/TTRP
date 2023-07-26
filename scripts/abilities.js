import { backgrounds } from "../data/backgrounds.js";
import { skills } from "../data/skills.js";

const skillHTML = skills.map(function (skill) {
  return `
    <div class="skill">
        <label>
            <input id="${skill[3]}" class="expertise" type="checkbox"/>
            <input id="${skill[2]}" class="proficiency" type="checkbox"/>
            <p id="${skill[0]}" class="${skill[1]}"> </p>
            ${skill[0]} (${skill[1]})
        </label>
    </div>`;
});

const htmlAsText = skillHTML.join("");
$("#skills").html(htmlAsText);

$("#ability_strength").keyup(function () {
  const abilityStrength = $(this).val();
  const modifier = abilityCalc(abilityStrength);
  $("#ability_modifier_strength").text(modifier);
  $(".Str").text(modifier);
});

$("#ability_dexterity").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_dexterity").text(modifier);
  $(".Dex").text(modifier);
});

$("#ability_constitution").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_constitution").text(modifier);
  $(".Con").text(modifier);
});

$("#ability_intelligence").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_intelligence").text(modifier);
  $(".Int").text(modifier);
});

$("#ability_wisdom").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_wisdom").text(modifier);
  $(".Wis").text(modifier);
});

$("#ability_charisma").keyup(function () {
  const ability = $(this).val();
  const modifier = abilityCalc(ability);
  $("#ability_modifier_charisma").text(modifier);
  $(".Cha").text(modifier);
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

  // kom ihåg vilken som var vald ifall man byter
  previousSelectedBackground = background.name;
});

$(".proficiency").change(function () {
  let skillProf = 0;
  const profBonus = $("#proficiency_bonus").text();
  const skill = $(this).siblings("p").text();
  $(this).siblings("p").empty();
  if (this.checked) {
    skillProf = Number(skill) + Number(profBonus);
    console.log(skillProf);
    $(this).siblings("p").text(skillProf);
  } else {
    skillProf = Number(skill) - Number(profBonus);
    $(this).siblings("p").text(skillProf);
  }
});

function abilityCalc(ability) {
  return Math.floor((ability - 10) / 2);
}

function proficiency(lvl) {
  return Math.ceil(lvl / 4) + 1;
}

//Lägg till text on hover som förklarar expertice och proficiency check box
//https://www.w3schools.com/howto/howto_css_tooltip.asp
