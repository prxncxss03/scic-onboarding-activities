document.addEventListener("DOMContentLoaded", function () {
  // Function to show error message in a given form
  function showErrorMessage(form, message) {
    const errorMessage = form.querySelector(".alert");
    errorMessage.style.display = "block";
    errorMessage.textContent = message;

    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
  }

  // Common validation function for both forms
  function validateForm(event, form) {
    const fileInput = form.querySelector('input[name="image"]');
    const title = form.querySelector('input[name="title"]').value.trim();
    const content = form.querySelector('textarea[name="content"]').value.trim();

    // Validate file type
    const file = fileInput.files[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      if (!allowedTypes.includes(file.type)) {
        event.preventDefault(); // Prevent form submission
        showErrorMessage(
          form,
          "Only images are allowed to upload (jpg, jpeg, png, gif)."
        );
        return false;
      }
    }

    // Validate title and content
    if (!title || !content) {
      event.preventDefault();
      showErrorMessage(form, "Please fill out all the fields.");
      return false;
    }

    return true;
  }

  // Main form (non-modal) validation
  const form = document.getElementById("custom-max-width-2");
  if (form) {
    form.addEventListener("submit", function (event) {
      validateForm(event, form);
    });
  }

  // Edit form (modal) validation
  const editForm = document.getElementById("edit-form");
  if (editForm) {
    editForm.addEventListener("submit", function (event) {
      validateForm(event, editForm);
    });
  }
});
