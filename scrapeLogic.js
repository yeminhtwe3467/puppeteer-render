const puppeteer = require("puppeteer")
require("dotenv").config();

const scrapeLogic = async(res) => {
    const browser = await puppeteer.launch({
        headless:'new',
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
    });
    try {
        const page = await browser.newPage();
        // Navigate the page to a URL.
        await page.goto('https://developer.chrome.com/', { waitUntil: 'networkidle2' });

        // Set screen size.
        await page.setViewport({width: 1080, height: 1024});

        // Type into search box.
        await page.locator('.devsite-search-field').fill('automate beyond recorder');

        // Wait and click on first result.
        await page.locator('.devsite-result-item-link').click();

        // Locate the full title with a unique string.
        const textSelector = await page
        .locator('text/Customize and automate')
        .waitHandle();
        const fullTitle = await textSelector?.evaluate(el => el.textContent);

        // Print the full title.
        console.log('The title of this blog post is "%s".', fullTitle);
        res.send(fullTitle || "Title not found");
    } catch (e) {
        console.error(e);
        res.status(500).send(`Something went wrong while running: ${e.message}`);
    } finally {
        await browser.close();
    }
}

module.exports={scrapeLogic}