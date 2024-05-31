const idGenerator = (length) => {
  let result = "";
    const allowedChars = "ABCDEFGHIJKLMNOPKRSTUVXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charListLength = allowedChars.length;
    for (let i = 0;i < length;++i) {
      result += allowedChars.charAt(Math.floor(Math.random() * charListLength))
    }
    return result;
  /*makeId : (length) => {
    let result = "";
    const allowedChars = "ABCDEFGHIJKLMNOPKRSTUVXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charListLength = allowedChars.length;
    for (let i = 0;i < length;++i) {
      result += allowedChars.charAt(Math.floor(Math.random() * charListLength))
    }
    return result;
  }*/
}

export default idGenerator