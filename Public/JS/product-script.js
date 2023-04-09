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
});

// handle search
function handleSearch() {
    console.log($("#search_bar").val());
    window.location.pathname = "/product/" + $("#search_bar").val();
}



function makeProductCards(products) {

    let inner_html = "";
    products.forEach((product, indx) => {

        // image
        let image = (product.image) ?
            `<img src="${product.image}" class="card-img-top" alt="...">` :
            `<img src="../../../Images/other-images/no-product.png" class="card-img-top" alt="">`;

        //availability-badge
        let availability_badge = (product.stock > 0) ?
            '<span class="badge bg-white text-success" style="font-size: .9rem;"><i class="fa-solid fa-check fa-beat"></i> Available</span>' :
            '<span class="badge bg-white text-danger" style="font-size: .9rem;">Unavailable</span>';

        let html =
            `<div class="col-lg-4 col-md-6 col-12 mb-4 card-div">
                    <div class="card d-block" style="width: 18rem;">
                        <div class="img-div" style="max-height: 12rem;overflow: hidden;">
                            ${image}
                        </div>
                        <div class="card-header">
                            <h5 class="card-title">
                                ${product.name}
                            </h5>
                            <p class="card-text">
                                ${product.description}
                            </p>
                            <p class="card-text d-flex justify-content-between align-item-center">
                                <span class="badge bg-white" style="font-size: .9rem; color: #1A120B;">
                                    &#x20b9;&nbsp;${product.price}
                                </span>
                                <span class="badge bg-white" style="font-size: .9rem; color: #1A120B;">
                                    ${product.discount}% &nbsp;<span class="text-success">Off</span>
                                </span>
                                ${availability_badge}
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

    // filterDisplayManager();

    $(document).ready(() => {
        let f1 = $("#prize-filter").val();
        let f2 = $("#discount-filter").val();
        let path = window.location.pathname;
        let body = { f1, f2, path };

        $.post("/filter-products", body, function (data, status) {
            let inner_html = (data.length > 0) ? makeProductCards(data) :
                '<p class="py-2" style="color: #1A120B; text-align: center; background: #E5E5CB;">Not Matched.</p>';

            $(document).ready(() => {
                if (window.location.pathname.split("/")[2] !== "all") {
                    let page = window.location.pathname.split("/")[2];

                    $("#page_name").text(page.charAt(0).toUpperCase() + page.slice(1) + 's');
                }

                $(".card-parent-div").html(inner_html);
            });
        });
    });
}

function filterDisplayManager() {
    $(document).ready(() => {
        let category = $("#category-filter").val();

        if (category === "all") {
            $(".prize-filter-btn").hide();
            $(".material-filter-btn").hide();
            $(".discount-filter-btn").hide();
        }
        else {

            if (category === "sofa" || category === "table" || category === "mattresse") {
                $(".prize-filter-btn").show();
                $(".material-filter-btn").show();
                $(".discount-filter-btn").show();
            }
            else {
                $(".material-filter-btn").hide();
                $(".prize-filter-btn").show();
                $(".discount-filter-btn").show();
            }
        }
    });
}

// payment-gateway-handler
function initPayment(id, data) {
    const options = {
        key: "rzp_test_UH2jjfYOR8enLr",
        amount: data.amount,
        currency: data.currency,
        name: "Cart",
        description: "Test Transaction",
        image: "data:image/png;base64,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",
        order_id: data.id,
        handler: async (response) => {
            try {
                response.id = id;
                $.post("/api/payment/verify", response, (data, status) => {

                    if (data.paymentStatus) { // if payment successfull ...
                        console.log(data);
                        let body = { id };
                        console.log("body : ", body);

                        $.post("/create-order", body, (data, status) => {
                            window.location.pathname = "/my-orders";
                        });

                    }
                });
            } catch (error) {
                console.log("error", error);
            }
        },
        theme: {
            color: "#3399cc",
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}

function handlePayment(id, amount) {

    $(document).ready(() => {
        let body = { amount: parseInt(amount) };

        $.post("/api/payment/orders", body, (data, status) => {
            console.log(data);
            initPayment(id, data.data);
        });
    });
}

// selling ...
if (window.location.pathname === "/sells") {
    $(document).ready(() => {

        $.get("/all-sells", (data, status) => {

            let itemMap = new Map();
            let sells = data;

            for (let i = 0; i < sells.length; i++) {

                let sell = sells[i];
                let key = moment(sell.sellDate).format("MM-YYYY");
                let val = (sell.totalBill - sell.totalDiscount);

                if (itemMap.get(key))
                    itemMap[key] += val;
                else
                    itemMap.set(key, val);

            }

            // sort the map
            itemMap = new Map([...itemMap.entries()].sort());

            //create X & Y data
            let dataX = [];
            let dataY = [];
            itemMap.forEach((val, key) => {
                dataX.push(val);
                dataY.push(key);
            });

            let ctx = $('.myChart');

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dataY,
                    datasets: [{
                        label: 'Sells',
                        data: dataX,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    });
}