---
layout: home
---

<div class="home row mx-4 my-4">
    <div class="col-lg-3 main-message">
        <h1 class="display-4 reallybigfont"><span class="keep-all">Tracking the Tenor of Elite Discourse in the U.S.</span></h1>
    </div>
    <div class="col-lg-6">
            <div class="col-lg-12 row-3">
                <!-- First 25% row content -->
                <div class="col-lg-6"></div>
            </div>
            <div class="col-lg-12 row-6">
                <!-- Middle 50% row content -->
                <!-- <h2>National Average</h2> -->
				<canvas id='natavg' class='dynamic-chart' data-script="{{ site.baseurl }}/assets/js/charts/rose-home.js" data-data="{{ site.data.home.rose-all | jsonify }}" data-title="National Average"></canvas>
            </div>
            <div class="col-lg-12 row-3">
                <!-- Last 25% row content -->
            </div>
    </div>
    <div class="col-lg-3">
            <div class="col-lg-12 row-6">
                <!-- First 50% row content -->
				<canvas id='demavg' class='dynamic-chart' data-script="{{ site.baseurl }}/assets/js/charts/rose-home.js" data-data="{{ site.data.home.rose-dem | jsonify }}" data-title="Democrats"></canvas>
            </div>
            <div class="col-lg-12 row-6">
                <!-- Second 50% row content -->
				<canvas id='repavg' class='dynamic-chart' data-script="{{ site.baseurl }}/assets/js/charts/rose-home.js" data-data="{{ site.data.home.rose-rep | jsonify }}" data-title="Republicans"></canvas>
            </div>
    </div>
</div>
