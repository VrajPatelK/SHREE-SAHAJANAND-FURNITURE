// searching logic ..
$(function () {
    $('#search_bar').autocomplete({
        source: function (req, res) {

            $.ajax({
                url: "autocomplete/",
                dataType: "jsonp",
                type: "GET",
                data: req,
                success: function (data) {
                    res(data);
                },
                error: function (err) {
                    console.log('searching err : \n', err);
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            if (ui.item) {
                $('#search_bar').text(ui.item.label);
            }
        }
    })
})