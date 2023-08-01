import { races } from "../data/races.js";
import { classes } from "../data/classes.js";

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
    console.log(abilityLower);
    $(`#proficiency_saving_throws_${abilityLower}`).prop("checked", false);
    $(`#proficiency_saving_throws_${abilityLower}`).trigger("change");
  });

  // lägg till de nya
  classs.savingThrows.forEach(function (ability) {
    const abilityLower = ability.toLowerCase();
    console.log(abilityLower);
    $(`#proficiency_saving_throws_${abilityLower}`).prop("checked", true);
    $(`#proficiency_saving_throws_${abilityLower}`).trigger("change");
  });
  // kom ihåg vilken som var vald ifall man byter
  previousSelectedClass = classs.name;
});
