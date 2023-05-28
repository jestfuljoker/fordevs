# SignUp

![SignUp Diagram](./assets/signup-diagram.png)
*SignUp Diagram*

### Success case ✅
- [x] Receives a POST type request on route/api/signUp;
- [x] Validate mandatory data: name, email, password and passwordConfirmation;
- [x] Validate that password and passwordConfirmation are equal;
- [x] Validate that the email field is a valid email;
- [x] Validate if there is already a user with the email provided;
- [x] Generates an encrypted password (this password cannot be decrypted);
- [x] Creates an account for the user with the informed data, replacing the password with the encrypted password;
- [ ] Generates an access token from the user ID;
- [ ] Updates user data with the generated access token;
- [ ] Returns **200** with the access token and user name.
---
### Exceptions ❌
- [x] Returns error **404** if the API does not exist;
- [x] Returns error **400** if name, email, password or passwordConfirmation are not provided by client;
- [x] Returns error **400** if password and passwordConfirmation are not equal;
- [x] Returns error **400** if the email field is an invalid email;
- [x] Returns error **403** if the email provided is already in use;
- [x] Returns error **500** if it gives error when trying to generate an encrypted password;
- [x] Returns error **500** if it gives error when trying to create the user account;
- [x] Returns error **500** if it gives error when trying to generate the access token;
- [ ] Returns error **500** if it gives error when trying to update the user with the access token generated.
