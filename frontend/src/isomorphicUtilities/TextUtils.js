let TextUtils = {
  truncate: (text, length) => {
    if (text.length <= length) { return text; }
    var truncatedString = text.substr(0, length-1);
    return truncatedString.substr(0, truncatedString.lastIndexOf(' ')) + "&hellip;";
  },

  replace: (text, findPattern, substitute)=>{
    return text.split(findPattern).join(substitute)
  }
}

module.exports = TextUtils