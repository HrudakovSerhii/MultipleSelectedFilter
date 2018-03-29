import FilterListItemModel from "./FilterListItemModel";

import Constants from './../services/constants';

class AppModel {
	constructor() {
		this.modelCollection = [];
		this.filteredModelCollection = [];

		this.collectionUpdated = new Event(Constants.events.DATA_COLLECTION_UPDATE);
	}

	initListModels(listData) {
		for (let i = 0; i < listData.length; i++) {
			let model = this.initListItemModel(listData[i], i);

			if (!this.checkIfModelInCollection(model)) {
				this.modelCollection.push(model);
				this.filteredModelCollection.push(model);
			}
		}

		document.dispatchEvent(this.collectionUpdated);
	}

	initListItemModel(data, index) {
		var itemModel = new FilterListItemModel(index);

		itemModel.setData(data);

		return itemModel;
	}

	updateItemsList(modelCollection) {
		this.filteredModelCollection = modelCollection;

		document.dispatchEvent(this.collectionUpdated);
	}

	getItemsListLength() {
		return this.filteredModelCollection.length;
	}

	getItemModelByIndex(index) {
		return this.filteredModelCollection[index];
	}

	getUnselectedList() {
		return this.modelCollection.filter((item) => {
			return !item.getSelectedState();
		});
	}

	getSelectedList() {
		return this.modelCollection.filter((item) => {
			return item.getSelectedState();
		});
	}

	checkIfModelInCollection(newModel) {
		var result = this.modelCollection.findIndex((model) => {
			return newModel == model;
		});

		return result >= 0;
	}
}

export default AppModel;
