document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});

function uploadFile() {
    var request = {

    };
    fetch('http://localhost:8080/api/todos', {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    }).then((res) => console.log('Response',res.json())).catch(function (error) {
        console.log('Request failed', error);
    });
}

