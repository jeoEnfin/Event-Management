import axiosClient from "../../../utils/services/AxiosServices";

export const QrCodeAPI = async ({data}:any) => {
	return axiosClient.request({
		url: `qr-code`,
		method: 'post',
        data: {
            payload: data
        }
	});
};