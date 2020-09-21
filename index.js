// var saveData = localStorage.getItem("saveData")
renderSavedFaves();
function renderSavedFaves(){
    var saveArr = JSON.parse(localStorage.getItem('saveArr')) || []; 
    console.log(saveArr[0].name);
    for (i = 0; i < saveArr.length; i++) {
        var cellRank = $("<td>").append("<i class='fas fa-star'</i>");
        var cellCompany = $("<td>").text(saveArr[i].name);
        var cellPrice = $("<td>").text(saveArr[i].price);
        var upDown = $("<td>").text(saveArr[i].percent);
        upDown.addClass("pctChange")
        tableRow = $("<tr>");
        tableRow.append(cellRank, cellCompany, cellPrice,upDown);
        $("#table-2").append(tableRow);
    }
    var upDownC = $(".pctChange").val();
    if (upDownC >= 0) {
        $(".pctChange").css("color", "green");
    } else {
        $(".pctChange").css("color", "red");
    }
};

loadSaveData();
function loadSaveData() {
    var saveData = JSON.parse(localStorage.getItem('saveData')) || [];
    console.log(saveData);
    var saveName = JSON.parse(localStorage.getItem('saveName')) || [];
    var saveArr = JSON.parse(localStorage.getItem('saveArr')) || [];
    var saveNews = JSON.parse(localStorage.getItem('saveNews')) || [];
    console.log(saveNews);
    console.log(saveArr);
    console.log(saveName);
    console.log(saveName["1. symbol"]);
    console.log(saveData["Global Quote"]["05. price"] || saveData["Global Quote"]["5. price"]);
    $("#newsResults").text("Recent " + saveName["2. name"] + " News:")
    $("#lastSearched").text("Last Company Searched: " + saveName["2. name"]);
    $("#searchName").text("Company Name: " + saveName["2. name"] || saveName["02. name"]);
    $("#searchSymb").text("Company Symbol: " + saveName["1. symbol"] || saveName["01. symbol"]);
    $("#searchPrice").text("Current Price: $" + Math.floor(saveData["Global Quote"]["05. price"] * 100) / 100 || Math.floor(saveData["Global Quote"]["5. price"] * 100) / 100);
    $("#searchPrice").addClass("priceColor");

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

    //post 3 recent news articles
    var industry = $("<a>").text(saveNews[0].headline);
                            industry.addClass("headlineText");
                            var industryone = $("<a>").text(saveNews[1].headline);
                            industryone.addClass("headlineText");
                            var industrytwo = $("<a>").text(saveNews[2].headline);
                            industrytwo.addClass("headlineText");
                            var industrythr = $("<a>").text(saveNews[3].headline);
                            industrythr.addClass("headlineText");

                            var summary = $("<p>").text(saveNews[0].summary);
                            summary.addClass("mb-4");
                            var summaryone = $("<p>").text(saveNews[1].summary);
                            summaryone.addClass("mb-4");
                            var summarytwo = $("<p>").text(saveNews[2].summary);
                            summarytwo.addClass("mb-4");
                            var summarythr = $("<p>").text(saveNews[3].summary);
                            summarythr.addClass("mb-4");

                            industry.attr("src", saveNews[0].url);
                            industry.click(function () {
                                location.href = saveNews[0].url
                            });
                            industryone.attr("src", saveNews[1].headline);
                            industryone.click(function () {
                                location.href = saveNews[1].url
                            });
                            industrytwo.attr("src", saveNews[2].url);
                            industrytwo.click(function () {
                                location.href = saveNews[2].url
                            });
                            industrythr.attr("src", saveNews[3].url);
                            industrythr.click(function () {
                                location.href = saveNews[3].url
                            });
    
                            
                            var display = $("<div>").addClass("card-content");


                            display.append(industry, summary, industryone, summaryone, industrytwo, summarytwo, industrythr, summarythr);
                            $('#newsCard').append(display);
};


var APIkey = "LMLYK2TEYEV7H4G5";

function getTopTrending() {
    var queryTopURL = "https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_671c931364a84a08aae2391ce68605f7"
    $.ajax({
        url: queryTopURL,
        method: "GET"
    }).then(function (topTrendstop10) {
        console.log(topTrendstop10);

        //TOP TRENDING COL 1
        $("#compName1").text(topTrendstop10[0].companyName);
        $("#price1").text("$" + topTrendstop10[0].latestPrice);
        $("#upDown1").text((topTrendstop10[0].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 2
        $("#compName2").text(topTrendstop10[1].companyName);
        $("#price2").text("$" + topTrendstop10[1].latestPrice);
        $("#upDown2").text((topTrendstop10[1].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 3
        $("#compName3").text(topTrendstop10[2].companyName);
        $("#price3").text("$" + topTrendstop10[2].latestPrice);
        $("#upDown3").text((topTrendstop10[2].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 4
        $("#compName4").text(topTrendstop10[3].companyName);
        $("#price4").text("$" + topTrendstop10[3].latestPrice);
        $("#upDown4").text((topTrendstop10[3].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 5
        $("#compName5").text(topTrendstop10[4].companyName);
        $("#price5").text("$" + topTrendstop10[4].latestPrice);
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
                $("#searchPrice").addClass("priceColor")
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
        }).then(function (news) {
            console.log(news);
            var industry = $("<a>").text(news[0].headline);
                            industry.addClass("headlineText");
                            var industryone = $("<a>").text(news[1].headline);
                            industryone.addClass("headlineText");
                            var industrytwo = $("<a>").text(news[2].headline);
                            industrytwo.addClass("headlineText");
                            var industrythr = $("<a>").text(news[3].headline);
                            industrythr.addClass("headlineText");

                            var summary = $("<p>").text(news[0].summary);
                            summary.addClass("mb-4");
                            var summaryone = $("<p>").text(news[1].summary);
                            summaryone.addClass("mb-4");
                            var summarytwo = $("<p>").text(news[2].summary);
                            summarytwo.addClass("mb-4");
                            var summarythr = $("<p>").text(news[3].summary);
                            summarythr.addClass("mb-4");

                            industry.attr("src", news[0].url);
                            industry.click(function () {
                                location.href = news[0].url
                            });
                            industryone.attr("src", news[1].headline);
                            industryone.click(function () {
                                location.href = news[1].url
                            });
                            industrytwo.attr("src", news[2].url);
                            industrytwo.click(function () {
                                location.href = news[2].url
                            });
                            industrythr.attr("src", news[3].url);
                            industrythr.click(function () {
                                location.href = news[3].url
                            });
    
                            
                            var display = $("<div>").addClass("card-content");


                            display.append(industry, summary, industryone, summaryone, industrytwo, summarytwo, industrythr, summarythr);
                            $('#newsCard').append(display);

        });
        $("#newsResults").text("Recent " + data.bestMatches[0]["2. name"] + " News:")
        $("#searchName").text("Company Name: " + data.bestMatches[0]["2. name"]);
        $("#searchSymb").text("Company Symbol: " + data.bestMatches[0]["1. symbol"]);
        $("#searchRegion").text("Region: " + data.bestMatches[0]["4. region"]);
        $("#searchType").text("Type: " + data.bestMatches[0]["3. type"]);
        $("#searchCurr").text("Currency: " + data.bestMatches[0]["8. currency"]);
        $("#lastSearched").text("Last Company Searched: " + data.bestMatches[0]["2. name"]);
    })

};

$(".button").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#searchTerm")
        .val()
        .trim()
    .toLowerCase();
    $("#searchTerm").val("");
    console.log(searchTerm);

    getStocks(searchTerm);
 

})