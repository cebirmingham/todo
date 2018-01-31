var todoList = $("#todo-list");
var todoForm = $("#new-todo-form");
var newTodo = $("#new-todo");
newTodo.focus();

todoForm.on('submit', function(event) {
    var inputValue = newTodo.val().trim();
    if(inputValue !== ""){
        console.log("submitted yay");
        newTodo.val("");

        $.ajax("https://rowan-todo-api.herokuapp.com/items", {
            method: "post",
            dataType: "json",
            contentType: "application/json",
            jsonp: false,
            data: JSON.stringify({
                description: inputValue
            }),
            error: function () {
                console.error("couldn't post todo :(");
            },
            success: function (items, status) {
                loadTodoList();
            }
        });
    }

    
    event.preventDefault();
});


function loadTodoList(){

    $.ajax("https://rowan-todo-api.herokuapp.com/items", {
        dataType: "json",
        jsonp: false,
        error: function(){
            console.error("couldn't load todos :(");
            todoList.html('<p>Todo list could not be loaded</p>');
        },
        success: function(items){
            // console.log(items);
            var html = "<ul>";
            for (const item of items) {
                console.log(item);
                html += "<li>";
                html += item.description + "  ";
                if (item.complete === true){
                    html += '<input type="checkbox" checked/>';
                }
                else{
                    html += '<input type="checkbox"/>';
                }
                html += "</li>";
            }
            html +="</ul>"
            todoList.html(html);
        }
    });
}

loadTodoList();
