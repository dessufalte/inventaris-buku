$(document).ready(function () {
  let users = [
    { name: "Imam Ali Yaasin", email: "imam@gmail.com", role: "Admin", status: "active" },
    { name: "Muhammad Haykal", email: "haykal@gmail.com", role: "User", status: "inactive" },
  ];

  let editingUserIndex = null;


  function loadUsers() {
    $('#user-list').empty();
    users.forEach((user, index) => {
      const userRow = `
        <tr>
          <td class="px-4 py-2 border">${user.name}</td>
          <td class="px-4 py-2 border">${user.email}</td>
          <td class="px-4 py-2 border">${user.role}</td>
          <td class="px-4 py-2 border">
            <button class="menubtn editUserBtn" data-index="${index}" title="Edit pengguna">Edit</button>
            <button class="menubtn deleteUserBtn" data-index="${index}" title="Hapus pengguna">Hapus</button>
          </td>
        </tr>`;
      $('#user-list').append(userRow);
    });
  }


  $('#openAddUserPopup').on('click', function () {
    $('#addUserPopup').removeClass('hidden');
    $('#addUserPopup').addClass('grid');
  });

  // Close the Add User Popup
  $('#cancelAddUser').on('click', function () {
    $('#addUserPopup').addClass('hidden');
  });

  // Add new user from the popup
  $('#addNewUser').on('click', function () {
    const newUser = {
      name: $('#newUserName').val(),
      email: $('#newUserEmail').val(),
      role: $('#newUserRole').val(),
      status: $('#newUserStatus').val(),
    };

    users.push(newUser);
    loadUsers();

    // Close the popup and clear fields
    $('#addUserPopup').addClass('hidden');
    $('#newUserName').val('');
    $('#newUserEmail').val('');
  });

  // Open Edit User Popup
  $(document).on('click', '.editUserBtn', function () {
    editingUserIndex = $(this).data('index');
    const user = users[editingUserIndex];

    // Load existing user data into the form
    $('#editUserName').val(user.name);
    $('#editUserEmail').val(user.email);
    $('#editUserRole').val(user.role);
    $('#editUserStatus').val(user.status);

    $('#editUserPopup').removeClass('hidden');
  });

  // Close the Edit User Popup
  $('#cancelEditUser').on('click', function () {
    $('#editUserPopup').addClass('hidden');
    $('#editUserPopup').addClass('grid');
  });

  // Save edited user data
  $('#saveEditUser').on('click', function () {
    const editedUser = {
      name: $('#editUserName').val(),
      email: $('#editUserEmail').val(),
      role: $('#editUserRole').val(),
      status: $('#editUserStatus').val(),
    };

    // Update the user data in the array
    users[editingUserIndex] = editedUser;
    loadUsers();

    // Close the popup
    $('#editUserPopup').addClass('hidden');
  });

  // Delete user
  $(document).on('click', '.deleteUserBtn', function () {
    const index = $(this).data('index');
    users.splice(index, 1); // Remove the user from the array
    loadUsers();
  });

  // Load the initial list of users
  loadUsers();
});
