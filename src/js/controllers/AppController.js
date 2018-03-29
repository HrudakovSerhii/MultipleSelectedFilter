import Constants from "./../services/constants";
import ServiceController from "./../services/serviceController";

class AppController {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.init();
	}

	init() {
		this.view.filterInput.oninput = (e) => this.inputFilterChange(e);
		this.view.saveFiltersSchemeBtn.onclick = () => this.saveFilterScheme();

		ServiceController.loadData(Constants.data.DATA_URL, (dataArray) => this.initFilterList(dataArray));
	}

	initFilterList(listData) {
		let viewCollection = [];
		let filteredViewCollection = [];

		for (let i = 0; i < listData.length; i++) {
			let model = this.model.initItemModel(listData[i], i);
			
			if (!this.model.checkIfModelInCollection(model, viewCollection)) {
				let view = this.view.createViewFromModel(model);

				viewCollection.push(view);
				filteredViewCollection.push(view);
			}
		}

		this.model.setViewCollection(viewCollection);
		this.model.setFilteredViewCollection(filteredViewCollection)
	}

	inputFilterChange(e) {
		this.runFilter(e.target.value);
	}

	runFilter(searchText) {
		let updatedViewCollection;
		let selectedItemsList = this.model.getSelectedViewCollection();
		let unselectedItemsList = this.model.getUnselectedViewCollection();

		if (searchText.length) {
			updatedViewCollection = this.searchTextInList(unselectedItemsList, searchText);
			updatedViewCollection = selectedItemsList.concat(updatedViewCollection);
		} else {
			updatedViewCollection = selectedItemsList.concat(unselectedItemsList);
		}

		this.model.setFilteredViewCollection(updatedViewCollection);
	}

	searchTextInList(list, searchText) {
		var sortedItemsList = [];
		var alikeItemsList = [];

		for(let i = 0; i < list.length; i++) {
			let modelData = list[i].elementModel.getData();

			if(modelData === searchText) {
				sortedItemsList.push(list[i]);
			} else if (modelData.includes(searchText)) {
				alikeItemsList.push(list[i]);
			}
		}

		return sortedItemsList.concat(alikeItemsList);
	}

	saveFilterScheme() {
		var selectedCollection = this.model.getSelectedViewCollection();
		var filterScheme = selectedCollection.map((model) => { return model.getData() }).split(" ");

		ServiceController.saveDataInFile(filterScheme);
	}
}

export default AppController;
