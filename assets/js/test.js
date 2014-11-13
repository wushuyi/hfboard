var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState==4){
        console.log(xhr.status);
        if(xhr.status==200){
            var msg = xhr.getResponseHeader('Date');
            console.log(msg);
        }
    }
};

xhr.open("GET", "http://localhost/", true);
xhr.send(null);