const API_BASE = 'http://127.0.0.1:5001/api';

const runDemo = async () => {
  console.log('🚀 Starting Bharat OneStop AI Backend Demo...\n');
  
  try {
    // 1. Register a test user
    console.log('1️⃣ Registering a test user...');
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'Password@123';
    
    await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ramesh Kumar',
        email,
        password,
        role: 'citizen'
      })
    });
    
    // 2. Login to get token
    console.log('2️⃣ Logging in to get JWT token...');
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    const token = loginData.data.accessToken;
    const authHeaders = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // 3. Create a Citizen Profile
    console.log('3️⃣ Creating Citizen Profile (Farmer in Kerala)...');
    const profileRes = await fetch(`${API_BASE}/profile`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        name: 'Ramesh Kumar',
        age: 45,
        state: 'Kerala',
        district: 'Palakkad',
        preferredLanguage: 'ml',
        occupation: 'Farmer',
        education: 'secondary',
        requirements: ['Financial support for crops', 'Healthcare for family'],
        income: {
          annualIncome: 50000,
          sourceOfIncome: 'Agriculture'
        },
        familyDetails: {
          totalMembers: 4,
          children: 2
        }
      })
    });
    const profileData = await profileRes.json();
    console.log(JSON.stringify(profileData, null, 2));

    // 4. Test Citizen Understanding Agent
    console.log('\n🧠 4️⃣ Testing Citizen Understanding Agent (POST /api/ai/analyze)...');
    console.log('Sending profile to Gemini for classification...');
    const analyzeRes = await fetch(`${API_BASE}/ai/analyze`, { method: 'POST', headers: authHeaders });
    const analyzeData = await analyzeRes.json();
    console.log('Response:');
    console.log(JSON.stringify(analyzeData, null, 2));

    // 5. Test Scheme Recommendation Agent
    console.log('\n🎯 5️⃣ Testing Scheme Recommendation Agent (POST /api/ai/recommend)...');
    console.log('Performing RAG vector search & asking Gemini for recommendations...');
    const recommendRes = await fetch(`${API_BASE}/ai/recommend`, { method: 'POST', headers: authHeaders });
    const recommendData = await recommendRes.json();
    console.log('Response:');
    console.log(JSON.stringify(recommendData, null, 2));
    
    console.log('\n✅ Demo completed successfully!');

  } catch (error) {
    console.error('\n❌ Demo Failed!', error.message);
  }
};

runDemo();
