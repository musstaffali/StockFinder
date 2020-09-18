$(document).ready(function () {

    $('#submitBtn').on('click', function (event) {
        event.preventDefault();
        var indusInfo = $('#companySearch').val();
        console.log(indusInfo);
        searchCompany(indusInfo);
    })

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

                            var industry = $("<a>").text("Headline/Link: " + news[0].headline);
                            var industryone = $("<a>").text("Headline/Link: " + news[1].headline);
                            var industrytwo = $("<a>").text("Headline/Link: " + news[2].headline);
                            var industrythr = $("<a>").text("Headline/Link: " + news[3].headline);
                            var industryfou = $("<a>").text("Headline/Link: " + news[4].headline);
                            var summary = $("<p>").text("Summary: " + news[0].summary);
                            var summaryone = $("<p>").text("Summary: " + news[1].summary);
                            var summarytwo = $("<p>").text("Summary: " + news[2].summary);
                            var summarythr = $("<p>").text("Summary: " + news[3].summary);
                            var summaryfou = $("<p>").text("Summary: " + news[4].summary);
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
                                var sym = $("<p>").text("Symbol: " + searchResults["Global Quote"]["01. symbol"] || searchResults["Global Quote"]["1. symbol"]);
                                var high = $("<p>").text("High: " + searchResults["Global Quote"]["03. high"]);
                                var low = $("<p>").text("Low: " + searchResults["Global Quote"]["04. low"]);
                                var price = $("<p>").text("Price: " + searchResults["Global Quote"]["05. price"]);

                                var display = $("<div>").addClass("card-body");


                                display.append(sym);
                                display.append(high);
                                display.append(low);
                                display.append(price);
                                display.append(industry);
                                display.append(summary);
                                display.append(industryone);
                                display.append(summaryone);
                                display.append(industrytwo);
                                display.append(summarytwo);
                                display.append(industrythr);
                                display.append(summarythr);
                                display.append(industryfou);
                                display.append(summaryfou);


                                $('#companyList').prepend(display);


                            })
                        }
            });
        }
        )
    }

})
