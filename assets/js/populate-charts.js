chartInsertElements = document.querySelectorAll('.dynamic-chart');

chartInsertElements.forEach(element => {
    chartToInsert = element.getAttribute('data-script');
    scriptElement = document.createElement('script');
    scriptElement.src = chartToInsert;

    Array.from(element.attributes).forEach(attribute => {
        if (attribute.name.startsWith('data-')) {
            scriptElement.setAttribute(attribute.name, attribute.value);
        }
    })

    element.appendChild(scriptElement)
});