/**
 * TECHBLOX DYNAMIC LOG PARSER
 * This script fetches logs.txt and builds the UI.
 * Dev Note- Built on 9 Apr
 */

async function initDevLog() {
    const container = document.getElementById('log-container');
    
    try {
        // 1. Fetch the raw text file (Added timestamp to prevent old caching)
        const response = await fetch('logs.txt?v=' + new Date().getTime());
        
        if (!response.ok) {
            throw new Error("System Link Failure: logs.txt not found.");
        }

        const rawData = await response.text();
        
        // 2. Split into individual days (lines)
        const lines = rawData.split('\n').filter(line => line.trim().length > 5);

        if (lines.length === 0) {
            container.innerHTML = `<p style="text-align:center; opacity:0.5;">[ NO LOG DATA FOUND ]</p>`;
            return;
        }

        container.innerHTML = ''; 

        lines.forEach((line, index) => {
            const parts = line.split('|');
            
            // Flex-check: Works with 2 parts (Date | Title) or 3 parts (Date | Title | Tasks)
            if (parts.length < 2) return; 

            const logDate = parts[0].trim();
            const logTitle = parts[1].trim();
            
            // If there's no 3rd part (tasks), we'll just show the title as a task
            const rawTasks = parts[2] ? parts[2] : "Update logged.";
            const taskList = rawTasks.split(',').map(t => t.trim());

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
                <p style="font-size:0.8rem; opacity:0.7;">Unable to retrieve devlog data.</p>
            </div>
        `;
    }
}

window.addEventListener('DOMContentLoaded', initDevLog);
