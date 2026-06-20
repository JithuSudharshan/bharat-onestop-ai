// Abstracted API functions for Schemes
export const fetchRecommendedSchemes = async () => {
  return new Promise((resolve) => setTimeout(() => resolve([
    {
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      matchScore: "95%",
      category: "Agriculture & Finance",
      reasoning: "Ramesh is an owner-cultivator farmer seeking financial support for crops. PM-KISAN provides direct income support to landholding farmer families.",
      benefits: [
        "₹6,000 per year income support",
        "Direct bank transfer in 3 equal installments"
      ],
      requiredDocuments: [
        "Aadhaar Card",
        "Land ownership documents",
        "Bank account details"
      ],
      evidence: [
        {
          source: "[SOURCE_ID: 1]",
          document: "agriculture_schemes.json",
          section: "eligibility",
          relevantText: "The scheme provides support to all landholding farmers..."
        }
      ]
    },
    {
      name: "Kisan Credit Card (KCC)",
      matchScore: "90%",
      category: "Agriculture Credit",
      reasoning: "As a farmer requiring financial support for crops, you are highly eligible for KCC which offers timely credit at subsidized rates.",
      benefits: [
        "Credit facility for agricultural expenses",
        "Interest subvention of 2%"
      ],
      requiredDocuments: [
        "Aadhaar Card",
        "Land ownership records"
      ],
      evidence: []
    }
  ]), 1500));
};
