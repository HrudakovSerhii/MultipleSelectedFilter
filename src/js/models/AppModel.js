import Constants from './../services/constants';
import FilterListItemModel from "./FilterListItemModel";

class AppModel {
	constructor() {
		this.viewCollection = [];
		this.filteredViewCollection = [];

		this.collectionUpdated = new Event(Constants.events.DATA_COLLECTION_UPDATE);
	}

	setViewCollection(viewCollection) {
		this.viewCollection = viewCollection;
	}

	setFilteredViewCollection(filteredViewCollection) {
		this.filteredViewCollection = filteredViewCollection;

		document.dispatchEvent(this.collectionUpdated);
	}

	getViewCollectionLength() {
		return this.filteredViewCollection.length;
	}

	getItemViewByIndex(index) {
		return this.filteredViewCollection[index];
	}

	getUnselectedViewCollection() {
		return this.viewCollection.filter((item) => {
			return !item.elementModel.getSelectedState();
		});
	}

	getSelectedViewCollection() {
		return this.viewCollection.filter((item) => {
			return item.elementModel.getSelectedState();
		});
	}

	initItemModel(data, index) {
		let model = new FilterListItemModel(index);
		model.setData(data);

		return model;
	}

	checkIfModelInCollection(newModel, modelCollection) {
		var result = modelCollection.findIndex((model) => {
			return newModel == model;
		});

		return result >= 0;
	}
}

export default AppModel;
