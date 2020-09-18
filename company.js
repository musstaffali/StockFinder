$(document).ready(function () {

    $('#submitBtn').on('click', function (event) {
        event.preventDefault();
        var compInfo = $('#companySearch').val();
        searchCompany(compInfo);
    })

    function searchCompany(compInfo) {
        var findComp = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + compInfo + "&apikey=KMCDXB4JI059DXWG";


        $.ajax({ url: findComp, method: 'GET' })
            .done(function (response) {
                console.log(response);

                var company = $("<h1>").text("Name: " + response.Name);
                var assetType = $('<p>').text("Asset Type: " + response.AssetType);
                var descript = $('<p>').text("Description: " + response.Description);
                var display = $("<div>").addClass("card-body");

                display.append(descript)
                display.append(company)
                display.append(assetType)
                $('#companyList').append(display);

                var incomeState = "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=" + compInfo + "&apikey=KMCDXB4JI059DXWG";

                $.ajax({ url: incomeState, method: 'GET' })
                .then(function (compInfo) {
                    console.log(compInfo);

                    var income = $('<p>').text(compInfo.symbol);
                                       
                    display.append(income)
                    $('#companyList').prepend(display);
                })
            })
    }


})

// + Symbol + AssetType + AnalystTargetPrice + Industry + GrossProfitTTM