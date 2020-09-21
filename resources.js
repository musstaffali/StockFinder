//THIS FUNCTION RUNS THE DEFINITIONS AREA ACCORDION ACTION.
$(function () {
    $("#termsMenu").accordion();
});

renderSavedFaves();
function renderSavedFaves() {
    var saveArr = JSON.parse(localStorage.getItem('saveArr')) || [];
    console.log(saveArr[0].name);
    for (i = 0; i < saveArr.length; i++) {
        var cellRank = $("<td>").append("<i class='fas fa-star'</i>");
        var cellCompany = $("<td>").text(saveArr[i].name);
        var cellPrice = $("<td>").text(saveArr[i].price);
        var upDown = $("<td>").text(saveArr[i].percent);
        upDown.addClass("pctChange");
        tableRow = $("<tr>");
        tableRow.append(cellRank, cellCompany, cellPrice, upDown);
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