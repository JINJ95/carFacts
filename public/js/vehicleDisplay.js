const loginHide = $(".login-hide");
const signupHide = $(".signup-hide");

async function getVehicle() {
  const url = window.location.href.split("/");
  const id = url[url.length - 1];
  // console.log(id);
  const result = await $.ajax({
    url: `/vehicleid/${id}`,
    method: "GET"
  });
  //console.log(result);
  // $("#vehiclePic").append(
  //   `<a href="/vehicles/${result[0].id}" class="image is-is-5by4 container is-clickable"><img id="vehicleButton"  src="images/toyota.jpg"></a>`
  // );
  $("#vehicleType").html(result[0].type);
  $("#vehicleMake").html(result[0].make);
  $("#vehicleModel").html(result[0].model);
  $("#vehicleYear").html(result[0].year);
  $("#vehicleMileage").html(result[0].mileage);
  $("#vehicleVin").html(result[0].vin);
  $("#yearPurchased").html(result[0].yearPurchased);
  $("#condition").html(result[0].condition);
  $("#accidents").html(result[0].accidents);
  $("#numOfOwners").html(result[0].numOfOwners);
  $("#locationLastOwned").html(result[0].locationLastOwned);
}

async function getOwner() {
  const result = await $.ajax({
    url: "/api/user_data",
    method: "GET"
  });
  //console.log(result);
  $("#lastName").html(result.lastName);
  $("#owner").html(result.firstName);
}

async function getMaintenance() {
  const url = window.location.href.split("/");
  const vehicleId = url[url.length - 1];
  const result = await $.ajax({
    url: `/maintenancefindvehicle/${vehicleId}`,
    method: "GET"
  });
  // get total number of Maintenance
  const total = result.length.toString();
  // console.log(total);
  $("#totalMaintenance").html(total);

  // Loop through Maintenance and append to table
  let num = 0;
  result.forEach(job => {
    const table = document.getElementById("tableBody");
    const row = table.insertRow(num);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    // const cell5 = row.insertCell(4);
    // const cell6 = row.insertCell(5);
    cell1.innerHTML = job.name;
    // cell2.innerHTML = job.description;
    cell2.innerHTML = job.milage;
    // cell4.innerHTML = job.parts;
    cell3.innerHTML = job.jobDate;
    cell4.innerHTML = "<a href=" + "/maintenance/" + job.id + ">More info</a>";
    num++;
  });
}

async function getCarMD() {
  const result = await $.ajax({
    url: "/carmd",
    method: "GET"
  });
  //console.log(result);
  // Loop through Maintenance and append to table
  let num = 0;
  result.data.forEach(job => {
    const table = document.getElementById("tableBodyCarMD");
    const row = table.insertRow(num);
    const cell2 = row.insertCell(0);
    const cell3 = row.insertCell(1);
    const cell5 = row.insertCell(2);
    const cell6 = row.insertCell(3);
    cell2.innerHTML = job.desc;
    cell3.innerHTML = job.due_mileage;
    cell5.innerHTML = "<a href=" + "/maintenance/" + job.id + ">More info</a>";
    cell6.innerHTML =
      "<label class=" +
      "checkbox" +
      "><input type=" +
      "checkbox" +
      "> Completed</label>";
    num++;
  });
}

async function setCondition() {
  const url = window.location.href.split("/");
  const id = url[url.length - 1];
  const result = await $.ajax({
    url: `/vehicleid/${id}`,
    method: "GET"
  });
  //console.log(result);
  switch (result[0].condition) {
  case "Excellent":
    $("#carCondition").html(
      "Looks new and is in excellent mechanical condition!"
    );
    break;

  case "Fair":
    $("#carCondition").html(
      "Has some repairable cosmetic defects and is free of major mechanical problems."
    );
    break;

  case "Poor":
    $("#carCondition").html(
      "Has some cosmetic defects that require repairing and/or mechanical problems."
    );
    break;
  }
}

async function setImage() {
  const url = window.location.href.split("/");
  const id = url[url.length - 1];
  const result = await $.ajax({
    url: `/vehicleid/${id}`,
    method: "GET"
  });
  //console.log(result);
  switch (result[0].type) {
  case "Car":
    $("#vehiclePic").append(
      "<img src='./images/car.png' />"
    );
    break;

  case "Motorcycle":
    $("#vehiclePic").append(
      "<img src='./images/motorcycle.png' />"
    );
    break;

  case "Truck":
    $("#vehiclePic").append(
      "<img src='./images/truck.png' />"
    );
    break;
  }
}

$("#newCarMaintenance").on("click", () => {
  location.pathname = "/newMaintenance";
});

$(document).ready(() => {
  signupHide.hide();
  loginHide.hide();
  setImage();
  getCarMD();
  getMaintenance();
  setCondition();
  getOwner();
  getVehicle();
  // console.log("working");
});
