/**
 * @file
 * Marks today in the hours table and says whether the lot is open, as the
 * source's location.ts and openStatus() do, but on the dealership's clock.
 *
 * The page cache keeps the page for good, so neither is decided on the
 * server: this reads the weekday and time in the dealership's time zone
 * (data-timezone) when the page is opened. The times it prints and the
 * sentences it writes come from the page, translated; it formats nothing.
 */
((Drupal, once) => {
  const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const minutes = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  const fill = (sentence, values) =>
    Object.entries(values).reduce((text, [key, value]) => text.split(key).join(value), sentence);

  /**
   * The weekday (Sunday 0) and minutes past midnight in a time zone.
   */
  function clockIn(timezone, now) {
    const parts = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(now).forEach(({ type, value }) => { parts[type] = value; });
    return { day: WEEKDAYS[parts.weekday], minute: (Number(parts.hour) % 24) * 60 + Number(parts.minute) };
  }

  /**
   * The status: open now, or when the lot next opens.
   */
  function status(root, days, clock) {
    const today = days[clock.day];
    if (today.open && clock.minute >= minutes(today.open) && clock.minute < minutes(today.close)) {
      return { open: true, text: fill(root.dataset.openNow, { '@time': today.closeLabel }) };
    }
    if (today.open && clock.minute < minutes(today.open)) {
      return { open: false, text: fill(root.dataset.opensToday, { '@time': today.openLabel }) };
    }
    for (let i = 1; i <= 7; i++) {
      const next = days[(clock.day + i) % 7];
      if (next.open) {
        const sentence = i === 1 ? root.dataset.opensTomorrow : root.dataset.opensDay;
        return { open: false, text: fill(sentence, { '@day': next.label, '@time': next.openLabel }) };
      }
    }
    return { open: false, text: root.dataset.closed };
  }

  function init(root) {
    let clock;
    try {
      clock = clockIn(root.dataset.timezone, new Date());
    }
    catch (e) {
      // An unknown time zone: leave the status as it was rendered.
      return;
    }
    const days = {};
    root.querySelectorAll('li[data-weekday]').forEach((row) => {
      days[Number(row.dataset.weekday)] = {
        row,
        label: row.dataset.label,
        open: row.dataset.open || null,
        close: row.dataset.close || null,
        openLabel: row.dataset.openLabel,
        closeLabel: row.dataset.closeLabel,
      };
    });
    if (Object.keys(days).length !== 7 || clock.day === undefined) {
      return;
    }

    const today = days[clock.day];
    today.row.classList.add('is-today');
    today.row.setAttribute('aria-current', 'date');
    today.row.firstElementChild.textContent = fill(root.dataset.today, { '@day': today.label });

    const now = status(root, days, clock);
    root.querySelector('[data-wb-status]').textContent = now.text;
    root.querySelector('.wb-dot').classList.toggle('is-on', now.open);
  }

  Drupal.behaviors.wildbillsHours = {
    attach(context) {
      once('wb-hours', '[data-wb-hours]', context).forEach(init);
    },
  };
})(Drupal, once);
