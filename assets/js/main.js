require.config({
    baseUrl: '/jivox/assets/js/lib/',
	shim : {
        "jquery.form" 		 : { "deps" :['jquery'] },
		"notify" 			 : { "deps" :['jquery'] },
		"jquery-ui" 		 : { "deps" :['jquery'] }
    },
    paths: {
		"app"				: "../app",
        "jquery"    		: "jquery.min"
    }
})

if (typeof r !== "undefined"){require(r)}
