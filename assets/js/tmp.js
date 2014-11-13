var d = new Date(2013, 12, 5, 16, 23, 45, 600);
var generatedFile = new File(["I'd love Javascript"], "Draft1.txt", {type: "text/plain", lastModified: d});

var reader = new FileReader();
reader.readAsText(generatedFile, "UTF-8");
reader.addEventListener('load', function(e){
    console.log(this.result);
});