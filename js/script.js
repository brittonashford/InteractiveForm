const name = document.querySelector('#name');
name.focus();

const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.display = 'none';

jobRole.addEventListener('change', e => {
    if (e.target.value === "other") {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.value = '';
        otherJobRole.style.display = 'none';
    }
})

const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');
shirtColor.disabled = true;

shirtDesign.addEventListener('change', e => {
    shirtColor.disabled = false;
    for (i = 0; i < shirtColor.children.length; i++) {
        let designTarget = e.target.value;
        let dataTheme = shirtColor[i].getAttribute('data-theme');
        if (designTarget === dataTheme) {
            shirtColor[i].hidden = false;
            shirtColor[i].setAttribute('selected', true);
        } else {
            shirtColor[i].hidden = true;
            shirtColor[i].removeAttribute('selected');
        }
    }
})

const activities = document.querySelector('#activities');
let total = document.querySelector('#activities-cost');
let totalCost = 0;

activities.addEventListener('change', e => {
    let activityCost = parseInt(e.target.getAttribute('data-cost'));

    if (e.target.checked === true) {
        totalCost += activityCost;
    } else if (e.target.checked === false) {
        totalCost -= activityCost;
    }

    total.innerHTML = `Total: $${totalCost}`;
})

const payMethod = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

creditCard.hidden = false;
payPal.hidden = true;
bitcoin.hidden = true;
payMethod[1].setAttribute('selected', true);

payMethod.addEventListener('change', e => {
    const selectedPayMethod = e.target.value;
    if (selectedPayMethod === 'paypal') {
        creditCard.hidden = true;
        bitcoin.hidden = true;
        paypal.hidden = false;
    } else if (selectedPayMethod === 'credit-card') {
        creditCard.hidden = false;
        bitcoin.hidden = true;
        paypal.hidden = true;
    } else if (selectedPayMethod === 'bitcoin') {
        creditCard.hidden = true;
        bitcoin.hidden = false;
        paypal.hidden = true;
    }          
});