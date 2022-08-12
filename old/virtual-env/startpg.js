//get elements
const header = document.getElementById('header');

window.onload = play();
setInterval(play, 5000);

function play() {
  var l = document.getElementById('blog');

  setTimeout( function() {
    var title = "Justin's Virtual Environment";
    var titleRandom = '';
    var possible = "-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}";

    function generateRandomTitle(i, titleRandom) {
      setTimeout( function() {
        l.innerHTML = titleRandom;
      }, i*70 );
    }

    for( var i=0; i < title.length+1; i++ ) {
      titleRandom = title.substr(0, i);
      for( var j=i; j < title.length; j++ ) {
        titleRandom += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      generateRandomTitle(i, titleRandom);
      titleRandom = '';
    }
  }, 500 );
}

//change the pressed animation
const con = document.getElementById('continue');
setTimeout(function() {
  con.classList.remove("fadein2");
  con.classList.add("hover2");
}, 200)


//check for the key press that changes to the main page
document.body.onclick = function(e) {
  var container = document.getElementById('container');
  container.classList.add('move1');
  setTimeout(function() {
      window.open("loading/", "_self");
  }, 2000);
};

//right click
window.oncontextmenu = function (e) {
  e.preventDefault();
  var img = document.getElementById('img');
  img.style.display = 'block';
  img.classList.add('lasein');
};

//--------------------------------------------------------\\
//water effect
const fountain = document.getElementById('fountain');
const ctx = fountain.getContext('2d');
fountain.width = window.innerWidth;
fountain.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', function(pos) {
    mouse.x = pos.clientX;
    mouse.y = pos.clientY;
});

//handle water particles
class Particle {
  constructor(x, y, size, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.weight = weight;
    this.rand = Math.random();
  };

  //calculate position
  update() {
    if (this.x > mouse.x - 50 && this.x < mouse.x + 50 && this.y > mouse.y - 50 && this.y < mouse.y + 50) {
      if (this.rand >= 0.5) {
        this.x -= 20;
        this.y += this.weight;
      } else if (this.rand < 0.5) {
        this.x += 20;
        this.y += this.weight;
      }

    } else {
      this.weight += 0.04;
    };

    if (this.y > fountain.height) {
      this.y = 0 - this.size;
      this.x = (Math.random() * 60 + fountain.width/2);
      this.weight = (Math.random() * 0.5) + 1;
      this.rand = Math.random();
    };
    this.y += this.weight;
  }

  //draw particles
  draw() {
    ctx.fillStyle = 'rgba(128, 197, 222, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

//objects
const particleArray = [];
const numberParticles = 800;
function createParticles() {
  for (let i=0; i < numberParticles; i++) {
    const x = (Math.random() * 60 + fountain.width/2);
    const y = (Math.random() * fountain.height);
    const size = (Math.random() * 20) + 0.5;
    const weight = (Math.random() * 0.5) + 1;
    particleArray.push(new Particle(x, y, size, weight));
  };
}

createParticles();

//animate canvas
function animate() {
  ctx.clearRect(0,0, fountain.width, fountain.height);
  for (let i=0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  };
  requestAnimationFrame(animate);
};

animate();

//resize canvas
window.addEventListener('resize', function(e) {
  fountain.width = window.innerWidth;
  fountain.height = window.innerHeight;
});
