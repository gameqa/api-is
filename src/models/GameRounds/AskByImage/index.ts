import { ImageInfo } from "../interface";

/**
 * Typescript file imitating a database of possible 'idea images' for
 * ideas that are given to the user
 *
 * Each instance must have an url for the image and a 'subject_tf' which
 * is a noun in 'þágufall'. We write the subject in such a form in order
 * to be able to phrase the prompt as 'ask about ____' in Icelandic.
 */
const images: ImageInfo[] = [
	{
        url: "https://i.imgur.com/jSMQciH.png",
        subject_tf: "List og menningu"
    },
    {
        url: "https://i.imgur.com/w3wa0nU.png",
        subject_tf: "Vísindi og tækni"
    },
	{
        url: "https://i.imgur.com/cfZ82o5.png",
        subject_tf: "Sögu eða landafræði"
    },
    {
        url: "https://i.imgur.com/5dqPRSB.png",
        subject_tf: "Íþróttir og afþreyingu"
    },
	{
        url: "https://i.imgur.com/2HeK9PM.png",
        subject_tf: "Heilsu og vellíðan"
    },
    {
        url: "https://i.imgur.com/mQFoGhy.png",
        subject_tf: "Ferðamál"
    },
	{
        url: "https://i.imgur.com/xlJzfz3.png",
        subject_tf: "Mat og eldamensku"
    },
    {
        url: "https://i.imgur.com/SOIMBny.png",
        subject_tf: "Tónlist og afþreyingu"
    },
    {
        url: "https://i.imgur.com/XDjhWxJ.png",
        subject_tf: "Dýr eða náttúruna"
    },
    {
        url: "https://i.imgur.com/n0Lxlv2.png",
        subject_tf: "Umhverfið",
    },
    {
        url: "https://i.imgur.com/Ox0RCDr.png",
        subject_tf: "Bíomyndir eða sjónvarpsþætti",
    },
    {
        url: "https://i.imgur.com/FR1naDZ.png",
        subject_tf: "Viðskipti og efnahagslífið"
    },
    {
        url: "https://i.imgur.com/uPS5Xf9.png",
        subject_tf: "Menntun eða starfsframa"
    },
    {
        url: "https://i.imgur.com/EUYG1OD.png",
        subject_tf: "Tísku"
    },
    {
        url: "https://i.imgur.com/l3kucxJ.png",
        subject_tf: "Tölvuleiki og e-íþróttir"
    },
    {
        url: "https://i.imgur.com/dOpe2M7.png",
        subject_tf: "Tungumál og samskipti"
    },
    {
        url: "https://i.imgur.com/kwuQvqb.png",
        subject_tf: "Pólitík"
    },
    {
        url: "https://i.imgur.com/5Gl872Y.png",
        subject_tf: "Trúarbrögð eða heimspeki"
    },
    {
        url: "https://i.imgur.com/EHadtg9.png",
        subject_tf: "Fjölskyldu og sambönd"
    },
    {
        url: "https://i.imgur.com/TZcIi9k.png",
        subject_tf: "Geiminn"
    },
    {
        url: "https://i.imgur.com/j92ep2J.png",
        subject_tf: "Áhugamál"
    },
    {
        url: "https://i.imgur.com/ggrCH1D.png",
        subject_tf: "Fjármál og fjárfestingar"
    },
    {
        url: "https://i.imgur.com/upwWK1w.png",
        subject_tf: "Samfélagsmiðla og internetið"
    },
    {
        url: "https://i.imgur.com/dgMfqP5.png",
        subject_tf: "Lög og lagaleg málefni"
    },
    {
        url: "https://i.imgur.com/wzcxPco.png",
        subject_tf: "Andlega heilsu"
    },
    {
        url: "https://i.imgur.com/raQNS3F.png",
        subject_tf: "Hátíðir og frí"
    },
    {
        url: "https://i.imgur.com/iBBLbu6.png",
        subject_tf: "Bíla og samöngumáta"
    },
    {
        url: "https://i.imgur.com/obpwvgF.png",
        subject_tf: "Heimili og garðinn"
    },
    {
        url: "https://i.imgur.com/cZx1JZu.png",
        subject_tf: "Framkvæmdir"
    }
];

/**
 * Function that returns an ImageInfo obejct
 *
 * by randomly selecting an item from the images array
 * @returns {ImageInfo}
 */
export const getImage = () => images[Math.floor(Math.random() * images.length)];
