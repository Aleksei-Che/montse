import React from 'react';
import Modal from '../components/Modal';

export default {
    title: 'Components/Modal',
    component: Modal,
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    onClose: () => alert('Modal closed'),
    children: <div>This is a modal content</div>,
};