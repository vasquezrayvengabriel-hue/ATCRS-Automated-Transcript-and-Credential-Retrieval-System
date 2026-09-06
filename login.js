document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("studentLoginForm");

    const studentId = document.getElementById("studentId");

    const password = document.getElementById("password");

    const agreeTerms = document.getElementById("agreeTerms");

    const loginMessage = document.getElementById("loginMessage");


    // ================= STUDENT ID =================

    studentId.addEventListener("input", function () {

        // Allow numbers only
        this.value = this.value.replace(/\D/g, "");

        // Maximum of 7 digits
        if (this.value.length > 7) {
            this.value = this.value.slice(0, 7);
        }

    });
  
    // ================= PASSWORD TOGGLE =================

    const togglePassword =
        document.getElementById("togglePassword");

    togglePassword.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";

            this.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

            this.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            password.type = "password";

            this.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

            this.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });
      // ================= LOGIN =================

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const idValue = studentId.value.trim();

        const passwordValue = password.value.trim();


        // Clear previous message

        loginMessage.textContent = "";

        loginMessage.className = "login-message";


        // Check Student ID

        if (!/^\d{7}$/.test(idValue)) {

            loginMessage.textContent =
                "PLEASE ENTER A VALID 7-DIGIT STUDENT ID.";

            loginMessage.classList.add("error");

            studentId.focus();

            return;

        }


        // Check Password

        if (passwordValue === "") {

            loginMessage.textContent =
                "PLEASE ENTER YOUR PASSWORD.";

            loginMessage.classList.add("error");

            password.focus();

            return;

        }


        // Check Terms Agreement

        if (!agreeTerms.checked) {

            loginMessage.textContent =
                "YOU MUST AGREE TO THE TERMS OF USE AND PRIVACY POLICY.";

            loginMessage.classList.add("error");

            agreeTerms.focus();

            return;

        }
              // ================= PROTOTYPE LOGIN =================

        loginMessage.textContent =
            "LOGIN SUCCESSFUL. REDIRECTING TO STUDENT PORTAL...";

        loginMessage.classList.add("success");


        // Prototype session

        sessionStorage.setItem(
            "studentLoggedIn",
            "true"
        );

        sessionStorage.setItem(
            "studentId",
            idValue
        );


        // Redirect to Student Dashboard

        setTimeout(function () {

            window.location.href = "student.html";

        }, 800);

    });
      // ================= FORGOT PASSWORD =================

    const forgotPassword =
        document.getElementById("forgotPassword");


    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        alert(
            "FORGOT PASSWORD?\n\n" +
            "Please contact the Registrar's Office " +
            "for assistance with your student account."
        );

    });

});
