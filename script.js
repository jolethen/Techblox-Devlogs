/**
 * TECHBLOX DYNAMIC LOG PARSER
 * This script fetches logs.txt and builds the UI.
 * Dev Note- Built on 9 Apr also added the workflow and stuff so that whenever i or any maintainer runs it, it'll update the git pages website
 */

async function initDevLog() {
    const container = document.getElementById('log-container');
    
    try {
        // 1. Fetch the raw text file
        const response = await fetch('logs.txt');
        
        if (!response.ok) {
            // Generic error message if file is missing
            throw new Error("System Link Failure: logs.txt not found.");
        }

        const rawData = await response.text();
        
        // 2. Split into individual days (lines)
        const lines = rawData.split('\n').filter(line => line.trim().length > 5);

        if (lines.length === 0) {
            container.innerHTML = `<p style="text-align:center; opacity:0.5;">[ NO LOG DATA FOUND ]</p>`;
            return;
        }

        // 3. Clear container and render each line
        container.innerHTML = ''; 

        lines.forEach((line, index) => {
            // Split by the Pipe symbol: Date | Title | Tasks
            const parts = line.split('|');
            
            if (parts.length < 3) return; 

            const logDate = parts[0].trim();
            const logTitle = parts[1].trim();
            const taskList = parts[2].split(',').map(t => t.trim());

            const entry = document.createElement('article');
            entry.className = 'log-entry';
            entry.style.animationDelay = `${index * 0.1}s`;

            const tasksHtml = taskList.map(task => `<li>${task}</li>`).join('');

            entry.innerHTML = `
                <div class="entry-header">
                    <span class="date">[TIMESTAMP: ${logDate}]</span>
                    <span class="sub-routine-count">${taskList.length} SUB-ROUTINES</span>
                </div>
                <h2>${logTitle}</h2>
                <ul>${tasksHtml}</ul>
            `;

            container.appendChild(entry);
        });

    } catch (err) {
        console.error("System Error:", err);
        container.innerHTML = `
            <div style="text-align:center; padding: 40px; border: 1px dashed #60a5fa; color: #60a5fa;">
                <p><strong>CONNECTION ERROR</strong></p>
                <p style="font-size:0.8rem; opacity:0.7;">Unable to retrieve devlog data. Check file status.</p>
            </div>
        `;
    }
}

// Fire the logic when the window loads
window.addEventListener('DOMContentLoaded', initDevLog);
