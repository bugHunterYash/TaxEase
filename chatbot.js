document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const chatContainer = document.getElementById('chat-container');
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatLog = document.getElementById('chat-log');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');

    // --- GST Knowledge Base ---
    const gstKnowledgeBase = {
        'default': "I'm sorry, I can't find information on that. I can explain terms like GST, CGST, SGST, IGST, GSTIN, Input Tax Credit (ITC), HSN Code, SAC Code, E-way Bill, and GST Return.",
        'greeting': "Hello! I'm the TaxEase assistant. How can I help you with GST today? You can ask me about terms like 'CGST', 'ITC', 'HSN Code', etc.",
        'gst': "Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services. It's a comprehensive, multi-stage, destination-based tax that has replaced many indirect taxes in India.",
        'cgst': "Central Goods and Services Tax (CGST) is the tax collected by the Central Government on an intra-state sale (e.g., a transaction happening within Maharashtra).",
        'sgst': "State Goods and Services Tax (SGST) is the tax collected by the State Government on an intra-state sale. It's charged along with CGST.",
        'igst': "Integrated Goods and Services Tax (IGST) is a tax levied on all inter-state supplies of goods and/or services. It is collected by the Central Government and is also applicable on imports.",
        'utgst': "Union Territory Goods and Services Tax (UTGST) is the tax collected on the supply of goods and services in Union Territories of India. It's the equivalent of SGST for Union Territories.",
        'gstin': "GST Identification Number (GSTIN) is a unique 15-digit identification number assigned to every taxpayer registered under GST. It's based on the taxpayer's PAN.",
        'itc': "Input Tax Credit (ITC) means that at the time of paying tax on output, you can reduce the tax you have already paid on inputs. It prevents the 'tax on tax' or cascading effect of taxes.",
        'hsn': "The Harmonized System of Nomenclature (HSN) is an internationally recognized product coding system used to classify goods for taxation purposes. Businesses must mention the HSN code on their invoices.",
        'sac': "Services Accounting Code (SAC) is similar to the HSN code but is used for classifying services instead of goods under the GST regime.",
        'eway': "An E-way bill is a document required for the movement of goods worth more than ₹50,000 from one place to another. It is generated electronically on the GST portal.",
        'return': "A GST return is a document containing details of all income/sales and/or expense/purchase which a taxpayer is required to file with the tax administrative authorities on a regular basis."
    };

    // --- Chat Functions ---

    // Toggles the chat window's visibility
    const toggleChat = () => {
        chatContainer.classList.toggle('active');
        chatToggleBtn.classList.toggle('active');
        if (chatContainer.classList.contains('active')) {
            addMessage('bot', gstKnowledgeBase.greeting);
        }
    };

    // Adds a message to the chat log
    const addMessage = (sender, text) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.innerHTML = `<p>${text}</p>`;
        chatLog.appendChild(messageElement);
        // Scroll to the latest message
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    // Finds a response from the knowledge base
    const getBotResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();

        if (lowerCaseInput.includes('gstin') || lowerCaseInput.includes('identification number')) return gstKnowledgeBase.gstin;
        if (lowerCaseInput.includes('cgst')) return gstKnowledgeBase.cgst;
        if (lowerCaseInput.includes('sgst')) return gstKnowledgeBase.sgst;
        if (lowerCaseInput.includes('igst')) return gstKnowledgeBase.igst;
        if (lowerCaseInput.includes('utgst')) return gstKnowledgeBase.utgst;
        if (lowerCaseInput.includes('itc') || lowerCaseInput.includes('input tax credit')) return gstKnowledgeBase.itc;
        if (lowerCaseInput.includes('hsn')) return gstKnowledgeBase.hsn;
        if (lowerCaseInput.includes('sac')) return gstKnowledgeBase.sac;
        if (lowerCaseInput.includes('eway') || lowerCaseInput.includes('e-way')) return gstKnowledgeBase.eway;
        if (lowerCaseInput.includes('return')) return gstKnowledgeBase.return;
        if (lowerCaseInput.includes('gst') || lowerCaseInput.includes('goods and services')) return gstKnowledgeBase.gst;
        if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) return gstKnowledgeBase.greeting;
        
        return gstKnowledgeBase.default;
    };

    // Handles sending a message
    const handleSendMessage = () => {
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        addMessage('user', userInput);
        chatInput.value = '';

        // Simulate bot thinking time
        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            addMessage('bot', botResponse);
        }, 500);
    };


    // --- Event Listeners ---
    chatToggleBtn.addEventListener('click', toggleChat);
    closeChatBtn.addEventListener('click', toggleChat);
    chatSendBtn.addEventListener('click', handleSendMessage);

    // Allow sending message with 'Enter' key
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });
});