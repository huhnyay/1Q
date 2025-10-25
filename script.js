// Tangerine – zentrales JS
document.addEventListener('DOMContentLoaded', () => {
    // Jahr im Footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // BLOG (lou.html): Modal aus Karte füllen
    const readModal = document.getElementById('readModal');
    if (readModal) {
        readModal.addEventListener('show.bs.modal', (event) => {
            const btn  = event.relatedTarget;
            const card = btn?.closest('.card');
            if (!card) return;

            const title = card.querySelector('.card-title')?.textContent || 'Ohne Titel';
            const text  = card.querySelector('.card-text')?.textContent  || '';
            const imgEl = card.querySelector('img');

            const modalTitle = document.getElementById('modalTitle');
            const modalText  = document.getElementById('modalText');
            const modalImg   = document.getElementById('modalImg');

            if (modalTitle) modalTitle.textContent = title;
            if (modalText)  modalText.textContent  = text;

            if (modalImg && imgEl?.src) {
                modalImg.src = imgEl.src;
                modalImg.classList.remove('d-none');
                modalImg.onerror = () => modalImg.classList.add('d-none');
            } else if (modalImg) {
                modalImg.classList.add('d-none');
            }
        });
    }

    // KONTAKT (contact.html): Formular validieren
    const form = document.getElementById('contactForm');
    const alertBox = document.getElementById('contactAlert');
    if (form && alertBox) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name  = document.getElementById('name');
            const email = document.getElementById('email');
            const msg   = document.getElementById('message');
            const agree = document.getElementById('agree');
            const errors = [];

            if (!name.value.trim())  errors.push('Bitte Namen eingeben.');
            if (!email.value.trim()) errors.push('Bitte E-Mail eingeben.');
            if (!msg.value.trim())   errors.push('Bitte eine Nachricht schreiben.');

            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
            if (email.value && !emailOk) errors.push('Die E-Mail-Adresse ist ungültig.');

            const len = msg.value.trim().length;
            if (len > 0 && len < 10) errors.push('Die Nachricht sollte mindestens 10 Zeichen haben.');

            if (!agree.checked) errors.push('Bitte die Hinweise bestätigen.');

            if (errors.length) {
                alertBox.className = 'alert alert-danger';
                alertBox.innerHTML = '<strong>Bitte prüfen:</strong><br>' + errors.join('<br>');
                alertBox.classList.remove('d-none');
                return;
            }

            alertBox.className = 'alert alert-success';
            alertBox.textContent = 'Danke! Deine Nachricht wurde (prototypisch) übermittelt.';
            alertBox.classList.remove('d-none');
            form.reset();
        });
    }
});
