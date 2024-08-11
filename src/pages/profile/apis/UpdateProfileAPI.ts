import axiosClient from "../../../utils/services/AxiosServices";
import AsyncStorageUtil from "../../../utils/services/LocalCache";

export const UpdateProfileAPI = async ({data, userId}:any) => {
	console.log('Updating profile', data,userId);
	return axiosClient.request({
		url: `users/${userId}`,
		method: 'patch',
        data: data
	});
};