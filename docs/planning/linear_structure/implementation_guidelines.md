# Implementation Guidelines for Linear Workplan Structure

This document provides practical guidelines for implementing the Linear structure for workplans in the DSTy project.

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Creating Epics](#2-creating-epics)
3. [Creating Workplans](#3-creating-workplans)
4. [Creating Tasks](#4-creating-tasks)
5. [Managing Relationships](#5-managing-relationships)
6. [Tracking Progress](#6-tracking-progress)
7. [Best Practices](#7-best-practices)

## 1. Getting Started

Before implementing the Linear structure for workplans, ensure you have:

- Access to the Linear workspace for the DSTy project
- Permissions to create and modify issues
- Access to the DSTy repository
- Familiarity with the workplan template

### Initial Setup

1. **Create Custom Fields**:
   - Navigate to Linear workspace settings
   - Go to "Custom Fields"
   - Create the following custom fields:
     - Workplan ID (Text)
     - Document Version (Number)
     - Estimated Effort (Number)
     - Documentation URL (URL)

2. **Create Labels**:
   - Navigate to Linear workspace settings
   - Go to "Labels"
   - Create the following labels:
     - Epic
     - Workplan
     - Task
     - Spike
     - Documentation
     - P0, P1, P2, P3 (Priority labels)
     - Core, UI, API, Testing, Infrastructure (Component labels)
     - Blocked, Needs Review, Ready for Implementation (Status labels)

3. **Set Up Project**:
   - Navigate to Linear workspace
   - Go to "Projects"
   - Create or select the DSTyS project

## 2. Creating Epics

Epics represent major features or components of the project and serve as the top level of the hierarchy.

### Epic Creation Process

1. **Navigate to Issues**:
   - Go to the Linear workspace
   - Select the appropriate team

2. **Create New Issue**:
   - Click "New Issue"
   - Set the title following the format: `[Feature/Component Name]: Master Issue`
   - Example: "Software Development Workflow Template: Master Issue"

3. **Fill in Description**:
   ```
   ## Overview

   [Brief description of the epic]

   ## Purpose

   [Why this epic exists and what it aims to achieve]

   ## Key Components

   * [Component 1]
   * [Component 2]
   * [Component 3]

   ## Deliverables

   1. [Deliverable 1]
   2. [Deliverable 2]
   3. [Deliverable 3]
   ```

4. **Apply Labels**:
   - Add the "Epic" label
   - Add any relevant component or priority labels

5. **Assign Owner**:
   - Assign the epic to the project lead or technical lead

6. **Set Project**:
   - Assign the epic to the DSTyS project

7. **Set Status**:
   - Set the initial status (typically "Backlog" or "Todo")

## 3. Creating Workplans

Workplans represent specific implementation chunks from the Project Overview and are linked to epics.

### Workplan Creation Process

1. **Create Workplan Document**:
   - Create a new markdown file in the `docs/planning/workplans/` directory
   - Follow the workplan template structure
   - Use the naming convention: `TASK-Description.md` (e.g., `CORE-PrimitiveImplementation.md`)

2. **Navigate to Issues**:
   - Go to the Linear workspace
   - Select the appropriate team

3. **Create New Issue**:
   - Click "New Issue"
   - Set the title following the format: `[WP-ID]: [Action] [Component] for [Project]`
   - Example: "WP-001: Implement Core Primitives for DSTyS"

4. **Fill in Description**:
   - Follow the structure outlined in the [workplan template mapping](./workplan_template_mapping.md)
   - Include all relevant sections from the workplan document

5. **Set Parent Issue**:
   - Link the workplan to the appropriate epic
   - Click "Parent" and select the epic

6. **Apply Labels**:
   - Add the "Workplan" label
   - Add any relevant component or priority labels

7. **Fill in Custom Fields**:
   - Workplan ID: The ID from the workplan document (e.g., "WP-001")
   - Document Version: The version number (e.g., 1.0)
   - Estimated Effort: The total estimated effort for the workplan
   - Documentation URL: Link to the workplan document in the repository

8. **Assign Owner**:
   - Assign the workplan to the technical lead or developer

9. **Set Project**:
   - Assign the workplan to the DSTyS project

10. **Set Status**:
    - Set the initial status (typically "Backlog" or "Todo")

## 4. Creating Tasks

Tasks represent specific implementation steps from a workplan and are linked to workplans.

### Task Creation Process

1. **Navigate to the Workplan Issue**:
   - Go to the Linear workspace
   - Find the workplan issue

2. **Create Sub-Issue**:
   - Click "Add sub-issue"
   - Set the title following the format: `[Action] [Specific Component]`
   - Example: "Implement Signature class with Effect integration"

3. **Fill in Description**:
   ```
   ## Task Description

   [Detailed description of the task]

   ## Implementation Details

   [Specific implementation instructions]

   ## Acceptance Criteria

   - [ ] [Criterion 1]
   - [ ] [Criterion 2]
   - [ ] [Criterion 3]

   ## Parent Workplan

   [Link to parent workplan]

   ## Estimated Effort

   [Estimated effort in hours or story points]
   ```

4. **Apply Labels**:
   - Add the "Task" label
   - Add any relevant technical or priority labels

5. **Assign Owner**:
   - Assign the task to the developer responsible for implementation

6. **Set Estimate**:
   - Set the estimated effort in hours or story points

7. **Set Status**:
   - Set the initial status (typically "Backlog" or "Todo")

## 5. Managing Relationships

Proper relationship management is crucial for maintaining the hierarchy and dependencies.

### Parent-Child Relationships

- **Epic → Workplan**: Set the epic as the parent of the workplan
- **Workplan → Task**: Set the workplan as the parent of the task

### Dependencies

1. **Blocking Dependencies**:
   - Navigate to the issue that has dependencies
   - Click "Blocks/Blocked by"
   - Select "Blocked by" and choose the issues that block this one

2. **Related Issues**:
   - Navigate to the issue
   - Click "Related issues"
   - Add related issues that are not direct dependencies

### Cycle Assignment

1. **Assign to Cycle**:
   - Navigate to the issue
   - Click "Cycle"
   - Select the appropriate cycle

2. **Cycle Planning Guidelines**:
   - Assign workplans and tasks to specific cycles for sprint planning
   - Epics typically span multiple cycles
   - Consider dependencies when assigning to cycles

## 6. Tracking Progress

Effective progress tracking ensures visibility and accountability.

### Status Updates

1. **Update Issue Status**:
   - Navigate to the issue
   - Change the status as work progresses
   - Follow the status workflow:
     - Backlog → Todo → In Progress → In Review → Done

2. **Update Document Status**:
   - Update the status in the workplan document to match the Linear issue
   - Update the Document Version field when making significant changes

### Progress Reporting

1. **Cycle Progress**:
   - Monitor cycle progress in Linear
   - Review incomplete issues at the end of each cycle

2. **Epic Progress**:
   - Track the completion of workplans within an epic
   - Update the epic status based on workplan completion

3. **Project Progress**:
   - Use Linear's project view to track overall project progress
   - Review project milestones regularly

## 7. Best Practices

Follow these best practices to ensure effective implementation of the Linear structure.

### Documentation Synchronization

- Keep workplan documents and Linear issues in sync
- Update both when making changes
- Use the Documentation URL field to link between them

### Naming and Labeling

- Follow consistent naming conventions for all issues
- Apply appropriate labels to facilitate filtering and searching
- Use descriptive titles that clearly indicate the purpose

### Hierarchy Management

- Maintain a clean hierarchy with no more than three levels (Epic → Workplan → Task)
- Avoid creating sub-tasks under tasks to prevent excessive nesting
- Ensure every issue has the appropriate parent

### Status Workflow

- Follow the defined status workflow consistently
- Update status promptly as work progresses
- Use the "Blocked" label for issues that cannot proceed

### Communication

- Use comments in Linear issues to communicate about specific issues
- Reference related issues in comments using the # symbol
- Mention team members using the @ symbol for notifications

### Automation

- Use Linear's API for automation where possible
- Set up GitHub integrations to link PRs to issues
- Consider implementing custom scripts for repetitive tasks

By following these guidelines, you can effectively implement the Linear structure for workplans in the DSTy project, ensuring consistency, traceability, and efficient project management.

