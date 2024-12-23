display();

const form = document.querySelector('form');
form.onsubmit = function(event) {
    event.preventDefault();
    const amount = event.target.number.value;
    const desc = event.target.desc.value;
    const category = event.target.category.value;
    const expensive = { amount, desc, category };
    const key = new Date();
    localStorage.setItem(key, JSON.stringify(expensive));
    event.target.number.value = '';
    event.target.desc.value = '';
    event.target.category.value = '';
    display();
};

function display() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const user = JSON.parse(localStorage.getItem(key));
        let li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center  m-2 mx-auto';
        li.innerHTML = `${user.amount} - ${user.category} - ${user.desc}`;
                
        const buttonGroup = document.createElement('div');

        const editbtn = document.createElement('button');
        editbtn.className = 'btn btn-warning btn-sm me-2';
        editbtn.innerHTML = 'Edit';
        editbtn.onclick = function() {
            edituser(key);
        };

        const deletebtn = document.createElement('button');
        deletebtn.className = 'btn btn-danger btn-sm';
        deletebtn.innerHTML = 'Delete';
        deletebtn.onclick = function() {
            deleteuser(key);
        };

        buttonGroup.appendChild(editbtn);
        buttonGroup.appendChild(deletebtn);
        li.appendChild(buttonGroup);

        userList.appendChild(li);
    }
}

function deleteuser(key) {
    localStorage.removeItem(key);
    display();
}

function edituser(key) {
    const form = document.querySelector('form');
    const user = JSON.parse(localStorage.getItem(key));
    form.number.value = user.amount;
    form.desc.value = user.desc;
    form.category.value = user.category;
    deleteuser(key);
    form.onsubmit = function(event) {
        event.preventDefault();
        const amount = event.target.number.value;
        const desc = event.target.desc.value;
        const category = event.target.category.value;
        const expensive = { amount, desc, category };
        localStorage.setItem(new Date(), JSON.stringify(expensive));
        event.target.number.value = '';
        event.target.desc.value = '';
        event.target.category.value = '';
        form.onsubmit = originalSubmitHandler;
        display();
    };
}

const originalSubmitHandler = form.onsubmit;
