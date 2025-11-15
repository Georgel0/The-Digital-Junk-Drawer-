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

document.querySelector('.eye-socket').addEventListener('click', () => {
 const eyeText = document.getElementById('eye-text');
 
 eyeText.classList.add('visible');
 
 setTimeout(() => {
  eyeText.classList.remove('visible')
 }, 2000)
});