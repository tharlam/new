document.addEventListener('DOMContentLoaded', () => {
    // Corrected: The ID of your language switcher is 'lang'
    const languageSwitcher = document.getElementById('lang');
    
    const userLang = localStorage.getItem('language') || 'en';
    languageSwitcher.value = userLang;
    
    // Call setLanguage() right away to populate the page with the default language.
    setLanguage(userLang);

    // Add event listener to the dropdown
    languageSwitcher.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        setLanguage(selectedLang);
        localStorage.setItem('language', selectedLang);
    });
});

async function setLanguage(lang) {
    try {
        const response = await fetch(`${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not fetch translation file for ${lang}`);
        }
        const translations = await response.json();
        
        // Corrected: Your HTML uses data-i18n, not data-translate-key
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                // Check if the element has an attribute to translate (like alt or placeholder)
                if (element.dataset.i18nAttribute) {
                    const attribute = element.dataset.i18nAttribute;
                    element.setAttribute(attribute, translations[key]);
                } else if (element.tagName === 'INPUT') {
                    // Handle input placeholder attributes
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
        
        // Handle elements with data-i18n-alt and other attributes
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (translations[key]) {
                element.setAttribute('alt', translations[key]);
            }
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            if (translations[key]) {
                element.setAttribute('aria-label', translations[key]);
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[key]) {
                element.setAttribute('placeholder', translations[key]);
            }
        });
        
        document.documentElement.lang = lang;
    } catch (error) {
        console.error("Error loading language file:", error);
    }
}