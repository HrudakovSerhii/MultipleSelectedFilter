import Constants from './../services/constants';
import FilterListItemModel from "./FilterListItemModel";

class AppModel {
	constructor() {
		this.viewCollection = [];
		this.filteredViewCollection = [];
		this.selectedItemCollection = [];

		this.collectionUpdated = new Event(Constants.events.DATA_COLLECTION_UPDATE);
		this.itemSelectedEvent = new Event(Constants.events.ITEM_SELECTED);
		this.itemUnselectedEvent = new Event(Constants.events.ITEM_UNSELECTED);
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
		return this.viewCollection.filter(item => !item.elementModel.getSelectedState());
	}

	getSelectedViewCollection() {
		return this.viewCollection.filter(item => item.elementModel.getSelectedState());
	}

	initItemModel(data, index) {
		let model = new FilterListItemModel(index, this);
		
		model.setData(data);

		return model;
	}

	itemSelected(id) {
		if (!this.selectedItemCollection.length) {
			document.dispatchEvent(this.itemSelectedEvent);
		}

		this.selectedItemCollection.push(id);
	}

	itemUnselected(id) {
		let index = this.selectedItemCollection.indexOf(id);

		if (index > -1) {
			this.selectedItemCollection.splice(index, 1);

			if (!this.selectedItemCollection.length) {
				document.dispatchEvent(this.itemUnselectedEvent);
			}
		}
	}

	checkIfModelInCollection(newModel, modelCollection) {
		let result = modelCollection.findIndex(model => newModel == model);

		return result >= 0;
	}
}

export default AppModel;
