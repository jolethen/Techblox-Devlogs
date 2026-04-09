/**
 * TECHBLOX DEVLOG DATA
 * Add new logs at the top of the array to appear first.
 */
const logs = [
    {
        date: "APRIL 09, 2026",
        title: "Everld Gateway Logic",
        tasks: [
            "Optimized Luanti server-side entity handling for Everld mobs",
            "Updated the Frozen Deity sign communication system",
            "Refined the 'Door of Everld' teleportation delay to reduce lag"
        ]
    },
    {
        date: "APRIL 08, 2026",
        title: "Lore System Architecture",
        tasks: [
            "Drafted the 12-month lore roadmap",
            "Finalized the 'Fake Gods' reveal timeline for Jan 2027",
            "Integrated GitHub Actions for the World Records leaderboard"
        ]
    },
    {
        date: "APRIL 07, 2026",
        title: "Interface & Aesthetics",
        tasks: [
            "Designed premium dark-mode UI for devlog site",
            "Added CSS keyframe animations for terminal-style entrance",
            "Implemented mobile-responsive media queries"
        ]
    }
];

/**
 * CORE RENDERING LOGIC
 */
function renderLogs() {
    const container = document.getElementById('log-container');
    
    // Clear container (in case of re-renders)
    container.innerHTML = '';

    logs.forEach((log, index) => {
        // Create the article element
        const entry = document.createElement('article');
        entry.className = 'log-entry';
        
        // Add staggered animation delay
        entry.style.animationDelay = `${index * 0.15}s`;
        
        // Map tasks to list items
        const tasksHtml = log.tasks.map(t => `<li>${t}</li>`).join('');
        
        // Build the HTML structure
        entry.innerHTML = `
            <div class="entry-header">
                <span class="date">[TIMESTAMP: ${log.date}]</span>
                <span class="sub-routine-count">${log.tasks.length} SUB-ROUTINES</span>
            </div>
            <h2>${log.title}</h2>
            <ul>${tasksHtml}</ul>
        `;
        
        container.appendChild(entry);
    });
}

// Run the script when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderLogs);
