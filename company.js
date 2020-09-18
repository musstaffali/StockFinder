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
                            var summary = $("<p>").text("Summary: " + news[0].summary);
                            industry.attr("src", news[0].url);
                            industry.click(function () {
                                location.href = news[0].url
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


                            $('#companyList').prepend(display);


                        })
                }
            });
        }
        )
    }

})
