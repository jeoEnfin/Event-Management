import axiosClient from "../../../utils/services/AxiosServices";

export const ForgotPasswordAPI = async ({ data }:any) => {
	return axiosClient.request({
		url: `/users/password/forgot`,
		method: 'post',
		data
	});
};