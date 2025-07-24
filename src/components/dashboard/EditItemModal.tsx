import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";

type Item = {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  hasImage: boolean;
  status: string;
};

type EditItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Item, file?: File | null) => void;
  item: Item | null;
  isLoading: boolean;
};

const EditItemModal = ({ isOpen, onClose, onSave, item, isLoading = false }: EditItemModalProps) => {
  const [formData, setFormData] = useState<Item>({
    id: 0,
    name_ar: "",
    name_en: "",
    image: "",
    hasImage: false,
    status: "مفعل",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item) {
      setFormData(item);
      setPreviewUrl(item.hasImage ? item.image : null);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, selectedFile);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">تعديل القسم</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1" >
              رقم القسم
            </label>
            <input
              type="text"
              id="id"
              name="id"
              readOnly
              disabled
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue"
              required
            />
          </div>

          <div>
            <label htmlFor="name_ar" className="block text-sm font-medium text-gray-700 mb-1">
              الاسم بالعربية
            </label>
            <input type="text" id="name_ar" name="name_ar" value={formData.name_ar} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue" required />
          </div>

          <div>
            <label htmlFor="name_en" className="block text-sm font-medium text-gray-700 mb-1">
              الاسم بالإنجليزية
            </label>
            <input type="text" id="name_en" name="name_en" value={formData.name_en} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue" required />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
              الصورة
            </label>
            <div className="flex space-y-4 space-x-reverse flex-col">
              <input type="file" id="icon" ref={fileInputRef} onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue" accept="image/*" />
              {previewUrl && (
                <div className="w-24 h-24 relative">
                  <img src={previewUrl} alt="Preview" className="w-24 h-24 object-cover rounded border border-gray-300" />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              الحالة
            </label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue">
              <option value="مفعل">مفعل</option>
              <option value="غير مفعل">غير مفعل</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-primary-blue hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-r-transparent rounded-full mr-2"></span>
                  جارٍ الحفظ...
                </span>
              ) : (
                "حفظ التغييرات"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
