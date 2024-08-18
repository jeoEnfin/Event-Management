import { tenant } from "../../../store/actions";
import { config } from "../../../utils/config";
import axiosClient from "../../../utils/services/AxiosServices";
import AsyncStorageUtil from "../../../utils/services/LocalCache";

export const OrderListAPI = async () => {
    const userData = await AsyncStorageUtil.getData('userData');
	return axiosClient.request({
		url: userData ? `order?eoUserId=${userData.uuid}`: `order`,
		method: 'get',
		headers: {
			'x-tenant-id': config.DEFAULT_TENANT
		}
	});
};