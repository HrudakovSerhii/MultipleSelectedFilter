
class FilterListItemModel {
	constructor(id) {
		this.modelData = '';
		this.selected = false;
		this.id = 'filterListItem' + id;
	}

	setSelectedState(state) {
		if (this.selected !== state) {
			this.selected = state;
		}
	}

	getSelectedState() {
		return this.selected;
	}

	setData(data) {
		if(this.modelData !== data) {
			this.modelData = data;
		}
	}

	getData() {
		return this.modelData;
	}

	getID() {
		return this.id;
	}
}

export default FilterListItemModel;
