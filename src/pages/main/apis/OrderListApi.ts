import axiosClient from "../../../utils/services/AxiosServices";
import AsyncStorageUtil from "../../../utils/services/LocalCache";

type OrderType = {
	expId: string;
	tenantId: string;
}

export const OrderListAPI = async ({expId , tenantId} : OrderType) => {
	const user = await AsyncStorageUtil.getData('userData');
	if(!expId || expId === undefined) return;
	return axiosClient.request({
		url: `participant/?epExpoId=${expId}&epUserId=${user?.uuid}`,
		method: 'get',
		headers: {
			'context': 'admin',
			'x-tenant-id': tenantId
		}
	});
};