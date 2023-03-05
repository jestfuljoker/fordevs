# SignUp

### Success case ✅
- [ ] Receives a POST type request on route/api/signUp;
- [ ] Validate mandatory data: name, email, password and passwordConfirmation;
- [ ] Validate that password and passwordConfirmation are equal;
- [ ] Validate that the email field is a valid email;
- [ ] Validate if there is already a user with the email provided;
- [ ] Generates an encrypted password (this password cannot be decrypted);
- [ ] Creates an account for the user with the informed data, replacing the password with the encrypted password;
- [ ] Generates an access token from the user ID;
- [ ] Updates user data with the generated access token;
- [ ] Returns **200** with the access token and user name.
---
### Exceptions ❌
- [ ] Returns error **404** if the API does not exist;
- [ ] Returns error **400** if name, email, password or passwordConfirmation are not provided by client;
- [ ] Returns error **400** if password and passwordConfirmation are not equal;
- [ ] Returns error **400** if the email field is an invalid email;
- [ ] Returns error **403** if the email provided is already in use;
- [ ] Returns error **500** if it gives error when trying to generate an encrypted password;
- [ ] Returns error **500** if it gives error when trying to create the user account;
- [ ] Returns error **500** if it gives error when trying to generate the access token;
- [ ] Returns error **500** if it gives error when trying to update the user with the access token generated.
