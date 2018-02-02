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

    function generateValue() {
        // Generates a random Int between 10000-25000
        var min = Math.ceil(10000);
        var max = Math.floor(25000);

        return String((Math.random() * (max - min) + min).toFixed(0));
    }

    pm.variables.set("randomName", garbageName());
    pm.variables.set("randomInt", generateValue());
    var showRandomName = pm.variables.get("randomName");
    var showRandomInt = pm.variables.get("randomInt");
    console.log("E2E Step 1 POST Valid User Fake Name Value: " + showRandomName);
    console.log("E2E Step 1 POST Valid User Email Value: " + showRandomName + ".test" + showRandomInt + "@example.com");

    // Sets the random generated variable to a global value
    // pm.globals.set("randomNum", numValue);

    // Calls the global variable and stores as a new local variable
    // var whyNotWork = pm.globals.get("randomNum");

    // Logs the stored local variable to make sure it worked
    // console.log("The generated value is stored globally as: " + whyNotWork);



// ## THE REQUEST ITSELF:
// ## (Sanitized for Obvious Reasons)

    // Method / URL
    // POST {{API_URL}}/api/v2/users

    // Header(s):
    // content-type: application/vnd.api+json

    // Body:
    /*
    {
        "data": {
            "type": "users",
            "attributes": {
                "firstName": "{{randomName}}",
                "lastName": "Test",
                "email": "{{randomName}}.test+{{randomInt}}@example.com",
                "password": "ThisIsAPassword!123",
                "passwordConfirmation": "ThisIsAPassword!123"
            }
        }
    }
    */



// ## POST-RESPONSE Code:
// ## This code is run after the request is processed:

    // Set Response Variables:
    // Stores POST Response JSON
    var jsonData = pm.response.json();
    // stores response Id of created user (to pass to other steps/tests)
    pm.environment.set("e2eUserId", jsonData.data.id);

    // Status Test:
    pm.test("Status code is 201 Created", function () {
        pm.response.to.have.status(201);
    });

    // Response Time Test:
    pm.test("Response time is less than 750ms", function () {
        pm.expect(pm.response.responseTime).to.be.below(750);
    });

    // Correct Value Equality Test:
    var checkRandomName = pm.variables.get("randomName");
    pm.test("POST Response firstName key contains generated value of " + checkRandomName, function () {
        pm.expect(jsonData.data.attributes.firstName).to.eql(checkRandomName);
    });

    // Some Debug logging:
    var createdUserId = pm.environment.get("e2eUserId");
    console.log("The E2E Step 1 POST created a new user with an ID of: " + createdUserId);
