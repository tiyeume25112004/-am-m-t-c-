const puppeteer = require('puppeteer');
require('dotenv').config();

let fbUrl = 'https://fb.com';

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    const scrollToBottom = async () => {
        await page.evaluate(async () => {
            const distance = 1000; // Distance to scroll each step
            const delay = 100; // Delay between each scroll step in milliseconds
            let lastHeight = document.scrollingElement.scrollHeight;

            while (true) {
                document.scrollingElement.scrollBy(0, distance);
                await new Promise(resolve => setTimeout(resolve, delay));

                let newHeight = document.scrollingElement.scrollHeight;
                if (newHeight === lastHeight) {
                    break; // Exit loop if no new content is loaded
                }
                lastHeight = newHeight;
            }
        });
    };

    const getRawData = async () => {
        const rawData = await page.evaluate(() => {
            const elements = document.querySelectorAll('.x6s0dn4.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x1olyfxc.x9f619.x78zum5.x1e56ztr.x1gefphp.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha');
            const data = [];
            elements.forEach(element => {
                data.push(element.textContent); // or any other data extraction logic
            });
            return data;
        });
        console.log(rawData);
    };

    const login = async () => {
        await page.goto(fbUrl);
        await page.type("#email", process.env.Ufb);
        await page.type("#pass", process.env.Pfb);
        await page.click("._42ft");

        await page.waitForSelector("._6s5d");

        await page.goto(fbUrl + "/me/friends");
        await page.click(".xe8uvvx");

        await scrollToBottom();

        await getRawData();
    };

    await login();

})();
