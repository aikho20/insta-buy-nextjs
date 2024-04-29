export const fileBase64 = (img: any) => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onerror = reject
        fileReader.onload = function () {
            resolve(fileReader.result)
        }
        fileReader.readAsDataURL(img)
    })
}