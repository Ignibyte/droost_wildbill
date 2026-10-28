/**
 * @file
 * The inventory's filters, sorts, chips and details pop-up, as the source's
 * vehicles.ts has them, over the cards the page already holds.
 *
 * Every card carries its facts as data attributes. Filtering hides cards and
 * sorting moves them; nothing is fetched. The pop-up is filled with
 * textContent from the card that opened it, never with markup.
 */
((Drupal, once) => {
  const money = (n) => `$${n.toLocaleString('en-US')}`;
  const miles = (n) => `${n.toLocaleString('en-US')} mi`;

  const sorters = {
    featured: (a, b) => b.featured - a.featured || a.stock - b.stock,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'year-desc': (a, b) => b.year - a.year || a.miles - b.miles,
    'miles-asc': (a, b) => a.miles - b.miles,
  };

  function init(root) {
    const $ = (selector) => root.querySelector(selector);
    const search = $('[data-wb-search]');
    const make = $('[data-wb-make]');
    const sort = $('[data-wb-sort]');
    const ranges = {
      price: $('[data-wb-range="price"]'),
      year: $('[data-wb-range="year"]'),
      miles: $('[data-wb-range="miles"]'),
    };
    const defaults = {
      price: ranges.price.max,
      year: ranges.year.min,
      miles: ranges.miles.max,
    };
    const typeGroup = $('[data-wb-types]');
    const typeButtons = [...typeGroup.querySelectorAll('button[data-type]')];
    const cardsRegion = $('[data-wb-cards]');
    const grid = cardsRegion.querySelector('.wb-car-grid');
    const empty = $('[data-wb-empty]');
    const count = $('[data-wb-count]');
    const chips = $('[data-wb-chips]');
    const filters = $('[data-wb-filters]');
    const toggle = $('[data-wb-filter-toggle]');
    const dialog = $('[data-wb-dialog]');
    const closeIcon = $('[data-wb-close-icon]');

    // A card may sit inside a wrapper; the grid's own child is what moves.
    const vehicles = [...grid.querySelectorAll('[data-wb-vehicle]')].map(
      (card) => {
        let item = card;
        while (item.parentElement && item.parentElement !== grid) {
          item = item.parentElement;
        }
        const d = card.dataset;
        return {
          card,
          item,
          stock: Number(d.stock),
          year: Number(d.year),
          price: Number(d.price),
          miles: Number(d.miles),
          featured: d.featured === '1',
          pending: d.status === 'pending',
          make: d.make,
          model: d.model,
          color: d.color,
          type: d.type,
          condition: d.condition,
          haystack:
            `${d.year} ${d.make} ${d.model} ${d.color} ${d.type}`.toLowerCase(),
        };
      },
    );
    const total = vehicles.length;
    let type = '';

    function setType(value) {
      type = value;
      typeButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.type === value));
      });
    }

    function typePlural(value) {
      const button = typeButtons.find((b) => b.dataset.type === value);
      return button ? button.textContent.trim() : value;
    }

    function chip(label, clear, className) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      if (className) {
        button.className = className;
      }
      else {
        button.append(' ', closeIcon.content.cloneNode(true));
        button.setAttribute(
          'aria-label',
          Drupal.t('Remove filter @label', { '@label': label }),
        );
      }
      button.addEventListener('click', clear);
      return button;
    }

    function apply() {
      const s = search.value.trim().toLowerCase();
      const maxPrice = Number(ranges.price.value);
      const minYear = Number(ranges.year.value);
      const maxMiles = Number(ranges.miles.value);
      $('[data-wb-out="price"]').textContent = money(maxPrice);
      $('[data-wb-out="year"]').textContent = `${minYear}+`;
      $('[data-wb-out="miles"]').textContent = miles(maxMiles);

      const list = vehicles
        .filter(
          (v) =>
            (!s || v.haystack.includes(s)) &&
            (!make.value || v.make === make.value) &&
            (!type || v.type === type) &&
            v.price <= maxPrice &&
            v.year >= minYear &&
            v.miles <= maxMiles,
        )
        .sort(sorters[sort.value] || sorters.featured);
      const shown = new Set(list);
      vehicles.forEach((v) => {
        v.item.hidden = !shown.has(v);
      });
      list.forEach((v) => grid.append(v.item));

      const n = list.length;
      const of = document.createElement('span');
      of.textContent = Drupal.t('of @total', { '@total': total });
      count.replaceChildren(
        `${n} ${n === 1 ? Drupal.t('vehicle') : Drupal.t('vehicles')} `,
        of,
      );
      empty.hidden = n > 0;
      cardsRegion.hidden = n === 0;

      const active = [];
      if (s) {
        active.push([`“${search.value.trim()}”`, () => { search.value = ''; }]);
      }
      if (type) {
        active.push([typePlural(type), () => setType('')]);
      }
      if (make.value) {
        active.push([make.value, () => { make.value = ''; }]);
      }
      if (ranges.price.value !== defaults.price) {
        active.push([Drupal.t('Under @price', { '@price': money(maxPrice) }), () => { ranges.price.value = defaults.price; }]);
      }
      if (ranges.year.value !== defaults.year) {
        active.push([Drupal.t('@year or newer', { '@year': minYear }), () => { ranges.year.value = defaults.year; }]);
      }
      if (ranges.miles.value !== defaults.miles) {
        active.push([Drupal.t('Under @miles', { '@miles': miles(maxMiles) }), () => { ranges.miles.value = defaults.miles; }]);
      }
      chips.replaceChildren(
        ...active.map(([label, clear]) => chip(label, () => { clear(); apply(); })),
      );
      if (active.length > 1) {
        chips.append(chip(Drupal.t('Clear all'), reset, 'wb-clear-all'));
      }
    }

    function reset() {
      search.value = '';
      make.value = '';
      sort.value = 'featured';
      Object.keys(ranges).forEach((key) => {
        ranges[key].value = defaults[key];
      });
      setType('');
      apply();
    }

    let lastTrigger = null;
    const fill = (key, text) => {
      dialog.querySelector(`[data-wb-d="${key}"]`).textContent = text;
    };

    function setVehicleParam(stock) {
      const url = new URL(window.location.href);
      if (stock) {
        url.searchParams.set('vehicle', String(stock));
      }
      else {
        url.searchParams.delete('vehicle');
      }
      window.history.replaceState(null, '', url);
    }

    function openDetail(stock, trigger) {
      const v = vehicles.find((x) => x.stock === stock);
      if (!v) {
        return;
      }
      lastTrigger = trigger || null;
      const name = `${v.year} ${v.make} ${v.model}`;
      const photo = v.card.querySelector('img');
      const img = dialog.querySelector('[data-wb-d="img"]');
      if (photo) {
        img.src = photo.currentSrc || photo.src;
        img.alt = photo.alt;
      }
      fill('kicker', `${v.type.toUpperCase()} · ${Drupal.t('STOCK')} #${String(v.stock).padStart(3, '0')}`);
      fill('name', name);
      fill('price', money(v.price));
      fill('miles', miles(v.miles));
      fill('year', String(v.year));
      fill('type', v.type);
      fill('color', v.color);
      fill('make', v.make);
      fill('condition', v.condition);
      dialog.querySelector('[data-wb-d="pending"]').hidden = !v.pending;
      const ask = dialog.querySelector('[data-wb-d="ask"]');
      const askUrl = new URL(ask.href, window.location.href);
      askUrl.search = '';
      askUrl.searchParams.set('vehicle', String(v.stock));
      ask.href = askUrl.pathname + askUrl.search;
      if (!dialog.open) {
        dialog.showModal();
      }
      dialog.querySelector('[data-wb-close]').focus();
      setVehicleParam(v.stock);
    }

    dialog.addEventListener('close', () => {
      setVehicleParam(null);
      if (lastTrigger) {
        lastTrigger.focus();
      }
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog || event.target.closest('[data-wb-close]')) {
        dialog.close();
      }
    });
    grid.addEventListener('click', (event) => {
      const link = event.target.closest('[data-wb-details]');
      const card = link && link.closest('[data-wb-vehicle]');
      if (card) {
        event.preventDefault();
        openDetail(Number(card.dataset.stock), link);
      }
    });
    typeGroup.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-type]');
      if (button) {
        setType(button.dataset.type);
        apply();
      }
    });
    [search, ranges.price, ranges.year, ranges.miles].forEach((el) => {
      el.addEventListener('input', apply);
    });
    [make, sort].forEach((el) => el.addEventListener('change', apply));
    root.querySelectorAll('[data-wb-reset]').forEach((button) => {
      button.addEventListener('click', reset);
    });
    toggle.addEventListener('click', () => {
      const open = !filters.classList.contains('is-open');
      filters.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? Drupal.t('Hide filters') : Drupal.t('Filters');
    });

    const params = new URLSearchParams(window.location.search);
    const requested = params.get('type');
    setType(typeButtons.some((b) => b.dataset.type === requested && requested) ? requested : '');
    apply();
    const stock = Number(params.get('vehicle'));
    if (stock) {
      openDetail(stock, null);
    }
  }

  Drupal.behaviors.wildbillsInventory = {
    attach(context) {
      once('wb-inventory', '[data-wb-inventory]', context).forEach(init);
    },
  };
})(Drupal, once);
