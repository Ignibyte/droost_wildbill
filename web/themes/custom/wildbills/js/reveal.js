/**
 * @file
 * Reveal on scroll: sections marked .wb-reveal fade up as they enter view.
 *
 * The hidden starting state applies only once this script has added .wb-js
 * to <html>, so without JavaScript nothing is hidden. A visitor who prefers
 * reduced motion, or a browser without IntersectionObserver, gets every
 * section shown at once.
 */
((Drupal, once) => {
  document.documentElement.classList.add('wb-js');

  const showAll = (elements) => elements.forEach((el) => el.classList.add('is-in'));

  Drupal.behaviors.wildbillsReveal = {
    attach(context) {
      const elements = once('wb-reveal', '.wb-reveal', context);
      if (!elements.length) {
        return;
      }
      if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        showAll(elements);
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      elements.forEach((el) => observer.observe(el));
    },
  };
})(Drupal, once);
