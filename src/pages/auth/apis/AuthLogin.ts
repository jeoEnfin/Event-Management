import axiosClient from "../../../utils/services/AxiosServices";

export const AuthLoginAPI = async ({ data }:any) => {
	return axiosClient.request({
		url: `auth/login`,
		method: 'post',
		data
	});
};
