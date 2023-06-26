function build() {
    const ctx = document.getElementById(
        document.currentScript.parentNode.id
    ).getContext('2d')

    function randomIntegers(n, min, max) {
        const result = [];
        while (result.length < n) {
            const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!result.includes(randomInt)) {
                result.push(randomInt);
            }
        }
        return result;
    }

    ideoHist = JSON.parse(document.currentScript.dataset.data)

    const chart = new Chart(
        ctx, {
            type: 'line',
            data: {
                labels: ['Liberal', ...Array.from({ length: 47 }, (v, i) => ''), 'Conservative'],
                datasets: [{
                    label: 'Ideology',
                    data: ideoHist,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,.8)',
                    fillColor: 'rgba(0,0,0,.8)',
                    fill: true,
                    tension: .4,
                }, ]
            },
            options: {
                animate: false,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        display: true,
                        ticks: {
                            font: {
                                size: 22,
                                weight: 'bold',
                            }
                        },
                    },
                    y: {
                        grid: { display: false },
                        ticks: { display: false },
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    annotation: {
                        annotations: [],
                    }
                },
            },
        }
    )

    ideoScore = parseFloat(document.currentScript.dataset.ideoscore) / 100
    const lineValue = chart.scales["x"].min + (chart.scales["x"].max - chart.scales["x"].min) * ideoScore
    chart.options.plugins.annotation.annotations.push({
        type: "line",
        mode: "vertical",
        scaleID: "x",
        value: lineValue,
        borderColor: "purple",
        borderWidth: 2,
    });

    chart.update();
}

build()