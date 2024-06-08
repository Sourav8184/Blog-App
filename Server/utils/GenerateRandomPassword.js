export const generateRandomPassword = () => {
  let length = 8;
  // Define the character set for the password
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";

  let password = "";
  for (let i = 0; i < length; i++) {
    // Generate a random index within the charset length
    const randomIndex = Math.floor(Math.random() * charset.length);

    // Extract the character at the random index and add it to the password
    password += charset[randomIndex];
  }

  return password;
};
