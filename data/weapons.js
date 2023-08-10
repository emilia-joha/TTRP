// prettier-ignore
// dex = 0 str
// dex = 1 finesse (dex or str)
// dex = 2 dex

//lägg till tyngd på vapnet light eller heavy
// lägg till range på vapnet
export const weapons = [
{ name: 'Club',                     damageDie: 'd4',       damageType:'Bludgeoning',    type: 'Simple',       dex: 0,  weight: "Light", property: ""   },
{ name: 'Dagger',                   damageDie: 'd4',       damageType:'Piercing',       type: 'Simple',       dex: 1,  weight: "Light", property: "Thrown (range 20/60)"  },
{ name: 'Greatclub',                damageDie: 'd8',       damageType:'Bludgeoning',    type: 'Simple',       dex: 0,  weight: ""     , property: "Two-handed"  },
{ name: 'Handaxe',                  damageDie: 'd6',       damageType:'Slashing',       type: 'Simple',       dex: 0,  weight: "Light", property: "Thrown (range 20/60)"  },
{ name: 'Javelin',                  damageDie: 'd6',       damageType:'Piercing',       type: 'Simple',       dex: 0,  weight: ""     , property: "Thrown (range 30/120)" },
{ name: 'Light Hammer',             damageDie: 'd4',       damageType:'Bludgeoning',    type: 'Simple',       dex: 0,  weight: "Light", property: "Thrown (range 20/60)"   },
{ name: 'Mace',                     damageDie: 'd6',       damageType:'Bludgeoning',    type: 'Simple',       dex: 0,  weight: ""     , property: ""   },
{ name: 'Quarterstaff',             damageDie: 'd6 (d8)',  damageType:'Bludgeoning',    type: 'Simple',       dex: 0,  weight: ""     , property: ""   },
{ name: 'Sickle',                   damageDie: 'd4',       damageType:'Slashing',       type: 'Simple',       dex: 0,  weight: "Light", property: ""   },
{ name: 'Spear',                    damageDie: 'd6 (d8)',  damageType:'Piercing',       type: 'Simple',       dex: 0,  weight: ""     , property: "Thrown (range 20/60)"   },
                
{ name: 'Light Crossbow',          damageDie: 'd8',       damageType:'Piercing',       type: 'Simple range', dex: 2,  weight: ""     , property: "Ammunition (range 80/320), Loading, Two-handed"   },
{ name: 'Dart',                     damageDie: 'd4',       damageType:'Piercing',       type: 'Simple range', dex: 1,  weight: ""     , property: "Thrown (range 20/60)"   },
{ name: 'Shortbow',                 damageDie: 'd6',       damageType:'Piercing',       type: 'Simple range', dex: 2,  weight: ""     , property: "Ammunition (range 80/320), Two-handed"   },
{ name: 'Sling',                    damageDie: 'd4',       damageType:'Bludgeoning',    type: 'Simple range', dex: 2,  weight: ""     , property: "Ammunition (range 30/120)"   },
          
{ name: 'Battleaxe',                damageDie: 'd8 (d10)', damageType:'Slashing',       type: 'Martial',      dex: 0,  weight: ""     , property: ""   },
{ name: 'Flail',                    damageDie: 'd8',       damageType:'Bludgeoning',    type: 'Martial',      dex: 0,  weight: ""     , property: ""   },
{ name: 'Glaive',                   damageDie: 'd10',      damageType:'Slashing',       type: 'Martial',      dex: 0,  weight: "Heavy", property: "Reach, Two-handed"   },
{ name: 'Greataxe',                 damageDie: 'd12',      damageType:'Slashing',       type: 'Martial',      dex: 0,  weight: "Heavy", property: "Two-handed"   },
{ name: 'Greatsword',               damageDie: '2d6',      damageType:'Slashing',       type: 'Martial',      dex: 0,  weight: "Heavy", property: "Two-handed"   },
{ name: 'Halberd',                  damageDie: 'd10',      damageType:'Slashing',       type: 'Martial',      dex: 0,  weight: "Heavy", property: "Reach, Two-handed"   },
{ name: 'Lance',                    damageDie: 'd12',      damageType:'Piercing',       type: 'Martial',      dex: 0,  weight: ""     , property: "Reach, Special"   },
{ name: 'Longsword',                damageDie: 'd8 (d10)', damageType:'Slashing',       type: 'Martial',      dex: 0,  weight: ""     , property: ""   },
{ name: 'Maul',                     damageDie: '2d6',      damageType:'Bludgeoning',    type: 'Martial',      dex: 0,  weight: "Heavy", property: "Two-handed"   },
{ name: 'Morningstar',              damageDie: 'd8',       damageType:'Piercing',       type: 'Martial',      dex: 0,  weight: ""     , property: ""   },
{ name: 'Pike',                     damageDie: 'd10',      damageType:'Piercing',       type: 'Martial',      dex: 0,  weight: "Heavy", property: "Reach, Two-handed"   },
{ name: 'Rapier',                   damageDie: 'd8',       damageType:'Piercing',       type: 'Martial',      dex: 1,  weight: ""     , property: ""   },
{ name: 'Scimitar',                 damageDie: 'd6',       damageType:'Slashing',       type: 'Martial',      dex: 1,  weight: "Light", property: ""   },
{ name: 'Shortsword',               damageDie: 'd6',       damageType:'Piercing',       type: 'Martial',      dex: 1,  weight: "Light", property: ""   },
{ name: 'Trident',                  damageDie: 'd6 (d8)',  damageType:'Piercing',       type: 'Martial',      dex: 0,  weight: ""     , property: "Thrown (range 20/60)"   },
{ name: 'War Pick',                 damageDie: 'd8',       damageType:'Piercing',       type: 'Martial',      dex: 0,  weight: ""     , property: ""   },
{ name: 'Warhammer',                damageDie: 'd8 (d10)', damageType:'Bludgeoning',    type: 'Martial',      dex: 0,  weight: ""     , property: ""   },
{ name: 'Whip',                     damageDie: 'd4',       damageType:'Slashing',       type: 'Martial',      dex: 1,  weight: ""     , property: "Reach"   },

{ name: 'Blowgun',                  damageDie: '1',        damageType:'Piercing',       type: 'Martial range', dex: 2, weight: ""     , property: "Ammunition (range 25/100), Loading"   },
{ name: 'Hand Crossbow',           damageDie: 'd6',       damageType:'Piercing',       type: 'Martial range', dex: 2, weight: "Light", property: "Ammunition (range 30/120), Loading"   },
{ name: 'Heavy Crossbow',          damageDie: 'd10',      damageType:'Piercing',       type: 'Martial range', dex: 2, weight: "Heavy", property: "Ammunition (range 100/400), Loading, Two-handed"   },
{ name: 'Longbow',                  damageDie: 'd8',       damageType:'Piercing',       type: 'Martial range', dex: 2, weight: "Heavy", property: "Ammunition (range 150/600), Two-handed"   },
{ name: 'Net',                      damageDie: '0',        damageType:'-',              type: 'Martial range', dex: 2, weight: ""     , property: "Special, Thrown (range 5/15)"   },
];
