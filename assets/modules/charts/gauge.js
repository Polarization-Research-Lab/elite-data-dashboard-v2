
function build () {
  const value = document.currentScript.getAttribute('data-gauge')
  const max = document.currentScript.getAttribute('data-max')

  const ctx = document.getElementById(
    document.currentScript.parentNode.id
  ).getContext('2d')

  const chart = new Chart(
    ctx,
    {
      type: 'gauge',
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
        },
        needle: {
          // Needle circle radius as the percentage of the chart area width
          radiusPercentage: 2,
          // Needle width as the percentage of the chart area width
          widthPercentage: 1.2,
          // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
          lengthPercentage: 80,
          // The color of the needle
          color: 'rgba(0, 0, 0, 1)'
        },
      }
    }
  )
  charts[document.currentScript.parentNode.id] = chart
  return chart
}

build()
