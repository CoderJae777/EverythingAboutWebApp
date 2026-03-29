function letterFinder(word, match) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] == match) {
      console.log("Found the", match, "at", i);
    } else {
      console.log("---No match found at", i);
    }
  }
}

letterFinder("test", "t");

const object = {
  property1: "A",
  property2: "B",
  property3: 25,
};

function addTwoNums(a, b) {
  try {
    if (typeof a != "number" && typeof b != "number") {
      throw new ReferenceError("both arguments need to be number");
    }
    console.log(a + b);
  } catch (error) {
    console.log("Error!", error);
  }
  console.log("It still works");
}

addTwoNums(5, "5");

// Defensive Programming

function letterFinder(word, match) {
  var condition1 = typeof word == "string" && word.length >= 2;
  var condition2 = typeof match == "string" && match.length == 1;
  if (condition1 == true && condition2 == true) {
    for (var i = 0; i < word.length; i++) {
      if (word[i] == match) {
        //if the current character at position i in the word is equal to the match
        console.log("Found the", match, "at", i);
      } else {
        console.log("---No match found at", i);
      }
    }
  } else {
    console.log("please pass correct arguments");
  }
}
