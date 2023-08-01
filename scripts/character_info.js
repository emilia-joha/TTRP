import { races } from "../data/races.js";
import { backgrounds } from "../data/backgrounds.js";
import { classes } from "../data/classes.js";

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

$("#class").on("change", function () {
  const selectedClass = $(this).val();

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
});
