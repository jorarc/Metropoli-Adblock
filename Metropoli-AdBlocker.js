// ==UserScript==
// @name         Metropoli-AdBlocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Efficiently block specific pop-ups/ads on Metropoli Abierta
// @author       jarcas
// @match        https://metropoliabierta.elespanol.com/*
// @icon         https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://metropoliabierta.elespanol.com&size=64
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jorarc/Metropoli-Adblock/main/Metropoli-AdBlocker.js
// @downloadURL  https://raw.githubusercontent.com/jorarc/Metropoli-Adblock/main/Metropoli-AdBlocker.js

// ==/UserScript==


(function() {
    'use strict';

    // Function to remove elements based on a list of selectors
    const removeElements = (selectors) => {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });
    };

    // MutationObserver callback function
    const callback = (mutationsList, observer) => {
        // Selectors for elements to remove
        const selectors = [
            'div.tp-modal',
            'div.tp-backdrop'
        ];

        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                removeElements(selectors);
            }
        }
    };

    // Create a new MutationObserver instance
    const observer = new MutationObserver(callback);

    // Configuration object for the observer
    const config = { childList: true, subtree: true };

    // Start observing the document body for DOM mutations
    observer.observe(document.body, config);

    // Initial clean-up in case the elements are already present at script start
    const initialSelectors = [
        'div.tp-modal',
        'div.tp-backdrop'
    ];
    removeElements(initialSelectors);
})();
