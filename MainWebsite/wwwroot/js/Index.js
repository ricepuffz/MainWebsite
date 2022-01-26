$(window).on('load', function () {
    newQuote();
});

function disappear(callback) {
    document.getElementById("quotetext").style.opacity = 0;
    setTimeout(() => {
        callback();
    }, 2000)
}

function applyQuote(fragments) {
    var quotetext = document.getElementById("quotetext");

    quotetext.innerHTML = fragments[0];
    quotetext.style.opacity = 1;
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
