import React from 'react';
import { login, sendQueryUsingTokens } from './jwt';

describe('API_test', () => {
    test('CREATE_SURVEY', () => {
        let credentials = { username: 'test_user', password: 'test_password' };
        login(credentials.username, credentials.password).then(response => console.log(response));
        expect(1 == 2);
    });
});