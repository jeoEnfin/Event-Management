import axiosClient from "../../../utils/services/AxiosServices";

export const ExpoListingAPI = async () => {
	return axiosClient.request({
		url: `expo?page=1&limit=10`,
		method: 'get',
	});
};
