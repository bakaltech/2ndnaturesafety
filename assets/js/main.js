// ============================================
// MAIN.JS - Complete with Chatbot
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // ---------- Mobile Menu ----------
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const header = document.getElementById('main-header');
  const yearSpan = document.getElementById('current-year');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      // Change icon between menu/x
      const icon = menuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('hidden')) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      }
    });

    // Close menu when a link is clicked
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('svg');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      });
    });
  }

  // ---------- Sticky Header ----------
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---------- Update Copyright Year ----------
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ---------- Chatbot ----------
  (function() {
    // FAQ data (matches React component)
    const faqs = [
      {
        question: "What training courses do you offer?",
        answer: () => {
          const link = `<a href="services.html" style="color:#1E3A8A; font-weight:600; text-decoration:underline;">View all services</a>`;
          return `We offer CPO-Approved Working at Heights, Confined Space, Forklift, MEWP, and more. ${link}.`;
        }
      },
      {
        question: "Where are you located?",
        answer: "We are located in Ottawa, but we proudly serve the entire province of Ontario. We can provide training at our facility or come directly to your site, field, or office!"
      },
      {
        question: "How do I book a course?",
        answer: () => {
          const link = `<a href="booking.html" style="color:#1E3A8A; font-weight:600; text-decoration:underline;">Booking Page</a>`;
          return `You can book a course directly through our ${link} or by calling us at (613) 552-2460.`;
        }
      },
      {
        question: "Do you sell safety equipment?",
        answer: () => {
          const link = `<a href="contact.html" style="color:#1E3A8A; font-weight:600; text-decoration:underline;">Contact us</a>`;
          return `Yes! We have access to over 10,000 safety products and PPE. ${link} with your requirements for a quote.`;
        }
      }
    ];

    // State
    let isOpen = false;
    let messages = [
      {
        id: '1',
        sender: 'bot',
        text: "Hi there! 👋 I'm the Second Nature Safety assistant. How can I help you today?"
      }
    ];

    // DOM elements
    const toggleBtn = document.getElementById('chatbot-toggle');
    const container = document.getElementById('chatbot-container');
    const messagesContainer = document.getElementById('chatbot-messages');
    const faqsContainer = document.getElementById('chatbot-faqs');
    const closeBtn = document.getElementById('chatbot-close');

    // Exit if chatbot elements not found
    if (!toggleBtn || !container || !messagesContainer || !faqsContainer || !closeBtn) return;

    function renderMessages() {
      messagesContainer.innerHTML = messages.map(msg => {
        const isUser = msg.sender === 'user';
        return `
          <div class="message ${isUser ? 'user' : 'bot'}">
            <div class="message-bubble">${msg.text}</div>
          </div>
        `;
      }).join('');
      // Scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function renderFAQs() {
      faqsContainer.innerHTML = faqs.map((faq, idx) => `
        <button class="chatbot-faq-btn" data-index="${idx}">
          <span>${faq.question}</span>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      `).join('');

      // Attach event listeners to FAQ buttons
      document.querySelectorAll('.chatbot-faq-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.currentTarget.dataset.index;
          if (index !== undefined) handleFAQClick(parseInt(index));
        });
      });
    }

    function handleFAQClick(index) {
      const faq = faqs[index];
      if (!faq) return;

      // Add user question
      const userMsg = {
        id: Date.now().toString(),
        sender: 'user',
        text: faq.question
      };
      messages = [...messages, userMsg];
      renderMessages();

      // Simulate bot typing
      setTimeout(() => {
        const answer = typeof faq.answer === 'function' ? faq.answer() : faq.answer;
        const botMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: answer
        };
        messages = [...messages, botMsg];
        renderMessages();
      }, 600);
    }

    function openChat() {
      isOpen = true;
      toggleBtn.classList.add('hidden');
      container.classList.add('open');
      renderMessages();
      renderFAQs();
    }

    function closeChat() {
      isOpen = false;
      toggleBtn.classList.remove('hidden');
      container.classList.remove('open');
    }

    // Event listeners
    toggleBtn.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);

    // Ensure container is initially closed
    container.classList.remove('open');
    toggleBtn.classList.remove('hidden'); // Make sure it's visible
  })();

  // ---------- Carousel for About Page (if present) ----------
  if (document.getElementById('about-carousel')) {
    initCarousel();
  }
});

// Carousel function (separate)
function initCarousel() {
  const images = document.querySelectorAll('.carousel-image');
  const indicators = document.querySelectorAll('.carousel-indicator');
  if (!images.length) return;

  let currentIndex = 0;
  const total = images.length;

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    indicators.forEach((ind, i) => {
      if (i === index) {
        ind.classList.add('active');
        ind.style.backgroundColor = '#4CAF50';
        ind.style.width = '2rem';
      } else {
        ind.classList.remove('active');
        ind.style.backgroundColor = 'rgba(255,255,255,0.5)';
        ind.style.width = '0.5rem';
      }
    });
    currentIndex = index;
  }

  // Auto-advance every 5 seconds
  let interval = setInterval(() => {
    let next = (currentIndex + 1) % total;
    showSlide(next);
  }, 5000);

  // Click indicators
  indicators.forEach((ind, idx) => {
    ind.addEventListener('click', () => {
      clearInterval(interval);
      showSlide(idx);
      interval = setInterval(() => {
        let next = (currentIndex + 1) % total;
        showSlide(next);
      }, 5000);
    });
  });

  // Initialize first slide
  showSlide(0);
}