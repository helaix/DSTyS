# Granular Workplan System for DSTyS

This document outlines the structure, creation, and management of granular workplans for the DSTyS project. These workplans are designed to break down larger development efforts ("Epics") into manageable, trackable tasks.

## Purpose
The granular workplan system aims to:
-   Provide clear, focused tasks for developers and AI agents.
-   Enable better progress tracking at a fine-grained level.
-   Facilitate easier management of dependencies between tasks.
-   Align development tasks directly with issues in external project management systems like Linear.

## Storage Location
All granular workplan Markdown files are stored in the `/Documentation/Plans/` directory.

## Workplan Template
All granular workplans MUST adhere to the standard template located at `docs/planning/templates/Workplan.md`.

## Naming Convention and Task ID
-   **Filename**: `PARENT-Epic-Abbrev-XX-TaskName.md`
    -   `PARENT-Epic-Abbrev`: A shortened, camelCase, or hyphenated abbreviation of the original epic or major component (e.g., `CORE-FieldImpl`, `SETUP-DepMgmt`).
    -   `XX`: A two-digit sequential number for tasks under that epic (e.g., `01`, `02`, `12`).
    -   `TaskName`: A concise, CamelCase description of the task (e.g., `TypeDef`, `PackageJsonConfig`).
    -   Example: `CORE-FieldImpl-01-TypeDef.md`
-   **Task ID (within the document)**: The `Task ID` field inside the Markdown file MUST exactly match the core part of the filename (e.g., `CORE-FieldImpl-01-TypeDef`). This ID is used for linking dependencies.

## Determining Granularity
-   Each granular workplan should represent a single, distinct, and manageable piece of work.
-   Aim for tasks that can be completed by a single developer/agent within a few days.
-   A main item from an old, larger workplan's "Implementation Checklist" often becomes a good candidate for a new granular workplan. Its sub-items then become the "Implementation Checklist" *within* that new granular plan.
-   If a task within a granular workplan's "Implementation Checklist" is itself complex, involves multiple independent sub-components, or requires its own distinct lifecycle tracking, consider breaking it down further into its own granular workplan.

## Creating New Granular Workplans
1.  **Identify the Task**: Define a clear, specific task that needs to be done.
2.  **Determine Parent Epic**: If part of a larger feature, identify the parent epic.
3.  **Generate ID & Filename**: Follow the naming convention (e.g., `MYFEATURE-Abbrev-01-SubTask.md`).
4.  **Create File**: Create the new `.md` file in `Documentation/Plans/`.
5.  **Populate**: Use the template from `docs/planning/templates/Workplan.md`.
    *   Fill in the `Task ID` to match the filename.
    *   Write a focused `Problem Statement` and `Proposed Implementation`.
    *   List specific `Components Involved` for this task.
    *   Define `Dependencies` using the Task IDs of other granular workplans.
    *   Create a detailed `Implementation Checklist` of sub-steps.
    *   Specify `Verification Steps` (often linking to specific tests or test workplans).
    *   Fill out all other sections as per the template.

## Refactoring Old Workplans into Granular Plans
Existing, larger workplans (often found in `docs/planning/workplans/`) should be refactored:

1.  **Create "Epic Overview" Document**:
    *   The original comprehensive workplan document is transformed.
    *   **Rename/Relocate**: Consider renaming the original file to signify its new role (e.g., `EPIC-OriginalName.md`) and keep it in `docs/planning/workplans/` or a dedicated epics directory.
    *   **Content**:
        *   Retain: High-level objectives, overall problem statement, architectural context, key decisions made.
        *   Remove/Summarize: The detailed "Implementation Checklist" (as this will be broken down).
        *   Add: A new section titled "Granular Workplans" that lists and links to all the new granular workplan files created from this epic.

2.  **Create Granular Workplan Files**:
    *   For each major task or logical group of sub-tasks from the original workplan's "Implementation Checklist":
        *   Create a new granular workplan file in `Documentation/Plans/` following the naming convention and template, as described in "Creating New Granular Workplans" above.
        *   The `Problem Statement`, `Proposed Implementation`, etc., in the new granular workplan should be scoped specifically to that smaller task.
        *   The sub-items from the original checklist item become the `Implementation Checklist` for the new granular plan.

## Managing Dependencies
-   The `Dependencies` section in each granular workplan should list the `Task ID`s of other granular workplans that must be completed first.
-   This allows for clear tracking of prerequisites and helps in planning the order of execution.
-   Example: `CORE-FieldImpl-01-TypeDef.md` might have a dependency on `SETUP-ProjectStructure-01-BaseConfig.md`.

## Mapping to Linear (or other PM tools)
-   Each granular workplan (and its unique `Task ID`) is intended to map directly to a single issue or task in Linear.
-   The `Task ID` can be used as a reference in Linear issue titles or descriptions.
-   Dependencies defined in the workplans can be mirrored as "blocking" or "related to" links in Linear.
-   The `Status` field in the workplan should be kept in sync with the Linear issue status.

## Master Index
The main outline and index of all workplans (both Epic Overviews and granular plans) is maintained in `docs/planning/workplans/Outline.md`. Ensure this file is updated when new granular workplans are created or epics are refactored.

Refer to `docs/planning/workplans/_workplan-execution.rules.mdc` for formal rules governing workplan execution.