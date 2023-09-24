document.addEventListener("DOMContentLoaded", function() {
    // Load the state-legislators JSON
    fetch("assets/data/state-legislators.json")
        .then(response => response.json())
        .then(data => {
            stateLegislators = data;
            fetch("assets/data/legislators-meta.json")
                .then(response => response.json())
                .then(data => {
                    legislatorsMeta = data;
                });
        });

    D = document

    const stateSelect = document.getElementById("stateSelect");

    const section1 = document.getElementById("section1");
    const section1Box = document.getElementById("section1-box");

    const section2 = document.getElementById("section2");
    const section2Box = document.getElementById("section2-box");
    const s2StateTitle = document.getElementById("s2-statetitle");

    const section3 = document.getElementById("section3");
    const section3Box = document.getElementById("section3-box");

    const categories = ["insult", "blame", "credit_claiming", "compromise", "policy", "foreign_policy", "legislative_discussion"]


    // state select logic 
    stateSelect.addEventListener("change", function() {
        // Show Section 2 and fade it in from the left
        // section2.classList.add("animate__fadeInUp");
        section2.classList.remove("d-none");
        section2.classList.remove("animate__fadeInUp");

        document.getElementById("start").classList.add("animate__animated", "animate__fadeOutRight");
        // section3.classList.add("animate__animated", "animate__slideOutRight");

        sect2addin()
    });

    document.getElementById("start").addEventListener("animationend", function() {
        if (event.animationName === "fadeOutRight") {
            this.classList.add("d-none")
        }
    })


    // legislator selection logic
    const senatorCards = document.querySelectorAll(".sen-card");
    const repCards = document.querySelectorAll(".rep-card");
    const legCards = document.querySelectorAll(".leg-card");

    function sect3addin(bioguide_id) {
        fetch(`assets/data/legislators/${bioguide_id}.json`)
            .then(response => response.json())
            .then(data => {
                buildProfile(data, bioguide_id)
            });


        // Show Section 3 and fade it in
        if (section3Box.classList.contains('d-none')) {

            section3Box.classList.remove("d-none");
            section3.classList.remove("d-none");
            section3.classList.remove("animate__slideOutRight");

            section3.classList.add("animate__animated", "animate__slideInRight");

            section2.classList.remove("animate__slideInUp");
            section2.classList.add("animate__animated", "animate__slideInRight");

            // remove box 1
            section1Box.classList.add("position-fixed");
            section1Box.style.left = 0
            section1.classList.add("animate__animated", "animate__slideOutLeft");
        }
    }


    section3Box.addEventListener("animationend", function() {
        if (event.animationName === "slideOutRight") {
            section3Box.classList.add("d-none")
            section3Box.classList.remove("position-fixed");
        }
    })

    section1Box.addEventListener("animationend", function() {
        if (event.animationName === "slideOutLeft") {
            section1Box.classList.add("d-none")
            section1Box.classList.remove("position-fixed");
        }
    })

    // profile card logic
    // close button
    const closeSection3Button = document.getElementById("closeSection3");
    closeSection3Button.addEventListener("click", function() {
        l = section3Box.offsetLeft
        section2Box.style.zIndex = 100

        // Close box 3
        section3Box.style.right = 0
        section3Box.classList.add("position-fixed");
        section3.classList.add("animate__slideOutRight");

        // change animation of box 2
        // section2.classList.remove("animate__slideInUp");
        section2.classList.remove("animate__slideInRight");
        section2.classList.add("animate__slideInLeft");

        // re-add box 1
        section1.classList.remove("animate__slideOutLeft");
        section1.classList.add("animate__slideInLeft");
        section1Box.classList.remove("d-none");
    });


    function sect2addin() {
        const stateSelect = document.getElementById("stateSelect");
        const senList = document.getElementById("sen-card-box");
        const repList = document.getElementById("representatives-list");

        // Clear previous content
        senList.innerHTML = "";
        repList.innerHTML = "";

        // Get the selected state's legislators
        const selectedState = stateSelect.value;
        const bioguideIds = stateLegislators[selectedState];
        s2StateTitle.innerHTML = stateSelect.selectedOptions[0].innerHTML

        // console.log(bioguideIds)

        // throw 'hey'
        // Iterate through bioguideIds
        // console.log(legislatorsMeta)
        bioguideIds.forEach(bioguideId => {
            const legislator = legislatorsMeta[bioguideId];
            if (legislator['type'] === 'sen') {
                const senCard = document.createElement("div");
                senCard.classList.add("col-6", "sen-card-parent");
                senCard.innerHTML = `
                    <div class="card sen-card hover-card text-center custom-rounded px-2 h-100">
                        <div class="align-items-center d-flex flex-column">
                            <img src="assets/img/legislators/profile_images/${bioguideId}.jpg" class="card-img-top rounded-circle mx-auto mt-3 img-sen" alt="senator" onerror="this.src = 'assets/img/avatar-default.svg'"">
                            <div class="card-body">
                                <h5 class="card-title">${legislator['name']} (${legislator['party'][0]})</h5>
                            </div>
                        </div>
                    </div>
                `;
                senCard.addEventListener("click", function() { sect3addin(bioguideId) });
                senList.appendChild(senCard);

            } else if (legislator['type'] === 'rep') {
                const repCard = document.createElement("div");
                repCard.classList.add("my-2");
                repCard.innerHTML = `
                    <div class="card rep-card hover-card custom-rounded d-flex flex-row align-items-center">
                        <div class="col-4 my-auto px-4">
                            <img src="assets/img/legislators/profile_images/${bioguideId}.jpg" class="card-img rounded-circle p-2 img-rep" alt="Representative" onerror="this.src = 'assets/img/avatar-default.svg'">
                        </div>
                        <div class="card-body col my-auto">
                            <p class="text-left">${legislator['name']} (${legislator['party'][0]}, ${legislator['state']}-${legislator['district']})</p>
                        </div>
                    </div>
                `;
                repCard.addEventListener("click", function() { sect3addin(bioguideId) });
                repList.appendChild(repCard);
            }
        });

        senatorCards.forEach(function(card) {
            card.addEventListener("click", sect3addin);
        })
        
        // Sort based on last name (chatgpt is a genius)
        // Step 1: Collect all div elements inside repList
        const divs = Array.from(repList.querySelectorAll('div.my-2'));

        // Step 2: Sort the divs based on last name
        divs.sort((a, b) => {
            const lastNameA = a.querySelector('.text-left').textContent.split(' ').slice(1).join(' ');
            const lastNameB = b.querySelector('.text-left').textContent.split(' ').slice(1).join(' ');
            return lastNameA.localeCompare(lastNameB);
        });

        // Step 3: Remove existing divs from repList
        while (repList.firstChild) {
            repList.removeChild(repList.firstChild);
        }

        // Step 4: Append the sorted divs back to repList
        divs.forEach((div) => {
            repList.appendChild(div);
        });
    }

    function getOrdinalSuffix(number) {
        const lastDigit = number % 10;
        const secondLastDigit = Math.floor((number % 100) / 10);

        if (secondLastDigit === 1 || lastDigit === 0 || lastDigit >= 4) {
            return 'th';
        } else if (lastDigit === 1) {
            return 'st';
        } else if (lastDigit === 2) {
            return 'nd';
        } else if (lastDigit === 3) {
            return 'rd';
        }
    }


    function buildProfile(data, bioguide_id) {
        D.querySelector('#section3-pledge').innerHTML = 'No'
        D.querySelector('#section3-chamber').innerHTML = (data['type'] === 'rep') ? 'Representative' : (data['type'] === 'sen') ? 'Senator' : ''
        D.querySelector('#section3-name').innerHTML = `${data['first_name']} ${data['last_name']}`
        D.querySelector('#section3-party').innerHTML = `(${data['party'][0]})`
        // D.querySelector('#section3-serving-since').innerHTML = "some time" //data['']
        D.querySelector('#avatar').src = `assets/img/legislators/profile_images/${bioguide_id}.jpg`
        D.querySelector('#avatar').addEventListener('error', function() {
            this.src = `assets/img/avatar-default.svg`
        });

        // update discourse rose
        chart = charts[`discourse-rose`]
        chart.data.datasets[0].data = categories.map(category => data['scorecard'][category]['percent']);

        backgroundColors = charts['discourse-rose'].data.datasets[0].backgroundColor

        chart.update()

        // update cateogry plots
        for (const [index, category] of categories.entries()) {
            chart = charts[`gauge-${category}`]
            chart.data.datasets[0].data = [data['scorecard'][category]['rank'] - 15, 30, 535 - data['scorecard'][category]['rank'] - 15]
            chart.data.datasets[0].needleValue = data['scorecard'][category]['rank']
            chart.data.datasets[0].backgroundColor = ['Grey', backgroundColors[index], 'Grey'];
            chart.update()

            const rank = data['scorecard'][category]['rank'];
            const roundedRank = Math.round(rank);
            const ordinalSuffix = getOrdinalSuffix(roundedRank);

            // Update the innerHTML of the span
            const parentElement = chart.canvas.closest('.category-guage');

            // Find the closest span with class "place" within the parent element
            const spanElement = parentElement.querySelector('span.place');
            // Update the innerHTML of the found span
            if (spanElement) {
                spanElement.innerHTML = `${roundedRank}${ordinalSuffix}`;
            }

            // document.querySelector($GET CLOSEST SPAN WITH CLASS "PLACE"$).innerHTML = `${roundedRank}${ordinalSuffix}`;
        }
    }


    // Loop through each element and add the onclick function
    legCards.forEach((element) => {
      const bioguide_id = element.getAttribute('data-bioguide_id');
      element.addEventListener('click', function() {

        // Make state select based on this.getAttribute('data-state')
        stateSelect.value = this.getAttribute('data-state');
        stateSelect.dispatchEvent(new Event('change'));

        sect2addin();
        sect3addin(bioguide_id);
      });
    });
});