import { axiosInstance } from "./axios";

import { UpdateUserInfo } from "../types/profile";

//get
export const getUserInfoAPI = async () => {
    try{
      return await axiosInstance.get('/members/curations');
    }catch(err){
        console.log(err);
    }
}

//update
export const updateUserInfoAPI = async (data: UpdateUserInfo) => {
    try{
       return await axiosInstance.patch('/members',data);
    }catch(err){
        console.log(err);
    }
}

