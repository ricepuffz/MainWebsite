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
        setTimeout(() => {
            app.quoteFragments[i - curOffset].active = true;
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
