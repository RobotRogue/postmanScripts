// ## PRE-REQ Code:
// ## This code is run before the request is sent:

function garbageName() {
    // Creates a text string that is 15 characters long, starting with a capital letter.
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
console.log("E2E Step 3 PATCH Valid User Fake Name Value: " + showRandomName);



// ## THE REQUEST ITSELF:
// ## (Sanitized for Obvious Reasons)

// Method / URL
// PATCH {{API_URL}}/api/v2/users/{{e2eUserId}}

// Header(s):
//content-type: application/vnd.api+json

// Body:
/*
{
  "data": {
    "type": "users",
    "id": "{{e2eUserId}}",
    "attributes": {
      "firstName": "{{randomName}}"
    }
  }
}
*/



// ## POST-RESPONSE Code:
// ## This code is run after the request is processed:

// Status Check Test:
    pm.test("Status code is 200 Ok", function () {
        pm.response.to.have.status(200);
    });

// Response Time Test:
    pm.test("Response time is less than 750ms", function () {
        pm.expect(pm.response.responseTime).to.be.below(750);
    });

// JSON ID Key Value Match:
// Add a test here to check the the response value of ID is equal to the 'e2eUserId' value...
