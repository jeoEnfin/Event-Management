import axiosClient from "../../../utils/services/AxiosServices";

export const AuthLoginAPI = async ({ data }:any) => {
	console.log(data, 'data')
	return axiosClient.request({
		url: `auth/login`,
		method: 'post',
		data
	});
};
