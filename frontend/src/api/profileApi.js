// Abstracted API functions for Profile
export const fetchProfile = async () => {
  // Mocked for frontend implementation without backend connectivity
  return new Promise((resolve) => setTimeout(() => resolve({
    name: 'Ramesh Kumar',
    age: 45,
    state: 'Kerala',
    district: 'Palakkad',
    occupation: 'Farmer',
    education: 'Secondary',
    income: { annualIncome: 50000, currency: 'INR' },
    familyDetails: { totalMembers: 4, members: [] },
    preferredLanguage: 'ml',
    requirements: ['Financial support for crops', 'Healthcare for family'],
    isProfileComplete: true,
  }), 1000));
};

export const updateProfile = async (data) => {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true, data }), 1000));
};
