// ## PRE-REQ Code:
// ## This code is run before the request is sent:

    // NOTHING TO RUN.



// ## THE REQUEST ITSELF:
// ## (Sanitized for Obvious Reasons)

    // Method / URL
    // GET {{API_URL}}/api/v2/users/{{e2eUserId}}

    // Header(s):
    //content-type: application/vnd.api+json

    // Body:
    // N/A



// ## POST-RESPONSE Code:
// ## This code is run after the request is processed:

    // Status Check Test:
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    // Response Time Test:
    pm.test("Response time is less than 750ms", function () {
        pm.expect(pm.response.responseTime).to.be.below(750);
    });

    // JSON Content Test:
    pm.test("Response should not contain error", function () {
        pm.response.to.not.have.jsonBody("error");
    });

    // JSON Contains ID Key:
    pm.test("Response Body contains ID key", function () {
        pm.expect(pm.response.text()).to.include("id");
    });

    // JSON ID Key Value Match:
    // Add a test here to check the the response value of ID is equal to the 'e2eUserId' value...
