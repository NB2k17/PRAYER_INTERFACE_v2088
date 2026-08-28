// Existing fetch handler (kept minimal)
self.addEventListener('fetch', (event) => {
  // Can remain empty or be used for caching static assets
});

// Handle incoming push events from the server/provider
self.addEventListener('push', (event) => {
  let data = {};
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || 'Prayer Reminder';
  const options = {
    body: data.body || 'It is time for prayer.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks (optional: opens the app when clicked)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});
