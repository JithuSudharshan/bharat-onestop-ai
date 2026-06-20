const { generateContent } = require('../../geminiClient');
const CitizenUnderstandingAgent = require('../CitizenUnderstandingAgent');
const SchemeRecommendationAgent = require('../SchemeRecommendationAgent');
const documentAgent = require('../documentAgent'); // The one we built for extraction

/**
 * Step 1: AI Planner
 * Decides which agents to use based on the user's message.
 */
const planExecution = async (message) => {
  const prompt = `
[TASK]
You are the master AI Orchestrator for Bharat OneStop Citizen Copilot.
Analyze the user's query and decide the execution plan.

[AVAILABLE AGENTS]
- CITIZEN_AGENT: Use this to analyze the citizen's profile and detect hidden needs.
- SCHEME_AGENT: Use this to search the RAG database and recommend specific government schemes.
- DOCUMENT_AGENT: Use this if the user is asking about extracting data from an uploaded document.
- ELIGIBILITY_AGENT: Use this if the user explicitly asks "Am I eligible for X scheme?"

[USER MESSAGE]
"${message}"

[RESPONSE FORMAT STRICT JSON]
{
  "intent": "String representing intent (e.g. 'scheme_search', 'document_extraction', 'general_inquiry')",
  "agentsUsed": ["Array of agent names from the available list in execution order"],
  "finalResponse": "If no agents are needed, provide a helpful conversational response here. Otherwise, leave empty.",
  "confidence": "Number between 0 and 1"
}
`;

  const responseText = await generateContent(prompt);
  let cleaned = responseText.trim();
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (jsonMatch) cleaned = jsonMatch[1].trim();

  return JSON.parse(cleaned);
};

/**
 * Step 3: AI Synthesizer
 * Combines the output of the executed agents into a cohesive final response.
 */
const synthesizeResponse = async (message, plan, agentResults) => {
  const prompt = `
[TASK]
You are the master AI Orchestrator for Bharat OneStop Citizen Copilot.
You executed a plan to help the user. Now you must synthesize the results from the agents into a single, cohesive, highly professional response.

[USER MESSAGE]
"${message}"

[EXECUTION PLAN]
Intent: ${plan.intent}
Agents Used: ${plan.agentsUsed.join(', ')}

[AGENT RESULTS]
${JSON.stringify(agentResults, null, 2)}

[RESPONSE FORMAT STRICT JSON]
{
  "intent": "${plan.intent}",
  "agentsUsed": ${JSON.stringify(plan.agentsUsed)},
  "finalResponse": "Your final conversational response synthesizing the agent data. Use markdown formatting for readability.",
  "confidence": "${plan.confidence}"
}
`;

  const responseText = await generateContent(prompt);
  let cleaned = responseText.trim();
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (jsonMatch) cleaned = jsonMatch[1].trim();

  return JSON.parse(cleaned);
};

/**
 * Step 2: Executor
 * Runs the agents decided by the Planner.
 */
const coordinate = async (profile, message) => {
  try {
    // 1. Get Execution Plan
    const plan = await planExecution(message);

    // If AI decided no agents are needed (e.g. general chat)
    if (!plan.agentsUsed || plan.agentsUsed.length === 0) {
      return {
        intent: plan.intent || 'general_chat',
        agentsUsed: [],
        finalResponse: plan.finalResponse || "How can I assist you today?",
        confidence: plan.confidence || "0.99"
      };
    }

    // 2. Execute Agents sequentially
    const agentResults = {};
    for (const agentName of plan.agentsUsed) {
      try {
        if (agentName === 'CITIZEN_AGENT') {
          agentResults[agentName] = await CitizenUnderstandingAgent.analyze(profile);
        } else if (agentName === 'SCHEME_AGENT' || agentName === 'ELIGIBILITY_AGENT') {
          // SchemeRecommendationAgent internally handles both retrieval and eligibility
          agentResults[agentName] = await SchemeRecommendationAgent.recommend(profile);
        } else if (agentName === 'DOCUMENT_AGENT') {
          // Document Agent is usually triggered via upload, so for text we return a standard message
          agentResults[agentName] = { notice: "Please upload a document to use the Document Agent." };
        }
      } catch (err) {
        console.error(`[AgentCoordinator] Agent ${agentName} failed:`, err.message);
        agentResults[agentName] = { error: "Agent execution failed or no data available." };
      }
    }

    // 3. Synthesize the final response
    const finalResult = await synthesizeResponse(message, plan, agentResults);
    return finalResult;

  } catch (error) {
    console.error('[AgentCoordinator] Orchestration failed:', error);
    throw new Error('Failed to orchestrate AI agents.');
  }
};

module.exports = {
  coordinate,
};
