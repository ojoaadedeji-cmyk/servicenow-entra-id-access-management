(function execute(inputs, outputs) {

    var request = new sn_ws.RESTMessageV2('Microsoft Graph API', 'Add User to Entra ID Group');

    request.setStringParameterNoEscape('group_id', inputs.group_id);
    request.setStringParameterNoEscape('user_id', inputs.user_id);

    var response = request.execute();
    var statusCode = response.getStatusCode();

    if (statusCode != 204) {
        throw new Error('Failed to add user to Entra ID group. HTTP status: ' + statusCode + '. Response: ' + response.getBody());
    }

})(inputs, outputs);
