
# Project Screenshots and Implementation Evidence

This directory contains 19 screenshots documenting the configuration, implementation, integration, and testing of the **ServiceNow Microsoft Entra ID Access Management** solution.

The screenshots provide evidence of the ServiceNow Service Catalog configuration, Microsoft Entra ID application registration, OAuth 2.0 authentication, Microsoft Graph REST API integration, custom Flow Designer actions, approval governance, and automated request processing.

## 1. Service Catalog and Identity Configuration

### Screenshot 01: Service Catalog Access Request

![Service Catalog Access Request](01-service-catalog-access-request.png)

Demonstrates the ServiceNow Microsoft Entra ID Access Request catalog item used to initiate access provisioning and revocation requests.

### Screenshot 02: Microsoft Entra ID Application Registration

![Microsoft Entra ID Application Registration](02-entra-id-app-registration.png)

Documents the Microsoft Entra ID application registration used to establish an application identity for ServiceNow integration with Microsoft Graph API.

### Screenshot 03: Microsoft Graph API Permissions

![Microsoft Graph API Permissions](03-microsoft-graph-api-permissions.png)

Shows the Microsoft Graph application permissions configured for user identification and group membership management, including administrator consent.

### Screenshot 04: ServiceNow OAuth Configuration

![ServiceNow OAuth Configuration](04-servicenow-oauth-configuration.png)

Demonstrates the OAuth 2.0 configuration supporting application-to-application authentication between ServiceNow and Microsoft identity services.

## 2. Microsoft Graph REST API Integration

### Screenshot 05: Microsoft Graph REST Message

![Microsoft Graph REST Message](05-microsoft-graph-rest-message.png)

Documents the ServiceNow Outbound REST Message configured to communicate with Microsoft Graph API.

### Screenshot 06: Get Entra ID User HTTP Method

![Get Entra ID User HTTP Method](06-get-entra-id-user-http-method.png)

Shows the HTTP GET method used to retrieve Microsoft Entra ID user information and resolve the target user's object ID.

### Screenshot 07: Add User POST Configuration

![Add User POST Configuration](07-add-user-post-configuration.png)

Demonstrates the HTTP POST method configured to add a user to a selected Microsoft Entra ID security group.

### Screenshot 08: Add User POST Request Body

![Add User POST Request Body](08-add-user-post-request-body.png)

Documents the JSON request body used by Microsoft Graph API to reference the target user when creating a group membership.

### Screenshot 09: Remove User DELETE Configuration

![Remove User DELETE Configuration](09-remove-user-delete-configuration.png)

Shows the HTTP DELETE method configured to remove an existing user membership from a selected Microsoft Entra ID security group.

### Screenshot 10: Remove User DELETE Request

![Remove User DELETE Request](10-remove-user-delete-request.png)

Documents the Microsoft Graph DELETE request configuration used for automated access revocation.

## 3. ServiceNow Flow Designer and Custom Actions

### Screenshot 11: Flow Trigger, Approval and Grant Access

![Flow Trigger Approval and Grant Access](11-flow-trigger-approval-and-grant-access.png)

Demonstrates the initial workflow configuration, including the Service Catalog trigger, approval processing, catalog variable retrieval, user identification, and access provisioning branch.

### Screenshot 12: Revocation, Rejection and Error Handling

![Flow Revocation Rejection and Error Handler](12-flow-revocation-rejection-error-handler.png)

Documents the remaining workflow logic, including access revocation, rejected request handling, Requested Item updates, and the configured flow-level Error Handler.

### Screenshot 13: Get Entra ID User Custom Action

![Get Entra ID User Custom Action](13-get-entra-id-user-custom-action.png)

Demonstrates the custom Flow Designer action that uses server-side JavaScript and ServiceNow RESTMessageV2 to retrieve a user's Microsoft Entra ID object ID.

### Screenshot 14: Add User to Entra ID Group Custom Action

![Add User to Entra ID Group Action](14-add-user-to-entra-id-group-action.png)

Documents the custom action responsible for executing the Microsoft Graph group membership provisioning operation and validating the HTTP response.

### Screenshot 15: Remove User from Entra ID Group Custom Action

![Remove User from Entra ID Group Action](15-remove-user-from-entra-id-group-action.png)

Demonstrates the custom action used to revoke group membership through Microsoft Graph API, including response validation and error handling.

## 4. Functional Testing and Error Handling

### Screenshot 16: Successful Access Provisioning

![Successful Grant Access Request](16-successful-grant-access-request.png)

**Requested Item:** RITM0010012

Demonstrates successful processing of an approved access provisioning request.

The workflow executed the Microsoft Graph group membership operation, automatically updated the Requested Item to Closed Complete, and recorded work notes confirming successful processing.

### Screenshot 17: Successful Access Revocation

![Successful Revoke Access Request](17-successful-revoke-access-request.png)

**Requested Item:** RITM0010013

Demonstrates successful processing of an approved access revocation request.

The workflow executed the Microsoft Graph group membership removal operation, automatically updated the Requested Item to Closed Complete, and recorded work notes confirming successful processing.

### Screenshot 18: Rejected Access Request

![Rejected Access Request](18-rejected-access-request.png)

**Requested Item:** RITM0010017

Demonstrates the workflow's approval governance controls.

The request was rejected; the Microsoft Graph provisioning operation was not executed, and the Requested Item was automatically updated to Closed Incomplete with appropriate work notes.

### Screenshot 19: Integration Error Handling

![Integration Error Handling](19-integration-error-handling.png)

**Requested Item:** RITM0010018

Demonstrates the workflow's exception handling following an approved request that encountered an integration execution error.

The configured Error Handler updated the Requested Item to Closed Incomplete and recorded work notes requiring manual investigation.

This test validates the error-handling behaviour but does not establish the underlying cause of the Microsoft Graph failure.

## Testing Summary

| Test Case | Scenario | Requested Item | Outcome |
|---|---|---|---|
| TC01 | Successful Access Provisioning | RITM0010012 | Passed |
| TC02 | Successful Access Revocation | RITM0010013 | Passed |
| TC03 | Approval Rejection | RITM0010017 | Passed |
| TC04 | Integration Error Handling | RITM0010018 | Passed (Error Handling) |

The testing demonstrated successful automated provisioning and revocation, approval-based access governance, accurate Requested Item lifecycle updates, and workflow exception handling.

The project was developed and tested in non-production ServiceNow and Microsoft Entra ID environments.

## Related Documentation

- [Main Project Documentation](../README.md)
- [Solution Architecture Documentation](../architecture/README.md)

## Security and Confidentiality

Screenshots are intended to demonstrate configuration and implementation without exposing authentication credentials or confidential integration information.

Client secrets, access tokens, and other sensitive authentication values were not published in the repository.
