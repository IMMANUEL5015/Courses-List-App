//Select message alert
var alert = document.getElementsByClassName("alert")[0];

//Select all Course Details Inputs
var title = document.querySelector("#courseName");
var description = document.querySelector("#courseDescription");
var code = document.querySelector("#courseCode");

//The function that removes the alert message after some time
function removeAlert(){
    alert.style.top = "-1000px";
} 

//Courses Storage
var courses = [];

//display the Courses
var tbody = document.getElementsByTagName('tbody')[0];

function displayAllCourses(){
    tbody.innerHTML = "";
    var htmlCode = "";
    for(var i = 0; i < courses.length; i++){
       htmlCode+="<tr>" + "<td>" + courses[i].nameOfCourse + "</td>" + "<td>" + courses[i].descriptionOfCourse + "</td>" + "<td>" + courses[i].codeOfCourse + "</td>" + "<td><button class='btn btn-info edit'>Edit</button></td>" + "<td><button class='btn btn-danger delete'>Delete</button></td>" + "</tr>"; 
    }
    return tbody.innerHTML = htmlCode;
}
//Index of Course to be Edited;
var courseIndex;

//Add and Edit a Course Details
var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
    if(title.value && description.value && code.value){
        if(submit.textContent === 'Submit'){
            var course = {nameOfCourse: title.value, descriptionOfCourse: description.value, codeOfCourse: code.value};
            courses.push(course);
            displayAllCourses();
            alert.textContent = "Added to Courses List!";
        }else if(submit.textContent === 'Update'){
            courses[courseIndex] = {nameOfCourse: title.value, descriptionOfCourse: description.value, codeOfCourse: code.value};
            displayAllCourses();
            alert.textContent = "Course Edited";
        }
        alert.style.top = "-20px";
        window.setTimeout(removeAlert, 3000);
        submit.textContent = "Submit";
        title.value = ''; 
        description.value = ''; 
        code.value = '';
    }else{
        alert.textContent = "Fill the required Details";
        alert.style.top = "-20px";
        window.setTimeout(removeAlert, 3000); 
    }

    editCourseDetails();
    deleteCourse();
    
});

//Edit the details of a Course
function editCourseDetails(){
    var edit = document.getElementsByClassName("edit");
    for(var i = 0; i < edit.length; i++){
        edit[i].addEventListener("click", function(){
            for(var i = 0; i < courses.length; i++){
                if(this.parentElement.parentElement.textContent.indexOf(courses[i].nameOfCourse) !== -1){
                    courseIndex = i;
                    title.value = courses[i].nameOfCourse;
                    description.value = courses[i].descriptionOfCourse;
                    code.value = courses[i].codeOfCourse;
                    submit.textContent = "Update";
                }
            }
        });
    }
}

//Delete the details of a course
function deleteCourse(){ 
    var Delete = document.getElementsByClassName("delete");
    for(var i = 0; i < Delete.length; i++){
        Delete[i].addEventListener("click", function(){
            for(var i = 0;i < courses.length; i++){
                if(this.parentElement.parentElement.textContent.indexOf(courses[i].nameOfCourse) !== -1){
                    courses.splice(i,1);
                    this.parentElement.parentElement.remove();
                    alert.textContent = "Course Deleted";
                    alert.style.top = "-20px";
                    window.setTimeout(removeAlert, 3000);
                }
            }
            submit.textContent = "Submit";
            title.value = ''; 
            description.value = ''; 
            code.value = '';
        });
    }
}