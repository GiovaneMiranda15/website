// Initialize Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements to animate
document.querySelectorAll('.glass-card, .section-title, .section-subtitle, .hero-text-wrapper > *').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});


// Form Submission Handling
const leadForm = document.getElementById('lead-form');
if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = leadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        // Estado de carregamento
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        const formData = new FormData(leadForm);
        
        try {
            // Aqui usamos o Formspree para envio direto por e-mail
            // IMPORTANTE: Troque 'seu_id_formspree' pelo ID que você ganha ao criar o formulário no formspree.io
            const response = await fetch('https://formspree.io/f/mgodderp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Sucesso
                submitBtn.innerText = 'Mensagem Enviada! 🎉';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                leadForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 5000);
            } else {
                throw new Error('Falha no envio');
            }
        } catch (error) {
            // Fallback para caso o ID não esteja configurado ou haja erro
            console.error('Erro:', error);
            submitBtn.innerText = 'Erro ao enviar. Tente novamente.';
            submitBtn.style.background = '#ef4444';
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Add CSS for reveal animation dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--bg-dark);
        padding: 2rem;
        border-bottom: 1px solid var(--glass-border);
    }
`;
document.head.appendChild(style);

// Mouse follow glow effect
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Magnetic Logo Effect
const logoCard = document.querySelector('.main-visual-card');
if (logoCard) {
    logoCard.addEventListener('mousemove', (e) => {
        const rect = logoCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        logoCard.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg) translateY(${-y / 20}px) translateX(${x / 20}px)`;
    });
    
    logoCard.addEventListener('mouseleave', () => {
        logoCard.style.transform = '';
    });
}

// Add extra styles for interactive elements
const extraStyle = document.createElement('style');
extraStyle.textContent = `
    .mouse-glow {
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        opacity: 0.3;
        filter: blur(40px);
    }
    .main-visual-card {
        transition: transform 0.1s ease-out;
        transform-style: preserve-3d;
    }
    .floating-logo {
        transform: translateZ(50px);
    }
`;
document.head.appendChild(extraStyle);


// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Funcionalidade de copiar e-mail ao clicar
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        // O mailto continua tentando abrir o app, mas também copiamos
        const email = "contato@gmtechlab.com.br";
        navigator.clipboard.writeText(email).then(() => {
            const originalText = emailLink.querySelector('span:last-child').innerText;
            emailLink.querySelector('span:last-child').innerText = "E-mail copiado!";
            
            setTimeout(() => {
                emailLink.querySelector('span:last-child').innerText = originalText;
            }, 2000);
        });
    });
}
