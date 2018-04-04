
class FilterListItemModel {
	constructor(id, parent) {
		this.modelData = '';
		this.selected = false;
		this.id = 'filterListItem' + id;
		this.parent = parent;
	}

	setSelectedState(state) {
		if (state) {
			this.parent.itemSelected(this.id);
		} else {
			this.parent.itemUnselected(this.id);
		}

		this.selected = state;
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
