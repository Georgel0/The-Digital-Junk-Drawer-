// Eye-tracking logic
document.querySelector('body').addEventListener('mousemove', (e) => {
 const eye = document.querySelector('.eye-socket');
 const iris = document.querySelector('.iris');
 const rect = eye.getBoundingClientRect();
 
 const eyeCenterX = rect.left + rect.width / 2;
 const eyeCenterY = rect.top + rect.height / 2;
 
 let deltaX = e.clientX - eyeCenterX;
 let deltaY = e.clientY - eyeCenterY;
 
 const angle = Math.atan2(deltaY, deltaX);
 
 const maxDistance = (eye.clientWidth / 2) - (iris.clientWidth / 2);
 
 const newX = maxDistance * Math.cos(angle);
 const newY = maxDistance * Math.sin(angle);
 
 iris.style.transform = `translate(calc(-50% + ${newX}px), calc(-50% + ${newY}px))`;
});

let countForEye = localStorage.getItem("countForEye");

document.querySelector('.eye-socket').addEventListener('click', () => {
 const eyeText = document.getElementById('eye-text');
 
 eyeText.classList.add('visible');
 
 countForEye++;
 localStorage.setItem("countForEye", countForEye);
 
 const complementaryText = `${countForEye < 5 ? " " : (countForEye > 5 ? "... stop" : "")}`;
 
 eyeText.textContent = `You clicked me ${countForEye} ${countForEye === 1 ? "time" : "times"}${complementaryText}`;
 
 setTimeout(() => {
  eyeText.classList.remove('visible')
 }, 2000)
});

// Footer modal
const modal = document.getElementById("contributeModal");
const btn = document.getElementById("contributeBtn");
const span = document.getElementsByClassName("close-btn")[0];

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
 if (event.target == modal) modal.style.display = "none";
}

// Live Background 
document.addEventListener('DOMContentLoaded', () => {
 const canvas = document.getElementById('particle-canvas');
 const ctx = canvas.getContext('2d');
 
 // Configuration
 const PARTICLE_DENSITY_AREA = 15000;
 const MIN_PARTICLES = 40;
 const MAX_PARTICLES = 180;
 const MOUSE_DISTANCE = 150;
 const LINE_OPACITY_FACTOR = 0.5;
 const COLOR = 'rgba(200, 200, 200,';
 
 let particles = [];
 let particleCount = 100;
 let connectionDistance = 200;
 let connectionDistanceSq = connectionDistance * connectionDistance;
 let speedFactor = 1.0;
 let animationFrameId;
 let resizeTimeout;
 const mouse = { x: null, y: null };
 
 class Particle {
  constructor(width, height) {
   this.x = Math.random() * width;
   this.y = Math.random() * height;
   this.vx = (Math.random() - 0.5) * speedFactor;
   this.vy = (Math.random() - 0.5) * speedFactor;
   this.size = Math.random() * 2 + 1;
  }
  
  update(width, height) {
   this.x += this.vx;
   this.y += this.vy;
   
   if (this.x < 0 || this.x > width) this.vx *= -1;
   if (this.y < 0 || this.y > height) this.vy *= -1;
   
   if (mouse.x !== null) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distSq = dx * dx + dy * dy;
    
    if (distSq < MOUSE_DISTANCE * MOUSE_DISTANCE) {
     const dist = Math.sqrt(distSq);
     if (dist > 0) {
      const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE;
      this.x -= (dx / dist) * force * 2;
      this.y -= (dy / dist) * force * 2;
     }
    }
   }
  }
  
  draw() {
   ctx.fillStyle = `${COLOR} 0.5)`;
   ctx.beginPath();
   ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
   ctx.fill();
  }
 }
 
 const handleResize = () => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  const area = width * height;
  
  particleCount = Math.min(Math.max(Math.floor(area / PARTICLE_DENSITY_AREA), MIN_PARTICLES), MAX_PARTICLES);
  connectionDistance = width < 768 ? 80 : 150;
  connectionDistanceSq = connectionDistance * connectionDistance;
  speedFactor = width < 768 ? 0.5 : 1.0;
  
  particles = Array.from({ length: particleCount }, () => new Particle(width, height));
 };
 
 const animate = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  ctx.clearRect(0, 0, width, height);
  
  for (let i = 0; i < particles.length; i++) {
   const p1 = particles[i];
   p1.update(width, height);
   p1.draw();
   
   for (let j = i + 1; j < particles.length; j++) {
    const p2 = particles[j];
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const distSq = dx * dx + dy * dy;
    
    if (distSq < connectionDistanceSq) {
     const opacity = (1 - Math.sqrt(distSq) / connectionDistance) * LINE_OPACITY_FACTOR;
     ctx.strokeStyle = `${COLOR} ${opacity})`;
     ctx.lineWidth = 0.5;
     ctx.beginPath();
     ctx.moveTo(p1.x, p1.y);
     ctx.lineTo(p2.x, p2.y);
     ctx.stroke();
    }
   }
  }
  animationFrameId = requestAnimationFrame(animate);
 };
 
 window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 100);
 });
 window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
 });
 window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
 });
 
 handleResize();
 animate();
});

const projects = [
{
 href: "HTMLs/hardestGame.html",
 img: "Images/hardestGame.jpg",
 alt: "Hardest game image",
 title: "World's Hardest Game",
 info: "A precision-based challenge where you must navigate through obstacles without touching the blue dots."
},
{
 href: "HTMLs/buttonApp.html",
 img: "Images/buttonapp.jpg",
 alt: "The button app image",
 title: "The Button App",
 info: "An interactive experiment focused on satisfying clicks and mysterious UI feedback."
},
{
 href: "HTMLs/Calculator.html",
 img: "Images/Calculator.png",
 alt: "Calculator image",
 title: "Standard Calculator",
 info: "A fully functional calculator for basic arithmetic operations with a sleek interface."
},
{
 href: "HTMLs/rubik'sCube.html",
 img: "Images/rubikcube.jpg",
 alt: "Rubik's cube image",
 title: "Rubik's Cube Sim",
 info: "A 3D simulation of the classic puzzle. Can you solve it in record time?"
},
{
 href: "HTMLs/snake.html",
 img: "Images/snake.jpg",
 alt: "Snake game image",
 title: "Classic Snake",
 info: "The retro arcade favorite. Eat the apples to grow, but don't hit the walls or yourself!"
},
{
 href: "HTMLs/TicTacToeGame.html",
 img: "Images/TTTGame.png",
 alt: "Tic Tac Toe image",
 title: "Tic Tac Toe",
 info: "A simple game of X's and O's. Play against a friend or test your luck."
},
{
 href: "HTMLs/RPSGame.html",
 img: "Images/RPSGame.png",
 alt: "Rock paper scissors image",
 title: "Rock Paper Scissors",
 info: "The ultimate decision-making game. Play against the computer and track your score."
},
{
 href: "HTMLs/RSTest.html",
 img: "Images/RSTest.png",
 alt: "Reaction speed test image",
 title: "Reaction Speed Test",
 info: "Measure your reflexes in milliseconds. Click as soon as the screen turns green!"
},
{
 href: "HTMLs/MazeMaker.html",
 img: "Images/mazemaker.jpg",
 alt: "Maze maker image",
 title: "Maze Maker",
 info: "A procedural generation tool that creates unique, solvable mazes instantly."
},
{
 href: "HTMLs/polidromChecker.html",
 img: "Images/polidromChecker.png",
 alt: "Palindrome checker image",
 title: "Palindrome Checker",
 info: "An algorithm tool that detects if a word or phrase reads the same backward as forward."
},
{
 href: "HTMLs/romanNumeralConvertor.html",
 img: "Images/RNrConvertor.png",
 alt: "Roman numeral converter image",
 title: "Roman Numeral Converter",
 info: "Quickly convert standard integers into ancient Roman numerals and vice-versa."
}];

const container = document.getElementById('project-container');

const projectHTML = projects.map(project => {
 return `
    <div class="item-wrapper">
      <a href="${project.href}" class="item">
        <img src="${project.img}" alt="${project.alt}">
        
        <div class="overlay">
          <span class="title">${project.title}</span>
          <div class="info-icon">
            ⓘ
            <div class="tooltip">${project.info}</div>
          </div>
        </div>
      </a>
    </div>
  `;
}).join('');

container.innerHTML = projectHTML;