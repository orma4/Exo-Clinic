import vest, { test, enforce } from "vest";
import { isEmail } from "validator";
import axios from "axios";

const suite = vest.create("user_form", (data = {}, currentField) => {
  vest.only(currentField);

  test("name", "Name is required", () => {
    enforce(data.name).isNotEmpty();
  });
 
  test("name", "Name must be at least 3 characterss long", () => {
    enforce(data.name).longerThanOrEquals(3);
  });
  test("name", "Name is required to be only alpha letters ", () => {
     enforce(data.name).matches(/[a-zA-Z]/).notMatches(/[0-9-!$%^&@#*()_+|~=`{}\[\]:";'<>?,.\/]/)
     
  });
//   test("name", "Name is one word with no spaces ", () => {
//     enforce(data.name).notMatches(/[ ]/)
    
//  });


if(data.phone){
  test("phone", "Phone is required", () => {
  enforce(data.phone).isNotEmpty();
});

test("phone", "Phone must be 10 characterss long", () => {
  enforce(data.phone).lengthEquals(10);
});

test("phone", "Phone must be without spaces ", () => {
  enforce(data.phone).notMatches(/[ ]/)
  
});

test("phone", "Phone is required to be in format(1234567890)", () => {
  enforce(data.phone).matches(/[0-9]{3}[0-9]{3}[0-9]{4}/)
  
});
}


 test("email", "Email is one word with no spaces ", () => {
  enforce(data.email).notMatches(/[ ]/)
  
});
test("password", "Password is one word with no spaces ", () => {
  enforce(data.password).notMatches(/[ ]/)
  
});
test("confirm_password", "Password is one word with no spaces ", () => {
  enforce(data.confirm_password).notMatches(/[ ]/)
  
});
  test("email", "Email Address is not valid", () => {
    enforce(data.email).isEmail();
  });

  if (!suite.get().hasErrors("email")) {
    test("email", "Email already exists!", async() => {
      const config = {
              headers: {
              'Content-Type' : 'application/json'
              }
              }
              const body = JSON.stringify({ email:data.email });
              const res=await axios.post('/api/users/checkEmailExists', body, config)
      if (data.email) {
        return  await new Promise((resolve, reject) => {
          setTimeout(() => {
             res.data=== true
              ? reject()
              : resolve();
          }, 2000);
        });
      }
});
}

  test("password", "Password is required", () => {
    enforce(data.password).isNotEmpty();
  });

  test("password", "Password is weak, Maybe add a number?", () => {
    vest.warn();
    enforce(data.password).matches(/[0-9]/);
  });

  if (data.password) {
    test("confirm_password", "Passwords do not match", () => {
      enforce(data.confirm_password).equals(data.password);
    });
  }
});

export default suite;

enforce.extend({ isEmail });
