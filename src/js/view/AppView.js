import FilterListItemView from "./FilterListItemView";
import Constants from './../services/constants';

class AppView {
	constructor(listModel) {
		this.listModel = listModel;

		this.saveFiltersSchemeBtn = document.getElementById('saveFiltersSchemeBtn');
		this.filterList = document.getElementById('filterList');
		this.filterInput = document.getElementById('filterInput');

		document.addEventListener(Constants.events.DATA_COLLECTION_UPDATE, () => {
			this.clearListView();
			this.render();
		});
	}

	clearListView() {
		var listItemsLength = this.filterList.children.length;

		for(let i = 0; i < listItemsLength; i += 1) {
			let id = this.filterList.lastChild.id;
			let el = document.getElementById(id);

			this.filterList.removeChild(el);
		}
	}

	render() {
		for(let i = 0; i < this.listModel.getItemsListLength(); i += 1) {
			let view = this.createViewFromModel(this.listModel.getItemModelByIndex(i));

			this.filterList.append(view.getElement());
		}
	}

	createViewFromModel(model) {
		return new FilterListItemView(model);
	}
}

export default AppView;
