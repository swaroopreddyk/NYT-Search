$(document).ready(() => {
    // NYT API key = "d8a8f76b018a4c2ebe800ed7adaf2607"
    let apikey = "d8a8f76b018a4c2ebe800ed7adaf2607";

    $("#searchButton").on('click', () => {
        let searchTerm = $("#search-Term").val();
        let numberRecords = $("#number-records").val();
        let startDate = $("#begin-date").val();
        let endDate = $("#end-date").val();
       console.log(searchTerm);
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

        let articleParams = {
            'api-key': apikey,
            'q': searchTerm,
            'begin_date': startDate,
            'end_date': endDate
        };

        if (startDate === '' && endDate === '') {
            articleParams = {
                'api-key': apikey,
                'q': searchTerm
            };
        } else if (endDate === '') {
            articleParams = {
                'api-key': apikey,
                'q': searchTerm,
                'begin_date': startDate
            };
        } else if (startDate === '') {
            articleParams = {
                'api-key': apikey,
                'q': searchTerm,
                'end_date': endDate
            };
        }

        queryURL += '?' + $.param(articleParams);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {
            console.log(result);
            //store NYT Results to Array - size of this array is always 10
            let resultsArray = result.response.docs;
            //Now we need to get only "numberRecords" as requested by the user
            let subArray = [];
            for (let i = 0; i < numberRecords; i++) {
                subArray.push(resultsArray[i]);
            }
            console.log(subArray);
            //TODO: pass the subArray to display Function to display to HTML
            writeResultsToHTML(subArray);
        });
    });

    $("#clearButton").on('click',() =>{
        $("#results").empty();
        $("#search-Term").text();
        // $("#number-records").val();
        $("#begin-date").text();
        $("#end-date").text();
    });

    const writeResults = (resultsArray) => {
        resultsArray.forEach((article)=>{
            $("#results").append("<p>"+article.headline.main+"</p>");
        })
    };
});
