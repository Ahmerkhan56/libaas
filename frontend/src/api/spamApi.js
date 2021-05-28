import Axios from "axios"

export const GetSpamIps = async (productid) => {
    return await Axios.get(`/api/spam/${productid}/by-ip`)
}

export const DeleteSpamIps = async (productIp,ipAddress) => {
    return await Axios.delete(`/api/spam/${productIp}/${ipAddress}/by-ip`)
}