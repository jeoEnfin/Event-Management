import axiosClient from "../../../utils/services/AxiosServices";

export const ExpoDetailsAPI = async ({url, tenant}:any) => {
	return axiosClient.request({
		url: `expo${url}`,
		method: 'get',
        headers: {
            'x-tenant-id': tenant
          },
	});
};
