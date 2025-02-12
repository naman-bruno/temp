(function () {
  const style = document.createElement('style');
  style.textContent = `
  .bruno-button {
      background-color: #F0AC53;
      color: white;
      font-weight: 600;
      padding: 0.5rem 1.5rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      border: 4px solid #FBEEDA;
      cursor: pointer;
    }
    .bruno-button span {
      margin-right: 0.5rem;
    }
    .bruno-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .bruno-modal-content {
      background-color: white;
      padding: 1.5rem 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 24rem;
      width: 100%;
      position: relative;
    }
    .bruno-logo {
      margin: 0 auto 1rem auto;
      width: 100px;
      height: 100px;
    }
    .bruno-modal-open-button {
      background-color: #F0AC53;
      color: white;
      font-size: 1.125rem;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      cursor: pointer;
      border: none;
      transition: background-color 0.3s ease;
    }
    .bruno-modal-open-button:hover {
      background-color: #e29948;
    }
    .bruno-modal-description {
      margin-top: 1rem;
      color: #4B5563;
      font-family: sans-serif;
    }
    .bruno-download-link {
      font-weight: bold;
      color: black;
      text-decoration: none;
    }
    .bruno-download-link:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  const faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
  document.head.appendChild(faLink);

  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.bruno-fetch-button');

    buttons.forEach((buttonWrapper) => {
      const button = document.createElement('button');
      button.className = 'bruno-button';
      button.innerHTML = `<span>Open In Bruno</span><i class="fas fa-arrow-right"></i>`;
      buttonWrapper.appendChild(button);

      button.addEventListener('click', () => {
        const collectionUrl = buttonWrapper.getAttribute(
          'data-bruno-collection-url'
        );
        showModal(collectionUrl);
      });
    });

    function showModal(collectionUrl) {
      const overlay = document.createElement('div');
      overlay.className = 'bruno-modal-overlay';

      const modalContent = document.createElement('div');
      modalContent.className = 'bruno-modal-content';

      const logo = document.createElement('img');
      logo.src = 'https://docs.usebruno.com/bruno.png';
      logo.alt =
        'Cute dog icon with a happy face and tongue sticking out';
      logo.className = 'bruno-logo';
      logo.width = 100;
      logo.height = 100;

      const openButton = document.createElement('button');
      openButton.className = 'bruno-modal-open-button';
      openButton.textContent = 'Open In Bruno';
      openButton.onclick = () => {
        const brunoUrl = `bruno://fetch?collectionUrl=${encodeURIComponent(
          collectionUrl
        )}`;
        window.location.href = brunoUrl;
        document.body.removeChild(overlay);
      };

      const description = document.createElement('p');
      description.className = 'bruno-modal-description';
      description.innerHTML = `Don't have the app yet? <a href="https://www.usebruno.com/downloads" class="bruno-download-link" target="_blank">Download Now</a>`;

      modalContent.appendChild(logo);
      modalContent.appendChild(openButton);
      modalContent.appendChild(description);

      overlay.appendChild(modalContent);

      document.body.appendChild(overlay);

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
    }
  });
})();