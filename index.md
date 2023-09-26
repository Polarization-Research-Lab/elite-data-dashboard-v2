---
layout: base
---

<div class="container m-0 topline" id="main">
<!-- <div id = "parallaxImage"><h1 class="center">Elected Offical Pulse</h1></div> -->
    <div class="row px-2 col-12" id="main-row">
        <!-- Section 1: State Selector -->
        <div class="col-5 custom-vfill-box h-100 top" id='section1-box'>
            <div class="text-white custom-vfill h-100" id="section1">
                <div class="" id="section1sub">
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
                    <!-- <div><h3 class = 'text-center text-dark'>OR</h3></div> -->
                    <!-- Row: State Select -->
                    <div class="">
                        <div class="col">
                        <div class="title-card">
                        <p>Do your representatives focus on <strong>policy and solutions</strong> or <strong>aggravating political divides</strong>?</p>
                        <ul>
                        <li>Learn what your representatives talk about</li>
                        <li>Learn how extreme they are</li>
                        <li>Learn how effective they are passing legislation</li>
                        </ul>
                          </div>  
                                <h4 class='text-center'>Select a state to start</h4>
                            <div class="mx-auto w-50">
                                <select class="form-select form-select-lg fs-3 text-center" id="stateSelect"><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>
                            </div>
                        </div>
                        <br>
                        <br>
                        <!-- Row: Map -->
                        <div class="h-100 w-100 mx-auto" id="mapparent">
                            {%- include modules/map.html -%}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Section 2: Politician Selector -->
        <!-- <div class="col-md-4 custom-vfill-box d-none" id="section2-box"> -->
        <div class="col-md-4 custom-vfill-box animate__animated animate__slideInUp" id="section2-box">
            <!-- <div class="p-4 custom-vfill custom-rounded d-none" id="section2"> -->
            <div class="p-4 custom-vfill animate__animated animate__slideInUp d-none" id="section2">
                <div class="text-center state-title">
                    <h2 id='s2-statetitle' class=''>State</h2>
                </div>
                <!-- Senators Section -->
                <div class="col sen-card-box-title ">
                        <h3>Senators</h3>
                    </div>
                <div class="container mt-2 scroll" id='section2-sen-row'>
                    <div class="row flex-column mt-2" id="sen-card-box">
                        <!-- senator cards go here -->
                    </div>
                </div>
                <!-- Representatives Section -->
                <div class="col sen-card-box-title">
                    <h3>Representatives</h3>
                </div>
                <div class="container mt-2 scroll" id='section2-rep-row'>
                    <div class='row flex-column mt-2 ' id='representatives-list'>
                        <!-- representative cards go here -->
                    </div>
                </div>
            </div>
        </div>
        <!-- Section 3: Politician Content Page -->
        <div class="col-md-8 custom-vfill-box d-none" id='section3-box'>
            <div class="custom-vfill " id="section3">
                <div class='row h-100'>
                    {%- include modules/profile.html -%}
                    <button class="close-button m-2 btn-close" aria-label="Close" id="closeSection3"></button>
                </div>
            </div>
        </div>

    </div>
    <!-- Section: Carousel -->
    {%- include modules/carousel.html duration="15" -%}


</div>


<!-- <div id='start' class=''>
    <p class='m-5 display-1 animate__animated animate__fadeIn'>Tracking the tenor of elite discourse in the US.</p>
</div> -->

