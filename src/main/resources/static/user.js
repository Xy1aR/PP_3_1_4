const curUserInfoUrl = '/api/user'

document.addEventListener("DOMContentLoaded", getUserDetails);

async function getUserDetails()
{
    let response = await fetch(curUserInfoUrl);

    if (response.ok) {
        let jsonData = await response.json();

        let userDetails= document.getElementById("user-details");
        let roles = '';
        for (let role of jsonData.roles) {
            roles +=  ' ' + role.name.slice(5);
        }
        userDetails.innerHTML = `<b>${jsonData.username}</b> with roles:${roles}`;

        let tableInfo = document.getElementById("table-info-body");
        tableInfo.innerHTML = `<tr>
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