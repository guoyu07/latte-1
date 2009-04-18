(function(model) {
	require("util/common.js")

	var uc = java.net.URL("http://twitter.com/statuses/update.json").openConnection()
	var auth = config.getProperty("twitter-user") + ":" + config.getProperty("twitter-pass")
	log.info(auth)
	log.info(auth.toBase64())
	uc.setRequestProperty("Authorization", "Basic " + auth.toBase64())
	
	uc.setDoOutput(true)
	
	var writer = new java.io.OutputStreamWriter(uc.getOutputStream())
	
	var status = "http://chan.sikho.ca/blog/show/all/" + model.key + " - " + model.title
	if(status.length > 140) status.substring(0, 137) + "..."
	
	log.info("twitting: " + status)
	writer.write("status=" + status.escapeURL())
	writer.close()
	
	var br = new java.io.BufferedReader(new java.io.InputStreamReader(uc.getInputStream()))
	
	var res
    while ((res = br.readLine()) != null) {  
		log.info(res)
	}
	br.close(); 
})
	