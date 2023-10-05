const adminUrl = '/api/admin';
const curUserInfoUrl = 'api/user';
const rolesInfoUrl = '/api/admin/roles';
const addUserUrl = '/api/admin/post/user';
const editUserUrl = '/api/admin/users/';

const curUserTable = document.getElementById("current_user_table");
const allUsersTable = document.getElementById("all_users_table");
const addUserForm = document.getElementById("add-user-form");
const deleteUserForm = document.getElementById("delete-user-form");
const editUserForm = document.getElementById("edit-user-form");
const tablesTabs = document.querySelectorAll('.tables-nav');

tablesTabs.forEach((clickedTab) => {
    clickedTab.addEventListener('click', async () => {
        tablesTabs.forEach((tab) => {
            tab.classList.remove('active');
        });
        clickedTab.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    void getAllUsersDetails();
    void getNavbarDetails();
    document.getElementById("new-rolesList").innerHTML = await getAvailableRoles();
});

function concatRoles(jsonData) {
    let roles = '';
    for (let role of jsonData.roles) {
        roles +=  ' ' + role.name.slice(5);
    }
    return roles;
}

async function getNavbarDetails()
{
    let response = await fetch(curUserInfoUrl);

    if (response.ok) {
        let jsonData = await response.json();
        let userDetails= document.getElementById("user-details");
        let roles = concatRoles(jsonData);
        userDetails.innerHTML = `<b>${jsonData.username}</b> with roles:${roles}`;
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

allUsersTable.addEventListener("click", getAllUsersDetails);

async function getAllUsersDetails()
{
    let response = await fetch(adminUrl);
    if (response.ok) {
        let jsonData = await response.json();

        document.getElementById("table-header").innerHTML = "All users";

        let tableHead = `<tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>`
        let tableInfoHead = document.getElementById("table-info-head");

        let tableBody = '';
        let tableInfoBody = document.getElementById("table-info-body");
        for (let elem of jsonData) {
            let roles = concatRoles(elem);
            tableBody += `<tr>
                            <th>${elem.id}</th>
                            <td>${elem.firstName}</td>
                            <td>${elem.lastName}</td>
                            <td>${elem.age}</td>
                            <td>${elem.username}</td>
                            <td>${roles.slice(1)}</td>
                            <td>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModalWindow" onclick="openEditModal(${elem.id})">
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger btn-delete" data-bs-toggle="modal" data-bs-target="#deleteModalWindow" onclick="openDeleteModal(${elem.id})">
                                    Delete
                                </button>
                            </td>
                          </tr>`
        }

        tableInfoHead.innerHTML = tableHead;
        tableInfoBody.innerHTML = tableBody;
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

curUserTable.addEventListener("click", getUserDetails);

async function getUserDetails()
{
    let response = await fetch(curUserInfoUrl);

    if (response.ok) {
        let jsonData = await response.json();

        document.getElementById("table-header").innerHTML = "About admin user";

        let userDetails= document.getElementById("user-details");
        let roles = concatRoles(jsonData);
        userDetails.innerHTML = `<b>${jsonData.username}</b> with roles:${roles}`;

        let tableHead = `<tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Role</th>
                                </tr>`
        let tableInfoHead = document.getElementById("table-info-head");

        let tableInfoBody = document.getElementById("table-info-body");

        tableInfoHead.innerHTML = tableHead;
        tableInfoBody.innerHTML = `<tr>
                                <th>${jsonData.id}</th>
                                <td>${jsonData.firstName}</td>
                                <td>${jsonData.lastName}</td>
                                <td>${jsonData.age}</td>
                                <td>${jsonData.username}</td>
                                <td>${roles.slice(1)}</td>
                               </tr>`
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

async function getAvailableRoles() {
    let response = await fetch(rolesInfoUrl);

    if (response.ok) {
        let jsonData = await response.json();

        let roles = '';
        for (let elem of jsonData) {
            roles += `<option value=${elem.id}>${elem.name.slice(5)}</option>`
        }

        return roles;
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

addUserForm.addEventListener("submit", addUser);

async function addUser(event) {
    event.preventDefault();

    let roles = [];
    for (let role of addUserForm.roles.options) {
        if (role.selected) {
            roles.push({
                id: role.value,
                name: "ROLE_" + role.text,
                authority: "ROLE_" + role.text
            });
        }
    }

    let meta = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: addUserForm.username.value,
            password: addUserForm.password.value,
            firstName: addUserForm.firstName.value,
            lastName: addUserForm.lastName.value,
            age: addUserForm.age.value,
            roles: roles
        })
    }

    await fetch(addUserUrl, meta).then( () => {
        alert(`User ${addUserForm.username.value} successfully created!`)
        addUserForm.reset();
        getAllUsersDetails();
    })

    document.getElementById("users-info-tab").click();
}

async function openDeleteModal(id) {
    let response = await fetch(editUserUrl + id);

    if (response.ok) {
        let jsonData = await response.json();

        let rolesList = "";
        for (let role of jsonData.roles) {
            rolesList += `<option value="${role.id}">${role.name.slice(5)}</option>`
        }

        document.getElementById("delete-id").value = jsonData.id;
        document.getElementById("delete-first-name").value = jsonData.firstName;
        document.getElementById("delete-last-name").value = jsonData.lastName;
        document.getElementById("delete-age").value = jsonData.age;
        document.getElementById("delete-username").value = jsonData.username;
        document.getElementById("delete-rolesList").innerHTML = rolesList;
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

deleteUserForm.addEventListener("submit", deleteUser);

async function deleteUser(event) {
    event.preventDefault();
    let deleteUrl = editUserUrl + deleteUserForm.id.value;

    let meta = {
        method: "DELETE"
    }

    await fetch(deleteUrl, meta).then( () => {
        alert(`User ${deleteUserForm.username.value} successfully deleted!`)
        document.getElementById("delete-close-button").click();
        getAllUsersDetails();
    })
}

async function openEditModal(id) {
    let response = await fetch(editUserUrl + id);

    if (response.ok) {
        let jsonData = await response.json();

        let rolesList = await getAvailableRoles();


        document.getElementById("edit-id").value = jsonData.id;
        document.getElementById("edit-first-name").value = jsonData.firstName;
        document.getElementById("edit-last-name").value = jsonData.lastName;
        document.getElementById("edit-age").value = jsonData.age;
        document.getElementById("edit-username").value = jsonData.username;
        document.getElementById("edit-rolesList").innerHTML = rolesList;
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

editUserForm.addEventListener("submit", editUser);

async function editUser(event) {
    event.preventDefault();
    let editUrl = editUserUrl + editUserForm.id.value;

    let roles = [];
    for (let role of editUserForm.roles.options) {
        if (role.selected) {
            roles.push({
                id: role.value,
                name: "ROLE_" + role.text,
                authority: "ROLE_" + role.text
            });
        }
    }

    let meta = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: editUserForm.id.value,
            username: editUserForm.username.value,
            password: editUserForm.password.value,
            firstName: editUserForm.firstName.value,
            lastName: editUserForm.lastName.value,
            age: editUserForm.age.value,
            roles: roles
        })
    }

    await fetch(editUrl, meta).then( () => {
        alert(`User ${editUserForm.username.value} successfully updated!`)
        document.getElementById("edit-close-button").click();
        editUserForm.reset();
        getAllUsersDetails();
    })
}




































