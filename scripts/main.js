document.addEventListener('scroll', function(e){ 
    const header = document.querySelector("header");
    if (window.scrollY < 1) {
        header.style.paddingTop = "50px";
    }
    else {
        header.style.paddingTop = "30px";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");
    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list-menu");

    hamburger.addEventListener("click", function () {
        navList.style.display = navList.style.display === "flex" ? "none" : "flex";
    });

    main.addEventListener("click", function () {
        navList.style.display = navList.style.display === "flex" ? "none" : "none";
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });

    let profile = JSON.parse(sessionStorage.getItem('profile'));
    if (!profile) {
        profile = {
            language: "en",
            profile: "test"
        };
        sessionStorage.setItem('profile', JSON.stringify(profile));
    }
    document.querySelector("#language_selector").value = profile.language;
    translatePage(profile.language);
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

// Function to trigger translation
function translatePage(language) {
    let profile = JSON.parse(sessionStorage.getItem('profile'));
    profile.language = language;
    sessionStorage.setItem('profile', JSON.stringify(profile));

    var googleTranslateFrame = document.querySelector('.goog-te-combo');
    if (googleTranslateFrame) {
        googleTranslateFrame.value = language;
        googleTranslateFrame.dispatchEvent(new Event('change'));  // Trigger the change event
    }
}