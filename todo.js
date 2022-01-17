var todoExistance = document.getElementById("todo-list");
if(todoExistance != null){
  function Todo(name, state) {
    this.name = name;
    this.state = state;
  }

  let todos = localStorage.getItem('localAppData') ?
  JSON.parse(localStorage.getItem('localAppData')) : [];

const setLocal = () => {
  localStorage.setItem('localAppData', JSON.stringify(todos));
};
  var states = ["active", "inactive", "done"];
  var tabs = ["all"].concat(states);
  var currentTab = "all";

  var form = document.getElementById("new-todo-form");
  var input = document.getElementById("new-todo-title");

  form.onsubmit = function(event) {
    event.preventDefault();
    if (input.value && input.value.length) {
      todos.push(new Todo(input.value, "active"));
      input.value = "";
      renderTodos();
    }
  };

  var buttons = [
    { action: "done", icon: "ok",btnClass:"done" },
    { action: "active", icon: "plus",btnClass:"active" },
    { action: "inactive", icon: "minus",btnClass:"inactive" },
    { action: "mtop", icon: "chevron-up",btnClass:"move-btn top" },
    { action: "mbottom", icon: "chevron-down",btnClass:"move-btn bottom" },
    { action: "remove", icon: "trash",btnClass:"remove" }
  ];
  function renderTodos() {
    var todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    todos
      .filter(function(todo) {
        return todo.state === currentTab || currentTab === "all";
      })
      .forEach(function(todo) {
        function guidGenerator() {
            var S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
        var uniqId = guidGenerator();
        var div1 = document.createElement("div");
        div1.className = "row";
        div1.id = uniqId;

        var div2 = document.createElement("div");
        div2.innerHTML =
          '<a class="list-group-item" href="#">' + todo.name + "</a>";
        div2.className = "col-xs-6 col-sm-9 col-md-10";

        var div3 = document.createElement("div");
        div3.className = "col-xs-6 col-sm-3 col-md-2 btn-group text-right";
        buttons.forEach(function(button) {
          var btn = document.createElement("button");
          btn.className = "btn btn-default btn-xs "+button.btnClass;
          if(button.btnClass == 'move-btn top'){
            var btn = document.createElement("div");
            btn.className = "btn btn-default btn-xs "+button.btnClass;
            btn.id = "up"+uniqId;
            btn.title = "";
            //btn.setAttribute("onclick", "upNdown('up', 'up"+uniqId+"');");
          }
          if(button.btnClass == 'move-btn bottom'){
            var btn = document.createElement("div");
            btn.className = "btn btn-default btn-xs "+button.btnClass;
            btn.id = "down"+uniqId;
            btn.title = "";
            //btn.setAttribute("onclick", "upNdown('down', 'down"+uniqId+"');");
          }
          
          btn.innerHTML =
            '<i class="glyphicon glyphicon-' + button.icon + '"></i>';
          div3.appendChild(btn);

          if (button.action === todo.state) {
            btn.disabled = true;
            if(button.action === "done"){
              btn.className = 'btn btn-default btn-xs done d-count';
            }
            if(button.action === "active"){
              btn.className = 'btn btn-default btn-xs active a-count';
            }
            if(button.action === "inactive"){
              btn.className = 'btn btn-default btn-xs inactive i-count';
            }
          }

          if (button.action === "remove") {
            btn.title = "Remove";
            btn.onclick = function() {
              if (
                confirm(
                  "Are you sure you want to delete the item titled " + todo.name
                )
              ) {
                todos.splice(todos.indexOf(todo), 1);
                renderTodos();
              }
            };
          }else if(button.action == "mtop"){
            btn.title = "";
            btn.onclick = function() {
              parent = document.getElementById(uniqId);
              prevParent = parent.previousSibling;
              if(prevParent != null){
                prevParent.before(parent);
              }
            };
          }else if(button.action == "mbottom"){
              btn.title = "";
              btn.onclick = function() {
                parent = document.getElementById(uniqId);;
                prevParent = parent.nextSibling;
                if(prevParent != null){
                  prevParent.after(parent);
                }
              };

          }else {
            btn.title = "Mark as " + button.action;
            btn.onclick = function() {
              todo.state = button.action;
              renderTodos();
            };
          }
        });

        div1.appendChild(div2);
        div1.appendChild(div3);

        todoList.appendChild(div1);


        var allItems = document.getElementsByClassName("glyphicon-trash");
        var doneItems = document.getElementsByClassName("d-count");
        var activeItems = document.getElementsByClassName("a-count");
        var iaItems = document.getElementsByClassName("i-count");
        var todoAll = document.getElementById("todo-all");
        todoAll.innerHTML = "All <span class='badge'>"+allItems.length+"</span>";
        var todoDone = document.getElementById("todo-done");
        todoDone.innerHTML = "Done <span class='badge'>"+doneItems.length+"</span>";
        var todoActive = document.getElementById("todo-active");
        todoActive.innerHTML = "Active <span class='badge'>"+activeItems.length+"</span>";
        var todoInactive = document.getElementById("todo-inactive");
        todoInactive.innerHTML = "Inactive <span class='badge'>"+iaItems.length+"</span>";
      });
      setLocal();
  }

  renderTodos();

  function selectTab(element) {
    var tabName = element.attributes["data-tab-name"].value;
    currentTab = tabName;
    var todoTabs = document.getElementsByClassName("todo-tab");
    for (var i = 0; i < todoTabs.length; i++) {
      todoTabs[i].classList.remove("active");
    }
    element.classList.add("active");
    renderTodos();
  }



  // function upNdown(direction, ele){
  //   var row = document.getElementById(ele);
  //   parent = row.closest(".row");
  //     if(direction === "up")
  //     {
  //       prevParent = parent.previousSibling;
  //       if(prevParent != null){
  //         prevParent.before(parent);
  //       }
  //     }
     
  //     if(direction === "down")
  //     {
  //       prevParent = parent.nextSibling;
  //       if(prevParent != null){
  //         prevParent.after(parent);
  //       }
  //     }
  // }
}

