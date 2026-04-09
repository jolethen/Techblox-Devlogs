async function loadLogs() {
    const container = document.getElementById('log-container');
    
    try {
        // Fetch the text file
        const response = await fetch('logs.txt');
        const data = await response.text();
        
        // Split text into lines and filter out empty ones
        const lines = data.split('\n').filter(line => line.trim() !== '');

        lines.forEach((line, index) => {
            // Split line by the pipe symbol "|"
            const [date, title, tasksString] = line.split('|');
            
            if (!date || !title) return; // Skip malformed lines

            // Convert comma-separated tasks into an array
            const tasks = tasksString.split(',').map(t => t.trim());

            const entry = document.createElement('article');
            entry.className = 'log-entry';
            entry.style.animationDelay = `${index * 0.15}s`;

            const tasksHtml = tasks.map(t => `<li>${t}</li>`).join('');

            entry.innerHTML = `
                <div class="entry-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="date">[TIMESTAMP: ${date.trim()}]</span>
                    <span style="font-size: 0.7rem; color: var(--muted); opacity: 0.6;">
                        ${tasks.length} SUB-ROUTINES
                    </span>
                </div>
                <h2>${title.trim()}</h2>
                <ul>${tasksHtml}</ul>
            `;

            container.appendChild(entry);
        });

    } catch (error) {
        console.error("Error loading logs:", error);
        container.innerHTML = `<p style="color:red;">Error loading transmission from Everld...</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadLogs);
