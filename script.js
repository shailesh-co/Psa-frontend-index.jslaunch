document.getElementById('userForm').addEventListener('input', validateForm);
document.getElementById('userForm').addEventListener('submit', submitForm);

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const isActive = document.getElementById('isActive').checked;  // Check if checkbox is checked

    const submitBtn = document.getElementById('submitBtn');

    // Check if all fields are filled and checkbox is checked
    const isNameValid = name.trim() !== '';
    const isEmailValid = validateEmail(email);
    const isMobileValid = validateMobileNumber(mobileNumber);
    
    // Enable the submit button only when all fields are valid and checkbox is checked
    if (isNameValid && isEmailValid && isMobileValid && isActive) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function validateEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validateMobileNumber(mobileNumber) {
    // Check if the mobile number contains exactly 10 digits
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
}

async function submitForm(e) {
    e.preventDefault(); // Prevent the form from reloading the page

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const isActive = document.getElementById('isActive').checked;

    // Check again for empty fields and checkbox before submitting
    if (!name || !email || !mobileNumber || !isActive) {
        showErrorPopup("All fields are required, and 'Is Active' must be checked.");
        return;
    }

    const userData = {
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        isActive: isActive
    };

    try {
        const response = await fetch('http://localhost:3000/loging', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            showSuccessPopup("Thank you! Your information has been submitted successfully.");
            document.getElementById('userForm').reset();
            document.getElementById('submitBtn').disabled = true; // Disable the button after submission
        } else {
            showErrorPopup(result.message || "An error occurred. Please try again.");
        }
    } catch (error) {
        showErrorPopup("Error: " + error.message);
    }
}

// Function to show error popup
function showErrorPopup(message) {
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.innerHTML = `<div class="popup error"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
}

// Function to show success popup
function showSuccessPopup(message) {
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.innerHTML = `<div class="popup success"><i class="fas fa-check-circle"></i> ${message}</div>`;
}
