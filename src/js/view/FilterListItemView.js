
class FilterListItemView {
	constructor(elModel) {
		this.element = document.createElement('li');
		this.element.id = elModel.getID();
		this.elementModel = elModel;

		var stateCheckbox = document.createElement('input');
		var dataLabel = document.createElement('label');

		stateCheckbox.className = "item_select-checkbox";
		stateCheckbox.type = "checkbox";
		stateCheckbox.checked = this.elementModel.getSelectedState();
		stateCheckbox.onchange = (e) => this.changeSelectedState(e);

		dataLabel.className = "item_data-label";
		dataLabel.innerHTML = this.elementModel.getData();

		this.element.appendChild(stateCheckbox);
		this.element.appendChild(dataLabel);
	}

	changeSelectedState(e) {
		this.elementModel.setSelectedState(e.target.checked);
	}

	getElement() {
		return this.element;
	}
}

export default FilterListItemView;
