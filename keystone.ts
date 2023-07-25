// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';
import type { ServerConfig } from '@keystone-6/core/types';


// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';
import dotenv from "dotenv"
import type { StorageConfig } from '@keystone-6/core/types'


dotenv.config();

export default withAuth(
    config({
        server: {
            cors: {
                "origin": "*",
                "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
                "preflightContinue": false,
                "optionsSuccessStatus": 204
            },
            port: 3000
        },
        db: {
        provider: 'sqlite',
        url: 'file:./keystone.db',
        },
        lists,
        session,
        storage: {
            files: {
                kind: 'local',
                type: 'file',
                generateUrl: path => `http://localhost:3000/files${path}`,
                serverRoute: {
                    path: '/files',
                },
                storagePath: 'public/files',
            },
            apiJson: {
                kind: 'local',
                type: 'file',
                transformName: (filename) => `${filename}`,
                generateUrl: path => `http://localhost:3000/files/json${path}`,
                serverRoute: {
                    path: '/json',
                },
                storagePath: 'public/files/json',
            },
        },
    })
);
