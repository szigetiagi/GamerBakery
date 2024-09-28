document.addEventListener('DOMContentLoaded', function () {
    const buyButtons = document.querySelectorAll('.tour-btn');
    buyButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const date = button.parentElement.querySelector('.tour-date').innerText;
            const city = button.parentElement.querySelector('.tour-city').innerText;
            const arena = button.parentElement.querySelector('.tour-arena').innerText;
            alert(`You clicked Buy Tickets for ${city} on ${date} at ${arena}`);
        });
    });
});
