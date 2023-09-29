function build() {
    const value = document.currentScript.getAttribute('data-gauge')
    const max = document.currentScript.getAttribute('data-max')

    const ctx = document.getElementById(
        document.currentScript.parentNode.id
    ).getContext('2d')

    const chart = new Chart(
        ctx, {
            type: 'doughnut',
            labels: [1,535],
            data: {
                // labels: ['Min', '', 'Max'], // Add labels for Min and Max
                labels: [],
                datasets: [{
                    label: 'place',
                    data: [value - 1, 2, max - value - 1],
                    backgroundColor: ['rgb(190,190,190)', 'Teal', 'rgb(190,190,190)'],
                    min: 1,
                    max: max,
                }]
            },
            options: {
                rotation: 270, // start angle in degrees
                circumference: 180, // sweep angle in degrees
                maintainAspectRatio: true,
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
                },

            }
        }
    )
    charts[document.currentScript.parentNode.id] = chart
    return chart
}

build()