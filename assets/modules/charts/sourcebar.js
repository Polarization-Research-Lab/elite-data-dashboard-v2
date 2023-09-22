function build () {
  const ctx = document.getElementById(
    document.currentScript.parentNode.id
  ).getContext('2d')

  sources = JSON.parse(document.currentScript.getAttribute('data-sources'))

  const chart = new Chart(
    ctx,
    {
      type: 'bar',
      data: {
        labels: ['Twitter', 'Floor Speeches', 'Newsletters', 'Public Statements'],
        datasets: [
          {
            label: '_',
            data: sources,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              callback: function(value, index, values) {
                  if (value === 0) {
                      return value.toString() + '%';
                  } else if (value === 100) {
                      return value.toString() + '%';
                  } else {
                      return '';
                  }
              },
            },
            // max: 100,
            min: 0,
            // suggestedMax: 100,
            maxTicksLimit: 10,
            grid: {display: false}
          },
          x: {
            grid: {display: false}
          }
        },
        plugins: {
          legend: {
            // position: 'top',
            display: false,
          },
          title: {
            display: false,
            text: '...'
          },
          tooltip: {
            callbacks: {
                label: function(context) {
                    return context.formattedValue + '%'
                }
            }
          },
        }
      },

    }
  )
}

build()
