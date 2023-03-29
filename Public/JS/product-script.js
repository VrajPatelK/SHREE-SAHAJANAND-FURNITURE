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



// filter logic ....
if (window.location.pathname === '/product')
    handleFilter();

function makeProductCards(products) {

    let inner_html = "";
    products.forEach((product, indx) => {
        let image = (product.image) ?
            `<img src="${product.image}" class="card-img-top" alt="...">` :
            `<img src="../../../Images/other-images/no-product.png" class="card-img-top" alt="">`;
        let html =
            `<div class="col-lg-4 col-md-6 col-12 mb-4 card-div">
                    <div class="card d-block" style="width: 18rem;">
                        <div class="img-div" style="max-height: 12rem;">
                            ${image}
                        </div>
                        <div class="card-header">
                            <h5 class="card-title">
                                ${product.name}
                            </h5>
                            <p class="card-text">
                                ${product.description}
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, velit!
                            </p>
                            <p class="card-text d-flex justify-content-between align-item-center">
                                <span class="badge bg-white" style="font-size: .9rem; color: #1A120B;">
                                    &#x20b9;&nbsp;${product.price}
                                </span>
                                <span class="badge bg-white" style="font-size: .9rem; color: #1A120B;">
                                    ${product.discount}% &nbsp;<span class="text-success">Off</span>
                                </span>
                                <span class="badge bg-white text-success" style="font-size: .9rem;">
                                    <i class="fa-solid fa-check fa-beat"></i> Available
                                </span>
                            </p>
                        </div>

                        <div class="card-footer d-flex justify-content-end align-items-center">
                            <a href="/product/${product.category}/${product._id}" class="btn btn-type-1 card-link">
                                <i class="fa-solid fa-eye fa-beat"></i> &nbsp; Product
                            </a>
                        </div>
                    </div>
                </div>`;
        inner_html += html;
    });

    return inner_html;
}

function handleFilter() {
    $(document).ready(() => {
        let f1 = $("#prize-filter").val().split("-");
        let f2 = $("#material-filter").val();
        let f3 = $("#discount-filter").val();
        let category = $("#category-filter").val();
        let body = { f1, f2, f3, category };

        $.post("/filter-products", body, function (data, status) {
            let inner_html = (data.length > 0) ? makeProductCards(data) :
                '<p class="py-2" style="color: #1A120B; text-align: center; background: #E5E5CB;">Not Matched.</p>';

            $(document).ready(() => {
                $(".card-parent-div").html(inner_html);
            });
        });
    });
}
