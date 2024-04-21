// Assicurati che il documento HTML sia completamente caricato prima di eseguire il codice JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Inizializza Stripe con la tua chiave pubblica
    var stripe = Stripe('pk_test_51P7cAmAwzptSPu4nbAEojm3OEBoyqTtqeGCB8622L5Qk5FSSa291gN4DFcwapXDXMDKcLIZUS4qgXqv0k1tXsvhM00tLa60Waf');

    // Ottieni il riferimento al modulo di pagamento
    var form = document.getElementById('payment-form');

    // Aggiungi un ascoltatore di eventi per la sottomissione del modulo
    form.addEventListener('submit', function(event) {
        // Evita il comportamento predefinito di sottomissione del modulo
        event.preventDefault();

        // Ottieni i dati del modulo
        var formData = {
            card: {
                number: document.getElementById('card-number').value,
                exp_month: document.getElementById('expiry').value.split('/')[0],
                exp_year: document.getElementById('expiry').value.split('/')[1],
                cvc: document.getElementById('cvc').value
            }
        };

        // Invia i dati al server utilizzando Stripe.js
        stripe.createToken('card', formData).then(function(result) {
            if (result.error) {
                // Gestisci gli errori di Stripe
                console.error('Errore durante la creazione del token:', result.error);
            } else {
                // Invia il token al server Node.js
                fetch('/submit-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: result.token }),
                }).then(function(response) {
                    // Gestisci la risposta del server
                    return response.json();
                }).then(function(data) {
                    console.log('Risposta del server:', data);
                    // Esegui ulteriori azioni in base alla risposta del server
                }).catch(function(error) {
                    console.error('Errore durante la richiesta al server:', error);
                });
            }
        });
    });
});
