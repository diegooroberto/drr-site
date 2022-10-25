(function() {
    // Set the locale to use for time formatting. Try other
    // options like 'sv' or 'fi' or 'fr'. 'en' == english
    moment.locale('pt');

    var serverTime,
        timeOffset;

	// Run each second lap to show times in real time
    var updateDisplay = function() {
        // Show static time data
        document.getElementById('dataHTML').innerHTML = 
                moment().tz("America/Sao_Paulo").format("DD/MM/YYYY");
    };

    // Fetch the servern time through a HEAD request to current URL
    // using asynchronous request.
    var fetchServerTime = function() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() {
            var dateHeader = xmlhttp.getResponseHeader('Date');
	         
            // Turn the "Date:" header field into a "moment" object,
            // use JavaScript Date() object as parser
            serverTime = moment(new Date(dateHeader)); // Read
            
            // Store the differences between device time and server time
            timeOffset = serverTime.diff(moment());
        }
        xmlhttp.open("HEAD", window.location.href);
        xmlhttp.send();
    }

    // Trigger the whole procedure
    fetchServerTime();
    updateDisplay();
})();
