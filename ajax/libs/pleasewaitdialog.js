// https://css-tricks.com/drag-and-drop-file-uploading/
function handleUpload(file) {
    var xhr = new XMLHttpRequest();
    form = $('#dropzone').get(0);
    var formData = new FormData(form);
    if (file != null) {
        formData.append('file', file);
    }
    
    xhr.upload.addEventListener('progress', function(event) {
        var percent = (100 * event.loaded / event.total);
        $(".progress-bar").text(Math.round(percent) + "%");
        if (percent == 100) {
            $('#pleaseWaitDialog').find('.modal-title').text('Processing...');
        }
    });
    xhr.addEventListener('readystatechange', function(event) {
        if (event.target.readyState == 4 && event.target.responseText) {
            // we got a response from the server and we're replacing the whole
            // current document content with it, simulating a page reload
            location.replace(formData.get('redirect'));
        } else {
            //throw new Error('Error in the response.');
        }
    });
    action = form.getAttribute('action') ? form.getAttribute('action'):"";
    xhr.open(form.getAttribute('method'), action, true);
    xhr.send(formData);
}

$(document).ready(function () {
    $(document).on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    $(document).on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    $('#dropzone').on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showPleaseWaitDialog();
        files = e.originalEvent.dataTransfer.files;
        $.each(files, function(index, file) {
            handleUpload(file);
        });
    });
    $('#dropzone').on('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showPleaseWaitDialog();
        handleUpload(null);
    });
});
