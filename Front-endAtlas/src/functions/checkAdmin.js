function checkAdmin(username, password) {
  console.log("admin", username);
  if (username === "admin" && password === "admin") {
    return 0;
  } else return 1;
}

export { checkAdmin };
