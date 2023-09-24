---
layout: base
---
<div class="container m-0" id="main">
    <div class="row px-2 col-12" id="main-row">
        <!-- Section 1: State Selector -->
        <div class="col-5 custom-vfill-box h-100" id='section1-box'>
            <br>
            <br>
            <br>
            <div class="text-white custom-vfill h-100 custom-rounded" id="section1">
                <div class="custom-rounded" id="section1sub">
                    <!-- SEARCH BY NAME OR ZIP -->
                    <!-- <div class="row">
                        <div class="col-6">
                            <div><h3 class = 'text-center text-dark'>Search by Zip Code</h3></div>
                            <div class="form-group">
                            <label for="phoneNumber">Phone Number:</label>
                            <input type="s1-zip" class="form-control bg-light border-0 rounded shadow-sm w-50 mx-auto text-center" id="zipCode" placeholder="zip code">
                            </div>
                        </div>
                        <div class="col-6">
                            <div><h3 class = 'text-center text-dark'>Search by Name</h3></div>
                            <div class="form-group">
                            <label for="phoneNumber">Phone Number:</label>
                            <input type="s1-name" class="form-control bg-light border-0 rounded shadow-sm w-50 mx-auto text-center" id="zipCode" placeholder="Enter name">
                            </div>
                        </div>
                    </div> -->
                    <!-- SEARCH BY JUST NAME -->
                    <!-- <div class="row"> -->
                    <!-- <div><h3 class = 'text-center text-dark'>Search by Name</h3></div> -->
                    <!-- <div class="form-group"> -->
                    <!-- <input type="s1-name" class="form-control bg-light border-0 rounded shadow-sm w-50 mx-auto text-center" id="zipCode" placeholder="Enter name"> -->
                    <!-- </div> -->
                    <!-- </div> -->
                    <br>
                    <br>
                    <!-- <div><h3 class = 'text-center text-dark'>OR</h3></div> -->
                    <!-- Row: State Select -->
                    <div class="">
                        <div class="col">
                            <div>
                                <h4 class='text-dark'>Select a state to start:</h4>
                            </div>
                            <div class="mx-auto w-50">
                                <select class="form-select form-select-lg fs-3 text-center" id="stateSelect"><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>
                            </div>
                        </div>
                        <br>
                        <br>
                        <!-- Row: Map -->
                        <div class="h-100 w-100 mx-auto" id="mapparent">
                            {%- include modules/map/map.html -%}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Section 2: Politician Selector -->
        <!-- <div class="col-md-4 custom-vfill-box d-none" id="section2-box"> -->
        <div class="col-md-4 custom-vfill-box animate__animated animate__slideInUp" id="section2-box">
            <!-- <div class="p-4 custom-vfill custom-rounded d-none" id="section2"> -->
            <div class="p-4 custom-vfill custom-rounded animate__animated animate__slideInUp d-none" id="section2">
                <div class="text-center">
                    <h2 id='s2-statetitle' class=''>State</h2>
                </div>
                <!-- Senators Section -->
                <div class="row" id='section2-sen-row'>
                    <div class="col sen-card-box-title">
                        <h3>Senators</h3>
                    </div>
                    <div class="row sen-card-box mb-4" id="sen-card-box">
                        <!-- senator cards go here -->
                    </div>
                </div>
                <!-- Representatives Section -->
                <div class="col">
                    <h3>Representatives</h3>
                </div>
                <div class="container mt-2" id='section2-rep-row'>
                    <div class='row flex-column mt-2 ' id='representatives-list'>
                        <!-- representative cards go here -->
                    </div>
                </div>
            </div>
        </div>
        <!-- Section 3: Politician Content Page -->
        <div class="col-md-8 custom-vfill-box d-none" id='section3-box'>
            <div class="custom-vfill custom-rounded" id="section3">
                <div class='row h-100'>
                    {%- include modules/profile/profile.html -%}
                    <button class="close-button m-2" id="closeSection3">x</button>
                </div>
            </div>
        </div>

    </div>


    <!-- Section: Carousel -->
    <div id='start' class='custom-rounded col-7 offset-5'>
        <br>
        <h1 class='text-center'>Leaderboards</h1>
        <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <!-- Slides -->
                <div class="carousel-inner">
                    {% for category in site.data.carousel %}
                    <div class="carousel-item {% if forloop.first %}active{% endif %}">
                        <!-- Slide Content -->
                        <div class="w-100 d-flex flex-column">
                            <div class="w-100">
                                <h2 class="text-center">{{ category[0] }}</h2>
                            </div>
                            forloop.index

                            <div class="row w-75 mx-auto">
                                <!-- Left Column (Democrat) -->
                                <div class="col">
                                    <h3 class="text-center">Democrat</h3>
                                    <div class="row flex-column mt-2 p-4">
                                        {% for legislator in category[1].dems%}
                                        <div class="m-2 card leg-card hover-card custom-rounded d-flex flex-row align-items-center" data-bioguide_id="{{ legislator[0] }}" onclick="buildProfile(data, '{{ legislator[0] }}')">
                                            <div class="col-4 my-auto px-4">
                                                <img src="assets/img/legislators/profile_images/{{ legislator[0] }}.jpg" class="card-img rounded-circle p-2 img-rep" alt="legislator" onerror="this.src = 'assets/img/avatar-default.svg'">
                                            </div>
                                            <div class="card-body col my-auto">
                                                <p class="text-left">{{ legislator[1].rank }}. {{ legislator[1].first_name }} {{ legislator[1].last_name }}</p>
                                            </div>
                                        </div>
                                        {% endfor %}
                                    </div>
                                </div>
                                <!-- Right Column (Republican) -->
                                <div class="col">
                                    <h3 class="text-center">Republican</h3>
                                    <div class="row flex-column mt-2 p-4">
                                        {% for legislator in category[1].reps %}
                                        <div class="m-2 card leg-card hover-card custom-rounded d-flex flex-row align-items-center" data-bioguide_id="{{ legislator[0] }}" onclick="buildProfile(data, '{{ legislator[0] }}')">
                                            <div class="col-4 my-auto px-4">
                                                <img src="assets/img/legislators/profile_images/{{ legislator[0] }}.jpg" class="card-img rounded-circle p-2 img-rep" alt="legislator" onerror="this.src = 'assets/img/avatar-default.svg'">
                                            </div>
                                            <div class="card-body col my-auto">
                                                <p class="text-left">{{ legislator[1].rank }}. {{ legislator[1].first_name }} {{ legislator[1].last_name }}</p>
                                            </div>
                                        </div>
                                        {% endfor %}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
                <!-- Control buttons moved to the bottom -->
                <div class="d-flex justify-content-between mt-3">
                    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>

    </div>

</div>


<!-- <div id='start' class=''>
    <p class='m-5 display-1 animate__animated animate__fadeIn'>Tracking the tenor of elite discourse in the US.</p>
</div> -->

