
function build () {
  const value = document.currentScript.getAttribute('data-gauge')
  const max = document.currentScript.getAttribute('data-max')

  const ctx = document.getElementById(
    document.currentScript.parentNode.id
  ).getContext('2d')

  const chart = new Chart(
    ctx,
    {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          label: '# of Votes',
          data: [value - 3, 6, max - value - 3],
          needleValue: value,
          // data: [5,10,20],
          // backgroundColor: ['Grey', document.currentScript.getAttribute('data-color')]
          backgroundColor: ['Grey', 'Teal', 'Grey'],
          // min: 0,
          max: max,
        }]
      },
      options: {
        rotation: 270, // start angle in degrees
        circumference: 180, // sweep angle in degrees
        // maintainAspectRatio: false,
        // responsive: true,
        plugins: {
          tooltip: {
            enabled: false
          },
        }
      }
    }
  )
}

build()
