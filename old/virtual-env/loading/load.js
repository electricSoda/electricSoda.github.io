randomfact = document.getElementById('fact');
fetch("https://uselessfacts.jsph.pl/random.json?language=en")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    randomfact.textContent = "Did you know? " + data["text"];
  });

var dots = ['.', '..', '...'];
var count = 0;

setInterval(function() {
  if (count < 3 ) {
    var tb = dots[count];
    document.getElementById('lod').textContent = "Loading" + tb;
    count++;
  } else if (count == 3) {
    count = 0;
    var tb = dots[count];
    document.getElementById('lod').textContent = "Loading" + tb;
    count++;
  }
}, 500);

setTimeout(function() {
  window.open("../main/", '_self');
}, 4000);
