// Link hover blogs animation
gsap.registerPlugin(ScrollTrigger);

// Set initial state for all table_divider elements
gsap.set(".table_divider", { width: "0%" });

// Create staggered animation triggered by .resource
gsap.to(".table_divider", {
  width: "100%",
  duration: 1.2,
  ease: "power2.inOut",
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".resource",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

// GSAP hover animation for table_item with direction detection
const tableItems = document.querySelectorAll(".table_item");

let lastHoveredIndex = -1;

tableItems.forEach((item, index) => {
  const bg = item.querySelector(".table_item_bg");

  gsap.set(bg, { yPercent: -100 });

  item.addEventListener("mouseenter", (e) => {
    let direction = "down";

    if (lastHoveredIndex !== -1) {
      if (index > lastHoveredIndex) {
        direction = "down";
      } else if (index < lastHoveredIndex) {
        direction = "up";
      }
    }

    if (direction === "down") {
      gsap.set(bg, { yPercent: -100 });
    } else {
      gsap.set(bg, { yPercent: 100 });
    }

    gsap.to(bg, {
      yPercent: 0,
      duration: 0.2,
      ease: "none"
    });

    lastHoveredIndex = index;
  });

  item.addEventListener("mouseleave", (e) => {
    const rect = item.getBoundingClientRect();
    const mouseY = e.clientY;
    const itemCenterY = rect.top + rect.height / 2;

    let exitDirection = mouseY > itemCenterY ? "down" : "up";

    gsap.to(bg, {
      yPercent: exitDirection === "down" ? 100 : -100,
      duration: 0.2,
      ease: "none"
    });
  });
});


//hero loading animation
document.querySelectorAll("[data-heading]").forEach((el) => {
  let splitText = new SplitType(el, { types: "words", tagName: "span" });

  splitText.words.forEach((word) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.verticalAlign = "top";
    word.parentNode.insertBefore(wrapper, word);
    wrapper.appendChild(word);
    word.style.display = "inline-block";
  });

  gsap.fromTo(
    splitText.words,
    { yPercent: 100, opacity: 0, rotation: 1 },
    {
      yPercent: 0,
      opacity: 1,
      rotation: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        toggleActions: "play none none none",
        onLeave: () => splitText.revert(),
      }
    }
  );
});

// Animate hero card images
gsap.fromTo(
  ".work_card_media_img",
  { opacity: 0, rotation: 2, scale: 1.1 },
  {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 3.5,
    ease: "expo.out",
    delay: 0.5,
    scrollTrigger: {
      trigger: "[data-heading]",
      start: "top 95%",
      toggleActions: "play none none none",
    }
  }
);

// Animate award tags
gsap.fromTo(
  ".award_tag",
  { opacity: 0 },
  {
    opacity: 1,
    delay:0.2,
    duration: 3.5,
    ease: "expo.out",
    delay: 2,
    scrollTrigger: {
      trigger: "[data-heading]",
      start: "top 95%",
      toggleActions: "play none none none",
    }
  }
);

// Animate subtext
gsap.fromTo(
  "[data-subtext]",
  { opacity: 0, yPercent: 100 },
  {
    opacity: 1,
    yPercent: 0,
    duration: 1.5,
    ease: "power2.out",
    delay: 0.8,
    scrollTrigger: {
      trigger: "[data-heading]",
      start: "top 95%",
      toggleActions: "play none none none",
    }
  }
);

// Animate button
gsap.fromTo(
  ".button_learn_more",
  { opacity: 0, yPercent: 100 },
  {
    opacity: 1,
    yPercent: 0,
    duration: 1.5,
    ease: "power2.out",
    delay: 0.8,
    scrollTrigger: {
      trigger: "[data-heading]",
      start: "top 95%",
      toggleActions: "play none none none",
    }
  }
);

// Animate nav elements (runs at same time as images)
gsap.fromTo(
  ".brand, .nav_link, .button_primary.on_nav",
  { opacity: 0, yPercent: -100 },
  {
    opacity: 1,
    yPercent: 0,
    duration: 1.5,
    ease: "expo.out",
    stagger: 0.1,
    delay: 0.5,
    scrollTrigger: {
      trigger: "[data-heading]",
      start: "top 95%",
      toggleActions: "play none none none",
    }
  }
);

// Work card hover animation
const workCards = document.querySelectorAll(".work_card");

workCards.forEach((card) => {
  const cardImg = card.querySelector(".work_card_media_img");

  if (!cardImg) return;

  card.addEventListener("mouseenter", () => {
    gsap.killTweensOf(cardImg);
    gsap.to(cardImg, {
      scale: 1.1,
      duration: 1.6,
      ease: "expo.out",
      overwrite: "auto"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.killTweensOf(cardImg);
    gsap.to(cardImg, {
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
      overwrite: "auto"
    });
  });
});

// Nav link hover animation
const navLinks = document.querySelectorAll(".nav_link");

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    navLinks.forEach((otherLink) => {
      if (otherLink !== link) {
        gsap.to(otherLink, {
          opacity: 0.6,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });

  link.addEventListener("mouseleave", () => {
    navLinks.forEach((otherLink) => {
      gsap.to(otherLink, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
});


//process animatoin
// Process card door animation
const processCards = document.querySelectorAll(".process_card");

processCards.forEach((card) => {
  const leftDoor = card.querySelector(".process_card_left");
  const rightDoor = card.querySelector(".process_card_right");

  if (!leftDoor || !rightDoor) return;

  gsap.set([leftDoor, rightDoor], { x: 0 });

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
  });
});

//blog swiper

const wrapper = document.querySelector('.swiper.on_blog .swiper-wrapper');
  const allSlides = wrapper.querySelectorAll('.swiper-slide');
  if (allSlides.length <= 3) {
    allSlides.forEach(slide => {
      wrapper.appendChild(slide.cloneNode(true));
    });
  }


  const testimonialSlider = new Swiper('.swiper.on_blog', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    initialSlide: 1,
    centeredSlides:false,
    speed: 600,
    mousewheel: {
      enabled: true,
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: false,
    },
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 4,
        spaceBetween: 20,
      }
    }
  });


//accordian animation
gsap.utils.toArray(".acc_tab").forEach((tab) => {
  let content = tab.querySelector(".acc_tab_content");

  gsap.set(content, { height: 0, overflow: "hidden" });


  tab.addEventListener("mouseenter", () => {
    gsap.to(content, { height: "auto", duration: 0.6, ease: "pixeto-ease" });

  });

  tab.addEventListener("mouseleave", () => {
    gsap.to(content, { height: 0, duration: 0.6, ease: "pixeto-ease" });

  });
});

// Accordion arrow animation
gsap.utils.toArray(".acc_tab").forEach((tab) => {
  let arrows = tab.querySelectorAll(".acc_tab_arrow_outline, .acc_tab_arrow_fill");

  gsap.set(arrows, { xPercent: -100, yPercent: 100 });

  let arrowTimeline;

  tab.addEventListener("mouseenter", () => {
    if (arrowTimeline) {
      arrowTimeline.kill();
    }

    arrowTimeline = gsap.timeline({ delay: 0.5 });

    arrows.forEach((arrow, index) => {
      const isLastArrow = index === arrows.length - 1;

      let startTime = index === 0 ? 0 : 0.4;

      arrowTimeline.fromTo(
        arrow,
        { xPercent: -100, yPercent: 100 },
        {
          xPercent: isLastArrow ? 0 : 100,
          yPercent: isLastArrow ? 0 : -100,
          duration: 1.2,
          ease: "pixeto-ease",
          onComplete: () => {
            if (!isLastArrow) {
              gsap.set(arrow, { xPercent: -100, yPercent: 100 });
            }
          }
        },
        startTime
      );
    });
  });

  tab.addEventListener("mouseleave", () => {
    if (arrowTimeline) {
      arrowTimeline.kill();
    }
    gsap.set(arrows, { xPercent: -100, yPercent: 100 });
  });
});

// Footer social arrow animation
gsap.utils.toArray(".footer_content.has_social").forEach((item) => {
  let arrows = item.querySelectorAll(".acc_tab_arrow_outline, .acc_tab_arrow_fill");

  gsap.set(arrows, { xPercent: -100, yPercent: 100 });

  let arrowTimeline;

  item.addEventListener("mouseenter", () => {
    if (arrowTimeline) {
      arrowTimeline.kill();
    }

    arrowTimeline = gsap.timeline({ delay: 0.5 });

    arrows.forEach((arrow, index) => {
      const isLastArrow = index === arrows.length - 1;

      let startTime = index === 0 ? 0 : 0.3;

      arrowTimeline.fromTo(
        arrow,
        { xPercent: -100, yPercent: 100 },
        {
          xPercent: isLastArrow ? 0 : 100,
          yPercent: isLastArrow ? 0 : -100,
          duration: 1.2,
          ease: "pixeto-ease",
          onComplete: () => {
            if (!isLastArrow) {
              gsap.set(arrow, { xPercent: -100, yPercent: 100 });
            }
          }
        },
        startTime
      );
    });
  });

  item.addEventListener("mouseleave", () => {
    if (arrowTimeline) {
      arrowTimeline.kill();
    }
    gsap.set(arrows, { xPercent: -100, yPercent: 100 });
  });
}); 


