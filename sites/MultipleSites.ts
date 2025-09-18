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
        const elements = Array.from(document.querySelectorAll("article")).slice(0, 10);
        return elements.map(el => ({
          headline: el.querySelector("h2")?.innerText.trim() || "",
          link: el.querySelector("a")?.href || ""
        }));
      });
    }
  },
  // Add more websites here
];