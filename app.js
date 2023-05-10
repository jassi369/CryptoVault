function encryptFile() {
  //Get the file input element and the selected file
  var file = document.getElementById('file-input').files[0];
  //Check if a file ahs been selected
  if (!file) {
    alert('Please select a file to encrypt.');
    return;
  }
  //create a new file reader
  var reader = new FileReader();
  //Define the onload function for the file reader
  reader.onload = function() {
    //get the content of the file
    var content = reader.result;
    //Ask the user to enter the password for encryption
    var password = prompt('Enter password for encryption:');
    //check if the password has been entered 
    if (!password) {
      alert('Please enter a password to encrypt the file.');
      return;
    }
    //Encrypt the file content using the entered password
    var encrypted = CryptoJS.AES.encrypt(content, password);
    //Create a new Blob object from the encrypted content
    var encryptedBlob = new Blob([encrypted], { type: 'application/octet-stream' });
    //Get the download link element and set its attributed to provide a download link for the encrypted file
    var downloadLink = document.getElementById('download-link');
    downloadLink.href = URL.createObjectURL(encryptedBlob);
    downloadLink.download = file.name + '.encrypted';
    downloadLink.style.display = 'block';
  };
  //Read the contents of the selected file
  reader.readAsText(file);
}
function decryptFile() {
  // Get the file input element and check if a file is selected
  var file = document.getElementById('file-input-decrypt').files[0];
  if (!file) {
    alert('Please select a file to decrypt.');
    return;
  }

  // Create a FileReader object to read the file content
  var reader = new FileReader();

  // Set a callback function to be called when the file is loaded
  reader.onload = function() {
    // Get the content of the file as a string
    var content = reader.result;

    // Prompt the user to enter the password for decryption
    var password = prompt('Enter password for decryption:');
    if (!password) {
      alert('Please enter a password to decrypt the file.');
      return;
    }

    try {
      // Try to decrypt the content using the entered password
      var decrypted = CryptoJS.AES.decrypt(content, password);

      // Create a Blob object with the decrypted content as a string
      var decryptedBlob = new Blob([decrypted.toString(CryptoJS.enc.Utf8)], { type: 'text/plain' });

      // Get the download link element and set its properties
      var downloadLink = document.getElementById('download-link');
      downloadLink.href = URL.createObjectURL(decryptedBlob);
      downloadLink.download = file.name.replace('.encrypted', ''); // Remove the ".encrypted" extension from the filename
      downloadLink.style.display = 'block';
    } catch (e) {
      // If decryption fails, show an error message
      alert('Invalid password. Please try again.');
    }
  };

  // Read the file as text
  reader.readAsText(file);
}
