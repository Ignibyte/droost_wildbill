/**
 * @file
 * The site header's mobile menu: the menu button opens and closes it, Escape
 * closes it and hands focus back to the button, and widening the window past
 * the mobile breakpoint closes it.
 */
((Drupal, once) => {
  const WIDE = 860;

  Drupal.behaviors.wildbillsSiteHeader = {
    attach(context) {
      once('wb-header', '[data-wb-header]', context).forEach((header) => {
        const button = header.querySelector('.wb-menu-btn');
        if (!button) {
          return;
        }
        const setOpen = (open) => {
          header.classList.toggle('is-open', open);
          button.setAttribute('aria-expanded', String(open));
          button.setAttribute('aria-label', open ? button.dataset.labelClose : button.dataset.labelOpen);
        };
        button.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && header.classList.contains('is-open')) {
            setOpen(false);
            button.focus();
          }
        });
        window.addEventListener('resize', () => {
          if (window.innerWidth > WIDE) {
            setOpen(false);
          }
        });
      });
    },
  };
})(Drupal, once);
