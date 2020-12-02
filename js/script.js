/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

let students = data;
const itemsPerPage = 9;
let pagination = document.querySelector('.link-list');
let searchHeader = document.querySelector('.header');
let searchBar = `<label for="search" class="student-search">
                  <input id="search" placeholder="Search by name...">
                  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
               </label>`;

searchHeader.insertAdjacentHTML('beforeend', searchBar);
let searchValue = document.querySelector('#search');
const searchButton = document.querySelector('.student-search button');
let studentList = document.querySelector('.student-list');

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   studentList.innerHTML = '';
   
   if (list.length === 0) {
      studentList.innerHTML = '<h1>No Results</h1>';
   } else {
      for (let i = 0; i < list.length; i++) {
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
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   pagination.innerHTML = '';

   if(list.length !== 0) {
      for (let i = 1; i <= numOfPages; i++) {
         let button =   `<li>
                           <button type="button">${i}</button>
                        </li>`;
         pagination.insertAdjacentHTML('beforeend', button);
      }
      // console.log(numOfPages);
      let firstButton = document.querySelector("li button");
      firstButton.classList.add('active');
   }  
}

function filter(searchString){
   let newData = [];
   for (let i = 0; i < students.length; i++) {
      let name = `${students[i].name.first.toLowerCase()} ${students[i].name.last.toLowerCase()}`
      if (name.includes(searchString.value.toLowerCase())) {
         newData.push(students[i]);
      }
   }
   return newData;
}


// Call functions
showPage(students, 1);
addPagination(students);

pagination.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      let page = e.target.textContent
      let firstElement = document.querySelector(".active");
      firstElement.className = '';
      e.target.className = 'active';
      showPage(filter(searchValue), page);
   }
});


searchValue.addEventListener('keyup', (e) => {
   let newData = filter(searchValue);
   showPage(newData, 1);
   addPagination(newData);
});

searchButton.addEventListener('click', (e) => {
   let newData = filter(searchValue);
   showPage(newData, 1);
   addPagination(newData);
});
      
