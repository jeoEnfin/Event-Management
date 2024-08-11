import axiosClient from "../../../utils/services/AxiosServices";

export const ExpoDetailsAPI = async ({url}:any) => {
	//console.log(url)
	return axiosClient.request({
		url: `expo${url}`,
		method: 'get',
	});
};
