// ASSERTIONS COMMONLY USED IN POSTMAN:
// Hopefully these can be of use to others.


// Status Check Test:
pm.test("Expecting Status code to be 200", function () {
    pm.response.to.have.status(200);
});

// Multiple Status code check
pm.test("Expecting status code to be 400/404", function () {
    pm.expect(pm.response.code).to.be.oneOf([400, 404]);
});


// Response Time Test:
pm.test("Response time is less than 750ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(750);
});


// JSON Content Test: (Applies to the wrapper/container level, so like 'errors' or 'data' and so on)
pm.test("Response should NOT contain error", function () {
    pm.response.to.not.have.jsonBody("error");
});

pm.test("Response SHOULD contain error", function () {
    pm.response.to.have.jsonBody("errors");
});


// JSON Contains ID Key: (Applies to Keys inside the JSON wrapper/container)
pm.test("Response Body contains ID key", function () {
    pm.expect(pm.response.text()).to.include("id");
});


// JSON Value Equality Check: (Compares the equality response jsonpath to a specified value)
var jsonData = pm.response.json(); // Better to create this outside of the funciton to make it reusable for other tests if needed.
pm.test("Response type key contains 'users' value", function () {
    pm.expect(jsonData.data[0].type).to.eql("users");
});

// More Equality Checks:
pm.test("Check value something is equal to string value x", function() {
    pm.expect(pm.response.json().data[0].id).to.equal("21");
});

// Additional Equality Check:
pm.test("Response Body contains key Status with value of Unclaimed", function () {
    pm.expect(pm.response.json().data.attributes.status).to.equal("unclaimed");
});

// Check Value Against Stored Variable:
pm.test("Response Body contains same ID as what was posted in Pre-req step", function () {
    pm.expect(pm.response.json().data.id).to.equal(pm.environment.get("fundAllocationId"));
});


// JSON Value Equality Check (Another Example)
var jsonData = pm.response.json(); //save response from API call as a variable
pm.test("Patch Response firstName key contains expected value", function () {
    pm.expect(jsonData.data.attributes.firstName).to.eql(checkPatchedName); //jsonData.data.attributes.firstName is a jsonpath value
});

// JSON Value Equality Check (Token example)
pm.test("Ensure Response Token Matches Auth0 Start Token", function () {
    pm.expect(pm.response.json().authToken).to.equal(pm.environment.get("auth_token"));
});


// Storing JSON response as a variable, then outputting a specific value of that response using JSON Path
var responseStuff = pm.response.json();
console.log("Outputting the value of responseStuff.data[0].type - " + responseStuff.data[0].type);


// Outputs the value of the randomInt variable that was stored from the preReq function
var checkRandomInt = pm.variables.get("randomInt");
console.log("Post-request script called the variable as: " + checkRandomInt);

// Simpler way to handle the above:
console.log("Post-request script called the variable as: " + pm.variables.get("randomInt"));


// ###########################################
// AND NOW FOR SOMETHING COMPLETELY DIFFERENT:
// ###########################################

// ### Declare Variables: ###
var jsonData = pm.response.json();


// ### Declare Functions: ###
// Function to validate keys available in Json Response
function validateTests(actual, expected) {
    pm.test("'" + expected + "' key should be available in response", function () {
        pm.expect(actual).to.equal(expected);
    });
}

// Function to assert Json value with the expected value
function jsonValueCheck(testCase, jsonKey, expectedValue) {
    pm.test(testCase, function () {
        // NOTE: it's better to declare that variable outside of the function.
        //var jsonData = pm.response.json();
        pm.expect(jsonKey).to.eql(expectedValue);
    });
}


// ### Declare Tests to Execute: ###
try {
    var firstKey;
    for (var i in jsonData) {
        firstKey = i;
    }

    // First checks if the response contains "Data", if not, fail.
    pm.test("'data' key should be available in response", function () {
        pm.expect(firstKey).to.equal('data');
    });

    var dataArray = ['id', 'type', 'links', 'attributes', 'relationships'];
    for (var i in jsonData.data) {
        validateTests(i, dataArray[dataArray.indexOf(i)]);
    }

    var attributesArray = ['avatar', 'displayName', 'language',
                           'balance', 'activeRoleId', 'createdAt'];
    for (var i in jsonData.data.attributes) {
        validateTests(i, attributesArray[attributesArray.indexOf(i)]);
    }

    var relationshipsArray = ['administeredGroups', 'administeredCampaigns', 'administeredCompanies',
                              'administeredBeneficiaries', 'beneficiaryAdminRoles', 'companyAdminRoles',
                              'donorRole', 'chimpAdminRole', 'activeRole'];
    for (var i in jsonData.data.relationships) {
        validateTests(i, relationshipsArray[relationshipsArray.indexOf(i)]);
    }

    var userId = pm.variables.get("user_id");
    // Check if user Id matches the user Id passed
    jsonValueCheck("User Id in response should match the user Id passed", jsonData.data.id, userId);

    // Check value of data.type
    jsonValueCheck("Value of key 'data[type]' should be users", jsonData.data.type, "users");
} catch (err) {
    console.log(err);
}
