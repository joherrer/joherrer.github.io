/*--------------------------------------------------------------
# JavaScript File for Personal Portfolio Website
--------------------------------------------------------------*/

(function() {
  "use strict";

  /**
   * Apply or remove the .scrolled class based on current scroll/nav state
   */
  const selectBody = document.body;
  const selectHeader = document.querySelector('#header');
  const scrollTopButton = document.querySelector('.scroll-top');

  function updateScrolledState() {
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;

    if (selectBody.classList.contains('mobile-nav-active')) {
      selectBody.classList.remove('scrolled');
      return;
    }

    const shouldBeScrolled = window.scrollY > 20;
    const isScrolled = selectBody.classList.contains('scrolled');
    if (shouldBeScrolled !== isScrolled) {
      selectBody.classList.toggle('scrolled', shouldBeScrolled);
    }
  }

  /**
   * Show or hide the scroll-top button based on scroll/nav state
   */
  function updateScrollTopState() {
    if (!scrollTopButton) return;
    const shouldBeActive = window.scrollY > 100 && !selectBody.classList.contains('mobile-nav-active');
    const isActive = scrollTopButton.classList.contains('active');
    if (shouldBeActive !== isActive) {
      scrollTopButton.classList.toggle('active', shouldBeActive);
    }
  }

  /**
   * Throttle scroll-driven UI updates to the next animation frame
   */
  let scrollTicking = false;

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateScrolledState();
      updateScrollTopState();
      scrollTicking = false;
    });
  }

  document.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('DOMContentLoaded', () => {
    updateScrolledState();
    updateScrollTopState();
  });

  /**
   * Keep body.mobile-nav-active in sync with the mobile menu state
   */
  function setMobileNavActiveState(isActive) {
    const shouldBeActive = isActive && window.innerWidth < 992;
    selectBody.classList.toggle('mobile-nav-active', shouldBeActive);
    updateScrolledState();
    updateScrollTopState();
  }

  /**
   * Sync mobile menu open/close state from Bootstrap collapse events
   */
  function initMobileNavStateSync() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (!navbarCollapse) return;

    navbarCollapse.addEventListener('show.bs.collapse', () => setMobileNavActiveState(true));
    navbarCollapse.addEventListener('shown.bs.collapse', () => setMobileNavActiveState(true));
    navbarCollapse.addEventListener('hide.bs.collapse', () => setMobileNavActiveState(false));
    navbarCollapse.addEventListener('hidden.bs.collapse', () => setMobileNavActiveState(false));

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) {
        setMobileNavActiveState(false);
      } else {
        setMobileNavActiveState(navbarCollapse.classList.contains('show'));
      }
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', initMobileNavStateSync);

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

  const homePaths = new Set(['/', '/index.html']);
  const isHomePage = homePaths.has(window.location.pathname);
  if (isHomePage) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', aosInit, { once: true });
    } else {
      aosInit();
    }
  } else {
    window.addEventListener('load', aosInit, { once: true });
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

  document.addEventListener('DOMContentLoaded', () => {
    initMobileTapSingle([
      '.hero .hero-image .image-wrapper img',
      '.about .profile-figure',
      '.about .skill-item',
      '.about .fact-pill',
      '.skills .skill-box',
      '.resume .resume-item article',
      '.resume .software-pill',
      '.services .service-item',
      '.portfolio .portfolio-card',
      '.contact .info-item'
    ]);
  });

  function bindMobilePressState(elements) {
    elements.forEach(el => {
      el.addEventListener('touchstart', function() {
        if (window.innerWidth >= 992) return;
        this.classList.add('pressed');
      }, { passive: true });

      el.addEventListener('touchmove', function() {
        this.classList.remove('pressed');
      }, { passive: true });

      el.addEventListener('touchcancel', function() {
        this.classList.remove('pressed');
      }, { passive: true });
    });
  }

  function clearPressed(el, delay = 0) {
    setTimeout(() => {
      el.classList.remove('pressed');
    }, delay);
  }

  function resetTemporaryInteractionStates() {
    document.querySelectorAll('.pressed').forEach(el => el.classList.remove('pressed'));
    document.querySelectorAll('.portfolio .portfolio-card.scaled').forEach(card => card.classList.remove('scaled'));
  }

  window.addEventListener('pageshow', resetTemporaryInteractionStates);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      resetTemporaryInteractionStates();
    }
  });

  /**
   * Tap delay on mobile for navigation links and toggler
   */
  function initMobileNavDelay() {
    const elements = document.querySelectorAll('.navbar-nav .nav-link, .header .logo, .navbar-toggler');
    bindMobilePressState(elements);

    elements.forEach(el => {
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
          clearPressed(this, 50);

          setTimeout(() => {
            window.location.href = href;
          }, 150); 
        }
        else {
          clearPressed(this, 120);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initMobileNavDelay);

  /**
   * Tap delay on mobile for internal navigation links
   */
  function initMobileInternalCtaDelay() {
    const ctaLinks = document.querySelectorAll(
      '.hero .hero-actions .btn, ' +
      '.about .intro-content .cta-group .link-underline, ' +
      '.portfolio .portfolio-card .portfolio-img .portfolio-overlay a.portfolio-details-link, ' +
      '.portfolio-details .portfolio-details-content .cta-buttons .btn-next-project'
    );
    if (!ctaLinks.length) return;
    bindMobilePressState(ctaLinks);

    ctaLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (window.innerWidth >= 992) return;

        const href = this.getAttribute('href');
        if (!href || href === '#' || href.startsWith('http') || this.getAttribute('target') === '_blank') return;

        e.preventDefault();
        setTimeout(() => {
          clearPressed(this);
          window.location.href = href;
        }, 100);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initMobileInternalCtaDelay);

  /**
   * Tap feedback on mobile for social links
   */
  function initMobileSocialLinkPress() {
    const interactiveLinks = document.querySelectorAll(
      '.hero .social-links a, ' +
      '.footer .social-links a, ' +
      '.portfolio .portfolio-card .portfolio-img .portfolio-overlay a.github, ' +
      '.portfolio-details .portfolio-details-content .project-website a, ' +
      '.portfolio-details .portfolio-details-content .cta-buttons .btn-view-project'
    );
    if (!interactiveLinks.length) return;
    bindMobilePressState(interactiveLinks);

    interactiveLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth >= 992) return;
        clearPressed(this, 150);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initMobileSocialLinkPress);

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
