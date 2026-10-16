
document.addEventListener("DOMContentLoaded", function () {

    // TASK 3: Bootstrap validation
    const validationForm = document.getElementById("validationForm");

    if (validationForm) {
        validationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fields = validationForm.querySelectorAll("input, textarea");
            let isFormValid = true;

            fields.forEach(function (field) {
                const valid = field.checkValidity();

                field.classList.toggle("is-valid", valid);
                field.classList.toggle("is-invalid", !valid);

                if (!valid) {
                    isFormValid = false;
                }
            });

            document.getElementById("formResult").innerHTML =
                isFormValid
                    ? '<div class="alert alert-success">Form is valid!</div>'
                    : '<div class="alert alert-danger">Please correct the errors.</div>';
        });

        validationForm.addEventListener("reset", function () {
            setTimeout(function () {
                validationForm.querySelectorAll(".is-valid, .is-invalid")
                    .forEach(function (field) {
                        field.classList.remove("is-valid", "is-invalid");
                    });

                document.getElementById("formResult").innerHTML = "";
            }, 0);
        });
    }

    // TASK 4: Registration validation
    const registrationForm = document.getElementById("registrationForm");

    if (registrationForm) {
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const result = document.getElementById("registrationResult");

        function checkPasswords() {
            if (confirmPassword.value === password.value) {
                confirmPassword.setCustomValidity("");
            } else {
                confirmPassword.setCustomValidity("Passwords do not match");
            }
        }

        password.addEventListener("input", checkPasswords);
        confirmPassword.addEventListener("input", checkPasswords);

        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();
            checkPasswords();

            let isFormValid = true;

            const fields = registrationForm.querySelectorAll(
                "input:not([type=radio]):not([type=checkbox]), select"
            );

            fields.forEach(function (field) {
                const valid = field.checkValidity();

                field.classList.toggle("is-valid", valid);
                field.classList.toggle("is-invalid", !valid);

                if (!valid) {
                    isFormValid = false;
                }
            });

            const genderSelected = registrationForm.querySelector(
                'input[name="gender"]:checked'
            );

            if (!genderSelected) {
                isFormValid = false;
                registrationForm.querySelectorAll('input[name="gender"]')
                    .forEach(function (radio) {
                        radio.classList.add("is-invalid");
                    });
            } else {
                registrationForm.querySelectorAll('input[name="gender"]')
                    .forEach(function (radio) {
                        radio.classList.remove("is-invalid");
                    });
            }

            result.innerHTML = isFormValid
                ? '<div class="alert alert-success">Registration form is valid!</div>'
                : '<div class="alert alert-danger">Please correct the highlighted fields.</div>';
        });

        registrationForm.addEventListener("reset", function () {
            setTimeout(function () {
                registrationForm.querySelectorAll(".is-valid, .is-invalid")
                    .forEach(function (field) {
                        field.classList.remove("is-valid", "is-invalid");
                    });

                confirmPassword.setCustomValidity("");
                result.innerHTML = "";
            }, 0);
        });
    }
});
