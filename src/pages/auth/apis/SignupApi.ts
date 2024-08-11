import axiosClient from "../../../utils/services/AxiosServices";

export const SignupAPI = async ({ data }:any) => {
	return axiosClient.request({
		url: `users`,
		method: 'post',
		data
	});
};
