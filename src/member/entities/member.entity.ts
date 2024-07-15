import { Team } from '../enum/enums';

export class Member {
  id: number;
  name: string;
  userName: string;
  avatar: string;
  isActive: boolean;
  role: string;
  email: string;
  teams: Team[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
