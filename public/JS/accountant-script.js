function convertToBase64() {
    const uploadImage = document.getElementById('image_file');
    const uploadImageOP = document.getElementById('accountant_image');
    
    console.log(uploadImage);
    console.log(uploadImage.value);
    const file = uploadImage.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = function () {
        
        let base64 = reader.result;
        uploadImageOP.value = base64;
        console.log(uploadImageOP.value.length);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

}
