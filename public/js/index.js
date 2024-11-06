document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('custom-max-width-2'); 
  const fileInput = document.querySelector('input[name="image"]'); 

  if (form && fileInput) {
    form.addEventListener('submit', function(event) {
      const file = fileInput.files[0];

      if (file) {
        // Allowed file types (MIME types)
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

        if (!allowedTypes.includes(file.type)) {
          event.preventDefault(); // Prevent form submission
          document.getElementById('error-message').style.display = 'block';
          setTimeout(() => {
            document.getElementById('error-message').style.display = 'none';
          }, 5000);
        }
      }
    });
  }

  const editForm = document.getElementById('edit-form');
  const editFileInput = document.querySelector('input[name="image"]');

  if (editForm && editFileInput) {
    editForm.addEventListener('submit', function(event) {
      const file = editFileInput.files[0];

      if (file) {
      
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

        if (!allowedTypes.includes(file.type)) {
          event.preventDefault(); 
          document.getElementById('error-message').style.display = 'block';
          setTimeout(() => {
            document.getElementById('error-message').style.display = 'none';
          }, 5000);
        }
      }
    });
  }
});