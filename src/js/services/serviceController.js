
class ServiceController {
	loadData(url, callBack) {
		let xObject = new XMLHttpRequest();

		xObject.overrideMimeType("application/json");
		xObject.open('GET', url, true);
		xObject.onreadystatechange = () => {
			if (xObject.readyState == 4 && xObject.status == "200") {
				let data = this.parseJSONData(xObject.responseText);

				callBack(data);
			}
		};

		try {
			xObject.send(null);
		} catch(error){
			throw new Error(error);
		}
	}

	parseJSONData(dataObj) {
		let parsedData = JSON.parse(dataObj);
		return Object.keys(parsedData).map(key => parsedData[key])[0];
	}

	saveDataInFile(data) {
		let jsonData = JSON.stringify(data);

		this.download(jsonData, 'default.txt', 'text/plain');
	}

	download(content, fileName, contentType) {
		let a = document.createElement("a");
		let file = new Blob([content], {type: contentType});

		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}
}

export default new ServiceController();
