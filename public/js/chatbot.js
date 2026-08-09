/* ===================================
   CHATBOT — UI Logic
   - Quick buttons → answers from CHATBOT_DATA
   - Typed questions → answers from Gemini API
   - Theme sync via existing #body.light-mode class
=================================== */

(function () {
  'use strict';

  // ─── DOM ELEMENTS ───
  const toggleBtn      = document.getElementById('chatbot-toggle');
  const chatWindow      = document.getElementById('chatbot-window');
  const closeBtn        = document.getElementById('chatbot-close');
  const messagesContainer = document.getElementById('chatbot-messages');
  const inputField      = document.getElementById('chatbot-input');
  const sendBtn         = document.getElementById('chatbot-send');
  const typingIndicator = document.getElementById('chatbot-typing');

  let isOpen      = false;
  let isFirstOpen = true;

  // ─── TOGGLE CHAT WINDOW ───
  function toggleChat() {
    isOpen = !isOpen;

    if (isOpen) {
      chatWindow.classList.add('open');
      toggleBtn.innerHTML = '<i class="fas fa-times"></i>';

      // Show greeting on first open
      if (isFirstOpen) {
        showGreeting();
        isFirstOpen = false;
      }

      // Focus input after animation
      setTimeout(function () { inputField.focus(); }, 350);
    } else {
      chatWindow.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
    }
  }

  toggleBtn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) toggleChat();
  });

  // ─── GREETING ───
  function showGreeting() {
    var greeting = CHATBOT_DATA.greeting;
    addBotMessage(greeting.text, greeting.buttons);
  }

  // Helper to disable/enable input controls
  function setInputsDisabled(disabled) {
    inputField.disabled = disabled;
    sendBtn.disabled = disabled;
    
    // Also disable/enable all existing quick buttons
    var allQuickBtns = messagesContainer.querySelectorAll('.chatbot-btn');
    allQuickBtns.forEach(function (btn) {
      btn.disabled = disabled;
      if (disabled) {
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
      } else {
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
      }
    });
  }

  // ─── ADD BOT MESSAGE WITH TYPEWRITER EFFECT ───
  function addBotMessage(text, buttons) {
    // Disable inputs during typing
    setInputsDisabled(true);

    var msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-msg bot';

    var textEl = document.createElement('div');
    textEl.className = 'msg-text';
    msgDiv.appendChild(textEl);
    messagesContainer.appendChild(msgDiv);

    var charIndex = 0;
    var speed = 10; // snappy typewriter speed (ms per char)

    function typeCharacter() {
      if (charIndex < text.length) {
        textEl.textContent += text.charAt(charIndex);
        charIndex++;
        scrollToBottom();
        setTimeout(typeCharacter, speed);
      } else {
        // Typing finished
        setInputsDisabled(false);

        // Append follow-up buttons if provided
        if (buttons && buttons.length > 0) {
          var btnContainer = document.createElement('div');
          btnContainer.className = 'chatbot-buttons';
          btnContainer.style.opacity = '0';
          btnContainer.style.transition = 'opacity 0.3s ease';

          buttons.forEach(function (btn) {
            var button = document.createElement('button');
            button.className = 'chatbot-btn';
            button.innerHTML = btn.label;
            button.addEventListener('click', function () {
              if (!inputField.disabled) {
                handleButtonClick(btn);
              }
            });
            btnContainer.appendChild(button);
          });

          msgDiv.appendChild(btnContainer);
          // Transition in buttons smoothly
          setTimeout(function () {
            btnContainer.style.opacity = '1';
            scrollToBottom();
          }, 50);
        }
        scrollToBottom();
      }
    }

    typeCharacter();
  }

  // ─── ADD USER MESSAGE ───
  function addUserMessage(text) {
    var msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-msg user';
    // Strip HTML tags if text contains icon tags
    var temp = document.createElement('div');
    temp.innerHTML = text;
    msgDiv.textContent = temp.textContent || temp.innerText || text;
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  // ─── HANDLE BUTTON CLICK (data file) ───
  function handleButtonClick(btn) {
    // Show what the user clicked
    addUserMessage(btn.label);

    if (btn.key === 'greeting') {
      // Show main menu again
      var greeting = CHATBOT_DATA.greeting;
      addBotMessage(greeting.text, greeting.buttons);
    } else {
      // Lookup in data file
      var response = CHATBOT_DATA.responses[btn.key];
      if (response) {
        addBotMessage(response.text, response.buttons);
      } else {
        addBotMessage("Sorry, I don't have that information yet.", [
          { label: "<i class='fas fa-home'></i> Main Menu", key: 'greeting' }
        ]);
      }
    }
  }

  // ─── HANDLE TYPED MESSAGE (Gemini API) ───
  async function handleUserMessage() {
    var message = inputField.value.trim();
    if (!message) return;

    addUserMessage(message);
    inputField.value = '';

    // Show typing indicator
    showTyping();

    try {
      var response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      });

      var data = await response.json();
      hideTyping();

      if (data.reply) {
        // Show API answer with follow-up buttons
        addBotMessage(data.reply, [
          { label: "<i class='fas fa-tools'></i> Technical Skills", key: 'skills' },
          { label: "<i class='fas fa-laptop-code'></i> Projects", key: 'projects' },
          { label: "<i class='fas fa-address-book'></i> Contact", key: 'contact' },
          { label: "<i class='fas fa-home'></i> Main Menu", key: 'greeting' }
        ]);
      } else {
        addBotMessage("Sorry, I couldn't get a response. Please try again!", [
          { label: "<i class='fas fa-home'></i> Main Menu", key: 'greeting' }
        ]);
      }
    } catch (err) {
      hideTyping();
      addBotMessage("Sorry, I'm having trouble connecting right now. Please try the buttons below!", [
        { label: "<i class='fas fa-home'></i> Main Menu", key: 'greeting' }
      ]);
    }
  }

  // ─── INPUT EVENT LISTENERS ───
  sendBtn.addEventListener('click', handleUserMessage);

  inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleUserMessage();
  });

  // ─── TYPING INDICATOR ───
  function showTyping() {
    typingIndicator.classList.add('show');
    scrollToBottom();
  }

  function hideTyping() {
    typingIndicator.classList.remove('show');
  }

  // ─── AUTO-SCROLL ───
  function scrollToBottom() {
    setTimeout(function () {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 60);
  }

  // ─── UNIFIED DRAG TO RESIZE LOGIC (Top Edge, Left Edge, Top-Left Corner) ───
  const handleTop = document.getElementById('chatbot-resize-top');
  const handleLeft = document.getElementById('chatbot-resize-left');
  const handleTopLeft = document.getElementById('chatbot-resize-topleft');
  
  if (handleTop && handleLeft && handleTopLeft) {
    let startX, startY, startWidth, startHeight, currentHandle;

    function initResize(e, handleType) {
      e.preventDefault();
      currentHandle = handleType;
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      startX = clientX;
      startY = clientY;
      
      startWidth = parseInt(document.defaultView.getComputedStyle(chatWindow).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(chatWindow).height, 10);
      
      if (e.touches) {
        document.documentElement.addEventListener('touchmove', doResize, { passive: false });
        document.documentElement.addEventListener('touchend', stopResize);
      } else {
        document.documentElement.addEventListener('mousemove', doResize);
        document.documentElement.addEventListener('mouseup', stopResize);
      }
    }

    function doResize(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const dx = clientX - startX;
      const dy = clientY - startY;

      if (currentHandle === 'left' || currentHandle === 'topleft') {
        const newWidth = startWidth - dx;
        if (newWidth >= 320 && newWidth <= window.innerWidth * 0.95) {
          chatWindow.style.width = newWidth + 'px';
        }
      }
      
      if (currentHandle === 'top' || currentHandle === 'topleft') {
        const newHeight = startHeight - dy;
        if (newHeight >= 350 && newHeight <= window.innerHeight * 0.9) {
          chatWindow.style.height = newHeight + 'px';
        }
      }
      
      scrollToBottom();
    }

    function stopResize() {
      document.documentElement.removeEventListener('mousemove', doResize);
      document.documentElement.removeEventListener('mouseup', stopResize);
      document.documentElement.removeEventListener('touchmove', doResize);
      document.documentElement.removeEventListener('touchend', stopResize);
    }

    // Attach mouse listeners
    handleTop.addEventListener('mousedown', (e) => initResize(e, 'top'));
    handleLeft.addEventListener('mousedown', (e) => initResize(e, 'left'));
    handleTopLeft.addEventListener('mousedown', (e) => initResize(e, 'topleft'));

    // Attach touch listeners
    handleTop.addEventListener('touchstart', (e) => initResize(e, 'top'), { passive: false });
    handleLeft.addEventListener('touchstart', (e) => initResize(e, 'left'), { passive: false });
    handleTopLeft.addEventListener('touchstart', (e) => initResize(e, 'topleft'), { passive: false });
  }

})();
