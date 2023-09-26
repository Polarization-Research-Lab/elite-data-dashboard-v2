
function build () {
  const ctx = document.getElementById(
    document.currentScript.parentNode.id
  ).getContext('2d')

  const chart = new Chart(
    ctx,
    {
      type: 'pie',
      data: {
        labels: ['Floor', 'Newsletters', 'Public Statements', 'Twitter/X'],
        datasets: [{
          data: [1,1,1,1],
          // backgroundColor: ['Grey', 'Teal', 'Grey'],
        }]
      },
      options: {
        // maintainAspectRatio: false,
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false
          },
          legend: {
            // position: 'top',
            display: false,
          },
          title: {
            display: false,
            text: '...'
          },
        }
      }
    }
  )
  charts[document.currentScript.parentNode.id] = chart
  return chart
}

build()
