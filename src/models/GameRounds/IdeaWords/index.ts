/**
 * DEPRECATED WAY OF INDUCING IDEAS FOR THE USER
 * THIS HAS BEEN REPLACE BY ASK BY IMAGE
 *
 * THIS CAN BE REMOVED IN FUTURE RELEASES
 */
const names = [
	"Bill Clinton",
	// íslenskir tónlistarmenn og hljómsveitir
	"Ellý vilhjálms",
	"Björgvin Gíslason",
	"Bubbi Morthens",
	"Egill Ólafsson",
	"Rúnar Júlíusson",
	"Jón Leifs",
	"Stefán Hilmarsson",
	"Haffi Haff",
	"Mugison",
	"Svala Björgvinsdóttir",
	"Agent Fresco",
	"Moses Hightower",
	"Hatari",
	"Daði",
	"Páll Óskar",
	"Hinn Íslenski Þursaflokkur",
	// frægt fólk frá USA
	"Oprah",
	"Abraham Lincoln",
	"Bob Hope",
	"Bill Gates",
	"Steve Jobs",
	"Neil armstrong",
	"George Bush",
	"Barbara Bush",
	"Michael Jackson",
	// vísindi
];

const nouns = [
	"Sprettur",
	"Samkomulag",
	"Fallbyssa",
	"Gírafi",
	"Kirsuber",
	"Björn",
	"Spítali",
	"Stöðuvatn",
	"rithöfundur",
	"Zinc",
	"Sæti",
	"Nótt",
	"auga",
	"ákvörðun",
	"api",
	"afi",
	"faðir",
	"móðir",
	"amma",
	"vinnumaður",
	"vinnukona",
];

const achievements = [
	"afrek",
	"ljóð",
	"heimsmet",
	"listaverk",
	"ritgerð",
	"íslandsmet",
	"ákvörðun",
	"Tónverk",
	"Verðlaun",
	"Mistök",
	"Fyrirtæki",
	"Einkaleyfi",
	"Höfundaréttur",
];

const adjectives = [
	"Fljótust",
	"Hávær",
	"Smár",
	"Fyrstur",
	"Fyrst",
	"Seinust",
	"Elstur",
	"Yngst",
	"ungur",
	"upprunalegur",
];

const verbs = [
	"Leiða",
	"Meiddi",
	"Drap",
	"Skipta",
	"Kyssti",
	"Horfði",
	"Dæmdi",
	"Meiddi",
	"Bleyta",
	"Æfa",
	"Ǽfði",
];

const ornefni = [
	"Bunga",
	"Skýli",
	"Skálarjökull",
	"Rið",
	"Daljökull",
	"Leðja",
	"Bursti",
	"Eldborg",
	"Eldfjall",
	"Fljót",
	"Fornminjar",
	"Gangstétt",
	"Gjóska",
	"Gönguslóð",
	"Háspennulína",
	"höfuðborgarsvæði",
	"jarðhiti",
];

const countries = [
	"Marokkó",
	"Namibía",
	"Færeyjar",
	"Nýja Sjáland",
	"Mónakó",
	"Jórdan",
	"Víetnam",
	"Guam",
	"Bandaríkin",
	"Lettland",
	"Eistland",
	"Hong Kong",
	"Kína",
	"Filipseyjar",
	"Tékkland",
	"Grikkland",
	"Vestur-Sahara",
	"Hondúras",
	"Ísrael",
	"Bahamas",
	"Frakkland",
	"Belgía",
	"Nicaragua",
	"Andorra",
];

const fictitiousPersons = [
	"James Bond",
	"David Copperfield",
	"Gunnlaugur Ormstunga",
	"Skarphéðinn",
	"Dorothy",
	"Snæfríður Íslandssól",
	"Frankenstein",
	"Gandálfur",
	"Gatsby",
	"Gollum",
	"Oliver Twist",
];

const getRandomItem = <T>(items: T[]) => {
	return items[Math.floor(Math.random() * items.length)];
};

const itemArrays = [
	names,
	nouns,
	achievements,
	adjectives,
	verbs,
	ornefni,
	countries,
	fictitiousPersons,
];
/**
 * @deprecated
 * @param {number} count the number of words to get by random ample
 *
 * @returns {string[]} returns an array of idea words
 */
export const get = (count: number): string[] => {
	console.log(
		"DEPRECATION WARNING: getting ideas by words has been deprecated, remove this function all and replace by ask by image as this will be removed in future releases"
	);
	const retArray: string[] = [];
	while (retArray.length < count) {
		const list = getRandomItem(itemArrays);
		const candidate = getRandomItem(list);
		if (!retArray.includes(candidate)) retArray.push(candidate);
	}
	return retArray;
};
