import axios from 'axios';
const request =(type, url, data) => {  //axios를 간편하게 사용할 수 있도록 만들어 놓은 모듈- 민호
    return new Promise((resolve, reject) => {
        console.log('url', url);
       axios[type](url, data)
            .then(c => {
                resolve(c);   
            })
            .catch(err => {
                console.log(err);
                return err;
            });
    });
}

export default request;