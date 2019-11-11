var app = {

    selectedContact : null,
    selectedContactErr : null,
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);        
    },

    onDeviceReady: function() {
        //alert(navigator.contacts);
        document.getElementById("bntSelContato").addEventListener("click", this.selecionaContato); 
        document.getElementById("bntShowContact").addEventListener("click", this.showSelectedContact);
    },

    onResume :function(resumeEvent) {
        alert("onResume :function(resumeEvent) {...");
        if(resumeEvent.pendingResult) {
            if(resumeEvent.pendingResult.pluginStatus === "OK") {
                var contact = navigator.contacts.create(resumeEvent.pendingResult.result);
                this.successCallback(contact);
            } else {                
                this.failCallback(resumeEvent.pendingResult.result);
            }
        }
    },
	
    successCallback : function(contact){
        alert("successCallback : function(contact){..."+ contact);

        alert("alert(contact);");
        alert(contact);
                
        app.selectedContact = contact;

        alert("alert(JSON.stringify(contact));");
        alert(JSON.stringify(contact));

        alert("alert(app.selectedContact);");
        alert(app.selectedContact);
    },
	
    failCallback : function(err){
        alert(err);
    },
    
    showSelectedContact: function(){
        alert(" ## showSelectedContact: function(){...");
        document.getElementById("contactName").innerHTML = app.getSelectedContactName();
        document.getElementById("contactImg").src = app.getSelectedContactImgSrc();
    },
    
    selecionaContato: function(){
        navigator.contacts.pickContact(function(contact){
            alert("selecionaContato: function(){...  navigator.contacts.pickContact(function(contact){...");
            alert('The following contact has been selected:' + JSON.stringify(contact));
            alert("Contact:"+contact);
            app.selectedContact = contact;
        },function(err){
            alert("selecionaContato: function(){...  function(err){...");
            alert('Error: ' + err);
            alert("err:"+err);
            app.selectedContactErr = err;
        });
    },
	
    getSelectedContactImgSrc : function(){
        let c = app.selectedContact;
        if(c.photos && c.photos.length) {
	        return c.photos[0].value;
	}
        return "";
    },
	
    getSelectedContactName : function(){
 	let cN = app.selectedContact.displayName;
	if(!cN || cN === "") {
	    if(cN.name.formatted){
                return cN.name.formatted;
            }
	    if(cN.name.givenName && cN.name.familyName) {
                return cN.name.givenName +" "+c.name.familyName;
            }
	    return "Nome Nao Informado";
	}
	return cN;
    }
};

app.initialize();