const getRole=require('./getUserRole')
// hidden-info.js

module.exports =async function hideSensitiveInfo(req,res,datax) {
    var data=JSON.parse(JSON.stringify(datax));
    const userId = req.header("userId");
    const role=await getRole(userId)


    if (role === 'PROJECT-MANAGER') {
        if (data && Array.isArray(data)) {
            data.forEach(em => {
                delete em["score"];
                delete em["salary"];
            });
        } else if (data && typeof data === 'object') {
            delete data['0']["score"];
            delete data['0']["salary"];
        }
    }


    return data

};