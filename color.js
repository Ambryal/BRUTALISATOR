
var MASTERS = ["heheheha","Tenebre-Obscure","Armiv1","Larron","MGE-spiritBLACK","Poubellas","MGE-Bof","cuicuipitiwaso"]

function rien(){}

//chroma
// Fonction utilitaire pour l'interpolation entre deux valeurs numériques
function interpolate(start, end, factor) {
	var sqrtStart = start*start
	var sqrtEnd = end*end
	
    var res= sqrtStart + (sqrtEnd - sqrtStart)*factor; 
	//cl(start,end,factor,res*res)
	return Math.sqrt(res)
	}
var palette = setupColorInterpolation([
    [0, '#D32F2F'], // Rouge
    [0.40, '#9E2424'], // Orange
    [0.66, '#40455E'], // Vert
    [1, '#5D65C4']  // Bleu 
]);
var beforePalette = setupColorInterpolation([
    [0, '#B51111'], // Rouge
    [0.40, '#870D0D'], // Orange
    [0.66, '#4E180B'], // Vert
    [1, '#2F336D']  // Bleu
]);
var POWERpalette = setupColorInterpolation([
    [0, '#E5A0AE'], // Rouge
    [0.50, '#BF2820'], // Orange
    [0.75, '#E2A600'], // Vert6D1366
    [0.82, '#AF506D'], // Vert6D1366
    [0.86, '#6A5468'], // Vert6D1366
    [0.92, '#3E3870'], // Vert3A0A37
    [1, '#54C4C4']  // Bleu
]);
var POWERbeforePalette = setupColorInterpolation([
    [0, '#AA7984'], // Rouge
    [0.50, '#9B201A'], // Orange
    [0.75, '#BA8500'], // Vert
    [0.82, '#843C53'], // Vert
    [0.86, '#473946'], // Vert
    [0.92, '#19162D'], // Vert
    [1, '#359999']  // Bleu
]);    
var BONUSpalette = setupColorInterpolation([
    [0, '#1FD35B'], // Rouge4DB0B7
    [0.5, '#4EAFA4'], // Rouge
    [1, '#268E98']  // Bleu
]);
var BONUSbeforePalette = setupColorInterpolation([
    [0, '#117733'], // Rouge
    [0.5, '#2B605A'], // Rouge
    [1, '#134A4F']  // Bleu
]);    
var BONUSPLUSpalette = setupColorInterpolation([
    [0, '#B4D17B'], // Rouge4DB0B7
    [1, '#9B1568']  // Bleu
]);
var BONUSPLUSbeforePalette = setupColorInterpolation([
    [0, '#5E6D40'], // Rouge
    [1, '#680E47']  // Bleu
]);    
var MALUSpalette = setupColorInterpolation([
    [0, '#F47D42'], // Rouge
    [1, '#CB1C13']  // Bleu
]);//0.8+t/5
var MALUSbeforePalette = setupColorInterpolation([
    [0, '#9B4F2B'], // Rouge
    [1, '#720E0B']  // Bleu
]);    
var clanWarpalette = setupColorInterpolation([
    [0, '#27D600'], // Rouge
    [1, '#DD0300']  // Bleu
]);//0.8+t/5
var clanWarBEFOREpalette = setupColorInterpolation([
    [0, '#1C9E00'], // Rouge
    [1, '#890000']  // Bleu
]);    
// Fonction pour convertir une couleur hexadécimale en composantes RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

// Fonction pour convertir les composantes RGB en couleur hexadécimale
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Fonction principale pour interpoler une couleur entre deux points
function interpolateColor(startColor, endColor, factor) {
    const startRgb = hexToRgb(startColor);
    const endRgb = hexToRgb(endColor);

    const r = Math.round(interpolate(startRgb[0], endRgb[0], factor));
    const g = Math.round(interpolate(startRgb[1], endRgb[1], factor));
    const b = Math.round(interpolate(startRgb[2], endRgb[2], factor));

    return rgbToHex(r, g, b);
}

// Fonction pour configurer l'interpolation avec n couleurs et points
function setupColorInterpolation(colors) {
    return function(coef) {
        // Trouver les deux points les plus proches
        for (let i = 1; i < colors.length; i++) {
            if (coef <= colors[i][0]) {
                // Interpolation entre colors[i - 1] et colors[i]
                const factor = (coef - colors[i - 1][0]) / (colors[i][0] - colors[i - 1][0]);
                return interpolateColor(colors[i - 1][1], colors[i][1], factor);
            }
        }
        return colors[colors.length - 1][1]; // Si coef est 1, retourner la dernière couleur
    };
}




//-----------------------------sort

var initialSort = Array.prototype.sort
function redefineSort(){
Array.prototype.sort = function(compareFn) {
    // Si aucune fonction de comparaison n'est fournie, utiliser une fonction par défaut
    compareFn = compareFn || function(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    };

    // Merge Sort
    const mergeSort = (array) => {
        if (array.length <= 1) {
            return array;
        }

        // Diviser le tableau en deux moitiés
        const mid = Math.floor(array.length / 2);
        const left = mergeSort(array.slice(0, mid));
        const right = mergeSort(array.slice(mid));

        // Fusionner les deux moitiés triées
        return merge(left, right, compareFn);
    };

    // Fonction pour fusionner deux tableaux triés
    const merge = (left, right, compareFn) => {
        let result = [];
        let i = 0, j = 0;

        // Comparer les éléments des deux moitiés et les fusionner dans le bon ordre
        while (i < left.length && j < right.length) {
            if (compareFn(left[i], right[j]) <= 0) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        // Ajouter les éléments restants
        return result.concat(left.slice(i)).concat(right.slice(j));
    };

    // Retourner le tableau trié
    const sortedArray = mergeSort(this);

    // Remplacer les éléments du tableau d'origine
    for (let i = 0; i < this.length; i++) {
        this[i] = sortedArray[i];
    }

    return this;
};}

//----------------------------FIGHT


var heheheha = {"id":"d34f1d14-6d7b-4d87-abd2-614947732ba6","name":"heheheha","deletedAt":null,"createdAt":"2024-05-22T21:19:56.004Z",
"willBeDeletedAt":null,"deletionReason":null,"destinyPath":["RIGHT","LEFT","LEFT","RIGHT","LEFT"],
"previousDestinyPath":["RIGHT","LEFT","LEFT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","RIGHT","LEFT","RIGHT","RIGHT"],"level":6,"xp":3,
"hp":83,"enduranceStat":4,"enduranceModifier":1,"enduranceValue":4,"strengthStat":5,"strengthModifier":1,"strengthValue":5,"agilityStat":5,
"agilityModifier":1.5,"agilityValue":7,"speedStat":6,"speedModifier":1,"speedValue":6,"ranking":9,"gender":"female",
"userId":"565e2141-9982-406d-81ba-9aafdd219dc4","body":"10001210601","colors":"00000003030303031301020204020312",
"weapons":["piopio"],"skills":["fistsOfFury","felineAgility"],"pets":[],"masterId":null,"pupilsCount":6,"clanId":null,
"registeredForTournament":false,"nextTournamentDate":null,"currentTournamentDate":"2024-09-24T00:00:00.000Z",
"currentTournamentStepWatched":0,"globalTournamentWatchedDate":"2024-09-23T00:00:00.000Z","globalTournamentRoundWatched":999,
"lastFight":"2024-09-24T00:00:00.000Z","fightsLeft":7,"victories":468,"opponentsGeneratedAt":"2024-09-24T00:00:00.000Z",
"canRankUpSince":null,"favorite":false,"wantToJoinClanId":null,"tournamentWins":0,"eventId":null,"resets":2,"master":null,"clan":null,
"user":{"id":"565e2141-9982-406d-81ba-9aafdd219dc4","name":"Ambryal"},"tournaments":[{"id":"9fc44ffc-bee2-486b-84bf-613e199a03a1","date":"2024-09-24T00:00:00.000Z","type":"DAILY","rounds":6,"eventId":null}],"inventory":[{"type":"bossTicket","count":1}]}

function removePetMalus(brute,pet){
	var pet = pets.find((p) => p.name === pet);brute.enduranceStat+=pet.enduranceMalus;
		brute.enduranceValue = Math.floor(brute.enduranceStat * brute.enduranceModifier);
		brute.hp = (0, getHP)(brute.level, brute.enduranceValue);
}

async function genBrute({
	level,
	name=false,
	random
}){
	var template=heheheha
	if(!LOCAL && BRUTE){template = await getBrute(BRUTE)}
	
	name=name?name:(LOCAL?generateName():"_")
		
	var brute = createRandomBruteStats()
	
	brute.name=name
	brute.userId=brute.name
	brute.id=brute.name
	
	for(var chr in template){if(!(chr in brute)){brute[chr] = template[chr]}}
	
	var rnd=Math.random

	if(random){turnRandomToCHAOS(name);}
	
	brute.gender = getRandomProperty(Gender)
	brute.colors=getRandomColors(brute.gender)
	brute.body = getRandomBody(brute.gender)
	
	Math.random = rnd
	
	for(var i=1;i<level;i++){brute=levelUp(brute,random);}
	
	if(random){
		brute.weapons = shuffle(weapons.reduce((acc, obj) => {acc.push(obj.name);return acc;}, [])).slice(0,brute.weapons.length)
		for(var i of brute.pets){removePetMalus(brute,i)};
		brute.pets = shuffle(pets.reduce((acc, obj) => {acc.push(obj.name);if(obj.name.startsWith("dog1")){acc.push(obj.name)};return acc;}, [])).slice(0,brute.pets.length)
		var boosters = skills.reduce((acc, obj) => {if(obj.type=="booster"){acc.push(obj.name)};return acc;}, [])
		var keepBoosters = brute.skills.reduce((acc, obj) => {if(boosters.includes(obj)){acc.push(obj)};return acc;}, [])
		var not_boosters = skills.reduce((acc, obj) => {if(obj.type!="booster"){acc.push(obj.name)};return acc;}, [])
		var not_boosterCount = brute.skills.reduce((acc, obj) => {if(not_boosters.includes(obj)){acc++};return acc;}, 0)
		not_boosters.splice(not_boosters.indexOf("spy"), 1)
		if(Math.random()*2>1){not_boosters.splice(not_boosters.indexOf("flashflood"), 1)};
		if(Math.random()*5>1){not_boosters.splice(not_boosters.indexOf("monk"), 1)};
		if(Math.random()*8>1){not_boosters.splice(not_boosters.indexOf("hideaway"), 1)};
		if(Math.random()*8>1){not_boosters.splice(not_boosters.indexOf("chef"), 1)};
		brute.skills = keepBoosters.concat(shuffle(not_boosters).slice(0,not_boosterCount))
	
	}
	return brute;
	
	
	const noms = objets


}


function levelUp(brute,random){
	var choices = getLevelUpChoices(brute)
	if(random && choices[0].type == "skill")	{
		var force='herculeanStrength'
		var boosters = skills.reduce((acc, obj) => {if(obj.type=="booster"){if(obj.name!="immortality" && obj.name!="reconnaissance"){acc.push(obj.name)}};return acc;}, [])
		if(boosters.includes(choices[0].skill)){
			if(choices[0].skill!=force && !brute.skills.includes(force) && Math.random()*3<1){choices[0].skill=force}
	}
	}
	var chosed = 0
	if(choices[0].type == "stats"){if(brute[choices[0].stat1+"Modifier"]>1){chosed = 0}else{chosed = 1}}
	var newbrute = updateBruteData(structuredClone(brute),choices[chosed])
	return newbrute
	
}


function combatIsOk(){var name1=brutes[0];var name2=brutes[1];if(name1.indexOf("@")!=-1){name1=name1.split("@")[1]};if(name2.indexOf("@")!=-1){name2=name2.split("@")[1]};
return (name1.startsWith("$") || isNameValid(name1)) && (name2.startsWith("$") || isNameValid(name2)) && brutes[0]!=brutes[1]}

	var combat_lancer = false
var changedFetch
var intModif
var petDivs
var defiDIV
var initialURL=""
var initialVERSUS=""
var versusGetsList=[]
if(typeof(window)!="undefined"){
initialURL = window.location.href
initialVERSUS = window.location.href.split("?")[0]

versusGetsList = window.location.href.split("?")

}
versusGetsList = versusGetsList[1]?versusGetsList[1].split("&"):[]

var versusGets = {};for(var v of versusGetsList){var agr = v.split("=");if(agr.length>1){versusGets[agr[0]]=agr[1]}}
var seed = versusGets.seed?versusGets.seed:0
var brutes = [(versusGets.b1)?versusGets.b1:"",(versusGets.b2)?versusGets.b2:""]
//cl("BRUTES : ",brutes)
var bruteInputs = []
var bruteDIVS = []
var backups=[[],[]]

async function lauchFightVersusChampion(){var brute = await getBrute(BRUTE);brutes=["@"+BRUTE,"$"+brute.level+"_champion"];
const date = new Date();
const formattedDate = date.toLocaleDateString('fr-FR'); // Format: JJ/MM/AAAA
console.log(formattedDate);seed=formattedDate;launchFight()}

async function launchFight(){		
		if(combat_lancer) return
		if(!combatIsOk()) return
		combat_lancer = true
	stopLoading()
	brutes.sort()
	for(var i=0;i<2;i++){
if(brutes[i].startsWith("$")){var brutename=brutes[i];
var top 
if(brutename.split("$")[1].split("_").length==4){
	var l=brutename.split("$")[1].split("_")
	var lvl = parseInt(l[0])
	var nm = parseInt(l[1])
	var perkType=l[2]+"s"
	var perk=l[3]
	
	await getRumble(brutename.split("$")[1].split("_")[0]);
	
	top=0;for(var b of rumble){top++;if(b[perkType].includes(perk)){nm--;if(!nm){brutes[i]=b;break}}}
	

}
else if(brutename.split("$")[1].split("_")[1]=="champion"){await getRumble(brutename.split("$")[1].split("_")[0]);

for(var j in rumble){if(rumble[j].champion){top=parseInt(j)+1;brutes[i]=rumble[j];break}}}else{
top=parseInt(brutename.split("$")[1].split("_")[1])
brutes[i]=await getBruteFromRumble(...brutename.split("$")[1].split("_"));}
cl("[===  "+brutes[i].name+" top"+top+" "+(brutes[i].wr*100).toFixed(2)+"% "+' (top1 : '+(rumble[0].wr*100).toFixed(2)+"%)  ===]")}
else if(brutes[i].indexOf("@")==-1){var brutename=brutes[i];turnRandomToCHAOS(seed,brutename)
	backups[i] = [await genBrute({level:randomLevel(17,6),name:brutename+"$",random:true})];
	brutes[i] = await genBrute({level:randomLevel(56,5),name:brutename,random:true});
	turnRandomToCHAOS(seed,brutes)
	if(Math.random()>0.5){backups[i]=[]}
	turnCHAOSToRandom();
	}
else{var brutename=brutes[i];brutes[i]=await getBrute(brutename.split("@")[1])}
	} 
			simulFights({
				fn:rien,
				rota1:[[brutes[0]]],
				rota2:[[brutes[1]]],//number = boss
				backups:{[brutes[0].userId]:backups[0],[brutes[1].userId]:backups[1]},
				fight_per_rota:1,
				fight_total:1,
				return_first_win:false,//undefined : nothing, true : first win, false : first fight
				seed:[brutes[0].name,brutes[1].name,seed],
				})}

function gaussianRandom() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Évite 0 pour `u`
    while (v === 0) v = Math.random(); // Évite 0 pour `v`
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}
// Exemple : générer un nombre gaussien avec une moyenne et un écart-type spécifique
function gaussianRandomWithMeanAndStd(mean, stdDev) {
    return mean + gaussianRandom() * stdDev;
}

function randomLevel(mean=33,std=3){return parseInt(Math.max(0,gaussianRandomWithMeanAndStd(mean,std)))}

//-----------------------------------------------------------------------------------------------------------------

var d32 = Math.pow(2,32)-1
function int(a){return parseInt(a)}
var U = undefined

var Chaos
//Random generator
if(!Chaos){Chaos=class {
  constructor(...a){//Arguments : Anything            (INT FLOAT STRING et ARRAYS impacteront ; Objects impacteront en fonction de leur classe)
                    //L'objet vole 10 fois au départ... si non voulu : new Chaos().seed(_,_,_,_)
    var c=Chaos
	var l=Chaos.toSeed(a)
	while(l.length<4){l.push(0)}
	this.Seed=[l.shift(),l.shift(),l.shift(),l.shift()]
	this.flap(10)
	this.storm(l)
	this.flap(10)
	
  }
  
  static toSeed(...a){//Arguments : Anything            ->              [INT...]
  var l=[]
  for(var i of a){var p=typeof(i);if(p==="number"){if(Number.isInteger(i)){l.push(this.int(i))}else{i=i.toString().split(".");l.push(this.int(i[0]));l.push(this.int(i[1]))}}
  else if(p==="string"){for(var j=0;j<i.length;j++){l.push(this.int(i.charCodeAt(j)))};if(i.length===0){l.push(this.int(666))}}
  else if(isara(i)){l.push(...this.toSeed(...i))}
  else{l.push(...this.toSeed(p,(i!=null && i.constructor!=null && i.constructor.name)?i.constructor.name:0))}}
  if(l.length===0){l.push(this.int(333))}
  return l
  }
  static g=d32//2**32 -1
  static int(a){var b=int(a)%this.g;return b===0?this.g:b}//Int -> Int 1 - 2**32-1
  static trueSeed(){return this.int(Math.random() * this.g)}//crée une vraie seed
  static trueChaos(){return new Chaos(Chaos.trueSeed(),Chaos.trueSeed(),Chaos.trueSeed(),Chaos.trueSeed())}//crée un vrai chaos
    
  //seed([]/...)   change les seeds -> this
  seed(a){if(isara(a)){return this.seed(...a)}else{for(var i=0;i<arguments.length;i++){if(arguments[i]!==U){this.Seed[i]=Chaos.toSeed(arguments[i])[0]}}};return this}
  
  //secoue avec Anything arguments -> this
  storm(...a){var l=Chaos.toSeed(a);for(var i=0;i<l.length;i+=4){this.seed(this.Seed[0]+(l[i]?l[i]:0),this.Seed[1]+(l[i+1]?l[i+1]:0),this.Seed[2]+(l[i+2]?l[i+2]:0),this.Seed[3]+(l[i+3]?l[i+3]:0));this.flap(3)}
  return this}

  flap(a=1){//next(0+) -> this
	  for(var i=0;i<a;i++){
	  // uint64_t s1 = s[0]
	  var s1U = this.Seed[0], s1L = this.Seed[1];
	  // uint64_t s0 = s[1]
	  var s0U = this.Seed[2], s0L = this.Seed[3];

	  // result = s0 + s1
	  var sumL = (s0L >>> 0) + (s1L >>> 0);
	  var resU = (s0U + s1U + (sumL / 2 >>> 31)) >>> 0;
	  var resL = sumL >>> 0;

	  // s[0] = s0
	  this.Seed[0] = s0U;
	  this.Seed[1] = s0L;

	  // - t1 = [0, 0]
	  var t1U = 0, t1L = 0;
	  // - t2 = [0, 0]
	  var t2U = 0, t2L = 0;

	  // s1 ^= s1 << 23;
	  // :: t1 = s1 << 23
	  var a1 = 23;
	  var m1 = 0xFFFFFFFF << (32 - a1);
	  t1U = (s1U << a1) | ((s1L & m1) >>> (32 - a1));
	  t1L = s1L << a1;
	  // :: s1 = s1 ^ t1
	  s1U = s1U ^ t1U;
	  s1L = s1L ^ t1L;

	  // t1 = ( s1 ^ s0 ^ ( s1 >> 17 ) ^ ( s0 >> 26 ) )
	  // :: t1 = s1 ^ s0
	  t1U = s1U ^ s0U;
	  t1L = s1L ^ s0L;
	  // :: t2 = s1 >> 18
	  var a2 = 18;
	  var m2 = 0xFFFFFFFF >>> (32 - a2);
	  t2U = s1U >>> a2;
	  t2L = (s1L >>> a2) | ((s1U & m2) << (32 - a2));
	  // :: t1 = t1 ^ t2
	  t1U = t1U ^ t2U;
	  t1L = t1L ^ t2L;
	  // :: t2 = s0 >> 5
	  var a3 = 5;
	  var m3 = 0xFFFFFFFF >>> (32 - a3);
	  t2U = s0U >>> a3;
	  t2L = (s0L >>> a3) | ((s0U & m3) << (32 - a3));
	  // :: t1 = t1 ^ t2
	  t1U = t1U ^ t2U;
	  t1L = t1L ^ t2L;

	  // s[1] = t1
	  this.Seed[2] = t1U;
	  this.Seed[3] = t1L;}
	  
	  if(a>0){this.r=resU * 2.3283064365386963e-10 + (resL >>> 12) * 2.220446049250313e-16;};return this
	};
  
  //ran()->0,1           ran(10)->0,10            ran(5,8)->5,8              ran(5,8,3)->liste
  ran(a=1,b,c){if(arguments.length<2){return(this.ran(0,a))}else if(c!==U){var l=[];for(var i=0;i<c;i++){l.push(this.ran(a,b))};return l};return Math.floor(this.flap().r*(b-a+1)+a)}
  
  //fan()->0-1           fan(10)->0-10            fan(5,8)->5-8              fan(5,8,3)->liste
  fan(a=1,b,c){if(arguments.length<2){return(this.fan(0,a))}else if(c!==U){var l=[];for(var i=0;i<c;i++){l.push(this.fan(a,b))};return l};  return this.flap().r*(b-a)+a}
  
  //chaine de n lettres prises dans s
  string(s,n){var l=this.ran(0,s.length-1,n),r="";for(var i=0;i<n;i++){r+=s.charAt(l[i])};return r}
  
  //id à n lettres
  id(a=8){return this.string(lettres+LETTRES,a)}
  
  random(){return this.fan(0,1)}
  
}

}
var initialRandom
if(!initialRandom){initialRandom=Math.random}
function turnRandomToCHAOS(...args){
	redefineSort()
	var chaobject=new Chaos(...args)
	Math.random = chaobject.random.bind(chaobject)
}

function turnCHAOSToRandom(){Array.prototype.sort=initialSort;Math.random=initialRandom}

if(false){turnRandomToCHAOS()}


var nfps=60;var dicfps={};var dirfps=[];function fps(a){var f=dirfps.length;var t=function(){if(!(a in dicfps)){dicfps[a]=false;a(...arguments);setTimeout(function(){var b=dicfps[a];delk(dicfps,a);if(typeof(b)==typeof([])){dirfps[f](...b)}},nfps)}else{dicfps[a]=arguments;};};dirfps.push(t);return(t)};
function delk(a,b){if(typeof(a)==typeof([]) && (!Array.isArray(a))){var c=a;a=b;b=c};var c=b[a];delete b[a];return(c)}


var body
if(typeof(document)!="undefined"){
	
	!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],E=C.document,r=Object.getPrototypeOf,s=t.slice,g=t.concat,u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.4.1",k=function(e,t){return new k.fn.init(e,t)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function d(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}k.fn=k.prototype={jquery:f,constructor:k,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=k.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return k.each(this,e)},map:function(n){return this.pushStack(k.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},k.extend=k.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(k.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||k.isPlainObject(n)?n:{},i=!1,a[t]=k.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},k.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t){b(e,{nonce:t&&t.nonce})},each:function(e,t){var n,r=0;if(d(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(p,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(d(Object(e))?k.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(d(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g.apply([],a)},guid:1,support:y}),"function"==typeof Symbol&&(k.fn[Symbol.iterator]=t[Symbol.iterator]),k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var h=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,k="sizzle"+1*new Date,m=n.document,S=0,r=0,p=ue(),x=ue(),N=ue(),A=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",$=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",F=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp($),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+$),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ne=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(m.childNodes),m.childNodes),t[m.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&((e?e.ownerDocument||e:m)!==C&&T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!A[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&U.test(t)){(s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=k),o=(l=h(t)).length;while(o--)l[o]="#"+s+" "+xe(l[o]);c=l.join(","),f=ee.test(t)&&ye(e.parentNode)||e}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){A(t,!0)}finally{s===k&&e.removeAttribute("id")}}}return g(t.replace(B,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[k]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:m;return r!==C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),m!==C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=k,!C.getElementsByName||!C.getElementsByName(k).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){a.appendChild(e).innerHTML="<a id='"+k+"'></a><select id='"+k+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+k+"-]").length||v.push("~="),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+k+"+*").length||v.push(".#.+[+~]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",$)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e===C||e.ownerDocument===m&&y(m,e)?-1:t===C||t.ownerDocument===m&&y(m,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===C?-1:t===C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]===m?-1:s[r]===m?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if((e.ownerDocument||e)!==C&&T(e),d.matchesSelector&&E&&!A[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){A(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!==C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!==C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=p[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&p(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(F," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[S,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[S,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[k]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace(B,"$1"));return s[k]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[S,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[k]||(e[k]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===S&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[k]&&(v=Ce(v)),y&&!y[k]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[k]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(B,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=N[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[k]?i.push(a):o.push(a);(a=N(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=S+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t===C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument===C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(S=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(S=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=k.split("").sort(D).join("")===k,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);k.find=h,k.expr=h.selectors,k.expr[":"]=k.expr.pseudos,k.uniqueSort=k.unique=h.uniqueSort,k.text=h.getText,k.isXMLDoc=h.isXML,k.contains=h.contains,k.escapeSelector=h.escape;var T=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&k(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=k.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var D=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?k.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?k.grep(e,function(e){return e===n!==r}):"string"!=typeof n?k.grep(e,function(e){return-1<i.call(n,e)!==r}):k.filter(n,e,r)}k.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?k.find.matchesSelector(r,e)?[r]:[]:k.find.matches(e,k.grep(t,function(e){return 1===e.nodeType}))},k.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(k(e).filter(function(){for(t=0;t<r;t++)if(k.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)k.find(e,i[t],n);return 1<r?k.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&N.test(e)?k(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(k.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:L.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof k?t[0]:t,k.merge(this,k.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),D.test(r[1])&&k.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(k):k.makeArray(e,this)}).prototype=k.fn,q=k(E);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}k.fn.extend({has:function(e){var t=k(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(k.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&k(e);if(!N.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&k.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?k.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(k(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(k.uniqueSort(k.merge(this.get(),k(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),k.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return T(e,"parentNode")},parentsUntil:function(e,t,n){return T(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return T(e,"nextSibling")},prevAll:function(e){return T(e,"previousSibling")},nextUntil:function(e,t,n){return T(e,"nextSibling",n)},prevUntil:function(e,t,n){return T(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return"undefined"!=typeof e.contentDocument?e.contentDocument:(A(e,"template")&&(e=e.content||e),k.merge([],e.childNodes))}},function(r,i){k.fn[r]=function(e,t){var n=k.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=k.filter(t,n)),1<this.length&&(O[r]||k.uniqueSort(n),H.test(r)&&n.reverse()),this.pushStack(n)}});var R=/[^\x20\t\r\n\f]+/g;function M(e){return e}function I(e){throw e}function W(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}k.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},k.each(e.match(R)||[],function(e,t){n[t]=!0}),n):k.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){k.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return k.each(arguments,function(e,t){var n;while(-1<(n=k.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<k.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},k.extend({Deferred:function(e){var o=[["notify","progress",k.Callbacks("memory"),k.Callbacks("memory"),2],["resolve","done",k.Callbacks("once memory"),k.Callbacks("once memory"),0,"resolved"],["reject","fail",k.Callbacks("once memory"),k.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return k.Deferred(function(r){k.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,M,s),l(u,o,I,s)):(u++,t.call(e,l(u,o,M,s),l(u,o,I,s),l(u,o,M,o.notifyWith))):(a!==M&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){k.Deferred.exceptionHook&&k.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==I&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(k.Deferred.getStackHook&&(t.stackTrace=k.Deferred.getStackHook()),C.setTimeout(t))}}return k.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:M,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:M)),o[2][3].add(l(0,e,m(n)?n:I))}).promise()},promise:function(e){return null!=e?k.extend(e,a):a}},s={};return k.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=k.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(W(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)W(i[t],a(t),o.reject);return o.promise()}});var $=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;k.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&$.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},k.readyException=function(e){C.setTimeout(function(){throw e})};var F=k.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),k.ready()}k.fn.ready=function(e){return F.then(e)["catch"](function(e){k.readyException(e)}),this},k.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--k.readyWait:k.isReady)||(k.isReady=!0)!==e&&0<--k.readyWait||F.resolveWith(E,[k])}}),k.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(k.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var _=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)_(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(k(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},z=/^-ms-/,U=/-([a-z])/g;function X(e,t){return t.toUpperCase()}function V(e){return e.replace(z,"ms-").replace(U,X)}var G=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Y(){this.expando=k.expando+Y.uid++}Y.uid=1,Y.prototype={cache:function(e){var t=e[this.expando];return t||(t={},G(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[V(t)]=n;else for(r in t)i[V(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][V(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(V):(t=V(t))in r?[t]:t.match(R)||[]).length;while(n--)delete r[t[n]]}(void 0===t||k.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!k.isEmptyObject(t)}};var Q=new Y,J=new Y,K=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function ee(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Z,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:K.test(i)?JSON.parse(i):i)}catch(e){}J.set(e,t,n)}else n=void 0;return n}k.extend({hasData:function(e){return J.hasData(e)||Q.hasData(e)},data:function(e,t,n){return J.access(e,t,n)},removeData:function(e,t){J.remove(e,t)},_data:function(e,t,n){return Q.access(e,t,n)},_removeData:function(e,t){Q.remove(e,t)}}),k.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=J.get(o),1===o.nodeType&&!Q.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=V(r.slice(5)),ee(o,r,i[r]));Q.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){J.set(this,n)}):_(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=J.get(o,n))?t:void 0!==(t=ee(o,n))?t:void 0;this.each(function(){J.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){J.remove(this,e)})}}),k.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Q.get(e,t),n&&(!r||Array.isArray(n)?r=Q.access(e,t,k.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=k.queue(e,t),r=n.length,i=n.shift(),o=k._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){k.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Q.get(e,n)||Q.access(e,n,{empty:k.Callbacks("once memory").add(function(){Q.remove(e,[t+"queue",n])})})}}),k.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?k.queue(this[0],t):void 0===n?this:this.each(function(){var e=k.queue(this,t,n);k._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&k.dequeue(this,t)})},dequeue:function(e){return this.each(function(){k.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=k.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Q.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var te=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ne=new RegExp("^(?:([+-])=|)("+te+")([a-z%]*)$","i"),re=["Top","Right","Bottom","Left"],ie=E.documentElement,oe=function(e){return k.contains(e.ownerDocument,e)},ae={composed:!0};ie.getRootNode&&(oe=function(e){return k.contains(e.ownerDocument,e)||e.getRootNode(ae)===e.ownerDocument});var se=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&oe(e)&&"none"===k.css(e,"display")},ue=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];for(o in i=n.apply(e,r||[]),t)e.style[o]=a[o];return i};function le(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return k.css(e,t,"")},u=s(),l=n&&n[3]||(k.cssNumber[t]?"":"px"),c=e.nodeType&&(k.cssNumber[t]||"px"!==l&&+u)&&ne.exec(k.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)k.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,k.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ce={};function fe(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Q.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&se(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ce[s])||(o=a.body.appendChild(a.createElement(s)),u=k.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ce[s]=u)))):"none"!==n&&(l[c]="none",Q.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}k.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){se(this)?k(this).show():k(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?k.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Q.set(e[n],"globalEval",!t||Q.get(t[n],"globalEval"))}ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;var me,xe,be=/<|&#?\w+;/;function we(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))k.merge(p,o.nodeType?[o]:o);else if(be.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+k.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;k.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<k.inArray(o,r))i&&i.push(o);else if(l=oe(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}me=E.createDocumentFragment().appendChild(E.createElement("div")),(xe=E.createElement("input")).setAttribute("type","radio"),xe.setAttribute("checked","checked"),xe.setAttribute("name","t"),me.appendChild(xe),y.checkClone=me.cloneNode(!0).cloneNode(!0).lastChild.checked,me.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!me.cloneNode(!0).lastChild.defaultValue;var Te=/^key/,Ce=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ee=/^([^.]*)(?:\.(.+)|)/;function ke(){return!0}function Se(){return!1}function Ne(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ae(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ae(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Se;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return k().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=k.guid++)),e.each(function(){k.event.add(this,t,i,r,n)})}function De(e,i,o){o?(Q.set(e,i,!1),k.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Q.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(k.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Q.set(this,i,r),t=o(this,i),this[i](),r!==(n=Q.get(this,i))||t?Q.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Q.set(this,i,{value:k.event.trigger(k.extend(r[0],k.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Q.get(e,i)&&k.event.add(e,i,ke)}k.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.get(t);if(v){n.handler&&(n=(o=n).handler,i=o.selector),i&&k.find.matchesSelector(ie,i),n.guid||(n.guid=k.guid++),(u=v.events)||(u=v.events={}),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof k&&k.event.triggered!==e.type?k.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(R)||[""]).length;while(l--)d=g=(s=Ee.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=k.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=k.event.special[d]||{},c=k.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&k.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),k.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.hasData(e)&&Q.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(R)||[""]).length;while(l--)if(d=g=(s=Ee.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=k.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||k.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)k.event.remove(e,d+t[l],n,r,!0);k.isEmptyObject(u)&&Q.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=k.event.fix(e),u=new Array(arguments.length),l=(Q.get(this,"events")||{})[s.type]||[],c=k.event.special[s.type]||{};for(u[0]=s,t=1;t<arguments.length;t++)u[t]=arguments[t];if(s.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,s)){a=k.event.handlers.call(this,s,l),t=0;while((i=a[t++])&&!s.isPropagationStopped()){s.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!s.isImmediatePropagationStopped())s.rnamespace&&!1!==o.namespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,void 0!==(r=((k.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u))&&!1===(s.result=r)&&(s.preventDefault(),s.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<k(i,this).index(l):k.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(k.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[k.expando]?e:new k.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click",ke),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Q.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},k.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},k.Event=function(e,t){if(!(this instanceof k.Event))return new k.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?ke:Se,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&k.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[k.expando]=!0},k.Event.prototype={constructor:k.Event,isDefaultPrevented:Se,isPropagationStopped:Se,isImmediatePropagationStopped:Se,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=ke,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=ke,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=ke,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},k.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Te.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Ce.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},k.event.addProp),k.each({focus:"focusin",blur:"focusout"},function(e,t){k.event.special[e]={setup:function(){return De(this,e,Ne),!1},trigger:function(){return De(this,e),!0},delegateType:t}}),k.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){k.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||k.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),k.fn.extend({on:function(e,t,n,r){return Ae(this,e,t,n,r)},one:function(e,t,n,r){return Ae(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,k(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Se),this.each(function(){k.event.remove(this,e,n,t)})}});var je=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,qe=/<script|<style|<link/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,He=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Oe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&k(e).children("tbody")[0]||e}function Pe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Re(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Me(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(Q.hasData(e)&&(o=Q.access(e),a=Q.set(t,o),l=o.events))for(i in delete a.handle,a.events={},l)for(n=0,r=l[i].length;n<r;n++)k.event.add(t,i,l[i][n]);J.hasData(e)&&(s=J.access(e),u=k.extend({},s),J.set(t,u))}}function Ie(n,r,i,o){r=g.apply([],r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Le.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Ie(t,r,i,o)});if(f&&(t=(e=we(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=k.map(ve(e,"script"),Pe)).length;c<f;c++)u=e,c!==p&&(u=k.clone(u,!0,!0),s&&k.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,k.map(a,Re),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Q.access(u,"globalEval")&&k.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?k._evalUrl&&!u.noModule&&k._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")}):b(u.textContent.replace(He,""),u,l))}return n}function We(e,t,n){for(var r,i=t?k.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||k.cleanData(ve(r)),r.parentNode&&(n&&oe(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}k.extend({htmlPrefilter:function(e){return e.replace(je,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=oe(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||k.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Me(o[r],a[r]);else Me(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=k.event.special,o=0;void 0!==(n=e[o]);o++)if(G(n)){if(t=n[Q.expando]){if(t.events)for(r in t.events)i[r]?k.event.remove(n,r):k.removeEvent(n,r,t.handle);n[Q.expando]=void 0}n[J.expando]&&(n[J.expando]=void 0)}}}),k.fn.extend({detach:function(e){return We(this,e,!0)},remove:function(e){return We(this,e)},text:function(e){return _(this,function(e){return void 0===e?k.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Ie(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Oe(this,e).appendChild(e)})},prepend:function(){return Ie(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Oe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(k.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return k.clone(this,e,t)})},html:function(e){return _(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!qe.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=k.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(k.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Ie(this,arguments,function(e){var t=this.parentNode;k.inArray(this,n)<0&&(k.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),k.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){k.fn[e]=function(e){for(var t,n=[],r=k(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),k(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var $e=new RegExp("^("+te+")(?!px)[a-z%]+$","i"),Fe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Be=new RegExp(re.join("|"),"i");function _e(e,t,n){var r,i,o,a,s=e.style;return(n=n||Fe(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||oe(e)||(a=k.style(e,t)),!y.pixelBoxStyles()&&$e.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function ze(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){s.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ie.appendChild(s).appendChild(u);var e=C.getComputedStyle(u);n="1%"!==e.top,a=12===t(e.marginLeft),u.style.right="60%",o=36===t(e.right),r=36===t(e.width),u.style.position="absolute",i=12===t(u.offsetWidth/3),ie.removeChild(s),u=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s=E.createElement("div"),u=E.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===u.style.backgroundClip,k.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),a},scrollboxSize:function(){return e(),i}}))}();var Ue=["Webkit","Moz","ms"],Xe=E.createElement("div").style,Ve={};function Ge(e){var t=k.cssProps[e]||Ve[e];return t||(e in Xe?e:Ve[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Ue.length;while(n--)if((e=Ue[n]+t)in Xe)return e}(e)||e)}var Ye=/^(none|table(?!-c[ea]).+)/,Qe=/^--/,Je={position:"absolute",visibility:"hidden",display:"block"},Ke={letterSpacing:"0",fontWeight:"400"};function Ze(e,t,n){var r=ne.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function et(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=k.css(e,n+re[a],!0,i)),r?("content"===n&&(u-=k.css(e,"padding"+re[a],!0,i)),"margin"!==n&&(u-=k.css(e,"border"+re[a]+"Width",!0,i))):(u+=k.css(e,"padding"+re[a],!0,i),"padding"!==n?u+=k.css(e,"border"+re[a]+"Width",!0,i):s+=k.css(e,"border"+re[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function tt(e,t,n){var r=Fe(e),i=(!y.boxSizingReliable()||n)&&"border-box"===k.css(e,"boxSizing",!1,r),o=i,a=_e(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if($e.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||"auto"===a||!parseFloat(a)&&"inline"===k.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===k.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+et(e,t,n||(i?"border":"content"),o,r,a)+"px"}function nt(e,t,n,r,i){return new nt.prototype.init(e,t,n,r,i)}k.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=_e(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=V(t),u=Qe.test(t),l=e.style;if(u||(t=Ge(s)),a=k.cssHooks[t]||k.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=ne.exec(n))&&i[1]&&(n=le(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(k.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=V(t);return Qe.test(t)||(t=Ge(s)),(a=k.cssHooks[t]||k.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=_e(e,t,r)),"normal"===i&&t in Ke&&(i=Ke[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),k.each(["height","width"],function(e,u){k.cssHooks[u]={get:function(e,t,n){if(t)return!Ye.test(k.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?tt(e,u,n):ue(e,Je,function(){return tt(e,u,n)})},set:function(e,t,n){var r,i=Fe(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===k.css(e,"boxSizing",!1,i),s=n?et(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-et(e,u,"border",!1,i)-.5)),s&&(r=ne.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=k.css(e,u)),Ze(0,t,s)}}}),k.cssHooks.marginLeft=ze(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(_e(e,"marginLeft"))||e.getBoundingClientRect().left-ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),k.each({margin:"",padding:"",border:"Width"},function(i,o){k.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+re[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(k.cssHooks[i+o].set=Ze)}),k.fn.extend({css:function(e,t){return _(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Fe(e),i=t.length;a<i;a++)o[t[a]]=k.css(e,t[a],!1,r);return o}return void 0!==n?k.style(e,t,n):k.css(e,t)},e,t,1<arguments.length)}}),((k.Tween=nt).prototype={constructor:nt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||k.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(k.cssNumber[n]?"":"px")},cur:function(){var e=nt.propHooks[this.prop];return e&&e.get?e.get(this):nt.propHooks._default.get(this)},run:function(e){var t,n=nt.propHooks[this.prop];return this.options.duration?this.pos=t=k.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):nt.propHooks._default.set(this),this}}).init.prototype=nt.prototype,(nt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=k.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){k.fx.step[e.prop]?k.fx.step[e.prop](e):1!==e.elem.nodeType||!k.cssHooks[e.prop]&&null==e.elem.style[Ge(e.prop)]?e.elem[e.prop]=e.now:k.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=nt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},k.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},k.fx=nt.prototype.init,k.fx.step={};var rt,it,ot,at,st=/^(?:toggle|show|hide)$/,ut=/queueHooks$/;function lt(){it&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(lt):C.setTimeout(lt,k.fx.interval),k.fx.tick())}function ct(){return C.setTimeout(function(){rt=void 0}),rt=Date.now()}function ft(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=re[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function pt(e,t,n){for(var r,i=(dt.tweeners[t]||[]).concat(dt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function dt(o,e,t){var n,a,r=0,i=dt.prefilters.length,s=k.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=rt||ct(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:k.extend({},e),opts:k.extend(!0,{specialEasing:{},easing:k.easing._default},t),originalProperties:e,originalOptions:t,startTime:rt||ct(),duration:t.duration,tweens:[],createTween:function(e,t){var n=k.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=V(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=k.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=dt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(k._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return k.map(c,pt,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),k.fx.timer(k.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}k.Animation=k.extend(dt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return le(n.elem,e,ne.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(R);for(var n,r=0,i=e.length;r<i;r++)n=e[r],dt.tweeners[n]=dt.tweeners[n]||[],dt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&se(e),v=Q.get(e,"fxshow");for(r in n.queue||(null==(a=k._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,k.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],st.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||k.style(e,r)}if((u=!k.isEmptyObject(t))||!k.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Q.get(e,"display")),"none"===(c=k.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=k.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===k.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Q.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&fe([e],!0),p.done(function(){for(r in g||fe([e]),Q.remove(e,"fxshow"),d)k.style(e,r,d[r])})),u=pt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?dt.prefilters.unshift(e):dt.prefilters.push(e)}}),k.speed=function(e,t,n){var r=e&&"object"==typeof e?k.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return k.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in k.fx.speeds?r.duration=k.fx.speeds[r.duration]:r.duration=k.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&k.dequeue(this,r.queue)},r},k.fn.extend({fadeTo:function(e,t,n,r){return this.filter(se).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=k.isEmptyObject(t),o=k.speed(e,n,r),a=function(){var e=dt(this,k.extend({},t),o);(i||Q.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&!1!==i&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=k.timers,r=Q.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&ut.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||k.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Q.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=k.timers,o=n?n.length:0;for(t.finish=!0,k.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),k.each(["toggle","show","hide"],function(e,r){var i=k.fn[r];k.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(ft(r,!0),e,t,n)}}),k.each({slideDown:ft("show"),slideUp:ft("hide"),slideToggle:ft("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){k.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),k.timers=[],k.fx.tick=function(){var e,t=0,n=k.timers;for(rt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||k.fx.stop(),rt=void 0},k.fx.timer=function(e){k.timers.push(e),k.fx.start()},k.fx.interval=13,k.fx.start=function(){it||(it=!0,lt())},k.fx.stop=function(){it=null},k.fx.speeds={slow:600,fast:200,_default:400},k.fn.delay=function(r,e){return r=k.fx&&k.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},ot=E.createElement("input"),at=E.createElement("select").appendChild(E.createElement("option")),ot.type="checkbox",y.checkOn=""!==ot.value,y.optSelected=at.selected,(ot=E.createElement("input")).value="t",ot.type="radio",y.radioValue="t"===ot.value;var ht,gt=k.expr.attrHandle;k.fn.extend({attr:function(e,t){return _(this,k.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){k.removeAttr(this,e)})}}),k.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?k.prop(e,t,n):(1===o&&k.isXMLDoc(e)||(i=k.attrHooks[t.toLowerCase()]||(k.expr.match.bool.test(t)?ht:void 0)),void 0!==n?null===n?void k.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=k.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(R);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ht={set:function(e,t,n){return!1===t?k.removeAttr(e,n):e.setAttribute(n,n),n}},k.each(k.expr.match.bool.source.match(/\w+/g),function(e,t){var a=gt[t]||k.find.attr;gt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=gt[o],gt[o]=r,r=null!=a(e,t,n)?o:null,gt[o]=i),r}});var vt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;function mt(e){return(e.match(R)||[]).join(" ")}function xt(e){return e.getAttribute&&e.getAttribute("class")||""}function bt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(R)||[]}k.fn.extend({prop:function(e,t){return _(this,k.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[k.propFix[e]||e]})}}),k.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&k.isXMLDoc(e)||(t=k.propFix[t]||t,i=k.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=k.find.attr(e,"tabindex");return t?parseInt(t,10):vt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(k.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),k.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){k.propFix[this.toLowerCase()]=this}),k.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).addClass(t.call(this,e,xt(this)))});if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).removeClass(t.call(this,e,xt(this)))});if(!arguments.length)return this.attr("class","");if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){k(this).toggleClass(i.call(this,e,xt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=k(this),r=bt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=xt(this))&&Q.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Q.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+mt(xt(n))+" ").indexOf(t))return!0;return!1}});var wt=/\r/g;k.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,k(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=k.map(t,function(e){return null==e?"":e+""})),(r=k.valHooks[this.type]||k.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=k.valHooks[t.type]||k.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(wt,""):null==e?"":e:void 0}}),k.extend({valHooks:{option:{get:function(e){var t=k.find.attr(e,"value");return null!=t?t:mt(k.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=k(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=k.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<k.inArray(k.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),k.each(["radio","checkbox"],function(){k.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<k.inArray(k(e).val(),t)}},y.checkOn||(k.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var Tt=/^(?:focusinfocus|focusoutblur)$/,Ct=function(e){e.stopPropagation()};k.extend(k.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!Tt.test(d+k.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[k.expando]?e:new k.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:k.makeArray(t,[e]),c=k.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,Tt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Q.get(o,"events")||{})[e.type]&&Q.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&G(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!G(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),k.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Ct),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Ct),k.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=k.extend(new k.Event,n,{type:e,isSimulated:!0});k.event.trigger(r,null,t)}}),k.fn.extend({trigger:function(e,t){return this.each(function(){k.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return k.event.trigger(e,t,n,!0)}}),y.focusin||k.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){k.event.simulate(r,e.target,k.event.fix(e))};k.event.special[r]={setup:function(){var e=this.ownerDocument||this,t=Q.access(e,r);t||e.addEventListener(n,i,!0),Q.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this,t=Q.access(e,r)-1;t?Q.access(e,r,t):(e.removeEventListener(n,i,!0),Q.remove(e,r))}}});var Et=C.location,kt=Date.now(),St=/\?/;k.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||k.error("Invalid XML: "+e),t};var Nt=/\[\]$/,At=/\r?\n/g,Dt=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;function qt(n,e,r,i){var t;if(Array.isArray(e))k.each(e,function(e,t){r||Nt.test(n)?i(n,t):qt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)qt(n+"["+t+"]",e[t],r,i)}k.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!k.isPlainObject(e))k.each(e,function(){i(this.name,this.value)});else for(n in e)qt(n,e[n],t,i);return r.join("&")},k.fn.extend({serialize:function(){return k.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=k.prop(this,"elements");return e?k.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!k(this).is(":disabled")&&jt.test(this.nodeName)&&!Dt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=k(this).val();return null==n?null:Array.isArray(n)?k.map(n,function(e){return{name:t.name,value:e.replace(At,"\r\n")}}):{name:t.name,value:n.replace(At,"\r\n")}}).get()}});var Lt=/%20/g,Ht=/#.*$/,Ot=/([?&])_=[^&]*/,Pt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Rt=/^(?:GET|HEAD)$/,Mt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Ft=E.createElement("a");function Bt(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(R)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function _t(t,i,o,a){var s={},u=t===Wt;function l(e){var r;return s[e]=!0,k.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function zt(e,t){var n,r,i=k.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&k.extend(!0,e,r),e}Ft.href=Et.href,k.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":k.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,k.ajaxSettings),t):zt(k.ajaxSettings,e)},ajaxPrefilter:Bt(It),ajaxTransport:Bt(Wt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=k.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?k(y):k.event,x=k.Deferred(),b=k.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Pt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace(Mt,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(R)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Ft.protocol+"//"+Ft.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=k.param(v.data,v.traditional)),_t(It,v,t,T),h)return T;for(i in(g=k.event&&v.global)&&0==k.active++&&k.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Rt.test(v.type),f=v.url.replace(Ht,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Lt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(St.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Ot,"$1"),o=(St.test(f)?"&":"?")+"_="+kt+++o),v.url=f+o),v.ifModified&&(k.lastModified[f]&&T.setRequestHeader("If-Modified-Since",k.lastModified[f]),k.etag[f]&&T.setRequestHeader("If-None-Match",k.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+$t+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=_t(Wt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(k.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(k.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--k.active||k.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return k.get(e,t,n,"json")},getScript:function(e,t){return k.get(e,void 0,t,"script")}}),k.each(["get","post"],function(e,i){k[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),k.ajax(k.extend({url:e,type:i,dataType:r,data:t,success:n},k.isPlainObject(e)&&e))}}),k._evalUrl=function(e,t){return k.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){k.globalEval(e,t)}})},k.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=k(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){k(this).wrapInner(n.call(this,e))}):this.each(function(){var e=k(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){k(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){k(this).replaceWith(this.childNodes)}),this}}),k.expr.pseudos.hidden=function(e){return!k.expr.pseudos.visible(e)},k.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},k.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Ut={0:200,1223:204},Xt=k.ajaxSettings.xhr();y.cors=!!Xt&&"withCredentials"in Xt,y.ajax=Xt=!!Xt,k.ajaxTransport(function(i){var o,a;if(y.cors||Xt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Ut[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),k.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),k.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return k.globalEval(e),e}}}),k.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),k.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=k("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Vt,Gt=[],Yt=/(=)\?(?=&|$)|\?\?/;k.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Gt.pop()||k.expando+"_"+kt++;return this[e]=!0,e}}),k.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Yt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Yt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Yt,"$1"+r):!1!==e.jsonp&&(e.url+=(St.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||k.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?k(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Gt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Vt=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Vt.childNodes.length),k.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=D.exec(e))?[t.createElement(i[1])]:(i=we([e],t,o),o&&o.length&&k(o).remove(),k.merge([],i.childNodes)));var r,i,o},k.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=mt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&k.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?k("<div>").append(k.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},k.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){k.fn[t]=function(e){return this.on(t,e)}}),k.expr.pseudos.animated=function(t){return k.grep(k.timers,function(e){return t===e.elem}).length},k.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=k.css(e,"position"),c=k(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=k.css(e,"top"),u=k.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,k.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},k.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){k.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===k.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===k.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=k(e).offset()).top+=k.css(e,"borderTopWidth",!0),i.left+=k.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-k.css(r,"marginTop",!0),left:t.left-i.left-k.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===k.css(e,"position"))e=e.offsetParent;return e||ie})}}),k.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;k.fn[t]=function(e){return _(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),k.each(["top","left"],function(e,n){k.cssHooks[n]=ze(y.pixelPosition,function(e,t){if(t)return t=_e(e,n),$e.test(t)?k(e).position()[n]+"px":t})}),k.each({Height:"height",Width:"width"},function(a,s){k.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){k.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return _(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?k.css(e,t,i):k.style(e,t,n,i)},s,n?e:void 0,n)}})}),k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){k.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}}),k.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),k.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),k.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||k.guid++,i},k.holdReady=function(e){e?k.readyWait++:k.ready(!0)},k.isArray=Array.isArray,k.parseJSON=JSON.parse,k.nodeName=A,k.isFunction=m,k.isWindow=x,k.camelCase=V,k.type=w,k.now=Date.now,k.isNumeric=function(e){var t=k.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return k});var Qt=C.jQuery,Jt=C.$;return k.noConflict=function(e){return C.$===k&&(C.$=Jt),e&&C.jQuery===k&&(C.jQuery=Qt),k},e||(C.jQuery=C.$=k),k});
	body=$("body")
	}



function cl(a){if(arguments.length!=1) a=[...arguments];console.log(a)}
var fediv={
3:function(a,b,c){c.addClass(a[b])},
4:function(a,b,c){if(a[b]===0){a[b]=[0,0,0,0]}else if(a[b]===1){a[b]=[50,"","",50]}else if(a[b]===2){a[b]=["","","",""]};for(var i in a[b]){if(typeof(a[b][i])==typeof(1)){a[b][i]=a[b][i]+"%"}};c.css({"position":"absolute","top":a[b][0],"right":a[b][1],"bottom":a[b][2],"left":a[b][3]})},
5:function(a,b,c){if(a[b]===0){a[b]=[-50,-50]};for(var i in a[b]){if(typeof(a[b][i])==typeof(1)){a[b][i]=a[b][i]+"%"}};c.css("transform","translate("+a[b][0]+","+a[b][1]+")")},
50:function(a,b,c){c.css("text-align","center")},
13:function(a,b,c){c.css("z-index",a[b])},
12:function(a,b,c){if(a[b]===0){a[b]=["100%","100%"]};c.css({"width":a[b][0],"height":a[b][1]})},
10:function(a,b,c){c.css("background-color",a[b])},
16:function(a,b,c){if(a[b]===0){a[b]=police};c.css("font-family",a[b])},
15:function(a,b,c){if(a[b]===0){a[b]="pointer"};c.css("cursor",a[b])},
18:function(a,b,c){c.css("opacity",a[b])},
19:function(a,b,c){c.css("border-radius",a[b])},
24:function(a,b,c){c.css("font-size",a[b])},
20:function(a,b,c){c.attr("title",a[b])},
21:function(a,b,c){c.attr("placeholder",a[b])},
22:function(a,b,c){c.attr("src",a[b])},
23:function(a,b,c){c.css("color",a[b])},
26:function(a,b,c){if(a[b]===0){a[b]="nowrap"}else if(a[b]===1){a[b]="pre"};c.css("white-space",a[b])},
27:function(a,b,c){c.attr("type",a[b])},
28:function(a,b,c){for(var i in a[b]){c.attr("data-"+i,a[b][i])}},
33:function(a,b,c){if(typeof(a[b])==="string"){c[0].style.filter=a[b]}else{csi(c,33,a[b])}},
37:function(a,b,c){c.attr("oncontextmenu","return false");return;if(!clidroi){clidroi=true;$(document).on("mousedown",function(e){if(e.which===3 && e.pageX===0){dov({13:d32-3,6:{"mouseup mousedown mousemove":function(){var a=$(this);setTimeout(function(){a.remove()},16)}}})}})}},
42:function(a,b,c){c[0].style.position="absolute";if(Array.isArray(a[b])){anim(c,...a[b])}else if(a[b]!==0){anim(c,a[b],0)}},
44:function(a,b,c){c.attr("font-weight","bold")},
66:function(a,b,c){if(a[b]===0){a[b]="auto"}else if(a[b]===1){a[b]="hidden"}else if(a[b]===2){a[b]="visible"};c.css("overflow",a[b])},
70:function(a,b,c){c.css("maskImage",typeof(a[b])=="object"?gra(a[b]):a[b])},
71:function(a,b,c){if(a[b]===0){a[b]="100%"};c.css("line-height",a[b])},
79:function(a,b,c){if(typeof(a[b])==="number"){vado(c,a[b],0);}else{a[b][1]=c;vado(...a[b])}},
82:function(a,b,c){c.css("background",typeof(a[b])=="object"?gra(a[b]):a[b])},
8:function(a,b,c){c.attr(a[b])},
9:function(a,b,c){c.css(a[b])},
6:function(a,b,c){for(var i in a[b]){c.on(i,a[b][i])};},
7:function(a,b,c){if(a[b].length==1){c.hover(a[b][0])}else{c.hover(a[b][0],a[b][1])}},
99:function(a,b,c){if(a[b]===0){a[b]=[0]};for(var i in a[b]){if(i%2==0){c.fadeOut(a[b][i])}else{c.fadeIn(a[b][i])}};},
73:function(a,b,c){if(typeof(a[b])==typeof("")){if(vexist(typeof(ima_exist)) && (a[b] in ima)){a[b]={0:a[b]}}
else{a[b]=[a[b],"",[1,1,1],[0,0],[]]}};if(Array.isArray(a[b])){if(!isara(a[b][a[b].length-1])){fon(c,...a[b])}else{a[b].push(c);fonde(a[b])}}else{fon(c,a[b])}}
}

function str(a){return a.toString()}
function float(a){return parseFloat(a)}

// a in b
function isin(a,b){return b.indexOf(a)!=-1}

//Longueur d'objets
function len(a){return Object.keys(a).length}

function isara(a){return(Array.isArray(a))};
//ATTENTION - isobj(array) -> true
function isobj(a){return(typeof(a)==="object")};
function isnum(a){return typeof(a)==="number"};
function isflo(b){return((parseFloat(b)-b+666).toString()==="666")}
function isint(b){return((parseInt(b)-b+666).toString()==="666")}
function isU(a){return a===U}
function n3m(x, p = 2, v = 0) {
    if (isara(x)) {
        for (var i = 0; i < x.length; i++) {
            x[i] = n3m(x[i])
        }
        return x
    }
	x = x.toString(); // Convertir en chaîne de caractères pour manipulation

    // Vérifier si x est en notation scientifique
    var sciMatch = x.match(/^([-+]?[0-9]*\.?[0-9]+)[eE]([-+]?[0-9]+)$/);
    var sciPart = "";
    if (sciMatch) {
        x = sciMatch[1]; // Partie numérique
        sciPart = "e" + sciMatch[2]; // Partie exponentielle
    }
    if (!isNaN(float(x)) && /^-?[0-9\s\.]*$/.test(str(x))) {
        var parts = float(x).toString().split("."),
        parol = (parts[0]=="0")?0:parts[0].replace("-","").length;
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        if (parts[1]) {
            parts[1] = str(float(float("." + ((parol < p || v) ? parts[1] : "0"))[parts[0] === "0" ? "toPrecision" : "toFixed"](v ? v : 
			(parol < p ? Math.max(0, Math.max((p - parol), 0)) : 0)))).split(".")[1];
			while(parol+(parts[1]?parts[1].length:0)<p){parts[1]=(parts[1] || "")+"0";}
            if (parts[1]) {
                parts[1] = parts[1].replace(/\B(?<=(?<!\d)(\d{3})+)/g, " ")
            }
        }
        x = parts[1] ? parts.join(".") : parts[0];
    }
    return x + sciPart; 
}
function dov(a=body,b={}){if(b===0){b={}};if(arguments.length===1){b=a;a=body};return(div(uni([{0:a,4:0},b])))}
function div(a){var fiv={0:body,1:"nvl_mc",2:"div",17:""};
for(var i in fiv){if(i in a){fiv[i]=a[i]}}
if(typeof(fiv[0])==typeof("1")){fiv[0]=$("#"+fiv[0])}
var f="";if(["input","img"].indexOf(fiv[2])==-1){f="</"+fiv[2]+">"}
fiv[0].append("<"+fiv[2]+" id='"+fiv[1]+"'>"+fiv[17]+f);
var b=$("#"+fiv[1]);if(fiv[1]==="nvl_mc"){b.removeAttr("id")};
for(var i in fediv){if(i in a){fediv[i](a,i,b)}};
return(b)}
function uni(a){var l={};for(var i in a){for(var j in a[i]){l[j]=a[i][j]}};return(l)}

function addScript( src ,src2) {
	cl("addscript",src);
	fetch(src)
	  .then(response => response.text())
	  .then(src2?function(html){
		  fetch(src2)
	  .then(response => response.text())
	  .then(function(html2){var s = document.createElement( 'script' );
		  s.setAttribute('text',"text/javascript");
		  s.setAttribute('type',"module");
		  s.textContent=html+html2;
		  document.body.appendChild( s );})
		  
		  
		  
	  }:(html => {
	  
		  var s = document.createElement( 'script' );
		  s.setAttribute('text',"text/javascript");
		  s.setAttribute('type',"module");
		  s.textContent=html;
		  document.body.appendChild( s );
	  
	  }))

	}
	
function openBruteCell(name){openNewTab(window.location.href.split(".org")[0]+".org/"+name+"/cell")}
function openNewTab(url) {
    // Vérifier si l'URL est définie
    if (url) {
        // Ouvrir un nouvel onglet avec l'URL spécifiée
        window.open(url, '_blank');
    } else {
        console.error('URL non spécifiée');
    }
}
function isTextInDOM(text,balise) {
  // Récupérer tous les éléments de la page
  const elements = document.querySelectorAll(balise);
  var found = false
  // Parcourir tous les éléments et vérifier leur texte
  elements.forEach(element => {
    if (element.textContent.includes(text)) {
      //console.log('Élément trouvé :', element.textContent);
	  found = true
    }
  });
  return found;
}

function findFirstTextInDOM(text,balise) {
  // Récupérer tous les éléments de la page
  const elements = document.querySelectorAll(balise);
  var elem
  // Parcourir tous les éléments et vérifier leur texte
  elements.forEach(element => {
    if (element.textContent.includes(text)) {
      //console.log('Élément trouvé :', element.textContent);
	  if(!elem)elem= element;
    }
  });
  return elem
}

function findTextInDOM(text,balise) {
  // Récupérer tous les éléments de la page
  const elements = document.querySelectorAll(balise);
  var elem
  // Parcourir tous les éléments et vérifier leur texte
  elements.forEach(element => {
    if (element.textContent.includes(text)) {
      //console.log('Élément trouvé :', element.textContent);
	  elem = element
    }
  });
  return elem;
}
var surpuissance
var bruteData
var brutedatac
var PUISSANCE
var POWERSTEP
var archiRumble
var ENNEMY
var ENNEMY_REVERSED

	

function resetBruteModifAc(){bruteModifAc=bruteData=POWERSTEP=archiRumble=surpuissance=undefined}
/*
simulFights({
	fn,
	rota1,
	rota2,//number = boss
	backups,
	fight_per_rota,
	fight_total,
	return_first_win//undefined : nothing, true : first win, false : first fight
	})
*/

var bruteModifAc

var setInt
	clearInterval(setInt);
	var urrl
var refreshPotentielLoop=0
if(typeof(window)!="undefined"){	urrl= window.location.href;
	setInt = setInterval(function(){
		refreshPotentielLoop = (refreshPotentielLoop+1)%5
		if (fightWorkers && fightWorkers.size) {fightWorkers.forEach(worker => worker.postMessage(5));}
	if(window.location.href!=urrl){urrl=window.location.href;	if(iframe){$(iframe).remove()};stopLoading();//CHANGEMENT PAGE
	arena_turns=0
	terminateWorkers();$(".power").remove();if(!urrl.includes("/hall") && !urrl.includes("/cell")){POWERSTEP=archiRumble=surpuissance=undefined;};if(!bruteModifAc)bruteData=undefined
		$("#mynetwork").remove();$("#puissance").remove()}
		for(var divname of ["#SkillsMax","#WeaponsMax"]){if(refreshPotentielLoop){break}
			var l=[]	
			if($(divname).length){
				$(divname+' .tx').each(function() {
				if($(this).text()!="..."){l.push([$(this),parseFloat($(this).text())])}
			});
			l.sort(function(a,b){if(a[1]==b[1]){return a[0].attr("id").localeCompare(b[0].attr("id"))};return (a[1]-b[1])})
			for(var d of l){$(divname).prepend(d[0].parent().parent().parent())}	
		}}
},333)}

var GENERATE_FIGHT
var generateFights

async function simulFights(arg){
	//cl("SIMULFIGHTS",JSON.stringify(arg))
	if(!GENERATE_FIGHT){if(LOCAL){GENERATE_FIGHT = generateFights}else{cl("DL generateFight...");GENERATE_FIGHT = await fetch(BRUTALISATOR+"generateFights.js");
	GENERATE_FIGHT = await GENERATE_FIGHT.text();
	}}
	

	
	generateFights = GENERATE_FIGHT
	
	arg.generateFights = generateFights;simulFights_no_fetch(arg);
}

var fightWorkers 

if(!fightWorkers){fightWorkers= new Set();} 

function terminateWorkers() {fightWorkers.forEach(worker => worker.terminate());fightWorkers.clear();}

async function simulFights_no_fetch({generateFights,fn,rota1,rota2//number = boss
,backups,fight_per_rota,fight_total,return_first_win,loading=true,
modifiers,seed,pass_same_brute_fight,multiple_workers,go_around,clanwar}){
return new Promise((resolve, reject) => {
	if(!multiple_workers){terminateWorkers()}
	if(typeof(rota2)=="number"){generateFights = generateFights.replace('var BOSS'+' = "brutes"','bosses['+rota2+'].startHP=100000;var BOSS = "bosses"'+";")
		generateFights = generateFights.replace("var TEAM2 ="+" []","var TEAM2 = [[bosses["+rota2+"]]];")
	}
	else{
		generateFights = generateFights.replace("var TEAM2 ="+" []","var TEAM2 = "+JSON.stringify(rota2)+";")

	}
	if(modifiers){generateFights = generateFights.replace("modifier"+"s: [],","modifiers: "+JSON.stringify(modifiers)+",")}
	generateFights = generateFights.replace("var TEAM1 ="+" []","var TEAM1 = "+JSON.stringify(rota1)+";")

	if(clanwar!==false && (clanwar===true || (rota1[0].length+(rota2[0]?rota2[0].length:1)>2))){generateFights = generateFights.replace('var CLANWAR'+' = false','var CLANWAR = true'+";")}
	if(backups){generateFights = generateFights.replace('var BACKUPS'+' = false','var BACKUPS = '+JSON.stringify(backups)+";")}
	if(return_first_win===true){generateFights = generateFights.replace('var RETURN_FIR'+'ST_WIN;','var RETURN_FIRST_WIN = true'+";")}
	if(return_first_win===false){generateFights = generateFights.replace('var RETURN_FIR'+'ST_WIN;','var RETURN_FIRST_WIN = false'+";")}
	if(pass_same_brute_fight){generateFights = generateFights.replace('var PASS_S'+'AME_BR'+'UTE_FIGHTS;','var PASS_'+'SAME_BRU'+'TE_FI'+'GHTS = true'+";")}
	if(go_around){generateFights = generateFights.replace('var GO_A'+'ROUND;','var GO_A'+'ROUND = true'+";")}
	
	generateFights = generateFights.replace("var FIGHTS_PER_ROTA"+" = 1","var FIGHTS_PER_ROTA = "+fight_per_rota+";")
	generateFights = generateFights.replace("var FIGHT_TOTAL"+" = 1","var FIGHT_TOTAL = "+fight_total+";")
	if(seed!==U){		generateFights = generateFights.replace("if(false){tur"+"nRandomToCHAOS()}","if(true){turnRandomToCHAOS("+JSON.stringify(seed)+")}")
}	

	var workerScript = 'var BRANCHE = "'+BRANCHE+'";'+generateFights

	// Créer un Blob contenant le script du worker
	var blob = new Blob([workerScript], { type: 'application/javascript' });

	// Créer une URL pour le Blob
	var workerUrl = URL.createObjectURL(blob);

	// Créer le worker à partir de l'URL du Blob
	 
	var worker = new Worker(workerUrl);fightWorkers.add(worker);
	fightWorker = worker
	worker.onmessage=function(e){if(e.data.firstwin){visualizeFight(e.data.firstwin);
	e.data.ended=true};if(e.data.ended){fightWorkers.delete(worker);worker.terminate();if(!fightWorkers.size){stopLoading()};
	resolve(e.data.bilan);};fn(e.data.bilan,e.data.ended);}

	if(loading)startLoading();
	

})
	  }

function setImageSrc(prevSrc,newSrc){
	$("img[src$='"+prevSrc+"']").attr("src",newSrc)
	
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function genDestiny(brute,level){
	var destiny = []
	while(destiny.length<level - 1){
		var choices = getLevelUpChoices(brute);
		if(choices[0].skill && getBoosters().includes(choices[0].skill)){choices[1]=choices[0]};
		destiny.push(choices);
		brute=updateBruteData(structuredClone(brute),choices[0])
		}
		return destiny
}
// Compresser et encoder en base64
function zipString(obj) {
    const compressed = pako.deflate(JSON.stringify(obj)); // Compresser l'objet ou la chaîne
    return uint8ArrayToBase64(compressed); // Convertir en base64
}

function uint8ArrayToBase64(uint8Array) {
    let binaryString = '';
    const len = uint8Array.length;
    for (let i = 0; i < len; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binaryString); // Convertit la chaîne binaire en base64
}

// Fonction pour convertir une chaîne base64 en Uint8Array
function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const uint8Array = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
}

// Décompresser à partir d'une chaîne base64
function unzipString(base64Str) {
    const uint8Array = base64ToUint8Array(base64Str); // Conversion en Uint8Array
    const decompressed = pako.inflate(uint8Array, { to: 'string' }); // Décompresser
    return JSON.parse(decompressed); // Parser la chaîne JSON
}

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,i=286,n=30,s=15,r=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),o=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);e(d);const _=new Array(60);e(_);const f=new Array(512);e(f);const c=new Array(256);e(c);const u=new Array(29);e(u);const w=new Array(n);function m(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let b,g,p;function k(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(w);const v=t=>t<256?f[t]:f[256+(t>>>7)],y=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},x=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,y(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},z=(t,e,a)=>{x(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const i=new Array(16);let n,r,o=0;for(n=1;n<=s;n++)o=o+a[n-1]<<1,i[n]=o;for(r=0;r<=e;r++){let e=t[2*r+1];0!==e&&(t[2*r]=A(i[e]++,e))}},R=t=>{let e;for(e=0;e<i;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.sym_next=t.matches=0},Z=t=>{t.bi_valid>8?y(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},S=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&U(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!U(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},D=(t,e,i)=>{let n,s,l,h,d=0;if(0!==t.sym_next)do{n=255&t.pending_buf[t.sym_buf+d++],n+=(255&t.pending_buf[t.sym_buf+d++])<<8,s=t.pending_buf[t.sym_buf+d++],0===n?z(t,s,e):(l=c[s],z(t,l+a+1,e),h=r[l],0!==h&&(s-=u[l],x(t,s,h)),n--,l=v(n),z(t,l,i),h=o[l],0!==h&&(n-=w[l],x(t,n,h)))}while(d<t.sym_next);z(t,256,e)},T=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,r=e.stat_desc.elems;let o,l,h,d=-1;for(t.heap_len=0,t.heap_max=573,o=0;o<r;o++)0!==a[2*o]?(t.heap[++t.heap_len]=d=o,t.depth[o]=0):a[2*o+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=d<2?++d:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=i[2*h+1]);for(e.max_code=d,o=t.heap_len>>1;o>=1;o--)S(t,a,o);h=r;do{o=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),l=t.heap[1],t.heap[--t.heap_max]=o,t.heap[--t.heap_max]=l,a[2*h]=a[2*o]+a[2*l],t.depth[h]=(t.depth[o]>=t.depth[l]?t.depth[o]:t.depth[l])+1,a[2*o+1]=a[2*l+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,o=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,h=e.stat_desc.max_length;let d,_,f,c,u,w,m=0;for(c=0;c<=s;c++)t.bl_count[c]=0;for(a[2*t.heap[t.heap_max]+1]=0,d=t.heap_max+1;d<573;d++)_=t.heap[d],c=a[2*a[2*_+1]+1]+1,c>h&&(c=h,m++),a[2*_+1]=c,_>i||(t.bl_count[c]++,u=0,_>=l&&(u=o[_-l]),w=a[2*_],t.opt_len+=w*(c+u),r&&(t.static_len+=w*(n[2*_+1]+u)));if(0!==m){do{for(c=h-1;0===t.bl_count[c];)c--;t.bl_count[c]--,t.bl_count[c+1]+=2,t.bl_count[h]--,m-=2}while(m>0);for(c=h;0!==c;c--)for(_=t.bl_count[c];0!==_;)f=t.heap[--d],f>i||(a[2*f+1]!==c&&(t.opt_len+=(c-a[2*f+1])*a[2*f],a[2*f+1]=c),_--)}})(t,e),E(a,d,t.bl_count)},O=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++o<l&&n===r||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4))},I=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++o<l&&n===r)){if(o<h)do{z(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==s&&(z(t,n,t.bl_tree),o--),z(t,16,t.bl_tree),x(t,o-3,2)):o<=10?(z(t,17,t.bl_tree),x(t,o-3,3)):(z(t,18,t.bl_tree),x(t,o-11,7));o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4)}};let F=!1;const L=(t,e,a,i)=>{x(t,0+(i?1:0),3),Z(t),y(t,a),y(t,~a),a&&t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a};var N=(t,e,i,n)=>{let s,r,o=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,i=4093624447;for(e=0;e<=31;e++,i>>>=1)if(1&i&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),T(t,t.l_desc),T(t,t.d_desc),o=(t=>{let e;for(O(t,t.dyn_ltree,t.l_desc.max_code),O(t,t.dyn_dtree,t.d_desc.max_code),T(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),s=t.opt_len+3+7>>>3,r=t.static_len+3+7>>>3,r<=s&&(s=r)):s=r=i+5,i+4<=s&&-1!==e?L(t,e,i,n):4===t.strategy||r===s?(x(t,2+(n?1:0),3),D(t,d,_)):(x(t,4+(n?1:0),3),((t,e,a,i)=>{let n;for(x(t,e-257,5),x(t,a-1,5),x(t,i-4,4),n=0;n<i;n++)x(t,t.bl_tree[2*h[n]+1],3);I(t,t.dyn_ltree,e-1),I(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,o+1),D(t,t.dyn_ltree,t.dyn_dtree)),R(t),n&&Z(t)},B={_tr_init:t=>{F||((()=>{let t,e,a,h,k;const v=new Array(16);for(a=0,h=0;h<28;h++)for(u[h]=a,t=0;t<1<<r[h];t++)c[a++]=h;for(c[a-1]=h,k=0,h=0;h<16;h++)for(w[h]=k,t=0;t<1<<o[h];t++)f[k++]=h;for(k>>=7;h<n;h++)for(w[h]=k<<7,t=0;t<1<<o[h]-7;t++)f[256+k++]=h;for(e=0;e<=s;e++)v[e]=0;for(t=0;t<=143;)d[2*t+1]=8,t++,v[8]++;for(;t<=255;)d[2*t+1]=9,t++,v[9]++;for(;t<=279;)d[2*t+1]=7,t++,v[7]++;for(;t<=287;)d[2*t+1]=8,t++,v[8]++;for(E(d,287,v),t=0;t<n;t++)_[2*t+1]=5,_[2*t]=A(t,5);b=new m(d,r,257,i,s),g=new m(_,o,0,n,s),p=new m(new Array(0),l,0,19,7)})(),F=!0),t.l_desc=new k(t.dyn_ltree,b),t.d_desc=new k(t.dyn_dtree,g),t.bl_desc=new k(t.bl_tree,p),t.bi_buf=0,t.bi_valid=0,R(t)},_tr_stored_block:L,_tr_flush_block:N,_tr_tally:(t,e,i)=>(t.pending_buf[t.sym_buf+t.sym_next++]=e,t.pending_buf[t.sym_buf+t.sym_next++]=e>>8,t.pending_buf[t.sym_buf+t.sym_next++]=i,0===e?t.dyn_ltree[2*i]++:(t.matches++,e--,t.dyn_ltree[2*(c[i]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.sym_next===t.sym_end),_tr_align:t=>{x(t,2,3),z(t,256,d),(t=>{16===t.bi_valid?(y(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var C=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const M=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var H=(t,e,a,i)=>{const n=M,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},j={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},K={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:P,_tr_stored_block:Y,_tr_flush_block:G,_tr_tally:X,_tr_align:W}=B,{Z_NO_FLUSH:q,Z_PARTIAL_FLUSH:J,Z_FULL_FLUSH:Q,Z_FINISH:V,Z_BLOCK:$,Z_OK:tt,Z_STREAM_END:et,Z_STREAM_ERROR:at,Z_DATA_ERROR:it,Z_BUF_ERROR:nt,Z_DEFAULT_COMPRESSION:st,Z_FILTERED:rt,Z_HUFFMAN_ONLY:ot,Z_RLE:lt,Z_FIXED:ht,Z_DEFAULT_STRATEGY:dt,Z_UNKNOWN:_t,Z_DEFLATED:ft}=K,ct=258,ut=262,wt=42,mt=113,bt=666,gt=(t,e)=>(t.msg=j[e],e),pt=t=>2*t-(t>4?9:0),kt=t=>{let e=t.length;for(;--e>=0;)t[e]=0},vt=t=>{let e,a,i,n=t.w_size;e=t.hash_size,i=e;do{a=t.head[--i],t.head[i]=a>=n?a-n:0}while(--e);e=n,i=e;do{a=t.prev[--i],t.prev[i]=a>=n?a-n:0}while(--e)};let yt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const xt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},zt=(t,e)=>{G(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,xt(t.strm)},At=(t,e)=>{t.pending_buf[t.pending++]=e},Et=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Rt=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=C(t.adler,e,n,a):2===t.state.wrap&&(t.adler=H(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Zt=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,o=t.nice_match;const l=t.strstart>t.w_size-ut?t.strstart-(t.w_size-ut):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+ct;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=ct-(f-s),s=f-ct,i>r){if(t.match_start=e,r=i,i>=o)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>l&&0!=--n);return r<=t.lookahead?r:t.lookahead},Ut=t=>{const e=t.w_size;let a,i,n;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ut)&&(t.window.set(t.window.subarray(e,e+e-i),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,t.insert>t.strstart&&(t.insert=t.strstart),vt(t),i+=e),0===t.strm.avail_in)break;if(a=Rt(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=a,t.lookahead+t.insert>=3)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=yt(t,t.ins_h,t.window[n+1]);t.insert&&(t.ins_h=yt(t,t.ins_h,t.window[n+3-1]),t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ut&&0!==t.strm.avail_in)},St=(t,e)=>{let a,i,n,s=t.pending_buf_size-5>t.w_size?t.w_size:t.pending_buf_size-5,r=0,o=t.strm.avail_in;do{if(a=65535,n=t.bi_valid+42>>3,t.strm.avail_out<n)break;if(n=t.strm.avail_out-n,i=t.strstart-t.block_start,a>i+t.strm.avail_in&&(a=i+t.strm.avail_in),a>n&&(a=n),a<s&&(0===a&&e!==V||e===q||a!==i+t.strm.avail_in))break;r=e===V&&a===i+t.strm.avail_in?1:0,Y(t,0,0,r),t.pending_buf[t.pending-4]=a,t.pending_buf[t.pending-3]=a>>8,t.pending_buf[t.pending-2]=~a,t.pending_buf[t.pending-1]=~a>>8,xt(t.strm),i&&(i>a&&(i=a),t.strm.output.set(t.window.subarray(t.block_start,t.block_start+i),t.strm.next_out),t.strm.next_out+=i,t.strm.avail_out-=i,t.strm.total_out+=i,t.block_start+=i,a-=i),a&&(Rt(t.strm,t.strm.output,t.strm.next_out,a),t.strm.next_out+=a,t.strm.avail_out-=a,t.strm.total_out+=a)}while(0===r);return o-=t.strm.avail_in,o&&(o>=t.w_size?(t.matches=2,t.window.set(t.strm.input.subarray(t.strm.next_in-t.w_size,t.strm.next_in),0),t.strstart=t.w_size,t.insert=t.strstart):(t.window_size-t.strstart<=o&&(t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,t.insert>t.strstart&&(t.insert=t.strstart)),t.window.set(t.strm.input.subarray(t.strm.next_in-o,t.strm.next_in),t.strstart),t.strstart+=o,t.insert+=o>t.w_size-t.insert?t.w_size-t.insert:o),t.block_start=t.strstart),t.high_water<t.strstart&&(t.high_water=t.strstart),r?4:e!==q&&e!==V&&0===t.strm.avail_in&&t.strstart===t.block_start?2:(n=t.window_size-t.strstart,t.strm.avail_in>n&&t.block_start>=t.w_size&&(t.block_start-=t.w_size,t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,n+=t.w_size,t.insert>t.strstart&&(t.insert=t.strstart)),n>t.strm.avail_in&&(n=t.strm.avail_in),n&&(Rt(t.strm,t.window,t.strstart,n),t.strstart+=n,t.insert+=n>t.w_size-t.insert?t.w_size-t.insert:n),t.high_water<t.strstart&&(t.high_water=t.strstart),n=t.bi_valid+42>>3,n=t.pending_buf_size-n>65535?65535:t.pending_buf_size-n,s=n>t.w_size?t.w_size:n,i=t.strstart-t.block_start,(i>=s||(i||e===V)&&e!==q&&0===t.strm.avail_in&&i<=n)&&(a=i>n?n:i,r=e===V&&0===t.strm.avail_in&&a===i?1:0,Y(t,t.block_start,a,r),t.block_start+=a,xt(t.strm)),r?3:1)},Dt=(t,e)=>{let a,i;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a)),t.match_length>=3)if(i=X(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=yt(t,t.ins_h,t.window[t.strstart+1]);else i=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2},Tt=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<ut){if(Ut(t),t.lookahead<ut&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ut&&(t.match_length=Zt(t,a),t.match_length<=5&&(t.strategy===rt||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=X(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=yt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(zt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=X(t,0,t.window[t.strstart-1]),i&&zt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=X(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2};function Ot(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const It=[new Ot(0,0,0,0,St),new Ot(4,4,8,4,Dt),new Ot(4,5,16,8,Dt),new Ot(4,6,32,32,Dt),new Ot(4,4,16,16,Tt),new Ot(8,16,32,32,Tt),new Ot(8,16,128,128,Tt),new Ot(8,32,128,256,Tt),new Ot(32,128,258,1024,Tt),new Ot(32,258,258,4096,Tt)];function Ft(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ft,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),kt(this.dyn_ltree),kt(this.dyn_dtree),kt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),kt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),kt(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Lt=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.status!==wt&&57!==e.status&&69!==e.status&&73!==e.status&&91!==e.status&&103!==e.status&&e.status!==mt&&e.status!==bt?1:0},Nt=t=>{if(Lt(t))return gt(t,at);t.total_in=t.total_out=0,t.data_type=_t;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=2===e.wrap?57:e.wrap?wt:mt,t.adler=2===e.wrap?0:1,e.last_flush=-2,P(e),tt},Bt=t=>{const e=Nt(t);var a;return e===tt&&((a=t.state).window_size=2*a.w_size,kt(a.head),a.max_lazy_match=It[a.level].max_lazy,a.good_match=It[a.level].good_length,a.nice_match=It[a.level].nice_length,a.max_chain_length=It[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ct=(t,e,a,i,n,s)=>{if(!t)return at;let r=1;if(e===st&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==ft||i<8||i>15||e<0||e>9||s<0||s>ht||8===i&&1!==r)return gt(t,at);8===i&&(i=9);const o=new Ft;return t.state=o,o.strm=t,o.status=wt,o.wrap=r,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.sym_buf=o.lit_bufsize,o.sym_end=3*(o.lit_bufsize-1),o.level=e,o.strategy=s,o.method=a,Bt(t)};var Mt={deflateInit:(t,e)=>Ct(t,e,ft,15,8,dt),deflateInit2:Ct,deflateReset:Bt,deflateResetKeep:Nt,deflateSetHeader:(t,e)=>Lt(t)||2!==t.state.wrap?at:(t.state.gzhead=e,tt),deflate:(t,e)=>{if(Lt(t)||e>$||e<0)return t?gt(t,at):at;const a=t.state;if(!t.output||0!==t.avail_in&&!t.input||a.status===bt&&e!==V)return gt(t,0===t.avail_out?nt:at);const i=a.last_flush;if(a.last_flush=e,0!==a.pending){if(xt(t),0===t.avail_out)return a.last_flush=-1,tt}else if(0===t.avail_in&&pt(e)<=pt(i)&&e!==V)return gt(t,nt);if(a.status===bt&&0!==t.avail_in)return gt(t,nt);if(a.status===wt&&0===a.wrap&&(a.status=mt),a.status===wt){let e=ft+(a.w_bits-8<<4)<<8,i=-1;if(i=a.strategy>=ot||a.level<2?0:a.level<6?1:6===a.level?2:3,e|=i<<6,0!==a.strstart&&(e|=32),e+=31-e%31,Et(a,e),0!==a.strstart&&(Et(a,t.adler>>>16),Et(a,65535&t.adler)),t.adler=1,a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(57===a.status)if(t.adler=0,At(a,31),At(a,139),At(a,8),a.gzhead)At(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),At(a,255&a.gzhead.time),At(a,a.gzhead.time>>8&255),At(a,a.gzhead.time>>16&255),At(a,a.gzhead.time>>24&255),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(At(a,255&a.gzhead.extra.length),At(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=H(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=69;else if(At(a,0),At(a,0),At(a,0),At(a,0),At(a,0),At(a,9===a.level?2:a.strategy>=ot||a.level<2?4:0),At(a,3),a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt;if(69===a.status){if(a.gzhead.extra){let e=a.pending,i=(65535&a.gzhead.extra.length)-a.gzindex;for(;a.pending+i>a.pending_buf_size;){let n=a.pending_buf_size-a.pending;if(a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex,a.gzindex+n),a.pending),a.pending=a.pending_buf_size,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex+=n,xt(t),0!==a.pending)return a.last_flush=-1,tt;e=0,i-=n}let n=new Uint8Array(a.gzhead.extra);a.pending_buf.set(n.subarray(a.gzindex,a.gzindex+i),a.pending),a.pending+=i,a.gzhead.hcrc&&a.pending>e&&(t.adler=H(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex=0}a.status=73}if(73===a.status){if(a.gzhead.name){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),a.gzindex=0}a.status=91}if(91===a.status){if(a.gzhead.comment){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i)),xt(t),0!==a.pending)return a.last_flush=-1,tt;i=0}e=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=H(t.adler,a.pending_buf,a.pending-i,i))}a.status=103}if(103===a.status){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size&&(xt(t),0!==a.pending))return a.last_flush=-1,tt;At(a,255&t.adler),At(a,t.adler>>8&255),t.adler=0}if(a.status=mt,xt(t),0!==a.pending)return a.last_flush=-1,tt}if(0!==t.avail_in||0!==a.lookahead||e!==q&&a.status!==bt){let i=0===a.level?St(a,e):a.strategy===ot?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Ut(t),0===t.lookahead)){if(e===q)return 1;break}if(t.match_length=0,a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):a.strategy===lt?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=ct){if(Ut(t),t.lookahead<=ct&&e===q)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+ct;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=ct-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=X(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(zt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(zt(t,!1),0===t.strm.avail_out)?1:2})(a,e):It[a.level].func(a,e);if(3!==i&&4!==i||(a.status=bt),1===i||3===i)return 0===t.avail_out&&(a.last_flush=-1),tt;if(2===i&&(e===J?W(a):e!==$&&(Y(a,0,0,!1),e===Q&&(kt(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),xt(t),0===t.avail_out))return a.last_flush=-1,tt}return e!==V?tt:a.wrap<=0?et:(2===a.wrap?(At(a,255&t.adler),At(a,t.adler>>8&255),At(a,t.adler>>16&255),At(a,t.adler>>24&255),At(a,255&t.total_in),At(a,t.total_in>>8&255),At(a,t.total_in>>16&255),At(a,t.total_in>>24&255)):(Et(a,t.adler>>>16),Et(a,65535&t.adler)),xt(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?tt:et)},deflateEnd:t=>{if(Lt(t))return at;const e=t.state.status;return t.state=null,e===mt?gt(t,it):tt},deflateSetDictionary:(t,e)=>{let a=e.length;if(Lt(t))return at;const i=t.state,n=i.wrap;if(2===n||1===n&&i.status!==wt||i.lookahead)return at;if(1===n&&(t.adler=C(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(kt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,o=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Ut(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=yt(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,Ut(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=o,t.avail_in=s,i.wrap=n,tt},deflateInfo:"pako deflate (from Nodeca project)"};const Ht=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var jt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Ht(a,e)&&(t[e]=a[e])}}return t},Kt=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Pt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Pt=!1}const Yt=new Uint8Array(256);for(let t=0;t<256;t++)Yt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Yt[254]=Yt[254]=1;var Gt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,o=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),o+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(o),s=0,n=0;s<o;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},Xt=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Yt[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Pt)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Wt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Yt[t[a]]>e?a:e};var qt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Jt=Object.prototype.toString,{Z_NO_FLUSH:Qt,Z_SYNC_FLUSH:Vt,Z_FULL_FLUSH:$t,Z_FINISH:te,Z_OK:ee,Z_STREAM_END:ae,Z_DEFAULT_COMPRESSION:ie,Z_DEFAULT_STRATEGY:ne,Z_DEFLATED:se}=K;function re(t){this.options=jt({level:ie,method:se,chunkSize:16384,windowBits:15,memLevel:8,strategy:ne},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=Mt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==ee)throw new Error(j[a]);if(e.header&&Mt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Gt(e.dictionary):"[object ArrayBuffer]"===Jt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Mt.deflateSetDictionary(this.strm,t),a!==ee)throw new Error(j[a]);this._dict_set=!0}}function oe(t,e){const a=new re(e);if(a.push(t,!0),a.err)throw a.msg||j[a.err];return a.result}re.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?te:Qt,"string"==typeof t?a.input=Gt(t):"[object ArrayBuffer]"===Jt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===Vt||s===$t)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=Mt.deflate(a,s),n===ae)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Mt.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===ee;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},re.prototype.onData=function(t){this.chunks.push(t)},re.prototype.onEnd=function(t){t===ee&&(this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var le={Deflate:re,deflate:oe,deflateRaw:function(t,e){return(e=e||{}).raw=!0,oe(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,oe(t,e)},constants:K};const he=16209;var de=function(t,e){let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),o=E.dmax,l=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,m=(1<<E.lenbits)-1,b=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=u[f&m];e:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,0===p)A[n++]=65535&g;else{if(!(16&p)){if(0==(64&p)){g=u[(65535&g)+(f&(1<<p)-1)];continue e}if(32&p){E.mode=16191;break t}t.msg="invalid literal/length code",E.mode=he;break t}k=65535&g,p&=15,p&&(c<p&&(f+=z[a++]<<c,c+=8),k+=f&(1<<p)-1,f>>>=p,c-=p),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=w[f&b];a:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,!(16&p)){if(0==(64&p)){g=w[(65535&g)+(f&(1<<p)-1)];continue a}t.msg="invalid distance code",E.mode=he;break t}if(v=65535&g,p&=15,c<p&&(f+=z[a++]<<c,c+=8,c<p&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<p)-1,v>o){t.msg="invalid distance too far back",E.mode=he;break t}if(f>>>=p,c-=p,p=n-s,v>p){if(p=v-p,p>h&&E.sane){t.msg="invalid distance too far back",E.mode=he;break t}if(y=0,x=_,0===d){if(y+=l-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}else if(d<p){if(y+=l+d-p,p-=d,p<k){k-=p;do{A[n++]=_[y++]}while(--p);if(y=0,d<k){p=d,k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}}else if(y+=d-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const _e=15,fe=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),ce=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),ue=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),we=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var me=(t,e,a,i,n,s,r,o)=>{const l=o.bits;let h,d,_,f,c,u,w=0,m=0,b=0,g=0,p=0,k=0,v=0,y=0,x=0,z=0,A=null;const E=new Uint16Array(16),R=new Uint16Array(16);let Z,U,S,D=null;for(w=0;w<=_e;w++)E[w]=0;for(m=0;m<i;m++)E[e[a+m]]++;for(p=l,g=_e;g>=1&&0===E[g];g--);if(p>g&&(p=g),0===g)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(b=1;b<g&&0===E[b];b++);for(p<b&&(p=b),y=1,w=1;w<=_e;w++)if(y<<=1,y-=E[w],y<0)return-1;if(y>0&&(0===t||1!==g))return-1;for(R[1]=0,w=1;w<_e;w++)R[w+1]=R[w]+E[w];for(m=0;m<i;m++)0!==e[a+m]&&(r[R[e[a+m]]++]=m);if(0===t?(A=D=r,u=20):1===t?(A=fe,D=ce,u=257):(A=ue,D=we,u=0),z=0,m=0,w=b,c=s,k=p,v=0,_=-1,x=1<<p,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){Z=w-v,r[m]+1<u?(U=0,S=r[m]):r[m]>=u?(U=D[r[m]-u],S=A[r[m]-u]):(U=96,S=0),h=1<<w-v,d=1<<k,b=d;do{d-=h,n[c+(z>>v)+d]=Z<<24|U<<16|S|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,m++,0==--E[w]){if(w===g)break;w=e[a+r[m]]}if(w>p&&(z&f)!==_){for(0===v&&(v=p),c+=b,k=w-v,y=1<<k;k+v<g&&(y-=E[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=p<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),o.bits=p,0};const{Z_FINISH:be,Z_BLOCK:ge,Z_TREES:pe,Z_OK:ke,Z_STREAM_END:ve,Z_NEED_DICT:ye,Z_STREAM_ERROR:xe,Z_DATA_ERROR:ze,Z_MEM_ERROR:Ae,Z_BUF_ERROR:Ee,Z_DEFLATED:Re}=K,Ze=16180,Ue=16190,Se=16191,De=16192,Te=16194,Oe=16199,Ie=16200,Fe=16206,Le=16209,Ne=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function Be(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const Ce=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.mode<Ze||e.mode>16211?1:0},Me=t=>{if(Ce(t))return xe;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=Ze,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,ke},He=t=>{if(Ce(t))return xe;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,Me(t)},je=(t,e)=>{let a;if(Ce(t))return xe;const i=t.state;return e<0?(a=0,e=-e):(a=5+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?xe:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,He(t))},Ke=(t,e)=>{if(!t)return xe;const a=new Be;t.state=a,a.strm=t,a.window=null,a.mode=Ze;const i=je(t,e);return i!==ke&&(t.state=null),i};let Pe,Ye,Ge=!0;const Xe=t=>{if(Ge){Pe=new Int32Array(512),Ye=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(me(1,t.lens,0,288,Pe,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;me(2,t.lens,0,32,Ye,0,t.work,{bits:5}),Ge=!1}t.lencode=Pe,t.lenbits=9,t.distcode=Ye,t.distbits=5},We=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var qe={inflateReset:He,inflateReset2:je,inflateResetKeep:Me,inflateInit:t=>Ke(t,15),inflateInit2:Ke,inflate:(t,e)=>{let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(Ce(t)||!t.output||!t.input&&0!==t.avail_in)return xe;a=t.state,a.mode===Se&&(a.mode=De),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,_=o,f=l,x=ke;t:for(;;)switch(a.mode){case Ze:if(0===a.wrap){a.mode=De;break}for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){0===a.wbits&&(a.wbits=15),a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0),h=0,d=0,a.mode=16181;break}if(a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=Le;break}if((15&h)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits&&(a.wbits=y),y>15||y>a.wbits){t.msg="invalid window size",a.mode=Le;break}a.dmax=1<<a.wbits,a.flags=0,t.adler=a.check=1,a.mode=512&h?16189:Se,h=0,d=0;break;case 16181:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==Re){t.msg="unknown compression method",a.mode=Le;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=Le;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16182;case 16182:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=H(a.check,A,4,0)),h=0,d=0,a.mode=16183;case 16183:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0,a.mode=16184;case 16184:if(1024&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=H(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=16185;case 16185:if(1024&a.flags&&(c=a.length,c>o&&(c=o),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=16186;case 16186:if(2048&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=16187;case 16187:if(4096&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=H(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=16188;case 16188:if(512&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=Le;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=Se;break;case 16189:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}t.adler=a.check=Ne(h),h=0,d=0,a.mode=Ue;case Ue:if(0===a.havedict)return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,ye;t.adler=a.check=1,a.mode=Se;case Se:if(e===ge||e===pe)break t;case De:if(a.last){h>>>=7&d,d-=7&d,a.mode=Fe;break}for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=16193;break;case 1:if(Xe(a),a.mode=Oe,e===pe){h>>>=2,d-=2;break t}break;case 2:a.mode=16196;break;case 3:t.msg="invalid block type",a.mode=Le}h>>>=2,d-=2;break;case 16193:for(h>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=Le;break}if(a.length=65535&h,h=0,d=0,a.mode=Te,e===pe)break t;case Te:a.mode=16195;case 16195:if(c=a.length,c){if(c>o&&(c=o),c>l&&(c=l),0===c)break t;n.set(i.subarray(s,s+c),r),o-=c,s+=c,l-=c,r+=c,a.length-=c;break}a.mode=Se;break;case 16196:for(;d<14;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=Le;break}a.have=0,a.mode=16197;case 16197:for(;a.have<a.ncode;){for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=me(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=Le;break}a.have=0,a.mode=16198;case 16198:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(g<16)h>>>=m,d-=m,a.lens[a.have++]=g;else{if(16===g){for(R=m+2;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(h>>>=m,d-=m,0===a.have){t.msg="invalid bit length repeat",a.mode=Le;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===g){for(R=m+3;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=m+7;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=Le;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===Le)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=Le;break}if(a.lenbits=9,E={bits:a.lenbits},x=me(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=Le;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=me(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=Le;break}if(a.mode=Oe,e===pe)break t;case Oe:a.mode=Ie;case Ie:if(o>=6&&l>=258){t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,de(t,f),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,a.mode===Se&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(b&&0==(240&b)){for(p=m,k=b,v=g;z=a.lencode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,a.length=g,0===b){a.mode=16205;break}if(32&b){a.back=-1,a.mode=Se;break}if(64&b){t.msg="invalid literal/length code",a.mode=Le;break}a.extra=15&b,a.mode=16201;case 16201:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=16202;case 16202:for(;z=a.distcode[h&(1<<a.distbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(0==(240&b)){for(p=m,k=b,v=g;z=a.distcode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,64&b){t.msg="invalid distance code",a.mode=Le;break}a.offset=g,a.extra=15&b,a.mode=16203;case 16203:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=Le;break}a.mode=16204;case 16204:if(0===l)break t;if(c=f-l,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=Le;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>l&&(c=l),l-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=Ie);break;case 16205:if(0===l)break t;n[r++]=a.length,l--,a.mode=Ie;break;case Fe:if(a.wrap){for(;d<32;){if(0===o)break t;o--,h|=i[s++]<<d,d+=8}if(f-=l,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,r-f):C(a.check,n,f,r-f)),f=l,4&a.wrap&&(a.flags?h:Ne(h))!==a.check){t.msg="incorrect data check",a.mode=Le;break}h=0,d=0}a.mode=16207;case 16207:if(a.wrap&&a.flags){for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=Le;break}h=0,d=0}a.mode=16208;case 16208:x=ve;break t;case Le:x=ze;break t;case 16210:return Ae;default:return xe}return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<Le&&(a.mode<Fe||e!==be))&&We(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?H(a.check,n,f,t.next_out-f):C(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(a.mode===Se?128:0)+(a.mode===Oe||a.mode===Te?256:0),(0===_&&0===f||e===be)&&x===ke&&(x=Ee),x},inflateEnd:t=>{if(Ce(t))return xe;let e=t.state;return e.window&&(e.window=null),t.state=null,ke},inflateGetHeader:(t,e)=>{if(Ce(t))return xe;const a=t.state;return 0==(2&a.wrap)?xe:(a.head=e,e.done=!1,ke)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return Ce(t)?xe:(i=t.state,0!==i.wrap&&i.mode!==Ue?xe:i.mode===Ue&&(n=1,n=C(n,e,a,0),n!==i.check)?ze:(s=We(t,e,a,a),s?(i.mode=16210,Ae):(i.havedict=1,ke)))},inflateInfo:"pako inflate (from Nodeca project)"};var Je=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const Qe=Object.prototype.toString,{Z_NO_FLUSH:Ve,Z_FINISH:$e,Z_OK:ta,Z_STREAM_END:ea,Z_NEED_DICT:aa,Z_STREAM_ERROR:ia,Z_DATA_ERROR:na,Z_MEM_ERROR:sa}=K;function ra(t){this.options=jt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new qt,this.strm.avail_out=0;let a=qe.inflateInit2(this.strm,e.windowBits);if(a!==ta)throw new Error(j[a]);if(this.header=new Je,qe.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=Gt(e.dictionary):"[object ArrayBuffer]"===Qe.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=qe.inflateSetDictionary(this.strm,e.dictionary),a!==ta)))throw new Error(j[a])}function oa(t,e){const a=new ra(e);if(a.push(t),a.err)throw a.msg||j[a.err];return a.result}ra.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,o;if(this.ended)return!1;for(r=e===~~e?e:!0===e?$e:Ve,"[object ArrayBuffer]"===Qe.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=qe.inflate(a,r),s===aa&&n&&(s=qe.inflateSetDictionary(a,n),s===ta?s=qe.inflate(a,r):s===na&&(s=aa));a.avail_in>0&&s===ea&&a.state.wrap>0&&0!==t[a.next_in];)qe.inflateReset(a),s=qe.inflate(a,r);switch(s){case ia:case na:case aa:case sa:return this.onEnd(s),this.ended=!0,!1}if(o=a.avail_out,a.next_out&&(0===a.avail_out||s===ea))if("string"===this.options.to){let t=Wt(a.output,a.next_out),e=a.next_out-t,n=Xt(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==ta||0!==o){if(s===ea)return s=qe.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},ra.prototype.onData=function(t){this.chunks.push(t)},ra.prototype.onEnd=function(t){t===ta&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Kt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var la={Inflate:ra,inflate:oa,inflateRaw:function(t,e){return(e=e||{}).raw=!0,oa(t,e)},ungzip:oa,constants:K};const{Deflate:ha,deflate:da,deflateRaw:_a,gzip:fa}=le,{Inflate:ca,inflate:ua,inflateRaw:wa,ungzip:ma}=la;var ba=ha,ga=da,pa=_a,ka=fa,va=ca,ya=ua,xa=wa,za=ma,Aa=K,Ea={Deflate:ba,deflate:ga,deflateRaw:pa,gzip:ka,Inflate:va,inflate:ya,inflateRaw:xa,ungzip:za,constants:Aa};t.Deflate=ba,t.Inflate=va,t.constants=Aa,t.default=Ea,t.deflate=ga,t.deflateRaw=pa,t.gzip=ka,t.inflate=ya,t.inflateRaw=xa,t.ungzip=za,Object.defineProperty(t,"__esModule",{value:!0})}));

async function getBruteFromRumble(level,rank){
	await getRumble(level)
	return rumble[rank-1]
}

async function getRumble(level) {
	if(rumble?.[0]?.level==level) return
	//cl("dl rumble...")
    rumble = await fetch(BRUTALISATOR+"rumble/"+level+".json.js");
	rumble=await rumble.text()
	//cl("unzip...")
	rumble = unzipString(rumble);
	cl(rumble,rumble.length)
	if(true){cl("remove scrapped");rumble = rumble.filter(item => !("scrapped" in item))}
	cl(rumble,rumble.length)
	
	return rumble
}

var rumble


var url
function parseURL(){
url=window.location.href.split("?")[0].split("/")
url.shift()
url.shift()
if(url[url.length-1] == ""){url.pop();}

if(url.length>2 && url[2] == "fight"){FIGHT_TYPE = "fight"}
if(url.length>6 && url[4] == "war" && url[6] == "fight"){FIGHT_TYPE = "war"}
}
var FIGHT_TYPE


var BRUTE
var CLAN
var WAR
var RANKING

var MODIFIERS
var arenaRunning
var arenaBruteAc

var arenaInt
clearInterval(arenaInt);
if(typeof(window)!="undefined"){
	arenaInt = setInterval(function(){parseURL();
if(url.length==3 && url[2]=="arena"){BRUTE = url[1];if(!arenaRunning && arenaBruteAc==BRUTE){arena()}}else{arenaRunning=false}
},166)
}

var WANTS_BACKUP
var brutesNames
var brutesDivs
var arena_turns = 0

async function arena(backups){arenaRunning=true;resetBruteModifAc()
if(arenaBruteAc!=BRUTE){WANTS_BACKUP = false}
if($(".bruteArenaBtn").length>0){WANTS_BACKUP=true;if(!backups){$(".bruteArenaBtn").remove()}}
arenaBruteAc = BRUTE


	
	function makeInfoDiv(name){
		var res={div:div({3:"bruteArenaBtn",18:0.92,9:{position:"relative",height:"30px"}})}
		
		
		
		
		var btn=res.btn=div({0:res.div,4:1,5:[-50,-60],20:"Visiter la cellule",6:{click:function(){openBruteCell(name)}},2:"button",9:{
display: "block",
    margin: "8px auto",
    "border-radius": "4px",
    "border-width": "1px",
    "border-style": "solid",
    "border-image": "initial",
    "border-color": "rgb(55, 1, 0) rgb(115, 61, 44) rgb(115, 61, 44)",
    "background-color": palette(0.66),
    color: "rgb(255, 255, 255)",
    padding: "4px 8px",
    cursor: "pointer",
    "text-transform": "uppercase",
    "font-family": "LaBrute",
    "font-size": "1rem",
			opacity:0.2,

    "box-shadow": "rgba(0, 0, 0, 0.3) 2px 3px",
    transition: "box-shadow 0.1s, top 0.1s, perspective 0.1s",
    perspective: "20px",
    "transform-style": "preserve-3d",
    "z-index": 1}})
	
	res.before=div({0:btn,9:{
        'position': 'absolute',
        'top': '-8px',
        'left': '2.5%',
        'width': '95%',
        'height': '8px',
        'background-color': beforePalette(0.66),
		opacity:0.2,
        'transform': 'rotateX(20deg) translateZ(-1px)',
        'z-index': '-1',
        'transition': 'height 0.1s, top 0.1s'}})
res.tx=div({0:btn,26:1})

		
		
		return res}
	
		var searchString = "Niveau";  // Remplace "chaine" par la chaîne à rechercher
var elements = $("p").filter(function() {
    return $(this).text().startsWith(searchString);
});

brutesNames = [BRUTE]
brutesDivs={}

elements.each(function() {
	var name = $(this).parent().children(":first").text()
	brutesNames.push(name)
	brutesDivs[name] = makeInfoDiv(name)
brutesDivs[name].div.insertAfter($(this).parent().parent())
$(this).parent().parent().parent().css({display: "flex",
    "flex-direction": "column",
    "align-content": "space-around",
    "flex-wrap": "wrap"})
brutesDivs[name].tx.text("...")
});

if(brutesNames.length<7){arenaRunning=false;return}//DOM exists


if(!MODIFIERS){MODIFIERS=[];$("p").each(function(){if(MODIFIERS.length>0){return}
	if($(this).text().indexOf("Modificateurs actifs")!=-1){for(var i in FightModifier){if($(this).parent().parent().text().indexOf(FightModifier[i])!=-1){MODIFIERS.push(FightModifier[i])}}}
});if(false/*test_purpose*/){MODIFIERS=[]};cl("FIGHT MODIFIERS : ",MODIFIERS)}

var  brutes = await getAllBrutes(brutesNames)

var imged=true


var rota2 = [[brutes[0]]]
var rota1 = [] ; for(var b=1;b<brutes.length;b++) rota1.push([brutes[b]])

				simulFights({
					fn:function(res,ended){stopLoading();
					
					if(imged){imged=false
					if(Math.random()*60<1){setImageSrc(img_arbitre,img_lapin)}
else if(Math.random()*22<1){setImageSrc(img_arbitre,img_mains)}
else if(Math.random()*22<1){setImageSrc(img_arbitre,img_voyante)}
else if(Math.random()*2<1){setImageSrc(img_ours,img_ours1)}
else{setImageSrc(img_ours,img_ours2)}

					}
					var nombres = {},flag=true,precision=0
					while(flag && precision<4){flag=false;for(var b of res){
						arena_turns=b.j
						var coef=1-b.v/b.j
						var tx = (coef*100).toFixed(precision)+""
						
						if(coef!=0 && coef!=1 && (tx in nombres)){flag=true}
						nombres[tx] = (nombres[tx] || 0) + 1
						if(precision>0 && nombres[(coef*100).toFixed(precision-1)+""]==1) {continue}
						if(tx.startsWith("100")){tx="100"}
						else if(tx == "0.0"){tx="0"}
						brutesDivs[b.nom].tx.text(tx)
						brutesDivs[b.nom].before.css({opacity:1,"background-color":beforePalette(coef)})
						brutesDivs[b.nom].btn.css({opacity:1,"background-color":palette(coef)})
						};precision++}
					
					},
					rota1:rota1,
					rota2:rota2,//number = boss
					backups:backups?backups:false,
					fight_per_rota:200,
					fight_total:10000,
					return_first_win:undefined,
					loading:false,
					modifiers:MODIFIERS
					})
		if(!backups && WANTS_BACKUP){
						for(var i in brutes){if(i=="0"){continue}
							div({0:div({0:brutesDivs[brutes[i].name].div,4:[50,"","",70],5:[-40,-40],3:"pointbackup",18:0.9}),
								17:"...",24:"30px"})
							
						}
						var userIds = [];for(var b of brutes){userIds.push(b.userId)}
						var users = await getAllProfiles(userIds)
						for(var i in brutesDivs){if(brutesDivs[i].length==0){return}}
						var renforts = {}
						for(var i=0;i<users.length;i++){var user=users[i];renforts[userIds[i]] = [];
							for(var brute of user.brutes){if(parseInt(brute.level)<parseInt(brutes[i].level) && (brute.skills.includes("backup"))){
								renforts[userIds[i]].push(brute)
						}}}
						cl("renforts :",renforts)
						$(".pointbackup").remove()
						for(var i in userIds){if(i=="0"){continue};var userId=userIds[i]
							if(renforts[userId].length>0){
								div({0:div({0:brutesDivs[brutes[i].name].div,4:[50,"","",70],5:[-40,-27],3:"renfort",15:0,6:{click:async function(){startLoading()
								for(var d in brutesDivs){if(brutesDivs[d].div.find('.renfort').length==0){brutesDivs[d].div.remove()}else{brutesDivs[d].div.css("opacity",0.66)}}
								for(var r in renforts){for(var n in renforts[r]){renforts[r][n] = await getBrute(renforts[r][n].name)}}
								$(".renfort").remove()
								$(".norenfort").remove()
								arena(renforts)
								}}}),
								2:"img",22:"/images/skills/backup.svg",18:0.87,20:"Prendre en compte",9:{height:"30px",'filter': 'hue-rotate(' + "-60" + 'deg)'}})
							}
							else{
								div({0:div({0:brutesDivs[brutes[i].name].div,4:[50,"","",70],5:[-40,-40],3:"norenfort",18:0.73,15:"default"}),
								17:"✅",24:"30px"})
							
							}
						}
					}
	
}
	  
	  
	  
var LOCAL
var fightToVizualise
var fightSourceCode

async function getFightSourceCode(){if(!fightSourceCode){
	
	const response = await fetch(FIGHT_EXAMPLE, {cache: "no-store"});
    fightSourceCode = await response.text();
}
}
var iframe
async function visualizeFight(fight){fightToVizualise = fight;cl(fight,JSON.stringify(fight));if(LOCAL){return}
			await getFightSourceCode()
			    var fetchCode=`
				var originalFetch=window.fetch;
				window.fetch = async function(url, options) {
        //console.log("Intercepted fetch call to:" +url);
        
        // Appeler le fetch original
        const response = await originalFetch(url, options);
        
        // Modifier la réponse (ici, on parse du JSON pour l'exemple)
        const data = await response.json();
        //console.log('Original data:', data);
        
        // Exemple de modification des données
        //data.modified = true;
		if(data.winner && data.loser && data.steps && data.fighters){
			data.winner = fightToVizualise.winner
			data.loser = fightToVizualise.loser
			data.steps = fightToVizualise.steps
			data.fighters = fightToVizualise.fighters
			data.brute1Id = fightToVizualise.brute1.connect.id
			data.brute2Id = fightToVizualise.brute2.connect.id
			
		}
        // Retourner une nouvelle réponse modifiée
        return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        });
    };`
				if(iframe){$(iframe).remove()}
				 iframe = document.createElement('iframe');
							iframe.src = 'about:blank'; 

			iframe.onload = () => {//cl("IFRAME LOADED")
					const iframeWindow = iframe.contentWindow;
				iframeWindow.document.addEventListener('mousedown', function(){$(iframe).remove();}, false);
			}
			
			var codeSource = fightSourceCode.replace("<script","<script>history.pushState(null, '', '"+FIGHT_EXAMPLE+"');"+fetchCode+"var fightToVizualise = "
			+JSON.stringify(fightToVizualise)+";"+"<"+"/sc"+"ript>"+"<s"+"cript")
cl("SOUCEE CODE",codeSource)
			document.body.appendChild(iframe);
			$(iframe).css({"position":"absolute",top:0,bottom:0,left:0,right:0,"z-index":50000,width:"99.5%",height:"100%"})
			var iframeDoc = iframe.contentWindow.document;

			iframeDoc.open();
			
			iframeDoc.write(codeSource);
			iframeDoc.close();
	stopLoading()
    // Injecter le code dans l'iframe pour surcharger fetch

};

function findFirstParentDiv(element) {
  let parent = element.parentElement;
  
  while (parent) {
    if (parent.tagName.toLowerCase() === 'div') {
      return parent;
    }
    parent = parent.parentElement;
  }
  
  return null; // Si aucun parent  n'est trouvé
}

function insertDivAfterElement(newDiv,referenceDiv) {
  if (referenceDiv) {

    // Insérer la nouvelle div juste après la div parent trouvée
    referenceDiv.insertAdjacentElement('afterend', newDiv);
  }
}
var getRandomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};
function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}

async function getBrute(name) {
	if(name.includes("-"))name=name.toLowerCase()
    const response = await fetch(`/api/brute/${name}/for-hook?`);
    const html = await response.text();
    return JSON.parse(html);
}

async function getAllBrutes(names) {
    const results = await Promise.all(
        names.map(name => getBrute(name))
    );
    return results; // Tableau de résultats HTML correspondant à chaque nom
}
async function getProfile(userId) {
    const response = await fetch("/api/user/"+userId+"/profile");
    const html = await response.text();
    return JSON.parse(html);
}

async function getAllProfiles(names) {
    const results = await Promise.all(
        names.map(name => getProfile(name))
    );
    return results; // Tableau de résultats HTML correspondant à chaque nom
}


var textBoxCSS
var baseCSS
var shurikenDIV
var SOMBRE
if(typeof(document)!="undefined"){
	

var urlennemy=window.location.href.split("?")
if(urlennemy.length>1){urlennemy=urlennemy[1];if(urlennemy.includes("puissance=")){ENNEMY = urlennemy.split("puissance=")[1].split("&")[0]}}
var urlennemy_reversed=window.location.href.split("?")
if(urlennemy_reversed.length>1){urlennemy_reversed=urlennemy_reversed[1];if(urlennemy_reversed.includes("puissance_reversed=")){ENNEMY_REVERSED = urlennemy_reversed.split("puissance_reversed=")[1].split("&")[0]}}

LOCAL = window.location.href.startsWith("file:")
	
	addStyle(`		#shuriken {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:300000000;
}

#shuriken-image {
  animation: organic-rotation 4s infinite;
}

@keyframes organic-rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1800deg);
  }
}

#shuriken-image {
  animation-timing-function: cubic-bezier(0.42, 0.2, 0.44, 0.8); /* Courbe personnalisée */
}
	`)
$("#shuriken").remove()
shurikenDIV = div({0:body,1:"shuriken",9:{position:"fixed",top:"33px",right:"33px"}})
div({0:shurikenDIV,2:"img",22:SHURIKEN,1:"shuriken-image",9:{height:"133px",}})
  baseCSS= {	"font-family": "Roboto, Helvetica, Arial, sans-serif",
    "font-weight": "400",
    "font-size": "1rem",
    "line-height": "1.5",
    "letter-spacing": "0.00938em",
}

if(SOMBRE===undefined && $("#root").length)SOMBRE = !($("#root").css("background").includes("linear-gradient(rgb(247, 225, 183) 0%, rgb(235, 173, 112) 160px)"))

if(SOMBRE){
textBoxCSS = {color: "#E8EDE8",
    "box-shadow": "rgb(159, 168, 218) 0px 0px 0px 1px, rgb(121, 134, 203) 0px 0px 1px 4.5px, rgb(63, 81, 181) 0px 0px 0px 6px, rgb(40, 53, 147) 3px 3px 0px 6px",
    "background-color": "rgb(20, 30, 41)",
    "border-radius": "5px",
    margin: "16px 8px",
padding: "0px"}
	
}else{
textBoxCSS = {color: "rgb(176, 107, 79)",
    "box-shadow": "rgb(222, 195, 127) 0px 0px 0px 1px, rgb(246, 238, 144) 0px 0px 1px 4.5px, rgb(114, 82, 84) 0px 0px 0px 6px, rgb(188, 123, 74) 3px 3px 0px 6px",
    "background-color": "rgb(251, 242, 175)",
    "border-radius": "5px",
    margin: "16px 8px",
padding: "0px"}
}

}

function getBoosters(){return skills.reduce((acc, obj) => {if(obj.type=="booster"){acc.push(obj.name)};return acc;}, [])}



function stopLoading(){$(shurikenDIV).css("display","none")}
function startLoading(){$(shurikenDIV).css("display","")}

var BRUTALISATOR = "https://raw.githubusercontent.com/Ambryal/BRUTALISATOR/"+BRANCHE+"/";



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

addStyle(`#table-wrapper {
  display: grid;
  grid-template-columns: auto 1fr; /* La première colonne pour le side-column, la deuxième pour le tableau */
}

#side-column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
    height:"100%";

}

#side-column .side-cell {
  justify-content: center;
  align-items: center;
  line-wrap:pre;
  display: flex;
}

#table-container {
  display: grid;
    width: 100%;
  height: 100%;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}	


#master-container {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 0.4fr)); /* Divise en colonnes automatiques */
  grid-auto-rows: 0.4fr; /* Les lignes ont une hauteur flexible */
  gap: 5px; /* Espace entre les divs */
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden; /* Pas de débordement */
}

.master-grid-item {
cursor:pointer;
  border-radius:50px;
  border:1px solid #C49069;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}`)


var PRESET = [
	//[1,"00000003030303031301020204020312","10001210601","heheheha",""],
	"eJyLNtRRMjABQzMYNLQEQwMQNjA1MFHSUTI0BDINDKE8X3dX3aD80uLi1OCy1JySVKBQRioYJirFAgDbpxRO",
	"eJyLNtBRMkAHpqhQSUfJ0MDQ0NjIwNDIwADI83V31XUxKfLWdTZJdgTyM1LBMFEpFgB4ghGf",
	"eJyLNtBRMjABQ2MYNDQwNDI0NzAztDS0BJKmSkAlhoaGSSaGhkYGJkCer7urblRmVX4pkK0UCwDMIQ5u",
	"eJyLNtRRMjAGQyM4NDYwBUIjMGliaKkEVAIEpoaGBsZGJkCeZ1FuIpByLMrNLDNUigUA1BEOvQ==",
	"eJyLNtRRMjAEQ3M4NDa0NLQ0sACSBiCWko6SoaGBgYmxoYGZgQmQ55yRWlaUX5KZlwrkBOSXJqXm5CQWK8UCAIElEvA=",
	"eJyLNtBRMjBFhYaWIGgAwmC2ElCJgYGxsbGBoZmhCZDnk5hbkJmfB2SFpOalJhWl6vonFSeXFqUqxQIAuWUT1Q==",
	"eJyLNtBRMjAGQxM4tDAwMLQwNDMwMbQ0tDQwUNJRMjQECgMJAyMjIM8xLyW/NDMnJxXI9nV31XXKT1OKBQA8uxDM",//"eJyLNtBRMjAGQxM4NDC0BEIzMAmESjpKhgZAYAgkjQyAPMe8lPzSzJycVCDb191V1yk/TSkWAD8FENg=",
	"eJyLNtBRMjABQ2MYNLQ0MDUwNTQ1gEIlHSVDA0OzJCBhYmAA5Lkml+QX5CQW56YCOb7urrrFBZlFmSVOPo7O3kqxAPLSFE0=",
	"eJyLNtBRMjABQ2M4NDM0MjAHkiYGRoZGhgZKQCWGhsamRoaGhkbGQJ5vfl5JanFhaWZqKZDnk1hUlJ+nFAsAVl0SFg==",// Spinoza "eJyLNtBRMjABQ2MYNLQEQQMzIDYCsZSASgwNjU2NDA0MjQyAvOCCzLz8qkQgyyexqCg/TykWABCGEHo=",
	"eJyLNtRRMjAEQ1M4NDMwNzQwMDO0MDAxsDAwUAIrMTA2NjAwNDIG8nxTixPz0lOBrOTSTCAqyCzJLE8szleKBQCfRxO+",
]
var PRESAC

for(var i in PRESET){if(typeof(PRESET[i])==typeof("")){PRESET[i]=unzipString(PRESET[i])}}
cl("presets :",PRESET)

var getChoosedBody = function(gender){cl("BODY CALLED"); setGender(gender);var res = generateBodyString(BODY);
if(PRESAC && ["male","female"][PRESAC[0]]==GENDER){res = PRESAC[2]};if(BRANCHE!="dev")checkBody("Ambryal",GENDER,res);return res}



var getChoosedColors = function(gender) {cl("COLOR CALLED"); setGender(gender);
    const col0 = COLORS[0];
    const col0a = col0;
    const col0c = col0;
    const col1 = COLORS[1];
    const col1a = col1;
    const col1b = col1;
    const col1c = col1;
    const col1d = col1;
    const col3 = COLORS[2];
    const col2 = COLORS[3];
    const col2b = COLORS[4];
    const col3b = COLORS[5];
    const col2a = COLORS[6];
    const col4 = COLORS[7];
    const col4a = COLORS[8];
    const col4b = COLORS[9];
    var res =  generateColorString({
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
	if(PRESAC && ["male","female"][PRESAC[0]]==GENDER){res = PRESAC[1]}
	if(ILLEGAL_COLORS)res = ILLEGAL_COLORS
	if(BRANCHE!="dev")checkColors("Ambryal",GENDER,res)
	return res
};

function makeRandomColors(){COLORS = [];for(var i of COLOR_TYPES){COLORS.push(randomBetween(0, colors[GENDER][i].length - 1))}}
function makeRandomBody(){BODY = {
    p2: randomBetween(0, availableBodyParts[GENDER].p2),
    p3: randomBetween(0, availableBodyParts[GENDER].p3),
    p4: randomBetween(0, availableBodyParts[GENDER].p4),
    p7: randomBetween(0, availableBodyParts[GENDER].p7),
    p1: randomBetween(0, availableBodyParts[GENDER].p1),
    p1a: randomBetween(0, availableBodyParts[GENDER].p1a),
    p1b: randomBetween(0, availableBodyParts[GENDER].p1b),
    p6: randomBetween(0, availableBodyParts[GENDER].p6),
    p8: randomBetween(0, availableBodyParts[GENDER].p8),
    p7b: randomBetween(0, availableBodyParts[GENDER].p7b),
    p5: randomBetween(0, availableBodyParts[GENDER].p5),
}}


var number_as_emoji=["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟","⏸️","12","13","14","15","16","17","18","19","20","21","22"]

var GENDER = "male"
var GENDER_BODY={}
var GENDER_COLORS={}
var COLOR_TYPES = ["skin","hair","clothing","clothing","clothing","clothing","clothing","clothing","clothing","clothing"]
var COLORS = [];makeRandomColors();
var BODY = {};makeRandomBody();

var MODIFIED = false

function setGender(gender){if(GENDER!=gender){if(MODIFIED){MODIFIED=false;GENDER_BODY[GENDER] = BODY;GENDER_COLORS[GENDER] = COLORS;}
GENDER = gender;if(!(gender in GENDER_BODY)){makeRandomColors();makeRandomBody()}
else{BODY = GENDER_BODY[gender];COLORS = GENDER_COLORS[gender]}};createTable()}


function createCell(cell,i,j,l){
	
	if(BRANCHE!="dev" && j>=l[3])return
	
	$(cell).css({cursor:"pointer"})

	if(l[0]=="color"){
		
		if(j<l[3])$(cell).css("background-color",colors[GENDER][l[2]][j])
		$(cell).on("click",function(){COLORS[l[1]]=j;clickOnRandomColors()
		;
})
		if(COLORS[l[1]]==j){$(cell).css({border:"4px solid #0000ff"})}
		
	}
	else{
		cell.textContent = (BODY[l[1]]==j)?"✅":(j>20?j:number_as_emoji[j]);
		
		$(cell).on("click",function(){BODY[l[1]]=j;clickOnRandomBody()
		})
	}

}

function clickOnRandomColors(){
	
MODIFIED=true;
		var element=document.querySelector('[aria-label="Changer les couleurs"]')
		element.click();

}

function clickOnRandomBody(once){
	
MODIFIED=true;
		var element=document.querySelector('[aria-label="Changer l\'apparence"]')
		element.click();if(!once){setTimeout(function(){element.click();},80);}

	
}

$("#customDIV").remove()
var customDIV = div({1:"customDIV",13:5000000,0:body,26:1,4:[0,0,0,50],9:uni([{ "font-size":"0.821429rem"},
			textBoxCSS,baseCSS])})
$("#masterDIV").remove()
var masterDIV = div({1:"masterDIV",13:5000000,0:body,26:1,4:[3,55,75,3],9:uni([{ "font-size":"0.821429rem"},
			textBoxCSS,baseCSS])})

div({0:masterDIV,4:[15,"","",25],5:0,17:"<b><u>Master</u></b>",24:30,18:0.73})
var masterInput = div({0:masterDIV,4:[16,"","",70],9:{"font-family":"inherit",color:"inherit",border:"1px solid #BAB68F"},24:20,5:0,2:"input",19:15,10:SOMBRE?"#202934":"#FBF7C1",
6:{"change":function(){if(masterInput.val().startsWith("$")){ILLEGAL_COLORS=masterInput.val().split("$")[1];clickOnRandomColors()}else{MASTER = masterInput.val()}}}})
masterInput.val(MASTER)
$("#palette").remove()
div({15:0,6:{click:function(){makeRandomColors();clickOnRandomColors()}},1:"palette",13:5000000,0:body,26:1,4:[27,"","",43],17:"🎨",24:66,9:uni([{ "font-size":"0.821429rem"},
			textBoxCSS,baseCSS])})
			
$("#randomBody").remove()
div({18:0.6,17:"🎲",0:div({15:0,6:{click:function(){makeRandomBody();clickOnRandomBody()}},1:"randomBody",13:5000000,0:body,26:1,4:[27,"","",36],24:66,9:uni([{ "font-size":"0.821429rem"},
textBoxCSS,baseCSS])})})

$("#preset").remove()
var presetDIV=div({1:"preset",50:0,13:5000000,0:body,26:1,4:[27,86,"",2],24:18,9:uni([{ "font-size":"0.821429rem"},
textBoxCSS,baseCSS])})
div({0:presetDIV,17:"📋",24:30,15:0,6:{click:function(){cl(getChoosedColors(GENDER),getChoosedBody(GENDER))
	copyToClipboard(zipString([GENDER=="male"?0:1,getChoosedColors(GENDER),getChoosedBody(GENDER),$('input[aria-invalid="false"]').val(),MASTER]));}}})
for(var p of PRESET){makePresetDiv(p)}


function makePresetDiv(l){cl("lol");div({15:0,17:l[3],0:presetDIV,6:{click:function(){
	PRESAC=l;
	copyToClipboard(PRESAC[3])
	setTimeout(function(){
	clickOnRandomBody(["male","female"][PRESAC[0]]!=GENDER);
	if(!l[4].length){return};masterInput.val(l[4]);masterInput.trigger("change");},100)}}})}

function blink(){var l={c:0.66,i:66,o:233};div({4:0,10:"#0000ff",18:0.6,13:d32-3}).fadeOut(0).fadeIn(l.i).fadeOut(l.o,function(){$(this).remove()})}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Texte copié dans le presse-papiers :', text);
    }).catch(function(err) {
        console.error('Erreur lors de la copie :', err);
    });
	blink()
}			
function createDynamicDivs() {
	div({0:masterDIV,1:"master-container",4:[33,0,0,0]})
    const container = document.getElementById('master-container');
    
    // Efface le contenu précédent
    container.innerHTML = '';
    
    // Ajoute des divs dynamiquement
    for (var master of MASTERS) {
        var div_elem = document.createElement('div');
		$(div_elem).on("click",function(){masterInput.val($(this).text());masterInput.trigger("change");})
        div_elem.classList.add('master-grid-item');
        div_elem.textContent = master;
        container.appendChild(div_elem);
    }
}
createDynamicDivs()

function createTable() {


	$("#table-wrapper").remove()
	var wraper = div({0:customDIV,1:"table-wrapper",4:[2,0,10,1]})
	div({1:"side-column",0:wraper})
	div({1:"table-container",0:wraper})
	
	
    var container = document.getElementById('table-container');
	var sideColumn = document.getElementById('side-column');
    
	var Grid = []
	var colorINDEX = 0
	for(var i in availableBodyParts[GENDER]){
	
		var bodyPartCount = availableBodyParts[GENDER][i]+1
		var bodyPart = bodyParts[i]
		var color_type = COLOR_TYPES[colorINDEX]
		//if(bodyPart.name[GENDER]=="Nothing"){colorINDEX++;continue;}
		Grid.push(["bodyPart",i,bodyPart.name[GENDER],bodyPartCount])
		if(color_type == bodyPart.type){
			Grid.push(["color",colorINDEX,color_type,colors[GENDER][color_type].length])
			colorINDEX++
		}
		
		
	}
	
	var n=0;//columns
	var m=Grid.length//lines
	
    

	
	
	
	
	for(var el of Grid){if(el[3]>n){n=el[3]}}
	if(BRANCHE=="dev")n+=2
	cl(n,m)
	
    // Ajoute les cellules de la colonne latérale
    for (let i = 0; i < m; i++) {
        const sideCell = document.createElement('div');
        sideCell.classList.add('side-cell');
		$(sideCell).css("height",(100/m)+"%")
        sideCell.textContent = Grid[i][0]=="bodyPart"?Grid[i][2]:""
        sideColumn.appendChild(sideCell);
    }
	
	
    // Définit les colonnes et les rangées dans la grille
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${m}, 1fr)`;
    
    // Crée les cellules
    for (let i = 0; i < n * m; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
		var line = Math.floor(i / n) 
		var column = (i % n)
		if(BRANCHE=="dev" && column==n-2){column=88}else if(BRANCHE=="dev" && column==n-1){column=99}
        createCell(cell,line,column,Grid[line])
        container.appendChild(cell);
    }
	stopLoading()
	
}

createTable();






    var originalFetch = window.fetch;

    window.fetch = function(url, options) {
        if (options && options.method === 'POST') {
            console.log('Intercepted POST request:', {
                url: url,
                body: options.body,
				options:options
            });
			if(url=="/api/brute/create?") {options.body = 
			options.body.replace('"master":null',(MASTER=="")?'"master":null':'"master":"'+MASTER+'"')
				.replace('"event":null',(ROYALE=="")?'"event":null':'"event":"'+ROYALE+'"')
			}
			return originalFetch.apply(this, [url,options]);
			
			if(false)return originalFetch.apply(this, arguments);
        }
        else {
            console.log('Intercepted GET request:', {
                url: url,
                options: options
            });
			return originalFetch.apply(this, arguments);
        }
        
    };

