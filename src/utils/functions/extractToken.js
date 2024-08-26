const extractTokenToHeader = (reqObject) => {
  return reqObject.split(" ")[1];
};

module.exports = extractTokenToHeader;
