var api = 'http://127.0.0.1:8080'
// fake cpf test:
// https://api.cpfcnpj.com.br/5ae973d7a997af13f0aaf2bf60e65803/9/12815281457


function testCPF() {
      savePerson()
}

function savePerson() {
    $.ajax({
        type: 'POST',
        url: api + '/save-new-person',
        data: {
            name:$("#name-input").val(),
            cpf:$("#cpf-input").val()
        }
    });
}