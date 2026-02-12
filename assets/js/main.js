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

  document.addEventListener('scroll', toggleScrolled);
  document.addEventListener('DOMContentLoaded', toggleScrolled);

  /**
   * Scroll top button
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

  document.addEventListener('scroll', toggleScrollTop);
  document.addEventListener('DOMContentLoaded', toggleScrollTop);

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

  window.addEventListener('load', aosInit);

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

  document.addEventListener('DOMContentLoaded', () => {
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

  /**
   * Tap delay on mobile for navigation links and toggler
   */
  function initMobileNavDelay() {
    const elements = document.querySelectorAll('.navbar-nav .nav-link, .header .logo, .navbar-toggler');
    
    elements.forEach(el => {
      el.addEventListener('touchstart', function() {
        if (window.innerWidth < 992) {
          this.classList.add('pressed');
        }
      }, { passive: true });

      el.addEventListener('click', function(e) {
        if (window.innerWidth >= 992) return;

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
        else if (this.classList.contains('logo')) {
          e.preventDefault();
          setTimeout(() => {
            this.classList.remove('pressed');
          }, 50);

          setTimeout(() => {
            window.location.href = href;
          }, 150); 
        }
        else {
          setTimeout(() => {
            this.classList.remove('pressed');
          }, 120);
        }
      });

      el.addEventListener('touchmove', function() {
        this.classList.remove('pressed');
      }, { passive: true });
    });
  }

  document.addEventListener('DOMContentLoaded', initMobileNavDelay);

  /**
   * Typed.js initialization
   */
  function initTyped() {
    const selectTyped = document.querySelector('.typed');
    if (selectTyped && typeof Typed !== 'undefined') {
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

  document.addEventListener('DOMContentLoaded', initTyped);

  /**
   * Skills progress bar animation
   */
  function initSkillsAnimation() {
    if (typeof Waypoint === 'undefined') return;
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

  document.addEventListener('DOMContentLoaded', initSkillsAnimation);

  /**
   * Swiper sliders initialization
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiperElement, config);
    });
  }

  window.addEventListener('load', initSwiper);

  /**
   * Isotope layout and filters
   */
  function initIsotope() {
    if (typeof imagesLoaded === 'undefined' || typeof Isotope === 'undefined') return;
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
          if (!inst) return;
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          inst.arrange({ filter: this.getAttribute('data-filter') });
          if (typeof AOS !== 'undefined') AOS.refresh();
        }, false);
      });
    });
  }

  window.addEventListener('load', initIsotope);

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

  document.addEventListener('DOMContentLoaded', initContactForm);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined' && document.querySelector('.glightbox')) {
    GLightbox({
      selector: '.glightbox',
      loop: true,
      touchNavigation: true
    });
  }

})();
