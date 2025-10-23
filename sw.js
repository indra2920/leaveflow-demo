// Service Worker for LeaveFlow PWA
const CACHE_NAME = 'leaveflow-v1.0.0';
const STATIC_CACHE = 'leaveflow-static-v1';
const DYNAMIC_CACHE = 'leaveflow-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/demo-admin-full.html',
    '/demo-admin-masterdata.html',
    '/demo-modern.html',
    '/demo-supervisor-modern.html',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache', event.request.url);
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then(networkResponse => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clone the response
                        const responseToCache = networkResponse.clone();

                        // Add to dynamic cache
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                console.log('Service Worker: Caching dynamic resource', event.request.url);
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch(error => {
                        console.log('Service Worker: Network request failed', error);
                        
                        // Return offline page for navigation requests
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Return empty response for other requests
                        return new Response('', {
                            status: 408,
                            statusText: 'Request Timeout'
                        });
                    });
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    console.log('Service Worker: Background sync', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Sync pending changes when back online
            syncPendingChanges()
        );
    }
});

// Push notification handler
self.addEventListener('push', event => {
    console.log('Service Worker: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New notification from LeaveFlow',
        icon: 'https://ui-avatars.com/api/?name=LF&background=6f42c1&color=fff&size=192&rounded=true',
        badge: 'https://ui-avatars.com/api/?name=LF&background=6f42c1&color=fff&size=72&rounded=true',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Open LeaveFlow',
                icon: 'https://ui-avatars.com/api/?name=O&background=28a745&color=fff&size=32&rounded=true'
            },
            {
                action: 'close',
                title: 'Close',
                icon: 'https://ui-avatars.com/api/?name=X&background=dc3545&color=fff&size=32&rounded=true'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('LeaveFlow', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper function to sync pending changes
async function syncPendingChanges() {
    try {
        const pendingChanges = JSON.parse(localStorage.getItem('pending_changes') || '[]');
        
        if (pendingChanges.length > 0) {
            console.log('Service Worker: Syncing', pendingChanges.length, 'pending changes');
            
            // Process each pending change
            for (const change of pendingChanges) {
                try {
                    // This would normally send to API
                    console.log('Service Worker: Processing change', change);
                    
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 100));
                } catch (error) {
                    console.error('Service Worker: Error processing change', error);
                }
            }
            
            // Clear pending changes after successful sync
            localStorage.setItem('pending_changes', JSON.stringify([]));
            console.log('Service Worker: All changes synced successfully');
        }
    } catch (error) {
        console.error('Service Worker: Error syncing pending changes', error);
    }
}

// Message handler for communication with main thread
self.addEventListener('message', event => {
    console.log('Service Worker: Message received', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: CACHE_NAME
        });
    }
});

console.log('Service Worker: Loaded successfully');