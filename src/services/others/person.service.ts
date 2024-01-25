import ApiService from "../api.service";
const PersonService = {
    GetByPassportData(data:object){
        return ApiService.post(`/Person/GetByPassportData`,data)
    },
    GetPhotoFromGSP(id:any){
        return ApiService.get(`/Person/GetPhotoFromGSP/${id}`)
    },
}
export default PersonService