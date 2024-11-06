document.addEventListener("DOMContentLoaded", function () {
  // ISBN validation function
  function isValidISBN(isbn) {
    const regex = /^[0-9]{13}$/;
    return regex.test(isbn);
  }

  // Validation function for the form
  function validateForm(event) {
    const form = event.target; // Form being submitted
    const submitButton = form.querySelector("button[type='submit']");

    const isbnInput = form.querySelector("#isbn");
    const isbn = isbnInput.value.trim();
    const title = form.querySelector("#title").value.trim();
    const author = form.querySelector("#author").value.trim();
    const rating = form.querySelector("#rating").value.trim();
    const comment = form.querySelector("#comment").value.trim();

    // Clear any previous errors
    const errorMessage = form.querySelector("#error-message");
    errorMessage.style.display = "none";
    isbnInput.style.border = "1px solid #ced4da";
    form.querySelectorAll(".form-control").forEach((input) => {
      input.style.border = "1px solid #ced4da";
    });

    // ISBN validation
    if (!isValidISBN(isbn)) {
      event.preventDefault(); // Prevent form submission if ISBN is invalid
      errorMessage.style.display = "block";
      errorMessage.innerText =
        "ISBN must be 13 digits long and contain only numbers";
      isbnInput.style.border = "1px solid red";
      isbnInput.value = "";
      isbnInput.focus();
      submitButton.disabled = false; // Ensure the submit button is enabled after validation
      return;
    }

    // Field validation for required fields
    if (title === "" || author === "" || rating === "" || comment === "") {
      event.preventDefault();
      errorMessage.style.display = "block";
      errorMessage.innerText = "All fields are required";

      if (title === "")
        form.querySelector("#title").style.border = "1px solid red";
      if (author === "")
        form.querySelector("#author").style.border = "1px solid red";
      if (rating === "")
        form.querySelector("#rating").style.border = "1px solid red";
      if (comment === "")
        form.querySelector("#comment").style.border = "1px solid red";

      submitButton.disabled = false; // Enable the button after validation
      return;
    }

    // Comment length validation
    if (comment.length < 10) {
      event.preventDefault();
      errorMessage.style.display = "block";
      errorMessage.innerText = "Comment must be at least 10 characters long";
      form.querySelector("#comment").style.border = "1px solid red";
      submitButton.disabled = false; // Ensure the submit button is enabled
      return;
    }

    // Disable the submit button when submitting the form via Axios
    submitButton.disabled = true;

    // Create FormData object from the form (grab form data)
    const formData = new FormData(form);

    // Determine if the form is for creating a new book or editing an existing one
    const isEditForm = form.id === "edit-form";

    if (!isEditForm) {
      axios
        .post("/book", {
          isbn: formData.get("isbn"),
          title: formData.get("title"),
          author: formData.get("author"),
          rating: formData.get("rating"),
          comment: formData.get("comment"),
        })
        .then((response) => {
          window.location.href = `/books?sort=date`;
        })
        .catch((error) => {
          errorMessage.style.display = "block";
          errorMessage.innerText = error.response.data.message;
        })
        .finally(() => {
          // Re-enable the button after the request is finished (success or failure)
          submitButton.disabled = false;
        });

      // Prevent the form from submitting the traditional way (page reload)
      event.preventDefault();
    }
  }

  // Attach validation listener to both create and edit forms
  const createForm = document.getElementById("main-form");
  const editForm = document.getElementById("edit-form");

  if (createForm) {
    createForm.addEventListener("submit", validateForm);
  }

  if (editForm) {
    editForm.addEventListener("submit", validateForm);
  }

  // Modal event to ensure validation works on modal open
  const editModal = document.getElementById("edit-modal");

  if (editModal) {
    editModal.addEventListener("show.bs.modal", function () {
      const form = document.getElementById("edit-form");

      // Reset any validation errors or borders when modal is shown
      const errorMessage = form.querySelector("#error-message");
      if (errorMessage) {
        errorMessage.style.display = "none";
      }
      form.querySelectorAll(".form-control").forEach((input) => {
        input.style.border = "1px solid #ced4da";
      });

      // Ensure validation is correctly attached when modal is shown
      form.removeEventListener("submit", validateForm);
      form.addEventListener("submit", validateForm);
    });
  }

  // Reset errors when modal is closed
  const modalCloseButton = document.querySelector(".btn-close");
  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", function () {
      // Reset any errors when modal is closed
      const form = document.getElementById("edit-form");
      const errorMessage = form.querySelector("#error-message");
      if (errorMessage) {
        errorMessage.style.display = "none";
      }
      form.querySelectorAll(".form-control").forEach((input) => {
        input.style.border = "1px solid #ced4da";
      });
    });
  }
});
