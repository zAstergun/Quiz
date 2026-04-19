/* ============================================
   Quiz Financeiro — Main JavaScript
   ============================================ */

// ---- STATE ----
let currentStep = 0;
const totalSteps = 16; // 0=welcome, 1-14=quiz, 15=loading, 16=results
const answers = {};
let isTransitioning = false;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateCounter();
    updateProgress();
    addRippleEffect();
});

// ---- PARTICLES ----
function createParticles() {
    const container = document.getElementById('bgParticles');
    const colors = ['#34d399', '#06b6d4', '#8b5cf6', '#fbbf24'];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 6 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

// ---- COUNTER ANIMATION ----
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString('pt-BR');
        }, 16);
    });
}

// ---- PROGRESS BAR ----
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressContainer = document.getElementById('progressContainer');

    // Hide progress on welcome and results
    if (currentStep === 0 || currentStep >= 15) {
        progressContainer.style.opacity = '0';
        progressContainer.style.pointerEvents = 'none';
    } else {
        progressContainer.style.opacity = '1';
        progressContainer.style.pointerEvents = 'auto';
    }

    // Calculate progress (steps 1-14)
    const progress = Math.min(((currentStep) / 14) * 100, 100);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}

// ---- STEP NAVIGATION ----
function nextStep() {
    if (isTransitioning) return;
    goToStep(currentStep + 1);
}

function goToStep(targetStep) {
    if (isTransitioning || targetStep === currentStep) return;
    isTransitioning = true;

    const currentEl = document.getElementById(`step-${currentStep}`);
    const targetEl = document.getElementById(`step-${targetStep}`);

    if (!targetEl) {
        isTransitioning = false;
        return;
    }

    // Exit animation
    currentEl.classList.remove('active');
    currentEl.classList.add('exiting');

    setTimeout(() => {
        currentEl.classList.remove('exiting');
        currentEl.style.display = 'none';

        // Enter
        currentStep = targetStep;
        updateProgress();
        targetEl.classList.add('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Special actions per step
        if (currentStep === 15) {
            runLoadingAnimation();
        }
        if (currentStep === 16) {
            launchConfetti();
            initScrollAnimations();
        }

        // Re-apply ripple effects to new buttons
        addRippleEffect();

        setTimeout(() => {
            isTransitioning = false;
        }, 100);
    }, 400);
}

// ---- SELECT AND ADVANCE (Single select cards/pills) ----
function selectAndAdvance(el) {
    if (isTransitioning) return;

    // Visual feedback
    const parent = el.closest('.options-grid, .options-list');
    parent.querySelectorAll('.option-card, .option-pill').forEach(opt => {
        opt.classList.remove('selected');
    });
    el.classList.add('selected');

    // Store answer
    const stepNum = el.closest('.step').dataset.step;
    answers[`step-${stepNum}`] = el.dataset.value;

    // Advance after brief delay for visual feedback
    setTimeout(() => {
        nextStep();
    }, 500);
}

// ---- MULTIPLE SELECT (Pills with continue button) ----
function toggleMulti(el) {
    el.classList.toggle('selected');

    // Show/hide continue button
    const step = el.closest('.step');
    const stepNum = step.dataset.step;
    const btn = document.getElementById(`btn-continue-${stepNum}`);
    const anySelected = step.querySelectorAll('.option-pill.selected').length > 0;

    if (btn) {
        if (anySelected) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    }

    // Store answers
    const selected = Array.from(step.querySelectorAll('.option-pill.selected'))
        .map(opt => opt.dataset.value);
    answers[`step-${stepNum}`] = selected;
}

// ---- STAR RATING ----
const starFeedbacks = {
    1: ['😰 Vamos resolver isso!', '😟 Entendo a dificuldade...', '💪 Você pode melhorar!', '📚 Hora de aprender!', '🎯 Vamos definir juntos!'],
    2: ['😔 Pode melhorar...', '😕 Normal, mas pode ser melhor', '💪 Vamos trabalhar nisso!', '📖 Em construção!', '🌱 Em desenvolvimento...'],
    3: ['😊 Na média!', '😐 Razoável', '⚡ Tem potencial!', '📊 Conhecimento intermediário', '🔄 Caminho certo!'],
    4: ['👍 Muito bom!', '😌 Controlável!', '🔥 Boa disciplina!', '📈 Bom nível!', '✨ Quase lá!'],
    5: ['🏆 Excelente!', '😎 Impressionante!', '💎 Disciplina top!', '🧠 Expert!', '🎯 Metas claras!'],
};

function rateStar(el, stepNum) {
    if (isTransitioning) return;

    const rating = parseInt(el.dataset.rating);
    const container = document.getElementById(`stars-${stepNum}`);
    const feedback = document.getElementById(`starFeedback-${stepNum}`);
    const allStars = container.querySelectorAll('.star');

    // Activate all stars up to and including the selected rating
    allStars.forEach((star, index) => {
        star.classList.remove('active');
    });

    // Staggered activation for visual impact
    allStars.forEach((star, index) => {
        if (index < rating) {
            setTimeout(() => {
                star.classList.add('active');
            }, index * 60);
        }
    });

    // Show feedback
    const stepIndex = stepNum - 10; // maps 10-14 to 0-4
    feedback.textContent = starFeedbacks[rating][stepIndex] || '';
    feedback.style.opacity = '1';

    // Store & advance
    answers[`step-${stepNum}`] = rating;

    setTimeout(() => {
        nextStep();
    }, 1000);
}

// ---- STAR HOVER PREVIEW ----
document.addEventListener('mouseover', (e) => {
    const star = e.target.closest('.star');
    if (!star) return;
    const container = star.closest('.stars-container');
    if (!container) return;
    const rating = parseInt(star.dataset.rating);
    container.querySelectorAll('.star').forEach((s, i) => {
        s.classList.toggle('hover-preview', i < rating);
    });
});

document.addEventListener('mouseout', (e) => {
    const star = e.target.closest('.star');
    if (!star) return;
    const container = star.closest('.stars-container');
    if (!container) return;
    container.querySelectorAll('.star').forEach(s => {
        s.classList.remove('hover-preview');
    });
});

// ---- LOADING ANIMATION ----
function runLoadingAnimation() {
    const steps = document.querySelectorAll('#loadingSteps .loading-step');

    steps.forEach((step, index) => {
        const delay = parseInt(step.dataset.delay);

        setTimeout(() => {
            step.classList.add('visible');
        }, delay);

        setTimeout(() => {
            step.classList.add('completed');
            step.querySelector('.loading-check').textContent = '✅';
        }, delay + 600);
    });

    // Go to results after loading
    setTimeout(() => {
        goToStep(16);
    }, 3800);
}

// ---- CONFETTI ----
function launchConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#34d399', '#06b6d4', '#8b5cf6', '#fbbf24', '#ef4444', '#ec4899'];

    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width = `${Math.random() * 10 + 5}px`;
        piece.style.height = `${Math.random() * 10 + 5}px`;
        piece.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
        piece.style.animationDelay = `${Math.random() * 0.5}s`;
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        container.appendChild(piece);
    }

    // Cleanup
    setTimeout(() => {
        container.innerHTML = '';
    }, 4000);
}

// ---- SCROLL ANIMATIONS ----
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ---- FAQ TOGGLE ----
function toggleFaq(item) {
    const wasOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('open'));
    // Toggle clicked
    if (!wasOpen) {
        item.classList.add('open');
    }
}

// ---- SCROLL TO OFFER ----
function scrollToOffer() {
    const section = document.getElementById('offerSection');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ---- PURCHASE HANDLER ----
function handlePurchase(plan) {
    // Placeholder — you'd replace this with your actual payment link
    const purchaseData = {
        plan: plan,
        answers: answers,
        timestamp: new Date().toISOString()
    };
    console.log('Purchase initiated:', purchaseData);

    // Visual feedback
    const btn = event.currentTarget;
    const originalText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = '⏳ Redirecionando...';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        // Reset (in production, user would be redirected)
        btn.querySelector('span').textContent = originalText;
        btn.style.pointerEvents = 'auto';
        alert('🚀 Aqui seria o redirecionamento para a página de pagamento!\n\nDados de checkout registrados no console.');
    }, 1500);
}

// ---- RIPPLE EFFECT ----
function addRippleEffect() {
    const interactiveEls = document.querySelectorAll('.option-card, .option-pill, .btn-primary, .btn-continue');

    interactiveEls.forEach(el => {
        // Avoid duplicates
        if (el.dataset.ripple) return;
        el.dataset.ripple = 'true';
        el.style.position = el.style.position || 'relative';
        el.style.overflow = 'hidden';

        el.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ---- KEYBOARD SUPPORT ----
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        // If a continue button is visible, click it
        const activeStep = document.querySelector('.step.active');
        if (activeStep) {
            const continueBtn = activeStep.querySelector('.btn-continue:not(.hidden), .btn-primary');
            if (continueBtn) {
                continueBtn.click();
            }
        }
    }
});
