#!/usr/bin/env node
// Run: node scripts/generate-vapid.js
// Then copy the output into your .env file

import { generateVAPIDKeys } from 'web-push'

const keys = generateVAPIDKeys()
console.log('Add these to your .env file:\n')
console.log(`VAPID_PUBLIC_KEY=${keys.publicKey}`)
console.log(`VAPID_PRIVATE_KEY=${keys.privateKey}`)
