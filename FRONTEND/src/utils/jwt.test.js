import React from 'react'
import axios from 'axios'

import { login, sendQueryUsingTokens } from './jwt'

const existing_user = { username: 'bishop', password: 'ghost14' }

describe('API_TEST', () => {
    test('login_and_get_tokens_success', async () => {
        await login(existing_user.username, existing_user.password).then(response => {
                expect(response.login).toEqual('SUCCESS')
            },
        )
    })

    test('login_and_get_tokens_fail', async () => {
        const credentials = { username: 'fail', password: 'fail' }
        await login(credentials.username, credentials.password).catch(response => {
                expect(response.login).toEqual('FAILED')
            },
        )
    })
})


