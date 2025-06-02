document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Theme toggle functionality
  const themeButton = document.getElementById("theme-button")
  const body = document.body

  if (themeButton) {
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
  }

  // Music control functionality
  const musicToggle = document.getElementById("music-toggle")
  const backgroundMusic = document.getElementById("background-music")
  let isPlaying = false
  let userInteracted = false

  if (musicToggle && backgroundMusic) {
    // Set up audio
    backgroundMusic.muted = false
    backgroundMusic.volume = 0.3

    // Function to handle music play
    const attemptAutoplay = async () => {
      try {
        await backgroundMusic.play()
        isPlaying = true
        musicToggle.querySelector("i").className = "fas fa-volume-up"
        console.log("Music started successfully")
      } catch (error) {
        console.log("Autoplay prevented:", error)
        isPlaying = false
        musicToggle.querySelector("i").className = "fas fa-volume-mute"
      }
    }

    // Try immediate autoplay
    attemptAutoplay()

    // Handle first user interaction to enable autoplay
    const enableAutoplay = () => {
      if (!userInteracted) {
        userInteracted = true
        if (!isPlaying) {
          attemptAutoplay()
        }
      }
    }

    // Listen for first user interaction
    document.addEventListener('click', enableAutoplay)
    document.addEventListener('keydown', enableAutoplay)

    // Click anywhere to pause/play music
    document.addEventListener('click', (e) => {
      if (e.target.closest('#music-toggle') || 
          e.target.closest('#theme-button') || 
          e.target.closest('a') || 
          e.target.closest('button')) {
        return
      }

      if (e.button === 0 || e.button === undefined) {
        const icon = musicToggle.querySelector("i")
        
        if (isPlaying) {
          backgroundMusic.pause()
          icon.className = "fas fa-volume-mute"
          isPlaying = false
          console.log("Music paused by click")
        } else {
          backgroundMusic.play().then(() => {
            icon.className = "fas fa-volume-up"
            isPlaying = true
            console.log("Music resumed by click")
          }).catch(error => {
            console.log("Could not play audio:", error)
          })
        }
      }
    })

    // Manual music toggle button
    musicToggle.addEventListener("click", async (e) => {
      e.stopPropagation()
      
      const icon = musicToggle.querySelector("i")

      if (isPlaying) {
        backgroundMusic.pause()
        icon.className = "fas fa-volume-mute"
        isPlaying = false
      } else {
        try {
          backgroundMusic.muted = false
          await backgroundMusic.play()
          icon.className = "fas fa-volume-up"
          isPlaying = true
        } catch (error) {
          console.log("Could not play audio:", error)
          icon.className = "fas fa-volume-mute"
        }
      }
    })
  }

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

  // Initialize Sakura effect - Check if Sakura exists
  if (typeof Sakura !== 'undefined') {
    setTimeout(() => {
      initializeSakura()
    }, 1000) // Increased delay
  } else {
    console.error("Sakura.js not loaded!")
  }

  // Typing effect for hero text
  typeWriter()
})

// Initialize Sakura effect
function initializeSakura() {
  console.log("Initializing Sakura...")
  
  // Check if container exists
  const container = document.querySelector('#snowflakes-container')
  if (!container) {
    console.error("Snowflakes container not found!")
    return
  }
  
  console.log("Container found:", container)
  console.log("Sakura available:", typeof Sakura)
  
  try {
    const sakura = new Sakura('#snowflakes-container', {
      className: 'sakura',
      fallSpeed: 0.8, // Made slightly faster
      maxSize: 16,    // Made slightly bigger
      minSize: 8,     // Made slightly smaller for variety
      delay: 200,     // Reduced delay between petals
      colors: [
        {
          gradientColorStart: 'rgba(255, 183, 197, 0.9)',
          gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
          gradientColorDegree: 120
        },
        {
          gradientColorStart: 'rgba(255, 192, 203, 0.9)',
          gradientColorEnd: 'rgba(255, 218, 224, 0.9)',
          gradientColorDegree: 45
        },
        {
          gradientColorStart: 'rgba(255, 182, 193, 0.8)',
          gradientColorEnd: 'rgba(255, 240, 245, 0.8)',
          gradientColorDegree: 90
        }
      ]
    })
    
    console.log("Sakura initialized successfully:", sakura)
    
    // Force start if not already running
    setTimeout(() => {
      console.log("Sakura animation ID:", container.getAttribute('data-sakura-anim-id'))
    }, 2000)
    
  } catch (error) {
    console.error("Error initializing Sakura:", error)
  }
}

// Typing effect function
function typeWriter() {
  const nameElement = document.getElementById("typing-name")
  const professionElement = document.getElementById("typing-profession")

  if (!nameElement || !professionElement) {
    console.error("Typing elements not found")
    return
  }

  const nameText = "Doan Duc"
  const professionText = "Security Engineer"

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