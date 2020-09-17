var APIkey = "LMLYK2TEYEV7H4G5";
var queryCompanyURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";

// var loadData = () => {
//     var stocks = [];
var symbols = ['AAPL'];

// symbols.forEach(symbol => getMETAStocks(symbol));

function getMETAStocks(searchTerm) {
    var queryMSFTURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + searchTerm + "&interval=15min&outputsize=full&apikey=LMLYK2TEYEV7H4G5";
    $.ajax({
        url: queryMSFTURL,
        method: "GET"
    }).then(function (data) {
        console.log(data);
        console.log(data['Time Series (15min)']);

        // getPrices();
    })
        .catch(function (error) {
            console.log(error);
        });
}


$(".button").on("click", function (event) {
    event.preventDefault();
    var searchTerm = $("#searchTerm")
        .val()
        .trim()
        .toLowerCase();
    console.log(searchTerm);
    // var searchString = JSON.stringify(searchTerm.value);
    // console.log(searchString);
    getStocks(searchTerm);
    // getStockCompany(symbol);
    // $("#searchTerm").val("");

})


function getStocks(searchTerm) {
    var querySearchURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchTerm + "&apikey=LMLYK2TEYEV7H4G5";
    jQuery.ajax({
        url: querySearchURL,
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            console.log(data.bestMatches[0]);
            
            var symbol = data.bestMatches[0].symbol;
            console.log(symbol);
        }
    });
}
function getStockCompamy(symbol) {
    var queryCompanyURL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=LMLYK2TEYEV7H4G5";
    jQuery.ajax({
        url: queryCompanyURL,
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            console.log(data);
        }
    });
}





favorited();


function favorited() {
    // var favorites = [];
    $(".blankstar").on("click", function (event) {
        event.preventDefault();


        // for(i = 0; i < favorites.length; i++) {

        // }
        var cellRank = $("<td>").append("1 " + "<i class='fas fa-star'</i>");
        var cellCompany = $("<td>").text("");
        var cellValue = $("<td>").text("");
        var upDown = $("<td>").text("");
        var tableRow = $("<tr>");
        var tableBody = $("#faveTable");
        tableRow.append(cellRank, cellCompany, cellValue, upDown);
        tableBody.append(tableRow);

    })
}
