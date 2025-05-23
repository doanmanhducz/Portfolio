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

  // Music control functionality
  const musicToggle = document.getElementById("music-toggle")
  const backgroundMusic = document.getElementById("background-music")
  let isPlaying = false

  // Try to play music automatically (may be blocked by browser)
  const playMusic = () => {
    backgroundMusic
      .play()
      .then(() => {
        isPlaying = true
        musicToggle.querySelector("i").className = "fas fa-volume-up"
      })
      .catch(() => {
        // Autoplay blocked, user needs to interact first
        isPlaying = false
        musicToggle.querySelector("i").className = "fas fa-volume-mute"
      })
  }

  // Attempt autoplay after a short delay
  setTimeout(playMusic, 1000)

  musicToggle.addEventListener("click", () => {
    const icon = musicToggle.querySelector("i")

    if (isPlaying) {
      backgroundMusic.pause()
      icon.className = "fas fa-volume-mute"
      isPlaying = false
    } else {
      backgroundMusic
        .play()
        .then(() => {
          icon.className = "fas fa-volume-up"
          isPlaying = true
        })
        .catch(() => {
          console.log("Could not play audio")
        })
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

  // Create falling snowflakes
  createSnowflakes()

  // Typing effect for hero text
  typeWriter()
})

// Function to create falling snowflakes
function createSnowflakes() {
  const container = document.getElementById("snowflakes-container")
  const snowflakeSymbols = ["❄", "❅", "❆", "✦", "✧", "✩", "✪", "✫", "✬", "✭"]

  function createSnowflake() {
    const snowflake = document.createElement("div")
    snowflake.className = "snowflake"
    snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)]

    // Random properties
    const size = Math.random() * 20 + 10
    const left = Math.random() * 100
    const animationDuration = Math.random() * 3 + 2
    const opacity = Math.random() * 0.6 + 0.4

    snowflake.style.fontSize = `${size}px`
    snowflake.style.left = `${left}%`
    snowflake.style.opacity = opacity
    snowflake.style.animation = `snowfall ${animationDuration}s linear infinite`

    container.appendChild(snowflake)

    // Remove snowflake after animation
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake)
      }
    }, animationDuration * 1000)
  }

  // Create snowflakes continuously
  setInterval(createSnowflake, 300)

  // Add CSS animation for snowfall
  const style = document.createElement("style")
  style.textContent = `
    @keyframes snowfall {
      0% {
        transform: translateY(-100px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      100% {
        transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

// Typing effect function
function typeWriter() {
  const nameElement = document.getElementById("typing-name")
  const professionElement = document.getElementById("typing-profession")

  const nameText = "John Doe"
  const professionText = "Information Security & Pentesting Enthusiast"

  let nameIndex = 0
  let professionIndex = 0

  function typeName() {
    if (nameIndex < nameText.length) {
      nameElement.textContent = nameText.slice(0, nameIndex + 1)
      nameIndex++
      setTimeout(typeName, 100)
    } else {
      setTimeout(typeProfession, 500)
    }
  }

  function typeProfession() {
    if (professionIndex < professionText.length) {
      professionElement.textContent = professionText.slice(0, professionIndex + 1)
      professionIndex++
      setTimeout(typeProfession, 50)
    }
  }

  // Start typing after page loads
  setTimeout(typeName, 1000)
}
