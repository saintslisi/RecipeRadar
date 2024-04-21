const express = require('express');
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')("sk_test_51P7cAmAwzptSPu4ntZWcCiwLsGN6PtCIJVGMSzLPpvdfoSbs9bSP8Gu1iNNrkPRxN8OXWDDuJupLGWeuAVquvvif008oF7aTbb");
const app = express();
const port = 3000;

app.use(express.json());

app.post('/submit-payment', async (req, res) => {
    const { cardNumber, expiry, cvc, cardholderName } = req.body;


    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Importo in centesimi (es. $10.00)
            currency: 'usd',
            payment_method_types: ['card'],
            capture_method: 'automatic',
            payment_method_data: {
                type: 'card',
                card: 'pm_card_visa'
                /*{
                    number: cardNumber,
                    exp_month: expiry.split('/')[0],
                    exp_year: expiry.split('/')[1],
                    cvc: cvc
                }*/
            }
        });

        res.json({ success: true, paymentIntent });
    } catch (error) {
        console.error('Errore durante il pagamento:', error);
        res.status(500).json({ success: false, error: 'Errore durante il pagamento' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
