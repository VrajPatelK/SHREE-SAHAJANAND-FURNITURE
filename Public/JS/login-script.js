$(document).ready(function () {
    $('#btnradio1').click(function () {
        window.location.pathname = "/customer-login"
    });

    $('#btnradio2').click(function () {
        window.location.pathname = "/sys-user/login"
    });
});