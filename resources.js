        //THIS FUNCTION RUNS THE DEFINITIONS AREA ACCORDION ACTION.
        $(function () {
            $("#termsMenu").accordion();
        });


function getTopTrending() {
    var queryTopURL = "https://cloud.iexapis.com/stable/stock/market/list/gainers?token=pk_671c931364a84a08aae2391ce68605f7"
    $.ajax({
        url: queryTopURL,
        method: "GET"
    }).then(function (topTrendstop10) {
        console.log(topTrendstop10);
        
        var topArrays = 
        [{compName:"John", compSymbol:"Doe", price:50, change:"blue"},
        {compName:"John", compSymbol:"Doe", price:50, change:"blue"},
        {compName:"John", compSymbol:"Doe", price:50, change:"blue"},
        {compName:"John", compSymbol:"Doe", price:50, change:"blue"},
        {compName:"John", compSymbol:"Doe", price:50, change:"blue"},];
        //TOP TRENDING COL 1
        
        $("#compName1").text(topTrendstop10[0].companyName);
        $("#compSymb1").text(topTrendstop10[0].symbol);
        $("#price1").text("$" + topTrendstop10[0].latestPrice);
        $("#change1").text("$" + topTrendstop10[0].change);
        $("#upDown1").text((topTrendstop10[0].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 2
        $("#compName2").text(topTrendstop10[1].companyName);
        $("#compSymb2").text(topTrendstop10[1].symbol);
        $("#price2").text("$" + topTrendstop10[1].latestPrice);
        $("#change2").text("$" + topTrendstop10[1].change);
        $("#upDown2").text((topTrendstop10[1].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 3
        $("#compName3").text(topTrendstop10[2].companyName);
        $("#compSymb3").text(topTrendstop10[2].symbol);
        $("#price3").text("$" + topTrendstop10[2].latestPrice);
        $("#change3").text("$" + topTrendstop10[2].change);
        $("#upDown3").text((topTrendstop10[2].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 4
        $("#compName4").text(topTrendstop10[3].companyName);
        $("#compSymb4").text(topTrendstop10[3].symbol);
        $("#price4").text("$" + topTrendstop10[3].latestPrice);
        $("#change4").text("$" + topTrendstop10[3].change);
        $("#upDown4").text((topTrendstop10[3].changePercent * 100).toFixed(2) + "%");

        //TOP TRENDING COL 5
        $("#compName5").text(topTrendstop10[4].companyName);
        $("#compSymb5").text(topTrendstop10[4].symbol);
        $("#price5").text("$" + topTrendstop10[4].latestPrice);
        $("#change5").text("$" + topTrendstop10[4].change);
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