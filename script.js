/* =========================================================
   ATCRS — MAIN SYSTEM JAVASCRIPT
   PART 9A — CORE SETUP & COMMON FUNCTIONS
========================================================= */

"use strict";

/* =========================================================
   ATCRS SYSTEM CONFIGURATION
========================================================= */

const ATCRS = {
    systemName: "Automated Transcript and Credential Retrieval System",
    schoolName: "De La Salle John Bosco College",
    shortName: "DLSJBC",
    version: "1.0.0",
    currentYear: new Date().getFullYear()
};


/* =========================================================
   DOCUMENT READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeATCRS();

});


/* =========================================================
   MAIN INITIALIZATION
========================================================= */

function initializeATCRS() {

    initializeNavigation();
    initializeMobileMenu();
    initializeButtons();
    initializeForms();
    initializeSearch();
    initializeFilters();
    initializeAnimations();
    initializeDateDisplays();
    initializePasswordToggles();
    initializeLogoutButtons();
    initializeScrollEffects();

}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const navigationLinks =
        document.querySelectorAll("a[href]");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const href = this.getAttribute("href");

            if (!href) {
                return;
            }

            /*
             * Allow normal links such as:
             * index.html
             * login.html
             * student.html
             * terms.html
             * privacy.html
             * external URLs
             */

            if (
                href.startsWith("#") &&
                href.length > 1
            ) {

                const target =
                    document.querySelector(href);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle, #menuToggle, [data-menu-toggle]"
        );

    const navigation =
        document.querySelector(
            ".site-nav, .sidebar, .mobile-nav"
        );

    if (!menuToggle || !navigation) {
        return;
    }

    menuToggle.addEventListener("click", function () {

        navigation.classList.toggle("mobile-open");

        this.classList.toggle("active");

        const expanded =
            this.getAttribute("aria-expanded") === "true";

        this.setAttribute(
            "aria-expanded",
            String(!expanded)
        );

    });

}


/* =========================================================
   COMMON BUTTONS
========================================================= */

function initializeButtons() {

    const buttons =
        document.querySelectorAll(
            "button[data-action], .action-btn[data-action]"
        );

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const action =
                this.getAttribute("data-action");

            if (!action) {
                return;
            }

            handleATCRSAction(action, this);

        });

    });

}


/* =========================================================
   ACTION HANDLER
========================================================= */

function handleATCRSAction(action, element) {

    switch (action) {

        case "back":
            history.back();
            break;

        case "refresh":
            window.location.reload();
            break;

        case "print":
            window.print();
            break;

        case "home":
            window.location.href = "index.html";
            break;

        case "student-login":
            window.location.href = "login.html";
            break;

        case "registrar-login":
            window.location.href =
                "registrar-login.html";
            break;

        case "verifier-login":
            window.location.href =
                "verifier-login.html";
            break;

        default:
            console.log(
                "ATCRS action:",
                action
            );

    }

}


/* =========================================================
   COMMON FORM INITIALIZATION
========================================================= */

function initializeForms() {

    const forms =
        document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("submit", function () {

            /*
             * Individual pages such as login.js,
             * registrar login, and verifier login
             * can handle their own submission.
             *
             * This common script only performs
             * basic form preparation.
             */

            const requiredFields =
                form.querySelectorAll(
                    "[required]"
                );

            requiredFields.forEach(function (field) {

                if (
                    field.value.trim() === ""
                ) {

                    field.classList.add("invalid");

                } else {

                    field.classList.remove("invalid");

                }

            });

        });

    });

}


/* =========================================================
   SEARCH INITIALIZATION
========================================================= */

function initializeSearch() {

    const searchInputs =
        document.querySelectorAll(
            "input[type='search'], " +
            "input[data-search], " +
            ".search-input"
        );

    searchInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                performSearch(this);

            }
        );

    });

}


/* =========================================================
   SEARCH FUNCTION
========================================================= */

function performSearch(input) {

    const searchValue =
        input.value
            .toLowerCase()
            .trim();

    const targetSelector =
        input.getAttribute(
            "data-search-target"
        );

    if (!targetSelector) {
        return;
    }

    const items =
        document.querySelectorAll(
            targetSelector
        );

    let visibleCount = 0;

    items.forEach(function (item) {

        const text =
            item.textContent
                .toLowerCase();

        if (
            searchValue === "" ||
            text.includes(searchValue)
        ) {

            item.style.display = "";

            item.classList.remove(
                "filter-hidden"
            );

            visibleCount++;

        } else {

            item.style.display = "none";

            item.classList.add(
                "filter-hidden"
            );

        }

    });

    updateSearchResultMessage(
        input,
        visibleCount
    );

}


/* =========================================================
   SEARCH RESULT MESSAGE
========================================================= */

function updateSearchResultMessage(
    input,
    count
) {

    const messageSelector =
        input.getAttribute(
            "data-search-message"
        );

    if (!messageSelector) {
        return;
    }

    const message =
        document.querySelector(
            messageSelector
        );

    if (!message) {
        return;
    }

    if (input.value.trim() === "") {

        message.textContent = "";

        return;

    }

    if (count === 0) {

        message.textContent =
            "No results found.";

    } else {

        message.textContent =
            count +
            (count === 1
                ? " result found."
                : " results found.");

    }

}


/* =========================================================
   FILTER INITIALIZATION
========================================================= */

function initializeFilters() {

    const filters =
        document.querySelectorAll(
            "select[data-filter]"
        );

    filters.forEach(function (filter) {

        filter.addEventListener(
            "change",
            function () {

                applyFilter(this);

            }
        );

    });

}


/* =========================================================
   APPLY FILTER
========================================================= */

function applyFilter(filter) {

    const targetSelector =
        filter.getAttribute(
            "data-filter-target"
        );

    if (!targetSelector) {
        return;
    }

    const items =
        document.querySelectorAll(
            targetSelector
        );

    const selectedValue =
        filter.value
            .toLowerCase()
            .trim();

    items.forEach(function (item) {

        if (
            selectedValue === "" ||
            selectedValue === "all"
        ) {

            item.style.display = "";

            item.classList.remove(
                "filter-hidden"
            );

            return;

        }

        const itemValue =
            (
                item.getAttribute(
                    "data-status"
                ) || ""
            )
                .toLowerCase()
                .trim();

        if (
            itemValue === selectedValue
        ) {

            item.style.display = "";

            item.classList.remove(
                "filter-hidden"
            );

        } else {

            item.style.display = "none";

            item.classList.add(
                "filter-hidden"
            );

        }

    });

}


/* =========================================================
   ANIMATIONS
========================================================= */

function initializeAnimations() {

    const animatedElements =
        document.querySelectorAll(
            ".fade-in, .slide-up, [data-animation]"
        );

    if (
        typeof IntersectionObserver ===
        "undefined"
    ) {

        animatedElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );

    animatedElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}


/* =========================================================
   DATE DISPLAY
========================================================= */

function initializeDateDisplays() {

    const dateElements =
        document.querySelectorAll(
            "[data-current-date], " +
            ".current-date"
        );

    const today =
        new Date();

    const formattedDate =
        today.toLocaleDateString(
            "en-PH",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    dateElements.forEach(
        function (element) {

            element.textContent =
                formattedDate;

        }
    );

}


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

function initializePasswordToggles() {

    const toggles =
        document.querySelectorAll(
            "[data-password-toggle], " +
            ".password-toggle"
        );

    toggles.forEach(function (toggle) {

        toggle.addEventListener(
            "click",
            function () {

                const targetId =
                    this.getAttribute(
                        "data-target"
                    );

                if (!targetId) {
                    return;
                }

                const passwordInput =
                    document.getElementById(
                        targetId
                    );

                if (!passwordInput) {
                    return;
                }

                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";

                    this.classList.add(
                        "active"
                    );

                } else {

                    passwordInput.type =
                        "password";

                    this.classList.remove(
                        "active"
                    );

                }

            }
        );

    });

}


/* =========================================================
   LOGOUT BUTTONS
========================================================= */

function initializeLogoutButtons() {

    const logoutButtons =
        document.querySelectorAll(
            ".logout-btn, " +
            "[data-logout]"
        );

    logoutButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    logoutATCRS();

                }
            );

        }
    );

}


/* =========================================================
   GENERAL ATCRS LOGOUT
========================================================= */

function logoutATCRS() {

    /*
     * Clear only ATCRS session information.
     */

    sessionStorage.removeItem(
        "studentLoggedIn"
    );

    sessionStorage.removeItem(
        "studentId"
    );

    sessionStorage.removeItem(
        "registrarLoggedIn"
    );

    sessionStorage.removeItem(
        "verifierLoggedIn"
    );

    sessionStorage.removeItem(
        "verifierUsername"
    );

    /*
     * Determine the appropriate login page.
     */

    const path =
        window.location.pathname
            .toLowerCase();

    if (
        path.includes("registrar")
    ) {

        window.location.href =
            "registrar-login.html";

    } else if (
        path.includes("verifier")
    ) {

        window.location.href =
            "verifier-login.html";

    } else {

        window.location.href =
            "login.html";

    }

}


/* =========================================================
   SCROLL EFFECTS
========================================================= */

function initializeScrollEffects() {

    const header =
        document.querySelector(
            ".site-header, header"
        );

    if (!header) {
        return;
    }

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 30
            ) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }
    );

}


/* =========================================================
   UTILITY — SHOW MESSAGE
========================================================= */

function showATCRSMessage(
    message,
    type = "info"
) {

    let container =
        document.querySelector(
            ".toast-container"
        );

    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.className =
            "toast-container";

        document.body.appendChild(
            container
        );

    }

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        "system-notification " +
        type;

    toast.innerHTML =
        `
        <div class="system-notification-content">
            <strong>${escapeHTML(message)}</strong>
        </div>
        `;

    container.appendChild(toast);

    setTimeout(function () {

        toast.classList.add(
            "fade-out"
        );

        setTimeout(function () {

            toast.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   UTILITY — SAFE HTML TEXT
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(value);

    return div.innerHTML;

}


/* =========================================================
   UTILITY — GET SESSION USER
========================================================= */

function getATCRSUserRole() {

    if (
        sessionStorage.getItem(
            "registrarLoggedIn"
        ) === "true"
    ) {

        return "registrar";

    }

    if (
        sessionStorage.getItem(
            "verifierLoggedIn"
        ) === "true"
    ) {

        return "verifier";

    }

    if (
        sessionStorage.getItem(
            "studentLoggedIn"
        ) === "true"
    ) {

        return "student";

    }

    return null;

}


/* =========================================================
   UTILITY — GENERATE REQUEST REFERENCE
========================================================= */

function generateRequestReference() {

    const year =
        new Date()
            .getFullYear();

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return (
        "ATCRS-" +
        year +
        "-" +
        random
    );

}


/* =========================================================
   UTILITY — FORMAT DATE
========================================================= */

function formatATCRSDate(date) {

    const targetDate =
        date instanceof Date
            ? date
            : new Date(date);

    if (
        Number.isNaN(
            targetDate.getTime()
        )
    ) {

        return "";

    }

    return targetDate.toLocaleDateString(
        "en-PH",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* =========================================================
   ATCRS SYSTEM READY
========================================================= */

console.log(
    ATCRS.systemName +
    " v" +
    ATCRS.version +
    " initialized."
);
/* =========================================================
   ATCRS — MAIN SYSTEM JAVASCRIPT
   PART 9B — SIDEBAR, ACTIVE NAVIGATION & UI CONTROLS
========================================================= */


/* =========================================================
   SIDEBAR INITIALIZATION
========================================================= */

function initializeSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );

    const menuToggle =
        document.querySelector(
            ".menu-toggle, " +
            "#menuToggle, " +
            "[data-menu-toggle]"
        );

    if (!sidebar || !menuToggle) {
        return;
    }

    menuToggle.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "mobile-open"
            );

            this.classList.toggle(
                "active"
            );

            document.body.classList.toggle(
                "sidebar-open"
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE SIDEBAR
========================================================= */

function closeMobileSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );

    const menuToggle =
        document.querySelector(
            ".menu-toggle, " +
            "#menuToggle, " +
            "[data-menu-toggle]"
        );

    if (sidebar) {

        sidebar.classList.remove(
            "mobile-open"
        );

    }

    if (menuToggle) {

        menuToggle.classList.remove(
            "active"
        );

    }

    document.body.classList.remove(
        "sidebar-open"
    );

}


/* =========================================================
   SIDEBAR LINK BEHAVIOR
========================================================= */

function initializeSidebarLinks() {

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar a, " +
            ".sidebar .nav-link, " +
            ".sidebar-nav a"
        );

    sidebarLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 900
                    ) {

                        closeMobileSidebar();

                    }

                }
            );

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initializeActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const navigationLinks =
        document.querySelectorAll(
            ".site-nav a, " +
            ".sidebar a, " +
            ".nav-link"
        );

    navigationLinks.forEach(
        function (link) {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            const cleanHref =
                href
                    .split("#")[0]
                    .split("?")[0]
                    .toLowerCase();

            if (
                cleanHref === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE SIDEBAR WHEN CLICKING OUTSIDE
========================================================= */

function initializeOutsideSidebarClick() {

    document.addEventListener(
        "click",
        function (event) {

            const sidebar =
                document.querySelector(
                    ".sidebar"
                );

            const menuToggle =
                document.querySelector(
                    ".menu-toggle, " +
                    "#menuToggle, " +
                    "[data-menu-toggle]"
                );

            if (
                !sidebar ||
                !menuToggle
            ) {

                return;

            }

            if (
                window.innerWidth > 900
            ) {

                return;

            }

            const clickedInsideSidebar =
                sidebar.contains(
                    event.target
                );

            const clickedMenuButton =
                menuToggle.contains(
                    event.target
                );

            if (
                !clickedInsideSidebar &&
                !clickedMenuButton
            ) {

                closeMobileSidebar();

            }

        }
    );

}


/* =========================================================
   ESCAPE KEY UI CONTROL
========================================================= */

function initializeEscapeKey() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Escape"
            ) {

                return;

            }

            closeMobileSidebar();

            closeATCRSModal();

        }
    );

}


/* =========================================================
   MODAL SUPPORT
========================================================= */

function openATCRSModal(modalId) {

    if (!modalId) {
        return;
    }

    const modal =
        document.getElementById(
            modalId
        );

    if (!modal) {
        return;
    }

    modal.classList.add(
        "active"
    );

    modal.style.display =
        "flex";

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeATCRSModal(modalId) {

    let modals;

    if (modalId) {

        const modal =
            document.getElementById(
                modalId
            );

        modals =
            modal
                ? [modal]
                : [];

    } else {

        modals =
            document.querySelectorAll(
                ".modal.active, " +
                ".modal.show"
            );

    }

    modals.forEach(
        function (modal) {

            modal.classList.remove(
                "active",
                "show"
            );

            modal.style.display =
                "none";

        }
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   MODAL BUTTONS
========================================================= */

function initializeModalButtons() {

    const openButtons =
        document.querySelectorAll(
            "[data-modal-open]"
        );

    openButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const modalId =
                        this.getAttribute(
                            "data-modal-open"
                        );

                    openATCRSModal(
                        modalId
                    );

                }
            );

        }
    );


    const closeButtons =
        document.querySelectorAll(
            "[data-modal-close], " +
            ".modal-close"
        );

    closeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const modal =
                        this.closest(
                            ".modal"
                        );

                    if (modal) {

                        closeATCRSModal(
                            modal.id
                        );

                    } else {

                        closeATCRSModal();

                    }

                }
            );

        }
    );


    const modals =
        document.querySelectorAll(
            ".modal"
        );

    modals.forEach(
        function (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        modal
                    ) {

                        closeATCRSModal(
                            modal.id
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   INITIALIZE ADDITIONAL UI CONTROLS
========================================================= */

function initializeAdditionalUI() {

    initializeSidebar();
    initializeSidebarLinks();
    initializeActiveNavigation();
    initializeOutsideSidebarClick();
    initializeEscapeKey();
    initializeModalButtons();

}


/* =========================================================
   RUN ADDITIONAL UI INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAdditionalUI();

    }
);
/* =========================================================
   ATCRS — MAIN SYSTEM JAVASCRIPT
   PART 9C — NOTIFICATIONS & STATUS MESSAGES
========================================================= */


/* =========================================================
   NOTIFICATION CONTAINER
========================================================= */

function getNotificationContainer() {

    let container =
        document.querySelector(
            ".atcrs-notification-container"
        );

    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.className =
            "atcrs-notification-container";

        container.style.position =
            "fixed";

        container.style.top =
            "20px";

        container.style.right =
            "20px";

        container.style.zIndex =
            "9999";

        container.style.display =
            "flex";

        container.style.flexDirection =
            "column";

        container.style.gap =
            "10px";

        document.body.appendChild(
            container
        );

    }

    return container;

}


/* =========================================================
   SHOW NOTIFICATION
========================================================= */

function showNotification(
    message,
    type = "info",
    duration = 3000
) {

    if (!message) {
        return;
    }

    const container =
        getNotificationContainer();

    const notification =
        document.createElement(
            "div"
        );

    notification.className =
        "system-notification " +
        type;

    notification.setAttribute(
        "role",
        "alert"
    );

    const iconMap = {

        success:
            "fa-circle-check",

        warning:
            "fa-triangle-exclamation",

        danger:
            "fa-circle-xmark",

        error:
            "fa-circle-xmark",

        info:
            "fa-circle-info"

    };

    const icon =
        iconMap[type] ||
        iconMap.info;

    notification.innerHTML =
        `
        <div class="system-notification-icon">
            <i class="fa-solid ${icon}"></i>
        </div>

        <div class="system-notification-content">
            <p>${escapeHTML(message)}</p>
        </div>

        <button
            type="button"
            class="notification-close"
            aria-label="Close notification">
            <i class="fa-solid fa-xmark"></i>
        </button>
        `;

    container.appendChild(
        notification
    );


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    const closeButton =
        notification.querySelector(
            ".notification-close"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                removeNotification(
                    notification
                );

            }
        );

    }


    /* =====================================================
       AUTOMATIC CLOSE
    ===================================================== */

    if (duration > 0) {

        setTimeout(
            function () {

                removeNotification(
                    notification
                );

            },
            duration
        );

    }

}


/* =========================================================
   REMOVE NOTIFICATION
========================================================= */

function removeNotification(
    notification
) {

    if (!notification) {
        return;
    }

    notification.classList.add(
        "fade-out"
    );

    setTimeout(
        function () {

            if (
                notification.parentNode
            ) {

                notification.remove();

            }

        },
        300
    );

}


/* =========================================================
   SUCCESS MESSAGE
========================================================= */

function showSuccessMessage(
    message
) {

    showNotification(
        message,
        "success"
    );

}


/* =========================================================
   WARNING MESSAGE
========================================================= */

function showWarningMessage(
    message
) {

    showNotification(
        message,
        "warning"
    );

}


/* =========================================================
   ERROR MESSAGE
========================================================= */

function showErrorMessage(
    message
) {

    showNotification(
        message,
        "danger"
    );

}


/* =========================================================
   INFORMATION MESSAGE
========================================================= */

function showInfoMessage(
    message
) {

    showNotification(
        message,
        "info"
    );

}


/* =========================================================
   INLINE STATUS MESSAGE
========================================================= */

function setStatusMessage(
    element,
    message,
    type = "info"
) {

    if (!element) {
        return;
    }

    element.textContent =
        message || "";

    element.classList.remove(
        "success",
        "warning",
        "danger",
        "error",
        "info"
    );

    if (message) {

        element.classList.add(
            type
        );

    }

}


/* =========================================================
   CLEAR STATUS MESSAGE
========================================================= */

function clearStatusMessage(
    element
) {

    if (!element) {
        return;
    }

    element.textContent =
        "";

    element.classList.remove(
        "success",
        "warning",
        "danger",
        "error",
        "info"
    );

}


/* =========================================================
   CONFIRM ACTION
========================================================= */

function confirmATCRSAction(
    message,
    callback
) {

    const confirmed =
        window.confirm(
            message ||
            "Are you sure you want to continue?"
        );

    if (
        confirmed &&
        typeof callback ===
        "function"
    ) {

        callback();

    }

}


/* =========================================================
   COPY TEXT
========================================================= */

function copyATCRSText(
    text,
    successMessage =
        "Copied successfully."
) {

    if (!text) {
        return;
    }

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(text)
            .then(
                function () {

                    showSuccessMessage(
                        successMessage
                    );

                }
            )
            .catch(
                function () {

                    fallbackCopyText(
                        text,
                        successMessage
                    );

                }
            );

        return;
    }

    fallbackCopyText(
        text,
        successMessage
    );

}


/* =========================================================
   FALLBACK COPY
========================================================= */

function fallbackCopyText(
    text,
    successMessage
) {

    const textarea =
        document.createElement(
            "textarea"
        );

    textarea.value =
        text;

    textarea.style.position =
        "fixed";

    textarea.style.opacity =
        "0";

    document.body.appendChild(
        textarea
    );

    textarea.select();

    try {

        document.execCommand(
            "copy"
        );

        showSuccessMessage(
            successMessage ||
            "Copied successfully."
        );

    } catch (error) {

        showErrorMessage(
            "Unable to copy the text."
        );

    }

    textarea.remove();

}


/* =========================================================
   COPY BUTTONS
========================================================= */

function initializeCopyButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-copy]"
        );

    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const text =
                        this.getAttribute(
                            "data-copy"
                        );

                    copyATCRSText(
                        text
                    );

                }
            );

        }
    );

}


/* =========================================================
   INITIALIZE NOTIFICATION FEATURES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeCopyButtons();

    }
);
/* =========================================================
   ATCRS — MAIN SYSTEM JAVASCRIPT
   PART 9D — PASSWORD & INPUT HELPERS
========================================================= */


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );

    if (!input) {
        return;
    }

    if (
        input.type ===
        "password"
    ) {

        input.type =
            "text";

        if (button) {

            button.classList.add(
                "active"
            );

            const icon =
                button.querySelector(
                    "i"
                );

            if (icon) {

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

            }

        }

    } else {

        input.type =
            "password";

        if (button) {

            button.classList.remove(
                "active"
            );

            const icon =
                button.querySelector(
                    "i"
                );

            if (icon) {

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

            }

        }

    }

}


/* =========================================================
   PASSWORD TOGGLE INITIALIZATION
========================================================= */

function initializePasswordToggleButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-password-toggle]"
        );

    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const target =
                        this.getAttribute(
                            "data-target"
                        );

                    if (!target) {
                        return;
                    }

                    togglePassword(
                        target,
                        this
                    );

                }
            );

        }
    );

}


/* =========================================================
   STUDENT ID INPUT
========================================================= */

function initializeStudentIDInputs() {

    const inputs =
        document.querySelectorAll(
            "#studentId, " +
            "#studentID, " +
            "input[name='studentId'], " +
            "input[name='studentID']"
        );

    inputs.forEach(
        function (input) {

            input.setAttribute(
                "maxlength",
                "7"
            );

            input.setAttribute(
                "inputmode",
                "numeric"
            );

            input.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value
                            .replace(
                                /\D/g,
                                ""
                            )
                            .slice(
                                0,
                                7
                            );

                }
            );

        }
    );

}


/* =========================================================
   FULL NAME INPUT
========================================================= */

function initializeNameInputs() {

    const inputs =
        document.querySelectorAll(
            "#fullName, " +
            "#fullname, " +
            "input[name='fullName'], " +
            "input[name='fullname']"
        );

    inputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    /*
                     * Allows letters, spaces,
                     * periods, hyphens and apostrophes.
                     */

                    this.value =
                        this.value.replace(
                            /[^a-zA-ZÀ-ÿ\s.'-]/g,
                            ""
                        );

                }
            );

        }
    );

}


/* =========================================================
   CHARACTER COUNTER
========================================================= */

function initializeCharacterCounters() {

    const fields =
        document.querySelectorAll(
            "[maxlength]"
        );

    fields.forEach(
        function (field) {

            const maxLength =
                parseInt(
                    field.getAttribute(
                        "maxlength"
                    ),
                    10
                );

            if (
                !maxLength ||
                maxLength <= 0
            ) {

                return;

            }

            const counter =
                document.querySelector(
                    `[data-counter-for="${field.id}"]`
                );

            if (!counter) {
                return;
            }

            updateCharacterCounter(
                field,
                counter,
                maxLength
            );

            field.addEventListener(
                "input",
                function () {

                    updateCharacterCounter(
                        field,
                        counter,
                        maxLength
                    );

                }
            );

        }
    );

}


/* =========================================================
   UPDATE CHARACTER COUNTER
========================================================= */

function updateCharacterCounter(
    field,
    counter,
    maxLength
) {

    const currentLength =
        field.value.length;

    counter.textContent =
        currentLength +
        " / " +
        maxLength;

    counter.classList.toggle(
        "limit",
        currentLength >=
        maxLength * 0.9
    );

    counter.classList.toggle(
        "exceeded",
        currentLength >
        maxLength
    );

}


/* =========================================================
   REQUIRED FIELD VALIDATION
========================================================= */

function validateRequiredFields(
    form
) {

    if (!form) {
        return false;
    }

    const requiredFields =
        form.querySelectorAll(
            "[required]"
        );

    let valid = true;

    requiredFields.forEach(
        function (field) {

            const value =
                field.value
                    .trim();

            if (!value) {

                field.classList.add(
                    "invalid"
                );

                valid = false;

            } else {

                field.classList.remove(
                    "invalid"
                );

            }

        }
    );

    return valid;

}


/* =========================================================
   CLEAR FORM VALIDATION
========================================================= */

function clearFormValidation(
    form
) {

    if (!form) {
        return;
    }

    const fields =
        form.querySelectorAll(
            ".invalid, .valid"
        );

    fields.forEach(
        function (field) {

            field.classList.remove(
                "invalid",
                "valid"
            );

        }
    );

}


/* =========================================================
   FORM RESET HELPER
========================================================= */

function resetATCRSForm(
    form
) {

    if (!form) {
        return;
    }

    form.reset();

    clearFormValidation(
        form
    );

    const messages =
        form.querySelectorAll(
            ".form-message, " +
            ".field-message, " +
            ".student-request-success, " +
            ".student-request-error, " +
            ".student-request-warning"
        );

    messages.forEach(
        function (message) {

            message.textContent =
                "";

            message.classList.remove(
                "success",
                "error",
                "warning",
                "info"
            );

        }
    );

}


/* =========================================================
   INPUT TRIM
========================================================= */

function trimInputValue(
    input
) {

    if (!input) {
        return;
    }

    input.value =
        input.value.trim();

}


/* =========================================================
   INITIALIZE INPUT HELPERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializePasswordToggleButtons();
        initializeStudentIDInputs();
        initializeNameInputs();
        initializeCharacterCounters();

    }
);
/* =========================================================
   ATCRS — MAIN SYSTEM JAVASCRIPT
   PART 9E — TABLE, CARD & DATA DISPLAY HELPERS
========================================================= */


/* =========================================================
   EMPTY STATE HELPER
========================================================= */

function showEmptyState(
    container,
    message = "No records found."
) {

    if (!container) {
        return;
    }

    container.innerHTML =
        `
        <div class="no-results">
            <i class="fa-solid fa-folder-open"></i>
            <p>${escapeHTML(message)}</p>
        </div>
        `;

}


/* =========================================================
   TABLE ROW FILTER
========================================================= */

function filterTableRows(
    table,
    searchValue
) {

    if (!table) {
        return 0;
    }

    const rows =
        table.querySelectorAll(
            "tbody tr"
        );

    const value =
        String(searchValue || "")
            .toLowerCase()
            .trim();

    let visibleRows = 0;

    rows.forEach(
        function (row) {

            const text =
                row.textContent
                    .toLowerCase();

            if (
                value === "" ||
                text.includes(value)
            ) {

                row.style.display =
                    "";

                visibleRows++;

            } else {

                row.style.display =
                    "none";

            }

        }
    );

    return visibleRows;

}


/* =========================================================
   TABLE SEARCH INPUTS
========================================================= */

function initializeTableSearch() {

    const inputs =
        document.querySelectorAll(
            "[data-table-search]"
        );

    inputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    const tableId =
                        this.getAttribute(
                            "data-table-search"
                        );

                    const table =
                        document.getElementById(
                            tableId
                        );

                    if (!table) {
                        return;
                    }

                    const count =
                        filterTableRows(
                            table,
                            this.value
                        );

                    const resultElement =
                        document.querySelector(
                            `[data-table-result="${tableId}"]`
                        );

                    if (resultElement) {

                        resultElement.textContent =
                            count +
                            (
                                count === 1
                                    ? " record"
                                    : " records"
                            ) +
                            " found.";

                    }

                }
            );

        }
    );

}


/* =========================================================
   CARD FILTER
========================================================= */

function filterCards(
    selector,
    searchValue
) {

    const cards =
        document.querySelectorAll(
            selector
        );

    const value =
        String(searchValue || "")
            .toLowerCase()
            .trim();

    let visibleCards = 0;

    cards.forEach(
        function (card) {

            const text =
                card.textContent
                    .toLowerCase();

            if (
                value === "" ||
                text.includes(value)
            ) {

                card.style.display =
                    "";

                card.classList.remove(
                    "filter-hidden"
                );

                visibleCards++;

            } else {

                card.style.display =
                    "none";

                card.classList.add(
                    "filter-hidden"
                );

            }

        }
    );

    return visibleCards;

}


/* =========================================================
   STATUS FILTER
========================================================= */

function filterByStatus(
    selector,
    status
) {

    const items =
        document.querySelectorAll(
            selector
        );

    const selectedStatus =
        String(status || "")
            .toLowerCase()
            .trim();

    let visibleItems = 0;

    items.forEach(
        function (item) {

            const itemStatus =
                (
                    item.getAttribute(
                        "data-status"
                    ) || ""
                )
                    .toLowerCase()
                    .trim();

            if (
                selectedStatus === "" ||
                selectedStatus === "all" ||
                itemStatus === selectedStatus
            ) {

                item.style.display =
                    "";

                item.classList.remove(
                    "filter-hidden"
                );

                visibleItems++;

            } else {

                item.style.display =
                    "none";

                item.classList.add(
                    "filter-hidden"
                );

            }

        }
    );

    return visibleItems;

}


/* =========================================================
   RESET FILTER
========================================================= */

function resetATCRSFilters(
    container
) {

    const parent =
        container ||
        document;

    const inputs =
        parent.querySelectorAll(
            "input[type='search'], " +
            "input[data-search], " +
            ".search-input"
        );

    inputs.forEach(
        function (input) {

            input.value =
                "";

            input.dispatchEvent(
                new Event(
                    "input",
                    {
                        bubbles: true
                    }
                )
            );

        }
    );


    const selects =
        parent.querySelectorAll(
            "select"
        );

    selects.forEach(
        function (select) {

            select.selectedIndex =
                0;

            select.dispatchEvent(
                new Event(
                    "change",
                    {
                        bubbles: true
                    }
                )
            );

        }
    );

}


/* =========================================================
   RESET FILTER BUTTONS
========================================================= */

function initializeResetFilters() {

    const buttons =
        document.querySelectorAll(
            ".reset-filter-btn, " +
            ".student-request-reset, " +
            "[data-reset-filter]"
        );

    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const targetSelector =
                        this.getAttribute(
                            "data-reset-filter"
                        );

                    if (targetSelector) {

                        const target =
                            document.querySelector(
                                targetSelector
                            );

                        resetATCRSFilters(
                            target
                        );

                    } else {

                        resetATCRSFilters();

                    }

                }
            );

        }
    );

}


/* =========================================================
   RECORD COUNT
========================================================= */

function updateRecordCount(
    selector,
    count
) {

    const element =
        document.querySelector(
            selector
        );

    if (!element) {
        return;
    }

    element.textContent =
        Number(count) || 0;

}


/* =========================================================
   LOADING STATE
========================================================= */

function setLoadingState(
    element,
    loading = true
) {

    if (!element) {
        return;
    }

    if (loading) {

        element.classList.add(
            "loading"
        );

        element.setAttribute(
            "aria-busy",
            "true"
        );

        if (
            element.tagName ===
            "BUTTON"
        ) {

            element.disabled =
                true;

        }

    } else {

        element.classList.remove(
            "loading"
        );

        element.removeAttribute(
            "aria-busy"
        );

        if (
            element.tagName ===
            "BUTTON"
        ) {

            element.disabled =
                false;

        }

    }

}


/* =========================================================
   INITIALIZE DATA DISPLAY HELPERS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeTableSearch();
        initializeResetFilters();

    }
);
/* =========================================================
   ATCRS SCRIPT.JS — PART 9F
   TABLE SORTING & DATA DISPLAY HELPERS
========================================================= */

/* ---------------------------------------------------------
   SORT TABLE
--------------------------------------------------------- */

function sortATCRSTable(table, columnIndex, ascending = true) {

    if (!table) {
        return;
    }

    const tbody = table.querySelector("tbody");

    if (!tbody) {
        return;
    }

    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort(function (rowA, rowB) {

        const cellA = rowA.cells[columnIndex];
        const cellB = rowB.cells[columnIndex];

        if (!cellA || !cellB) {
            return 0;
        }

        let valueA = cellA.textContent.trim().toLowerCase();
        let valueB = cellB.textContent.trim().toLowerCase();

        const numberA = parseFloat(valueA.replace(/[^0-9.-]/g, ""));
        const numberB = parseFloat(valueB.replace(/[^0-9.-]/g, ""));

        if (!isNaN(numberA) && !isNaN(numberB)) {
            return ascending
                ? numberA - numberB
                : numberB - numberA;
        }

        const dateA = Date.parse(valueA);
        const dateB = Date.parse(valueB);

        if (!isNaN(dateA) && !isNaN(dateB)) {
            return ascending
                ? dateA - dateB
                : dateB - dateA;
        }

        return ascending
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
    });

    rows.forEach(function (row) {
        tbody.appendChild(row);
    });
}


/* ---------------------------------------------------------
   INITIALIZE TABLE SORTING
--------------------------------------------------------- */

function initializeTableSorting() {

    const tables = document.querySelectorAll("table");

    tables.forEach(function (table) {

        const headers = table.querySelectorAll("thead th");

        headers.forEach(function (header, index) {

            if (
                header.dataset.sortable === "false" ||
                header.classList.contains("no-sort")
            ) {
                return;
            }

            header.style.cursor = "pointer";

            header.addEventListener("click", function () {

                const currentDirection =
                    header.dataset.sortDirection || "none";

                const ascending =
                    currentDirection !== "ascending";

                headers.forEach(function (item) {
                    item.dataset.sortDirection = "none";
                });

                header.dataset.sortDirection =
                    ascending ? "ascending" : "descending";

                sortATCRSTable(
                    table,
                    index,
                    ascending
                );
            });

        });

    });
}


/* ---------------------------------------------------------
   UPDATE TABLE EMPTY MESSAGE
--------------------------------------------------------- */

function updateTableEmptyMessage(table) {

    if (!table) {
        return;
    }

    const tbody = table.querySelector("tbody");

    if (!tbody) {
        return;
    }

    const rows = Array.from(
        tbody.querySelectorAll("tr")
    ).filter(function (row) {
        return !row.classList.contains("empty-row");
    });

    const visibleRows = rows.filter(function (row) {
        return row.style.display !== "none";
    });

    let emptyRow = tbody.querySelector(".empty-row");

    if (visibleRows.length === 0) {

        if (!emptyRow) {

            emptyRow = document.createElement("tr");
            emptyRow.className = "empty-row";

            const cell = document.createElement("td");

            cell.colSpan =
                table.querySelectorAll("thead th").length || 1;

            cell.textContent =
                "No records found.";

            cell.style.textAlign = "center";
            cell.style.padding = "30px";

            emptyRow.appendChild(cell);
            tbody.appendChild(emptyRow);
        }

        emptyRow.style.display = "";

    } else if (emptyRow) {

        emptyRow.style.display = "none";
    }
}


/* ---------------------------------------------------------
   INITIALIZE EMPTY TABLE CHECK
--------------------------------------------------------- */

function initializeTableEmptyStates() {

    const tables = document.querySelectorAll("table");

    tables.forEach(function (table) {

        updateTableEmptyMessage(table);

        const observer = new MutationObserver(function () {
            updateTableEmptyMessage(table);
        });

        const tbody = table.querySelector("tbody");

        if (tbody) {
            observer.observe(tbody, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ["style", "class"]
            });
        }

    });
}


/* ---------------------------------------------------------
   RECORD COUNT DISPLAY
--------------------------------------------------------- */

function updateATCRSTableCount(table, target) {

    if (!table || !target) {
        return;
    }

    const tbody = table.querySelector("tbody");

    if (!tbody) {
        return;
    }

    const rows = Array.from(
        tbody.querySelectorAll("tr")
    ).filter(function (row) {

        return (
            !row.classList.contains("empty-row") &&
            row.style.display !== "none"
        );

    });

    target.textContent = rows.length;
}


/* ---------------------------------------------------------
   AUTOMATIC RECORD COUNTS
--------------------------------------------------------- */

function initializeAutomaticRecordCounts() {

    const tables = document.querySelectorAll("table");

    tables.forEach(function (table) {

        const countTarget =
            document.querySelector(
                `[data-table-count="${table.id}"]`
            );

        if (!countTarget || !table.id) {
            return;
        }

        updateATCRSTableCount(
            table,
            countTarget
        );

        const tbody = table.querySelector("tbody");

        if (!tbody) {
            return;
        }

        const observer = new MutationObserver(function () {

            updateATCRSTableCount(
                table,
                countTarget
            );

        });

        observer.observe(tbody, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style", "class"]
        });

    });
}


/* ---------------------------------------------------------
   DATA-TABLE ROW SELECTION
--------------------------------------------------------- */

function initializeRowSelection() {

    const tables = document.querySelectorAll(
        "table[data-selectable='true']"
    );

    tables.forEach(function (table) {

        table.addEventListener("click", function (event) {

            const row = event.target.closest("tbody tr");

            if (!row || row.classList.contains("empty-row")) {
                return;
            }

            table
                .querySelectorAll("tbody tr.selected")
                .forEach(function (selectedRow) {
                    selectedRow.classList.remove("selected");
                });

            row.classList.add("selected");

            table.dispatchEvent(
                new CustomEvent("atcrsRowSelected", {
                    detail: {
                        row: row,
                        table: table
                    }
                })
            );

        });

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9F
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeTableSorting();
        initializeTableEmptyStates();
        initializeAutomaticRecordCounts();
        initializeRowSelection();

    }
);


/* =========================================================
   END OF PART 9F
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9G
   MODAL, CONFIRMATION & DETAIL VIEW HELPERS
========================================================= */


/* ---------------------------------------------------------
   CREATE STANDARD ATCRS MODAL
--------------------------------------------------------- */

function createATCRSModal(title, content) {

    let modal = document.getElementById("atcrsModal");

    if (modal) {
        modal.remove();
    }

    modal = document.createElement("div");

    modal.id = "atcrsModal";
    modal.className = "atcrs-modal-overlay";

    modal.innerHTML = `
        <div class="atcrs-modal">

            <div class="atcrs-modal-header">

                <h3>${escapeHTML(title || "ATCRS")}</h3>

                <button
                    type="button"
                    class="atcrs-modal-close"
                    aria-label="Close"
                >
                    &times;
                </button>

            </div>

            <div class="atcrs-modal-body">
                ${content || ""}
            </div>

            <div class="atcrs-modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary atcrs-modal-cancel"
                >
                    CLOSE
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    requestAnimationFrame(function () {
        modal.classList.add("show");
    });

    const closeButton =
        modal.querySelector(".atcrs-modal-close");

    const cancelButton =
        modal.querySelector(".atcrs-modal-cancel");

    if (closeButton) {
        closeButton.addEventListener(
            "click",
            function () {
                closeATCRSDetailModal();
            }
        );
    }

    if (cancelButton) {
        cancelButton.addEventListener(
            "click",
            function () {
                closeATCRSDetailModal();
            }
        );
    }

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closeATCRSDetailModal();
        }

    });

    return modal;
}


/* ---------------------------------------------------------
   CLOSE STANDARD MODAL
--------------------------------------------------------- */

function closeATCRSDetailModal() {

    const modal =
        document.getElementById("atcrsModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");

    setTimeout(function () {

        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }

    }, 250);
}


/* ---------------------------------------------------------
   CONFIRMATION DIALOG
--------------------------------------------------------- */

function showATCRSConfirmation(
    title,
    message,
    confirmText,
    cancelText,
    callback
) {

    const modal = createATCRSModal(
        title || "CONFIRM ACTION",
        `
            <div class="confirmation-box">

                <div class="confirmation-icon">
                    <i class="fas fa-question-circle"></i>
                </div>

                <p class="confirmation-message">
                    ${escapeHTML(
                        message ||
                        "Are you sure you want to continue?"
                    )}
                </p>

            </div>
        `
    );

    const footer =
        modal.querySelector(".atcrs-modal-footer");

    if (!footer) {
        return;
    }

    footer.innerHTML = `
        <button
            type="button"
            class="btn btn-secondary"
            id="atcrsConfirmCancel"
        >
            ${escapeHTML(cancelText || "CANCEL")}
        </button>

        <button
            type="button"
            class="btn btn-primary"
            id="atcrsConfirmAction"
        >
            ${escapeHTML(confirmText || "CONFIRM")}
        </button>
    `;

    const cancel =
        footer.querySelector("#atcrsConfirmCancel");

    const confirm =
        footer.querySelector("#atcrsConfirmAction");

    if (cancel) {

        cancel.addEventListener(
            "click",
            function () {
                closeATCRSDetailModal();
            }
        );

    }

    if (confirm) {

        confirm.addEventListener(
            "click",
            function () {

                closeATCRSDetailModal();

                if (typeof callback === "function") {
                    callback();
                }

            }
        );

    }
}


/* ---------------------------------------------------------
   VIEW RECORD DETAILS
--------------------------------------------------------- */

function viewATCRSRecordDetails(record) {

    if (!record) {
        showErrorMessage(
            "Unable to display record details."
        );
        return;
    }

    const fields = [];

    Object.keys(record).forEach(function (key) {

        if (
            record[key] === null ||
            record[key] === undefined ||
            record[key] === ""
        ) {
            return;
        }

        const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, function (text) {
                return text.toUpperCase();
            });

        fields.push(`
            <div class="detail-item">

                <span class="detail-label">
                    ${escapeHTML(label)}
                </span>

                <span class="detail-value">
                    ${escapeHTML(String(record[key]))}
                </span>

            </div>
        `);

    });

    createATCRSModal(
        "RECORD DETAILS",
        `
            <div class="record-details-grid">
                ${fields.length
                    ? fields.join("")
                    : `
                        <div class="empty-state">
                            No record information available.
                        </div>
                    `
                }
            </div>
        `
    );
}


/* ---------------------------------------------------------
   GET TABLE ROW DATA
--------------------------------------------------------- */

function getATCRSRowData(row) {

    if (!row) {
        return {};
    }

    const data = {};

    const cells = row.querySelectorAll("td");

    cells.forEach(function (cell, index) {

        data[`column${index + 1}`] =
            cell.textContent.trim();

    });

    return data;
}


/* ---------------------------------------------------------
   INITIALIZE VIEW BUTTONS
--------------------------------------------------------- */

function initializeViewButtons() {

    const buttons = document.querySelectorAll(
        ".view-btn, " +
        ".btn-view, " +
        "[data-action='view'], " +
        "[data-view]"
    );

    buttons.forEach(function (button) {

        if (button.dataset.atcrsViewInitialized) {
            return;
        }

        button.dataset.atcrsViewInitialized = "true";

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const row =
                button.closest("tr");

            if (row) {

                const data =
                    getATCRSRowData(row);

                viewATCRSRecordDetails(data);
                return;
            }

            const targetSelector =
                button.dataset.view;

            if (targetSelector) {

                const target =
                    document.querySelector(
                        targetSelector
                    );

                if (target) {

                    createATCRSModal(
                        "DETAILS",
                        target.innerHTML
                    );

                }

            }

        });

    });
}


/* ---------------------------------------------------------
   INITIALIZE CONFIRM ACTION BUTTONS
--------------------------------------------------------- */

function initializeConfirmationButtons() {

    const buttons = document.querySelectorAll(
        "[data-confirm]"
    );

    buttons.forEach(function (button) {

        if (button.dataset.atcrsConfirmInitialized) {
            return;
        }

        button.dataset.atcrsConfirmInitialized = "true";

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const message =
                    button.dataset.confirm ||
                    "Are you sure you want to continue?";

                showATCRSConfirmation(
                    "CONFIRM ACTION",
                    message,
                    "CONFIRM",
                    "CANCEL",
                    function () {

                        const action =
                            button.dataset.action;

                        if (
                            action &&
                            typeof window[action] ===
                            "function"
                        ) {
                            window[action]();
                        } else {

                            showSuccessMessage(
                                "Action confirmed successfully."
                            );

                        }

                    }
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   ESC KEY FOR DETAIL MODALS
--------------------------------------------------------- */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }

        const modal =
            document.getElementById("atcrsModal");

        if (modal) {
            closeATCRSDetailModal();
        }

    }
);


/* ---------------------------------------------------------
   INITIALIZE PART 9G
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeViewButtons();
        initializeConfirmationButtons();

    }
);


/* =========================================================
   END OF PART 9G
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9H
   STUDENT DOCUMENT REQUEST HELPERS
========================================================= */


/* ---------------------------------------------------------
   REQUEST FORM INITIALIZATION
--------------------------------------------------------- */

function initializeDocumentRequestForms() {

    const forms = document.querySelectorAll(
        ".document-request-form, " +
        "#documentRequestForm, " +
        "form[data-request-form]"
    );

    forms.forEach(function (form) {

        if (form.dataset.atcrsRequestInitialized) {
            return;
        }

        form.dataset.atcrsRequestInitialized = "true";

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const requiredFields =
                form.querySelectorAll("[required]");

            let valid = true;

            requiredFields.forEach(function (field) {

                if (!field.value.trim()) {

                    valid = false;
                    field.classList.add("input-error");

                } else {

                    field.classList.remove("input-error");

                }

            });

            if (!valid) {

                showErrorMessage(
                    "Please complete all required fields."
                );

                return;
            }

            const studentID =
                form.querySelector(
                    "[name='studentId'], " +
                    "[name='studentID'], " +
                    "#studentId, " +
                    "#studentID"
                );

            if (
                studentID &&
                !/^\d{7}$/.test(
                    studentID.value.trim()
                )
            ) {

                studentID.classList.add("input-error");

                showErrorMessage(
                    "Student ID must contain exactly 7 digits."
                );

                studentID.focus();

                return;
            }

            processATCRSDocumentRequest(form);

        });

    });
}


/* ---------------------------------------------------------
   PROCESS DOCUMENT REQUEST
--------------------------------------------------------- */

function processATCRSDocumentRequest(form) {

    const submitButton =
        form.querySelector(
            "button[type='submit'], " +
            "input[type='submit']"
        );

    if (submitButton) {
        submitButton.disabled = true;
    }

    if (submitButton) {
        submitButton.dataset.originalText =
            submitButton.textContent;

        submitButton.textContent =
            "PROCESSING...";
    }

    setTimeout(function () {

        const reference =
            generateRequestReference();

        const referenceField =
            form.querySelector(
                "[name='reference'], " +
                "#requestReference"
            );

        if (referenceField) {
            referenceField.value = reference;
        }

        const result =
            form.querySelector(
                ".request-confirmation, " +
                ".request-result, " +
                "[data-request-result]"
            );

        if (result) {

            result.innerHTML = `
                <div class="success-message">
                    <strong>REQUEST SUBMITTED SUCCESSFULLY</strong>
                    <br>
                    Reference Number:
                    <strong>${escapeHTML(reference)}</strong>
                </div>
            `;

            result.style.display = "block";
        }

        showSuccessMessage(
            "Document request submitted successfully. " +
            "Reference: " + reference
        );

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                submitButton.dataset.originalText ||
                "SUBMIT REQUEST";
        }

    }, 700);
}


/* ---------------------------------------------------------
   REQUEST TYPE SELECTOR
--------------------------------------------------------- */

function initializeRequestTypeSelector() {

    const selectors = document.querySelectorAll(
        "#documentType, " +
        "#requestType, " +
        "[name='documentType'], " +
        "[name='requestType']"
    );

    selectors.forEach(function (selector) {

        selector.addEventListener(
            "change",
            function () {

                updateRequestTypeInformation(
                    selector.value
                );

            }
        );

        if (selector.value) {

            updateRequestTypeInformation(
                selector.value
            );

        }

    });
}


/* ---------------------------------------------------------
   REQUEST TYPE INFORMATION
--------------------------------------------------------- */

function updateRequestTypeInformation(type) {

    if (!type) {
        return;
    }

    const normalizedType =
        type.toLowerCase();

    const information =
        document.querySelector(
            "[data-request-type-info]"
        );

    if (!information) {
        return;
    }

    let message =
        "Please review your request details before submitting.";

    if (
        normalizedType.includes("transcript") ||
        normalizedType.includes("tor")
    ) {

        message =
            "Official Transcript of Records request selected. " +
            "Processing may require academic and clearance verification.";

    } else if (
        normalizedType.includes("certificate")
    ) {

        message =
            "Certificate request selected. " +
            "Make sure your student information is complete.";

    } else if (
        normalizedType.includes("credential") ||
        normalizedType.includes("verification")
    ) {

        message =
            "Credential-related request selected. " +
            "Additional verification may be required.";

    }

    information.textContent = message;
    information.style.display = "block";
}


/* ---------------------------------------------------------
   REQUEST REFERENCE DISPLAY
--------------------------------------------------------- */

function initializeRequestReferenceDisplay() {

    const referenceElements =
        document.querySelectorAll(
            "[data-request-reference]"
        );

    referenceElements.forEach(function (element) {

        const storedReference =
            sessionStorage.getItem(
                "atcrsRequestReference"
            );

        if (storedReference) {
            element.textContent = storedReference;
        }

    });
}


/* ---------------------------------------------------------
   SAVE REQUEST REFERENCE
--------------------------------------------------------- */

function saveATCRSRequestReference(reference) {

    if (!reference) {
        return;
    }

    sessionStorage.setItem(
        "atcrsRequestReference",
        reference
    );
}


/* ---------------------------------------------------------
   REQUEST STATUS
--------------------------------------------------------- */

function getATCRSRequestStatus(status) {

    if (!status) {
        return "PENDING";
    }

    const normalized =
        status.toString()
            .trim()
            .toUpperCase();

    const allowedStatuses = [
        "PENDING",
        "PROCESSING",
        "READY",
        "RELEASED",
        "COMPLETED",
        "REJECTED",
        "CANCELLED"
    ];

    if (
        allowedStatuses.includes(normalized)
    ) {
        return normalized;
    }

    return "PENDING";
}


/* ---------------------------------------------------------
   UPDATE REQUEST STATUS ELEMENT
--------------------------------------------------------- */

function updateATCRSRequestStatus(
    element,
    status
) {

    if (!element) {
        return;
    }

    const finalStatus =
        getATCRSRequestStatus(status);

    element.textContent =
        finalStatus;

    element.classList.remove(
        "status-pending",
        "status-processing",
        "status-ready",
        "status-released",
        "status-completed",
        "status-rejected",
        "status-cancelled"
    );

    element.classList.add(
        "status-" +
        finalStatus.toLowerCase()
    );
}


/* ---------------------------------------------------------
   INITIALIZE REQUEST STATUS ELEMENTS
--------------------------------------------------------- */

function initializeRequestStatuses() {

    const elements =
        document.querySelectorAll(
            "[data-request-status]"
        );

    elements.forEach(function (element) {

        updateATCRSRequestStatus(
            element,
            element.dataset.requestStatus
        );

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9H
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeDocumentRequestForms();
        initializeRequestTypeSelector();
        initializeRequestReferenceDisplay();
        initializeRequestStatuses();

    }
);


/* =========================================================
   END OF PART 9H
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9I
   CLEARANCE & PAYMENT HELPERS
========================================================= */


/* ---------------------------------------------------------
   CLEARANCE STATUS
--------------------------------------------------------- */

function getATCRSClearanceStatus(status) {

    if (!status) {
        return "PENDING";
    }

    const normalized =
        status.toString()
            .trim()
            .toUpperCase();

    const allowedStatuses = [
        "CLEARED",
        "PENDING",
        "ON HOLD",
        "NOT CLEARED",
        "REVIEW"
    ];

    if (allowedStatuses.includes(normalized)) {
        return normalized;
    }

    return "PENDING";
}


/* ---------------------------------------------------------
   UPDATE CLEARANCE STATUS
--------------------------------------------------------- */

function updateATCRSClearanceStatus(element, status) {

    if (!element) {
        return;
    }

    const finalStatus =
        getATCRSClearanceStatus(status);

    element.textContent = finalStatus;

    element.classList.remove(
        "status-cleared",
        "status-pending",
        "status-on-hold",
        "status-not-cleared",
        "status-review"
    );

    const className =
        finalStatus
            .toLowerCase()
            .replace(/\s+/g, "-");

    element.classList.add(
        "status-" + className
    );
}


/* ---------------------------------------------------------
   INITIALIZE CLEARANCE STATUS
--------------------------------------------------------- */

function initializeClearanceStatuses() {

    const elements =
        document.querySelectorAll(
            "[data-clearance-status]"
        );

    elements.forEach(function (element) {

        updateATCRSClearanceStatus(
            element,
            element.dataset.clearanceStatus
        );

    });
}


/* ---------------------------------------------------------
   PAYMENT AMOUNT FORMATTER
--------------------------------------------------------- */

function formatATCRSPaymentAmount(amount) {

    const numericAmount =
        parseFloat(
            String(amount)
                .replace(/[^0-9.-]/g, "")
        );

    if (isNaN(numericAmount)) {
        return "₱0.00";
    }

    return new Intl.NumberFormat(
        "en-PH",
        {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2
        }
    ).format(numericAmount);
}


/* ---------------------------------------------------------
   INITIALIZE PAYMENT AMOUNTS
--------------------------------------------------------- */

function initializePaymentAmounts() {

    const elements =
        document.querySelectorAll(
            "[data-payment-amount]"
        );

    elements.forEach(function (element) {

        const amount =
            element.dataset.paymentAmount;

        element.textContent =
            formatATCRSPaymentAmount(amount);

    });
}


/* ---------------------------------------------------------
   PAYMENT STATUS
--------------------------------------------------------- */

function getATCRSPaymentStatus(status) {

    if (!status) {
        return "PENDING";
    }

    const normalized =
        status.toString()
            .trim()
            .toUpperCase();

    const allowedStatuses = [
        "PAID",
        "PENDING",
        "UNPAID",
        "PROCESSING",
        "FAILED",
        "REFUNDED"
    ];

    if (allowedStatuses.includes(normalized)) {
        return normalized;
    }

    return "PENDING";
}


/* ---------------------------------------------------------
   UPDATE PAYMENT STATUS
--------------------------------------------------------- */

function updateATCRSPaymentStatus(element, status) {

    if (!element) {
        return;
    }

    const finalStatus =
        getATCRSPaymentStatus(status);

    element.textContent = finalStatus;

    element.classList.remove(
        "status-paid",
        "status-pending",
        "status-unpaid",
        "status-processing",
        "status-failed",
        "status-refunded"
    );

    element.classList.add(
        "status-" +
        finalStatus.toLowerCase()
    );
}


/* ---------------------------------------------------------
   INITIALIZE PAYMENT STATUS
--------------------------------------------------------- */

function initializePaymentStatuses() {

    const elements =
        document.querySelectorAll(
            "[data-payment-status]"
        );

    elements.forEach(function (element) {

        updateATCRSPaymentStatus(
            element,
            element.dataset.paymentStatus
        );

    });
}


/* ---------------------------------------------------------
   PAYMENT METHOD SELECTOR
--------------------------------------------------------- */

function initializePaymentMethodSelector() {

    const selectors =
        document.querySelectorAll(
            "#paymentMethod, " +
            "[name='paymentMethod'], " +
            "[data-payment-method]"
        );

    selectors.forEach(function (selector) {

        selector.addEventListener(
            "change",
            function () {

                updatePaymentMethodInformation(
                    selector.value
                );

            }
        );

        if (selector.value) {

            updatePaymentMethodInformation(
                selector.value
            );

        }

    });
}


/* ---------------------------------------------------------
   PAYMENT METHOD INFORMATION
--------------------------------------------------------- */

function updatePaymentMethodInformation(method) {

    const information =
        document.querySelector(
            "[data-payment-method-info]"
        );

    if (!information) {
        return;
    }

    if (!method) {

        information.textContent =
            "Select a payment method.";

        return;
    }

    const normalized =
        method
            .toString()
            .trim()
            .toLowerCase();

    let message =
        "Follow the payment instructions provided by the Registrar's Office.";

    if (
        normalized.includes("cash")
    ) {

        message =
            "Please proceed to the designated payment office and keep your official receipt.";

    } else if (
        normalized.includes("bank")
    ) {

        message =
            "Use the approved school bank payment channel and retain your transaction reference.";

    } else if (
        normalized.includes("online") ||
        normalized.includes("gcash") ||
        normalized.includes("electronic")
    ) {

        message =
            "Complete the online payment using the approved payment channel and keep your transaction reference.";

    }

    information.textContent = message;
    information.style.display = "block";
}


/* ---------------------------------------------------------
   PAYMENT RECEIPT REFERENCE
--------------------------------------------------------- */

function generatePaymentReference() {

    const date =
        new Date();

    const year =
        date.getFullYear();

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return "PAY-" +
        year +
        "-" +
        random;
}


/* ---------------------------------------------------------
   INITIALIZE RECEIPT REFERENCE BUTTONS
--------------------------------------------------------- */

function initializePaymentReferenceButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-generate-payment-reference]"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const reference =
                    generatePaymentReference();

                const targetSelector =
                    button.dataset.target;

                let target = null;

                if (targetSelector) {

                    target =
                        document.querySelector(
                            targetSelector
                        );

                }

                if (!target) {

                    target =
                        document.querySelector(
                            "#paymentReference, " +
                            "[name='paymentReference']"
                        );

                }

                if (target) {
                    target.value = reference;
                }

                showSuccessMessage(
                    "Payment reference generated: " +
                    reference
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   PAYMENT FORM VALIDATION
--------------------------------------------------------- */

function initializePaymentForms() {

    const forms =
        document.querySelectorAll(
            ".payment-form, " +
            "#paymentForm, " +
            "form[data-payment-form]"
        );

    forms.forEach(function (form) {

        if (form.dataset.atcrsPaymentInitialized) {
            return;
        }

        form.dataset.atcrsPaymentInitialized =
            "true";

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const requiredFields =
                    form.querySelectorAll(
                        "[required]"
                    );

                let valid = true;

                requiredFields.forEach(
                    function (field) {

                        if (!field.value.trim()) {

                            valid = false;

                            field.classList.add(
                                "input-error"
                            );

                        } else {

                            field.classList.remove(
                                "input-error"
                            );

                        }

                    }
                );

                if (!valid) {

                    showErrorMessage(
                        "Please complete all required payment fields."
                    );

                    return;
                }

                showSuccessMessage(
                    "Payment information submitted successfully."
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9I
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeClearanceStatuses();
        initializePaymentAmounts();
        initializePaymentStatuses();
        initializePaymentMethodSelector();
        initializePaymentReferenceButtons();
        initializePaymentForms();

    }
);


/* =========================================================
   END OF PART 9I
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9J
   ARCHIVES, DOCUMENT RELEASE & RECORD MANAGEMENT
========================================================= */


/* ---------------------------------------------------------
   ARCHIVE SEARCH
--------------------------------------------------------- */

function initializeArchiveSearch() {

    const searchInputs =
        document.querySelectorAll(
            "#archiveSearch, " +
            "[name='archiveSearch'], " +
            "[data-archive-search]"
        );

    searchInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                const searchValue =
                    input.value
                        .trim()
                        .toLowerCase();

                const archiveRows =
                    document.querySelectorAll(
                        "[data-archive-record]"
                    );

                archiveRows.forEach(function (record) {

                    const text =
                        record.textContent
                            .trim()
                            .toLowerCase();

                    record.style.display =
                        !searchValue ||
                        text.includes(searchValue)
                            ? ""
                            : "none";

                });

            }
        );

    });
}


/* ---------------------------------------------------------
   ARCHIVE STATUS
--------------------------------------------------------- */

function initializeArchiveStatuses() {

    const elements =
        document.querySelectorAll(
            "[data-archive-status]"
        );

    elements.forEach(function (element) {

        const status =
            element.dataset.archiveStatus ||
            "ARCHIVED";

        element.textContent =
            status.toUpperCase();

    });
}


/* ---------------------------------------------------------
   DOCUMENT RELEASE STATUS
--------------------------------------------------------- */

function getATCRSReleaseStatus(status) {

    if (!status) {
        return "PENDING";
    }

    const normalized =
        status
            .toString()
            .trim()
            .toUpperCase();

    const allowedStatuses = [
        "PENDING",
        "PROCESSING",
        "READY FOR RELEASE",
        "RELEASED",
        "CLAIMED",
        "CANCELLED"
    ];

    if (allowedStatuses.includes(normalized)) {
        return normalized;
    }

    return "PENDING";
}


/* ---------------------------------------------------------
   UPDATE DOCUMENT RELEASE STATUS
--------------------------------------------------------- */

function updateATCRSReleaseStatus(
    element,
    status
) {

    if (!element) {
        return;
    }

    const finalStatus =
        getATCRSReleaseStatus(status);

    element.textContent =
        finalStatus;

    element.classList.remove(
        "status-pending",
        "status-processing",
        "status-ready",
        "status-released",
        "status-claimed",
        "status-cancelled"
    );

    let className =
        finalStatus
            .toLowerCase()
            .replace(/\s+/g, "-");

    if (finalStatus === "READY FOR RELEASE") {
        className = "ready";
    }

    element.classList.add(
        "status-" + className
    );
}


/* ---------------------------------------------------------
   INITIALIZE RELEASE STATUS
--------------------------------------------------------- */

function initializeReleaseStatuses() {

    const elements =
        document.querySelectorAll(
            "[data-release-status]"
        );

    elements.forEach(function (element) {

        updateATCRSReleaseStatus(
            element,
            element.dataset.releaseStatus
        );

    });
}


/* ---------------------------------------------------------
   RELEASE DOCUMENT ACTION
--------------------------------------------------------- */

function releaseATCRSDocument(
    documentName,
    referenceNumber
) {

    const name =
        documentName ||
        "Requested document";

    const reference =
        referenceNumber ||
        "N/A";

    showATCRSConfirmation(
        "DOCUMENT RELEASE",
        "Are you sure you want to mark " +
        name +
        " as released?",
        "RELEASE",
        "CANCEL",
        function () {

            showSuccessMessage(
                name +
                " (" +
                reference +
                ") has been marked as released."
            );

            const releaseElements =
                document.querySelectorAll(
                    "[data-release-reference]"
                );

            releaseElements.forEach(
                function (element) {

                    if (
                        element.textContent
                            .trim() === reference
                    ) {

                        const row =
                            element.closest("tr");

                        if (row) {

                            const status =
                                row.querySelector(
                                    "[data-release-status]"
                                );

                            if (status) {

                                updateATCRSReleaseStatus(
                                    status,
                                    "RELEASED"
                                );

                            }

                        }

                    }

                }
            );

        }
    );
}


/* ---------------------------------------------------------
   INITIALIZE RELEASE BUTTONS
--------------------------------------------------------- */

function initializeReleaseButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-release-document], " +
            ".release-document-btn, " +
            ".btn-release"
        );

    buttons.forEach(function (button) {

        if (
            button.dataset.atcrsReleaseInitialized
        ) {
            return;
        }

        button.dataset.atcrsReleaseInitialized =
            "true";

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const documentName =
                    button.dataset.documentName ||
                    "Requested document";

                const reference =
                    button.dataset.reference ||
                    button.dataset.releaseReference ||
                    "N/A";

                releaseATCRSDocument(
                    documentName,
                    reference
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   RECORD ARCHIVE ACTION
--------------------------------------------------------- */

function archiveATCRSRecord(
    recordName,
    reference
) {

    showATCRSConfirmation(
        "ARCHIVE RECORD",
        "Are you sure you want to archive " +
        (recordName || "this record") +
        "?",
        "ARCHIVE",
        "CANCEL",
        function () {

            showSuccessMessage(
                "Record " +
                (reference || "") +
                " has been archived successfully."
            );

        }
    );
}


/* ---------------------------------------------------------
   INITIALIZE ARCHIVE BUTTONS
--------------------------------------------------------- */

function initializeArchiveButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-archive-record], " +
            ".archive-record-btn, " +
            ".btn-archive"
        );

    buttons.forEach(function (button) {

        if (
            button.dataset.atcrsArchiveInitialized
        ) {
            return;
        }

        button.dataset.atcrsArchiveInitialized =
            "true";

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const recordName =
                    button.dataset.recordName ||
                    "this record";

                const reference =
                    button.dataset.reference ||
                    "";

                archiveATCRSRecord(
                    recordName,
                    reference
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9J
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeArchiveSearch();
        initializeArchiveStatuses();
        initializeReleaseStatuses();
        initializeReleaseButtons();
        initializeArchiveButtons();

    }
);


/* =========================================================
   END OF PART 9J
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9K
   VERIFIER & CREDENTIAL VERIFICATION FUNCTIONS
========================================================= */


/* ---------------------------------------------------------
   VERIFICATION CODE VALIDATION
--------------------------------------------------------- */

function validateATCRSVerificationCode(code) {

    if (!code) {
        return false;
    }

    const enteredCode =
        code.toString().trim();

    /*
       DEMO VERIFICATION CODE
       For prototype/testing purposes only.
    */

    const validCodes = [
        "ATCRS2026"
    ];

    return validCodes.includes(
        enteredCode.toUpperCase()
    );
}


/* ---------------------------------------------------------
   VERIFICATION RESULT DISPLAY
--------------------------------------------------------- */

function displayATCRSVerificationResult(
    resultContainer,
    isValid,
    details
) {

    if (!resultContainer) {
        return;
    }

    if (isValid) {

        resultContainer.innerHTML = `
            <div class="verification-result success">

                <div class="verification-result-icon">
                    <i class="fas fa-check-circle"></i>
                </div>

                <div class="verification-result-content">

                    <h3>CREDENTIAL VERIFIED</h3>

                    <p>
                        The submitted credential information
                        has been successfully verified.
                    </p>

                    ${
                        details
                            ? `
                                <div class="verification-details">
                                    ${details}
                                </div>
                              `
                            : ""
                    }

                </div>

            </div>
        `;

    } else {

        resultContainer.innerHTML = `
            <div class="verification-result error">

                <div class="verification-result-icon">
                    <i class="fas fa-times-circle"></i>
                </div>

                <div class="verification-result-content">

                    <h3>VERIFICATION FAILED</h3>

                    <p>
                        The submitted verification information
                        could not be validated.
                    </p>

                </div>

            </div>
        `;
    }

    resultContainer.style.display = "block";
}


/* ---------------------------------------------------------
   VERIFICATION FORM
--------------------------------------------------------- */

function initializeVerificationForms() {

    const forms =
        document.querySelectorAll(
            ".verification-form, " +
            "#verificationForm, " +
            "form[data-verification-form]"
        );

    forms.forEach(function (form) {

        if (
            form.dataset.atcrsVerificationInitialized
        ) {
            return;
        }

        form.dataset.atcrsVerificationInitialized =
            "true";

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const codeInput =
                    form.querySelector(
                        "#verificationCode, " +
                        "[name='verificationCode'], " +
                        "[name='verification_code'], " +
                        "[data-verification-code]"
                    );

                if (!codeInput) {

                    showErrorMessage(
                        "Verification code field was not found."
                    );

                    return;
                }

                const code =
                    codeInput.value.trim();

                if (!code) {

                    codeInput.classList.add(
                        "input-error"
                    );

                    showErrorMessage(
                        "Please enter a verification code."
                    );

                    codeInput.focus();

                    return;
                }

                codeInput.classList.remove(
                    "input-error"
                );

                const submitButton =
                    form.querySelector(
                        "button[type='submit'], " +
                        "input[type='submit']"
                    );

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.dataset.originalText =
                        submitButton.textContent;

                    submitButton.textContent =
                        "VERIFYING...";
                }

                const resultContainer =
                    form.querySelector(
                        ".verification-result, " +
                        "#verificationResult, " +
                        "[data-verification-result]"
                    );

                setTimeout(function () {

                    const isValid =
                        validateATCRSVerificationCode(
                            code
                        );

                    if (isValid) {

                        displayATCRSVerificationResult(
                            resultContainer,
                            true,
                            `
                                <p>
                                    <strong>Status:</strong>
                                    Verified
                                </p>

                                <p>
                                    <strong>Verification Code:</strong>
                                    ${escapeHTML(code)}
                                </p>

                                <p>
                                    <strong>System:</strong>
                                    ATCRS
                                </p>
                            `
                        );

                        showSuccessMessage(
                            "Credential verified successfully."
                        );

                    } else {

                        displayATCRSVerificationResult(
                            resultContainer,
                            false
                        );

                        showErrorMessage(
                            "Credential verification failed."
                        );

                    }

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            submitButton.dataset.originalText ||
                            "VERIFY";

                    }

                }, 700);

            }
        );

    });
}


/* ---------------------------------------------------------
   VERIFICATION HISTORY FILTER
--------------------------------------------------------- */

function initializeVerificationHistoryFilter() {

    const searchInputs =
        document.querySelectorAll(
            "#verificationHistorySearch, " +
            "[name='verificationHistorySearch'], " +
            "[data-verification-history-search]"
        );

    searchInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                const searchValue =
                    input.value
                        .trim()
                        .toLowerCase();

                const records =
                    document.querySelectorAll(
                        "[data-verification-record]"
                    );

                records.forEach(function (record) {

                    const text =
                        record.textContent
                            .trim()
                            .toLowerCase();

                    record.style.display =
                        !searchValue ||
                        text.includes(searchValue)
                            ? ""
                            : "none";

                });

            }
        );

    });
}


/* ---------------------------------------------------------
   VERIFICATION STATUS ELEMENTS
--------------------------------------------------------- */

function initializeVerificationStatuses() {

    const elements =
        document.querySelectorAll(
            "[data-verification-status]"
        );

    elements.forEach(function (element) {

        const status =
            element.dataset.verificationStatus ||
            "PENDING";

        const normalizedStatus =
            status
                .toString()
                .trim()
                .toUpperCase();

        element.textContent =
            normalizedStatus;

        element.classList.remove(
            "status-verified",
            "status-pending",
            "status-failed",
            "status-rejected",
            "status-processing"
        );

        let className = "pending";

        if (
            normalizedStatus === "VERIFIED"
        ) {
            className = "verified";
        }

        if (
            normalizedStatus === "FAILED"
        ) {
            className = "failed";
        }

        if (
            normalizedStatus === "REJECTED"
        ) {
            className = "rejected";
        }

        if (
            normalizedStatus === "PROCESSING"
        ) {
            className = "processing";
        }

        element.classList.add(
            "status-" + className
        );

    });
}


/* ---------------------------------------------------------
   VERIFIER ACCOUNT INFORMATION
--------------------------------------------------------- */

function initializeVerifierAccount() {

    const username =
        sessionStorage.getItem(
            "verifierUsername"
        );

    if (!username) {
        return;
    }

    const elements =
        document.querySelectorAll(
            "[data-verifier-username]"
        );

    elements.forEach(function (element) {

        element.textContent =
            username;

    });
}


/* ---------------------------------------------------------
   VERIFIER LOGOUT
--------------------------------------------------------- */

function initializeVerifierLogout() {

    const buttons =
        document.querySelectorAll(
            ".verifier-logout, " +
            "[data-verifier-logout]"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showATCRSConfirmation(
                    "LOG OUT",
                    "Are you sure you want to log out of the Verifier Portal?",
                    "LOG OUT",
                    "CANCEL",
                    function () {

                        sessionStorage.removeItem(
                            "verifierLoggedIn"
                        );

                        sessionStorage.removeItem(
                            "verifierUsername"
                        );

                        window.location.href =
                            "verifier-login.html";

                    }
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9K
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeVerificationForms();
        initializeVerificationHistoryFilter();
        initializeVerificationStatuses();
        initializeVerifierAccount();
        initializeVerifierLogout();

    }
);


/* =========================================================
   END OF PART 9K
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9L
   STUDENT PROFILE & ACADEMIC RECORD FUNCTIONS
========================================================= */


/* ---------------------------------------------------------
   LOAD STUDENT ID
--------------------------------------------------------- */

function initializeStudentProfile() {

    const studentID =
        sessionStorage.getItem("studentId");

    if (!studentID) {
        return;
    }

    const elements =
        document.querySelectorAll(
            "[data-student-id]"
        );

    elements.forEach(function (element) {

        element.textContent =
            studentID;

    });
}


/* ---------------------------------------------------------
   STUDENT NAME DISPLAY
--------------------------------------------------------- */

function initializeStudentName() {

    const studentName =
        sessionStorage.getItem("studentName");

    if (!studentName) {
        return;
    }

    const elements =
        document.querySelectorAll(
            "[data-student-name]"
        );

    elements.forEach(function (element) {

        element.textContent =
            studentName;

    });
}


/* ---------------------------------------------------------
   STUDENT PROFILE DISPLAY
--------------------------------------------------------- */

function initializeStudentProfileDetails() {

    const studentID =
        sessionStorage.getItem("studentId");

    const studentName =
        sessionStorage.getItem("studentName");

    const idElements =
        document.querySelectorAll(
            "[data-profile-student-id]"
        );

    idElements.forEach(function (element) {

        if (studentID) {
            element.textContent = studentID;
        }

    });

    const nameElements =
        document.querySelectorAll(
            "[data-profile-student-name]"
        );

    nameElements.forEach(function (element) {

        if (studentName) {
            element.textContent = studentName;
        }

    });
}


/* ---------------------------------------------------------
   PROFILE FORM
--------------------------------------------------------- */

function initializeStudentProfileForm() {

    const forms =
        document.querySelectorAll(
            ".student-profile-form, " +
            "#studentProfileForm, " +
            "form[data-student-profile]"
        );

    forms.forEach(function (form) {

        if (form.dataset.atcrsProfileInitialized) {
            return;
        }

        form.dataset.atcrsProfileInitialized =
            "true";

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const requiredFields =
                    form.querySelectorAll(
                        "[required]"
                    );

                let valid = true;

                requiredFields.forEach(
                    function (field) {

                        if (!field.value.trim()) {

                            valid = false;

                            field.classList.add(
                                "input-error"
                            );

                        } else {

                            field.classList.remove(
                                "input-error"
                            );

                        }

                    }
                );

                if (!valid) {

                    showErrorMessage(
                        "Please complete all required profile fields."
                    );

                    return;
                }

                const nameField =
                    form.querySelector(
                        "[name='fullName'], " +
                        "[name='name'], " +
                        "#fullName, " +
                        "#studentName"
                    );

                if (nameField) {

                    const name =
                        nameField.value.trim();

                    if (
                        name.length < 30 ||
                        name.length > 50
                    ) {

                        nameField.classList.add(
                            "input-error"
                        );

                        showErrorMessage(
                            "Full name should contain approximately 30–50 characters."
                        );

                        nameField.focus();

                        return;
                    }

                    sessionStorage.setItem(
                        "studentName",
                        name
                    );

                }

                showSuccessMessage(
                    "Student profile updated successfully."
                );

                initializeStudentName();
                initializeStudentProfileDetails();

            }
        );

    });
}


/* ---------------------------------------------------------
   ACADEMIC RECORD SEARCH
--------------------------------------------------------- */

function initializeAcademicRecordSearch() {

    const inputs =
        document.querySelectorAll(
            "#academicRecordSearch, " +
            "[name='academicRecordSearch'], " +
            "[data-academic-search]"
        );

    inputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                const searchValue =
                    input.value
                        .trim()
                        .toLowerCase();

                const records =
                    document.querySelectorAll(
                        "[data-academic-record]"
                    );

                records.forEach(function (record) {

                    const text =
                        record.textContent
                            .trim()
                            .toLowerCase();

                    record.style.display =
                        !searchValue ||
                        text.includes(searchValue)
                            ? ""
                            : "none";

                });

            }
        );

    });
}


/* ---------------------------------------------------------
   ACADEMIC RECORD FILTER
--------------------------------------------------------- */

function initializeAcademicRecordFilter() {

    const filters =
        document.querySelectorAll(
            "#academicRecordFilter, " +
            "[name='academicRecordFilter'], " +
            "[data-academic-filter]"
        );

    filters.forEach(function (filter) {

        filter.addEventListener(
            "change",
            function () {

                const selected =
                    filter.value
                        .trim()
                        .toLowerCase();

                const records =
                    document.querySelectorAll(
                        "[data-academic-record]"
                    );

                records.forEach(function (record) {

                    const recordType =
                        (
                            record.dataset.recordType ||
                            record.textContent
                        )
                            .toLowerCase();

                    record.style.display =
                        !selected ||
                        selected === "all" ||
                        recordType.includes(selected)
                            ? ""
                            : "none";

                });

            }
        );

    });
}


/* ---------------------------------------------------------
   ACADEMIC RECORD EMPTY STATE
--------------------------------------------------------- */

function initializeAcademicRecordEmptyState() {

    const containers =
        document.querySelectorAll(
            "[data-academic-record-container]"
        );

    containers.forEach(function (container) {

        const records =
            container.querySelectorAll(
                "[data-academic-record]"
            );

        const visibleRecords =
            Array.from(records).filter(
                function (record) {
                    return record.style.display !== "none";
                }
            );

        const emptyState =
            container.querySelector(
                "[data-academic-empty]"
            );

        if (!emptyState) {
            return;
        }

        emptyState.style.display =
            visibleRecords.length === 0
                ? "block"
                : "none";

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9L
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeStudentProfile();
        initializeStudentName();
        initializeStudentProfileDetails();
        initializeStudentProfileForm();

        initializeAcademicRecordSearch();
        initializeAcademicRecordFilter();
        initializeAcademicRecordEmptyState();

    }
);


/* =========================================================
   END OF PART 9L
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9M
   STUDENT REQUEST TRACKING & PROGRESS FUNCTIONS
========================================================= */


/* ---------------------------------------------------------
   REQUEST TRACKING DATA
--------------------------------------------------------- */

function getATCRSRequestTrackingStatus(status) {

    if (!status) {
        return "PENDING";
    }

    const normalized =
        status
            .toString()
            .trim()
            .toUpperCase();

    const allowedStatuses = [
        "PENDING",
        "PROCESSING",
        "FOR REVIEW",
        "APPROVED",
        "READY FOR RELEASE",
        "RELEASED",
        "COMPLETED",
        "REJECTED",
        "CANCELLED"
    ];

    if (allowedStatuses.includes(normalized)) {
        return normalized;
    }

    return "PENDING";
}


/* ---------------------------------------------------------
   REQUEST PROGRESS PERCENTAGE
--------------------------------------------------------- */

function getATCRSRequestProgress(status) {

    const finalStatus =
        getATCRSRequestTrackingStatus(status);

    const progressMap = {
        "PENDING": 20,
        "PROCESSING": 40,
        "FOR REVIEW": 50,
        "APPROVED": 70,
        "READY FOR RELEASE": 85,
        "RELEASED": 100,
        "COMPLETED": 100,
        "REJECTED": 0,
        "CANCELLED": 0
    };

    return progressMap[finalStatus] || 0;
}


/* ---------------------------------------------------------
   UPDATE PROGRESS BAR
--------------------------------------------------------- */

function updateATCRSRequestProgress(
    progressElement,
    status
) {

    if (!progressElement) {
        return;
    }

    const percentage =
        getATCRSRequestProgress(status);

    progressElement.style.width =
        percentage + "%";

    progressElement.setAttribute(
        "aria-valuenow",
        percentage
    );

    progressElement.setAttribute(
        "aria-valuemin",
        "0"
    );

    progressElement.setAttribute(
        "aria-valuemax",
        "100"
    );
}


/* ---------------------------------------------------------
   INITIALIZE REQUEST PROGRESS BARS
--------------------------------------------------------- */

function initializeRequestProgressBars() {

    const progressElements =
        document.querySelectorAll(
            "[data-request-progress]"
        );

    progressElements.forEach(function (element) {

        const status =
            element.dataset.requestProgress ||
            element.dataset.status ||
            "PENDING";

        updateATCRSRequestProgress(
            element,
            status
        );

    });
}


/* ---------------------------------------------------------
   REQUEST TIMELINE
--------------------------------------------------------- */

function initializeRequestTimeline() {

    const timelines =
        document.querySelectorAll(
            "[data-request-timeline]"
        );

    timelines.forEach(function (timeline) {

        const items =
            timeline.querySelectorAll(
                "[data-timeline-status]"
            );

        if (!items.length) {
            return;
        }

        let activeFound = false;

        items.forEach(function (item) {

            const status =
                item.dataset.timelineStatus
                    .toString()
                    .trim()
                    .toUpperCase();

            item.classList.remove(
                "completed",
                "active",
                "pending"
            );

            if (
                status === "COMPLETED" ||
                status === "RELEASED"
            ) {

                item.classList.add(
                    "completed"
                );

            } else if (!activeFound) {

                item.classList.add(
                    "active"
                );

                activeFound = true;

            } else {

                item.classList.add(
                    "pending"
                );

            }

        });

    });
}


/* ---------------------------------------------------------
   REQUEST STATUS MESSAGE
--------------------------------------------------------- */

function updateATCRSRequestStatusMessage(
    status
) {

    const messageElement =
        document.querySelector(
            "[data-request-status-message]"
        );

    if (!messageElement) {
        return;
    }

    const finalStatus =
        getATCRSRequestTrackingStatus(status);

    const messages = {

        "PENDING":
            "Your request has been received and is waiting for processing.",

        "PROCESSING":
            "Your request is currently being processed by the Registrar's Office.",

        "FOR REVIEW":
            "Your request is currently under review.",

        "APPROVED":
            "Your request has been approved and is moving to the next processing stage.",

        "READY FOR RELEASE":
            "Your requested document is ready for release.",

        "RELEASED":
            "Your requested document has been released.",

        "COMPLETED":
            "Your document request has been completed successfully.",

        "REJECTED":
            "Your request was rejected. Please contact the Registrar's Office for assistance.",

        "CANCELLED":
            "Your request has been cancelled."
    };

    messageElement.textContent =
        messages[finalStatus] ||
        "Request status information is currently unavailable.";

    messageElement.style.display =
        "block";
}


/* ---------------------------------------------------------
   REQUEST TRACKING NUMBER
--------------------------------------------------------- */

function initializeRequestTrackingNumber() {

    const elements =
        document.querySelectorAll(
            "[data-request-tracking-number]"
        );

    const reference =
        sessionStorage.getItem(
            "atcrsRequestReference"
        );

    elements.forEach(function (element) {

        if (reference) {

            element.textContent =
                reference;

        } else {

            element.textContent =
                "NO ACTIVE REQUEST";

        }

    });
}


/* ---------------------------------------------------------
   REQUEST TRACKING FORM
--------------------------------------------------------- */

function initializeRequestTrackingForm() {

    const forms =
        document.querySelectorAll(
            "#requestTrackingForm, " +
            ".request-tracking-form, " +
            "form[data-request-tracking]"
        );

    forms.forEach(function (form) {

        if (
            form.dataset.atcrsTrackingInitialized
        ) {
            return;
        }

        form.dataset.atcrsTrackingInitialized =
            "true";

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const input =
                    form.querySelector(
                        "#trackingNumber, " +
                        "[name='trackingNumber'], " +
                        "[name='referenceNumber'], " +
                        "[data-tracking-number]"
                    );

                if (!input) {

                    showErrorMessage(
                        "Tracking number field was not found."
                    );

                    return;
                }

                const value =
                    input.value.trim();

                if (!value) {

                    input.classList.add(
                        "input-error"
                    );

                    showErrorMessage(
                        "Please enter your tracking number."
                    );

                    input.focus();

                    return;
                }

                input.classList.remove(
                    "input-error"
                );

                const result =
                    document.querySelector(
                        "[data-request-tracking-result]"
                    );

                if (result) {

                    result.style.display =
                        "block";

                    result.innerHTML = `
                        <div class="info-box">

                            <strong>
                                REQUEST FOUND
                            </strong>

                            <p>
                                Tracking Number:
                                <strong>
                                    ${escapeHTML(value)}
                                </strong>
                            </p>

                            <p>
                                Status:
                                <strong>
                                    PROCESSING
                                </strong>
                            </p>

                        </div>
                    `;

                }

                updateATCRSRequestStatusMessage(
                    "PROCESSING"
                );

                showInfoMessage(
                    "Request tracking information loaded."
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   REQUEST RECEIPT
--------------------------------------------------------- */

function initializeRequestReceipt() {

    const buttons =
        document.querySelectorAll(
            "[data-request-receipt]"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const reference =
                    sessionStorage.getItem(
                        "atcrsRequestReference"
                    ) ||
                    button.dataset.reference ||
                    "N/A";

                createATCRSModal(
                    "REQUEST RECEIPT",
                    `
                        <div class="receipt-box">

                            <p>
                                <strong>
                                    ATCRS
                                </strong>
                            </p>

                            <p>
                                Automated Transcript and
                                Credential Retrieval System
                            </p>

                            <hr>

                            <p>
                                <strong>
                                    Reference Number:
                                </strong>
                                ${escapeHTML(reference)}
                            </p>

                            <p>
                                <strong>
                                    Status:
                                </strong>
                                PENDING
                            </p>

                            <p>
                                Keep this reference number
                                for future tracking.
                            </p>

                        </div>
                    `
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9M
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeRequestProgressBars();
        initializeRequestTimeline();
        initializeRequestTrackingNumber();
        initializeRequestTrackingForm();
        initializeRequestReceipt();

    }
);


/* =========================================================
   END OF PART 9M
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9N
   NOTIFICATIONS, ALERTS & SYSTEM MESSAGES
========================================================= */


/* ---------------------------------------------------------
   SYSTEM NOTIFICATION DATA
--------------------------------------------------------- */

function createATCRSNotification(
    title,
    message,
    type = "info"
) {

    const notification = document.createElement("div");

    notification.className =
        "atcrs-system-notification " +
        "notification-" +
        type;

    notification.innerHTML = `
        <div class="notification-icon">

            <i class="fas ${
                type === "success"
                    ? "fa-check-circle"
                    : type === "warning"
                        ? "fa-exclamation-triangle"
                        : type === "error"
                            ? "fa-times-circle"
                            : "fa-info-circle"
            }"></i>

        </div>

        <div class="notification-content">

            <strong>
                ${escapeHTML(title || "ATCRS")}
            </strong>

            <p>
                ${escapeHTML(message || "")}
            </p>

        </div>

        <button
            type="button"
            class="notification-close"
            aria-label="Close notification"
        >
            &times;
        </button>
    `;

    const closeButton =
        notification.querySelector(
            ".notification-close"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                notification.classList.remove(
                    "show"
                );

                setTimeout(function () {

                    if (notification.parentNode) {
                        notification.parentNode.removeChild(
                            notification
                        );
                    }

                }, 250);

            }
        );

    }

    return notification;
}


/* ---------------------------------------------------------
   SHOW SYSTEM NOTIFICATION
--------------------------------------------------------- */

function showATCRSSystemNotification(
    title,
    message,
    type = "info",
    duration = 5000
) {

    const container =
        getNotificationContainer();

    if (!container) {
        return;
    }

    const notification =
        createATCRSNotification(
            title,
            message,
            type
        );

    container.appendChild(
        notification
    );

    requestAnimationFrame(function () {

        notification.classList.add(
            "show"
        );

    });

    if (duration > 0) {

        setTimeout(function () {

            if (
                notification &&
                notification.parentNode
            ) {

                notification.classList.remove(
                    "show"
                );

                setTimeout(function () {

                    if (
                        notification.parentNode
                    ) {

                        notification.parentNode.removeChild(
                            notification
                        );

                    }

                }, 250);

            }

        }, duration);

    }
}


/* ---------------------------------------------------------
   NOTIFICATION BUTTONS
--------------------------------------------------------- */

function initializeNotificationButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-notification], " +
            ".notification-btn, " +
            ".show-notification"
        );

    buttons.forEach(function (button) {

        if (
            button.dataset.atcrsNotificationInitialized
        ) {
            return;
        }

        button.dataset.atcrsNotificationInitialized =
            "true";

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const title =
                    button.dataset.notificationTitle ||
                    "ATCRS NOTIFICATION";

                const message =
                    button.dataset.notification ||
                    "You have a new system notification.";

                const type =
                    button.dataset.notificationType ||
                    "info";

                showATCRSSystemNotification(
                    title,
                    message,
                    type
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   SYSTEM ALERTS
--------------------------------------------------------- */

function initializeSystemAlerts() {

    const alerts =
        document.querySelectorAll(
            "[data-system-alert]"
        );

    alerts.forEach(function (alert) {

        if (
            alert.dataset.atcrsAlertInitialized
        ) {
            return;
        }

        alert.dataset.atcrsAlertInitialized =
            "true";

        const closeButton =
            alert.querySelector(
                ".alert-close, " +
                "[data-close-alert]"
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    alert.classList.add(
                        "hidden"
                    );

                    setTimeout(function () {

                        alert.style.display =
                            "none";

                    }, 250);

                }
            );

        }

    });
}


/* ---------------------------------------------------------
   NOTIFICATION COUNTER
--------------------------------------------------------- */

function updateATCRSNotificationCount() {

    const notifications =
        document.querySelectorAll(
            "[data-notification-item]"
        );

    const unread =
        Array.from(notifications).filter(
            function (notification) {

                return (
                    !notification.classList.contains(
                        "read"
                    )
                );

            }
        ).length;

    const counters =
        document.querySelectorAll(
            "[data-notification-count]"
        );

    counters.forEach(function (counter) {

        counter.textContent =
            unread;

        counter.style.display =
            unread > 0
                ? ""
                : "none";

    });
}


/* ---------------------------------------------------------
   MARK NOTIFICATION AS READ
--------------------------------------------------------- */

function initializeNotificationItems() {

    const items =
        document.querySelectorAll(
            "[data-notification-item]"
        );

    items.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                item.classList.add(
                    "read"
                );

                updateATCRSNotificationCount();

            }
        );

    });

    updateATCRSNotificationCount();
}


/* ---------------------------------------------------------
   CLEAR ALL NOTIFICATIONS
--------------------------------------------------------- */

function initializeClearNotifications() {

    const buttons =
        document.querySelectorAll(
            "[data-clear-notifications]"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const notifications =
                    document.querySelectorAll(
                        "[data-notification-item]"
                    );

                notifications.forEach(
                    function (notification) {

                        notification.classList.add(
                            "read"
                        );

                    }
                );

                updateATCRSNotificationCount();

                showInfoMessage(
                    "All notifications have been marked as read."
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9N
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeNotificationButtons();
        initializeSystemAlerts();
        initializeNotificationItems();
        initializeClearNotifications();

    }
);


/* =========================================================
   END OF PART 9N
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9O
   REPORTS, STATISTICS & DASHBOARD DATA
========================================================= */


/* ---------------------------------------------------------
   FORMAT NUMBER
--------------------------------------------------------- */

function formatATCRSNumber(value) {

    const number =
        Number(value);

    if (isNaN(number)) {
        return "0";
    }

    return new Intl.NumberFormat(
        "en-PH"
    ).format(number);
}


/* ---------------------------------------------------------
   UPDATE DASHBOARD COUNTER
--------------------------------------------------------- */

function updateATCRSCounter(
    selector,
    value
) {

    const elements =
        document.querySelectorAll(selector);

    elements.forEach(function (element) {

        element.textContent =
            formatATCRSNumber(value);

    });
}


/* ---------------------------------------------------------
   COUNT TABLE RECORDS
--------------------------------------------------------- */

function countATCRSTableRecords(selector) {

    const table =
        document.querySelector(selector);

    if (!table) {
        return 0;
    }

    const rows =
        table.querySelectorAll(
            "tbody tr"
        );

    return Array.from(rows).filter(
        function (row) {

            return (
                !row.classList.contains(
                    "empty-row"
                ) &&
                row.style.display !== "none"
            );

        }
    ).length;
}


/* ---------------------------------------------------------
   UPDATE DASHBOARD TABLE COUNTERS
--------------------------------------------------------- */

function initializeDashboardCounters() {

    const mappings = [

        {
            table: "#studentsTable",
            counters: [
                "[data-student-count]",
                "#studentCount"
            ]
        },

        {
            table: "#requestsTable",
            counters: [
                "[data-request-count]",
                "#requestCount"
            ]
        },

        {
            table: "#paymentsTable",
            counters: [
                "[data-payment-count]",
                "#paymentCount"
            ]
        },

        {
            table: "#verificationTable",
            counters: [
                "[data-verification-count]",
                "#verificationCount"
            ]
        }

    ];

    mappings.forEach(function (mapping) {

        const count =
            countATCRSTableRecords(
                mapping.table
            );

        mapping.counters.forEach(
            function (selector) {

                updateATCRSCounter(
                    selector,
                    count
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   REPORT FILTERS
--------------------------------------------------------- */

function initializeReportFilters() {

    const forms =
        document.querySelectorAll(
            "#reportFilterForm, " +
            ".report-filter-form, " +
            "form[data-report-filter]"
        );

    forms.forEach(function (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const dateFrom =
                    form.querySelector(
                        "[name='dateFrom'], " +
                        "#dateFrom"
                    );

                const dateTo =
                    form.querySelector(
                        "[name='dateTo'], " +
                        "#dateTo"
                    );

                if (
                    dateFrom &&
                    dateTo &&
                    dateFrom.value &&
                    dateTo.value &&
                    dateFrom.value > dateTo.value
                ) {

                    showErrorMessage(
                        "The starting date cannot be later than the ending date."
                    );

                    return;
                }

                showInfoMessage(
                    "Report filters applied successfully."
                );

                document.dispatchEvent(
                    new CustomEvent(
                        "atcrsReportFiltered"
                    )
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   REPORT GENERATION
--------------------------------------------------------- */

function initializeReportGeneration() {

    const buttons =
        document.querySelectorAll(
            "[data-generate-report], " +
            ".generate-report-btn, " +
            "#generateReport"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const reportType =
                    button.dataset.reportType ||
                    "System Report";

                setLoadingState(
                    button,
                    true,
                    "GENERATING..."
                );

                setTimeout(function () {

                    setLoadingState(
                        button,
                        false
                    );

                    showSuccessMessage(
                        reportType +
                        " generated successfully."
                    );

                }, 800);

            }
        );

    });
}


/* ---------------------------------------------------------
   EXPORT REPORT
--------------------------------------------------------- */

function initializeReportExport() {

    const buttons =
        document.querySelectorAll(
            "[data-export-report], " +
            ".export-report-btn"
        );

    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const format =
                    button.dataset.exportFormat ||
                    "CSV";

                showSuccessMessage(
                    "Report export prepared in " +
                    format.toUpperCase() +
                    " format."
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   DASHBOARD DATE
--------------------------------------------------------- */

function initializeDashboardDate() {

    const elements =
        document.querySelectorAll(
            "[data-dashboard-date]"
        );

    if (!elements.length) {
        return;
    }

    const now =
        new Date();

    const formattedDate =
        now.toLocaleDateString(
            "en-PH",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    elements.forEach(function (element) {

        element.textContent =
            formattedDate;

    });
}


/* ---------------------------------------------------------
   SYSTEM VERSION DISPLAY
--------------------------------------------------------- */

function initializeSystemVersion() {

    const elements =
        document.querySelectorAll(
            "[data-system-version]"
        );

    elements.forEach(function (element) {

        element.textContent =
            ATCRS.version;

    });
}


/* ---------------------------------------------------------
   CURRENT YEAR DISPLAY
--------------------------------------------------------- */

function initializeCurrentYear() {

    const elements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    elements.forEach(function (element) {

        element.textContent =
            ATCRS.currentYear;

    });
}


/* ---------------------------------------------------------
   INITIALIZE PART 9O
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeDashboardCounters();
        initializeReportFilters();
        initializeReportGeneration();
        initializeReportExport();

        initializeDashboardDate();
        initializeSystemVersion();
        initializeCurrentYear();

    }
);


/* =========================================================
   END OF PART 9O
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9P
   STUDENT DOCUMENT REQUEST UTILITIES
========================================================= */

/* =========================================================
   DOCUMENT REQUEST SUMMARY
========================================================= */

function initializeDocumentRequestSummary() {

    const requestRows = document.querySelectorAll(
        "#documentRequestsTable tbody tr, .request-table tbody tr"
    );

    if (!requestRows.length) return;

    let total = 0;
    let pending = 0;
    let processing = 0;
    let completed = 0;

    requestRows.forEach(row => {

        if (row.classList.contains("empty-row")) return;

        const text = row.textContent.toLowerCase();

        total++;

        if (
            text.includes("pending") ||
            text.includes("awaiting")
        ) {
            pending++;
        }

        if (
            text.includes("processing") ||
            text.includes("review")
        ) {
            processing++;
        }

        if (
            text.includes("completed") ||
            text.includes("released") ||
            text.includes("approved")
        ) {
            completed++;
        }
    });

    updateRequestSummaryValue(
        [
            "#totalRequests",
            "#totalDocumentRequests",
            ".total-requests"
        ],
        total
    );

    updateRequestSummaryValue(
        [
            "#pendingRequests",
            "#pendingDocumentRequests",
            ".pending-requests"
        ],
        pending
    );

    updateRequestSummaryValue(
        [
            "#processingRequests",
            "#processingDocumentRequests",
            ".processing-requests"
        ],
        processing
    );

    updateRequestSummaryValue(
        [
            "#completedRequests",
            "#completedDocumentRequests",
            ".completed-requests"
        ],
        completed
    );
}


/* =========================================================
   UPDATE SUMMARY VALUE
========================================================= */

function updateRequestSummaryValue(selectors, value) {

    selectors.forEach(selector => {

        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {

            element.textContent = formatATCRSNumber(value);

        });

    });
}


/* =========================================================
   REQUEST STATUS BADGE
========================================================= */

function updateRequestStatusBadge(element, status) {

    if (!element) return;

    const normalizedStatus = String(status || "")
        .trim()
        .toLowerCase();

    element.classList.remove(
        "status-pending",
        "status-processing",
        "status-approved",
        "status-completed",
        "status-released",
        "status-rejected",
        "status-cancelled",
        "status-warning",
        "status-success",
        "status-danger"
    );

    if (
        normalizedStatus.includes("pending") ||
        normalizedStatus.includes("awaiting")
    ) {

        element.classList.add(
            "status-pending",
            "status-warning"
        );

    } else if (
        normalizedStatus.includes("processing") ||
        normalizedStatus.includes("review")
    ) {

        element.classList.add(
            "status-processing"
        );

    } else if (
        normalizedStatus.includes("approved")
    ) {

        element.classList.add(
            "status-approved",
            "status-success"
        );

    } else if (
        normalizedStatus.includes("completed")
    ) {

        element.classList.add(
            "status-completed",
            "status-success"
        );

    } else if (
        normalizedStatus.includes("released")
    ) {

        element.classList.add(
            "status-released",
            "status-success"
        );

    } else if (
        normalizedStatus.includes("rejected")
    ) {

        element.classList.add(
            "status-rejected",
            "status-danger"
        );

    } else if (
        normalizedStatus.includes("cancelled") ||
        normalizedStatus.includes("canceled")
    ) {

        element.classList.add(
            "status-cancelled",
            "status-danger"
        );
    }
}


/* =========================================================
   INITIALIZE STATUS BADGES
========================================================= */

function initializeRequestStatusBadges() {

    const statusElements = document.querySelectorAll(
        ".request-status, " +
        ".document-status, " +
        ".status-badge, " +
        "[data-request-status]"
    );

    statusElements.forEach(element => {

        const status =
            element.dataset.requestStatus ||
            element.textContent;

        updateRequestStatusBadge(
            element,
            status
        );

    });
}


/* =========================================================
   REQUEST TYPE LABEL
========================================================= */

function formatDocumentRequestType(type) {

    if (!type) {
        return "Document Request";
    }

    return String(type)
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, letter => letter.toUpperCase());
}


/* =========================================================
   INITIALIZE REQUEST TYPE LABELS
========================================================= */

function initializeDocumentRequestTypeLabels() {

    const elements = document.querySelectorAll(
        "[data-request-type]"
    );

    elements.forEach(element => {

        const type = element.dataset.requestType;

        if (type) {
            element.textContent =
                formatDocumentRequestType(type);
        }

    });
}


/* =========================================================
   REQUEST DATE FORMATTING
========================================================= */

function initializeRequestDates() {

    const dateElements = document.querySelectorAll(
        "[data-request-date]"
    );

    dateElements.forEach(element => {

        const rawDate =
            element.dataset.requestDate;

        if (!rawDate) return;

        const date = new Date(rawDate);

        if (Number.isNaN(date.getTime())) return;

        element.textContent =
            formatATCRSDate(date);

    });
}


/* =========================================================
   DOCUMENT REQUEST FORM RESET
========================================================= */

function initializeRequestResetButtons() {

    const buttons = document.querySelectorAll(
        "[data-reset-request], " +
        ".reset-request-btn, " +
        ".request-reset-btn"
    );

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const form =
                button.closest("form");

            if (!form) return;

            resetATCRSForm(form);

            clearStatusMessage();

            showInfoMessage(
                "The document request form has been reset."
            );

        });

    });
}


/* =========================================================
   REQUEST FORM CANCEL
========================================================= */

function initializeRequestCancelButtons() {

    const buttons = document.querySelectorAll(
        "[data-cancel-request], " +
        ".cancel-request-btn"
    );

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const confirmed =
                confirm(
                    "Are you sure you want to cancel this request?"
                );

            if (!confirmed) return;

            const form =
                button.closest("form");

            if (form) {
                resetATCRSForm(form);
            }

            showWarningMessage(
                "Document request cancelled."
            );

        });

    });
}


/* =========================================================
   REQUEST FORM INITIALIZATION
========================================================= */

function initializeStudentRequestUtilities() {

    initializeDocumentRequestSummary();
    initializeRequestStatusBadges();
    initializeDocumentRequestTypeLabels();
    initializeRequestDates();
    initializeRequestResetButtons();
    initializeRequestCancelButtons();

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeStudentRequestUtilities
);
/* =========================================================
   ATCRS SCRIPT.JS — PART 9Q
   STUDENT REQUEST TRACKING & DOCUMENT STATUS
========================================================= */


/* =========================================================
   GET REQUEST STATUS
========================================================= */

function getRequestStatus(requestId) {

    const requests =
        JSON.parse(
            localStorage.getItem("atcrsRequests") || "[]"
        );

    const request =
        requests.find(function (item) {

            return String(item.id) === String(requestId);

        });

    if (!request) {

        return null;

    }

    return request.status || "Pending";

}


/* =========================================================
   UPDATE REQUEST STATUS
========================================================= */

function updateRequestStatus(requestId, newStatus) {

    const requests =
        JSON.parse(
            localStorage.getItem("atcrsRequests") || "[]"
        );

    const requestIndex =
        requests.findIndex(function (item) {

            return String(item.id) === String(requestId);

        });

    if (requestIndex === -1) {

        return false;

    }

    requests[requestIndex].status = newStatus;

    requests[requestIndex].updatedAt =
        new Date().toISOString();

    localStorage.setItem(
        "atcrsRequests",
        JSON.stringify(requests)
    );

    return true;

}


/* =========================================================
   REQUEST STATUS BADGE
========================================================= */

function getRequestStatusBadge(status) {

    if (!status) {

        status = "Pending";

    }

    const normalizedStatus =
        String(status)
            .toLowerCase()
            .trim();


    let className = "status-pending";


    if (
        normalizedStatus === "approved" ||
        normalizedStatus === "completed" ||
        normalizedStatus === "released" ||
        normalizedStatus === "verified"
    ) {

        className = "status-approved";

    }


    if (
        normalizedStatus === "processing" ||
        normalizedStatus === "in progress"
    ) {

        className = "status-processing";

    }


    if (
        normalizedStatus === "rejected" ||
        normalizedStatus === "cancelled" ||
        normalizedStatus === "canceled"
    ) {

        className = "status-rejected";

    }


    return `
        <span class="status-badge ${className}">
            ${status}
        </span>
    `;

}


/* =========================================================
   REQUEST PROGRESS
========================================================= */

function getRequestProgress(status) {

    if (!status) {

        return 0;

    }

    const normalizedStatus =
        String(status)
            .toLowerCase()
            .trim();


    const progressMap = {

        "pending": 20,

        "processing": 50,

        "in progress": 50,

        "approved": 75,

        "completed": 100,

        "released": 100,

        "verified": 100,

        "rejected": 0,

        "cancelled": 0,

        "canceled": 0

    };


    return progressMap[normalizedStatus] ?? 20;

}


/* =========================================================
   UPDATE PROGRESS BAR
========================================================= */

function updateRequestProgress(element, status) {

    if (!element) {

        return;

    }

    const progress =
        getRequestProgress(status);


    element.style.width =
        progress + "%";


    element.setAttribute(
        "aria-valuenow",
        progress
    );

}


/* =========================================================
   REQUEST TRACKING FORM
========================================================= */

function initializeRequestTracking() {

    const trackingForm =
        document.getElementById("trackingForm");


    if (!trackingForm) {

        return;

    }


    trackingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "trackingNumber"
                );


            if (!input) {

                return;

            }


            const trackingNumber =
                input.value.trim();


            if (!trackingNumber) {

                showMessage(
                    "Please enter your tracking number.",
                    "warning"
                );

                input.focus();

                return;

            }


            displayRequestTracking(
                trackingNumber
            );

        }
    );

}


/* =========================================================
   DISPLAY REQUEST TRACKING
========================================================= */

function displayRequestTracking(trackingNumber) {

    const requests =
        JSON.parse(
            localStorage.getItem("atcrsRequests") || "[]"
        );


    const request =
        requests.find(function (item) {

            return String(
                item.trackingNumber
            ).toLowerCase() ===
            trackingNumber.toLowerCase();

        });


    const result =
        document.getElementById(
            "trackingResult"
        );


    if (!result) {

        return;

    }


    if (!request) {

        result.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-circle-exclamation"></i>

                <h3>
                    Request Not Found
                </h3>

                <p>
                    We could not find a request
                    matching the tracking number
                    you entered.
                </p>

            </div>

        `;

        return;

    }


    const status =
        request.status || "Pending";


    const progress =
        getRequestProgress(status);


    result.innerHTML = `

        <div class="request-tracking-card">

            <div class="request-tracking-header">

                <div>

                    <span class="small-label">
                        TRACKING NUMBER
                    </span>

                    <h3>
                        ${request.trackingNumber || trackingNumber}
                    </h3>

                </div>

                ${getRequestStatusBadge(status)}

            </div>


            <div class="tracking-progress">

                <div class="progress-header">

                    <span>
                        Request Progress
                    </span>

                    <strong>
                        ${progress}%
                    </strong>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${progress}%">
                    </div>

                </div>

            </div>


            <div class="request-detail-grid">

                <div>

                    <span>
                        Document Type
                    </span>

                    <strong>
                        ${request.type || "Document Request"}
                    </strong>

                </div>


                <div>

                    <span>
                        Date Requested
                    </span>

                    <strong>
                        ${request.date || "N/A"}
                    </strong>

                </div>


                <div>

                    <span>
                        Current Status
                    </span>

                    <strong>
                        ${status}
                    </strong>

                </div>


                <div>

                    <span>
                        Last Updated
                    </span>

                    <strong>
                        ${
                            request.updatedAt
                                ? formatDate(
                                    request.updatedAt
                                  )
                                : "N/A"
                        }
                    </strong>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   DOCUMENT RELEASE CHECK
========================================================= */

function isDocumentReleased(request) {

    if (!request) {

        return false;

    }


    const status =
        String(request.status || "")
            .toLowerCase()
            .trim();


    return (
        status === "released" ||
        status === "completed"
    );

}


/* =========================================================
   DOCUMENT DOWNLOAD BUTTON
========================================================= */

function initializeDocumentDownloads() {

    const downloadButtons =
        document.querySelectorAll(
            ".download-document"
        );


    downloadButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const documentName =
                    this.dataset.document ||
                    "document";


                showMessage(
                    documentName +
                    " download initiated.",
                    "success"
                );

            }
        );

    });

}


/* =========================================================
   RELEASE DOCUMENT MESSAGE
========================================================= */

function showReleaseMessage(status) {

    const normalizedStatus =
        String(status || "")
            .toLowerCase()
            .trim();


    if (
        normalizedStatus === "released" ||
        normalizedStatus === "completed"
    ) {

        return "Your document is ready for release.";

    }


    if (
        normalizedStatus === "processing" ||
        normalizedStatus === "in progress"
    ) {

        return "Your document is currently being processed.";

    }


    if (normalizedStatus === "approved") {

        return "Your request has been approved.";

    }


    if (normalizedStatus === "rejected") {

        return "Your request was not approved.";

    }


    return "Your request is currently pending.";

}


/* =========================================================
   INITIALIZE REQUEST TRACKING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeRequestTracking();

        initializeDocumentDownloads();

    }
);


/* =========================================================
   END OF PART 9Q
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9Q
   STUDENT REQUEST TRACKING & DOCUMENT STATUS
========================================================= */


/* =========================================================
   GET REQUEST STATUS
========================================================= */

function getRequestStatus(requestId) {

    const requests =
        JSON.parse(
            localStorage.getItem("atcrsRequests") || "[]"
        );

    const request =
        requests.find(function (item) {

            return String(item.id) === String(requestId);

        });

    if (!request) {

        return null;

    }

    return request.status || "Pending";

}


/* =========================================================
   UPDATE REQUEST STATUS
========================================================= */

function updateRequestStatus(requestId, newStatus) {

    const requests =
        JSON.parse(
            localStorage.getItem("atcrsRequests") || "[]"
        );

    const requestIndex =
        requests.findIndex(function (item) {

            return String(item.id) === String(requestId);

        });

    if (requestIndex === -1) {

        return false;

    }

    requests[requestIndex].status = newStatus;

    requests[requestIndex].updatedAt =
        new Date().toISOString();

    localStorage.setItem(
        "atcrsRequests",
        JSON.stringify(requests)
    );

    return true;

}


/* =========================================================
   REQUEST STATUS BADGE
========================================================= */

function getRequestStatusBadge(status) {

    if (!status) {

        status = "Pending";

    }

    const normalizedStatus =
        String(status)
            .toLowerCase()
            .trim();


    let className = "status-pending";


    if (
        normalizedStatus === "approved" ||
        normalizedStatus === "completed" ||
        normalizedStatus === "released" ||
        normalizedStatus === "verified"
    ) {

        className = "status-approved";

    }


    if (
        normalizedStatus === "processing" ||
        normalizedStatus === "in progress"
    ) {

        className = "status-processing";

    }


    if (
        normalizedStatus === "rejected" ||
        normalizedStatus === "cancelled" ||
        normalizedStatus === "canceled"
    ) {

        className = "status-rejected";

    }


    return `
        <span class="status-badge ${className}">
            ${status}
        </span>
    `;

}


/* =========================================================
   REQUEST PROGRESS
========================================================= */

function getRequestProgress(status) {

    if (!status) {

        return 0;

    }

    const normalizedStatus =
        String(status)
            .toLowerCase()
            .trim();


    const progressMap = {

        "pending": 20,

        "processing": 50,

        "in progress": 50,

        "approved": 75,

        "completed": 100,

        "released": 100,

        "verified": 100,

        "rejected": 0,

        "cancelled": 0,

        "canceled": 0

    };


    return progressMap[normalizedStatus] ?? 20;

}


/* =========================================================
   UPDATE PROGRESS BAR
========================================================= */

function updateRequestProgress(element, status) {

    if (!element) {

        return;

    }

    const progress =
        getRequestProgress(status);


    element.style.width =
        progress + "%";


    element.setAttribute(
        "aria-valuenow",
        progress
    );

}


/* =========================================================
   REQUEST TRACKING FORM
========================================================= */

function initializeRequestTracking() {

    const trackingForm =
        document.getElementById("trackingForm");


    if (!trackingForm) {

        return;

    }


    trackingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "trackingNumber"
                );


            if (!input) {

                return;

            }


            const trackingNumber =
                input.value.trim();


            if (!trackingNumber) {

                showMessage(
                    "Please enter your tracking number.",
                    "warning"
                );

                input.focus();

                return;

            }


            displayRequestTracking(
                trackingNumber
            );

        }
    );

}


/* =========================================================
   DISPLAY REQUEST TRACKING
========================================================= */

function displayRequestTracking(trackingNumber) {

    const requests =
        JSON.parse(
            localStorage.getItem("atcrsRequests") || "[]"
        );


    const request =
        requests.find(function (item) {

            return String(
                item.trackingNumber
            ).toLowerCase() ===
            trackingNumber.toLowerCase();

        });


    const result =
        document.getElementById(
            "trackingResult"
        );


    if (!result) {

        return;

    }


    if (!request) {

        result.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-circle-exclamation"></i>

                <h3>
                    Request Not Found
                </h3>

                <p>
                    We could not find a request
                    matching the tracking number
                    you entered.
                </p>

            </div>

        `;

        return;

    }


    const status =
        request.status || "Pending";


    const progress =
        getRequestProgress(status);


    result.innerHTML = `

        <div class="request-tracking-card">

            <div class="request-tracking-header">

                <div>

                    <span class="small-label">
                        TRACKING NUMBER
                    </span>

                    <h3>
                        ${request.trackingNumber || trackingNumber}
                    </h3>

                </div>

                ${getRequestStatusBadge(status)}

            </div>


            <div class="tracking-progress">

                <div class="progress-header">

                    <span>
                        Request Progress
                    </span>

                    <strong>
                        ${progress}%
                    </strong>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${progress}%">
                    </div>

                </div>

            </div>


            <div class="request-detail-grid">

                <div>

                    <span>
                        Document Type
                    </span>

                    <strong>
                        ${request.type || "Document Request"}
                    </strong>

                </div>


                <div>

                    <span>
                        Date Requested
                    </span>

                    <strong>
                        ${request.date || "N/A"}
                    </strong>

                </div>


                <div>

                    <span>
                        Current Status
                    </span>

                    <strong>
                        ${status}
                    </strong>

                </div>


                <div>

                    <span>
                        Last Updated
                    </span>

                    <strong>
                        ${
                            request.updatedAt
                                ? formatDate(
                                    request.updatedAt
                                  )
                                : "N/A"
                        }
                    </strong>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   DOCUMENT RELEASE CHECK
========================================================= */

function isDocumentReleased(request) {

    if (!request) {

        return false;

    }


    const status =
        String(request.status || "")
            .toLowerCase()
            .trim();


    return (
        status === "released" ||
        status === "completed"
    );

}


/* =========================================================
   DOCUMENT DOWNLOAD BUTTON
========================================================= */

function initializeDocumentDownloads() {

    const downloadButtons =
        document.querySelectorAll(
            ".download-document"
        );


    downloadButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const documentName =
                    this.dataset.document ||
                    "document";


                showMessage(
                    documentName +
                    " download initiated.",
                    "success"
                );

            }
        );

    });

}


/* =========================================================
   RELEASE DOCUMENT MESSAGE
========================================================= */

function showReleaseMessage(status) {

    const normalizedStatus =
        String(status || "")
            .toLowerCase()
            .trim();


    if (
        normalizedStatus === "released" ||
        normalizedStatus === "completed"
    ) {

        return "Your document is ready for release.";

    }


    if (
        normalizedStatus === "processing" ||
        normalizedStatus === "in progress"
    ) {

        return "Your document is currently being processed.";

    }


    if (normalizedStatus === "approved") {

        return "Your request has been approved.";

    }


    if (normalizedStatus === "rejected") {

        return "Your request was not approved.";

    }


    return "Your request is currently pending.";

}


/* =========================================================
   INITIALIZE REQUEST TRACKING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeRequestTracking();

        initializeDocumentDownloads();

    }
);


/* =========================================================
   END OF PART 9Q
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9R
   STUDENT DOCUMENT REQUEST HISTORY
========================================================= */


/* =========================================================
   GET STUDENT ID
========================================================= */

function getLoggedInStudentId() {

    return sessionStorage.getItem(
        "studentId"
    ) || "";

}


/* =========================================================
   GET STUDENT REQUESTS
========================================================= */

function getStudentRequests(studentId) {

    const requests =
        JSON.parse(
            localStorage.getItem(
                "atcrsRequests"
            ) || "[]"
        );


    if (!studentId) {

        return [];

    }


    return requests.filter(function (request) {

        return String(
            request.studentId || ""
        ) === String(studentId);

    });

}


/* =========================================================
   DISPLAY STUDENT REQUEST HISTORY
========================================================= */

function displayStudentRequestHistory() {

    const container =
        document.getElementById(
            "studentRequestHistory"
        );


    if (!container) {

        return;

    }


    const studentId =
        getLoggedInStudentId();


    const requests =
        getStudentRequests(studentId);


    if (requests.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-folder-open"></i>

                <h3>
                    No Document Requests
                </h3>

                <p>
                    You do not have any document
                    requests yet.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        requests.map(function (request) {

            const status =
                request.status || "Pending";


            const progress =
                getRequestProgress(status);


            return `

                <div class="request-history-card">

                    <div class="request-history-header">

                        <div>

                            <span class="small-label">
                                ${
                                    request.trackingNumber ||
                                    "ATCRS REQUEST"
                                }
                            </span>

                            <h3>
                                ${
                                    request.type ||
                                    "Document Request"
                                }
                            </h3>

                        </div>

                        ${getRequestStatusBadge(status)}

                    </div>


                    <div class="request-history-details">

                        <div>

                            <span>
                                Date Requested
                            </span>

                            <strong>
                                ${
                                    request.date ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Progress
                            </span>

                            <strong>
                                ${progress}%
                            </strong>

                        </div>

                    </div>


                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width:${progress}%">
                        </div>

                    </div>


                    <div class="request-history-actions">

                        <button
                            type="button"
                            class="btn btn-secondary view-request"
                            data-request-id="${request.id}">

                            <i class="fas fa-eye"></i>

                            VIEW DETAILS

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    initializeRequestHistoryButtons();

}


/* =========================================================
   REQUEST HISTORY BUTTONS
========================================================= */

function initializeRequestHistoryButtons() {

    const buttons =
        document.querySelectorAll(
            ".view-request"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const requestId =
                    this.dataset.requestId;


                showStudentRequestDetails(
                    requestId
                );

            }
        );

    });

}


/* =========================================================
   SHOW STUDENT REQUEST DETAILS
========================================================= */

function showStudentRequestDetails(requestId) {

    const requests =
        JSON.parse(
            localStorage.getItem(
                "atcrsRequests"
            ) || "[]"
        );


    const request =
        requests.find(function (item) {

            return String(item.id) ===
                String(requestId);

        });


    if (!request) {

        showMessage(
            "Request details could not be found.",
            "error"
        );

        return;

    }


    const status =
        request.status || "Pending";


    const progress =
        getRequestProgress(status);


    const details = `

        <div class="request-detail-modal">

            <div class="request-detail-header">

                <span class="small-label">
                    TRACKING NUMBER
                </span>

                <h2>
                    ${
                        request.trackingNumber ||
                        "N/A"
                    }
                </h2>

                ${getRequestStatusBadge(status)}

            </div>


            <div class="request-detail-grid">

                <div>

                    <span>
                        Document Type
                    </span>

                    <strong>
                        ${
                            request.type ||
                            "N/A"
                        }
                    </strong>

                </div>


                <div>

                    <span>
                        Date Requested
                    </span>

                    <strong>
                        ${
                            request.date ||
                            "N/A"
                        }
                    </strong>

                </div>


                <div>

                    <span>
                        Student ID
                    </span>

                    <strong>
                        ${
                            request.studentId ||
                            "N/A"
                        }
                    </strong>

                </div>


                <div>

                    <span>
                        Status
                    </span>

                    <strong>
                        ${status}
                    </strong>

                </div>

            </div>


            <div class="tracking-progress">

                <div class="progress-header">

                    <span>
                        Request Progress
                    </span>

                    <strong>
                        ${progress}%
                    </strong>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${progress}%">
                    </div>

                </div>

            </div>


            <div class="request-status-message">

                <i class="fas fa-circle-info"></i>

                <p>
                    ${showReleaseMessage(status)}
                </p>

            </div>

        </div>

    `;


    if (typeof openModal === "function") {

        openModal(
            "Document Request Details",
            details
        );

    } else {

        alert(
            "Request Status: " +
            status
        );

    }

}


/* =========================================================
   STUDENT REQUEST SUMMARY
========================================================= */

function updateStudentRequestSummary() {

    const studentId =
        getLoggedInStudentId();


    const requests =
        getStudentRequests(studentId);


    const total =
        requests.length;


    const pending =
        requests.filter(function (request) {

            return String(
                request.status || ""
            ).toLowerCase() === "pending";

        }).length;


    const processing =
        requests.filter(function (request) {

            const status =
                String(
                    request.status || ""
                ).toLowerCase();

            return (
                status === "processing" ||
                status === "in progress"
            );

        }).length;


    const completed =
        requests.filter(function (request) {

            const status =
                String(
                    request.status || ""
                ).toLowerCase();

            return (
                status === "completed" ||
                status === "released"
            );

        }).length;


    const totalElement =
        document.getElementById(
            "studentTotalRequests"
        );


    const pendingElement =
        document.getElementById(
            "studentPendingRequests"
        );


    const processingElement =
        document.getElementById(
            "studentProcessingRequests"
        );


    const completedElement =
        document.getElementById(
            "studentCompletedRequests"
        );


    if (totalElement) {

        totalElement.textContent = total;

    }


    if (pendingElement) {

        pendingElement.textContent = pending;

    }


    if (processingElement) {

        processingElement.textContent =
            processing;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }

}


/* =========================================================
   INITIALIZE STUDENT REQUEST PAGE
========================================================= */

function initializeStudentRequestPage() {

    displayStudentRequestHistory();

    updateStudentRequestSummary();

}


/* =========================================================
   AUTO INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeStudentRequestPage();

    }
);


/* =========================================================
   END OF PART 9R
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9S
   STUDENT DOCUMENT RELEASE & DOWNLOAD HISTORY
========================================================= */


/* =========================================================
   GET RELEASED DOCUMENTS
========================================================= */

function getReleasedDocuments(studentId) {

    const requests =
        getStudentRequests(studentId);


    return requests.filter(function (request) {

        const status =
            String(request.status || "")
                .toLowerCase()
                .trim();


        return (
            status === "released" ||
            status === "completed"
        );

    });

}


/* =========================================================
   DISPLAY RELEASED DOCUMENTS
========================================================= */

function displayReleasedDocuments() {

    const container =
        document.getElementById(
            "releasedDocuments"
        );


    if (!container) {

        return;

    }


    const studentId =
        getLoggedInStudentId();


    const documents =
        getReleasedDocuments(studentId);


    if (documents.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-file-circle-xmark"></i>

                <h3>
                    No Released Documents
                </h3>

                <p>
                    Your released documents will
                    appear here once your request
                    has been completed.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        documents.map(function (document) {

            return `

                <div class="document-download-card">

                    <div class="document-icon">

                        <i class="fas fa-file-lines"></i>

                    </div>


                    <div class="document-download-info">

                        <span class="small-label">
                            RELEASED DOCUMENT
                        </span>

                        <h3>
                            ${
                                document.type ||
                                "Academic Document"
                            }
                        </h3>

                        <p>
                            Tracking No:
                            ${
                                document.trackingNumber ||
                                "N/A"
                            }
                        </p>

                        <p>
                            Released:
                            ${
                                document.updatedAt
                                    ? formatDate(
                                        document.updatedAt
                                      )
                                    : "N/A"
                            }
                        </p>

                    </div>


                    <div class="document-download-action">

                        <button
                            type="button"
                            class="btn btn-primary download-released-document"
                            data-request-id="${document.id}">

                            <i class="fas fa-download"></i>

                            DOWNLOAD

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    initializeReleasedDocumentButtons();

}


/* =========================================================
   RELEASED DOCUMENT BUTTONS
========================================================= */

function initializeReleasedDocumentButtons() {

    const buttons =
        document.querySelectorAll(
            ".download-released-document"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const requestId =
                    this.dataset.requestId;


                downloadReleasedDocument(
                    requestId
                );

            }
        );

    });

}


/* =========================================================
   DOWNLOAD RELEASED DOCUMENT
========================================================= */

function downloadReleasedDocument(requestId) {

    const requests =
        JSON.parse(
            localStorage.getItem(
                "atcrsRequests"
            ) || "[]"
        );


    const request =
        requests.find(function (item) {

            return String(item.id) ===
                String(requestId);

        });


    if (!request) {

        showMessage(
            "Document request could not be found.",
            "error"
        );

        return;

    }


    if (!isDocumentReleased(request)) {

        showMessage(
            "This document is not yet available for download.",
            "warning"
        );

        return;

    }


    /*
       Prototype behavior:
       Since this is a front-end prototype,
       no real PDF is generated here.
    */

    showMessage(
        "Your " +
        (request.type || "document") +
        " is ready for download.",
        "success"
    );


    saveDownloadHistory(request);

}


/* =========================================================
   SAVE DOWNLOAD HISTORY
========================================================= */

function saveDownloadHistory(request) {

    if (!request) {

        return;

    }


    const history =
        JSON.parse(
            localStorage.getItem(
                "atcrsDownloadHistory"
            ) || "[]"
        );


    const historyRecord = {

        id:
            Date.now(),

        requestId:
            request.id,

        studentId:
            request.studentId,

        documentType:
            request.type ||
            "Academic Document",

        trackingNumber:
            request.trackingNumber ||
            "N/A",

        downloadedAt:
            new Date().toISOString()

    };


    history.unshift(
        historyRecord
    );


    localStorage.setItem(
        "atcrsDownloadHistory",
        JSON.stringify(history)
    );


    displayDownloadHistory();

}


/* =========================================================
   GET DOWNLOAD HISTORY
========================================================= */

function getDownloadHistory(studentId) {

    const history =
        JSON.parse(
            localStorage.getItem(
                "atcrsDownloadHistory"
            ) || "[]"
        );


    if (!studentId) {

        return [];

    }


    return history.filter(function (item) {

        return String(
            item.studentId || ""
        ) === String(studentId);

    });

}


/* =========================================================
   DISPLAY DOWNLOAD HISTORY
========================================================= */

function displayDownloadHistory() {

    const container =
        document.getElementById(
            "downloadHistory"
        );


    if (!container) {

        return;

    }


    const studentId =
        getLoggedInStudentId();


    const history =
        getDownloadHistory(studentId);


    if (history.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-clock-rotate-left"></i>

                <h3>
                    No Download History
                </h3>

                <p>
                    Your document download history
                    will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        history.map(function (item) {

            return `

                <div class="history-item">

                    <div class="history-icon">

                        <i class="fas fa-download"></i>

                    </div>


                    <div class="history-content">

                        <h4>
                            ${
                                item.documentType ||
                                "Academic Document"
                            }
                        </h4>

                        <p>
                            Tracking No:
                            ${
                                item.trackingNumber ||
                                "N/A"
                            }
                        </p>

                        <small>
                            Downloaded:
                            ${
                                item.downloadedAt
                                    ? formatDate(
                                        item.downloadedAt
                                      )
                                    : "N/A"
                            }
                        </small>

                    </div>


                    <span class="status-badge status-approved">
                        DOWNLOADED
                    </span>

                </div>

            `;

        }).join("");

}


/* =========================================================
   CLEAR DOWNLOAD HISTORY
========================================================= */

function clearDownloadHistory() {

    const studentId =
        getLoggedInStudentId();


    if (!studentId) {

        return;

    }


    const history =
        JSON.parse(
            localStorage.getItem(
                "atcrsDownloadHistory"
            ) || "[]"
        );


    const remaining =
        history.filter(function (item) {

            return String(
                item.studentId || ""
            ) !== String(studentId);

        });


    localStorage.setItem(
        "atcrsDownloadHistory",
        JSON.stringify(remaining)
    );


    displayDownloadHistory();


    showMessage(
        "Download history cleared.",
        "success"
    );

}


/* =========================================================
   INITIALIZE DOCUMENT RELEASE PAGE
========================================================= */

function initializeDocumentReleasePage() {

    displayReleasedDocuments();

    displayDownloadHistory();

}


/* =========================================================
   AUTO INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeDocumentReleasePage();

    }
);


/* =========================================================
   END OF PART 9S
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9T
   STUDENT NOTIFICATIONS & SYSTEM MESSAGES
========================================================= */


/* =========================================================
   GET NOTIFICATIONS
========================================================= */

function getNotifications(studentId) {

    const notifications =
        JSON.parse(
            localStorage.getItem(
                "atcrsNotifications"
            ) || "[]"
        );


    if (!studentId) {

        return [];

    }


    return notifications.filter(function (item) {

        return (
            String(item.studentId || "") ===
            String(studentId)
        );

    });

}


/* =========================================================
   CREATE NOTIFICATION
========================================================= */

function createNotification(
    studentId,
    title,
    message,
    type = "info"
) {

    if (!studentId || !title || !message) {

        return false;

    }


    const notifications =
        JSON.parse(
            localStorage.getItem(
                "atcrsNotifications"
            ) || "[]"
        );


    const notification = {

        id: Date.now(),

        studentId: studentId,

        title: title,

        message: message,

        type: type,

        read: false,

        createdAt:
            new Date().toISOString()

    };


    notifications.unshift(
        notification
    );


    localStorage.setItem(
        "atcrsNotifications",
        JSON.stringify(notifications)
    );


    updateNotificationCounter();


    return true;

}


/* =========================================================
   DISPLAY NOTIFICATIONS
========================================================= */

function displayNotifications() {

    const container =
        document.getElementById(
            "notificationList"
        );


    if (!container) {

        return;

    }


    const studentId =
        getLoggedInStudentId();


    const notifications =
        getNotifications(studentId);


    if (notifications.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fas fa-bell-slash"></i>

                <h3>
                    No Notifications
                </h3>

                <p>
                    You currently have no system
                    notifications.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        notifications.map(function (item) {

            const notificationType =
                item.type || "info";


            let icon =
                "fas fa-circle-info";


            if (notificationType === "success") {

                icon =
                    "fas fa-circle-check";

            }


            if (notificationType === "warning") {

                icon =
                    "fas fa-triangle-exclamation";

            }


            if (notificationType === "error") {

                icon =
                    "fas fa-circle-xmark";

            }


            return `

                <div
                    class="notification-item
                    ${item.read ? "read" : "unread"}"
                    data-notification-id="${item.id}"
                >

                    <div class="notification-icon">

                        <i class="${icon}"></i>

                    </div>


                    <div class="notification-content">

                        <h4>
                            ${
                                item.title ||
                                "ATCRS Notification"
                            }
                        </h4>

                        <p>
                            ${
                                item.message ||
                                ""
                            }
                        </p>

                        <small>
                            ${
                                item.createdAt
                                    ? formatDate(
                                        item.createdAt
                                      )
                                    : "Just now"
                            }
                        </small>

                    </div>


                    ${
                        !item.read
                            ? `
                                <button
                                    type="button"
                                    class="notification-read-button"
                                    data-notification-id="${item.id}"
                                    title="Mark as read"
                                >
                                    <i class="fas fa-check"></i>
                                </button>
                            `
                            : ""
                    }

                </div>

            `;

        }).join("");


    initializeNotificationButtons();

}


/* =========================================================
   MARK NOTIFICATION AS READ
========================================================= */

function markNotificationAsRead(notificationId) {

    const notifications =
        JSON.parse(
            localStorage.getItem(
                "atcrsNotifications"
            ) || "[]"
        );


    const index =
        notifications.findIndex(
            function (item) {

                return String(item.id) ===
                    String(notificationId);

            }
        );


    if (index === -1) {

        return false;

    }


    notifications[index].read = true;


    localStorage.setItem(
        "atcrsNotifications",
        JSON.stringify(notifications)
    );


    displayNotifications();

    updateNotificationCounter();


    return true;

}


/* =========================================================
   MARK ALL NOTIFICATIONS AS READ
========================================================= */

function markAllNotificationsAsRead() {

    const studentId =
        getLoggedInStudentId();


    if (!studentId) {

        return;

    }


    const notifications =
        JSON.parse(
            localStorage.getItem(
                "atcrsNotifications"
            ) || "[]"
        );


    notifications.forEach(function (item) {

        if (
            String(item.studentId || "") ===
            String(studentId)
        ) {

            item.read = true;

        }

    });


    localStorage.setItem(
        "atcrsNotifications",
        JSON.stringify(notifications)
    );


    displayNotifications();

    updateNotificationCounter();


    showMessage(
        "All notifications marked as read.",
        "success"
    );

}


/* =========================================================
   DELETE NOTIFICATION
========================================================= */

function deleteNotification(notificationId) {

    const notifications =
        JSON.parse(
            localStorage.getItem(
                "atcrsNotifications"
            ) || "[]"
        );


    const updated =
        notifications.filter(
            function (item) {

                return String(item.id) !==
                    String(notificationId);

            }
        );


    localStorage.setItem(
        "atcrsNotifications",
        JSON.stringify(updated)
    );


    displayNotifications();

    updateNotificationCounter();

}


/* =========================================================
   CLEAR STUDENT NOTIFICATIONS
========================================================= */

function clearStudentNotifications() {

    const studentId =
        getLoggedInStudentId();


    if (!studentId) {

        return;

    }


    const notifications =
        JSON.parse(
            localStorage.getItem(
                "atcrsNotifications"
            ) || "[]"
        );


    const remaining =
        notifications.filter(
            function (item) {

                return String(
                    item.studentId || ""
                ) !== String(studentId);

            }
        );


    localStorage.setItem(
        "atcrsNotifications",
        JSON.stringify(remaining)
    );


    displayNotifications();

    updateNotificationCounter();


    showMessage(
        "Notifications cleared.",
        "success"
    );

}


/* =========================================================
   UPDATE NOTIFICATION COUNTER
========================================================= */

function updateNotificationCounter() {

    const studentId =
        getLoggedInStudentId();


    if (!studentId) {

        return;

    }


    const notifications =
        getNotifications(studentId);


    const unreadCount =
        notifications.filter(
            function (item) {

                return item.read !== true;

            }
        ).length;


    const counters =
        document.querySelectorAll(
            ".notification-count, #notificationCount"
        );


    counters.forEach(function (counter) {

        counter.textContent =
            unreadCount;


        if (unreadCount > 0) {

            counter.style.display =
                "inline-flex";

        } else {

            counter.style.display =
                "none";

        }

    });

}


/* =========================================================
   NOTIFICATION BUTTONS
========================================================= */

function initializeNotificationButtons() {

    const readButtons =
        document.querySelectorAll(
            ".notification-read-button"
        );


    readButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                markNotificationAsRead(
                    this.dataset.notificationId
                );

            }
        );

    });


    const markAllButton =
        document.getElementById(
            "markAllNotifications"
        );


    if (markAllButton) {

        markAllButton.onclick =
            markAllNotificationsAsRead;

    }


    const clearButton =
        document.getElementById(
            "clearNotifications"
        );


    if (clearButton) {

        clearButton.onclick =
            clearStudentNotifications;

    }

}


/* =========================================================
   SAMPLE SYSTEM NOTIFICATION
========================================================= */

function createRequestStatusNotification(
    request
) {

    if (!request || !request.studentId) {

        return;

    }


    const status =
        request.status || "Pending";


    let title =
        "Document Request Update";


    let message =
        "Your document request status has been updated.";


    let type =
        "info";


    if (status === "Processing") {

        title =
            "Request Processing";

        message =
            "Your document request is currently being processed.";

        type =
            "info";

    }


    if (status === "Approved") {

        title =
            "Request Approved";

        message =
            "Your document request has been approved.";

        type =
            "success";

    }


    if (status === "Released") {

        title =
            "Document Released";

        message =
            "Your requested document is now available.";

        type =
            "success";

    }


    if (status === "Rejected") {

        title =
            "Request Rejected";

        message =
            "Your document request has been rejected.";

        type =
            "error";

    }


    createNotification(
        request.studentId,
        title,
        message,
        type
    );

}


/* =========================================================
   AUTO INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayNotifications();

        updateNotificationCounter();

    }
);


/* =========================================================
   END OF PART 9T
========================================================= */
/* =========================================================
   ATCRS SCRIPT.JS — PART 9U
   TERMS, PRIVACY & FINAL SYSTEM UTILITIES
========================================================= */


/* =========================================================
   DETECT LEGAL PAGE
========================================================= */

function isLegalPage() {

    const page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    return (
        page === "terms.html" ||
        page === "privacy.html"
    );

}


/* =========================================================
   UPDATE LEGAL PAGE YEAR
========================================================= */

function updateLegalPageYear() {

    const yearElement =
        document.getElementById("currentYear");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   LEGAL PAGE NAVIGATION
========================================================= */

function initializeLegalNavigation() {

    if (!isLegalPage()) {

        return;

    }


    const legalLinks =
        document.querySelectorAll(
            ".legal-actions a, .footer-links a"
        );


    legalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                const destination =
                    this.getAttribute("href");


                if (!destination) {

                    return;

                }


                /*
                   Normal browser navigation is retained.
                   This section only provides a visual
                   transition before leaving the page.
                */

                if (
                    destination.includes(
                        "terms.html"
                    ) ||
                    destination.includes(
                        "privacy.html"
                    )
                ) {

                    document.body.classList.add(
                        "page-leaving"
                    );

                }

            }
        );

    });

}


/* =========================================================
   LEGAL PAGE SCROLL TO TOP
========================================================= */

function initializeLegalScrollTop() {

    if (!isLegalPage()) {

        return;

    }


    let scrollButton =
        document.getElementById(
            "legalScrollTop"
        );


    if (!scrollButton) {

        return;

    }


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 350) {

                scrollButton.classList.add(
                    "show"
                );

            } else {

                scrollButton.classList.remove(
                    "show"
                );

            }

        }
    );


    scrollButton.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   SYSTEM VERSION
========================================================= */

function getSystemVersion() {

    return "ATCRS 1.0.0";

}


/* =========================================================
   DISPLAY SYSTEM VERSION
========================================================= */

function displaySystemVersion() {

    const elements =
        document.querySelectorAll(
            "[data-system-version]"
        );


    elements.forEach(function (element) {

        element.textContent =
            getSystemVersion();

    });

}


/* =========================================================
   DISABLE DOUBLE FORM SUBMISSION
========================================================= */

function preventDoubleSubmission() {

    const forms =
        document.querySelectorAll(
            "form"
        );


    forms.forEach(function (form) {

        form.addEventListener(
            "submit",
            function () {

                const submitButtons =
                    form.querySelectorAll(
                        'button[type="submit"], input[type="submit"]'
                    );


                submitButtons.forEach(
                    function (button) {

                        if (
                            button.dataset.allowMultiple ===
                            "true"
                        ) {

                            return;

                        }


                        setTimeout(
                            function () {

                                button.disabled =
                                    true;

                            },
                            0
                        );


                        setTimeout(
                            function () {

                                button.disabled =
                                    false;

                            },
                            3000
                        );

                    }
                );

            }
        );

    });

}


/* =========================================================
   HANDLE ESCAPE KEY
========================================================= */

function initializeEscapeHandler() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {

                return;

            }


            const modals =
                document.querySelectorAll(
                    ".modal.active, .modal.show"
                );


            modals.forEach(function (modal) {

                modal.classList.remove(
                    "active"
                );

                modal.classList.remove(
                    "show"
                );

            });

        }
    );

}


/* =========================================================
   PAGE LOAD COMPLETION
========================================================= */

function initializeFinalSystemUtilities() {

    updateLegalPageYear();

    initializeLegalNavigation();

    initializeLegalScrollTop();

    displaySystemVersion();

    preventDoubleSubmission();

    initializeEscapeHandler();

}


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeFinalSystemUtilities();

    }
);


/* =========================================================
   ATCRS SYSTEM READY
========================================================= */

window.ATCRS = {

    version: getSystemVersion(),

    isLegalPage: isLegalPage,

    getStudentId: getLoggedInStudentId,

    getStudentRequests: getStudentRequests,

    getRequestStatus: getRequestStatus,

    updateRequestStatus: updateRequestStatus,

    getRequestProgress: getRequestProgress,

    getNotifications: getNotifications,

    createNotification: createNotification,

    markNotificationAsRead:
        markNotificationAsRead,

    getDownloadHistory:
        getDownloadHistory,

    getReleasedDocuments:
        getReleasedDocuments

};

<script src="../js/script.js"></script>
/* =========================================================
   END OF ATCRS SCRIPT.JS
========================================================= */
