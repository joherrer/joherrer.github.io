/*--------------------------------------------------------------
# JavaScript File for Personal Portfolio Website
--------------------------------------------------------------*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;

    if (selectBody.classList.contains('mobile-nav-active')) {
      selectBody.classList.remove('scrolled');
      return; 
    }

    window.scrollY > 20 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  /**
   * Scroll top button visibility toggle
   */
  function toggleScrollTop() {
    let scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      const isMobileNavActive = document.body.classList.contains('mobile-nav-active');
      if (window.scrollY > 100 && !isMobileNavActive) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    }
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /**
   * Tap effects on mobile for specific UI elements
   */
  function initMobileTapSingle(selectors) {
    const elements = selectors.flatMap(sel => Array.from(document.querySelectorAll(sel)));

    document.addEventListener('click', (e) => {
      if (window.innerWidth >= 992) return;

      let clickedInsideElement = false;
      elements.forEach(el => {
        if (el.contains(e.target)) {
          clickedInsideElement = true;
          elements.forEach(sibling => {
            if (sibling !== el) sibling.classList.remove('scaled');
          });
          el.classList.toggle('scaled');
        }
      });

      if (!clickedInsideElement) {
        elements.forEach(el => el.classList.remove('scaled'));
      }
    });
  }

  /**
   * Tap delay on mobile for navigation links and toggler
   */
  function initMobileNavDelay() {
    const elements = document.querySelectorAll('.navbar-nav .nav-link, .header .logo, .navbar-toggler');
    
    elements.forEach(el => {
      el.addEventListener('pointerdown', function(e) {
        if (window.innerWidth < 992) {
          this.classList.add('pressed');
        }
      });

      el.addEventListener('click', function(e) {
        const isMobile = window.innerWidth < 992;
        if (!isMobile) return;

        const href = this.getAttribute('href');

        if (this.classList.contains('nav-link') && href && href !== '#') {
          e.preventDefault();
          document.querySelectorAll('.navbar-nav .nav-link.active').forEach(link => {
            link.classList.remove('active');
          });
          this.classList.add('active');

          setTimeout(() => {
            window.location.href = href;
          }, 200);
        } 
        else if (this.classList.contains('logo') && href) {
          e.preventDefault();

          setTimeout(() => {
            this.classList.remove('pressed');
          }, 50);

          setTimeout(() => {
            window.location.href = href;
          }, 200); 
        }
        else {
          setTimeout(() => {
            this.classList.remove('pressed');
          }, 120);
        }
      });

      el.addEventListener('pointermove', function() {
        this.classList.remove('pressed');
      });

      el.addEventListener('pointercancel', function() {
        this.classList.remove('pressed');
      });
    });
  }

  /**
   * Typed.js initialization
   */
  function initTyped() {
    const selectTyped = document.querySelector('.typed');
    if (selectTyped) {
      let typed_strings = selectTyped.getAttribute('data-typed-items');
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 40,
        backSpeed: 30,
        backDelay: 2000
      });
    }
  }

  /**
   * Skills progress bar animation
   */
  function initSkillsAnimation() {
    let skillsAnimation = document.querySelectorAll('.skills-animation');
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  /**
   * Swiper sliders initialization
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiperElement, config);
    });
  }

  /**
   * Isotope layout and filters
   */
  function initIsotope() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let inst;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        inst = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          inst.arrange({ filter: this.getAttribute('data-filter') });
          if (typeof AOS !== 'undefined') AOS.refresh();
        }, false);
      });
    });
  }

  /**
   * Contact Form handling
   */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    
    const status = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      showAlert("Sending message...", "info");

      try {
        const response = await fetch("https://formspree.io/f/myznnnoz", {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          showAlert("Message sent successfully!", "success");
          form.reset();
        } else {
          const data = await response.json();
          showAlert(data.errors ? data.errors[0].message : "Error occurred", "danger");
        }
      } catch {
        showAlert("Network error.", "danger");
      }
    });

    function showAlert(message, type) {
      status.innerHTML = `<div class="alert alert-${type} show">${message}</div>`;
      setTimeout(() => { status.innerHTML = ""; }, 3000);
    }
  }

  /*--------------------------------------------------------------
  # Global Event Listeners & Init Calls
  --------------------------------------------------------------*/

  window.addEventListener('load', () => {
    aosInit();
    initTyped();
    initSkillsAnimation();
    initSwiper();
    initIsotope();
    initContactForm();
    initMobileNavDelay();
    
    initMobileTapSingle([
      '.hero .hero-image .image-wrapper img',
      '.about .profile-figure',
      '.about .skill-item',
      '.about .fact-pill',
      '.skills .skill-box',
      '.resume .software-pill',
      '.services .service-item',
      '.portfolio .portfolio-card',
      '.contact .info-item'
    ]);
  });

  document.addEventListener('scroll', () => {
    toggleScrolled();
    toggleScrollTop();
  });

  // Bootstrap collapse events for body scroll locking
  const navbar = document.querySelector('#navbarNav');
  if (navbar) {
    navbar.addEventListener('show.bs.collapse', () => {
      document.body.classList.add('mobile-nav-active');
    });
    navbar.addEventListener('hidden.bs.collapse', () => {
      document.body.classList.remove('mobile-nav-active');
    });
  }

  // Scroll to top click
  let scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();