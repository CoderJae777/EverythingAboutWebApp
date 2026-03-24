var age = 10;
if (age > 65) {
  console.log("You got your income from your pension");
} else if (18 <= age < 65) {
  console.log("Each month you get a salary");
} else if (age < 18) {
  console.log("You got an allowance");
} else {
  console.log("The value of the age variable is not numerical");
}

var day = "Sunday";
switch (day) {
  case "Monday":
    console.log("mon");
    break;
  default:
    console.log("default case");
}
