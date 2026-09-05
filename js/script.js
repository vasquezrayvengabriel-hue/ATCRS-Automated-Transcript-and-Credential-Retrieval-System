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


});
