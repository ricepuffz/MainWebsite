$(window).on('load', function () {
    newQuote();
});

function disappear(callback) {
    for (var i = 0; i < app.quoteFragments.length; i++) {
        app.quoteFragments[i].active = false;
    }

    setTimeout(() => {
        app.quoteFragments = [];
        callback();
    }, 2000)
}

function applyQuote(fragments) {
    var offset = 0;

    function helper(i, curOffset) {
        app.quotesLoading++;
        setTimeout(() => {
            app.quoteFragments[i - curOffset].active = true;
            setTimeout(() => {
                app.quotesLoading--;
            }, 1000);
        }, 2000 * (i - curOffset) + 50);
    }

    for (var i = 0; i < fragments.length; i++) {
        if (fragments[i].length <= 100) {
            app.quoteFragments.push({
                "text": fragments[i],
                "active": false
            });
            helper(i, offset);
        } else {
            offset++;
        }
    }
}

function newQuote() {
    app.retrievingNewQuote = true;

    $.ajax({
        type: "GET",
        url: "api/quote/retrievequote",
        success: function (result) {
            applyQuote(result);
        },
        error: function () {
            console.error("Failed to retrieve quote!");
        },
        complete: function () {
            app.retrievingNewQuote = false;
        }
    });
}

function newQuoteClick() {
    if (app.newQuoteTimeout || app.quotesLoading != 0 || app.retrievingNewQuote)
        return;

    app.newQuoteTimeout = true;
    setTimeout(() => {
        app.newQuoteTimeout = false;
    }, 3000);
    disappear(newQuote);
}

var app = new Vue({
    el: '#app',
    data: {
        quoteFragments: [],
        quotesLoading: 0,
        newQuoteTimeout: false,
        retrievingNewQuote: false
    }
});
