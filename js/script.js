/*
FSJS Project 2 - Data Pagination and Filtering
*/
const itemsPerPage = 9;
const searchHeader = document.querySelector('.header');
const searchBar = `<label for="search" class="student-search">
                  <input id="search" placeholder="Search by name...">
                  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
               </label>`;
searchHeader.insertAdjacentHTML('beforeend', searchBar);
const searchValue = document.querySelector('#search');
const searchButton = document.querySelector('.student-search button');


/*
   FUNCTIONS
*/
/*
This function will display a page of 9 students
*/
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   // create a conditional to display "No results" when search yields 0 results
   if (list.length === 0) {
      studentList.innerHTML = '<h1>No Results Found</h1>';
   } else {
      // loop over the length of the `list`
      for (let i = 0; i < list.length; i++) {
         // create a conditional to display the proper students
         if (i >= startIndex && i < endIndex) {
            let student = `<li class="student-item cf">
                              <div class="student-details">
                                 <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                                 <h3>${list[i].name.first} ${list[i].name.last}</h3>
                                 <span class="email">${list[i].email}</span>
                              </div>
                              <div class="joined-details">
                                 <span class="date">Joined ${list[i].registered.date}</span>
                              </div>
                           </li>`;
            studentList.insertAdjacentHTML('beforeend', student);

         }
      }
   }
}

/*
This function will create and dispaly the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   const pagination = document.querySelector('.link-list');
   pagination.innerHTML = '';

   // create a conditional to remove the pagination buttons entirely if there is only one // page of results
   if (list.length < 10) {
      pagination.innerText = '';
   } else {
      // loop over the number of pages needed
      for (let i = 1; i <= numOfPages; i++) {
         // Create the button elements
         const button = `<li>
                           <button type="button">${i}</button>
                        </li>`;
         pagination.insertAdjacentHTML('beforeend', button);
      }
      // Give the first button a class of "active"
      const firstButton = document.querySelector("li button");
      firstButton.classList.add('active');
   }
      
   // }
   // Create an event listener on the "link-list" element
   pagination.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const page = e.target.textContent
         const firstElement = document.querySelector(".active");
         // Remove 'active' class from previous button and add it to the clicked button
         firstElement.className = '';
         e.target.className = 'active';
         showPage(filterStudents(searchValue), page);
      }
   });
}

/*
This function will filter students and display results based on search criteria
*/
function filterStudents(searchString) {
   let newData = [];
   for (let i = 0; i < data.length; i++) {
      const name = `${data[i].name.first} ${data[i].name.last}`
      if (name.toLowerCase().includes(searchString.value.toLowerCase())) {
         newData.push(data[i]);
      }
   }
   return newData;
}

/*
This function will handle the 'keyup' and 'click' type event listeners
*/
function handleSearchEvent() {
   const newData = filterStudents(searchValue);
   showPage(newData, 1);
   addPagination(newData);
}

/*
Show initial page and pagination
*/
showPage(data, 1);
addPagination(data);

/*
Event Listeners
*/
searchValue.addEventListener('keyup', handleSearchEvent);
searchButton.addEventListener('click', handleSearchEvent);