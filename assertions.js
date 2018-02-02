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

// JSON String Existence Test:
pm.test("Response Body Contains Specific Email Address", function () {
    pm.response.to.have.body("shirley.nader@bins.info");
});

// JSON Contains ID Key:
pm.test("Response Body contains ID key", function () {
    pm.expect(pm.response.text()).to.include("id");
});

// JSON Value Equality Check:
pm.test("Response type key contains 'users' value", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data[0].type).to.eql("users");
});

// Storing JSON response as a variable, then outputting a specific value of that response using JSON Path
var responseStuff = pm.response.json();
console.log("Outputting the value of responseStuff.data[0].type - " + responseStuff.data[0].type);

//var whyNotWork = pm.globals.get("randomNum");
//console.log("Post-requeest script called the variable as: " + whyNotWork);

var checkRandomInt = pm.variables.get("randomInt");
console.log("Post-request script called the variable as: " + checkRandomInt);
