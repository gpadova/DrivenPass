import { invalidCredential } from "../errors/invalidCredentialTitle";
import { invalidGetCredential } from "../errors/invalidGetCredential";
import { Credential } from "../protocols";
import credentialRepository from "../Repositories/credentialsRepository";


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

async function deleteCredential(userId: number, id: string) {
    
    const deleteCredential = await credentialRepository.deleteCredential(userId, id);
    if(deleteCredential.count === 0) throw invalidCredential();
    
    return deleteCredential;
}

const credentialService = {
    insertCredential,
    getSpecificCredentialService,
    getCredentials,
    deleteCredential
}

export default credentialService;