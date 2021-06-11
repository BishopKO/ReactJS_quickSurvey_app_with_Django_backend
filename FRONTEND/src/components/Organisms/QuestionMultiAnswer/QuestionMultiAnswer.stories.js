import React from 'react';
import { storiesOf } from '@storybook/react';
import QuestionMultiAnswer from './index';

const question = 'This is sample question...This is sample question...This is sample question...This is sample question...This is sample question...This is sample question...This is sample question...';

const answers = ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. \'Lorem ipsum dolor sit amet, consectetur adipisicing elit. \'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores eligendi enim eos, illo in\n' +
'                labore laboriosam molestias nemo neque nesciunt odio pariatur provident quibusdam reiciendis rerum sit\n' +
'                velit voluptate?', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores eligendi enim eos, illo in\n' +
'                labore laboriosam molestias nemo neque nesciunt odio pariatur?', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores eligendi enim eos, illo in\n' +
'                labore laboriosam molestias nemo neque nesciunt odio pariatur?'];


storiesOf('Organisms/QuestionMultiAnswer', module)
    .add('Single', () => <QuestionMultiAnswer type='single' question={question} answers={answers}/>)
    .add('Multi', () => <QuestionMultiAnswer type='multi' question={question} answers={answers}/>);
