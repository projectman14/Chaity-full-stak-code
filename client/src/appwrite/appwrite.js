import { Client, Storage, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6695579b00304fa159f8');

const profileUrl = async (file) => {
    const storage = new Storage(client);

    const promise = storage.createFile(
        '66955854002584d3b293',
        ID.unique(),
        file
    );

    let response = {};
    let url

    await promise.then(async function (response) {
        const result = await storage.getFileView('66955854002584d3b293', response.$id);
        url = result.href;
        return result.href;
    }, function (error) {
        console.log(error); 
    });

    return url

}

export { profileUrl }