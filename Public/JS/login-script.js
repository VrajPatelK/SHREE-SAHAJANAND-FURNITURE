$(document).ready(function () {
    $('#btnradio1').click(function () {
        window.location.pathname = "/customer-login"
    });

    $('#btnradio2').click(function () {
        window.location.pathname = "/sys-user/login"
    });
});

function handleResetPass() {
    let pass = $("#pass").val();
    let path = window.location.pathname;

    let body = { pass, path }

    $.post("/reset-password", body, (data, status) => {

        let html =
            `<div class="container alert alert-success alert-dismissible fade show" id="msg-div" role="alert">
                ${data.msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;

        $("#msg-div").html(html);
        setTimeout(() => {
            window.location = "/customer-login"
        }, 5000)
        ;
    });
}