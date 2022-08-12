// Misc functions
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

// Get canvas
const canvas = document.getElementById("c")
const ctx = canvas.getContext("2d")

// Canvas 
let c = {
	w: null,
	h: null,
	cx: null,
	cy: null,
	e: [],
}

// Resize
const resize = () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	c.w = canvas.width
	c.h = canvas.height

	c.cx = c.w/2
	c.cy = c.h/2

	update()
}

window.addEventListener("resize", resize)

// Create node
class Node {
	constructor (x, y) {
		this.x = x
		this.y = y
		this.original = {x: this.x, y: this.y}
		this.newpos = {}
		this.size = 4
	}

	draw() {
		if (Object.keys(this.newpos).length !== 0) {
			if (this.x != this.newpos.x && this.y != this.newpos.y) {
				if ((this.newpos.x - this.x) < 0) {
					this.x -= 1
				} else {
					this.x += 1
				}

				if ((this.newpos.y - this.y) < 0) {
					this.y -= 1
				} else {
					this.y += 1
				}
			}
		}

		ctx.fillRect(this.x, this.y, this.size, this.size)
	}

	idle() {
		// do something to make it go in a direction until it 
		// hits bounding box and then make it go in a different direction

		let x = getRandom(0, 3)

		if (x == 0) {
			if (!(this.x + 1 - this.original.x > 15)) {
				this.x += 1
			}
		} else if (x == 1) {
			if (!(this.x - 1 - this.original.x < -15)) {
				this.x -= 1
			}
		} else if (x == 2) {
			if (!(this.y + 1 - this.original.y > 15)) {
				this.y += 1
			}
		} else if (x == 3) {
			if (!(this.y - 1 - this.original.y < -15)) {
				this.y -= 1
			}
		}
	}

	explode () {
		this.x -= 30
		this.y -= 30
		this.size += 60
	}
}

let explode, implode = false

var nodes = 100
var radius = 200

canvas.addEventListener("click", () => {
	explode = true

	setTimeout(() => {
		document.location.href="/main"
	}, 1000)
})

const update = () => {
	ctx.clearRect(0, 0, c.w, c.h)

	ctx.translate(c.cx, c.cy)
	for (let i=0; i < c.e.length; i++) {
		c.e[i].draw()
		c.e[i].idle()
		if (explode == true)
			c.e[i].explode()
		if (implode == true)
			c.e[i].implode()
	}
	ctx.translate(-c.cx, -c.cy)
	window.requestAnimationFrame(update)
}

// Initialize
const init = () => {
	let angle = 2 * Math.PI / nodes

	for (let i=1; i <= nodes; i++) {
		xoffset = getRandom(0, 5)
		yoffset = getRandom(0, 5)

		c.e.push(new Node(Math.round(radius * Math.cos(i * angle)), Math.round(radius * Math.sin(i * angle))))
	}

	update()
}

window.onload = () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	c.w = canvas.width
	c.h = canvas.height

	c.cx = c.w/2
	c.cy = c.h/2

	if (c.w > c.h) {
		radius = c.h * 0.2
	} else {
		radius = c.w * 0.15
	}
	init()
}

document.querySelectorAll("a")[0].addEventListener("click", () => {
	document.location.href= "/old"
})