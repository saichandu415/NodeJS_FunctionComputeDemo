document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});



function uploadFile() {
    
    var request = {
        filepath: ''
    };
    request.filepath = document.getElementById('filepath').value;
    console.log(request);
    fetch('http://localhost:8080/api/todos', {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
    .then((res) => res.json())
    .then(function (data) {
        console.log(data);
        var instance = M.Modal.getInstance(document.getElementById('modal1'));
        document.getElementById('output').innerText = JSON.stringify(data, null, 2);
        instance.open();
        return data;
    });
}

function invokeFunc(){
    // fetch('http://localhost:8080/api/todos', {
    //     method: "GET",
    //     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    // })
    // .then((res) => res.json())
    // .then(function (data) {
    //     console.log(data);
    //     M.toast({html: "Function Invoked : "+data.message, classes: 'rounded'});
    //     return data;
    // });

    var request = {
        firstname: '',
        message: 'This should capitalize',
        doMail: true,
        toMail: ''
    };
    request.firstname = document.getElementById('first_name').value;
    request.doMail = document.getElementById('mailSwitch').checked;
    request.toMail = document.getElementById('email').value;
    console.log(request);
    fetch('http://localhost:8080/api/invoke', {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
    .then((res) => res.json())
    .then(function (data) {
        console.log(data);
        M.toast({html: "Function Invoked : "+data.message, classes: 'rounded'});
        return data;
    });
}
