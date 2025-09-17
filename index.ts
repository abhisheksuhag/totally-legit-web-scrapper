import * as cheerio from 'cheerio';
import axios from "axios";

async function scrapeWiredTech(){
    const url="https://www.wired.com/category/gear/";

    try {
        const { data } = await axios.get(url, {
            headers :{
                "User-agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            }
        });

        const $ = cheerio.load(data);
        const articles = [];

        $(".SummaryItemWrapper-ircKXK").each((i, el) => {
            const headline = $(el).find("h3.SummaryItemHedBase-hnYOxl").text().trim();
            const relativeLink = $(el).find("a.SummaryItemHedLink-cxRzVg").attr("href");
            const link = relativeLink ? "https://www.wired.com" + relativeLink : "";

            articles.push({ headline, link });
        });

        console.log("Wired Tech Headlines:");
        articles.forEach(({ headline, link }, i) => {
            console.log(`${i + 1}. ${headline}`);
            console.log(`   Link: ${link}`);
    });

    }catch(err){
        console.error("Error scraping Wired: ", err.message);
    }
}

scrapeWiredTech();