import Constants from './../services/constants';
import FilterListItemView from "./FilterListItemView";

class AppView {
	constructor(listModel) {
		this.listModel = listModel;

		this.saveFiltersSchemeBtn = document.getElementById('saveFiltersSchemeBtn');
		this.filterList = document.getElementById('filterList');
		this.filterInput = document.getElementById('filterInput');

		document.addEventListener(Constants.events.DATA_COLLECTION_UPDATE, () => {
			this.clearListView();
			this.render();
			this.updateScrollPosition();
		});

		document.addEventListener(Constants.events.ITEM_SELECTED, () => {
			this.enableSaveButton();
		});

		document.addEventListener(Constants.events.ITEM_UNSELECTED, () => {
			this.disableSaveButton();
		});
	}

	clearListView() {
		let listItemsLength = this.filterList.children.length;

		for(let i = 0; i < listItemsLength; i += 1) {
			let id = this.filterList.lastChild.id;
			let el = document.getElementById(id);

			this.filterList.removeChild(el);
		}
	}

	render() {
		for(let i = 0; i < this.listModel.getViewCollectionLength(); i += 1) {
			let view = this.listModel.getItemViewByIndex(i);

			this.filterList.append(view.getElement());
		}
	}

	enableSaveButton() {
		this.saveFiltersSchemeBtn.disabled = false;
	}

	disableSaveButton() {
		this.saveFiltersSchemeBtn.disabled = true;
	}

	updateScrollPosition() {
		this.filterList.scrollTo(0,0);
	}

	createViewFromModel(model) {
		return new FilterListItemView(model);
	}
}

export default AppView;
