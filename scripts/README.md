# ServiceNow Microsoft Graph Integration Scripts

This directory contains three custom JavaScript scripts developed for the **ServiceNow Microsoft Entra ID Access Management** project.

The scripts are implemented as custom Flow Designer Actions and use ServiceNow's `sn_ws.RESTMessageV2` API to communicate with Microsoft Graph through configured Outbound REST Messages.

They support automated user identification, security group membership provisioning, and access revocation.

## Custom Flow Actions

| Script | Purpose | HTTP Method | Expected Success Status |
|---|---|---|---|
| [Get Entra ID User](get-entra-id-user.js) | Retrieve the target user's Microsoft Entra ID object ID | GET | 200 OK |
| [Add User to Entra ID Group](add-user-to-entra-id-group.js) | Add a user to the selected Microsoft Entra ID security group | POST | 204 No Content |
| [Remove User from Entra ID Group](remove-user-from-entra-id-group.js) | Remove a user from the selected Microsoft Entra ID security group | DELETE | 204 No Content |

## 1. Get Entra ID User

**Script:** [get-entra-id-user.js](get-entra-id-user.js)

This custom Flow Action retrieves the Microsoft Entra ID object ID of the target user through Microsoft Graph API.

**Implementation:**

1. Receives the user's email address as an input.
2. Initialises the configured Microsoft Graph REST Message using `sn_ws.RESTMessageV2`.
3. Passes the email address to the GET HTTP method.
4. Executes the request and retrieves the HTTP response.
5. Validates the expected HTTP 200 status.
6. Parses the JSON response and extracts the user's object ID.
7. Makes the object ID available as an output for subsequent workflow actions.
8. Throws an error if the API request returns an unsuccessful HTTP status.

**Microsoft Graph Endpoint:**

`GET https://graph.microsoft.com/v1.0/users/{user_email}`

**Input:** `user_email`

**Output:** `user_id`

## 2. Add User to Entra ID Group

**Script:** [add-user-to-entra-id-group.js](add-user-to-entra-id-group.js)

This custom Flow Action provisions access by adding the identified user to the selected Microsoft Entra ID security group.

**Implementation:**

1. Receives the target user's object ID and the selected group's object ID.
2. Initialises the configured Microsoft Graph REST Message.
3. Passes the `group_id` and `user_id` parameters to the POST HTTP method.
4. Executes the group membership creation request.
5. Validates the expected HTTP 204 status.
6. Throws an error containing the HTTP status and response body if the operation fails.

**Microsoft Graph Endpoint:**

`POST https://graph.microsoft.com/v1.0/groups/{group_id}/members/$ref`

**Request Body:**

```json
{
  "@odata.id": "https://graph.microsoft.com/v1.0/directoryObjects/{user_id}"
}
```

**Inputs:** `group_id`, `user_id`

**Expected Response:** HTTP 204 No Content

## 3. Remove User from Entra ID Group

**Script:** [remove-user-from-entra-id-group.js](remove-user-from-entra-id-group.js)

This custom Flow Action revokes access by removing an existing user membership from the selected Microsoft Entra ID security group.

**Implementation:**

1. Receives the target user's object ID and the selected group's object ID.
2. Initialises the configured Microsoft Graph REST Message.
3. Passes the `group_id` and `user_id` parameters to the DELETE HTTP method.
4. Executes the group membership removal request.
5. Validates the expected HTTP 204 status.
6. Throws an error containing the HTTP status and response body if the operation fails.

**Microsoft Graph Endpoint:**

`DELETE https://graph.microsoft.com/v1.0/groups/{group_id}/members/{user_id}/$ref`

**Inputs:** `group_id`, `user_id`

**Expected Response:** HTTP 204 No Content

## Integration and Authentication

The scripts reference the configured ServiceNow Outbound REST Message named `Microsoft Graph API`.

Authentication is managed through the associated OAuth 2.0 configuration using the client credentials grant.

The scripts do not directly contain client secrets or access tokens. Authentication is handled by the configured REST Message and OAuth profile.

The Microsoft Entra ID application registration was configured with the required Microsoft Graph application permissions and administrator consent.

## Error Handling

Each custom Flow Action validates the HTTP response returned by Microsoft Graph API.

When an unsuccessful response is detected, the script throws an error to interrupt normal processing.

The ServiceNow workflow includes a configured Error Handler that records investigation work notes and updates the Requested Item to Closed Incomplete when a workflow execution failure is handled.

## Security Considerations

- Authentication credentials and client secrets are not hardcoded in the JavaScript files.
- Microsoft Graph access is controlled through application permissions and administrator consent.
- User and group object IDs are passed dynamically through Flow Designer inputs.
- REST API responses are validated before successful processing continues.
- Client secrets, access tokens, and other sensitive authentication values were not published in the repository.

## Related Documentation

- [Main Project README](../README.md)
- [Solution Architecture](../architecture/README.md)
- [Implementation Screenshots](../screenshots/README.md)
