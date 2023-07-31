---
layout: home
---

<div class="home row mx-4">
    <div class="col-lg-3 main-message">
        <h1 class="display-4 reallybigfont"><span class="keep-all">Tracking the Tenor of Elite Discourse in the U.S.</span></h1>
    </div>
    <div class="col-lg-9">
        <div class="row row-6">
            <div class="col-lg-12">
                <canvas id='natavg' class='dynamic-chart' data-script="{{ site.baseurl }}/assets/js/charts/rose-home.js" data-data="{{ site.data.home.rose-all | jsonify }}" data-title="National Average"></canvas>
            </div>
        </div>
        <div class="row row-3">
            <div class="col-lg-6">
                <canvas id='demavg' class='dynamic-chart' data-script="{{ site.baseurl }}/assets/js/charts/rose-home.js" data-data="{{ site.data.home.rose-dem | jsonify }}" data-title="Democrats"></canvas>
            </div>
            <div class="col-lg-6">
                <canvas id='repavg' class='dynamic-chart' data-script="{{ site.baseurl }}/assets/js/charts/rose-home.js" data-data="{{ site.data.home.rose-rep | jsonify }}" data-title="Republicans"></canvas>
            </div>
        </div>
    </div>
</div>
