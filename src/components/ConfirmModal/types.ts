import { TypeFromProps } from '@/types';

export const IConfirmModalProps = {
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  // show cancel button
  cancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  // show ok button
  ok: {
    type: Boolean,
    default: true
  },
  okText: {
    type: String,
    default: '确定'
  }
};

export type ConfirmModalProps = TypeFromProps<typeof IConfirmModalProps>;
