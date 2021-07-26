# Website Scraping

## Intro

For each of the websites we scrape, we need to have a defined article source. To make the scraping easier we have defined what we call a `ScraperFactory`. A scraper factory accepts an article source identifier, along with a `key` which (together with the article source identifier) uniquely identifies an article.

The `ScraperFactory` returns a `ArticleScraper` implementation that knows how to scrape the articles for the given input article source identifier.

For example, the input value `"__wiki__"` along with an article key `"Barack Obama"` will return a `WikipediaScraper` instance which will scrape the wikipedia raticle for Barack Obama when `scrapeArticle()` is called.

## How to add a new scraper?

1. Create a new `ArticleSources` instance in your database.

2. Add the new instances identifier to `ArticleSourceIdentifier` in `models/ArticleSources/interface`

3. Add the instances hostname to `ArticleHostnames` in `models/ArticleSources/interface`

4. Create a mapping from the hostname to the indentifier in `models/ArticleSources/utils`

5. Create a mapping from the identifier to a Regular Expression which can extract the article key from an article URL `models/ArticleSources/utils`

6. Add a scraper class that extends `ArticleScraperBase` and implements `ArticleScraper`. Make sure that the scraper only parsers payloads where the headers `content-type` is specified to be `html`. This is highly important as some filetypes, like .pdf-s can crash the server if tried to parse with `Cheerio`

7. Add the new Scraper class to the `ScrapingFactory`

8. Open the web interface for Googles Programmable Search engine and add the hostname's URL pattern which you want to see in your google search results. Once you do this your users will immediately start to see search results from the new source on the front end.

As the users will see the articles immediately in their search results once the URL pattern has been added to Googles Programmable Search Engine, it is advised that you complete steps 1-7 first, test them thoroughly and deploy before proceeding to step 8.
