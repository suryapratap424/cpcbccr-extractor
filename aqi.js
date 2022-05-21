// for extracting individual data
const express = require("express");
const fs = require("fs");
const app = express();
const puppeteer = require("puppeteer");
const stations = require("./stations");
let j = stations.findIndex(e=>e.filename=='r-k-puram')//<-----------change name here
console.log(j);
// starting Puppeteer
function loadDate(day, month, year,{filename,url}) {
  return new Promise(async (resolve, reject) => {
    let browser;
    try {
      browser = await puppeteer.launch();
      url = url.replace(/\${day}-\${month}-\${year}/g,`${day}-${month}-${year}`)
      // console.log(url)
      console.log(`requesting  date - ${day}/${month}/${year} for ${filename}`);
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
      console.log(str, filename);
      // fs.appendFileSync(`./aqicsv/checking.csv`, str+','+filename);
      fs.appendFileSync(`./aqicsv/${filename}.csv`, str);
      resolve(`added ${day}/${month}/${year} to the list`);
    } catch (err) {
      console.log(err.message);
      reject("retrying...");
      await browser?.close();
    } finally {
      await browser?.close();
    }
  });
}
const load = async (dd, mm, yyyy, NumberOfDays) => {
  for (let u = j; u < j+1; u++) {
    for (let i = 0; i < NumberOfDays; i++) {
      var day = new Date(yyyy, mm - 1, dd);
      // console.log(day.toDateString());
      var nextDay = new Date(day);
      nextDay.setDate(day.getDate() - i);
      console.log(nextDay.toDateString());
      await loadDate(
        nextDay.getDate(),
        nextDay.getMonth() + 1,
        nextDay.getFullYear(),
        stations[j]
      )
        .then((m) => console.log(m))
        .catch((e) => {
          console.log(e);
          i--;
        });
    }
  }
  console.log("done");
};
/*---------------change call here------------*/
load(5, 7, 2019, 3000); //dd/mm/yyyy 4th parameter is for how many days of data is to be loaded
/*---------------change call here------------*/
app.listen(80, () => console.log("running"));
