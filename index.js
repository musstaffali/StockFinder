// var saveData = localStorage.getItem("saveData")
loadSaveData();
function loadSaveData(){
var saveData = JSON.parse(localStorage.getItem('saveData')) || [];
console.log(saveData);
var saveName = JSON.parse(localStorage.getItem('saveName')) || [];

console.log(saveName);
console.log(saveName["1. symbol"]);
console.log(saveData["Global Quote"]["05. price"]);
$("#searchName").text(saveName["2. name"] || saveName["02. name"]);
$("#searchSymb").text(saveName["1. symbol"] || saveName["01. symbol"]);
$("#searchPrice").text("$" + saveData["Global Quote"]["05. price"] || saveData["Global Quote"]["5. price"]);
$("#searchRegion").text(saveName["4. region"]);

$("#searchType").text(saveName["3. type"]);
$("#searchCurr").text(saveName["8. currency"]);
$("#searchVol").text(saveData["Global Quote"]["06. volume"] || saveData["Global Quote"]["6. volume"]);

$("#searchOpen").text("$" + saveData["Global Quote"]["02. open"] || saveData["Global Quote"]["2. open"]);
$("#searchHigh").text("$" + saveData["Global Quote"]["03. high"] || saveData["Global Quote"]["3. high"]);
$("#searchLow").text("$" + saveData["Global Quote"]["04. low"] || saveData["Global Quote"]["4. low"]);
$("#searchChange").text("$" + saveData["Global Quote"]["09. change"] || saveData["Global Quote"]["9. change"]);
$("#searchPercent").text(saveData["Global Quote"]["10. change percent"]);
}


var APIkey = "LMLYK2TEYEV7H4G5";
//var queryCompanyURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
//var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";


function getTopTrending() {
    var queryTopURL = "https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_671c931364a84a08aae2391ce68605f7"
    $.ajax({
        url: queryTopURL,
        method: "GET"
    }).then(function (topTrendstop10) {
        console.log(topTrendstop10);

        //TOP TRENDING COL 1
        $("#compName1").text(topTrendstop10[0].companyName);
        // $("#compSymb1").text(topTrendstop10[0].symbol);
        $("#price1").text("$" + topTrendstop10[0].latestPrice);
        // $("#change1").text(topTrendstop10[0].change);
        $("#upDown1").text((topTrendstop10[0].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 2
        $("#compName2").text(topTrendstop10[1].companyName);
        // $("#compSymb2").text(topTrendstop10[1].symbol);
        $("#price2").text("$" + topTrendstop10[1].latestPrice);
        // $("#change2").text(topTrendstop10[1].change);
        $("#upDown2").text((topTrendstop10[1].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 3
        $("#compName3").text(topTrendstop10[2].companyName);
        // $("#compSymb3").text(topTrendstop10[2].symbol);
        $("#price3").text("$" + topTrendstop10[2].latestPrice);
        // $("#change3").text(topTrendstop10[2].change);
        $("#upDown3").text((topTrendstop10[2].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 4
        $("#compName4").text(topTrendstop10[3].companyName);
        // $("#compSymb4").text(topTrendstop10[3].symbol);
        $("#price4").text("$" + topTrendstop10[3].latestPrice);
        // $("#change4").text(topTrendstop10[3].change);
        $("#upDown4").text((topTrendstop10[3].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 5
        $("#compName5").text(topTrendstop10[4].companyName);
        // $("#compSymb5").text(topTrendstop10[4].symbol);
        $("#price5").text("$" + topTrendstop10[4].latestPrice);
        // $("#change5").text(topTrendstop10[4].change);
        $("#upDown5").text((topTrendstop10[4].changePercent * 100).toFixed(2) + "%");

        var upDownC = $(".upDownPct").val();
        if (upDownC >= 0) {
            $(".upDownPct").css("color", "green");
        } else {
            $(".upDownPct").css("color", "red");
        }

    });
}
getTopTrending();