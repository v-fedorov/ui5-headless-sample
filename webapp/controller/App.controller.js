sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function(Device, Controller, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.App", {

		onInit: function() {
			let oView = this.getView();
			this.oSF = oView.byId("searchField");
			this.headlessEngine = CoveoHeadless.buildSearchEngine({
				configuration: {...CoveoHeadless.getSampleSearchEngineConfiguration()}
			})
			this.searchBox = CoveoHeadless.buildSearchBox(this.headlessEngine);
			this.resultList = CoveoHeadless.buildResultList(this.headlessEngine);
			this.fieldSuggestionsOptions = {field: 'author'}
			this.querySuggest = CoveoHeadless.buildFieldSuggestions(this.headlessEngine, {options: this.fieldSuggestionsOptions})

			this.searchBox.updateText("")
			this.searchBox.submit()

			setTimeout(() => {
				// this.oModel = new JSONModel({"SearchResults": this.resultList.state.results});
				// this.getView().setModel(this.oModel);
				this.getView().setModel(new JSONModel({
					"SearchResults": this.resultList.state.results
				}));
			}, 500)
		},

		onSuggest: function (event) {
			let oView = this.getView();
			let sValue = event.getParameter("suggestValue"),
				aFilters = [];
			if (sValue) {
				this.querySuggest.updateText(sValue)
				setTimeout(() => {
					this.oModel = new JSONModel({"Suggestions": this.querySuggest.state.values, "SearchResults": this.resultList.state.results});
					oView.setModel(this.oModel);
					this.oSF.getBinding("suggestionItems").filter(aFilters);
					this.oSF.suggest();
				}, 500)
			}
		},

		onSearch: function(oEvent) {
			this.sSearchQuery = oEvent.getSource().getValue();
			if (this.sSearchQuery && this.sSearchQuery.length > 0) {
				this.searchBox.updateText(this.sSearchQuery)
				this.searchBox.submit()
				this.oModel = new JSONModel({"SearchResults": this.resultList.state.results});
				this.getView().setModel(this.oModel);
			}
		},

	});

});
