import Papa from 'papaparse'
import msg from '../../message.csv';

export const showError = (error) => {

    if (error.response.data.errors) {
        const errors = error.response.data.errors;
        for (let index = 0; index < errors.length; index++) {
            const element = errors[index];
            readMsg(element.defaultMessage);
        }
    } else {
        const errors = error.response.data.message;
        readMsg(errors);
    }
}

export const showMessage = (code) => {
    readMsg(code);
}

const readMsg = (errorCode) => {
    const splitErrorCode = errorCode.split(",");
    for (let index = 0; index < splitErrorCode.length; index++) {
        const code = splitErrorCode[index];
        readMsgFromFile(code);
    }
}

const readMsgFromFile = (errorCode) => {
    fetch(msg)
        .then(row => row.text())
        .then(text => {
            Papa.parse(text, {
                worker: true,
                step: function (result) {
                    if (result.data[0] === errorCode) {
                        alert(result.data[1]);
                    }
                },
            });
        });
}