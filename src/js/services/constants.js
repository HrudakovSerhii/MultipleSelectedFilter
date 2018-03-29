
export default {
	data: {
		DATA_URL: 'items.json'
	},
	events: {
		DATA_COLLECTION_INITIALIZATION: 'dataCollectionInitialization',
		DATA_COLLECTION_UPDATE        : 'dataCollectionUpdate',
		INPUT_FILTER_CHANGE           : 'itemStateUpdate'
 	}
}
