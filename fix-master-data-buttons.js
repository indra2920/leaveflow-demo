// Fix Master Data Buttons Script
// This script fixes the non-clickable buttons issue

console.log('🔧 Fixing Master Data buttons...');

// Function to test button functionality
function testButtons() {
    console.log('🧪 Testing button functionality...');
    
    // Test if functions exist
    const functions = ['showRegionModal', 'showLocationModal', 'showPositionModal'];
    functions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
            console.log(`✅ ${funcName} exists`);
        } else {
            console.log(`❌ ${funcName} missing`);
        }
    });
    
    // Test if buttons exist
    const buttons = [
        'button[onclick="showRegionModal()"]',
        'button[onclick="showLocationModal()"]', 
        'button[onclick="showPositionModal()"]'
    ];
    
    buttons.forEach(selector => {
        const button = document.querySelector(selector);
        if (button) {
            console.log(`✅ Button found: ${selector}`);
            console.log(`   - Disabled: ${button.disabled}`);
            console.log(`   - Display: ${getComputedStyle(button).display}`);
            console.log(`   - Visibility: ${getComputedStyle(button).visibility}`);
        } else {
            console.log(`❌ Button not found: ${selector}`);
        }
    });
}

// Function to fix buttons by adding event listeners
function fixButtons() {
    console.log('🔧 Adding event listeners to buttons...');
    
    // Fix Region button
    const regionBtn = document.querySelector('button[onclick="showRegionModal()"]');
    if (regionBtn) {
        regionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🌍 Region button clicked');
            if (typeof showRegionModal === 'function') {
                showRegionModal();
            } else {
                console.error('showRegionModal function not found');
                alert('Error: showRegionModal function not found. Please check console.');
            }
        });
        console.log('✅ Region button fixed');
    }
    
    // Fix Location button
    const locationBtn = document.querySelector('button[onclick="showLocationModal()"]');
    if (locationBtn) {
        locationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📍 Location button clicked');
            if (typeof showLocationModal === 'function') {
                showLocationModal();
            } else {
                console.error('showLocationModal function not found');
                alert('Error: showLocationModal function not found. Please check console.');
            }
        });
        console.log('✅ Location button fixed');
    }
    
    // Fix Position button
    const positionBtn = document.querySelector('button[onclick="showPositionModal()"]');
    if (positionBtn) {
        positionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('👔 Position button clicked');
            if (typeof showPositionModal === 'function') {
                showPositionModal();
            } else {
                console.error('showPositionModal function not found');
                alert('Error: showPositionModal function not found. Please check console.');
            }
        });
        console.log('✅ Position button fixed');
    }
}

// Function to create fallback modal functions if missing
function createFallbackFunctions() {
    console.log('🔄 Creating fallback functions...');
    
    if (typeof window.showRegionModal !== 'function') {
        window.showRegionModal = function(id = null) {
            console.log('🌍 Fallback showRegionModal called');
            const modal = new bootstrap.Modal(document.getElementById('regionModal'));
            const title = document.getElementById('regionModalTitle');
            
            if (id) {
                title.textContent = 'Edit Wilayah Kerja';
                // Load region data if editing
                if (window.masterDataManager) {
                    const region = masterDataManager.getRegions().find(r => r.id === id);
                    if (region) {
                        document.getElementById('regionId').value = region.id;
                        document.getElementById('regionCode').value = region.code;
                        document.getElementById('regionName').value = region.name;
                        document.getElementById('regionDescription').value = region.description || '';
                    }
                }
            } else {
                title.textContent = 'Tambah Wilayah Kerja';
                document.getElementById('regionForm').reset();
                document.getElementById('regionId').value = '';
            }
            
            modal.show();
        };
        console.log('✅ Fallback showRegionModal created');
    }
    
    if (typeof window.showLocationModal !== 'function') {
        window.showLocationModal = function(id = null) {
            console.log('📍 Fallback showLocationModal called');
            
            // Load region options first
            if (window.masterDataManager) {
                const regions = masterDataManager.getRegions();
                const select = document.getElementById('locationRegion');
                select.innerHTML = '<option value="">Pilih Wilayah</option>';
                regions.forEach(region => {
                    const option = document.createElement('option');
                    option.value = region.id;
                    option.textContent = `${region.name} (${region.code})`;
                    select.appendChild(option);
                });
            }
            
            const modal = new bootstrap.Modal(document.getElementById('locationModal'));
            const title = document.getElementById('locationModalTitle');
            
            if (id) {
                title.textContent = 'Edit Lokasi Kerja';
                if (window.masterDataManager) {
                    const location = masterDataManager.getLocations().find(l => l.id === id);
                    if (location) {
                        document.getElementById('locationId').value = location.id;
                        document.getElementById('locationName').value = location.name;
                        document.getElementById('locationAddress').value = location.address || '';
                        document.getElementById('locationRegion').value = location.region_id;
                    }
                }
            } else {
                title.textContent = 'Tambah Lokasi Kerja';
                document.getElementById('locationForm').reset();
                document.getElementById('locationId').value = '';
            }
            
            modal.show();
        };
        console.log('✅ Fallback showLocationModal created');
    }
    
    if (typeof window.showPositionModal !== 'function') {
        window.showPositionModal = function(id = null) {
            console.log('👔 Fallback showPositionModal called');
            const modal = new bootstrap.Modal(document.getElementById('positionModal'));
            const title = document.getElementById('positionModalTitle');
            
            if (id) {
                title.textContent = 'Edit Jabatan';
                if (window.masterDataManager) {
                    const position = masterDataManager.getPositions().find(p => p.id === id);
                    if (position) {
                        document.getElementById('positionId').value = position.id;
                        document.getElementById('positionName').value = position.name;
                        document.getElementById('positionLevel').value = position.level;
                        document.getElementById('positionApprovalLevel').value = position.approval_level;
                        document.getElementById('positionDescription').value = position.description || '';
                    }
                }
            } else {
                title.textContent = 'Tambah Jabatan';
                document.getElementById('positionForm').reset();
                document.getElementById('positionId').value = '';
            }
            
            modal.show();
        };
        console.log('✅ Fallback showPositionModal created');
    }
}

// Function to check and fix all issues
function fixAllIssues() {
    console.log('🚀 Starting comprehensive fix...');
    
    // Step 1: Test current state
    testButtons();
    
    // Step 2: Create fallback functions
    createFallbackFunctions();
    
    // Step 3: Fix buttons with event listeners
    fixButtons();
    
    // Step 4: Test again
    console.log('🧪 Testing after fix...');
    testButtons();
    
    console.log('✅ Master Data buttons fix completed!');
}

// Auto-execute when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixAllIssues);
} else {
    fixAllIssues();
}

// Make functions globally available
window.testButtons = testButtons;
window.fixButtons = fixButtons;
window.createFallbackFunctions = createFallbackFunctions;
window.fixAllIssues = fixAllIssues;

console.log('🔧 Master Data buttons fix script loaded');
console.log('💡 Usage: fixAllIssues() or check individual functions');