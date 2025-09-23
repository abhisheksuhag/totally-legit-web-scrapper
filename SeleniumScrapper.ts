const { Builder, By, until} = require("selenium-webdriver");
require("chromedriver");

(async function example(){
    let driver= await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.wired.com/category/gear/');
        await driver.sleep(3000);

        const articles = await driver.findElements(By.css('.SummaryItemWrapper-ircKXK'));
        for(let i=0;i<Math.min(10, articles.length); i++){
            const article = articles[i];
            const headlineEl = await article.findElement(By.css('h3.SummaryItemHedBase-hnYOxl'))
            const headline = await headlineEl.getText();
            let summary = "";
            try {
                const summaryEl = await article.findElement(By.css('.SummaryItemDek-IjVzD'))
                summary = await summaryEl.getText();
            } catch (e){
                summary = "(No summary found)";
            }
            console.log(`\n${i+1}. ${headline}\n ${summary}`);
        }
    } finally {
        await driver.quit();
    }
})();