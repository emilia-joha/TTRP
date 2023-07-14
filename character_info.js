import { races } from './data/races.js';
import { backgrounds } from './data/backgrounds.js';
import { classes } from './data/classes.js';

const racesHTML = races.map(function(race){
    return ` <option value="${race.name}">${race.name}</option>`;
});
const racesHTMLAsText = racesHTML.join('');
$("#race").html(racesHTMLAsText)


const backgroundHTML = backgrounds.map(function(background){
    return ` <option value="${background.name}">${background.name}</option>`;
});
const backgroundHTMLAsText = backgroundHTML.join('');
$("#background").html(backgroundHTMLAsText)


const classesHTML = classes.map(function(classs){
    return ` <option value="${classs.name}">${classs.name}</option>`;
});
const classesHTMLAsText = classesHTML.join('');
$("#class").html(classesHTMLAsText)


// beroende på vilken klass som väljs precenteras olika subclasser