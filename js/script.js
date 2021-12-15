const name = document.querySelector('#name');
name.focus();

const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.display = 'none';

jobRole.addEventListener('change', e => {
    if (e.target.value === "other") {
        otherJobRole.style.display = 'block';
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

const activities = document.getElementById('activities-box');
const activityCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
let total = document.querySelector('#activities-cost');
let totalCost = 0;

//update cost as activities are checked/unchecked
activities.addEventListener('change', e => {
    let activityCost = parseInt(e.target.getAttribute('data-cost'));
    (e.target.checked) ? totalCost += activityCost : totalCost -= activityCost;

    total.innerHTML = `Total: $${totalCost}`;

 //prevent timing conflicts
    const eventTime = e.target.getAttribute('data-day-and-time');
    if (e.target.checked) {
        for (let i = 0; i < activityCheckBoxes.length; i++) {
            if (e.target !== activityCheckBoxes[i] && eventTime === activityCheckBoxes[i].getAttribute('data-day-and-time')) {
                activityCheckBoxes[i].disabled = true;
                activityCheckBoxes[i].parentElement.classList.add('disabled');
            }
        }
    } else {
        for (let i = 0; i < activityCheckBoxes.length; i++) {
            if (eventTime === activityCheckBoxes[i].getAttribute('data-day-and-time')) {
                activityCheckBoxes[i].disabled = false;
                activityCheckBoxes[i].parentElement.classList.remove('disabled');
            }
        }
    }
})

const payMethod = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

creditCard.hidden = false;
payPal.hidden = true;
bitcoin.hidden = true;
payMethod[1].setAttribute('selected', true);

//visibilty logic for paymnet methods. credit card is default
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


const email = document.getElementById('email');
const cardNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');

//verify that name isn't blank
function isValidName(nameVal) {
    const isValid = (nameVal !== '');
    (isValid) ? noHint(name) : showHint(name);
    return isValid;
}

//verify email address is not blank and contains "@" and ".com"
function isValidEmail(emailVal) {
    const isValid = /^[^@]+\@[^@.]+\.com$/i.test(emailVal);
    (isValid) ? noHint(email) : showHint(email);

    return isValid;
}

//verify the total cost field is greater than 0 (1 or more event chosen)
function isValidEvents() {
    const isValid = totalCost > 0;
    (isValid) ? noHint(activities) : showHint(activities);

    return isValid;
};

//verify credit card # is 13-16 digits
function isValidCreditCard(ccVal) {
    const isValid = /\b\d{13,16}\b/.test(ccVal);
    (isValid) ? noHint(cardNum) : showHint(cardNum);

    return isValid;
}

//verify zip is 5 digits
function isValidZip(zipVal) {
    const isValid = /^(\d{5})$/.test(zipVal);
    (isValid) ? noHint(zip) : showHint(zip);

    return isValid;
}

//verify CVV is 3 digits
function isValidCVV(cvvVal) {
    const isValid = /^(\d{3})$/.test(cvvVal);
    (isValid) ? noHint(cvv) : showHint(cvv);

    return isValid;
}

//validate required fields and prevent submission if criteria is not met
form.addEventListener('submit', e => {
    const nameVal = name.value;
    const validName = isValidName(nameVal);

    if (!validName) {
        e.preventDefault();
    }

    const emailVal = email.value;
    const validEmail = isValidEmail(emailVal);

    if (!validEmail) {
        e.preventDefault();
    }

    const validEvents = isValidEvents();

    if (!validEvents) {
        e.preventDefault();
    }

    //only check the following three values if credit card info is selected/visibile
    if (selectedPayMethod === 'credit-card') {
        const cardNumVal = cardNum.value;
        const validCardNum = isValidCreditCard(cardNumVal);

        if (!validCardNum) {
            e.preventDefault();
        }

        const zipVal = zip.value;
        const validZip = isValidZip(zipVal);

        if (!validZip) {
            e.preventDefault();
        }

        const cvvVal = cvv.value;
        const validCVV = isValidCVV(cvvVal);

        if (!validCVV) {
            e.preventDefault();
        }
    }
})

//Show hints depending on validation results
function showHint(element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}
function noHint(element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
}

//add and remove focus to activities check boxes
for (let i = 0; i < activityCheckBoxes.length; i++) {
    activityCheckBoxes[i].addEventListener('focus', e => { e.target.parentElement.classList.add('focus') });
    activityCheckBoxes[i].addEventListener('blur', e => { e.target.parentElement.classList.remove('focus') });
}