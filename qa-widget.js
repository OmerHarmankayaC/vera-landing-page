class VeraQAWidget {
    constructor() {
        this.history = [];
        this.isOpen = false;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.renderHTML();
        this.bindEvents();
    }

    renderHTML() {
        const container = document.createElement('div');
        container.className = 'vera-qa-widget-container';
        container.innerHTML = `
            <!-- Chat Window -->
            <div class="vera-qa-window" id="veraQaWindow">
                <div class="vera-qa-header">
                    <div>
                        <h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            Vera Assistant
                        </h3>
                        <p>Ask anything about Vera Finance</p>
                    </div>
                    <button class="vera-qa-close-mobile" id="veraQaCloseMobile">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="vera-qa-messages" id="veraQaMessages">
                    <div class="vera-qa-message assistant">
                        <div class="vera-qa-bubble">
                            Hi! I'm the Vera AI assistant. How can I help you today?
                        </div>
                    </div>
                </div>
                <div class="vera-qa-input-area">
                    <div class="vera-qa-input-wrapper">
                        <textarea 
                            id="veraQaInput" 
                            class="vera-qa-textarea" 
                            placeholder="Type your question..." 
                            rows="1"
                            maxlength="1000"
                        ></textarea>
                    </div>
                    <button class="vera-qa-send" id="veraQaSend" aria-label="Send message">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>

            <!-- Toggle Button -->
            <button class="vera-qa-button" id="veraQaToggle" aria-label="Toggle chat">
                <svg class="vera-qa-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <svg class="vera-qa-button-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        `;
        document.body.appendChild(container);

        this.elements = {
            window: document.getElementById('veraQaWindow'),
            toggleBtn: document.getElementById('veraQaToggle'),
            closeMobileBtn: document.getElementById('veraQaCloseMobile'),
            messagesArea: document.getElementById('veraQaMessages'),
            input: document.getElementById('veraQaInput'),
            sendBtn: document.getElementById('veraQaSend')
        };
    }

    bindEvents() {
        this.elements.toggleBtn.addEventListener('click', () => this.toggleWindow());
        this.elements.closeMobileBtn.addEventListener('click', () => this.toggleWindow());
        
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.elements.input.addEventListener('input', () => {
            this.elements.input.style.height = 'auto';
            this.elements.input.style.height = (this.elements.input.scrollHeight) + 'px';
            this.elements.sendBtn.disabled = this.elements.input.value.trim().length === 0;
        });
    }

    toggleWindow() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.elements.window.classList.add('open');
            this.elements.toggleBtn.classList.add('open');
            setTimeout(() => this.elements.input.focus(), 300);
        } else {
            this.elements.window.classList.remove('open');
            this.elements.toggleBtn.classList.remove('open');
        }
    }

    appendMessage(role, content, sources = []) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `vera-qa-message ${role}`;

        let sourcesHtml = '';
        if (sources && sources.length > 0) {
            sourcesHtml = `
                <div class="vera-qa-sources">
                    ${sources.map(s => `
                        <a href="${s.url || '#'}" target="_blank" rel="noopener noreferrer" class="vera-qa-source-link">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            ${this.escapeHtml(s.title)}
                        </a>
                    `).join('')}
                </div>
            `;
        }

        // Extremely simple markdown-like formatting for links/bold could go here, 
        // but for now we'll just safely inject text and preserve newlines.
        const safeContent = this.escapeHtml(content).replace(/\\n/g, '<br/>');

        messageDiv.innerHTML = `
            <div class="vera-qa-bubble">
                ${safeContent}
            </div>
            ${sourcesHtml}
        `;

        this.elements.messagesArea.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showLoading() {
        this.isLoading = true;
        this.elements.input.disabled = true;
        this.elements.sendBtn.disabled = true;

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'vera-qa-message assistant loading-indicator';
        loadingDiv.id = 'veraQaLoading';
        loadingDiv.innerHTML = `
            <div class="vera-qa-bubble vera-qa-typing">
                <div class="vera-qa-dot"></div>
                <div class="vera-qa-dot"></div>
                <div class="vera-qa-dot"></div>
            </div>
        `;
        this.elements.messagesArea.appendChild(loadingDiv);
        this.scrollToBottom();
    }

    hideLoading() {
        this.isLoading = false;
        this.elements.input.disabled = false;
        this.elements.sendBtn.disabled = false;
        const loadingDiv = document.getElementById('veraQaLoading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
        this.elements.input.focus();
    }

    scrollToBottom() {
        this.elements.messagesArea.scrollTo({
            top: this.elements.messagesArea.scrollHeight,
            behavior: 'smooth'
        });
    }

    async sendMessage() {
        if (this.isLoading) return;
        
        const question = this.elements.input.value.trim();
        if (!question) return;

        if (question.length > 1000) {
            alert('Question is too long (max 1000 characters).');
            return;
        }

        // Reset input
        this.elements.input.value = '';
        this.elements.input.style.height = 'auto';
        this.elements.sendBtn.disabled = true;

        // Add user message to UI and state
        this.appendMessage('user', question);
        
        // We only send empty history as per v1 spec, but we keep local history
        // If v2 requires history, we'd send \`this.history\` here instead of \`[]\`
        const payload = {
            question: question,
            history: [] // the spec says "v1 sends history: []"
        };

        this.history.push({ role: 'user', content: question });

        this.showLoading();

        try {
            const response = await fetch('/api/vera-qa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                // Do not surface raw error codes, show generic friendly message
                throw new Error(data?.error?.message || 'Something went wrong. Please try again.');
            }

            this.appendMessage('assistant', data.answer, data.sources);
            this.history.push({ 
                role: 'assistant', 
                content: data.answer, 
                sources: data.sources 
            });

        } catch (error) {
            this.appendMessage('assistant', error.message || 'Something went wrong. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }
}

// Initialize when DOM is ready
function initVeraQAWidget() {
    if (!document.querySelector('.vera-qa-widget-container')) {
        new VeraQAWidget();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVeraQAWidget);
} else {
    initVeraQAWidget();
}
