// prettier-ignore
// dex = 0 str
// dex = 1 finesse (dex or str)
// dex = 2 dex
module.exports = [
  { name: 'Club',               damage: 'd4',       type: 'Simple',       dex: 0 },
  { name: 'Dagger',             damage: 'd4',       type: 'Simple',       dex: 1 },
  { name: '2H Greatclub',       damage: 'd8',       type: 'Simple',       dex: 0 },
  { name: 'Handaxe',            damage: 'd6',       type: 'Simple',       dex: 0 },
  { name: 'Javelin',            damage: 'd6',       type: 'Simple',       dex: 0 },
  { name: 'Light hammer',       damage: 'd4',       type: 'Simple',       dex: 0 },
  { name: 'Mace',               damage: 'd6',       type: 'Simple',       dex: 0 },
  { name: 'Quarterstaff',       damage: 'd6 (d8)',  type: 'Simple',       dex: 0 },
  { name: 'Sickle',             damage: 'd4',       type: 'Simple',       dex: 0 },
  { name: 'Spear',              damage: 'd6 (d8)',  type: 'Simple',       dex: 0 },
  
  { name: '2H Crossbow, light', damage: 'd8',       type: 'Simple range', dex: 2 },
  { name: 'Dart',               damage: 'd4',       type: 'Simple range', dex: 1 },
  { name: 'Shortbow',           damage: 'd6',       type: 'Simple range', dex: 2 },
  { name: 'Sling',              damage: 'd4',       type: 'Simple range', dex: 2 },

  { name: 'Battleaxe',      damage: 'd8 (d10)', type: 'Martial', dex: 0 },
  { name: 'Flail',          damage: 'd8',       type: 'Martial', dex: 0 },
  { name: '2H Glaive',      damage: 'd10',      type: 'Martial', dex: 0 },
  { name: '2H Greataxe',    damage: 'd12',      type: 'Martial', dex: 0 },
  { name: '2H Greatsword',  damage: '2d6',      type: 'Martial', dex: 0 },
  { name: '2H Halberd',     damage: 'd10',      type: 'Martial', dex: 0 },
  { name: 'Mounted Lance',  damage: 'd12',      type: 'Martial', dex: 0 },
  { name: 'Longsword',      damage: 'd8 (d10)', type: 'Martial', dex: 0 },
  { name: '2H Maul',        damage: '2d6',      type: 'Martial', dex: 0 },
  { name: 'Morningstar',    damage: 'd8',       type: 'Martial', dex: 0 },
  { name: '2H Pike',        damage: 'd10',      type: 'Martial', dex: 0 },
  { name: 'Rapier',         damage: 'd8',       type: 'Martial', dex: 1 },
  { name: 'Scimitar',       damage: 'd6',       type: 'Martial', dex: 1 },
  { name: 'Shortsword',     damage: 'd6',       type: 'Martial', dex: 1 },
  { name: 'Trident',        damage: 'd6 (d8)',  type: 'Martial', dex: 0 },
  { name: 'War pick',       damage: 'd8',       type: 'Martial', dex: 0 },
  { name: 'Warhammer',      damage: 'd8 (d10)', type: 'Martial', dex: 0 },
  { name: 'Whip',           damage: 'd4',       type: 'Martial', dex: 1 },

  { name: 'Blowgun',            damage: '1',    type: 'Martial range', dex: 2 },
  { name: 'Crossbow, hand',     damage: 'd6',   type: 'Martial range', dex: 2 },
  { name: '2H Crossbow, heavy', damage: 'd10',  type: 'Martial range', dex: 2 },
  { name: 'Longbow',            damage: 'd8',   type: 'Martial range', dex: 2 },
  { name: 'Net',                damage: '0',    type: 'Martial range', dex: 2 },
];
