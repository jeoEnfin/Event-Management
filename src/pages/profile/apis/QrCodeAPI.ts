import { config } from "../../../utils/config";
import axiosClient from "../../../utils/services/AxiosServices";

export const QrCodeAPI = async ({data}:any) => {
	return axiosClient.request({
		url: `qr-code`,
		method: 'post',
        data: {
            payload: data
        },
		// headers: {
		// 	'x-tenant-id': config.DEFAULT_TENANT
		// }
	});
};