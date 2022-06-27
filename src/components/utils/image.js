export const getImage = (file) => {
    const image = new Image();
    return new Promise((resolve) => {
      image.addEventListener('load', () => resolve(image));
      image.src = URL.createObjectURL(file);
    });
  };


export const getImageSize = async (file) => {
   const image = await getImage(file);
    console.log(image)
   return {width: image.width, height: image.height};
};


