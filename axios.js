let axios = require("axios");
let xlsx = require("node-xlsx");
let fs = require("fs");
let url = "http://api.tianapi.com/txapi/joke/index";

let i = 174;

setInterval(() => {
  let res = axios
    .get(url, {
      params: {
        key: "1b9c3413d260a216a6395830bdfbaf34",
        num: 10,
      },
    })
    .then((res) => {
      let data = res.data.newslist;
      let allData = [];
      let row = ["title", "content"];
      allData.push(row);
      data.forEach((item) => {
        let arr = [];
        let title = item.title;
        let content = item.content;
        arr.push(title);
        arr.push(content);
        allData.push(arr);
      });
      let buffer = xlsx.build([
        {
          name: "sheet1",
          data: allData,
        },
      ]);
      fs.writeFile("./xiaohua" + i + ".xlsx", buffer, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
    });
    i++;
}, 1000);
