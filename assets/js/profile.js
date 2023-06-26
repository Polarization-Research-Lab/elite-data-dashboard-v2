fetch('assets/data/legislators.json')
    .then(response => response.json())
    .then(data => {
        // Process the loaded JSON data
        build(data)
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });

function build(data) {
    // Get the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const bioguide = urlParams.get('bioguideid');

    // Find the congressperson's profile by ID
    const legislator = data[bioguide]

    if (legislator === undefined) {
        window.location.href = site.baseurl + "/profile_not_found.html";
    }

    fetch('profile_template.html')
        .then(response => response.text())
        .then(htmlString => {
            // Process and fill the HTML template
            template_fill = {
                legislator: legislator,
                bioguideid: bioguide,
                site: site,
                meta: {
                    ideoHist: JSON.stringify([4, 3, 14, 8, 12, 16, 17, 20, 19, 24, 29, 33, 38, 42, 41, 51, 47, 49, 43, 39, 34, 30, 26, 21, 17, 14, 18, 12, 17, 22, 27, 32, 36, 33, 41, 48, 44, 49, 52, 41, 39, 47, 41, 45, 39, 33, 27, 22, 16, 11, 5, 3]), // <-- used chatgpt to generate this list of numbers
                }
            }
            template = htmlString.replace(/{{(.*?)}}/g, (match, key) => {
                const nestedValue = key.trim().split('.').reduce((obj, property) => obj && obj[property], template_fill);
                return nestedValue !== undefined ? nestedValue : '';
            });

            // console.log(template)
            // Insert the HTML template into the document
            document.getElementById('profile-container').innerHTML = template;

            const chartInsertElements = document.querySelectorAll('.dynamic-chart');

            chartInsertElements.forEach(element => {
                const chartToInsert = element.getAttribute('data-script');
                const scriptElement = document.createElement('script');
                scriptElement.src = chartToInsert;

                Array.from(element.attributes).forEach(attribute => {
                    if (attribute.name.startsWith('data-')) {
                        scriptElement.setAttribute(attribute.name, attribute.value);
                    }
                })

                // scriptElement.setAttribute(
                // 'data-canvasid', 
                // Array.from(element.children).filter(child => child.tagName === 'CANVAS')[0].id // <-- this is the "id" of the first canvas element located inside the div
                // )

                element.appendChild(scriptElement)

                // console.log(scriptElement)
            });
            // const canvasElements = document.querySelectorAll('canvas');

            // canvasElements.forEach(canvas => {
            //   if (canvas.hasAttribute('data-script')) {



            //   }
            // });


        })
        .catch(error => {
            console.error('Error:', error);
        });


}