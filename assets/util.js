function toggleDivs() {
  var div2 = document.getElementById("div2");
  
  if (div1.style.display === "none") {
    div1.style.display = "block";
    div2.style.display = "none";
  } else {
    div1.style.display = "none";
    div2.style.display = "block";
  }
}

var gauge1 = document.getElementById("gauge1");
var gauge2 = document.getElementById("gauge2");
var gauge3 = document.getElementById("gauge3");
var gauge4 = document.getElementById("gauge4");





function pull_politician_data(bioguide_id) {
  // Takes bioguide_id as input, and outputs a json with the data we need for that politician. that way, if we switch from database table -vs- static json file, all we have to do is change this function

  return null
}







