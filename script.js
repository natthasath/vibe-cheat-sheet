// JSON Data for shortcuts
const programsData = {
    "vscode": {
        "name": "Visual Studio Code",
        "description": "Code Editor ที่มีประสิทธิภาพสูง",
        "icon": "VS",
        "iconClass": "vscode-icon",
        "categories": {
            "ทั่วไป": [
                { "desc": "Command Palette", "keys": ["Ctrl", "Shift", "P"] },
                { "desc": "Quick Open File", "keys": ["Ctrl", "P"] },
                { "desc": "Settings", "keys": ["Ctrl", ","] },
                { "desc": "Toggle Terminal", "keys": ["Ctrl", "`"] },
                { "desc": "New File", "keys": ["Ctrl", "N"] }
            ],
            "การแก้ไข": [
                { "desc": "Copy Line", "keys": ["Ctrl", "C"] },
                { "desc": "Cut Line", "keys": ["Ctrl", "X"] },
                { "desc": "Duplicate Line", "keys": ["Shift", "Alt", "↓"] },
                { "desc": "Move Line Up", "keys": ["Alt", "↑"] },
                { "desc": "Move Line Down", "keys": ["Alt", "↓"] },
                { "desc": "Multi-cursor", "keys": ["Ctrl", "Alt", "↓"] }
            ],
            "การค้นหา": [
                { "desc": "Find", "keys": ["Ctrl", "F"] },
                { "desc": "Find and Replace", "keys": ["Ctrl", "H"] },
                { "desc": "Find in Files", "keys": ["Ctrl", "Shift", "F"] },
                { "desc": "Go to Line", "keys": ["Ctrl", "G"] }
            ],
            "Debugging": [
                { "desc": "Start Debugging", "keys": ["F5"] },
                { "desc": "Toggle Breakpoint", "keys": ["F9"] },
                { "desc": "Step Over", "keys": ["F10"] },
                { "desc": "Step Into", "keys": ["F11"] }
            ]
        }
    },
    "capcut": {
        "name": "CapCut",
        "description": "Video Editor สำหรับการตัดต่อวิดีโอ",
        "icon": "CC",
        "iconClass": "capcut-icon",
        "categories": {
            "การนำเข้าและส่งออก": [
                { "desc": "Import Media", "keys": ["Ctrl", "I"] },
                { "desc": "Export Video", "keys": ["Ctrl", "E"] },
                { "desc": "New Project", "keys": ["Ctrl", "N"] },
                { "desc": "Save Project", "keys": ["Ctrl", "S"] }
            ],
            "Timeline": [
                { "desc": "Play/Pause", "keys": ["Space"] },
                { "desc": "Split Clip", "keys": ["Ctrl", "B"] },
                { "desc": "Delete Selected", "keys": ["Delete"] },
                { "desc": "Undo", "keys": ["Ctrl", "Z"] },
                { "desc": "Redo", "keys": ["Ctrl", "Y"] }
            ],
            "การเล่น": [
                { "desc": "Go to Beginning", "keys": ["Home"] },
                { "desc": "Go to End", "keys": ["End"] },
                { "desc": "Previous Frame", "keys": ["←"] },
                { "desc": "Next Frame", "keys": ["→"] },
                { "desc": "Jump Back 10s", "keys": ["J"] },
                { "desc": "Jump Forward 10s", "keys": ["L"] }
            ],
            "เครื่องมือ": [
                { "desc": "Selection Tool", "keys": ["V"] },
                { "desc": "Cut Tool", "keys": ["C"] },
                { "desc": "Zoom In", "keys": ["Ctrl", "+"] },
                { "desc": "Zoom Out", "keys": ["Ctrl", "-"] },
                { "desc": "Fit to Screen", "keys": ["Ctrl", "0"] }
            ]
        }
    },
    "canva": {
        "name": "Canva",
        "description": "Graphic Design Platform สำหรับสร้างงานดิไซน์",
        "icon": "CV",
        "iconClass": "canva-icon",
        "categories": {
            "ทั่วไป": [
                { "desc": "Undo", "keys": ["Ctrl", "Z"] },
                { "desc": "Redo", "keys": ["Ctrl", "Y"] },
                { "desc": "Copy", "keys": ["Ctrl", "C"] },
                { "desc": "Paste", "keys": ["Ctrl", "V"] },
                { "desc": "Duplicate", "keys": ["Ctrl", "D"] }
            ],
            "การจัดการ Elements": [
                { "desc": "Group Elements", "keys": ["Ctrl", "G"] },
                { "desc": "Ungroup Elements", "keys": ["Ctrl", "Shift", "G"] },
                { "desc": "Bring Forward", "keys": ["Ctrl", "]"] },
                { "desc": "Send Backward", "keys": ["Ctrl", "["] },
                { "desc": "Bring to Front", "keys": ["Ctrl", "Shift", "]"] },
                { "desc": "Send to Back", "keys": ["Ctrl", "Shift", "["] }
            ],
            "ข้อความ": [
                { "desc": "Bold Text", "keys": ["Ctrl", "B"] },
                { "desc": "Italic Text", "keys": ["Ctrl", "I"] },
                { "desc": "Underline Text", "keys": ["Ctrl", "U"] },
                { "desc": "Increase Font Size", "keys": ["Ctrl", "Shift", ">"] },
                { "desc": "Decrease Font Size", "keys": ["Ctrl", "Shift", "<"] }
            ],
            "การแสดงผล": [
                { "desc": "Zoom In", "keys": ["Ctrl", "+"] },
                { "desc": "Zoom Out", "keys": ["Ctrl", "-"] },
                { "desc": "Fit to Screen", "keys": ["Ctrl", "0"] },
                { "desc": "Actual Size", "keys": ["Ctrl", "1"] },
                { "desc": "Present", "keys": ["Ctrl", "Enter"] }
            ]
        }
    }
};

// Global variables
let currentPrograms = Object.keys(programsData);

// Initialize the app
function init() {
    renderGallery();
    setupSearch();
}

// Render program gallery
function renderGallery() {
    const gallery = document.getElementById('programGallery');
    gallery.innerHTML = '';

    currentPrograms.forEach(programId => {
        const program = programsData[programId];
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
        const searchTerm = e.target.value.toLowerCase();
        
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);