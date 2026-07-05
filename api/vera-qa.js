module.exports = async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: { code: 'method_not_allowed', message: 'Method Not Allowed' } });
    }

    const backendUrl = process.env.VERA_QA_BACKEND_URL;
    const sharedSecret = process.env.VERA_QA_SHARED_SECRET;

    if (!backendUrl || !sharedSecret) {
        console.error('Missing VERA_QA environment variables.');
        return res.status(500).json({ error: { code: 'internal_error', message: 'Something went wrong. Please try again.' } });
    }

    try {
        const body = req.body || {};
        const question = body.question;
        const history = Array.isArray(body.history) ? body.history : [];

        // 1. Validate question
        if (!question || typeof question !== 'string' || question.trim().length === 0 || question.length > 1000) {
            return res.status(400).json({ 
                error: { 
                    code: 'invalid_request', 
                    message: 'Question must be between 1 and 1000 characters.' 
                } 
            });
        }

        // 2. Setup 15-second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        // 3. Forward request to external RAG backend
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Vera-QA-Secret': sharedSecret
            },
            body: JSON.stringify({ question: question.trim(), history }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            console.error('Failed to parse backend response as JSON', parseError);
            return res.status(500).json({ error: { code: 'internal_error', message: 'Something went wrong. Please try again.' } });
        }

        // 4. Relay backend response
        return res.status(response.status).json(data);

    } catch (error) {
        console.error('Vera QA Proxy Error:', error);
        // Do not leak backend details on network failure/timeout
        return res.status(500).json({ 
            error: { 
                code: 'internal_error', 
                message: 'Something went wrong. Please try again.' 
            } 
        });
    }
};
