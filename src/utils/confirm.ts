import { getGlobalStore } from '@/store/GlobalStore';
import { ConfirmModalProps } from '@/components';

export const confirm = async (props: ConfirmModalProps) => {
  const globalStore = getGlobalStore();
  if (!globalStore) return false;
  return globalStore.confirm(props);
};
