var loadFile = function(event) {
    var image = document.getElementById('input'); image.src = URL.createObjectURL(event.target.files[0]);
};
function uploadAndclassifyImage(){
    var fileInput = document.getElementById('fileinput').files;
    if(!fileInput.length){
        return alert("Please choose a file to upload first");
    }
    var file = fileInput[0]
    var filename = file.name

    var formData = new FormData();
    formData.append(filename,file)

    console.log(filename)

    $.ajax({
        async : true,
        crossDomain : true,
        method : 'POST',
        //url : 'https://ic87evu6q3.execute-api.ap-south-1.amazonaws.com/dev/classify_image',
        url : 'https://03dwuhemb0.execute-api.ap-south-1.amazonaws.com/dev/align_images',
        data : formData,
        processData : false,
        contentType : false,
        mimeType : "application/json"
    }).done(function (response) {
        console.log(response);
        var b64img = response.ImageBytes
        console.log("***")
        console.log(b64img)
        var output_image = document.getElementById('output');
        output_image.src = 'data:image/jpeg;base64,'+b64img;
    }).fail(function () {alert ("There was an error while sending a prediction request");
    });
};
$('#btnResnetUpload').click(uploadAndclassifyImage)