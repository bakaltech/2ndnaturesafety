// ============================================
// CHATBOT.JS - Second Nature Safety Chatbot
// ============================================

(function() {
  // FAQ data
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

  let messages = [
    { id: '1', sender: 'bot', text: "Hi there! 👋 I'm the Second Nature Safety assistant. How can I help you today?" }
  ];

  const toggleBtn = document.getElementById('chatbot-toggle');
  const container = document.getElementById('chatbot-container');
  const messagesContainer = document.getElementById('chatbot-messages');
  const faqsContainer = document.getElementById('chatbot-faqs');
  const closeBtn = document.getElementById('chatbot-close');

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
    `).join('') + `
      <button class="chatbot-faq-btn talk-to-human" onclick="window.location.href='contact.html'">
        <span>👤 Talk to a human</span>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </button>
    `;

    document.querySelectorAll('.chatbot-faq-btn[data-index]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.currentTarget.dataset.index;
        if (index !== undefined) handleFAQClick(parseInt(index));
      });
    });
  }

  function showTyping() {
    const typingId = 'typing-' + Date.now();
    const typingMsg = { id: typingId, sender: 'bot', text: '<div class="typing-dots"><span></span><span></span><span></span></div>' };
    messages = [...messages, typingMsg];
    renderMessages();
    return typingId;
  }

  function removeTyping(typingId) {
    messages = messages.filter(m => m.id !== typingId);
  }

  function handleFAQClick(index) {
    const faq = faqs[index];
    if (!faq) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: faq.question };
    messages = [...messages, userMsg];
    renderMessages();

    const typingId = showTyping();

    setTimeout(() => {
      removeTyping(typingId);
      const answer = typeof faq.answer === 'function' ? faq.answer() : faq.answer;
      const botMsg = { id: (Date.now() + 1).toString(), sender: 'bot', text: answer };
      messages = [...messages, botMsg];
      renderMessages();
    }, 800);
  }

  function openChat() {
    container.classList.add('open');
    toggleBtn.classList.add('hidden');
    renderMessages();
    renderFAQs();
  }

  function closeChat() {
    container.classList.remove('open');
    toggleBtn.classList.remove('hidden');
  }

  toggleBtn.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);

  // Ensure container starts closed
  container.classList.remove('open');
  toggleBtn.classList.remove('hidden');
})();