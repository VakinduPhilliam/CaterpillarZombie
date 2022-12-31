
// Function to test for valid valid numericals
const isNumber = (element)=>{    
    
    // Regex for testing numbers
    // Phone number should strictly have 12 digits 
    var numberRegex =  /^[0-9]+$/;
 
    // Return validity
    return numberRegex.test(element); 
};

// Export modules
module.exports ={isNumber};

