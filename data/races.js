export const races = [
  {
    name: "Dragonborn",
    subclasses: [
      {
        name: "Dragonborn",
        darkvision: 0,
        weaponProficiencies: "",
        proficiencies: [],
        speed: 30,
        stats: {
          strengh: 2,
          charisma: 1,
        },
      },
      {
        name: "Draconblood",
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
        stats: {
          intelligence: 2,
          charisma: 1,
        },
      },
      {
        name: "Ravenite",
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
        stats: {
          strengh: 2,
          constitution: 1,
        },
      },
      {
        name: "Chromatic",
        darkvision: 0,
        weaponProficiencies: "",
        proficiencies: [],
        speed: 30,
        stats: {
          two: 2,
          one: 1,
        },
      },
      {
        name: "Metallic",
        darkvision: 0,
        weaponProficiencies: "",
        proficiencies: [],
        speed: 30,
        stats: {
          two: 2,
          one: 1,
        },
      },
      {
        name: "Gem",
        darkvision: 0,
        weaponProficiencies: "",
        proficiencies: [],
        speed: 30,
        stats: {
          two: 2,
          one: 1,
        },
      },
    ],
  },
  {
    name: "Dwarf",
    subclasses: [
      {
        name: "Hill Dwarf",
        stats: {
          constitution: 2,
          wisdom: 1,
        },
        darkvision: 60,
        speed: 25,
        proficiencies: [],
        weaponProficiencies: [
          "Battleaxe",
          "Handaxe",
          "Light Hammer",
          "Warhammer",
        ],
      },
      {
        name: "Mountain Dwarf",
        stats: {
          strengh: 2,
          constitution: 2,
        },
        darkvision: 60,
        speed: 25,
        proficiencies: [],
        weaponProficiencies: [
          "Battleaxe",
          "Handaxe",
          "Light Hammer",
          "Warhammer",
        ],
      },
      {
        name: "Duergar (Gray Dwarf)",
        stats: {
          one: 1,
          two: 2,
        },
        speed: 30,
        darkvision: 120,
        proficiencies: [],
        weaponProficiencies: [
          "Battleaxe",
          "Handaxe",
          "Light Hammer",
          "Warhammer",
        ],
      },
    ],
  },
  {
    name: "Elf",
    subclasses: [
      {
        name: "Dark Elf",
        stats: {
          charisma: 1,
          dexterity: 2,
        },
        speed: 30,
        darkvision: 120,
        weaponProficiencies: ["Rapier", "Shortsword", "Hand Crossbow"],
        proficiencies: ["Perception"],
      },
      {
        name: "Eladrin",
        stats: {
          one: 1,
          two: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Perception"],
      },
      {
        name: "High Elf",
        stats: {
          intelligence: 1,
          dexterity: 2,
        },
        weaponProficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
        proficiencies: ["Perception"],
        darkvision: 60,
        speed: 30,
      },
      {
        name: "Sea Elf",
        stats: {
          constitution: 1,
          dexterity: 2,
        },
        weaponProficiencies: ["Spear", "Trident", "Light crossbow", "Net"],
        proficiencies: ["Perception"],
        darkvision: 60,
        speed: 30,
      },
      {
        name: "Shadar-Kai",
        stats: {
          constitution: 1,
          dexterity: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Perception"],
      },
      {
        name: "Wood Elf",
        speed: 35,
        stats: {
          wisdom: 1,
          dexterity: 2,
        },
        weaponProficiencies: ["Longsword", "Shortsword", "Shortbow", "Longbow"],
        proficiencies: ["Perception"],
        darkvision: 60,
      },
    ],
  },
  {
    name: "Gnome",
    subclasses: [
      {
        name: "Forest Gnome",
        stats: {
          dexterity: 1,
          intelligence: 2,
        },
        darkvision: 60,
        speed: 25,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Rock Gnome",
        stats: {
          constitution: 1,
          intelligence: 2,
        },
        darkvision: 60,
        speed: 25,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Svirfneblin (Deep Gnome)",
        stats: {
          dexterity: 1,
          intelligence: 2,
        },
        darkvision: 120,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Half-Elf",
    subclasses: [
      {
        name: "Half-Elf",
        stats: {
          charisma: 2,
          one: 1,
          two: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Half-Orc",
    subclasses: [
      {
        name: "Half-Orc",
        stats: {
          strengh: 2,
          constitution: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Intimidation"],
      },
    ],
  },
  {
    name: "Halfling",
    subclasses: [
      {
        name: "Lightfoot Halfling",
        stats: {
          charisma: 1,
          dexterity: 2,
        },
        darkvision: 0,
        speed: 25,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Stout Halfling",
        stats: {
          constitution: 1,
          dexterity: 2,
        },
        darkvision: 0,
        speed: 25,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Human",
    subclasses: [
      {
        name: "Human",
        stats: {
          strengh: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Variant Human",
        stats: {
          one: 1,
          two: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [["One skill of your choice"]],
      },
    ],
  },
  {
    name: "Tiefling",
    subclasses: [
      {
        name: "Bloodline of Asmodeus",
        stats: {
          intelligence: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Bloodline of Baalzebul",
        stats: {
          intelligence: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Bloodline of Dispater",
        stats: {
          dexterity: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Bloodline of Fierna",
        stats: {
          wisdom: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Bloodline of Glasya",
        stats: {
          dexterity: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Bloodline of Levistus",
        stats: {
          constitution: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Bloodline of Mammon",
        stats: {
          intelligence: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Bloodline of Mephistopheles",
        stats: {
          intelligence: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Bloodline of Zariel",
        stats: {
          strengh: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Variant Tiefling",
        stats: {
          intelligence: 1,
          dexterity: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Aarakocra",
    subclasses: [
      {
        name: "Aarakocra",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Aasimar",
    stats: {
      charisma: 2,
    },
    subclasses: [
      {
        name: "Aasimar",
        stats: {
          one: 1,
          two: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Fallen Aasimar",
        stats: {
          strengh: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Protector Aasimar",
        stats: {
          wisdom: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Scourge Aasimar",
        stats: {
          constitution: 1,
          charisma: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "charismangeling",
    subclasses: [
      {
        name: "charismangeling",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [
          [
            "Two skills of your choice: Deception, Insight, Intimidation, Performance, or Persuasion",
          ],
        ],
      },
    ],
  },
  {
    name: "Fairy",
    subclasses: [
      {
        name: "Fairy",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Firbolg",
    subclasses: [
      {
        name: "Firbolg",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Genasi",
    subclasses: [
      {
        name: "Air",
        stats: {
          one: 1,
          two: 2,
        },
        darkvision: 60,
        speed: 35,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Earth",
        stats: {
          one: 1,
          one: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
      {
        name: "Fire",
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
        stats: {
          one: 1,
          two: 2,
        },
      },
      {
        name: "Water",
        stats: {
          one: 1,
          two: 2,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Githyanki",
    subclasses: [
      {
        name: "Githyanki",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 0,
        speed: 30,
        proficiencies: [],
        weaponProficiencies: ["Shortsword", "Longsword", "Greatsword"],
      },
    ],
  },
  {
    name: "Githzerai",
    subclasses: [
      {
        name: "Githzerai",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Goliath",
    subclasses: [
      {
        name: "Goliath",
        stats: {
          strengh: 2,
          constitution: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Athletics"],
      },
    ],
  },
  {
    name: "Harengon",
    subclasses: [
      {
        name: "Harengon",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Perception"],
      },
    ],
  },
  {
    name: "Kenku",
    subclasses: [
      {
        name: "Kenku",
        stats: {
          dexterity: 2,
          wisdom: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [
          [
            "Two skills of your choice: Acrobatics, Deception, Stealth, and Sleight of Hand.",
          ],
        ],
      },
    ],
  },
  {
    name: "Locathah",
    subclasses: [
      {
        name: "Locathah",
        stats: {
          strengh: 2,
          dexterity: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Athletics", "Perception"],
      },
    ],
  },
  {
    name: "Owlin",
    subclasses: [
      {
        name: "Owlin",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 120,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Stealth"],
      },
    ],
  },
  {
    name: "Satyr",
    subclasses: [
      {
        name: "Satyr",
        stats: {
          charisma: 2,
          dexterity: 1,
        },
        darkvision: 0,
        speed: 35,
        weaponProficiencies: "",
        proficiencies: ["Performance", "Persuasion"],
      },
    ],
  },
  {
    name: "Tabaxi",
    subclasses: [
      {
        name: "Tabaxi",
        stats: {
          dexterity: 2,
          charisma: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Perception", "Stealth"],
      },
    ],
  },
  {
    name: "Tortle",
    subclasses: [
      {
        name: "Tortle",
        stats: {
          strengh: 2,
          wisdom: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Survival"],
      },
    ],
  },
  {
    name: "Triton",
    subclasses: [
      {
        name: "Triton",
        stats: {
          strengh: 1,
          constitution: 1,
          charisma: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Verdan",
    subclasses: [
      {
        name: "Verdan",
        stats: {
          charisma: 2,
          constitution: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Persuasion"],
      },
    ],
  },
  {
    name: "Bugbear",
    subclasses: [
      {
        name: "Bugbear",
        stats: {
          strengh: 2,
          dexterity: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: ["Stealth "],
      },
    ],
  },
  {
    name: "Centaur",
    subclasses: [
      {
        name: "Centaur",
        stats: {
          strengh: 2,
          wisdom: 1,
        },
        darkvision: 0,
        speed: 40,
        weaponProficiencies: "",
        proficiencies: [
          [
            "One skills of your choice: Animal Handling, Medicine, Nature, or Survival",
          ],
        ],
      },
    ],
  },
  {
    name: "Goblin",
    subclasses: [
      {
        name: "Goblin",
        stats: {
          dexterity: 2,
          constitution: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Grung",
    subclasses: [
      {
        name: "Grung",
        stats: {
          dexterity: 2,
          constitution: 1,
        },
        darkvision: 0,
        speed: 25,
        weaponProficiencies: "",
        proficiencies: ["Perception "],
      },
    ],
  },
  {
    name: "Hobgoblin",
    subclasses: [
      {
        name: "Hobgoblin",
        stats: {
          constitution: 2,
          intelligence: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Kobold",
    subclasses: [
      {
        name: "Kobold",
        stats: {
          dexterity: 2,
          one: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
  {
    name: "Lizardfolk",
    subclasses: [
      {
        name: "Lizardfolk",
        stats: {
          constitution: 2,
          wisdom: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [
          [
            "Two skills of your choice: Animal Handling, Nature, Perception, Stealth, and Survival",
          ],
        ],
      },
    ],
  },
  {
    name: "Minotaur",
    subclasses: [
      {
        name: "Minotaur",
        stats: {
          strengh: 2,
          constitution: 1,
        },
        darkvision: 0,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [
          ["One skills of your choice: Intimidation or Persuasion"],
        ],
      },
    ],
  },
  {
    name: "Orc",
    subclasses: [
      {
        name: "Orc",
        stats: {
          strengh: 2,
          constitution: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [
          [
            "Two skills of your choice: Animal Handling, Insight, Intimidation, Medicine, Nature, Perception, and Survival.",
          ],
        ],
      },
    ],
  },
  {
    name: "Shifter",
    subclasses: [
      {
        name: "Shifter",
        stats: {
          two: 2,
          one: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [
          [
            "One skills of your choice: Acrobatics, Athletics, Intimidation, or Survival.",
          ],
        ],
      },
    ],
  },
  {
    name: "Yuan-Ti",
    subclasses: [
      {
        name: "Yuan-Ti",
        stats: {
          charisma: 2,
          intelligence: 1,
        },
        darkvision: 60,
        speed: 30,
        weaponProficiencies: "",
        proficiencies: [],
      },
    ],
  },
];
