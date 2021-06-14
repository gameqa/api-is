import prizes from "../prizes.json";

export const getRandomPrize = () => {
    const prizeArray = prizes.reduce((pv, cv) => 
        [...pv, ...cv.prizes]
    , [])
    return prizeArray[Math.floor(Math.random() * prizeArray.length)];
}