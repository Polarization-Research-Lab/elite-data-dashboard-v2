function build () {

  const ctx = document.getElementById(
    document.currentScript.parentNode.id
  ).getContext('2d')

  data = [1,1,1,1,1,1,1]
  title = document.currentScript.dataset.title
  const chart = new Chart(
    ctx,
    {
      type: 'polarArea',
      data: {
        labels: ['Insulting Language', 'Blame and Accusations', 'Credit Claiming', 'Bipartisanship and Compromise', 'Policy Discussion', 'Legislative Discussion', 'Foreign Policy'],//, 'Advertising'],
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
            // max: 1,
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
        }
      },

    }
  )
  charts[document.currentScript.parentNode.id] = chart
}

build()
