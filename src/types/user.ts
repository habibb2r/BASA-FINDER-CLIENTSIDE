



export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  photoURL?: string;
  phone?: string;
  address?: string;
  city?: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'landlord' | 'tenant'; 
  status?: 'active' | 'blocked';
  isBlocked: boolean;
  isDeleted: boolean;
}