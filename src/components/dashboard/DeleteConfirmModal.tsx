import { Button } from "../ui/button";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">تأكيد الحذف</h3>
        <p className="mb-6 text-gray-600">هل أنت متأكد من رغبتك في حذف "{itemName}"؟ هذا الإجراء لا يمكن التراجع عنه.</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button className="bg-red-600 text-white hover:bg-red-700" onClick={onConfirm}>
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
