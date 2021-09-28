module.exports = (req, validations) => {
    // loop through validations
    Object.keys(validations).forEach((key, index) => {
		let value = validations[key];
	
		// split data
		let splitValue = value.split('|');
		for (var i = 0; i < splitValue.length; i++) {
			if (splitValue[i] == 'required') {
				req.checkBody(`${key}`, `The ${key.charAt(0).toUpperCase() + key.slice(1)} Field is required.`).notEmpty();
			}
	
			if (splitValue[i] == 'email') {
				req.checkBody(`${key}`, 'The Email is not valid.').isEmail();
			}
	
			if (splitValue[i].indexOf('equals') > -1) {
				// Get property name
				let propertyName = splitValue[i].split('equals:');
				req.checkBody(key, `${key} must be equal to ${propertyName[1]}`).equals(req.body[propertyName[1]]);
			}
	
			if (splitValue[i].indexOf('min') > -1) {
				// Get property name
				let propertyValue = splitValue[i].split('min:');
				req.checkBody(key, `${key} cannot be less than ${propertyValue[1]}`).isLength({ min: propertyValue[1] });
			}
	
			if (splitValue[i].indexOf('max') > -1) {
				// Get property name
				let propertyValue = splitValue[i].split('max:');
				req.checkBody(key, `${key} cannot be greater than ${propertyValue[1]}`).isLength({ max: propertyValue[1] });
			}
	
			if (splitValue[i] == 'number') {
				req.checkBody(`${key}`, `The ${key} must be a number.`).isNumber();
			}
		}
    });
    
    let errors = req.validationErrors();
    return errors;
  };