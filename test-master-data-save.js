// Test Master Data Save Functionality
// This script tests and debugs data saving issues

console.log('🧪 Master Data Save Test Script loaded');

// Test data saving functionality
function testDataSaving() {
    console.log('🚀 Starting Master Data save tests...');
    
    // Test 1: Check if realtimeDB is available
    if (typeof realtimeDB === 'undefined') {
        console.error('❌ realtimeDB not found');
        alert('Error: Realtime Database Manager not loaded');
        return false;
    }
    console.log('✅ realtimeDB available');
    
    // Test 2: Test region saving
    testRegionSaving();
    
    // Test 3: Test location saving
    testLocationSaving();
    
    // Test 4: Test position saving
    testPositionSaving();
    
    // Test 5: Check data persistence
    testDataPersistence();
    
    console.log('🎯 Master Data save tests completed');
}

function testRegionSaving() {
    console.log('🌍 Testing region saving...');
    
    try {
        const testRegion = {
            code: 'TEST',
            name: 'Test Region',
            description: 'Test region for debugging'
        };
        
        const result = realtimeDB.saveRegion(testRegion, false);
        console.log('✅ Region save test passed:', result);
        
        // Verify data was saved
        const regions = realtimeDB.getData('leaveflow_regions');
        const savedRegion = regions.find(r => r.code === 'TEST');
        
        if (savedRegion) {
            console.log('✅ Region data verified in storage');
            
            // Clean up test data
            const filteredRegions = regions.filter(r => r.code !== 'TEST');
            realtimeDB.saveData('leaveflow_regions', filteredRegions);
            console.log('🧹 Test region cleaned up');
        } else {
            console.error('❌ Region not found in storage after save');
        }
        
    } catch (error) {
        console.error('❌ Region save test failed:', error);
    }
}

function testLocationSaving() {
    console.log('📍 Testing location saving...');
    
    try {
        // First ensure we have a region
        const regions = realtimeDB.getData('leaveflow_regions');
        if (regions.length === 0) {
            console.log('⚠️ No regions available, creating test region first');
            realtimeDB.saveRegion({
                code: 'TEST',
                name: 'Test Region',
                description: 'Test region for location test'
            }, false);
        }
        
        const updatedRegions = realtimeDB.getData('leaveflow_regions');
        const testRegion = updatedRegions[0];
        
        const testLocation = {
            name: 'Test Location',
            address: 'Test Address',
            region_id: testRegion.id
        };
        
        const result = realtimeDB.saveLocation(testLocation, false);
        console.log('✅ Location save test passed:', result);
        
        // Verify data was saved
        const locations = realtimeDB.getData('leaveflow_locations');
        const savedLocation = locations.find(l => l.name === 'Test Location');
        
        if (savedLocation) {
            console.log('✅ Location data verified in storage');
            
            // Clean up test data
            const filteredLocations = locations.filter(l => l.name !== 'Test Location');
            realtimeDB.saveData('leaveflow_locations', filteredLocations);
            console.log('🧹 Test location cleaned up');
        } else {
            console.error('❌ Location not found in storage after save');
        }
        
    } catch (error) {
        console.error('❌ Location save test failed:', error);
    }
}

function testPositionSaving() {
    console.log('👔 Testing position saving...');
    
    try {
        const testPosition = {
            name: 'Test Position',
            level: 99,
            approval_level: 99,
            description: 'Test position for debugging'
        };
        
        const result = realtimeDB.savePosition(testPosition, false);
        console.log('✅ Position save test passed:', result);
        
        // Verify data was saved
        const positions = realtimeDB.getData('leaveflow_positions');
        const savedPosition = positions.find(p => p.name === 'Test Position');
        
        if (savedPosition) {
            console.log('✅ Position data verified in storage');
            
            // Clean up test data
            const filteredPositions = positions.filter(p => p.name !== 'Test Position');
            realtimeDB.saveData('leaveflow_positions', filteredPositions);
            console.log('🧹 Test position cleaned up');
        } else {
            console.error('❌ Position not found in storage after save');
        }
        
    } catch (error) {
        console.error('❌ Position save test failed:', error);
    }
}

function testDataPersistence() {
    console.log('💾 Testing data persistence...');
    
    const testData = {
        regions: realtimeDB.getData('leaveflow_regions'),
        locations: realtimeDB.getData('leaveflow_locations'),
        positions: realtimeDB.getData('leaveflow_positions')
    };
    
    console.log('📊 Current data counts:', {
        regions: testData.regions.length,
        locations: testData.locations.length,
        positions: testData.positions.length
    });
    
    // Test localStorage persistence
    Object.keys(testData).forEach(key => {
        const storageKey = `leaveflow_${key}`;
        const storedData = localStorage.getItem(storageKey);
        
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                console.log(`✅ ${key} persisted in localStorage:`, parsed.length, 'items');
            } catch (error) {
                console.error(`❌ ${key} data corrupted in localStorage:`, error);
            }
        } else {
            console.log(`⚠️ ${key} not found in localStorage`);
        }
    });
}

// Function to debug form data
function debugFormData() {
    console.log('🔍 Debugging form data...');
    
    // Check region form
    const regionForm = document.getElementById('regionForm');
    if (regionForm) {
        const regionData = {
            code: document.getElementById('regionCode')?.value,
            name: document.getElementById('regionName')?.value,
            description: document.getElementById('regionDescription')?.value
        };
        console.log('🌍 Region form data:', regionData);
    }
    
    // Check location form
    const locationForm = document.getElementById('locationForm');
    if (locationForm) {
        const locationData = {
            name: document.getElementById('locationName')?.value,
            address: document.getElementById('locationAddress')?.value,
            region_id: document.getElementById('locationRegion')?.value
        };
        console.log('📍 Location form data:', locationData);
    }
    
    // Check position form
    const positionForm = document.getElementById('positionForm');
    if (positionForm) {
        const positionData = {
            name: document.getElementById('positionName')?.value,
            level: document.getElementById('positionLevel')?.value,
            approval_level: document.getElementById('positionApprovalLevel')?.value,
            description: document.getElementById('positionDescription')?.value
        };
        console.log('👔 Position form data:', positionData);
    }
}

// Function to manually trigger save functions
function manualSaveTest() {
    console.log('🔧 Manual save test...');
    
    // Test region save
    if (typeof saveRegion === 'function') {
        console.log('✅ saveRegion function available');
    } else {
        console.error('❌ saveRegion function not found');
    }
    
    // Test location save
    if (typeof saveLocation === 'function') {
        console.log('✅ saveLocation function available');
    } else {
        console.error('❌ saveLocation function not found');
    }
    
    // Test position save
    if (typeof savePosition === 'function') {
        console.log('✅ savePosition function available');
    } else {
        console.error('❌ savePosition function not found');
    }
}

// Function to check modal functionality
function checkModals() {
    console.log('🔍 Checking modal functionality...');
    
    const modals = ['regionModal', 'locationModal', 'positionModal'];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            console.log(`✅ ${modalId} element found`);
            
            // Check if Bootstrap modal can be created
            try {
                const bsModal = new bootstrap.Modal(modal);
                console.log(`✅ ${modalId} Bootstrap modal created`);
            } catch (error) {
                console.error(`❌ ${modalId} Bootstrap modal failed:`, error);
            }
        } else {
            console.error(`❌ ${modalId} element not found`);
        }
    });
}

// Function to show debug info
function showDebugInfo() {
    const debugInfo = realtimeDB.getDebugInfo();
    console.log('🔍 Debug Info:', debugInfo);
    
    alert(`Debug Info:
Online: ${debugInfo.isOnline}
Sync Queue: ${debugInfo.syncQueueLength}
Data Counts:
- Regions: ${debugInfo.dataStats.regions}
- Locations: ${debugInfo.dataStats.locations}  
- Positions: ${debugInfo.dataStats.positions}
- Employees: ${debugInfo.dataStats.employees}`);
}

// Make functions globally available
window.testDataSaving = testDataSaving;
window.debugFormData = debugFormData;
window.manualSaveTest = manualSaveTest;
window.checkModals = checkModals;
window.showDebugInfo = showDebugInfo;

// Auto-run basic tests when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            console.log('🔧 Running basic Master Data tests...');
            manualSaveTest();
            checkModals();
        }, 1000);
    });
} else {
    setTimeout(() => {
        console.log('🔧 Running basic Master Data tests...');
        manualSaveTest();
        checkModals();
    }, 1000);
}

console.log('💡 Available test functions:');
console.log('- testDataSaving() - Run comprehensive save tests');
console.log('- debugFormData() - Check current form data');
console.log('- manualSaveTest() - Test save function availability');
console.log('- checkModals() - Test modal functionality');
console.log('- showDebugInfo() - Show debug information');