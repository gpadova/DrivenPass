import { invalidCredential } from "../errors/invalidCredentialTitle.js";
import { invalidGetCredential } from "../errors/invalidGetCredential.js";
import { Credential } from "../protocols.js";
import credentialRepository from "../Repositories/credentialsRepository.js";


async function insertCredential(credential:Credential, userId: number) {
    
    const existingName = await credentialRepository.verifyExistingNameQuery(credential, userId);

    if(existingName) throw invalidCredential();

    const cred = await credentialRepository.insertCredentialQuery(credential, userId);
    return cred
}

async function getSpecificCredentialService(id: string, userId: number) {
    const credential = await credentialRepository.getSpecificCredentialQuery(id, userId);
    
    if(!credential) throw invalidGetCredential();

    return credential;
}

async function getCredentials(userId: number) {
    const credential = await credentialRepository.getCredentialQuery(userId)

    if(!credential) throw invalidCredential();

    return credential
}

async function deleteCredential(userId:number, id: string) {
    const deleteCredential = await credentialRepository.deleteCredential(userId, id);
    if(!deleteCredential) throw invalidCredential();

    return deleteCredential;
}

const credentialService = {
    insertCredential,
    getSpecificCredentialService,
    getCredentials,
    deleteCredential
}

export default credentialService;