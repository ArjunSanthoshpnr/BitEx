var changeTheme = function() {
    var lgTheme = {
        "manOfSteel" : "background: #780206; \
            background: -webkit-linear-gradient(to left, #061161, #780206); \
            background: linear-gradient(to left, #061161, #780206); ",
        "frost" : "background: #000428; \
            background: -webkit-linear-gradient(to left, #004e92, #000428); \
            background: linear-gradient(to left, #004e92, #000428);",
        "influenza" : "background: #C04848; \
            background: -webkit-linear-gradient(to left, #480048, #C04848); \
            background: linear-gradient(to left, #480048, #C04848);",
        "midnightCity" : "background: #232526; \
            background: -webkit-linear-gradient(to left, #414345, #232526); \
            background: linear-gradient(to left, #414345, #232526);",
        "loveAndLiberty" : "background: #200122; \
            background: -webkit-linear-gradient(to left, #6f0000, #200122); \
            background: linear-gradient(to left, #6f0000, #200122);",
        "royal" : "background: #141E30; \
            background: -webkit-linear-gradient(to left, #243B55, #141E30); \
            background: linear-gradient(to left, #243B55, #141E30);"
    };
    var theme = ["manOfSteel", "frost", "influenza", "midnightCity", "loveAndLiberty", "royal"];
    return function () {
        var i = Math.floor(Math.random() * 6);
        document.getElementsByTagName("body")[0].style.cssText = lgTheme[theme[i]];
    }

}();

var addSearchLetters = function () {
    var div = document.getElementById('searchLetter'), i=0, len=26;
    for(i=0; i<len; i++) {
        var p_child = document.createElement("p");
        var text = document.createTextNode(String.fromCharCode(65+i));
        p_child.appendChild(text);
        p_child.setAttribute("onclick", "searchItem(this.innerHTML)");
        div.appendChild(p_child);
    }    
}
addSearchLetters();
changeTheme();

var getExchangeRate = function () {
    fetch("https://api.coingecko.com/api/v3/exchange_rates")
    .then((res) => {
        return res.json();
    })
    .then(function(out) {
        render(out);
    })
    .catch(err => { throw err });
}


var render = function(exchangeRateJson) {
    var commonCurrencyJson = sourceCurrencyList;
    var divRow = document.getElementById('blockItems');
    function run(countryCode, countryName, rate) {
        var divRowContent = document.createElement('div');
        var divCol = document.createElement('div');
        var flag = document.createElement('img');
        var country = document.createElement('p');
        var value = document.createElement('p');
        country.setAttribute('class', 'country');
        value.setAttribute('class', 'value');
        divRowContent.setAttribute("class", "row content");
        divCol.setAttribute("class", "col");
        flag.setAttribute("src", "https://www.countryflags.io/"+countryCode+"/flat/64.png");
        country.innerHTML = countryName;
        value.innerHTML = rate;
        divCol.appendChild(flag);
        divCol.appendChild(country);
        divCol.appendChild(value);
        divRowContent.appendChild(divCol);
        divRow.appendChild(divRowContent);
    }
    for(var i in commonCurrencyJson['Country']) {
        if(i != 'eur') {
            var countryName = commonCurrencyJson['Country'][i]['name'];
            var flag = commonCurrencyJson['Country'][i]['countryCode'];
            var value = exchangeRateJson['rates'][i].value + ' ' + exchangeRateJson['rates'][i].unit;
            run(flag, countryName, value);   
        }
        else {
            for(var i=0; i<19; i++) {
                var countryName = commonCurrencyJson['Country']['eur'][0]['name'][i];
                var flag = commonCurrencyJson['Country']['eur'][0]['countryCode'][i];
                var value = exchangeRateJson['rates']['eur'].value + ' ' + exchangeRateJson['rates']['eur'].unit;
                run(flag, countryName, value);
            }
        }   
    }
}
getExchangeRate();

var searchItem = function(searchLetter = "") {
    var input, listItems;
    input = searchLetter;
    console.log(input);
    listItems = document.getElementsByClassName('row content');
    console.log(listItems.length);
    for(i=0; i<listItems.length; i++) {
        p = listItems[i].getElementsByClassName("country")[0];
        textValue = p.innerHTML;
        //console.log(textValue);
        if(textValue.indexOf(input) > -1) {
            listItems[i].style.display = "";
        }
        else if(input == ""){
            listItems[i].style.display = '';
        }
        else {
            listItems[i].style.display = "none";
        }

    }
}