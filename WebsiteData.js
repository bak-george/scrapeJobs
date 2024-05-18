class WebsiteData {
    constructor(page, url, selector, filePath, extractors) {
        this.page = page;
        this.url = url;
        this.selector = selector;
        this.filePath = filePath;
        this.extractors = extractors;
    }

    async scrapeData(extractors) { // Modify the scrapeData method to accept extractors as a parameter
            
        try {
            await this.page.goto(this.url);
            const data = await this.page.$$eval(this.selector, (elements, extractors) => // Pass extractors to the $$eval function
                elements.map((e) => ({
                    title: e.querySelector(extractors.title).innerText || "",
                    url: e.querySelector(extractors.url).href || "",
                })), extractors // Pass extractors to the callback function
            );
            return data;
        } catch (error) {
            console.error('Error scraping data:', error);
            return [];
        }
    }
}

module.exports = WebsiteData;
