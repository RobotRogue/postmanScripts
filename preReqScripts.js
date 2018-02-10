// These are pre-req scripts that run before the request is executed.
// These are handy for generating values to pass to the request, or to verify against
// These can be added per method, or at the folder or collection level (sort of as a beforeEach)


// Creates a text string that is 15 characters long, starting with a capital letter
function garbageName() {
    var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercase = "abcdefghijklmnopqrstuvwxyz";
    var returnStr = '';
    var firstLetter = uppercase.charAt(Math.floor(Math.random() * uppercase.length));

    for (var i = 0; i < 14; i++) {
        returnStr += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    }
    return firstLetter + returnStr;
}

pm.variables.set("randomName", garbageName());
var showRandomName = pm.variables.get("randomName");
console.log("E2E Step 1 POST Valid User Fake Name Value: " + showRandomName);


// Generates a random Int between 10000-25000
function generateValue() {
    var min = Math.ceil(10000);
    var max = Math.floor(25000);

    return String((Math.random() * (max - min) + min).toFixed(0));
}

pm.variables.set("randomInt", generateValue());
var showRandomInt = pm.variables.get("randomInt");
console.log("E2E Step 1 POST Valid User Email Random Int Value: " + showRandomInt);
