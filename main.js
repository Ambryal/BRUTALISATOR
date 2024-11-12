
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



var MOLIEREID = "4c007438-9aa0-419e-af73-d82f8dc39eae"


//---------------------------------------------------
var FIGHT_EXAMPLE = "https://br"+"ute.et"+"erna"+"ltwi"+"n.org/meuhm"+"euh/fight/8e54a9ab-76b3-4562-a0f8-78722085584e"

var img_mains = "data:image/jpg;base64,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"
var img_lapin = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBmRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAMAAAExAAIAAAAQAAAATgAAAAAAAJOjAAAD6AAAk6MAAAPocGFpbnQubmV0IDUuMC42AP/bAEMAAgEBAQEBAgEBAQICAgICBAMCAgICBQQEAwQGBQYGBgUGBgYHCQgGBwkHBgYICwgJCgoKCgoGCAsMCwoMCQoKCv/bAEMBAgICAgICBQMDBQoHBgcKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCv/AABEIAPUA1AMBEgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP3Ior8PPcCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACi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Ny6ppt4LjTZLj4L69EvnICChaS0ACOjNGW6YbIPFfCceZPkmbQ+vYGvT9sviXNFcy+/c/of6OnidxTwPiI5DnmHqPBTfuycW/ZSf/tj69nr3PMvh3atr37Q+say8e6Hw74ZgsoZOwnupGllX6hIof++vevZfgJ+wH/wUBt/D+pa7H+wl8RJtW8Qa5NeXVpcx6fp7RR8RQIzX13AvywxpnnAJaq8PJZLkeCliMXiIRqS6OSul95x/SY4gz3j3iCnl2U0ZVMNSs+ZL3ZSt0e2mvzMXxBoOk+KNFuvDuvWguLO8hMU8ZOMqe4I6EHBBHIIBFfWHwg/4IwftzfEm5huvibfeDvhjpckatJ9svm1zVomzyhtbXy7UZHRxePg8lGAwfssdxxwjGk4VaymnuknK/lt18z+ecr8PeOKGJjXoR9lKLTUudJp91Zt6eSPif9mbQ/iHov7Y/hH4c6NFeah4p167sbbwrdW1u7NfT2l6k0FwQgIVoVeSWdsYRIHlO1Adv7rfsgf8E7v2dv2NDN4g8Cabfa14svLV7W/8a+JJkn1CS3aQSG3j2IkVtDlY8xwogfyYzIZHQPX5RieJsoy+piI5PRahWi4yU7cqb6xWtt9np9x/QmLfEHFOXYGPE1ZVa+ElenUhdScbL3ZyfxapapJ2vrrc92or8/PUCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAP/2Q=="
var img_voyante = "data:image/jpg;base64,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"
var img_ours1 = "data:image/jpg;base64,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"
var img_ours2 = "data:image/jpg;base64,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"

var img_arbitre = "/images/arena/referee.webp"
var img_ours = "/images/arena/bear.webp"

var VERSION = ["v2.72","v2.73","v2.74","v2.76"]
var ERROR_VERSION = "Mauvaise version de 💪BRUTALISATOR : "+VERSION[VERSION.length-1]+")"
var ERROR_WEBSITE = "Utilise 💪BRUTALISATOR sur une page Labrute !"
var NOTHING_TO_DO = "💪BRUTALISATOR n'a pas encore de fonctionnalité pour cette page ! \n============== FONCTIONNALITÉS ================\n\n• CRÉATION : Customisation de l'apparence, choix du maître\n• COMBAT : Récapitulatif des dommages\n• ARÈNE : Voyance\n• TOURNOI : Affrontement avec un champion d'outre-monde\n• CELLULE : Estimation de la PUISSANCE d'une brute\n                   Puis évaluation de l'équipement\n                   Puis estimation du potentiel\n                   Personalisation fictive de l'équipement\n• LEVEL UP : Aide à la décision\n• RECHERCHE DE CLAN : Ouverture directe du clan MGE \n• CLAN : Estimation des dégâts journaliers\n• CLASSEMENT DE CLAN : Information sur les forces adverses\n• GUERRE DE CLAN : Optimisation des escouades\n• VERSUS : Génération et partage de combats entre brutes fictives\n• DESTINÉE : Meilleure visualisation"
function alertAndStop(error){stopLoading();alert(error);throw new Error(error);}
cl("START")
if(!(window.location.href.startsWith("https://"+"b"+"rut"))){alertAndStop(ERROR_WEBSITE);}
var flag = false;for(version of VERSION){if(isTextInDOM(version,"p")){flag=true;break}};if(!flag && BRANCHE!=="dev"){alertAndStop(ERROR_VERSION);};

parseURL()
if(combatIsOk()){launchFight()}
else if(url.length==1){/*
	
	var ah=div({4:1,5:0,2:"textarea"})
	var bh=div({4:[80,40,10,40],10:"#ff0000",15:0,6:{click:function(){
		
		var s = document.createElement( 'script' );
		  s.setAttribute('text',"text/javascript");
		  s.setAttribute('type',"module");
		  s.textContent=ah.val()
		  document.body.appendChild( s );
		
	}}})
	
	
	
	//*/addScript(BRUTALISATOR+"custom.js")
	}
else if(url.length==2 && url[1]=="hall"){addScript(BRUTALISATOR+"tour.js")}
else if(url[2].startsWith("tournament")){BRUTE = url[1];lauchFightVersusChampion()}
else if(url.length==4 && url[2]=="clan" && url[3]=="ranking"){BRUTE = url[1];cl("clan?",isTextInDOM("Mon clan","p"))
if(isTextInDOM("Mon clan","p")){addScript(BRUTALISATOR+"clanWar.js")}
else{window.location.href="/"+BRUTE+"/clan/"+MOLIEREID;}
}
else if(url.length==3 && url[2]=="destiny"){BRUTE = url[1];addScript(BRUTALISATOR+"destiny.js")}
else if(url.length==6 && url[2]=="clan" && url[4]=="war"){CLAN = url[3];WAR = url[5];BRUTE = url[1];addScript(BRUTALISATOR+"war.js")}
else if(url.length==3 && url[2]=="level-up"){BRUTE = url[1];addScript(BRUTALISATOR+"level.js")}
else if((url.length==4 || url.length==3) && url[2]=="ranking"){BRUTE = url[1];RANKING=url[3];if(RANKING===undefined)RANKING="";addScript(BRUTALISATOR+"ranking.js")}
else if(url.length==3 && url[2]=="arena" /*&& BRANCHE=="dev"*/){BRUTE = url[1];arena()}
else if(url.length==3 && url[2]=="cell" /*&& BRANCHE=="dev"*/){BRUTE = url[1];addScript(BRUTALISATOR+"puissance.js")}
else if(url.length==4 && url[2]=="versus"){BRUTE = url[1];addScript(BRUTALISATOR+"fight.js")}
else if(url.length==4 && url[2]=="clan"){CLAN = url[3];addScript(BRUTALISATOR+"bossDamage.js")}
else if(BRANCHE == "dev" && url.length==3 && url[1]=="user"){addScript(BRUTALISATOR+"devTools.js")}
else if(FIGHT_TYPE){addScript(BRUTALISATOR+"damageChart.js")}

else{alertAndStop(NOTHING_TO_DO)}