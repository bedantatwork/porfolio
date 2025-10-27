// Text changing animation
const textElement = document.querySelector("[data-text-animation]");

if (textElement) {
  const greetings = [
    "Hello",
    "Hola",
    "Bonjour",
    "Ciao",
    "Namaste",
    "Konnichiwa",
    "Hallo",
    "Olá",
    "Привет",
    "你好"
  ];

  let currentIndex = 0;

  function changeText() {
    gsap.to(textElement, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        currentIndex = (currentIndex + 1) % greetings.length;
        textElement.textContent = greetings[currentIndex];


        gsap.fromTo(textElement,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      }
    });
  }

  setInterval(changeText, 1000);
}

//hero process card
const processCards = document.querySelectorAll(".process_card");
const mediaCard = document.querySelector(".process_card.has_media");

if (mediaCard) {
  const allMedia = mediaCard.querySelectorAll("[data-media]");
  gsap.set(allMedia, { opacity: 0 });
  if (allMedia[0]) {
    gsap.set(allMedia[0], { opacity: 1 });
  }
}

processCards.forEach((card) => {
  const leftDoor = card.querySelector(".process_card_left");
  const rightDoor = card.querySelector(".process_card_right");

  if (!leftDoor || !rightDoor) return;

  gsap.set([leftDoor, rightDoor], { x: 0 });

  const cardNumber = card.getAttribute("data-card");

  card.addEventListener("mouseenter", () => {
    gsap.to(leftDoor, {
      x: "-100%",
      duration: 0.3,
      ease: "pixeto-ease"
    });

    gsap.to(rightDoor, {
      x: "100%",
      duration: 0.3,
      ease: "pixeto-ease"
    });

    if (cardNumber && mediaCard) {
      const targetMedia = mediaCard.querySelector(`[data-media="${cardNumber}"]`);
      const allMedia = mediaCard.querySelectorAll("[data-media]");
      const mediaLeftDoor = mediaCard.querySelector(".process_card_left");
      const mediaRightDoor = mediaCard.querySelector(".process_card_right");

      gsap.to(allMedia, {
        opacity: 0,
        duration: 0.3,
        ease: "pixeto-ease"
      });

      if (targetMedia) {
        gsap.to(targetMedia, {
          opacity: 1,
          duration: 0.3,
          ease: "pixeto-ease"
        });
      }

      if (mediaLeftDoor && mediaRightDoor) {
        gsap.to(mediaLeftDoor, {
          x: "-100%",
          duration: 0.3,
          ease: "pixeto-ease"
        });

        gsap.to(mediaRightDoor, {
          x: "100%",
          duration: 0.3,
          ease: "pixeto-ease"
        });
      }
    }
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(leftDoor, {
      x: 0,
      duration: 0.3,
      ease: "pixeto-ease"
    });

    gsap.to(rightDoor, {
      x: 0,
      duration: 0.3,
      ease: "pixeto-ease"
    });

    if (mediaCard) {
      const mediaLeftDoor = mediaCard.querySelector(".process_card_left");
      const mediaRightDoor = mediaCard.querySelector(".process_card_right");

      if (mediaLeftDoor && mediaRightDoor) {
        gsap.to(mediaLeftDoor, {
          x: 0,
          duration: 0.3,
          ease: "pixeto-ease"
        });

        gsap.to(mediaRightDoor, {
          x: 0,
          duration: 0.3,
          ease: "pixeto-ease"
        });
      }
    }
  });
});

// Photo grid hover animation
const photos = document.querySelectorAll(".photo");

photos.forEach((photo) => {
  photo.addEventListener("mouseenter", () => {
    photos.forEach((otherPhoto) => {
      if (otherPhoto !== photo) {
        gsap.to(otherPhoto, {
          filter: "blur(2px) grayscale(100%)",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(otherPhoto, {
          filter: "blur(0px) grayscale(0%)",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });

  photo.addEventListener("mouseleave", () => {
    photos.forEach((allPhoto) => {
      gsap.to(allPhoto, {
        filter: "blur(0px) grayscale(0%)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
});

