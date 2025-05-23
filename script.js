document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Theme toggle functionality
  const themeButton = document.getElementById("theme-button")
  const body = document.body

  themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    // Update icon
    const icon = themeButton.querySelector("i")
    if (body.classList.contains("dark-mode")) {
      icon.className = "fas fa-sun"
    } else {
      icon.className = "fas fa-moon"
    }
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Update active link
        document.querySelectorAll("nav a").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })

  // Update active navigation link on scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll("nav a").forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  })

  // Create falling flowers
  createFlowers()

  // Music control
  const musicToggle = document.getElementById("music-toggle")
  const backgroundMusic = document.getElementById("background-music")

  musicToggle.addEventListener("click", () => {
    const icon = musicToggle.querySelector("i")

    if (backgroundMusic.paused) {
      backgroundMusic.play()
      icon.className = "fas fa-volume-up"
    } else {
      backgroundMusic.pause()
      icon.className = "fas fa-volume-mute"
    }
  })
})

// Function to create falling flowers
function createFlowers() {
  const container = document.getElementById("flowers-container")
  const flowerCount = 30

  for (let i = 0; i < flowerCount; i++) {
    createFlower(container)
  }
}

function createFlower(container) {
  const flower = document.createElement("div")
  flower.className = "flower"

  // Random position, size, and animation duration
  const size = Math.random() * 15 + 10
  const left = Math.random() * 100
  const animationDuration = Math.random() * 10 + 5
  const delay = Math.random() * 5

  flower.style.width = `${size}px`
  flower.style.height = `${size}px`
  flower.style.left = `${left}%`
  flower.style.top = "-50px"

  // Apply falling animation
  flower.style.animation = `fall ${animationDuration}s linear ${delay}s infinite`

  // Create keyframes for falling animation
  const keyframes = `
    @keyframes fall {
      0% {
        transform: translateY(-50px) rotate(0deg) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      100% {
        transform: translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `

  // Add keyframes to document
  const styleSheet = document.createElement("style")
  styleSheet.textContent = keyframes
  document.head.appendChild(styleSheet)

  container.appendChild(flower)
}
