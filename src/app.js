'use strict';

import ServiceController from './js/services/serviceController';
import DataModel from './js/models/dataModel';

import Constants from './js/services/constants';

require("./css/app.scss");

console.log('App is running!');

class App {
	constructor() {
		ServiceController.loadData(Constants.DATA_URL, this.dataLoaded);
	};

	dataLoaded(data) {
		var _data = ServiceController.parceData(data);

		this.dataModel = new DataModel(_data);
	}

	// var element = document.createElement('div');
	//
	// element.innerHTML = _.join(['Hello', 'webpack'], ' ');
}

export default new App;
