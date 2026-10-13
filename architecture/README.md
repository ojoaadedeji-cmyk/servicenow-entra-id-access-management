# Solution Architecture

## ServiceNow Microsoft Entra ID Access Management

This folder contains the solution architecture and process flow documentation for the ServiceNow Microsoft Entra ID Access Management project.

## Architecture Overview

The solution integrates ServiceNow with Microsoft Entra ID through the Microsoft Graph API to automate user access provisioning and revocation.

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

The integration uses OAuth 2.0 client credentials authentication. Authentication secrets and access tokens are not included in the public repository.

Approval controls restrict automated access changes to approved requests.
