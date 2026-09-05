/* =========================================
   ATCRS - AUTOMATED TRANSCRIPT AND
   CREDENTIAL RETRIEVAL SYSTEM
   DLSJBC

   JAVASCRIPT
   PART 4
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. ROLE SELECTOR
    ========================================= */

    const roleOptions = document.querySelectorAll(".role-option");
    const loginForms = document.querySelectorAll(".login-form");

    roleOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            const selectedRole = this.getAttribute("data-role");

            /* Remove active from all role buttons */
            roleOptions.forEach(function (item) {
                item.classList.remove("active");
            });

            /* Add active to selected role */
            this.classList.add("active");

            /* Hide all login forms */
            loginForms.forEach(function (form) {
                form.classList.remove("active");
            });

            /* Show selected login form */
            const selectedForm = document.getElementById(
                selectedRole + "LoginForm"
            );

            if (selectedForm) {
                selectedForm.classList.add("active");
            }

        });

    });


    /* =========================================
       2. PASSWORD SHOW / HIDE
    ========================================= */

    const passwordToggles = document.querySelectorAll(".password-toggle");

    passwordToggles.forEach(function (toggle) {

        toggle.addEventListener("click", function () {

            const targetId = this.getAttribute("data-target");
            const passwordInput = document.getElementById(targetId);

            if (!passwordInput) {
                return;
            }

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                this.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                passwordInput.type = "password";

                this.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    });


    /* =========================================
       3. STUDENT ID - NUMBERS ONLY
    ========================================= */

    const studentIdInputs = document.querySelectorAll(
        "#studentId, #applicantId, #alumniId, #registerStudentId"
    );

    studentIdInputs.forEach(function (input) {

        input.addEventListener("input", function () {

            /* Remove anything that is not a number */
            this.value = this.value.replace(/[^0-9]/g, "");

            /* Maximum of 7 digits */
            if (this.value.length > 7) {
                this.value = this.value.substring(0, 7);
            }

        });

    });


    /* =========================================
       4. FULL NAME - MAXIMUM 50 CHARACTERS
    ========================================= */

    const fullNameInput = document.getElementById("registerFullName");

    if (fullNameInput) {

        fullNameInput.addEventListener("input", function () {

            if (this.value.length > 50) {
                this.value = this.value.substring(0, 50);
            }

        });

    }


    /* =========================================
       5. STUDENT LOGIN
    ========================================= */

    const studentLoginForm =
        document.getElementById("studentLoginForm");

    if (studentLoginForm) {

        studentLoginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const studentId =
                document.getElementById("studentId").value.trim();

            const password =
                document.getElementById("studentPassword").value;

            const message =
                document.getElementById("studentLoginMessage");


            /* Check Student ID */
            if (!/^[0-9]{7}$/.test(studentId)) {

                showMessage(
                    message,
                    "Please enter a valid 7-digit Student ID.",
                    "error"
                );

                return;
            }


            /* Check password */
            if (password.trim() === "") {

                showMessage(
                    message,
                    "Please enter your password.",
                    "error"
                );

                return;
            }


            /*
               DEVELOPMENT MODE

               No real database authentication yet.
               Backend authentication will be connected later.
            */

            showMessage(
                message,
                "Student login form is working. Database authentication will be connected in the backend.",
                "success"
            );

        });

    }


    /* =========================================
       6. APPLICANT LOGIN
    ========================================= */

    const applicantLoginForm =
        document.getElementById("applicantLoginForm");

    if (applicantLoginForm) {

        applicantLoginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const applicantId =
                document.getElementById("applicantId").value.trim();

            const password =
                document.getElementById("applicantPassword").value;

            const message =
                document.getElementById("applicantLoginMessage");


            /* Check Applicant ID */
            if (!/^[0-9]{7}$/.test(applicantId)) {

                showMessage(
                    message,
                    "Please enter a valid 7-digit Applicant/Student ID.",
                    "error"
                );

                return;
            }


            /* Check password */
            if (password.trim() === "") {

                showMessage(
                    message,
                    "Please enter your password.",
                    "error"
                );

                return;
            }


            showMessage(
                message,
                "Applicant login form is working. Database authentication will be connected in the backend.",
                "success"
            );

        });

    }


    /* =========================================
       7. ALUMNI LOGIN
    ========================================= */

    const alumniLoginForm =
        document.getElementById("alumniLoginForm");

    if (alumniLoginForm) {

        alumniLoginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const alumniId =
                document.getElementById("alumniId").value.trim();

            const password =
                document.getElementById("alumniPassword").value;

            const message =
                document.getElementById("alumniLoginMessage");


            /* Check Alumni ID */
            if (!/^[0-9]{7}$/.test(alumniId)) {

                showMessage(
                    message,
                    "Please enter a valid 7-digit Student ID.",
                    "error"
                );

                return;
            }


            /* Check password */
            if (password.trim() === "") {

                showMessage(
                    message,
                    "Please enter your password.",
                    "error"
                );

                return;
            }


            showMessage(
                message,
                "Alumni login form is working. Database authentication will be connected in the backend.",
                "success"
            );

        });

    }


    /* =========================================
       8. CREATE ACCOUNT
    ========================================= */

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const role =
                document.getElementById("registerRole").value;

            const studentId =
                document.getElementById("registerStudentId").value.trim();

            const fullName =
                document.getElementById("registerFullName").value.trim();

            const email =
                document.getElementById("registerEmail").value.trim();

            const password =
                document.getElementById("registerPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const terms =
                document.getElementById("registerTerms");

            const message =
                document.getElementById("registerMessage");


            /* =========================================
               VALIDATION
            ========================================= */


            /* Account type */
            if (!role) {

                showMessage(
                    message,
                    "Please select an account type.",
                    "error"
                );

                return;
            }


            /* Student ID */
            if (!/^[0-9]{7}$/.test(studentId)) {

                showMessage(
                    message,
                    "Student ID must contain exactly 7 digits.",
                    "error"
                );

                return;
            }


            /* Full name */
            if (fullName === "") {

                showMessage(
                    message,
                    "Please enter your full name.",
                    "error"
                );

                return;
            }


            if (fullName.length > 50) {

                showMessage(
                    message,
                    "Full Name must not exceed 50 characters.",
                    "error"
                );

                return;
            }


            /* Email */
            if (email === "") {

                showMessage(
                    message,
                    "Please enter your email address.",
                    "error"
                );

                return;
            }


            /* Password */
            if (password.length < 8) {

                showMessage(
                    message,
                    "Password must contain at least 8 characters.",
                    "error"
                );

                return;
            }


            /* Confirm password */
            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            /* Terms */
            if (!terms || !terms.checked) {

                showMessage(
                    message,
                    "Please agree to the Terms and Conditions.",
                    "error"
                );

                return;
            }


            /*
               DEVELOPMENT MODE

               The account is NOT actually stored yet.
               Database/backend will be connected later.
            */

            showMessage(
                message,
                "Account information is valid. Backend account creation will be connected later.",
                "success"
            );

        });

    }


    /* =========================================
       9. VERIFICATION FORM
    ========================================= */

    const verifyForm =
        document.getElementById("verifyForm");

    if (verifyForm) {

        verifyForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const credentialId =
                document.getElementById("credentialId").value.trim();

            const result =
                document.getElementById("verificationResult");


            if (credentialId === "") {

                result.innerHTML = `
                    <div class="login-message show error">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        Please enter a Credential ID.
                    </div>
                `;

                return;
            }


            /*
               DEVELOPMENT MODE

               Actual credential verification will connect
               to the backend/database later.
            */

            result.innerHTML = `
                <div class="login-message show success">
                    <i class="fa-solid fa-circle-check"></i>
                    Credential ID received. Actual verification will be connected to the secure backend.
                </div>
            `;

        });

    }


    /* =========================================
       10. HELPER FUNCTION
    ========================================= */

    function showMessage(element, text, type) {

        if (!element) {
            return;
        }

        element.className = "login-message show " + type;

        element.innerHTML = `
            <i class="fa-solid ${
                type === "success"
                    ? "fa-circle-check"
                    : "fa-circle-exclamation"
            }"></i>
            ${text}
        `;

    }
/* =========================================
   ATCRS PART 5G
   FULLY FUNCTIONAL DEVELOPMENT SYSTEM
   ACCOUNT + SESSION MANAGEMENT
   ========================================= */

const ATCRS_KEYS = {
    accounts: "atcrsAccounts",
    session: "atcrsSession",
    requests: "atcrsRequests",
    credentials: "atcrsCredentials"
};


/* =========================================
   STORAGE HELPERS
   ========================================= */

function getAccounts() {
    return JSON.parse(
        localStorage.getItem(ATCRS_KEYS.accounts) || "[]"
    );
}

function saveAccounts(accounts) {
    localStorage.setItem(
        ATCRS_KEYS.accounts,
        JSON.stringify(accounts)
    );
}

function getRequests() {
    return JSON.parse(
        localStorage.getItem(ATCRS_KEYS.requests) || "[]"
    );
}

function saveRequests(requests) {
    localStorage.setItem(
        ATCRS_KEYS.requests,
        JSON.stringify(requests)
    );
}

function getCredentials() {
    return JSON.parse(
        localStorage.getItem(ATCRS_KEYS.credentials) || "[]"
    );
}

function saveCredentials(credentials) {
    localStorage.setItem(
        ATCRS_KEYS.credentials,
        JSON.stringify(credentials)
    );
}

function getSession() {
    return JSON.parse(
        localStorage.getItem(ATCRS_KEYS.session) || "null"
    );
}

function saveSession(session) {
    localStorage.setItem(
        ATCRS_KEYS.session,
        JSON.stringify(session)
    );
}

function clearSession() {
    localStorage.removeItem(ATCRS_KEYS.session);
}


/* =========================================
   UNIQUE REQUEST ID
   ========================================= */

function generateRequestId() {

    const date = new Date();

    const year = date.getFullYear();

    const random = Math.floor(
        1000 + Math.random() * 9000
    );

    return `REQ-${year}-${random}`;
}


/* =========================================
   UNIQUE CREDENTIAL ID
   ========================================= */

function generateCredentialId() {

    const random = Math.floor(
        100000 + Math.random() * 900000
    );

    return `DLSJBC-${random}`;
}


/* =========================================
   CURRENT USER
   ========================================= */

function getCurrentUser() {

    const session = getSession();

    if (!session) {
        return null;
    }

    return session;
}


/* =========================================
   CREATE USER SESSION
   ========================================= */

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


/* =========================================
   PROTECT PUBLIC USER PAGES
   ========================================= */

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


/* =========================================
   CREATE ACCOUNT ID
   ========================================= */

function generateUserId() {

    return "USER-" +
        Date.now() +
        "-" +
        Math.floor(
            100 + Math.random() * 900
        );
}


/* =========================================
   FIND ACCOUNT BY STUDENT ID
   ========================================= */

function findAccountByStudentId(studentId) {

    const accounts = getAccounts();

    return accounts.find(
        account =>
            account.studentId === studentId
    );
}


/* =========================================
   FIND ACCOUNT BY EMAIL
   ========================================= */

function findAccountByEmail(email) {

    const accounts = getAccounts();

    return accounts.find(
        account =>
            account.email.toLowerCase() ===
            email.toLowerCase()
    );
}

/* =========================================
   PART 5G-2
   FUNCTIONAL ACCOUNT REGISTRATION + LOGIN
   ========================================= */


/* =========================================
   ACCOUNT REGISTRATION
========================================= */

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* -------------------------------------
           GET FORM VALUES
        ------------------------------------- */

        const role =
            document.getElementById("registerRole").value;

        const studentId =
            document.getElementById("registerStudentId").value.trim();

        const fullName =
            document.getElementById("registerFullName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("registerTerms");

        const message =
            document.getElementById("registerMessage");


        /* -------------------------------------
           VALIDATE ACCOUNT TYPE
        ------------------------------------- */

        if (!role) {

            showMessage(
                message,
                "Please select an account type.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           VALIDATE STUDENT ID
           EXACTLY 7 DIGITS
        ------------------------------------- */

        if (!/^[0-9]{7}$/.test(studentId)) {

            showMessage(
                message,
                "Student ID must contain exactly 7 digits.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           VALIDATE FULL NAME
           MAXIMUM 50 CHARACTERS
        ------------------------------------- */

        if (fullName === "") {

            showMessage(
                message,
                "Please enter your full name.",
                "error"
            );

            return;
        }


        if (fullName.length > 50) {

            showMessage(
                message,
                "Full Name must not exceed 50 characters.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           VALIDATE EMAIL
        ------------------------------------- */

        if (email === "") {

            showMessage(
                message,
                "Please enter your email address.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           VALIDATE PASSWORD
        ------------------------------------- */

        if (password.length < 8) {

            showMessage(
                message,
                "Password must contain at least 8 characters.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           CONFIRM PASSWORD
        ------------------------------------- */

        if (password !== confirmPassword) {

            showMessage(
                message,
                "Passwords do not match.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           TERMS AND CONDITIONS
        ------------------------------------- */

        if (!terms || !terms.checked) {

            showMessage(
                message,
                "Please agree to the Terms and Conditions.",
                "error"
            );

            return;
        }


        /* =====================================
           CHECK EXISTING ACCOUNTS
        ===================================== */

        const accounts = getAccounts();


        const existingStudent =
            accounts.find(
                account =>
                    account.studentId === studentId
            );


        if (existingStudent) {

            showMessage(
                message,
                "An account with this Student ID already exists.",
                "error"
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
                message,
                "An account with this email address already exists.",
                "error"
            );

            return;
        }


        /* =====================================
           CREATE NEW ACCOUNT
        ===================================== */

        const newAccount = {

            userId: generateUserId(),

            studentId: studentId,

            fullName: fullName,

            email: email,

            role: role,

            password: password,

            createdAt: new Date().toISOString(),

            updatedAt: new Date().toISOString()

        };


        /* =====================================
           SAVE ACCOUNT
        ===================================== */

        accounts.push(newAccount);

        saveAccounts(accounts);


        /* =====================================
           SUCCESS MESSAGE
        ===================================== */

        showMessage(
            message,
            "Account created successfully. You can now sign in.",
            "success"
        );


        /* =====================================
           CLEAR PASSWORD FIELDS
        ===================================== */

        document.getElementById(
            "registerPassword"
        ).value = "";

        document.getElementById(
            "confirmPassword"
        ).value = "";


        /*
           Keep the account information visible
           so the user can review it.
        */

    });

}


/* =========================================
   STUDENT LOGIN
========================================= */

const studentLoginForm =
    document.getElementById("studentLoginForm");

if (studentLoginForm) {

    studentLoginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const studentId =
            document.getElementById("studentId").value.trim();

        const password =
            document.getElementById("studentPassword").value;

        const message =
            document.getElementById("studentLoginMessage");


        /* -------------------------------------
           VALIDATE STUDENT ID
        ------------------------------------- */

        if (!/^[0-9]{7}$/.test(studentId)) {

            showMessage(
                message,
                "Student ID must contain exactly 7 digits.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           VALIDATE PASSWORD
        ------------------------------------- */

        if (password === "") {

            showMessage(
                message,
                "Please enter your password.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           FIND ACCOUNT
        ------------------------------------- */

        const accounts = getAccounts();

        const account =
            accounts.find(
                user =>
                    user.studentId === studentId &&
                    user.role === "Student"
            );


        if (!account) {

            showMessage(
                message,
                "Student account not found. Please check your Student ID or create an account.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           CHECK PASSWORD
        ------------------------------------- */

        if (account.password !== password) {

            showMessage(
                message,
                "Incorrect password. Please try again.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           CREATE SESSION
        ------------------------------------- */

        createUserSession(account);


        /* -------------------------------------
           LOGIN SUCCESS
        ------------------------------------- */

        showMessage(
            message,
            "Login successful. Redirecting to your dashboard...",
            "success"
        );


        setTimeout(function () {

            window.location.href =
                "user/dashboard.html";

        }, 700);

    });

           }

   /* =========================================
   PART 5G-3
   APPLICANT + ALUMNI FUNCTIONAL LOGIN
   ========================================= */


/* =========================================
   APPLICANT LOGIN
========================================= */

const applicantLoginForm =
    document.getElementById("applicantLoginForm");

if (applicantLoginForm) {

    applicantLoginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* -------------------------------------
           GET LOGIN VALUES
        ------------------------------------- */

        const applicantId =
            document.getElementById("applicantId").value.trim();

        const password =
            document.getElementById("applicantPassword").value;

        const message =
            document.getElementById("applicantLoginMessage");


        /* -------------------------------------
           VALIDATE STUDENT ID
        ------------------------------------- */

        if (!/^[0-9]{7}$/.test(applicantId)) {

            showMessage(
                message,
                "Applicant ID must contain exactly 7 digits.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           VALIDATE PASSWORD
        ------------------------------------- */

        if (password === "") {

            showMessage(
                message,
                "Please enter your password.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           GET REGISTERED ACCOUNTS
        ------------------------------------- */

        const accounts = getAccounts();


        /* -------------------------------------
           FIND APPLICANT ACCOUNT
        ------------------------------------- */

        const account =
            accounts.find(
                user =>
                    user.studentId === applicantId &&
                    user.role === "Applicant"
            );


        /* -------------------------------------
           ACCOUNT NOT FOUND
        ------------------------------------- */

        if (!account) {

            showMessage(
                message,
                "Applicant account not found. Please check your ID or create an account.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           CHECK PASSWORD
        ------------------------------------- */

        if (account.password !== password) {

            showMessage(
                message,
                "Incorrect password. Please try again.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           CREATE SESSION
        ------------------------------------- */

        createUserSession(account);


        /* -------------------------------------
           SUCCESS
        ------------------------------------- */

        showMessage(
            message,
            "Login successful. Redirecting to your dashboard...",
            "success"
        );


        setTimeout(function () {

            window.location.href =
                "user/dashboard.html";

        }, 700);

    });

}


/* =========================================
   ALUMNI LOGIN
========================================= */

const alumniLoginForm =
    document.getElementById("alumniLoginForm");

if (alumniLoginForm) {

    alumniLoginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* -------------------------------------
           GET LOGIN VALUES
        ------------------------------------- */

        const alumniId =
            document.getElementById("alumniId").value.trim();

        const password =
            document.getElementById("alumniPassword").value;

        const message =
            document.getElementById("alumniLoginMessage");


        /* -------------------------------------
           VALIDATE STUDENT ID
        ------------------------------------- */

        if (!/^[0-9]{7}$/.test(alumniId)) {

            showMessage(
                message,
                "Student ID must contain exactly 7 digits.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           VALIDATE PASSWORD
        ------------------------------------- */

        if (password === "") {

            showMessage(
                message,
                "Please enter your password.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           GET REGISTERED ACCOUNTS
        ------------------------------------- */

        const accounts = getAccounts();


        /* -------------------------------------
           FIND ALUMNI ACCOUNT
        ------------------------------------- */

        const account =
            accounts.find(
                user =>
                    user.studentId === alumniId &&
                    user.role === "Alumni"
            );


        /* -------------------------------------
           ACCOUNT NOT FOUND
        ------------------------------------- */

        if (!account) {

            showMessage(
                message,
                "Alumni account not found. Please check your Student ID or create an account.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           CHECK PASSWORD
        ------------------------------------- */

        if (account.password !== password) {

            showMessage(
                message,
                "Incorrect password. Please try again.",
                "error"
            );

            return;
        }


        /* -------------------------------------
           CREATE SESSION
        ------------------------------------- */

        createUserSession(account);


        /* -------------------------------------
           SUCCESS
        ------------------------------------- */

        showMessage(
            message,
            "Login successful. Redirecting to your dashboard...",
            "success"
        );


        setTimeout(function () {

            window.location.href =
                "user/dashboard.html";

        }, 700);

    });

}

   /* =========================================
   PART 5G-4
   LOGOUT + SESSION PROTECTION
   ========================================= */


/* =========================================
   LOGOUT FUNCTION
========================================= */

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        /*
           Remove the current ATCRS session.
           The registered account remains saved.
        */

        clearSession();


        /*
           Return the user to the public login page.
        */

        const currentPath =
            window.location.pathname;

        if (
            currentPath.includes("/user/")
        ) {

            window.location.href =
                "../login.html";

        } else {

            window.location.href =
                "login.html";

        }

    });

}


/* =========================================
   PROTECT USER DASHBOARD
========================================= */

if (
    window.location.pathname.includes("/user/")
) {

    protectUserPage();

}


/* =========================================
   DISPLAY CURRENT USER INFORMATION
========================================= */

function loadCurrentUserInformation() {

    const session = getCurrentUser();

    if (!session) {
        return;
    }


    /* -------------------------------------
       DASHBOARD USER NAME
    ------------------------------------- */

    const dashboardUserName =
        document.getElementById("dashboardUserName");

    if (dashboardUserName) {

        dashboardUserName.textContent =
            session.fullName;

    }


    /* -------------------------------------
       HEADER USER NAME
    ------------------------------------- */

    const profileHeaderName =
        document.getElementById("profileHeaderName");

    if (profileHeaderName) {

        profileHeaderName.textContent =
            session.fullName;

    }


    /* -------------------------------------
       HEADER USER ROLE
    ------------------------------------- */

    const profileHeaderRole =
        document.getElementById("profileHeaderRole");

    if (profileHeaderRole) {

        profileHeaderRole.textContent =
            session.role;

    }


    /* -------------------------------------
       PROFILE NAME
    ------------------------------------- */

    const profileName =
        document.getElementById("profileName");

    if (profileName) {

        profileName.textContent =
            session.fullName;

    }


    /* -------------------------------------
       PROFILE ROLE
    ------------------------------------- */

    const profileRole =
        document.getElementById("profileRole");

    if (profileRole) {

        profileRole.textContent =
            session.role;

    }


    /* -------------------------------------
       PROFILE FULL NAME
    ------------------------------------- */

    const profileFullName =
        document.getElementById("profileFullName");

    if (profileFullName) {

        profileFullName.textContent =
            session.fullName;

    }


    /* -------------------------------------
       PROFILE STUDENT ID
    ------------------------------------- */

    const profileStudentId =
        document.getElementById("profileStudentId");

    if (profileStudentId) {

        profileStudentId.textContent =
            session.studentId;

    }


    /* -------------------------------------
       PROFILE EMAIL
    ------------------------------------- */

    const profileEmail =
        document.getElementById("profileEmail");

    if (profileEmail) {

        profileEmail.textContent =
            session.email;

    }


    /* -------------------------------------
       PROFILE ACCOUNT TYPE
    ------------------------------------- */

    const profileAccountType =
        document.getElementById("profileAccountType");

    if (profileAccountType) {

        profileAccountType.textContent =
            session.role;

    }


    /* -------------------------------------
       DASHBOARD ACCOUNT TYPE
    ------------------------------------- */

    const accountType =
        document.getElementById("accountType");

    if (accountType) {

        accountType.textContent =
            session.role;

    }


    /* -------------------------------------
       DASHBOARD STUDENT ID
    ------------------------------------- */

    const dashboardStudentId =
        document.getElementById("dashboardStudentId");

    if (dashboardStudentId) {

        dashboardStudentId.textContent =
            session.studentId;

    }

}


/* =========================================
   LOAD USER INFORMATION
========================================= */

loadCurrentUserInformation();

   /* =========================================
   PART 5G-5
   FUNCTIONAL DOCUMENT REQUEST SYSTEM
   ========================================= */


/* =========================================
   DOCUMENT REQUEST FORM
========================================= */

const documentRequestForm =
    document.getElementById("documentRequestForm");

if (documentRequestForm) {

    documentRequestForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* -------------------------------------
               CHECK USER SESSION
            ------------------------------------- */

            const session = getCurrentUser();

            if (!session) {

                window.location.href =
                    "../login.html";

                return;
            }


            /* -------------------------------------
               GET FORM ELEMENTS
            ------------------------------------- */

            const documentType =
                document.getElementById("documentType");

            const requestPurpose =
                document.getElementById("requestPurpose");

            const copies =
                document.getElementById("copies");

            const deliveryMethod =
                document.getElementById("deliveryMethod");

            const additionalDetails =
                document.getElementById("additionalDetails");

            const requestAgreement =
                document.getElementById("requestAgreement");

            const requestMessage =
                document.getElementById("requestMessage");


            /* -------------------------------------
               GET VALUES
            ------------------------------------- */

            const selectedDocument =
                documentType
                    ? documentType.value.trim()
                    : "";

            const selectedPurpose =
                requestPurpose
                    ? requestPurpose.value.trim()
                    : "";

            const numberOfCopies =
                copies
                    ? parseInt(copies.value, 10)
                    : 0;

            const selectedDelivery =
                deliveryMethod
                    ? deliveryMethod.value.trim()
                    : "";

            const details =
                additionalDetails
                    ? additionalDetails.value.trim()
                    : "";


            /* =====================================
               VALIDATE DOCUMENT TYPE
            ===================================== */

            if (selectedDocument === "") {

                showMessage(
                    requestMessage,
                    "Please select a document type.",
                    "error"
                );

                return;
            }


            /* =====================================
               VALIDATE PURPOSE
            ===================================== */

            if (selectedPurpose === "") {

                showMessage(
                    requestMessage,
                    "Please select the purpose of your request.",
                    "error"
                );

                return;
            }


            /* =====================================
               VALIDATE NUMBER OF COPIES
            ===================================== */

            if (
                isNaN(numberOfCopies) ||
                numberOfCopies < 1 ||
                numberOfCopies > 10
            ) {

                showMessage(
                    requestMessage,
                    "Number of copies must be between 1 and 10.",
                    "error"
                );

                return;
            }


            /* =====================================
               VALIDATE RELEASE METHOD
            ===================================== */

            if (selectedDelivery === "") {

                showMessage(
                    requestMessage,
                    "Please select a release method.",
                    "error"
                );

                return;
            }


            /* =====================================
               VALIDATE ADDITIONAL DETAILS
            ===================================== */

            if (details.length > 500) {

                showMessage(
                    requestMessage,
                    "Additional details must not exceed 500 characters.",
                    "error"
                );

                return;
            }


            /* =====================================
               VALIDATE AGREEMENT
            ===================================== */

            if (
                !requestAgreement ||
                !requestAgreement.checked
            ) {

                showMessage(
                    requestMessage,
                    "Please confirm that the information provided is correct.",
                    "error"
                );

                return;
            }


            /* =====================================
               CREATE REQUEST
            ===================================== */

            const request = {

                requestId: generateRequestId(),

                userId: session.userId,

                studentId: session.studentId,

                fullName: session.fullName,

                email: session.email,

                accountType: session.role,

                documentType: selectedDocument,

                purpose: selectedPurpose,

                copies: numberOfCopies,

                deliveryMethod: selectedDelivery,

                additionalDetails: details,

                status: "Pending",

                paymentStatus: "Pending",

                clearanceStatus: "Pending",

                credentialId: null,

                dateRequested:
                    new Date().toISOString(),

                updatedAt:
                    new Date().toISOString(),

                processedBy: null

            };


            /* =====================================
               GET EXISTING REQUESTS
            ===================================== */

            const requests = getRequests();


            /* =====================================
               SAVE REQUEST
            ===================================== */

            requests.push(request);

            saveRequests(requests);


            /* =====================================
               SUCCESS MESSAGE
            ===================================== */

            showMessage(
                requestMessage,
                `Request submitted successfully. Your Request ID is ${request.requestId}.`,
                "success"
            );


            /* =====================================
               RESET FORM
            ===================================== */

            documentRequestForm.reset();


            /* =====================================
               REDIRECT AFTER SUBMISSION
            ===================================== */

            setTimeout(function () {

                window.location.href =
                    "requests.html";

            }, 1200);

        }
    );

               }

   /* =========================================
   PART 5G-6
   REQUEST TRACKING + DASHBOARD STATISTICS
   ========================================= */


/* =========================================
   LOAD USER REQUESTS
========================================= */

function getCurrentUserRequests() {

    const session = getCurrentUser();

    if (!session) {
        return [];
    }

    const requests = getRequests();

    return requests.filter(
        request =>
            request.userId === session.userId
    );
}


/* =========================================
   STATUS CLASS HELPER
========================================= */

function getStatusClass(status) {

    switch (status) {

        case "Pending":
            return "pending";

        case "Under Verification":
            return "verification";

        case "Clearance Required":
            return "clearance";

        case "Payment Pending":
            return "payment";

        case "Processing":
            return "processing";

        case "Ready for Release":
            return "ready";

        case "Completed":
            return "completed";

        case "Rejected":
            return "rejected";

        default:
            return "pending";
    }
}


/* =========================================
   FORMAT DATE
========================================= */

function formatRequestDate(dateString) {

    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString(
        "en-PH",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
}


/* =========================================
   LOAD DASHBOARD STATISTICS
========================================= */

function loadDashboardStatistics() {

    const session = getCurrentUser();

    if (!session) {
        return;
    }

    const requests =
        getCurrentUserRequests();


    /* -------------------------------------
       PENDING REQUESTS
    ------------------------------------- */

    const pendingRequests =
        document.getElementById("pendingRequests");

    if (pendingRequests) {

        const count =
            requests.filter(
                request =>
                    request.status === "Pending" ||
                    request.status === "Under Verification" ||
                    request.status === "Clearance Required" ||
                    request.status === "Payment Pending" ||
                    request.status === "Processing"
            ).length;

        pendingRequests.textContent = count;
    }


    /* -------------------------------------
       RELEASED DOCUMENTS
    ------------------------------------- */

    const releasedDocuments =
        document.getElementById("releasedDocuments");

    if (releasedDocuments) {

        const count =
            requests.filter(
                request =>
                    request.status === "Ready for Release" ||
                    request.status === "Completed"
            ).length;

        releasedDocuments.textContent = count;
    }


    /* -------------------------------------
       ACCOUNT TYPE
    ------------------------------------- */

    const accountType =
        document.getElementById("accountType");

    if (accountType) {

        accountType.textContent =
            session.role;
    }


    /* -------------------------------------
       STUDENT ID
    ------------------------------------- */

    const dashboardStudentId =
        document.getElementById("dashboardStudentId");

    if (dashboardStudentId) {

        dashboardStudentId.textContent =
            session.studentId;
    }

}


/* =========================================
   REQUEST HISTORY SUMMARY
========================================= */

function loadRequestSummary() {

    const requests =
        getCurrentUserRequests();


    /* -------------------------------------
       PENDING
    ------------------------------------- */

    const pendingCount =
        document.getElementById(
            "requestPendingCount"
        );

    if (pendingCount) {

        pendingCount.textContent =
            requests.filter(
                request =>
                    request.status === "Pending"
            ).length;
    }


    /* -------------------------------------
       PROCESSING
    ------------------------------------- */

    const processingCount =
        document.getElementById(
            "requestProcessingCount"
        );

    if (processingCount) {

        processingCount.textContent =
            requests.filter(
                request =>
                    request.status === "Processing" ||
                    request.status === "Under Verification" ||
                    request.status === "Clearance Required" ||
                    request.status === "Payment Pending"
            ).length;
    }


    /* -------------------------------------
       READY FOR RELEASE
    ------------------------------------- */

    const readyCount =
        document.getElementById(
            "requestReadyCount"
        );

    if (readyCount) {

        readyCount.textContent =
            requests.filter(
                request =>
                    request.status === "Ready for Release"
            ).length;
    }


    /* -------------------------------------
       COMPLETED
    ------------------------------------- */

    const completedCount =
        document.getElementById(
            "requestCompletedCount"
        );

    if (completedCount) {

        completedCount.textContent =
            requests.filter(
                request =>
                    request.status === "Completed"
            ).length;
    }

}


/* =========================================
   LOAD RECENT REQUESTS
========================================= */

function loadRecentRequests() {

    const table =
        document.getElementById("recentRequests");

    if (!table) {
        return;
    }


    const requests =
        getCurrentUserRequests();


    /* -------------------------------------
       EMPTY STATE
    ------------------------------------- */

    if (requests.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" class="empty-request">
                    <i class="fa-solid fa-file-circle-xmark"></i>
                    <span>No document requests yet.</span>
                </td>
            </tr>
        `;

        return;
    }


    /* -------------------------------------
       SORT NEWEST FIRST
    ------------------------------------- */

    const sortedRequests =
        [...requests].sort(
            (a, b) =>
                new Date(b.dateRequested) -
                new Date(a.dateRequested)
        );


    /* -------------------------------------
       SHOW MOST RECENT 5
    ------------------------------------- */

    const recentRequests =
        sortedRequests.slice(0, 5);


    table.innerHTML =
        recentRequests.map(
            request => {

                const statusClass =
                    getStatusClass(request.status);

                return `
                    <tr>

                        <td>
                            <strong>
                                ${request.requestId}
                            </strong>
                        </td>

                        <td>
                            ${request.documentType}
                        </td>

                        <td>
                            ${formatRequestDate(
                                request.dateRequested
                            )}
                        </td>

                        <td>
                            <span class="request-status ${statusClass}">
                                ${request.status}
                            </span>
                        </td>

                        <td>
                            ${request.copies}
                        </td>

                    </tr>
                `;
            }
        ).join("");

}


/* =========================================
   LOAD FULL REQUEST HISTORY
========================================= */

function loadRequestHistory() {

    const table =
        document.getElementById("requestHistory");

    if (!table) {
        return;
    }


    const requests =
        getCurrentUserRequests();


    /* -------------------------------------
       EMPTY STATE
    ------------------------------------- */

    if (requests.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty-request">
                    <i class="fa-solid fa-folder-open"></i>
                    <span>
                        You have not submitted any document requests.
                    </span>
                </td>
            </tr>
        `;

        return;
    }


    /* -------------------------------------
       SORT NEWEST FIRST
    ------------------------------------- */

    const sortedRequests =
        [...requests].sort(
            (a, b) =>
                new Date(b.dateRequested) -
                new Date(a.dateRequested)
        );


    /* -------------------------------------
       DISPLAY REQUESTS
    ------------------------------------- */

    table.innerHTML =
        sortedRequests.map(
            request => {

                const statusClass =
                    getStatusClass(request.status);

                return `
                    <tr>

                        <td>
                            <strong>
                                ${request.requestId}
                            </strong>
                        </td>

                        <td>
                            ${request.documentType}
                        </td>

                        <td>
                            ${formatRequestDate(
                                request.dateRequested
                            )}
                        </td>

                        <td>
                            ${request.copies}
                        </td>

                        <td>
                            <span class="request-status ${statusClass}">
                                ${request.status}
                            </span>
                        </td>

                        <td>
                            ${request.paymentStatus}
                        </td>

                        <td>
                            ${formatRequestDate(
                                request.updatedAt
                            )}
                        </td>

                    </tr>
                `;
            }
        ).join("");

}


/* =========================================
   INITIALIZE REQUEST DATA
========================================= */

loadDashboardStatistics();

loadRequestSummary();

loadRecentRequests();

loadRequestHistory();

  /* =========================================
   PART 5G-7
   FUNCTIONAL DIGITAL CREDENTIALS
   ========================================= */


/* =========================================
   LOAD USER DIGITAL CREDENTIALS
========================================= */

function loadUserDocuments() {

    const container =
        document.getElementById("userDocuments");

    if (!container) {
        return;
    }


    const session = getCurrentUser();

    if (!session) {
        return;
    }


    const credentials =
        getCredentials();


    /* -------------------------------------
       ONLY SHOW CURRENT USER CREDENTIALS
    ------------------------------------- */

    const userCredentials =
        credentials.filter(
            credential =>
                credential.userId === session.userId ||
                credential.studentId === session.studentId
        );


    /* -------------------------------------
       EMPTY STATE
    ------------------------------------- */

    if (userCredentials.length === 0) {

        container.innerHTML = `
            <div class="empty-request">

                <i class="fa-solid fa-file-circle-xmark"></i>

                <h3>No Documents Available</h3>

                <p>
                    Your released academic credentials
                    will appear here after Registrar processing.
                </p>

            </div>
        `;

        return;
    }


    /* -------------------------------------
       DISPLAY CREDENTIALS
    ------------------------------------- */

    container.innerHTML =
        userCredentials.map(
            credential => {

                return `
                    <div class="user-document-card">

                        <div class="user-document-icon">
                            <i class="fa-solid fa-file-certificate"></i>
                        </div>

                        <div class="user-document-content">

                            <h3>
                                ${credential.documentType}
                            </h3>

                            <p>
                                Credential ID:
                                <strong>
                                    ${credential.credentialId}
                                </strong>
                            </p>

                            <p>
                                Date Issued:
                                ${formatRequestDate(
                                    credential.issueDate
                                )}
                            </p>

                            <span class="document-status">
                                <i class="fa-solid fa-circle-check"></i>
                                ${credential.status}
                            </span>

                        </div>

                        <div class="user-document-actions">

                            <button
                                type="button"
                                class="btn btn-green"
                                onclick="viewCredential('${credential.credentialId}')"
                            >
                                <i class="fa-solid fa-eye"></i>
                                View
                            </button>

                            <button
                                type="button"
                                class="btn btn-outline"
                                onclick="downloadCredential('${credential.credentialId}')"
                            >
                                <i class="fa-solid fa-download"></i>
                                Download
                            </button>

                        </div>

                    </div>
                `;
            }
        ).join("");

}


/* =========================================
   FIND CREDENTIAL
========================================= */

function findCredential(credentialId) {

    const credentials =
        getCredentials();

    return credentials.find(
        credential =>
            credential.credentialId === credentialId
    );
}


/* =========================================
   VIEW CREDENTIAL
========================================= */

function viewCredential(credentialId) {

    const credential =
        findCredential(credentialId);

    if (!credential) {

        alert(
            "Credential could not be found."
        );

        return;
    }


    const session =
        getCurrentUser();


    /* -------------------------------------
       SECURITY CHECK
    ------------------------------------- */

    if (!session) {

        window.location.href =
            "../login.html";

        return;
    }


    if (
        credential.userId !== session.userId &&
        credential.studentId !== session.studentId
    ) {

        alert(
            "You are not authorized to view this credential."
        );

        return;
    }


    /* -------------------------------------
       CREATE CREDENTIAL VIEW
    ------------------------------------- */

    const credentialWindow =
        window.open(
            "",
            "_blank"
        );


    if (!credentialWindow) {

        alert(
            "Please allow pop-ups to view your credential."
        );

        return;
    }


    credentialWindow.document.write(`

        <!DOCTYPE html>

        <html lang="en">

        <head>

            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <title>
                ${credential.documentType}
                | ATCRS
            </title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 40px 20px;
                    background: #f5f7f6;
                    font-family: Arial, sans-serif;
                    color: #111111;
                }

                .credential {
                    max-width: 850px;
                    margin: auto;
                    background: #ffffff;
                    border: 4px solid #0b5d3f;
                    padding: 45px;
                    box-shadow:
                        0 15px 40px rgba(
                            0,
                            0,
                            0,
                            0.12
                        );
                }

                .credential-header {
                    text-align: center;
                    border-bottom: 2px solid #d4af37;
                    padding-bottom: 25px;
                    margin-bottom: 30px;
                }

                .credential-header h1 {
                    margin: 0;
                    color: #0b5d3f;
                    font-size: 30px;
                }

                .credential-header h2 {
                    margin: 10px 0 0;
                    font-size: 22px;
                }

                .credential-header p {
                    margin: 8px 0 0;
                    color: #666666;
                }

                .credential-body {
                    line-height: 1.8;
                }

                .credential-row {
                    display: grid;
                    grid-template-columns:
                        220px 1fr;
                    gap: 15px;
                    padding: 12px 0;
                    border-bottom: 1px solid #eeeeee;
                }

                .credential-row strong {
                    color: #0b5d3f;
                }

                .credential-id {
                    margin-top: 30px;
                    padding: 20px;
                    text-align: center;
                    background: #eaf7f0;
                    border: 1px solid #d4af37;
                }

                .credential-id strong {
                    display: block;
                    margin-top: 8px;
                    color: #0b5d3f;
                    font-size: 24px;
                    letter-spacing: 1px;
                }

                .verified {
                    margin-top: 25px;
                    text-align: center;
                    color: #16a34a;
                    font-weight: bold;
                }

                .footer {
                    margin-top: 35px;
                    text-align: center;
                    font-size: 13px;
                    color: #777777;
                }

                @media print {

                    body {
                        padding: 0;
                        background: #ffffff;
                    }

                    .credential {
                        box-shadow: none;
                    }

                }

            </style>

        </head>

        <body>

            <div class="credential">

                <div class="credential-header">

                    <h1>
                        DE LA SALLE JOHN BOSCO COLLEGE
                    </h1>

                    <h2>
                        ${credential.documentType}
                    </h2>

                    <p>
                        Automated Transcript and Credential Retrieval System
                    </p>

                </div>


                <div class="credential-body">

                    <div class="credential-row">

                        <strong>
                            Student Name
                        </strong>

                        <span>
                            ${credential.fullName}
                        </span>

                    </div>


                    <div class="credential-row">

                        <strong>
                            Student ID
                        </strong>

                        <span>
                            ${credential.studentId}
                        </span>

                    </div>


                    <div class="credential-row">

                        <strong>
                            Document Type
                        </strong>

                        <span>
                            ${credential.documentType}
                        </span>

                    </div>


                    <div class="credential-row">

                        <strong>
                            Date Issued
                        </strong>

                        <span>
                            ${formatRequestDate(
                                credential.issueDate
                            )}
                        </span>

                    </div>


                    <div class="credential-row">

                        <strong>
                            Status
                        </strong>

                        <span>
                            ${credential.status}
                        </span>

                    </div>

                </div>


                <div class="credential-id">

                    Credential ID

                    <strong>
                        ${credential.credentialId}
                    </strong>

                </div>


                <div class="verified">

                    ✓ Digitally Released Through ATCRS

                </div>


                <div class="footer">

                    This digital credential can be verified
                    using the ATCRS Credential Verification System.

                </div>

            </div>

        </body>

        </html>

    `);


    credentialWindow.document.close();

}


/* =========================================
   DOWNLOAD CREDENTIAL
========================================= */

function downloadCredential(credentialId) {

    const credential =
        findCredential(credentialId);

    if (!credential) {

        alert(
            "Credential could not be found."
        );

        return;
    }


    const session =
        getCurrentUser();


    if (!session) {

        window.location.href =
            "../login.html";

        return;
    }


    /* -------------------------------------
       SECURITY CHECK
    ------------------------------------- */

    if (
        credential.userId !== session.userId &&
        credential.studentId !== session.studentId
    ) {

        alert(
            "You are not authorized to download this credential."
        );

        return;
    }


    /*
       Development prototype:

       Opens the credential in a printable
       browser window. The user can select
       "Save as PDF" from the browser.
    */

    viewCredential(credentialId);

}


/* =========================================
   INITIALIZE DIGITAL CREDENTIALS
========================================= */

loadUserDocuments();

   /* =========================================
   PART 5G-8
   FUNCTIONAL CREDENTIAL VERIFICATION
   ========================================= */


/* =========================================
   PUBLIC CREDENTIAL VERIFICATION
========================================= */

const verifyForm =
    document.getElementById("verifyForm");

if (verifyForm) {

    verifyForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* -------------------------------------
               GET ELEMENTS
            ------------------------------------- */

            const credentialInput =
                document.getElementById("credentialId");

            const result =
                document.getElementById(
                    "verificationResult"
                );


            if (!credentialInput || !result) {
                return;
            }


            /* -------------------------------------
               GET CREDENTIAL ID
            ------------------------------------- */

            const credentialId =
                credentialInput.value.trim();


            /* -------------------------------------
               EMPTY CHECK
            ------------------------------------- */

            if (credentialId === "") {

                result.innerHTML = `
                    <div class="login-message show error">

                        <i class="fa-solid fa-circle-exclamation"></i>

                        Please enter a Credential ID.

                    </div>
                `;

                return;
            }


            /* -------------------------------------
               GET STORED CREDENTIALS
            ------------------------------------- */

            const credentials =
                getCredentials();


            /* -------------------------------------
               SEARCH CREDENTIAL
            ------------------------------------- */

            const credential =
                credentials.find(
                    item =>
                        item.credentialId.toLowerCase() ===
                        credentialId.toLowerCase()
                );


            /* =====================================
               CREDENTIAL NOT FOUND
            ===================================== */

            if (!credential) {

                result.innerHTML = `

                    <div class="login-message show error">

                        <i class="fa-solid fa-circle-xmark"></i>

                        <strong>
                            Credential Not Found
                        </strong>

                        <br>

                        The Credential ID entered could not
                        be found in the ATCRS verification
                        records.

                    </div>

                `;

                return;
            }


            /* =====================================
               CHECK CREDENTIAL STATUS
            ===================================== */

            if (
                credential.status !== "Valid" &&
                credential.status !== "Released"
            ) {

                result.innerHTML = `

                    <div class="login-message show error">

                        <i class="fa-solid fa-triangle-exclamation"></i>

                        <strong>
                            Credential Not Valid
                        </strong>

                        <br>

                        This credential is not currently
                        marked as valid.

                    </div>

                `;

                return;
            }


            /* =====================================
               VERIFIED CREDENTIAL
            ===================================== */

            result.innerHTML = `

                <div class="verification-success">

                    <div class="verification-icon">

                        <i class="fa-solid fa-circle-check"></i>

                    </div>


                    <h3>
                        Credential Verified
                    </h3>


                    <p>
                        This credential was successfully
                        found in the ATCRS verification records.
                    </p>


                    <div class="verification-details">

                        <div class="verification-detail">

                            <span>
                                Credential ID
                            </span>

                            <strong>
                                ${credential.credentialId}
                            </strong>

                        </div>


                        <div class="verification-detail">

                            <span>
                                Student Name
                            </span>

                            <strong>
                                ${credential.fullName}
                            </strong>

                        </div>


                        <div class="verification-detail">

                            <span>
                                Student ID
                            </span>

                            <strong>
                                ${credential.studentId}
                            </strong>

                        </div>


                        <div class="verification-detail">

                            <span>
                                Document Type
                            </span>

                            <strong>
                                ${credential.documentType}
                            </strong>

                        </div>


                        <div class="verification-detail">

                            <span>
                                Date Issued
                            </span>

                            <strong>
                                ${formatRequestDate(
                                    credential.issueDate
                                )}
                            </strong>

                        </div>


                        <div class="verification-detail">

                            <span>
                                Verification Status
                            </span>

                            <strong class="verified-text">

                                <i class="fa-solid fa-shield-check"></i>

                                Verified

                            </strong>

                        </div>

                    </div>


                    <div class="verification-notice">

                        <i class="fa-solid fa-shield-halved"></i>

                        <span>
                            This credential record was found
                            in the ATCRS development verification
                            database.
                        </span>

                    </div>

                </div>

            `;

        }
    );

}


/* =========================================
   CLEAR VERIFICATION RESULT
========================================= */

const credentialInput =
    document.getElementById("credentialId");

if (credentialInput) {

    credentialInput.addEventListener(
        "input",
        function () {

            const result =
                document.getElementById(
                    "verificationResult"
                );

            if (result) {

                result.innerHTML = "";

            }

        }
    );

}
/* =========================================
   PART 5G-9
   PUBLIC USER SYSTEM INTEGRATION & CLEANUP
   ========================================= */


/* =========================================
   ROLE SELECTOR
   STUDENT / APPLICANT / ALUMNI
   ========================================= */

const roleOptionsFinal = document.querySelectorAll(".role-option");
const loginFormsFinal = document.querySelectorAll(".login-form");

roleOptionsFinal.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedRole = this.getAttribute("data-role");

        /* Remove active from ALL roles */
        roleOptionsFinal.forEach(function (item) {
            item.classList.remove("active");
        });

        /* Highlight ONLY selected role */
        this.classList.add("active");

        /* Hide ALL login forms */
        loginFormsFinal.forEach(function (form) {
            form.style.display = "none";
        });

        /* Show selected login form */
        const selectedForm = document.getElementById(
            selectedRole + "LoginForm"
        );

        if (selectedForm) {
            selectedForm.style.display = "block";
        }

    });

});


/* =========================================
   FINAL PUBLIC USER SESSION CHECK
   ========================================= */

function finalProtectUserPage() {

    if (!window.location.pathname.includes("/user/")) {
        return;
    }

    const session = getCurrentUser();

    if (!session) {
        window.location.href = "../login.html";
        return;
    }

    const allowedRoles = [
        "Student",
        "Applicant",
        "Alumni"
    ];

    if (!allowedRoles.includes(session.role)) {

        clearSession();

        window.location.href = "../login.html";

        return;
    }

}


/* =========================================
   LOAD CURRENT USER INFORMATION
   ========================================= */

function finalLoadUserInformation() {

    const session = getCurrentUser();

    if (!session) {
        return;
    }

    const userNameElements = [
        "dashboardUserName",
        "profileHeaderName",
        "profileName",
        "profileFullName"
    ];

    userNameElements.forEach(function (id) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = session.fullName;
        }

    });


    const roleElements = [
        "profileHeaderRole",
        "profileRole",
        "profileAccountType",
        "accountType"
    ];

    roleElements.forEach(function (id) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = session.role;
        }

    });


    const studentIdElements = [
        "dashboardStudentId",
        "profileStudentId"
    ];

    studentIdElements.forEach(function (id) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = session.studentId;
        }

    });


    const emailElement = document.getElementById("profileEmail");

    if (emailElement) {
        emailElement.textContent = session.email;
    }

}


/* =========================================
   FINAL LOGOUT
   ========================================= */

const finalLogoutButton = document.getElementById("logoutButton");

if (finalLogoutButton) {

    finalLogoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        clearSession();

        window.location.href = "../login.html";

    });

}


/* =========================================
   SECURITY CHECK FOR REQUESTS
   ========================================= */

function finalGetUserRequests() {

    const session = getCurrentUser();

    if (!session) {
        return [];
    }

    const requests = getRequests();

    return requests.filter(function (request) {

        return (
            request.userId === session.userId ||
            request.studentId === session.studentId
        );

    });

}


/* =========================================
   SECURITY CHECK FOR CREDENTIALS
   ========================================= */

function finalGetUserCredentials() {

    const session = getCurrentUser();

    if (!session) {
        return [];
    }

    const credentials = getCredentials();

    return credentials.filter(function (credential) {

        return (
            credential.userId === session.userId ||
            credential.studentId === session.studentId
        );

    });

}


/* =========================================
   VERIFY CREDENTIAL
   ========================================= */

const finalVerifyForm = document.getElementById("verifyForm");

if (finalVerifyForm) {

    finalVerifyForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const credentialInput =
            document.getElementById("credentialId");

        const result =
            document.getElementById("verificationResult");

        if (!credentialInput || !result) {
            return;
        }

        const credentialId =
            credentialInput.value.trim().toUpperCase();

        if (!credentialId) {

            result.innerHTML = `
                <div class="verification-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Credential ID Required</h3>
                    <p>
                        Please enter a credential ID to continue.
                    </p>
                </div>
            `;

            return;
        }


        const credentials = getCredentials();

        const credential = credentials.find(function (item) {

            return (
                String(item.credentialId).toUpperCase() ===
                credentialId
            );

        });


        if (!credential) {

            result.innerHTML = `
                <div class="verification-error">
                    <div class="verification-icon">
                        <i class="fas fa-times"></i>
                    </div>

                    <h3>Credential Not Found</h3>

                    <p>
                        No credential matching
                        <strong>${credentialId}</strong>
                        was found in the ATCRS verification database.
                    </p>
                </div>
            `;

            return;
        }


        const credentialStatus =
            String(credential.status || "").toLowerCase();


        if (
            credentialStatus !== "valid" &&
            credentialStatus !== "released"
        ) {

            result.innerHTML = `
                <div class="verification-error">

                    <div class="verification-icon">
                        <i class="fas fa-ban"></i>
                    </div>

                    <h3>Credential Not Valid</h3>

                    <p>
                        This credential is currently not
                        available for verification.
                    </p>

                </div>
            `;

            return;
        }


        result.innerHTML = `
            <div class="verification-success">

                <div class="verification-icon">
                    <i class="fas fa-check"></i>
                </div>

                <h3>Credential Verified</h3>

                <p>
                    The credential was successfully found
                    in the ATCRS verification database.
                </p>


                <div class="verification-details">

                    <div class="verification-detail">
                        <span>Credential ID</span>
                        <strong>
                            ${credential.credentialId}
                        </strong>
                    </div>


                    <div class="verification-detail">
                        <span>Student Name</span>
                        <strong>
                            ${credential.fullName || "Not Available"}
                        </strong>
                    </div>


                    <div class="verification-detail">
                        <span>Student ID</span>
                        <strong>
                            ${credential.studentId || "Not Available"}
                        </strong>
                    </div>


                    <div class="verification-detail">
                        <span>Document Type</span>
                        <strong>
                            ${credential.documentType || "Academic Credential"}
                        </strong>
                    </div>


                    <div class="verification-detail">
                        <span>Date Issued</span>
                        <strong>
                            ${
                                credential.issueDate
                                ? formatRequestDate(credential.issueDate)
                                : "Not Available"
                            }
                        </strong>
                    </div>


                    <div class="verification-detail">
                        <span>Verification Status</span>
                        <strong class="verified-text">
                            Verified
                        </strong>
                    </div>

                </div>


                <div class="verification-notice">

                    <i class="fas fa-shield-alt"></i>

                    <span>
                        This credential record was found in
                        the ATCRS development verification
                        database.
                    </span>

                </div>

            </div>
        `;

    });


    /* Clear result when user changes credential ID */

    const finalCredentialInput =
        document.getElementById("credentialId");

    if (finalCredentialInput) {

        finalCredentialInput.addEventListener(
            "input",
            function () {

                const result =
                    document.getElementById(
                        "verificationResult"
                    );

                if (result) {
                    result.innerHTML = "";
                }

            }
        );

    }

}


/* =========================================
   FINAL PAGE INITIALIZATION
   ========================================= */

finalProtectUserPage();

finalLoadUserInformation();


/* =========================================
   FINAL REQUEST / CREDENTIAL REFRESH
   ========================================= */

if (window.location.pathname.includes("/user/")) {

    if (typeof loadDashboardStatistics === "function") {
        loadDashboardStatistics();
    }

    if (typeof loadRequestSummary === "function") {
        loadRequestSummary();
    }

    if (typeof loadRecentRequests === "function") {
        loadRecentRequests();
    }

    if (typeof loadRequestHistory === "function") {
        loadRequestHistory();
    }

    if (typeof loadUserDocuments === "function") {
        loadUserDocuments();
    }

}
   
});
/* =========================================
   TERMS OF USE
   ========================================= */

const openTerms = document.getElementById("openTerms");
const termsContent = document.getElementById("termsOfUse");

if (openTerms && termsContent) {

    openTerms.addEventListener("click", function (event) {

        event.preventDefault();

        termsContent.classList.toggle("show");

    });

}
/* =========================================
   PART 6A
   REGISTRAR LOGIN
   DEVELOPMENT MODE
   ========================================= */

const registrarLoginForm =
    document.getElementById("registrarLoginForm");

if (registrarLoginForm) {

    registrarLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const registrarId =
                document
                    .getElementById("registrarId")
                    .value
                    .trim();

            const registrarPassword =
                document
                    .getElementById("registrarPassword")
                    .value;

            const message =
                document.getElementById(
                    "registrarLoginMessage"
                );


            /* Clear previous message */

            message.className = "form-message";
            message.textContent = "";


            /* Validate Registrar ID */

            if (!registrarId) {

                showMessage(
                    message,
                    "Please enter your Registrar ID.",
                    "error"
                );

                return;
            }


            /* Validate Password */

            if (!registrarPassword) {

                showMessage(
                    message,
                    "Please enter your password.",
                    "error"
                );

                return;
            }


            /*
             * DEVELOPMENT LOGIN
             *
             * Temporary credentials are used only
             * for frontend development.
             *
             * Do NOT use real credentials here.
             */

            const developmentRegistrarId =
                "REG0001";

            const developmentRegistrarPassword =
                "Registrar123";


            if (
                registrarId === developmentRegistrarId &&
                registrarPassword ===
                developmentRegistrarPassword
            ) {

                const registrarSession = {

                    userId: "REG-0001",

                    registrarId: registrarId,

                    fullName:
                        "DLSJBC Registrar",

                    role: "Registrar",

                    loginTime:
                        new Date().toISOString()

                };


                /*
                 * Save separate Registrar session
                 */

                localStorage.setItem(
                    "atcrsRegistrarSession",
                    JSON.stringify(
                        registrarSession
                    )
                );


                showMessage(
                    message,
                    "Login successful. Opening Registrar Dashboard...",
                    "success"
                );


                setTimeout(function () {

                    window.location.href =
                        "dashboard.html";

                }, 700);


            } else {

                showMessage(
                    message,
                    "Invalid Registrar ID or password.",
                    "error"
                );

            }

        }
    );

}
/* =========================================================
   PART 6B3 — REGISTRAR DASHBOARD JAVASCRIPT
   ========================================================= */

function getRegistrarSession() {
    return JSON.parse(
        localStorage.getItem("atcrsRegistrarSession") || "null"
    );
}


/* ================= PROTECT REGISTRAR PAGE ================= */

function protectRegistrarPage() {

    const session = getRegistrarSession();

    if (!session) {
        window.location.href = "login.html";
        return false;
    }

    if (session.role !== "Registrar") {
        localStorage.removeItem("atcrsRegistrarSession");
        window.location.href = "login.html";
        return false;
    }

    return true;
}


/* ================= LOAD REGISTRAR INFORMATION ================= */

function loadRegistrarInformation() {

    const session = getRegistrarSession();

    if (!session) return;

    const registrarName =
        document.getElementById("registrarName");

    const registrarHeaderName =
        document.getElementById("registrarHeaderName");

    if (registrarName) {
        registrarName.textContent = session.fullName;
    }

    if (registrarHeaderName) {
        registrarHeaderName.textContent = session.fullName;
    }
}


/* ================= LOAD STATISTICS ================= */

function loadRegistrarStatistics() {

    const requests = getRequests();

    const totalRequests = requests.length;

    const pendingRequests = requests.filter(
        request =>
            request.status === "Pending"
    ).length;

    const processingRequests = requests.filter(
        request =>
            request.status === "Processing" ||
            request.status === "Under Verification" ||
            request.status === "Clearance Required" ||
            request.status === "Payment Pending"
    ).length;

    const readyRequests = requests.filter(
        request =>
            request.status === "Ready for Release"
    ).length;


    const totalElement =
        document.getElementById("registrarTotalRequests");

    const pendingElement =
        document.getElementById("registrarPendingRequests");

    const processingElement =
        document.getElementById("registrarProcessingRequests");

    const readyElement =
        document.getElementById("registrarReadyRequests");


    if (totalElement) {
        totalElement.textContent = totalRequests;
    }

    if (pendingElement) {
        pendingElement.textContent = pendingRequests;
    }

    if (processingElement) {
        processingElement.textContent = processingRequests;
    }

    if (readyElement) {
        readyElement.textContent = readyRequests;
    }
}


/* ================= RECENT REQUESTS ================= */

function loadRegistrarRecentRequests() {

    const tableBody =
        document.getElementById("registrarRecentRequests");

    if (!tableBody) return;

    const requests = getRequests();

    if (!requests.length) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table">
                    No document requests have been submitted yet.
                </td>
            </tr>
        `;

        return;
    }


    const sortedRequests = [...requests]
        .sort(
            (a, b) =>
                new Date(b.dateRequested) -
                new Date(a.dateRequested)
        )
        .slice(0, 5);


    tableBody.innerHTML = "";


    sortedRequests.forEach(request => {

        let statusClass = "status-pending";

        if (
            request.status === "Processing" ||
            request.status === "Under Verification" ||
            request.status === "Payment Pending"
        ) {
            statusClass = "status-processing";
        }

        if (
            request.status === "Ready for Release"
        ) {
            statusClass = "status-ready";
        }

        if (
            request.status === "Completed"
        ) {
            statusClass = "status-completed";
        }

        if (
            request.status === "Rejected"
        ) {
            statusClass = "status-rejected";
        }


        const dateRequested =
            request.dateRequested
                ? new Date(request.dateRequested)
                    .toLocaleDateString()
                : "—";


        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${request.requestId || "—"}</strong>
            </td>

            <td>
                ${request.fullName || "—"}
            </td>

            <td>
                ${request.documentType || "—"}
            </td>

            <td>
                ${dateRequested}
            </td>

            <td>
                <span class="status-badge ${statusClass}">
                    ${request.status || "Pending"}
                </span>
            </td>

            <td>
                ${request.paymentStatus || "Pending"}
            </td>
        `;

        tableBody.appendChild(row);
    });
}


/* ================= REGISTRAR LOGOUT ================= */

function setupRegistrarLogout() {

    const logoutButton =
        document.getElementById("registrarLogoutButton");

    if (!logoutButton) return;

    logoutButton.addEventListener("click", function () {

        const confirmLogout =
            confirm(
                "Are you sure you want to log out of the Registrar Dashboard?"
            );

        if (!confirmLogout) return;

        localStorage.removeItem(
            "atcrsRegistrarSession"
        );

        window.location.href = "login.html";

    });
}


/* ================= INITIALIZE DASHBOARD ================= */

function initializeRegistrarDashboard() {

    const isRegistrarPage =
        document.body.classList.contains(
            "registrar-dashboard"
        );

    if (!isRegistrarPage) return;

    if (!protectRegistrarPage()) return;

    loadRegistrarInformation();

    loadRegistrarStatistics();

    loadRegistrarRecentRequests();

    setupRegistrarLogout();
}


/* ================= START REGISTRAR DASHBOARD ================= */

initializeRegistrarDashboard();
/* =========================================================
   PART 6C-3 — REGISTRAR REQUEST MANAGEMENT JAVASCRIPT
   ========================================================= */


/* ================= REQUEST DATE ================= */

function registrarRequestDate(dateValue) {

    if (!dateValue) {
        return "—";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString();
}


/* ================= REQUEST STATUS BADGE ================= */

function registrarRequestStatusBadge(status) {

    let statusClass = "status-pending";

    if (
        status === "Under Verification" ||
        status === "Clearance Required" ||
        status === "Payment Pending" ||
        status === "Processing"
    ) {
        statusClass = "status-processing";
    }

    if (status === "Ready for Release") {
        statusClass = "status-ready";
    }

    if (status === "Completed") {
        statusClass = "status-completed";
    }

    if (status === "Rejected") {
        statusClass = "status-rejected";
    }

    return `
        <span class="status-badge ${statusClass}">
            ${status || "Pending"}
        </span>
    `;
}


/* ================= PAYMENT BADGE ================= */

function registrarPaymentStatusBadge(paymentStatus) {

    if (!paymentStatus) {
        paymentStatus = "Pending";
    }

    let statusClass = "status-pending";

    if (
        paymentStatus === "Paid" ||
        paymentStatus === "Payment Verified" ||
        paymentStatus === "Payment Waived"
    ) {
        statusClass = "status-completed";
    }

    if (
        paymentStatus === "Payment Submitted"
    ) {
        statusClass = "status-processing";
    }

    if (
        paymentStatus === "Payment Failed"
    ) {
        statusClass = "status-rejected";
    }

    return `
        <span class="status-badge ${statusClass}">
            ${paymentStatus}
        </span>
    `;
}


/* ================= UPDATE REQUEST ================= */

function updateRegistrarRequest(requestId, changes) {

    const requests = getRequests();

    const index = requests.findIndex(
        request =>
            request.requestId === requestId
    );

    if (index === -1) {
        return false;
    }

    requests[index] = {
        ...requests[index],
        ...changes,
        updatedAt: new Date().toISOString()
    };

    saveRequests(requests);

    return true;
}


/* ================= LOAD REQUEST MANAGEMENT ================= */

function loadRegistrarRequestManagement() {

    const tableBody =
        document.getElementById(
            "registrarRequestTable"
        );

    if (!tableBody) {
        return;
    }


    const requests = getRequests();


    /* ================= SORT ================= */

    const sortedRequests = [...requests].sort(
        (a, b) =>
            new Date(b.dateRequested || 0) -
            new Date(a.dateRequested || 0)
    );


    /* ================= STATISTICS ================= */

    const total =
        sortedRequests.length;

    const pending =
        sortedRequests.filter(
            request =>
                request.status === "Pending"
        ).length;

    const paymentPending =
        sortedRequests.filter(
            request =>
                request.paymentStatus === "Pending" ||
                request.paymentStatus === "Pending Payment"
        ).length;

    const processing =
        sortedRequests.filter(
            request =>
                request.status === "Processing" ||
                request.status === "Under Verification" ||
                request.status === "Clearance Required" ||
                request.status === "Payment Pending"
        ).length;


    const totalElement =
        document.getElementById(
            "registrarRequestTotal"
        );

    const pendingElement =
        document.getElementById(
            "registrarRequestPending"
        );

    const paymentElement =
        document.getElementById(
            "registrarRequestPayment"
        );

    const processingElement =
        document.getElementById(
            "registrarRequestProcessing"
        );


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (pendingElement) {
        pendingElement.textContent = pending;
    }

    if (paymentElement) {
        paymentElement.textContent =
            paymentPending;
    }

    if (processingElement) {
        processingElement.textContent =
            processing;
    }


    /* ================= EMPTY ================= */

    if (!sortedRequests.length) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    class="empty-table"
                >
                    No document requests have been submitted yet.
                </td>
            </tr>
        `;

        return;
    }


    /* ================= RENDER TABLE ================= */

    tableBody.innerHTML = "";


    sortedRequests.forEach(request => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <span class="request-id">
                    ${request.requestId || "—"}
                </span>
            </td>


            <td>

                <span class="request-student-name">
                    ${request.fullName || "—"}
                </span>

                <span class="request-student-id">
                    Student ID:
                    ${request.studentId || "—"}
                </span>

            </td>


            <td>

                <div class="request-document">
                    ${request.documentType || "—"}
                </div>

            </td>


            <td>
                ${registrarRequestDate(
                    request.dateRequested
                )}
            </td>


            <td>
                ${registrarRequestStatusBadge(
                    request.status
                )}
            </td>


            <td>
                ${registrarPaymentStatusBadge(
                    request.paymentStatus
                )}
            </td>


            <td>

                <button
                    type="button"
                    class="request-view-button"
                    onclick="openRegistrarRequestDetails('${request.requestId}')"
                >
                    View
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}
/* =========================================================
   PART 6C-4 — REQUEST DETAILS MODAL
   ========================================================= */

let currentRegistrarRequestId = null;


/* ================= CREATE MODAL ================= */

function createRegistrarRequestModal() {

    if (
        document.getElementById(
            "registrarRequestModal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");

    modal.id =
        "registrarRequestModal";

    modal.className =
        "request-modal";


    modal.innerHTML = `

        <div class="request-modal-content">


            <!-- HEADER -->

            <div class="request-modal-header">

                <div>

                    <h3>
                        Document Request Details
                    </h3>

                    <p id="requestModalId">
                        Request ID
                    </p>

                </div>


                <button
                    type="button"
                    class="request-modal-close"
                    onclick="closeRegistrarRequestDetails()"
                >
                    ×
                </button>

            </div>


            <!-- BODY -->

            <div class="request-modal-body">


                <div
                    id="requestModalDetails"
                    class="request-details-grid"
                >
                </div>


                <!-- CONTROLS -->

                <div class="request-control-grid">


                    <!-- REQUEST STATUS -->

                    <div class="request-control-group">

                        <label for="registrarRequestStatus">
                            Request Status
                        </label>

                        <select
                            id="registrarRequestStatus"
                        >

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Under Verification">
                                Under Verification
                            </option>

                            <option value="Clearance Required">
                                Clearance Required
                            </option>

                            <option value="Payment Pending">
                                Payment Pending
                            </option>

                            <option value="Processing">
                                Processing
                            </option>

                            <option value="Ready for Release">
                                Ready for Release
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>

                        </select>

                    </div>


                    <!-- CLEARANCE -->

                    <div class="request-control-group">

                        <label for="registrarClearanceStatus">
                            Clearance Status
                        </label>

                        <select
                            id="registrarClearanceStatus"
                        >

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="For Review">
                                For Review
                            </option>

                            <option value="Cleared">
                                Cleared
                            </option>

                            <option value="Not Cleared">
                                Not Cleared
                            </option>

                        </select>

                    </div>


                    <!-- PAYMENT -->

                    <div class="request-control-group">

                        <label for="registrarPaymentStatus">
                            Payment Status
                        </label>

                        <select
                            id="registrarPaymentStatus"
                        >

                            <option value="Pending Payment">
                                Pending Payment
                            </option>

                            <option value="Payment Submitted">
                                Payment Submitted
                            </option>

                            <option value="Payment Verified">
                                Payment Verified
                            </option>

                            <option value="Payment Failed">
                                Payment Failed
                            </option>

                            <option value="Payment Waived">
                                Payment Waived
                            </option>

                            <option value="Paid">
                                Paid
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            <!-- FOOTER -->

            <div class="request-modal-footer">

                <span
                    id="requestModalMessage"
                    class="request-modal-message"
                >
                </span>


                <button
                    type="button"
                    class="request-cancel-button"
                    onclick="closeRegistrarRequestDetails()"
                >
                    Cancel
                </button>


                <button
                    type="button"
                    class="request-save-button"
                    onclick="saveRegistrarRequestChanges()"
                >
                    Save Changes
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    /* CLOSE WHEN CLICKING OUTSIDE */

    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {

                closeRegistrarRequestDetails();

            }

        }
    );

}


/* ================= OPEN DETAILS ================= */

function openRegistrarRequestDetails(requestId) {

    createRegistrarRequestModal();


    const requests =
        getRequests();


    const request =
        requests.find(
            item =>
                item.requestId === requestId
        );


    if (!request) {

        alert(
            "The selected request could not be found."
        );

        return;
    }


    currentRegistrarRequestId =
        requestId;


    const modal =
        document.getElementById(
            "registrarRequestModal"
        );


    const modalId =
        document.getElementById(
            "requestModalId"
        );


    const details =
        document.getElementById(
            "requestModalDetails"
        );


    modalId.textContent =
        request.requestId || "Request";


    details.innerHTML = `


        <div class="request-detail-card">

            <span class="request-detail-label">
                Request ID
            </span>

            <div class="request-detail-value">
                ${request.requestId || "—"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Date Requested
            </span>

            <div class="request-detail-value">
                ${registrarRequestDate(
                    request.dateRequested
                )}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Student Full Name
            </span>

            <div class="request-detail-value">
                ${request.fullName || "—"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Student ID
            </span>

            <div class="request-detail-value">
                ${request.studentId || "—"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Email
            </span>

            <div class="request-detail-value">
                ${request.email || "—"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Account Type
            </span>

            <div class="request-detail-value">
                ${request.accountType || "—"}
            </div>

        </div>


        <div class="request-detail-card full-width">

            <span class="request-detail-label">
                Document Requested
            </span>

            <div class="request-detail-value">
                ${request.documentType || "—"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Purpose
            </span>

            <div class="request-detail-value">
                ${request.purpose || "—"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Number of Copies
            </span>

            <div class="request-detail-value">
                ${request.copies || "1"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Delivery Method
            </span>

            <div class="request-detail-value">
                ${request.deliveryMethod || "—"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Clearance Status
            </span>

            <div class="request-detail-value">
                ${request.clearanceStatus || "Pending"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Payment Status
            </span>

            <div class="request-detail-value">
                ${request.paymentStatus || "Pending"}
            </div>

        </div>


        <div class="request-detail-card full-width">

            <span class="request-detail-label">
                Additional Details
            </span>

            <div class="request-detail-value">
                ${request.additionalDetails || "None provided."}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Processed By
            </span>

            <div class="request-detail-value">
                ${request.processedBy || "Not yet assigned"}
            </div>

        </div>


        <div class="request-detail-card">

            <span class="request-detail-label">
                Last Updated
            </span>

            <div class="request-detail-value">
                ${registrarRequestDate(
                    request.updatedAt
                )}
            </div>

        </div>

    `;


    /* SET CONTROLS */

    document.getElementById(
        "registrarRequestStatus"
    ).value =
        request.status || "Pending";


    document.getElementById(
        "registrarClearanceStatus"
    ).value =
        request.clearanceStatus || "Pending";


    document.getElementById(
        "registrarPaymentStatus"
    ).value =
        request.paymentStatus ||
        "Pending Payment";


    document.getElementById(
        "requestModalMessage"
    ).textContent = "";


    modal.classList.add("active");

}


/* ================= CLOSE DETAILS ================= */

function closeRegistrarRequestDetails() {

    const modal =
        document.getElementById(
            "registrarRequestModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    currentRegistrarRequestId = null;

       }
/* =========================================================
   PART 6C-5 — SAVE REGISTRAR REQUEST CHANGES
   ========================================================= */

function saveRegistrarRequestChanges() {

    if (!currentRegistrarRequestId) {

        return;
    }


    const status =
        document.getElementById(
            "registrarRequestStatus"
        ).value;


    const clearanceStatus =
        document.getElementById(
            "registrarClearanceStatus"
        ).value;


    const paymentStatus =
        document.getElementById(
            "registrarPaymentStatus"
        ).value;


    const registrarSession =
        getRegistrarSession();


    if (!registrarSession) {

        alert(
            "Your Registrar session has expired. Please log in again."
        );

        window.location.href =
            "login.html";

        return;
    }


    const updated =
        updateRegistrarRequest(
            currentRegistrarRequestId,
            {

                status:
                    status,

                clearanceStatus:
                    clearanceStatus,

                paymentStatus:
                    paymentStatus,

                processedBy:
                    registrarSession.fullName,

                updatedAt:
                    new Date().toISOString()

            }
        );


    if (!updated) {

        alert(
            "Unable to update this request."
        );

        return;
    }


    const message =
        document.getElementById(
            "requestModalMessage"
        );


    if (message) {

        message.textContent =
            "Request updated successfully.";

    }


    /* REFRESH TABLE */

    loadRegistrarRequestManagement();


    /* REFRESH DASHBOARD STATISTICS */

    if (
        typeof loadRegistrarStatistics ===
        "function"
    ) {

        loadRegistrarStatistics();

    }


    /* CLOSE AFTER SHORT DELAY */

    setTimeout(
        function() {

            closeRegistrarRequestDetails();

        },
        700
    );

}
/* =========================================================
   PART 6C — INITIALIZE REQUEST MANAGEMENT
   ========================================================= */

if (
    document.body.classList.contains(
        "registrar-request-page"
    )
) {

    if (protectRegistrarPage()) {

        loadRegistrarInformation();

        loadRegistrarRequestManagement();

        setupRegistrarLogout();

        createRegistrarRequestModal();

    }

}
/* =========================================================
   PART 6D-3 — STUDENT RECORDS JAVASCRIPT
   ========================================================= */


/* ================= STUDENT DATA ================= */

function getRegistrarStudentRecords() {

    const accounts =
        getAccounts();

    return accounts;
}


/* ================= STUDENT STATUS ================= */

function getStudentRecordStatus(account) {

    if (account.verified === true) {
        return "Verified";
    }

    return "Pending Verification";
}


/* ================= LOAD STUDENT STATISTICS ================= */

function loadRegistrarStudentStatistics() {

    const students =
        getRegistrarStudentRecords();


    const requests =
        getRequests();


    const totalStudents =
        students.length;


    const verifiedStudents =
        students.filter(
            student =>
                student.verified === true
        ).length;


    const studentsWithRequests =
        new Set(
            requests.map(
                request =>
                    request.studentId
            )
        ).size;


    const pendingVerification =
        students.filter(
            student =>
                student.verified !== true
        ).length;


    const totalElement =
        document.getElementById(
            "registrarStudentTotal"
        );


    const verifiedElement =
        document.getElementById(
            "registrarVerifiedStudents"
        );


    const requestsElement =
        document.getElementById(
            "registrarStudentRequests"
        );


    const pendingElement =
        document.getElementById(
            "registrarPendingVerification"
        );


    if (totalElement) {
        totalElement.textContent =
            totalStudents;
    }


    if (verifiedElement) {
        verifiedElement.textContent =
            verifiedStudents;
    }


    if (requestsElement) {
        requestsElement.textContent =
            studentsWithRequests;
    }


    if (pendingElement) {
        pendingElement.textContent =
            pendingVerification;
    }

}


/* ================= RENDER STUDENTS ================= */

function renderRegistrarStudentRecords(
    searchTerm = ""
) {

    const tableBody =
        document.getElementById(
            "studentRecordsTable"
        );


    if (!tableBody) {
        return;
    }


    const students =
        getRegistrarStudentRecords();


    const search =
        searchTerm
            .trim()
            .toLowerCase();


    const filteredStudents =
        students.filter(
            student => {

                if (!search) {
                    return true;
                }


                return (

                    String(
                        student.studentId || ""
                    )
                    .toLowerCase()
                    .includes(search)

                    ||

                    String(
                        student.fullName || ""
                    )
                    .toLowerCase()
                    .includes(search)

                    ||

                    String(
                        student.email || ""
                    )
                    .toLowerCase()
                    .includes(search)

                    ||

                    String(
                        student.program || ""
                    )
                    .toLowerCase()
                    .includes(search)

                    ||

                    String(
                        student.role || ""
                    )
                    .toLowerCase()
                    .includes(search)

                );

            }
        );


    if (!filteredStudents.length) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty-table"
                >

                    ${
                        search
                            ? "No student records match your search."
                            : "No student records are available."
                    }

                </td>

            </tr>

        `;

        return;
    }


    tableBody.innerHTML = "";


    filteredStudents.forEach(
        student => {

            const status =
                getStudentRecordStatus(
                    student
                );


            let statusClass =
                "student-status-pending";


            if (status === "Verified") {

                statusClass =
                    "student-status-verified";

            }


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <span class="student-id-cell">

                        ${
                            student.studentId ||
                            "—"
                        }

                    </span>

                </td>


                <td>

                    <span class="student-name-cell">

                        ${
                            student.fullName ||
                            "—"
                        }

                    </span>

                </td>


                <td>

                    <span class="student-email-cell">

                        ${
                            student.email ||
                            "—"
                        }

                    </span>

                </td>


                <td>

                    <span class="student-program-cell">

                        ${
                            student.program ||
                            "BS Information Technology"
                        }

                    </span>

                </td>


                <td>

                    ${
                        student.role ||
                        "Student"
                    }

                </td>


                <td>

                    <span
                        class="student-status ${statusClass}"
                    >

                        ${status}

                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="student-view-button"
                        onclick="openRegistrarStudentDetails('${student.userId}')"
                    >

                        View

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );

}


/* ================= SEARCH ================= */

function setupRegistrarStudentSearch() {

    const searchInput =
        document.getElementById(
            "studentSearchInput"
        );


    const searchButton =
        document.getElementById(
            "studentSearchButton"
        );


    const clearButton =
        document.getElementById(
            "studentClearSearchButton"
        );


    const message =
        document.getElementById(
            "studentSearchMessage"
        );


    if (!searchInput) {
        return;
    }


    function performSearch() {

        const searchTerm =
            searchInput.value;


        renderRegistrarStudentRecords(
            searchTerm
        );


        if (message) {

            if (searchTerm.trim()) {

                message.textContent =
                    "Showing results for: " +
                    searchTerm;

            } else {

                message.textContent = "";

            }

        }

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function() {

                searchInput.value = "";

                if (message) {
                    message.textContent = "";
                }

                renderRegistrarStudentRecords();

            }
        );

    }

}


/* ================= INITIALIZE STUDENT RECORDS ================= */

function initializeRegistrarStudentRecords() {

    const isStudentPage =
        document.body.classList.contains(
            "registrar-students-page"
        );


    if (!isStudentPage) {
        return;
    }


    if (!protectRegistrarPage()) {
        return;
    }


    loadRegistrarInformation();

    loadRegistrarStudentStatistics();

    renderRegistrarStudentRecords();

    setupRegistrarStudentSearch();

    setupRegistrarLogout();

    createRegistrarStudentModal();

}
/* =========================================================
   PART 6D-4 — STUDENT DETAILS MODAL
   ========================================================= */

let currentRegistrarStudentId = null;


/* ================= CREATE STUDENT MODAL ================= */

function createRegistrarStudentModal() {

    if (
        document.getElementById(
            "registrarStudentModal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement("div");


    modal.id =
        "registrarStudentModal";


    modal.className =
        "student-modal";


    modal.innerHTML = `

        <div class="student-modal-content">


            <!-- HEADER -->

            <div class="student-modal-header">

                <div>

                    <h3>
                        Student Record
                    </h3>

                    <p id="studentModalId">
                        Student ID
                    </p>

                </div>


                <button
                    type="button"
                    class="student-modal-close"
                    onclick="closeRegistrarStudentDetails()"
                >
                    ×
                </button>

            </div>


            <!-- BODY -->

            <div class="student-modal-body">


                <div
                    id="studentModalDetails"
                    class="student-details-grid"
                >
                </div>


                <div class="student-verification-box">

                    <strong>
                        Verification
                    </strong>

                    <p id="studentVerificationMessage">
                        Review the student information before
                        confirming the record.
                    </p>

                </div>

            </div>


            <!-- FOOTER -->

            <div class="student-modal-footer">

                <button
                    type="button"
                    class="student-close-button"
                    onclick="closeRegistrarStudentDetails()"
                >
                    Close
                </button>


                <button
                    type="button"
                    class="student-verify-button"
                    onclick="verifyRegistrarStudent()"
                >
                    Verify Student
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {

                closeRegistrarStudentDetails();

            }

        }
    );

}


/* ================= OPEN STUDENT DETAILS ================= */

function openRegistrarStudentDetails(
    userId
) {

    createRegistrarStudentModal();


    const students =
        getRegistrarStudentRecords();


    const student =
        students.find(
            item =>
                item.userId === userId
        );


    if (!student) {

        alert(
            "The selected student record could not be found."
        );

        return;
    }


    currentRegistrarStudentId =
        userId;


    const modal =
        document.getElementById(
            "registrarStudentModal"
        );


    const modalId =
        document.getElementById(
            "studentModalId"
        );


    const details =
        document.getElementById(
            "studentModalDetails"
        );


    const verificationMessage =
        document.getElementById(
            "studentVerificationMessage"
        );


    const status =
        getStudentRecordStatus(
            student
        );


    modalId.textContent =
        student.studentId ||
        "Student Record";


    details.innerHTML = `

        <div class="student-detail-card">

            <span class="student-detail-label">
                Student ID
            </span>

            <div class="student-detail-value">
                ${
                    student.studentId ||
                    "—"
                }
            </div>

        </div>


        <div class="student-detail-card">

            <span class="student-detail-label">
                Full Name
            </span>

            <div class="student-detail-value">
                ${
                    student.fullName ||
                    "—"
                }
            </div>

        </div>


        <div class="student-detail-card">

            <span class="student-detail-label">
                Email
            </span>

            <div class="student-detail-value">
                ${
                    student.email ||
                    "—"
                }
            </div>

        </div>


        <div class="student-detail-card">

            <span class="student-detail-label">
                Account Type
            </span>

            <div class="student-detail-value">
                ${
                    student.role ||
                    "Student"
                }
            </div>

        </div>


        <div class="student-detail-card full-width">

            <span class="student-detail-label">
                Program
            </span>

            <div class="student-detail-value">
                ${
                    student.program ||
                    "BS Information Technology"
                }
            </div>

        </div>


        <div class="student-detail-card">

            <span class="student-detail-label">
                Academic Status
            </span>

            <div class="student-detail-value">
                ${
                    student.academicStatus ||
                    "Active"
                }
            </div>

        </div>


        <div class="student-detail-card">

            <span class="student-detail-label">
                Verification Status
            </span>

            <div class="student-detail-value">
                ${status}
            </div>

        </div>

    `;


    if (student.verified === true) {

        verificationMessage.textContent =
            "This student record has already been verified by the Registrar.";

    } else {

        verificationMessage.textContent =
            "Review the information carefully before verifying this student record.";

    }


    modal.classList.add("active");

}


/* ================= VERIFY STUDENT ================= */

function verifyRegistrarStudent() {

    if (!currentRegistrarStudentId) {
        return;
    }


    const students =
        getRegistrarStudentRecords();


    const index =
        students.findIndex(
            student =>
                student.userId ===
                currentRegistrarStudentId
        );


    if (index === -1) {

        alert(
            "Student record could not be found."
        );

        return;
    }


    students[index].verified =
        true;


    students[index].verifiedAt =
        new Date().toISOString();


    const registrarSession =
        getRegistrarSession();


    students[index].verifiedBy =
        registrarSession
            ? registrarSession.fullName
            : "DLSJBC Registrar";


    saveAccounts(students);


    loadRegistrarStudentStatistics();

    renderRegistrarStudentRecords(
        document.getElementById(
            "studentSearchInput"
        )?.value || ""
    );


    const message =
        document.getElementById(
            "studentVerificationMessage"
        );


    if (message) {

        message.textContent =
            "Student record verified successfully.";

    }


    setTimeout(
        function() {

            closeRegistrarStudentDetails();

        },
        700
    );

}


/* ================= CLOSE MODAL ================= */

function closeRegistrarStudentDetails() {

    const modal =
        document.getElementById(
            "registrarStudentModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove("active");


    currentRegistrarStudentId =
        null;

}


/* =========================================================
   PART 6D — INITIALIZATION
   ========================================================= */

if (
    document.body.classList.contains(
        "registrar-students-page"
    )
) {

    initializeRegistrarStudentRecords();

}
/* =========================================================
   PART 6E — REGISTRAR CLEARANCE MANAGEMENT
   ========================================================= */


/* ================= CLEARANCE STATUS BADGE ================= */

function registrarClearanceStatusBadge(status) {

    const safeStatus = status || "Pending";

    let className = "clearance-status-pending";

    if (safeStatus === "Under Review") {

        className = "clearance-status-review";

    }

    else if (safeStatus === "Cleared") {

        className = "clearance-status-cleared";

    }

    else if (safeStatus === "Not Cleared") {

        className = "clearance-status-not-cleared";

    }

    return `
        <span class="clearance-status ${className}">
            ${safeStatus}
        </span>
    `;
}


/* ================= UPDATE REQUEST ================= */

function updateRegistrarClearance(requestId, changes) {

    const requests = getRequests();

    const index = requests.findIndex(
        request => request.requestId === requestId
    );

    if (index === -1) {

        return false;

    }

    requests[index] = {
        ...requests[index],
        ...changes,
        updatedAt: new Date().toISOString()
    };

    saveRequests(requests);

    return true;
}


/* ================= CLEARANCE STATISTICS ================= */

function loadRegistrarClearanceStatistics() {

    const requests = getRequests();

    const total = requests.length;

    const pending = requests.filter(
        request =>
            !request.clearanceStatus ||
            request.clearanceStatus === "Pending"
    ).length;

    const cleared = requests.filter(
        request =>
            request.clearanceStatus === "Cleared"
    ).length;

    const required = requests.filter(
        request =>
            request.clearanceStatus === "Not Cleared"
    ).length;


    const totalElement =
        document.getElementById(
            "clearanceTotalRequests"
        );

    const pendingElement =
        document.getElementById(
            "clearancePending"
        );

    const clearedElement =
        document.getElementById(
            "clearanceCleared"
        );

    const requiredElement =
        document.getElementById(
            "clearanceRequired"
        );


    if (totalElement) {

        totalElement.textContent = total;

    }


    if (pendingElement) {

        pendingElement.textContent = pending;

    }


    if (clearedElement) {

        clearedElement.textContent = cleared;

    }


    if (requiredElement) {

        requiredElement.textContent = required;

    }

}


/* ================= LOAD CLEARANCE TABLE ================= */

function loadRegistrarClearanceManagement() {

    const tableBody =
        document.getElementById(
            "clearanceRequestTable"
        );

    if (!tableBody) {

        return;

    }


    const requests = getRequests();


    if (requests.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    class="empty-table"
                >
                    No document requests are available.
                </td>
            </tr>
        `;

        loadRegistrarClearanceStatistics();

        return;

    }


    const sortedRequests = [...requests].sort(
        (a, b) =>
            new Date(b.dateRequested || 0) -
            new Date(a.dateRequested || 0)
    );


    tableBody.innerHTML = "";


    sortedRequests.forEach(request => {

        const row =
            document.createElement("tr");


        const requestId =
            request.requestId || "N/A";


        const studentName =
            request.fullName || "Unknown Student";


        const studentId =
            request.studentId || "N/A";


        const documentType =
            request.documentType || "Academic Document";


        const dateRequested =
            request.dateRequested
                ? registrarRequestDate(
                    request.dateRequested
                )
                : "N/A";


        const clearanceStatus =
            request.clearanceStatus ||
            "Pending";


        let studentStatus =
            "Pending Verification";


        const accounts =
            getAccounts();


        const student =
            accounts.find(
                account =>
                    account.studentId ===
                    request.studentId
            );


        if (student) {

            studentStatus =
                getStudentRecordStatus(student);

        }


        row.innerHTML = `

            <td>

                <span class="clearance-request-id">
                    ${requestId}
                </span>

            </td>


            <td>

                <div class="clearance-student-name">
                    ${studentName}
                </div>

                <span class="clearance-student-id">
                    ${studentId}
                </span>

            </td>


            <td>

                <span class="clearance-document">
                    ${documentType}
                </span>

            </td>


            <td>
                ${dateRequested}
            </td>


            <td>
                ${studentStatus}
            </td>


            <td>

                ${registrarClearanceStatusBadge(
                    clearanceStatus
                )}

            </td>


            <td>

                <button
                    type="button"
                    class="clearance-view-button"
                    onclick="openRegistrarClearanceDetails('${requestId}')"
                >
                    Review
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    loadRegistrarClearanceStatistics();

}


/* ================= CLEARANCE MODAL ================= */

let currentRegistrarClearanceRequestId = null;


function createRegistrarClearanceModal() {

    if (
        document.getElementById(
            "registrarClearanceModal"
        )
    ) {

        return;

    }


    const modal =
        document.createElement("div");


    modal.id =
        "registrarClearanceModal";


    modal.className =
        "clearance-modal";


    modal.innerHTML = `

        <div class="clearance-modal-content">


            <div class="clearance-modal-header">

                <h3>
                    Review Student Clearance
                </h3>


                <button
                    type="button"
                    class="clearance-modal-close"
                    onclick="closeRegistrarClearanceDetails()"
                >
                    ×
                </button>

            </div>


            <div class="clearance-modal-body">


                <div
                    id="clearanceModalDetails"
                    class="clearance-details-grid"
                >
                </div>


                <div class="clearance-control-box">

                    <h4>
                        Clearance Decision
                    </h4>


                    <div class="clearance-control-group">

                        <label
                            for="clearanceStatusControl"
                        >
                            Clearance Status
                        </label>


                        <select
                            id="clearanceStatusControl"
                        >

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Under Review">
                                Under Review
                            </option>

                            <option value="Cleared">
                                Cleared
                            </option>

                            <option value="Not Cleared">
                                Not Cleared
                            </option>

                        </select>

                    </div>


                    <div
                        id="clearanceModalMessage"
                        class="clearance-modal-message"
                    >
                    </div>

                </div>

            </div>


            <div class="clearance-modal-footer">

                <button
                    type="button"
                    class="clearance-cancel-button"
                    onclick="closeRegistrarClearanceDetails()"
                >
                    Cancel
                </button>


                <button
                    type="button"
                    class="clearance-save-button"
                    onclick="saveRegistrarClearance()"
                >
                    Save Clearance
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {

                closeRegistrarClearanceDetails();

            }

        }
    );

}


/* ================= OPEN CLEARANCE DETAILS ================= */

function openRegistrarClearanceDetails(requestId) {

    const requests = getRequests();


    const request =
        requests.find(
            item =>
                item.requestId === requestId
        );


    if (!request) {

        return;

    }


    currentRegistrarClearanceRequestId =
        requestId;


    const modal =
        document.getElementById(
            "registrarClearanceModal"
        );


    const details =
        document.getElementById(
            "clearanceModalDetails"
        );


    const statusControl =
        document.getElementById(
            "clearanceStatusControl"
        );


    if (!modal || !details) {

        return;

    }


    const clearanceStatus =
        request.clearanceStatus ||
        "Pending";


    const paymentStatus =
        request.paymentStatus ||
        "Pending";


    const requestStatus =
        request.status ||
        "Pending";


    details.innerHTML = `

        <div class="clearance-detail-card">

            <span class="clearance-detail-label">
                Request ID
            </span>

            <span class="clearance-detail-value">
                ${request.requestId || "N/A"}
            </span>

        </div>


        <div class="clearance-detail-card">

            <span class="clearance-detail-label">
                Date Requested
            </span>

            <span class="clearance-detail-value">
                ${
                    request.dateRequested
                        ? registrarRequestDate(
                            request.dateRequested
                        )
                        : "N/A"
                }
            </span>

        </div>


        <div class="clearance-detail-card">

            <span class="clearance-detail-label">
                Student Name
            </span>

            <span class="clearance-detail-value">
                ${request.fullName || "N/A"}
            </span>

        </div>


        <div class="clearance-detail-card">

            <span class="clearance-detail-label">
                Student ID
            </span>

            <span class="clearance-detail-value">
                ${request.studentId || "N/A"}
            </span>

        </div>


        <div class="clearance-detail-card">

            <span class="clearance-detail-label">
                Document Requested
            </span>

            <span class="clearance-detail-value">
                ${request.documentType || "N/A"}
            </span>

        </div>


        <div class="clearance-detail-card">

            <span class="clearance-detail-label">
                Current Request Status
            </span>

            <span class="clearance-detail-value">
                ${requestStatus}
            </span>

        </div>


        <div class="clearance-detail-card">

            <span class="clearance-detail-label">
                Current Clearance
            </span>

            <span class="clearance-detail-value">
                ${clearanceStatus}
            </span>

        </div>


        <div class="clearance-detail-card">

            <span class="clearance-detail-label">
                Payment Status
            </span>

            <span class="clearance-detail-value">
                ${paymentStatus}
            </span>

        </div>


        <div class="clearance-detail-card full-width">

            <span class="clearance-detail-label">
                Purpose
            </span>

            <span class="clearance-detail-value">
                ${request.purpose || "N/A"}
            </span>

        </div>


        <div class="clearance-detail-card full-width">

            <span class="clearance-detail-label">
                Additional Details
            </span>

            <span class="clearance-detail-value">
                ${request.additionalDetails || "None"}
            </span>

        </div>

    `;


    if (statusControl) {

        statusControl.value =
            clearanceStatus;

    }


    modal.classList.add("active");

}


/* ================= SAVE CLEARANCE ================= */

function saveRegistrarClearance() {

    if (!currentRegistrarClearanceRequestId) {

        return;

    }


    const statusControl =
        document.getElementById(
            "clearanceStatusControl"
        );


    const message =
        document.getElementById(
            "clearanceModalMessage"
        );


    if (!statusControl) {

        return;

    }


    const newStatus =
        statusControl.value;


    const registrarSession =
        typeof getRegistrarSession === "function"
            ? getRegistrarSession()
            : null;


    const success =
        updateRegistrarClearance(
            currentRegistrarClearanceRequestId,
            {
                clearanceStatus: newStatus,
                clearanceReviewedBy:
                    registrarSession
                        ? registrarSession.fullName
                        : "DLSJBC Registrar",
                clearanceReviewedAt:
                    new Date().toISOString()
            }
        );


    if (!success) {

        if (message) {

            message.textContent =
                "Unable to update clearance.";

            message.style.color =
                "#842029";

        }

        return;

    }


    if (message) {

        message.textContent =
            "Clearance successfully updated.";

        message.style.color =
            "#146c2e";

    }


    loadRegistrarClearanceManagement();


    setTimeout(
        function() {

            closeRegistrarClearanceDetails();

        },
        700
    );

}


/* ================= CLOSE MODAL ================= */

function closeRegistrarClearanceDetails() {

    const modal =
        document.getElementById(
            "registrarClearanceModal"
        );


    if (modal) {

        modal.classList.remove("active");

    }


    currentRegistrarClearanceRequestId =
        null;

}


/* ================= INITIALIZE CLEARANCE PAGE ================= */

function initializeRegistrarClearance() {

    if (
        !document.body.classList.contains(
            "registrar-clearance-page"
        )
    ) {

        return;

    }


    if (
        typeof protectRegistrarPage === "function"
    ) {

        if (!protectRegistrarPage()) {

            return;

        }

    }


    if (
        typeof loadRegistrarInformation === "function"
    ) {

        loadRegistrarInformation();

    }


    createRegistrarClearanceModal();


    loadRegistrarClearanceManagement();


    if (
        typeof setupRegistrarLogout === "function"
    ) {

        setupRegistrarLogout();

    }

}


/* ================= START CLEARANCE ================= */

initializeRegistrarClearance();

/* =========================================
   REGISTRAR LOGIN
   ========================================= */

const registrarLoginForm =
    document.getElementById("registrarLoginForm");

if (registrarLoginForm) {

    registrarLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const registrarId =
                document
                    .getElementById("registrarId")
                    .value
                    .trim();

            const registrarPassword =
                document
                    .getElementById("registrarPassword")
                    .value;

            const message =
                document.getElementById(
                    "registrarLoginMessage"
                );


            /* =========================================
               DEVELOPMENT REGISTRAR ACCOUNT
               ========================================= */

            const correctRegistrarId =
                "REG0001";

            const correctRegistrarPassword =
                "Registrar123";


            /* =========================================
               CHECK LOGIN
               ========================================= */

            if (
                registrarId === correctRegistrarId &&
                registrarPassword === correctRegistrarPassword
            ) {

                const registrarSession = {

                    userId: "REG-0001",

                    registrarId: registrarId,

                    fullName: "DLSJBC Registrar",

                    role: "Registrar",

                    loginTime:
                        new Date().toISOString()

                };


                /* Save Registrar Session */

                localStorage.setItem(
                    "atcrsRegistrarSession",
                    JSON.stringify(
                        registrarSession
                    )
                );


                /* Success Message */

                message.textContent =
                    "Login successful. Opening Registrar Dashboard...";

                message.className =
                    "form-message success";


                /* Open Registrar Dashboard */

                setTimeout(function () {

                    window.location.href =
                        "dashboard.html";

                }, 700);


            } else {

                /* Incorrect Login */

                message.textContent =
                    "Invalid Registrar ID or password.";

                message.className =
                    "form-message error";

            }

        }
    );

}

});
