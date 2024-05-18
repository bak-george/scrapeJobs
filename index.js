const fs = require('fs');
const puppeteer = require('puppeteer');
const WebsiteData = require('./WebsiteData');
const websites = require('./websitesConfig');

(async () => {
    let browser;

    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();

        for (const key in websites) {
            if (websites.hasOwnProperty(key)) {
                const website = websites[key];
                const websiteData = new WebsiteData(page, website.url, website.selector, website.filePath, website.extractors); 
                const jobData = await websiteData.scrapeData(website.extractors); 

                const prettifiedData = JSON.stringify(jobData, null, 2);
                fs.writeFileSync(website.filePath, prettifiedData);
                console.log(`File saved successfully for ${website.url} with prettified JSON.`);
            }
        }
    } catch (error) {
        console.error('Error during the scraping process:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})();
