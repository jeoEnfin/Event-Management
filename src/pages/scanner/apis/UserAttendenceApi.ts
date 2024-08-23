import axiosClient from "../../../utils/services/AxiosServices";

export const UserAttendenceApi = async ({ data, platform, eventId, tenantId }: any) => {
    console.log('cloo--', data, platform, eventId, tenantId);
    return axiosClient.request({
        url: `participant/mark-attendance`,
        method: 'post',
        data: {
            payload: data,
            attDeviceInfo: { os: platform },
            expoId: eventId
        },
        headers: {
            'x-tenant-id': tenantId
        }
    });
};