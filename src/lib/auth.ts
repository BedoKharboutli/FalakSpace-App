// Simple authentication system using localStorage
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserData {
  favorites: string[];
  notes: Record<string, string>; // planetId -> note content
  lastLogin: string;
}

// Auth functions
export const auth = {
  // Register a new user
  register: (name: string, email: string, password: string): { success: boolean; error?: string } => {
    try {
      // Check if user already exists
      const existingUsers = getUsers();
      if (existingUsers.find(u => u.email === email)) {
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const user: User = {
        id: generateUserId(),
        name,
        email,
        createdAt: new Date().toISOString()
      };

      // Store user and password
      const users = [...existingUsers, user];
      localStorage.setItem('cosmic_users', JSON.stringify(users));
      localStorage.setItem(`cosmic_password_${user.id}`, password);

      // Initialize user data
      const userData: UserData = {
        favorites: [],
        notes: {},
        lastLogin: new Date().toISOString()
      };
      localStorage.setItem(`cosmic_data_${user.id}`, JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  },

  // Login user
  login: (email: string, password: string): { success: boolean; user?: User; error?: string } => {
    try {
      const users = getUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return { success: false, error: 'Email not found' };
      }

      const storedPassword = localStorage.getItem(`cosmic_password_${user.id}`);
      if (storedPassword !== password) {
        return { success: false, error: 'Invalid password' };
      }

      // Update last login
      const userData = getUserData(user.id);
      userData.lastLogin = new Date().toISOString();
      localStorage.setItem(`cosmic_data_${user.id}`, JSON.stringify(userData));

      // Set current user
      localStorage.setItem('cosmic_current_user', user.id);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('cosmic_current_user');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const currentUserId = localStorage.getItem('cosmic_current_user');
    if (!currentUserId) return null;

    const users = getUsers();
    return users.find(u => u.id === currentUserId) || null;
  },

  // Check if user is logged in
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('cosmic_current_user');
  }
};

// User data functions
export const userData = {
  // Get user's data
  getUserData: (userId?: string): UserData => {
    const id = userId || localStorage.getItem('cosmic_current_user');
    if (!id) return { favorites: [], notes: {}, lastLogin: '' };

    return getUserData(id);
  },

  // Add to favorites
  addFavorite: (planetId: string): boolean => {
    const currentUserId = localStorage.getItem('cosmic_current_user');
    if (!currentUserId) return false;

    const data = getUserData(currentUserId);
    if (!data.favorites.includes(planetId)) {
      data.favorites.push(planetId);
      localStorage.setItem(`cosmic_data_${currentUserId}`, JSON.stringify(data));
    }
    return true;
  },

  // Remove from favorites
  removeFavorite: (planetId: string): boolean => {
    const currentUserId = localStorage.getItem('cosmic_current_user');
    if (!currentUserId) return false;

    const data = getUserData(currentUserId);
    data.favorites = data.favorites.filter(id => id !== planetId);
    localStorage.setItem(`cosmic_data_${currentUserId}`, JSON.stringify(data));
    return true;
  },

  // Save note for planet
  saveNote: (planetId: string, note: string): boolean => {
    const currentUserId = localStorage.getItem('cosmic_current_user');
    if (!currentUserId) return false;

    const data = getUserData(currentUserId);
    data.notes[planetId] = note;
    localStorage.setItem(`cosmic_data_${currentUserId}`, JSON.stringify(data));
    return true;
  },

  // Get note for planet
  getNote: (planetId: string): string => {
    const currentUserId = localStorage.getItem('cosmic_current_user');
    if (!currentUserId) return '';

    const data = getUserData(currentUserId);
    return data.notes[planetId] || '';
  },

  // Check if planet is favorited
  isFavorited: (planetId: string): boolean => {
    const currentUserId = localStorage.getItem('cosmic_current_user');
    if (!currentUserId) return false;

    const data = getUserData(currentUserId);
    return data.favorites.includes(planetId);
  }
};

// Helper functions
function getUsers(): User[] {
  const users = localStorage.getItem('cosmic_users');
  return users ? JSON.parse(users) : [];
}

function getUserData(userId: string): UserData {
  const data = localStorage.getItem(`cosmic_data_${userId}`);
  return data ? JSON.parse(data) : { favorites: [], notes: {}, lastLogin: '' };
}

function generateUserId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
