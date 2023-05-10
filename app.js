function encryptFile() {
  var file = document.getElementById('file-input').files[0];
  if (!file) {
    alert('Please select a file to encrypt.');
    return;
  }

  var reader = new FileReader();
  reader.onload = function() {
    var content = reader.result;
    var password = prompt('Enter password for encryption:');
    if (!password) {
      alert('Please enter a password to encrypt the file.');
      return;
    }

    var encrypted = CryptoJS.AES.encrypt(content, password);
    var encryptedBlob = new Blob([encrypted], { type: 'application/octet-stream' });
    var downloadLink = document.getElementById('download-link');
    downloadLink.href = URL.createObjectURL(encryptedBlob);
    downloadLink.download = file.name + '.encrypted';
    downloadLink.style.display = 'block';
  };
  reader.readAsText(file);
}
