# ServiceNow Microsoft Entra ID Access Management

## Project Overview

This project demonstrates the design, development, and testing of an automated Identity and Access Management (IAM) solution integrating **ServiceNow with Microsoft Entra ID through Microsoft Graph API**.

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
