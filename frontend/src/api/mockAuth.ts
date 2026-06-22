// Mock authentication - uses local data instead of API calls

type User = {
  fullName: string;
  emailOrPhone: string;
  state: string;
  subject: string;
  grade: string;
  schoolType: string;
};

// Mock user database
const mockUsers: Record<string, { password: string; userData: User }> = {
  '+91 9876543210': {
    password: 'password123',
    userData: {
      fullName: 'Meena Sharma',
      emailOrPhone: '+91 9876543210',
      state: 'Maharashtra',
      subject: 'Maths',
      grade: '5',
      schoolType: 'Government',
    },
  },
  'teacher@example.com': {
    password: 'password123',
    userData: {
      fullName: 'Priya Patil',
      emailOrPhone: 'teacher@example.com',
      state: 'Maharashtra',
      subject: 'Science',
      grade: '4',
      schoolType: 'Government',
    },
  },
};

// Generate a mock token
const generateMockToken = (): string => {
  return 'mock_token_' + Math.random().toString(36).substring(2, 15);
};

export const mockLogin = async (
  emailOrPhone: string,
  password: string
): Promise<{ token: string; user: User }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userRecord = mockUsers[emailOrPhone];

  if (!userRecord) {
    throw new Error('User not found');
  }

  if (userRecord.password !== password) {
    throw new Error('Invalid password');
  }

  return {
    token: generateMockToken(),
    user: userRecord.userData,
  };
};

export const mockRegister = async (formData: {
  fullName: string;
  emailOrPhone: string;
  password: string;
  state: string;
  subject: string;
  grade: string;
  schoolType: string;
}): Promise<{ token: string; user: User }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  if (mockUsers[formData.emailOrPhone]) {
    throw new Error('User already exists');
  }

  // Add new user to mock database
  const newUser: User = {
    fullName: formData.fullName,
    emailOrPhone: formData.emailOrPhone,
    state: formData.state,
    subject: formData.subject,
    grade: formData.grade,
    schoolType: formData.schoolType,
  };

  mockUsers[formData.emailOrPhone] = {
    password: formData.password,
    userData: newUser,
  };

  return {
    token: generateMockToken(),
    user: newUser,
  };
};
