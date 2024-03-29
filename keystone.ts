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

const express = require('express');
const jwt = require('jsonwebtoken');

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
            port: 3001,
            extendExpressApp: (app, commonContext) => {
                app.use(express.json());
                app.post('/api/user-signin', async (req, res) => {
                    const creds = req.body;
                    try {
                        const response = await fetch("https://app.carma.earth/version-7b11/api/1.1/wf/aws_login", {
                            method: 'POST',
                            body: JSON.stringify(creds),
                            headers: { "Content-Type": "application/json" }
                        });
                        const cred = await response.json();
                        
                        console.log(cred.response.user_id)
                            res.send(JSON.stringify(cred.response.user_id))
                        } catch(error) {
                            res.send(false)
                        }
                    });
            },
        },
        db: {
        provider: 'postgresql',
        url: 'postgresql://carma_root:root_carma@127.0.0.1:5432/carma_platform',
        },
        lists,
        session,
        storage: {
            files: {
                kind: 'local',
                type: 'file',
                generateUrl: path => `/files${path}`,
                serverRoute: {
                    path: '/files',
                },
                storagePath: 'public/files',
            },
            apiJson: {
                kind: 'local',
                type: 'file',
                transformName: (filename) => `${filename}`,
                generateUrl: path => `/files/json${path}`,
                serverRoute: {
                    path: '/json',
                },
                storagePath: 'public/files/json',
            },
        },
    })
);
