async function getSpells() {
  const response = await fetch('https://www.dnd5eapi.co/api/spells/', {
    method: 'GET',
  });

  const movies = await response.json();

  for (let movie of movies.results) {
    const response = await fetch(
      'https://www.dnd5eapi.co/api/spells/' + movie.index + '/',
      {
        method: 'GET',
      }
    );

    const spell = await response.json();

    let spellconcentration = '';
    if (spell.concentration) {
      spellconcentration = ', concentration';
    }

    let classList = [];
    for (let classs of spell.classes) {
      classList.push(classs.name);
    }
    let subclassList = [];
    for (let subclass of spell.subclasses) {
      subclassList.push(subclass.name);
    }
    console.log(spell);
    // ingen damage, character level, spell level
    let spelldamage = spell.damage.damage_at_slot_level[spell.level];

    let spellToAdd = {
      namn: spell.name,
      level: spell.level,
      castingTime: spell.casting_time,
      rangeArea: spell.range,
      attackSave: spell.attack_type,
      school: spell.school.name,
      class: classList,
      subclass: subclassList,
      duration: spell.duration,
      concentration: spellconcentration,
      components: spell.components,
      materials: spell.material,
      ritual: spell.ritual,
      damage: spelldamage,
      Effect: spell.damage.damage_type.name,
      description: spell.desc[0],
      attHigherLevels: spell.desc[0],
    };
  }
}
const spells = [];

getSpells();
