import {Injectable} from '@nestjs/common';
import * as firebase from 'firebase-admin';
import {app} from 'firebase-admin';
import {ConfigurationService} from "../configuration/configuration.service";

@Injectable()
export class FirebaseStorageService {

    defaultApp: app.App;

    constructor(private readonly configService: ConfigurationService) {
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert({
                projectId: configService.firebaseProjectId,
                clientEmail: configService.firebaseClientEmail,
                privateKey: configService.firebasePrivateKey?.replace(/\\n/g, '\n'),
            }),
            storageBucket: configService.firebaseBucketName
        });
    }

     extractImageName(url) {
        const path = url.split('?')[0];

        const decodedPath = decodeURIComponent(path);

        return decodedPath.substring(decodedPath.lastIndexOf('/') + 1);
    }
    async deleteFile(fileUrl: string): Promise<void> {
        try {
            const bucket = firebase.storage().bucket();
            const imageName = this.extractImageName(fileUrl);
            await bucket.file("images/"+imageName).delete();


            console.log(`File ${imageName} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting file:', error);
            throw new Error('Error deleting file from Firebase Storage');
        }
    }
}
