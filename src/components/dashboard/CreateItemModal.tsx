import { useState, useRef } from "react";
import { Button } from "../ui/button";

type CreateItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => void;
  isLoading?: boolean;
};

const CreateItemModal = ({ isOpen, onClose, onSave, isLoading = false }: CreateItemModalProps) => {
  const [id, setId] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [status, setStatus] = useState("مفعل");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File name:", file.name);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id", id);
    formData.append("Name_Ar", nameAr);
    formData.append("Name_En", nameEn);
    formData.append("IsActive", status === "مفعل" ? "true" : "false");

    if (fileInputRef.current?.files?.[0]) {
      const iconFile = fileInputRef.current.files[0];
      console.log("Using file name:", iconFile.name);
      formData.append("Icon", iconFile);
    }

    onSave(formData);

    setId("");
    setNameAr("");
    setNameEn("");
    setStatus("مفعل");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">إضافة قسم جديد</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
              رقم القسم
            </label>
            <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue" required />
          </div>
          <div>
            <label htmlFor="name_ar" className="block text-sm font-medium text-gray-700 mb-1">
              الاسم بالعربية
            </label>
            <input type="text" id="name_ar" value={nameAr} onChange={(e) => setNameAr(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue" required />
          </div>

          <div>
            <label htmlFor="name_en" className="block text-sm font-medium text-gray-700 mb-1">
              الاسم بالإنجليزية
            </label>
            <input type="text" id="name_en" value={nameEn} onChange={(e) => setNameEn(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue" required />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              الصورة
            </label>
            <input type="file" id="image" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue" />

            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="معاينة" className="h-24 w-auto object-contain rounded border" />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              الحالة
            </label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue">
              <option value="مفعل">مفعل</option>
              <option value="غير مفعل">غير مفعل</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-primary-blue hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateItemModal;
