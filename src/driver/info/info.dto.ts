export interface CreateUserInfoDto {
  isCorporation: boolean;
  accountNumber: string;
  residence: string;
  drivingTime: number;
  driverId: number;
}

export interface UpdateUserInfoDto {
  isCorporation?: boolean;
  accountNumber?: string;
  residence?: string;
  drivingTime?: number;
  isDeleted?: boolean;
  driverId?: number;
}
