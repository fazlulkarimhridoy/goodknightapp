// handle product code 2
const handleProductCode2 = async () => {
    setLoading(true);

    try {
        // Capture photo
        const photo = await Camera.getPhoto({
            quality: 90,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
        });

        // Create an Image object
        const image = new Image();

        // Set the source of the image to the photo web path
        image.src = photo.webPath;

        // When the image is loaded, perform compression
        image.onload = async () => {
            try {
                // Create a canvas element
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions to match the image
                canvas.width = image.width;
                canvas.height = image.height;

                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0);

                // Convert the canvas to a data URI with compressed quality
                const compressedDataUri = canvas.toDataURL('image/jpeg', 0.6);

                console.log("uri", compressedDataUri);

                // Perform text detection on the compressed image
                const result = await handleDetectedText(compressedDataUri);
                const resultNumber = parseInt(result);
                console.log("resultNumber", resultNumber);
                if (!isNaN(resultNumber)) {
                    setLoading(false);
                    setDetectedText2(resultNumber);
                    setCustomerData((prevData) => ({
                        ...prevData,
                        product_code2: resultNumber,
                    }));
                    console.log(customerData);
                } else {
                    setLoading(false);
                    toast.error("No code found. Please try again");
                    console.log("No code found", customerData);
                }
            } catch (error) {
                setLoading(false);
                toast.error('Error compressing image', error);
            }
        };
    } catch (error) {
        setLoading(false);
        toast.error('Error capturing image', error);
    }
}