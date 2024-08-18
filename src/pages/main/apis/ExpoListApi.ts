import axiosClient from "../../../utils/services/AxiosServices";

export const ExpoListingAPI = async ({ url, keyword }: any) => {
	//console.log(url, keyword, 'apihit');
	const urlParts = [`expo${url}`];
	if (keyword) urlParts.push(`keyword=${keyword}`);
	const fullUrl = urlParts.join(url.includes('?') ? '&' : '?');
	//console.log(fullUrl,'full')
	return axiosClient.request({
		url: fullUrl,
		method: 'get',
	});
};