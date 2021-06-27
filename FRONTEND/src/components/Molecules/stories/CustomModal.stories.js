import React from 'react';
import { storiesOf } from '@storybook/react';
import CustomModal from '../CustomModal';
import 'bootstrap/dist/css/bootstrap.min.css';


storiesOf('Molecules/CustomModal', module).add('Edit', () => <CustomModal show/>);