var APIkey = "LMLYK2TEYEV7H4G5";
var queryCompanyURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";


function getTopTrending() {
    var queryTopURL = "https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_671c931364a84a08aae2391ce68605f7"
    $.ajax({
        url: queryTopURL,
        method: "GET"
    }).then(function (topTrendstop10) {
        console.log(topTrendstop10);

        //TOP TRENDING COL 1
        $("#compName1").text(topTrendstop10[0].companyName);
        $("#compSymb1").text(topTrendstop10[0].symbol);
        $("#price1").text(topTrendstop10[0].latestPrice);
        $("#change1").text(topTrendstop10[0].change);
        $("#upDown1").text((topTrendstop10[0].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 2
        $("#compName2").text(topTrendstop10[1].companyName);
        $("#compSymb2").text(topTrendstop10[1].symbol);
        $("#price2").text(topTrendstop10[1].latestPrice);
        $("#change2").text(topTrendstop10[1].change);
        $("#upDown2").text((topTrendstop10[1].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 3
        $("#compName3").text(topTrendstop10[2].companyName);
        $("#compSymb3").text(topTrendstop10[2].symbol);
        $("#price3").text(topTrendstop10[2].latestPrice);
        $("#change3").text(topTrendstop10[2].change);
        $("#upDown3").text((topTrendstop10[2].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 4
        $("#compName4").text(topTrendstop10[3].companyName);
        $("#compSymb4").text(topTrendstop10[3].symbol);
        $("#price4").text(topTrendstop10[3].latestPrice);
        $("#change4").text(topTrendstop10[3].change);
        $("#upDown4").text((topTrendstop10[3].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 5
        $("#compName5").text(topTrendstop10[4].companyName);
        $("#compSymb5").text(topTrendstop10[4].symbol);
        $("#price5").text(topTrendstop10[4].latestPrice);
        $("#change5").text(topTrendstop10[4].change);
        $("#upDown5").text((topTrendstop10[4].changePercent * 100).toFixed(2) + "%");

        var upDownC = $(".changes").val();
        if (upDownC >= 0) {
            $(".upDownPct").css("color", "green");
        } else {
            $(".upDownPct").css("color", "red");
        }

    });
}
getTopTrending();


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


function getStocks(searchTerm) {
    var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
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
                console.log(results["Global Quote"]["05. price"]);
                console.log(results["Global Quote"]["09. change"]);

                //save company name and global quote
                localStorage.saveData = JSON.stringify(results);
                location.href = "results.html";
            }
        });

    })

};


//When a blank star is clicked, the data will be moved to the favorites table and appended
favorited();


function favorited() {
    //put favorites into local storage
    // var favorites = [];
    $("#star-rank-5").on("click", function (event) {
        event.preventDefault();
        var compName5 = $("#compname5").val();
        localStorage.saveData = JSON.stringify(compName5);
        

        // for (i = 0; i < 5; i++) {

            var cellRank = $("<td>").append("<i class='fas fa-star'</i>");
            var cellCompany = $("<td>").text("");
            var cellValue = $("<td>").text("");
            var upDown = $("<td>").text("");
            var tableRow = $("<tr>");
            var tableBody = $("#faveTable");
            tableRow.append(cellRank, cellCompany, cellValue, upDown);
            tableBody.append(tableRow);
        // }


    });
}
