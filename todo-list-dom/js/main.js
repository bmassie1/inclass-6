/*
  Add the required JavaScript to handle form submit and add a new todo item to 
  the page (in the div.todo-list element).  You will need to use a counter to 
  uniquely identify each todo item and use only DOM API functions to interact
  with the document (i.e. create each todo item), DO NOT use innerHTML for this
  exercise.
*/

// required vars
var todos = document.querySelector(".todo-list");
var todoCount = 0;

// todo form submit handler, adds a new todo item to the 'list'
document.querySelector(".todo-frm").addEventListener("submit", function (evt) {
  evt.preventDefault();

  let dn = "\u21e9";
  let up = "\u21e7";
  let right = "\u21E8";

  var div,
    checkbox,
    label,
    labelText,
    todoText,
    rightArrowSpan,
    rightArrowSpanText,
    upArrowSpan,
    upArrowSpanText,
    downArrowSpan,
    downArrowSpanText;

  todoText = evt.target.elements["todo-item"].value;

  // adding a todo regardless, so might as well increment now...
  todoCount += 1;

  if (todoText === "") {
    todoText = "Todo " + todoCount;
  }

  // create required elements
  div = document.createElement("div");
  checkbox = document.createElement("input");
  label = document.createElement("label");
  labelText = document.createTextNode(todoText);
  rightArrowSpan = document.createElement("span");
  rightArrowSpanText = document.createTextNode(right);
  upArrowSpan = document.createElement("span");
  upArrowSpanText = document.createTextNode(up);
  downArrowSpan = document.createElement("span");
  downArrowSpanText = document.createTextNode(dn);

  // set appropriate attributes
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "todo-" + todoCount);
  label.setAttribute("for", "todo-" + todoCount);
  label.setAttribute("contenteditable", "");
  rightArrowSpan.setAttribute("class", "arrow");
  upArrowSpan.setAttribute("class", "arrow up");
  downArrowSpan.setAttribute("class", "arrow dn");

  // build document fragment
  label.appendChild(labelText);
  div.appendChild(checkbox);
  div.appendChild(label);
  rightArrowSpan.appendChild(rightArrowSpanText);
  div.appendChild(rightArrowSpan);
  upArrowSpan.appendChild(upArrowSpanText);
  div.appendChild(upArrowSpan);
  downArrowSpan.appendChild(downArrowSpanText);
  div.appendChild(downArrowSpan);

  // add the document fragment to the document for rendering
  todos.appendChild(div);

  // clear the form
  evt.target.reset();

  rightArrowSpan.addEventListener("click", function (evt) {
    let shouldRemove = confirm("Are you sure?");
    if (shouldRemove) {
      evt.target.parentNode.remove();
    }
  });


});

 document
    .querySelector(".todo-list")
    .addEventListener("click", function (evt) {
      let targetTodo = evt.target.parentNode;
      let todoList = targetTodo.parentNode;
      let siblingTodo;

      // check for click on an arrow
      if (evt.target.classList.contains("arrow")) {
        // identify the type of arrow (i.e. down or up)
        if (evt.target.classList.contains("dn")) {
          siblingTodo = targetTodo.nextElementSibling;
          if (siblingTodo) {
            let nextSibling = siblingTodo.nextElementSibling
            if (nextSibling) {
              todoList.insertBefore(targetTodo, nextSibling)
            } else {
              todoList.appendChild(targetTodo)
            }
          }
          // todoList.insertBefore(siblingTodo, targetTodo);
          console.log("down...");
        } else if (evt.target.classList.contains("up")) {
          siblingTodo = targetTodo.previousElementSibling;
            // insert the sibling before the target
          if (siblingTodo) {
          todoList.insertBefore(targetTodo, siblingTodo);
          }

          console.log("up...");
        }
      }
    });
