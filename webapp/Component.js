sap.ui.loader.config({
	map: {
		"*": {
			"@coveo/headless": "/resources/@coveo/headless/dist/browser/headless",
		}
	},
	shim: {
		"@coveo/headless/": {
			"amd": true,
			"deps": [],
			"exports": "CoveoHeadless"
		}
	}
});

sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/core/ComponentSupport", "@coveo/headless"], function(UIComponent) {
	"use strict";
	return UIComponent.extend("sap.ui.demo.todo.Component", {
		metadata: {
			manifest: "json"
		}
	});
});
