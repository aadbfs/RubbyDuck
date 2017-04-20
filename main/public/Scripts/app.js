"use strict";
(function () {
    var rubbyDuckUrl="http://localhost:3100/api/emails";
    // Attach a submit handler to the form
    $("#subscribe").submit(function (event) {
        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $(this),
            email = $form.find("input[name='email']").val(),
            url = rubbyDuckUrl;

        // Send the data using post
        var posting = $.post(url, { email: email });

        // Put the results in a div
        posting.done(function (data) {
            $("#mainEmail").val("");
            $("#email").val("");
            console.log(data);
        });
    });

        // Attach a submit handler to the form
    $("#mainSubscribe").submit(function (event) {
        // Stop form from submitting normally
        event.preventDefault();

        // Get some values from elements on the page:
        var $form = $(this),
            email = $form.find("input[name='mainEmail']").val(),
            url = rubbyDuckUrl;

        // Send the data using post
        var posting = $.post(url, { email: email });

        // Put the results in a div
        posting.done(function (data) {
            $("#mainEmail").val("");
            $("#email").val("");
            console.log(data);
        });
    });
})();