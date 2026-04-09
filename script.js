// ADD NEW WORK HERE
const logs = [
    {
        date: "April 09, 2026",
        title: "Implemented Devlog System",
        tasks: [
            "Created JSON-based dynamic rendering logic",
            "Designed premium dark-mode UI",
            "Optimized for mobile responsiveness"
        ]
    },
    {
        date: "April 08, 2026",
        title: "Project Initialization",
        tasks: [
            "Set up repository structure",
            "Defined core features and tech stack"
        ]
    }
];

function renderLogs() {
    const container = document.getElementById('log-container');
    
    logs.forEach(log => {
        const entry = document.createElement('article');
        entry.className = 'log-entry';
        
        const tasksHtml = log.tasks.map(t => `<li>${t}</li>`).join('');
        
        entry.innerHTML = `
            <span class="date">${log.date}</span>
            <h2>${log.title}</h2>
            <ul>${tasksHtml}</ul>
        `;
        
        container.appendChild(entry);
    });
}

document.addEventListener('DOMContentLoaded', renderLogs);
