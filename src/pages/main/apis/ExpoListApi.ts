import axiosClient from "../../../utils/services/AxiosServices";

export const ExpoListingAPI = async ({url}:any) => {
	return axiosClient.request({
		url: `expo${url}`,
		method: 'get',
	});
};
