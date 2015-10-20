	( function(){

		// Need to look into the input staying in focus after hitting return (it should leave the input, so the focus doesn't override the error)

		//	var newLi = '<li><input type="checkbox">  <span class="to-do-item" name="to-do-item">Done</span> <a class="small-btn btn pull-right" href="#">Delete</a> <a class="small-btn btn pull-right" href="#">Mark as Complete</a></li>';

		// VARIABLES

		var addBtn 				= document.querySelector(".js-add"),
			myToDos 			= document.querySelector(".js-my-todos"),
			mainInput 			= document.querySelector(".js-main-input"),
			totalItemsSpan 		= document.querySelector(".js-total-items"),
			completedItemsSpan 	= document.querySelector(".js-completed-items"),
			completedItemsList 	= document.querySelector(".js-my-completed-items"),
			deleteBtn 			= document.querySelector(".js-delete"),
			jsButtons	 		= "<a class='small-btn btn pull-right js-delete delete-btn' href='#'>Delete</a> <a class='small-btn btn pull-right js-mark-as-complete' href='#'>Mark as Complete</a>",
			completedItemsCount	= 0, 
			totalItemsCount 	= 0,
			completedItems 		= [],
			allGood				= true;



		// FUNCTIONS

		// Simple Validation
		var validation = function(input){
			if(input.value === "") {
				input.classList.toggle("error");			
				setTimeout(function(){
					input.classList.toggle("error");
				}, 1000);
				allGood = false;
			} else {
				allGood = true;
			}
		}

		var addToDoItem = function(e){
			// Prevent button's default behaviour
			e.preventDefault();
			validation(mainInput);
			// if validation function has set allGood variable to false, return out the function
			if(allGood === false){
				return false;
			}

			addAndShowTotalItems();
			// Create new Li element each time button is clicked, add buttons to li
			var li = document.createElement("li");
			li.innerHTML = jsButtons + "<span class='js-value'>" + mainInput.value + "</span>";

			// Prepend (insert before the first child of the ul, which will always be the latest li element) new Li element to UL, then fill it with the value of the input field
			myToDos.insertBefore(li, myToDos.firstChild);
			// Reset input
			mainInput.value = "";
			// Select mark as complete button
			var markAsCompleteBtn = document.querySelector(".js-mark-as-complete");
			// Add event listener to button
			markAsCompleteBtn.addEventListener("click", function(e){
				markAsComplete(e);
			});
		}

		var addAndShowTotalItems = function(){
			totalItemsCount++;
			totalItemsSpan.innerHTML = totalItemsCount;
		}

		var markAsComplete = function(e){
			completedItemsCount++;
			completedItemsSpan.innerHTML = completedItemsCount;
			completedItems.push(e.target.parentNode.querySelector(".js-value").innerHTML);
			e.target.parentNode.className = "completed";
			completedItemsList.innerHTML += "<li>" + completedItems.slice(-1)[0] + "</li>";
			console.log(completedItems);
		}

		// EVENTS

		addBtn.addEventListener("click", function(e) {
			addToDoItem(e);
		});

		mainInput.addEventListener("keydown", function(e) {
			if(e.keyCode === 13 || e.which === 13){
				addToDoItem(e);
			}
		});



	}() );
