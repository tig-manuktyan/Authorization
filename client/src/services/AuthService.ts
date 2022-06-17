import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "./../models/IUser";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    name: string,
    surname: string,
    birthday: string,
    gender: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", {
      email,
      name,
      surname,
      birthday,
      gender,
      password,
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }


}
