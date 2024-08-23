import axiosClient from "../../../utils/services/AxiosServices";

export const ExpoListingAPI = async ({ url, keyword }: any) => {
	const urlParts = [`expo${url}`];
	if (keyword) urlParts.push(`keyword=${keyword}`);
	const fullUrl = urlParts.join(url.includes('?') ? '&' : '?');
	return axiosClient.request({
		url: fullUrl,
		method: 'get',
	});
};