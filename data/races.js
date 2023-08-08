export const races = [
  {
    name: "Dragonborn",
    speed: 30,
    subclasses: [
      {
        name: "Dragonborn",
        darkvision: 0,
        stats: {
          str: 2,
          cha: 1,
        },
      },
      {
        name: "Draconblood",
        darkvision: 60,
        stats: {
          int: 2,
          cha: 1,
        },
      },
      {
        name: "Ravenite",
        darkvision: 60,
        stats: {
          str: 2,
          con: 1,
        },
      },
      {
        name: "Chromatic",
        darkvision: 0,
        stats: {
          one: 2,
          one: 1,
        },
      },
      {
        name: "Metallic",
        darkvision: 0,
        stats: {
          one: 2,
          one: 1,
        },
      },
      {
        name: "Gem",
        darkvision: 0,
        stats: {
          one: 2,
          one: 1,
        },
      },
    ],
  },
  {
    name: "Dwarf",
    speed: 25,
    subclasses: [
      {
        name: "Hill Dwarf",
        stats: {
          con: 2,
          wis: 1,
        },
        darkvision: 60,
      },
      {
        name: "Mountain Dwarf",
        stats: {
          str: 2,
          con: 2,
        },
        darkvision: 60,
      },
      {
        name: "Duergar (Gray Dwarf)",
        stats: {
          one: 1,
          one: 2,
        },
        speed: 30,
        darkvision: 120,
      },
    ],
  },
  {
    name: "Elf",
    speed: 30,
    proficiencies: ["Perception"],
    subclasses: [
      {
        name: "Dark Elf",
        stats: {
          cha: 1,
          dex: 2,
        },
        darkvision: 120,
      },
      {
        name: "Eladrin",
        stats: {
          one: 1,
          one: 2,
        },
        darkvision: 60,
      },
      {
        name: "High Elf",
        stats: {
          int: 1,
          dex: 2,
        },
        weaponProficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
        darkvision: 60,
      },
      {
        name: "Sea Elf",
        stats: {
          con: 1,
          dex: 2,
        },
        weaponProficiencies: ["spear", "trident", "light crossbow", "net"],
        darkvision: 60,
      },
      {
        name: "Shadar-Kai",
        stats: {
          con: 1,
          dex: 2,
        },
        darkvision: 60,
      },
      {
        name: "Wood Elf",
        speed: 35,
        stats: {
          wis: 1,
          dex: 2,
        },
        weaponProficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
        darkvision: 60,
      },
    ],
  },
  {
    name: "Gnome",
    speed: 25,
    subclasses: [
      {
        name: "Forest Gnome",
        stats: {
          dex: 1,
          int: 2,
        },
        darkvision: 60,
      },
      {
        name: "Rock Gnome",
        stats: {
          con: 1,
          int: 2,
        },
        darkvision: 60,
      },
      {
        name: "Svirfneblin (Deep Gnome)",
        stats: {
          dex: 1,
          int: 2,
        },
        darkvision: 120,
        speed: 30,
      },
    ],
  },
  {
    name: "Half-Elf",
    speed: 30,
    subclasses: [
      {
        name: "Half-Elf",
        stats: {
          cha: 2,
          one: 1,
          one: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Half-Orc",
    speed: 30,
    subclasses: [
      {
        name: "Half-Orc",
        stats: {
          str: 2,
          con: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Halfling",
    speed: 25,
    subclasses: [
      {
        name: "Lightfoot Halfling",
        stats: {
          cha: 1,
          dex: 2,
        },
        darkvision: 0,
      },
      {
        name: "Stout Halfling",
        stats: {
          con: 1,
          dex: 2,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Human",
    speed: 30,
    subclasses: [
      {
        name: "Human",
        stats: {
          str: 1,
          dex: 1,
          con: 1,
          int: 1,
          wis: 1,
          cha: 1,
        },
        darkvision: 0,
      },
      {
        name: "Variant Human",
        stats: {
          one: 1,
          one: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Tiefling",
    speed: 30,
    subclasses: [
      {
        name: "Bloodline of Asmodeus",
        stats: {
          int: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Bloodline of Baalzebul",
        stats: {
          int: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Bloodline of Dispater",
        stats: {
          dex: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Bloodline of Fierna",
        stats: {
          wis: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Bloodline of Glasya",
        stats: {
          dex: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Bloodline of Levistus",
        stats: {
          con: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Bloodline of Mammon",
        stats: {
          int: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Bloodline of Mephistopheles",
        stats: {
          int: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Bloodline of Zariel",
        stats: {
          str: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Variant Tiefling",
        stats: {
          int: 1,
          dex: 2,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Aarakocra",
    speed: 30,
    subclasses: [
      {
        name: "Aarakocra",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Aasimar",
    speed: 30,
    stats: {
      cha: 2,
    },
    subclasses: [
      {
        name: "Aasimar",
        stats: {
          one: 1,
          one: 2,
        },
        darkvision: 60,
      },
      {
        name: "Fallen Aasimar",
        stats: {
          str: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Protector Aasimar",
        stats: {
          wis: 1,
          cha: 2,
        },
        darkvision: 60,
      },
      {
        name: "Scourge Aasimar",
        stats: {
          con: 1,
          cha: 2,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Changeling",
    speed: 30,
    subclasses: [
      {
        name: "Changeling",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Fairy",
    speed: 30,
    subclasses: [
      {
        name: "Fairy",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Firbolg",
    speed: 30,
    subclasses: [
      {
        name: "Firbolg",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Genasi",
    speed: 30,
    subclasses: [
      {
        name: "Air",
        stats: {
          one: 1,
          one: 2,
        },
        darkvision: 60,
        speed: 35,
      },
      {
        name: "Earth",
        stats: {
          one: 1,
          one: 2,
        },
        darkvision: 60,
      },
      {
        name: "Fire",
        darkvision: 60,
        stats: {
          one: 1,
          one: 2,
        },
        darkvision: 60,
      },
      {
        name: "Water",
        stats: {
          one: 1,
          one: 2,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Githyanki",
    speed: 30,
    subclasses: [
      {
        name: "Githyanki",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Githzerai",
    speed: 30,
    subclasses: [
      {
        name: "Githzerai",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Goliath",
    speed: 30,
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
    speed: 30,
    subclasses: [
      {
        name: "Harengon",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 0,
      },
    ],
  },
  {
    name: "Kenku",
    speed: 30,
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
    speed: 30,
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
    speed: 30,
    subclasses: [
      {
        name: "Owlin",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 120,
      },
    ],
  },
  {
    name: "Satyr",
    speed: 35,
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
    speed: 30,
    subclasses: [
      {
        name: "Tabaxi",
        stats: {
          dex: 2,
          cha: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Tortle",
    speed: 30,
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
    speed: 30,
    subclasses: [
      {
        name: "Triton",
        stats: {
          str: 1,
          con: 1,
          cha: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Verdan",
    speed: 30,
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
    speed: 30,
    subclasses: [
      {
        name: "Bugbear",
        stats: {
          str: 2,
          dex: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Centaur",
    speed: 40,
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
    speed: 30,
    subclasses: [
      {
        name: "Goblin",
        stats: {
          dex: 2,
          con: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Grung",
    speed: 25,
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
    speed: 30,
    subclasses: [
      {
        name: "Hobgoblin",
        stats: {
          con: 2,
          int: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Kobold",
    speed: 30,
    subclasses: [
      {
        name: "Kobold",
        stats: {
          dex: 2,
          one: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Lizardfolk",
    speed: 30,
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
    speed: 30,
    subclasses: [
      {
        name: "Minotaur",
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
    speed: 30,
    subclasses: [
      {
        name: "Orc",
        stats: {
          str: 2,
          con: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Shifter",
    speed: 30,
    subclasses: [
      {
        name: "Shifter",
        stats: {
          one: 2,
          one: 1,
        },
        darkvision: 60,
      },
    ],
  },
  {
    name: "Yuan-Ti",
    speed: 30,
    subclasses: [
      {
        name: "Yuan-Ti",
        stats: {
          cha: 2,
          int: 1,
        },
        darkvision: 60,
      },
    ],
  },
];
