export const sendChatMessage = async (message, history) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        response: "I have analyzed your profile. Based on your inputs, you are highly eligible for the PM-KISAN scheme. I can guide you through the application process if you'd like.",
        intent: "scheme_search"
      });
    }, 1500); // Simulate AI Orchestrator response time
  });
};
