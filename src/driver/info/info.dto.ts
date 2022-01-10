export interface CreateUserInfoDto {
  name: string;
  phoneNumber: string;
  accountNumber: string;
  residence: string;
  drivingTime: number;
  driverId: number;
}

export interface UpdateUserInfoDto {
  name?: string;
  phoneNumber?: string;
  accountNumber?: string;
  residence?: string;
  drivingTime?: number;
  isDeleted?: boolean;
  driverId?: number;
}
