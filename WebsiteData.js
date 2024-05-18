class WebsiteData {
    constructor(page, url, selector, filePath) {
        this.page = page;
        this.url = url;
        this.selector = selector;
        this.filePath = filePath;
    }

    async scrapeData() {
        try {
            await this.page.goto(this.url);
            const data = await this.page.$$eval(this.selector, (elements) =>
                elements.map((e) => ({
                    title: e.querySelector('h2').innerText,
                    url: e.querySelector('a').href,
                }))
            );
            return data;
        } catch (error) {
            console.error('Error scraping data:', error);
            return [];
        }
    }
}

module.exports = WebsiteData;
