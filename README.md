# ServiceNow Microsoft Entra ID Access Management

## Project Overview

This project demonstrates the design, development, and testing of an automated Identity and Access Management (IAM) solution that integrates **ServiceNow with Microsoft Entra ID via the Microsoft Graph API**.

The solution enables users to request access to Microsoft Entra ID security groups or revoke existing access through a ServiceNow Service Catalog item. Requests follow an approval workflow before ServiceNow executes the appropriate group membership operation using Microsoft Graph API.

The integration uses **OAuth 2.0 client credentials authentication**, custom Flow Designer actions, and ServiceNow's `RESTMessageV2` API to support secure communication between the two platforms.

The solution also incorporates automated request status updates, work notes, approval governance, and error handling to support accountability and traceability.

The project was developed and tested in a ServiceNow Personal Developer Instance (PDI) and a Microsoft Entra ID test environment.

## Business Problem

In many organisations, IT Service Desk teams manage user access to business applications and security groups through manual processes.

These processes often involve receiving access requests through emails or tickets, verifying approvals, locating user accounts, updating group memberships, and manually recording the outcome.

Such approaches can introduce several operational challenges:

1. **Manual administrative workload:** Service Desk analysts spend time performing repetitive user provisioning and revocation tasks.
2. **Delayed access delivery:** Users may experience delays while waiting for approvals and manual account updates.
3. **Inconsistent approval controls:** Access changes may be processed without a standardised approval workflow.
4. **Human error:** Manual group membership changes can result in incorrect access assignments or incomplete revocations.
5. **Limited traceability:** Inconsistent documentation can make it difficult to establish who requested, approved, and processed access changes.
6. **Exception management:** Failed access operations may require manual investigation without a structured mechanism for recording failures.

## Proposed Solution

To address these challenges, I developed a ServiceNow-based access management workflow that integrates with Microsoft Entra ID using Microsoft Graph API.

The solution provides:

- A centralised Service Catalog item for submitting access provisioning and revocation requests.
- Mandatory request information, including the target user, access action, and selected Entra ID group.
- An approval process that must be completed before access changes are executed.
- Automated Microsoft Entra ID user identification through Microsoft Graph API.
- Automated group membership provisioning and revocation through custom ServiceNow Flow Designer actions.
- Automatic closure of successfully processed requests with appropriate work notes.
- Rejection handling that prevents unauthorised group membership changes.
- Error handling that records unsuccessful operations and flags affected requests for investigation.

The project demonstrates how **ServiceNow ITSM workflows, Microsoft Entra ID, REST API integration, and identity governance controls** can be combined to reduce manual administrative effort and improve the consistency of access management processes.

## Project Objectives

The primary objective of this project was to design, develop, and implement a ServiceNow-based access management solution that automates Microsoft Entra ID security group membership changes through Microsoft Graph API while maintaining appropriate approval controls and request traceability.

The specific objectives were to:

1. **Centralise access requests:** Configure a ServiceNow Service Catalog item that allows users to submit access provisioning and revocation requests through a standardised interface.
2. **Enforce approval governance:** Implement an approval workflow that prevents Microsoft Entra ID group membership changes until the request has been approved.
3. **Automate user identification:** Retrieve the target user's Microsoft Entra ID object ID through Microsoft Graph API.
4. **Automate access provisioning:** Develop a custom Flow Designer action that adds approved users to selected Microsoft Entra ID security groups.
5. **Automate access revocation:** Develop a custom Flow Designer action that removes users from selected security groups following approval.
6. **Implement secure authentication:** Configure OAuth 2.0 client credentials authentication for ServiceNow-to-Microsoft Graph communication.
7. **Maintain request traceability:** Automatically update ServiceNow Requested Item (RITM) records with processing outcomes, closure states, and work notes.
8. **Handle rejected requests:** Prevent unauthorised group membership changes and close rejected requests appropriately.
9. **Implement exception handling:** Detect workflow execution failures, prevent incorrect successful closure, and record information for investigation.
10. **Validate the solution:** Test successful access provisioning, successful access revocation, approval rejection, and integration error handling.

## Technologies and Tools

| Technology / Tool | Purpose |
|---|---|
| ServiceNow Personal Developer Instance (PDI) | Development and testing environment for the access management solution. |
| ServiceNow Service Catalog | Provides the Microsoft Entra ID Access Request catalog item. |
| ServiceNow Flow Designer / Workflow Studio | Orchestrates approvals, catalog variable retrieval, custom actions, conditional logic, and request closure. |
| ServiceNow Custom Flow Actions | Encapsulates user lookup, group membership provisioning, and revocation operations. |
| ServiceNow Outbound REST Messages | Configures HTTP requests to Microsoft Graph API. |
| ServiceNow `sn_ws.RESTMessageV2` | Executes outbound REST requests from server-side JavaScript. |
| Microsoft Entra ID | Provides cloud identity management and security group membership administration. |
| Microsoft Graph API | Supports Microsoft Entra ID user lookup and group membership operations. |
| OAuth 2.0 Client Credentials Grant | Provides application-based authentication for the ServiceNow-to-Microsoft Graph integration. |
| JavaScript | Implements custom REST integration logic and response validation. |
| GitHub | Hosts project documentation, technical scripts, architecture information, and testing evidence. |

### Integration Approach

The solution uses ServiceNow custom Flow Designer actions and Outbound REST Messages rather than IntegrationHub Microsoft Entra ID spokes.

This approach was selected because the required IntegrationHub capabilities were unavailable in the ServiceNow Personal Developer Instance.

The integration demonstrates how native ServiceNow scripting capabilities, REST APIs, and OAuth 2.0 authentication can support external identity management automation.

## Solution Architecture and Integration Workflow

### Architecture Overview

The solution uses ServiceNow as the central platform for managing access requests, approval decisions, workflow execution, and request tracking.

Microsoft Entra ID serves as the identity management platform, while Microsoft Graph API provides the interface for retrieving user information and modifying security group memberships.

ServiceNow communicates with Microsoft Graph using Outbound REST Messages executed through custom Flow Designer actions. Authentication is handled through OAuth 2.0 using the client credentials grant.

### Integration Workflow

1. **Access Request Submission:** A requester submits the Microsoft Entra ID Access Request catalog item, specifying the target user's email address, the requested action (Grant Access or Revoke Access), and the target Entra ID group.

2. **Approval Processing:** ServiceNow initiates the approval process. The workflow proceeds with access changes only when the request is approved.

3. **Catalog Variable Retrieval:** Following approval, Flow Designer retrieves the submitted catalog variables.

4. **User Identification:** The Get Entra ID User custom action queries Microsoft Graph API to identify the target user's Entra ID object ID.

5. **Conditional Access Processing:** Flow Designer evaluates the requested action and executes the corresponding custom action:
   - **Grant Access:** Adds the target user to the selected Entra ID security group.
   - **Revoke Access:** Removes the target user from the selected Entra ID security group.

6. **Successful Request Closure:** When the Microsoft Graph operation succeeds, ServiceNow automatically updates the Requested Item (RITM) to Closed Complete and records confirmation in the work notes.

7. **Rejected Request Handling:** If the approval is rejected or cancelled, ServiceNow prevents group membership changes, closes the RITM as Closed Incomplete, and records the rejection outcome.

8. **Integration Error Handling:** If a workflow execution error occurs, the Flow Designer Error Handler updates the affected RITM to Closed Incomplete and records work notes indicating that manual investigation is required.

### Architecture Components

| Component | Responsibility |
|---|---|
| ServiceNow Service Catalog | Captures access requests through a standardised catalog item. |
| ServiceNow Flow Designer | Coordinates approvals, conditions, custom actions, and request updates. |
| Custom Flow Actions | Executes user lookup, group membership provisioning, and revocation operations. |
| ServiceNow Outbound REST Messages | Defines the Microsoft Graph API HTTP requests. |
| OAuth 2.0 Client Credentials | Authenticates the ServiceNow application with Microsoft identity services. |
| Microsoft Graph API | Processes Microsoft Entra ID user lookup and group membership operations. |
| Microsoft Entra ID | Stores user identities and manages security group memberships. |
| ServiceNow Requested Item (RITM) | Maintains request status, processing outcomes, and work notes. |
| Flow Designer Error Handler | Handles workflow execution failures and records requests requiring investigation. |

### Architecture Documentation

Additional technical information is available in the [Solution Architecture Documentation](architecture/README.md).

## ServiceNow Service Catalog Configuration

### Catalog Item Overview

A ServiceNow Service Catalog item named **Microsoft Entra ID Access Request** was configured to provide a standardised interface for submitting Microsoft Entra ID security group access requests.

The catalog item supports two access management operations:

1. **Grant Access:** Request the addition of a selected user to a specified Microsoft Entra ID security group.
2. **Revoke Access:** Request the removal of a selected user from a specified Microsoft Entra ID security group.

The catalog item is connected to the Microsoft Entra ID Access Request flow in ServiceNow Workflow Studio, enabling submitted requests to enter an automated approval and access management process.

### Catalog Variables

Three mandatory variables were configured to capture the information required for processing access requests.

| Variable | Technical Name | Type | Purpose |
|---|---|---|---|
| Target User Email Address | `target_user_email_address` | Single Line Text | Captures the Microsoft Entra ID user principal name (UPN) used to identify the target user. |
| Access Action | `access_action` | Select Box | Allows the requester to select Grant Access or Revoke Access. |
| Entra ID Group | `entra_id_group` | Select Box | Allows the requester to select the target Microsoft Entra ID security group. |

### Variable Configuration and Data Mapping

**Target User Email Address**

The requester provides the target user's Microsoft Entra ID email address or user principal name.

The workflow passes this value to the Get Entra ID User custom action, which queries Microsoft Graph API to retrieve the corresponding user object ID.

**Access Action**

The requester selects one of two available actions:

- Grant Access
- Revoke Access

The selected value determines which conditional branch of the Flow Designer workflow is executed after approval.

**Entra ID Group**

The requester selects the required Microsoft Entra ID security group from the configured choices.

Each choice displays a readable group name, while its underlying value contains the corresponding Microsoft Entra ID group object ID.

This allows the workflow to pass the selected group identifier directly to the Microsoft Graph integration action.

### Mandatory Field Validation

All three catalog variables were configured as mandatory to ensure that the workflow receives the information required to identify the target user, determine the requested operation, and select the appropriate security group.

This reduces the likelihood of incomplete access requests entering automated processing.

### Requested Item Creation

When the catalog item is submitted, ServiceNow creates a Requested Item (RITM) record.

The RITM provides the central record for tracking the access request through approval, Microsoft Graph processing, and closure.

The workflow updates the RITM according to the processing outcome:

- **Successful provisioning or revocation:** Closed Complete.
- **Rejected or cancelled approval:** Closed Incomplete.
- **Workflow execution error:** Closed Incomplete, with work notes indicating that investigation is required.

## Microsoft Entra ID and OAuth 2.0 Configuration

### Microsoft Entra ID Environment

Microsoft Entra ID was used as the cloud identity management platform for the project.

A Microsoft Entra ID test environment was configured to support user account identification and security group membership management through Microsoft Graph API.

Test users and security groups were used to validate automated access provisioning and revocation without affecting production identities.

### Microsoft Entra ID Application Registration

An application registration was created in Microsoft Entra ID to establish an application identity for the ServiceNow integration.

The registration enables ServiceNow to authenticate with Microsoft identity services and request access tokens for Microsoft Graph API.

The application registration provides the identifiers required for OAuth 2.0 authentication, including:

- Application (Client) ID
- Directory (Tenant) ID
- Application credentials

The application credentials are maintained outside the public GitHub repository.

### OAuth 2.0 Authentication

The integration uses **OAuth 2.0 Client Credentials Grant**, which supports application-to-application authentication without requiring an interactive user sign-in.

This approach is appropriate because ServiceNow automatically executes Microsoft Graph API operations after the required access request approvals are completed.

The authentication process operates as follows:

1. ServiceNow initiates an OAuth 2.0 token request using its configured application credentials.
2. Microsoft Identity Services validates the application identity and applicable permissions.
3. Microsoft Identity Services issues an access token.
4. ServiceNow uses the access token to authenticate outbound Microsoft Graph API requests.
5. Microsoft Graph evaluates the token's permissions before processing the requested operation.

### Microsoft Graph API Permissions

Microsoft Graph application permissions are used to authorise the integration to perform identity and group membership operations without an interactive user session.

The integration requires appropriate permissions for retrieving user information and managing group memberships.

These permissions must be configured in the Microsoft Entra ID application registration and granted the required administrator consent.

Application permissions should follow the principle of least privilege, granting only the access necessary for the intended integration operations.

### ServiceNow OAuth Configuration

An OAuth 2.0 configuration was established in ServiceNow to support authentication with Microsoft identity services.

The OAuth configuration was associated with the Microsoft Graph REST integration so that outbound API requests could authenticate using the registered application identity.

The integration uses the OAuth 2.0 client credentials flow rather than delegated user authentication.

This enables approved ServiceNow workflows to execute Microsoft Graph operations without requiring individual requesters to sign in to Microsoft Entra ID during workflow execution.

### Security Considerations

The integration incorporates the following security principles:

1. **Application-based authentication:** ServiceNow authenticates using its registered application identity.
2. **Approval governance:** Microsoft Entra ID group membership changes are initiated only after the access request has been approved.
3. **Permission management:** Microsoft Graph permissions should be limited to those required for the integration.
4. **Credential confidentiality:** Client secrets, access tokens, and other authentication credentials are excluded from public documentation.
5. **Request traceability:** ServiceNow Requested Item records retain approval and processing outcomes.
6. **Error handling:** Failed workflow operations are recorded for investigation rather than incorrectly marked as successful.

### Authentication Architecture

The authentication relationship is:

**ServiceNow → Microsoft Entra ID Token Endpoint (OAuth 2.0 Authentication) → Access Token → Microsoft Graph API → Microsoft Entra ID Users and Groups**

ServiceNow obtains an access token from Microsoft identity services and uses that token to perform authorised Microsoft Graph API operations.

The Microsoft Graph API provides the interface through which the integration retrieves user information and modifies security group memberships.

## Microsoft Graph REST API Integration

### Integration Overview

The project uses Microsoft Graph REST API to connect ServiceNow with Microsoft Entra ID for automated user identification and security group membership management.

The integration was implemented using **ServiceNow Outbound REST Messages**, **custom Flow Designer actions**, and **server-side JavaScript**.

Because the required IntegrationHub capabilities were unavailable in the ServiceNow Personal Developer Instance, the solution uses ServiceNow's native `sn_ws.RESTMessageV2` API to execute authenticated HTTP requests.

### REST Message Configuration

An Outbound REST Message named **Microsoft Graph API** was configured in ServiceNow.

The integration uses the following Microsoft Graph API base endpoint:

`https://graph.microsoft.com/v1.0`

OAuth 2.0 authentication was configured to enable ServiceNow to obtain access tokens using the client credentials grant.

The REST Message configuration supports the user lookup, group membership provisioning, and revocation operations required by the workflow.

### Microsoft Graph API Operations

| Operation | HTTP Method | Microsoft Graph Endpoint | Expected Successful Response |
|---|---|---|---|
| Retrieve Entra ID user | GET | `/users/{user-id-or-UPN}` | 200 OK |
| Add user to group | POST | `/groups/{group-id}/members/$ref` | 204 No Content |
| Remove user from group | DELETE | `/groups/{group-id}/members/{user-id}/$ref` | 204 No Content |

The user lookup operation resolves the target user's Microsoft Entra ID object ID, which is subsequently used in group membership operations.

### User Lookup Operation

The **Get Entra ID User** custom action retrieves the Microsoft Entra ID user associated with the email address or user principal name submitted through the Service Catalog.

The action sends a GET request to Microsoft Graph API and extracts the corresponding user object ID from the response.

This allows subsequent workflow actions to reference the correct Microsoft Entra ID user.

### Grant Access Operation

The **Add User to Entra ID Group** custom action executes an authenticated POST request to Microsoft Graph API.

The request identifies the target security group and supplies the user object ID in the required JSON request body.

When Microsoft Graph returns HTTP 204, the operation is treated as successful.

The workflow then updates the associated ServiceNow Requested Item to **Closed Complete** and records confirmation in the work notes.

### Revoke Access Operation

The **Remove User from Entra ID Group** custom action executes an authenticated DELETE request to Microsoft Graph API.

The request identifies both the target security group and the user membership to be removed.

When Microsoft Graph returns HTTP 204, the operation is treated as successful.

The workflow then updates the associated Requested Item to **Closed Complete** and records the successful revocation in the work notes.

### HTTP Response Validation

The custom integration scripts evaluate the HTTP status codes returned by Microsoft Graph API.

Successful group membership operations are expected to return HTTP 204.

If an operation returns an unexpected status code, the script raises an error rather than allowing the workflow to record the operation as successful.

The Flow Designer Error Handler can then update the affected Requested Item to **Closed Incomplete** and record investigation notes.

### Integration Testing

The integration was validated using controlled test users and security groups in Microsoft Entra ID.

Testing confirmed successful group membership provisioning and revocation, with corresponding updates to ServiceNow Requested Item records.

An additional negative test confirmed that a failed revocation attempt triggered the configured workflow error handler.

The underlying HTTP response for that negative test was not independently verified, so its precise failure cause remains unconfirmed.

### Integration Security

The integration uses OAuth 2.0 client credentials authentication rather than embedding authentication credentials directly in JavaScript.

REST endpoint parameters identify the required Microsoft Entra ID users and groups.

Client secrets, access tokens, and confidential authentication configuration values are excluded from the public GitHub repository.

## Custom Flow Designer Actions and JavaScript Implementation

### Overview

Three custom Flow Designer actions were developed in ServiceNow Workflow Studio to support Microsoft Entra ID user identification, access provisioning, and access revocation.

These actions encapsulate Microsoft Graph API operations, allowing the main access request workflow to execute integration tasks using reusable components.

The custom actions use ServiceNow server-side JavaScript and Outbound REST Messages to communicate with Microsoft Graph API.

### Custom Actions

| Custom Action | Purpose | Microsoft Graph Operation |
|---|---|---|
| Get Entra ID User | Resolves the target user's Microsoft Entra ID object ID using the supplied user principal name. | GET |
| Add User to Entra ID Group | Adds the identified user to the selected Microsoft Entra ID security group. | POST |
| Remove User from Entra ID Group | Removes the identified user from the selected Microsoft Entra ID security group. | DELETE |

### 1. Get Entra ID User

The **Get Entra ID User** custom action retrieves the Microsoft Entra ID object ID of the user specified in the Service Catalog request.

The action receives the target user's email address or user principal name from the workflow and queries Microsoft Graph API.

The returned user object ID is made available to subsequent Flow Designer actions.

This separates user identification from group membership operations and enables the workflow to use a consistent user identifier.

### 2. Add User to Entra ID Group

The **Add User to Entra ID Group** custom action provisions group membership following approval.

The action receives the target group object ID and user object ID from the workflow.

A server-side JavaScript step uses ServiceNow's `sn_ws.RESTMessageV2` API to execute the configured Microsoft Graph POST request.

The action validates the HTTP response and treats HTTP 204 as successful execution.

If Microsoft Graph returns an unexpected response, the script raises an error so that the workflow does not incorrectly record the operation as successful.

### 3. Remove User from Entra ID Group

The **Remove User from Entra ID Group** custom action revokes group membership following approval.

The action receives the target group object ID and user object ID.

A server-side JavaScript step executes the configured Microsoft Graph DELETE request using `sn_ws.RESTMessageV2`.

The action validates the HTTP response and treats HTTP 204 as successful execution.

Unexpected responses cause the action to raise an error, allowing the workflow's error-handling configuration to respond appropriately.

### ServiceNow RESTMessageV2

The integration uses the `sn_ws.RESTMessageV2` API to invoke predefined ServiceNow Outbound REST Message methods.

This approach separates the REST endpoint and authentication configuration from the main workflow logic.

The scripts use REST path parameters to identify the relevant Microsoft Entra ID user and security group.

The HTTP response status is then evaluated to determine whether the operation completed successfully.

### Reusable Action Design

Separating the integration into three custom actions provides several benefits:

1. **Modularity:** User lookup, provisioning, and revocation are implemented as separate workflow components.
2. **Reusability:** The custom actions can be invoked by other compatible ServiceNow flows.
3. **Maintainability:** Changes to an integration operation can be managed within its corresponding custom action.
4. **Error detection:** Each integration operation can validate its HTTP response.
5. **Workflow clarity:** The main flow remains focused on approval governance, conditional processing, and request lifecycle management.

### Technical Script Documentation

The JavaScript implementation and relevant configuration details will be documented separately in the [Integration Scripts](scripts/README.md) directory.

Authentication credentials, client secrets, and access tokens are excluded from the public repository.


