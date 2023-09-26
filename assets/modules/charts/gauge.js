function build() {
    const value = document.currentScript.getAttribute('data-gauge')
    const max = document.currentScript.getAttribute('data-max')

    const ctx = document.getElementById(
        document.currentScript.parentNode.id
    ).getContext('2d')

    const chart = new Chart(
        ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    label: '# of Votes',
                    data: [value - 1, 2, max - value - 1],
                    needleValue: value,
                    backgroundColor: ['rgb(190,190,190)', 'Teal', 'rgb(190,190,190)'],
                    // min: 0,
                    max: max,
                }]
            },
            options: {
                rotation: 270, // start angle in degrees
                circumference: 180, // sweep angle in degrees
                // maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            }
        }
    )

    function drawNeedle(chartInstance) {
        const centerX = chartInstance.chartArea.left + (chartInstance.chartArea.right - chartInstance.chartArea.left) / 2;
        const centerY = chartInstance.chartArea.top + (chartInstance.chartArea.bottom - chartInstance.chartArea.top) / 2;

        // Calculate the angle for the needle based on the value
        const angle = ((360 * (value - 3)) / max - 90) * (Math.PI / 180); // Adjust as needed

        // Length of the needle (adjust as needed)
        const needleLength = 30;

        // Calculate the endpoint of the needle
        const needleX = centerX + Math.cos(angle) * needleLength;
        const needleY = centerY + Math.sin(angle) * needleLength;

        // Draw the needle as a line
        chartInstance.ctx.beginPath();
        chartInstance.ctx.moveTo(centerX, centerY);
        chartInstance.ctx.lineTo(needleX, needleY);
        chartInstance.ctx.lineWidth = 2; // Adjust line width as needed
        chartInstance.ctx.strokeStyle = 'red'; // Needle color
        chartInstance.ctx.stroke();
    }

    // Call the custom draw function after the chart has been drawn
    chart.options.plugins.drawNeedle = drawNeedle;

    // Update the chart to trigger the custom draw function
    chart.update();


    charts[document.currentScript.parentNode.id] = chart
    return chart
}

build()