const stripeAuth = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pm.globals.get("stripe_key") + ':'));

const tokenPostRequest = {
    url:  'https://api.stripe.com/v1/tokens',
    method: 'POST',
    header: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + stripeAuth
    },
    body: {
        mode: 'urlencoded',
        urlencoded: [
            {key: "card[number]", value: "4242424242424242", disabled: false},
            {key: "card[exp_month]", value: "12", disabled: false},
            {key: "card[exp_year]", value: "2019", disabled: false},
            {key: "card[cvc]", value: "123", disabled: false}
        ]
    }
};

pm.sendRequest(tokenPostRequest, function (err, res) {
    pm.environment.set("stripe_token", res.json().id);
});
