document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTop');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const sections = [...document.querySelectorAll('section[id]')];
    const sectionLinks = sections.map(section => ({
        section,
        link: document.querySelector(`.nav-menu a[href="#${section.id}"]`)
    }));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsCustomCursor = !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let scrollScheduled = false;

    const updateScrollUI = () => {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 50);
        backToTopBtn.classList.toggle('visible', scrollY > 400);

        sectionLinks.forEach(({ section, link }) => {
            if (!link) return;

            const sectionTop = section.offsetTop - 100;
            const isActive = scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight;
            link.classList.toggle('active', isActive);
        });

        scrollScheduled = false;
    };

    const handleScroll = () => {
        if (!scrollScheduled) {
            scrollScheduled = true;
            window.requestAnimationFrame(updateScrollUI);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollUI();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    const CONTACT_EMAIL = 'anupaminvent@gmail.com';
    const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const errorEls = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        message: document.getElementById('messageError')
    };
    const formFields = [nameInput, emailInput, messageInput];
    let isSubmitting = false;

    const setStatus = (text, type = '') => {
        formStatus.textContent = text;
        formStatus.classList.remove('success', 'error');
        if (type) formStatus.classList.add(type);
    };

    const setFieldError = (input, errorEl, message) => {
        errorEl.textContent = message;
        input.classList.toggle('is-invalid', Boolean(message));
        input.setAttribute('aria-invalid', Boolean(message) ? 'true' : 'false');
    };

    const clearErrors = () => {
        formFields.forEach(input => setFieldError(input, errorEls[input.id], ''));
    };

    const validateForm = () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        let firstInvalid = null;

        if (name.length < 2) {
            setFieldError(nameInput, errorEls.name, 'Please enter your full name.');
            firstInvalid = firstInvalid || nameInput;
        } else {
            setFieldError(nameInput, errorEls.name, '');
        }

        if (!EMAIL_REGEX.test(email)) {
            setFieldError(emailInput, errorEls.email, 'Please enter a valid email address.');
            firstInvalid = firstInvalid || emailInput;
        } else {
            setFieldError(emailInput, errorEls.email, '');
        }

        if (message.length < 10) {
            setFieldError(messageInput, errorEls.message, 'Please enter a message of at least 10 characters.');
            firstInvalid = firstInvalid || messageInput;
        } else {
            setFieldError(messageInput, errorEls.message, '');
        }

        return firstInvalid;
    };

    const openMailClient = () => {
        const senderName = nameInput.value.trim();
        const senderEmail = emailInput.value.trim();
        const message = messageInput.value.trim();
        const subject = `Portfolio enquiry from ${senderName}`;
        const body = `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`;

        setStatus('Opening your email app… If it didn\u2019t open, email anupaminvent@gmail.com directly.', 'error');
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    formFields.forEach(input => {
        input.addEventListener('input', () => {
            setFieldError(input, errorEls[input.id], '');
            formStatus.textContent = '';
            formStatus.classList.remove('success', 'error');
        });
    });

    contactForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (isSubmitting) return;

        const honeypot = contactForm.querySelector('input[name="_honey"]');
        if (honeypot && honeypot.value.trim() !== '') {
            setStatus('Thanks! Your message was sent successfully.', 'success');
            contactForm.reset();
            return;
        }

        const firstInvalid = validateForm();
        if (firstInvalid) {
            setStatus('Please fix the highlighted fields and try again.', 'error');
            firstInvalid.focus();
            return;
        }

        isSubmitting = true;
        const submitBtn = document.getElementById('submitBtn');
        const originalLabel = submitBtn.textContent;
        const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            _subject: `Portfolio enquiry from ${nameInput.value.trim()}`,
            _template: 'table',
            _captcha: 'false'
        };

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
        contactForm.setAttribute('aria-busy', 'true');
        setStatus('Sending your message…');

        let sent = false;
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            clearTimeout(timeout);
            sent = response.ok;
            if (sent) {
                try {
                    const data = await response.json();
                    if (data && String(data.success) === 'false') sent = false;
                } catch (err) {
                    sent = true;
                }
            }
        } catch (err) {
            sent = false;
        }

        if (sent) {
            clearErrors();
            contactForm.reset();
            setStatus('Thanks! Your message was sent successfully.', 'success');
        } else {
            openMailClient();
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        contactForm.removeAttribute('aria-busy');
        isSubmitting = false;
    });

    if (supportsCustomCursor) {
        const cursorDot = document.createElement('span');
        const cursorRing = document.createElement('span');
        cursorDot.className = 'cursor-dot';
        cursorRing.className = 'cursor-ring';
        document.body.append(cursorDot, cursorRing);
        document.body.classList.add('has-custom-cursor');

        let dotX = 0;
        let dotY = 0;
        let ringX = 0;
        let ringY = 0;
        let isCursorVisible = false;
        let cursorFrame;

        const renderCursor = () => {
            ringX += (dotX - ringX) * 0.18;
            ringY += (dotY - ringY) * 0.18;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            cursorFrame = window.requestAnimationFrame(renderCursor);
        };

        window.addEventListener('pointermove', event => {
            dotX = event.clientX;
            dotY = event.clientY;
            if (!isCursorVisible) {
                ringX = dotX;
                ringY = dotY;
                cursorDot.classList.add('is-visible');
                cursorRing.classList.add('is-visible');
                isCursorVisible = true;
                cursorFrame = window.requestAnimationFrame(renderCursor);
            }
        }, { passive: true });

        document.addEventListener('pointerover', event => {
            cursorRing.classList.toggle('is-hovering', Boolean(event.target.closest('a, button, input, textarea')));
        });
        document.addEventListener('pointerleave', () => {
            cursorDot.classList.remove('is-visible');
            cursorRing.classList.remove('is-visible');
            isCursorVisible = false;
            window.cancelAnimationFrame(cursorFrame);
        });
    }

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    let revealArmed = false;

    if (revealElements.length > 0 && !reduceMotion && 'IntersectionObserver' in window) {
        try {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -50px 0px', threshold: 0.15 });

            revealElements.forEach(element => revealObserver.observe(element));
            document.documentElement.classList.add('reveal-active');
            revealArmed = true;
        } catch (err) {
            document.documentElement.classList.remove('reveal-active');
        }
    }

    if (!revealArmed) {
        revealElements.forEach(element => element.classList.add('is-visible'));
    }
});
