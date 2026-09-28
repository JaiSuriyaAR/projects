import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ToastContainer() {
  const list = useStoreState((s) => s.toasts.list);
  const remove = useStoreActions((a) => a.toasts.remove);

  return (
    <div className="toast-container">
      {list.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`} onClick={() => remove(t.id)}>
          {t.message}
        </div>
      ))}
    </div>
  );
}