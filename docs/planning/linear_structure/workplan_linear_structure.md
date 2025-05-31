# Linear Structure for Workplan Implementation

## Overview

This document outlines the recommended Linear structure for modeling workplans in the DSTy project, ensuring synchronization between documentation files and Linear issues. The structure is designed to be consistent, scalable, and aligned with the software development workflow templates.

## Table of Contents

1. [Linear Structure Analysis](#1-linear-structure-analysis)
2. [Synchronization Strategy](#2-synchronization-strategy)
3. [Implementation Guidelines](#3-implementation-guidelines)
4. [Example Implementation](#4-example-implementation)
5. [Appendices](#5-appendices)

## 1. Linear Structure Analysis

### 1.1 Hierarchy Design

The recommended hierarchy for representing workplans in Linear follows a four-level structure:

```
Project (DSTyS)
└── Epic (Master Issue)
    └── Workplan (Implementation Chunk)
        └── Task (Specific Implementation Step)
```

**Level 1: Project**
- Represents the highest level of organization (e.g., DSTyS)
- Maps to Linear Projects
- Contains multiple Epics

**Level 2: Epic (Master Issue)**
- Represents a major feature or component of the project
- Maps to Linear Issues with no parent
- Contains multiple Workplans
- Example: "Software Development Workflow Template: Master Issue"

**Level 3: Workplan (Implementation Chunk)**
- Represents a specific implementation chunk from the Project Overview
- Maps to Linear Issues with an Epic parent
- Contains multiple Tasks
- Example: "Implement Core Primitives for DSTyS"

**Level 4: Task (Specific Implementation Step)**
- Represents a specific implementation step from a Workplan
- Maps to Linear Issues with a Workplan parent
- Example: "Implement Signature class with Effect integration"

This hierarchy allows for clear organization and tracking of work while maintaining alignment with the documentation structure.

### 1.2 Field Mapping

The following table maps workplan template sections to Linear issue fields:

| Workplan Template Section | Linear Issue Field |
|---------------------------|-------------------|
| Workplan ID | Title prefix (e.g., "WP-001: ") |
| Document Information | Description (metadata section) |
| Objective | Description (purpose section) |
| Prerequisites | Description (prerequisites section) |
| Detailed Tasks | Sub-issues |
| Technical Specifications | Description (technical specifications section) or attached documents |
| Testing Strategy | Description (testing strategy section) |
| Implementation Guidance | Description (implementation guidance section) |
| Review Checklist | Description (review checklist section) |
| Status | Linear Issue State |

### 1.3 Custom Fields

To better support workplan implementation, the following custom fields are recommended:

| Custom Field | Type | Purpose |
|--------------|------|---------|
| Workplan ID | Text | Unique identifier for the workplan (e.g., "WP-001") |
| Document Version | Number | Version number of the workplan document |
| Estimated Effort | Number | Estimated effort in hours or story points |
| Dependencies | Relationship | Links to issues that must be completed before this one |
| Technical Lead | User | Assigned technical lead for review and approval |
| Documentation URL | URL | Link to the workplan document in the repository |

### 1.4 Relationship Modeling

Relationships between workplans and other elements are modeled as follows:

**Parent-Child Relationships**
- Epic → Workplan: Represented by the parent-child relationship in Linear
- Workplan → Task: Represented by the parent-child relationship in Linear

**Dependencies**
- Blocking Dependencies: Use the "Dependencies" custom field to indicate issues that must be completed before this one
- Related Issues: Use Linear's built-in relationship feature to link related issues

**Cycle Assignment**
- Workplans and Tasks should be assigned to specific cycles for sprint planning
- Epics typically span multiple cycles

## 2. Synchronization Strategy

### 2.1 File-to-Linear Mapping

To maintain synchronization between documentation files and Linear issues, the following mapping is recommended:

| Documentation File | Linear Element |
|-------------------|----------------|
| `docs/planning/templates/*.md` | Template references in issue descriptions |
| `docs/planning/workplans/TASK-Description.md` | Workplan issue in Linear |
| Sections within workplan documents | Sections in Linear issue descriptions |
| Task lists in workplan documents | Sub-issues in Linear |

**File Naming Convention**
- Workplan files: `TASK-Description.md` (e.g., `CORE-PrimitiveImplementation.md`)
- Task files: Not required, as tasks are represented as sub-issues in Linear

### 2.2 Update Procedures

To keep documentation and Linear in sync, follow these procedures:

**Creating a New Workplan**
1. Create the workplan document in the repository following the template
2. Create a corresponding Linear issue with the same structure
3. Link the document to the Linear issue using the Documentation URL field
4. Create sub-issues for each task in the workplan

**Updating an Existing Workplan**
1. Update the workplan document in the repository
2. Update the corresponding Linear issue to reflect the changes
3. Update the Document Version field in Linear
4. Add, modify, or close sub-issues as needed

**Completing a Workplan**
1. Mark all tasks as complete in the workplan document
2. Close all sub-issues in Linear
3. Update the workplan status to "Completed" in Linear
4. Update the Document Version field to indicate completion

### 2.3 Automation Opportunities

The following automation opportunities can help maintain synchronization:

**GitHub Integration**
- Automatically link PRs to Linear issues using branch naming conventions
- Update Linear issue status based on PR status
- Add comments to Linear issues when commits are made

**Document Generation**
- Generate workplan documents from Linear issues
- Generate Linear issues from workplan documents
- Update workplan documents when Linear issues are updated

**Status Synchronization**
- Update workplan status in documentation when Linear issue status changes
- Update task status in documentation when sub-issue status changes

**Notification System**
- Notify stakeholders when workplan status changes
- Notify stakeholders when dependencies are completed

## 3. Implementation Guidelines

### 3.1 Issue Creation Standards

When creating issues from workplans, follow these standards:

**Epic Creation**
- Title: Clear, concise description of the epic
- Description: Overview, purpose, key components, and deliverables
- Labels: "Epic" label
- Assignee: Project lead or technical lead

**Workplan Creation**
- Title: Include Workplan ID and descriptive name (e.g., "WP-001: Implement Core Primitives")
- Description: Follow the workplan template structure
- Parent: Link to the appropriate epic
- Labels: "Workplan" label and any relevant feature labels
- Assignee: Technical lead or developer
- Custom Fields: Fill in all relevant custom fields

**Task Creation**
- Title: Clear, actionable task description
- Description: Detailed implementation instructions
- Parent: Link to the appropriate workplan
- Labels: "Task" label and any relevant technical labels
- Assignee: Developer responsible for implementation
- Estimate: Estimated effort in hours or story points

### 3.2 Naming Conventions

Consistent naming patterns help organize and find issues:

**Epic Naming**
- Format: `[Feature/Component Name]: Master Issue`
- Example: "Software Development Workflow Template: Master Issue"

**Workplan Naming**
- Format: `[WP-ID]: [Action] [Component] for [Project]`
- Example: "WP-001: Implement Core Primitives for DSTyS"

**Task Naming**
- Format: `[Action] [Specific Component]`
- Example: "Implement Signature class with Effect integration"

**Branch Naming**
- Format: `feature/[issue-identifier]-[short-description]`
- Example: "feature/hlx-1456-design-linear-structure-for-workplan-implementation"

### 3.3 Tagging System

Labels and tags help organize and filter issues:

**Recommended Labels**
- **Type Labels**: Epic, Workplan, Task, Spike, Bug, Documentation
- **Priority Labels**: P0 (Critical), P1 (High), P2 (Medium), P3 (Low)
- **Component Labels**: Core, UI, API, Testing, Infrastructure
- **Status Labels**: Blocked, Needs Review, Ready for Implementation

**Label Usage Guidelines**
- Apply type labels to all issues
- Apply priority labels based on impact and urgency
- Apply component labels to indicate the affected area
- Apply status labels as needed to indicate special conditions

### 3.4 Status Workflow

The status workflow for workplans should align with the development process:

**Recommended Workflow**
1. **To Process**: Initial state for newly created issues
2. **Backlog**: Prioritized but not yet scheduled
3. **Todo**: Scheduled for the current cycle
4. **In Progress**: Currently being worked on
5. **In Review**: Implementation complete, awaiting review
6. **Done**: Fully implemented and reviewed
7. **Canceled**: No longer needed or superseded

**Status Transition Guidelines**
- Move from Backlog to Todo when scheduling for a cycle
- Move from Todo to In Progress when work begins
- Move from In Progress to In Review when implementation is complete
- Move from In Review to Done when review is complete
- Move to Canceled if the workplan is no longer needed

## 4. Example Implementation

### 4.1 Sample Structure

Below is a sample implementation using an existing workplan:

**Epic: Software Development Workflow Template**
- Description: Master issue for the software development workflow template
- Labels: Epic, Documentation
- State: In Progress

**Workplan: Design Linear Structure for Workplan Implementation**
- Parent: Software Development Workflow Template
- Description: Design an optimal Linear structure to model workplans
- Labels: Workplan, Documentation
- State: In Progress
- Custom Fields:
  - Workplan ID: WP-007
  - Document Version: 1.0
  - Estimated Effort: 16 hours
  - Documentation URL: [Link to document]

**Tasks:**
1. **Analyze Linear Capabilities and Limitations**
   - Parent: Design Linear Structure for Workplan Implementation
   - Description: Research Linear API and features
   - Labels: Task, Research
   - State: Done
   - Estimated Effort: 4 hours

2. **Design Hierarchy and Relationship Model**
   - Parent: Design Linear Structure for Workplan Implementation
   - Description: Create hierarchy design and relationship model
   - Labels: Task, Design
   - State: In Progress
   - Estimated Effort: 4 hours

3. **Develop Synchronization Strategy**
   - Parent: Design Linear Structure for Workplan Implementation
   - Description: Define procedures for keeping documentation and Linear in sync
   - Labels: Task, Design
   - State: Todo
   - Estimated Effort: 4 hours

4. **Create Implementation Guidelines**
   - Parent: Design Linear Structure for Workplan Implementation
   - Description: Define naming conventions, tagging system, and status workflow
   - Labels: Task, Documentation
   - State: Todo
   - Estimated Effort: 4 hours

### 4.2 Migration Plan

To implement this structure for existing workplans, follow these steps:

1. **Inventory Existing Workplans**
   - Identify all existing workplan documents in the repository
   - Map them to existing Linear issues where possible

2. **Create Missing Structure**
   - Create epics for major features or components
   - Create workplan issues for each workplan document
   - Create task issues for each task in the workplans

3. **Establish Relationships**
   - Link workplans to epics
   - Link tasks to workplans
   - Define dependencies between issues

4. **Apply Metadata**
   - Add labels to all issues
   - Fill in custom fields
   - Update issue descriptions to follow the template

5. **Verify Synchronization**
   - Ensure all workplan documents have corresponding Linear issues
   - Ensure all Linear issues have corresponding documentation
   - Verify that relationships are correctly established

6. **Train Team**
   - Provide training on the new structure
   - Document the process for creating and updating workplans
   - Establish review procedures for ensuring compliance

## 5. Appendices

### 5.1 Linear API Reference

The Linear API can be used to automate many aspects of workplan management:

**Key API Endpoints**
- `GET /issues`: Retrieve issues
- `POST /issues`: Create a new issue
- `PATCH /issues/:id`: Update an existing issue
- `POST /issues/:id/comments`: Add a comment to an issue
- `GET /teams/:id/cycles`: Get cycles for a team

**Authentication**
- Use API keys for authentication
- Store API keys securely
- Use scoped API keys with minimal permissions

### 5.2 Templates

**Linear Issue Templates**

Epic Template:
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

Workplan Template:
```
## Document Information
- **Workplan ID**: [ID]
- **Project**: [Project Name]
- **Document Version**: [Version]
- **Last Updated**: [Date]
- **Status**: [Status]

## 1. Objective

[Clear statement of what this workplan aims to achieve]

## 2. Prerequisites

[Dependencies that must be completed first]

## 3. Detailed Tasks

[Task breakdown with estimates and dependencies]

## 4. Technical Specifications

[Specific implementation details]

## 5. Testing Strategy

[How to verify the implementation]

## 6. Implementation Guidance

[Tips, best practices, and considerations]

## 7. Review Checklist

[Criteria for successful completion]

## Documentation URL

[Link to the workplan document in the repository]
```

Task Template:
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

