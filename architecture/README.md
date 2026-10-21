# Solution Architecture

## ServiceNow Microsoft Entra ID Access Management

### Solution Architecture Diagram

![ServiceNow Microsoft Entra ID Access Management Solution Architecture](01-solution-architecture-diagram.png)

The diagram illustrates the end-to-end integration between ServiceNow and Microsoft Entra ID through Microsoft Graph API.

The architecture consists of two primary environments:

- **ServiceNow Environment:** Handles access request submission, approval processing, workflow orchestration, custom REST integration actions, and Requested Item lifecycle management.
- **Microsoft Environment:** Provides OAuth 2.0 application authentication, Microsoft Graph API endpoints, user identity information, and security group membership management.

### Integration Communication Sequence

1. **Request Submission:** A requester submits a Microsoft Entra ID Access Request through the ServiceNow Service Catalog.

2. **Approval Processing:** ServiceNow Flow Designer evaluates the approval decision. Approved requests proceed to automated processing, while rejected requests are closed without changing group membership.

3. **Custom Action Execution:** Flow Designer invokes the appropriate custom action, implemented using server-side JavaScript and `sn_ws.RESTMessageV2`.

4. **OAuth 2.0 Authentication:** The ServiceNow REST integration obtains an access token from the Microsoft identity platform using the OAuth 2.0 client credentials grant.

5. **Access Token Response:** Microsoft identity services validate the application credentials and permissions before issuing an access token.

6. **Microsoft Graph API Execution:** ServiceNow uses the access token to execute the appropriate Microsoft Graph operation:
   - GET: Retrieve the target user's Microsoft Entra ID object ID.
   - POST: Add the user to the selected security group.
   - DELETE: Remove the user from the selected security group.

7. **Response Processing:** The custom action validates the Microsoft Graph API response. Successful operations allow the workflow to close the Requested Item as Closed Complete.

8. **Exception Handling:** If a workflow execution error occurs, the configured Error Handler updates the Requested Item to Closed Incomplete and records work notes requiring manual investigation.

This architecture demonstrates approval-controlled identity management automation, application-based authentication, REST API integration, and request traceability.

## Architecture Overview

The solution integrates ServiceNow with Microsoft Entra ID through Microsoft Graph API to automate user access provisioning and revocation.

### Core Components

1. **ServiceNow Service Catalog:** Provides the Microsoft Entra ID Access Request catalog item for submitting access requests.
2. **ServiceNow Flow Designer:** Orchestrates approval decisions, user lookup, access provisioning, revocation, and request closure.
3. **Custom Flow Actions:** Execute Microsoft Graph API operations using ServiceNow RESTMessageV2.
4. **OAuth 2.0 Authentication:** Uses the client credentials grant to authenticate ServiceNow with Microsoft identity services.
5. **Microsoft Graph API:** Provides access to Microsoft Entra ID user and group membership operations.
6. **Microsoft Entra ID:** Maintains the user identities and security group memberships.
7. **Error Handler:** Handles workflow execution failures and updates affected requests for investigation.

## High-Level Process

1. A requester submits an access request through the ServiceNow Service Catalog.
2. The request enters the approval workflow.
3. If rejected, the request closes as incomplete without modifying group membership.
4. If approved, the workflow retrieves the catalog variables and resolves the target user's Entra ID object ID.
5. Based on the requested action, the workflow adds or removes the user from the selected Entra ID group through the Microsoft Graph API.
6. Successful operations close the requested item as complete.
7. Workflow execution failures invoke the error handler, which closes the requested item as incomplete and records investigation notes.

## Security Considerations

The integration uses OAuth 2.0 client credentials authentication. Authentication secrets and access tokens were not included in the public repository.

Approval controls restrict automated access changes to approved requests.
