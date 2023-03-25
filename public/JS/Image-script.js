function convertToBase64() {
    const uploadImage = document.getElementById('image_file');
    const uploadImageOP = document.getElementById('image');

    const file = uploadImage.files[0];
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);

        reader.onload = function () {

            let base64 = reader.result;
            uploadImageOP.value = base64;

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    else {
        uploadImageOP.value = "";
    }

}