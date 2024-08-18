import axiosClient from "../../../utils/services/AxiosServices";

export const ChatTokenApi = async ({ data }: any) => {
    return axiosClient.request({
        url: `layout/chat-token`,
        method: 'post',
        data: data
    });
};