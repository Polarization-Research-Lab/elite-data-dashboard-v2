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
                    main.build()
                });
        });
})


var main = {
    build: function() {
        D = document

        const stateSelect = document.getElementById("stateSelect");

        const section1 = document.getElementById("section1");
        const section1Box = document.getElementById("section1-box");

        const section2 = document.getElementById("section2");
        const section2Box = document.getElementById("section2-box");
        const s2StateTitle = document.getElementById("s2-statetitle");

        const section3 = document.getElementById("section3");
        const section3Box = document.getElementById("section3-box");

        const leaderboard = document.getElementById("start")

        const categories = ["insult", "blame", "credit_claiming", "compromise", "policy", "foreign_policy", "legislative_discussion"]

        // state select logic 
        stateSelect.addEventListener("change", function() {
            // Show Section 2 and fade it in from the left
            // section2.classList.add("animate__fadeInUp");
            section2.classList.remove("d-none");
            section2.classList.remove("animate__fadeInUp");

            leaderboard.classList.add("animate__animated", "animate__fadeOutRight");
            // section3.classList.add("animate__animated", "animate__slideOutRight");

            sect2addin()
        });

        leaderboard.addEventListener("animationend", function() {
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
                    
                    // Push the new URL to the browser's history
                    var currentURL = new URL(window.location.href); // Get the current URL
                    var searchParams = new URLSearchParams(currentURL.search); // Get the search parameters

                    if (!searchParams.has('bioguide_id')) { // Check if 'bioguide_id' parameter doesn't exist
                        history.pushState( // Push the new URL to the browser's history
                            null,
                            null,
                            `${currentURL.href}${currentURL.search ? '&' : '?'}bioguide_id=${bioguide_id}` // Create a new URL with the 'bioguide_id' parameter
                        );
                    }
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

            // Update URL
            var currentURL = new URL(window.location.href); // Get the current URL
            var newURL = currentURL.origin + currentURL.pathname; // Create a new URL without the removed parameter
            history.pushState(null, null, newURL); // Push the new URL to the browser's history
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
                    senCard.classList.add("my-2");
                    senCard.innerHTML = `
                        <div class="card sen-card rep-card hover-card custom-rounded d-flex flex-row align-items-center">
                            <div class="col-4 my-auto px-4">
                                <img src="assets/img/legislators/profile_images/${bioguideId}.jpg" class="card-img rounded-circle p-2 img-rep" alt="senator" onerror="this.src = 'assets/img/avatar-default.svg'"">
                            </div>
                            <div class="card-body col my-auto">
                                <p class="text-left">${legislator['name']} (${legislator['party'][0]})</p>
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

        // THIS NEEDS TO BE TEMPLATED IN!
        function buildProfile(data, bioguide_id) {
            D.querySelector('#profile-name').innerHTML = `${data['first_name']} ${data['last_name']}`

            D.querySelector('#avatar').src = `assets/img/legislators/profile_images/${bioguide_id}.jpg`
            D.querySelector('#avatar').addEventListener('error', function() {
                this.src = `assets/img/avatar-default.svg`
            });
            D.querySelector('#avatar-link').href = data['website']

            // D.querySelector('#profile-pledge').innerHTML = 'No'
            D.querySelector('#profile-role').innerHTML = (data['type'] === 'rep') ? 'Representative' : (data['type'] === 'sen') ? 'Senator' : ''
            D.querySelector('#profile-chamber').innerHTML = (data['type'] === 'rep') ? 'House' : (data['type'] === 'sen') ? 'Senate' : ''
            D.querySelector('#profile-party').innerHTML = `${data['party']}`
            D.querySelector('#profile-state').innerHTML = [...stateSelect.options].find(option => option.value === data['state']).innerHTML
            D.querySelector('#profile-district').innerHTML = data['district'] ? `<p>District: ${data['district']}</p>` : '';
            D.querySelector('#profile-class').innerHTML = data['senate_class'] ? `<p>Senate Class: ${data['senate_class']}</p>` : '';
            D.querySelector('#profile-serving-chamber-since').innerHTML = data['serving_current_chamber_since'] ? data['serving_current_chamber_since'].split('-')[0] : '[?]';
            D.querySelector('#profile-serving-congress-since').innerHTML = data['serving_congress_since'] ? data['serving_congress_since'].split('-')[0] : '[?]';
            D.querySelector('#profile-birthday').innerHTML = new Date(data['birthday']).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

            //D.querySelectorAll('.name').innerHTML = `${data['first_name']} ${data['last_name']}`

            var names = document.querySelectorAll(".name")
 
            for (i = 0; i < names.length; i++) {
                names[i].innerHTML = `${data['first_name']} ${data['last_name']}`;
            }

            D.querySelector('#talk').innerHTML = `What does ${data['first_name']} ${data['last_name']} focus on?`
            D.querySelector('#efficacy').innerHTML = `How effective is ${data['first_name']} ${data['last_name']} as a legislator?`
            D.querySelector('#ideology').innerHTML = `How ideologically extreme is ${data['first_name']} ${data['last_name']}?`
            D.querySelector('#money').innerHTML = `How does ${data['first_name']} ${data['last_name']} raise money?`
            D.querySelector('#ideology-img').src = `https://d3d9notewc4uep.cloudfront.net/${bioguide_id}.png`
            D.querySelector('#efficacy-img').src = `https://d3d9notewc4uep.cloudfront.net/bills_${bioguide_id}.png`
            D.querySelector('#efficacy-co-img').src = `https://d3d9notewc4uep.cloudfront.net/bills_cosponsor_${bioguide_id}.png`
            D.querySelector('#mini-ideology-img').src = `https://d3d9notewc4uep.cloudfront.net/${bioguide_id}_bar.png`
            
            D.querySelector('#money-total-img').src = `https://d3d9notewc4uep.cloudfront.net/money_${bioguide_id}_total.png`
            D.querySelector('#money-count-img').src = `https://d3d9notewc4uep.cloudfront.net/money_${bioguide_id}_count.png`
            D.querySelector('#money-map-img').src = `https://d3d9notewc4uep.cloudfront.net/${bioguide_id}_map.png`
            D.querySelector('#money-inout-img').src = `https://d3d9notewc4uep.cloudfront.net/money_${bioguide_id}_instate.png`
            D.querySelector('#attendence-img').src = `https://d3d9notewc4uep.cloudfront.net/attendence_${bioguide_id}.png`
            D.querySelector('#policy_area-img').src = `https://d3d9notewc4uep.cloudfront.net/bills_policy_area_${bioguide_id}.png`

            D.querySelector('#profile-links-twitter').href = `https://twitter.com/${data['twitter']}`
            D.querySelector('#profile-links-facebook').href = `https://www.facebook.com/{data['facebook']}`
            // D.querySelector('#profile-links-website').href = data['website']
            D.querySelector('#profile-links-contact').href = data['contact']
            D.querySelector('#profile-links-gov').href = `https://bioguide.congress.gov/search/bio/${bioguide_id}`

            // next election
            var currentYear = new Date().getFullYear();
            if (data['type'] === 'rep') {
                D.querySelector('#profile-next-election').innerHTML = currentYear + (currentYear % 2 === 0 ? 2 : 1); // <-- get next even numbered year
            } else {
                D.querySelector('#profile-next-election').innerHTML = (year => year + (6 - (year - (data['senate_class'] === 1 ? 2018 : data['senate_class'] === 2 ? 2020 : data['senate_class'] === 3 ? 2022 : currentYear)) % 6))(new Date().getFullYear(), data['senate_class']) // <-- get next 6th year in cycle
            }

            // update discourse rose
            console.log(charts)
            chart = charts[`discourse-bar`]
            chart.data.datasets[0].data = categories.map(category => Math.round(data['scorecard'][category]['percent'] * 1000) / 10);

            backgroundColors = charts['discourse-bar'].data.datasets[0].backgroundColor

            chart.update()

            // update cateogry plots
            for (const [index, category] of categories.entries()) {
                category_div = document.getElementById(`profile-card-category-${category}`)

                // # guage
                chart = charts[`gauge-${category}`]
                chart.data.datasets[0].data = [data['scorecard'][category]['rank'] - 10, 20, 535 - data['scorecard'][category]['rank'] - 10]
                chart.data.datasets[0].needleValue = data['scorecard'][category]['rank']
                // chart.data.datasets[0].backgroundColor = ['rgb(190,190,190)', backgroundColors[index], 'rgb(190,190,190)'];
                chart.data.datasets[0].backgroundColor = ['rgb(190,190,190)', 'black', 'rgb(190,190,190)'];
                chart.update()

                const rank = data['scorecard'][category]['rank'];
                const roundedRank = Math.round(rank);
                const ordinalSuffix = getOrdinalSuffix(roundedRank);

                // Find the closest span with class "place" within the parent element
                const spanElement = chart.canvas.parentNode.parentNode.parentNode.querySelector('span.place');
                // Update the innerHTML of the found span
                if (spanElement) {
                    spanElement.innerHTML = `<b>${roundedRank}</b><sup>${ordinalSuffix}</sup>`;
                }

                // # Bar
                chart = charts[`source-bar-${category}`]

                chart.data.datasets[0].data = [
                    data['scorecard'][category]['sources']['tweets']['percent'] * 100,
                    data['scorecard'][category]['sources']['floor']['percent'] * 100,
                    data['scorecard'][category]['sources']['newsletters']['percent'] * 100,
                    data['scorecard'][category]['sources']['statements']['percent'] * 100,
                ]
                chart.update()

                // document.querySelector($GET CLOSEST SPAN WITH CLASS "PLACE"$).innerHTML = `${roundedRank}${ordinalSuffix}`;

                // # Example
                // if (data['scorecard'][category]['example']) {
                //     D.querySelector(`#profile-quote-info-${category}`).innerHTML = data['scorecard'][category]['example']['source'];
                //     D.querySelector(`#profile-quote-${category}`).innerHTML = data['scorecard'][category]['example']['text'];
                // } else {
                //     D.querySelector(`#profile-quote-info-${category}`).innerHTML = '',
                //     D.querySelector(`#profile-quote-${category}`).innerHTML = '';
                // }
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

        const categoryCards = document.querySelectorAll(".category-card");

        // categoryCards.forEach(function(categoryCard) {
        //     const recentExample = categoryCard.querySelector(".recent-examples");

        //     // Initially hide recent-examples
        //     recentExample.style.height = "0";
        //     recentExample.style.overflow = "hidden";
        //     recentExample.style.transition = "height 0.3s ease";

        //     // Add click event listener
        //     categoryCard.addEventListener("click", function() {
        //         if (recentExample.style.height === "0px") {
        //             // Show recent-examples with slide-in effect
        //             recentExample.style.height = recentExample.scrollHeight + "px";
        //         } else {
        //             // Hide recent-examples with slide-out effect
        //             recentExample.style.height = "0";
        //         }
        //     });
        // });

        // Check for BioGuide ID
        var currentURL = new URL(window.location.href);
        var searchParams = new URLSearchParams(currentURL.search);

        // Check if 'bioguide_id' parameter exists
        if (searchParams.has('bioguide_id')) {
            var bioguide_id = searchParams.get('bioguide_id');

            // Check if 'bioguide_id' appears as a property in 'legislatorsMeta'
            if (legislatorsMeta.hasOwnProperty(bioguide_id)) {
                stateSelect.value = legislatorsMeta[bioguide_id]['state']
                stateSelect.dispatchEvent(new Event('change'));
                sect2addin();
                sect3addin(bioguide_id);
            }
        }
    }
}