// var saveData = localStorage.getItem("saveData")
loadSaveData();
function loadSaveData() {
    var saveData = JSON.parse(localStorage.getItem('saveData')) || [];
    console.log(saveData);
    var saveName = JSON.parse(localStorage.getItem('saveName')) || [];

    console.log(saveName);
    console.log(saveName["1. symbol"]);
    console.log(saveData["Global Quote"]["05. price"] || saveData["Global Quote"]["5. price"]);
    $("#searchName").text("Company Name: " + saveName["2. name"] || saveName["02. name"]);
    $("#searchSymb").text("Company Symbol: " + saveName["1. symbol"] || saveName["01. symbol"]);
    $("#searchPrice").text("Current Price: $" + Math.floor(saveData["Global Quote"]["05. price"] * 100) / 100 || Math.floor(saveData["Global Quote"]["5. price"] * 100) / 100);

    $("#searchRegion").text("Region: " + saveName["4. region"]);

    $("#searchType").text("Type: " + saveName["3. type"]);
    $("#searchCurr").text("Currency: " + saveName["8. currency"]);
    $("#searchVol").text("Volume: " + saveData["Global Quote"]["06. volume"] || saveData["Global Quote"]["6. volume"]);

    $("#o").text("Open:");
    $("#searchOpen").text("$" + Math.floor(saveData["Global Quote"]["02. open"] * 100) / 100) || Math.floor(saveData["Global Quote"]["2. open"] * 100) / 100;
    $("#hi").text("High:");
    $("#searchHigh").text("$" + Math.floor(saveData["Global Quote"]["03. high"] * 100) / 100) || Math.floor(saveData["Global Quote"]["3. high"] * 100) / 100;
    $("#lo").text("Low:");
    $("#searchLow").text("$" + Math.floor(saveData["Global Quote"]["04. low"] * 100) / 100) || Math.floor(saveData["Global Quote"]["4. low"] * 100) / 100;
    $("#chng").text("Change($):");
    $("#searchChange").text("$" + Math.floor(saveData["Global Quote"]["09. change"] * 100) / 100) || Math.floor(saveData["Global Quote"]["9. change"] * 100) / 100;
    $("#chngP").text("Change(%):");
    $("#searchPercent").text(saveData["Global Quote"]["10. change percent"]);

    var upDownC = $(".searchChange").val();
    if (upDownC >= 0) {
        $(".colorChange").css("color", "green");
    } else {
        $(".colorChange").css("color", "red");
    }


};


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

function getStocks(searchTerm) {
    var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
    console.log(querySearchURL);
    jQuery.ajax({
        url: querySearchURL,
        method: "GET"
    }).then(function (data) {
        console.log(data);
        console.log(data.bestMatches[0]);
        var symbol = data.bestMatches[0]["1. symbol"];
        console.log(symbol);
        localStorage.saveName = JSON.stringify(data.bestMatches[0]);

        var symbol = data.bestMatches[0]["1. symbol"];
        var queryCompanyURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=LMLYK2TEYEV7H4G5";
        jQuery.ajax({
            url: queryCompanyURL,
            dataType: 'json',
            contentType: "application/json",
            success: function (results) {
                console.log(results);

                //save company name and global quote
                localStorage.saveData = JSON.stringify(results);

                $("#searchPrice").text("Current Price: $" + Math.floor(results["Global Quote"]["05. price"] * 100) / 100 || Math.floor(results["Global Quote"]["5. price"] * 100) / 100);
                $("#searchVol").text("Volume: " + results["Global Quote"]["06. volume"] || results["Global Quote"]["6. volume"]);
                $("#o").text("Open:");
                $("#searchOpen").text("$" + Math.floor(results["Global Quote"]["02. open"] * 100) / 100 || Math.floor(results["Global Quote"]["2. open"] * 100) / 100);
                $("#hi").text("High:");
                $("#searchHigh").text("$" + Math.floor(results["Global Quote"]["03. high"] * 100) / 100 || Math.floor(results["Global Quote"]["3. high"] * 100) / 100);
                $("#lo").text("Low:");
                $("#searchLow").text("$" + Math.floor(results["Global Quote"]["04. low"] * 100) / 100 || Math.floor(results["Global Quote"]["4. low"] * 100) / 100);
                $("#chng").text("Change($):");
                $("#searchChange").text("$" + Math.floor(results["Global Quote"]["09. change"] * 100) / 100 || Math.floor(results["Global Quote"]["9. change"] * 100) / 100);
                $("#chngP").text("Change(%):");
                $("#searchPercent").text(results["Global Quote"]["10. change percent"]);

                var upDownC = $(".searchChange").val();
                if (upDownC >= 0) {
                    $(".colorChange").css("color", "green");
                } else {
                    $(".colorChange").css("color", "red");
                }

            }
        });
        var queryNewsURL = "https://cloud.iexapis.com/stable/stock/" + symbol + "/news?token=pk_671c931364a84a08aae2391ce68605f7";
        console.log(queryNewsURL);
        jQuery.ajax({
            url: queryNewsURL,
            method: "GET"
        }).then(function (indData) {
            console.log(indData);
        });
        $("#searchName").text("Company Name: " + data.bestMatches[0]["2. name"]);
        $("#searchSymb").text("Company Symbol: " + data.bestMatches[0]["1. symbol"]);
        $("#searchRegion").text("Region: " + data.bestMatches[0]["4. region"]);
        $("#searchType").text("Type: " + data.bestMatches[0]["3. type"]);
        $("#searchCurr").text("Currency: " + data.bestMatches[0]["8. currency"]);
    })

};

$(".button").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#searchTerm")
        .val()
        .trim()
    // .toLowerCase();
    $("#searchTerm").val("");
    console.log(searchTerm);

    getStocks(searchTerm);
    // getIndustry();

})