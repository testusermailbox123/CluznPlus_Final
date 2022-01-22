
// //importing Axios library
// import axios from 'axios';

// export const getUserInfo = () => {

//     const URL = `http://cluznplus.com/cluzn_backend/api/getPlan`;

//     axios({
//         method: 'get',
//         url: URL,
//         headers: {

//         },
//         data: {

//         },
//     }).then((response) => {
//         console.log(response.data);
//         return response.data
//     });

// }


import axios from 'axios';

const { URL } = "http://cluznplus.com/cluzn_backend/api/getPlan";

const getPlan = number => {
    axios({
        method: 'get',
        url: "http://cluznplus.com/cluzn_backend/api/getPlan",
        headers: {

        },
        data: {

        },
    }).then((response) => {
        console.log(response.data);
        return response.data
    });
};

export { getPlan }