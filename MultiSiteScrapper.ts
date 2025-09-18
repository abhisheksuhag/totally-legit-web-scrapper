import puppeteer from "puppeteer";

type Article = { headline : string ; link: string};

const sites = [
  {
    name: "Wired",
    url: "https://www.wired.com/category/gear/",
    scraper: async (page: puppeteer.Page): Promise<Article[]> => {
      return await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll(".SummaryItemWrapper-ircKXK")).slice(0, 10);
        return elements.map(el => ({
          headline: el.querySelector("h3.SummaryItemHedBase-hnYOxl")?.innerText.trim() || "",
          link: el.querySelector("a.SummaryItemHedLink-cxRzVg")?.href || ""
        }));
      });
    }
  },
  {
  name: "TechCrunch",
  url: "https://techcrunch.com/",
  scraper: async (page: puppeteer.Page): Promise<Article[]> => {
    return await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll("li.wp-block-post")).slice(0, 10);
      return elements.map(el => ({
        headline: el.querySelector("h3.loop-card__title a.loop-card__title-link")?.innerText.trim() || "",
        link: el.querySelector("h3.loop-card__title a.loop-card__title-link")?.href || ""
      }));
    });
  }
}
,
]; 


async function scrapeMultipleSites(){
    const browser = await puppeteer.launch();
    
    const scrapePromises = sites.map(async (site) => {
    const page = await browser.newPage();
    try {
      await page.goto(site.url, { waitUntil: "networkidle2" });
      const articles = await site.scraper(page);
      return { site: site.name, articles };
    } catch (error) {
      console.error(`Error scraping ${site.name}:`, error);
      return { site: site.name, articles: [] };
    } finally {
      await page.close();
    }
  });

  const results = await Promise.all(scrapePromises);

  await browser.close();
  return results;
}

scrapeMultipleSites()
  .then(results => {
    results.forEach(({ site, articles }) => {
      console.log(`\nArticles from: ${site}`);
      articles.forEach(({ headline, link }, i) => {
        console.log(`${i + 1}. ${headline}`);
        console.log(`   ${link}`);
      });
    });
  })
  .catch(console.error);