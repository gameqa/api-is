import prizes from "../prizes.json";

export const getRandomPrize = () => {
    const prizeArray = prizes.map(prize => prize.prizes)
    return prizeArray[Math.floor(Math.random() * prizeArray.length)]
}