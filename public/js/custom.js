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

