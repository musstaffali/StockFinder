$(document).ready(function () {
    renderSavedFaves();
    function renderSavedFaves(){
        var saveArr = JSON.parse(localStorage.getItem('saveArr')) || []; 
        console.log(saveArr[0].name);
        for (i = 0; i < saveArr.length; i++) {
            var cellRank = $("<td>").append("<i class='fas fa-star'</i>");
            var cellCompany = $("<td>").text(saveArr[i].name);
            var cellPrice = $("<td>").text(saveArr[i].price);
            var upDown = $("<td>").text(saveArr[i].percent);
            upDown.addClass("pctChange");
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

    function searchCompany(indusInfo) {
        var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + indusInfo + "&apikey=LMLYK2TEYEV7H4G5";
        console.log(querySearchURL);
        var searchResults;
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
                    searchResults = results;

                    localStorage.saveData = JSON.stringify(results);


                    var query = "https://cloud.iexapis.com/stable/stock/" + symbol + "/news?token=pk_671c931364a84a08aae2391ce68605f7"
                    $.ajax({ url: query, method: 'GET' })
                        .done(function (news) {
                            console.log(news);

                            console.log(news[0])
                            console.log(searchResults["Global Quote"]);

                            var industry = $("<a>").text(news[0].headline);
                            industry.addClass("headlineText");
                            var industryone = $("<a>").text(news[1].headline);
                            industryone.addClass("headlineText");
                            var industrytwo = $("<a>").text(news[2].headline);
                            industrytwo.addClass("headlineText");
                            var industrythr = $("<a>").text(news[3].headline);
                            industrythr.addClass("headlineText");
                            var industryfou = $("<a>").text(news[4].headline);
                            industryfou.addClass("headlineText");
                            var summary = $("<p>").text(news[0].summary);
                            summary.addClass("mb-4");
                            var summaryone = $("<p>").text(news[1].summary);
                            summaryone.addClass("mb-4");
                            var summarytwo = $("<p>").text(news[2].summary);
                            summarytwo.addClass("mb-4");
                            var summarythr = $("<p>").text(news[3].summary);
                            summarythr.addClass("mb-4");
                            var summaryfou = $("<p>").text(news[4].summary);
                            summaryfou.addClass("mb-4");
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
                            industryfou.attr("src", news[4].url);
                            industryfou.click(function () {
                                location.href = news[4].url
                            });
                            var sym = $("<p>").text(searchResults["Global Quote"]["01. symbol"] || searchResults["Global Quote"]["1. symbol"]);
                            var high = $("<p>").text("$" + searchResults["Global Quote"]["03. high"] || searchResults["Global Quote"]["3. high"]);
                            var low = $("<p>").text("$" + searchResults["Global Quote"]["04. low"] || searchResults["Global Quote"]["4. low"]);
                            var price = $("<p>").text("$" + searchResults["Global Quote"]["05. price"] || searchResults["Global Quote"]["5. price"]);

                            
                            var display = $("<div>").addClass("card-content");
                            $("#symbT").text("Symbol:");
                            $("#symbolT").append(sym);
                            $("#highT").text("High:");
                            $("#highTab").append(high);
                            $("#lowT").text("Low:")
                            $("#lowTab").append(low);
                            $("#priceT").text("Price:")
                            $("#priceTab").append(price);


                            display.append(industry, summary, industryone, summaryone, industrytwo, summarytwo, industrythr, summarythr, industryfou, summaryfou);
                            $('#companyList').append(display);


                        })
                }
            });
        }
        )
    }
    $('#submitBtn').on('click', function (event) {
        event.preventDefault();
        $("#companyList").empty();
        var indusInfo = $('#companySearch').val();
        $("#companySearch").val("");
        console.log(indusInfo);
        searchCompany(indusInfo);
    });

});