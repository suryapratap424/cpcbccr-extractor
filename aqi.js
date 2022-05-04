// for extracting individual data
const express = require("express");
const fs = require("fs");
const app = express();
const puppeteer = require("puppeteer");

// starting Puppeteer
function loadDate(day, month, year) {
  return new Promise(async (resolve, reject) => {
    let browser;
    try {
      browser = await puppeteer.launch();
      //alipur 
      // let url = `https://app.cpcbccr.com/ccr/#/caaqm-dashboard/caaqm-view-data-report/%2522%257B%255C%2522criteria%255C%2522%253A%255C%252224%2520Hours%255C%2522%252C%255C%2522reportFormat%255C%2522%253A%255C%2522Tabular%255C%2522%252C%255C%2522fromDate%255C%2522%253A%255C%2522${day}-${month}-${year}%2520T00%253A00%253A00Z%255C%2522%252C%255C%2522toDate%255C%2522%253A%255C%2522${day}-${month}-${year}%2520T23%253A59%253A59Z%255C%2522%252C%255C%2522state%255C%2522%253A%255C%2522Delhi%255C%2522%252C%255C%2522city%255C%2522%253A%255C%2522Delhi%255C%2522%252C%255C%2522station%255C%2522%253A%255C%2522site_5024%255C%2522%252C%255C%2522parameter%255C%2522%253A%255B%255C%2522parameter_215%255C%2522%252C%255C%2522parameter_193%255C%2522%252C%255C%2522parameter_204%255C%2522%252C%255C%2522parameter_238%255C%2522%252C%255C%2522parameter_237%255C%2522%252C%255C%2522parameter_235%255C%2522%252C%255C%2522parameter_234%255C%2522%252C%255C%2522parameter_37%255C%2522%252C%255C%2522parameter_236%255C%2522%252C%255C%2522parameter_226%255C%2522%252C%255C%2522parameter_225%255C%2522%252C%255C%2522parameter_194%255C%2522%252C%255C%2522parameter_311%255C%2522%252C%255C%2522parameter_312%255C%2522%252C%255C%2522parameter_203%255C%2522%252C%255C%2522parameter_222%255C%2522%252C%255C%2522parameter_202%255C%2522%252C%255C%2522parameter_232%255C%2522%252C%255C%2522parameter_223%255C%2522%252C%255C%2522parameter_240%255C%2522%252C%255C%2522parameter_216%255C%2522%255D%252C%255C%2522parameterNames%255C%2522%253A%255B%255C%2522PM10%255C%2522%252C%255C%2522PM2.5%255C%2522%252C%255C%2522AT%255C%2522%252C%255C%2522BP%255C%2522%252C%255C%2522SR%255C%2522%252C%255C%2522RH%255C%2522%252C%255C%2522WD%255C%2522%252C%255C%2522TOT-RF%255C%2522%252C%255C%2522RF%255C%2522%252C%255C%2522NO%255C%2522%252C%255C%2522NOx%255C%2522%252C%255C%2522NO2%255C%2522%252C%255C%2522NH3%255C%2522%252C%255C%2522SO2%255C%2522%252C%255C%2522CO%255C%2522%252C%255C%2522Ozone%255C%2522%252C%255C%2522Benzene%255C%2522%252C%255C%2522Toluene%255C%2522%252C%255C%2522Xylene%255C%2522%252C%255C%2522MP-Xylene%255C%2522%252C%255C%2522Eth-Benzene%255C%2522%255D%257D%2522`;
      //anand vihar
      let url = `https://app.cpcbccr.com/ccr/#/caaqm-dashboard/caaqm-view-data-report/%2522%257B%255C%2522criteria%255C%2522%253A%255C%252224%2520Hours%255C%2522%252C%255C%2522reportFormat%255C%2522%253A%255C%2522Tabular%255C%2522%252C%255C%2522fromDate%255C%2522%253A%255C%2522${day}-${month}-${year}%2520T00%253A00%253A00Z%255C%2522%252C%255C%2522toDate%255C%2522%253A%255C%2522${day}-${month}-${year}%2520T23%253A59%253A59Z%255C%2522%252C%255C%2522state%255C%2522%253A%255C%2522Delhi%255C%2522%252C%255C%2522city%255C%2522%253A%255C%2522Delhi%255C%2522%252C%255C%2522station%255C%2522%253A%255C%2522site_301%255C%2522%252C%255C%2522parameter%255C%2522%253A%255B%255C%2522parameter_215%255C%2522%252C%255C%2522parameter_193%255C%2522%252C%255C%2522parameter_204%255C%2522%252C%255C%2522parameter_238%255C%2522%252C%255C%2522parameter_237%255C%2522%252C%255C%2522parameter_235%255C%2522%252C%255C%2522parameter_234%255C%2522%252C%255C%2522parameter_37%255C%2522%252C%255C%2522parameter_236%255C%2522%252C%255C%2522parameter_226%255C%2522%252C%255C%2522parameter_225%255C%2522%252C%255C%2522parameter_194%255C%2522%252C%255C%2522parameter_311%255C%2522%252C%255C%2522parameter_312%255C%2522%252C%255C%2522parameter_203%255C%2522%252C%255C%2522parameter_222%255C%2522%252C%255C%2522parameter_202%255C%2522%252C%255C%2522parameter_232%255C%2522%252C%255C%2522parameter_223%255C%2522%252C%255C%2522parameter_240%255C%2522%252C%255C%2522parameter_216%255C%2522%255D%252C%255C%2522parameterNames%255C%2522%253A%255B%255C%2522PM10%255C%2522%252C%255C%2522PM2.5%255C%2522%252C%255C%2522AT%255C%2522%252C%255C%2522BP%255C%2522%252C%255C%2522SR%255C%2522%252C%255C%2522RH%255C%2522%252C%255C%2522WD%255C%2522%252C%255C%2522TOT-RF%255C%2522%252C%255C%2522RF%255C%2522%252C%255C%2522NO%255C%2522%252C%255C%2522NOx%255C%2522%252C%255C%2522NO2%255C%2522%252C%255C%2522NH3%255C%2522%252C%255C%2522SO2%255C%2522%252C%255C%2522CO%255C%2522%252C%255C%2522Ozone%255C%2522%252C%255C%2522Benzene%255C%2522%252C%255C%2522Toluene%255C%2522%252C%255C%2522Xylene%255C%2522%252C%255C%2522MP-Xylene%255C%2522%252C%255C%2522Eth-Benzene%255C%2522%255D%257D%2522`;
      // let url = `https://app.cpcbccr.com/ccr/#/caaqm-dashboard/caaqm-view-data-report/%2522%257B%255C%2522criteria%255C%2522%253A%255C%252224%2520Hours%255C%2522%252C%255C%2522reportFormat%255C%2522%253A%255C%2522Tabular%255C%2522%252C%255C%2522fromDate%255C%2522%253A%255C%2522${day}-${month}-${year}%2520T00%253A00%253A00Z%255C%2522%252C%255C%2522toDate%255C%2522%253A%255C%2522${day}-${month}-${year}%2520T23%253A59%253A59Z%255C%2522%252C%255C%2522state%255C%2522%253A%255C%2522Delhi%255C%2522%252C%255C%2522city%255C%2522%253A%255C%2522Delhi%255C%2522%252C%255C%2522station%255C%2522%253A%255C%2522site_301%255C%2522%252C%255C%2522parameter%255C%2522%253A%255B%255C%2522parameter_204%255C%2522%252C%255C%2522parameter_238%255C%2522%252C%255C%2522parameter_215%255C%2522%252C%255C%2522parameter_193%255C%2522%252C%255C%2522parameter_235%255C%2522%252C%255C%2522parameter_237%255C%2522%252C%255C%2522parameter_198%255C%2522%252C%255C%2522parameter_232%255C%2522%252C%255C%2522parameter_234%255C%2522%252C%255C%2522parameter_233%255C%2522%252C%255C%2522parameter_203%255C%2522%252C%255C%2522parameter_37%255C%2522%252C%255C%2522parameter_236%255C%2522%252C%255C%2522parameter_202%255C%2522%252C%255C%2522parameter_324%255C%2522%252C%255C%2522parameter_311%255C%2522%252C%255C%2522parameter_226%255C%2522%252C%255C%2522parameter_194%255C%2522%252C%255C%2522parameter_225%255C%2522%252C%255C%2522parameter_222%255C%2522%252C%255C%2522parameter_312%255C%2522%255D%252C%255C%2522parameterNames%255C%2522%253A%255B%255C%2522AT%255C%2522%252C%255C%2522BP%255C%2522%252C%255C%2522PM10%255C%2522%252C%255C%2522PM2.5%255C%2522%252C%255C%2522RH%255C%2522%252C%255C%2522SR%255C%2522%252C%255C%2522Temp%255C%2522%252C%255C%2522Toluene%255C%2522%252C%255C%2522WD%255C%2522%252C%255C%2522WS%255C%2522%252C%255C%2522CO%255C%2522%252C%255C%2522TOT-RF%255C%2522%252C%255C%2522RF%255C%2522%252C%255C%2522Benzene%255C%2522%252C%255C%2522P-Xylene%255C%2522%252C%255C%2522NH3%255C%2522%252C%255C%2522NO%255C%2522%252C%255C%2522NO2%255C%2522%252C%255C%2522NOx%255C%2522%252C%255C%2522Ozone%255C%2522%252C%255C%2522SO2%255C%2522%255D%257D%2522`;
    
      console.log(url)
      console.log(`requesting  date - ${day}/${month}/${year}`);
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForSelector("h1");
      let str = await page.evaluate(() => {
        let td = document.body.querySelectorAll("tbody>tr>td>span");
        let haha = 0;
        let body = "\n";
        td.forEach((item) => {
          haha++;
          if (haha > 6) body += item.innerHTML.trim() + ",";
        });

        return body.slice(0, -1);
      });

      // closing the browser
      await browser.close();
      // outputting the scraped data
      console.log(str);
      fs.appendFileSync("./anand-vihar.csv", str);
      resolve(`added ${day}/${month}/${year} to the list`);
    } catch (err) {
      console.log(err.message);
      reject("retrying...");
      await browser?.close();
      // loadDate(day, month, year);
    } finally {
      // console.log('hhaaaahahhhaha');
      await browser?.close();
    }
  });
}
const load = async (dd, mm, yyyy, NumberOfDays) => {
  for (let i = 0; i < NumberOfDays; i++) {
    var day = new Date(yyyy, mm - 1, dd);
    // console.log(day.toDateString());
    var nextDay = new Date(day);
    nextDay.setDate(day.getDate() - i);
    console.log(nextDay.toDateString());
    await loadDate(
      nextDay.getDate(),
      nextDay.getMonth() + 1,
      nextDay.getFullYear()
    )
      .then((m) => console.log(m))
      .catch((e) => {
        console.log(e);
        i--;
      });
  }
  console.log("done");
};
load(3, 4, 2022, 4); //dd/mm/yyyy 4th parameter is for how many days of data is to be loaded
app.listen(80, () => console.log("running"));