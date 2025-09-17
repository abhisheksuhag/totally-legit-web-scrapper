import puppeteer from "puppeteer";

async function scrapeWithPuppeteer(url: string): Promise<{ headline: string; link: string }[]> {
  const browser = await puppeteer.launch(); 
  const page = await browser.newPage();     

  await page.goto(url, { waitUntil: "networkidle2" }); 

  const articles: { headline: string; link: string }[] = await page.evaluate(() => {
    const nodeList = document.querySelectorAll(".SummaryItemWrapper-ircKXK");
    const elements = Array.from(nodeList).filter(node => node instanceof Element).slice(0, 10);
    const scrapedData: { headline: string; link: string }[] = [];

    elements.forEach(el => {
        const headline = el.querySelector("h3.SummaryItemHedBase-hnYOxl")?.innerText.trim() || "";
        const link = el.querySelector("a.SummaryItemHedLink-cxRzVg")?.href || "";
        scrapedData.push({ headline, link });
    });

    return scrapedData;
});


  await browser.close();

  return articles;
}

scrapeWithPuppeteer("https://www.wired.com/category/gear/").then(articles => {
  console.log("Scraped Articles:", articles);
});
