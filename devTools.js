
function unApplySkillModifiers (brute, skill){
    const updatedBrute = { ...brute };
    // Vitality modifier
    if (skill === 'vitality') {
        updatedBrute.enduranceModifier /= 1.5;
        updatedBrute.enduranceStat -= 3;
    }
    // Immortality modifier
    if (skill === 'immortality') {
        updatedBrute.enduranceModifier /= 3.5;
        updatedBrute.strengthModifier /= 0.75;
        updatedBrute.agilityModifier /= 0.75;
        updatedBrute.speedModifier /= 0.75;
    }
    // Herculean strength modifier
    if (skill === 'herculeanStrength') {
        updatedBrute.strengthModifier /= 1.5;
        updatedBrute.strengthStat -= 3;
    }
    // Feline agility modifier
    if (skill === 'felineAgility') {
        updatedBrute.agilityModifier /= 1.5;
        updatedBrute.agilityStat -= 3;
    }
    // Lightning bolt modifier
    if (skill === 'lightningBolt') {
        updatedBrute.speedModifier /= 1.5;
        updatedBrute.speedStat -= 3;
    }
    // Reconnaissance modifier
    if (skill === 'reconnaissance') {
        updatedBrute.speedModifier /= 2.5;
        updatedBrute.speedStat -= 5;
    }
    // Armor modifier
    if (skill === 'armor') {
        updatedBrute.speedModifier /= 0.9;
    };
    return refreshStats(updatedBrute);
};



function refreshStats (brute){
    const updatedBrute = { ...brute };


    // Final stat values
    updatedBrute.enduranceValue = Math.floor(updatedBrute.enduranceStat * updatedBrute.enduranceModifier);
    updatedBrute.strengthValue = Math.floor(updatedBrute.strengthStat * updatedBrute.strengthModifier);
    updatedBrute.agilityValue = Math.floor(updatedBrute.agilityStat * updatedBrute.agilityModifier);
    updatedBrute.speedValue = Math.floor(updatedBrute.speedStat * updatedBrute.speedModifier);
    // Final HP
    updatedBrute.hp = (0, getHP)(updatedBrute.level, updatedBrute.enduranceValue);
    return updatedBrute;
};

var applySkillModifiers = (brute, skill) => {
    var updatedBrute = { ...brute };
    Object.entries(SkillModifiers[skill]).forEach(([unsafeStat, modifier]) => {
        var stat = unsafeStat;
        // Ignore every stat but endurance, strength, agility, and speed
        if (stat !== FightStat.ENDURANCE
            && stat !== FightStat.STRENGTH
            && stat !== FightStat.AGILITY
            && stat !== FightStat.SPEED) {
            return;
        }
        // Flat modifier
        if (modifier.flat) {
            updatedBrute[`${stat}Stat`] += modifier.flat;
        }
        // Percent modifier
        if (modifier.percent) {
            updatedBrute[`${stat}Modifier`] *= 1 + modifier.percent;
        }
    });
    return updatedBrute;
};

var WeaponName = /*exports.*//*$Enums.*/WeaponName = {
  fan: 'fan',
  keyboard: 'keyboard',
  knife: 'knife',
  leek: 'leek',
  mug: 'mug',
  sai: 'sai',
  racquet: 'racquet',
  axe: 'axe',
  bumps: 'bumps',
  flail: 'flail',
  fryingPan: 'fryingPan',
  hatchet: 'hatchet',
  mammothBone: 'mammothBone',
  morningStar: 'morningStar',
  trombone: 'trombone',
  baton: 'baton',
  halbard: 'halbard',
  lance: 'lance',
  trident: 'trident',
  whip: 'whip',
  noodleBowl: 'noodleBowl',
  piopio: 'piopio',
  shuriken: 'shuriken',
  broadsword: 'broadsword',
  scimitar: 'scimitar',
  sword: 'sword'
};

var WeaponId;
(function (WeaponId) {
    WeaponId[WeaponId["fan"] = 0] = "fan";
    WeaponId[WeaponId["keyboard"] = 1] = "keyboard";
    WeaponId[WeaponId["knife"] = 2] = "knife";
    WeaponId[WeaponId["leek"] = 3] = "leek";
    WeaponId[WeaponId["mug"] = 4] = "mug";
    WeaponId[WeaponId["sai"] = 5] = "sai";
    WeaponId[WeaponId["racquet"] = 6] = "racquet";
    WeaponId[WeaponId["axe"] = 7] = "axe";
    WeaponId[WeaponId["bumps"] = 8] = "bumps";
    WeaponId[WeaponId["flail"] = 9] = "flail";
    WeaponId[WeaponId["fryingPan"] = 10] = "fryingPan";
    WeaponId[WeaponId["hatchet"] = 11] = "hatchet";
    WeaponId[WeaponId["mammothBone"] = 12] = "mammothBone";
    WeaponId[WeaponId["morningStar"] = 13] = "morningStar";
    WeaponId[WeaponId["trombone"] = 14] = "trombone";
    WeaponId[WeaponId["baton"] = 15] = "baton";
    WeaponId[WeaponId["halbard"] = 16] = "halbard";
    WeaponId[WeaponId["lance"] = 17] = "lance";
    WeaponId[WeaponId["trident"] = 18] = "trident";
    WeaponId[WeaponId["whip"] = 19] = "whip";
    WeaponId[WeaponId["noodleBowl"] = 20] = "noodleBowl";
    WeaponId[WeaponId["piopio"] = 21] = "piopio";
    WeaponId[WeaponId["shuriken"] = 22] = "shuriken";
    WeaponId[WeaponId["broadsword"] = 23] = "broadsword";
    WeaponId[WeaponId["scimitar"] = 24] = "scimitar";
    WeaponId[WeaponId["sword"] = 25] = "sword";
})(WeaponId || (/*exports.*/WeaponId = WeaponId = {}));
var WeaponByName = {
    [WeaponName.fan]: WeaponId.fan,
    [WeaponName.keyboard]: WeaponId.keyboard,
    [WeaponName.knife]: WeaponId.knife,
    [WeaponName.leek]: WeaponId.leek,
    [WeaponName.mug]: WeaponId.mug,
    [WeaponName.sai]: WeaponId.sai,
    [WeaponName.racquet]: WeaponId.racquet,
    [WeaponName.axe]: WeaponId.axe,
    [WeaponName.bumps]: WeaponId.bumps,
    [WeaponName.flail]: WeaponId.flail,
    [WeaponName.fryingPan]: WeaponId.fryingPan,
    [WeaponName.hatchet]: WeaponId.hatchet,
    [WeaponName.mammothBone]: WeaponId.mammothBone,
    [WeaponName.morningStar]: WeaponId.morningStar,
    [WeaponName.trombone]: WeaponId.trombone,
    [WeaponName.baton]: WeaponId.baton,
    [WeaponName.halbard]: WeaponId.halbard,
    [WeaponName.lance]: WeaponId.lance,
    [WeaponName.trident]: WeaponId.trident,
    [WeaponName.whip]: WeaponId.whip,
    [WeaponName.noodleBowl]: WeaponId.noodleBowl,
    [WeaponName.piopio]: WeaponId.piopio,
    [WeaponName.shuriken]: WeaponId.shuriken,
    [WeaponName.broadsword]: WeaponId.broadsword,
    [WeaponName.scimitar]: WeaponId.scimitar,
    [WeaponName.sword]: WeaponId.sword,
};
var WeaponById = {
    [WeaponId.fan]: WeaponName.fan,
    [WeaponId.keyboard]: WeaponName.keyboard,
    [WeaponId.knife]: WeaponName.knife,
    [WeaponId.leek]: WeaponName.leek,
    [WeaponId.mug]: WeaponName.mug,
    [WeaponId.sai]: WeaponName.sai,
    [WeaponId.racquet]: WeaponName.racquet,
    [WeaponId.axe]: WeaponName.axe,
    [WeaponId.bumps]: WeaponName.bumps,
    [WeaponId.flail]: WeaponName.flail,
    [WeaponId.fryingPan]: WeaponName.fryingPan,
    [WeaponId.hatchet]: WeaponName.hatchet,
    [WeaponId.mammothBone]: WeaponName.mammothBone,
    [WeaponId.morningStar]: WeaponName.morningStar,
    [WeaponId.trombone]: WeaponName.trombone,
    [WeaponId.baton]: WeaponName.baton,
    [WeaponId.halbard]: WeaponName.halbard,
    [WeaponId.lance]: WeaponName.lance,
    [WeaponId.trident]: WeaponName.trident,
    [WeaponId.whip]: WeaponName.whip,
    [WeaponId.noodleBowl]: WeaponName.noodleBowl,
    [WeaponId.piopio]: WeaponName.piopio,
    [WeaponId.shuriken]: WeaponName.shuriken,
    [WeaponId.broadsword]: WeaponName.broadsword,
    [WeaponId.scimitar]: WeaponName.scimitar,
    [WeaponId.sword]: WeaponName.sword,
};
var WeaponTypes = ['fast', 'sharp', 'heavy', 'long', 'thrown', 'blunt'];
var WeaponType = {
    FAST: 'fast',
    SHARP: 'sharp',
    HEAVY: 'heavy',
    LONG: 'long',
    THROWN: 'thrown',
    BLUNT: 'blunt',
};
var WeaponTypeColor = {
    fast: '#8686ff',
    sharp: 'red',
    heavy: 'brown',
    long: 'green',
    thrown: 'purple',
    blunt: 'orange',
};
var WeaponAnimations = ['fist', 'slash', 'estoc', 'whip'];
var limitedWeapons = [
    'knife', 'broadsword', 'lance', 'baton', 'trident', 'hatchet',
    'scimitar', 'axe', 'sword', 'fan', 'shuriken', 'bumps',
    'morningStar', 'mammothBone', 'flail', 'whip',
];
var MAX_LIMITED_WEAPONS = limitedWeapons.length - 3;
var weapons = [
    {
        name: 'axe',
        odds: 3,
        types: ['heavy', 'blunt'],
        tempo: 2.3,
        reversal: -0.2,
        evasion: -0.4,
        dexterity: -0.8,
        block: -0.5,
        accuracy: 0.5,
        disarm: 0.1,
        combo: -0.4,
        deflect: 0,
        damage: 55,
        toss: 5,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'baton',
        odds: 70,
        types: ['long'],
        tempo: 1,
        reversal: 0.3,
        evasion: 0.05,
        dexterity: 0,
        block: 0.25,
        accuracy: 0,
        disarm: 0.25,
        combo: 0.1,
        deflect: 0,
        damage: 6,
        toss: 3,
        reach: 3,
        animation: 'estoc',
    },
    {
        name: 'broadsword',
        odds: 100,
        types: ['sharp'],
        tempo: 1.2,
        reversal: 0.1,
        evasion: 0,
        dexterity: 0,
        block: 0.15,
        accuracy: 0,
        disarm: 0.15,
        combo: 0,
        deflect: 0,
        damage: 10,
        toss: 5,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'bumps',
        odds: 50,
        types: ['heavy', 'blunt'],
        tempo: 2,
        reversal: -0.3,
        evasion: -0.3,
        dexterity: -0.65,
        block: -0.3,
        accuracy: 0.3,
        disarm: 0.1,
        combo: -0.6,
        deflect: 0,
        damage: 30,
        toss: 5,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'fan',
        odds: 2,
        types: ['fast'],
        tempo: 0.28,
        reversal: 0.5,
        evasion: 0.6,
        dexterity: 0.5,
        block: -0.5,
        accuracy: 0,
        disarm: -0.5,
        combo: 0.45,
        deflect: 0.25,
        damage: 4,
        toss: 5,
        reach: 0,
        animation: 'slash',
    },
    {
        name: 'flail',
        odds: 4,
        types: ['heavy', 'blunt'],
        tempo: 2.2,
        reversal: 0,
        evasion: -0.3,
        dexterity: -1.6,
        block: -0.5,
        accuracy: 1.5,
        disarm: -0.2,
        combo: 0.3,
        deflect: 0,
        damage: 36,
        toss: 5,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'fryingPan',
        odds: 0.4,
        types: ['heavy', 'blunt'],
        tempo: 1.2,
        reversal: 0,
        evasion: 0,
        dexterity: 0,
        block: 0.4,
        accuracy: 0,
        disarm: 0,
        combo: -0.4,
        deflect: 0.4,
        damage: 17,
        toss: 2,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'halbard',
        odds: 2,
        types: ['long', 'sharp'],
        tempo: 1.8,
        reversal: 0,
        evasion: 0,
        dexterity: -0.4,
        block: 0,
        accuracy: 0,
        disarm: 0.1,
        combo: 0.1,
        deflect: 0,
        damage: 24,
        toss: 2,
        reach: 4,
        animation: 'slash',
    },
    {
        name: 'hatchet',
        odds: 40,
        types: ['heavy', 'sharp'],
        tempo: 1.5,
        reversal: 0,
        evasion: 0,
        dexterity: 0,
        block: -0.1,
        accuracy: 0,
        disarm: 0,
        combo: 0,
        deflect: 0,
        damage: 17,
        toss: 3,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'keyboard',
        odds: 0.4,
        types: ['fast', 'blunt'],
        tempo: 1,
        reversal: 0,
        evasion: 0.1,
        dexterity: 0.2,
        block: 0,
        accuracy: 0,
        disarm: 0,
        combo: 0.5,
        deflect: 0.3,
        damage: 7,
        toss: 2,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'knife',
        odds: 80,
        types: ['fast', 'sharp'],
        tempo: 0.6,
        reversal: 0,
        evasion: 0.1,
        dexterity: 0.5,
        block: 0,
        accuracy: 0,
        disarm: 0,
        combo: 0.3,
        deflect: 0,
        damage: 7,
        toss: 5,
        reach: 0,
        animation: 'estoc',
    },
    {
        name: 'lance',
        odds: 40,
        types: ['long'],
        tempo: 1.2,
        reversal: -0.1,
        evasion: 0,
        dexterity: 0,
        block: 0,
        accuracy: 0,
        disarm: 0.1,
        combo: 0,
        deflect: 0,
        damage: 12,
        toss: 2,
        reach: 3,
        animation: 'estoc',
    },
    {
        name: 'leek',
        odds: 0.4,
        types: ['fast', 'blunt'],
        tempo: 1.1,
        reversal: 1,
        evasion: 0,
        dexterity: -1,
        block: -0.5,
        accuracy: 2,
        disarm: 0,
        combo: 2,
        deflect: 0,
        damage: 5,
        toss: 2,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'mammothBone',
        odds: 20,
        types: ['heavy', 'blunt'],
        tempo: 1.6,
        reversal: 0,
        evasion: 0,
        dexterity: -0.5,
        block: 0,
        accuracy: 0.5,
        disarm: 0.1,
        combo: -0.1,
        deflect: 0,
        damage: 14,
        toss: 5,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'morningStar',
        odds: 6,
        types: ['heavy', 'blunt'],
        tempo: 1.5,
        reversal: 0,
        evasion: -0.1,
        block: 0,
        accuracy: 0.3,
        dexterity: -0.35,
        disarm: 0.1,
        combo: 0,
        deflect: 0,
        damage: 20,
        toss: 5,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'mug',
        odds: 0.4,
        types: ['fast'],
        tempo: 0.9,
        reversal: 0,
        evasion: 0.15,
        dexterity: 0.3,
        block: -0.1,
        accuracy: 0,
        disarm: 0,
        combo: 0.4,
        deflect: 0,
        damage: 8,
        toss: 2,
        reach: 0,
        animation: 'estoc',
    },
    {
        name: 'noodleBowl',
        odds: 0.4,
        types: ['thrown'],
        tempo: 0.45,
        reversal: 0,
        evasion: 0.1,
        dexterity: 0,
        block: -0.1,
        accuracy: 0,
        disarm: 0,
        combo: 0.3,
        deflect: 0,
        damage: 10,
        toss: 2,
        reach: 0,
        animation: 'fist',
    },
    {
        name: 'piopio',
        odds: 0.4,
        types: ['thrown'],
        tempo: 0.32,
        reversal: 0,
        evasion: 0.5,
        dexterity: 0,
        block: -0.1,
        accuracy: 0,
        disarm: 0.5,
        combo: 0,
        deflect: 0,
        damage: 5,
        toss: 2,
        reach: 0,
        animation: 'fist',
    },
    {
        name: 'racquet',
        odds: 0.4,
        types: ['fast', 'blunt'],
        tempo: 0.8,
        reversal: 1,
        evasion: 0.1,
        dexterity: 0,
        block: 0.2,
        accuracy: 0,
        disarm: 0,
        combo: 0,
        deflect: 0.5,
        damage: 6,
        toss: 2,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'sai',
        odds: 6,
        types: ['fast'],
        tempo: 0.6,
        reversal: 0,
        evasion: 0.1,
        dexterity: 0.25,
        block: 0.3,
        accuracy: 0,
        disarm: 0.75,
        combo: 0.3,
        deflect: 0.25,
        damage: 8,
        toss: 5,
        reach: 0,
        animation: 'estoc',
    },
    {
        name: 'scimitar',
        odds: 6,
        types: ['sharp'],
        tempo: 0.8,
        reversal: 0,
        evasion: 0,
        dexterity: 0.2,
        block: 0.1,
        accuracy: 0,
        disarm: 0,
        combo: 0.15,
        deflect: 0,
        damage: 10,
        toss: 3,
        reach: 1,
        animation: 'slash',
    },
    {
        name: 'shuriken',
        odds: 8,
        types: ['thrown'],
        tempo: 0.12,
        reversal: 0,
        evasion: 0.15,
        dexterity: 0,
        block: -0.1,
        accuracy: 0,
        disarm: -0.5,
        combo: 0.3,
        deflect: 0,
        damage: 3,
        toss: 5,
        reach: 0,
        animation: 'fist',
    },
    {
        name: 'sword',
        odds: 4,
        types: ['sharp'],
        tempo: 1.8,
        reversal: 0,
        evasion: -0.2,
        dexterity: 0.1,
        block: 0,
        accuracy: -0.2,
        disarm: 0.1,
        combo: 0,
        deflect: 0,
        damage: 28,
        toss: 5,
        reach: 2,
        animation: 'slash',
    },
    {
        name: 'trident',
        odds: 10,
        types: ['long'],
        tempo: 1.4,
        reversal: 0.05,
        evasion: 0,
        dexterity: 0,
        block: 0,
        accuracy: 0,
        disarm: 0.2,
        combo: 0,
        deflect: 0,
        damage: 14,
        toss: 3,
        reach: 3,
        animation: 'estoc',
    },
    {
        name: 'trombone',
        odds: 0.4,
        types: ['heavy', 'blunt'],
        tempo: 2.5,
        reversal: 0,
        evasion: 0,
        dexterity: -0.3,
        block: 0.2,
        accuracy: 0.2,
        disarm: 0.5,
        combo: 0.3,
        deflect: 0,
        damage: 20,
        toss: 2,
        reach: 2,
        animation: 'slash',
    },
    {
        name: 'whip',
        odds: 3,
        types: ['long'],
        tempo: 1.5,
        reversal: -0.1,
        evasion: 0.3,
        dexterity: 0.5,
        block: -0.2,
        accuracy: -0.2,
        disarm: 0.3,
        combo: 0.35,
        deflect: 0,
        damage: 10,
        toss: 5,
        reach: 5,
        animation: 'whip',
    },
];
var WEAPONS_TOTAL_ODDS = weapons.reduce((acc, weapon) => acc + weapon.odds, 0);
var WEAPONS_SFX = {
    ...weapons.reduce((acc, weapon) => {
        acc[weapon.name] = [];
        // Special SFX for some weapons
        if (weapon.name === 'fryingPan') {
            acc[weapon.name] = ['fryingPan'];
            return acc;
        }
        if (weapon.name === 'lance') {
            acc[weapon.name] = ['lance1', 'lance2'];
            return acc;
        }
        if (weapon.name === 'piopio') {
            acc[weapon.name] = ['piopio'];
            return acc;
        }
        if (weapon.name === 'sword') {
            acc[weapon.name] = ['sword'];
            return acc;
        }
        if (weapon.name === 'trombone') {
            acc[weapon.name] = ['trombone1', 'trombone2'];
            return acc;
        }
        if (weapon.name === 'whip') {
            acc[weapon.name] = ['whip'];
            return acc;
        }
        // SFX depending on weapon type
        if (weapon.types.includes('sharp')) {
            acc[weapon.name].push('sharp1', 'sharp2', 'sharp3', 'sharp4', 'sharp5', 'sharp6', 'sharp7', 'sharp8');
        }
        else {
            acc[weapon.name].push('blunt1', 'blunt2', 'blunt3', 'blunt4', 'blunt5', 'blunt6', 'blunt7', 'blunt8');
        }
        return acc;
    }, {}),
};

if (typeof self.ExpectedError === 'undefined') {
  self.ExpectedError = class ExpectedError extends Error {
    constructor(message = '') {
      super(message);
    }
  };
}

var FightModifier = {
  noThrows: 'Mains collantes',
  focusOpponent: 'Concentration',
  alwaysUseSupers: 'Pouvoir illimité',
  drawEveryWeapon: 'Ravitaillement infini',
  doubleAgility: 'Gravité atténuée',
  randomSkill: 'Compétence opportune',
  randomWeapon: 'Arme opportune',
  bareHandsFirstHit: 'Combat honorable',
  startWithWeapon: 'Paré au combat'
};



var Gender = {
  male: 'male',
  female: 'female'
};

var getFinalStat = (brute, stat, modifiers) => {
    var multiplier = stat === 'agility' ? modifiers.includes(FightModifier.doubleAgility) ? 2 : 1 : 1;
    var randomSkill = (0, getTempSkill)(brute, modifiers);
    // No random skill, return normal stat
    if (!randomSkill) {
        return brute[`${stat}Value`] * multiplier;
    }
    // Apply skill modifiers
    var newBrute = (0, applySkillModifiers)(brute, randomSkill);
    // Return new stat
    return Math.floor(newBrute[`${stat}Stat`] * newBrute[`${stat}Modifier`]) * multiplier;
};
var getFinalStat = getFinalStat;
var getFinalHP = (brute, modifiers) => {
    var randomSkill = (0, getTempSkill)(brute, modifiers);
    // No random skill, return normal HP
    if (!randomSkill) {
        return (0, getHP)(brute.level, brute.enduranceValue);
    }
    // Apply skill modifiers
    var newBrute = (0, applySkillModifiers)(brute, randomSkill);
    // Return new HP
    return (0, getHP)(newBrute.level, Math.floor(newBrute.enduranceStat * newBrute.enduranceModifier));
};
var getFinalHP = getFinalHP;

var getHP = (level, endurance) => Math.floor(50
    + (Math.max(endurance, 0)
        + level * 0.25) * 6);
var getHP = getHP;
var readableHPFormula = (level, endurance) => `50 + (max(${endurance}, 0) + ${level} * 0.25) * 6`;
var readableHPFormula = readableHPFormula;

var InventoryItemType = /*exports.*//*$Enums.*/InventoryItemType = {
  visualReset: 'visualReset',
  bossTicket: 'bossTicket',
  nameChange: 'nameChange',
  favoriteFight: 'favoriteFight'
};

var LogType = /*exports.*//*$Enums.*/LogType = {
  win: 'win',
  lose: 'lose',
  child: 'child',
  childup: 'childup',
  up: 'up',
  lvl: 'lvl',
  ascend: 'ascend',
  tournament: 'tournament',
  tournamentXp: 'tournamentXp',
  bossDefeat: 'bossDefeat'
};

var pad = (n, width, z = '0') => {
    var nString = `${n}`;
    return nString.length >= width
        ? nString
        : new Array(width - nString.length + 1).join(z) + n.toString();
};

var readBodyString = (bodyString) => ({
    p1: parseInt(bodyString[0] || '0', 16),
    p1a: parseInt(bodyString[1] || '0', 16),
    p1b: parseInt(bodyString[2] || '0', 16),
    p2: parseInt(bodyString[3] || '0', 16),
    p3: parseInt(bodyString[4] || '0', 16),
    p4: parseInt(bodyString[5] || '0', 16),
    p5: parseInt(bodyString[6] || '0', 16),
    p6: parseInt(bodyString[7] || '0', 16),
    p7: parseInt(bodyString[8] || '0', 16),
    p7b: parseInt(bodyString[9] || '0', 16),
    p8: parseInt(bodyString[10] || '0', 16),
});
var readBodyString = readBodyString;
var generateBodyString = (body) => [
    body.p1.toString(16),
    body.p1a.toString(16),
    body.p1b.toString(16),
    body.p2.toString(16),
    body.p3.toString(16),
    body.p4.toString(16),
    body.p5.toString(16),
    body.p6.toString(16),
    body.p7.toString(16),
    body.p7b.toString(16),
    body.p8.toString(16),
].join('');
var generateBodyString = generateBodyString;
var getColor = (gender, part, color) => {
    var skinParts = ['col0', 'col0a', 'col0c'];
    var hairParts = ['col1', 'col1a', 'col1b', 'col1c', 'col1d'];
    var clothingParts = ['col2', 'col2a', 'col2b', 'col3', 'col3b', 'col4', 'col4a', 'col4b'];
    let colorArray = [];
    if (skinParts.includes(part))
        colorArray = colors[gender].skin;
    else if (hairParts.includes(part))
        colorArray = colors[gender].hair;
    else if (clothingParts.includes(part))
        colorArray = colors[gender].clothing;
    var normalColor = colorArray[color];
    if (normalColor)
        return normalColor;
    return colors.special[99 - color] || '#ffffff';
};
var getColor = getColor;
var readColorString = (gender, colorsString) => ({
    col0: (0, getColor)(gender, 'col0', +colorsString.slice(0, 2)),
    col0a: (0, getColor)(gender, 'col0a', +colorsString.slice(2, 4)),
    col0c: (0, getColor)(gender, 'col0c', +colorsString.slice(4, 6)),
    col1: (0, getColor)(gender, 'col1', +colorsString.slice(6, 8)),
    col1a: (0, getColor)(gender, 'col1a', +colorsString.slice(8, 10)),
    col1b: (0, getColor)(gender, 'col1b', +colorsString.slice(10, 12)),
    col1c: (0, getColor)(gender, 'col1c', +colorsString.slice(12, 14)),
    col1d: (0, getColor)(gender, 'col1d', +colorsString.slice(14, 16)),
    col2: (0, getColor)(gender, 'col2', +colorsString.slice(16, 18)),
    col2a: (0, getColor)(gender, 'col2a', +colorsString.slice(18, 20)),
    col2b: (0, getColor)(gender, 'col2b', +colorsString.slice(20, 22)),
    col3: (0, getColor)(gender, 'col3', +colorsString.slice(22, 24)),
    col3b: (0, getColor)(gender, 'col3b', +colorsString.slice(24, 26)),
    col4: (0, getColor)(gender, 'col4', +colorsString.slice(26, 28)),
    col4a: (0, getColor)(gender, 'col4a', +colorsString.slice(28, 30)),
    col4b: (0, getColor)(gender, 'col4b', +colorsString.slice(30, 32)),
});
var readColorString = readColorString;
var generateColorString = (colorObject) => [
    (0, pad)(colorObject.col0, 2),
    (0, pad)(colorObject.col0a, 2),
    (0, pad)(colorObject.col0c, 2),
    (0, pad)(colorObject.col1, 2),
    (0, pad)(colorObject.col1a, 2),
    (0, pad)(colorObject.col1b, 2),
    (0, pad)(colorObject.col1c, 2),
    (0, pad)(colorObject.col1d, 2),
    (0, pad)(colorObject.col2, 2),
    (0, pad)(colorObject.col2a, 2),
    (0, pad)(colorObject.col2b, 2),
    (0, pad)(colorObject.col3, 2),
    (0, pad)(colorObject.col3b, 2),
    (0, pad)(colorObject.col4, 2),
    (0, pad)(colorObject.col4a, 2),
    (0, pad)(colorObject.col4b, 2),
].join('');

var PetName = /*exports.*//*$Enums.*/PetName = {
  dog1: 'dog1',
  dog2: 'dog2',
  dog3: 'dog3',
  panther: 'panther',
  bear: 'bear'
};

var randomBetween = (min, max, generator) => {
    if (min > max)
        return 0;
    if (min === max)
        return min;
    var random = generator ? generator.next() : Math.random();
    return Math.floor(random * (max - min + 1) + min);
};

var randomItem = void 0;
var randomItem = (items) => {
    if (!items.length) {
        throw new Error('No items');
    }
    if (items.length === 1) {
        var item = items[0];
        if (!item) {
            throw new Error('No item');
        }
        return item;
    }
    var index = (0, randomBetween)(0, items.length - 1);
    var item = items[index];
    if (!item) {
        throw new Error('No item');
    }
    return item;
};
var randomItem = randomItem;

var SkillName = /*exports.*//*$Enums.*/SkillName = {
  herculeanStrength: 'herculeanStrength',
  felineAgility: 'felineAgility',
  lightningBolt: 'lightningBolt',
  vitality: 'vitality',
  immortality: 'immortality',
  reconnaissance: 'reconnaissance',
  weaponsMaster: 'weaponsMaster',
  martialArts: 'martialArts',
  sixthSense: 'sixthSense',
  hostility: 'hostility',
  fistsOfFury: 'fistsOfFury',
  shield: 'shield',
  armor: 'armor',
  toughenedSkin: 'toughenedSkin',
  untouchable: 'untouchable',
  sabotage: 'sabotage',
  shock: 'shock',
  bodybuilder: 'bodybuilder',
  relentless: 'relentless',
  survival: 'survival',
  leadSkeleton: 'leadSkeleton',
  balletShoes: 'balletShoes',
  determination: 'determination',
  firstStrike: 'firstStrike',
  resistant: 'resistant',
  counterAttack: 'counterAttack',
  ironHead: 'ironHead',
  thief: 'thief',
  fierceBrute: 'fierceBrute',
  tragicPotion: 'tragicPotion',
  net: 'net',
  bomb: 'bomb',
  hammer: 'hammer',
  cryOfTheDamned: 'cryOfTheDamned',
  hypnosis: 'hypnosis',
  flashFlood: 'flashFlood',
  tamer: 'tamer',
  regeneration: 'regeneration',
  chef: 'chef',
  spy: 'spy',
  saboteur: 'saboteur',
  backup: 'backup',
  hideaway: 'hideaway',
  monk: 'monk',
  vampirism: 'vampirism',
  chaining: 'chaining',
  haste: 'haste',
  treat: 'treat',
  repulse: 'repulse'
};

var weightedRandom = (items) => {
    var firstItem = items[0];
    if (!firstItem) {
        throw new Error('No items');
    }
    // Calculate total odds
    var totalOdds = items.reduce((acc, item) => acc + item.odds, 0);
    let i = 0;
    var weights = [];
    for (i = 0; i < items.length; i++) {
        weights[i] = ((items[i]?.odds || 0) / totalOdds) + (weights[i - 1] || 0);
    }
    var random = Math.random() * (weights[weights.length - 1] || 0);
    for (i = 0; i < weights.length; i++) {
        if ((weights[i] || 0) > random) {
            break;
        }
    }
    return items[i] || firstItem;
};

var pets = [
    {
        name: PetName.bear,
        odds: 1,
        enduranceMalus: 8,
        initiative: 3.6,
        strength: 40,
        agility: 2,
        speed: 1,
        hp: 110,
        counter: 0,
        combo: -0.2,
        block: -0.25,
        evasion: 0.1,
        accuracy: 0.2,
        disarm: 0.05,
        damage: 5,
    },
    {
        name: PetName.panther,
        odds: 1,
        enduranceMalus: 6,
        initiative: 0.6,
        strength: 23,
        agility: 16,
        speed: 24,
        hp: 26,
        counter: 0,
        combo: 0.7,
        block: 0,
        evasion: 0.2,
        accuracy: 0,
        disarm: 0,
        damage: 3,
    },
    {
        name: PetName.dog3,
        odds: 2,
        enduranceMalus: 2,
        initiative: 0.1,
        strength: 6,
        agility: 5,
        speed: 3,
        hp: 14,
        counter: 0,
        combo: 0.2,
        block: 0,
        evasion: 0,
        accuracy: 0,
        disarm: 0,
        damage: 3,
    },
    {
        name: PetName.dog2,
        odds: 8,
        enduranceMalus: 2,
        initiative: 0.1,
        strength: 6,
        agility: 5,
        speed: 3,
        hp: 14,
        counter: 0,
        combo: 0.2,
        block: 0,
        evasion: 0,
        accuracy: 0,
        disarm: 0,
        damage: 3,
    },
    {
        name: PetName.dog1,
        odds: 20,
        enduranceMalus: 2,
        initiative: 0.1,
        strength: 6,
        agility: 5,
        speed: 3,
        hp: 14,
        counter: 0,
        combo: 0.2,
        block: 0,
        evasion: 0,
        accuracy: 0,
        disarm: 0,
        damage: 3,
    },
];
var PETS_TOTAL_ODDS = pets.reduce((acc, pet) => acc + pet.odds, 0);
var scalingByPet = {
    [PetName.bear]: {
        strength: 0.4,
        agility: 0.1,
        speed: 0.1,
        hp: 0.4,
    },
    [PetName.panther]: {
        strength: 0.25,
        agility: 0.3,
        speed: 0.3,
        hp: 0.15,
    },
    [PetName.dog3]: {
        strength: 0.1,
        agility: 0.2,
        speed: 0.4,
        hp: 0.1,
    },
    [PetName.dog2]: {
        strength: 0.1,
        agility: 0.2,
        speed: 0.4,
        hp: 0.1,
    },
    [PetName.dog1]: {
        strength: 0.1,
        agility: 0.2,
        speed: 0.4,
        hp: 0.1,
    },
};
var petStatToBruteStat = {
    strength: 'strengthValue',
    agility: 'agilityValue',
    speed: 'speedValue',
    hp: 'hp',
};
var getPetStat = (brute, pet, stat) => {
    var base = pet[stat];
    var scaling = scalingByPet[pet.name][stat];
    var bruteStat = brute[petStatToBruteStat[stat]];
    return base + Math.ceil(scaling * bruteStat);
};
var getPetStat = getPetStat;

var SkillId;
(function (SkillId) {
    SkillId[SkillId["herculeanStrength"] = 0] = "herculeanStrength";
    SkillId[SkillId["felineAgility"] = 1] = "felineAgility";
    SkillId[SkillId["lightningBolt"] = 2] = "lightningBolt";
    SkillId[SkillId["vitality"] = 3] = "vitality";
    SkillId[SkillId["immortality"] = 4] = "immortality";
    SkillId[SkillId["reconnaissance"] = 5] = "reconnaissance";
    SkillId[SkillId["weaponsMaster"] = 6] = "weaponsMaster";
    SkillId[SkillId["martialArts"] = 7] = "martialArts";
    SkillId[SkillId["sixthSense"] = 8] = "sixthSense";
    SkillId[SkillId["hostility"] = 9] = "hostility";
    SkillId[SkillId["fistsOfFury"] = 10] = "fistsOfFury";
    SkillId[SkillId["shield"] = 11] = "shield";
    SkillId[SkillId["armor"] = 12] = "armor";
    SkillId[SkillId["toughenedSkin"] = 13] = "toughenedSkin";
    SkillId[SkillId["untouchable"] = 14] = "untouchable";
    SkillId[SkillId["sabotage"] = 15] = "sabotage";
    SkillId[SkillId["shock"] = 16] = "shock";
    SkillId[SkillId["bodybuilder"] = 17] = "bodybuilder";
    SkillId[SkillId["relentless"] = 18] = "relentless";
    SkillId[SkillId["survival"] = 19] = "survival";
    SkillId[SkillId["leadSkeleton"] = 20] = "leadSkeleton";
    SkillId[SkillId["balletShoes"] = 21] = "balletShoes";
    SkillId[SkillId["determination"] = 22] = "determination";
    SkillId[SkillId["firstStrike"] = 23] = "firstStrike";
    SkillId[SkillId["resistant"] = 24] = "resistant";
    SkillId[SkillId["counterAttack"] = 25] = "counterAttack";
    SkillId[SkillId["ironHead"] = 26] = "ironHead";
    SkillId[SkillId["thief"] = 27] = "thief";
    SkillId[SkillId["fierceBrute"] = 28] = "fierceBrute";
    SkillId[SkillId["tragicPotion"] = 29] = "tragicPotion";
    SkillId[SkillId["net"] = 30] = "net";
    SkillId[SkillId["bomb"] = 31] = "bomb";
    SkillId[SkillId["hammer"] = 32] = "hammer";
    SkillId[SkillId["cryOfTheDamned"] = 33] = "cryOfTheDamned";
    SkillId[SkillId["hypnosis"] = 34] = "hypnosis";
    SkillId[SkillId["flashFlood"] = 35] = "flashFlood";
    SkillId[SkillId["tamer"] = 36] = "tamer";
    SkillId[SkillId["regeneration"] = 37] = "regeneration";
    SkillId[SkillId["chef"] = 38] = "chef";
    SkillId[SkillId["spy"] = 39] = "spy";
    SkillId[SkillId["saboteur"] = 40] = "saboteur";
    SkillId[SkillId["backup"] = 41] = "backup";
    SkillId[SkillId["hideaway"] = 42] = "hideaway";
    SkillId[SkillId["monk"] = 43] = "monk";
    SkillId[SkillId["vampirism"] = 44] = "vampirism";
    SkillId[SkillId["chaining"] = 45] = "chaining";
    SkillId[SkillId["haste"] = 46] = "haste";
    SkillId[SkillId["treat"] = 47] = "treat";
    SkillId[SkillId["repulse"] = 48] = "repulse";
})(SkillId || (/*exports.*/SkillId = SkillId = {}));
var SkillByName = {
    [SkillName.herculeanStrength]: SkillId.herculeanStrength,
    [SkillName.felineAgility]: SkillId.felineAgility,
    [SkillName.lightningBolt]: SkillId.lightningBolt,
    [SkillName.vitality]: SkillId.vitality,
    [SkillName.immortality]: SkillId.immortality,
    [SkillName.reconnaissance]: SkillId.reconnaissance,
    [SkillName.weaponsMaster]: SkillId.weaponsMaster,
    [SkillName.martialArts]: SkillId.martialArts,
    [SkillName.sixthSense]: SkillId.sixthSense,
    [SkillName.hostility]: SkillId.hostility,
    [SkillName.fistsOfFury]: SkillId.fistsOfFury,
    [SkillName.shield]: SkillId.shield,
    [SkillName.armor]: SkillId.armor,
    [SkillName.toughenedSkin]: SkillId.toughenedSkin,
    [SkillName.untouchable]: SkillId.untouchable,
    [SkillName.sabotage]: SkillId.sabotage,
    [SkillName.shock]: SkillId.shock,
    [SkillName.bodybuilder]: SkillId.bodybuilder,
    [SkillName.relentless]: SkillId.relentless,
    [SkillName.survival]: SkillId.survival,
    [SkillName.leadSkeleton]: SkillId.leadSkeleton,
    [SkillName.balletShoes]: SkillId.balletShoes,
    [SkillName.determination]: SkillId.determination,
    [SkillName.firstStrike]: SkillId.firstStrike,
    [SkillName.resistant]: SkillId.resistant,
    [SkillName.counterAttack]: SkillId.counterAttack,
    [SkillName.ironHead]: SkillId.ironHead,
    [SkillName.thief]: SkillId.thief,
    [SkillName.fierceBrute]: SkillId.fierceBrute,
    [SkillName.tragicPotion]: SkillId.tragicPotion,
    [SkillName.net]: SkillId.net,
    [SkillName.bomb]: SkillId.bomb,
    [SkillName.hammer]: SkillId.hammer,
    [SkillName.cryOfTheDamned]: SkillId.cryOfTheDamned,
    [SkillName.hypnosis]: SkillId.hypnosis,
    [SkillName.flashFlood]: SkillId.flashFlood,
    [SkillName.tamer]: SkillId.tamer,
    [SkillName.regeneration]: SkillId.regeneration,
    [SkillName.chef]: SkillId.chef,
    [SkillName.spy]: SkillId.spy,
    [SkillName.saboteur]: SkillId.saboteur,
    [SkillName.backup]: SkillId.backup,
    [SkillName.hideaway]: SkillId.hideaway,
    [SkillName.monk]: SkillId.monk,
    [SkillName.vampirism]: SkillId.vampirism,
    [SkillName.chaining]: SkillId.chaining,
    [SkillName.haste]: SkillId.haste,
    [SkillName.treat]: SkillId.treat,
    [SkillName.repulse]: SkillId.repulse,
};
var SkillById = {
    [SkillId.herculeanStrength]: SkillName.herculeanStrength,
    [SkillId.felineAgility]: SkillName.felineAgility,
    [SkillId.lightningBolt]: SkillName.lightningBolt,
    [SkillId.vitality]: SkillName.vitality,
    [SkillId.immortality]: SkillName.immortality,
    [SkillId.reconnaissance]: SkillName.reconnaissance,
    [SkillId.weaponsMaster]: SkillName.weaponsMaster,
    [SkillId.martialArts]: SkillName.martialArts,
    [SkillId.sixthSense]: SkillName.sixthSense,
    [SkillId.hostility]: SkillName.hostility,
    [SkillId.fistsOfFury]: SkillName.fistsOfFury,
    [SkillId.shield]: SkillName.shield,
    [SkillId.armor]: SkillName.armor,
    [SkillId.toughenedSkin]: SkillName.toughenedSkin,
    [SkillId.untouchable]: SkillName.untouchable,
    [SkillId.sabotage]: SkillName.sabotage,
    [SkillId.shock]: SkillName.shock,
    [SkillId.bodybuilder]: SkillName.bodybuilder,
    [SkillId.relentless]: SkillName.relentless,
    [SkillId.survival]: SkillName.survival,
    [SkillId.leadSkeleton]: SkillName.leadSkeleton,
    [SkillId.balletShoes]: SkillName.balletShoes,
    [SkillId.determination]: SkillName.determination,
    [SkillId.firstStrike]: SkillName.firstStrike,
    [SkillId.resistant]: SkillName.resistant,
    [SkillId.counterAttack]: SkillName.counterAttack,
    [SkillId.ironHead]: SkillName.ironHead,
    [SkillId.thief]: SkillName.thief,
    [SkillId.fierceBrute]: SkillName.fierceBrute,
    [SkillId.tragicPotion]: SkillName.tragicPotion,
    [SkillId.net]: SkillName.net,
    [SkillId.bomb]: SkillName.bomb,
    [SkillId.hammer]: SkillName.hammer,
    [SkillId.cryOfTheDamned]: SkillName.cryOfTheDamned,
    [SkillId.hypnosis]: SkillName.hypnosis,
    [SkillId.flashFlood]: SkillName.flashFlood,
    [SkillId.tamer]: SkillName.tamer,
    [SkillId.regeneration]: SkillName.regeneration,
    [SkillId.chef]: SkillName.chef,
    [SkillId.spy]: SkillName.spy,
    [SkillId.saboteur]: SkillName.saboteur,
    [SkillId.backup]: SkillName.backup,
    [SkillId.hideaway]: SkillName.hideaway,
    [SkillId.monk]: SkillName.monk,
    [SkillId.vampirism]: SkillName.vampirism,
    [SkillId.chaining]: SkillName.chaining,
    [SkillId.haste]: SkillName.haste,
    [SkillId.treat]: SkillName.treat,
    [SkillId.repulse]: SkillName.repulse,
};
var FightStat = {
    REVERSAL: 'reversal',
    COUNTER: 'counter',
    EVASION: 'evasion',
    DEXTERITY: 'dexterity',
    BLOCK: 'block',
    ACCURACY: 'accuracy',
    DISARM: 'disarm',
    COMBO: 'combo',
    DEFLECT: 'deflect',
    ARMOR: 'armor',
    DAMAGE: 'damage',
    HIT_SPEED: 'hitSpeed',
    INITIATIVE: 'initiative',
    STRENGTH: 'strength',
    AGILITY: 'agility',
    SPEED: 'speed',
    ENDURANCE: 'endurance',
};
var skills = [
    {
        name: 'herculeanStrength',
        odds: 60,
        type: 'booster',
    },
    {
        name: 'felineAgility',
        odds: 60,
        type: 'booster',
    },
    {
        name: 'lightningBolt',
        odds: 60,
        type: 'booster',
    },
    {
        name: 'vitality',
        odds: 60,
        type: 'booster',
    },
    {
        name: 'immortality',
        odds: 0.14,
        type: 'booster',
    },
    {
        name: 'weaponsMaster',
        odds: 10,
        type: 'passive',
    },
    {
        name: 'martialArts',
        odds: 10,
        type: 'passive',
    },
    {
        name: 'sixthSense',
        odds: 20,
        type: 'passive',
    },
    {
        name: 'hostility',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'fistsOfFury',
        odds: 10,
        type: 'passive',
    },
    {
        name: 'shield',
        odds: 10,
        type: 'passive',
    },
    {
        name: 'armor',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'toughenedSkin',
        odds: 30,
        type: 'passive',
    },
    {
        name: 'untouchable',
        odds: 1,
        type: 'passive',
    },
    {
        name: 'sabotage',
        odds: 3,
        type: 'passive',
    },
    {
        name: 'shock',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'bodybuilder',
        odds: 5,
        type: 'passive',
    },
    {
        name: 'relentless',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'survival',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'leadSkeleton',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'balletShoes',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'determination',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'firstStrike',
        odds: 8,
        type: 'passive',
    },
    {
        name: 'resistant',
        odds: 3,
        type: 'passive',
    },
    {
        name: 'reconnaissance',
        odds: 1,
        type: 'booster',
    },
    {
        name: 'counterAttack',
        odds: 10,
        type: 'passive',
    },
    {
        name: 'ironHead',
        odds: 4,
        type: 'passive',
    },
    {
        name: 'thief',
        odds: 2.5,
        type: 'super',
        toss: 8,
        uses: 2,
    },
    {
        name: 'fierceBrute',
        odds: 20,
        type: 'super',
        toss: 5,
        uses: 1,
    },
    {
        name: 'tragicPotion',
        odds: 8,
        type: 'super',
        toss: 10,
        uses: 1,
    },
    {
        name: 'net',
        odds: 16,
        type: 'super',
        toss: 10,
        uses: 1,
    },
    {
        name: 'bomb',
        odds: 6,
        type: 'super',
        toss: 2,
        uses: 2,
    },
    {
        name: 'hammer',
        odds: 1,
        type: 'super',
        toss: 2,
        uses: 1,
    },
    {
        name: 'cryOfTheDamned',
        odds: 4,
        type: 'super',
        toss: 8,
        uses: 2,
    },
    {
        name: 'hypnosis',
        odds: 0.5,
        type: 'super',
        toss: 3,
        uses: 1,
    },
    {
        name: 'flashFlood',
        odds: 0.5,
        type: 'super',
        toss: 2,
        uses: 3,
    },
    {
        name: 'tamer',
        odds: 4,
        type: 'super',
        toss: 20,
        uses: 4,
    },
    {
        name: 'regeneration',
        odds: 3,
        type: 'talent',
    },
    {
        name: 'chef',
        odds: 1,
        type: 'talent',
    },
    {
        name: 'spy',
        odds: 3,
        type: 'talent',
    },
    {
        name: 'saboteur',
        odds: 3,
        type: 'talent',
    },
    {
        name: 'backup',
        odds: 5,
        type: 'talent',
    },
    {
        name: 'hideaway',
        odds: 5,
        type: 'talent',
    },
    {
        name: 'monk',
        odds: 5,
        type: 'talent',
    },
    {
        name: 'vampirism',
        odds: 10,
        type: 'super',
        uses: 1,
        toss: 5,
    },
    {
        name: 'chaining',
        odds: 5,
        type: 'passive',
    },
    {
        name: 'haste',
        odds: 5,
        type: 'super',
        uses: 1,
        toss: 3,
    },
    {
        name: 'treat',
        odds: 20,
        type: 'super',
        uses: 4,
        toss: 5,
    },
    {
        name: 'repulse',
        odds: 10,
        type: 'passive',
    },
];
var SKILLS_TOTAL_ODDS = skills.reduce((acc, skill) => acc + skill.odds, 0);
var SkillModifiers = {
    [SkillName.herculeanStrength]: {
        [FightStat.STRENGTH]: { flat: 3, percent: 0.5 },
    },
    [SkillName.felineAgility]: {
        [FightStat.AGILITY]: { flat: 3, percent: 0.5 },
    },
    [SkillName.lightningBolt]: {
        [FightStat.SPEED]: { flat: 3, percent: 0.5 },
    },
    [SkillName.vitality]: {
        [FightStat.ENDURANCE]: { flat: 3, percent: 0.5 },
    },
    [SkillName.immortality]: {
        [FightStat.ENDURANCE]: { percent: 2.5 },
        [FightStat.STRENGTH]: { percent: -0.25 },
        [FightStat.AGILITY]: { percent: -0.25 },
        [FightStat.SPEED]: { percent: -0.25 },
    },
    [SkillName.weaponsMaster]: {
        [FightStat.DAMAGE]: { percent: 0.5, weaponType: WeaponType.SHARP },
    },
    [SkillName.martialArts]: {
        [FightStat.DAMAGE]: { percent: 1, weaponType: null },
    },
    [SkillName.sixthSense]: {
        [FightStat.COUNTER]: { percent: 0.1 },
    },
    [SkillName.hostility]: {
        [FightStat.REVERSAL]: { percent: 0.3 },
    },
    [SkillName.fistsOfFury]: {
        [FightStat.COMBO]: { percent: 0.2 },
    },
    [SkillName.shield]: {
        [FightStat.BLOCK]: { percent: 0.45 },
        [FightStat.DAMAGE]: { percent: -0.25 },
    },
    [SkillName.armor]: {
        [FightStat.ARMOR]: { percent: 0.25 },
        [FightStat.SPEED]: { percent: -0.1 },
    },
    [SkillName.toughenedSkin]: {
        [FightStat.ARMOR]: { percent: 0.1 },
    },
    [SkillName.untouchable]: {
        [FightStat.EVASION]: { percent: 0.3 },
    },
    [SkillName.sabotage]: {},
    [SkillName.shock]: {
        [FightStat.DISARM]: { percent: 0.5 },
    },
    [SkillName.bodybuilder]: {
        [FightStat.HIT_SPEED]: { percent: 0.25, weaponType: WeaponType.HEAVY },
        [FightStat.DEXTERITY]: { percent: 0.1, weaponType: WeaponType.HEAVY },
    },
    [SkillName.relentless]: {
        [FightStat.ACCURACY]: { percent: 0.3 },
    },
    [SkillName.survival]: {},
    [SkillName.leadSkeleton]: {
        [FightStat.DAMAGE]: { percent: -0.3, weaponType: WeaponType.BLUNT, opponent: true },
    },
    [SkillName.balletShoes]: {
        [FightStat.EVASION]: { percent: 0.1 },
    },
    [SkillName.determination]: {},
    [SkillName.firstStrike]: {
        [FightStat.INITIATIVE]: { flat: 200 },
    },
    [SkillName.resistant]: {},
    [SkillName.reconnaissance]: {
        [FightStat.INITIATIVE]: { flat: -200 },
        [FightStat.SPEED]: { flat: 5, percent: 1.5 },
    },
    [SkillName.counterAttack]: {
        [FightStat.BLOCK]: { percent: 0.1 },
        [FightStat.REVERSAL]: { percent: 0.9, details: 'afterBlock' },
    },
    [SkillName.ironHead]: {},
    [SkillName.thief]: {},
    [SkillName.fierceBrute]: {},
    [SkillName.tragicPotion]: {},
    [SkillName.net]: {},
    [SkillName.bomb]: {},
    [SkillName.hammer]: {},
    [SkillName.cryOfTheDamned]: {},
    [SkillName.hypnosis]: {},
    [SkillName.flashFlood]: {},
    [SkillName.tamer]: {},
    [SkillName.regeneration]: {},
    [SkillName.chef]: {},
    [SkillName.spy]: {},
    [SkillName.saboteur]: {},
    [SkillName.backup]: {},
    [SkillName.hideaway]: {
        [FightStat.BLOCK]: { percent: 0.25, details: 'againstThrows' },
    },
    [SkillName.monk]: {
        [FightStat.COUNTER]: { percent: 0.4 },
        [FightStat.INITIATIVE]: { flat: -200 },
        [FightStat.HIT_SPEED]: { percent: -1 },
    },
    [SkillName.vampirism]: {},
    [SkillName.chaining]: {},
    [SkillName.haste]: {},
    [SkillName.treat]: {},
    [SkillName.repulse]: {
        [FightStat.DEFLECT]: { percent: 0.3 },
    },
};
var SkillDamageModifiers = Object.entries(SkillModifiers)
    .filter(([_, modifiers]) => modifiers[FightStat.DAMAGE])
    .map(([skill, modifiers]) => ({
    skill: skill,
    ...modifiers[FightStat.DAMAGE],
}));

var FIGHTS_PER_DAY = 6;
var ARENA_OPPONENTS_COUNT = 6;
var ARENA_OPPONENTS_MAX_GAP = 2;
var BRUTE_STARTING_POINTS = 11;
var PERKS_TOTAL_ODDS = WEAPONS_TOTAL_ODDS + PETS_TOTAL_ODDS + SKILLS_TOTAL_ODDS;
var NO_WEAPON_TOSS = 10;
var Animations = [
    'arrive', 'attack', 'block', 'death', 'drink', 'eat',
    'equip', 'evade', 'grab', 'grabbed', 'hit', 'hit-0', 'hit-1', 'hit-2',
    'idle', 'launch', 'monk', 'prepare-throw', 'run',
    'stolen', 'steal', 'strengthen', 'throw', 'train', 'train2', 'trapped',
    'trash', 'win', ...WeaponAnimations,
];
var BruteRankings = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
var GLOBAL_TOURNAMENT_START_HOUR = 6;
var PERK_ODDS = [
    { name: 'pet', odds: PETS_TOTAL_ODDS },
    { name: 'skill', odds: SKILLS_TOTAL_ODDS },
    { name: 'weapon', odds: WEAPONS_TOTAL_ODDS },
];
var NEW_BRUTE_BASE_COST = 500;
var FIGHTER_HEIGHT = {
    brute: 80,
    [PetName.bear]: 130,
    [PetName.panther]: 60,
    dog: 40,
};
var FIGHTER_WIDTH = {
    brute: 50,
    [PetName.bear]: 100,
    [PetName.panther]: 80,
    dog: 60,
};
var FIGHTER_HIT_ANCHOR = {
    brute: { x: 5, y: 40 },
    [PetName.bear]: { x: 60, y: 100 },
    [PetName.panther]: { x: 45, y: 45 },
    dog: { x: 30, y: 30 },
};
var MAX_FAVORITE_BRUTES = 30;
var BASE_FIGHTER_STATS = {
    reversal: 0,
    evasion: 0.1,
    dexterity: 0.2,
    block: -0.25,
    accuracy: 0,
    disarm: 0.05,
    combo: 0,
    deflect: 0,
    tempo: 1.2,
};
var BARE_HANDS_DAMAGE = 5;
var RESET_PRICE = 100;
var CLAN_SIZE_LIMIT = 50;
var BOSS_XP_REWARD = 500;
var BOSS_GOLD_REWARD = 500;
var BruteDeletionReason;
(function (BruteDeletionReason) {
    BruteDeletionReason["DUPLICATE_NAME"] = "DUPLICATE_NAME";
    BruteDeletionReason["INNAPROPRIATE_NAME"] = "INNAPROPRIATE_NAME";
    BruteDeletionReason["BANNED_USER"] = "BANNED_USER";
    BruteDeletionReason["EVENT_LOSS"] = "EVENT_LOSS";
})(BruteDeletionReason || (/*exports.*/BruteDeletionReason = BruteDeletionReason = {}));
var DailyModifierOdds = [
    { modifier: FightModifier.noThrows, odds: 1 },
    { modifier: FightModifier.focusOpponent, odds: 1 },
    { modifier: FightModifier.alwaysUseSupers, odds: 1 },
    { modifier: FightModifier.drawEveryWeapon, odds: 1 },
    { modifier: FightModifier.doubleAgility, odds: 1 },
    { modifier: FightModifier.randomSkill, odds: 1 },
    { modifier: FightModifier.randomWeapon, odds: 1 },
    { modifier: FightModifier.bareHandsFirstHit, odds: 1 },
    { modifier: FightModifier.startWithWeapon, odds: 1 },
];
var DailyModifierCountOdds = [
    { count: 1, odds: 50 },
    { count: 2, odds: 25 },
    { count: 3, odds: 15 },
    { count: 4, odds: 10 },
];
var DailyModifierSpawnChance = 4 / 30;
var BanReason;
(function (BanReason) {
    BanReason["INNAPROPRIATE_NAME"] = "innapropriateName";
    BanReason["INNAPROPRIATE_BRUTE_NAME"] = "innapropriateBruteName";
    BanReason["MULTIPLE_ACCOUNTS"] = "multipleAccounts";
})(BanReason || (/*exports.*/BanReason = BanReason = {}));
var FightLogTemplateCount = 48;
var ClanWarMaxParticipants = 7;
var ClanWarPointReward = 1000;
var EventPauseDuration = 3;
var EventFightsPerDay = 10;
var EventFreeResets = 3;
var DailyTournamentGoldReward = 100;
var DailyTournamentXpReward = 1;
var GlobalTournamentGoldReward = 150;
var GlobalTournamentXpReward = 1;

var BossName = /*exports.*//*$Enums.*/BossName = {
  GoldClaw: 'GoldClaw',
  EmberFang: 'EmberFang',
  Cerberus: 'Cerberus'
};

var availableBodyParts = {
    male: {
        p2: 7,
        p3: 11,
        p4: 5,
        p7: 6,
        p1: 1,
        p1a: 1,
        p1b: 1,
        p6: 1,
        p8: 4,
        p7b: 2,
        p5: 1,
    },
    female: {
        p2: 0,
        p3: 11,
        p4: 3,
        p7: 6,
        p1: 1,
        p1a: 1,
        p1b: 1,
        p6: 0,
        p8: 4,
        p7b: 2,
        p5: 1,
    },
};

var ILLEGAL_BODY
var checkBodyPart = (value, expected) => value >= 0 && value <= expected;
var checkBody = (user, gender, bodyString) => {
    // Convert every char from hex to number
    var inputs = {
        p1: parseInt(bodyString[0] || '0', 16),
        p1a: parseInt(bodyString[1] || '0', 16),
        p1b: parseInt(bodyString[2] || '0', 16),
        p2: parseInt(bodyString[3] || '0', 16),
        p3: parseInt(bodyString[4] || '0', 16),
        p4: parseInt(bodyString[5] || '0', 16),
        p5: parseInt(bodyString[6] || '0', 16),
        p6: parseInt(bodyString[7] || '0', 16),
        p7: parseInt(bodyString[8] || '0', 16),
        p7b: parseInt(bodyString[9] || '0', 16),
        p8: parseInt(bodyString[10] || '0', 16),
    };
    if (!checkBodyPart(inputs.p2, availableBodyParts[gender].p2)
        || !checkBodyPart(inputs.p3, availableBodyParts[gender].p3)
        || !checkBodyPart(inputs.p4, availableBodyParts[gender].p4)
        || !checkBodyPart(inputs.p7, availableBodyParts[gender].p7)
        || !checkBodyPart(inputs.p1, availableBodyParts[gender].p1)
        || !checkBodyPart(inputs.p1a, availableBodyParts[gender].p1a)
        || !checkBodyPart(inputs.p1b, availableBodyParts[gender].p1b)
        || !checkBodyPart(inputs.p6, availableBodyParts[gender].p6)
        || !checkBodyPart(inputs.p8, availableBodyParts[gender].p8)
        || !checkBodyPart(inputs.p7b, availableBodyParts[gender].p7b)
        || !checkBodyPart(inputs.p5, availableBodyParts[gender].p5)) {
        if(!ILLEGAL_BODY)alert("L'utilisateur Ambryal a été pris la main dans le sac a modifier des fringues !!!");
    }
};

var ILLEGAL_COLORS
var isValid = (value, array) => value >= 0 && value < array.length;
var isValidWithSpecials = (value, array) => value >= 0 && (value < array.length || (value < 100 && value > (99 - colors.special.length)));
var checkColors = (user, gender, colorString, includeSpecials = false) => {
    // Split colors every 2 characters
    var inputs = {
        col0: +colorString.slice(0, 2),
        col0a: +colorString.slice(2, 4),
        col0c: +colorString.slice(4, 6),
        col1: +colorString.slice(6, 8),
        col1a: +colorString.slice(8, 10),
        col1b: +colorString.slice(10, 12),
        col1c: +colorString.slice(12, 14),
        col1d: +colorString.slice(14, 16),
        col2: +colorString.slice(16, 18),
        col2a: +colorString.slice(18, 20),
        col2b: +colorString.slice(20, 22),
        col3: +colorString.slice(22, 24),
        col3b: +colorString.slice(24, 26),
        col4: +colorString.slice(26, 28),
        col4a: +colorString.slice(28, 30),
        col4b: +colorString.slice(30, 32),
    };
    var check = includeSpecials ? isValidWithSpecials : isValid;
    if (!check(inputs.col0, colors[gender].skin)
        || !check(inputs.col0a, colors[gender].skin)
        || !check(inputs.col0c, colors[gender].skin)
        || !check(inputs.col1, colors[gender].hair)
        || !check(inputs.col1a, colors[gender].hair)
        || !check(inputs.col1b, colors[gender].hair)
        || !check(inputs.col1c, colors[gender].hair)
        || !check(inputs.col1d, colors[gender].hair)
        || !check(inputs.col3, colors[gender].clothing)
        || !check(inputs.col2, colors[gender].clothing)
        || !check(inputs.col2b, colors[gender].clothing)
        || !check(inputs.col3b, colors[gender].clothing)
        || !check(inputs.col2a, colors[gender].clothing)
        || !check(inputs.col4, colors[gender].clothing)
        || !check(inputs.col4a, colors[gender].clothing)
        || !check(inputs.col4b, colors[gender].clothing)) {
        if(!ILLEGAL_COLORS)alert("L'utilisateur Ambryal a été pris la main dans le sac a modifier des couleurs !!!");
    }
    // col0, col0a, col0c must be the same
    if (inputs.col0 !== inputs.col0a || inputs.col0 !== inputs.col0c) {
        if(!ILLEGAL_COLORS)alert("L'utilisateur Ambryal a été pris la main dans le sac a modifier des couleurs !!! (col0, col0a, col0c must be the same)");
    }
    // col1, col1a, col1b, col1c, col1d must be the same
    if (inputs.col1 !== inputs.col1a
        || inputs.col1 !== inputs.col1b
        || inputs.col1 !== inputs.col1c
        || inputs.col1 !== inputs.col1d) {
        if(!ILLEGAL_COLORS)alert("L'utilisateur Ambryal a été pris la main dans le sac a modifier des couleurs !!! (col1, col1a, col1b, col1c, col1d must be the same)");

    }
	console.log("couleurs conformes");
};

var colors = {
    male: {
        skin: [
            '#996600',
            '#eccd57',
            '#cb841b',
            '#d79b75',
            '#fbe6c8',
            '#f8d198',
        ],
        hair: [
            '#784129',
            '#fff9ae',
            '#b85f1d',
            '#4f677d',
            '#df7e37',
            '#fbcd15',
            '#ffaa1e',
            '#952f04',
            '#a2886f',
            '#fff2df',
        ],
        clothing: [
            '#7bad30',
            '#b78104',
            '#bb1111',
            '#559399',
            '#fae31f',
            '#784129',
            '#7a73c8',
            '#fff9ae',
            '#f0dc99',
            '#b6e7a9',
            '#d31818',
            '#b85f1d',
            '#97cbff',
            '#8ba3d7',
            '#df7e37',
            '#d5eaff',
            '#ffaa1e',
            '#cbff97',
            '#ffcc79',
            '#fff2df',
        ],
    },
    female: {
        skin: [
            '#996600',
            '#f8cdc2',
            '#cb841b',
            '#eaaca6',
            '#fbe6c8',
            '#f8d198',
        ],
        hair: [
            '#fff9ae',
            '#b85f1d',
            '#eea2c9',
            '#8e63ad',
            '#fbcd15',
            '#ffaa1e',
            '#952f04',
            '#a2886f',
            '#fff2df',
        ],
        clothing: [
            '#7bad30',
            '#b78104',
            '#bb1111',
            '#559399',
            '#fae31f',
            '#784129',
            '#7a73c8',
            '#fff9ae',
            '#f0dc99',
            '#b6e7a9',
            '#d31818',
            '#b85f1d',
            '#97cbff',
            '#8ba3d7',
            '#df7e37',
            '#d5eaff',
            '#ffaa1e',
            '#cbff97',
            '#ffcc79',
            '#fff2df',
        ],
    },
    special: [
        '#000000',
    ],
};

var getRandomBody = (gender) => (0, generateBodyString)({
    p2: (0, randomBetween)(0, availableBodyParts[gender].p2),
    p3: (0, randomBetween)(0, availableBodyParts[gender].p3),
    p4: (0, randomBetween)(0, availableBodyParts[gender].p4),
    p7: (0, randomBetween)(0, availableBodyParts[gender].p7),
    p1: (0, randomBetween)(0, availableBodyParts[gender].p1),
    p1a: (0, randomBetween)(0, availableBodyParts[gender].p1a),
    p1b: (0, randomBetween)(0, availableBodyParts[gender].p1b),
    p6: (0, randomBetween)(0, availableBodyParts[gender].p6),
    p8: (0, randomBetween)(0, availableBodyParts[gender].p8),
    p7b: (0, randomBetween)(0, availableBodyParts[gender].p7b),
    p5: (0, randomBetween)(0, availableBodyParts[gender].p5),
});

var getRandomColors = (gender) => {
    var col0 = (0, randomBetween)(0, colors[gender].skin.length - 1);
    var col0a = col0;
    var col0c = col0;
    var col1 = (0, randomBetween)(0, colors[gender].hair.length - 1);
    var col1a = col1;
    var col1b = col1;
    var col1c = col1;
    var col1d = col1;
    var col3 = (0, randomBetween)(0, colors[gender].clothing.length - 1);
    var col2 = (0, randomBetween)(0, colors[gender].clothing.length - 1);
    var col2b = (0, randomBetween)(0, colors[gender].clothing.length - 1);
    var col3b = (0, randomBetween)(0, colors[gender].clothing.length - 1);
    var col2a = (0, randomBetween)(0, colors[gender].clothing.length - 1);
    var col4 = (0, randomBetween)(0, colors[gender].clothing.length - 1);
    var col4a = (0, randomBetween)(0, colors[gender].clothing.length - 1);
    var col4b = (0, randomBetween)(0, colors[gender].clothing.length - 1);
    return (0, generateColorString)({
        col0,
        col0a,
        col0c,
        col1,
        col1a,
        col1b,
        col1c,
        col1d,
        col2,
        col2a,
        col2b,
        col3,
        col3b,
        col4,
        col4a,
        col4b,
    });
};


var bodyParts = {
					p1:{
						name :
						{
							male:"Armor",
							female:"Armor"
						},
						type : "clothing"
					},
					p1a:{
						name :
						{
							male:"Belt",
							female:"Belt"
						},
						type : "clothing"
					},
					p1b:{
						name :
						{
							male:"Roman Belt",
							female:"Roman Belt"
						},
						type : "clothing"
					},
					p2:{
						name :
						{
							male:"Size",
							female:"Size"
						},
						type : "skin"
					},
					p3:{
						name :
						{
							male:"Hair",
							female:"Hair"
						},
						type : "hair"
					},
					p4:{
						name :
						{
							male:"Beard",
							female:"Front Hair"
						},
						type : "hair"
					},
					p5:{
						name :
						{
							male:"Shirt",
							female:"Shirt"
						},
						type : "clothing"
					},
					p6:{
						name :
						{
							male:"Short",
							female:"Short"
						},
						type : "clothing"
					},
					p7:{
						name :
						{
							male:"Clothing",
							female:"Clothing"
						},
						type : "clothing"
					},
					p7b:{
						name :
						{
							male:"Shoes",
							female:"Shoes"
						},
						type : "clothing"
					},
					p8:{
						name :
						{
							male:"Nothing",
							female:"Nothing"
						},
						type : "clothing"
					},
					
}
var DestinyChoiceType = /*exports.*//*$Enums.*/DestinyChoiceType = {
  skill: 'skill',
  weapon: 'weapon',
  pet: 'pet',
  stats: 'stats'
};

var BruteStat = /*exports.*//*$Enums.*/BruteStat = {
  endurance: 'endurance',
  strength: 'strength',
  agility: 'agility',
  speed: 'speed'
};

var getLevelUpChoices = (brute) => {
    let preventPerk = false;
    let perkType = null;
    let perkName = null;
    // First choice (Weapon/Skill/Pet)
    // (+1/+1 Stats if picked something already learned)
    let firstChoice = null;
    var bruteStats = Object.values(BruteStat);
    // Second choice (+2 Stat)
    let secondChoice = {
        type: 'stats',
        stat1: bruteStats[(0, randomBetween)(0, bruteStats.length - 1)],
        stat1Value: 2,
    };
    // Less likely to get a perk the more high level the brute is
    if (brute.level >= 80 && (0, randomBetween)(0, brute.level) >= 80) {
        preventPerk = true;
    }
    if (!preventPerk) {
        var perk = (0, getRandomBonus)(brute);
        if (perk) {
            perkType = perk.type;
            perkName = perk.name;
        }
        preventPerk = !perk;
    }
    // Chose +1/+1 stat instead
    if (preventPerk) {
        var { [(0, randomBetween)(0, bruteStats.length - 1)]: firstStat } = bruteStats;
        let { [(0, randomBetween)(0, bruteStats.length - 1)]: secondStat } = bruteStats;
        // Avoid duplicates
        while (secondStat === firstStat) {
            secondStat = bruteStats[(0, randomBetween)(0, bruteStats.length - 1)];
        }
        // Swap +1/+1 with +2
        firstChoice = secondChoice;
        secondChoice = {
            type: 'stats',
            stat1: firstStat,
            stat1Value: 1,
            stat2: secondStat,
            stat2Value: 1,
        };
    }
    else {
        if (!perkType || !perkName) {
            throw new Error('No perk type or name');
        }
        firstChoice = {
            type: perkType,
            skill: perkType === 'skill' ? perkName : undefined,
            pet: perkType === 'pet' ? perkName : undefined,
            weapon: perkType === 'weapon' ? perkName : undefined,
        };
    }
    return [firstChoice, secondChoice];
};

var createRandomBruteStats = (baseStats, perkType, perkName) => {
    let brute = {
        level: 1,
        xp: 0,
        hp: 0,
        enduranceStat: 0,
        enduranceModifier: 1,
        enduranceValue: 0,
        strengthStat: 0,
        strengthModifier: 1,
        strengthValue: 0,
        agilityStat: 0,
        agilityModifier: 1,
        agilityValue: 0,
        speedStat: 0,
        speedModifier: 1,
        speedValue: 0,
        skills: [],
        pets: [],
        ranking: BruteRankings[0],
        weapons: [],
    };
    let perk = null;
    // Predefined perk
    if (perkType && perkName) {
        perk = { type: perkType, name: perkName };
        if (perkType === DestinyChoiceType.pet) {
            brute.pets = [perkName];
        }
        else if (perkType === DestinyChoiceType.skill) {
            brute.skills = [perkName];
        }
        else {
            brute.weapons = [perkName];
        }
    }
    else {
        // Random perk
        perk = (0, getRandomBonus)(brute, true);
        if (!perk) {
            throw new Error('No bonus found');
        }
        // Pet
        brute.pets = perk.type === DestinyChoiceType.pet ? [perk.name] : [];
        // Skill
        brute.skills = perk.type === DestinyChoiceType.skill ? [perk.name] : [];
        // Weapon
        brute.weapons = perk.type === DestinyChoiceType.weapon ? [perk.name] : [];
    }
    // Stats boosters
    if (perk.type === 'skill') {
        var skill = brute.skills[0];
        if (!skill) {
            throw new Error('Skill not found');
        }
        brute = (0, applySkillModifiers)(brute, skill);
    }
    // Starting stats
    var startingStats = baseStats || (0, getRandomStartingStats)();
    brute.enduranceStat += startingStats.endurance;
    brute.strengthStat += startingStats.strength;
    brute.agilityStat += startingStats.agility;
    brute.speedStat += startingStats.speed;
    // Take into account the endurance malus from the pet
    if (perk.type === DestinyChoiceType.pet) {
        var pet = pets.find((p) => p.name === perk?.name);
        if (!pet) {
            throw new Error('Pet not found');
        }
        // Can go into negatives
        brute.enduranceStat -= pet.enduranceMalus;
    }
    // Final stat values
    brute.enduranceValue = Math.floor(brute.enduranceStat * brute.enduranceModifier);
    brute.strengthValue = Math.floor(brute.strengthStat * brute.strengthModifier);
    brute.agilityValue = Math.floor(brute.agilityStat * brute.agilityModifier);
    brute.speedValue = Math.floor(brute.speedStat * brute.speedModifier);
    // Final HP
    brute.hp = (0, getHP)(1, brute.enduranceValue);
    return brute;
};

var getRandomStartingStats = void 0;
var getRandomStartingStats = () => {
    // Starting budget
    let availablePoints = BRUTE_STARTING_POINTS;
    // Enrudance (2 to 5)
    var endurance = (0, randomBetween)(2, 5);
    availablePoints -= endurance;
    // Strength (2 to 5)
    var strength = Math.min((0, randomBetween)(2, 5), availablePoints - 2 * 2);
    availablePoints -= strength;
    // Agility (2 to 5)
    var agility = Math.min((0, randomBetween)(2, 5), availablePoints - 2 * 1);
    availablePoints -= agility;
    // Speed (2 to 5)
    var speed = availablePoints;
    return {
        endurance,
        strength,
        agility,
        speed,
    };
};
var getRandomStartingStats = getRandomStartingStats;

var updateStat = (brute, stat, value) => {
    switch (stat) {
        case 'endurance':
            return {
                ...brute,
                enduranceStat: brute.enduranceStat + value,
            };
        case 'strength':
            return {
                ...brute,
                strengthStat: brute.strengthStat + value,
            };
        case 'agility':
            return {
                ...brute,
                agilityStat: brute.agilityStat + value,
            };
        case 'speed':
            return {
                ...brute,
                speedStat: brute.speedStat + value,
            };
        default:
            throw new Error('Invalid stat');
    }
};
var updateBruteData = (brute, destinyChoice) => {
    let updatedBrute = {
        ...brute,
        pets: [...brute.pets],
        skills: [...brute.skills],
        weapons: [...brute.weapons],
        xp: 0,
        level: brute.level + 1,
    };
    // New skill
    if (destinyChoice.type === 'skill') {
        var skillName = destinyChoice.skill;
        if (!skillName) {
            throw new Error('No skill provided');
        }
        // Handle +2 fights for `regeneration`
        if (skillName === SkillName.regeneration && !brute.eventId) {
            updatedBrute.fightsLeft = (0, getFightsLeft)(updatedBrute, []) + 2;
        }
        updatedBrute.skills.push(skillName);
        // STATS MODIFIERS
        updatedBrute = (0, applySkillModifiers)(updatedBrute, skillName);
    }
    else if (destinyChoice.type === 'weapon') {
        // New weapon
        updatedBrute.weapons.push(destinyChoice.weapon);
    }
    else if (destinyChoice.type === 'pet') {
        // New pet
        var pet = pets.find((p) => p.name === destinyChoice.pet);
        if (!pet) {
            throw new Error('Pet not found');
        }
        updatedBrute.pets.push(destinyChoice.pet);
        // Take into account the endurance malus from the pet
        updatedBrute.enduranceStat -= pet.enduranceMalus;
    }
    else if (destinyChoice.stat1 && !destinyChoice.stat2) {
        // +X stat
        var stat = destinyChoice.stat1;
        updatedBrute = updateStat(updatedBrute, stat, destinyChoice.stat1Value);
    }
    else {
        // +X/+X
        if (!destinyChoice.stat1 || !destinyChoice.stat2
            || !destinyChoice.stat1Value || !destinyChoice.stat2Value) {
            throw new Error('No stats provided');
        }
        updatedBrute = updateStat(updatedBrute, destinyChoice.stat1, destinyChoice.stat1Value);
        updatedBrute = updateStat(updatedBrute, destinyChoice.stat2, destinyChoice.stat2Value);
    }
    // Final stat values
    updatedBrute.enduranceValue = Math.floor(updatedBrute.enduranceStat * updatedBrute.enduranceModifier);
    updatedBrute.strengthValue = Math.floor(updatedBrute.strengthStat * updatedBrute.strengthModifier);
    updatedBrute.agilityValue = Math.floor(updatedBrute.agilityStat * updatedBrute.agilityModifier);
    updatedBrute.speedValue = Math.floor(updatedBrute.speedStat * updatedBrute.speedModifier);
    // Final HP
    updatedBrute.hp = (0, getHP)(updatedBrute.level, updatedBrute.enduranceValue);
    return updatedBrute;
};

var isNameValid = void 0;
var isNameValid = (name) => {
    if (!name?.match(/^[a-zA-Z0-9_-]*$/) || name.length < 3 || name.length > 16) {
        return false;
    }
    return true;
};
var isNameValid = isNameValid;

function getFightsLeft(){}
var preventSomeBonuses = (brute, perkType, perkName) => {
    let preventPerk = false;
    // Check if the perk should be prevented
    if (perkType === 'pet') {
        switch (perkName) {
            case 'dog1':
                preventPerk = brute.pets.includes('dog1');
                break;
            case 'dog2':
                preventPerk = !brute.pets.includes('dog1') || brute.pets.includes('dog2');
                break;
            case 'dog3':
                preventPerk = !brute.pets.includes('dog1') || !brute.pets.includes('dog2') || brute.pets.includes('dog3');
                break;
            case 'panther':
                // Allow for both panther and bear at a 1/1000 chance
                preventPerk = brute.pets.includes('panther')
                    || ((0, randomBetween)(1, 1000) > 1 ? brute.pets.includes('bear') : false);
                break;
            case 'bear':
                // Allow for both panther and bear at a 1/1000 chance
                preventPerk = brute.pets.includes('bear')
                    || ((0, randomBetween)(1, 1000) > 1 ? brute.pets.includes('panther') : false);
                break;
            default:
                break;
        }
    }
    else if (perkType === 'skill') {
        var selectedSkill = skills.find((skill) => skill.name === perkName);
        var hasSkill = brute.skills.includes(perkName);
        if (hasSkill) {
            preventPerk = true;
        }
        else if (selectedSkill?.type === 'booster') {
            // Decrease booster chances
            var boosters = skills.filter((skill) => skill.type === 'booster');
            var gottenBoosters = brute.skills.filter((skill) => boosters.find((booster) => booster.name === skill));
            switch (gottenBoosters.length) {
                case 0:
                    preventPerk = false;
                    break;
                case 1:
                    // 5% chance of getting a second booster
                    preventPerk = (0, randomBetween)(1, 100) < 95;
                    break;
                case 2:
                    // 2% chance of getting a third booster
                    preventPerk = (0, randomBetween)(1, 100) < 98;
                    break;
                case 3:
                    // 0.1% chance of getting a fourth booster
                    preventPerk = (0, randomBetween)(1, 1000) < 999;
                    break;
                case 4:
                    // 0.1% chance of getting a fifth booster
                    preventPerk = (0, randomBetween)(1, 1000) < 999;
                    break;
                case 5:
                    // 0.1% chance of getting a sixth booster
                    preventPerk = (0, randomBetween)(1, 1000) < 999;
                    break;
                default:
                    preventPerk = false;
                    break;
            }
        }
        else {
            preventPerk = false;
        }
    }
    else {
        // Limit some weapons
        var gottenLimitedWeapons = brute.weapons.filter((weapon) => limitedWeapons.includes(weapon));
        if (limitedWeapons.find((w) => w === perkName)
            && gottenLimitedWeapons.length >= MAX_LIMITED_WEAPONS) {
            preventPerk = true;
        }
        else {
            // Prevent unlocking a weapon if the brute already has it
            preventPerk = brute.weapons.includes(perkName);
        }
    }
    return preventPerk;
};
var getRandomBonus = (brute, rerollUntilFound = false, disabledSkills = [], disabledWeapons = [], disabledPets = []) => {
    var enabledSkills = skills.filter((skill) => !disabledSkills.includes(skill.name));
    var enabledWeapons = weapons.filter((weapon) => !disabledWeapons.includes(weapon.name));
    var enabledPets = pets.filter((pet) => !disabledPets.includes(pet.name));
    var enabledPerksOdds = [
        { name: 'pet', odds: enabledPets.reduce((acc, pet) => acc + pet.odds, 0) },
        { name: 'skill', odds: enabledSkills.reduce((acc, skill) => acc + skill.odds, 0) },
        { name: 'weapon', odds: enabledWeapons.reduce((acc, weapon) => acc + weapon.odds, 0) },
    ];
    let perkName = null;
    let perkType = null;
    // Weapon/Skill/Pet ?
    perkType = (0, weightedRandom)(enabledPerksOdds).name;
    // Perk name ?
    perkName = perkType === 'pet'
        ? (0, weightedRandom)(pets).name
        : perkType === 'skill'
            ? (0, weightedRandom)(skills).name
            : (0, weightedRandom)(weapons).name;
    // Prevent some perks
    let found = !preventSomeBonuses(brute, perkType, perkName);
    while (rerollUntilFound && !found) {
        // Reroll perk type
        perkType = (0, weightedRandom)(enabledPerksOdds).name;
        // Reroll perk name
        perkName = perkType === 'pet'
            ? (0, weightedRandom)(pets).name
            : perkType === 'skill'
                ? (0, weightedRandom)(skills).name
                : (0, weightedRandom)(weapons).name;
        // Prevent some perks
        found = !preventSomeBonuses(brute, perkType, perkName);
    }
    return found ? {
        type: perkType,
        name: perkName,
    } : null;
};

var shuffle = (array) => {
    var shuffledArray = [...array];
    for (let i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var iItem = shuffledArray[i];
        var jItem = shuffledArray[j];
        if (typeof iItem === 'undefined' || typeof jItem === 'undefined') {
            throw new Error('Item not found while shuffling array');
        }
        shuffledArray[i] = jItem;
        shuffledArray[j] = iItem;
    }
    return shuffledArray;
};


var fetches = div({13:50000,4:[20,"","",50],5:0,2:"input"})
stopLoading()

fetches.keypress(function (e) {
  if (e.which == 13) {
    fetch(fetches.val())
  .then(response => response.text())
  .then(html => {cl(html)})
    return false;   
  }
});

cl("/api/brute/name/for-hook")




var t1 = div({13:50000,4:[50,"","",20],5:0,2:"textarea",12:["300","200"]})
var t2 = div({13:50000,4:[50,"","",80],5:0,2:"textarea",12:["300","200"]})
var btn = div({13:50000,4:[75,45,20,45],17:"FIGHT",10:"#ff0000",37:0,15:0,6:{mousedown:async function(e){
	var rota1=await getAllBrutes(t1.val().split("\n"))
	var rota2=(parseInt(t2.val())==t2.val())?parseInt(t2.val()):[await getAllBrutes(t2.val().split("\n"))]
	cl(rota1,rota2)
					simulFights({
						fn:cl,
						rota1:[rota1],
						rota2:rota2,//number = boss
						backups:false,
						clanwar:false,
						fight_per_rota:1000,
						fight_total:400000,
						return_first_win:e.which==2?false:(e.which!=1?undefined:true)
					})
	
	
	}}})
