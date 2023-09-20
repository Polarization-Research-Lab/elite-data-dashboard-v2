var detailsBox = document.getElementById('details-box');
var stateSelect = document.getElementById('stateSelect');


document.addEventListener('mouseover', function (e) {
  if (e.target.tagName == 'path') {
    var content = e.target.dataset.name;
    detailsBox.innerHTML = content;
    detailsBox.style.opacity = "100%";
  }
  else {
    detailsBox.style.opacity = "0%";
  }
});

var old = {style: {strokeWidth: 1}}
document.addEventListener('click', function (e) {
  if (e.target.tagName == 'path') {
    for (let i = 0; i < stateSelect.options.length; i++) {
      if (stateSelect.options[i].innerHTML === e.target.dataset.name) {
        stateSelect.selectedIndex = i;
        const changeEvent = new Event("change");
        stateSelect.dispatchEvent(changeEvent);
        break; // Break the loop once a match is found
      }
    }

    // old.style.strokeWidth = 1
    // e.target.style.strokeWidth = 10

    old = e.target
  }
});

window.onmousemove = function (e) {
  var x = e.clientX,
      y = e.clientY;
      detailsBox.style.top = (y + 20) + 'px';
      detailsBox.style.left = (x) + 'px';
};
