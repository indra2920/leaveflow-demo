// Realtime Database Manager
// Enhanced data persistence with real-time synchronization

class RealtimeDatabaseManager {
    constructor() {
        this.storageKeys = {
            regions: 'leaveflow_regions',
            locations: 'leaveflow_locations',
            positions: 'leaveflow_positions',
            employees: 'leaveflow_employees',
            settings: 'leaveflow_settings',
            backup: 'leaveflow_backup'
        };
        this.isOnline = navigator.onLine;
        this.syncQueue = [];
        this.init();
    }

    init() {
        console.log('🔄 Initializing Realtime Database Manager...');
        
        // Setup online/offline detection
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processSyncQueue();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
        
        // Auto-backup every 5 minutes
        setInterval(() => this.createAutoBackup(), 5 * 60 * 1000);
        
        console.log('✅ Realtime Database Manager initialized');
    }

    // ==================== ENHANCED SAVE OPERATIONS ====================

    saveData(key, data, operation = 'update') {
        try {
            console.log(`💾 Saving ${key}:`, operation, data);
            
            // Validate data before saving
            if (!this.validateData(key, data)) {
                throw new Error(`Invalid data format for ${key}`);
            }
            
            // Save to localStorage immediately
            localStorage.setItem(key, JSON.stringify(data));
            
            // Add timestamp
            const timestamp = new Date().toISOString();
            localStorage.setItem(`${key}_timestamp`, timestamp);
            
            // Trigger events
            this.triggerDataUpdate(key, operation, data);
            
            // Queue for sync if online
            this.queueForSync(key, data, operation);
            
            console.log(`✅ ${key} saved successfully`);
            return true;
        } catch (error) {
            console.error(`❌ Error saving ${key}:`, error);
            throw error;
        }
    }

    getData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`❌ Error getting ${key}:`, error);
            return [];
        }
    }

    // ==================== REGIONS OPERATIONS ====================

    saveRegion(regionData, isUpdate = false, id = null) {
        console.log('🌍 Saving region:', regionData);
        
        try {
            let regions = this.getData(this.storageKeys.regions);
            
            if (isUpdate && id) {
                // Update existing region
                const index = regions.findIndex(r => r.id === parseInt(id));
                if (index === -1) {
                    throw new Error('Region not found for update');
                }
                
                regions[index] = {
                    ...regions[index],
                    ...regionData,
                    updated_at: new Date().toISOString()
                };
                
                console.log('✅ Region updated:', regions[index]);
            } else {
                // Create new region
                const newRegion = {
                    id: this.generateId(regions),
                    ...regionData,
                    locationCount: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                regions.push(newRegion);
                console.log('✅ Region created:', newRegion);
            }
            
            // Save with validation
            this.saveData(this.storageKeys.regions, regions, isUpdate ? 'update' : 'create');
            
            return regions;
        } catch (error) {
            console.error('❌ Error saving region:', error);
            throw error;
        }
    }

    saveLocation(locationData, isUpdate = false, id = null) {
        console.log('📍 Saving location:', locationData);
        
        try {
            let locations = this.getData(this.storageKeys.locations);
            const regions = this.getData(this.storageKeys.regions);
            
            // Get region info
            const region = regions.find(r => r.id === parseInt(locationData.region_id));
            if (!region) {
                throw new Error('Selected region not found');
            }
            
            if (isUpdate && id) {
                // Update existing location
                const index = locations.findIndex(l => l.id === parseInt(id));
                if (index === -1) {
                    throw new Error('Location not found for update');
                }
                
                locations[index] = {
                    ...locations[index],
                    ...locationData,
                    region_name: region.name,
                    updated_at: new Date().toISOString()
                };
                
                console.log('✅ Location updated:', locations[index]);
            } else {
                // Create new location
                const newLocation = {
                    id: this.generateId(locations),
                    ...locationData,
                    region_name: region.name,
                    employeeCount: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                locations.push(newLocation);
                console.log('✅ Location created:', newLocation);
            }
            
            // Save with validation
            this.saveData(this.storageKeys.locations, locations, isUpdate ? 'update' : 'create');
            
            // Update region location count
            this.updateRegionLocationCount();
            
            return locations;
        } catch (error) {
            console.error('❌ Error saving location:', error);
            throw error;
        }
    }

    savePosition(positionData, isUpdate = false, id = null) {
        console.log('👔 Saving position:', positionData);
        
        try {
            let positions = this.getData(this.storageKeys.positions);
            
            if (isUpdate && id) {
                // Update existing position
                const index = positions.findIndex(p => p.id === parseInt(id));
                if (index === -1) {
                    throw new Error('Position not found for update');
                }
                
                positions[index] = {
                    ...positions[index],
                    ...positionData,
                    updated_at: new Date().toISOString()
                };
                
                console.log('✅ Position updated:', positions[index]);
            } else {
                // Create new position
                const newPosition = {
                    id: this.generateId(positions),
                    ...positionData,
                    employeeCount: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                positions.push(newPosition);
                console.log('✅ Position created:', newPosition);
            }
            
            // Sort by level
            positions.sort((a, b) => a.level - b.level);
            
            // Save with validation
            this.saveData(this.storageKeys.positions, positions, isUpdate ? 'update' : 'create');
            
            return positions;
        } catch (error) {
            console.error('❌ Error saving position:', error);
            throw error;
        }
    }

    // ==================== UTILITY METHODS ====================

    generateId(items) {
        return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    }

    validateData(key, data) {
        if (!Array.isArray(data)) {
            console.error('Data must be an array');
            return false;
        }
        
        // Specific validations based on data type
        if (key.includes('regions')) {
            return data.every(item => item.name && item.code);
        } else if (key.includes('locations')) {
            return data.every(item => item.name && item.region_id);
        } else if (key.includes('positions')) {
            return data.every(item => item.name && item.level);
        }
        
        return true;
    }

    triggerDataUpdate(key, operation, data) {
        // Trigger custom events for UI updates
        const event = new CustomEvent('realtimeDataUpdate', {
            detail: { key, operation, data, timestamp: new Date().toISOString() }
        });
        window.dispatchEvent(event);
        
        // Also trigger the old event for compatibility
        window.dispatchEvent(new CustomEvent('masterDataUpdated'));
    }

    queueForSync(key, data, operation) {
        if (this.isOnline) {
            // If online, process immediately
            this.syncToServer(key, data, operation);
        } else {
            // If offline, queue for later
            this.syncQueue.push({ key, data, operation, timestamp: Date.now() });
            console.log('📤 Queued for sync:', key);
        }
    }

    syncToServer(key, data, operation) {
        // Placeholder for server sync
        // In a real application, this would send data to your backend
        console.log('🔄 Syncing to server:', { key, operation, dataCount: data.length });
        
        // Simulate server sync
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('✅ Synced to server:', key);
                resolve(true);
            }, 100);
        });
    }

    processSyncQueue() {
        console.log('🔄 Processing sync queue:', this.syncQueue.length, 'items');
        
        this.syncQueue.forEach(item => {
            this.syncToServer(item.key, item.data, item.operation);
        });
        
        this.syncQueue = [];
    }

    updateRegionLocationCount() {
        const regions = this.getData(this.storageKeys.regions);
        const locations = this.getData(this.storageKeys.locations);
        
        regions.forEach(region => {
            region.locationCount = locations.filter(l => l.region_id === region.id).length;
        });
        
        this.saveData(this.storageKeys.regions, regions, 'update');
    }

    // ==================== BACKUP OPERATIONS ====================

    createAutoBackup() {
        try {
            const backup = {
                timestamp: new Date().toISOString(),
                data: {
                    regions: this.getData(this.storageKeys.regions),
                    locations: this.getData(this.storageKeys.locations),
                    positions: this.getData(this.storageKeys.positions),
                    employees: this.getData(this.storageKeys.employees),
                    settings: this.getData(this.storageKeys.settings)
                }
            };
            
            localStorage.setItem(this.storageKeys.backup, JSON.stringify(backup));
            console.log('💾 Auto-backup created');
        } catch (error) {
            console.error('❌ Auto-backup failed:', error);
        }
    }

    restoreFromBackup() {
        try {
            const backup = JSON.parse(localStorage.getItem(this.storageKeys.backup) || '{}');
            
            if (backup.data) {
                Object.keys(backup.data).forEach(key => {
                    const storageKey = this.storageKeys[key];
                    if (storageKey) {
                        this.saveData(storageKey, backup.data[key], 'restore');
                    }
                });
                
                console.log('✅ Data restored from backup');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('❌ Restore failed:', error);
            return false;
        }
    }

    // ==================== DEBUG METHODS ====================

    getDebugInfo() {
        return {
            isOnline: this.isOnline,
            syncQueueLength: this.syncQueue.length,
            dataStats: {
                regions: this.getData(this.storageKeys.regions).length,
                locations: this.getData(this.storageKeys.locations).length,
                positions: this.getData(this.storageKeys.positions).length,
                employees: this.getData(this.storageKeys.employees).length
            },
            lastBackup: localStorage.getItem(this.storageKeys.backup + '_timestamp')
        };
    }

    clearAllData() {
        Object.values(this.storageKeys).forEach(key => {
            localStorage.removeItem(key);
            localStorage.removeItem(key + '_timestamp');
        });
        console.log('🗑️ All data cleared');
    }
}

// Initialize global instance
window.realtimeDB = new RealtimeDatabaseManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealtimeDatabaseManager;
}

console.log('🚀 Realtime Database Manager loaded');