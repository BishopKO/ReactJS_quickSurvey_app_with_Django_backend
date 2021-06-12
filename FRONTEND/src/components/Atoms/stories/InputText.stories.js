import React from 'react';
import { storiesOf } from '@storybook/react';
import InputTextareaWithText from '../InputTextareaWithText';

const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Accusamus alias aspernatur blanditiis distinctio eos esse ex expedita ' +
    'iure, maxime molestias mollitia necessitatibus ' +
    'neque pariatur placeat praesentium provident reiciendis ullam vitae?';

storiesOf('Atoms/InputTextareaWithText', module).add('Primary', () => <InputTextareaWithText text={text}/>);