(function execute(inputs, outputs) {

    var request = new sn_ws.RESTMessageV2('Microsoft Graph API', 'Get Entra ID User');

    request.setStringParameterNoEscape('user_email', inputs.user_email);

    var response = request.execute();

    var statusCode = response.getStatusCode();
    var responseBody = response.getBody();

    if (statusCode == 200) {
        var user = JSON.parse(responseBody);
        outputs.user_id = user.id;
    } else {
        throw 'Unable to retrieve Entra ID user. HTTP status: ' + statusCode;
    }

})(inputs, outputs);
