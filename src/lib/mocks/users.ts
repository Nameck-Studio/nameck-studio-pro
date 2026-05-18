import type { User } from '@/types/user';

export interface MockCredentials {
  user: User;
  password: string;
}

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'alex@nameck.studio',
    firstName: 'Alex',
    lastName: 'Morgan',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  },
  {
    id: 'user-2',
    email: 'admin@nameck.studio',
    firstName: 'Olivier',
    lastName: 'Demolliens',
    role: 'admin',
    avatarUrl: '',
  },
];

export const mockCredentials: MockCredentials[] = [
  { user: mockUsers[0]!, password: 'nameck2024' },
  { user: mockUsers[1]!, password: 'admin2024' },
];

export const currentUser = mockUsers[0]!;
