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
    function helper(i) {
        setTimeout(() => {
            app.quoteFragments[i].active = true;
        }, 2000 * i);
    }

    for (var i = 0; i < fragments.length; i++) {
        app.quoteFragments.push({
            "text": fragments[i],
            "active": false
        });
        helper(i);
    }
}

function newQuote() {
    $.ajax({
        type: "GET",
        url: "api/quote/retrievequote",
        success: function (result) {
            applyQuote(result);
        },
        error: function () {
            console.error("Failed to retrieve quote!");
        }
    });
}

var app = new Vue({
    el: '#app',
    data: {
        quoteFragments: []
    }
});
