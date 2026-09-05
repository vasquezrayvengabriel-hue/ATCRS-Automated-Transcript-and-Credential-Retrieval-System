/* =========================================================
   ATCRS - MAIN JAVASCRIPT
   Automated Transcript and Credential Retrieval System
   De La Salle John Bosco College
   ========================================================= */


/* =========================================================
   PART 2A-1
   STORAGE & DATABASE FUNCTIONS
   ========================================================= */


/* ---------- STORAGE KEYS ---------- */

const ATCRS_KEYS = {

    accounts: "atcrsAccounts",

    session: "atcrsSession",

    requests: "atcrsRequests",

    credentials: "atcrsCredentials"

};


/* =========================================================
   ACCOUNTS
   ========================================================= */

function getAccounts() {

    return JSON.parse(
        localStorage.getItem(
            ATCRS_KEYS.accounts
        ) || "[]"
    );

}


function saveAccounts(accounts) {

    localStorage.setItem(

        ATCRS_KEYS.accounts,

        JSON.stringify(accounts)

    );

}


/* =========================================================
   REQUESTS
   ========================================================= */

function getRequests() {

    return JSON.parse(

        localStorage.getItem(
            ATCRS_KEYS.requests
        ) || "[]"

    );

}


function saveRequests(requests) {

    localStorage.setItem(

        ATCRS_KEYS.requests,

        JSON.stringify(requests)

    );

}


/* =========================================================
   CREDENTIALS
   ========================================================= */

function getCredentials() {

    return JSON.parse(

        localStorage.getItem(
            ATCRS_KEYS.credentials
        ) || "[]"

    );

}


function saveCredentials(credentials) {

    localStorage.setItem(

        ATCRS_KEYS.credentials,

        JSON.stringify(credentials)

    );

}


/* =========================================================
   USER SESSION
   ========================================================= */

function getSession() {

    return JSON.parse(

        localStorage.getItem(
            ATCRS_KEYS.session
        ) || "null"

    );

}


function saveSession(session) {

    localStorage.setItem(

        ATCRS_KEYS.session,

        JSON.stringify(session)

    );

}


function clearSession() {

    localStorage.removeItem(
        ATCRS_KEYS.session
    );

}


function getCurrentUser() {

    return getSession();

}


/* =========================================================
   ID GENERATORS
   ========================================================= */

function generateUserId() {

    return (

        "USER-" +

        Date.now() +

        "-" +

        Math.floor(
            100 + Math.random() * 900
        )

    );

}


function generateRequestId() {

    const year =
        new Date().getFullYear();

    const random =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return `REQ-${year}-${random}`;

}


function generateCredentialId() {

    const random =
        Math.floor(
            100000 + Math.random() * 900000
        );

    return `DLSJBC-${random}`;

}


/* =========================================================
   ACCOUNT SEARCH
   ========================================================= */

function findAccountByStudentId(studentId) {

    const accounts =
        getAccounts();

    return accounts.find(

        account =>
            account.studentId === studentId

    );

}


function findAccountByEmail(email) {

    const accounts =
        getAccounts();

    return accounts.find(

        account =>

            account.email.toLowerCase() ===
            email.toLowerCase()

    );

}


/* =========================================================
   END OF PART 2A-1
   ========================================================= */

/* =========================================================
   PART 2A-2
   ACCOUNT & SESSION FUNCTIONS
   ========================================================= */


/* =========================================================
   CREATE USER SESSION
   ========================================================= */

function createUserSession(account) {

    const session = {

        userId: account.userId,

        studentId: account.studentId,

        fullName: account.fullName,

        email: account.email,

        role: account.role,

        loginTime: new Date().toISOString()

    };

    saveSession(session);

    return session;
}


/* =========================================================
   PROTECT USER PAGES
   ========================================================= */

function protectUserPage() {

    const session = getCurrentUser();

    if (!session) {

        window.location.href = "../login.html";

        return false;
    }

    const allowedRoles = [

        "Student",
        "Applicant",
        "Alumni"

    ];

    if (!allowedRoles.includes(session.role)) {

        clearSession();

        window.location.href = "../login.html";

        return false;
    }

    return true;
}


/* =========================================================
   INPUT CLEANING
   ========================================================= */

function cleanStudentId(value) {

    return value

        .replace(/\D/g, "")

        .slice(0, 7);

}


function cleanFullName(value) {

    return value

        .replace(/\s+/g, " ")

        .slice(0, 50);

}


/* =========================================================
   MESSAGE DISPLAY
   ========================================================= */

function showMessage(message, type = "error") {

    let messageBox =
        document.getElementById("formMessage");


    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.id =
            "formMessage";

        messageBox.className =
            "form-message";


        const form =
            document.querySelector("form");


        if (form) {

            form.prepend(messageBox);

        }

    }


    messageBox.textContent =
        message;


    messageBox.className =
        `form-message ${type}`;


    messageBox.style.display =
        "block";

}


/* =========================================================
   END OF PART 2A-2
   ========================================================= */

/* =========================================================
   PART 2A-3
   LOGIN & REGISTRATION
   ========================================================= */


/* =========================================================
   REGISTER ACCOUNT
   ========================================================= */

function registerAccount(event) {

    if (event) {

        event.preventDefault();

    }


    const fullName =
        document.getElementById(
            "fullName"
        )?.value.trim();


    const studentId =
        document.getElementById(
            "studentId"
        )?.value.trim();


    const accountType =
        document.getElementById(
            "accountType"
        )?.value;


    const email =
        document.getElementById(
            "email"
        )?.value.trim();


    const password =
        document.getElementById(
            "password"
        )?.value;


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        )?.value;


    const terms =
        document.getElementById(
            "terms"
        )?.checked;


    /* ---------- FULL NAME ---------- */

    if (!fullName) {

        showMessage(
            "Please enter your full name."
        );

        return;
    }


    if (fullName.length > 50) {

        showMessage(
            "Full Name must not exceed 50 characters."
        );

        return;
    }


    /* ---------- STUDENT ID ---------- */

    if (!studentId) {

        showMessage(
            "Please enter your Student ID."
        );

        return;
    }


    if (!/^\d{7}$/.test(studentId)) {

        showMessage(
            "Student ID must contain exactly 7 digits."
        );

        return;
    }


    /* ---------- ACCOUNT TYPE ---------- */

    if (!accountType) {

        showMessage(
            "Please select an account type."
        );

        return;
    }


    /* ---------- EMAIL ---------- */

    if (!email) {

        showMessage(
            "Please enter your email address."
        );

        return;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        showMessage(
            "Please enter a valid email address."
        );

        return;
    }


    /* ---------- PASSWORD ---------- */

    if (!password) {

        showMessage(
            "Please create a password."
        );

        return;
    }


    if (password.length < 6) {

        showMessage(
            "Password must contain at least 6 characters."
        );

        return;
    }


    /* ---------- CONFIRM PASSWORD ---------- */

    if (password !== confirmPassword) {

        showMessage(
            "Passwords do not match."
        );

        return;
    }


    /* ---------- TERMS ---------- */

    if (!terms) {

        showMessage(
            "Please accept the Terms and Conditions."
        );

        return;
    }


    /* =====================================================
       CHECK EXISTING ACCOUNTS
       ===================================================== */

    const accounts =
        getAccounts();


    const existingStudent =
        accounts.find(

            account =>
                account.studentId ===
                studentId

        );


    if (existingStudent) {

        showMessage(
            "This Student ID is already registered."
        );

        return;
    }


    const existingEmail =
        accounts.find(

            account =>

                account.email.toLowerCase() ===
                email.toLowerCase()

        );


    if (existingEmail) {

        showMessage(
            "This email address is already registered."
        );

        return;
    }


    /* =====================================================
       CREATE NEW ACCOUNT
       ===================================================== */

    const newAccount = {

        userId:
            generateUserId(),

        fullName:
            fullName,

        studentId:
            studentId,

        email:
            email,

        password:
            password,

        role:
            accountType,

        accountStatus:
            "Active",

        verificationStatus:
            "Pending Verification",

        dateCreated:
            new Date().toISOString()

    };


    accounts.push(
        newAccount
    );


    saveAccounts(
        accounts
    );


    /* ---------- RESET FORM ---------- */

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (registerForm) {

        registerForm.reset();

    }


    /* ---------- SUCCESS ---------- */

    showMessage(

        "Account created successfully. You can now log in.",

        "success"

    );


    setTimeout(
        function () {

            closeRegisterModal();

            openLoginModal();

        },
        1200
    );

}


/* =========================================================
   USER LOGIN
   ========================================================= */

function loginUser(event) {

    if (event) {

        event.preventDefault();

    }


    const studentId =
        document.getElementById(
            "loginStudentId"
        )?.value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        )?.value;


    const remember =
        document.getElementById(
            "rememberStudentId"
        )?.checked;


    /* ---------- STUDENT ID ---------- */

    if (!studentId) {

        showMessage(
            "Please enter your Student ID."
        );

        return;
    }


    if (!/^\d{7}$/.test(studentId)) {

        showMessage(
            "Student ID must contain exactly 7 digits."
        );

        return;
    }


    /* ---------- PASSWORD ---------- */

    if (!password) {

        showMessage(
            "Please enter your password."
        );

        return;
    }


    /* ---------- FIND ACCOUNT ---------- */

    const account =
        findAccountByStudentId(
            studentId
        );


    if (!account) {

        showMessage(
            "Account not found. Please check your Student ID."
        );

        return;
    }


    /* ---------- CHECK PASSWORD ---------- */

    if (account.password !== password) {

        showMessage(
            "Incorrect password."
        );

        return;
    }


    /* ---------- CHECK ACCOUNT STATUS ---------- */

    if (

        account.accountStatus &&

        account.accountStatus !== "Active"

    ) {

        showMessage(
            "This account is currently inactive."
        );

        return;
    }


    /* =====================================================
       CREATE SESSION
       ===================================================== */

    createUserSession(
        account
    );


    /* =====================================================
       REMEMBER STUDENT ID
       ===================================================== */

    if (remember) {

        localStorage.setItem(

            "atcrsRememberedStudentId",

            studentId

        );

    } else {

        localStorage.removeItem(

            "atcrsRememberedStudentId"

        );

    }


    /* =====================================================
       REDIRECT TO USER DASHBOARD
       ===================================================== */

    window.location.href =
        "user/dashboard.html";

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    clearSession();

    window.location.href =
        "../login.html";

}


/* =========================================================
   LOGIN / REGISTER FORM SETUP
   ========================================================= */

function setupLoginForm() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (!loginForm) {

        return;

    }


    loginForm.addEventListener(

        "submit",

        loginUser

    );

}


function setupRegisterForm() {

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (!registerForm) {

        return;

    }


    registerForm.addEventListener(

        "submit",

        registerAccount

    );

}


/* =========================================================
   END OF PART 2A-3
   ========================================================= */

/* =========================================================
   PART 2A-4
   PASSWORD, MODALS & TERMS
   ========================================================= */


/* =========================================================
   PASSWORD SHOW / HIDE
   ========================================================= */

function setupPasswordToggle() {

    const toggleButtons =
        document.querySelectorAll(
            ".password-toggle"
        );


    toggleButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const inputId =
                        button.getAttribute(
                            "data-target"
                        );


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

                        button.textContent =
                            "Hide";

                    } else {

                        input.type =
                            "password";

                        button.textContent =
                            "Show";

                    }

                }
            );

        }
    );

}


/* =========================================================
   REGISTER MODAL
   ========================================================= */

function openRegisterModal() {

    const modal =
        document.getElementById(
            "registerModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


function closeRegisterModal() {

    const modal =
        document.getElementById(
            "registerModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   LOGIN MODAL
   ========================================================= */

function openLoginModal() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


function closeLoginModal() {

    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   SWITCH BETWEEN LOGIN AND REGISTER
   ========================================================= */

function switchToRegister() {

    closeLoginModal();

    openRegisterModal();

}


function switchToLogin() {

    closeRegisterModal();

    openLoginModal();

}


/* =========================================================
   FORGOT PASSWORD MODAL
   ========================================================= */

function openForgotPasswordModal() {

    const modal =
        document.getElementById(
            "forgotPasswordModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


function closeForgotPasswordModal() {

    const modal =
        document.getElementById(
            "forgotPasswordModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   PASSWORD RECOVERY DEMO
   ========================================================= */

function resetPasswordDemo(event) {

    if (event) {

        event.preventDefault();

    }


    const studentId =
        document.getElementById(
            "forgotStudentId"
        )?.value.trim();


    const email =
        document.getElementById(
            "forgotEmail"
        )?.value.trim();


    if (!studentId || !email) {

        showMessage(
            "Please enter your Student ID and email."
        );

        return;
    }


    const account =
        findAccountByStudentId(
            studentId
        );


    if (

        !account ||

        account.email.toLowerCase() !==
        email.toLowerCase()

    ) {

        showMessage(
            "The Student ID and email do not match an account."
        );

        return;
    }


    showMessage(

        "Password recovery request received. In the production system, a secure recovery process would be used.",

        "success"

    );

}


/* =========================================================
   TERMS MODAL
   ========================================================= */

function openTermsModal() {

    const modal =
        document.getElementById(
            "termsModal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


function closeTermsModal() {

    const modal =
        document.getElementById(
            "termsModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   END OF PART 2A-4
   ========================================================= */

/* =========================================================
   PART 2A-5
   INPUT VALIDATION & REMEMBER STUDENT ID
   ========================================================= */


/* =========================================================
   STUDENT ID INPUT
   ========================================================= */

function setupStudentIdInput() {

    const studentIdInputs =
        document.querySelectorAll(
            "#studentId, #loginStudentId, #forgotStudentId"
        );


    studentIdInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    this.value =
                        cleanStudentId(
                            this.value
                        );

                }
            );

        }
    );

}


/* =========================================================
   FULL NAME INPUT
   ========================================================= */

function setupFullNameInput() {

    const nameInput =
        document.getElementById(
            "fullName"
        );


    if (!nameInput) {

        return;

    }


    nameInput.maxLength =
        50;


    nameInput.addEventListener(
        "input",
        function () {

            this.value =
                cleanFullName(
                    this.value
                );

        }
    );

}


/* =========================================================
   REMEMBERED STUDENT ID
   ========================================================= */

function loadRememberedStudentId() {

    const savedId =
        localStorage.getItem(
            "atcrsRememberedStudentId"
        );


    const input =
        document.getElementById(
            "loginStudentId"
        );


    const checkbox =
        document.getElementById(
            "rememberStudentId"
        );


    if (
        savedId &&
        input
    ) {

        input.value =
            savedId;

    }


    if (
        savedId &&
        checkbox
    ) {

        checkbox.checked =
            true;

    }

}


/* =========================================================
   NAVIGATION DATA ATTRIBUTES
   ========================================================= */

function setupNavigationButtons() {

    const registerButtons =
        document.querySelectorAll(
            "[data-open-register]"
        );


    registerButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                openRegisterModal
            );

        }
    );


    const loginButtons =
        document.querySelectorAll(
            "[data-open-login]"
        );


    loginButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                openLoginModal
            );

        }
    );


    const forgotButtons =
        document.querySelectorAll(
            "[data-open-forgot]"
        );


    forgotButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                openForgotPasswordModal
            );

        }
    );


    const termsButtons =
        document.querySelectorAll(
            "[data-open-terms]"
        );


    termsButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                openTermsModal
            );

        }
    );

}


/* =========================================================
   CLOSE MODAL BY CLICKING OUTSIDE
   ========================================================= */

function setupModalClose() {

    document.addEventListener(
        "click",
        function (event) {

            if (

                event.target.classList.contains(
                    "modal"
                )

            ) {

                event.target.classList.remove(
                    "active"
                );


                document.body.style.overflow =
                    "";

            }

        }
    );

}


/* =========================================================
   CLOSE MODALS WITH ESCAPE
   ========================================================= */

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            document
                .querySelectorAll(
                    ".modal.active"
                )
                .forEach(
                    function (modal) {

                        modal.classList.remove(
                            "active"
                        );

                    }
                );


            document.body.style.overflow =
                "";

        }
    );

}


/* =========================================================
   END OF PART 2A-5
   ========================================================= */

/* =========================================================
   PART 2A-6
   USER INFORMATION & SYSTEM INITIALIZATION
   ========================================================= */


/* =========================================================
   LOAD USER INFORMATION
   ========================================================= */

function loadUserInformation() {

    const session =
        getCurrentUser();


    if (!session) {

        return;

    }


    /* ---------- FULL NAME ---------- */

    const nameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );


    nameElements.forEach(
        function (element) {

            element.textContent =
                session.fullName;

        }
    );


    /* ---------- STUDENT ID ---------- */

    const studentIdElements =
        document.querySelectorAll(
            "[data-user-student-id]"
        );


    studentIdElements.forEach(
        function (element) {

            element.textContent =
                session.studentId;

        }
    );


    /* ---------- EMAIL ---------- */

    const emailElements =
        document.querySelectorAll(
            "[data-user-email]"
        );


    emailElements.forEach(
        function (element) {

            element.textContent =
                session.email;

        }
    );


    /* ---------- ACCOUNT TYPE ---------- */

    const roleElements =
        document.querySelectorAll(
            "[data-user-role]"
        );


    roleElements.forEach(
        function (element) {

            element.textContent =
                session.role;

        }
    );

}


/* =========================================================
   SYSTEM INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ---------- PASSWORD ---------- */

        setupPasswordToggle();


        /* ---------- INPUTS ---------- */

        setupStudentIdInput();

        setupFullNameInput();


        /* ---------- FORMS ---------- */

        setupLoginForm();

        setupRegisterForm();


        /* ---------- NAVIGATION ---------- */

        setupNavigationButtons();


        /* ---------- MODALS ---------- */

        setupModalClose();

        setupEscapeKey();


        /* ---------- REMEMBER STUDENT ID ---------- */

        loadRememberedStudentId();


        /* ---------- USER INFORMATION ---------- */

        loadUserInformation();

    }
);


/* =========================================================
   END OF ATCRS SCRIPT
   ========================================================= */
