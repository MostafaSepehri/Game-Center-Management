const moneyInputs = document.querySelectorAll(".money-input");

moneyInputs.forEach(input => {
    input.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, ""); // حذف غیر عدد
        this.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // فرمت سه‌رقمی
    });
});
