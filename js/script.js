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

    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const formData = new FormData(contactForm);
        const senderName = formData.get('name').trim();
        const senderEmail = formData.get('email').trim();
        const message = formData.get('message').trim();
        const subject = `Portfolio enquiry from ${senderName}`;
        const body = `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`;

        formStatus.textContent = 'Opening your email app…';
        window.location.href = `mailto:anupaminvent@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(element => element.classList.add('is-visible'));
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.15 });

    revealElements.forEach(element => revealObserver.observe(element));
});
