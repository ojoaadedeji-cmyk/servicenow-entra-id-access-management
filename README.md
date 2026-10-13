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
