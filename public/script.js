document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('payment-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = {
            cardNumber: document.getElementById('card-number').value,
            expiry: document.getElementById('expiry').value,
            cvc: document.getElementById('cvc').value,
            cardholderName: document.getElementById('cardholder-name').value
        };

        fetch('/submit-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Payment submitted:', data);
            // Gestisci la risposta dal server qui
        })
        .catch(error => {
            console.error('Errore durante l\'invio del pagamento:', error);
            // Gestisci gli errori qui
        });
    });
});
