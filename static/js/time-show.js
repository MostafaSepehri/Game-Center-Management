const d = new Date();

const weekday = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(d);
const day = new Intl.DateTimeFormat('fa-IR', { day: 'numeric' }).format(d);
const month = new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(d);
const year = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(d);

document.getElementById("date").innerText =
    weekday + "، " + day + " " + month + " " + year;