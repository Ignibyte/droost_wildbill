/**
 * @file
 * The contact page's inquiry form, as the source's contact.ts does it: the
 * message count, the checks, and the email drafted for the visitor's own mail
 * app, with Copy, Edit and Remove.
 *
 * Nothing is sent to the site (Q4): submitting is always prevented, and the
 * draft leaves only through the mailto: link or the clipboard. The car asked
 * about, the topic and the filled-in message are already on the page, decided
 * by the server from the link. The sentences come from the page, translated.
 */
((Drupal, once) => {
  // The topics' values, as InquiryDetails::TOPICS has them.
  const GENERAL = 'General question';
  const VEHICLE = 'Specific vehicle';

  /**
   * Fills a sentence's @placeholders in one pass.
   */
  const fill = (sentence, values) =>
    sentence.replace(/@[a-z]+/g, (key) => (key in values ? values[key] : key));

  Drupal.behaviors.wildbillsInquiryForm = {
    attach(context) {
      once('wb-inquiry', '[data-wb-inquiry]', context).forEach((root) => {
        const text = root.dataset;
        const form = root.querySelector('[data-wb-form]');
        const handoff = root.querySelector('[data-wb-handoff]');
        const field = (name) => root.querySelector(`[data-wb-field="${name}"]`);
        const name = field('name');
        const email = field('email');
        const phone = field('phone');
        const topic = field('topic');
        const message = field('message');
        const count = root.querySelector('[data-wb-count]');
        const preview = root.querySelector('[data-wb-preview]');
        const status = root.querySelector('[data-wb-copy-status]');
        let box = root.querySelector('[data-wb-vehicle]');

        const updateCount = () => {
          count.textContent = fill(text.count, { '@count': String(message.value.length) });
        };
        message.addEventListener('input', updateCount);
        updateCount();

        const setErr = (el, msg) => {
          document.getElementById(el.getAttribute('aria-describedby')).textContent = msg;
          el.setAttribute('aria-invalid', msg ? 'true' : 'false');
          return !msg;
        };
        const validate = () => {
          const a = setErr(name, name.value.trim() ? '' : text.errName);
          let emailError = '';
          if (!email.value.trim()) {
            emailError = text.errEmail;
          }
          else if (!email.validity.valid) {
            emailError = text.errEmailInvalid;
          }
          const b = setErr(email, emailError);
          const c = setErr(message, message.value.trim() ? '' : text.errMessage);
          return a && b && c;
        };
        [name, email, message].forEach((el) => {
          el.addEventListener('input', () => {
            if (el.getAttribute('aria-invalid') === 'true') {
              validate();
            }
          });
        });

        if (box) {
          box.querySelector('[data-wb-remove]').addEventListener('click', () => {
            box.remove();
            box = null;
            if (topic.value === VEHICLE) {
              topic.value = GENERAL;
            }
            const url = new URL(window.location.href);
            url.searchParams.delete('vehicle');
            window.history.replaceState(null, '', url);
          });
        }

        form.addEventListener('submit', (event) => {
          event.preventDefault();
          if (!validate()) {
            form.querySelector('[aria-invalid="true"]').focus();
            return;
          }
          const car = box ? box.dataset : null;
          const subject = car
            ? fill(text.subjectVehicle, { '@name': car.name })
            : fill(text.subjectTopic, { '@topic': topic.value });
          const body = [
            message.value.trim(), '',
            '—',
            fill(text.lineName, { '@value': name.value.trim() }),
            fill(text.lineEmail, { '@value': email.value.trim() }),
            phone.value.trim() ? fill(text.linePhone, { '@value': phone.value.trim() }) : '',
            fill(text.lineTopic, { '@value': topic.value }),
            car ? fill(text.lineVehicle, { '@name': car.name, '@stock': car.stock, '@price': car.price }) : '',
            car ? fill(text.lineListing, { '@url': window.location.origin + car.listing }) : '',
          ].filter((line, i, lines) => line !== '' || lines[i - 1] !== '').join('\n').trim();

          root.querySelector('[data-wb-open]').href =
            `mailto:${text.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          preview.textContent = `${fill(text.to, { '@email': text.email })}\n${fill(text.subject, { '@subject': subject })}\n\n${body}`;
          status.textContent = '';
          form.hidden = true;
          handoff.hidden = false;
          handoff.focus();
        });

        const edit = root.querySelector('[data-wb-edit]');
        if (edit) {
          edit.addEventListener('click', () => {
            handoff.hidden = true;
            form.hidden = false;
            message.focus();
          });
        }

        const copy = root.querySelector('[data-wb-copy]');
        if (copy) {
          copy.addEventListener('click', async () => {
            try {
              await navigator.clipboard.writeText(preview.textContent);
              status.textContent = text.copied;
            }
            catch {
              const range = document.createRange();
              range.selectNodeContents(preview);
              const selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);
              status.textContent = text.copyFailed;
            }
          });
        }
      });
    },
  };
})(Drupal, once);
