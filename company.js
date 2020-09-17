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

                var company = $("<h1>").text(response.Name);
                var display = $("<div>").addClass("card-body");

                display.append(company)
                $('#companyList').append(display);
              
                    var incomeState = "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=" + compInfo + "&apikey=KMCDXB4JI059DXWG";
                    $.ajax({url: incomeState, method: 'GET'}).then(function(incomeInfo){
                        console.log(incomeInfo);
                    })
            })
             }
         
            
})