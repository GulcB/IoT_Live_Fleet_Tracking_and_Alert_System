import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import firebaseConfig from '../config/firebase.config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database: Database = getDatabase(app);

export { app, database };
