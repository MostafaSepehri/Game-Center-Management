
let cart = {};
let total = 0;

$('#buffetSelect').select2({
    placeholder: "جستجو...",
    dropdownParent: $('#buffetModal')
});

$('#buffetSelect').on('select2:select', function (e) {

    let name = e.params.data.text;
    let price = parseInt(e.params.data.id);

    if (!cart[name]) {
        cart[name] = { name, price, qty: 0 };
    }

    cart[name].qty++;

    renderCart();

});

function renderCart() {

    let html = "";
    total = 0;

    for (let id in cart) {

        let item = cart[id];
        total += item.price * item.qty;

        html += `
<li class="list-group-item d-flex justify-content-between align-items-center">
${item.name}

<div>
<button class="btn btn-sm btn-danger" onclick="changeQty('${id}',-1)">-</button>
<span class="mx-2">${item.qty}</span>
<button class="btn btn-sm btn-success" onclick="changeQty('${id}',1)">+</button>
</div>

</li>
`;
    }

    $("#cart").html(html);
    $("#total").text(total.toLocaleString());

}

function changeQty(id, val) {

    cart[id].qty += val;

    if (cart[id].qty <= 0) {
        delete cart[id];
    }

    renderCart();

}
