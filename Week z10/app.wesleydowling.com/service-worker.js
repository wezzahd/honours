/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./sw-toolbox/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'blackhole-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './main.js',
    './runtime.js',
    './common.js',
    './styles.css',
    './polyfills.js',
    'index.html',
    'manifest.webmanifest'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
