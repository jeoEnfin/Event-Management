import axiosClient from "../../../utils/services/AxiosServices";

export const GetRegistrationFieldsAPI = async () => {
	return axiosClient.request({
		url: `profile-fields`,
		method: 'get',
	});
};
