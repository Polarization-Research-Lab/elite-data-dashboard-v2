// Load the state-legislators JSON
fetch("assets/data/state-legislators.json")
    .then(response => response.json())
    .then(data => {
        stateLegislators = data;
        // Continue with the rest of the code...

        // Load the legislators-meta JSON
        fetch("assets/data/legislators-meta.json")
            .then(response => response.json())
            .then(data => {
                legislatorsMeta = data;
                // Continue with the rest of the code...
                // stateSelect.selectedIndex = 3;
                // const changeEvent = new Event("change");
                // stateSelect.dispatchEvent(changeEvent);
            });
    });

D = document

document.addEventListener("DOMContentLoaded", function() {

    const stateSelect = document.getElementById("stateSelect");

    const section1 = document.getElementById("section1");
    const section1Box = document.getElementById("section1-box");

    const section2 = document.getElementById("section2");
    const section2Box = document.getElementById("section2-box");
    const s2StateTitle = document.getElementById("s2-statetitle");

    const section3 = document.getElementById("section3");
    const section3Box = document.getElementById("section3-box");

    const categories = ["insult","blame","credit_claiming","compromise","policy","foreign_policy","legislative_discussion"]


    // state select logic 
    stateSelect.addEventListener("change", function() {
        // Show Section 2 and fade it in from the left
        // section2.classList.add("animate__fadeInUp");
        section2.classList.remove("d-none");
        section2.classList.remove("animate__fadeInUp");

        document.getElementById("start").classList.add("animate__animated", "animate__fadeOutRight");
        // section3.classList.add("animate__animated", "animate__slideOutRight");

        updateSection2()
    });
    document.getElementById("start").addEventListener("animationend", function() {
        if (event.animationName === "fadeOutRight") {
            this.classList.add("d-none")
        }
    })


    // legislator selection logic
    const senatorCards = document.querySelectorAll(".sen-card");
    const repCards = document.querySelectorAll(".rep-card");

    function sect3addin(bioguide_id) {
        fetch(`assets/data/legislators/${bioguide_id}.json`)
            .then(response => response.json())
            .then(data => {
                buildProfile(data, bioguide_id)
            });


        // Show Section 3 and fade it in
        if (section3Box.classList.contains('d-none')) {

            console.log('moved')
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

    senatorCards.forEach(function(card) {
        card.addEventListener("click", sect3addin);
    })

    repCards.forEach(function(card) {
        card.addEventListener("click", sect3addin);
    });


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


    function updateSection2() {
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

        // Iterate through bioguideIds
        bioguideIds.forEach(bioguideId => {
            const legislator = legislatorsMeta[bioguideId];

            if (legislator['type'] === 'Senator') {
                const senCard = document.createElement("div");
                senCard.classList.add("col-6", "sen-card");
                senCard.innerHTML = `
                    <div class="card sen-card hover-card text-center custom-rounded px-2">
                        <div class="align-items-center d-flex flex-column">
                            <img src="assets/img/legislators/profile_images/${bioguideId}.jpg" class="card-img-top rounded-circle mx-auto mt-3 img-sen" alt="senator">
                            <div class="card-body">
                                <h5 class="card-title">${legislator['name']}</h5>
                            </div>
                        </div>
                    </div>
                `;
                senCard.addEventListener("click", function() { sect3addin(bioguideId) });
                senList.appendChild(senCard);

            } else if (legislator['type'] === 'Representative') {
                const repCard = document.createElement("div");
                repCard.classList.add("my-2");
                repCard.innerHTML = `
                    <div class="card rep-card  hover-card custom-rounded d-flex flex-row align-items-center">
                        <div class="col-4 my-auto px-4">
                            <img src="assets/img/legislators/profile_images/${bioguideId}.jpg" class="card-img rounded-circle p-2 img-rep" alt="Representative">
                        </div>
                        <div class="card-body col my-auto">
                            <p class="text-left">${legislator['name']}</p>
                        </div>
                    </div>
                `;
                repCard.addEventListener("click", function() { sect3addin(bioguideId) });
                repList.appendChild(repCard);
            }
        });
    }


    function buildProfile(data, bioguide_id) {
        D.querySelector('#section3-pledge').innerHTML = 'No'
        D.querySelector('#section3-chamber').innerHTML = (data['type'] === 'rep') ? 'Representative' : (data['type'] === 'sen') ? 'Senator' : ''
        D.querySelector('#section3-name').innerHTML = `${data['first_name']} ${data['last_name']}`
        D.querySelector('#section3-party').innerHTML = `(${data['party'][0]})`
        // D.querySelector('#section3-serving-since').innerHTML = "some time" //data['']
        D.querySelector('#avatar').src = `assets/img/legislators/profile_images/${bioguide_id}.jpg`

        // update discourse rose
        chart = charts[`discourse-rose`]
        chart.data.datasets[0].data = categories.map(category => data['scorecard'][category]['percent']);

        chart.update()

        // update cateogry plots
        for (category of categories) {
            chart = charts[`gauge-${category}`]
            chart.data.datasets[0].data = [data['scorecard'][category]['rank'] - 15, 30, 535 - data['scorecard'][category]['rank'] - 15]
            chart.data.datasets[0].needleValue = data['scorecard'][category]['rank']
            chart.update()
        }
    }




});