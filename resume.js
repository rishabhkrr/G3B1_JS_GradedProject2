var applicants = [];
var filteredApplicants = [];
var currentIndex = 0;

$.getJSON("Data.json", function (data) {
  applicants = data.resume;
  filteredApplicants = applicants;
  displayApplicant();
});

$("#jobFilter").on("input", function () {
  filterByJob();
});

function displayApplicant() {
  if (filteredApplicants.length === 0) {
    $("#applicantDetails").html(
      "<p class='text-danger'>Invalid search or No applications for this job</p>"
    );
    hideButtons();
    return;
  }

  var applicant = filteredApplicants[currentIndex];
  var html =
    "<header> <h1>" +
    applicant.basics.name +
    "</h1>" +
    "<p>Email : " +
    applicant.basics.email +
    "</p>" +
    "<p> Applied For : " +
    applicant.basics.AppliedFor +
    "</p>" +
    "<p> Phone No : " +
    applicant.basics.phone +
    "</p>" +
    "<p> Address : " +
    applicant.basics.location.address +
    "</p>" +
    "<p> Postal Code : " +
    applicant.basics.location.postalCode +
    "</p>" +
    "<p> City : " +
    applicant.basics.location.city +
    "</p>" +
    "<p> State : " +
    applicant.basics.location.state +
    "</p>" +
    "<a href=" +
    applicant.basics.profiles.url +
    ">" +
    applicant.basics.profiles.network +
    "</a>" +
    "</header>";

  if (
    applicant.education["Senior Secondary"] ||
    applicant.education["High Secondary"]
  ) {
    html +=
      "<section id='education'> <h2> Education </h2>" +
      "<h4> UG </h4><p> Institute : " +
      applicant.education.UG.institute +
      "</p>" +
      "<p> Course : " +
      applicant.education.UG.course +
      "</p>" +
      "<p> Date : " +
      applicant.education.UG["Start Date"] +
      " to " +
      applicant.education.UG["End Date"] +
      "</p>" +
      "<p> CGPA : " +
      applicant.education.UG.cgpa +
      "</p>" +
      "<h4> Senior Secondary School </h4><p> Institute : " +
      applicant.education["Senior Secondary"].institute +
      "</p>" +
      "<p>CGPA: " +
      applicant.education["Senior Secondary"].cgpa +
      "</p>" +
      "<h4> High School </h4><p> Institute : " +
      applicant.education["High School"].institute +
      "</p>" +
      "<p>CGPA: " +
      applicant.education["High School"].cgpa +
      "</p>" +
      "</section>";
  }

  html +=
    "<section id='skills'> <h2> Skills </h2>" +
    "<p> Technology : " +
    applicant.skills.name +
    "</p>" +
    "<p> Level : " +
    applicant.skills.level +
    "</p>" +
    "<ul>" +
    "<li> Tech :" +
    applicant.skills.keywords +
    "<li>" +
    "</ul>" +
    "</section>";

  html +=
    "<section id='experience'> <h2> Experience </h2>" +
    "<h3> Company Name :" +
    applicant.work["Company Name"] +
    "</h3>" +
    "<p> Designation : " +
    applicant.work.Position +
    "</p>" +
    "<p> Period : " +
    applicant.work["Start Date"] +
    " To " +
    applicant.work["End Date"] +
    "</p>" +
    "<p> Summary : " +
    applicant.work.Summary +
    "</p>" +
    //Internship
    "<h3> Company Name :" +
    applicant.Internship["Company Name"] +
    "</h3>" +
    "<p> Designation : " +
    applicant.Internship.Position +
    "</p>" +
    "<p> Period : " +
    applicant.Internship["Start Date"] +
    " To " +
    applicant.Internship["End Date"] +
    "</p>" +
    "<p> Summary : " +
    applicant.Internship.Summary +
    "</p>" +
    "</section>";
  html +=
    "<section id='skills'> <h2> Projects </h2>" +
    "<p> Technology : " +
    applicant.projects.name +
    "</p>" +
    "<p> Level : " +
    applicant.projects.description +
    "</p>" +
    "</section>";

  html +=
    "<section id='skills'> <h2> Achievements </h2>" +
    "<p> Achievements : " +
    applicant.achievements.Summary +
    "</p>" +
    "</section>";

  html +=
    "<section id='skills'> <h2> Intrests </h2>" +
    "<p> interests : " +
    applicant.interests.hobbies +
    "</p>" +
    "</section>";

  $("#applicantDetails").html(html);
  updateButtonVisibility();
}

function showNext() {
  currentIndex++;
  if (currentIndex >= filteredApplicants.length) {
    currentIndex = filteredApplicants.length - 1;
  }
  displayApplicant();
}

function showPrevious() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  displayApplicant();
}

function filterByJob() {
  var jobFilter = $("#jobFilter").val().toLowerCase();
  filteredApplicants = applicants.filter(function (applicant) {
    return applicant.basics.AppliedFor.toLowerCase().includes(jobFilter);
  });
  currentIndex = 0;
  displayApplicant();
}

function updateButtonVisibility() {
  if (filteredApplicants.length <= 1) {
    hideButtons();
  } else {
    $("#prevBtn, #nextBtn").show();
    if (currentIndex === 0) {
      $("#prevBtn").hide();
    }
    if (currentIndex === filteredApplicants.length - 1) {
      $("#nextBtn").hide();
    }
  }
}

function hideButtons() {
  $("#prevBtn, #nextBtn").hide();
}
