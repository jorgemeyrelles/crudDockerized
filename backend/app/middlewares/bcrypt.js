const bcrypt = require('bcrypt');

const round = 10;

const reverseWord = (pass) => {
  try {
    const dividedWord = [
      pass.slice(0, (pass.length/2)).split("").reverse().join(""),
      pass.slice(pass.length/2).split("").reverse().join("")
    ];
    return dividedWord.join("");
  } catch (error) {
    console.error(error);
    return error;
  }
};

const hashPassword = async (pass, round) => {
  try {
    const reversed = reverseWord(pass);
    
    const salt = await bcrypt.genSalt(round);
    const res = await bcrypt.hash(reversed, salt);

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const verifyHash = async (pass, hash) => {
  try {
    const reversed = reverseWord(pass);
    const verified = await bcrypt.compare(reversed, hash);
  
    return verified;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  verifyHash,
  hashPassword,
}
