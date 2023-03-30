import axios from 'axios';
import apiUrls from '@/config/apiUrls';


class CRUDService {
	constructor() {
		this.url = apiUrls.CRUD_SERVICE;
		this.config = {};
	}
	initData() {
		return axios.get(apiUrls.CRUD_DATA_INIT, {}, this.config);
	}	
	getAll() {
		return axios.get(`${this.url}`, {}, this.config);
	}
	get(id) {
		return axios.get(`${this.url}?type=get&id=${id}`, {}, this.config);
	}
	create(data) {
		this.config = {
			headers: { 'Content-Type':  'multipart/form-data' }
		};

        /**
         * ################################################################
         * for development mode (with `php-express` of Node) _ begin  
         * ################################################################
         */
		if (process.env.NODE_ENV !== "production") {
            let url = `${this.url}?type=create&`;
			for (let pair of data.entries()) {
				url += `${pair[0]}=${pair[1]}&`;
			}

			url = url.replace(/^\&|\&$/, '');
            return axios.post(url, data, this.config);
		}
        /**
         * ################################################################
         * ... end 
         * ################################################################
         */


		return axios.post(`${this.url}?type=create`, data, this.config);
	}
	update(id, data) {
		this.config = {
			headers: { 'Content-Type':  'multipart/form-data' }
		};

        /**
         * ################################################################
         * for development mode (with `php-express` of Node) _ begin  
         * ################################################################
         */
		if (process.env.NODE_ENV !== "production") {
            let url = `${this.url}?type=update&id=${id}&`;
			for (let pair of data.entries()) {
				url += `${pair[0]}=${pair[1]}&`;
			}

			url = url.replace(/^\&|\&$/, '');
            return axios.post(url, data, this.config);
		}
        /**
         * ################################################################
         * ... end 
         * ################################################################
         */

        

		return axios.post(`${this.url}?type=update&id=${id}`, data, this.config);
	}
	remove(id) {


        /**
         * ################################################################
         * for development mode (with `php-express` of Node) _ begin  
         * ################################################################
         */
		if (process.env.NODE_ENV !== "production") {
            return axios.get(`${this.url}?type=remove&id=${id}`, {}, this.config);
		}
        /**
         * ################################################################
         * ... end 
         * ################################################################
         */


		return axios.delete(`${this.url}?type=remove&id=${id}`, {}, this.config);
	}
}


export default new CRUDService;

