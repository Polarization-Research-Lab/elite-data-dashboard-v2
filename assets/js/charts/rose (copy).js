
function build () {
  const ctx = document.getElementById(
    document.currentScript.parentNode.id
  ).getContext('2d')

  data = document.currentScript.getAttribute('data-data').split(";").map(item => parseFloat(item.trim()))

  const chart = new Chart(
    ctx,
    {
      type: 'polarArea',
      data: {
        labels: ['Insulting Language', 'Blame the other side', 'Credit Claiming', 'Compromising Language', 'Policy Discussion', 'Legislative Discussion', 'Foreign Policy'],
        datasets: [
          {
            label: 'Dataset 1',
            data: data,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 12
              }
            },
            max: 40,
            ticks: {
              callback: function(value, index, values) {
                return value + '%'; // modify the callback to add the percentage symbol
              }
            }
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
