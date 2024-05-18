class WebsiteData {
    constructor(page, url, selector, filePath, extractors) {
        this.page = page;
        this.url = url;
        this.selector = selector;
        this.filePath = filePath;
        this.extractors = extractors;
    }

    async scrapeData(extractors) {             
        try {
            await this.page.goto(this.url);
            const data = await this.page.$$eval(this.selector, (elements, extractors) => 
                elements.map((e) => {
                    const extractedData = {};
                    if (extractors.title) {
                        extractedData.title = e.querySelector(extractors.title).innerText;
                    }
                    if (extractors.url) {
                        extractedData.url = e.querySelector(extractors.url).href;
                    }
                    return extractedData;
                }), this.extractors 
            );
            return data;
        } catch (error) {
            console.error('Error scraping data:', error);
            return [];
        }
    }
}

module.exports = WebsiteData;
