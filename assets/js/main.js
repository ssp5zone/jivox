require.config({
    baseUrl: '/jivox/assets/js/lib/',
	shim : {
        "jquery.form" 		 : { "deps" :['jquery'] },
		"notify" 			 : { "deps" :['jquery'] },
		"jquery-ui" 		 : { "deps" :['jquery'] },
		"idle-timer" 		 : { "deps" :['jquery'] },
		"jquery-editable" 	 : { "deps" :['jquery','jquery-ui'] },
		"datatables" 		 : { "deps" :['jquery'] },
		"sumoselect" 		 : { "deps" :['jquery'] },
		"Chart.HorizontalBar": { "deps" :['Chart.min'] }
    },
    paths: {
		"app"				: "../app",
        "jquery"    		: "jquery.min",
		"datatables"		: "jquery.dataTables",
		"sumoselect"		: "jquery.sumoselect.min"
    }
})

if (typeof r !== "undefined"){require(r)}
