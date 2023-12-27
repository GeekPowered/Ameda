/**
 * Sets a cookie.
 * @param {string} name - Name for the cookie.
 * @param {string} value - Value for the cookie.
 * @param {number} days - Number of days until the cookie should expire.
 */
function setCookie(name, value, days) {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/; SameSite=None; Secure`;
}

/**
 * Gets value of a cookie (if it exists).
 * @param {string} name - Name of the cookie.
 * @returns {?string}
 */
function getCookie(name) {
  const cookieString = `; ${document.cookie}`;
  const cookies = cookieString.split(`; ${name}=`);

  if (cookies.length === 2) {
    return cookies.pop().split(';').shift();
  }

  return null;
}

/* global Modal */

if (!customElements.get('age-verification-pop-up')) {
  customElements.whenDefined('modal-dialog').then(() => {
    class AgeVerificationPopUp extends Modal {
      constructor() {
        super();
        this.cookie = `${this.id}-dismissed`;
        this.cancelButton = this.querySelector('.js-cancel-button');
        this.cancelMessage = this.querySelector('.js-cancel-message');

        this.cancelButton.addEventListener('click', this.handleCancelClick.bind(this));

        if (Shopify.designMode) {
          document.addEventListener('shopify:section:select', (evt) => {
            if (evt.target === this.closest('.shopify-section')) this.open();
          });

          document.addEventListener('shopify:section:deselect', this.close.bind(this));
        } else if (!getCookie(this.cookie)) {
          this.open();
        }
      }

      /**
       * Opens the modal.
       * @param {Element} opener - Modal opener element.
       */
      open(opener) {
        super.open(opener);
        this.removeEventListener('keyup', this.keyupHandler);
      }

      /**
       * Handle the cancel button click
       */
      handleCancelClick() {
        this.cancelMessage.removeAttribute('hidden');
      }

      /**
       * Handles 'click' events on the modal.
       * @param {object} evt - Event object.
       */
      handleClick(evt) {
        if (evt.target.matches('.js-close-modal')) {
          super.handleClick(evt);
          setCookie(this.cookie, true, 3650);
        }
      }
    }

    customElements.define('age-verification-pop-up', AgeVerificationPopUp);
  });
}
