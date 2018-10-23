var require

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        
        var response={
            FirstName:'Sai',
            emailId:'saisarath151@gmail.com'
        };
        res.setHeader('Content-Type', 'application/json');
        
        res.send(JSON.stringify(response));
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        var response={
            'FirstName':'Sai',
            'emailId':'saisarath151@gmail.com'
        }

        res.send(response);

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
       
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
