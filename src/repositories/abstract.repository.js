import Path from 'path';


class AbstractRepository {
    constructor(axiosService, path, excludes = []) {

        this.axiosService = axiosService;
        this.path = path;
    }

     fetchAll(query = null) {
        return this.axiosService.get(this.path, true, query);
    }

     fetchOne(id) {
        return this.axiosService.get(Path.join(this.path, `${id}`));
    }

     create(object) {
        return this.axiosService.post(this.path, object);
    }

     update(id, object) {
        return this.axiosService.put(Path.join(this.path, `${id}`), object);
    }

     delete(id) {
        return this.axiosService.delete(Path.join(this.path, `${id}`));
    }

}

export default AbstractRepository;
