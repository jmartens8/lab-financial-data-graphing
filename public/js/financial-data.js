
let myChart

const printChart = bitCoinData => {
    console.log(bitCoinData);
    // x axis
    const daysInMonth = Object.keys(bitCoinData.data.bpi)
    console.log(daysInMonth);
    
    // y axis
    const valuesPerDay = Object.values(bitCoinData.data.bpi)
    console.log(valuesPerDay);
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: daysInMonth,
            datasets: [{
                label: 'BitCoin price per day',
                data: valuesPerDay,
                backGroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then(function (response) {
    // handle success
    printChart(response)
    
})
.catch(function (error) {
    // handle error
    console.log(error);
})
.then(function () {
    // always executed
   
});


const ctx = document.getElementById('myChart').getContext('2d');

document.getElementById('submitButton').addEventListener('click', timeRange)

function timeRange() {
    let startDate = document.querySelector('#startInput').value
    let endDate = document.querySelector('#endInput').value

    myChart.destroy()

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=eur`)
    .then(function (response) {
        // handle success
        printChart(response)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

