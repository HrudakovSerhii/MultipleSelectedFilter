
class ServiceController {
	loadData(url, callBack) {
		fetch(url)
			.then(response => this.checkStatus(response))
			.then(responseObj => this.parseJSONData(responseObj))
			.then((parsedArray) => {
					console.log('Request succeeded with JSON response');
					callBack(parsedArray);
				}).catch((error) => {
					console.log('Request failed', error);
					throw new Error(error);
				});
	}

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			var error = new Error(response.statusText);

			error.response = response;

			throw error
		}
	}

	parseJSONData(dataObj) {
		return Object.keys(dataObj).map(key => dataObj[key])[0];
	}

	loadDataFromFile() {
	
	}

	saveDataInFile(data) {
	
	}
}

export default new ServiceController();
