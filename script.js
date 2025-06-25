// Global variables
let programsData = {};
let currentPrograms = [];

// JSON files list - add new files here when you create more cheat sheets
const jsonFiles = ['vscode.json', 'capcut.json', 'canva.json'];

// Load all JSON files from json/ folder
async function loadAllPrograms() {
    try {
        const loadPromises = jsonFiles.map(async (filename) => {
            try {
                const response = await fetch(`json/${filename}`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${filename}: ${response.status}`);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(`Error loading ${filename}:`, error);
                return null;
            }
        });

        const results = await Promise.all(loadPromises);
        
        // Filter out failed loads and build programsData object
        results.forEach(program => {
            if (program && program.id) {
                programsData[program.id] = program;
            }
        });

        currentPrograms = Object.keys(programsData);
        
        if (currentPrograms.length === 0) {
            throw new Error('No programs loaded successfully');
        }

        console.log(`Successfully loaded ${currentPrograms.length} programs:`, currentPrograms);
        
    } catch (error) {
        console.error('Error loading programs:', error);
        showError('ไม่สามารถโหลดข้อมูลโปรแกรมได้ กรุณาตรวจสอบไฟล์ JSON');
    }
}

// Show error message
function showError(message) {
    const gallery = document.getElementById('programGallery');
    gallery.innerHTML = `
        <div class="error-message">
            <div class="error-icon">⚠️</div>
            <h3>เกิดข้อผิดพลาด</h3>
            <p>${message}</p>
        </div>
    `;
}

// Initialize the app
async function init() {
    showLoading();
    await loadAllPrograms();
    hideLoading();
    renderGallery();
    setupSearch();
}

// Show loading indicator
function showLoading() {
    const gallery = document.getElementById('programGallery');
    gallery.innerHTML = `
        <div class="loading-message">
            <div class="loading-spinner">🔄</div>
            <p>กำลังโหลดข้อมูล...</p>
        </div>
    `;
}

// Hide loading indicator
function hideLoading() {
    // Loading will be replaced by renderGallery()
}

// Render program gallery
function renderGallery() {
    const gallery = document.getElementById('programGallery');
    gallery.innerHTML = '';

    if (currentPrograms.length === 0) {
        showError('ไม่พบข้อมูลโปรแกรมที่ตรงกับการค้นหา');
        return;
    }

    currentPrograms.forEach(programId => {
        const program = programsData[programId];
        if (!program) return;

        const totalShortcuts = Object.values(program.categories)
            .reduce((total, category) => total + category.length, 0);

        const card = document.createElement('div');
        card.className = 'program-card';
        card.onclick = () => showDetails(programId);
        
        card.innerHTML = `
            <div class="program-icon ${program.iconClass}">${program.icon}</div>
            <h3>${program.name}</h3>
            <p>${program.description}</p>
            <span class="shortcut-count">${totalShortcuts} shortcuts</span>
        `;
        
        gallery.appendChild(card);
    });
}

// Show program details
function showDetails(programId) {
    const program = programsData[programId];
    if (!program) {
        console.error(`Program ${programId} not found`);
        return;
    }

    const gallery = document.getElementById('programGallery');
    const detailView = document.getElementById('detailView');
    const searchContainer = document.querySelector('.search-container');

    // Hide gallery and search, show details
    gallery.style.display = 'none';
    searchContainer.style.display = 'none';
    detailView.style.display = 'block';

    // Update detail header
    document.getElementById('detailIcon').className = `detail-icon ${program.iconClass}`;
    document.getElementById('detailIcon').textContent = program.icon;
    document.getElementById('detailTitle').textContent = program.name;
    document.getElementById('detailDesc').textContent = program.description;

    // Generate shortcuts
    const shortcutsGrid = document.getElementById('shortcutsGrid');
    shortcutsGrid.innerHTML = '';

    Object.entries(program.categories).forEach(([categoryName, shortcuts]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'shortcut-category';
        
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = categoryName;
        categoryDiv.appendChild(categoryTitle);

        shortcuts.forEach(shortcut => {
            const shortcutItem = document.createElement('div');
            shortcutItem.className = 'shortcut-item';
            
            const keysHtml = shortcut.keys.map(key => `<span>${key}</span>`).join('<span class="key-separator">+</span>');
            
            shortcutItem.innerHTML = `
                <div class="shortcut-desc">${shortcut.desc}</div>
                <div class="shortcut-keys">${keysHtml}</div>
            `;
            
            categoryDiv.appendChild(shortcutItem);
        });

        shortcutsGrid.appendChild(categoryDiv);
    });
}

// Show gallery
function showGallery() {
    const gallery = document.getElementById('programGallery');
    const detailView = document.getElementById('detailView');
    const searchContainer = document.querySelector('.search-container');

    gallery.style.display = 'grid';
    searchContainer.style.display = 'block';
    detailView.style.display = 'none';
}

// Setup search functionality
function setupSearch() {
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            currentPrograms = Object.keys(programsData);
        } else {
            currentPrograms = Object.keys(programsData).filter(programId => {
                const program = programsData[programId];
                return program.name.toLowerCase().includes(searchTerm) ||
                       program.description.toLowerCase().includes(searchTerm);
            });
        }
        
        renderGallery();
    });
}

// Auto-reload functionality (optional - for development)
function enableAutoReload() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setInterval(async () => {
            try {
                const response = await fetch('json/');
                // This is just a simple check - you might want to implement
                // more sophisticated change detection
            } catch (error) {
                // Ignore errors in auto-reload
            }
        }, 5000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    init();
    enableAutoReload();
});