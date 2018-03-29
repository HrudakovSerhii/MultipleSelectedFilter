
class FilterListItemView {
	constructor(elModel) {
		this.elementModel = elModel;

		this.element = document.createElement('li');
		this.element.id = elModel.getID();
		this.element.className = "list_view-item";

		this.dataLabel = document.createElement('label');
		this.checkmark = document.createElement('span');

		let stateCheckboxContainer = document.createElement('label');
		let stateCheckbox = document.createElement('input');
		let checkStyle = this.elementModel.getSelectedState() ? "selected" : "";

		stateCheckbox.onchange = () => this.changeSelectedState();
		stateCheckbox.type = "checkbox";

		this.dataLabel.innerHTML = this.elementModel.getData();
		this.dataLabel.className = checkStyle + " item_label";
		this.checkmark.className = checkStyle;

		stateCheckboxContainer.appendChild(stateCheckbox);
		stateCheckboxContainer.appendChild(this.checkmark);
		stateCheckboxContainer.className = "item_select-checkbox";

		this.element.appendChild(stateCheckboxContainer);
		this.element.appendChild(this.dataLabel);
	}

	changeSelectedState() {
		let checked = !this.elementModel.getSelectedState();
		let checkStyle = checked ? "selected" : "";

		this.dataLabel.className = checkStyle + " item_label";
		this.checkmark.className = checkStyle;
		this.elementModel.setSelectedState(checked);
	}

	getElement() {
		return this.element;
	}
}

export default FilterListItemView;
