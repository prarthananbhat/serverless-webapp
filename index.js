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
        url : 'https://1z7osv3nj8.execute-api.ap-south-1.amazonaws.com/dev/align_image',
        data : formData,
        processData : false,
        contentType : false,
        mimeType : "image/jpeg"
    }).done(function (response) {
        console.log(response);
        $('#btnResnetUpload').click(uploadAndclassifyImage)
    }).fail(function () {alert ("There was an error while sending a prediction request");
    });
};

