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
		this.view.loadFiltersSchemeBtn.onclick = () => this.loadFilterScheme();
		this.view.saveFiltersSchemeBtn.onclick = () => this.saveFilterScheme();

		ServiceController.loadData(Constants.data.DATA_URL, (dataArray) => this.model.initListModels(dataArray));
	}

	inputFilterChange(e) {
		this.runFilter(e.target.value);
	}

	runFilter(searchText) {
		let updatedItemsList;
		let selectedItemsList = this.model.getSelectedList();
		let unselectedItemsList = this.model.getUnselectedList();

		if (searchText.length) {
			updatedItemsList = this.searchTextInList(unselectedItemsList, searchText);
			updatedItemsList = selectedItemsList.concat(updatedItemsList);
		} else {
			updatedItemsList = selectedItemsList.concat(unselectedItemsList);
		}

		this.model.updateItemsList(updatedItemsList);
	}

	searchTextInList(list, searchText) {
		var sortedItemsList = [];
		var alikeItemsList = [];

		for(let i = 0; i < list.length; i++) {
			let modelData = list[i].getData();

			if(modelData === searchText) {
				sortedItemsList.push(list[i]);
			} else if (modelData.includes(searchText)) {
				alikeItemsList.push(list[i]);
			}
		}

		return sortedItemsList.concat(alikeItemsList);
	}

	loadFilterScheme() {
		ServiceController.loadDataFromFile((filterScheme) => this.filterSchemeLoaded(filterScheme));
	}

	filterSchemeLoaded(filterScheme) {
	
	}

	saveFilterScheme() {
		var selectedCollection = this.model.getSelectedDataCollection();
		var filterScheme = selectedCollection.map((model) => { return model.getData() }).split(" ");

		ServiceController.saveDataInFile(filterScheme);
	}
}

export default AppController;
