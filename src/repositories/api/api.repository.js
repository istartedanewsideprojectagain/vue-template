import AxiosService from "@/services/axios.service";
import AbstractRepository from "@/repositories/abstract.repository";
class ApiRepository extends AbstractRepository{
    constructor(path) {
        super(AxiosService, path)
    }
}

export default ApiRepository
