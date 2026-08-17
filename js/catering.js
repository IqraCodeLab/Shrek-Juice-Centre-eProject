/* ===== Catering Page JS ===== */

document.addEventListener('DOMContentLoaded', function() {

  // ===== Image Preview (if needed) =====
  window.previewImage = function(event, imageId) {
    var reader = new FileReader();
    reader.onload = function() {
      var output = document.getElementById(imageId);
      if (output) output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

});
