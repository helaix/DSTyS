## Task Planning and Execution System

### Workplan Creation

Before implementing any feature or bugfix:

1. Create a dedicated workplan file in the `Documentation/Plans/` directory with naming format: `TaskID-Description.md` (e.g., `BUG-AuthFlow.md`, `FEAT-Abilities.md`)
2. Workplan structure must include:
   - **Task ID**: Simple identifier for reference (e.g., "FEAT-Abilities", "BUG-AuthFlow")
   - **Problem Statement**: Clear definition of what needs to be solved or implemented
   - **Proposed Implementation**: Clear and thorough description of a solution that will satisfy the problem statement and implement the desired functionality. It should include what to test and how it should be tested.
   - **Components Involved**: Related areas of the system (broader than just files)
   - **Dependencies**: Prerequisite knowledge, components, or systems needed
   - **Implementation Checklist**: Step-by-step tasks with checkboxes
   - **Verification Steps**: How to confirm the implementation works correctly. Verification Steps should always be machine executable (custom scripts, automated tests, CI pass, etc) unless not possible and a human is required.
   - **Decision Authority**: Clarify which decisions you can make independently vs which require user input
   - **Questions/Uncertainties**:
     - _Blocking_: Issues that must be resolved before proceeding
     - _Non-blocking_: Issues you can make reasonable assumptions about and proceed
   - **Acceptable Tradeoffs**: What compromises are acceptable for implementation speed
   - **Status**: One of [Not Started, In Progress, Completed, Blocked]
   - **Notes**: Any implementation decisions, challenges, or context for future reference

### Workplan Execution

1. Update the workplan Status from "Not Started" to "In Progress" when you begin implementation
2. Check off items in the checklist as they are completed
3. Add notes about implementation decisions or challenges encountered
4. For non-blocking uncertainties:
   - Document your working assumption
   - Proceed with implementation based on that assumption
   - Flag the assumption in the Notes section for future review
5. For blocking uncertainties:
   - Document the specific question or issue
   - Update status to "Blocked" if you cannot proceed
   - Once resolved, document the resolution and continue
6. Update the Status to "Completed" once all steps are finished and verified
