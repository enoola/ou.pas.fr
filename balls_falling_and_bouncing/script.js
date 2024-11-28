// Declare balls first before using it in any function
let balls = [];

// Limit for the maximum number of balls
const MAX_BALLS = 21;
const BALL_RADIUS = 4;  // Radius for each ball (10px diameter)

const GRAVITY = 0.05; // Gravity effect for vertical motion
const SHRINK_RATE = 0.99; // Rate at which balls shrink over time
const MIN_SIZE = BALL_RADIUS * 2; // Minimum size after shrinking

// Function to create a new ball at a random position without overlap
function createBallWithNoOverlap() {
  if (balls.length >= MAX_BALLS) {
    return null;  // Return null if we exceed the max number of balls
  }

  let posX, posY;
  let isOverlapping;

  do {
    isOverlapping = false;
    // Generate random positions inside the full viewport
    posX = Math.random() * (window.innerWidth - BALL_RADIUS * 2) + BALL_RADIUS;
    posY = Math.random() * (window.innerHeight - BALL_RADIUS * 2) + BALL_RADIUS;

    // Check if this position overlaps any existing ball
    for (let ball of balls) {
      const dx = ball.posX - posX;
      const dy = ball.posY - posY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < (ball.size / 2 + BALL_RADIUS)) {
        isOverlapping = true;
        break; // Stop checking further if overlap is found
      }
    }
  } while (isOverlapping); // Retry until no overlap is found

  // Create a new ball
  const newBall = document.createElement('div');
  newBall.classList.add('dot');
  newBall.style.width = `${BALL_RADIUS * 2}px`;
  newBall.style.height = `${BALL_RADIUS * 2}px`;
  newBall.style.backgroundColor = getRandomColor();  // Set a random color
  document.querySelector('.container').appendChild(newBall);

  return {
    element: newBall,
    posX: posX,
    posY: posY,
    velocityX: (Math.random() - 0.5) * 2,  // Slower speed between -1 and 1
    velocityY: (Math.random() - 0.5) * 2,  // Slower speed between -1 and 1
    size: BALL_RADIUS * 2,  // Set the size (10px diameter)
    growth: false // Indicates whether the ball has recently grown
  };
}

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Initialize balls with random positions without overlap
balls = Array.from({ length: 10 }, () => createBallWithNoOverlap()).filter(Boolean); // Start with 10 balls

// Function to detect collision between two balls
function areBallsColliding(ball1, ball2) {
  const dx = ball1.posX - ball2.posX;
  const dy = ball1.posY - ball2.posY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // If the distance between the centers is less than the sum of their radii, they're colliding
  return distance < (ball1.size / 2 + ball2.size / 2);
}

// Function to animate all balls
function animateBalls() {
  let newBalls = [];

  balls.forEach((ball, index) => {
    // Apply gravity to vertical velocity
    ball.velocityY += GRAVITY;

    // Update ball's position with gravity and velocity
    ball.posX += ball.velocityX;
    ball.posY += ball.velocityY;

    // Slowly shrink balls if they've grown
    if (ball.growth && ball.size > MIN_SIZE) {
      ball.size *= SHRINK_RATE;
      ball.element.style.width = `${ball.size}px`;
      ball.element.style.height = `${ball.size}px`;
    }

    // Check if the ball hits the border and split it
    if (ball.posX - ball.size / 2 <= 0 || ball.posX + ball.size / 2 >= window.innerWidth) {
      ball.velocityX *= -1;
      const newBall = createBallWithNoOverlap();
      if (newBall) newBalls.push(newBall);
    }

    if (ball.posY - ball.size / 2 <= 0 || ball.posY + ball.size / 2 >= window.innerHeight) {
      ball.velocityY *= -1;
      const newBall = createBallWithNoOverlap();
      if (newBall) newBalls.push(newBall);
    }

    // Apply the new position
    ball.element.style.transform = `translate(${ball.posX}px, ${ball.posY}px)`;

    // Check for collisions with other balls
    for (let j = index + 1; j < balls.length; j++) {
      const otherBall = balls[j];

      if (areBallsColliding(ball, otherBall)) {
        // Check the sizes of the colliding balls
        if (ball.size > otherBall.size) {
          // Current ball is bigger, other ball "explodes"
          otherBall.element.remove();
          balls.splice(j, 1);
          j--;  // Adjust index since we removed an element
        } else if (ball.size < otherBall.size) {
          // Other ball is bigger, current ball "explodes"
          ball.element.remove();
          balls.splice(index, 1);
          return;  // Stop further processing for this ball
        } else {
          // Same size, randomly decide which one explodes (same as before)
          if (Math.random() < 0.5) {
            // Grow the current ball
            ball.size *= 1.2;
            ball.element.style.width = `${ball.size}px`;
            ball.element.style.height = `${ball.size}px`;
            ball.element.style.backgroundColor = getRandomColor();  // Change color
            ball.growth = true;  // Mark that the ball has recently grown

            // Remove the other ball
            otherBall.element.remove();
            balls.splice(j, 1);
            j--;  // Adjust index since we removed an element
          } else {
            // Grow the other ball
            otherBall.size *= 1.2;
            otherBall.element.style.width = `${otherBall.size}px`;
            otherBall.element.style.height = `${otherBall.size}px`;
            otherBall.element.style.backgroundColor = getRandomColor();  // Change color
            otherBall.growth = true;  // Mark that the ball has recently grown

            // Remove the current ball
            ball.element.remove();
            balls.splice(index, 1);
            return;  // Stop further processing for this ball
          }
        }
      }
    }
  });

  // Add new balls to the array, but only if we are under the limit
  balls = balls.concat(newBalls).slice(0, MAX_BALLS);  // Ensure the total balls don't exceed MAX_BALLS

  // Call animateBalls again on the next frame
  requestAnimationFrame(animateBalls);
}

// Start the animation after balls are initialized
animateBalls();