'use strict';

import AppModel from './js/models/AppModel';
import AppView from './js/view/AppView';
import AppController from './js/controllers/AppController';

require("./css/app.scss");

class App {
	constructor() {
		this.appModel = new AppModel();
		this.appView = new AppView(this.appModel);
		this.appController = new AppController(this.appModel, this.appView);
	};
}

export default new App;
