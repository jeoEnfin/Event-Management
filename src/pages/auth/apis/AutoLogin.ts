import axiosClient from "../../../utils/services/AxiosServices";

export const AutoLoginAPI = async () => {
    return axiosClient.request({
		url: `/users/profile`,
		method: 'get',
	});
};