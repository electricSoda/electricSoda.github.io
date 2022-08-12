//add update text through firebase
var updatesFB = firebase.database().ref().child("Updates").orderByChild('SortDate');
var upd = document.getElementById('upd');

var objectsu = [];

updatesFB.on('child_added', snap => {
  var text = snap.child('Text').val();
  var date = snap.child('Date').val();
  var lei = document.createElement("li");

  lei.setAttribute('class', 'update');
  lei.innerHTML = '<a>'+ date +'</a><p>'+text+'</p>';
  upd.appendChild(lei);

  objectsu.push({'text': text, 'date': date});
});



//change footer year
document.getElementById("year").innerHTML = new Date().getFullYear();

//social media
function discord() {
  window.open('https://discord.gg/ZJYPGZHNMe', '_self');
};

function youtube() {
  window.open('https://www.youtube.com/channel/UCCpaF9BoHVQQSvG8zGhpP0Q', '_self');
};

function github() {
  window.open('https://github.com/electricSoda', '_self');
}

//logo
document.getElementById('logo').addEventListener('click', function() {
  location.href = "#first";
})

//projects
document.getElementById('ca').addEventListener('click', function() {
  location.href = "#projects";
})

document.getElementById('ca2').addEventListener('click', function() {
  location.href = "#projects";
  $('#nav-icon').toggleClass('open');
  $('.sidenav').hide();
  openclose = false;
})

//experiments
document.getElementById('ex').addEventListener('click', function() {
  location.href = "#experiments";
})

document.getElementById('ex2').addEventListener('click', function() {
  location.href = "#experiments";
  $('#nav-icon').toggleClass('open');
  $('.sidenav').hide();
  openclose = false;
})

//updates
document.getElementById('up').addEventListener('click', function() {
  location.href = "#updates";
})

document.getElementById('up2').addEventListener('click', function() {
  location.href = "#updates";
  $('#nav-icon').toggleClass('open');
  $('.sidenav').hide();
  openclose = false;
})

//about
document.getElementById('abt').addEventListener('click', function() {
  location.href = "#about";
})

document.getElementById('abt2').addEventListener('click', function() {
  location.href = "#about";
  $('#nav-icon').toggleClass('open');
  $('.sidenav').hide();
  openclose = false;
})

//Disclaimer
document.getElementById('dis').addEventListener('click', function() {
  window.open('https://www.freeprivacypolicy.com/live/68f66254-ceed-4492-b93a-70bf8fb580b8', '_self')
})

//publish for update
function publish() {
  if (document.getElementById('rupture').value != '') {
    var rupture = document.getElementById('rupture').value;

    //generate new id every publish
    var ID = '_' + Math.random().toString(36).substr(2, 9);
    console.log(ID);

    //generate sortingdate
    var t = new Date();
    var sortdate = t.getTime();

    //firebase
    var fb = firebase.database().ref();

    fb.child('Updates').child(ID).child('Text').set(rupture);

    //add date
    var today = new Date();
    var date = 'Published on '+(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    fb.child('Updates').child(ID).child('Date').set(date);

    //add sortdate
    fb.child('Updates').child(ID).child('SortDate').set(sortdate);

    rupture.value = '';
    $('#rupture').val('');
  }
};

//owner login
document.getElementById('o').addEventListener('click', function ()  {
  var pass = prompt("Password", "");
  if (pass == "123") {
    document.getElementById('owner').innerHTML = "<textarea placeholder='Type update here...' type='text' id='rupture'></textarea><button id='rut' onclick='publish()'>Publish</button>";
  };
})

//Attributes
document.getElementById('att').addEventListener('click', function() {
  document.write('Contact form was *stolen*  (jk)   from https://colorlib.com. Find it here: https://colorlib.com/wp/free-html5-contact-form-templates/  \r Email form powered by EmailJS');
});

let openclose = false;

//burger menu (for smaller screens)
$('#nav-icon').click(function(){
  if(openclose) {
    $(this).toggleClass('open');
    $('.sidenav').hide();
    openclose = false;
  } else {
    $(this).toggleClass('open');
    $('.sidenav').show();
    $('.sidenav').addClass('sidein');
    openclose = true;
  }
});

//check for screen width
if ($(window).width() > 1200) {
   document.getElementById("nav-icon").style.display = "none";
} else {
  document.getElementById("nav-icon").style.visibility = "visible";
}

//logo hover
const isHover = e => e.parentElement.querySelector(':hover') === e;

const rames = ['Palace', 'Place', 'Cache', 'Site', 'Portfolio', 'Playground', 'Cheeseburger']

const logo = document.getElementById('logo');
const place = document.getElementById('place');
//listner for both logo and mouse position
window.addEventListener("mousemove", function checkHover(e) {
  mouse.x = e.x;
  mouse.y = e.y;

  const hovered = isHover(logo);
  if (hovered !== checkHover.hovered) {
    if (hovered) {
      let i = 0;
      var lap = setInterval(function() {
        if (i==0) {
          place.textContent = rames[i];
          place.classList.add("switch");
          i++;
        } else if (i < rames.length) {
          place.textContent = rames[i];
          i++;
        } else {
          place.textContent = 'Environment';
          place.classList.remove("switch");
          clearInterval(lap);
        }
      }, 1000)
    }
    checkHover.hovered = hovered;
  }
});


//Modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("con");

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  document.getElementById('cont').innerHTML = "<object type='text/html' data='contact.html'></object>";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// ---------------------- YES YES IM TOO LAZY TO IMPLEMENT MY ORIGINAL CODE ;-;

//canvas1
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//mouse
var mouse = {
  x: null,
  y: null,
  radius: (canvas.height/100) * (canvas.width/100)
}

let particlesArray;

//particles amount
let numberparticles = (canvas.height * canvas.width) / 4000;

//settings for particlesuhuhuhuh
document.getElementById('set').addEventListener('click', function() {
  var num = prompt("What amount of particles would you like?", "");
  var aa = parseInt(num);
  numberparticles = aa;
  start();
});

//create particles
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  //draw
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
  }

  //updates
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y >canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // collision with circle radius around mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y <canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    //move particles after checking mouse movement
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

//create particless
function start() {
  particlesArray = [];

  //push
  for (let i =0; i < numberparticles; i++) {
    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size*2);
    let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size*2);
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    let color = 'rgba(0,0,0,1)';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

//connect particles with lines
function connect() {
  let opacityV = 1;
  for (let a=0; a<particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
      if (distance < (canvas.width/7) * (canvas.height/7)) {
        opacityV = 1 - (distance/20000);
        ctx.strokeStyle = "rgba(0, 0, 0, " + opacityV + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke()
      }
    }
  }
}

//animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

//mouse out of window
window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

//window resize
window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  mouse.radius = (canvas.height/100) * (canvas.width/100);
  if ($(window).width() > 1200) {
     document.getElementById("nav-icon").style.display = "none";
  } else {
    document.getElementById("nav-icon").style.visibility = "visible";
  }

})

start();
animate();


//card clicks
//nottube
document.getElementById('tp').addEventListener('click', function () {
  window.open('https://typingm.glitch.me/', "_self")
});


//check for scrolls
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(document).on('scroll', function() {
  //console.log($(this).scrollTop(), $('#projects').position().top)
  if ($('#first').isInViewport()) {
    $('#first').removeClass();
    $('#first').addClass('fa');
  } else {
    $('#first').removeClass();
    $('#first').addClass('fadeout');
  }

  if ($('#projects').isInViewport()) {
    $('#projects').removeClass();
    $('#projects').addClass('fadein1');
  } else {
    $('#projects').removeClass();
    $('#projects').addClass('fadeout');
  }

  if ($('#experiments').isInViewport()) {
    $('#experiments').removeClass();
    $('#experiments').addClass('fadein1');
  } else {
    $('#experiments').removeClass();
    $('#experiments').addClass('fadeout');
  }

  if ($('#updates').isInViewport()) {
    $('#updates').removeClass();
    $('#updates').addClass('fadein1');
    $(".update").delay(200).each(function(i) {
      $(this).delay(100 * i).queue(function() {
        $(this).addClass("show");
      })
    })
  } else {
    $('#updates').removeClass();
    $('#updates').addClass('fadeout');
  }

  if ($('#about').isInViewport()) {
    $('#about').removeClass();
    $('#about').addClass('fadein1');
  } else {
    $('#about').removeClass();
    $('#about').addClass('fadeout');
  }

  if ($('#socials').isInViewport()) {
    $('#socials').removeClass();
    $('#socials').addClass('fadein1');
  } else {
    $('#socials').removeClass();
    $('#socials').addClass('fadeout');
  }
})
