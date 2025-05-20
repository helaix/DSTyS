# DSTyS Project Workplan Outline & Index

This document provides a comprehensive outline and index of all workplans for the DSTyS project. Each item links to a detailed workplan document. Workplans are categorized into "Epic Overviews" (refactored from original comprehensive plans) and their corresponding "Granular Workplans" (detailed, actionable tasks).

## Project Overview

DSTyS is a TypeScript implementation of Stanford NLP's DSPy framework, leveraging the Effect library for functional programming paradigms. The project aims to bring the powerful programming model for foundation models to the TypeScript ecosystem, enabling developers to build robust, composable, and optimizable AI systems using idiomatic TypeScript.

## Implementation Approach

The implementation will follow a test-driven development (TDD) approach by:
1. Converting Python DSPy tests to TypeScript with Effect TS integration.
2. Implementing components to make the tests pass.
3. Refactoring the implementation while ensuring tests continue to pass.

## Workplan Index

### I. Project Setup and Foundation (`SETUP-*`)

1.  **Epic Overview: Project Structure Setup ([SETUP-ProjectStructure](./SETUP-ProjectStructure.md))**
    *   [SETUP-ProjStruct-01-DirStructure](../../Documentation/Plans/SETUP-ProjStruct-01-DirStructure.md) - Create basic directory structure
    *   [SETUP-ProjStruct-02-TSConfig](../../Documentation/Plans/SETUP-ProjStruct-02-TSConfig.md) - Configure TypeScript
    *   [SETUP-ProjStruct-03-LintFormat](../../Documentation/Plans/SETUP-ProjStruct-03-LintFormat.md) - Set up ESLint and Prettier/Biome
    *   [SETUP-ProjStruct-04-Testing](../../Documentation/Plans/SETUP-ProjStruct-04-Testing.md) - Configure testing with Vitest
    *   [SETUP-ProjStruct-05-CICD](../../Documentation/Plans/SETUP-ProjStruct-05-CICD.md) - Set up GitHub Actions workflow
    *   [SETUP-ProjStruct-06-PackageJson](../../Documentation/Plans/SETUP-ProjStruct-06-PackageJson.md) - Configure package.json
    *   [SETUP-ProjStruct-07-DocsGen](../../Documentation/Plans/SETUP-ProjStruct-07-DocsGen.md) - Set up documentation generation
    *   [SETUP-ProjStruct-08-README](../../Documentation/Plans/SETUP-ProjStruct-08-README.md) - Create README.md with project overview
    *   [SETUP-ProjStruct-09-Examples](../../Documentation/Plans/SETUP-ProjStruct-09-Examples.md) - Set up example files

2.  **Epic Overview: Dependency Management Setup ([SETUP-DependencyManagement](./SETUP-DependencyManagement.md))**
    *   [SETUP-DepMgmt-01-PackageJsonConfig](../../Documentation/Plans/SETUP-DepMgmt-01-PackageJsonConfig.md) - Package.json Configuration
    *   [SETUP-DepMgmt-02-DependenciesSetup](../../Documentation/Plans/SETUP-DepMgmt-02-DependenciesSetup.md) - Dependencies Setup
    *   [SETUP-DepMgmt-03-ModuleResolution](../../Documentation/Plans/SETUP-DepMgmt-03-ModuleResolution.md) - Module Resolution Configuration
    *   [SETUP-DepMgmt-04-PackageExports](../../Documentation/Plans/SETUP-DepMgmt-04-PackageExports.md) - Package Exports Configuration
    *   [SETUP-DepMgmt-05-BundlingSetup](../../Documentation/Plans/SETUP-DepMgmt-05-BundlingSetup.md) - Bundling Setup
    *   [SETUP-DepMgmt-06-PublishingConfig](../../Documentation/Plans/SETUP-DepMgmt-06-PublishingConfig.md) - Publishing Configuration

### II. Testing Framework and Conversion (`TEST-*`)

3.  **Epic Overview: Testing Framework Setup ([TEST-Framework](./TEST-Framework.md))**
    *   [TEST-Frmwk-01-SetupVitest](../../Documentation/Plans/TEST-Frmwk-01-SetupVitest.md) - Set up Vitest
    *   [TEST-Frmwk-02-EffectIntegration](../../Documentation/Plans/TEST-Frmwk-02-EffectIntegration.md) - Configure Effect TS integration
    *   [TEST-Frmwk-03-MockingUtils](../../Documentation/Plans/TEST-Frmwk-03-MockingUtils.md) - Set up mocking utilities
    *   [TEST-Frmwk-04-CoverageConfig](../../Documentation/Plans/TEST-Frmwk-04-CoverageConfig.md) - Configure code coverage
    *   [TEST-Frmwk-05-CreateTestUtils](../../Documentation/Plans/TEST-Frmwk-05-CreateTestUtils.md) - Create test utilities
    *   [TEST-Frmwk-06-CICDIntegration](../../Documentation/Plans/TEST-Frmwk-06-CICDIntegration.md) - Set up CI/CD integration
    *   [TEST-Frmwk-07-Documentation](../../Documentation/Plans/TEST-Frmwk-07-Documentation.md) - Create documentation for testing framework

4.  **Template: Test Conversion ([TEST-ConversionTemplate](./TEST-ConversionTemplate.md))** (This is a template, not an epic with granular tasks)

5.  **Epic Overview: Field Tests Conversion ([TEST-FieldTests](./TEST-FieldTests.md))**
    *   [TEST-FldTests-01-IdentifyPyTests](../../Documentation/Plans/TEST-FldTests-01-IdentifyPyTests.md) - Identify Python Field tests
    *   [TEST-FldTests-02-AnalyzeStructure](../../Documentation/Plans/TEST-FldTests-02-AnalyzeStructure.md) - Analyze test structure and patterns
    *   [TEST-FldTests-03-CreateTSFiles](../../Documentation/Plans/TEST-FldTests-03-CreateTSFiles.md) - Create TypeScript test files
    *   [TEST-FldTests-04-AdaptTests](../../Documentation/Plans/TEST-FldTests-04-AdaptTests.md) - Adapt tests for TypeScript & Effect
    *   [TEST-FldTests-05-CreateMocks](../../Documentation/Plans/TEST-FldTests-05-CreateMocks.md) - Create mock implementations
    *   [TEST-FldTests-06-VerifyCoverage](../../Documentation/Plans/TEST-FldTests-06-VerifyCoverage.md) - Verify test coverage
    *   [TEST-FldTests-07-DocumentPatterns](../../Documentation/Plans/TEST-FldTests-07-DocumentPatterns.md) - Document test patterns

6.  **Epic Overview: Signature Tests Conversion ([TEST-SignatureTests](./TEST-SignatureTests.md))**
    *   [TEST-SigTests-01-IdentifyPyTests](../../Documentation/Plans/TEST-SigTests-01-IdentifyPyTests.md) - Identify Python Signature tests
    *   [TEST-SigTests-02-AnalyzeStructure](../../Documentation/Plans/TEST-SigTests-02-AnalyzeStructure.md) - Analyze test structure
    *   [TEST-SigTests-03-CreateTSFiles](../../Documentation/Plans/TEST-SigTests-03-CreateTSFiles.md) - Create TS test files
    *   [TEST-SigTests-04-AdaptTests](../../Documentation/Plans/TEST-SigTests-04-AdaptTests.md) - Adapt tests for TS/Effect
    *   [TEST-SigTests-05-CreateMocks](../../Documentation/Plans/TEST-SigTests-05-CreateMocks.md) - Create mocks
    *   [TEST-SigTests-06-VerifyCoverage](../../Documentation/Plans/TEST-SigTests-06-VerifyCoverage.md) - Verify coverage
    *   [TEST-SigTests-07-DocumentPatterns](../../Documentation/Plans/TEST-SigTests-07-DocumentPatterns.md) - Document patterns

7.  **Epic Overview: Example Tests Conversion ([TEST-ExampleTests](./TEST-ExampleTests.md))**
    *   [TEST-ExTests-01-IdentifyPyTests](../../Documentation/Plans/TEST-ExTests-01-IdentifyPyTests.md) - Identify Python Example tests
    *   [TEST-ExTests-02-AnalyzeStructure](../../Documentation/Plans/TEST-ExTests-02-AnalyzeStructure.md) - Analyze test structure
    *   [TEST-ExTests-03-CreateTSFiles](../../Documentation/Plans/TEST-ExTests-03-CreateTSFiles.md) - Create TS test files
    *   [TEST-ExTests-04-AdaptTests](../../Documentation/Plans/TEST-ExTests-04-AdaptTests.md) - Adapt tests for TS/Effect
    *   [TEST-ExTests-05-CreateMocks](../../Documentation/Plans/TEST-ExTests-05-CreateMocks.md) - Create mocks
    *   [TEST-ExTests-06-VerifyCoverage](../../Documentation/Plans/TEST-ExTests-06-VerifyCoverage.md) - Verify coverage
    *   [TEST-ExTests-07-DocumentPatterns](../../Documentation/Plans/TEST-ExTests-07-DocumentPatterns.md) - Document patterns

8.  **Epic Overview: Module Tests Conversion ([TEST-ModuleTests](./TEST-ModuleTests.md))**
    *   [TEST-ModTests-01-IdentifyPyTests](../../Documentation/Plans/TEST-ModTests-01-IdentifyPyTests.md) - Identify Python Module tests
    *   [TEST-ModTests-02-AnalyzeStructure](../../Documentation/Plans/TEST-ModTests-02-AnalyzeStructure.md) - Analyze test structure
    *   [TEST-ModTests-03-CreateTSFiles](../../Documentation/Plans/TEST-ModTests-03-CreateTSFiles.md) - Create TS test files
    *   [TEST-ModTests-04-AdaptTests](../../Documentation/Plans/TEST-ModTests-04-AdaptTests.md) - Adapt tests for TS/Effect
    *   [TEST-ModTests-05-CreateMocks](../../Documentation/Plans/TEST-ModTests-05-CreateMocks.md) - Create mocks
    *   [TEST-ModTests-06-VerifyCoverage](../../Documentation/Plans/TEST-ModTests-06-VerifyCoverage.md) - Verify coverage
    *   [TEST-ModTests-07-DocumentPatterns](../../Documentation/Plans/TEST-ModTests-07-DocumentPatterns.md) - Document patterns

9.  **Epic Overview: Prediction Tests Conversion ([TEST-PredictionTests](./TEST-PredictionTests.md))**
    *   [TEST-PredTests-01-IdentifyPyTests](../../Documentation/Plans/TEST-PredTests-01-IdentifyPyTests.md) - Identify Python Prediction tests
    *   [TEST-PredTests-02-AnalyzeStructure](../../Documentation/Plans/TEST-PredTests-02-AnalyzeStructure.md) - Analyze test structure
    *   [TEST-PredTests-03-CreateTSFiles](../../Documentation/Plans/TEST-PredTests-03-CreateTSFiles.md) - Create TS test files
    *   [TEST-PredTests-04-AdaptTests](../../Documentation/Plans/TEST-PredTests-04-AdaptTests.md) - Adapt tests for TS/Effect
    *   [TEST-PredTests-05-CreateMocks](../../Documentation/Plans/TEST-PredTests-05-CreateMocks.md) - Create mocks
    *   [TEST-PredTests-06-VerifyCoverage](../../Documentation/Plans/TEST-PredTests-06-VerifyCoverage.md) - Verify coverage
    *   [TEST-PredTests-07-DocumentPatterns](../../Documentation/Plans/TEST-PredTests-07-DocumentPatterns.md) - Document patterns

10. **Epic Overview: Tool Tests Conversion ([TEST-ToolTests](./TEST-ToolTests.md))**
    *   [TEST-TlTests-01-IdentifyPyTests](../../Documentation/Plans/TEST-TlTests-01-IdentifyPyTests.md) - Identify Python Tool tests
    *   [TEST-TlTests-02-AnalyzeStructure](../../Documentation/Plans/TEST-TlTests-02-AnalyzeStructure.md) - Analyze test structure
    *   [TEST-TlTests-03-CreateTSFiles](../../Documentation/Plans/TEST-TlTests-03-CreateTSFiles.md) - Create TS test files
    *   [TEST-TlTests-04-AdaptTests](../../Documentation/Plans/TEST-TlTests-04-AdaptTests.md) - Adapt tests for TS/Effect
    *   [TEST-TlTests-05-CreateMocks](../../Documentation/Plans/TEST-TlTests-05-CreateMocks.md) - Create mocks
    *   [TEST-TlTests-06-VerifyCoverage](../../Documentation/Plans/TEST-TlTests-06-VerifyCoverage.md) - Verify coverage
    *   [TEST-TlTests-07-DocumentPatterns](../../Documentation/Plans/TEST-TlTests-07-DocumentPatterns.md) - Document patterns

### III. Core Primitives Implementation (`CORE-*`)

11. **Epic Overview: Field Implementation ([CORE-FieldImplementation](./CORE-FieldImplementation.md))**
    *   [CORE-FieldImpl-01-TypeDef](../../Documentation/Plans/CORE-FieldImpl-01-TypeDef.md) - Create Field type definition
    *   [CORE-FieldImpl-02-InputOutput](../../Documentation/Plans/CORE-FieldImpl-02-InputOutput.md) - Implement InputField and OutputField
    *   [CORE-FieldImpl-03-ZodIntegration](../../Documentation/Plans/CORE-FieldImpl-03-ZodIntegration.md) - Integrate with Zod
    *   [CORE-FieldImpl-04-EffectIntegration](../../Documentation/Plans/CORE-FieldImpl-04-EffectIntegration.md) - Implement Effect integration
    *   [CORE-FieldImpl-05-Constraints](../../Documentation/Plans/CORE-FieldImpl-05-Constraints.md) - Implement field constraints
    *   [CORE-FieldImpl-06-Utils](../../Documentation/Plans/CORE-FieldImpl-06-Utils.md) - Create utility functions
    *   [CORE-FieldImpl-07-TestCompatibility](../../Documentation/Plans/CORE-FieldImpl-07-TestCompatibility.md) - Ensure test compatibility

12. **Epic Overview: Signature Implementation ([CORE-SignatureImplementation](./CORE-SignatureImplementation.md))**
    *   [CORE-SigImpl-01-ClassDef](../../Documentation/Plans/CORE-SigImpl-01-ClassDef.md) - Create Signature class definition
    *   [CORE-SigImpl-02-FieldMgmt](../../Documentation/Plans/CORE-SigImpl-02-FieldMgmt.md) - Implement field management
    *   [CORE-SigImpl-03-CreationUtils](../../Documentation/Plans/CORE-SigImpl-03-CreationUtils.md) - Create creation utilities
    *   [CORE-SigImpl-04-ZodIntegration](../../Documentation/Plans/CORE-SigImpl-04-ZodIntegration.md) - Integrate with Zod
    *   [CORE-SigImpl-05-EffectIntegration](../../Documentation/Plans/CORE-SigImpl-05-EffectIntegration.md) - Implement Effect integration
    *   [CORE-SigImpl-06-Metadata](../../Documentation/Plans/CORE-SigImpl-06-Metadata.md) - Implement metadata & docs
    *   [CORE-SigImpl-07-TestCompatibility](../../Documentation/Plans/CORE-SigImpl-07-TestCompatibility.md) - Ensure test compatibility

13. **Epic Overview: Example Implementation ([CORE-ExampleImplementation](./CORE-ExampleImplementation.md))**
    *   [CORE-ExImpl-01-ClassDef](../../Documentation/Plans/CORE-ExImpl-01-ClassDef.md) - Create Example class definition
    *   [CORE-ExImpl-02-DataStorage](../../Documentation/Plans/CORE-ExImpl-02-DataStorage.md) - Implement data storage
    *   [CORE-ExImpl-03-ManipulationUtils](../../Documentation/Plans/CORE-ExImpl-03-ManipulationUtils.md) - Create manipulation utilities
    *   [CORE-ExImpl-04-SignatureIntegration](../../Documentation/Plans/CORE-ExImpl-04-SignatureIntegration.md) - Integrate with Signature
    *   [CORE-ExImpl-05-EffectIntegration](../../Documentation/Plans/CORE-ExImpl-05-EffectIntegration.md) - Implement Effect integration
    *   [CORE-ExImpl-06-Serialization](../../Documentation/Plans/CORE-ExImpl-06-Serialization.md) - Implement serialization
    *   [CORE-ExImpl-07-TestCompatibility](../../Documentation/Plans/CORE-ExImpl-07-TestCompatibility.md) - Ensure test compatibility

14. **Epic Overview: Module Implementation ([CORE-ModuleImplementation](./CORE-ModuleImplementation.md))**
    *   [CORE-ModImpl-01-ClassDef](../../Documentation/Plans/CORE-ModImpl-01-ClassDef.md) - Create Module class definition
    *   [CORE-ModImpl-02-ForwardMethod](../../Documentation/Plans/CORE-ModImpl-02-ForwardMethod.md) - Implement `forward` method
    *   [CORE-ModImpl-03-ParamMgmt](../../Documentation/Plans/CORE-ModImpl-03-ParamMgmt.md) - Create parameter management
    *   [CORE-ModImpl-04-Composition](../../Documentation/Plans/CORE-ModImpl-04-Composition.md) - Implement module composition
    *   [CORE-ModImpl-05-EffectIntegration](../../Documentation/Plans/CORE-ModImpl-05-EffectIntegration.md) - Implement Effect integration
    *   [CORE-ModImpl-06-Serialization](../../Documentation/Plans/CORE-ModImpl-06-Serialization.md) - Implement serialization
    *   [CORE-ModImpl-07-TestCompatibility](../../Documentation/Plans/CORE-ModImpl-07-TestCompatibility.md) - Ensure test compatibility

15. **Epic Overview: Prediction Implementation ([CORE-PredictionImplementation](./CORE-PredictionImplementation.md))**
    *   [CORE-PredImpl-01-ClassDefinition](../../Documentation/Plans/CORE-PredImpl-01-ClassDefinition.md) - Prediction Class Definition
    *   [CORE-PredImpl-02-CompletionMgmt](../../Documentation/Plans/CORE-PredImpl-02-CompletionMgmt.md) - Completion Management
    *   [CORE-PredImpl-03-LMUsageTracking](../../Documentation/Plans/CORE-PredImpl-03-LMUsageTracking.md) - LM Usage Tracking
    *   [CORE-PredImpl-04-PredictionManipulation](../../Documentation/Plans/CORE-PredImpl-04-PredictionManipulation.md) - Prediction Manipulation Utilities
    *   [CORE-PredImpl-05-EffectIntegration](../../Documentation/Plans/CORE-PredImpl-05-EffectIntegration.md) - Effect Integration
    *   [CORE-PredImpl-06-Serialization](../../Documentation/Plans/CORE-PredImpl-06-Serialization.md) - Serialization
    *   [CORE-PredImpl-07-TestCompatibility](../../Documentation/Plans/CORE-PredImpl-07-TestCompatibility.md) - Test Compatibility

16. **Epic Overview: Tool Implementation ([CORE-ToolImplementation](./CORE-ToolImplementation.md))**
    *   [CORE-ToolImpl-01-ClassDef](../../Documentation/Plans/CORE-ToolImpl-01-ClassDef.md) - Create Tool class definition
    *   [CORE-ToolImpl-02-Execution](../../Documentation/Plans/CORE-ToolImpl-02-Execution.md) - Implement tool execution
    *   [CORE-ToolImpl-03-ArgParsing](../../Documentation/Plans/CORE-ToolImpl-03-ArgParsing.md) - Implement argument parsing
    *   [CORE-ToolImpl-04-ErrorHandling](../../Documentation/Plans/CORE-ToolImpl-04-ErrorHandling.md) - Implement error handling
    *   [CORE-ToolImpl-05-EffectIntegration](../../Documentation/Plans/CORE-ToolImpl-05-EffectIntegration.md) - Deepen Effect integration
    *   [CORE-ToolImpl-06-Serialization](../../Documentation/Plans/CORE-ToolImpl-06-Serialization.md) - Implement serialization
    *   [CORE-ToolImpl-07-TestCompatibility](../../Documentation/Plans/CORE-ToolImpl-07-TestCompatibility.md) - Ensure test compatibility

### IV. Reference Documents

17. **Reference: DSPy Dependency Graph and Implementation Order ([DEPENDENCY-Graph](./DEPENDENCY-Graph.md))** (Serves as a reference, not an epic with tasks)

### V. Extended Component Tests (`TEST-*`)

This section outlines epics for converting tests for additional DSPy components and utilities.

18. **Epic Overview: Chat Adapter Tests Conversion ([TEST-AdaptersChatTests](./TEST-AdaptersChatTests.md))**
    *   Granular plans: `TEST-AdChat-XX-*.md`
19. **Epic Overview: JSON Adapter Tests Conversion ([TEST-AdaptersJsonTests](./TEST-AdaptersJsonTests.md))**
    *   Granular plans: `TEST-AdJson-XX-*.md`
20. **Epic Overview: TwoStep Adapter Tests Conversion ([TEST-AdaptersTwoStepTests](./TEST-AdaptersTwoStepTests.md))**
    *   Granular plans: `TEST-AdTwoStp-XX-*.md`
21. **Epic Overview: LiteLLM Caching Tests Conversion ([TEST-CachingLitellmTests](./TEST-CachingLitellmTests.md))**
    *   Granular plans: `TEST-CacheLite-XX-*.md`
22. **Epic Overview: Callback System Tests Conversion ([TEST-CallbackTests](./TEST-CallbackTests.md))**
    *   Granular plans: `TEST-Callback-XX-*.md`
23. **Epic Overview: dspy.cache Tests Conversion ([TEST-ClientsCacheTests](./TEST-ClientsCacheTests.md))**
    *   Granular plans: `TEST-CliCache-XX-*.md`
24. **Epic Overview: Databricks Client Tests Conversion ([TEST-ClientsDatabricksTests](./TEST-ClientsDatabricksTests.md))**
    *   Granular plans: `TEST-CliDBX-XX-*.md`
25. **Epic Overview: Embedding Client Tests Conversion ([TEST-ClientsEmbeddingTests](./TEST-ClientsEmbeddingTests.md))**
    *   Granular plans: `TEST-CliEmb-XX-*.md`
26. **Epic Overview: Inspect History Tests Conversion ([TEST-ClientsInspectHistoryTests](./TEST-ClientsInspectHistoryTests.md))**
    *   Granular plans: `TEST-CliInspH-XX-*.md`
27. **Epic Overview: LM Client Tests Conversion ([TEST-ClientsLmTests](./TEST-ClientsLmTests.md))**
    *   Granular plans: `TEST-CliLM-XX-*.md`
28. **Epic Overview: Dataset Utilities Tests Conversion ([TEST-DatasetsTests](./TEST-DatasetsTests.md))**
    *   Granular plans: `TEST-Dataset-XX-*.md`
29. **Epic Overview: Evaluate Tests Conversion ([TEST-EvaluateEvaluateTests](./TEST-EvaluateEvaluateTests.md))**
    *   Granular plans: `TEST-EvalEval-XX-*.md`
30. **Epic Overview: Evaluation Metrics Tests Conversion ([TEST-EvaluateMetricsTests](./TEST-EvaluateMetricsTests.md))**
    *   Granular plans: `TEST-EvalMetr-XX-*.md`
31. **Epic Overview: Predict Aggregation Tests Conversion ([TEST-PredictAggregationTests](./TEST-PredictAggregationTests.md))**
    *   Granular plans: `TEST-PredAgg-XX-*.md`
32. **Epic Overview: BestOfN Module Tests Conversion ([TEST-PredictBestOfNTests](./TEST-PredictBestOfNTests.md))**
    *   Granular plans: `TEST-PredBoN-XX-*.md`
33. **Epic Overview: ChainOfThoughtWithHint Tests Conversion ([TEST-PredictCoTWithHintTests](./TEST-PredictCoTWithHintTests.md))**
    *   Granular plans: `TEST-PredCoTH-XX-*.md`
34. **Epic Overview: ChainOfThought Module Tests Conversion ([TEST-PredictCoTTests](./TEST-PredictCoTTests.md))**
    *   Granular plans: `TEST-PredCoT-XX-*.md`
35. **Epic Overview: KNN Predictor Tests Conversion ([TEST-PredictKNNTests](./TEST-PredictKNNTests.md))**
    *   Granular plans: `TEST-PredKNN-XX-*.md`
36. **Epic Overview: MultiChainComparison Module Tests Conversion ([TEST-PredictMultiChainComparisonTests](./TEST-PredictMultiChainComparisonTests.md))**
    *   Granular plans: `TEST-PredMCC-XX-*.md`
37. **Epic Overview: Parallel Execution Tests Conversion ([TEST-PredictParallelTests](./TEST-PredictParallelTests.md))**
    *   Granular plans: `TEST-PredPara-XX-*.md`
38. **Epic Overview: ProgramOfThought Module Tests Conversion ([TEST-PredictProgramOfThoughtTests](./TEST-PredictProgramOfThoughtTests.md))**
    *   Granular plans: `TEST-PredPoT-XX-*.md`
39. **Epic Overview: ReAct Module Tests Conversion ([TEST-PredictReActTests](./TEST-PredictReActTests.md))**
    *   Granular plans: `TEST-PredReAct-XX-*.md`
40. **Epic Overview: Refine Module Tests Conversion ([TEST-PredictRefineTests](./TEST-PredictRefineTests.md))**
    *   Granular plans: `TEST-PredRefine-XX-*.md`
41. **Epic Overview: PythonInterpreter Tool Tests Conversion ([TEST-PrimitivesPythonInterpreterTests](./TEST-PrimitivesPythonInterpreterTests.md))**
    *   Granular plans: `TEST-PrimPyInt-XX-*.md`
42. **Epic Overview: LlamaIndexRM Tests Conversion ([TEST-RetrieveLlamaIndexRMTests](./TEST-RetrieveLlamaIndexRMTests.md))**
    *   Granular plans: `TEST-RetLI-XX-*.md`
43. **Epic Overview: Embeddings Retriever Tests Conversion ([TEST-RetrieversEmbeddingsTests](./TEST-RetrieversEmbeddingsTests.md))**
    *   Granular plans: `TEST-RetEmb-XX-*.md`
44. **Epic Overview: Streaming Functionality Tests Conversion ([TEST-StreamingTests](./TEST-StreamingTests.md))**
    *   Granular plans: `TEST-Stream-XX-*.md`
45. **Epic Overview: BootstrapFewShot Optimizer Tests Conversion ([TEST-TelepromptBootstrapTests](./TEST-TelepromptBootstrapTests.md))**
    *   Granular plans: `TEST-TpBoot-XX-*.md`
46. **Epic Overview: COPRO Optimizer Tests Conversion ([TEST-TelepromptCoproTests](./TEST-TelepromptCoproTests.md))**
    *   Granular plans: `TEST-TpCopro-XX-*.md`
47. **Epic Overview: Ensemble Optimizer Tests Conversion ([TEST-TelepromptEnsembleTests](./TEST-TelepromptEnsembleTests.md))**
    *   Granular plans: `TEST-TpEns-XX-*.md`
48. **Epic Overview: KNNFewShot Optimizer Tests Conversion ([TEST-TelepromptKNNFewShotTests](./TEST-TelepromptKNNFewShotTests.md))**
    *   Granular plans: `TEST-TpKNNFs-XX-*.md`
49. **Epic Overview: BootstrapFewShotWithRandomSearch Optimizer Tests Conversion ([TEST-TelepromptRandomSearchTests](./TEST-TelepromptRandomSearchTests.md))**
    *   Granular plans: `TEST-TpRandS-XX-*.md`
50. **Epic Overview: Asyncify Utility Tests Conversion ([TEST-UtilsAsyncifyTests](./TEST-UtilsAsyncifyTests.md))**
    *   Granular plans: `TEST-UtilAsync-XX-*.md`
51. **Epic Overview: Custom Exceptions Tests Conversion ([TEST-UtilsExceptionsTests](./TEST-UtilsExceptionsTests.md))**
    *   Granular plans: `TEST-UtilExc-XX-*.md`
52. **Epic Overview: MCP Utility Tests Conversion ([TEST-UtilsMCPTests](./TEST-UtilsMCPTests.md))**
    *   Granular plans: `TEST-UtilMCP-XX-*.md`
53. **Epic Overview: Parallelizer Utility Tests Conversion ([TEST-UtilsParallelizerTests](./TEST-UtilsParallelizerTests.md))**
    *   Granular plans: `TEST-UtilPara-XX-*.md`
54. **Epic Overview: Saving/Loading Utilities Tests Conversion ([TEST-UtilsSavingTests](./TEST-UtilsSavingTests.md))**
    *   Granular plans: `TEST-UtilSave-XX-*.md`
55. **Epic Overview: Unbatchify Utility Tests Conversion ([TEST-UtilsUnbatchifyTests](./TEST-UtilsUnbatchifyTests.md))**
    *   Granular plans: `TEST-UtilUnbatch-XX-*.md`
56. **Epic Overview: UsageTracker Utility Tests Conversion ([TEST-UtilsUsageTrackerTests](./TEST-UtilsUsageTrackerTests.md))**
    *   [TEST-UtilUsage-01-IdentifyPyTests](../../Documentation/Plans/TEST-UtilUsage-01-IdentifyPyTests.md)
    *   [TEST-UtilUsage-02-AnalyzeStructure](../../Documentation/Plans/TEST-UtilUsage-02-AnalyzeStructure.md)
    *   [TEST-UtilUsage-03-CreateTSFiles](../../Documentation/Plans/TEST-UtilUsage-03-CreateTSFiles.md)
    *   [TEST-UtilUsage-04-AdaptTests](../../Documentation/Plans/TEST-UtilUsage-04-AdaptTests.md)
    *   [TEST-UtilUsage-05-CreateMocks](../../Documentation/Plans/TEST-UtilUsage-05-CreateMocks.md)
    *   [TEST-UtilUsage-06-VerifyCoverage](../../Documentation/Plans/TEST-UtilUsage-06-VerifyCoverage.md)
    *   [TEST-UtilUsage-07-DocumentPatterns](../../Documentation/Plans/TEST-UtilUsage-07-DocumentPatterns.md)

57. **Epic Overview: MkDocs Links Tests Conversion ([TEST-DocsMkdocsLinksTests](./TEST-DocsMkdocsLinksTests.md))**
    *   [TEST-DocsMkLnk-01-IdentifyPyTests](../../Documentation/Plans/TEST-DocsMkLnk-01-IdentifyPyTests.md)
    *   [TEST-DocsMkLnk-02-AnalyzeStructure](../../Documentation/Plans/TEST-DocsMkLnk-02-AnalyzeStructure.md)
    *   [TEST-DocsMkLnk-03-CreateTSFiles](../../Documentation/Plans/TEST-DocsMkLnk-03-CreateTSFiles.md)
    *   [TEST-DocsMkLnk-04-AdaptTests](../../Documentation/Plans/TEST-DocsMkLnk-04-AdaptTests.md)
    *   [TEST-DocsMkLnk-05-CreateMocks](../../Documentation/Plans/TEST-DocsMkLnk-05-CreateMocks.md)
    *   [TEST-DocsMkLnk-06-VerifyCoverage](../../Documentation/Plans/TEST-DocsMkLnk-06-VerifyCoverage.md)
    *   [TEST-DocsMkLnk-07-DocumentPatterns](../../Documentation/Plans/TEST-DocsMkLnk-07-DocumentPatterns.md)

58. **Epic Overview: Baleen Example Tests Conversion ([TEST-ExamplesBaleenTests](./TEST-ExamplesBaleenTests.md))**
    *   [TEST-ExBaleen-01-IdentifyPyTests](../../Documentation/Plans/TEST-ExBaleen-01-IdentifyPyTests.md)
    *   [TEST-ExBaleen-02-AnalyzeStructure](../../Documentation/Plans/TEST-ExBaleen-02-AnalyzeStructure.md)
    *   [TEST-ExBaleen-03-CreateTSFiles](../../Documentation/Plans/TEST-ExBaleen-03-CreateTSFiles.md)
    *   [TEST-ExBaleen-04-AdaptTests](../../Documentation/Plans/TEST-ExBaleen-04-AdaptTests.md)
    *   [TEST-ExBaleen-05-CreateMocks](../../Documentation/Plans/TEST-ExBaleen-05-CreateMocks.md)
    *   [TEST-ExBaleen-06-VerifyCoverage](../../Documentation/Plans/TEST-ExBaleen-06-VerifyCoverage.md)
    *   [TEST-ExBaleen-07-DocumentPatterns](../../Documentation/Plans/TEST-ExBaleen-07-DocumentPatterns.md)

59. **Epic Overview: Package Metadata Tests Conversion ([TEST-MetadataTests](./TEST-MetadataTests.md))**
    *   [TEST-Meta-01-IdentifyPyTests](../../Documentation/Plans/TEST-Meta-01-IdentifyPyTests.md)
    *   [TEST-Meta-02-AnalyzeStructure](../../Documentation/Plans/TEST-Meta-02-AnalyzeStructure.md)
    *   [TEST-Meta-03-CreateTSFiles](../../Documentation/Plans/TEST-Meta-03-CreateTSFiles.md)
    *   [TEST-Meta-04-AdaptTests](../../Documentation/Plans/TEST-Meta-04-AdaptTests.md)
    *   [TEST-Meta-05-CreateMocks](../../Documentation/Plans/TEST-Meta-05-CreateMocks.md)
    *   [TEST-Meta-06-VerifyCoverage](../../Documentation/Plans/TEST-Meta-06-VerifyCoverage.md)
    *   [TEST-Meta-07-DocumentPatterns](../../Documentation/Plans/TEST-Meta-07-DocumentPatterns.md)

60. **Epic Overview: Predict Module Tests Conversion ([TEST-PredictModuleTests](./TEST-PredictModuleTests.md))** (Distinct from Prediction object tests)
    *   [TEST-PredMod-01-IdentifyPyTests](../../Documentation/Plans/TEST-PredMod-01-IdentifyPyTests.md)
    *   [TEST-PredMod-02-AnalyzeStructure](../../Documentation/Plans/TEST-PredMod-02-AnalyzeStructure.md)
    *   [TEST-PredMod-03-CreateTSFiles](../../Documentation/Plans/TEST-PredMod-03-CreateTSFiles.md)
    *   [TEST-PredMod-04-AdaptTests](../../Documentation/Plans/TEST-PredMod-04-AdaptTests.md)
    *   [TEST-PredMod-05-CreateMocks](../../Documentation/Plans/TEST-PredMod-05-CreateMocks.md)
    *   [TEST-PredMod-06-VerifyCoverage](../../Documentation/Plans/TEST-PredMod-06-VerifyCoverage.md)
    *   [TEST-PredMod-07-DocumentPatterns](../../Documentation/Plans/TEST-PredMod-07-DocumentPatterns.md)

61. **Epic Overview: Predict Retry Logic Tests Conversion ([TEST-PredictRetryTests](./TEST-PredictRetryTests.md))**
    *   [TEST-PredRetry-01-IdentifyPyTests](../../Documentation/Plans/TEST-PredRetry-01-IdentifyPyTests.md)
    *   [TEST-PredRetry-02-AnalyzeStructure](../../Documentation/Plans/TEST-PredRetry-02-AnalyzeStructure.md)
    *   [TEST-PredRetry-03-CreateTSFiles](../../Documentation/Plans/TEST-PredRetry-03-CreateTSFiles.md)
    *   [TEST-PredRetry-04-AdaptTests](../../Documentation/Plans/TEST-PredRetry-04-AdaptTests.md)
    *   [TEST-PredRetry-05-CreateMocks](../../Documentation/Plans/TEST-PredRetry-05-CreateMocks.md)
    *   [TEST-PredRetry-06-VerifyCoverage](../../Documentation/Plans/TEST-PredRetry-06-VerifyCoverage.md)
    *   [TEST-PredRetry-07-DocumentPatterns](../../Documentation/Plans/TEST-PredRetry-07-DocumentPatterns.md)

62. **Epic Overview: GroundedProposer Optimizer Tests Conversion ([TEST-ProposeGroundedProposerTests](./TEST-ProposeGroundedProposerTests.md))**
    *   [TEST-PropGndP-01-IdentifyPyTests](../../Documentation/Plans/TEST-PropGndP-01-IdentifyPyTests.md)
    *   [TEST-PropGndP-02-AnalyzeStructure](../../Documentation/Plans/TEST-PropGndP-02-AnalyzeStructure.md)
    *   [TEST-PropGndP-03-CreateTSFiles](../../Documentation/Plans/TEST-PropGndP-03-CreateTSFiles.md)
    *   [TEST-PropGndP-04-AdaptTests](../../Documentation/Plans/TEST-PropGndP-04-AdaptTests.md)
    *   [TEST-PropGndP-05-CreateMocks](../../Documentation/Plans/TEST-PropGndP-05-CreateMocks.md)
    *   [TEST-PropGndP-06-VerifyCoverage](../../Documentation/Plans/TEST-PropGndP-06-VerifyCoverage.md)
    *   [TEST-PropGndP-07-DocumentPatterns](../../Documentation/Plans/TEST-PropGndP-07-DocumentPatterns.md)

63. **Epic Overview: Reliability Generated Tests Conversion ([TEST-ReliabilityGeneratedTests](./TEST-ReliabilityGeneratedTests.md))**
    *   [TEST-RelGen-01-IdentifyPyTests](../../Documentation/Plans/TEST-RelGen-01-IdentifyPyTests.md)
    *   [TEST-RelGen-02-AnalyzeStructure](../../Documentation/Plans/TEST-RelGen-02-AnalyzeStructure.md)
    *   [TEST-RelGen-03-CreateTSFiles](../../Documentation/Plans/TEST-RelGen-03-CreateTSFiles.md)
    *   [TEST-RelGen-04-AdaptTests](../../Documentation/Plans/TEST-RelGen-04-AdaptTests.md)
    *   [TEST-RelGen-05-CreateMocks](../../Documentation/Plans/TEST-RelGen-05-CreateMocks.md)
    *   [TEST-RelGen-06-VerifyCoverage](../../Documentation/Plans/TEST-RelGen-06-VerifyCoverage.md)
    *   [TEST-RelGen-07-DocumentPatterns](../../Documentation/Plans/TEST-RelGen-07-DocumentPatterns.md)

64. **Epic Overview: Reliability Pydantic Models Tests Conversion ([TEST-ReliabilityPydanticModelsTests](./TEST-ReliabilityPydanticModelsTests.md))**
    *   [TEST-RelPydMod-01-IdentifyPyTests](../../Documentation/Plans/TEST-RelPydMod-01-IdentifyPyTests.md)
    *   [TEST-RelPydMod-02-AnalyzeStructure](../../Documentation/Plans/TEST-RelPydMod-02-AnalyzeStructure.md)
    *   [TEST-RelPydMod-03-CreateTSFiles](../../Documentation/Plans/TEST-RelPydMod-03-CreateTSFiles.md)
    *   [TEST-RelPydMod-04-AdaptTests](../../Documentation/Plans/TEST-RelPydMod-04-AdaptTests.md)
    *   [TEST-RelPydMod-05-CreateMocks](../../Documentation/Plans/TEST-RelPydMod-05-CreateMocks.md)
    *   [TEST-RelPydMod-06-VerifyCoverage](../../Documentation/Plans/TEST-RelPydMod-06-VerifyCoverage.md)
    *   [TEST-RelPydMod-07-DocumentPatterns](../../Documentation/Plans/TEST-RelPydMod-07-DocumentPatterns.md)

65. **Epic Overview: PgVectorRM Integration Tests Conversion ([TEST-RetrievePgvectorRMIntegrationTests](./TEST-RetrievePgvectorRMIntegrationTests.md))**
    *   [TEST-RetPgVecI-01-IdentifyPyTests](../../Documentation/Plans/TEST-RetPgVecI-01-IdentifyPyTests.md)
    *   [TEST-RetPgVecI-02-AnalyzeStructure](../../Documentation/Plans/TEST-RetPgVecI-02-AnalyzeStructure.md)
    *   [TEST-RetPgVecI-03-CreateTSFiles](../../Documentation/Plans/TEST-RetPgVecI-03-CreateTSFiles.md)
    *   [TEST-RetPgVecI-04-AdaptTests](../../Documentation/Plans/TEST-RetPgVecI-04-AdaptTests.md)
    *   [TEST-RetPgVecI-05-CreateMocks](../../Documentation/Plans/TEST-RetPgVecI-05-CreateMocks.md)
    *   [TEST-RetPgVecI-06-VerifyCoverage](../../Documentation/Plans/TEST-RetPgVecI-06-VerifyCoverage.md)
    *   [TEST-RetPgVecI-07-DocumentPatterns](../../Documentation/Plans/TEST-RetPgVecI-07-DocumentPatterns.md)

66. **Epic Overview: Signature Adapter Image Handling Tests Conversion ([TEST-SignaturesAdapterImageTests](./TEST-SignaturesAdapterImageTests.md))**
    *   [TEST-SigAdImg-01-IdentifyPyTests](../../Documentation/Plans/TEST-SigAdImg-01-IdentifyPyTests.md)
    *   [TEST-SigAdImg-02-AnalyzeStructure](../../Documentation/Plans/TEST-SigAdImg-02-AnalyzeStructure.md)
    *   [TEST-SigAdImg-03-CreateTSFiles](../../Documentation/Plans/TEST-SigAdImg-03-CreateTSFiles.md)
    *   [TEST-SigAdImg-04-AdaptTests](../../Documentation/Plans/TEST-SigAdImg-04-AdaptTests.md)
    *   [TEST-SigAdImg-05-CreateMocks](../../Documentation/Plans/TEST-SigAdImg-05-CreateMocks.md)
    *   [TEST-SigAdImg-06-VerifyCoverage](../../Documentation/Plans/TEST-SigAdImg-06-VerifyCoverage.md)
    *   [TEST-SigAdImg-07-DocumentPatterns](../../Documentation/Plans/TEST-SigAdImg-07-DocumentPatterns.md)

67. **Epic Overview: Signature Custom Types Tests Conversion ([TEST-SignaturesCustomTypesTests](./TEST-SignaturesCustomTypesTests.md))**
    *   [TEST-SigCustTy-01-IdentifyPyTests](../../Documentation/Plans/TEST-SigCustTy-01-IdentifyPyTests.md)
    *   [TEST-SigCustTy-02-AnalyzeStructure](../../Documentation/Plans/TEST-SigCustTy-02-AnalyzeStructure.md)
    *   [TEST-SigCustTy-03-CreateTSFiles](../../Documentation/Plans/TEST-SigCustTy-03-CreateTSFiles.md)
    *   [TEST-SigCustTy-04-AdaptTests](../../Documentation/Plans/TEST-SigCustTy-04-AdaptTests.md)
    *   [TEST-SigCustTy-05-CreateMocks](../../Documentation/Plans/TEST-SigCustTy-05-CreateMocks.md)
    *   [TEST-SigCustTy-06-VerifyCoverage](../../Documentation/Plans/TEST-SigCustTy-06-VerifyCoverage.md)
    *   [TEST-SigCustTy-07-DocumentPatterns](../../Documentation/Plans/TEST-SigCustTy-07-DocumentPatterns.md)

68. **Epic Overview: BootstrapFinetune Optimizer Tests Conversion ([TEST-TelepromptFinetuneTests](./TEST-TelepromptFinetuneTests.md))**
    *   [TEST-TpFinetune-01-IdentifyPyTests](../../Documentation/Plans/TEST-TpFinetune-01-IdentifyPyTests.md)
    *   [TEST-TpFinetune-02-AnalyzeStructure](../../Documentation/Plans/TEST-TpFinetune-02-AnalyzeStructure.md)
    *   [TEST-TpFinetune-03-CreateTSFiles](../../Documentation/Plans/TEST-TpFinetune-03-CreateTSFiles.md)
    *   [TEST-TpFinetune-04-AdaptTests](../../Documentation/Plans/TEST-TpFinetune-04-AdaptTests.md)
    *   [TEST-TpFinetune-05-CreateMocks](../../Documentation/Plans/TEST-TpFinetune-05-CreateMocks.md)
    *   [TEST-TpFinetune-06-VerifyCoverage](../../Documentation/Plans/TEST-TpFinetune-06-VerifyCoverage.md)
    *   [TEST-TpFinetune-07-DocumentPatterns](../../Documentation/Plans/TEST-TpFinetune-07-DocumentPatterns.md)

69. **Epic Overview: GRPO Optimizer Tests Conversion ([TEST-TelepromptGRPOTests](./TEST-TelepromptGRPOTests.md))**
    *   [TEST-TpGRPO-01-IdentifyPyTests](../../Documentation/Plans/TEST-TpGRPO-01-IdentifyPyTests.md)
    *   [TEST-TpGRPO-02-AnalyzeStructure](../../Documentation/Plans/TEST-TpGRPO-02-AnalyzeStructure.md)
    *   [TEST-TpGRPO-03-CreateTSFiles](../../Documentation/Plans/TEST-TpGRPO-03-CreateTSFiles.md)
    *   [TEST-TpGRPO-04-AdaptTests](../../Documentation/Plans/TEST-TpGRPO-04-AdaptTests.md)
    *   [TEST-TpGRPO-05-CreateMocks](../../Documentation/Plans/TEST-TpGRPO-05-CreateMocks.md)
    *   [TEST-TpGRPO-06-VerifyCoverage](../../Documentation/Plans/TEST-TpGRPO-06-VerifyCoverage.md)
    *   [TEST-TpGRPO-07-DocumentPatterns](../../Documentation/Plans/TEST-TpGRPO-07-DocumentPatterns.md)

70. **Epic Overview: Base Teleprompter Tests Conversion ([TEST-TelepromptBaseTests](./TEST-TelepromptBaseTests.md))**
    *   [TEST-TpBase-01-IdentifyPyTests](../../Documentation/Plans/TEST-TpBase-01-IdentifyPyTests.md)
    *   [TEST-TpBase-02-AnalyzeStructure](../../Documentation/Plans/TEST-TpBase-02-AnalyzeStructure.md)
    *   [TEST-TpBase-03-CreateTSFiles](../../Documentation/Plans/TEST-TpBase-03-CreateTSFiles.md)
    *   [TEST-TpBase-04-AdaptTests](../../Documentation/Plans/TEST-TpBase-04-AdaptTests.md)
    *   [TEST-TpBase-05-CreateMocks](../../Documentation/Plans/TEST-TpBase-05-CreateMocks.md)
    *   [TEST-TpBase-06-VerifyCoverage](../../Documentation/Plans/TEST-TpBase-06-VerifyCoverage.md)
    *   [TEST-TpBase-07-DocumentPatterns](../../Documentation/Plans/TEST-TpBase-07-DocumentPatterns.md)

71. **Epic Overview: Teleprompt Utils Tests Conversion ([TEST-TelepromptUtilsTests](./TEST-TelepromptUtilsTests.md))**
    *   [TEST-TpUtils-01-IdentifyPyTests](../../Documentation/Plans/TEST-TpUtils-01-IdentifyPyTests.md)
    *   [TEST-TpUtils-02-AnalyzeStructure](../../Documentation/Plans/TEST-TpUtils-02-AnalyzeStructure.md)
    *   [TEST-TpUtils-03-CreateTSFiles](../../Documentation/Plans/TEST-TpUtils-03-CreateTSFiles.md)
    *   [TEST-TpUtils-04-AdaptTests](../../Documentation/Plans/TEST-TpUtils-04-AdaptTests.md)
    *   [TEST-TpUtils-05-CreateMocks](../../Documentation/Plans/TEST-TpUtils-05-CreateMocks.md)
    *   [TEST-TpUtils-06-VerifyCoverage](../../Documentation/Plans/TEST-TpUtils-06-VerifyCoverage.md)
    *   [TEST-TpUtils-07-DocumentPatterns](../../Documentation/Plans/TEST-TpUtils-07-DocumentPatterns.md)

---
*(Workplans for other components like specific LM Clients, other Prediction Modules, Retrieval models, and Optimizers will be added here as they are refactored or created.)*

Each granular workplan will follow the structure defined in `docs/planning/templates/Workplan.md` and be stored in `Documentation/Plans/`.

*   **Specificity of "Python DSPy API Compatibility"**: Work plans aiming for compatibility should reference the "API and Behavior Mapping Document" (see `docs/planning/FollowUps.md`). Compatibility should be defined in terms of conceptual and behavioral equivalence, with specific TypeScript API signatures documented in the mapping document, rather than assuming direct 1:1 signature matches.
*   **Resolution Path for "Blocking Questions"**: Each workplan should list its blocking questions. The Project Overview (`docs/planning/ProjectOverview.md`) will define a general process for escalating and resolving these (e.g., research spikes, ADRs). Work plan status should track the resolution of its blocking questions.
*   **Consistent Application of Cross-Cutting Concerns**: Work plans for CORE/PRED/OPT components should reference and adhere to patterns established in dedicated ADRs or early `INFRA-*` work plans for logging, configuration management, global settings (`dspy.settings`), and advanced Effect TS patterns (DI via Layers, error hierarchies).
*   **Integration of Test Conversion Guidelines**: Each `TEST-*` workplan should include a sub-task to adapt the `TEST-ConversionTemplate.md` for its specific component, documenting any unique challenges and solutions encountered during test conversion.
*   **Feedback Loop Between Early and Later Work Plans**: The project will incorporate a periodic review mechanism (e.g., at the end of each phase, as mentioned in the Project Overview) to update subsequent work plans based on lessons learned from completed implementations. This ensures that estimates and approaches for later work plans remain realistic and informed by practical experience.

Each granular workplan will follow the structure defined in `docs/planning/templates/Workplan.md` and be stored in `Documentation/Plans/`.