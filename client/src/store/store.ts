import axios from "axios";
import { makeAutoObservable } from "mobx";
import App from "../App";
import { API_URL } from "../http";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(
    email: string,
    name: string,
    surname: string,
    birthday: string,
    gender: string,
    password: string
  ) {
    try {
      const response = await AuthService.registration(
        email,
        name,
        surname,
        birthday,
        gender,
        password
      );
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.massage);
    } finally {
      this.setLoading(false);
    }
  }
  async uploadAvatar(file: string) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`${API_URL}/avatar/`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      this.setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  async uploadProfileName(profileName: string) {
    try {
      const response = await UserService.uploadProfileName(profileName);
      this.setUser(response.data);
    } catch (e: any) {
      console.log(e);
    }
  }
  async deleteAvatar() {
    try {
      const response = await axios.delete(`${API_URL}/avatar/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      this.setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  }
}
