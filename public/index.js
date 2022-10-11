//Selectors
const mondayHours = document.querySelector('#monday-hours-input')
const tuesdayHours = document.querySelector('#tuesday-hours-input')
const wednesdayHours = document.querySelector('#wednesday-hours-input')
const thursdayHours = document.querySelector('#thursday-hours-input')
const fridayHours = document.querySelector('#friday-hours-input')
const saturdayHours = document.querySelector('#saturday-hours-input')
const sundayHours = document.querySelector('#sunday-hours-input')
const wageHourly = document.querySelector('#wage-hours-input')
const calculateTotalsBtn = document.querySelector('#calculate-totals')
const totalHoursWorkedLabel = document.querySelector('#total-hours-worked')
const calculateTotalsForm = document.querySelector('.form')
const totalEarningsLabel = document.querySelector('#total-earnings')
const logTotals = document.querySelector('#log-totals')
const loggedWeek = document.querySelector('#logged-week')
const grandTotalHoursLabel = document.querySelector('#grand-total-hours')
const grandTotalEarningsLabel = document.querySelector('#grand-total-earnings')
const updateLogBtn = document.querySelector("#update-log")
const logSection = document.getElementsByClassName('log-area')[0];

//Pre-defined variables
let mondayHoursAmount = 0
let tuesdayHoursAmount = 0
let wednesdayHoursAmount = 0
let thursdayHoursAmount = 0
let fridayHoursAmount = 0
let saturdayHoursAmount = 0
let sundayHoursAmount = 0
let hourlyWage = 0
let totalHoursWorked = 0
let totalEarnings = 0
let grandTotalHoursWorked = 0
let grandTotalEarnings = 0

//Functions
function mondayHoursAmountHandler(e) {
    mondayHoursAmount = parseFloat(e.target.value)
}

function tuesdayHoursAmountHandler(e) {
    tuesdayHoursAmount = parseFloat(e.target.value)
}

function wednesdayHoursAmountHandler(e) {
    wednesdayHoursAmount = parseFloat(e.target.value)
}

function thursdayHoursAmountHandler(e) {
    thursdayHoursAmount = parseFloat(e.target.value)
}

function fridayHoursAmountHandler(e) {
    fridayHoursAmount = parseFloat(e.target.value)
}

function saturdayHoursAmountHandler(e) {
    saturdayHoursAmount = parseFloat(e.target.value)
}

function sundayHoursAmountHandler(e) {
    sundayHoursAmount = parseFloat(e.target.value)
}

function hourlyWageAmountHandler(e) {
    hourlyWage = parseFloat(e.target.value)
}

function calculateTotals(e) {
    e.preventDefault()
    totalHoursWorked = Math.round(
        (mondayHoursAmount+
        tuesdayHoursAmount+
        wednesdayHoursAmount+
        thursdayHoursAmount+
        fridayHoursAmount+
        saturdayHoursAmount+
        sundayHoursAmount + 
        Number.EPSILON) * 100) / 100
    totalEarnings = Math.round((totalHoursWorked * hourlyWage + Number.EPSILON) * 100) / 100
    if (isNaN(totalHoursWorked) || isNaN(totalEarnings)) {
        formatIncorrectAlert()
        totalHoursWorkedLabel.innerHTML = ('')
        totalEarningsLabel.innerHTML = ('')
    }
    else {
        let newPara = document.createElement('p')
        newPara.textContent = "Total Hours Worked: " + totalHoursWorked
        let newPara2 = document.createElement('p')
        newPara2.textContent = "Total Earnings: $" + totalEarnings
        totalHoursWorkedLabel.innerHTML = ('')
        totalEarningsLabel.innerHTML = ('')
        totalHoursWorkedLabel.appendChild(newPara)
        totalEarningsLabel.appendChild(newPara2)
    }
}

function updateLog(dataArr) {
    logSection.innerHTML = null;
    if (dataArr.length === 0) {
        const p = document.createElement('p');
        const t = document.createTextNode("Response came back with no results!");
        p.appendChild(t);
        logSection.appendChild(p)
    } else {
        dataArr.forEach(item => {
            const p = document.createElement('p');
            const t = document.createTextNode(item)
            p.appendChild(t);
            logSection.appendChild(p)
        })
    }
}

function updateGrandTotalHours(dataArr) {
  grandTotalHoursLabel.innerHTML = null;
    if (dataArr.length === 0) {
        const p = document.createElement('p');
        const t = document.createTextNode("Response came back with no results!");
        p.appendChild(t);
        grandTotalHoursLabel.appendChild(p)
    } else {
        dataArr.forEach(item => {
            const p = document.createElement('p');
            const t = document.createTextNode(item)
            p.appendChild(t);
            grandTotalHoursLabel.appendChild(p)
        })
    }
}

function updateGrandTotalEarnings(dataArr) {
   grandTotalEarningsLabel.innerHTML = null;
    if (dataArr.length === 0) {
        const p = document.createElement('p');
        const t = document.createTextNode("Response came back with no results!");
        p.appendChild(t);
        grandTotalEarningsLabel.appendChild(p)
    } else {
        dataArr.forEach(item => {
            const p = document.createElement('p');
            const t = document.createTextNode(`$${item}`)
            p.appendChild(t);
            grandTotalEarningsLabel.appendChild(p)
        })
    }
}

function noCalculatedTotalsAlert() {
    alert("You have not calculated your totals yet. Please calculate your totals so you can store them in the log")
}

function formatIncorrectAlert() {
    alert("The values you have entered have an incorrect format. Please fix the format then recalculate.")
}

function storeTotalsInLogAlert() {
    alert("You successfully stored your calculated totals in the database. Click on Update Log to update your Grand Totals.")
}

function testAlert() {
    alert("You successfully stored your calculated totals in the database. Click on Update Log to update your Grand Totals.")
}

//Event Listeners
mondayHours.addEventListener('change',mondayHoursAmountHandler)

tuesdayHours.addEventListener('change',tuesdayHoursAmountHandler)

wednesdayHours.addEventListener('change',wednesdayHoursAmountHandler)

thursdayHours.addEventListener('change',thursdayHoursAmountHandler)

fridayHours.addEventListener('change',fridayHoursAmountHandler)

saturdayHours.addEventListener('change',saturdayHoursAmountHandler)

sundayHours.addEventListener('change',sundayHoursAmountHandler)

wageHourly.addEventListener('change',hourlyWageAmountHandler)

calculateTotalsForm.addEventListener('submit', calculateTotals)

//Event listeners with GET requests
updateLogBtn.addEventListener("click", async () => {
    await axios
        .get('http://localhost:5050/grandtotalhours')
        .then(res => updateGrandTotalHours(res.data))
})

updateLogBtn.addEventListener("click", async () => {
    await axios
        .get(`http://localhost:5050/log`)
        .then(res => updateLog(res.data))
})

updateLogBtn.addEventListener("click", async () => {
    await axios
        .get('http://localhost:5050/grandtotalearnings')
        .then(res => updateGrandTotalEarnings(res.data))
})

//Event listener with POST request
logTotals.addEventListener('click', async () => {
    if (totalHoursWorked == 0 || totalEarnings == 0) {
        noCalculatedTotalsAlert()
    }
    else if (isNaN(totalHoursWorked) || isNaN(totalEarnings)) {
        formatIncorrectAlert()
        totalHoursWorkedLabel.innerHTML = ('')
        totalEarningsLabel.innerHTML = ('')
    }
    else {
        let body = { log: `Logged ${totalHoursWorked} hours for a total of $${totalEarnings}.` }
        await axios
            .post(`http://localhost:5050/log`, body)
            .then(res => storeTotalsInLogAlert())
    }
    body = { log: totalHoursWorked }
    await axios
        .post('http://localhost:5050/addgrandtotalhours', body)
    body = { log: totalEarnings }
    await axios
        .post('http://localhost:5050/addgrandtotalearnings', body)
    totalHoursWorked = 0
    totalEarnings = 0
    totalHoursWorkedLabel.innerHTML = ('')
    totalEarningsLabel.innerHTML = ('')
})