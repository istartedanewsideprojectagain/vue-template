import Path from 'path';
import AxiosService from './axios.service';

const CreatorService = {

  /**
   * Creates a CRUD service.
   * @param path The path of the manipulated object in the API.
   * @param excludes A list of function to exclude in the created service.
   * @returns {{}} The created CRUD service.
   */
  createCrud(path, excludes = []) {
    const crud = {
      /**
       * Fetches objects from the API.
       */
      async [`fetchAll`](query = null) {
        return AxiosService.get(path, true, query);
      },

      /**
       * Fetch the object corresponding to the given ID.
       * @param {String|Number} id The id of the object to retrieve.
       */
      async [`fetchById`](id) {
        return AxiosService.get(Path.join(path, `${id}`));
      },

      /**
       * Creates a new object using the API.
       * @param {Object} object The new object to create.
       */
      async [`create`](object) {
        return AxiosService.post(path, object);
      },

      /**
       * Updates the given object using the API.
       * @param {String|Number} id The id of the object.
       * @param {Object} object The object to update.
       */
      async [`update`](id, object) {
        return AxiosService.put(Path.join(path, `${id}`), object);
      },

      /**
       * Deletes the object  from the API.
       * @param {*} id The id of the object to delete.
       */
      async [`delete`](id) {
        return AxiosService.delete(Path.join(path, `${id}`));
      },
    };

    excludes.forEach((exclude) => {
      delete crud[exclude];
    });

    return crud;
  },
};

export default CreatorService;
