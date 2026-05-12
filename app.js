document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const subjectInput = document.getElementById('subjectInput');
    const styleSelect = document.getElementById('styleSelect');
    const lightingSelect = document.getElementById('lightingSelect');
    const cameraSelect = document.getElementById('cameraSelect');
    const outputArea = document.getElementById('outputArea');
    const copyBtn = document.getElementById('copyBtn');
    const copyNegBtn = document.getElementById('copyNegBtn');
    const negativePrompt = document.getElementById('negativePrompt');

    let isGenerating = false;
    let currentPrompt = '';

    // Advanced prompt modifiers to add flair
    const modifiers = [
        "highly detailed",
        "intricate details",
        "vivid colors",
        "masterpiece",
        "trending on artstation",
        "sharp focus",
        "stunning environment",
        "concept art"
    ];

    generateBtn.addEventListener('click', () => {
        if (isGenerating) return;

        const subject = subjectInput.value.trim();
        if (!subject) {
            subjectInput.style.borderColor = '#e07a5f';
            setTimeout(() => {
                subjectInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }, 1000);
            return;
        }

        isGenerating = true;
        generateBtn.innerHTML = '<span class="btn-text">Generating...</span><span class="btn-icon">✨</span>';
        copyBtn.disabled = true;

        // Construct the prompt
        const style = styleSelect.value;
        const lighting = lightingSelect.value;
        const camera = cameraSelect.value;
        
        // Pick 3 random modifiers
        const randomMods = [...modifiers].sort(() => 0.5 - Math.random()).slice(0, 3).join(', ');

        currentPrompt = `${subject}, ${style}, ${lighting}, ${camera}, ${randomMods}`;

        // Prepare output area
        outputArea.innerHTML = '';
        outputArea.style.color = 'var(--secondary)';
        
        // Typing effect
        typeWriter(currentPrompt, 0, () => {
            isGenerating = false;
            generateBtn.innerHTML = '<span class="btn-text">Generate Prompt</span><span class="btn-icon">🔮</span>';
            copyBtn.disabled = false;
            
            // Add a little glow effect when done
            outputArea.style.textShadow = '0 0 10px rgba(0, 245, 212, 0.5)';
            setTimeout(() => {
                outputArea.style.textShadow = 'none';
            }, 1000);
        });
    });

    function typeWriter(text, i, callback) {
        if (i < text.length) {
            // Remove existing cursor
            const cursor = document.querySelector('.typing-cursor');
            if (cursor) cursor.remove();

            // Append next character
            outputArea.innerHTML += text.charAt(i);
            
            // Re-append cursor
            outputArea.innerHTML += '<span class="typing-cursor"></span>';
            
            // Random delay for realistic typing speed (10ms to 40ms)
            const speed = Math.random() * 30 + 10;
            setTimeout(() => typeWriter(text, i + 1, callback), speed);
        } else {
            // Finished typing, keep cursor for a moment then remove
            setTimeout(() => {
                const cursor = document.querySelector('.typing-cursor');
                if (cursor) cursor.remove();
            }, 1000);
            if (callback) callback();
        }
    }

    // Copy functionalities
    copyBtn.addEventListener('click', () => {
        if (!currentPrompt) return;
        navigator.clipboard.writeText(currentPrompt).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span class="icon">✅</span> Copied!';
            copyBtn.style.background = 'rgba(0, 245, 212, 0.2)';
            copyBtn.style.borderColor = 'var(--secondary)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = 'rgba(255, 255, 255, 0.05)';
                copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        });
    });

    copyNegBtn.addEventListener('click', () => {
        const negText = negativePrompt.innerText;
        navigator.clipboard.writeText(negText).then(() => {
            const originalText = copyNegBtn.innerHTML;
            copyNegBtn.innerHTML = '<span class="icon">✅</span> Copied!';
            copyNegBtn.style.background = 'rgba(241, 91, 181, 0.2)';
            copyNegBtn.style.borderColor = 'var(--accent)';
            
            setTimeout(() => {
                copyNegBtn.innerHTML = originalText;
                copyNegBtn.style.background = 'rgba(255, 255, 255, 0.05)';
                copyNegBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        });
    });
});
