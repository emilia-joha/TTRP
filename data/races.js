var lastTwoStats = [];

function randStat(except) {
  const stat = rand(["str", "dex", "con", "int", "wis", "cha"].filter((x) => ![...lastTwoStats, except].includes(x)));
  lastTwoStats = [stat, lastTwoStats[0]];
  return stat;
}

function rand(items) {
  return items[Math.floor(Math.random() * items.length)] || "";
}

module.exports = [
  {
    name: "Dragonborn",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Dragonborn",
        stats: {
          str: 2,
          cha: 1,
        },
        darkvision: 0,
      },
      {
        name: "Draconblood Dragonborn",
        darkvision: 60,
        stats: {
          int: 2,
          cha: 1,
        },
        darkvision: 0,
      },
      {
        name: "Ravenite Dragonborn",
        darkvision: 60,
        stats: {
          str: 2,
          con: 1,
        },
        darkvision: 0,
      },
      {
        name: "Chromatic Dragonborn",
        stats: {
          [randStat()]: 2,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
      {
        name: "Metallic Dragonborn",
        stats: {
          [randStat()]: 2,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
      {
        name: "Gem Dragonborn",
        stats: {
          [randStat()]: 1,
          [randStat()]: 1,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Dwarf",
    darkvision: 60,
    speed: 25,
    size: "Medium",
    stats: {
      con: 2,
    },
    subclasses: [
      {
        name: "Hill Dwarf",
        stats: {
          wis: 1,
        },
        darkvision: 0,
      },
      {
        name: "Mountain Dwarf",
        stats: {
          str: 2,
        },
        darkvision: 0,
      },
      {
        name: "Duergar (Gray Dwarf)",
        stats: {
          str: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Elf",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    stats: {
      dex: 2,
    },
    proficiencies: ["Perception"],
    subclasses: [
      {
        name: "Dark Elf",
        stats: {
          cha: 1,
        },
        darkvision: 60,
      },
      {
        name: "Eladrin (MToF)",
        stats: {
          cha: 1,
        },
        darkvision: 0,
      },
      {
        name: "Eladrin (DMG)",
        stats: {
          int: 1,
        },
        darkvision: 0,
      },
      {
        name: "High Elf",
        stats: {
          int: 1,
        },
        weaponProficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
        darkvision: 0,
      },
      {
        name: "Sea Elf",
        stats: {
          con: 1,
        },
        weaponProficiencies: ["Spear", "Trident", "Light crossbow", "Net"],
        darkvision: 0,
      },
      {
        name: "Shadar-Kai",
        stats: {
          con: 1,
        },
        darkvision: 0,
      },
      {
        name: "Wood Elf",
        stats: {
          wis: 1,
        },
        weaponProficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
        darkvision: 0,
      },
      {
        name: "Pallid Elf",
        stats: {
          wis: 1,
        },
        darkvision: 0,
      },
      {
        name: "Mark of Shadow Elf",
        stats: {
          cha: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Gnome",
    darkvision: 60,
    speed: 25,
    size: "Small",
    stats: {
      int: 2,
    },
    subclasses: [
      {
        name: "Forest Gnome",
        stats: {
          dex: 1,
        },
        darkvision: 0,
      },
      {
        name: "Rock Gnome",
        stats: {
          con: 1,
        },
        darkvision: 0,
      },
      {
        name: "Svirfneblin (Deep Gnome)",
        stats: {
          dex: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Half-Elf",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Half-Elf",
        stats: {
          cha: 2,
          [randStat("cha")]: 1,
          [randStat("cha")]: 1,
        },
        darkvision: 0,
      },
      {
        name: "Half-Elf Variant",
        stats: {},
        darkvision: 0,
      },
    ],
  },
  {
    name: "Half-Orc",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Half-Orc",
        stats: {
          str: 2,
          con: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Halfling",
    darkvision: 0,
    speed: 25,
    size: "Small",
    stats: {
      dex: 2,
    },
    subclasses: [
      {
        name: "Lightfoot Halfling",
        stats: {
          cha: 1,
        },
        darkvision: 0,
      },
      {
        name: "Stout Halfling",
        stats: {
          con: 1,
        },
        darkvision: 0,
      },
      {
        name: "Ghostwise Halfling",
        stats: {
          wis: 1,
        },
        darkvision: 0,
      },
      {
        name: "Lotusden Halfling",
        stats: {
          wis: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Human",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Human",
        stats: {
          str: 1,
          dex: 1,
          con: 1,
        },
        darkvision: 0,
      },
      {
        name: "Variant Human",
        stats: {
          [randStat()]: 1,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Tiefling",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    stats: {
      cha: 2,
    },
    subclasses: [
      {
        name: "Bloodline of Asmodeus",
        stats: {
          int: 1,
        },
        darkvision: 0,
      },
      {
        name: "Bloodline of Baalzebul",
        stats: {
          int: 1,
        },
        darkvision: 0,
      },
      {
        name: "Bloodline of Dispater",
        stats: {
          dex: 1,
        },
        darkvision: 0,
      },
      {
        name: "Bloodline of Fierna",
        stats: {
          wis: 1,
        },
        darkvision: 0,
      },
      {
        name: "Bloodline of Glasya",
        stats: {
          dex: 1,
        },
        darkvision: 0,
      },
      {
        name: "Bloodline of Levistus",
        stats: {
          con: 1,
        },
        darkvision: 0,
      },
      {
        name: "Bloodline of Mammon",
        stats: {
          int: 1,
        },
        darkvision: 0,
      },
      {
        name: "Bloodline of Mephistopheles",
        stats: {
          int: 1,
        },
        darkvision: 0,
      },
      {
        name: "Bloodline of Zariel",
        stats: {
          str: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Aarakocra",
    darkvision: 0,
    speed: 25,
    size: "Medium",
    subclasses: [
      {
        name: "Aarakocra",
        stats: {
          dex: 2,
          wis: 1,
        },

        darkvision: 0,
      },
    ],
  },
  {
    name: "Aasimar",
    darkvision: 60,
    speed: 30,
    stats: {
      cha: 2,
    },
    size: "Medium",
    subclasses: [
      {
        name: "Protector Aasimar",
        stats: {
          wis: 1,
        },
        darkvision: 0,
      },
      {
        name: "Scourge Aasimar",
        stats: {
          cos: 1,
        },
        darkvision: 0,
      },
      {
        name: "Fallen Aasimar",
        stats: {
          str: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Changeling",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Changeling",
        stats: {
          cha: 2,
          [randStat("cha")]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Fairy",
    darkvision: 0,
    speed: 30,
    size: "Small",
    subclasses: [
      {
        name: "Fairy",
        stats: {
          [randStat()]: 2,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Firbolg",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Firbolg",
        stats: {
          wis: 2,
          str: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Genasi",
    speed: 30,
    darkvision: 0,
    size: "Medium",
    stats: {
      con: 2,
    },
    subclasses: [
      {
        name: "Air",
        stats: {
          dex: 1,
        },
        darkvision: 0,
      },
      {
        name: "Earth",
        stats: {
          str: 1,
        },
        darkvision: 0,
      },
      {
        name: "Fire",
        darkvision: 60,
        stats: {
          int: 1,
        },
        darkvision: 0,
      },
      {
        name: "Water",
        stats: {
          wis: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Githyanki",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Githyanki",
        stats: {
          [randStat()]: 2,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Githzerai",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Githzerai",
        stats: {
          [randStat()]: 2,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Goliath",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Goliath",
        stats: {
          str: 2,
          con: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Harengon",
    darkvision: 0,
    speed: 30,
    size: "Small or Medium",
    subclasses: [
      {
        name: "Harengon",
        stats: {
          [randStat()]: 2,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Kenku",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Kenku",
        stats: {
          dex: 2,
          wis: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Locathah",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Locathah",
        stats: {
          str: 2,
          dex: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Owlin",
    darkvision: 120,
    speed: 30,
    size: "Small or Medium",
    subclasses: [
      {
        name: "Owlin",
        stats: {
          [randStat()]: 2,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Satyr",
    darkvision: 0,
    speed: 35,
    size: "Medium",
    subclasses: [
      {
        name: "Satyr",
        stats: {
          cha: 2,
          dex: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Tabaxi",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Tabaxi",
        stats: {
          dex: 2,
          cha: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Tortle",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    proficiencies: ["Survival"],
    subclasses: [
      {
        name: "Tortle",
        stats: {
          str: 2,
          wis: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Triton",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Triton",
        stats: {
          str: 1,
          con: 1,
          cha: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Verdan",
    darkvision: 0,
    speed: 30,
    size: "Small to Medium",
    subclasses: [
      {
        name: "Verdan",
        stats: {
          cha: 2,
          con: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Bugbear",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Bugbear",
        stats: {
          str: 2,
          dex: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Centaur",
    darkvision: 0,
    speed: 40,
    size: "Medium",
    subclasses: [
      {
        name: "Centaur",
        stats: {
          str: 2,
          wis: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Goblin",
    darkvision: 60,
    speed: 30,
    size: "Small",
    subclasses: [
      {
        name: "Goblin",
        stats: {
          dex: 2,
          con: 1,
        },
        darkvision: 0,
      },
      {
        name: "Dankwood Goblin",
        stats: {
          dex: 2,
          wis: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Grung",
    darkvision: 0,
    speed: 25,
    size: "Small",
    subclasses: [
      {
        name: "Grung",
        stats: {
          dex: 2,
          con: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Hobgoblin",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Hobgoblin",
        stats: {
          con: 2,
          int: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Kobold",
    darkvision: 60,
    speed: 30,
    size: "Small",
    subclasses: [
      {
        name: "Kobold",
        stats: {
          dex: 2,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Lizardfolk",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Lizardfolk",
        stats: {
          con: 2,
          wis: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Minotaur",
    darkvision: 0,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Ravnica",
        stats: {
          str: 2,
          con: 1,
        },
        darkvision: 0,
      },
      {
        name: "Theros",
        stats: {
          str: 2,
          con: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Orc",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Orc",
        stats: {
          str: 2,
          con: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Shifter",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Shifter",
        stats: {
          [randStat()]: 2,
          [randStat()]: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Yuan-Ti",
    darkvision: 60,
    speed: 30,
    size: "Medium",
    subclasses: [
      {
        name: "Yuan-Ti",
        stats: {
          cha: 2,
          int: 1,
        },
        darkvision: 0,
      },
    ],
  },
];
