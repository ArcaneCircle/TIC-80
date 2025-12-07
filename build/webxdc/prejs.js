var Module = typeof Module!="undefined"? Module : {};

Module.saveAs = function (blob, name) {
  window.webxdc.sendToChat({file: {blob, name}});
};
if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (
  typeof define !== "undefined" &&
  define !== null &&
  define.amd !== null
) {
  define([], function () {
    return saveAs;
  });
}

Module.showAddPopup = function (callback) {
  var uploadInput = document.getElementById("upload-input");
  uploadInput.onchange = function () {
    var file = uploadInput.files[0];

    if (!file) return;

    var reader = new FileReader();

    reader.onload = function (event) {
      var rom = new Uint8Array(event.target.result);
      callback(file.name, rom);
      uploadInput.value = "";
    };

    reader.readAsArrayBuffer(file);
  };
  uploadInput.click();
};
