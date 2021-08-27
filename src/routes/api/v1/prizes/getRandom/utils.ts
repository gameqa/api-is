import { Prizes } from "../../../../../models";
// import prizes from "../prizes.json";

export const getRandomPrize = async () => {
	// const prizeArray = prizes
	// 	.reduce((pv, cv) => [...pv, ...cv.prizes], [])
	// 	.filter((prize) => prize.available);
	// return prizeArray[Math.floor(Math.random() * prizeArray.length)];

	const prizeArray = await Prizes.find();
	console.log(prizeArray);
	return prizeArray[Math.floor(Math.random() * prizeArray.length)];
};
