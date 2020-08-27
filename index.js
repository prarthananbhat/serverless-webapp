var load_prediction_fileinput = function(event) {
    var image = document.getElementById('prediction_input'); image.src = URL.createObjectURL(event.target.files[0]);
};
var loadFile = function(event) {
    var image = document.getElementById('input'); image.src = URL.createObjectURL(event.target.files[0]);
};
var loadimg1 = function(event) {
    var image = document.getElementById('input1'); image.src = URL.createObjectURL(event.target.files[0]);
};
var loadimg2 = function(event) {
    var image = document.getElementById('input2'); image.src = URL.createObjectURL(event.target.files[0]);
};
var load_face_recognition_fileinput = function(event) {
    var image = document.getElementById('face_recognistion_input'); image.src = URL.createObjectURL(event.target.files[0]);
};
function uploadAndClassifyImage(){
    var fileInput = document.getElementById('prediction_fileinput').files;
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
        url : 'https://mg1szasge3.execute-api.ap-south-1.amazonaws.com/dev/classify_image',
        data : formData,
        processData : false,
        contentType : false,
        mimeType : 	"application/json"
    }).done(function (response) {
        console.log(response);
        var output  = document.getElementById('prediction_output');
        output.innerHTML = JSON.stringify(response);
    }).fail(function () {alert ("There was an error while sending a prediction request");
    });
};

function uploadAndAlignImage(){
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
        url : 'https://1z7osv3nj8.execute-api.ap-south-1.amazonaws.com/dev/align_images',
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


function uploadandfaceswap(){
    var img1 = document.getElementById('img_1_input').files;
    var img2 = document.getElementById('img_2_input').files;
    if(!img1.length){
        return alert("Please choose a file to upload first");
    }
    if(!img2.length){
        return alert("Please choose a file to upload first");
    }
    var image1 = img1[0]
    var image2 = img2[0]
    var filename1 = image1.name
    var filename2 = image2.name

    var formData1 = new FormData();
    formData1.append(filename1,image1)
    formData1.append(filename2,image2)

    console.log(filename1,filename2)

    $.ajax({
        async : true,
        crossDomain : true,
        method : 'POST',
        //url : 'https://ic87evu6q3.execute-api.ap-south-1.amazonaws.com/dev/classify_image',
        url : 'https://1z7osv3nj8.execute-api.ap-south-1.amazonaws.com/dev/face_swap',
        data : formData1,
        processData : false,
        contentType : false,
        mimeType : "application/json"
    }).done(function (response) {
        console.log(response);
        var b64img = response.swapped_image
        console.log("***")
        console.log(b64img)
        var output_image = document.getElementById('faceswap_output');
        output_image.src = 'data:image/jpeg;base64,'+b64img;
    }).fail(function () {alert ("There was an error while sending a prediction request");
    });
};

function uploadAndRecognizeFace(){
    var fileInput = document.getElementById('face_recognition_fileinput').files;
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
        url : 'https://03dwuhemb0.execute-api.ap-south-1.amazonaws.com/dev/classify_image',
        data : formData,
        processData : false,
        contentType : false,
        mimeType : 	"application/json"
    }).done(function (response) {
        console.log(response);
        console.log(response.prediction)
        var output  = document.getElementById('face_recognistion_output');
        output.innerHTML = response.prediction;
    }).fail(function () {alert ("There was an error while sending a prediction request");
    });
};


function uploadAndRecognizeFace_1(){
    var fileInput = document.getElementById('face_recognition_fileinput').files;
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
        url : 'https://1z7osv3nj8.execute-api.ap-south-1.amazonaws.com/dev/align_images',
        data : formData,
        processData : false,
        contentType : false,
        mimeType : "application/json"
    }).done(function (response) {
        console.log(response);
        var b64img = response.ImageBytes
        console.log("***")
        console.log(b64img)


        $.ajax({
            async : true,
            crossDomain : true,
            method : 'POST',
            url : 'https://03dwuhemb0.execute-api.ap-south-1.amazonaws.com/dev/classify_image',
            data : b64img,
            processData : false,
            contentType : false,
            mimeType : 	"application/json"
        }).done(function (response) {
            console.log(response);
            console.log(response.prediction)

            var output  = document.getElementById('face_recognistion_output');
            output.innerHTML = response.prediction;
            var outputimg = document.getElementById('face_recognistion_outputimg')
            outputimg.src = 'data:image/jpeg;base64,'+response.image;
            var confidence = document.getElementById('confidence')
            confidence.src = 'data:image/jpeg;base64,'+response.confidence;
        }).fail(function () {alert ("There was an error while sending a prediction request");
        });

        // var output_image = document.getElementById('output');
        // output_image.src = 'data:image/jpeg;base64,'+b64img;
    }).fail(function () {alert ("There was an error while sending a prediction request");
    });


};

