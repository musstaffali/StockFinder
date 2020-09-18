const { symbol } = require("prop-types");

var name =[];
name =JSON.parse(localStorage.getItem("saveName"));
console.log(name);


var symbol=name["01. symbol"];
console.log(symbol)

$("#widget").attr("href","https://www.tradingview.com/symbols/NASDAQ-"+symbol+"/", "rel","noopener", "target","_blank");

