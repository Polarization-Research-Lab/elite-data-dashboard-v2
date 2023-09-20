document.addEventListener("DOMContentLoaded", function () {






    // state select logic 
    const stateSelect = document.getElementById("stateSelect");
    const section2 = document.getElementById("section2");

    stateSelect.addEventListener("change", function () {
        // Show Section 2 and fade it in from the left
        section2.classList.remove("d-none");
        section2.classList.add("animate__animated", "animate__fadeInLeft");
        document.getElementById("start").classList.add("animate__animated", "animate__fadeOutRight");
        // document.getElementById("start").classList.add('d-none');
        console.log('hit')
    });








});
