fetch('assets/data/searchmaps.json')
    .then(response => response.json())
    .then(data => {
        legis = data
        fetch('assets/data/legislators-min.json')
            .then(response => response.json())
            .then(data => {
                legisMin = data
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            })
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });


// Set up display UI / animation logic
searchContainer = document.getElementById('search-bar-container');
searchInput = document.getElementById('search-input');
searchResults = document.getElementById('search-results');

searchContainer.addEventListener('mouseenter', () => {
    searchInput.focus();
});

searchInput.addEventListener('focus', () => {
    // Code to execute when searchInput gains focus
    searchResults.style.display = 'block';
    searchResults.classList.remove('drop-out');
    searchResults.classList.add('drop-in');
});

searchInput.addEventListener('blur', () => {
    // Code to execute when searchInput loses focus
    if (searchInput.innerText == '') {
        searchInput.style.color = 'rgb(117,117,117)'
        searchInput.innerText = 'Find your representatives...'
        firstInput = true
    }
    setTimeout(() => {
        if (!searchResults.contains(document.activeElement)) {
            searchResults.classList.remove('drop-in');
            searchResults.classList.add('drop-out');
        }
    }, 1); // Adjust the delay time as needed
});

searchResults.addEventListener('animationend', () => {
    if (searchResults.classList.contains('drop-out')) {
        searchResults.style.display = 'none';
    }
});

header = document.querySelector('header');
searchResults.addEventListener('mouseleave', () => {
    if (!header.contains(event.relatedTarget)) {
        searchInput.blur();
    }
});

// setup search functionality
states_names = ['Arizona', 'Alabama', 'Alaska', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
state_abbreviations = ['AZ', 'AL', 'AK', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

autocompleteText = document.getElementById('autocomplete-text');

tabIndex = 0
firstInput = true
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        tabIndex = 0
        if (/^\d{5}$/.test(searchInput.innerText)) {
            // Code for handling zip code search
            // return all legis with zip
            searchLowerCase = searchInput.innerText.toLowerCase();

            getZipToState(searchLowerCase)
                .then(state => {
                    if (state) {
                        query = {
                            state: legis['states'][
                                state_abbreviations[states_names.findIndex(state1 => state1.toLowerCase() === state.toLowerCase())]
                            ],
                            zip: legis['zips'][searchLowerCase],
                        }
                        updateSearchResults(query)
                    } else {
                        query = {
                            state: null,
                            zip: legis['zips'][searchLowerCase],
                        }
                        updateSearchResults(query)
                    }
                });


        } else {
            var searchLowerCase = searchInput.innerText.toLowerCase();
            var indexInNames = states_names.findIndex(state => state.toLowerCase() === searchLowerCase);

            if (indexInNames !== -1) {
                searchLowerCase = searchInput.innerText.toLowerCase();
                query = {
                    state: legis['states'][
                        state_abbreviations[states_names.findIndex(state => state.toLowerCase() === searchLowerCase)]
                    ],
                    zip: null,
                }
                updateSearchResults(query)
            } else {
                // error message and turn red:
            }
        }
    } else if (event.key === 'Tab') {
        event.preventDefault();
        if (filteredNames.length > 0) {
            searchInput.innerText = filteredNames[tabIndex]
            autocompleteText.innerHTML = ''
            setCaratToEnd(searchInput)
        }
        tabIndex += 1
    } else if (event.key != 'Shift') {
        if (firstInput === true) {
            searchInput.innerText = ""
            searchInput.style.color = 'black'
            firstInput = false
        }
    }
    if (tabIndex >= filteredNames.length) {
        tabIndex = 0
    }
});

filteredNames = []
searchInput.addEventListener('input', () => {
    searchTerm = searchInput.innerText.toLowerCase();
    filteredNames = states_names.filter(name => name.toLowerCase().startsWith(searchTerm));

    if (searchInput.innerText.length == 0) {
        autocompleteText.style.display = 'none'
        tabIndex = 0
        filteredNames = []
    } else {
        autocompleteText.style.display = 'block'
    }
    if (filteredNames.length == 0) {
        autocompleteText.style.display = 'none'
    }
    renderAutocompleteOption(filteredNames);
});

function renderAutocompleteOption(options) {
    if (options.length > 0) {
        autocompleteText.innerHTML = options[tabIndex].slice(searchInput.innerText.length)
    }
}

function setCaratToEnd(element) {
    element.focus()
    window.getSelection().selectAllChildren(element)
    window.getSelection().collapseToEnd()
}

async function getZipToState(zipCode) {
    const apiUrl = `https://api.zippopotam.us/us/${zipCode}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        const state = data.places[0].state;
        return state;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


function updateSearchResults(query) {
    // Clear existing text inside search-results
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    // Create profile elements for zip politicians
    if (query.zip == null) {
        const stateProfiles = query.state
            // .filter(bioguideId => legislators[bioguideId]['type'] !== 'Senator')
            .map(bioguideId => createProfileElement(bioguideId));
        addProfileElements(stateProfiles, 'Senators');
    } else {
        const zipProfiles = query.zip.map(bioguideId => createProfileElement(bioguideId));
        const stateProfiles = query.state
            .filter(bioguideId => !query.zip.includes(bioguideId))
            .map(bioguideId => createProfileElement(bioguideId));
        // const stateProfiles = query.state
        // .filter(bioguideId => legislators[bioguideId]['type'] !== 'Senator')
        // .map(bioguideId => createProfileElement(bioguideId));
        zipProfiles[zipProfiles.length - 1].classList.add('vertical-line-item');
        addProfileElements(zipProfiles, 'Representatives');
        addDivider()
        addProfileElements(stateProfiles, 'Senators');
    }

    // Create profile elements for state politicians (excluding duplicates from zip)
    // Add profile elements to search-results div

    function addDivider() {
        const profileElement = document.createElement('div');
        // Create the vertical line element
        const verticalLine = document.createElement('div');
        verticalLine.classList.add('vertical-line');

        searchResults.appendChild(verticalLine)
    }

    function createProfileElement(bioguideId) {
        // Create the profile element
        const profileElement = document.createElement('a');
        profileElement.href = `/profile?bioguideid=${bioguideId}`; // Set the href attribute with the dynamic URL
        profileElement.classList.add('search-profile');
        profileElement.style.textAlign = 'center';

        // Placeholder image
        const imageElement = document.createElement('img');
        imageElement.src = site.baseurl + `/assets/img/legislators/profile_images/${bioguideId}.jpg`; // Replace with actual image path
        imageElement.classList.add('search-profile-image');
        imageElement.onerror = function() {
            this.src = site.baseurl + '/assets/img/legislators/profile_images/missing.png'; // Set the default image path
        };

        const imageContainerElement = document.createElement('div');
        imageContainerElement.classList.add('search-profile-image-container');
        imageContainerElement.appendChild(imageElement);
        profileElement.appendChild(imageContainerElement);


        // Placeholder name
        const nameElement = document.createElement('p');
        nameElement.textContent = legisMin[bioguideId]['name']; // Replace with actual name
        nameElement.classList.add('search-profile-name');
        profileElement.appendChild(nameElement);

        return profileElement;
    }

    function addProfileElements(profiles, title) {
        // Add profile elements to container
        profiles.forEach(profile => searchResults.appendChild(profile));
    }
}