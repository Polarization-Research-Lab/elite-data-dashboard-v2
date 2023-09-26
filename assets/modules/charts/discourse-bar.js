function build() {

    const ctx = document.getElementById(
        document.currentScript.parentNode.id
    ).getContext('2d')

    data = [1, 1, 1, 1, 1, 1, 1]
    title = document.currentScript.dataset.title
    const chart = new Chart(
        ctx, {
            plugins: [ChartDataLabels],
            type: 'bar',
            data: {
                labels: ['Insulting Language', 'Blame and Accusations', 'Credit Claiming', 'Bipartisanship and Compromise', 'Policy Discussion', 'Legislative Discussion', 'Foreign Policy'], //, 'Advertising'],
                datasets: [{
                    label: '_',
                    data: data,
                    backgroundColor: ["#999999", "#E69F00", "#56B4E9", "#009E73", "#CC79A7", "#0072B2", "#D55E00"] //, "#F0E442"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value, index, values) {
                                return value + '%'; // modify the callback to add the percentage symbol
                            }
                        },
                        max: 100,
                        min: 0,
                        // suggestedMax: 100,
                        maxTicksLimit: 10,
                        grid: { display: false }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: {
                        // position: 'top',
                        display: false,
                    },
                    title: {
                        display: true,
                        text: title,
                        font: {
                            size: 32,
                            weight: 'normal',
                            family: 'Ubuntu, sans-serif'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.formattedValue + '%'
                            }
                        }
                    },
                    datalabels: { // Configure the datalabels plugin
                        align: 'top', // Display labels at the top of the bars
                        anchor: 'end', // Align labels to the end of the bars
                        font: {
                            size: 16, // Adjust label font size as needed
                        },
                        formatter: function(value, context) { // Use formatter to add "%" symbol
                            return value + '%';
                        },
                    },
                }
            },

        }
    )
    charts[document.currentScript.parentNode.id] = chart
}

build()