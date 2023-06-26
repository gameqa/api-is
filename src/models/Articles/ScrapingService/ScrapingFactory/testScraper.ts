import {ScraperFactory} from "./";

const SCRAPER_IDENTIFIER = "__cmu__";
const SCRAPER_KEY = "/news/stories/archives/2023/june/carnegie-mellon-alumna-wins-two-2023-tony-awardsr";


const scraper = new ScraperFactory(SCRAPER_IDENTIFIER, SCRAPER_KEY);
scraper.scrapeArticle().then(console.log).catch(console.log);