function uploadAndclassifyImage(){
    var fileInput = document.getElementById('resnet34FileUpload').files;
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
        // var rawResponse = response; // truncated for example
        var b64img = response.ImageBytes
        console.log("***")
        console.log(b64img)
        // create an image
        var outputImg = document.createElement('img');
        outputImg.src = 'data:image/jpeg;base64,'+b64img;
        // append it to your page
        document.body.appendChild(outputImg);
        var rawimage = file
        var rawImage = document.createElement('img');
        outputImg.src = 'data:image/jpeg;base64,'+rawimage;
        // append it to your page
        document.body.appendChild(rawImage);
    }).fail(function () {alert ("There was an error while sending a prediction request");
    });
};
$('#btnResnetUpload').click(uploadAndclassifyImage)