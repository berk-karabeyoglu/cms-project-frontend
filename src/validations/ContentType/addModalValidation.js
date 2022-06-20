// import pluralize from "pluralize";

const validateName = name => {
    let errors = {};
    if(!name){
        errors.contentTypeName = "Name is required !"
    }else if(!(/^[a-zA-Z0-9 ]*$/i.test(name))){
        errors.contentTypeName = "You can write only alphanumeric characters!";
    }
    return errors.contentTypeName;
};

const modalValidations = {
    validateName
}

export default modalValidations;

