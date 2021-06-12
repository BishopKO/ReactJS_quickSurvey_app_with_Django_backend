import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../Button';

storiesOf('Atoms/Button', module).add('Primary', () => <Button text="Go Back"
                                                               action={() => console.log('Button Action')}/>);