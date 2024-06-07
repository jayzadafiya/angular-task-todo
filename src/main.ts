import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// import firebase from 'firebase/app';
// // import 'firebase/database'; // Import only the features you need
// import { firebaseConfig } from './config/firebase.config';

// firebase.initializeApp(firebaseConfig);
//aa ak frine d aa try kari hati 
// na ek var aama joi laie//okay
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
