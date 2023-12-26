// signupValidation.js
let error = {};

const Validation = (values) => {
    error = {};

    if (values.name === "") {
        error.name = "product Name should not be empty";
    } else {
        error.name = " ";
    }

    if (values.price === "") {
        error.price = "Product price should not be empty";
    } else {
        error.price = " ";
    }

    if (values.description === "") {
        error.description  = "product description should not be empty";
    } else {
        error.description  = " ";
    }

    if (values.image === "") {
        error.image  = "product description should not be empty";
    } else {
        error.image  = " ";
    }

      if (values.videos === "") {
        error.videos  = "product videos should not be empty";
    } else {
        error.videos  = " ";
    }

    if (values.youtubelink && !/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(v=[^&\s]+)/.test(values.youtubelink)) {
        error.youtubelink = 'Please enter a valid YouTube link';
      }

    return error;
};

export default Validation;
