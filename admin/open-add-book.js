$(document).ready(function() {
    $('#addBookButton').click(function() {
      $('#addBookModal').removeClass('hidden');
    });

    $('#closeModalButton, #cancelButton').click(function() {
      $('#addBookModal').addClass('hidden');
    });

  });